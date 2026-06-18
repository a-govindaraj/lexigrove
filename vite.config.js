import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
    }
  ],
  base: '/lexigrove/', // Match exact repo name (case-sensitive)
  build: {
    outDir: 'docs' // Output to docs folder for GitHub Pages
  }
})
