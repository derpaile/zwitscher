import { execFile } from 'node:child_process';
import { readFile, rename, stat, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const MANIFEST_PATH = join(ROOT, 'public', 'media', 'manifest.json');
const HIGHPASS_HZ = 180;
const POLES = 1;
const LOUDNESS_LUFS = -20;
const FADE_IN_MS = 20;
const FADE_OUT_MS = 30;
const MEDIA_VERSION = '2.2.0';
const AUDIO_CHANGES = `Auf höchstens 28 Sekunden gekürzt, Mono 44,1 kHz, einpoliger Hochpass ${HIGHPASS_HZ} Hz, Lautheit normalisiert, mit kurzem Fade-in/out versehen und als MP3 kodiert.`;
const FORCE = process.argv.includes('--force');
const SOURCE_REF = process.argv.find((argument) => argument.startsWith('--source-ref='))?.slice('--source-ref='.length);
const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));

if (!FORCE && manifest.audioProcessing?.highpassHz === HIGHPASS_HZ && manifest.audioProcessing?.poles === POLES) {
  manifest.version = MEDIA_VERSION;
  manifest.generatedAt = new Date().toISOString();
  manifest.recordings.forEach((recording) => { recording.changes = AUDIO_CHANGES; });
  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  process.stdout.write(`Audio ist bereits bei ${HIGHPASS_HZ} Hz hochpassgefiltert; Lizenzmetadaten wurden aktualisiert.\n`);
  process.exit(0);
}

const jobs = manifest.recordings.map((recording) => {
  const source = join(ROOT, 'public', recording.src.replace(/^\//, ''));
  const cleanSource = join('/tmp',`zwitscher-${recording.id}-source-${process.pid}.mp3`);
  return { recording, source, cleanSource, temporary:`${source.slice(0, -4)}.filtered-${process.pid}.mp3` };
});
if (manifest.audioProcessing && manifest.audioProcessing.poles !== POLES && !SOURCE_REF) {
  throw new Error('Eine bereits gefilterte Datei darf nicht erneut gefiltert werden. Originale mit --source-ref=HEAD verwenden oder Medien neu laden.');
}
const filter = `highpass=f=${HIGHPASS_HZ}:p=${POLES},loudnorm=I=${LOUDNESS_LUFS}:TP=-2:LRA=11,afade=t=in:st=0:d=${FADE_IN_MS/1000},areverse,afade=t=in:st=0:d=${FADE_OUT_MS/1000},areverse`;

try {
  for (let start = 0; start < jobs.length; start += 4) {
    const batch = jobs.slice(start, start + 4);
    await Promise.all(batch.map(async ({ recording, source, cleanSource, temporary }) => {
      const input = SOURCE_REF ? cleanSource : source;
      if (SOURCE_REF) {
        const repositoryPath = `public${recording.src}`;
        const { stdout } = await execFileAsync('git',['show',`${SOURCE_REF}:${repositoryPath}`],{ encoding:'buffer',maxBuffer:40*1024*1024 });
        await writeFile(cleanSource,stdout);
      }
      await execFileAsync('ffmpeg',[
        '-nostdin','-loglevel','error','-y','-i',input,'-vn','-ac','1','-ar','44100',
        '-af',filter,'-codec:a','libmp3lame','-b:a','96k',temporary,
      ]);
      if (SOURCE_REF) await unlink(cleanSource);
    }));
    process.stdout.write(`Gefiltert: ${Math.min(start + batch.length, jobs.length)}/${jobs.length}\n`);
  }

  for (const job of jobs) {
    await rename(job.temporary, job.source);
    job.recording.bytes = (await stat(job.source)).size;
  }
  manifest.generatedAt = new Date().toISOString();
  manifest.version = MEDIA_VERSION;
  manifest.audioProcessing = { highpassHz:HIGHPASS_HZ, poles:POLES, loudnessLufs:LOUDNESS_LUFS, fadeInMs:FADE_IN_MS, fadeOutMs:FADE_OUT_MS };
  manifest.recordings.forEach((recording) => { recording.changes = AUDIO_CHANGES; });
  manifest.totalBytes = [...manifest.recordings, ...manifest.photos].reduce((sum, item) => sum + item.bytes, 0);
  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  process.stdout.write(`Fertig: ${jobs.length} Aufnahmen, Hochpass ${HIGHPASS_HZ} Hz.\n`);
} catch (error) {
  await Promise.all(jobs.flatMap(({ temporary, cleanSource }) => [unlink(temporary).catch(() => undefined),unlink(cleanSource).catch(() => undefined)]));
  throw error;
}
