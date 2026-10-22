import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { sfx } from '../../audio/sfx'

const key = {
  height: 60,
  borderRadius: 18,
  fontSize: 24,
  fontWeight: 450,
  color: 'var(--cloud)',
  background: 'var(--glass-strong)',
  border: '1px solid var(--hair)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  fontVariantNumeric: 'tabular-nums',
} as const

/** Big-key number pad. Also listens to the keyboard. */
export function NumberPad({ disabled, onSubmit }: { disabled: boolean; onSubmit: (n: number) => void }) {
  const [value, setValue] = useState('')

  const press = (k: string) => {
    if (disabled) return
    sfx.tap()
    if (k === '⌫') setValue((v) => v.slice(0, -1))
    else if (k === 'ok') {
      if (value !== '') onSubmit(Number(value))
    } else setValue((v) => (v.length >= 3 ? v : v === '0' ? k : v + k))
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (/^\d$/.test(e.key)) press(e.key)
      else if (e.key === 'Backspace') press('⌫')
      else if (e.key === 'Enter') press('ok')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div style={{ display: 'grid', gap: 12, justifyItems: 'center', width: '100%', maxWidth: 340, margin: '0 auto' }}>
      <div
        aria-live="polite"
        className="display"
        style={{ width: 170, height: 72, borderRadius: 22, background: 'var(--card)', color: 'var(--ink)', display: 'grid', placeItems: 'center', fontSize: 40, fontWeight: 400, boxShadow: '0 16px 30px -20px rgba(3,8,20,.8)', fontVariantNumeric: 'tabular-nums' }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span key={value} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }}>
            {value || <span style={{ opacity: 0.25 }}>?</span>}
          </motion.span>
        </AnimatePresence>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, width: '100%' }}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((k) => (
          <motion.button key={k} type="button" whileTap={{ scale: 0.94, backgroundColor: 'rgba(255,255,255,.25)' }} style={key} onClick={() => press(k)} disabled={disabled}>
            {k}
          </motion.button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 8, width: '100%' }}>
        <motion.button type="button" aria-label="Delete" whileTap={{ scale: 0.94 }} style={key} onClick={() => press('⌫')} disabled={disabled}>
          ⌫
        </motion.button>
        <button type="button" className="btn primary" onClick={() => press('ok')} disabled={disabled || value === ''}>
          Check
        </button>
      </div>
    </div>
  )
}

/** Tap tiles to place them in order; tap a placed tile to send it back. */
export function OrderTiles({ tiles, slots, joiner, disabled, onSubmit }: { tiles: string[]; slots: number; joiner: string; disabled: boolean; onSubmit: (order: string[]) => void }) {
  const [placed, setPlaced] = useState<number[]>([])
  const full = placed.length === slots
  const wide = joiner === ' ' || tiles.some((t) => t.length > 3)

  const place = (i: number) => {
    if (disabled || full) return
    sfx.select()
    setPlaced((p) => [...p, i])
  }
  const unplace = (i: number) => {
    if (disabled) return
    sfx.tap()
    setPlaced((p) => p.filter((x) => x !== i))
  }

  const tile = (i: number, inSlot: boolean) => (
    <motion.button
      layoutId={`tile-${i}`}
      key={i}
      data-tile={inSlot ? 'placed' : 'free'}
      type="button"
      onClick={() => (inSlot ? unplace(i) : place(i))}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      style={{
        minWidth: wide ? 0 : 58,
        height: 58,
        padding: '0 16px',
        borderRadius: 16,
        color: 'var(--ink)',
        background: inSlot ? '#fbefd6' : 'var(--card)',
        boxShadow: inSlot ? '0 0 0 2px var(--gold), 0 12px 24px -14px rgba(3,8,20,.8)' : '0 12px 24px -14px rgba(3,8,20,.8)',
        fontSize: wide ? 19 : 26,
        fontWeight: 450,
      }}
    >
      {tiles[i]}
    </motion.button>
  )

  return (
    <LayoutGroup>
      <div style={{ display: 'grid', gap: 22, justifyItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', minHeight: 70 }}>
          {Array.from({ length: slots }, (_, s) => (
            <div key={s} style={{ minWidth: wide ? 70 : 62, height: 66, borderRadius: 18, border: '1px dashed rgba(255,255,255,.35)', display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,.05)' }}>
              {placed[s] !== undefined && tile(placed[s], true)}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', minHeight: 62 }}>
          {tiles.map((_, i) => (placed.includes(i) ? <div key={i} style={{ width: 0 }} /> : tile(i, false)))}
        </div>
        <button type="button" className="btn primary" disabled={disabled || !full} onClick={() => onSubmit(placed.map((i) => tiles[i]))}>
          Check
        </button>
      </div>
    </LayoutGroup>
  )
}
