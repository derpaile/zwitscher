import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

const root = fileURLToPath(new URL('.',import.meta.url));

export default defineConfig(({ mode }) => ({
  base: loadEnv(mode, '.', '').VITE_BASE_PATH ?? '/',
  publicDir:false,
  build:{
    outDir:'.',
    emptyOutDir:false,
    copyPublicDir:false,
    minify:true,
    sourcemap:false,
    lib:{ entry:resolve(root,'src/main.ts'), formats:['es'], fileName:()=>'app.js', cssFileName:'app' },
  },
}));
