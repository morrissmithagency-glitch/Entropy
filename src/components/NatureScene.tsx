// Painted Kenyan landscapes, one per world. Ridges are generated from a seeded noise
// so each scene is stable; layers drift with the pointer for depth, mist breathes,
// and a canvas adds stars and fireflies. No outlines: depth comes from haze alone.
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { memo, useEffect, useMemo, useRef, type ReactNode } from 'react'
import { createRng } from '../engine/rng'
import { useCalm } from '../state/calm'

export type SceneId = 'lake-dusk' | 'savanna-dawn' | 'forest-mist' | 'tea-hills' | 'coast-sunset' | 'flamingo-lake' | 'golden-hills' | 'rift-steam'

/** Time of day for the home sky. */
export type SkyTime = 'dawn' | 'day' | 'golden' | 'night'

const W = 1600
const H = 1000

interface SceneSpec {
  sky: string[]
  glow: { x: number; y: number; r: number; color: string; disc?: string }
  stars: number
  motes: { count: number; color: string }
  layers: string[]
  horizon?: number
  water?: [string, string]
}

const SCENES: Record<SceneId, SceneSpec> = {
  'lake-dusk': {
    sky: ['#0a1430', '#1d2a58', '#5b4f80', '#e39c7d'],
    glow: { x: 1180, y: 190, r: 300, color: '#dfe6ff', disc: '#f4f1e6' },
    stars: 140,
    motes: { count: 26, color: '255, 214, 140' },
    layers: ['#5a5585', '#3a3b6c', '#232a52'],
    horizon: 640,
    water: ['#30305c', '#0a1124'],
  },
  'rift-steam': {
    sky: ['#101634', '#2d2d5c', '#7a5878', '#e0977a'],
    glow: { x: 1180, y: 190, r: 300, color: '#ffe2c8', disc: '#f8eadb' },
    stars: 90,
    motes: { count: 22, color: '255, 200, 150' },
    layers: ['#6a5584', '#46396a', '#28264e'],
    horizon: 640,
    water: ['#3d3360', '#0d1026'],
  },
  'savanna-dawn': {
    sky: ['#1c2850', '#5e4f7a', '#d5876f', '#f8cc9a'],
    glow: { x: 1050, y: 560, r: 420, color: '#ffd9a6', disc: '#fff0cf' },
    stars: 30,
    motes: { count: 40, color: '255, 222, 170' },
    layers: ['#a07b84', '#74556f', '#46344f', '#22182b'],
  },
  'forest-mist': {
    sky: ['#0c2126', '#21443e', '#5c8471', '#bfd3bd'],
    glow: { x: 420, y: 160, r: 520, color: '#e9f3d8' },
    stars: 0,
    motes: { count: 34, color: '220, 255, 190' },
    layers: ['#7a9a87', '#4f7564', '#2c4c42', '#10241f'],
  },
  'tea-hills': {
    sky: ['#12233c', '#3b6283', '#9dbccb', '#ece0cb'],
    glow: { x: 1240, y: 420, r: 380, color: '#fff3d6', disc: '#fff8e8' },
    stars: 10,
    motes: { count: 22, color: '255, 248, 220' },
    layers: ['#8ea8b6', '#5f8a74', '#3d6b4f', '#1d3d2b'],
  },
  'coast-sunset': {
    sky: ['#181334', '#4a2d5d', '#b15678', '#f5a271'],
    glow: { x: 800, y: 600, r: 460, color: '#ffc58f', disc: '#ffd9a1' },
    stars: 40,
    motes: { count: 18, color: '255, 205, 160' },
    layers: ['#6a3f68', '#3e2850'],
    horizon: 600,
    water: ['#7a4766', '#150f2c'],
  },
  'flamingo-lake': {
    sky: ['#211a3b', '#674878', '#cf7e93', '#f6c3b1'],
    glow: { x: 1180, y: 520, r: 380, color: '#ffd6c4', disc: '#ffe9dc' },
    stars: 50,
    motes: { count: 20, color: '255, 200, 210' },
    layers: ['#8a6283', '#5a4166', '#2c2140'],
    horizon: 650,
    water: ['#b97992', '#2a1e3c'],
  },
  'golden-hills': {
    sky: ['#1a2042', '#575482', '#d39c86', '#f6d99c'],
    glow: { x: 520, y: 470, r: 440, color: '#fff0c4', disc: '#fff6dc' },
    stars: 20,
    motes: { count: 36, color: '255, 230, 160' },
    layers: ['#b89383', '#8a6a7e', '#574766', '#2b2340'],
  },
}

/** A soft ridge line: layered sines plus seeded jitter, smoothed with quadratic curves. */
function ridge(seed: number, base: number, amp: number, freq: number, rough = 0.25): string {
  const rng = createRng(seed)
  const p1 = rng.next() * 10
  const p2 = rng.next() * 10
  const n = 48
  const pts: [number, number][] = []
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * (W + 200) - 100
    const y = base - amp * (0.55 * Math.sin(x * freq + p1) + 0.3 * Math.sin(x * freq * 2.7 + p2) + rough * (rng.next() - 0.5) * 2)
    pts.push([x, y])
  }
  let d = `M${pts[0][0]} ${H + 50} L${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2
    const my = (pts[i][1] + pts[i + 1][1]) / 2
    d += ` Q${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`
  }
  d += ` L${W + 100} ${H + 50}Z`
  return d
}

/** A rainforest edge: overlapping round crowns, like Kakamega seen from a hill. */
function Canopy({ seed, base, height, fill }: { seed: number; base: number; height: number; fill: string }) {
  const crowns = useMemo(() => {
    const rng = createRng(seed)
    const out: [number, number, number][] = []
    let x = -80
    while (x < W + 80) {
      const r = height * (0.35 + rng.next() * 0.45)
      out.push([x, base - r * (0.4 + rng.next() * 0.6), r])
      x += r * (0.9 + rng.next() * 0.6)
    }
    return out
  }, [seed, base, height])
  return (
    <g fill={fill}>
      {crowns.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} />
      ))}
      <rect x={-100} y={base - height * 0.2} width={W + 200} height={H - base + height + 60} />
    </g>
  )
}

function Acacia({ x, y, s, fill }: { x: number; y: number; s: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <path d="M-3 0l3-58c-9-6-22-10-32-11l2-4c11 1 23 5 31 10 6-9 17-15 28-18l2 4c-11 3-20 9-26 17l1 60z" />
      <path d="M-95-66c12-20 58-28 95-28s86 7 100 26c5 8-6 12-18 12H-78c-15 0-23-4-17-10z" />
    </g>
  )
}

function Palm({ x, y, s, fill, flip = false }: { x: number; y: number; s: number; fill: string; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} fill={fill}>
      <path d="M0 0c-4-80 6-170 34-250l8 2c-24 80-32 166-30 248z" />
      {[-70, -35, 0, 30, 65, 100].map((r) => (
        <path key={r} transform={`translate(38 -250) rotate(${r})`} d="M0 0c40-30 90-30 130-4-40-8-86-4-128 10z" />
      ))}
    </g>
  )
}

function Flamingo({ x, y, s, fill }: { x: number; y: number; s: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <path d="M0 0l2-40 3 0-2 40zM6 0l1-38 3 0-1 38z" />
      <path d="M-10-50c0-14 14-20 26-16 10 3 14 12 6 18-8 6-22 6-32-2z" />
      <path d="M14-62c6-12 4-24-2-34-4-6 0-12 6-10 6 2 8 8 4 12l-2 2c4 10 4 22-2 32z" />
    </g>
  )
}

function Dhow({ x, y, s, fill }: { x: number; y: number; s: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <path d="M-70 0h150l-24 18H-52z" />
      <path d="M0 0V-130l4 0V0z" />
      <path d="M4-128C60-90 74-40 70-6H6z" />
    </g>
  )
}

function MtKenya({ fill, snow }: { fill: string; snow: string }) {
  return (
    <g>
      <path d="M380 660 Q520 600 640 500 L700 452 L740 430 L770 360 L796 330 L812 262 L830 316 L852 292 L880 356 L912 380 L960 430 Q1080 560 1250 660 Z" fill={fill} />
      <path d="M740 430 L770 360 L796 330 L812 262 L830 316 L852 292 L880 356 L912 380 L890 392 L872 376 L858 398 L840 372 L824 400 L806 366 L790 404 L772 392 L756 420 Z" fill={snow} opacity="0.85" />
    </g>
  )
}

function useParallax(on: boolean) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  useEffect(() => {
    if (!on) return
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX / window.innerWidth - 0.5)
      y.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [x, y, on])
  return { sx: useSpring(x, { stiffness: 30, damping: 20 }), sy: useSpring(y, { stiffness: 30, damping: 20 }) }
}

const SVG_STYLE = { position: 'absolute', inset: 0, display: 'block', overflow: 'visible' } as const

/** One drawing of the scene, the same size and framing as every other. */
function Art({ children }: { children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" width="100%" height="100%" style={SVG_STYLE}>
      {children}
    </svg>
  )
}

/**
 * One depth of the landscape. It is its own GPU layer, so parallax only slides it. The still
 * shapes are painted once; anything that drifts or sways is passed as `moving` and drawn in
 * a separate, mostly empty layer above, so each frame repaints only those few shapes.
 */
function Layer({ sx, sy, depth, children, moving }: { sx: MotionValue<number>; sy: MotionValue<number>; depth: number; children?: ReactNode; moving?: ReactNode }) {
  const tx = useTransform(sx, (v) => v * -depth)
  const ty = useTransform(sy, (v) => v * -depth * 0.35)
  return (
    <motion.div style={{ position: 'absolute', inset: 0, x: tx, y: ty, willChange: 'transform' }}>
      {children && <Art>{children}</Art>}
      {moving && <Art>{moving}</Art>}
    </motion.div>
  )
}

/** A soft round glow drawn once, so each firefly is a cheap image copy rather than a new gradient every frame. */
function glowSprite(color: string, size: number) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')!
  const r = size / 2
  const grad = g.createRadialGradient(r, r, 0, r, r, r)
  grad.addColorStop(0, `rgba(${color}, 0.85)`)
  grad.addColorStop(0.25, `rgba(${color}, 0.25)`)
  grad.addColorStop(1, `rgba(${color}, 0)`)
  g.fillStyle = grad
  g.fillRect(0, 0, size, size)
  return c
}

/**
 * Stars that twinkle and fireflies that wander, drifting gently toward the pointer.
 * Drawn at 30 frames a second and at screen resolution: the motion is slow and the light
 * is soft, so the eye cannot tell, and phones keep their frames for the rest of the page.
 */
function Sky({ stars, motes, horizon, starAlpha = 1 }: { stars: number; motes: { count: number; color: string }; horizon: number; starAlpha?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    const resize = () => {
      w = c.clientWidth
      h = c.clientHeight
      c.width = w
      c.height = h
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(c)
    const rng = createRng(7)
    const starList = Array.from({ length: stars }, () => ({ x: rng.next(), y: rng.next() * (horizon / H) * 0.85, r: 0.4 + rng.next() * 1.1, p: rng.next() * 6.28, s: 0.5 + rng.next() * 1.5 }))
    const moteList = Array.from({ length: Math.round(motes.count * 0.45) }, () => ({ x: rng.next(), y: 0.5 + rng.next() * 0.45, vx: 0, vy: 0, p: rng.next() * 6.28, r: 0.6 + rng.next() * 1.1 }))
    const sprite = glowSprite(motes.color, 48)
    const starDot = glowSprite('255, 250, 235', 8)
    let px = 0.5
    let py = 0.6
    const onMove = (e: PointerEvent) => {
      const b = c.getBoundingClientRect()
      px = (e.clientX - b.left) / b.width
      py = (e.clientY - b.top) / b.height
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    let raf = 0
    let last = 0
    const draw = (t: number) => {
      if (!reduce) raf = requestAnimationFrame(draw)
      if (t - last < 32) return
      // Two steps of drift per drawn frame keep the old pace at half the frames.
      const steps = last ? Math.min(3, Math.round((t - last) / 16.7)) : 1
      last = t
      ctx.clearRect(0, 0, w, h)
      const time = t / 1000
      if (starAlpha > 0.05)
        for (const s of starList) {
          ctx.globalAlpha = starAlpha * (0.35 + 0.45 * (0.5 + 0.5 * Math.sin(time * s.s + s.p)))
          const d = s.r * 4
          ctx.drawImage(starDot, s.x * w - d / 2, s.y * h - d / 2, d, d)
        }
      for (const m of moteList) {
        for (let k = 0; k < steps; k++) {
          m.p += 0.01
          m.vx += Math.sin(m.p * 1.3) * 0.00004 + (px - m.x) * 0.000006
          m.vy += Math.cos(m.p) * 0.00004 + (py - m.y) * 0.000006
          m.vx *= 0.97
          m.vy *= 0.97
          m.x += m.vx
          m.y += m.vy
        }
        if (m.x < -0.05) m.x = 1.05
        if (m.x > 1.05) m.x = -0.05
        ctx.globalAlpha = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(time * 1.6 + m.p * 3))
        const d = m.r * 12
        ctx.drawImage(sprite, m.x * w - d / 2, m.y * h - d / 2, d, d)
      }
      ctx.globalAlpha = 1
    }
    if (reduce) draw(1000)
    else raf = requestAnimationFrame(draw)
    const onVis = () => {
      cancelAnimationFrame(raf)
      last = 0
      if (!document.hidden && !reduce) raf = requestAnimationFrame(draw)
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [stars, motes.count, motes.color, horizon, starAlpha])
  return <canvas ref={ref} aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

function Mist({ y, opacity, color = '255,255,255', dur = 70, reverse = false }: { y: number; opacity: number; color?: string; dur?: number; reverse?: boolean }) {
  return (
    <g style={{ animation: `mist-drift ${dur}s ease-in-out infinite alternate${reverse ? '-reverse' : ''}` }}>
      {[0, 420, 900, 1350].map((x, i) => (
        <ellipse key={i} cx={x + 120} cy={y + (i % 2) * 18} rx={420} ry={46} fill={`url(#mist-${color.replace(/,/g, '-')})`} opacity={opacity} />
      ))}
    </g>
  )
}

/** Soft clouds drifting slowly across the sky. */
function Clouds({ y, opacity = 0.35 }: { y: number; opacity?: number }) {
  return (
    <g className="ns-clouds" opacity={opacity}>
      {[
        [80, 0, 260, 34],
        [260, 22, 180, 24],
        [760, -30, 300, 38],
        [960, -10, 200, 26],
        [1380, 16, 260, 30],
      ].map(([x, dy, rx, ry], i) => (
        <ellipse key={i} cx={x} cy={y + dy} rx={rx} ry={ry} fill="url(#mist-255-255-255)" />
      ))}
    </g>
  )
}

/** Leaves that drift down through the forest light. */
function FallingLeaves({ fill }: { fill: string }) {
  return (
    <g fill={fill}>
      {[
        [220, 0, 14],
        [520, 4, 17],
        [860, 8, 13],
        [1120, 2.5, 16],
        [1400, 10.5, 15],
        [700, 12, 18],
      ].map(([x, delay, dur], i) => (
        <g key={i} className="ns-leaf" style={{ animationDelay: `${delay}s`, animationDuration: `${dur}s` }}>
          <path transform={`translate(${x} 0)`} d="M0 0c6-8 16-10 22-6-4 8-14 10-22 6z" />
        </g>
      ))}
    </g>
  )
}

/** Geothermal steam rising from the Rift floor, as at Olkaria and Hell's Gate. */
function Steam({ horizon }: { horizon: number }) {
  return (
    <g>
      {[
        [380, 0],
        [620, 3],
        [1340, 1.5],
      ].map(([x, delay], i) => (
        <g key={i}>
          {[0, 1, 2].map((k) => (
            <ellipse
              key={k}
              className="ns-steam"
              style={{ animationDelay: `${delay + k * 3}s` }}
              cx={x}
              cy={horizon - 10}
              rx={38}
              ry={46}
              fill="url(#mist-255-255-255)"
            />
          ))}
        </g>
      ))}
    </g>
  )
}

function SceneArt({ id, sx, sy, time }: { id: SceneId; sx: MotionValue<number>; sy: MotionValue<number>; time?: SkyTime }) {
  const s = SCENES[id]
  // The Rift scene reuses the lake's shapes and adds steam from the ground.
  const base: SceneId = id === 'rift-steam' ? 'lake-dusk' : id
  const sunUp = time === 'dawn' || time === 'day'
  const horizon = s.horizon ?? 760
  const L = s.layers
  const paths = useMemo(
    () => ({
      far: ridge(11, horizon - 150, 70, 0.004, 0.1),
      mid: ridge(23, horizon - 60, 55, 0.006, 0.2),
      near: ridge(37, horizon + 40, 40, 0.005, 0.15),
      front: ridge(41, horizon + 150, 30, 0.004, 0.1),
    }),
    [horizon],
  )
  const hazeId = `haze-${id}`
  const water = s.water

  const ridges = (
    <>
      {base === 'lake-dusk' && (
        <>
          <path d={paths.far} fill={L[0]} opacity={0.75} />
          <MtKenya fill={L[1]} snow="#b7b6d8" />
          <path d={ridge(29, horizon - 10, 25, 0.008, 0.15)} fill={L[2]} />
        </>
      )}
      {base === 'coast-sunset' && <path d={ridge(19, horizon - 6, 14, 0.006, 0.1)} fill={L[0]} opacity={0.8} />}
      {base === 'flamingo-lake' && (
        <>
          <path d={`M-100 ${horizon} L-100 380 L180 360 Q260 352 330 400 L520 ${horizon - 40} L700 ${horizon} Z`} fill={L[1]} />
          <path d={ridge(31, horizon - 40, 40, 0.005, 0.1)} fill={L[0]} opacity={0.6} />
        </>
      )}
    </>
  )

  return (
    <>
      <Art>
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          {s.sky.map((c, i) => (
            <stop key={i} offset={i / (s.sky.length - 1)} stopColor={c} />
          ))}
        </linearGradient>
        <radialGradient id={`glow-${id}`}>
          <stop offset="0" stopColor={s.glow.color} stopOpacity="0.9" />
          <stop offset="0.25" stopColor={s.glow.color} stopOpacity="0.35" />
          <stop offset="1" stopColor={s.glow.color} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={hazeId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={s.sky[s.sky.length - 1]} stopOpacity="0" />
          <stop offset="0.6" stopColor={s.sky[s.sky.length - 1]} stopOpacity="0.45" />
          <stop offset="1" stopColor={s.sky[s.sky.length - 1]} stopOpacity="0" />
        </linearGradient>
        {water && (
          <linearGradient id={`water-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={water[0]} />
            <stop offset="1" stopColor={water[1]} />
          </linearGradient>
        )}
        <radialGradient id={`refl-${id}`}>
          <stop offset="0" stopColor={s.glow.color} stopOpacity="0.4" />
          <stop offset="1" stopColor={s.glow.color} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mist-255-255-255">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`rays-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fffbe8" stopOpacity="0.28" />
          <stop offset="1" stopColor="#fffbe8" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="-200" y="-200" width={W + 400} height={H + 400} fill={`url(#sky-${id})`} />
      </Art>

      <Layer
        sx={sx}
        sy={sy}
        depth={6}
        moving={
          (base === 'forest-mist' || base === 'golden-hills') && (
            <g style={{ animation: 'rays 12s ease-in-out infinite alternate' }}>
              {[0, 1, 2, 3].map((i) => (
                <path key={i} d={`M${s.glow.x - 60 + i * 70} ${s.glow.y - 60} L${s.glow.x + 380 + i * 160} ${H} L${s.glow.x + 300 + i * 160} ${H} Z`} fill={`url(#rays-${id})`} />
              ))}
            </g>
          )
        }
      >
        <circle cx={s.glow.x} cy={s.glow.y} r={s.glow.r} fill={`url(#glow-${id})`} />
        {s.glow.disc && <circle cx={s.glow.x} cy={s.glow.y} r={base === 'lake-dusk' ? 34 : 70} fill={s.glow.disc} opacity={base === 'lake-dusk' ? 0.95 : 0.85} />}
        {base === 'lake-dusk' && !sunUp && <circle cx={s.glow.x + 14} cy={s.glow.y - 8} r={30} fill={s.sky[1]} opacity={0.9} />}
      </Layer>

      {/* Distant ranges */}
      <Layer
        sx={sx}
        sy={sy}
        depth={14}
        moving={
          <>
            {(base === 'savanna-dawn' || base === 'tea-hills' || base === 'golden-hills') && <Clouds y={horizon - 420} opacity={base === 'tea-hills' ? 0.45 : 0.3} />}
            {base === 'lake-dusk' && sunUp && <Clouds y={260} opacity={0.25} />}
            {base === 'savanna-dawn' && (
              <g fill="none" stroke={L[3]} strokeWidth="3" strokeLinecap="round" opacity="0.6" style={{ animation: 'birds 24s ease-in-out infinite alternate' }}>
                <path d="M560 300q12-12 24 0q12-12 24 0" />
                <path d="M620 270q9-9 18 0q9-9 18 0" />
                <path d="M520 330q8-8 16 0q8-8 16 0" />
              </g>
            )}
          </>
        }
      >
        {ridges}
        {(base === 'savanna-dawn' || base === 'golden-hills' || base === 'tea-hills') && <path d={paths.far} fill={L[0]} />}
        {base === 'forest-mist' && <Canopy seed={5} base={horizon - 150} height={70} fill={L[0]} />}
        <rect x="-100" y={horizon - 200} width={W + 200} height="260" fill={`url(#${hazeId})`} />
      </Layer>

      {/* Water with a soft reflection of the sky glow */}
      {water && (
        <Layer
          sx={sx}
          sy={sy}
          depth={18}
          moving={
            <>
              <g style={{ animation: 'shimmer 6s ease-in-out infinite alternate' }}>
                {Array.from({ length: 14 }, (_, i) => (
                  <rect key={i} x={s.glow.x - 120 + ((i * 53) % 240)} y={horizon + 14 + i * 22} width={60 + ((i * 37) % 90)} height="2.5" rx="1.25" fill={s.glow.color} opacity={0.55 - i * 0.03} />
                ))}
              </g>
              {base === 'coast-sunset' && (
                <g className="ns-dhow">
                  <Dhow x={1180} y={horizon + 40} s={0.8} fill="#1a1230" />
                </g>
              )}
              {base === 'lake-dusk' && (
                <g fill="none" stroke={s.glow.color} strokeWidth="2">
                  {[
                    [520, 70, 0],
                    [1320, 130, 2.5],
                    [880, 210, 5],
                  ].map(([x, dy, d], i) => (
                    <ellipse key={i} className="ns-ripple" style={{ animationDelay: `${d}s` }} cx={x} cy={horizon + dy} rx={40} ry={7} />
                  ))}
                </g>
              )}
              {base === 'flamingo-lake' && (
                <g opacity="0.95">
                  {[
                    [820, 0.8],
                    [870, 0.9],
                    [930, 0.75],
                    [1010, 0.85],
                    [1060, 0.7],
                    [1130, 0.8],
                  ].map(([x, sc], i) => (
                    <g key={i} className="ns-wade" style={{ animationDelay: `${i * 0.9}s` }}>
                      <ellipse className="ns-ripple" style={{ animationDelay: `${i * 1.3}s` }} cx={x + 4} cy={horizon + 60 + (i % 3) * 14} rx={22} ry={4} fill="none" stroke="#f6c3b1" strokeWidth="1.6" />
                      <Flamingo x={x} y={horizon + 60 + (i % 3) * 14} s={sc} fill="#3a2443" />
                      <g transform={`translate(0 ${2 * (horizon + 60 + (i % 3) * 14)}) scale(1 -1)`} opacity="0.25">
                        <Flamingo x={x} y={horizon + 60 + (i % 3) * 14} s={sc} fill="#3a2443" />
                      </g>
                    </g>
                  ))}
                </g>
              )}
            </>
          }
        >
          <rect x="-100" y={horizon} width={W + 200} height={H - horizon + 60} fill={`url(#water-${id})`} />
          <ellipse cx={s.glow.x} cy={horizon + 90} rx={base === 'coast-sunset' ? 170 : 120} ry="220" fill={`url(#refl-${id})`} />
        </Layer>
      )}

      {/* Middle ground */}
      <Layer
        sx={sx}
        sy={sy}
        depth={28}
        moving={
          <>
            {base === 'golden-hills' && (
              <g className="ns-sway-slow">
                <Acacia x={1080} y={horizon - 90} s={0.9} fill={L[3]} />
              </g>
            )}
            {id === 'rift-steam' && <Steam horizon={horizon} />}
            <Mist y={horizon - 40} opacity={base === 'forest-mist' || base === 'tea-hills' ? 0.9 : 0.4} dur={80} />
          </>
        }
      >
        {base === 'savanna-dawn' && (
          <>
            <path d={paths.mid} fill={L[1]} />
            <Acacia x={300} y={horizon - 40} s={0.7} fill={L[2]} />
            <Acacia x={1260} y={horizon - 70} s={0.55} fill={L[2]} />
          </>
        )}
        {base === 'golden-hills' && <path d={paths.mid} fill={L[1]} />}
        {base === 'tea-hills' && (
          <>
            <path d={paths.mid} fill={L[1]} />
            <g opacity="0.35" fill="none" stroke="#a8cfa0" strokeWidth="3">
              {Array.from({ length: 9 }, (_, i) => (
                <path key={i} d={`M-100 ${horizon - 20 + i * 26} Q 500 ${horizon - 90 + i * 30} 1700 ${horizon - 30 + i * 24}`} />
              ))}
            </g>
          </>
        )}
        {base === 'forest-mist' && <Canopy seed={9} base={horizon - 40} height={95} fill={L[1]} />}
      </Layer>

      {/* Foreground */}
      <Layer
        sx={sx}
        sy={sy}
        depth={46}
        moving={
          <>
            {base === 'savanna-dawn' && (
              <g className="ns-sway-slow">
                <Acacia x={1380} y={horizon + 140} s={1.5} fill={L[3]} />
              </g>
            )}
            {base === 'forest-mist' && <Mist y={horizon + 120} opacity={0.6} dur={60} reverse />}
            {base === 'lake-dusk' && (
              <g fill="#070c1c" className="ns-sway">
                {Array.from({ length: 12 }, (_, i) => (
                  <path key={i} d={`M${430 + i * 22} ${H - 92 + (i % 3) * 6} q ${4 + (i % 2) * 3} -${40 + (i % 4) * 12} ${8 + (i % 3) * 3} -${70 + (i % 5) * 10} l3 0 q-2 30 -6 ${72 + (i % 4) * 10}z`} />
                ))}
              </g>
            )}
            {base === 'coast-sunset' && (
              <>
                <g className="ns-sway">
                  <Palm x={160} y={H - 90} s={1.25} fill="#0d0819" />
                </g>
                <g className="ns-sway" style={{ animationDelay: '-3s' }}>
                  <Palm x={1450} y={H - 80} s={1.05} fill="#0d0819" flip />
                </g>
              </>
            )}
          </>
        }
      >
        {base === 'savanna-dawn' && (
          <>
            <path d={paths.near} fill={L[2]} />
            <path d={paths.front} fill={L[3]} />
          </>
        )}
        {base === 'golden-hills' && (
          <>
            <path d={paths.near} fill={L[2]} />
            <path d={paths.front} fill={L[3]} />
          </>
        )}
        {base === 'tea-hills' && (
          <>
            <path d={paths.near} fill={L[2]} />
            <g opacity="0.4" fill="none" stroke="#7fb27e" strokeWidth="4">
              {Array.from({ length: 7 }, (_, i) => (
                <path key={i} d={`M-100 ${horizon + 70 + i * 34} Q 700 ${horizon + 10 + i * 40} 1700 ${horizon + 80 + i * 30}`} />
              ))}
            </g>
            <path d={paths.front} fill={L[3]} />
          </>
        )}
        {base === 'forest-mist' && <Canopy seed={13} base={horizon + 90} height={130} fill={L[2]} />}
        {base === 'lake-dusk' && (
          <>
            <path d={`M-100 ${H + 40} L-100 ${H - 120} Q 200 ${H - 170} 420 ${H - 110} Q 700 ${H - 50} 1000 ${H - 20} Q 1300 ${H} 1700 ${H - 10} L1700 ${H + 40}Z`} fill="#070c1c" />
            <Acacia x={170} y={H - 140} s={1.1} fill="#070c1c" />
          </>
        )}
        {base === 'coast-sunset' && <path d={`M-100 ${H + 40} L-100 ${H - 90} Q 300 ${H - 140} 700 ${H - 70} T 1700 ${H - 100} L1700 ${H + 40}Z`} fill="#140d26" />}
        {base === 'flamingo-lake' && (
          <>
            <path d={`M800 ${H + 40} Q 1100 ${H - 150} 1700 ${H - 130} L1700 ${H + 40}Z`} fill={L[2]} />
            <Acacia x={1420} y={H - 120} s={1.1} fill="#1d1430" />
          </>
        )}
      </Layer>

      {/* The nearest forest canopy sits in front of the low mist, with leaves drifting past it. */}
      {base === 'forest-mist' && (
        <Layer sx={sx} sy={sy} depth={46} moving={<FallingLeaves fill={L[0]} />}>
          <Canopy seed={17} base={horizon + 220} height={170} fill={L[3]} />
        </Layer>
      )}
    </>
  )
}

const TINT: Record<SkyTime, { bg: string; blend: 'screen' | 'normal'; stars: number }> = {
  dawn: { bg: 'linear-gradient(180deg, rgba(70,60,120,.28) 0%, rgba(210,120,120,.32) 45%, rgba(255,176,128,.42) 62%, rgba(0,0,0,0) 80%)', blend: 'screen', stars: 0.45 },
  day: { bg: 'linear-gradient(180deg, rgba(70,120,190,.42) 0%, rgba(120,160,210,.32) 45%, rgba(190,200,215,.22) 62%, rgba(0,0,0,0) 80%)', blend: 'screen', stars: 0.2 },
  golden: { bg: 'linear-gradient(180deg, rgba(80,50,90,.18) 0%, rgba(200,120,80,.26) 48%, rgba(255,180,100,.36) 64%, rgba(0,0,0,0) 82%)', blend: 'screen', stars: 0.7 },
  night: { bg: 'linear-gradient(180deg, rgba(3,6,18,.32) 0%, rgba(3,6,18,.18) 60%, rgba(3,6,18,.1) 100%)', blend: 'normal', stars: 1 },
}

export const NatureScene = memo(function NatureScene({ id, dim = 0, still: stillProp = false, time }: { id: SceneId; dim?: number; still?: boolean; time?: SkyTime }) {
  const still = useCalm() || stillProp
  const { sx, sy } = useParallax(!still)
  const s = SCENES[id]
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: s.sky[0] }}>
      <SceneArt id={id} sx={sx} sy={sy} time={time} />
      {time && <div style={{ position: 'absolute', inset: 0, background: TINT[time].bg, mixBlendMode: TINT[time].blend, transition: 'opacity 2s' }} />}
      {!still && <Sky stars={s.stars} motes={s.motes} horizon={s.horizon ?? 760} starAlpha={time ? TINT[time].stars : 1} />}
      {dim > 0 && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(7,13,27,${dim * 0.6}) 0%, rgba(7,13,27,${dim}) 100%)` }} />}
      <style>{`
        @keyframes mist-drift { from { transform: translateX(-60px) } to { transform: translateX(80px) } }
        @keyframes shimmer { from { opacity: .55; transform: translateX(-6px) } to { opacity: 1; transform: translateX(6px) } }
        @keyframes rays { from { opacity: .6 } to { opacity: 1 } }
        @keyframes birds { from { transform: translate(0, 0) } to { transform: translate(160px, -40px) } }
        .ns-clouds { animation: ns-cloud 150s ease-in-out infinite alternate }
        @keyframes ns-cloud { from { transform: translateX(-220px) } to { transform: translateX(260px) } }
        .ns-dhow { animation: ns-dhow 70s ease-in-out infinite alternate }
        @keyframes ns-dhow { 0% { transform: translate(0, 0) } 25% { transform: translate(-90px, 3px) } 50% { transform: translate(-180px, 0) } 75% { transform: translate(-270px, 3px) } 100% { transform: translate(-360px, 0) } }
        .ns-sway, .ns-sway-slow { transform-box: fill-box; transform-origin: 50% 100%; animation: ns-sway 7s ease-in-out infinite alternate }
        .ns-sway-slow { animation-duration: 11s }
        @keyframes ns-sway { from { transform: rotate(-1.2deg) } to { transform: rotate(1.2deg) } }
        .ns-wade { animation: ns-wade 5s ease-in-out infinite alternate }
        @keyframes ns-wade { from { transform: translateY(0) } to { transform: translateY(3px) } }
        .ns-ripple { transform-box: fill-box; transform-origin: center; animation: ns-ripple 6s ease-out infinite; opacity: 0 }
        @keyframes ns-ripple { 0% { transform: scale(.3); opacity: 0 } 15% { opacity: .5 } 100% { transform: scale(1.8); opacity: 0 } }
        .ns-leaf { animation: ns-leaf 15s linear infinite; opacity: 0 }
        @keyframes ns-leaf { 0% { transform: translate(0, 120px) rotate(0); opacity: 0 } 10% { opacity: .8 } 50% { transform: translate(60px, 560px) rotate(160deg) } 90% { opacity: .7 } 100% { transform: translate(-20px, 1000px) rotate(320deg); opacity: 0 } }
        .ns-steam { transform-box: fill-box; transform-origin: 50% 100%; animation: ns-steam 9s ease-out infinite; opacity: 0 }
        @keyframes ns-steam { 0% { transform: translateY(0) scale(.35, .5); opacity: 0 } 18% { opacity: .95 } 60% { opacity: .6 } 100% { transform: translateY(-300px) scale(1.8, 2.4); opacity: 0 } }
        @media (prefers-reduced-motion: reduce) { .ns-clouds, .ns-dhow, .ns-sway, .ns-sway-slow, .ns-wade, .ns-ripple, .ns-leaf, .ns-steam { animation: none } .ns-steam { opacity: .3 } }
      `}</style>
    </div>
  )
})

export const SCENE_SKY = Object.fromEntries(Object.entries(SCENES).map(([k, v]) => [k, v.sky])) as Record<SceneId, string[]>
