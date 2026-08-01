import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { isCommercialEditableLicense, licenseName } from './media-license.mjs';

const execFileAsync = promisify(execFile);
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const source = await readFile(join(ROOT, 'src', 'data', 'species.ts'), 'utf8');
const catalog = [...source.matchAll(/^\s*\['([^']+)','([^']+)','([^']+)'/gm)]
  .map((match) => ({ id:match[1], name:match[2], scientificName:match[3] }));
const query = process.argv[2];
const summaryOnly = process.argv.includes('--summary');
const bird = catalog.find((item) => item.id === query || item.scientificName.toLowerCase() === query?.toLowerCase());
if (!bird) throw new Error(`Art angeben, z. B. npm run discover:audio -- amsel`);

async function curlJson(url) {
  const { stdout } = await execFileAsync('curl', ['--http1.1','-sL','--fail','--connect-timeout','8','--max-time','30',url], { maxBuffer:24 * 1024 * 1024 });
  return JSON.parse(stdout);
}

const openverseParams = new URLSearchParams({ q:`"${bird.scientificName}"`, license:'by,by-sa,cc0,pdm', page_size:'20' });
const gbifParams = new URLSearchParams({ scientificName:bird.scientificName, mediaType:'Sound', limit:'100' });
const responses = await Promise.allSettled([
  curlJson(`https://api.openverse.org/v1/audio/?${openverseParams}`),
  curlJson(`https://api.gbif.org/v1/occurrence/search?${gbifParams}`),
]);
const openverse = responses[0].status === 'fulfilled' ? responses[0].value : { results:[] };
const gbif = responses[1].status === 'fulfilled' ? responses[1].value : { results:[] };
responses.forEach((result, index) => {
  if (result.status === 'rejected') process.stderr.write(`${index === 0 ? 'Openverse' : 'GBIF'} nicht erreichbar: ${result.reason.message}\n`);
});

const candidates = [
  ...(openverse.results ?? []).filter((item) => isCommercialEditableLicense(item.license_url)).map((item) => ({
    provider:`Openverse/${item.source}`, license:licenseName(item.license_url), creator:item.creator || 'siehe Quelle',
    title:item.title?.replace(/<[^>]+>/g, '') || bird.scientificName, sourceUrl:item.foreign_landing_url, audioUrl:item.url,
  })),
  ...(gbif.results ?? []).filter((item) => item.species === bird.scientificName).flatMap((item) => (item.media ?? [])
    .filter((media) => media.type === 'Sound' && isCommercialEditableLicense(media.license))
    .map((media) => ({
      provider:`GBIF/${media.publisher || item.datasetName}`, license:licenseName(media.license),
      creator:media.creator || media.rightsHolder || 'siehe Quelle', title:`${bird.scientificName} · GBIF ${item.key}`,
      sourceUrl:media.references || item.references, audioUrl:media.identifier,
    }))),
];
const unique = [...new Map(candidates.filter((item) => item.audioUrl && item.sourceUrl).map((item) => [item.audioUrl, item])).values()];
const providers = unique.reduce((result, item) => {
  result[item.provider] = (result[item.provider] ?? 0) + 1;
  return result;
}, {});

process.stdout.write(`${bird.name} (${bird.scientificName})\n`);
for (const [provider, count] of Object.entries(providers).sort(([,a],[,b]) => b-a)) process.stdout.write(`${provider}: ${count}\n`);
process.stdout.write(`Geeignete Kandidaten in den ersten Suchseiten: ${unique.length}\n\n`);
if (!summaryOnly) process.stdout.write(`${JSON.stringify(unique.slice(0, 12), null, 2)}\n`);
