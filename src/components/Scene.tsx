// Layered landscape that shifts with the pointer (or device tilt) for depth.
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useEffect } from 'react'

export type SceneVariant = 'savanna' | 'forest' | 'village' | 'garden' | 'dusk'

interface Palette {
  skyTop: string
  skyBottom: string
  sun: string
  mountain: string
  snow: string
  far: string
  mid: string
  trees: string
  near: string
  nearDark: string
}

const PALETTES: Record<SceneVariant, Palette> = {
  savanna: { skyTop: '#f5cf8e', skyBottom: '#fbefd6', sun: '#fff1c9', mountain: '#a9b4ae', snow: '#fbf4e6', far: '#e2bd7c', mid: '#c99a55', trees: '#3f4d2b', near: '#9aa84e', nearDark: '#6f7f35' },
  forest: { skyTop: '#bcd9c9', skyBottom: '#f1f0dc', sun: '#fffbe6', mountain: '#8fb0a5', snow: '#f4f6ee', far: '#93b77f', mid: '#5f8f57', trees: '#2b4a33', near: '#5c8a3e', nearDark: '#3f6b2c' },
  village: { skyTop: '#a9d4df', skyBottom: '#fbf1dc', sun: '#fff4cf', mountain: '#9eb5bd', snow: '#fbf8f0', far: '#cdbb7c', mid: '#b98d4f', trees: '#46522e', near: '#b0743f', nearDark: '#8a5a33' },
  garden: { skyTop: '#f4c3a8', skyBottom: '#fdf0e2', sun: '#fff0d8', mountain: '#b8a8b2', snow: '#fff7f2', far: '#e3b48c', mid: '#c98a68', trees: '#4a4a2c', near: '#88a24a', nearDark: '#61792f' },
  dusk: { skyTop: '#2d4a52', skyBottom: '#e9a466', sun: '#ffd78f', mountain: '#4e5f68', snow: '#e8dccb', far: '#7b6150', mid: '#5a4537', trees: '#22201a', near: '#3a3a24', nearDark: '#2a2a1a' },
}

function usePointerParallax() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX / window.innerWidth - 0.5)
      y.set(e.clientY / window.innerHeight - 0.5)
    }
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return
      x.set(Math.max(-0.5, Math.min(0.5, e.gamma / 60)))
      y.set(Math.max(-0.5, Math.min(0.5, (e.beta - 40) / 80)))
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('deviceorientation', onTilt)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('deviceorientation', onTilt)
    }
  }, [x, y])
  const sx = useSpring(x, { stiffness: 50, damping: 18 })
  const sy = useSpring(y, { stiffness: 50, damping: 18 })
  return { sx, sy }
}

function Layer({ sx, sy, depth, children }: { sx: MotionValue<number>; sy: MotionValue<number>; depth: number; children: React.ReactNode }) {
  const tx = useTransform(sx, (v) => v * -depth)
  const ty = useTransform(sy, (v) => v * -depth * 0.4)
  return <motion.g style={{ x: tx, y: ty }}>{children}</motion.g>
}

/** An acacia: flat umbrella crown on a forked trunk — the savanna's signature tree. */
function Acacia({ x, y, s = 1, color }: { x: number; y: number; s?: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={color}>
      <path d="M-4 0l2-46c-10-6-22-10-30-10l2-4c10 0 20 4 30 9 6-8 16-14 26-16l2 4c-10 3-18 8-24 15l0 48z" />
      <path d="M-78-60c10-16 46-22 78-22s70 6 82 20c4 6-4 10-14 10h-132c-12 0-18-4-14-8z" />
      <path d="M-50-78c14-8 40-10 60-8 24 2 38 8 40 14-30-4-70-4-100-6z" opacity="0.85" />
    </g>
  )
}

function Grass({ x, y, color }: { x: number; y: number; color: string }) {
  return <path d={`M${x} ${y}q4-18 10-22q-2 12 2 22q4-16 12-20q-4 10 0 20z`} fill={color} />
}

export function Scene({ variant = 'savanna', showSun = true }: { variant?: SceneVariant; showSun?: boolean }) {
  const p = PALETTES[variant]
  const { sx, sy } = usePointerParallax()
  const gid = `sky-${variant}`
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" width="100%" height="100%" style={{ display: 'block' }}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p.skyTop} />
            <stop offset="0.75" stopColor={p.skyBottom} />
          </linearGradient>
          <radialGradient id={`${gid}-sun`}>
            <stop offset="0.35" stopColor={p.sun} stopOpacity="1" />
            <stop offset="0.36" stopColor={p.sun} stopOpacity="0.5" />
            <stop offset="1" stopColor={p.sun} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="-100" y="-100" width="1640" height="1100" fill={`url(#${gid})`} />
        <Layer sx={sx} sy={sy} depth={8}>
          {showSun && <circle cx="1060" cy="330" r="190" fill={`url(#${gid}-sun)`} />}
          <g className="drift-slow" fill="#fffaf0" opacity="0.85">
            <path d="M160 170c-30 0-34-36 0-38 4-26 44-34 60-12 16-14 50-8 52 18 28 0 30 32 0 32z" />
            <path d="M880 120c-24 0-26-28 0-30 4-20 34-26 46-10 12-10 38-6 40 14 22 0 22 26 0 26z" opacity="0.7" />
          </g>
        </Layer>
        <Layer sx={sx} sy={sy} depth={14}>
          {/* Mt Kenya: jagged twin peaks with a snow cap */}
          <path d="M380 620L560 380l40 30 36-76 28 40 30-34 40 64 30-10 220 226z" fill={p.mountain} />
          <path d="M560 380l40 30 36-76 28 40 30-34 40 64-20-8-22 22-20-30-24 30-22-34-28 40-30-24z" fill={p.snow} />
          <g className="birds" fill="none" stroke={p.trees} strokeWidth="3" strokeLinecap="round">
            <path d="M300 260q10-10 20 0q10-10 20 0" />
            <path d="M350 230q8-8 16 0q8-8 16 0" />
            <path d="M260 300q7-7 14 0q7-7 14 0" />
          </g>
        </Layer>
        <Layer sx={sx} sy={sy} depth={26}>
          <path d="M-100 640C120 560 300 590 480 610s420-80 620-50 380 40 440 30v360H-100z" fill={p.far} />
        </Layer>
        <Layer sx={sx} sy={sy} depth={44}>
          <path d="M-100 700C160 650 380 690 620 680s460-70 920-20v340H-100z" fill={p.mid} />
          <Acacia x={210} y={690} s={0.9} color={p.trees} />
          <Acacia x={1180} y={668} s={1.15} color={p.trees} />
          <Acacia x={1320} y={664} s={0.6} color={p.trees} />
          <Acacia x={720} y={682} s={0.45} color={p.trees} />
        </Layer>
        <Layer sx={sx} sy={sy} depth={70}>
          <path d="M-100 790C200 740 520 770 760 776s500-50 780-10v240H-100z" fill={p.near} />
          <path d="M-100 850C300 820 700 840 1000 836s380-20 540 0v100H-100z" fill={p.nearDark} />
          {[60, 180, 420, 560, 900, 1040, 1270, 1380].map((x, i) => (
            <Grass key={x} x={x} y={i % 2 ? 790 : 800} color={p.nearDark} />
          ))}
        </Layer>
      </svg>
      <style>{`
        .drift-slow { animation: drift 60s linear infinite alternate; }
        .birds { animation: birds 16s ease-in-out infinite alternate; }
        @keyframes drift { from { transform: translateX(-40px) } to { transform: translateX(60px) } }
        @keyframes birds { from { transform: translate(0, 0) } to { transform: translate(120px, -30px) } }
      `}</style>
    </div>
  )
}
