import { defineConfig } from 'vitest/config';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      includeAssets: ['icon.svg'],
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,json,webmanifest}'],
        globIgnores: ['media/**/*.{mp3,webp}'],
        cleanupOutdatedCaches: true,
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === self.location.origin && url.pathname.includes('/media/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'zwitscher-media-v2',
              expiration: { maxEntries: 500, purgeOnQuotaError: true },
            },
          },
        ],
      },
    }),
  ],
  build: { target: 'es2022', sourcemap: true },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    exclude: ['tests/e2e/**'],
    coverage: { reporter: ['text', 'html'] },
  },
});
