import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..',import.meta.url));
const bundleRoot = resolve(root,'src-tauri/target/release/bundle');
const app = resolve(bundleRoot,'macos/Zwitscher.app');
const dmgDir = resolve(bundleRoot,'dmg');
const dmg = resolve(dmgDir,'Zwitscher_2.0.0_aarch64.dmg');
const env = { ...process.env, PATH:'/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin' };

const build = spawnSync(resolve(root,'node_modules/.bin/tauri'),['build','--bundles','app'],{ cwd:root, env, stdio:'inherit' });
if (build.status !== 0) process.exit(build.status ?? 1);

mkdirSync(dmgDir,{ recursive:true });
const image = spawnSync('/usr/bin/hdiutil',['create','-volname','Zwitscher','-srcfolder',app,'-ov','-format','UDZO',dmg],{ cwd:root, stdio:'inherit' });
if (image.status !== 0) process.exit(image.status ?? 1);

console.log(`Mac-App: ${app}`);
console.log(`Installer: ${dmg}`);
