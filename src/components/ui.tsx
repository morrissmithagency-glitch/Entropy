import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'
import { sfx } from '../audio/sfx'
import { setSetting, useProgress } from '../state/progress'

const INK = '#2a1b12'

export const Icon = {
  back: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 5l-7 7 7 7" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  speaker: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
      <path d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12" />
    </svg>
  ),
  soundOff: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
      <path d="M17 9l5 6M22 9l-5 6" />
    </svg>
  ),
  music: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l11-2v13" />
      <circle cx="6.5" cy="18" r="2.5" fill="currentColor" />
      <circle cx="17.5" cy="16" r="2.5" fill="currentColor" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
      <rect x="5" y="11" width="14" height="10" rx="2.5" fill="currentColor" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </svg>
  ),
  flame: (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path d="M12 2c1 4 6 6 6 12a6 6 0 01-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-4-1-6 1-9z" fill="#c8553d" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 13c1 2 3 2.5 3 5a3 3 0 01-6 0c0-1.5 1-2.5 3-5z" fill="#f2b33d" />
    </svg>
  ),
}

export function Star({ filled, size = 28, delay = 0 }: { filled: boolean; size?: number; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      initial={filled ? { scale: 0, rotate: -60 } : false}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 12, delay }}
      aria-hidden
    >
      <path d="M32 6l7.6 16.4 17.9 2-13.3 12.2 3.7 17.7L32 45.3l-15.9 9 3.7-17.7L6.5 24.4l17.9-2z" fill={filled ? '#f2b33d' : 'rgba(42,27,18,.12)'} stroke={filled ? INK : 'rgba(42,27,18,.25)'} strokeWidth="3.5" strokeLinejoin="round" />
      {filled && <path d="M24 26l4-1" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".7" />}
    </motion.svg>
  )
}

export function Stars({ n, size = 22, gap = 2 }: { n: number; size?: number; gap?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap }} aria-label={`${n} of 3 stars`}>
      {[0, 1, 2].map((i) => (
        <Star key={i} filled={i < n} size={size} delay={i * 0.08} />
      ))}
    </span>
  )
}

export function Bubble({ children, tail = 'left', style }: { children: ReactNode; tail?: 'left' | 'bottom' | 'right'; style?: CSSProperties }) {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0, rotate: -3 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.25 }}
      style={{
        position: 'relative',
        background: '#fffaf0',
        border: `2.5px solid ${INK}`,
        borderRadius: 22,
        padding: '14px 18px',
        boxShadow: '0 6px 0 rgba(42,27,18,.15)',
        transformOrigin: tail === 'left' ? '0% 100%' : tail === 'right' ? '100% 100%' : '50% 100%',
        ...style,
      }}
    >
      {children}
      <svg
        width="26"
        height="22"
        viewBox="0 0 26 22"
        style={{
          position: 'absolute',
          ...(tail === 'bottom' ? { bottom: -19, left: '50%', marginLeft: -13 } : tail === 'left' ? { left: 22, bottom: -19 } : { right: 22, bottom: -19 }),
        }}
      >
        <path d={tail === 'right' ? 'M2 0L22 20L18 0' : 'M4 0L4 20L24 0'} fill="#fffaf0" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="0" y="-2" width="26" height="3.4" fill="#fffaf0" />
      </svg>
    </motion.div>
  )
}

export function RoundButton({ onClick, label, children, style }: { onClick: () => void; label: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <button
      type="button"
      className="btn paper round"
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
    <div style={{ display: 'flex', gap: 10 }}>
      <RoundButton label={settings.sound ? 'Turn sounds off' : 'Turn sounds on'} onClick={() => setSetting('sound', !settings.sound)}>
        {settings.sound ? Icon.music : <span style={{ opacity: 0.45 }}>{Icon.music}</span>}
      </RoundButton>
      <RoundButton label={settings.voice ? 'Turn reading aloud off' : 'Turn reading aloud on'} onClick={() => setSetting('voice', !settings.voice)}>
        {settings.voice ? Icon.speaker : Icon.soundOff}
      </RoundButton>
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
        padding: '6px 12px',
        borderRadius: 999,
        background: '#fffaf0',
        border: `2px solid ${INK}`,
        fontWeight: 650,
        fontSize: 15,
        ...style,
      }}
    >
      {children}
    </span>
  )
}

export function TopBar({ onBack, title, right }: { onBack?: () => void; title?: ReactNode; right?: ReactNode }) {
  return (
    <header style={{ position: 'relative', zIndex: 5, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, padding: '16px clamp(16px, 4vw, 40px)' }}>
      {onBack && (
        <RoundButton label="Back" onClick={onBack}>
          {Icon.back}
        </RoundButton>
      )}
      <div style={{ flex: '1 1 220px', minWidth: 0 }}>{title}</div>
      {right}
    </header>
  )
}
