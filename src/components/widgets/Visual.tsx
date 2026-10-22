import { motion } from 'framer-motion'
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import type { ShapeSpec, Visual } from '../../engine/types'
import { Art, type ArtId } from '../art/objects'

const INK = '#27304a'

const pop = (i: number) => ({
  initial: { scale: 0, rotate: -12, opacity: 0 },
  animate: { scale: 1, rotate: 0, opacity: 1 },
  transition: { type: 'spring' as const, stiffness: 420, damping: 18, delay: 0.04 * i },
})

/** False on the first paint, true right after, so CSS transitions can play on mount. */
function useArrived() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)))
    return () => cancelAnimationFrame(id)
  }, [])
  return on
}

// SVG transforms are done in CSS (transform-box: view-box), so origins are in the
// drawing's own coordinates. Framer's SVG origins are relative to each element's box.
const spin = (deg: number, ox: number, oy: number, delay = 0): CSSProperties => ({
  transform: `rotate(${deg}deg)`,
  transformOrigin: `${ox}px ${oy}px`,
  transformBox: 'view-box',
  transition: `transform 1.1s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
})

const row: CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }

/** Objects laid out in rows of five, so children can count in fives like on a ten-frame. */
function CountGrid({ art, n, size, crossFrom }: { art: ArtId; n: number; size: number; crossFrom?: number }) {
  const rows = Math.ceil(n / 5)
  return (
    <div style={{ display: 'grid', gap: 6, justifyItems: 'center' }}>
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: Math.min(5, n - r * 5) }, (_, c) => {
            const i = r * 5 + c
            const crossed = crossFrom !== undefined && i >= crossFrom
            return (
              <motion.div key={c} {...pop(i)} style={{ position: 'relative', opacity: crossed ? 0.45 : 1 }}>
                <Art id={art} size={size} />
                {crossed && (
                  <svg viewBox="0 0 64 64" width={size} height={size} style={{ position: 'absolute', inset: 0 }}>
                    <path d="M12 12L52 52M52 12L12 52" stroke="#c8553d" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                )}
              </motion.div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

function Clock({ hour, minute = 0, size = 170 }: { hour: number; minute?: number; size?: number }) {
  const on = useArrived()
  const ha = (((hour % 12) + minute / 60) / 12) * 360
  const ma = (minute / 60) * 360
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} role="img" aria-label={`A clock showing ${hour}:${String(minute).padStart(2, '0')}`}>
      <circle cx="100" cy="100" r="92" fill="#fbf4e6" stroke={INK} strokeWidth="6" />
      <circle cx="100" cy="100" r="82" fill="none" stroke="#c8553d" strokeWidth="3" strokeDasharray="2 10.9" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = ((i + 1) / 12) * Math.PI * 2
        return (
          <text key={i} x={100 + Math.sin(a) * 66} y={100 - Math.cos(a) * 66 + 8} textAnchor="middle" fontSize="22" fontWeight="700" fontFamily="Lexend Variable, sans-serif" fill={INK}>
            {i + 1}
          </text>
        )
      })}
      <line style={spin(on ? ha : ha - 120, 100, 100)} x1="100" y1="100" x2="100" y2="58" stroke={INK} strokeWidth="9" strokeLinecap="round" />
      <line style={spin(on ? ma : ma - 120, 100, 100)} x1="100" y1="100" x2="100" y2="34" stroke="#c8553d" strokeWidth="5" strokeLinecap="round" />
      <circle cx="100" cy="100" r="7" fill={INK} />
    </svg>
  )
}

const COIN: Record<number, ArtId> = { 1: 'coin1', 5: 'coin5', 10: 'coin10', 20: 'coin20', 50: 'note50', 100: 'note100' }

function Money({ values, size }: { values: number[]; size: number }) {
  return (
    <div style={row}>
      {values.map((v, i) => (
        <motion.div key={i} {...pop(i)}>
          <Art id={COIN[v]} size={v >= 50 ? size * 1.5 : size} title={`${v} shillings`} />
        </motion.div>
      ))}
    </div>
  )
}

const SHAPE_PATHS: Record<ShapeSpec['kind'], (s: number) => ReactNode> = {
  circle: (s) => <circle cx={s / 2} cy={s / 2} r={s * 0.42} />,
  oval: (s) => <ellipse cx={s / 2} cy={s / 2} rx={s * 0.45} ry={s * 0.3} />,
  square: (s) => <rect x={s * 0.1} y={s * 0.1} width={s * 0.8} height={s * 0.8} rx={2} />,
  rectangle: (s) => <rect x={s * 0.04} y={s * 0.24} width={s * 0.92} height={s * 0.52} rx={2} />,
  triangle: (s) => <path d={`M${s / 2} ${s * 0.08}L${s * 0.94} ${s * 0.9}H${s * 0.06}z`} />,
}

export function Shape({ spec, size = 64 }: { spec: ShapeSpec; size?: number }) {
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img" aria-label={spec.kind}>
      <g fill={spec.color ?? '#f2b33d'} stroke={INK} strokeWidth={3} strokeLinejoin="round">
        {SHAPE_PATHS[spec.kind](size)}
      </g>
    </svg>
  )
}

function Lines({ lines, variant = 0, compact }: { lines: ('straight' | 'curved')[]; variant?: number; compact?: boolean }) {
  const w = compact ? 120 : 92
  return (
    <div style={row}>
      {lines.map((l, i) => {
        const v = (variant + i) % 4
        const straight = ['M10 50L110 14', 'M10 32H110', 'M20 56L100 8', 'M10 14L110 50'][v]
        const curved = ['M10 50C40 -6 80 -6 110 50', 'M10 32C35 0 60 64 110 20', 'M14 14C80 10 100 40 40 56', 'M10 20C40 70 80 70 110 20'][v]
        return (
          <motion.svg key={i} {...pop(i)} viewBox="0 0 120 64" width={w} height={(w * 64) / 120}>
            <path d={l === 'straight' ? straight : curved} fill="none" stroke={['#c8553d', '#2f7d72', '#c9871c', '#3f8fa3'][i % 4]} strokeWidth="7" strokeLinecap="round" />
          </motion.svg>
        )
      })}
    </div>
  )
}

function Balance({ left, right, heavier }: { left: ArtId; right: ArtId; heavier: 'left' | 'right' }) {
  const on = useArrived()
  const tilt = on ? (heavier === 'left' ? -12 : 12) : 0
  return (
    <svg viewBox="0 0 320 200" width="min(100%, 380px)" role="img" aria-label="A balance">
      <path d="M140 190h40l-10-120h-20z" fill="#b5743e" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <g style={spin(tilt, 160, 70, 0.3)}>
        <rect x="30" y="64" width="260" height="12" rx="6" fill="#c9871c" stroke={INK} strokeWidth="4" />
        <g style={spin(-tilt, 60, 70, 0.3)}>
          <path d="M20 112h80l-10 14H30z" fill="#c9c2b4" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          <path d="M60 70L26 112M60 70l34 42" stroke={INK} strokeWidth="2.5" />
          <foreignObject x="28" y="58" width="64" height="58">
            <Art id={left} size={58} />
          </foreignObject>
        </g>
        <g style={spin(-tilt, 260, 70, 0.3)}>
          <path d="M220 112h80l-10 14h-60z" fill="#c9c2b4" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          <path d="M260 70l-34 42M260 70l34 42" stroke={INK} strokeWidth="2.5" />
          <foreignObject x="228" y="58" width="64" height="58">
            <Art id={right} size={58} />
          </foreignObject>
        </g>
      </g>
      <circle cx="160" cy="70" r="8" fill={INK} />
    </svg>
  )
}

/** Pencils and sticks are drawn at a true length; trees scale up. All start from one line so the comparison is fair. */
function Sizes({ art, scales, axis }: { art: ArtId; scales: number[]; axis: 'x' | 'y' | 'both' }) {
  if (axis === 'y' || axis === 'both') {
    return (
      <div style={{ ...row, alignItems: 'flex-end', borderBottom: `3px solid ${INK}`, paddingBottom: 2 }}>
        {scales.map((s, i) => (
          <motion.div key={i} {...pop(i)}>
            <Art id={art} size={60 + 80 * s} />
          </motion.div>
        ))}
      </div>
    )
  }
  return (
    <div style={{ display: 'grid', gap: 10, borderLeft: `3px solid ${INK}`, paddingLeft: 2 }}>
      {scales.map((s, i) => {
        const len = 40 + 180 * s
        return (
          <motion.svg key={i} initial={{ width: 0 }} animate={{ width: len }} transition={{ duration: 0.5, delay: i * 0.08 }} height="28" viewBox={`0 0 ${len} 28`} preserveAspectRatio="none">
            {art === 'pencil' ? (
              <>
                <path d={`M0 6h${len - 26}l20 8-20 8H0z`} fill="#f2b33d" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
                <path d={`M${len - 26} 6l20 8-20 8z`} fill="#f4dcae" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
                <path d={`M${len - 10} 11.5l4 2.5-4 2.5z`} fill={INK} />
                <rect x="0" y="6" width="12" height="16" fill="#c8553d" stroke={INK} strokeWidth="2.6" />
              </>
            ) : (
              <rect x="1" y="8" width={len - 4} height="12" rx="6" fill="#b5743e" stroke={INK} strokeWidth="2.6" />
            )}
          </motion.svg>
        )
      })}
    </div>
  )
}

function Units({ art, unit, n }: { art: ArtId; unit: ArtId; n: number }) {
  if (art === 'stick') {
    const u = 38
    return (
      <div style={{ display: 'grid', gap: 2, justifyItems: 'start' }}>
        <svg width={u * n} height="26" viewBox={`0 0 ${u * n} 26`}>
          <rect x="1" y="6" width={u * n - 2} height="14" rx="7" fill="#b5743e" stroke={INK} strokeWidth="2.6" />
        </svg>
        <div style={{ display: 'flex' }}>
          {Array.from({ length: n }, (_, i) => (
            <motion.div key={i} {...pop(i)} style={{ width: u, display: 'grid', placeItems: 'center', borderRight: i < n - 1 ? '2px dashed rgba(42,27,18,.35)' : 'none' }}>
              <Art id={unit} size={u - 4} />
            </motion.div>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div style={row}>
      <Art id={art} size={92} />
      <span className="display" style={{ fontSize: 40, fontWeight: 700 }}>
        =
      </span>
      <div style={{ ...row, maxWidth: 260, gap: 2 }}>
        {Array.from({ length: n }, (_, i) => (
          <motion.div key={i} {...pop(i)}>
            <Art id={unit} size={46} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Tens({ tens, ones }: { tens: number; ones: number }) {
  const bundle = (
    <svg viewBox="0 0 44 90" width="30" height="62">
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={2 + i * 4} y="4" width="3" height="82" rx="1.5" fill="#c99560" stroke={INK} strokeWidth="1" />
      ))}
      <rect x="0" y="38" width="44" height="12" rx="3" fill="#c8553d" stroke={INK} strokeWidth="2" />
    </svg>
  )
  return (
    <div style={{ ...row, gap: 18, alignItems: 'flex-end' }}>
      <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', maxWidth: 200 }}>
        {Array.from({ length: tens }, (_, i) => (
          <motion.div key={i} {...pop(i)}>
            {bundle}
          </motion.div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 3 }}>
        {Array.from({ length: ones }, (_, i) => (
          <motion.svg key={i} {...pop(tens + i)} viewBox="0 0 8 90" width="6" height="62">
            <rect x="1" y="4" width="5" height="82" rx="2" fill="#c99560" stroke={INK} strokeWidth="1.4" />
          </motion.svg>
        ))}
      </div>
    </div>
  )
}

const box = (blank: boolean): CSSProperties => ({
  minWidth: 64,
  height: 64,
  padding: '0 10px',
  display: 'grid',
  placeItems: 'center',
  borderRadius: 16,
  fontSize: 30,
  fontWeight: 700,
  border: `3px ${blank ? 'dashed' : 'solid'} ${INK}`,
  background: blank ? 'rgba(242,179,61,.25)' : '#fff',
  color: blank ? '#c9871c' : INK,
})

function Sequence({ items }: { items: (number | string | null)[] }) {
  return (
    <div style={{ ...row, gap: 6 }}>
      {items.map((v, i) => (
        <motion.div key={i} {...pop(i)} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={box(v === null)}>{v === null ? '?' : v}</div>
          {i < items.length - 1 && <span style={{ opacity: 0.4, fontWeight: 700 }}>›</span>}
        </motion.div>
      ))}
    </div>
  )
}

function Sum({ a, b, op, result, vertical }: { a: number; b: number; op: '+' | '−'; result?: number | null; vertical?: boolean }) {
  const cell = (v: number | null | undefined) => (v === null || v === undefined || v < 0 ? <span style={{ ...box(true), display: 'inline-grid' }}>?</span> : v)
  if (vertical) {
    return (
      <div className="display" style={{ fontSize: 46, fontWeight: 700, lineHeight: 1.1, textAlign: 'right', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.12em' }}>
        <div>{a}</div>
        <div>
          <span style={{ marginRight: 18, color: '#c8553d' }}>{op}</span>
          {b}
        </div>
        <div style={{ borderTop: `4px solid ${INK}`, marginTop: 4, paddingTop: 6, display: 'flex', justifyContent: 'flex-end' }}>{cell(result)}</div>
      </div>
    )
  }
  return (
    <div className="display" style={{ ...row, fontSize: 48, fontWeight: 700, gap: 14 }}>
      <span>{cell(a)}</span>
      <span style={{ color: '#c8553d' }}>{op}</span>
      <span>{cell(b)}</span>
      <span>=</span>
      <span>{cell(result)}</span>
    </div>
  )
}

function Passage({ title, text }: { title?: string; text: string }) {
  return (
    <div style={{ background: '#f3efe6', borderRadius: 20, padding: '16px 20px', maxWidth: 600, textAlign: 'left' }}>
      {title && (
        <div className="display" style={{ fontSize: 22, marginBottom: 6, color: '#2f5d6b' }}>
          {title}
        </div>
      )}
      <p style={{ margin: 0, fontSize: 18, lineHeight: 1.75 }}>{text}</p>
    </div>
  )
}

function Pattern({ items }: { items: (ShapeSpec | null)[] }) {
  return (
    <div style={{ ...row, gap: 6 }}>
      {items.map((s, i) => (
        <motion.div key={i} {...pop(i)}>
          {s ? <Shape spec={s} size={50} /> : <div style={{ ...box(true), width: 54, height: 54, minWidth: 54 }}>?</div>}
        </motion.div>
      ))}
    </div>
  )
}

function Position({ art, where, size = 150 }: { art: ArtId; where: 'in' | 'on' | 'under' | 'beside' | 'behind'; size?: number }) {
  // An open crate; the object sits relative to it.
  const objPos: Record<string, { x: number; y: number; z: number; s: number }> = {
    in: { x: 52, y: 40, z: 1, s: 46 },
    on: { x: 52, y: 6, z: 3, s: 46 },
    under: { x: 58, y: 108, z: 3, s: 30 },
    beside: { x: 116, y: 62, z: 3, s: 46 },
    behind: { x: 62, y: 18, z: 0, s: 46 },
  }
  const o = objPos[where]
  const obj = (
    <foreignObject x={o.x} y={o.y} width={o.s} height={o.s}>
      <Art id={art} size={o.s} />
    </foreignObject>
  )
  return (
    <svg viewBox="0 0 170 150" width={size} height={(size * 150) / 170} role="img" aria-label={`${art} ${where} the box`}>
      <ellipse cx="80" cy="140" rx="70" ry="6" fill={INK} opacity="0.15" />
      {o.z === 0 && obj}
      {/* box raised on short legs so "under" has room */}
      <path d="M36 52h90v58H36z" fill="#c99560" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      {o.z === 1 && obj}
      <path d="M36 70h90v40H36z" fill="#b5743e" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M46 84h70M46 96h70" stroke={INK} strokeOpacity="0.3" strokeWidth="2.5" />
      <path d="M42 110v28M120 110v28" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      {o.z === 3 && obj}
    </svg>
  )
}

function Fraction({ parts, shaded, shape = 'bar' }: { parts: number; shaded: number; shape?: 'bar' | 'circle' }) {
  const fill = (i: number) => (i < shaded ? '#e0876a' : '#fdfbf7')
  if (shape === 'circle') {
    const r = 70
    return (
      <svg viewBox="0 0 160 160" width="160" height="160" role="img" aria-label={`${shaded} of ${parts} parts shaded`}>
        {Array.from({ length: parts }, (_, i) => {
          const a0 = (i / parts) * Math.PI * 2 - Math.PI / 2
          const a1 = ((i + 1) / parts) * Math.PI * 2 - Math.PI / 2
          const large = 1 / parts > 0.5 ? 1 : 0
          return <path key={i} d={`M80 80 L${80 + r * Math.cos(a0)} ${80 + r * Math.sin(a0)} A${r} ${r} 0 ${large} 1 ${80 + r * Math.cos(a1)} ${80 + r * Math.sin(a1)}Z`} fill={fill(i)} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        })}
      </svg>
    )
  }
  const w = Math.min(360, parts * 70)
  return (
    <svg viewBox={`0 0 ${w + 6} 76`} width={w + 6} height="76" role="img" aria-label={`${shaded} of ${parts} parts shaded`}>
      {Array.from({ length: parts }, (_, i) => (
        <rect key={i} x={3 + (i * w) / parts} y="3" width={w / parts} height="70" fill={fill(i)} stroke={INK} strokeWidth="2.5" />
      ))}
    </svg>
  )
}

const FIGURES: Record<string, ReactNode> = {
  tri2: <path d="M100 10L190 170H10Z M100 10L100 170" />,
  tri3: <path d="M100 10L190 170H10Z M100 10L70 170 M100 10L130 170" />,
  tri4: <path d="M100 10L190 170H10Z M55 90H145 M55 90L100 170L145 90" />,
  'rect-diag': <path d="M10 30H190V150H10Z M10 30L190 150" />,
  'rect-cross': <path d="M10 30H190V150H10Z M10 30L190 150 M190 30L10 150" />,
}

function Figure({ figure }: { figure: keyof typeof FIGURES }) {
  return (
    <svg viewBox="0 0 200 180" width="220" height="198" role="img" aria-label="A figure made of lines">
      <g fill="none" stroke={INK} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        {FIGURES[figure]}
      </g>
    </svg>
  )
}

/** Shillings and cents in two columns, worked like a paper sum. */
function Ledger({ rows, op }: { rows: [number, number][]; op: '+' | '−' }) {
  const cell: CSSProperties = { padding: '2px 14px', textAlign: 'right' }
  return (
    <table className="display" style={{ fontSize: 34, borderCollapse: 'collapse', fontVariantNumeric: 'tabular-nums', color: INK }}>
      <thead>
        <tr style={{ fontSize: 15, fontFamily: 'var(--font-body)', color: '#55607a' }}>
          <th />
          <th style={cell}>Sh</th>
          <th style={{ ...cell, borderLeft: `2px solid ${INK}` }}>cts</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([sh, cts], i) => (
          <tr key={i}>
            <td style={{ color: '#e0876a', paddingRight: 4 }}>{i === rows.length - 1 ? op : ''}</td>
            <td style={cell}>{sh}</td>
            <td style={{ ...cell, borderLeft: `2px solid ${INK}` }}>{String(cts).padStart(2, '0')}</td>
          </tr>
        ))}
        <tr>
          <td />
          <td style={{ ...cell, borderTop: `3px solid ${INK}` }}>?</td>
          <td style={{ ...cell, borderTop: `3px solid ${INK}`, borderLeft: `2px solid ${INK}` }}>?</td>
        </tr>
      </tbody>
    </table>
  )
}

export function VisualView({ v, compact = false }: { v: Visual; compact?: boolean }) {
  const s = compact ? 38 : 56
  switch (v.kind) {
    case 'count':
      return <CountGrid art={v.art} n={v.n} size={v.n > 10 ? s * 0.8 : s} />
    case 'groups':
      if (v.joiner === '−') return <CountGrid art={v.groups[0].art} n={v.groups[0].n} size={s} crossFrom={v.groups[0].n - v.groups[1].n} />
      return (
        <div style={{ ...row, gap: 16 }}>
          {v.groups.map((g, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {i > 0 && (
                <span className="display" style={{ fontSize: 44, fontWeight: 800, color: '#c8553d' }}>
                  {v.joiner === 'vs' ? 'or' : '+'}
                </span>
              )}
              <div style={{ padding: 8, borderRadius: 18, border: '2px dashed rgba(42,27,18,.3)' }}>
                <CountGrid art={g.art} n={g.n} size={s} />
              </div>
            </div>
          ))}
        </div>
      )
    case 'clock':
      return <Clock hour={v.hour} minute={v.minute} size={compact ? 110 : 170} />
    case 'money':
      return <Money values={v.values} size={compact ? 42 : 76} />
    case 'shapes':
      return (
        <div style={{ ...row, gap: 8, maxWidth: 420 }}>
          {v.shapes.map((sh, i) => (
            <motion.div key={i} {...pop(i)}>
              <Shape spec={sh} size={compact ? 64 : v.shapes.length > 4 ? 52 : 70} />
            </motion.div>
          ))}
        </div>
      )
    case 'sizes':
      return <Sizes art={v.art} scales={v.scales} axis={v.axis} />
    case 'balance':
      return <Balance left={v.left} right={v.right} heavier={v.heavier} />
    case 'units':
      return <Units art={v.art} unit={v.unit} n={v.n} />
    case 'tens':
      return <Tens tens={v.tens} ones={v.ones} />
    case 'sequence':
      return <Sequence items={v.items} />
    case 'sum':
      return <Sum {...v} />
    case 'passage':
      return <Passage title={v.title} text={v.text} />
    case 'lines':
      return <Lines lines={v.lines} variant={v.variant} compact={compact} />
    case 'pattern':
      return <Pattern items={v.items} />
    case 'fraction':
      return <Fraction parts={v.parts} shaded={v.shaded} shape={v.shape} />
    case 'figure':
      return <Figure figure={v.figure} />
    case 'ledger':
      return <Ledger rows={v.rows} op={v.op} />
    case 'position':
      return <Position art={v.art} where={v.where} size={compact ? 130 : 180} />
    case 'art':
      return (
        <div style={{ ...row, gap: 18 }}>
          {v.art.map((a, i) => (
            <motion.div key={i} {...pop(i)}>
              <Art id={a} size={v.art.length > 2 ? 96 : v.art.length === 2 ? 128 : 150} />
            </motion.div>
          ))}
        </div>
      )
  }
}
