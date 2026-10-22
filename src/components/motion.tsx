// Small, calm motion pieces used across the app. Everything respects "reduce motion".
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

/** A number that counts up to its value, easing out, the first time it appears. */
export function CountUp({ to, duration = 1.1, delay = 0 }: { to: number; duration?: number; delay?: number }) {
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? to : 0)
  useEffect(() => {
    if (reduce || to === 0) {
      setN(to)
      return
    }
    let raf = 0
    let start = 0
    const t0 = setTimeout(() => {
      const tick = (t: number) => {
        if (!start) start = t
        const p = Math.min(1, (t - start) / (duration * 1000))
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay * 1000)
    return () => {
      clearTimeout(t0)
      cancelAnimationFrame(raf)
    }
  }, [to, duration, delay, reduce])
  return <>{n}</>
}

/**
 * A soft burst for a right answer: one ring of light and a few leaves drifting outward.
 * Place inside a positioned element; it covers it and never takes clicks.
 */
export function Bloom({ color = 'var(--lagoon)' }: { color?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return null
  const leaves = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * Math.PI * 2 + 0.4
    return { x: Math.cos(a) * 64, y: Math.sin(a) * 46, r: (a * 180) / Math.PI }
  })
  return (
    <span aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'grid', placeItems: 'center', overflow: 'visible' }}>
      <motion.span
        initial={{ scale: 0.4, opacity: 0.7 }}
        animate={{ scale: 1.9, opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'absolute', width: 70, height: 70, borderRadius: '50%', border: `2px solid ${color}` }}
      />
      {leaves.map((l, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 10 10"
          width="10"
          height="10"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.4, rotate: l.r }}
          animate={{ x: l.x, y: l.y, opacity: [0, 1, 0], scale: 1, rotate: l.r + 40 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.02 * i }}
          style={{ position: 'absolute' }}
        >
          <path d="M1 9C1 4 4 1 9 1 9 6 6 9 1 9z" fill={i % 2 ? 'var(--gold)' : color} />
        </motion.svg>
      ))}
    </span>
  )
}

/** A gentle tap on phones that support it. */
export function haptic(kind: 'right' | 'wrong' | 'tap') {
  try {
    if (!('vibrate' in navigator)) return
    navigator.vibrate(kind === 'right' ? 14 : kind === 'wrong' ? [22, 60, 22] : 6)
  } catch {
    /* not supported */
  }
}
