// Kobe's walk along the bottom of the home page. Now and then he ambles to a new patch and
// nibbles the grass; sometimes a firefly appears and he chases it to the other side. Each
// step leaves a soft glowing footprint that fades behind him. Poking Kobe pauses the walk.
// He keeps the clock too: a flag on national days, yawns late at night, and a nap (with
// floating z's) when nobody has touched the page for a while.
import { motion, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useCalm } from '../state/calm'
import { Kobe } from './Kobe'

interface Print {
  id: number
  x: number
}

// Feet in Kobe's drawing (viewBox 230 × 180), facing right: a back foot and a front foot.
const FEET = [62, 170]
const FOOT_Y = 160
const NAP_AFTER = 40000

/** Kenya's national days (month is 1–12). */
const DAYS: [number, number, string][] = [
  [1, 1, 'Happy New Year!'],
  [6, 1, 'Happy Madaraka Day!'],
  [10, 20, 'Happy Mashujaa Day!'],
  [12, 12, 'Happy Jamhuri Day!'],
]
const holiday = () => {
  const d = new Date()
  return DAYS.find(([m, day]) => d.getMonth() + 1 === m && d.getDate() === day)?.[2]
}
const lateNight = () => {
  const h = new Date().getHours()
  return h >= 21 || h < 5
}
const WAKE = ['Oh! Hello!', 'I was resting my eyes.', 'Jambo again!']

export function KobeWander() {
  const box = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 760 ? 104 : 130))
  const x = useMotionValue(0)
  const [flip, setFlip] = useState(false)
  const [walking, setWalking] = useState(false)
  const [nibbling, setNibbling] = useState(false)
  const [prints, setPrints] = useState<Print[]>([])
  const [fly, setFly] = useState<{ x: number; leaving: boolean } | null>(null)
  const paused = useRef(false)
  const resume = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [line, setLine] = useState<{ text: string; key: number }>()
  const [asleep, setAsleep] = useState(false)
  const [yawning, setYawning] = useState(false)
  const [flag] = useState(() => !!holiday())
  const sleeping = useRef(false)
  // In calm mode Kobe sits and watches: no walking, no fireflies, no napping.
  const calm = useCalm()

  const talk = (text: string) => setLine({ text, key: Date.now() })

  // Others (the shooting star) can ask Kobe to speak.
  useEffect(() => {
    const on = (e: Event) => talk(String((e as CustomEvent).detail))
    window.addEventListener('kobe:say', on)
    return () => window.removeEventListener('kobe:say', on)
  }, [])

  // A greeting on national days; sleepy yawns late at night.
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    const day = holiday()
    if (day) timers.push(setTimeout(() => talk(day), 2500))
    if (lateNight()) {
      const yawn = (first: boolean) => {
        if (!sleeping.current) {
          setYawning(true)
          if (first) talk('Yaaawn…')
          timers.push(setTimeout(() => setYawning(false), 1900))
        }
        timers.push(setTimeout(() => yawn(false), 22000 + Math.random() * 16000))
      }
      timers.push(setTimeout(() => yawn(true), day ? 9000 : 5000))
    }
    return () => timers.forEach(clearTimeout)
  }, [])

  // Nap when the page has been left alone; wake gently on any touch.
  useEffect(() => {
    if (calm) return
    let t: ReturnType<typeof setTimeout>
    const nap = () => {
      sleeping.current = true
      paused.current = true
      setNibbling(false)
      setYawning(false)
      setAsleep(true)
    }
    const stir = () => {
      clearTimeout(t)
      if (sleeping.current) {
        sleeping.current = false
        setAsleep(false)
        talk(WAKE[Math.floor(Math.random() * WAKE.length)])
        clearTimeout(resume.current)
        resume.current = setTimeout(() => (paused.current = false), 3500)
      }
      t = setTimeout(nap, NAP_AFTER)
    }
    const events = ['pointerdown', 'pointermove', 'keydown', 'scroll', 'touchstart'] as const
    events.forEach((ev) => window.addEventListener(ev, stir, { passive: true }))
    t = setTimeout(nap, NAP_AFTER)
    return () => {
      clearTimeout(t)
      events.forEach((ev) => window.removeEventListener(ev, stir))
    }
  }, [calm])

  useEffect(() => {
    const onResize = () => setSize(window.innerWidth < 760 ? 104 : 130)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const el = box.current
    if (!el) return
    const kw = () => (window.innerWidth < 760 ? 104 : 130)
    const bounds = () => [8, Math.max(8, el.clientWidth - kw() - 8)] as const
    // Start where Kobe has always sat: right on phones, a quarter across on wide screens.
    x.set(window.innerWidth < 760 ? bounds()[1] - 4 : el.clientWidth * 0.26)
    if (calm) {
      setWalking(false)
      setFly(null)
      return
    }

    let alive = true
    let raf = 0
    let printId = 0
    let foot = 0
    const timers: ReturnType<typeof setTimeout>[] = []
    const sleep = (ms: number) => new Promise<void>((r) => timers.push(setTimeout(r, ms)))

    /** Walks to `to` at `speed` px/s, dropping footprints; stops early if Kobe is poked. */
    const walk = (to: number, speed: number, onStep?: (pos: number, dir: number) => void) =>
      new Promise<void>((done) => {
        const dir = to > x.get() ? 1 : -1
        setFlip(dir < 0)
        setWalking(true)
        let last = performance.now()
        let sinceStep = 0
        const step = (now: number) => {
          const dt = Math.min(0.05, (now - last) / 1000)
          last = now
          if (!alive || paused.current) {
            setWalking(false)
            return done()
          }
          const pos = x.get()
          const move = Math.min(Math.abs(to - pos), speed * dt)
          x.set(pos + dir * move)
          onStep?.(pos + dir * move, dir)
          sinceStep += move
          if (sinceStep >= 22) {
            sinceStep = 0
            foot = 1 - foot
            const k = kw() / 230
            const fx = dir > 0 ? FEET[foot] : 230 - FEET[foot]
            const id = ++printId
            setPrints((ps) => [...ps.slice(-24), { id, x: pos + fx * k }])
          }
          if (move < speed * dt || Math.abs(to - x.get()) < 0.5) {
            setWalking(false)
            return done()
          }
          raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
      })

    const life = async () => {
      await sleep(3500)
      while (alive) {
        if (paused.current) {
          await sleep(800)
          continue
        }
        const [lo, hi] = bounds()
        const here = x.get()
        if (Math.random() < 0.6 || hi - lo < 160) {
          // Graze: amble to another patch and nibble.
          let to = lo + Math.random() * (hi - lo)
          if (Math.abs(to - here) < 90) to = here > (lo + hi) / 2 ? Math.max(lo, here - 140) : Math.min(hi, here + 140)
          await walk(to, 24)
          if (!alive || paused.current) continue
          setNibbling(true)
          await sleep(2600 + Math.random() * 2400)
          setNibbling(false)
        } else {
          // A firefly drifts by; Kobe follows it to the far side.
          const to = here < (lo + hi) / 2 ? hi : lo
          const dir = to > here ? 1 : -1
          setFly({ x: here + kw() / 2 + dir * (kw() * 0.5 + 60), leaving: false })
          await sleep(900)
          let t = 0
          await walk(to, 46, (pos, d) => {
            t += 1
            setFly({ x: pos + kw() / 2 + d * (kw() * 0.5 + 56 + Math.sin(t / 9) * 12), leaving: false })
          })
          setFly((f) => (f ? { ...f, leaving: true } : f))
          await sleep(1600)
          setFly(null)
        }
        await sleep(6000 + Math.random() * 8000)
      }
    }
    void life()
    return () => {
      alive = false
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
    }
  }, [x, calm])

  useEffect(() => () => clearTimeout(resume.current), [])

  const onPoke = () => {
    paused.current = true
    setNibbling(false)
    clearTimeout(resume.current)
    resume.current = setTimeout(() => (paused.current = false), 8000)
  }

  const k = size / 230
  return (
    <div className="kw" ref={box} style={{ height: size * (180 / 230) }}>
      {prints.map((p) => (
        <motion.span
          key={p.id}
          className="kw-print"
          style={{ left: p.x - 4, bottom: (180 - FOOT_Y) * k - 3 }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.6, 1, 1] }}
          transition={{ duration: 3.4, times: [0, 0.08, 1], ease: 'easeOut' }}
          onAnimationComplete={() => setPrints((ps) => ps.filter((q) => q.id !== p.id))}
        />
      ))}
      {fly && (
        <motion.span
          className="kw-fly"
          style={{ left: fly.x - 5 }}
          initial={{ opacity: 0, y: 0 }}
          animate={fly.leaving ? { opacity: 0, y: -120, x: 30 } : { opacity: 1, y: [0, -8, 0] }}
          transition={fly.leaving ? { duration: 1.5, ease: 'easeIn' } : { opacity: { duration: 0.6 }, y: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } }}
        />
      )}
      <motion.div className="kw-kobe" style={{ x }}>
        <Kobe size={size} flip={flip} walking={walking && !asleep} nibbling={nibbling && !asleep} onPoke={onPoke} asleep={asleep} yawning={yawning} flag={flag} line={line} />
        {asleep &&
          [0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="kw-z"
              aria-hidden
              style={{ left: flip ? size * 0.12 : size * 0.78, fontSize: 13 + i * 4 }}
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{ opacity: [0, 0.9, 0], y: -60, x: flip ? -18 : 18 }}
              transition={{ duration: 3.6, delay: i * 1.2, repeat: Infinity, ease: 'easeOut' }}
            >
              z
            </motion.span>
          ))}
      </motion.div>
    </div>
  )
}
