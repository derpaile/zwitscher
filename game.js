const HABITATS = [
  {
    id: 'garden', label: 'Garten & Stadt', icon: '⌂',
    description: 'Vertraute Stimmen direkt vor der Haustür.',
    ids: ['amsel','rotkehlchen','kohlmeise','blaumeise','zaunkoenig','buchfink','gruenfink','stieglitz','haussperling','feldsperling','star','moenchsgrasmuecke','kleiber','hausrotschwanz','ringeltaube'],
  },
  {
    id: 'forest', label: 'Wald', icon: '♟',
    description: 'Flöten, Triller und feine Rufe aus dem Blätterdach.',
    ids: ['amsel','rotkehlchen','kohlmeise','blaumeise','zaunkoenig','nachtigall','buchfink','gimpel','singdrossel','misteldrossel','moenchsgrasmuecke','zilpzalp','fitis','sommergoldhaehnchen','wintergoldhaehnchen','gartenrotschwanz','kleiber','waldbaumlaeufer','sumpfmeise','weidenmeise','haubenmeise','schwanzmeise','kuckuck'],
  },
  {
    id: 'field', label: 'Feld & Wiese', icon: '⌁',
    description: 'Offene Landschaft mit Lerchen, Ammern und Heckenbewohnern.',
    ids: ['buchfink','gruenfink','stieglitz','feldsperling','star','singdrossel','misteldrossel','wacholderdrossel','gartengrasmuecke','dorngrasmuecke','fitis','goldammer','feldlerche','kuckuck','ringeltaube'],
  },
  {
    id: 'water', label: 'Aue & Gewässer', icon: '≈',
    description: 'Stimmen aus Ufergebüsch, Bruchwald und Flussauen.',
    ids: ['rotkehlchen','zaunkoenig','nachtigall','singdrossel','wacholderdrossel','moenchsgrasmuecke','gartengrasmuecke','zilpzalp','fitis','sumpfmeise','weidenmeise','schwanzmeise','pirol','kuckuck'],
  },
];

const MODES = {
  classic: { label: 'Freie Runde', icon: '♪', rounds: 8, description: 'Acht Stimmen, Hinweise und direktes Artenwissen.' },
  adaptive: { label: 'Lerntrainer', icon: '↻', rounds: 8, description: 'Trainiert fällige und häufig verwechselte Arten.' },
  dawn: { label: 'Morgendämmerung', icon: '◒', rounds: 30, seconds: 90, description: 'Erkenne in 90 Sekunden so viele Stimmen wie möglich.' },
  survival: { label: 'Überleben', icon: '♥', rounds: 30, lives: 3, description: 'Drei Fehler sind erlaubt. Wie weit kommst du?' },
  soundscape: { label: 'Klanglandschaft', icon: '≋', rounds: 8, description: 'Höre die führende Stimme aus einem kleinen Morgenchor.' },
  clue: { label: 'Wer bin ich?', icon: '?', rounds: 8, description: 'Bestimme die Art nur aus Lebensraum und Hinweisen.' },
};

const CONFUSION_PAIRS = [
  ['zilpzalp','fitis'], ['sumpfmeise','weidenmeise'], ['sommergoldhaehnchen','wintergoldhaehnchen'],
  ['amsel','misteldrossel'], ['singdrossel','misteldrossel'], ['moenchsgrasmuecke','gartengrasmuecke'],
  ['haussperling','feldsperling'], ['hausrotschwanz','gartenrotschwanz'], ['kohlmeise','blaumeise'],
  ['waldbaumlaeufer','kleiber'], ['gruenfink','stieglitz'], ['rotkehlchen','nachtigall'],
];

const STARTER_IDS = new Set([
  'amsel','rotkehlchen','kohlmeise','blaumeise','zaunkoenig','nachtigall','buchfink','gruenfink',
  'haussperling','star','zilpzalp','goldammer','feldlerche','kleiber','pirol','kuckuck','ringeltaube',
]);
const EXPERT_IDS = new Set(CONFUSION_PAIRS.flat());
const MIGRANT_IDS = new Set(['nachtigall','gartengrasmuecke','dorngrasmuecke','fitis','pirol','kuckuck','gartenrotschwanz','hausrotschwanz']);
const SOUTH_CENTRAL_IDS = new Set(['nachtigall','pirol','sommergoldhaehnchen','gartenrotschwanz']);
const NORTH_CENTRAL_IDS = new Set(['wacholderdrossel','weidenmeise']);

const KNOWN_ALTERNATES = {
  amsel: ['Turdus merula.ogg'],
  rotkehlchen: ['120401-132827 Erithacus rubecula.ogg'],
  kohlmeise: ['Parus major.ogg'],
  blaumeise: ['Blue Tit (Cyanistes caeruleus) (W1CDR0001535 BD30).ogg'],
  nachtigall: ['Luscinia megarhynchos - Common Nightingale XC546355.mp3'],
  buchfink: ['Fringilla coelebs - Buchfink22-04.wav'],
  gruenfink: ['Carduelis chloris song.ogg'],
  fitis: ['Phylloscopus trochilus - Willow Warbler XC468919.mp3'],
  wintergoldhaehnchen: ['RegulusRegulusSongSlovakiaOlympusLS11file0212.ogg'],
  feldlerche: ['Alauda arvensis - Eurasian Skylark XC528350.mp3'],
  pirol: ['Golden oriole song.ogg'],
  kuckuck: ['Cuculus canorus song.ogg'],
};

birds.forEach((bird) => {
  bird.habitats = HABITATS.filter((habitat) => habitat.ids.includes(bird.id)).map((habitat) => habitat.id);
  bird.difficulty = STARTER_IDS.has(bird.id) ? 1 : EXPERT_IDS.has(bird.id) ? 3 : 2;
  bird.activeMonths = MIGRANT_IDS.has(bird.id) ? [4,5,6,7,8,9] : [1,2,3,4,5,6,7,8,9,10,11,12];
  bird.regions = SOUTH_CENTRAL_IDS.has(bird.id) ? ['central','south'] : NORTH_CENTRAL_IDS.has(bird.id) ? ['north','central'] : ['north','central','south'];
});

const ACHIEVEMENTS = [
  { id: 'first', icon: '♪', name: 'Erster Ruf', description: 'Die erste Stimme richtig erkannt.', test: () => progress.totalCorrect >= 1 },
  { id: 'streak5', icon: '≈', name: 'Im Fluss', description: 'Fünf Arten in Folge erkannt.', test: () => progress.longestStreak >= 5 },
  { id: 'garden8', icon: '⌂', name: 'Gartenkenner', description: 'Acht Gartenvögel mindestens erkannt.', test: () => HABITATS[0].ids.filter((id) => masteryLevel(progress.birds[id]?.xp || 0) >= 2).length >= 8 },
  { id: 'perfect', icon: '★', name: 'Waldohren', description: 'Eine komplette Runde ohne Fehler.', test: () => progress.perfectGames >= 1 },
  { id: 'explorer', icon: '⌁', name: 'Lebensraumläufer', description: 'In allen vier Lebensräumen trainiert.', test: () => HABITATS.every((h) => progress.expeditions[h.id]?.played) },
  { id: 'journal', icon: '＋', name: 'Feldnotiz', description: 'Die erste eigene Sichtung festgehalten.', test: () => progress.journal.length >= 1 },
  { id: 'fieldready', icon: '✓', name: 'Feldbereit', description: 'Fünf Arten vollständig gemeistert.', test: () => birds.filter((b) => masteryLevel(progress.birds[b.id]?.xp || 0) >= 4).length >= 5 },
  { id: 'daily7', icon: '◒', name: 'Frühaufsteher', description: 'Sieben Tagesaufgaben in Folge abgeschlossen.', test: () => progress.daily.streak >= 7 },
];

const DEFAULT_PROGRESS = {
  version: 3, learned: [], best: 0, games: 0, totalAnswers: 0, totalCorrect: 0,
  longestStreak: 0, perfectGames: 0, birds: {}, confusions: {}, achievements: [],
  expeditions: {}, daily: { streak: 0, lastCompleted: '', completed: {} }, journal: [], recordings: {},
  settings: { difficulty: 'starter', region: 'all', seasonal: false, spatial: true, relaxed: false, contrast: false, textSize: 'normal', weather: 'breeze' },
};

function loadProgress() {
  let old = {};
  try { old = JSON.parse(localStorage.getItem('zwitscher-progress') || '{}'); } catch (_) { old = {}; }
  const merged = {
    ...DEFAULT_PROGRESS, ...old,
    daily: { ...DEFAULT_PROGRESS.daily, ...(old.daily || {}) },
    settings: { ...DEFAULT_PROGRESS.settings, ...(old.settings || {}) },
    birds: old.birds || {}, confusions: old.confusions || {}, expeditions: old.expeditions || {},
    journal: Array.isArray(old.journal) ? old.journal : [], recordings: old.recordings || {},
    achievements: Array.isArray(old.achievements) ? old.achievements : [],
  };
  birds.forEach((bird) => {
    merged.birds[bird.id] = {
      seen: 0, correct: 0, wrong: 0, xp: 0, streak: 0, lastSeen: 0, nextDue: 0,
      ...(merged.birds[bird.id] || {}),
    };
  });
  return merged;
}

const progress = loadProgress();
const state = {
  view: 'home', mode: 'classic', habitat: 'all', difficulty: progress.settings.difficulty,
  round: 0, totalRounds: 8, timeLeft: 0, lives: 3, score: 0, streak: 0, bestStreak: 0,
  correct: 0, hintUsed: false, clueStep: 1, answered: false, current: null, options: [],
  deck: [], history: [], audio: null, audios: [], audioContext: null, analyser: null,
  visualFrame: null, spectrumFrames: [], recordingFile: null, timer: null, sessionActive: false,
  speed: 1, focusIds: null, dueOnly: false, lastConfig: null, muted: false,
};

const view = document.querySelector('#view');
const soundButton = document.querySelector('#sound-button');
const toast = document.querySelector('#toast');
let toastTimer;

function saveProgress() {
  progress.version = 3;
  localStorage.setItem('zwitscher-progress', JSON.stringify(progress));
}

function openJournalDatabase() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) { reject(new Error('IndexedDB unavailable')); return; }
    const request = indexedDB.open('zwitscher-media', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('recordings');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function storeJournalRecording(id, file) {
  const database = await openJournalDatabase();
  await new Promise((resolve, reject) => {
    const transaction = database.transaction('recordings', 'readwrite');
    transaction.objectStore('recordings').put(file, id);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
  database.close();
}

async function readJournalRecording(id) {
  const database = await openJournalDatabase();
  const blob = await new Promise((resolve, reject) => {
    const request = database.transaction('recordings').objectStore('recordings').get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  database.close();
  return blob;
}

async function removeJournalRecording(id) {
  if (!id) return;
  const database = await openJournalDatabase();
  await new Promise((resolve, reject) => {
    const transaction = database.transaction('recordings', 'readwrite');
    transaction.objectStore('recordings').delete(id);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
  database.close();
}

function shuffle(items, random = Math.random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function seededRandom(seedText) {
  let seed = [...seedText].reduce((value, char) => ((value << 5) - value + char.charCodeAt(0)) | 0, 2166136261);
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2800);
}

function todayKey() {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin' }).format(new Date());
}

function masteryLevel(xp) {
  if (xp >= 150) return 4;
  if (xp >= 80) return 3;
  if (xp >= 35) return 2;
  if (xp >= 1) return 1;
  return 0;
}

function masteryInfo(bird) {
  const xp = progress.birds[bird.id]?.xp || 0;
  const level = masteryLevel(xp);
  const labels = ['Unbekannt','Gehört','Erkannt','Sicher','Feldbereit'];
  const thresholds = [0,1,35,80,150,220];
  const min = thresholds[level];
  const max = thresholds[level + 1];
  const percent = level === 4 ? 100 : Math.max(5, Math.round(((xp - min) / (max - min)) * 100));
  return { xp, level, label: labels[level], percent };
}

function dueBirds() {
  const now = Date.now();
  return birds.filter((bird) => {
    const stats = progress.birds[bird.id];
    return stats.seen > 0 && stats.nextDue <= now;
  }).sort((a, b) => (progress.birds[b.id].wrong - progress.birds[a.id].wrong));
}

function getHabitat(id) {
  return HABITATS.find((habitat) => habitat.id === id);
}

function setAtmosphere(habitat = 'garden') {
  const hour = new Date().getHours();
  document.body.dataset.time = hour < 7 ? 'dawn' : hour < 18 ? 'day' : hour < 22 ? 'dusk' : 'night';
  document.body.dataset.habitat = habitat === 'all' ? 'garden' : habitat;
}

function applySettings() {
  document.body.classList.toggle('high-contrast', progress.settings.contrast);
  document.body.dataset.weather = progress.settings.weather;
  document.documentElement.dataset.textSize = progress.settings.textSize;
  state.difficulty = progress.settings.difficulty;
  updateSoundButton();
}

function birdSvg(bird, extraClass = '') {
  const [body, wing, accent, chest] = bird.colors;
  const longTail = bird.id === 'schwanzmeise' ? '<path d="M80 158 18 207l75-27Z" fill="'+wing+'"/>' : '';
  const crest = ['haubenmeise','sommergoldhaehnchen','wintergoldhaehnchen'].includes(bird.id)
    ? `<path d="m125 33 14-28 8 27 15-24 2 34Z" fill="${accent}"/>` : '';
  return `<svg class="${extraClass}" viewBox="0 0 240 210" role="img" aria-label="Illustration: ${bird.name}">
    <g transform="translate(3 2)">${longTail}<path d="M61 170 34 193l48-10 23-22Z" fill="${wing}"/>
      <path d="M81 170 69 204l34-27Z" fill="${body}"/><ellipse cx="121" cy="122" rx="69" ry="61" fill="${body}" transform="rotate(-10 121 122)"/>
      <ellipse cx="137" cy="138" rx="44" ry="43" fill="${chest}" transform="rotate(-17 137 138)"/><ellipse cx="91" cy="129" rx="37" ry="47" fill="${wing}" transform="rotate(24 91 129)"/>
      <path d="M65 119c21 4 34 17 44 38-24-5-37-15-44-38Z" fill="${accent}" opacity=".34"/><circle cx="150" cy="66" r="43" fill="${body}"/>${crest}
      ${bird.id === 'rotkehlchen' ? `<path d="M120 76c18-20 51-17 65 5-8 25-26 36-49 31-2-14-7-26-16-36Z" fill="${accent}"/>` : ''}
      ${['kohlmeise','blaumeise','sumpfmeise','weidenmeise'].includes(bird.id) ? `<path d="M118 49c18-25 52-28 72-5l-9 25-54 6Z" fill="${wing}"/>` : ''}
      <circle cx="166" cy="57" r="5" fill="#152e29"/><circle cx="168" cy="55" r="1.4" fill="white"/><path d="m188 67 38 9-40 10Z" fill="${accent}"/>
      <path d="M112 177v18m24-17 4 17m-37 0h18m9 0h19" fill="none" stroke="#684c35" stroke-width="4" stroke-linecap="round"/>
      ${bird.id === 'zaunkoenig' ? `<path d="M67 103 30 53l19 63Z" fill="${body}"/>` : ''}
    </g></svg>`;
}

function waveform() {
  const bars = Array.from({ length: 14 }, (_, i) => `<i style="--h:${10 + ((i * 17) % 35)}px;--d:-${(i * .07).toFixed(2)}s"></i>`).join('');
  return `<div class="waveform left">${bars}</div><div class="waveform right">${bars}</div>`;
}

function recordingsFor(bird) {
  return [...new Set([bird.file, ...(KNOWN_ALTERNATES[bird.id] || []), ...(progress.recordings[bird.id] || [])])];
}

async function discoverRecordings(bird) {
  if (progress.recordings[bird.id]?.length >= 2 || progress.recordings[bird.id]?.loading) return;
  progress.recordings[bird.id] = progress.recordings[bird.id] || [];
  progress.recordings[bird.id].loading = true;
  try {
    const query = encodeURIComponent(`${bird.latin} filetype:audio`);
    const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&list=search&srnamespace=6&srlimit=8&srsearch=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    const terms = bird.latin.toLowerCase().split(' ').slice(0, 2);
    const found = (data.query?.search || []).map((item) => item.title.replace(/^File:/, ''))
      .filter((title) => /\.(ogg|oga|mp3|wav|flac)$/i.test(title))
      .filter((title) => terms.every((term) => title.toLowerCase().includes(term)))
      .filter((title) => title !== bird.file).slice(0, 3);
    progress.recordings[bird.id] = [...new Set([...(progress.recordings[bird.id] || []).filter((x) => x !== true), ...found])];
    saveProgress();
  } catch (_) {
    progress.recordings[bird.id] = (progress.recordings[bird.id] || []).filter((x) => x !== true);
  }
}

function stopAudio({ preserveSpectrum = true } = {}) {
  if (state.visualFrame) cancelAnimationFrame(state.visualFrame);
  state.visualFrame = null;
  state.audios.forEach((audio) => { try { audio.pause(); audio.currentTime = 0; } catch (_) {} });
  if (state.audio && !state.audios.includes(state.audio)) { try { state.audio.pause(); } catch (_) {} }
  state.audio = null;
  state.audios = [];
  state.analyser = null;
  if (!preserveSpectrum) state.spectrumFrames = [];
  document.querySelectorAll('.playing').forEach((node) => node.classList.remove('playing'));
}

function makeAudio(file, volume = 1) {
  const audio = new Audio();
  audio.crossOrigin = 'anonymous';
  audio.preload = 'auto';
  audio.src = commonsFile(file);
  audio.volume = volume;
  audio.playbackRate = state.speed;
  audio.preservesPitch = true;
  state.audios.push(audio);
  return audio;
}

function connectVisualizer(audio, canvas, pan = 0) {
  if (!canvas || !window.AudioContext) return;
  try {
    state.audioContext = state.audioContext || new AudioContext();
    const source = state.audioContext.createMediaElementSource(audio);
    const analyser = state.audioContext.createAnalyser();
    const gain = state.audioContext.createGain();
    analyser.fftSize = 256;
    gain.gain.value = 1;
    source.connect(gain);
    if (state.audioContext.createStereoPanner) {
      const panner = state.audioContext.createStereoPanner();
      panner.pan.value = progress.settings.spatial ? pan : 0;
      gain.connect(panner); panner.connect(analyser);
    } else gain.connect(analyser);
    analyser.connect(state.audioContext.destination);
    state.analyser = analyser;
    drawLiveSpectrum(canvas, analyser);
  } catch (_) {
    state.analyser = null;
  }
}

function drawLiveSpectrum(canvas, analyser) {
  const context = canvas.getContext('2d');
  const data = new Uint8Array(analyser.frequencyBinCount);
  let frame = 0;
  const draw = () => {
    if (!state.analyser || !document.body.contains(canvas)) return;
    const ratio = window.devicePixelRatio || 1;
    const width = Math.max(220, canvas.clientWidth) * ratio;
    const height = Math.max(52, canvas.clientHeight) * ratio;
    if (canvas.width !== width) { canvas.width = width; canvas.height = height; }
    analyser.getByteFrequencyData(data);
    context.clearRect(0, 0, width, height);
    const bars = 42; const gap = width / bars;
    for (let i = 0; i < bars; i += 1) {
      const value = data[i] / 255;
      const barHeight = 3 + value * height * .88;
      context.fillStyle = `rgba(200,240,111,${.25 + value * .75})`;
      context.fillRect(i * gap, height - barHeight, Math.max(2, gap - 3), barHeight);
    }
    if (frame % 6 === 0 && state.spectrumFrames.length < 90) state.spectrumFrames.push(Array.from(data.slice(0, 64)));
    frame += 1;
    state.visualFrame = requestAnimationFrame(draw);
  };
  draw();
}

function drawSpectrumSnapshot() {
  const canvas = document.querySelector('#feedback-spectrum');
  if (!canvas || !state.spectrumFrames.length) return;
  const context = canvas.getContext('2d');
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(280, canvas.clientWidth) * ratio;
  canvas.height = 92 * ratio;
  const cellW = canvas.width / state.spectrumFrames.length;
  const cellH = canvas.height / 64;
  state.spectrumFrames.forEach((frame, x) => frame.forEach((value, y) => {
    const alpha = Math.max(0, (value - 30) / 225);
    context.fillStyle = `rgba(23,79,67,${alpha})`;
    context.fillRect(x * cellW, canvas.height - (y + 1) * cellH, Math.ceil(cellW), Math.ceil(cellH));
  }));
}

function getEligibleBirds({ habitat = 'all', difficulty = state.difficulty, ignoreSeason = false } = {}) {
  const month = new Date().getMonth() + 1;
  let pool = birds.filter((bird) => habitat === 'all' || bird.habitats.includes(habitat));
  if (progress.settings.region !== 'all') pool = pool.filter((bird) => bird.regions.includes(progress.settings.region));
  if (progress.settings.seasonal && !ignoreSeason) pool = pool.filter((bird) => bird.activeMonths.includes(month));
  if (difficulty === 'starter') pool = pool.filter((bird) => bird.difficulty === 1);
  if (difficulty === 'advanced') pool = pool.filter((bird) => bird.difficulty <= 2);
  if (pool.length < 8) return getEligibleBirds({ habitat, difficulty: 'expert', ignoreSeason: true });
  return pool;
}

function adaptiveWeight(bird) {
  const stats = progress.birds[bird.id];
  const accuracy = stats.seen ? stats.correct / stats.seen : 0;
  const due = stats.seen && stats.nextDue <= Date.now() ? 4 : 0;
  return 1 + stats.wrong * 1.6 + (1 - accuracy) * 4 + due + Math.max(0, 3 - masteryLevel(stats.xp));
}

function weightedDeck(pool, count) {
  const result = [];
  let available = [...pool];
  while (result.length < count) {
    if (!available.length) available = [...pool];
    const total = available.reduce((sum, bird) => sum + adaptiveWeight(bird), 0);
    let cursor = Math.random() * total;
    let index = 0;
    for (; index < available.length; index += 1) {
      cursor -= adaptiveWeight(available[index]);
      if (cursor <= 0) break;
    }
    result.push(available.splice(Math.min(index, available.length - 1), 1)[0]);
  }
  return result;
}

function createDeck(count, mode, habitat, focusIds = null, dueOnly = false) {
  let pool = getEligibleBirds({ habitat, difficulty: state.difficulty });
  if (focusIds?.length) pool = birds.filter((bird) => focusIds.includes(bird.id));
  if (dueOnly) {
    const due = dueBirds().filter((bird) => habitat === 'all' || bird.habitats.includes(habitat));
    if (due.length) pool = due;
  }
  if (mode === 'daily') return shuffle(pool, seededRandom(todayKey())).slice(0, count);
  if (mode === 'adaptive' || dueOnly || focusIds) return weightedDeck(pool, count);
  const result = [];
  while (result.length < count) result.push(...shuffle(pool));
  return result.slice(0, count);
}

function confusingBirds(bird) {
  const ids = [];
  CONFUSION_PAIRS.forEach(([a, b]) => {
    if (a === bird.id) ids.push(b);
    if (b === bird.id) ids.push(a);
  });
  Object.entries(progress.confusions).forEach(([key, value]) => {
    const [correct, chosen] = key.split('>');
    if (correct === bird.id && value > 0) ids.unshift(chosen);
  });
  return [...new Set(ids)].map((id) => birds.find((item) => item.id === id)).filter(Boolean);
}

function chooseOptions(bird) {
  const preferred = state.difficulty === 'starter' ? [] : confusingBirds(bird);
  const pool = getEligibleBirds({ habitat: state.habitat, difficulty: state.difficulty === 'starter' ? 'advanced' : 'expert' })
    .filter((item) => item.id !== bird.id && !preferred.some((pref) => pref.id === item.id));
  return shuffle([bird, ...preferred.slice(0, 2), ...shuffle(pool).slice(0, Math.max(0, 3 - preferred.length))]).slice(0, 4);
}

function startGame(config = {}) {
  stopAudio({ preserveSpectrum: false });
  clearInterval(state.timer);
  const mode = config.mode || 'classic';
  const modeInfo = MODES[mode] || { rounds: config.rounds || 8 };
  const habitat = config.habitat || 'all';
  Object.assign(state, {
    view: 'quiz', mode, habitat, difficulty: config.difficulty || progress.settings.difficulty,
    round: 0, totalRounds: config.rounds || modeInfo.rounds, timeLeft: modeInfo.seconds || 0,
    lives: modeInfo.lives || 3, score: 0, streak: 0, bestStreak: 0, correct: 0,
    history: [], hintUsed: false, answered: false, clueStep: 1, speed: 1,
    focusIds: config.focusIds || null, dueOnly: Boolean(config.dueOnly), sessionActive: true,
  });
  state.deck = createDeck(state.totalRounds, mode, habitat, state.focusIds, state.dueOnly);
  state.lastConfig = { mode, habitat, difficulty: state.difficulty, focusIds: state.focusIds, dueOnly: state.dueOnly };
  setAtmosphere(habitat);
  loadRound();
  if (modeInfo.seconds) startTimer();
}

function startTimer() {
  clearInterval(state.timer);
  state.timer = setInterval(() => {
    if (!state.sessionActive) return;
    state.timeLeft -= 1;
    const timer = document.querySelector('#game-timer');
    if (timer) timer.textContent = `${state.timeLeft}s`;
    if (state.timeLeft <= 0) finishGame();
  }, 1000);
}

function loadRound() {
  if (!state.sessionActive || !state.deck[state.round]) { finishGame(); return; }
  stopAudio({ preserveSpectrum: false });
  state.current = state.deck[state.round];
  state.options = state.difficulty === 'expert' ? [] : chooseOptions(state.current);
  state.hintUsed = false;
  state.answered = false;
  state.clueStep = 1;
  const recordings = recordingsFor(state.current);
  state.recordingFile = recordings[Math.floor(Math.random() * recordings.length)];
  renderQuiz();
  discoverRecordings(state.current);
  if (state.mode !== 'clue') setTimeout(playCurrentAudio, 260);
}

function progressMarkup() {
  const percent = Math.min(100, ((state.round + (state.answered ? 1 : 0)) / state.totalRounds) * 100);
  return `<div class="round-progress" aria-label="Rundenfortschritt"><i style="width:${percent}%"></i></div>`;
}

function clueMarkup() {
  const clues = [
    `<span>⌖ Lebensraum</span><strong>${state.current.habitat}</strong>`,
    `<span>Beobachtung</span><strong>${state.current.fact}</strong>`,
    `<span>Klang-Merkhilfe</span><strong>${state.current.tip}</strong>`,
  ];
  return `<div class="clue-stage"><div class="clue-number">${state.clueStep}</div>${clues.slice(0, state.clueStep).map((clue) => `<div class="clue-line">${clue}</div>`).join('')}</div>`;
}

function answerMarkup() {
  if (state.difficulty === 'expert') {
    return `<form class="expert-answer" id="expert-form"><label for="expert-input">Art selbst eingeben</label><div><input id="expert-input" autocomplete="off" placeholder="Deutscher oder wissenschaftlicher Name"><button class="primary-button" type="submit">Prüfen</button></div></form>`;
  }
  return `<div class="answers">${state.options.map((bird, index) => `<button class="answer" data-id="${bird.id}"><span class="answer-key">${index + 1}</span><span>${bird.name}</span></button>`).join('')}</div>`;
}

function renderQuiz() {
  const prompt = state.mode === 'clue' ? 'Wer bin ich?' : state.mode === 'soundscape' ? 'Wer führt den Chor?' : 'Wer singt hier?';
  const modeLabel = state.mode === 'daily' ? 'Stimme des Tages' : state.mode === 'expedition' ? getHabitat(state.habitat)?.label : (MODES[state.mode]?.label || 'Training');
  view.innerHTML = `<div class="quiz-wrap">
    <div class="quiz-head expanded">
      <span class="round-label">${state.round + 1} / ${state.totalRounds}</span>${progressMarkup()}
      <span class="score-label">${progress.settings.relaxed ? 'Lernmodus' : `${state.score} P`}</span>
    </div>
    <div class="quiz-status-row">
      <span>${modeLabel}</span>
      ${state.mode === 'dawn' ? `<strong id="game-timer">${state.timeLeft}s</strong>` : ''}
      ${state.mode === 'survival' ? `<strong aria-label="Verbleibende Leben">${'♥'.repeat(state.lives)}${'♡'.repeat(3-state.lives)}</strong>` : ''}
    </div>
    <div class="quiz-card">
      <div class="quiz-prompt"><p class="eyebrow">${state.mode === 'clue' ? 'Spuren lesen' : 'Ohren auf'}</p><h1>${prompt}</h1></div>
      ${state.mode === 'clue' ? clueMarkup() : `<div class="audio-stage" id="audio-stage">${waveform()}<canvas class="live-spectrum" id="live-spectrum" aria-hidden="true"></canvas>
        <div class="audio-inner"><button class="play-button" id="play-button" aria-label="Vogelstimme abspielen">
          <svg class="play-icon" viewBox="0 0 24 24"><path d="m8 5 11 7-11 7Z"/></svg><svg class="pause-icon" viewBox="0 0 24 24"><path d="M7 5h4v14H7zm6 0h4v14h-4z"/></svg>
        </button><span class="listen-label">${state.mode === 'soundscape' ? 'Morgenchor erneut hören' : 'Tippen zum Hören'}</span><span class="audio-error">Aufnahme nicht verfügbar. Bitte erneut versuchen.</span></div></div>`}
      <div class="hint-panel ${state.hintUsed && state.mode !== 'clue' ? 'visible' : ''}" id="hint-panel">${state.current.hint}</div>
      ${answerMarkup()}
      <div class="quiz-foot">
        <button class="hint-button" id="hint-button" ${(state.hintUsed && state.mode !== 'clue') || (state.mode === 'clue' && state.clueStep >= 3) ? 'disabled' : ''}><span>✦</span> ${state.mode === 'clue' ? (state.clueStep < 3 ? 'Nächsten Hinweis' : 'Alle Hinweise sichtbar') : 'Kleiner Hinweis'} ${!progress.settings.relaxed ? '<small>−30 P</small>' : ''}</button>
        ${state.mode !== 'clue' ? `<button class="audio-tool" id="speed-button" aria-label="Abspieltempo ändern">${state.speed === 1 ? '1×' : '0,75×'}</button>` : ''}
        <span class="streak">Serie <strong>×${state.streak}</strong></span>
      </div>
    </div>
  </div>`;
  document.querySelector('#play-button')?.addEventListener('click', toggleAudio);
  document.querySelector('#hint-button')?.addEventListener('click', showHint);
  document.querySelector('#speed-button')?.addEventListener('click', toggleSpeed);
  document.querySelectorAll('.answer').forEach((button) => button.addEventListener('click', () => answer(button.dataset.id)));
  document.querySelector('#expert-form')?.addEventListener('submit', (event) => {
    event.preventDefault(); answer(document.querySelector('#expert-input').value, true);
  });
}

async function playCurrentAudio() {
  if (state.view !== 'quiz' || state.mode === 'clue' || state.muted) return;
  if (state.audio && !state.audio.paused) return;
  stopAudio({ preserveSpectrum: true });
  const stage = document.querySelector('#audio-stage');
  const canvas = document.querySelector('#live-spectrum');
  const main = makeAudio(state.recordingFile, 1);
  state.audio = main;
  main.addEventListener('play', () => stage?.classList.add('playing'));
  main.addEventListener('pause', () => stage?.classList.remove('playing'));
  main.addEventListener('ended', () => {
    stage?.classList.remove('playing');
    state.audios.filter((audio) => audio !== main).forEach((audio) => audio.pause());
  });
  main.addEventListener('error', () => stage?.classList.add('has-error'));
  connectVisualizer(main, canvas, (Math.random() - .5) * 1.1);
  if (state.mode === 'soundscape') {
    const backgrounds = shuffle(birds.filter((bird) => bird.id !== state.current.id && bird.habitats.some((id) => state.current.habitats.includes(id)))).slice(0, 2);
    backgrounds.forEach((bird, index) => {
      const audio = makeAudio(bird.file, index === 0 ? .18 : .12);
      audio.loop = true;
    });
  }
  await state.audioContext?.resume().catch(() => {});
  Promise.allSettled(state.audios.map((audio) => audio.play())).catch(() => {});
}

function toggleAudio() {
  if (state.muted) { state.muted = false; updateSoundButton(); }
  if (!state.audio) { playCurrentAudio(); return; }
  if (state.audio.paused) {
    state.audioContext?.resume().catch(() => {});
    state.audios.forEach((audio) => audio.play().catch(() => document.querySelector('#audio-stage')?.classList.add('has-error')));
  } else state.audios.forEach((audio) => audio.pause());
}

function toggleSpeed() {
  state.speed = state.speed === 1 ? .75 : 1;
  state.audios.forEach((audio) => { audio.playbackRate = state.speed; audio.preservesPitch = true; });
  const button = document.querySelector('#speed-button');
  if (button) button.textContent = state.speed === 1 ? '1×' : '0,75×';
}

function showHint() {
  if (state.mode === 'clue') {
    state.hintUsed = true;
    if (state.clueStep < 3) { state.clueStep += 1; renderQuiz(); }
    return;
  }
  if (state.hintUsed) return;
  state.hintUsed = true;
  document.querySelector('#hint-panel')?.classList.add('visible');
  const button = document.querySelector('#hint-button'); if (button) button.disabled = true;
}

function normalize(value) {
  return String(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
}

function recordLearning(correct, chosenId) {
  const stats = progress.birds[state.current.id];
  stats.seen += 1; stats.lastSeen = Date.now();
  if (correct) {
    stats.correct += 1; stats.streak += 1;
    stats.xp += 18 + Math.min(12, stats.streak * 2);
    const intervals = [0, 1, 3, 7, 14];
    stats.nextDue = Date.now() + intervals[masteryLevel(stats.xp)] * 86400000;
  } else {
    stats.wrong += 1; stats.streak = 0; stats.xp = Math.max(1, stats.xp - 5); stats.nextDue = Date.now();
    if (chosenId) {
      const key = `${state.current.id}>${chosenId}`;
      progress.confusions[key] = (progress.confusions[key] || 0) + 1;
    }
  }
  progress.totalAnswers += 1;
  if (correct) progress.totalCorrect += 1;
  if (!progress.learned.includes(state.current.id)) progress.learned.push(state.current.id);
  progress.longestStreak = Math.max(progress.longestStreak, state.streak);
  checkAchievements();
  saveProgress();
}

function answer(value, typed = false) {
  if (state.answered || !state.sessionActive) return;
  const chosen = typed ? birds.find((bird) => [bird.name, bird.latin, bird.id].some((name) => normalize(name) === normalize(value))) : birds.find((bird) => bird.id === value);
  const chosenId = chosen?.id || null;
  const isCorrect = chosenId === state.current.id;
  state.answered = true;
  stopAudio({ preserveSpectrum: true });
  document.querySelectorAll('.answer').forEach((button) => {
    button.disabled = true;
    if (button.dataset.id === state.current.id) button.classList.add('correct');
    if (button.dataset.id === chosenId && !isCorrect) button.classList.add('wrong');
  });
  if (isCorrect) {
    const points = progress.settings.relaxed ? 100 : Math.max(40, 100 + state.streak * 15 - (state.hintUsed ? 30 : 0));
    state.score += points; state.correct += 1; state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
  } else {
    state.streak = 0;
    if (state.mode === 'survival') state.lives -= 1;
  }
  recordLearning(isCorrect, chosenId);
  state.history.push({ bird: state.current.id, chosen: chosenId, correct: isCorrect });
  setTimeout(() => renderFeedback(isCorrect, chosen), 420);
}

function renderFeedback(isCorrect, chosen) {
  if (!state.sessionActive) return;
  state.view = 'feedback';
  const bird = state.current;
  const mastery = masteryInfo(bird);
  const compareBird = confusingBirds(bird)[0];
  const ending = state.round + 1 >= state.totalRounds || (state.mode === 'survival' && state.lives <= 0);
  view.innerHTML = `<div class="quiz-wrap">
    <div class="quiz-head expanded"><span class="round-label">${state.round + 1} / ${state.totalRounds}</span>${progressMarkup()}<span class="score-label">${progress.settings.relaxed ? 'Lernmodus' : `${state.score} P`}</span></div>
    <div class="quiz-card feedback enhanced-feedback">
      <div><div class="bird-portrait" style="--portrait-bg:${bird.bg}">${birdSvg(bird)}</div>
        <button class="listen-again" id="feedback-play">▶ Stimme erneut hören</button></div>
      <div class="feedback-copy"><span class="feedback-result ${isCorrect ? '' : 'wrong'}">${isCorrect ? '✓ Richtig erkannt' : chosen ? `→ Nicht ${chosen.name}, sondern` : '→ Das war gesucht'}</span>
        <h2>${bird.name}</h2><p class="latin">${bird.latin}</p><p class="fact">${bird.fact}</p>
        <div class="memory-tip"><span>♪</span><p><strong>Merkhilfe:</strong> ${bird.tip}</p></div>
        <div class="mastery-line"><span>${mastery.label}</span><div><i style="width:${mastery.percent}%"></i></div><small>${mastery.xp} XP</small></div>
        ${state.spectrumFrames.length ? `<figure class="spectrum-card"><canvas id="feedback-spectrum"></canvas><figcaption>Klangbild dieser Aufnahme: tiefe Frequenzen unten, hohe oben</figcaption></figure>` : ''}
        <p class="source-line"><a href="${commonsPage(state.recordingFile)}" target="_blank" rel="noreferrer">Quelle dieser Aufnahme ↗</a></p>
        <div class="feedback-meta"><span class="habitat">⌖ ${bird.habitat}</span><div class="feedback-buttons">
          ${compareBird ? `<button class="secondary-button" id="compare-button">Mit ${compareBird.name} vergleichen</button>` : ''}
          <button class="primary-button next-button" id="next-button">${ending ? 'Auswertung' : 'Nächste Stimme'} <span>→</span></button>
        </div></div>
      </div>
    </div></div>`;
  drawSpectrumSnapshot();
  document.querySelector('#feedback-play').addEventListener('click', (event) => playSinglePreview(bird, event.currentTarget, state.recordingFile));
  document.querySelector('#compare-button')?.addEventListener('click', () => renderCompare(bird.id, compareBird.id));
  document.querySelector('#next-button').addEventListener('click', nextRound);
}

function nextRound() {
  if (!state.sessionActive) return;
  if (state.round + 1 >= state.totalRounds || (state.mode === 'survival' && state.lives <= 0)) { finishGame(); return; }
  state.round += 1; state.view = 'quiz'; loadRound();
}

function updateDailyCompletion() {
  const today = todayKey();
  if (progress.daily.completed[today]) return;
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin' }).format(yesterday);
  progress.daily.streak = progress.daily.lastCompleted === yesterdayKey ? progress.daily.streak + 1 : 1;
  progress.daily.lastCompleted = today;
  progress.daily.completed[today] = { score: state.score, correct: state.correct };
}

function recordExpedition() {
  if (state.mode !== 'expedition' || !state.habitat) return;
  const ratio = state.history.length ? state.correct / state.history.length : 0;
  const old = progress.expeditions[state.habitat] || { best: 0, played: 0 };
  progress.expeditions[state.habitat] = { best: Math.max(old.best, ratio), played: old.played + 1 };
}

function finishGame() {
  if (!state.sessionActive) return;
  state.sessionActive = false; state.view = 'result'; clearInterval(state.timer); stopAudio({ preserveSpectrum: false });
  const answers = state.history.length;
  const ratio = answers ? state.correct / answers : 0;
  progress.games += 1; progress.best = Math.max(progress.best, state.score);
  if (answers >= 5 && ratio === 1) progress.perfectGames += 1;
  if (state.mode === 'daily') updateDailyCompletion();
  recordExpedition(); checkAchievements(); saveProgress();
  const title = ratio === 1 ? 'Waldohren!' : ratio >= .7 ? 'Stark hingehört!' : ratio >= .4 ? 'Guter Fortschritt!' : 'Weiter lauschen!';
  const newSafe = state.history.filter((entry) => masteryLevel(progress.birds[entry.bird].xp) >= 3).length;
  view.innerHTML = `<div class="result-card expanded-result"><div class="result-emblem">${birdSvg(birds[(state.correct + 4) % birds.length])}</div>
    <p class="eyebrow" style="justify-content:center">${state.mode === 'dawn' ? 'Die Sonne ist aufgegangen' : 'Runde geschafft'}</p><h1>${title}</h1>
    <p>${ratio >= .7 ? 'Dein akustisches Artenwissen wird sicherer. Fällige Stimmen kehren genau dann zurück, wenn die Erinnerung Training braucht.' : 'Fehler sind jetzt als Wiederholungen vorgemerkt. Der Lerntrainer macht daraus gezielte Übung.'}</p>
    <div class="result-stats"><div class="result-stat"><strong>${state.correct}/${answers}</strong><span>richtig</span></div><div class="result-stat"><strong>${state.score}</strong><span>Punkte</span></div><div class="result-stat"><strong>×${state.bestStreak}</strong><span>beste Serie</span></div><div class="result-stat"><strong>${newSafe}</strong><span>sichere Treffer</span></div></div>
    <div class="result-actions"><button class="primary-button" id="again-button"><span class="button-icon">↻</span> Modus wiederholen</button><button class="secondary-button" id="review-result-button">Fehler trainieren</button><button class="secondary-button" id="result-book-button">Zum Vogelbuch →</button></div>
  </div>`;
  document.querySelector('#again-button').addEventListener('click', () => startGame(state.lastConfig));
  document.querySelector('#review-result-button').addEventListener('click', () => startGame({ mode:'adaptive', dueOnly:true }));
  document.querySelector('#result-book-button').addEventListener('click', renderCollection);
}

function checkAchievements() {
  ACHIEVEMENTS.forEach((achievement) => {
    if (!progress.achievements.some((item) => item.id === achievement.id) && achievement.test()) {
      progress.achievements.push({ id: achievement.id, date: todayKey() });
      showToast(`Abzeichen erhalten: ${achievement.name}`);
    }
  });
}

function expeditionUnlocked(index) {
  if (index === 0) return true;
  const previous = progress.expeditions[HABITATS[index - 1].id];
  return previous?.best >= .6;
}

function homeTemplate() {
  const due = dueBirds().length;
  const mastered = birds.filter((bird) => masteryLevel(progress.birds[bird.id].xp) >= 3).length;
  const dailyDone = Boolean(progress.daily.completed[todayKey()]);
  return `<div class="home-grid"><div class="hero-copy-block"><p class="eyebrow">Dein Ohr wird zum Fernglas</p><h1 class="hero-title">Wer singt<br><em>denn da?</em></h1>
      <p class="hero-copy">Erkenne heimische Vogelstimmen mit einem Trainer, der deine Verwechslungen kennt und zur richtigen Zeit wiederholt.</p>
      <div class="hero-actions"><button class="primary-button" id="start-button"><span class="button-icon">▶</span> Training wählen</button><button class="secondary-button" id="review-button">${due ? `${due} Stimmen wiederholen` : 'Lerntrainer starten'} →</button></div>
      <div class="home-stats"><div class="home-stat"><strong>${progress.learned.length}/${birds.length}</strong><span>Arten gehört</span></div><div class="home-stat"><strong>${mastered}</strong><span>Arten sicher</span></div><div class="home-stat"><strong>${progress.daily.streak}</strong><span>Tagesserie</span></div></div>
    </div><aside class="sound-card daily-card" aria-label="Tagesaufgabe"><div class="card-kicker"><span>Stimme des Tages</span><span>${dailyDone ? '✓' : '♪'}</span></div><div class="branch"></div><div class="home-bird">${birdSvg(birds[1])}</div>
      <div class="card-question"><div class="mini-wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><h2>${dailyDone ? 'Heute geschafft.' : 'Fünf Stimmen. Jeden Tag neu.'}</h2><p>${dailyDone ? `Dein Ergebnis: ${progress.daily.completed[todayKey()].correct}/5 richtig.` : 'Dieselbe faire Herausforderung für alle – mit wachsender Tagesserie.'}</p><button class="daily-button" id="daily-button">${dailyDone ? 'Noch einmal üben' : 'Tagesaufgabe starten'} →</button></div>
    </aside></div>
    <div class="home-sections"><section><div class="section-heading"><div><p class="eyebrow">Spielmodi</p><h2>So möchtest du hören</h2></div><button class="text-button" id="compare-home">Ähnliche Arten vergleichen →</button></div>
      <div class="mode-grid">${Object.entries(MODES).map(([id, mode]) => `<button class="mode-card" data-mode="${id}"><span>${mode.icon}</span><strong>${mode.label}</strong><small>${mode.description}</small></button>`).join('')}</div></section>
      <section><div class="section-heading"><div><p class="eyebrow">Revierpfad</p><h2>Vier Lebensräume erschließen</h2></div><span class="section-note">60 % öffnen das nächste Revier</span></div>
        <div class="expedition-grid">${HABITATS.map((habitat, index) => {
          const record = progress.expeditions[habitat.id]; const unlocked = expeditionUnlocked(index);
          return `<article class="expedition-card ${unlocked ? '' : 'locked'}"><span class="expedition-icon">${habitat.icon}</span><div><strong>${habitat.label}</strong><p>${habitat.description}</p><div class="expedition-progress"><i style="width:${Math.round((record?.best || 0)*100)}%"></i></div><small>${record ? `Bestwert ${Math.round(record.best*100)} %` : unlocked ? 'Noch nicht erkundet' : 'Noch verschlossen'}</small></div><button data-expedition="${habitat.id}" ${unlocked ? '' : 'disabled'}>${unlocked ? 'Starten' : '🔒'}</button></article>`;
        }).join('')}</div></section>
    </div>`;
}

function abandonSession() {
  stopAudio({ preserveSpectrum: false });
  clearInterval(state.timer);
  state.timer = null;
  state.sessionActive = false;
}

function renderHome() {
  abandonSession(); state.view = 'home'; setAtmosphere('garden');
  view.innerHTML = homeTemplate();
  document.querySelector('#start-button').addEventListener('click', renderModeSelect);
  document.querySelector('#review-button').addEventListener('click', () => startGame({ mode:'adaptive', dueOnly:dueBirds().length > 0 }));
  document.querySelector('#daily-button').addEventListener('click', () => startGame({ mode:'daily', rounds:5 }));
  document.querySelector('#compare-home').addEventListener('click', () => renderCompare());
  document.querySelectorAll('[data-mode]').forEach((button) => button.addEventListener('click', () => startGame({ mode:button.dataset.mode })));
  document.querySelectorAll('[data-expedition]').forEach((button) => button.addEventListener('click', () => startGame({ mode:'expedition', habitat:button.dataset.expedition, rounds:10 })));
}

function renderModeSelect() {
  abandonSession(); state.view = 'modes';
  view.innerHTML = `<div class="page-shell"><div class="page-head"><div><p class="eyebrow">Training zusammenstellen</p><h1>Wie möchtest du lernen?</h1><p>Schwierigkeit und Lebensraum gelten für den gewählten Modus.</p></div><button class="secondary-button" id="back-home">← Zurück</button></div>
    <div class="training-controls"><label>Schwierigkeit<select id="difficulty-select"><option value="starter" ${state.difficulty==='starter'?'selected':''}>Einsteiger · deutliche Unterschiede</option><option value="advanced" ${state.difficulty==='advanced'?'selected':''}>Fortgeschritten · ähnliche Arten</option><option value="expert" ${state.difficulty==='expert'?'selected':''}>Experte · Namen selbst eingeben</option></select></label>
      <label>Lebensraum<select id="habitat-select"><option value="all">Alle Lebensräume</option>${HABITATS.map((h) => `<option value="${h.id}">${h.label}</option>`).join('')}</select></label></div>
    <div class="mode-grid large">${Object.entries(MODES).map(([id, mode]) => `<button class="mode-card" data-mode-select="${id}"><span>${mode.icon}</span><strong>${mode.label}</strong><small>${mode.description}</small><b>Starten →</b></button>`).join('')}</div>
    <div class="calm-note"><span>☼</span><p><strong>Entspannt spielen?</strong> Im Lernmodus bleiben Punkte und Zeitdruck im Hintergrund. Das lässt sich in den Einstellungen aktivieren.</p></div>
  </div>`;
  document.querySelector('#back-home').addEventListener('click', renderHome);
  document.querySelectorAll('[data-mode-select]').forEach((button) => button.addEventListener('click', () => startGame({ mode:button.dataset.modeSelect, difficulty:document.querySelector('#difficulty-select').value, habitat:document.querySelector('#habitat-select').value })));
}

function playSinglePreview(bird, button, preferredFile = null) {
  if (state.audio && button.classList.contains('playing')) { stopAudio(); return; }
  stopAudio({ preserveSpectrum: true });
  state.muted = false; updateSoundButton();
  const choices = recordingsFor(bird);
  const file = preferredFile || choices[Math.floor(Math.random() * choices.length)];
  const audio = makeAudio(file, 1); state.audio = audio; button.classList.add('playing');
  const original = button.innerHTML; button.innerHTML = 'Ⅱ&nbsp; Pause';
  const reset = () => { button.classList.remove('playing'); button.innerHTML = original; };
  audio.addEventListener('ended', reset); audio.addEventListener('pause', reset);
  audio.addEventListener('error', () => { reset(); showToast('Aufnahme konnte nicht geladen werden.'); });
  audio.play().catch(() => showToast('Tippe erneut, um die Aufnahme zu starten.'));
  discoverRecordings(bird);
}

function birdCard(bird) {
  const mastery = masteryInfo(bird); const stats = progress.birds[bird.id]; const variants = recordingsFor(bird).length;
  return `<article class="species-card" style="--portrait-bg:${bird.bg}" data-card="${bird.id}"><div class="species-visual">${birdSvg(bird)}</div><div class="species-title-row"><div><h2>${bird.name}</h2><p class="latin">${bird.latin}</p></div><span class="level-dot level-${mastery.level}" title="${mastery.label}"></span></div>
    <p>${bird.tip}</p><div class="card-mastery"><span>${mastery.label}</span><div><i style="width:${mastery.percent}%"></i></div></div>
    <div class="species-footer"><span class="learned ${stats.seen ? '' : 'new'}">${stats.seen ? `${stats.correct}/${stats.seen} ERKANNT` : 'NOCH UNBEKANNT'}</span><span class="variant-count">${variants} ♫</span><button class="mini-play" data-bird="${bird.id}" aria-label="${bird.name} anhören"><svg viewBox="0 0 24 24"><path d="m8 5 11 7-11 7Z"/></svg></button><button class="open-species" data-open="${bird.id}">Mehr</button></div></article>`;
}

function renderCollection() {
  abandonSession(); state.view = 'collection';
  view.innerHTML = `<div class="collection"><div class="collection-head"><div><p class="eyebrow">Dein Feldführer</p><h1>Das Vogelbuch</h1><p>Stimmen vergleichen, Meisterschaft verfolgen und Artenwissen vertiefen.</p></div><span class="collection-count">${progress.learned.length} von ${birds.length} gehört</span></div>
    <div class="collection-tools"><input id="bird-search" type="search" placeholder="Art suchen …" aria-label="Vogelart suchen"><div class="filter-chips"><button data-filter="all" class="active">Alle</button>${HABITATS.map((h) => `<button data-filter="${h.id}">${h.label}</button>`).join('')}<button data-filter="due">Fällig</button></div></div>
    <div class="bird-grid" id="bird-grid">${birds.map(birdCard).join('')}</div>
    <details class="credits"><summary>Quellen und Lizenzen der Aufnahmen</summary><div>${birds.map((bird) => `<a href="${commonsPage(bird.file)}" target="_blank" rel="noreferrer">${bird.name} – ${bird.credit}</a>`).join(' · ')}</div><p>Bereitgestellt über Wikimedia Commons. Vollständige Lizenzbedingungen stehen auf der jeweils verlinkten Dateiseite. Die Aufnahmen wurden nicht verändert.</p></details>
  </div>`;
  let filter = 'all';
  const refresh = () => {
    const query = normalize(document.querySelector('#bird-search').value);
    let filtered = birds.filter((bird) => !query || normalize(`${bird.name}${bird.latin}`).includes(query));
    if (filter === 'due') filtered = filtered.filter((bird) => dueBirds().some((due) => due.id === bird.id));
    else if (filter !== 'all') filtered = filtered.filter((bird) => bird.habitats.includes(filter));
    document.querySelector('#bird-grid').innerHTML = filtered.length ? filtered.map(birdCard).join('') : '<p class="empty-state">Keine Art passt zu diesem Filter.</p>';
    bindCollectionCards();
  };
  document.querySelector('#bird-search').addEventListener('input', refresh);
  document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
    filter = button.dataset.filter; document.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('active', item === button)); refresh();
  }));
  bindCollectionCards();
}

function bindCollectionCards() {
  document.querySelectorAll('.mini-play').forEach((button) => button.addEventListener('click', () => playSinglePreview(birds.find((bird) => bird.id === button.dataset.bird), button)));
  document.querySelectorAll('[data-open]').forEach((button) => button.addEventListener('click', () => renderSpecies(button.dataset.open)));
}

function renderSpecies(id) {
  abandonSession(); const bird = birds.find((item) => item.id === id); if (!bird) return;
  state.view = 'species'; const mastery = masteryInfo(bird); const stats = progress.birds[bird.id]; const similar = confusingBirds(bird);
  const observations = progress.journal.filter((entry) => entry.birdId === bird.id);
  view.innerHTML = `<div class="page-shell species-detail"><button class="text-button" id="back-book">← Zum Vogelbuch</button><div class="species-hero" style="--portrait-bg:${bird.bg}"><div>${birdSvg(bird)}</div><section><p class="eyebrow">${mastery.label} · ${recordingsFor(bird).length} Aufnahmen</p><h1>${bird.name}</h1><p class="latin">${bird.latin}</p><p>${bird.fact}</p><div class="species-actions"><button class="primary-button" id="species-play">▶ Stimme anhören</button><button class="secondary-button" id="species-note">＋ Sichtung notieren</button></div></section></div>
    <div class="detail-grid"><article><span>♪ Klangsignatur</span><h2>${bird.tip}</h2><p>${bird.hint}</p></article><article><span>⌖ Lebensraum</span><h2>${bird.habitat}</h2><p>${bird.activeMonths.length === 12 ? 'Ganzjährig zu hören.' : `Vor allem von April bis September bei uns.`}</p></article><article><span>↗ Dein Stand</span><h2>${stats.correct} von ${stats.seen} erkannt</h2><div class="detail-progress"><i style="width:${mastery.percent}%"></i></div><p>${mastery.xp} Erfahrungspunkte bis „Feldbereit“.</p></article></div>
    ${similar.length ? `<section class="similar-section"><div class="section-heading"><div><p class="eyebrow">Verwechslungsgefahr</p><h2>Direkt vergleichen</h2></div></div><div class="similar-list">${similar.map((item) => `<button data-compare-with="${item.id}">${bird.name} ↔ ${item.name}</button>`).join('')}</div></section>` : ''}
    <section class="observation-summary"><div><p class="eyebrow">Eigene Beobachtungen</p><h2>${observations.length ? `${observations.length} Feldnotizen` : 'Noch keine Sichtung notiert'}</h2></div><button class="secondary-button" id="species-journal">Tagebuch öffnen →</button></section>
  </div>`;
  document.querySelector('#back-book').addEventListener('click', renderCollection);
  document.querySelector('#species-play').addEventListener('click', (event) => playSinglePreview(bird, event.currentTarget));
  document.querySelector('#species-note').addEventListener('click', () => renderJournal(bird.id));
  document.querySelector('#species-journal').addEventListener('click', () => renderJournal(bird.id));
  document.querySelectorAll('[data-compare-with]').forEach((button) => button.addEventListener('click', () => renderCompare(bird.id, button.dataset.compareWith)));
}

function renderCompare(firstId, secondId) {
  abandonSession(); state.view = 'compare';
  let first = birds.find((bird) => bird.id === firstId) || birds.find((bird) => bird.id === 'zilpzalp');
  let second = birds.find((bird) => bird.id === secondId) || birds.find((bird) => bird.id === 'fitis');
  const options = (selected) => birds.map((bird) => `<option value="${bird.id}" ${bird.id===selected?'selected':''}>${bird.name}</option>`).join('');
  view.innerHTML = `<div class="page-shell compare-page"><div class="page-head"><div><p class="eyebrow">A/B-Hörtraining</p><h1>Ähnliche Stimmen vergleichen</h1><p>Wechsle direkt zwischen zwei Arten und achte auf Rhythmus, Tonhöhe und Strophenform.</p></div><button class="secondary-button" id="back-compare">← Zurück</button></div>
    <div class="compare-selects"><label>A<select id="compare-a">${options(first.id)}</select></label><span>↔</span><label>B<select id="compare-b">${options(second.id)}</select></label></div>
    <div class="compare-grid">${[first,second].map((bird,index) => `<article class="compare-card" style="--portrait-bg:${bird.bg}"><div>${birdSvg(bird)}</div><span class="compare-letter">${index?'B':'A'}</span><h2>${bird.name}</h2><p class="latin">${bird.latin}</p><button class="primary-button compare-play" data-compare-play="${bird.id}">▶ ${index?'B':'A'} hören</button><p><strong>Klang:</strong> ${bird.tip}</p><p><strong>Lebensraum:</strong> ${bird.habitat}</p></article>`).join('')}</div>
    <div class="compare-key"><strong>Hörschlüssel</strong><p><b>${first.name}:</b> ${first.hint}</p><p><b>${second.name}:</b> ${second.hint}</p><button class="primary-button" id="duel-button">Dieses Paar trainieren →</button></div>
    <div class="preset-pairs"><span>Typische Paare:</span>${CONFUSION_PAIRS.slice(0,8).map(([a,b]) => `<button data-pair="${a},${b}">${birds.find(x=>x.id===a).name} / ${birds.find(x=>x.id===b).name}</button>`).join('')}</div>
  </div>`;
  document.querySelector('#back-compare').addEventListener('click', renderHome);
  document.querySelector('#compare-a').addEventListener('change', (event) => renderCompare(event.target.value, second.id));
  document.querySelector('#compare-b').addEventListener('change', (event) => renderCompare(first.id, event.target.value));
  document.querySelectorAll('[data-compare-play]').forEach((button) => button.addEventListener('click', () => playSinglePreview(birds.find((bird) => bird.id === button.dataset.comparePlay), button)));
  document.querySelector('#duel-button').addEventListener('click', () => startGame({ mode:'adaptive', difficulty:'advanced', focusIds:[first.id,second.id], rounds:8 }));
  document.querySelectorAll('[data-pair]').forEach((button) => button.addEventListener('click', () => renderCompare(...button.dataset.pair.split(','))));
}

function renderJournal(preselected = '') {
  abandonSession(); state.view = 'journal';
  const entries = [...progress.journal].sort((a,b) => b.date.localeCompare(a.date));
  view.innerHTML = `<div class="page-shell"><div class="page-head"><div><p class="eyebrow">Draußen entdeckt</p><h1>Feldtagebuch</h1><p>Beobachtungen bleiben ausschließlich in diesem Browser gespeichert.</p></div><span class="collection-count">${entries.length} Sichtungen</span></div>
    <div class="journal-layout"><form class="journal-form" id="journal-form"><h2>Neue Sichtung</h2><label>Vogelart<select id="journal-bird" required><option value="">Art wählen</option>${birds.map((bird) => `<option value="${bird.id}" ${bird.id===preselected?'selected':''}>${bird.name}</option>`).join('')}</select></label><div class="form-row"><label>Datum<input type="date" id="journal-date" value="${todayKey()}" required></label><label>Sicherheit<select id="journal-confidence"><option value="gehört">Nur gehört</option><option value="gesehen">Gesehen</option><option value="sicher">Sicher bestimmt</option></select></label></div><label>Ort<input id="journal-location" maxlength="80" placeholder="z. B. Stadtpark"></label><label>Notiz<textarea id="journal-note" maxlength="300" placeholder="Wo saß der Vogel? Wie klang die Stimme?"></textarea></label><label>Eigene Aufnahme <small>optional · bleibt lokal</small><input id="journal-recording" type="file" accept="audio/*" capture></label><button class="primary-button" type="submit">Sichtung speichern</button></form>
      <section class="journal-entries"><h2>Deine Beobachtungen</h2>${entries.length ? entries.map((entry) => { const bird=birds.find((item)=>item.id===entry.birdId); return `<article><div class="journal-bird" style="--portrait-bg:${bird?.bg}">${bird ? birdSvg(bird) : ''}</div><div><span>${escapeHtml(entry.date)} · ${escapeHtml(entry.confidence)}</span><h3>${bird?.name || 'Unbekannte Art'}</h3><p>${escapeHtml(entry.location || 'Ort nicht notiert')}${entry.note ? ` — ${escapeHtml(entry.note)}` : ''}</p></div><div class="journal-actions">${entry.audioId ? `<button data-journal-audio="${escapeHtml(entry.audioId)}" aria-label="Eigene Aufnahme abspielen">▶</button>` : ''}<button data-delete-note="${escapeHtml(entry.id)}" aria-label="Sichtung löschen">×</button></div></article>`; }).join('') : '<p class="empty-state">Noch keine Feldnotiz. Die erste wartet beim nächsten Spaziergang.</p>'}</section></div>
  </div>`;
  document.querySelector('#journal-form').addEventListener('submit', async (event) => {
    event.preventDefault(); const birdId = document.querySelector('#journal-bird').value; if (!birdId) return;
    const id = `${Date.now()}-${Math.random().toString(36).slice(2,6)}`;
    const file = document.querySelector('#journal-recording').files[0];
    let audioId = '';
    if (file) {
      try { audioId = id; await storeJournalRecording(audioId, file); }
      catch (_) { showToast('Sichtung gespeichert, Aufnahme konnte nicht lokal gesichert werden.'); }
    }
    progress.journal.push({ id, audioId, birdId, date:document.querySelector('#journal-date').value, confidence:document.querySelector('#journal-confidence').value, location:document.querySelector('#journal-location').value.trim(), note:document.querySelector('#journal-note').value.trim() });
    checkAchievements(); saveProgress(); if (!file || audioId) showToast('Sichtung gespeichert'); renderJournal(birdId);
  });
  document.querySelectorAll('[data-journal-audio]').forEach((button) => button.addEventListener('click', async () => {
    try {
      stopAudio(); const blob = await readJournalRecording(button.dataset.journalAudio); if (!blob) throw new Error('missing');
      const url = URL.createObjectURL(blob); const audio = new Audio(url); state.audio = audio; state.audios = [audio]; button.textContent = 'Ⅱ';
      const reset = () => { button.textContent = '▶'; URL.revokeObjectURL(url); };
      audio.addEventListener('ended', reset, { once:true }); audio.addEventListener('error', reset, { once:true }); await audio.play();
    } catch (_) { showToast('Eigene Aufnahme ist nicht mehr verfügbar.'); }
  }));
  document.querySelectorAll('[data-delete-note]').forEach((button) => button.addEventListener('click', async () => {
    const entry = progress.journal.find((item) => item.id === button.dataset.deleteNote);
    if (entry?.audioId) await removeJournalRecording(entry.audioId).catch(() => {});
    progress.journal = progress.journal.filter((item) => item.id !== button.dataset.deleteNote); saveProgress(); renderJournal(preselected);
  }));
}

function renderStats() {
  abandonSession(); state.view = 'stats';
  const accuracy = progress.totalAnswers ? Math.round(progress.totalCorrect / progress.totalAnswers * 100) : 0;
  const levels = [0,1,2,3,4].map((level) => birds.filter((bird) => masteryLevel(progress.birds[bird.id].xp) === level).length);
  const confusions = Object.entries(progress.confusions).sort((a,b) => b[1]-a[1]).slice(0,5);
  const due = dueBirds();
  view.innerHTML = `<div class="page-shell"><div class="page-head"><div><p class="eyebrow">Dein Lernstand</p><h1>Fortschritt</h1><p>Was sitzt, was fällig ist und welche Stimmen du noch verwechselst.</p></div><button class="primary-button" id="stats-review">${due.length || 'Keine'} fällige Stimmen ${due.length ? 'trainieren' : ''}</button></div>
    <div class="stats-overview"><article><strong>${accuracy}%</strong><span>Trefferquote</span></article><article><strong>${progress.totalCorrect}</strong><span>richtige Antworten</span></article><article><strong>${progress.longestStreak}</strong><span>längste Serie</span></article><article><strong>${progress.daily.streak}</strong><span>Tagesserie</span></article></div>
    <div class="dashboard-grid"><section class="dashboard-card"><h2>Arten-Meisterschaft</h2><div class="mastery-bars">${['Unbekannt','Gehört','Erkannt','Sicher','Feldbereit'].map((label,index) => `<div><span>${label}</span><div><i style="width:${levels[index]/birds.length*100}%"></i></div><strong>${levels[index]}</strong></div>`).join('')}</div></section>
      <section class="dashboard-card"><h2>Häufig verwechselt</h2>${confusions.length ? `<div class="confusion-list">${confusions.map(([key,count]) => { const [a,b]=key.split('>'); return `<button data-stat-compare="${a},${b}"><span>${birds.find(x=>x.id===a)?.name} ↔ ${birds.find(x=>x.id===b)?.name}</span><strong>${count}×</strong></button>`; }).join('')}</div>` : '<p class="empty-state">Noch keine Verwechslungen gespeichert.</p>'}</section></div>
    <section class="achievement-section"><div class="section-heading"><div><p class="eyebrow">Abzeichen</p><h2>Deine Sammlung</h2></div><span>${progress.achievements.length}/${ACHIEVEMENTS.length}</span></div><div class="achievement-grid">${ACHIEVEMENTS.map((achievement) => { const won=progress.achievements.some((item)=>item.id===achievement.id); return `<article class="${won?'won':''}"><span>${won?achievement.icon:'·'}</span><strong>${achievement.name}</strong><p>${achievement.description}</p></article>`; }).join('')}</div></section>
  </div>`;
  document.querySelector('#stats-review').addEventListener('click', () => due.length ? startGame({mode:'adaptive',dueOnly:true}) : renderModeSelect());
  document.querySelectorAll('[data-stat-compare]').forEach((button) => button.addEventListener('click', () => renderCompare(...button.dataset.statCompare.split(','))));
}

async function downloadOfflinePack(habitatId, button) {
  if (!('caches' in window)) { showToast('Offline-Speicher wird hier nicht unterstützt.'); return; }
  const habitat = getHabitat(habitatId); const packBirds = birds.filter((bird) => habitat.ids.includes(bird.id));
  button.disabled = true;
  const cache = await caches.open('zwitscher-audio-v1');
  let saved = 0;
  for (const bird of packBirds) {
    button.textContent = `${saved}/${packBirds.length} laden …`;
    const url = commonsFile(bird.file);
    try {
      let response;
      try { response = await fetch(url, { mode:'cors' }); } catch (_) { response = await fetch(url, { mode:'no-cors' }); }
      if (response.ok || response.type === 'opaque') { await cache.put(url, response.clone()); saved += 1; }
    } catch (_) {}
  }
  localStorage.setItem(`zwitscher-offline-${habitatId}`, String(saved));
  button.textContent = `✓ ${saved} Stimmen offline`;
  showToast(`${habitat.label} ist offline verfügbar.`);
}

function renderSettings() {
  abandonSession(); state.view = 'settings';
  view.innerHTML = `<div class="page-shell settings-page"><div class="page-head"><div><p class="eyebrow">Dein Erlebnis</p><h1>Einstellungen</h1><p>Training, Darstellung und Offline-Pakete anpassen.</p></div></div>
    <form class="settings-grid" id="settings-form"><label><span>Standardschwierigkeit<small>Gilt für neue freie Runden.</small></span><select name="difficulty"><option value="starter">Einsteiger</option><option value="advanced">Fortgeschritten</option><option value="expert">Experte</option></select></label><label><span>Lernregion<small>Filtert regionalere Arten grob vor.</small></span><select name="region"><option value="all">Deutschland gesamt</option><option value="north">Norddeutschland</option><option value="central">Mitteldeutschland</option><option value="south">Süddeutschland</option></select></label>
      <label><span>Aktuelle Jahreszeit<small>Nur Arten trainieren, die im aktuellen Monat typisch sind.</small></span><input type="checkbox" name="seasonal"></label><label><span>Räumliches Hören<small>Stimmen leicht links oder rechts platzieren.</small></span><input type="checkbox" name="spatial"></label><label><span>Entspannter Lernmodus<small>Ohne Punktabzug und Zeitdruck-Anmutung.</small></span><input type="checkbox" name="relaxed"></label><label><span>Hoher Kontrast<small>Verstärkt Flächen und Konturen.</small></span><input type="checkbox" name="contrast"></label><label><span>Textgröße<small>Für längeres entspanntes Lesen.</small></span><select name="textSize"><option value="normal">Normal</option><option value="large">Groß</option></select></label><label><span>Wetteratmosphäre<small>Ruhige Kulisse ohne Einfluss auf das Quiz.</small></span><select name="weather"><option value="still">Still</option><option value="breeze">Blätterwind</option><option value="rain">Sommerregen</option></select></label>
    </form>
    <section class="offline-section"><div class="section-heading"><div><p class="eyebrow">Für unterwegs</p><h2>Offline-Lebensräume</h2></div><span>App und Primäraufnahmen lokal sichern</span></div><div class="offline-grid">${HABITATS.map((habitat) => { const saved=localStorage.getItem(`zwitscher-offline-${habitat.id}`); return `<article><span>${habitat.icon}</span><div><strong>${habitat.label}</strong><small>${habitat.ids.length} Arten</small></div><button data-offline="${habitat.id}">${saved ? `✓ ${saved} Stimmen offline` : 'Herunterladen'}</button></article>`; }).join('')}</div></section>
    <div class="privacy-note"><strong>Privat by design</strong><p>Fortschritt, Einstellungen und Feldnotizen bleiben lokal in diesem Browser. Es gibt kein Konto und keine Übertragung persönlicher Einträge.</p></div>
  </div>`;
  const form = document.querySelector('#settings-form');
  Object.entries(progress.settings).forEach(([key,value]) => { const field=form.elements[key]; if (!field) return; if (field.type==='checkbox') field.checked=Boolean(value); else field.value=value; });
  form.addEventListener('change', () => {
    progress.settings.difficulty=form.elements.difficulty.value; progress.settings.region=form.elements.region.value; progress.settings.seasonal=form.elements.seasonal.checked; progress.settings.spatial=form.elements.spatial.checked; progress.settings.relaxed=form.elements.relaxed.checked; progress.settings.contrast=form.elements.contrast.checked; progress.settings.textSize=form.elements.textSize.value; progress.settings.weather=form.elements.weather.value; saveProgress(); applySettings(); showToast('Einstellungen gespeichert');
  });
  document.querySelectorAll('[data-offline]').forEach((button) => button.addEventListener('click', () => downloadOfflinePack(button.dataset.offline, button)));
}

function updateSoundButton() {
  soundButton.classList.toggle('muted', state.muted);
  soundButton.setAttribute('aria-pressed', String(state.muted));
  soundButton.setAttribute('aria-label', state.muted ? 'Ton einschalten' : 'Ton ausschalten');
}

soundButton.addEventListener('click', () => {
  state.muted = !state.muted;
  if (state.muted) stopAudio(); else if (state.view === 'quiz' && state.mode !== 'clue') playCurrentAudio();
  updateSoundButton();
});
document.querySelector('#home-button').addEventListener('click', renderHome);
document.querySelector('#collection-button').addEventListener('click', renderCollection);
document.querySelector('#stats-button').addEventListener('click', renderStats);
document.querySelector('#journal-button').addEventListener('click', () => renderJournal());
document.querySelector('#settings-button').addEventListener('click', renderSettings);

document.addEventListener('keydown', (event) => {
  if (state.view === 'quiz' && !state.answered) {
    const number = Number(event.key);
    if (state.difficulty !== 'expert' && number >= 1 && number <= state.options.length) answer(state.options[number - 1].id);
    if (event.code === 'Space' && state.mode !== 'clue') { event.preventDefault(); toggleAudio(); }
  }
  if (state.view === 'compare' && ['a','b'].includes(event.key.toLowerCase())) {
    const buttons = [...document.querySelectorAll('[data-compare-play]')];
    const button = buttons[event.key.toLowerCase() === 'a' ? 0 : 1]; if (button) button.click();
  }
});

if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('./service-worker.js').catch(() => {});
applySettings();
renderHome();
