import type { Recording } from '../types';

export interface AudioPlaybackState {
  recordingId: string | null;
  playing: boolean;
  paused: boolean;
}

const FADE_IN_MS = 20;
const FADE_OUT_MS = 30;

export class AudioEngine {
  private audios: HTMLAudioElement[] = [];
  private volumes = new WeakMap<HTMLAudioElement,number>();
  private context: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private frame = 0;
  private rate = 1;
  private looping = false;
  private currentId: string | null = null;
  private listener: ((state: AudioPlaybackState) => void) | null = null;

  get isPlaying(): boolean { return this.audios.some((audio) => !audio.paused); }
  get currentRecordingId(): string | null { return this.currentId; }
  get playbackRate(): number { return this.rate; }
  get loop(): boolean { return this.looping; }

  onStateChange(listener: (state: AudioPlaybackState) => void): void {
    this.listener = listener;
    this.emit();
  }

  async play(recording: Recording, options: { canvas?: HTMLCanvasElement | null; pan?: number; backgrounds?: Recording[] } = {}): Promise<void> {
    this.stop();
    const main = this.createAudio(recording.src, 1, false);
    this.audios.push(main);
    for (const background of options.backgrounds ?? []) this.audios.push(this.createAudio(background.src, .12, true));
    const tracks = this.audios;
    this.currentId = recording.id;
    main.addEventListener('ended',() => this.finish(main),{ once:true });
    if (options.canvas) this.connect(main,options.canvas,options.pan ?? 0);
    await this.context?.resume().catch(() => undefined);
    await Promise.all(tracks.map((audio) => audio.play().catch(() => undefined)));
    if (tracks !== this.audios) return;
    this.emit();
    await this.fade(tracks,1,FADE_IN_MS);
  }

  async playOrToggle(recording: Recording, options: { canvas?: HTMLCanvasElement | null; pan?: number; backgrounds?: Recording[] } = {}): Promise<void> {
    if (this.currentId === recording.id && this.audios.length) await this.toggle();
    else await this.play(recording,options);
  }

  async toggle(): Promise<void> {
    if (!this.audios.length) return;
    const tracks = this.audios;
    if (this.isPlaying) {
      await this.fade(tracks,0,FADE_OUT_MS);
      if (tracks !== this.audios) return;
      tracks.forEach((audio) => audio.pause());
      this.emit();
      return;
    }
    tracks.forEach((audio) => { audio.volume = 0; });
    await this.context?.resume().catch(() => undefined);
    await Promise.all(tracks.map((audio) => audio.play().catch(() => undefined)));
    if (tracks !== this.audios) return;
    this.emit();
    await this.fade(tracks,1,FADE_IN_MS);
  }

  setRate(rate: number): void {
    this.rate = rate;
    this.audios.forEach((audio) => { audio.playbackRate = rate; audio.preservesPitch = true; });
  }

  setLoop(loop: boolean): void {
    this.looping = loop;
    if (this.audios[0]) this.audios[0].loop = loop;
  }

  stop(): void {
    cancelAnimationFrame(this.frame);
    const tracks = this.audios;
    this.audios = []; this.currentId = null; this.analyser = null;
    this.emit();
    void this.fade(tracks,0,FADE_OUT_MS).then(() => {
      for (const audio of tracks) { audio.pause(); audio.currentTime = 0; }
    });
  }

  private createAudio(src: string, volume: number, loop: boolean): HTMLAudioElement {
    const audio = new Audio(src); audio.preload = 'auto'; audio.volume = 0; audio.loop = loop || this.looping;
    this.volumes.set(audio,volume);
    audio.playbackRate = this.rate; audio.preservesPitch = true;
    return audio;
  }

  private finish(main: HTMLAudioElement): void {
    if (this.audios[0] !== main || main.loop) return;
    cancelAnimationFrame(this.frame);
    const backgrounds = this.audios.slice(1);
    this.audios = []; this.currentId = null; this.analyser = null;
    this.emit();
    void this.fade(backgrounds,0,FADE_OUT_MS).then(() => backgrounds.forEach((audio) => audio.pause()));
  }

  private async fade(tracks: HTMLAudioElement[], factor: number, duration: number): Promise<void> {
    if (!tracks.length) return;
    const starts = tracks.map((audio) => audio.volume);
    const steps = 5;
    for (let step = 1; step <= steps; step += 1) {
      await new Promise((resolve) => setTimeout(resolve,duration/steps));
      const progress = step/steps;
      tracks.forEach((audio,index) => {
        const target = (this.volumes.get(audio) ?? 1) * factor;
        audio.volume = Math.max(0,Math.min(1,(starts[index] ?? 0) + (target-(starts[index] ?? 0))*progress));
      });
    }
  }

  private emit(): void {
    this.listener?.({ recordingId:this.currentId, playing:this.isPlaying, paused:Boolean(this.audios.length && !this.isPlaying) });
  }

  private connect(audio: HTMLAudioElement, canvas: HTMLCanvasElement, pan: number): void {
    if (!window.AudioContext) return;
    try {
      this.context ??= new AudioContext();
      const source = this.context.createMediaElementSource(audio);
      const analyser = this.context.createAnalyser(); analyser.fftSize = 256;
      if (this.context.createStereoPanner) {
        const panner = this.context.createStereoPanner(); panner.pan.value = pan;
        source.connect(panner); panner.connect(analyser);
      } else source.connect(analyser);
      analyser.connect(this.context.destination); this.analyser = analyser;
      this.draw(canvas);
    } catch { this.analyser = null; }
  }

  private draw(canvas: HTMLCanvasElement): void {
    if (!this.analyser || !canvas.isConnected) return;
    const context = canvas.getContext('2d'); if (!context) return;
    const ratio = window.devicePixelRatio || 1;
    const width = Math.max(240,canvas.clientWidth) * ratio; const height = Math.max(70,canvas.clientHeight) * ratio;
    if (canvas.width !== width || canvas.height !== height) { canvas.width=width; canvas.height=height; }
    const values = new Uint8Array(this.analyser.frequencyBinCount); this.analyser.getByteFrequencyData(values);
    context.clearRect(0,0,width,height);
    const bars=48; const gap=width/bars;
    for (let index=0; index<bars; index += 1) {
      const level=(values[index] ?? 0)/255; const bar=4+level*height*.88;
      context.fillStyle=`rgba(199,240,111,${.24+level*.76})`;
      context.fillRect(index*gap,height-bar,Math.max(2,gap-3),bar);
    }
    this.frame=requestAnimationFrame(() => this.draw(canvas));
  }
}
