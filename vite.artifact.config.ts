// Builds the whole app into one self-contained HTML file (JS, CSS and fonts inlined),
// for publishing as a single shareable page.
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

/**
 * Moves the inlined app script and stylesheet from <head> to the end of <body>. The page is
 * one large file, and the browser reads it top to bottom: with the code first, the splash
 * could not show until about two megabytes had been read. Module scripts run after the
 * page is parsed either way, so nothing else changes.
 */
function splashFirst(): Plugin {
  return {
    name: 'splash-first',
    enforce: 'post',
    generateBundle(_, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type !== 'asset' || !file.fileName.endsWith('.html')) continue
        let html = String(file.source)
        const moved: string[] = []
        html = html.replace(/<script type="module"[^>]*>[\s\S]*?<\/script>|<style rel="stylesheet"[^>]*>[\s\S]*?<\/style>/g, (m) => {
          moved.push(m)
          return ''
        })
        // Styles before the script, so the first render is already styled.
        moved.sort((a, b) => Number(a.startsWith('<script')) - Number(b.startsWith('<script')))
        file.source = html.replace('</body>', `${moved.join('\n')}\n</body>`)
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), viteSingleFile(), splashFirst()],
  base: './',
  build: { outDir: 'dist-single', assetsInlineLimit: 100_000_000, chunkSizeWarningLimit: 4000 },
})
