import { execFile } from 'node:child_process';
import { readFile, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { isCommercialEditableLicense, isExplicitlyForbiddenLicense } from './media-license.mjs';

const execFileAsync = promisify(execFile);
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const MANIFEST_PATH = join(ROOT, 'public', 'media', 'manifest.json');
const shouldDelete = process.argv.includes('--delete');
const online = process.argv.includes('--online');
const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
const originalRecordingCount = manifest.recordings.length;
const rejectedById = new Map(manifest.recordings
  .filter((item) => isExplicitlyForbiddenLicense(item.license, item.licenseUrl))
  .map((item) => [item.id, item]));
const unclearById = new Map(manifest.recordings
  .filter((item) => !isCommercialEditableLicense(item.license, item.licenseUrl) && !isExplicitlyForbiddenLicense(item.license, item.licenseUrl))
  .map((item) => [item.id, item]));
let onlineConfirmed = 0;
let onlineUnverified = 0;

function commonsTitle(sourceUrl) {
  try {
    const marker = '/wiki/';
    const pathname = new URL(sourceUrl).pathname;
    if (!pathname.includes(marker)) return null;
    return decodeURIComponent(pathname.slice(pathname.indexOf(marker) + marker.length)).replaceAll('_', ' ');
  } catch { return null; }
}

if (online) {
  const titled = manifest.recordings.map((item) => ({ item, title:commonsTitle(item.sourceUrl) }));
  const byTitle = new Map();
  for (const { item, title } of titled) {
    if (!title) continue;
    const key = title.toLowerCase();
    byTitle.set(key, [...(byTitle.get(key) ?? []), item]);
  }
  const titles = [...new Set(titled.map(({ title }) => title).filter(Boolean))];
  for (let start = 0; start < titles.length; start += 25) {
    const params = new URLSearchParams({
      action:'query', titles:titles.slice(start, start + 25).join('|'), prop:'imageinfo',
      iiprop:'extmetadata', format:'json', formatversion:'2',
    });
    try {
      const { stdout } = await execFileAsync('curl', ['-4','--http1.1','-sL','--fail','--connect-timeout','8','--max-time','30',`https://commons.wikimedia.org/w/api.php?${params}`], { maxBuffer:16 * 1024 * 1024 });
      const data = JSON.parse(stdout);
      for (const page of data.query?.pages ?? []) {
        const items = byTitle.get(page.title?.toLowerCase()) ?? [];
        if (!items.length) continue;
        const meta = page.imageinfo?.[0]?.extmetadata ?? {};
        const licenseValues = [meta.LicenseShortName?.value, meta.UsageTerms?.value, meta.LicenseUrl?.value];
        const suitable = isCommercialEditableLicense(...licenseValues);
        if (suitable) onlineConfirmed += items.length;
        else if (isExplicitlyForbiddenLicense(...licenseValues)) items.forEach((item) => rejectedById.set(item.id, item));
        else onlineUnverified += items.length;
      }
    } catch { onlineUnverified += Math.min(25, titles.length - start); }
  }
  onlineUnverified += titled.filter(({ title }) => !title).length;
  onlineUnverified += Math.max(0, originalRecordingCount - onlineConfirmed - rejectedById.size - onlineUnverified);
}

const rejected = [...rejectedById.values()];

if (rejected.length && shouldDelete) {
  await Promise.all(rejected.map((item) => unlink(join(ROOT, 'public', item.src.replace(/^\//, ''))).catch(() => undefined)));
  const rejectedIds = new Set(rejected.map((item) => item.id));
  manifest.recordings = manifest.recordings.filter((item) => !rejectedIds.has(item.id));
  manifest.totalBytes = [...manifest.recordings, ...manifest.photos].reduce((sum, item) => sum + item.bytes, 0);
  manifest.generatedAt = new Date().toISOString();
  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
}

const licenses = Object.entries(manifest.recordings.reduce((result, item) => {
  result[item.license] = (result[item.license] ?? 0) + 1;
  return result;
}, {})).sort(([a], [b]) => a.localeCompare(b));
for (const [license, count] of licenses) process.stdout.write(`${license}: ${count}\n`);
process.stdout.write(`Geeignet: ${originalRecordingCount - rejected.length - unclearById.size} · Explizit ungeeignet: ${rejected.length}${shouldDelete ? ' gelöscht' : ''} · Unklar: ${unclearById.size}\n`);
if (online) process.stdout.write(`Online bestätigt: ${onlineConfirmed} · Nicht verifiziert: ${onlineUnverified}\n`);
if (rejected.length && !shouldDelete || unclearById.size) process.exitCode = 1;
