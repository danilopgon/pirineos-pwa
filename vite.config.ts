import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Los iconos ya entran por globPatterns; sin esto se precachean dos veces.
      includeManifestIcons: false,
      manifest: {
        name: 'Pirineos sin bus · Benasque',
        short_name: 'Pirineos',
        description: 'Guía de 5 días de senderismo con base en Benasque, solo coche.',
        start_url: './',
        scope: './',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#101d1a',
        theme_color: '#101d1a',
        lang: 'es',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Solo woff2: @fontsource emite tambien .woff, que ningun navegador
        // con service worker necesita y duplicaria el peso de la precarga.
        globPatterns: ['**/*.{js,css,html,woff2,png,svg,webmanifest}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
})
