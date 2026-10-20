// All sounds are synthesised: a kalimba-like pluck (sine + bright partial, fast decay)
// keeps the app tiny and the sound warm instead of arcade-like.
import { getProgress } from '../state/progress'

let ctx: AudioContext | null = null

function audio(): AudioContext | null {
  if (!getProgress().settings.sound) return null
  try {
    ctx ??= new AudioContext()
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

function pluck(freq: number, at: number, gain = 0.22, decay = 0.9) {
  const c = audio()
  if (!c) return
  const t = c.currentTime + at
  const out = c.createGain()
  out.gain.setValueAtTime(0.0001, t)
  out.gain.exponentialRampToValueAtTime(gain, t + 0.008)
  out.gain.exponentialRampToValueAtTime(0.0001, t + decay)
  out.connect(c.destination)
  for (const [mult, g] of [
    [1, 1],
    [2.01, 0.28],
    [5.4, 0.06],
  ] as const) {
    const o = c.createOscillator()
    const og = c.createGain()
    o.type = 'sine'
    o.frequency.value = freq * mult
    og.gain.value = g
    o.connect(og).connect(out)
    o.start(t)
    o.stop(t + decay + 0.05)
  }
}

const N = (semis: number) => 523.25 * Math.pow(2, semis / 12) // relative to C5

export const sfx = {
  tap: () => pluck(N(7), 0, 0.08, 0.18),
  select: () => pluck(N(12), 0, 0.1, 0.25),
  correct: () => {
    pluck(N(0), 0)
    pluck(N(4), 0.09)
    pluck(N(7), 0.18)
    pluck(N(12), 0.27, 0.18, 1.3)
  },
  // Not a buzzer: a soft, falling "hmm" so a wrong answer never feels like punishment.
  almost: () => {
    pluck(N(-3), 0, 0.14, 0.5)
    pluck(N(-7), 0.14, 0.12, 0.7)
  },
  whoosh: () => {
    const c = audio()
    if (!c) return
    const len = 0.6
    const buf = c.createBuffer(1, c.sampleRate * len, c.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.sin((Math.PI * i) / d.length) ** 2
    const src = c.createBufferSource()
    src.buffer = buf
    const f = c.createBiquadFilter()
    f.type = 'bandpass'
    f.Q.value = 0.8
    f.frequency.setValueAtTime(500, c.currentTime)
    f.frequency.exponentialRampToValueAtTime(2200, c.currentTime + len)
    const g = c.createGain()
    g.gain.value = 0.12
    src.connect(f).connect(g).connect(c.destination)
    src.start()
  },
  fanfare: () => {
    // Pentatonic climb: C D E G A C' E'
    ;[0, 2, 4, 7, 9, 12, 16].forEach((s, i) => pluck(N(s), i * 0.1, 0.18, 1.1))
  },
  star: (i: number) => pluck(N([12, 16, 19][i] ?? 19), 0, 0.2, 1.2),
}

// ── Read aloud ──────────────────────────────────────────────────────────────

let voices: SpeechSynthesisVoice[] = []
if (typeof speechSynthesis !== 'undefined') {
  const refresh = () => (voices = speechSynthesis.getVoices())
  refresh()
  speechSynthesis.addEventListener?.('voiceschanged', refresh)
}

function pickVoice(lang: 'en' | 'sw'): SpeechSynthesisVoice | undefined {
  const prefs = lang === 'sw' ? ['sw-KE', 'sw-TZ', 'sw'] : ['en-KE', 'en-GB', 'en-ZA', 'en-NG', 'en-IN', 'en-US', 'en']
  for (const p of prefs) {
    const v = voices.find((v) => v.lang.replace('_', '-').toLowerCase().startsWith(p.toLowerCase()))
    if (v) return v
  }
  return undefined
}

export function canSpeak() {
  return typeof speechSynthesis !== 'undefined'
}

export function speak(text: string, lang: 'en' | 'sw' = 'en'): Promise<void> {
  return new Promise((resolve) => {
    if (!canSpeak() || !getProgress().settings.voice) return resolve()
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text.replace(/_+/g, ' blank ').replace(/…/g, ', blank'))
    const v = pickVoice(lang)
    if (v) u.voice = v
    u.lang = v?.lang ?? (lang === 'sw' ? 'sw-KE' : 'en-GB')
    u.rate = 0.82
    u.pitch = 1.08
    u.onend = () => resolve()
    u.onerror = () => resolve()
    speechSynthesis.speak(u)
  })
}

export function stopSpeaking() {
  if (canSpeak()) speechSynthesis.cancel()
}
