// Records promo.html frame by frame and encodes the film with its soundtrack.
// Usage: node render.mjs [--page promo2.html --out name --music music2.py] [--stills 1,4.5,9] [--fps 30] [--workers 3]
// Serves the repo root on :8765 so the page can load the app's fonts from node_modules.
import { chromium } from 'playwright'
import { execFileSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'

const HERE = new URL('.', import.meta.url).pathname
const ROOT = join(HERE, '../..')
const OUT = join(HERE, 'out')
mkdirSync(OUT, { recursive: true })
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d }
const FPS = Number(arg('--fps', 30))
const stills = arg('--stills', '')
const PAGE = arg('--page', 'promo.html')
const NAME = arg('--out', 'cbc-helper-promo')
const MUSIC = arg('--music', 'music.py')
const PORT = Number(arg('--port', 8765))

const types = { '.html': 'text/html', '.png': 'image/png', '.woff2': 'font/woff2', '.js': 'text/javascript' }
const server = createServer(async (req, res) => {
  try {
    const path = join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname))
    if (!path.startsWith(ROOT)) throw new Error('outside')
    const body = await readFile(path)
    res.writeHead(200, { 'content-type': types[extname(path)] ?? 'application/octet-stream' })
    res.end(body)
  } catch { res.writeHead(404); res.end() }
}).listen(PORT)

// Several browsers render interleaved frames at once; WebGL in a headless browser runs on the
// CPU, so this scales with cores.
const WORKERS = Number(arg('--workers', 1))
async function openPage() {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
  const page = await browser.newPage({ viewport: { width: 1920, height: 1920 } })
  page.on('pageerror', (e) => console.error('page error:', e.message))
  page.on('console', (m) => m.type() === 'error' && !m.text().includes('404') && console.error('console:', m.text()))
  await page.goto(`http://localhost:${PORT}/marketing/promo/${PAGE}`)
  await page.evaluate(() => window.ready)
  return { browser, page }
}
const frame = async (page, t) => {
  const data = await page.evaluate((t) => { window.renderFrame(t); return document.getElementById('c').toDataURL('image/png') }, t)
  return Buffer.from(data.split(',')[1], 'base64')
}

const { writeFileSync, rmSync, existsSync, statSync } = await import('node:fs')
const first = await openPage()
const duration = await first.page.evaluate(() => window.DURATION)

if (stills) {
  for (const s of stills.split(',')) writeFileSync(join(OUT, `${NAME}-still-${s}.png`), await frame(first.page, Number(s)))
  await first.browser.close()
} else {
  // A page can publish cues (hits, footsteps) so the soundtrack lands on the picture.
  const cues = await first.page.evaluate(() => window.CUES ?? null)
  const cueFile = join(OUT, `${NAME}-cues.json`)
  writeFileSync(cueFile, JSON.stringify(cues))
  execFileSync('python3', [join(HERE, MUSIC), String(duration), join(OUT, `${NAME}.wav`), cueFile], { stdio: 'inherit' })
  const dir = join(OUT, `${NAME}-frames`)
  mkdirSync(dir, { recursive: true })
  const n = Math.round(duration * FPS)
  const pages = [first, ...(await Promise.all(Array.from({ length: WORKERS - 1 }, openPage)))]
  let done = 0
  const started = Date.now()
  await Promise.all(pages.map(async ({ page }, w) => {
    for (let i = w; i < n; i += WORKERS) {
      const file = join(dir, `${String(i).padStart(5, '0')}.png`)
      // resume: frames already on disk from an interrupted run are kept
      if (!existsSync(file) || statSync(file).size < 1000) writeFileSync(file, await frame(page, i / FPS))
      if (++done % 30 === 0) process.stdout.write(`\rframe ${done}/${n}  ${Math.round((Date.now() - started) / done)} ms/frame`)
    }
  }))
  await Promise.all(pages.map((p) => p.browser.close()))
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', join(dir, '%05d.png'),
    '-i', join(OUT, `${NAME}.wav`), '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '256k', '-shortest', '-movflags', '+faststart', join(OUT, `${NAME}.mp4`)], { stdio: 'inherit' })
  rmSync(dir, { recursive: true })
  console.log('\ndone:', join(OUT, `${NAME}.mp4`))
}
server.close()
