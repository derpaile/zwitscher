import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
async function size(path) {
  const info = await stat(path);
  if (info.isFile()) return info.size;
  const entries = await readdir(path);
  return (await Promise.all(entries.map((entry) => size(join(path, entry))))).reduce((sum, value) => sum + value, 0);
}
const bytes = await size(join(root, 'dist'));
const mb = bytes / 1024 / 1024;
console.log(`Produktionspaket: ${mb.toFixed(1)} MB.`);
if (mb > 150) {
  console.error('Harte Obergrenze von 150 MB überschritten.');
  process.exit(1);
}
