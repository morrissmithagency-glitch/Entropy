// A quiet nature bed: filtered brown noise that swells like wind over water, and a
// kalimba note now and then from a pentatonic scale. Starts only after a tap, as
// browsers require, and follows the sound setting.
import { getProgress } from '../state/progress'

let ctx: AudioContext | null = null
let master: GainNode | null = null
let chimeTimer: ReturnType<typeof setTimeout> | null = null
let running = false

const PENTA = [392, 440, 523.25, 587.33, 659.25, 783.99]

function chime() {
  if (!ctx || !master || !running) return
  const t = ctx.currentTime
  const f = PENTA[Math.floor(Math.random() * PENTA.length)]
  const g = ctx.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(0.05, t + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 3.5)
  g.connect(master)
  for (const [m, a] of [
    [1, 1],
    [2.01, 0.2],
  ] as const) {
    const o = ctx.createOscillator()
    const og = ctx.createGain()
    o.frequency.value = f * m
    og.gain.value = a
    o.connect(og).connect(g)
    o.start(t)
    o.stop(t + 3.6)
  }
  chimeTimer = setTimeout(chime, 5000 + Math.random() * 7000)
}

export const ambient = {
  start() {
    if (running || !getProgress().settings.sound) return
    try {
      ctx ??= new AudioContext()
      void ctx.resume()
      master = ctx.createGain()
      master.gain.value = 0
      master.connect(ctx.destination)
      master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 3)

      // Brown noise, two seconds looped.
      const len = ctx.sampleRate * 2
      const buf = ctx.createBuffer(1, len, ctx.sampleRate)
      const d = buf.getChannelData(0)
      let last = 0
      for (let i = 0; i < len; i++) {
        last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02
        d[i] = last * 3.2
      }
      const src = ctx.createBufferSource()
      src.buffer = buf
      src.loop = true
      const lp = ctx.createBiquadFilter()
      lp.type = 'lowpass'
      lp.frequency.value = 420
      const swell = ctx.createGain()
      swell.gain.value = 0.06
      const lfo = ctx.createOscillator()
      lfo.frequency.value = 0.07
      const lfoGain = ctx.createGain()
      lfoGain.gain.value = 0.035
      lfo.connect(lfoGain).connect(swell.gain)
      src.connect(lp).connect(swell).connect(master)
      src.start()
      lfo.start()
      running = true
      chimeTimer = setTimeout(chime, 2500)
    } catch {
      running = false
    }
  },
  stop() {
    running = false
    if (chimeTimer) clearTimeout(chimeTimer)
    if (ctx && master) {
      const m = master
      m.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8)
      setTimeout(() => m.disconnect(), 900)
    }
    master = null
  },
}
