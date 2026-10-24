// Captures the app's own art for the promo film: Kobe, the painted worlds and real phone
// screens. Needs the dev server on :5173 (npx vite --port 5173). Output: ./assets/
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const OUT = new URL('./assets/', import.meta.url).pathname
mkdirSync(OUT, { recursive: true })
const BASE = 'http://localhost:5173/'
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })

// Every landscape, large and still.
{
  const p = await b.newPage({ viewport: { width: 2000, height: 1700 }, deviceScaleFactor: 2 })
  await p.emulateMedia({ reducedMotion: 'reduce' })
  await p.goto(BASE + '?scenes')
  await p.waitForTimeout(2000)
  await p.addStyleTag({ content: 'main > div > span { display: none }' })
  const cards = await p.$$('main > div')
  const ids = ['lake-dusk', 'savanna-dawn', 'forest-mist', 'tea-hills', 'coast-sunset', 'flamingo-lake', 'golden-hills', 'rift-steam']
  for (let i = 0; i < cards.length; i++) await cards[i].screenshot({ path: `${OUT}scene-${ids[i]}.png` })
  await p.close()
}

// Kobe in each mood, on a transparent background.
{
  const p = await b.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 3 })
  await p.emulateMedia({ reducedMotion: 'reduce' })
  await p.goto(BASE + '?gallery')
  await p.waitForTimeout(1500)
  await p.addStyleTag({ content: 'html, body, main { background: transparent !important }' })
  const kobes = await p.$$('svg[aria-label="Kobe the tortoise"]')
  for (let i = 0; i < kobes.length; i++) await kobes[i].screenshot({ path: `${OUT}kobe-${i}.png`, omitBackground: true })
  console.log('kobes', kobes.length)
  await p.close()
}

// Real phone screens.
const phone = async (name, screen, after) => {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 })
  await ctx.addInitScript(() => localStorage.setItem('cbc:calm', 'off'))
  const p = await ctx.newPage()
  await p.goto(BASE + (screen ? '?screen=' + encodeURIComponent(JSON.stringify(screen)) : ''))
  await p.waitForTimeout(3500)
  if (after) await after(p)
  await p.screenshot({ path: `${OUT}screen-${name}.png` })
  await ctx.close()
}
await phone('home', null)
await phone('worlds', { name: 'worlds', grade: 'g4' })
await phone('map', { name: 'map', area: 'g3-math' })
await phone('learn', { name: 'learn', area: 'g4-science', sub: 'u4s-plants' })
await phone('results', { name: 'results', area: 'g3-math', sub: 't-frac', level: 2, paper: 1, correct: 8, total: 8 }, (p) => p.waitForTimeout(3500))
// A quiz question answered correctly: try each choice until the card turns green.
for (let i = 0; i < 4; i++) {
  let good = false
  await phone('quiz', { name: 'quiz', area: 'g3-math', sub: 't-frac', level: 2, paper: 3 }, async (p) => {
    const c = p.locator('.choice').nth(i)
    if (!(await c.count())) return
    await c.click()
    await p.waitForTimeout(1600)
    good = (await p.locator('.q-card.is-good').count()) > 0
  })
  if (good) break
}
await b.close()
console.log('done')
