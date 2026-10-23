// The quiz progress bar as a growing vine: the stem lengthens with each answer and grows a
// leaf, full and green for a right answer, small and sandy for a miss. A bud marks now.
import { motion } from 'framer-motion'

export type VineState = 'good' | 'miss' | 'now' | 'todo'

const GAP = 30

export function Vine({ states, label }: { states: VineState[]; label: string }) {
  const n = states.length
  const w = n * GAP
  const pts = states.map((_, i) => [GAP / 2 + i * GAP, 15 + (i % 2 ? 3 : -3)] as const)
  let d = `M2 15 Q ${pts[0][0] / 2} ${pts[0][1]} ${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < n; i++) {
    const [x0, y0] = pts[i - 1]
    const [x1, y1] = pts[i]
    d += ` C ${x0 + GAP / 2} ${y0} ${x1 - GAP / 2} ${y1} ${x1} ${y1}`
  }
  d += ` L ${w - 2} ${pts[n - 1]?.[1] ?? 15}`
  const done = states.filter((s) => s === 'good' || s === 'miss').length
  const grown = n ? Math.max(0.03, (done === 0 ? 0.4 : done + 0.15) / n) : 0
  return (
    <div className="progress vine" role="img" aria-label={label}>
      <svg viewBox={`0 0 ${w} 30`} width="100%" height="30" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
        <path d={d} fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="2" strokeLinecap="round" />
        <motion.path d={d} fill="none" stroke="var(--lagoon)" strokeWidth="2.4" strokeLinecap="round" initial={false} animate={{ pathLength: Math.min(1, grown) }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} style={{ filter: 'drop-shadow(0 0 4px rgba(127,214,200,.6))' }} />
        {states.map((s, i) => {
          const [x, y] = pts[i]
          const up = i % 2 === 0
          if (s === 'good' || s === 'miss') {
            const good = s === 'good'
            return (
              <g key={i} transform={`translate(${x} ${y}) scale(${good ? 1 : 0.72})`}>
                <motion.path
                  d={up ? 'M0 0C2-6 8-10 13-10C12-5 7-1 0 0Z' : 'M0 0C2 6 8 10 13 10C12 5 7 1 0 0Z'}
                  fill={good ? 'var(--lagoon)' : 'var(--sand)'}
                  initial={{ scale: 0, rotate: up ? 20 : -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.25 }}
                  style={{ originX: 0, originY: up ? 1 : 0, filter: good ? 'drop-shadow(0 0 4px rgba(127,214,200,.7))' : undefined }}
                />
              </g>
            )
          }
          if (s === 'now')
            return (
              <motion.circle key={i} cx={x} cy={y} r={3.4} fill="var(--gold)" animate={{ scale: [1, 1.35, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} style={{ filter: 'drop-shadow(0 0 5px rgba(241,207,135,.8))' }} />
            )
          return <circle key={i} cx={x} cy={y} r={1.6} fill="rgba(255,255,255,.3)" />
        })}
      </svg>
    </div>
  )
}
