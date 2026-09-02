import { spawnSync } from 'node:child_process';
import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isCommercialEditableLicense } from './media-license.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const source = await readFile(join(root, 'src', 'data', 'species.ts'), 'utf8');
const rawBlock = source.slice(source.indexOf('const RAW'), source.indexOf('];', source.indexOf('const RAW')) + 2);
const ids = [...rawBlock.matchAll(/^\s*\['([^']+)','([^']+)','([^']+)'/gm)].map((match) => match[1]);
const manifest = JSON.parse(await readFile(join(root, 'public', 'media', 'manifest.json'), 'utf8'));
const failures = [];
const callsOnly = new Set(['waldkauz','gruenpecht','schwanzmeise','rabenkraehe','dohle','kolkrabe','eichelhaeher','elster']);
if (manifest.audioProcessing?.highpassHz !== 180 || manifest.audioProcessing?.poles !== 1) failures.push('Audiofilter: erwartet werden 180 Hz und ein Pol');
if (manifest.audioProcessing?.fadeInMs !== 20 || manifest.audioProcessing?.fadeOutMs !== 30) failures.push('Audioübergänge: erwartet werden 20 ms Fade-in und 30 ms Fade-out');
if (ids.length !== 60 || new Set(ids).size !== 60) failures.push(`Arten: ${ids.length}, eindeutig: ${new Set(ids).size}`);
for (const id of ids) {
  const recordings = manifest.recordings.filter((item) => item.speciesId === id);
  const photos = manifest.photos.filter((item) => item.speciesId === id);
  if (recordings.length < 4) failures.push(`${id}: nur ${recordings.length} Aufnahmen`);
  if (!callsOnly.has(id) && id !== 'buntspecht' && (recordings.filter((item) => item.voiceType === 'song').length < 2 || recordings.filter((item) => item.voiceType === 'call').length < 1)) failures.push(`${id}: benötigt zwei Gesänge und einen Ruf`);
  if (callsOnly.has(id) && recordings.some((item) => item.voiceType !== 'call')) failures.push(`${id}: Krähen-/Rufart enthält falschen Lauttyp`);
  if (id === 'buntspecht' && recordings.filter((item) => item.voiceType === 'drumming').length < 2) failures.push(`${id}: benötigt zwei Trommelvarianten`);
  if (photos.length !== 1) failures.push(`${id}: ${photos.length} Fotos`);
  for (const item of [...recordings, ...photos]) {
    if (!item.creator || !item.license || !item.licenseUrl || !item.sourceUrl) failures.push(`${item.src}: Lizenzdaten unvollständig`);
    try {
      const info = await stat(join(root, 'public', item.src.replace(/^\//, '')));
      if (!info.size) failures.push(`${item.src}: leer`);
      if (info.size !== item.bytes) failures.push(`${item.src}: Dateigröße im Manifest ist falsch`);
      if (item.src.endsWith('.mp3')) {
        const probe = spawnSync('ffprobe', ['-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',join(root, 'public', item.src.replace(/^\//, ''))], { encoding:'utf8' });
        if (probe.status !== 0 || !(Number.parseFloat(probe.stdout) > 0)) failures.push(`${item.src}: nicht dekodierbar`);
      }
    } catch { failures.push(`${item.src}: fehlt`); }
  }
  for (const item of recordings) {
    if (!isCommercialEditableLicense(item.license, item.licenseUrl)) failures.push(`${item.src}: Lizenz erlaubt keine kommerzielle Bearbeitung`);
    if (!item.changes) failures.push(`${item.src}: Bearbeitungshinweis fehlt`);
  }
}
const declaredBytes = [...manifest.recordings, ...manifest.photos].reduce((sum, item) => sum + item.bytes, 0);
if (declaredBytes > 150 * 1024 * 1024) failures.push(`Medienbudget überschritten: ${(declaredBytes/1024/1024).toFixed(1)} MB`);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Medien gültig: ${ids.length} Arten, ${manifest.recordings.length} Aufnahmen, ${manifest.photos.length} Fotos, ${(declaredBytes/1024/1024).toFixed(1)} MB.`);
