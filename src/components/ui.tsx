import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'
import { sfx } from '../audio/sfx'
import { ambient } from '../audio/ambient'
import type { AreaKind } from '../curriculum'
import { setSetting, useProgress } from '../state/progress'
import type { SceneId } from './NatureScene'

export const SCENE_FOR: Record<AreaKind, SceneId> = {
  math: 'savanna-dawn',
  english: 'forest-mist',
  environmental: 'tea-hills',
  kiswahili: 'coast-sunset',
  creative: 'flamingo-lake',
  cre: 'golden-hills',
  science: 'rift-steam',
  agriculture: 'tea-hills',
  social: 'savanna-dawn',
  pretech: 'forest-mist',
}

const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export const Icon = {
  back: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...line}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" width="20" height="20" {...line}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <path d="M8 5.5v13a1 1 0 001.5.86l10.4-6.5a1 1 0 000-1.72L9.5 4.64A1 1 0 008 5.5z" fill="currentColor" />
    </svg>
  ),
  speaker: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...line}>
      <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" fill="currentColor" stroke="none" />
      <path d="M15.5 9a4.2 4.2 0 010 6M18 6.5a7.6 7.6 0 010 11" />
    </svg>
  ),
  speakerOff: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...line}>
      <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" fill="currentColor" stroke="none" />
      <path d="M16 9.5l5 5M21 9.5l-5 5" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...line}>
      <path d="M5 19c0-8 5-14 15-14 0 9-5 14-13 14z" />
      <path d="M5 19c4-4 7-7 10-9" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" width="16" height="16" {...line}>
      <rect x="5.5" y="11" width="13" height="9" rx="2.5" />
      <path d="M8.5 11V8.5a3.5 3.5 0 017 0V11" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" width="18" height="18" {...line} strokeWidth={2.4}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  ),
  flame: (
    <svg viewBox="0 0 24 24" width="16" height="16" {...line}>
      <path d="M12 3c1 4 6 6 6 11a6 6 0 01-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-4-1-6 1-8z" />
    </svg>
  ),
}

/** Five growth stages drawn as fine gold line-art: Seed, Sprout, Sapling, Acacia, Baobab. */
/** Pass draw to have the glyph draw itself in, line by line. */
export function LevelGlyph({ level, size = 28, dim = false, draw = false }: { level: number; size?: number; dim?: boolean; draw?: boolean }) {
  const paths = [
    <>
      <path pathLength={100} d="M4 24h24" />
      <ellipse pathLength={100} cx="16" cy="19" rx="4" ry="5.5" transform="rotate(-20 16 19)" />
    </>,
    <>
      <path pathLength={100} d="M4 24h24M16 24V15" />
      <path pathLength={100} d="M16 17c-1-4-5-6-8-4 2 3 5 4 8 4zM16 15c1-4 5-6 8-4-2 3-5 4-8 4z" />
    </>,
    <>
      <path pathLength={100} d="M4 26h24M16 26V8" />
      <path pathLength={100} d="M16 12c-3-3-7-3-8-1 2 3 5 3 8 1zM16 9c3-3 7-3 8-1-2 3-5 3-8 1zM16 18c-3-2-6-2-7 0 2 2 5 2 7 0zM16 17c3-2 6-2 7 0-2 2-5 2-7 0z" />
    </>,
    <>
      <path pathLength={100} d="M3 27h26M16 27v-9c-2-2-5-3-7-3M16 18c2-2 5-4 7-4" />
      <path pathLength={100} d="M4 12c2-4 8-6 12-6s10 2 12 6c0 1-1 2-3 2H7c-2 0-3-1-3-2z" />
    </>,
    <>
      <path pathLength={100} d="M3 28h26" />
      <path pathLength={100} d="M12 28c1-5 1-11 0-15h8c-1 4-1 10 0 15" />
      <path pathLength={100} d="M12 13l-5-6M14 13l-2-8M18 13l2-8M20 13l5-6" />
      <path pathLength={100} d="M5 7c1-2 3-2 4-1M23 6c1-1 3-1 4 1M11 5c0-2 2-2 3-1M18 4c1-1 3-1 3 1" />
    </>,
  ]
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden className={draw ? 'draw-in' : undefined} {...line} strokeWidth={1.6} style={{ color: dim ? 'rgba(255,255,255,.3)' : 'var(--gold)' }}>
      {paths[level - 1]}
    </svg>
  )
}

export function Star({ filled, size = 22, delay = 0 }: { filled: boolean; size?: number; delay?: number }) {
  return (
    <motion.svg viewBox="0 0 24 24" width={size} height={size} initial={filled ? { scale: 0.3, opacity: 0 } : false} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} aria-hidden>
      <path
        d="M12 3.2l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.6l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z"
        fill={filled ? 'var(--gold)' : 'none'}
        stroke={filled ? 'var(--gold)' : 'rgba(255,255,255,.3)'}
        strokeWidth="1.4"
        strokeLinejoin="round"
        style={filled ? { filter: 'drop-shadow(0 0 6px rgba(241,207,135,.6))' } : undefined}
      />
    </motion.svg>
  )
}

export function Stars({ n, size = 16, gap = 3 }: { n: number; size?: number; gap?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap }} aria-label={`${n} of 3 stars`}>
      {[0, 1, 2].map((i) => (
        <Star key={i} filled={i < n} size={size} delay={i * 0.08} />
      ))}
    </span>
  )
}

export function IconButton({ onClick, label, children, style }: { onClick: () => void; label: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <button
      type="button"
      className="btn icon"
      aria-label={label}
      title={label}
      onClick={() => {
        sfx.tap()
        onClick()
      }}
      style={style}
    >
      {children}
    </button>
  )
}

export function SettingsButtons() {
  const { settings } = useProgress()
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <IconButton
        label={settings.sound ? 'Turn nature sounds off' : 'Turn nature sounds on'}
        onClick={() => {
          setSetting('sound', !settings.sound)
          if (settings.sound) ambient.stop()
          else ambient.start()
        }}
        style={{ opacity: settings.sound ? 1 : 0.5 }}
      >
        {Icon.leaf}
      </IconButton>
      <IconButton label={settings.voice ? 'Turn reading aloud off' : 'Turn reading aloud on'} onClick={() => setSetting('voice', !settings.voice)}>
        {settings.voice ? Icon.speaker : Icon.speakerOff}
      </IconButton>
    </div>
  )
}

export function Chip({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 34,
        padding: '0 14px',
        borderRadius: 999,
        background: 'var(--glass)',
        border: '1px solid var(--hair)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        fontSize: 14,
        fontWeight: 450,
        color: 'var(--cloud)',
        fontVariantNumeric: 'tabular-nums',
        ...style,
      }}
    >
      {children}
    </span>
  )
}

export function TopBar({ onBack, title, right }: { onBack?: () => void; title?: ReactNode; right?: ReactNode }) {
  return (
    <header
      className="gutter"
      style={{ position: 'relative', zIndex: 5, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, paddingBlock: 'max(18px, env(safe-area-inset-top, 0px)) 8px' }}
    >
      {onBack && (
        <IconButton label="Back" onClick={onBack}>
          {Icon.back}
        </IconButton>
      )}
      <div style={{ flex: '1 1 160px', minWidth: 0 }}>{title}</div>
      {right}
    </header>
  )
}

/** Concentric breathing rings, the app's signature "something is happening" motif. */
export function Breath({ size = 64, color = 'rgba(255,255,255,.5)' }: { size?: number; color?: string }) {
  return (
    <span aria-hidden style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
      {[0, 1].map((i) => (
        <span key={i} style={{ position: 'absolute', width: size, height: size, borderRadius: '50%', border: `1px solid ${color}`, animation: `breathe 3.6s ${i * 1.8}s ease-in-out infinite` }} />
      ))}
    </span>
  )
}
