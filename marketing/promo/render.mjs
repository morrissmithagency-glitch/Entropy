// Records promo.html frame by frame and encodes the film with its soundtrack.
// Usage: node render.mjs [--stills 1,4.5,9] [--fps 30]
// Serves the repo root on :8765 so the page can load the app's fonts from node_modules.
import { chromium } from 'playwright'
import { spawn, execFileSync } from 'node:child_process'
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

const types = { '.html': 'text/html', '.png': 'image/png', '.woff2': 'font/woff2', '.js': 'text/javascript' }
const server = createServer(async (req, res) => {
  try {
    const path = join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname))
    if (!path.startsWith(ROOT)) throw new Error('outside')
    const body = await readFile(path)
    res.writeHead(200, { 'content-type': types[extname(path)] ?? 'application/octet-stream' })
    res.end(body)
  } catch { res.writeHead(404); res.end() }
}).listen(8765)

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
page.on('pageerror', (e) => console.error('page error:', e.message))
await page.goto('http://localhost:8765/marketing/promo/promo.html')
await page.evaluate(() => window.ready)
const duration = await page.evaluate(() => window.DURATION)

async function frame(t) {
  const data = await page.evaluate((t) => { window.renderFrame(t); return document.getElementById('c').toDataURL('image/png') }, t)
  return Buffer.from(data.split(',')[1], 'base64')
}

if (stills) {
  const { writeFileSync } = await import('node:fs')
  for (const s of stills.split(',')) writeFileSync(join(OUT, `still-${s}.png`), await frame(Number(s)))
} else {
  execFileSync('python3', [join(HERE, 'music.py'), String(duration), join(OUT, 'music.wav')], { stdio: 'inherit' })
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
    '-i', join(OUT, 'music.wav'), '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', join(OUT, 'cbc-helper-promo.mp4')], { stdio: ['pipe', 'inherit', 'inherit'] })
  const n = Math.round(duration * FPS)
  for (let i = 0; i < n; i++) {
    const buf = await frame(i / FPS)
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
    if (i % 60 === 0) process.stdout.write(`\rframe ${i}/${n}`)
  }
  ff.stdin.end()
  await new Promise((r) => ff.on('close', r))
  console.log('\ndone:', join(OUT, 'cbc-helper-promo.mp4'))
}
await browser.close()
server.close()
