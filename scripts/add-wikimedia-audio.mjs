import { execFile, spawnSync } from 'node:child_process';
import { mkdir, readFile, rename, stat, unlink, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { isCommercialEditableLicense } from './media-license.mjs';

const execFileAsync = promisify(execFile);
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const MANIFEST_PATH = join(ROOT, 'public', 'media', 'manifest.json');
const TMP = join('/tmp', 'zwitscher-wikimedia-audio');
const USER_AGENT = 'Zwitscher-Media/2.3 (offline educational app)';
const TARGET = Number(process.argv.find((argument) => argument.startsWith('--target='))?.split('=')[1] ?? 4);
const DRY_RUN = process.argv.includes('--dry-run');
const SPECIES = process.argv.find((argument) => argument.startsWith('--species='))?.split('=')[1];
const AUDIO_FILTER = 'highpass=f=180:p=1,loudnorm=I=-20:TP=-2:LRA=11,afade=t=in:st=0:d=0.02,areverse,afade=t=in:st=0:d=0.03,areverse';
const AUDIO_CHANGES = 'Auf höchstens 28 Sekunden gekürzt, Mono 44,1 kHz, einpoliger Hochpass 180 Hz, Lautheit normalisiert, mit kurzem Fade-in/out versehen und als MP3 kodiert.';
const CALLS_ONLY = new Set(['waldkauz','gruenpecht','schwanzmeise','rabenkraehe','dohle','kolkrabe','eichelhaeher','elster']);

if (!Number.isInteger(TARGET) || TARGET < 1 || TARGET > 10) throw new Error('--target muss zwischen 1 und 10 liegen');

const source = await readFile(join(ROOT, 'src', 'data', 'species.ts'), 'utf8');
const rawBlock = source.slice(source.indexOf('const RAW'), source.indexOf('];', source.indexOf('const RAW')) + 2);
const fullCatalog = [...rawBlock.matchAll(/^\s*\['([^']+)','([^']+)','([^']+)'/gm)]
  .map((match) => ({ id:match[1], name:match[2], scientificName:match[3] }));
const catalog = SPECIES ? fullCatalog.filter((bird) => bird.id === SPECIES) : fullCatalog;
const speciesOrder = new Map(fullCatalog.map((bird,index) => [bird.id,index]));
if (!catalog.length) throw new Error(`Unbekannte Art: ${SPECIES}`);
const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
await mkdir(TMP, { recursive:true });

const decode = (value = '') => value
  .replace(/<br\s*\/?>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#0?39;/g, "'")
  .replace(/\s+/g, ' ')
  .trim();

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function curlJson(url) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const { stdout } = await execFileAsync('curl', [
        '-4','--http1.1','-sL','--fail','--retry','1','--retry-all-errors','--connect-timeout','10','--max-time','40',
        '-A',USER_AGENT,url,
      ], { maxBuffer:32 * 1024 * 1024 });
      return JSON.parse(stdout);
    } catch (error) {
      lastError = error;
      if (attempt < 3) await wait(attempt * 1000);
    }
  }
  throw lastError;
}

async function commonsSearch(query) {
  const params = new URLSearchParams({
    action:'query', generator:'search', gsrnamespace:'6', gsrlimit:'50',
    gsrsearch:`"${query}" filetype:audio`,
    prop:'imageinfo', iiprop:'url|mime|size|extmetadata|derivatives',
    format:'json', formatversion:'2', origin:'*',
  });
  const data = await curlJson(`https://commons.wikimedia.org/w/api.php?${params}`);
  return (data.query?.pages ?? []).map((page) => ({ ...page, info:page.imageinfo?.[0] })).filter((page) => page.info?.url);
}

async function commonsPrefix(prefix) {
  const params = new URLSearchParams({
    action:'query', generator:'allimages', gaiprefix:prefix, gailimit:'100',
    prop:'imageinfo', iiprop:'url|mime|size|extmetadata|derivatives',
    format:'json', formatversion:'2', origin:'*',
  });
  const data = await curlJson(`https://commons.wikimedia.org/w/api.php?${params}`);
  return (data.query?.pages ?? []).map((page) => ({ ...page, info:page.imageinfo?.[0] })).filter((page) => page.info?.url);
}

async function commonsAudioCategory(name) {
  const params = new URLSearchParams({
    action:'query', generator:'categorymembers', gcmtitle:`Category:Audio files of ${name}`, gcmtype:'file', gcmlimit:'100',
    prop:'imageinfo', iiprop:'url|mime|size|extmetadata|derivatives',
    format:'json', formatversion:'2', origin:'*',
  });
  const data = await curlJson(`https://commons.wikimedia.org/w/api.php?${params}`);
  return (data.query?.pages ?? []).map((page) => ({ ...page, categoryMatched:true, info:page.imageinfo?.[0] })).filter((page) => page.info?.url);
}

function metadata(page) {
  const meta = page.info.extmetadata ?? {};
  return {
    creator:decode(meta.Artist?.value || meta.Credit?.value || ''),
    license:decode(meta.LicenseShortName?.value || meta.UsageTerms?.value || ''),
    licenseUrl:meta.LicenseUrl?.value || page.info.descriptionurl,
    sourceUrl:page.info.descriptionurl,
    description:decode(meta.ImageDescription?.value || ''),
  };
}

function eligible(page, identityNames, usedSources) {
  const meta = metadata(page);
  const licenseText = `${meta.license} ${meta.licenseUrl}`;
  const identityText = `${page.title} ${meta.description}`.toLowerCase();
  const exactSpecies = page.categoryMatched || identityNames.some((name) => identityText.includes(name.toLowerCase()));
  const attributionRequired = /(?:\bby\b|attribution)/i.test(licenseText);
  return (page.info.mime?.startsWith('audio/') || page.info.mime === 'application/ogg')
    && page.info.size >= 16 * 1024
    && page.info.size <= 35 * 1024 * 1024
    && exactSpecies
    && isCommercialEditableLicense(licenseText)
    && (!attributionRequired || Boolean(meta.creator))
    && !usedSources.has(meta.sourceUrl);
}

function score(page, bird) {
  const meta = metadata(page);
  const title = page.title.toLowerCase();
  const text = `${title} ${meta.description.toLowerCase()}`;
  let result = 0;
  if (title.includes(bird.scientificName.toLowerCase())) result += 100;
  if (/\b(song|singing|gesang)\b/.test(text)) result += 20;
  if (/\b(call|alarm|flight|ruf|drumm)/.test(text)) result += 15;
  if (/\bxc\d+/.test(title)) result += 5;
  result -= page.info.size / (1024 * 1024 * 100);
  return result;
}

function classifyVoice(page, bird) {
  const text = `${page.title} ${metadata(page).description}`.toLowerCase();
  if (bird.id === 'buntspecht') return /drumm|trommel/.test(text) ? 'drumming' : 'call';
  if (CALLS_ONLY.has(bird.id)) return 'call';
  if (/alarm|warning|warnruf/.test(text)) return 'alarm';
  if (/flight|flugruf/.test(text)) return 'flight';
  if (/call|ruf|jer-craûlant/.test(text)) return 'call';
  return 'song';
}

function audioSource(page) {
  const xenoCantoId = page.title.match(/XC(\d+)/i)?.[1];
  if (xenoCantoId) return `https://www.xeno-canto.org/${xenoCantoId}/download`;
  if (page.info.mime === 'application/ogg' || page.info.mime === 'audio/ogg') {
    const original = new URL(page.info.url);
    const marker = '/wikipedia/commons/';
    const relative = original.pathname.slice(original.pathname.indexOf(marker) + marker.length);
    const fileName = relative.slice(relative.lastIndexOf('/') + 1);
    return `${original.origin}${marker}transcoded/${relative}/${fileName}.mp3`;
  }
  return page.info.url;
}

async function download(url, target) {
  await execFileAsync('curl', [
    '-4','--http1.1','-sL','--fail','--retry','2','--retry-all-errors','--retry-delay','5','--retry-max-time','45',
    '--connect-timeout','15','--max-time','120',
    '-A',USER_AGENT,'-o',target,url,
  ], { maxBuffer:1024 * 1024 });
}

async function addRecording(bird, page, index) {
  const suffix = String(index).padStart(2, '0');
  const id = `${bird.id}-${suffix}`;
  const audioDir = join(ROOT, 'public', 'media', 'audio', bird.id);
  const extension = extname(new URL(page.info.url).pathname) || '.media';
  const input = join(TMP, `${id}${extension}`);
  const temporary = join(audioDir, `${id}.temporary.mp3`);
  const output = join(audioDir, `${id}.mp3`);
  await mkdir(audioDir, { recursive:true });
  try {
    await download(audioSource(page), input);
    const converted = spawnSync('ffmpeg', [
      '-nostdin','-loglevel','error','-y','-i',input,'-t','28','-vn','-ac','1','-ar','44100',
      '-af',AUDIO_FILTER,'-codec:a','libmp3lame','-b:a','96k',temporary,
    ], { encoding:'utf8' });
    if (converted.status !== 0) throw new Error(converted.stderr.trim() || 'Audio-Konvertierung fehlgeschlagen');
    await rename(temporary, output);
    const info = await stat(output);
    const probe = spawnSync('ffprobe', ['-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',output], { encoding:'utf8' });
    const credit = metadata(page);
    return {
      id, speciesId:bird.id, voiceType:classifyVoice(page,bird), src:`/media/audio/${bird.id}/${id}.mp3`,
      durationSeconds:Number(Number.parseFloat(probe.stdout).toFixed(2)), title:decode(page.title.replace(/^File:/,'')),
      creator:credit.creator, license:credit.license, licenseUrl:credit.licenseUrl, sourceUrl:credit.sourceUrl,
      bytes:info.size, changes:AUDIO_CHANGES,
    };
  } finally {
    await unlink(input).catch(() => undefined);
    await unlink(temporary).catch(() => undefined);
  }
}

async function saveManifest() {
  manifest.recordings.sort((a,b) => speciesOrder.get(a.speciesId) - speciesOrder.get(b.speciesId) || a.id.localeCompare(b.id));
  manifest.version = '2.3.0';
  manifest.generatedAt = new Date().toISOString();
  manifest.totalBytes = [...manifest.recordings, ...manifest.photos].reduce((sum,item) => sum + item.bytes, 0);
  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
}

let added = 0;
let missing = 0;
for (const [position,bird] of catalog.entries()) {
  const current = manifest.recordings.filter((item) => item.speciesId === bird.id);
  if (current.length >= TARGET) {
    process.stdout.write(`[${position + 1}/${catalog.length}] ${bird.name}: bereits ${current.length}\n`);
    continue;
  }
  const usedSources = new Set(current.map((item) => item.sourceUrl));
  const scientificAliases = current.map((item) => item.title.match(/^([A-Z][a-z]+ [a-z]+)/)?.[1]).filter(Boolean);
  const identityNames = [...new Set([bird.scientificName,...scientificAliases])];
  let pages = (await commonsSearch(bird.scientificName))
    .filter((page) => eligible(page,identityNames,usedSources))
    .sort((a,b) => score(b,bird) - score(a,bird));
  const needed = TARGET - current.length;
  if (pages.length < needed) {
    const aliases = [...new Set(current.map((item) => item.title.match(/ - (.+?) XC\d+/i)?.[1]).filter(Boolean))];
    const extras = (await Promise.all([
      ...identityNames.flatMap((name) => [commonsPrefix(name),commonsAudioCategory(name)]),
      ...aliases.map((alias) => commonsSearch(alias)),
    ])).flat();
    pages = [...new Map([...pages,...extras]
      .filter((page) => eligible(page,identityNames,usedSources))
      .map((page) => [page.pageid,page])).values()]
      .sort((a,b) => score(b,bird) - score(a,bird));
  }
  if (pages.length < needed) {
    if (!DRY_RUN) throw new Error(`${bird.name}: nur ${pages.length} neue Wikimedia-Aufnahmen gefunden`);
    missing += 1;
    process.stdout.write(`[${position + 1}/${catalog.length}] ${bird.name}: FEHLT (${pages.length}/${needed})\n`);
    continue;
  }
  if (DRY_RUN) {
    process.stdout.write(`[${position + 1}/${catalog.length}] ${bird.name}: ${pages.slice(0,needed).map((page) => page.title.replace(/^File:/,'')).join(' | ')}\n`);
    continue;
  }
  for (let offset = 0; offset < needed; offset += 1) {
    const recording = await addRecording(bird,pages[offset],current.length + offset + 1);
    manifest.recordings.push(recording);
    added += 1;
  }
  await saveManifest();
  process.stdout.write(`[${position + 1}/${catalog.length}] ${bird.name}: +${needed}\n`);
}

if (!DRY_RUN) await saveManifest();
if (DRY_RUN && missing) throw new Error(`${missing} Arten ohne genügend neue Wikimedia-Aufnahmen`);
process.stdout.write(DRY_RUN ? 'Wikimedia-Auswahl vollständig.\n' : `Fertig: ${added} Wikimedia-Aufnahmen ergänzt.\n`);
