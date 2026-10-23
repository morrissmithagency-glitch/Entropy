// The level ladder made visible: when a child grows a level, the little plant on the
// results page grows with them, from seed to sprout, sapling, acacia and baobab.
import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

const TRUNK = '#8a5a3c'
const LEAF = '#7fd6c8'
const LEAF2 = '#a9d98c'
const GOLD = '#f1cf87'

/** One drawing per level, in a 120 × 120 box standing on the ground at y = 104. */
const STAGES: ReactNode[] = [
  // Seed
  <g key="1">
    <ellipse cx="60" cy="100" rx="7" ry="5" fill="#c58b5c" />
    <path d="M57 98c2-2 5-2 7 0" stroke="#f3d9b0" strokeWidth="1.4" fill="none" strokeLinecap="round" />
  </g>,
  // Sprout
  <g key="2">
    <path d="M60 104V82" stroke={LEAF2} strokeWidth="3" strokeLinecap="round" />
    <path d="M60 86c-4-9-13-12-19-7 4 7 12 9 19 7z" fill={LEAF} />
    <path d="M60 82c4-9 13-12 19-7-4 7-12 9-19 7z" fill={LEAF2} />
  </g>,
  // Sapling
  <g key="3">
    <path d="M60 104V48" stroke={TRUNK} strokeWidth="3.4" strokeLinecap="round" />
    {[
      [56, -1],
      [66, 1],
      [76, -1],
      [50, 1],
    ].map(([y, d], i) => (
      <path key={i} d={`M60 ${y} c ${6 * d} -8 ${16 * d} -10 ${21 * d} -5 c ${-5 * d} 7 ${-14 * d} 8 ${-21 * d} 5 z`} fill={i % 2 ? LEAF2 : LEAF} />
    ))}
  </g>,
  // Acacia: a flat crown on branching arms
  <g key="4">
    <path d="M58 104l1-34c-6-6-15-10-24-12M61 70c5-8 13-13 23-16M60 80c-3-4-8-7-13-8" stroke={TRUNK} strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M16 52c6-14 28-20 44-20s38 5 46 18c3 5-3 8-10 8H26c-8 0-13-2-10-6z" fill={LEAF} />
    <path d="M30 44c10-8 22-10 32-10" stroke="#fff" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" fill="none" />
  </g>,
  // Baobab: a fat trunk with stubby arms and small crowns
  <g key="5">
    <path d="M44 104c4-18 4-40 0-56h32c-4 16-4 38 0 56z" fill={TRUNK} />
    <path d="M46 50l-12-14M52 48l-4-18M68 48l4-18M74 50l12-14" stroke={TRUNK} strokeWidth="5" strokeLinecap="round" />
    {[
      [30, 32, 11],
      [47, 26, 10],
      [73, 26, 10],
      [90, 32, 11],
      [60, 22, 9],
    ].map(([x, y, r], i) => (
      <circle key={i} cx={x} cy={y} r={r} fill={i % 2 ? LEAF2 : LEAF} />
    ))}
    <path d="M52 92c2-10 2-24 0-34" stroke="#fff" strokeOpacity=".15" strokeWidth="3" strokeLinecap="round" />
  </g>,
]

/** Grows from `from` to `to` (levels 1–5) after `delay` seconds. */
export function GrowTree({ from, to, size = 120, delay = 0 }: { from: number; to: number; size?: number; delay?: number }) {
  const reduce = useReducedMotion()
  const ease = [0.22, 1, 0.36, 1] as const
  const leaves = Array.from({ length: 6 }, (_, i) => ({ x: (i - 2.5) * 16, r: i * 50 }))
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="gt-glow">
          <stop offset="0" stopColor={GOLD} stopOpacity=".55" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>
      <motion.ellipse cx="60" cy="104" rx="44" ry="10" fill="url(#gt-glow)" initial={{ opacity: 0.3 }} animate={reduce ? { opacity: 0.6 } : { opacity: [0.3, 1, 0.6] }} transition={{ delay: delay + 0.2, duration: 1.6 }} />
      <path d="M22 104c12-5 64-5 76 0" stroke="rgba(255,255,255,.35)" strokeWidth="2" strokeLinecap="round" fill="none" />
      {reduce ? (
        STAGES[to - 1]
      ) : (
        <>
          <motion.g initial={{ opacity: 1, scale: 1 }} animate={{ opacity: 0, scale: 0.85 }} transition={{ delay, duration: 0.6, ease }} style={{ originX: '60px', originY: '104px' }}>
            {STAGES[from - 1]}
          </motion.g>
          <motion.g initial={{ opacity: 0, scaleY: 0.15, scaleX: 0.6 }} animate={{ opacity: 1, scaleY: [0.15, 1.06, 1], scaleX: [0.6, 1, 1] }} transition={{ delay: delay + 0.3, duration: 1.5, ease }} style={{ originX: '60px', originY: '104px' }}>
            {STAGES[to - 1]}
          </motion.g>
          {leaves.map((l, i) => (
            <motion.path
              key={i}
              d="M0 0c3-4 8-5 11-3-2 4-7 5-11 3z"
              fill={i % 2 ? LEAF : GOLD}
              initial={{ x: 60, y: 60, opacity: 0, rotate: l.r }}
              animate={{ x: 60 + l.x * 2.2, y: [60, 40, 96], opacity: [0, 1, 0], rotate: l.r + 160 }}
              transition={{ delay: delay + 1.1 + i * 0.06, duration: 2.2, ease: 'easeOut' }}
            />
          ))}
        </>
      )}
    </svg>
  )
}
