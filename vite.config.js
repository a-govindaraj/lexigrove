import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace(
          /%VITE_GA_MEASUREMENT_ID%/g,
          process.env.VITE_GA_MEASUREMENT_ID || 'G-91VHS1LPHM'
        )
      }
    },
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['lexigrove.svg', 'apple-touch-icon.png', 'robots.txt'],
      manifest: {
        name: 'Lexigrove — A Word a Day',
        short_name: 'Lexigrove',
        description: 'One carefully chosen word a day for professionals, 11+ students, and English learners.',
        theme_color: '#2E6B4F',
        background_color: '#F7F4ED',
        display: 'standalone',
        orientation: 'portrait',
        // start_url / scope follow the `base` below — update both if the base changes.
        start_url: '/lexigrove/',
        scope: '/lexigrove/',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        // SPA fallback so deep links work offline.
        navigateFallback: '/lexigrove/index.html',
      },
    }),
  ],
  base: '/lexigrove/', // Match exact repo name (case-sensitive)
  build: {
    outDir: 'docs' // Output to docs folder for GitHub Pages
  }
})
