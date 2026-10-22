// Kobe's walk along the bottom of the home page. Now and then he ambles to a new patch and
// nibbles the grass; sometimes a firefly appears and he chases it to the other side. Each
// step leaves a soft glowing footprint that fades behind him. Poking Kobe pauses the walk.
import { motion, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Kobe } from './Kobe'

interface Print {
  id: number
  x: number
}

// Feet in Kobe's drawing (viewBox 230 × 180), facing right: a back foot and a front foot.
const FEET = [62, 170]
const FOOT_Y = 160

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
    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (still) return

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
  }, [x])

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
        <Kobe size={size} flip={flip} walking={walking} nibbling={nibbling} onPoke={onPoke} />
      </motion.div>
    </div>
  )
}
