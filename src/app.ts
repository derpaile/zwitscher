import { registerSW } from './core/pwa';
import { courses, courseById } from './data/courses';
import { species, speciesById } from './data/species';
import { AudioEngine, type AudioPlaybackState } from './core/audio';
import { loadMediaManifest, recordingFor, recordingsFor } from './core/media';
import { OfflineInstaller, offlineSummary } from './core/offline';
import { isCourseCompleted, rankedConfusionIds, recommendedContrast } from './core/progress';
import { navigate, parseRoute, type Route } from './core/router';
import { applyReviewAnswer, emptyReview, isDue, markExposure, masteryFromStep, reviewKey, reviewWeight } from './core/scheduler';
import {
  createBackup, hasLegacyData, loadProfile, loadReviews, loadSessions, resetLegacyData, restoreBackup,
  saveProfile, saveReview, saveSession,
} from './core/storage';
import { birdIllustration, escapeHtml, formatBytes, masteryBadge, seededRandom, shuffle, todayKey } from './ui/components';
import type {
  AnswerEvent, Course, GameMode, LessonPhase, MediaManifest, OfflineState, Profile,
  Recording, ReviewItem, SessionResult, Species, VoiceType,
} from './types';

interface GameItem { species: Species; recording: Recording; voiceType: VoiceType; options: Species[]; }
interface ActiveGame {
  kind: SessionResult['kind']; mode?: GameMode; course?: Course; phase?: LessonPhase; habitat?: string;
  items: GameItem[]; index: number; answers: AnswerEvent[]; startedAt: number; questionStartedAt: number;
  score: number; streak: number; bestStreak: number; lives: number; timeLeft: number; hintStep: number;
  answered: boolean; hintUsed: boolean; typed: boolean; requeued: Set<string>;
}

const MODES: Record<GameMode,{label:string;icon:string;description:string}> = {
  classic:{label:'Freie Runde',icon:'♪',description:'Acht Stimmen mit frei wählbarem Lauttyp.'},
  adaptive:{label:'Lerntrainer',icon:'↻',description:'Fällige und unsichere Stimmen gezielt wiederholen.'},
  dawn:{label:'Morgendämmerung',icon:'◒',description:'In 90 Sekunden möglichst viele Stimmen erkennen.'},
  survival:{label:'Überleben',icon:'♥',description:'Drei Fehler sind erlaubt.'},
  soundscape:{label:'Klanglandschaft',icon:'≋',description:'Die führende Stimme aus einem kleinen Chor hören.'},
  clue:{label:'Spurenleser',icon:'?',description:'Nur aus Lebensraum und Hinweisen bestimmen.'},
};
const PHASE_INFO: Record<LessonPhase,{label:string;icon:string;description:string}> = {
  learn:{label:'Kennenlernen',icon:'01',description:'Arten, Stimmen und Merksätze entdecken.'},
  duel:{label:'Zwei Arten',icon:'02',description:'Ähnliche Stimmen direkt unterscheiden.'},
  choice:{label:'Vierer-Auswahl',icon:'03',description:'Eine Stimme aus vier Möglichkeiten erkennen.'},
  recall:{label:'Freie Bestimmung',icon:'04',description:'Den Namen ohne Auswahl eingeben.'},
  exam:{label:'Kursprüfung',icon:'✓',description:'Zehn Aufgaben ohne Hinweise lösen.'},
};

const audio = new AudioEngine();
const installer = new OfflineInstaller();
let view: HTMLElement;
let profile: Profile;
let reviews = new Map<string,ReviewItem>();
let sessions: SessionResult[] = [];
let manifest: MediaManifest;
let offline: OfflineState;
let game: ActiveGame | null = null;
let timer: number | null = null;

audio.onStateChange(syncAudioControls);

function syncAudioControls(state: AudioPlaybackState): void {
  document.querySelectorAll<HTMLButtonElement>('button[data-audio-id]').forEach((button) => {
    const active = button.dataset.audioId === state.recordingId;
    const playing = active && state.playing;
    button.classList.toggle('playing',playing);
    button.setAttribute('aria-pressed',String(playing));
    const icon = button.querySelector<HTMLElement>('[data-play-icon]');
    if (icon) icon.textContent = playing ? '‖' : '▶';
  });
  const stage=document.querySelector<HTMLElement>('#audio-stage');
  const activeStage=stage?.dataset.audioId===state.recordingId;
  stage?.classList.toggle('playing',Boolean(activeStage&&state.playing));
  stage?.classList.toggle('paused',Boolean(activeStage&&state.paused));
  const status=stage?.querySelector<HTMLElement>('[data-play-status]');
  if(status)status.textContent=activeStage?(state.playing?'Wird abgespielt':state.paused?'Pausiert':'Tippen zum Hören'):'Tippen zum Hören';
  document.querySelector('#sound-button')?.classList.toggle('muted',!state.playing);
}

export async function startApp(): Promise<void> {
  view = document.querySelector<HTMLElement>('#view')!;
  bindGlobalNavigation();
  applyAtmosphere();
  registerSW({ immediate:true });
  if (await hasLegacyData() && localStorage.getItem('zwitscher-v2-reset-complete') !== '1') { renderMigration(); return; }
  await boot();
}

async function boot(): Promise<void> {
  try {
    [profile,manifest,offline,sessions] = await Promise.all([loadProfile(),loadMediaManifest(),offlineSummary(),loadSessions()]);
    reviews = new Map((await loadReviews()).map((item) => [item.key,item]));
    applySettings();
    window.addEventListener('hashchange',() => void renderRoute(parseRoute()));
    await renderRoute(parseRoute());
  } catch (error) {
    view.innerHTML=`<section class="fatal"><p class="eyebrow">Start fehlgeschlagen</p><h1>Zwitscher konnte nicht geladen werden.</h1><p>${escapeHtml(error instanceof Error?error.message:String(error))}</p><button class="primary" onclick="location.reload()">Neu laden</button></section>`;
  }
}

function bindGlobalNavigation(): void {
  document.addEventListener('click',(event) => {
    const target=(event.target as HTMLElement).closest<HTMLElement>('[data-route]');
    if (target?.dataset.route) navigate(target.dataset.route);
  });
  document.querySelector('#home-button')?.addEventListener('click',() => navigate(''));
  document.querySelector('#stats-button')?.addEventListener('click',() => navigate('stats'));
  document.querySelector('#collection-button')?.addEventListener('click',() => navigate('book'));
  document.querySelector('#settings-button')?.addEventListener('click',() => navigate('settings'));
  document.querySelector('#sound-button')?.addEventListener('click',() => {
    void audio.toggle();
  });
}

function renderMigration(): void {
  view.innerHTML=`<section class="migration-screen"><div class="migration-art">${birdIllustration(speciesById.get('rotkehlchen')!)}</div><div><p class="eyebrow">Willkommen bei Zwitscher 2</p><h1>Ein neuer Lernweg beginnt.</h1><p>Das neue Kurssystem verwendet ein grundlegend anderes Lernmodell. Wie festgelegt werden der bisherige Lernstand und alte Offline-Pakete vollständig gelöscht.</p><div class="warning-box"><strong>Dieser Schritt ist endgültig.</strong><span>Nach dem Neustart beginnt Zwitscher mit einem leeren Profil.</span></div><button class="primary" id="confirm-reset">Version 2 neu starten</button></div></section>`;
  document.querySelector('#confirm-reset')?.addEventListener('click',async (event) => {
    const button=event.currentTarget as HTMLButtonElement; button.disabled=true; button.textContent='Lokale Daten werden gelöscht …';
    await resetLegacyData(); await boot();
  });
}

async function renderRoute(route: Route): Promise<void> {
  audio.stop(); clearGameTimer(); updateNavigation(route.name);
  if (route.name==='home') return renderHome();
  if (route.name==='course') return renderCourse(route.id);
  if (route.name==='lesson') return startCoursePhase(route.courseId,route.phase as LessonPhase);
  if (route.name==='placement') return startPlacement();
  if (route.name==='mode') return route.id ? startMode(route.id as GameMode) : renderModeSelect();
  if (route.name==='book') return renderBook();
  if (route.name==='species') return renderSpecies(route.id);
  if (route.name==='compare') return renderCompare(route.first,route.second);
  if (route.name==='stats') return renderStats();
  if (route.name==='settings') return renderSettings();
}

function updateNavigation(name: Route['name']): void {
  const map:Record<string,string>={stats:'stats-button',book:'collection-button',species:'collection-button',settings:'settings-button'};
  document.querySelectorAll('.top-actions button').forEach((button)=>button.classList.remove('active'));
  if(map[name]) document.querySelector(`#${map[name]}`)?.classList.add('active');
}

function applySettings(): void {
  document.documentElement.dataset.text=profile.settings.largeText?'large':'normal';
  document.body.dataset.weather=profile.settings.weather;
  document.body.classList.toggle('high-contrast',profile.settings.contrast);
  document.body.classList.toggle('reduce-motion',profile.settings.reducedMotion);
}

function applyAtmosphere(habitat='garden'): void {
  const hour=new Date().getHours();
  document.body.dataset.time=hour<7?'dawn':hour<18?'day':hour<22?'dusk':'night';
  document.body.dataset.habitat=habitat;
}

function setView(html: string): void {
  view.innerHTML=html;
  view.querySelectorAll<HTMLImageElement>('img').forEach((image)=>image.addEventListener('error',()=>{image.hidden=true;const fallback=image.nextElementSibling as HTMLElement|null;if(fallback)fallback.style.display='grid';},{once:true}));
  window.scrollTo({top:0,behavior:profile?.settings.reducedMotion?'auto':'smooth'});
}
function showToast(message: string): void { const toast=document.querySelector('#toast')!; toast.textContent=message; toast.classList.add('visible'); window.setTimeout(()=>toast.classList.remove('visible'),2800); }

function masteryFor(speciesId: string, voiceType: VoiceType | 'mixed'='mixed'): ReturnType<typeof masteryFromStep> {
  const items=[...reviews.values()].filter((item)=>item.speciesId===speciesId && (voiceType==='mixed'||item.voiceType===voiceType));
  return masteryFromStep(items.length?Math.max(...items.map((item)=>item.step)):0);
}

function dueReviews(): ReviewItem[] { return [...reviews.values()].filter((item)=>isDue(item)).sort((a,b)=>a.dueAt-b.dueAt); }
function accuracy(): number { return profile.totalAnswers?Math.round(profile.totalCorrect/profile.totalAnswers*100):0; }
function courseComplete(course: Course): boolean {
  return isCourseCompleted(profile.courseProgress[course.id]?.examBest??0,course.speciesIds.map((id)=>masteryFor(id,course.voiceType).level));
}

function offlineCard(): string {
  if (offline.ready) return `<aside class="offline-ready"><span>✓</span><div><strong>Vollständig offline</strong><small>${manifest.recordings.length} Stimmen und ${manifest.photos.length} Fotos installiert</small></div></aside>`;
  const percent=offline.total?Math.round(offline.cached.length/offline.total*100):0;
  const remaining=Math.max(0,offline.totalBytes-(offline.downloadedBytes??0));
  return `<aside class="setup-card" id="setup-card"><div><p class="eyebrow">Einmalige Einrichtung</p><h2>Die ganze Vogelwelt offline</h2><p>${formatBytes(offline.totalBytes)} hochwertige Stimmen und Fotos. Der Download kann jederzeit fortgesetzt werden.</p><div class="download-progress"><i id="download-bar" style="width:${percent}%"></i></div><small id="download-status">${offline.cached.length}/${offline.total} Dateien · noch ${formatBytes(remaining)}${offline.failed.length?` · ${offline.failed.length} fehlgeschlagen`:''}</small>${offline.failed.length?`<details class="failed-files"><summary>Fehlerhafte Dateien anzeigen</summary>${offline.failed.map((url)=>`<code>${escapeHtml(url)}</code>`).join('')}</details>`:''}</div><div class="setup-actions"><button class="primary" id="install-media">${offline.cached.length?'Fortsetzen':'Alles installieren'}</button><button class="ghost hidden" id="pause-media">Pausieren</button></div></aside>`;
}

function renderHome(): void {
  game=null; applyAtmosphere();
  const due=dueReviews().length;
  const recognized=species.filter((bird)=>masteryFor(bird.id).level>=2).length;
  const recommended=courseById.get(profile.recommendedCourseId)??courses[0]!;
  const courseIndex=courses.findIndex((course)=>course.id===recommended.id);
  const todayAnswers=sessions.filter((session)=>todayKey(new Date(session.finishedAt))===todayKey()).reduce((sum,session)=>sum+session.answers.length,0);
  const last=[...sessions].sort((a,b)=>b.finishedAt-a.finishedAt)[0];
  const contrast=recommendedContrast(profile.confusions);
  setView(`<div class="home-v2"><section class="home-hero"><div><p class="eyebrow">Dein Ohr wird zum Fernglas</p><h1>Höre, was<br><em>draußen lebt.</em></h1><p>Ein geführter Lernpfad für 60 heimische Arten – mit echten Stimmen, Feldfotos und Wiederholungen zur richtigen Zeit.</p><div class="hero-actions"><button class="primary" data-route="course/${recommended.id}">Weiter bei Kurs ${courseIndex+1}</button><button class="ghost" data-route="mode/adaptive">${due?`${due} fällige Stimmen`:'Lerntrainer starten'} →</button></div><div class="metric-row"><div><strong>${recognized}/60</strong><span>Arten erkannt</span></div><div><strong>${accuracy()}%</strong><span>Trefferquote</span></div><div><strong>${profile.dailyStreak}</strong><span>Tagesserie</span></div></div></div><aside class="hero-bird"><div class="sun"></div>${birdIllustration(speciesById.get('rotkehlchen')!)}<span>Heute draußen</span><strong>${todayKey()}</strong></aside></section>
    ${offlineCard()}
    <section class="path-section"><div class="section-head"><div><p class="eyebrow">Geführter Lernpfad</p><h2>Von vertraut bis feldbereit</h2></div><button class="text-button" data-route="placement">Einstufungstest starten →</button></div><div class="course-path">${courses.map((course,index)=>courseCard(course,index)).join('')}</div></section>
    <section class="home-panels"><article><span class="panel-icon">↻</span><div><p class="eyebrow">Heute wiederholen</p><h2>${due?`${due} Stimmen sind fällig`:'Alles im grünen Bereich'}</h2><p>${due?'Kurze Wiederholungen festigen, was sonst verblasst.':'Neue Lektionen werden später automatisch wieder fällig.'}</p></div><button class="ghost" data-route="mode/adaptive">Trainieren</button></article><article><span class="panel-icon">☀</span><div><p class="eyebrow">Tagesziel · ${Math.min(todayAnswers,profile.dailyGoal)}/${profile.dailyGoal}</p><h2>Stimme des Tages</h2><p>${last?`Zuletzt: ${sessionLabel(last)}.`:'Fünf deterministische Aufgaben für deinen Lernrhythmus.'}</p></div><button class="ghost" id="home-daily">Starten</button></article><article><span class="panel-icon">♪</span><div><p class="eyebrow">Freies Spiel</p><h2>Sechs Spielmodi</h2><p>Zeitrunde, Überleben, Klanglandschaft und mehr.</p></div><button class="ghost" data-route="mode">Modi öffnen</button></article>${contrast?`<article><span class="panel-icon">A/B</span><div><p class="eyebrow">Automatischer Kontrast</p><h2>${speciesById.get(contrast[0]!)?.name} oder ${speciesById.get(contrast[1]!)?.name}?</h2><p>Diese Stimmen wurden mehrfach verwechselt.</p></div><button class="ghost" data-route="compare/${contrast[0]}/${contrast[1]}">Vergleichen</button></article>`:''}</section>
  </div>`);
  bindOfflineInstaller();
  document.querySelector('#home-daily')?.addEventListener('click',()=>void startDaily());
}

function courseCard(course: Course,index: number): string {
  const progress=profile.courseProgress[course.id]!; const complete=courseComplete(course); const current=course.id===profile.recommendedCourseId;
  const levels=course.speciesIds.map((id)=>masteryFor(id,course.voiceType).level); const learned=levels.filter((level)=>level>=2).length;
  return `<button class="course-card ${complete?'complete':''} ${current?'current':''}" data-route="course/${course.id}"><span class="course-number">${complete?'✓':String(index+1).padStart(2,'0')}</span><span class="course-icon">${course.icon}</span><span class="course-copy"><small>${current?'Empfohlen':complete?'Abgeschlossen':`${course.speciesIds.length} Arten`}</small><strong>${course.title}</strong><em>${course.subtitle}</em><span class="micro-progress"><i style="width:${learned/course.speciesIds.length*100}%"></i></span></span><span class="course-score">${Math.round(progress.examBest*100)}%</span></button>`;
}

function bindOfflineInstaller(): void {
  const install=document.querySelector<HTMLButtonElement>('#install-media'); const pause=document.querySelector<HTMLButtonElement>('#pause-media');
  if(!install||!pause)return;
  install.addEventListener('click',async()=>{
    install.disabled=true; install.textContent='Wird installiert …'; pause.classList.remove('hidden');
    try {
      offline=await installer.install((state)=>{
        offline=state; const percent=Math.round(state.cached.length/state.total*100);
        const bar=document.querySelector<HTMLElement>('#download-bar'); const label=document.querySelector('#download-status');
        if(bar)bar.style.width=`${percent}%`; if(label)label.textContent=`${state.cached.length}/${state.total} Dateien · noch ${formatBytes(Math.max(0,state.totalBytes-state.downloadedBytes))}${state.failed.length?` · ${state.failed.length} fehlgeschlagen`:''}`;
      });
      if(offline.ready){showToast('Zwitscher ist vollständig offline verfügbar.');renderHome();}
      else {install.disabled=false;install.textContent=offline.failed.length?'Fehlerhafte Dateien erneut versuchen':'Fortsetzen';pause.classList.add('hidden');}
    }catch(error){install.disabled=false;install.textContent='Erneut versuchen';pause.classList.add('hidden');showToast(error instanceof Error?error.message:'Download fehlgeschlagen');}
  });
  pause.addEventListener('click',()=>{installer.pause();pause.disabled=true;pause.textContent='Wird pausiert …';});
}

function renderCourse(id: string): void {
  game=null; const course=courseById.get(id); if(!course){navigate('');return;}
  applyAtmosphere(course.habitat==='mixed'?'garden':course.habitat);
  const progress=profile.courseProgress[id]!; const recognized=course.speciesIds.filter((birdId)=>masteryFor(birdId,course.voiceType).level>=2).length;
  setView(`<div class="page"><button class="back" data-route="">← Lernpfad</button><header class="course-hero"><span>${course.icon}</span><div><p class="eyebrow">Kurs ${course.order} · ${course.speciesIds.length} Arten</p><h1>${course.title}</h1><p>${course.subtitle}</p><div class="course-overview"><strong>${recognized}/${course.speciesIds.length} erkannt</strong><strong>${Math.round(progress.examBest*100)}% Prüfungsbestwert</strong></div></div></header>
    <section class="lesson-list"><div class="section-head"><div><p class="eyebrow">Fünf Lernphasen</p><h2>Schritt für Schritt hören</h2></div><span>Alle Phasen sind frei zugänglich</span></div>${course.lessonPhases.map((phase,index)=>{const info=PHASE_INFO[phase];const done=progress.completedPhases.includes(phase);return `<button class="lesson-row ${done?'done':''}" data-route="course/${course.id}/${phase}"><b>${done?'✓':info.icon}</b><span><strong>${info.label}</strong><small>${info.description}</small></span><em>${phase==='exam'&&progress.examBest?`${Math.round(progress.examBest*100)}%`:'Starten →'}</em></button>`;}).join('')}</section>
    <section class="course-species"><div class="section-head"><div><p class="eyebrow">In diesem Kurs</p><h2>Die Arten</h2></div></div><div class="species-strip">${course.speciesIds.map((birdId)=>{const bird=speciesById.get(birdId)!;const mastery=masteryFor(bird.id,course.voiceType);return `<button data-route="species/${bird.id}"><img src="${bird.photo}" alt="${escapeHtml(bird.name)}" onerror="this.hidden=true"><span>${birdIllustration(bird)}</span><strong>${bird.name}</strong><small>${mastery.label}</small></button>`;}).join('')}</div></section></div>`);
}

function renderModeSelect(): void {
  game=null; setView(`<div class="page"><header class="page-head"><div><p class="eyebrow">Freies Spiel</p><h1>Wie möchtest du hören?</h1><p>Die freien Modi verwenden dieselben Stimmen und stärken denselben Lernstand wie die Kurse.</p></div><button class="back" data-route="">← Startseite</button></header><div class="mode-grid">${Object.entries(MODES).map(([id,mode])=>`<button class="mode-card" data-route="mode/${id}"><span>${mode.icon}</span><strong>${mode.label}</strong><p>${mode.description}</p><em>Starten →</em></button>`).join('')}</div><section class="special-games"><article><span>☀</span><div><p class="eyebrow">Jeden Tag neu</p><h2>Stimme des Tages</h2><p>Fünf für alle identische Aufgaben mit wachsender Tagesserie.</p></div><button class="primary" id="daily-game">Starten</button></article><div class="section-head"><div><p class="eyebrow">Lebensräume</p><h2>Expeditionen</h2></div></div><div class="expedition-grid">${[['garden','⌂','Garten'],['forest','♟','Wald'],['field','⌁','Feld'],['reed','≋','Schilf']].map(([id,icon,label])=>`<button data-expedition="${id}"><span>${icon}</span><strong>${label}</strong><small>10 Stimmen</small></button>`).join('')}</div></section></div>`);
  document.querySelector('#daily-game')?.addEventListener('click',()=>void startDaily());
  document.querySelectorAll<HTMLElement>('[data-expedition]').forEach((button)=>button.addEventListener('click',()=>void startExpedition(button.dataset.expedition!)));
}

function eligibleSpecies(habitat?: string): Species[] {
  const month=new Date().getMonth()+1;
  let pool=species.filter((bird)=>!habitat||habitat==='mixed'||bird.habitats.includes(habitat as Species['habitats'][number]));
  if(profile.settings.region!=='all')pool=pool.filter((bird)=>bird.regions.includes(profile.settings.region as 'north'|'central'|'south'));
  if(profile.settings.seasonal)pool=pool.filter((bird)=>bird.activeMonths.includes(month));
  return pool.length>=4?pool:species;
}

function getReview(speciesId: string,voiceType: VoiceType): ReviewItem {
  return reviews.get(reviewKey(speciesId,voiceType))??emptyReview(speciesId,voiceType);
}

function pickVoiceType(bird: Species,requested: VoiceType|'mixed',index: number): VoiceType {
  if(requested!=='mixed'&&bird.voiceTypes.includes(requested))return requested;
  return bird.voiceTypes[index%bird.voiceTypes.length]??bird.voiceTypes[0]??'song';
}

function optionSet(correct: Species,count: 2|4,pool: Species[],random=Math.random): Species[] {
  const learned=rankedConfusionIds(correct.id,profile.confusions);
  const preferred=[...new Set([...learned,...correct.confusions])].map((id)=>speciesById.get(id)).filter((bird):bird is Species=>Boolean(bird));
  const rest=shuffle(pool.filter((bird)=>bird.id!==correct.id&&!preferred.some((item)=>item.id===bird.id)),random);
  return shuffle([correct,...preferred,...rest].slice(0,count),random);
}

async function createItems(pool: Species[],count: number,voiceType: VoiceType|'mixed',phase: LessonPhase|'game',random=Math.random): Promise<GameItem[]> {
  const shuffled=shuffle(pool,random); const chosen:Array<Species>=[];
  while(chosen.length<count)chosen.push(...shuffle(shuffled,random));
  return Promise.all(chosen.slice(0,count).map(async(bird,index)=>{
    const type=pickVoiceType(bird,voiceType,index); const recording=await recordingFor(bird.id,type,random());
    const optionCount=phase==='duel'?2:4;
    return {species:bird,recording,voiceType:type,options:optionSet(bird,optionCount,pool,random)};
  }));
}

async function startCoursePhase(courseId: string,phase: LessonPhase): Promise<void> {
  const course=courseById.get(courseId); if(!course||!PHASE_INFO[phase]){navigate(`course/${courseId}`);return;}
  const pool=course.speciesIds.map((id)=>speciesById.get(id)).filter((bird):bird is Species=>Boolean(bird));
  const count=phase==='learn'?pool.length:phase==='exam'?10:Math.max(8,pool.length);
  const items=await createItems(pool,count,course.voiceType,phase);
  beginGame({kind:'course',course,phase,items,typed:phase==='recall'});
}

async function startPlacement(): Promise<void> {
  const random=seededRandom('zwitscher-placement-v2');
  const items=await createItems(species,20,'mixed','game',random);
  beginGame({kind:'placement',items,typed:false});
}

async function startMode(mode: GameMode): Promise<void> {
  if(!MODES[mode]){renderModeSelect();return;}
  let pool=eligibleSpecies(); let count=8; let kind:SessionResult['kind']='mode';
  if(mode==='adaptive'){
    kind='review'; const due=dueReviews();
    if(due.length)pool=[...new Set(due.map((item)=>item.speciesId))].map((id)=>speciesById.get(id)!).filter(Boolean);
    else pool=[...species].sort((a,b)=>reviewWeight(getReview(b.id,b.voiceTypes[0]??'song'))-reviewWeight(getReview(a.id,a.voiceTypes[0]??'song'))).slice(0,12);
  }
  if(mode==='dawn'||mode==='survival')count=30;
  const items=await createItems(pool,count,'mixed','game');
  beginGame({kind,mode,items,typed:false});
}

async function startDaily(): Promise<void> {
  const random=seededRandom(`daily-${todayKey()}-v2`); const items=await createItems(eligibleSpecies(),5,'mixed','game',random);
  beginGame({kind:'daily',items,typed:false});
}

async function startExpedition(habitat: string): Promise<void> {
  const items=await createItems(eligibleSpecies(habitat),10,'mixed','game');
  beginGame({kind:'expedition',habitat,items,typed:false});
}

function beginGame(input: Pick<ActiveGame,'kind'|'items'|'typed'> & Partial<Pick<ActiveGame,'mode'|'course'|'phase'|'habitat'>>): void {
  game={...input,index:0,answers:[],startedAt:Date.now(),questionStartedAt:Date.now(),score:0,streak:0,bestStreak:0,lives:3,timeLeft:input.mode==='dawn'?90:0,hintStep:1,answered:false,hintUsed:false,requeued:new Set()};
  if(input.mode==='dawn')startGameTimer();
  renderGame();
}

function currentItem(): GameItem { return game!.items[game!.index]!; }

function gameTitle(): string {
  if(game?.kind==='placement')return'Einstufungstest';
  if(game?.kind==='daily')return'Stimme des Tages';
  if(game?.kind==='expedition')return'Lebensraum-Expedition';
  if(game?.course)return`${game.course.title} · ${PHASE_INFO[game.phase!].label}`;
  return game?.mode?MODES[game.mode].label:'Training';
}

function renderGame(): void {
  if(!game||!currentItem()){void finishGame();return;}
  game.questionStartedAt=Date.now(); game.answered=false; game.hintUsed=false; game.hintStep=1;
  if(game.phase==='learn'){renderLearnCard();return;}
  const item=currentItem(); const progress=Math.round(game.index/game.items.length*100); const clue=game.mode==='clue'; const exam=game.phase==='exam';
  setView(`<div class="game-page"><header class="game-header"><button class="back" data-route="${game.course?`course/${game.course.id}`:'mode'}">× Beenden</button><div><span>${game.index+1}/${game.items.length}</span><div class="game-progress"><i style="width:${progress}%"></i></div></div><strong>${game.score} P</strong></header><div class="game-meta"><span>${gameTitle()}</span>${game.mode==='dawn'?`<b id="timer">${game.timeLeft}s</b>`:''}${game.mode==='survival'?`<b aria-label="Leben">${'♥'.repeat(game.lives)}${'♡'.repeat(3-game.lives)}</b>`:''}</div>
    <main class="question-card"><div class="question-title"><p class="eyebrow">${clue?'Spuren lesen':'Ohren auf'}</p><h1>${clue?'Wer bin ich?':game.mode==='soundscape'?'Wer führt den Chor?':'Wer singt hier?'}</h1></div>
      ${clue?clueMarkup(item.species):audioStage()}
      <div class="hint-copy ${game.hintUsed?'visible':''}" id="hint-copy">${escapeHtml(item.species.songTip)}</div>
      ${game.typed||game.phase==='recall'?`<form class="recall-form" id="recall-form"><label for="recall-input">Art selbst eingeben</label><div><input id="recall-input" autocomplete="off" placeholder="Deutscher oder wissenschaftlicher Name"><button class="primary" type="submit">Prüfen</button></div></form>`:`<div class="answers">${item.options.map((bird,index)=>`<button data-answer="${bird.id}"><span>${index+1}</span>${bird.name}</button>`).join('')}</div>`}
      <footer class="question-tools">${exam?'':`<button class="tool" id="hint-button" ${clue&&game.hintStep>=3?'disabled':''}>✦ ${clue?'Nächster Hinweis':'Hinweis'}</button>`}${clue?'':`<button class="tool" id="speed-button">${audio.playbackRate===1?'1×':'0,75×'}</button><button class="tool" id="loop-button" aria-pressed="${audio.loop}">↻ Ausschnitt</button>`}<span>Serie <strong>×${game.streak}</strong></span></footer>
    </main></div>`);
  bindQuestion();
  if(!clue)void playQuestion();
}

function audioStage(): string {
  return `<div class="audio-stage" id="audio-stage" data-audio-id="${currentItem().recording.id}"><canvas id="spectrum" aria-label="Live-Frequenzbild"></canvas><button class="play-orbit" id="play-button" data-audio-id="${currentItem().recording.id}" aria-label="Vogelstimme abspielen" aria-pressed="false"><span data-play-icon>▶</span></button><p data-play-status>Tippen zum Hören</p></div>`;
}

function clueMarkup(bird: Species): string {
  const clues=[['Lebensraum',bird.habitats.map(habitatLabel).join(' · ')],['Beobachtung',bird.fact],['Klang-Merkhilfe',bird.songTip]];
  return `<div class="clue-stack"><strong>${game!.hintStep}</strong>${clues.slice(0,game!.hintStep).map(([label,text])=>`<div><span>${label}</span><p>${escapeHtml(text)}</p></div>`).join('')}</div>`;
}

function bindQuestion(): void {
  document.querySelector('#play-button')?.addEventListener('click',()=>void playQuestion(true));
  document.querySelector('#speed-button')?.addEventListener('click',(event)=>{audio.setRate(audio.playbackRate===1?.75:1);(event.currentTarget as HTMLElement).textContent=audio.playbackRate===1?'1×':'0,75×';});
  document.querySelector('#loop-button')?.addEventListener('click',(event)=>{audio.setLoop(!audio.loop);(event.currentTarget as HTMLElement).classList.toggle('active',audio.loop);});
  document.querySelector('#hint-button')?.addEventListener('click',()=>{
    if(game!.mode==='clue'){game!.hintUsed=true;game!.hintStep=Math.min(3,game!.hintStep+1);renderGame();}
    else{game!.hintUsed=true;document.querySelector('#hint-copy')?.classList.add('visible');(document.querySelector('#hint-button') as HTMLButtonElement).disabled=true;}
  });
  document.querySelectorAll<HTMLElement>('[data-answer]').forEach((button)=>button.addEventListener('click',()=>void answerQuestion(button.dataset.answer!)));
  document.querySelector('#recall-form')?.addEventListener('submit',(event)=>{event.preventDefault();void answerQuestion((document.querySelector('#recall-input') as HTMLInputElement).value,true);});
}

async function playQuestion(toggle=false): Promise<void> {
  if(!game)return; const item=currentItem(); let backgrounds:Recording[]=[];
  if(game.mode==='soundscape'){
    const other=shuffle(game.items.filter((candidate)=>candidate.species.id!==item.species.id)).slice(0,2);
    backgrounds=other.map((candidate)=>candidate.recording);
  }
  const canvas=document.querySelector<HTMLCanvasElement>('#spectrum');
  const options={canvas,pan:profile.settings.spatialAudio?(Math.random()-.5)*1.2:0,backgrounds};
  if(toggle)await audio.playOrToggle(item.recording,options);else await audio.play(item.recording,options);
}

function normalize(value: string): string { return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,''); }

async function answerQuestion(value: string,typed=false): Promise<void> {
  if(!game||game.answered)return; const item=currentItem();
  const chosen=typed?species.find((bird)=>[bird.name,bird.scientificName,bird.id].some((name)=>normalize(name)===normalize(value))):speciesById.get(value);
  const correct=chosen?.id===item.species.id; game.answered=true; audio.stop();
  const event:AnswerEvent={speciesId:item.species.id,voiceType:item.voiceType,recordingId:item.recording.id,chosenId:chosen?.id??null,correct,hintUsed:game.hintUsed,responseMs:Date.now()-game.questionStartedAt};
  game.answers.push(event);
  if(correct){const points=profile.settings.relaxed?100:Math.max(40,100+game.streak*15-(game.hintUsed?30:0));game.score+=points;game.streak+=1;game.bestStreak=Math.max(game.bestStreak,game.streak);}
  else{game.streak=0;if(game.mode==='survival')game.lives-=1;if(chosen){const key=`${item.species.id}>${chosen.id}`;profile.confusions[key]=(profile.confusions[key]??0)+1;}}
  if(game.kind!=='placement'){
    const updated=applyReviewAnswer(getReview(item.species.id,item.voiceType),correct,game.hintUsed);reviews.set(updated.key,updated);await saveReview(updated);
    profile.totalAnswers+=1;if(correct)profile.totalCorrect+=1;profile.bestStreak=Math.max(profile.bestStreak,game.bestStreak);await saveProfile(profile);
  }
  if(!correct&&game.kind!=='placement'&&!game.requeued.has(item.recording.id)){
    game.requeued.add(item.recording.id);game.items.splice(Math.min(game.index+4,game.items.length),0,item);
  }
  renderFeedback(correct,chosen);
}

function renderFeedback(correct: boolean,chosen?: Species): void {
  if(!game)return; const item=currentItem(); const mastery=masteryFor(item.species.id,item.voiceType); const review=getReview(item.species.id,item.voiceType);
  const due=review.step?new Intl.DateTimeFormat('de-DE',{dateStyle:'medium'}).format(review.dueAt):'heute';
  setView(`<div class="feedback-page"><header class="game-header"><span>${game.index+1}/${game.items.length}</span><div class="game-progress"><i style="width:${Math.round((game.index+1)/game.items.length*100)}%"></i></div><strong>${game.score} P</strong></header><article class="feedback-card ${correct?'correct':'wrong'}"><div class="feedback-photo"><img src="${item.species.photo}" alt="${escapeHtml(item.species.name)}"><span>${correct?'✓':'→'}</span></div><div class="feedback-main"><p class="eyebrow">${correct?'Richtig erkannt':chosen?`Nicht ${escapeHtml(chosen.name)}, sondern`:'Gesucht war'}</p><h1>${item.species.name}</h1><p class="latin">${item.species.scientificName}</p><p>${item.species.fact}</p><div class="memory-note"><span>♪</span><p><strong>Hörschlüssel</strong>${item.voiceType==='song'?item.species.songTip:item.species.callTip}</p></div><div class="feedback-mastery">${masteryBadge(mastery.label,mastery.level)}<span>Nächste Wiederholung: <strong>${due}</strong></span></div><div class="feedback-actions"><button class="ghost" id="feedback-play" data-audio-id="${item.recording.id}" aria-pressed="false"><span data-play-icon>▶</span> Noch einmal hören</button>${item.species.confusions[0]?`<button class="ghost" data-route="compare/${item.species.id}/${item.species.confusions[0]}">Direkt vergleichen</button>`:''}</div><p class="credit">${escapeHtml(item.recording.creator)} · ${escapeHtml(item.recording.license)} · <a href="${item.recording.sourceUrl}" target="_blank" rel="noreferrer">Quelle</a></p></div></article><button class="primary next-button" id="next-question">${game.index+1>=game.items.length||game.mode==='survival'&&game.lives<=0?'Ergebnis ansehen':'Nächste Stimme →'}</button></div>`);
  document.querySelector('#feedback-play')?.addEventListener('click',()=>void audio.playOrToggle(item.recording));
  document.querySelector('#next-question')?.addEventListener('click',()=>{if(!game)return;if(game.index+1>=game.items.length||game.mode==='survival'&&game.lives<=0)void finishGame();else{game.index+=1;renderGame();}});
}

function renderLearnCard(): void {
  if(!game)return;const item=currentItem();
  setView(`<div class="learn-page"><header class="game-header"><button class="back" data-route="course/${game.course!.id}">× Beenden</button><div><span>${game.index+1}/${game.items.length}</span><div class="game-progress"><i style="width:${Math.round(game.index/game.items.length*100)}%"></i></div></div><strong>Kennenlernen</strong></header><article class="learn-card"><div class="learn-visual"><img src="${item.species.photo}" alt="${escapeHtml(item.species.name)}"><span>${birdIllustration(item.species)}</span></div><div><p class="eyebrow">${voiceLabel(item.voiceType)}</p><h1>${item.species.name}</h1><p class="latin">${item.species.scientificName}</p><p>${item.species.fact}</p><div class="memory-note"><span>♪</span><p><strong>So klingt die Stimme</strong>${item.voiceType==='song'?item.species.songTip:item.species.callTip}</p></div><div class="learn-controls"><button class="primary" id="learn-play" data-audio-id="${item.recording.id}" aria-pressed="false"><span data-play-icon>▶</span> Stimme hören</button><button class="ghost" id="learn-next">${game.index+1>=game.items.length?'Phase abschließen':'Nächste Art →'}</button></div></div></article></div>`);
  document.querySelector('#learn-play')?.addEventListener('click',()=>void audio.playOrToggle(item.recording));
  document.querySelector('#learn-next')?.addEventListener('click',async()=>{const updated=markExposure(getReview(item.species.id,item.voiceType));reviews.set(updated.key,updated);await saveReview(updated);if(game!.index+1>=game!.items.length)void finishGame();else{game!.index+=1;renderLearnCard();}});
}

async function finishGame(): Promise<void> {
  if(!game)return;clearGameTimer();audio.stop();const finished=game; const correct=finished.answers.filter((answer)=>answer.correct).length;const ratio=finished.answers.length?correct/finished.answers.length:1;
  const stabilized=[...new Set(finished.answers.filter((answer)=>answer.correct&&masteryFor(answer.speciesId,answer.voiceType).level>=2).map((answer)=>speciesById.get(answer.speciesId)?.name).filter(Boolean))].slice(0,4);
  const confused=[...new Set(finished.answers.filter((answer)=>!answer.correct&&answer.chosenId).map((answer)=>`${speciesById.get(answer.speciesId)?.name} ↔ ${speciesById.get(answer.chosenId!)?.name}`))].slice(0,3);
  const nextReview=[...reviews.values()].filter((item)=>item.step>0).sort((a,b)=>a.dueAt-b.dueAt)[0];
  const result:SessionResult={id:crypto.randomUUID(),kind:finished.kind,mode:finished.mode,courseId:finished.course?.id,phase:finished.phase,startedAt:finished.startedAt,finishedAt:Date.now(),score:finished.score,answers:finished.answers};
  await saveSession(result);sessions.push(result);
  if(finished.kind==='placement'){
    const index=Math.min(courses.length-1,Math.floor(ratio*courses.length));profile.placementCourseId=courses[index]!.id;profile.recommendedCourseId=courses[index]!.id;
  }
  if(finished.course&&finished.phase){
    const progress=profile.courseProgress[finished.course.id]!;
    if(!progress.completedPhases.includes(finished.phase))progress.completedPhases.push(finished.phase);
    if(finished.phase==='exam')progress.examBest=Math.max(progress.examBest,ratio);
    progress.completed=courseComplete(finished.course);
    if(progress.completed){const next=courses[finished.course.order];if(next)profile.recommendedCourseId=next.id;}
  }
  if(finished.kind==='daily')updateDailyStreak();
  unlockAchievements();await saveProfile(profile);game=null;
  const title=finished.kind==='placement'?'Dein Einstieg steht fest':ratio>=.8?'Stark hingehört!':ratio>=.5?'Guter Fortschritt':'Weiter lauschen';
  const route=finished.kind==='placement'?`course/${profile.recommendedCourseId}`:finished.course?`course/${finished.course.id}`:'mode';
  setView(`<section class="result-page"><div class="result-bird">${birdIllustration(species[(correct+7)%species.length]!)}</div><p class="eyebrow">${finished.kind==='placement'?'Einstufung abgeschlossen':'Sitzung abgeschlossen'}</p><h1>${title}</h1><p>${finished.kind==='placement'?`Wir empfehlen dir den Einstieg bei „${courseById.get(profile.recommendedCourseId)?.title}“. Der Test verändert deinen Lernstand nicht.`:'Fehler sind als gezielte Wiederholungen vorgemerkt. Jede sichere Antwort verlängert das Erinnerungsintervall.'}</p><div class="result-metrics"><div><strong>${correct}/${finished.answers.length}</strong><span>richtig</span></div><div><strong>${Math.round(ratio*100)}%</strong><span>Trefferquote</span></div><div><strong>×${finished.bestStreak}</strong><span>beste Serie</span></div><div><strong>${dueReviews().length}</strong><span>fällig</span></div></div>${finished.kind==='placement'?'':`<div class="result-insights"><article><span>Stabiler geworden</span><strong>${stabilized.length?stabilized.join(', '):'Noch im Aufbau'}</strong></article><article><span>Gezielt wiederholen</span><strong>${confused.length?confused.join(' · '):'Keine neue Verwechslung'}</strong></article><article><span>Nächste Wiederholung</span><strong>${nextReview?new Intl.DateTimeFormat('de-DE',{dateStyle:'medium'}).format(nextReview.dueAt):'Nach der nächsten Lektion'}</strong></article></div>`}<div class="result-actions"><button class="primary" data-route="${route}">${finished.kind==='placement'?'Empfohlenen Kurs öffnen':'Weiterlernen'}</button><button class="ghost" data-route="stats">Fortschritt ansehen</button><button class="ghost" data-route="">Zur Startseite</button></div></section>`);
}

function updateDailyStreak(): void {
  const today=todayKey();if(profile.lastDailyDate===today)return;const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);
  profile.dailyStreak=profile.lastDailyDate===todayKey(yesterday)?profile.dailyStreak+1:1;profile.lastDailyDate=today;
}

function unlockAchievements(): void {
  const checks:[string,boolean][]=[['erster-ruf',profile.totalCorrect>=1],['zehner-serie',profile.bestStreak>=10],['hundert',profile.totalCorrect>=100],['kurs',courses.some(courseComplete)],['feldbereit',species.filter((bird)=>masteryFor(bird.id).level>=4).length>=5],['woche',profile.dailyStreak>=7]];
  for(const [id,won]of checks)if(won&&!profile.achievements.includes(id)){profile.achievements.push(id);showToast('Neues Abzeichen erhalten');}
}

function startGameTimer(): void {
  clearGameTimer();timer=window.setInterval(()=>{if(!game)return;game.timeLeft-=1;const label=document.querySelector('#timer');if(label)label.textContent=`${game.timeLeft}s`;if(game.timeLeft<=0)void finishGame();},1000);
}
function clearGameTimer(): void { if(timer!==null){clearInterval(timer);timer=null;} }

function habitatLabel(id: string): string { return ({garden:'Garten',park:'Park & Stadt',forest:'Wald',field:'Feld & Wiese',water:'Aue & Gewässer',reed:'Schilf',mountain:'Fels & Berg'} as Record<string,string>)[id]??id; }
function voiceLabel(type: VoiceType): string { return ({song:'Gesang',call:'Ruf',alarm:'Warnruf',flight:'Flugruf',drumming:'Trommeln'} as Record<VoiceType,string>)[type]; }

function birdCard(bird: Species): string {
  const song=masteryFor(bird.id,'song');const call=masteryFor(bird.id,'call');const recordings=manifest.recordings.filter((item)=>item.speciesId===bird.id).length;
  return `<article class="bird-card" data-bird-card="${bird.id}"><button class="bird-card-open" data-route="species/${bird.id}" aria-label="${escapeHtml(bird.name)} öffnen"><div class="bird-photo"><img src="${bird.photo}" alt="${escapeHtml(bird.name)}"><span>${birdIllustration(bird)}</span></div><div class="bird-card-title"><div><h2>${bird.name}</h2><p>${bird.scientificName}</p></div><b>${recordings} ♫</b></div><p>${bird.songTip}</p><div class="voice-levels"><span>Gesang <i class="level-fill l${song.level}"></i>${song.label}</span><span>Ruf <i class="level-fill l${call.level}"></i>${call.label}</span></div></button></article>`;
}

function renderBook(): void {
  game=null;
  setView(`<div class="book-page"><header class="page-head"><div><p class="eyebrow">Dein Feldführer</p><h1>Das Vogelbuch</h1><p>60 Arten, mehrere Lauttypen und echte Feldfotos.</p></div><span class="count-pill">${species.filter((bird)=>masteryFor(bird.id).level>=1).length}/60 gehört</span></header><div class="book-tools"><input type="search" id="bird-search" aria-label="Vogelart suchen" placeholder="Art oder wissenschaftlichen Namen suchen …"><div class="chips"><button data-book-filter="all" class="active">Alle</button><button data-book-filter="garden">Garten</button><button data-book-filter="forest">Wald</button><button data-book-filter="field">Feld</button><button data-book-filter="water">Gewässer</button><button data-book-filter="due">Fällig</button></div></div><div class="bird-grid" id="bird-grid">${species.map(birdCard).join('')}</div></div>`);
  let filter='all';const update=()=>{const query=normalize((document.querySelector('#bird-search') as HTMLInputElement).value);const dueIds=new Set(dueReviews().map((item)=>item.speciesId));const result=species.filter((bird)=>(!query||normalize(`${bird.name}${bird.scientificName}`).includes(query))&&(filter==='all'||filter==='due'&&dueIds.has(bird.id)||bird.habitats.includes(filter as Species['habitats'][number])));document.querySelector('#bird-grid')!.innerHTML=result.length?result.map(birdCard).join(''):'<p class="empty">Keine Art passt zu dieser Auswahl.</p>';};
  document.querySelector('#bird-search')?.addEventListener('input',update);
  document.querySelectorAll<HTMLElement>('[data-book-filter]').forEach((button)=>button.addEventListener('click',()=>{filter=button.dataset.bookFilter!;document.querySelectorAll('[data-book-filter]').forEach((item)=>item.classList.toggle('active',item===button));update();}));
}

async function renderSpecies(id: string,selectedVoice?: VoiceType): Promise<void> {
  game=null;const bird=speciesById.get(id);if(!bird){navigate('book');return;}const allRecordings=await recordingsFor(id);const available=[...new Set(allRecordings.map((recording)=>recording.voiceType))];const voice=selectedVoice&&available.includes(selectedVoice)?selectedVoice:available[0]??'song';const shown=allRecordings.filter((recording)=>recording.voiceType===voice);const photo=manifest.photos.find((item)=>item.speciesId===id);const related=bird.confusions.map((birdId)=>speciesById.get(birdId)).filter((item):item is Species=>Boolean(item));const mastery=masteryFor(id,voice);
  setView(`<div class="page species-page"><button class="back" data-route="book">← Vogelbuch</button><section class="species-hero-v2"><div class="species-photo"><img src="${bird.photo}" alt="${escapeHtml(bird.name)}"><div>${birdIllustration(bird)}</div></div><div><p class="eyebrow">${bird.habitats.map(habitatLabel).join(' · ')} · ${bird.activeMonths.length===12?'ganzjährig':'April bis September'}</p><h1>${bird.name}</h1><p class="latin">${bird.scientificName}</p><p>${bird.fact}</p>${masteryBadge(mastery.label,mastery.level)}<div class="species-actions"><button class="primary" id="species-main-play" data-audio-id="${(shown[0]??allRecordings[0])?.id}" aria-pressed="false"><span data-play-icon>▶</span> ${voiceLabel(voice)} hören</button></div></div></section><section class="voice-section"><div class="voice-tabs">${available.map((type)=>`<button data-voice-tab="${type}" class="${type===voice?'active':''}">${voiceLabel(type)}</button>`).join('')}</div><div class="voice-detail"><article><span>♪ Hörschlüssel</span><h2>${voice==='song'?bird.songTip:bird.callTip}</h2><p>${available.length} Lauttypen und ${allRecordings.length} lokale Aufnahmen sind verfügbar.</p></article><div class="recording-list">${shown.map((recording,index)=>`<button data-recording="${recording.id}" data-audio-id="${recording.id}" aria-pressed="false"><span data-play-icon>▶</span><div><strong>Aufnahme ${index+1}</strong><small>${Math.round(recording.durationSeconds)} s · ${escapeHtml(recording.creator)}</small></div></button>`).join('')}</div></div></section>${related.length?`<section class="similar-section"><div class="section-head"><div><p class="eyebrow">Verwechslungsgefahr</p><h2>Direkt vergleichen</h2></div></div><div class="similar-grid">${related.map((other)=>`<button data-route="compare/${bird.id}/${other.id}"><img src="${other.photo}" alt=""><span>${bird.name} ↔ ${other.name}</span></button>`).join('')}</div></section>`:''}<footer class="photo-credit">Foto: ${escapeHtml(photo?.creator??'Wikimedia Commons')} · ${escapeHtml(photo?.license??'Lizenz siehe Quelle')} ${photo?`· <a href="${photo.sourceUrl}" target="_blank" rel="noreferrer">Quelle</a>`:''}</footer></div>`);
  const play=(recording:Recording)=>audio.playOrToggle(recording);
  document.querySelector('#species-main-play')?.addEventListener('click',()=>void play(shown[0]??allRecordings[0]!));
  document.querySelectorAll<HTMLElement>('[data-recording]').forEach((button)=>button.addEventListener('click',()=>{const recording=allRecordings.find((item)=>item.id===button.dataset.recording);if(recording)void play(recording);}));
  document.querySelectorAll<HTMLElement>('[data-voice-tab]').forEach((button)=>button.addEventListener('click',()=>void renderSpecies(id,button.dataset.voiceTab as VoiceType)));
}

async function renderCompare(firstId?: string,secondId?: string): Promise<void> {
  game=null;const first=speciesById.get(firstId??'zilpzalp')??species[0]!;const second=speciesById.get(secondId??first.confusions[0]??'fitis')??species[1]!;const firstRecording=await recordingFor(first.id,'mixed',0);const secondRecording=await recordingFor(second.id,'mixed',.4);
  const options=(selected:string)=>species.map((bird)=>`<option value="${bird.id}" ${bird.id===selected?'selected':''}>${bird.name}</option>`).join('');
  setView(`<div class="page compare-page"><header class="page-head"><div><p class="eyebrow">A/B-Hörtraining</p><h1>Stimmen direkt vergleichen</h1><p>Wechsle ohne Pause zwischen zwei Arten und achte auf Rhythmus, Tonhöhe und Form.</p></div><button class="back" data-route="book">← Vogelbuch</button></header><div class="compare-selects"><label>A<select id="compare-a">${options(first.id)}</select></label><span>↔</span><label>B<select id="compare-b">${options(second.id)}</select></label></div><div class="compare-grid">${[[first,firstRecording,'A'],[second,secondRecording,'B']].map(([birdValue,recordingValue,letter])=>{const bird=birdValue as Species;const recording=recordingValue as Recording;return `<article><div class="compare-photo"><img src="${bird.photo}" alt="${bird.name}"><b>${letter}</b></div><h2>${bird.name}</h2><p class="latin">${bird.scientificName}</p><button class="primary" data-compare-play="${recording.id}" data-audio-id="${recording.id}" aria-pressed="false"><span data-play-icon>▶</span> ${letter} hören</button><p><strong>Gesang:</strong> ${bird.songTip}</p><p><strong>Ruf:</strong> ${bird.callTip}</p></article>`;}).join('')}</div><div class="compare-key"><p class="eyebrow">Hörschlüssel</p><h2>Der wichtigste Unterschied</h2><p><strong>${first.name}:</strong> ${first.songTip}</p><p><strong>${second.name}:</strong> ${second.songTip}</p><button class="primary" id="compare-train">Dieses Paar trainieren</button></div></div>`);
  const recordingMap=new Map([[firstRecording.id,firstRecording],[secondRecording.id,secondRecording]]);
  document.querySelectorAll<HTMLElement>('[data-compare-play]').forEach((button)=>button.addEventListener('click',()=>void audio.playOrToggle(recordingMap.get(button.dataset.comparePlay!)!)));
  document.querySelector('#compare-a')?.addEventListener('change',(event)=>void renderCompare((event.target as HTMLSelectElement).value,second.id));
  document.querySelector('#compare-b')?.addEventListener('change',(event)=>void renderCompare(first.id,(event.target as HTMLSelectElement).value));
  document.querySelector('#compare-train')?.addEventListener('click',async()=>{const items=await createItems([first,second],8,'mixed','duel');beginGame({kind:'review',items,typed:false});});
}

function renderStats(): void {
  game=null;const levels=[0,1,2,3,4].map((level)=>species.filter((bird)=>masteryFor(bird.id).level===level).length);const confusions=Object.entries(profile.confusions).sort((a,b)=>b[1]-a[1]).slice(0,6);const recent=[...sessions].sort((a,b)=>b.finishedAt-a.finishedAt).slice(0,7);const names=['Unbekannt','Gehört','Erkannt','Sicher','Feldbereit'];
  setView(`<div class="page stats-page"><header class="page-head"><div><p class="eyebrow">Dein Lernstand</p><h1>Fortschritt</h1><p>Was sicher sitzt, was fällig ist und welche Stimmen du verwechselst.</p></div><button class="primary" data-route="mode/adaptive">${dueReviews().length} fällige Stimmen</button></header><div class="stats-metrics"><article><strong>${accuracy()}%</strong><span>Trefferquote</span></article><article><strong>${profile.totalCorrect}</strong><span>richtige Antworten</span></article><article><strong>${profile.bestStreak}</strong><span>beste Serie</span></article><article><strong>${profile.dailyStreak}</strong><span>Tagesserie</span></article></div><div class="stats-grid"><section><h2>Arten-Meisterschaft</h2><div class="mastery-bars">${levels.map((count,index)=>`<div><span>${names[index]}</span><i><b style="width:${count/species.length*100}%"></b></i><strong>${count}</strong></div>`).join('')}</div></section><section><h2>Häufig verwechselt</h2>${confusions.length?`<div class="confusion-list">${confusions.map(([key,count])=>{const[a,b]=key.split('>');return `<button data-route="compare/${a}/${b}"><span>${speciesById.get(a!)?.name} ↔ ${speciesById.get(b!)?.name}</span><strong>${count}×</strong></button>`;}).join('')}</div>`:'<p class="empty">Noch keine Verwechslungen gespeichert.</p>'}</section></div><section class="session-history"><div class="section-head"><div><p class="eyebrow">Letzte Sitzungen</p><h2>Dein Hörverlauf</h2></div></div>${recent.length?`<div class="history-list">${recent.map((session)=>{const correct=session.answers.filter((answer)=>answer.correct).length;return `<article><span>${new Intl.DateTimeFormat('de-DE',{dateStyle:'medium'}).format(session.finishedAt)}</span><strong>${sessionLabel(session)}</strong><b>${correct}/${session.answers.length}</b></article>`;}).join('')}</div>`:'<p class="empty">Noch keine Sitzung in Version 2.</p>'}</section><section class="badges"><div class="section-head"><div><p class="eyebrow">Abzeichen</p><h2>Meilensteine</h2></div></div><div>${[['erster-ruf','♪','Erster Ruf'],['zehner-serie','≈','Zehner-Serie'],['hundert','100','Hundert Treffer'],['kurs','✓','Erster Kurs'],['feldbereit','◆','Feldbereit'],['woche','◒','Sieben Tage']].map(([id,icon,label])=>`<article class="${profile.achievements.includes(id!)?'won':''}"><span>${profile.achievements.includes(id!)?icon:'·'}</span><strong>${label}</strong></article>`).join('')}</div></section></div>`);
}

function sessionLabel(session: SessionResult): string { if(session.courseId)return courseById.get(session.courseId)?.title??'Kurs';if(session.kind==='placement')return'Einstufung';if(session.kind==='daily')return'Tagesaufgabe';if(session.mode)return MODES[session.mode].label;return session.kind==='expedition'?'Expedition':'Lerntrainer'; }

function renderSettings(): void {
  game=null;const cachedPercent=offline.total?Math.round(offline.cached.length/offline.total*100):0;
  setView(`<div class="page settings-page"><header class="page-head"><div><p class="eyebrow">Dein Erlebnis</p><h1>Einstellungen</h1><p>Lernregion, Darstellung, Offline-Inhalte und lokale Sicherungen.</p></div></header><form id="settings-form" class="settings-grid"><label><span>Lernregion<small>Filtert regionalere Arten im freien Training.</small></span><select name="region"><option value="all">Deutschland gesamt</option><option value="north">Norddeutschland</option><option value="central">Mitteldeutschland</option><option value="south">Süddeutschland</option></select></label><label><span>Aktuelle Jahreszeit<small>Nur derzeit typische Stimmen auswählen.</small></span><input type="checkbox" name="seasonal"></label><label><span>Räumliches Hören<small>Stimmen leicht links oder rechts platzieren.</small></span><input type="checkbox" name="spatialAudio"></label><label><span>Entspannter Lernmodus<small>Kein Punktabzug durch Hinweise.</small></span><input type="checkbox" name="relaxed"></label><label><span>Hoher Kontrast<small>Flächen und Konturen verstärken.</small></span><input type="checkbox" name="contrast"></label><label><span>Große Schrift<small>Lesetexte und Bedienelemente vergrößern.</small></span><input type="checkbox" name="largeText"></label><label><span>Bewegung reduzieren<small>Animationen und weiche Übergänge abschalten.</small></span><input type="checkbox" name="reducedMotion"></label><label><span>Wetteratmosphäre<small>Nur visuell, ohne Einfluss auf Aufgaben.</small></span><select name="weather"><option value="still">Still</option><option value="breeze">Blätterwind</option><option value="rain">Sommerregen</option></select></label></form><section class="offline-settings"><div><p class="eyebrow">Offline-Medien</p><h2>${offline.ready?'Vollständig installiert':`${cachedPercent}% installiert`}</h2><p>${manifest.recordings.length} Stimmen und ${manifest.photos.length} Fotos · ${formatBytes(offline.totalBytes)}</p><div class="download-progress"><i id="download-bar" style="width:${cachedPercent}%"></i></div><small id="download-status">${offline.cached.length}/${offline.total} Dateien · noch ${formatBytes(Math.max(0,offline.totalBytes-(offline.downloadedBytes??0)))}${offline.failed.length?` · ${offline.failed.length} fehlgeschlagen`:''}</small></div>${offline.ready?'<span class="offline-check">✓</span>':'<div class="setup-actions"><button class="primary" id="install-media">Fortsetzen</button><button class="ghost hidden" id="pause-media">Pausieren</button></div>'}</section><section class="backup-section"><div><p class="eyebrow">Privat und lokal</p><h2>Sicherung</h2><p>Exportiere deinen Lernstand oder ersetze ihn durch eine vorhandene Sicherung.</p></div><div><button class="ghost" id="export-backup">Sicherung exportieren</button><label class="ghost file-button">Sicherung importieren<input id="import-backup" type="file" accept=".zwitscher,application/gzip"></label></div></section><details class="credits"><summary>Medienquellen und Lizenzen</summary><p>Alle Aufnahmen und Fotos wurden lokal für die Offline-Nutzung optimiert. Urheber und Lizenz jeder Datei bleiben im Medienverzeichnis erhalten.</p><div>${manifest.photos.map((photo)=>`<a href="${photo.sourceUrl}" target="_blank" rel="noreferrer">${speciesById.get(photo.speciesId)?.name}: ${escapeHtml(photo.creator)} · ${escapeHtml(photo.license)}</a>`).join('')}</div></details></div>`);
  const form=document.querySelector<HTMLFormElement>('#settings-form')!;for(const[key,value]of Object.entries(profile.settings)){const field=form.elements.namedItem(key) as HTMLInputElement|HTMLSelectElement|null;if(!field)continue;if(field instanceof HTMLInputElement&&field.type==='checkbox')field.checked=Boolean(value);else field.value=String(value);}
  form.addEventListener('change',async()=>{const data=new FormData(form);profile.settings={region:String(data.get('region')) as Profile['settings']['region'],seasonal:data.has('seasonal'),spatialAudio:data.has('spatialAudio'),relaxed:data.has('relaxed'),contrast:data.has('contrast'),largeText:data.has('largeText'),reducedMotion:data.has('reducedMotion'),weather:String(data.get('weather')) as Profile['settings']['weather']};await saveProfile(profile);applySettings();showToast('Einstellungen gespeichert');});
  bindOfflineInstaller();
  document.querySelector('#export-backup')?.addEventListener('click',async()=>{const blob=await createBackup();const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download=`zwitscher-${todayKey()}.zwitscher`;link.click();URL.revokeObjectURL(url);showToast('Sicherung erstellt');});
  document.querySelector('#import-backup')?.addEventListener('change',async(event)=>{const file=(event.target as HTMLInputElement).files?.[0];if(!file)return;if(!confirm('Die Sicherung ersetzt den aktuellen Version-2-Stand vollständig. Fortfahren?'))return;try{await restoreBackup(file);location.reload();}catch(error){showToast(error instanceof Error?error.message:'Import fehlgeschlagen');}});
}
