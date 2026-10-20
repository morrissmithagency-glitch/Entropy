// Builds the whole app into one self-contained HTML file (JS, CSS and fonts inlined),
// for publishing as a single shareable page.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
  build: { outDir: 'dist-single', assetsInlineLimit: 100_000_000, chunkSizeWarningLimit: 4000 },
})
