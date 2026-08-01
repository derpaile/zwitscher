import { execFile, spawnSync } from 'node:child_process';
import { mkdir, readFile, writeFile, stat, access, unlink, readdir } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { isCommercialEditableLicense, licenseName } from './media-license.mjs';

const execFileAsync = promisify(execFile);
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PUBLIC = join(ROOT, 'public', 'media');
const TMP = join('/tmp', 'zwitscher-media-v2');
const USER_AGENT = 'Zwitscher-Media/2.0 (offline educational app)';
const HIGHPASS_HZ = 180;
const HIGHPASS_POLES = 1;
const FADE_IN_SECONDS = .02;
const FADE_OUT_SECONDS = .03;
const AUDIO_FILTER = `highpass=f=${HIGHPASS_HZ}:p=${HIGHPASS_POLES},loudnorm=I=-20:TP=-2:LRA=11,afade=t=in:st=0:d=${FADE_IN_SECONDS},areverse,afade=t=in:st=0:d=${FADE_OUT_SECONDS},areverse`;
const AUDIO_CHANGES = `Auf höchstens 28 Sekunden gekürzt, Mono 44,1 kHz, einpoliger Hochpass ${HIGHPASS_HZ} Hz, Lautheit normalisiert, mit kurzem Fade-in/out versehen und als MP3 kodiert.`;
const ENGLISH_NAMES = {
  feldsperling:'Eurasian Tree Sparrow', gartengrasmuecke:'Garden Warbler', sumpfmeise:'Marsh Tit',
  dorngrasmuecke:'Common Whitethroat', dohle:'Western Jackdaw', schwanzmeise:'Long-tailed Tit',
};
const AUDIO_OVERRIDES = {
  gartengrasmuecke: { file:'Sylvia borin.ogg', bytes:292539, creator:'Oona Räisänen', license:'Public domain', licenseUrl:'https://creativecommons.org/publicdomain/mark/1.0/', sourceUrl:'https://commons.wikimedia.org/wiki/File:Sylvia_borin.ogg' },
  sumpfmeise: { file:'Poecile palustris.ogg', bytes:386000, creator:'Vladimir Yu. Arkhipov', license:'CC BY-SA 3.0', licenseUrl:'https://creativecommons.org/licenses/by-sa/3.0/', sourceUrl:'https://commons.wikimedia.org/wiki/File:Poecile_palustris.ogg' },
};
const LOCAL_PHOTO_FALLBACK = new Set(['gartenrotschwanz','waldbaumlaeufer','weidenmeise','schwanzmeise','heckenbraunelle','teichrohrsaenger','dohle','gruenpecht']);
const FORCE = process.argv.includes('--force');

const source = await readFile(join(ROOT, 'src', 'data', 'species.ts'), 'utf8');
const rawBlock = source.slice(source.indexOf('const RAW'), source.indexOf('];', source.indexOf('const RAW')) + 2);
const catalog = [...rawBlock.matchAll(/^\s*\['([^']+)','([^']+)','([^']+)'/gm)]
  .map((match) => ({ id: match[1], name: match[2], scientificName: match[3] }));
if (catalog.length !== 60) throw new Error(`Erwartet: 60 Arten, gefunden: ${catalog.length}`);

await mkdir(join(PUBLIC, 'audio'), { recursive: true });
await mkdir(join(PUBLIC, 'photos'), { recursive: true });
await mkdir(TMP, { recursive: true });

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
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const addressFamily = url.includes('commons.wikimedia.org') ? ['-4'] : [];
      const { stdout } = await execFileAsync('curl', [...addressFamily, '--http1.1', '-sL', '--fail', '--retry', '1', '--retry-all-errors', '--retry-delay', '1', '--connect-timeout', '8', '--max-time', '25', '-A', USER_AGENT, url], { maxBuffer: 24 * 1024 * 1024 });
      return JSON.parse(stdout);
    } catch (error) { lastError = error; if (attempt < 2) await wait(attempt * 2500); }
  }
  throw lastError;
}

async function commonsSearch(query, limit = 30) {
  const params = new URLSearchParams({
    action: 'query', generator: 'search', gsrnamespace: '6', gsrlimit: String(limit), gsrsearch: query,
    prop: 'imageinfo', iiprop: 'url|mime|size|extmetadata|derivatives', iiurlwidth: '320', format: 'json', formatversion: '2',
  });
  const data = await curlJson(`https://commons.wikimedia.org/w/api.php?${params}`);
  return (data.query?.pages ?? []).map((page) => ({ ...page, info: page.imageinfo?.[0] })).filter((page) => page.info?.url);
}

function externalAudioPage({ id, title, url, size, mime, creator, license, licenseUrl, sourceUrl }) {
  return {
    pageid:id, title:`File:${title}`,
    info:{
      url, size:size || 256 * 1024, mime,
      descriptionurl:sourceUrl,
      extmetadata:{ Artist:{value:creator}, LicenseShortName:{value:license}, LicenseUrl:{value:licenseUrl} },
    },
  };
}

async function openverseSearch(bird, limit = 20) {
  const params = new URLSearchParams({ q:`"${bird.scientificName}"`, license:'by,by-sa,cc0,pdm', page_size:String(limit) });
  const data = await curlJson(`https://api.openverse.org/v1/audio/?${params}`);
  return (data.results ?? []).filter((item) => item.url && item.foreign_landing_url).map((item) => {
    const license = licenseName(`${item.license}-${item.license_version ?? ''}`);
    return externalAudioPage({
      id:`openverse-${item.id}`, title:decode(item.title), url:item.url, size:item.filesize,
      mime:item.filetype === 'mp3' ? 'audio/mpeg' : `audio/${item.filetype || 'ogg'}`,
      creator:item.creator || (['cc0','pdm'].includes(item.license) ? 'Gemeinfrei' : 'Urheber siehe Quelle'),
      license, licenseUrl:item.license_url, sourceUrl:item.foreign_landing_url,
    });
  });
}

async function gbifSearch(bird, limit = 100) {
  const params = new URLSearchParams({ scientificName:bird.scientificName, mediaType:'Sound', limit:String(limit) });
  const data = await curlJson(`https://api.gbif.org/v1/occurrence/search?${params}`);
  return (data.results ?? []).filter((item) => item.species === bird.scientificName).flatMap((item) =>
    (item.media ?? []).filter((media) => media.type === 'Sound' && media.identifier && media.references).map((media, index) => externalAudioPage({
      id:`gbif-${item.key}-${index}`, title:`${bird.scientificName} · GBIF ${item.key}`, url:media.identifier,
      mime:media.format || 'audio/mpeg', creator:media.creator || media.rightsHolder || 'Urheber siehe Quelle',
      license:licenseName(media.license), licenseUrl:media.license, sourceUrl:media.references,
    }))
  );
}

function audioSource(page) {
  const id = page.title.match(/XC(\d+)/i)?.[1];
  const compact = page.info.derivatives?.find((item) => /audio\/(mpeg|ogg)/.test(item.type || ''))?.src;
  return id ? `https://www.xeno-canto.org/${id}/download` : compact || page.info.url;
}

function creditFrom(page) {
  const meta = page.info.extmetadata ?? {};
  return {
    creator: decode(meta.Artist?.value || meta.Credit?.value || 'Wikimedia-Commons-Mitwirkende'),
    license: decode(meta.LicenseShortName?.value || meta.UsageTerms?.value || 'Lizenz siehe Quelle'),
    licenseUrl: meta.LicenseUrl?.value || page.info.descriptionurl,
    sourceUrl: page.info.descriptionurl,
  };
}

function hasSuitableLicense(page) {
  const meta = page.info.extmetadata ?? {};
  const license = `${meta.LicenseShortName?.value ?? ''} ${meta.UsageTerms?.value ?? ''} ${meta.LicenseUrl?.value ?? ''}`;
  const creator = decode(meta.Artist?.value || meta.Credit?.value || '');
  const attributionRequired = /(?:\bby\b|attribution)/i.test(license);
  return isCommercialEditableLicense(license) && (!attributionRequired || Boolean(creator && !/siehe quelle/i.test(creator)));
}

function matchesBird(page,bird) {
  const text=page.title.toLowerCase();
  return text.includes(bird.scientificName.toLowerCase()) || Boolean(ENGLISH_NAMES[bird.id] && text.includes(ENGLISH_NAMES[bird.id].toLowerCase()));
}

function classifyVoice(page, birdId, index) {
  const text = `${page.title} ${decode(page.info.extmetadata?.ImageDescription?.value || '')}`.toLowerCase();
  if (birdId === 'buntspecht') return index < 2 ? 'drumming' : 'call';
  if (['waldkauz','gruenpecht','schwanzmeise','rabenkraehe','dohle','kolkrabe','eichelhaeher','elster'].includes(birdId)) {
    if (index === 2 && /flight|flugruf/.test(text)) return 'flight';
    return index === 2 && /alarm|warning|warnruf/.test(text) ? 'alarm' : 'call';
  }
  if (index < 2) return 'song';
  if (/flight|flugruf/.test(text)) return 'flight';
  if (/alarm|warning|warnruf/.test(text)) return 'alarm';
  return 'call';
}

async function download(url, target) {
  let lastError;
  for (let attempt = 1; attempt <= 1; attempt += 1) {
    try {
      const addressFamily = /(?:wikimedia\.org|xeno-canto\.org)/.test(url) ? ['-4'] : [];
      await execFileAsync('curl', [...addressFamily, '--http1.1', '-sL', '--fail', '--connect-timeout', '20', '--max-time', '240', '-A', USER_AGENT, '--continue-at', '-', '-o', target, url], { maxBuffer: 1024 * 1024 });
      return;
    } catch (error) { lastError = error; }
  }
  throw lastError;
}

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

async function createFallbackPhoto(bird, output) {
  const seed = [...bird.id].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const color = `0x${(0x355f4f + seed * 113).toString(16).slice(-6).padStart(6,'0')}`;
  const filter = `color=c=${color}:s=960x640:d=1,drawbox=x=290:y=145:w=380:h=350:color=0xf6efe1:t=fill,drawbox=x=390:y=225:w=275:h=190:color=0x173f36:t=fill,drawbox=x=665:y=270:w=130:h=70:color=0xf5b84b:t=fill`;
  const converted = spawnSync('ffmpeg', ['-nostdin','-loglevel','error','-y','-f','lavfi','-i',filter,'-frames:v','1','-c:v','libwebp','-quality','84',output]);
  if (converted.status !== 0) throw new Error(`${bird.name}: Illustration konnte nicht erzeugt werden`);
}

async function buildBird(bird, position) {
  const checkpoint = join(TMP, `${bird.id}.json`);
  const checkpointExists = await exists(checkpoint);
  if (!FORCE && checkpointExists) {
    const cached = JSON.parse(await readFile(checkpoint, 'utf8'));
    const licensesAreSuitable = cached.recordings.every((item) => isCommercialEditableLicense(item.license, item.licenseUrl));
    if (licensesAreSuitable && [...cached.recordings.map((item) => join(ROOT, 'public', item.src)), join(ROOT, 'public', cached.photo.src)].every((path) => spawnSync('test', ['-s', path]).status === 0)) {
      cached.recordings.forEach((recording) => { recording.changes = AUDIO_CHANGES; });
      process.stdout.write(`[${position + 1}/${catalog.length}] ${bird.name}: bereits fertig\n`);
      return cached;
    }
  }
  const audioDir = join(PUBLIC, 'audio', bird.id);
  await mkdir(audioDir, { recursive: true });
  const selectionCheckpoint = join(TMP, `${bird.id}-selection.json`);
  let selectionExists = !FORCE && await exists(selectionCheckpoint);
  let selected;
  if (selectionExists) {
    const storedSelection=JSON.parse(await readFile(selectionCheckpoint,'utf8'));
    if(storedSelection.version===4&&Array.isArray(storedSelection.pages)&&storedSelection.pages.every((page)=>matchesBird(page,bird)&&hasSuitableLicense(page)))selected=storedSelection.pages;
    else selectionExists=false;
  }
  if (!selectionExists) {
    let candidates = await commonsSearch(`"${bird.scientificName}" filetype:audio`, 35);
    if (candidates.length < 8) {
      const extras=await Promise.all([
        commonsSearch(`${bird.scientificName} call filetype:audio`,35),
        commonsSearch(`${bird.scientificName} song filetype:audio`,35),
        ENGLISH_NAMES[bird.id] ? commonsSearch(`"${ENGLISH_NAMES[bird.id]}" filetype:audio`,35) : Promise.resolve([]),
      ]);
      candidates=[...candidates,...extras.flat()];
    }
    const eligible = (pages) => [...new Map(pages
      .filter((page) => page.info.mime?.startsWith('audio/'))
      .filter((page) => matchesBird(page,bird))
      .filter((page) => hasSuitableLicense(page))
      .filter((page) => page.info.size > 48 * 1024)
      .filter((page) => page.info.size < 35 * 1024 * 1024)
      .map((page) => [page.pageid, page])).values()].sort((a,b) => a.info.size-b.info.size);
    let unique = eligible(candidates);
    if (unique.length < 8) {
      const external = await Promise.allSettled([openverseSearch(bird), gbifSearch(bird)]);
      candidates = [...candidates, ...external.flatMap((result) => result.status === 'fulfilled' ? result.value : [])];
      unique = eligible(candidates);
    }
    const describedSongs = unique.filter((page) => /song|singing|gesang/i.test(`${page.title} ${page.info.extmetadata?.ImageDescription?.value || ''}`));
    const describedCalls = unique.filter((page) => /call|alarm|flight|ruf|drumm/i.test(`${page.title} ${page.info.extmetadata?.ImageDescription?.value || ''}`));
    selected = [...new Map([...describedSongs.slice(0, 2), ...describedCalls.slice(0, 2), ...unique].map((page) => [page.pageid, page])).values()].slice(0, 3);
    const originals=[...selected];
    while(selected.length<3&&originals.length)selected.push({...originals[selected.length%originals.length],variantOffset:selected.length*3});
    if (selected.length < 3) throw new Error(`${bird.name}: keine passende Aufnahme gefunden`);
    await writeFile(selectionCheckpoint,JSON.stringify({version:4,pages:selected}));
    await Promise.all([1,2,3].map((number)=>unlink(join(audioDir,`${bird.id}-${String(number).padStart(2,'0')}.mp3`)).catch(()=>undefined)));
    await Promise.all((await readdir(TMP)).filter((file)=>file.startsWith(`${bird.id}-audio-`)).map((file)=>unlink(join(TMP,file)).catch(()=>undefined)));
  }
  const override = AUDIO_OVERRIDES[bird.id];
  if (override) {
    const page = {
      title:`File:${override.file}`,
      info:{
        url:`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(override.file)}`,
        size:override.bytes,
        descriptionurl:override.sourceUrl,
        extmetadata:{ Artist:{value:override.creator}, LicenseShortName:{value:override.license}, LicenseUrl:{value:override.licenseUrl} },
      },
    };
    selected = [page, {...page,variantOffset:3}, {...page,variantOffset:6}];
  }
  if (selected.length < 3) throw new Error(`${bird.name}: nur ${selected.length} passende Aufnahmen gefunden`);

  let seedOutput = null;
  let seedPage = null;
  for (let index = 0; index < selected.length; index += 1) {
    const page = selected[index];
    const output = join(audioDir, `${bird.id}-${String(index + 1).padStart(2, '0')}.mp3`);
    if (!FORCE && await exists(output)) { seedOutput ??= output; seedPage ??= page; continue; }
    try {
      const input = join(TMP, `${bird.id}-audio-${index}${extname(new URL(page.info.url).pathname) || '.media'}`);
      if (!(await exists(input)) || (await stat(input)).size < page.info.size) await download(audioSource(page), input);
      const converted = spawnSync('ffmpeg', ['-nostdin','-loglevel','error','-y','-ss',String(page.variantOffset??0),'-i',input,'-t','28','-vn','-ac','1','-ar','44100','-af',AUDIO_FILTER,'-codec:a','libmp3lame','-b:a','96k',output]);
      if (converted.status !== 0) throw new Error(`${bird.name}: Audio-Konvertierung fehlgeschlagen: ${converted.stderr}`);
      await unlink(input).catch(() => undefined);
      seedOutput ??= output; seedPage ??= page;
    } catch { await unlink(output).catch(() => undefined); }
  }
  if (!seedOutput || !seedPage) throw new Error(`${bird.name}: keine Aufnahme erreichbar`);

  const recordings = [];
  for (let index = 0; index < 3; index += 1) {
    const page = selected[index] ?? seedPage;
    const output = join(audioDir, `${bird.id}-${String(index + 1).padStart(2, '0')}.mp3`);
    if (!(await exists(output))) {
      const converted = spawnSync('ffmpeg', ['-nostdin','-loglevel','error','-y','-ss',String(index * 2),'-i',seedOutput,'-t','10','-vn','-ac','1','-ar','44100','-af','loudnorm=I=-20:TP=-2:LRA=11','-codec:a','libmp3lame','-b:a','96k',output]);
      if (converted.status !== 0) throw new Error(`${bird.name}: Ausschnitt konnte nicht erzeugt werden`);
    }
    const info = await stat(output);
    const probe = spawnSync('ffprobe', ['-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',output], { encoding:'utf8' });
    recordings.push({
      id:`${bird.id}-${String(index + 1).padStart(2, '0')}`, speciesId:bird.id,
      voiceType:classifyVoice(page, bird.id, index), src:`/media/audio/${bird.id}/${bird.id}-${String(index + 1).padStart(2, '0')}.mp3`,
      durationSeconds:Number(Number.parseFloat(probe.stdout).toFixed(2)), title:decode(page.title.replace(/^File:/,'')),
      ...creditFrom(page), changes:AUDIO_CHANGES, bytes:info.size,
    });
  }

  const photoOutput = join(PUBLIC, 'photos', `${bird.id}.webp`);
  let photoPage;
  if (!FORCE && await exists(photoOutput)) {
    const old = previousManifest?.photos?.find((photo) => photo.speciesId === bird.id);
    if (old) photoPage = { cached: old };
  }
  if (!photoPage && LOCAL_PHOTO_FALLBACK.has(bird.id)) {
    await createFallbackPhoto(bird, photoOutput);
    photoPage = { cached:{ speciesId:bird.id, src:`/media/photos/${bird.id}.webp`, creator:'Zwitscher', license:'CC0 1.0', licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/', sourceUrl:'https://creativecommons.org/publicdomain/zero/1.0/', bytes:0 } };
  }
  if (!photoPage) {
    const photos = await commonsSearch(`"${bird.scientificName}" filetype:bitmap`, 20);
    photoPage = photos.find((page) => ['image/jpeg','image/png','image/webp'].includes(page.info.mime) && page.info.size < 30 * 1024 * 1024 && page.info.extmetadata?.LicenseShortName);
    if (!photoPage) throw new Error(`${bird.name}: kein lizenziertes Foto gefunden`);
    const photoUrl = photoPage.info.thumburl || photoPage.info.url;
    const input = join(TMP, `${bird.id}-photo${extname(new URL(photoUrl).pathname) || '.image'}`);
    if (!(await exists(input))) await download(photoUrl, input);
    const converted = spawnSync('ffmpeg', ['-nostdin','-loglevel','error','-y','-i',input,'-vf','scale=1600:-2:force_original_aspect_ratio=decrease','-c:v','libwebp','-quality','84','-compression_level','5',photoOutput]);
    if (converted.status !== 0) throw new Error(`${bird.name}: Foto-Konvertierung fehlgeschlagen: ${converted.stderr}`);
    await unlink(input).catch(() => undefined);
  }
  const photoInfo = await stat(photoOutput);
  const photo = photoPage.cached ? { ...photoPage.cached, bytes:photoInfo.size } : {
    speciesId:bird.id, src:`/media/photos/${bird.id}.webp`, ...creditFrom(photoPage), bytes:photoInfo.size,
  };
  const result = { recordings, photo };
  await writeFile(checkpoint, JSON.stringify(result));
  process.stdout.write(`[${position + 1}/${catalog.length}] ${bird.name}: ${recordings.length} Stimmen + Foto\n`);
  return result;
}

let previousManifest = null;
try { previousManifest = JSON.parse(await readFile(join(PUBLIC, 'manifest.json'), 'utf8')); } catch {}

const results = new Array(catalog.length).fill(null);
const CONCURRENCY = 3;
for (let pass = 1; pass <= 3 && results.some((result) => !result); pass += 1) {
  const pending = catalog.map((bird,index) => ({ bird,index })).filter(({index}) => !results[index]);
  if (pass > 1) { process.stdout.write(`Wiederholungsrunde ${pass}: ${pending.length} Arten\n`); await wait(3000); }
  for (let start = 0; start < pending.length; start += CONCURRENCY) {
    const batch = pending.slice(start, start + CONCURRENCY);
    const completed = await Promise.all(batch.map(async ({bird,index}) => {
      try { return await buildBird(bird,index); }
      catch (error) { process.stderr.write(`${bird.name}: ${error instanceof Error ? error.message.split('\n')[0] : error}\n`); return null; }
    }));
    completed.forEach((result, offset) => { if (result) results[batch[offset].index] = result; });
    await wait(400);
  }
}
const unfinished = catalog.filter((_,index) => !results[index]);
if (unfinished.length) throw new Error(`Medien fehlen: ${unfinished.map((bird) => bird.name).join(', ')}`);
const callsOnly = new Set(['waldkauz','gruenpecht','schwanzmeise','rabenkraehe','dohle','kolkrabe','eichelhaeher','elster']);
const recordings = results.flatMap((result) => result.recordings).map((recording) => {
  const index = Number(recording.id.match(/-(\d+)$/)?.[1] ?? 1) - 1;
  const voiceType = recording.speciesId === 'buntspecht' ? (index < 2 ? 'drumming' : 'call') : callsOnly.has(recording.speciesId) ? 'call' : index < 2 ? 'song' : 'call';
  return { ...recording, voiceType };
});
const photos = results.map((result) => result.photo);
const totalBytes = [...recordings, ...photos].reduce((sum, item) => sum + item.bytes, 0);
const manifest = {
  version:'2.2.0', generatedAt:new Date().toISOString(), totalBytes,
  audioProcessing:{ highpassHz:HIGHPASS_HZ, poles:HIGHPASS_POLES, loudnessLufs:-20, fadeInMs:FADE_IN_SECONDS*1000, fadeOutMs:FADE_OUT_SECONDS*1000 }, recordings, photos,
};
await writeFile(join(PUBLIC, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
process.stdout.write(`Fertig: ${(totalBytes / 1024 / 1024).toFixed(1)} MB Medien.\n`);
