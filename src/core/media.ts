import type { MediaManifest, Recording, VoiceType } from '../types';
import { assetPath } from './paths';

let manifestPromise: Promise<MediaManifest> | null = null;

export function loadMediaManifest(): Promise<MediaManifest> {
  manifestPromise ??= (async () => {
    let response = await fetch(assetPath('media/manifest.json'));
    let staticRoot = false;
    if (!response.ok) {
      response = await fetch(assetPath('public/media/manifest.json'));
      staticRoot = response.ok;
    }
    if (!response.ok) throw new Error('Medienverzeichnis nicht verfügbar');
    const manifest = await response.json() as MediaManifest;
    manifest.recordings.forEach((item) => { item.src = assetPath(`${staticRoot ? 'public' : ''}${item.src}`); });
    manifest.photos.forEach((item) => { item.src = assetPath(`${staticRoot ? 'public' : ''}${item.src}`); });
    return manifest;
  })();
  return manifestPromise;
}

export async function recordingsFor(speciesId: string, voiceType: VoiceType | 'mixed' = 'mixed'): Promise<Recording[]> {
  const recordings = (await loadMediaManifest()).recordings.filter((recording) => recording.speciesId === speciesId);
  const filtered = voiceType === 'mixed' ? recordings : recordings.filter((recording) => recording.voiceType === voiceType);
  return filtered.length ? filtered : recordings;
}

export async function recordingFor(speciesId: string, voiceType: VoiceType | 'mixed', seed = Math.random()): Promise<Recording> {
  const options = await recordingsFor(speciesId,voiceType);
  const recording = options[Math.floor(seed * options.length)] ?? options[0];
  if (!recording) throw new Error(`Keine Aufnahme für ${speciesId}`);
  return recording;
}
