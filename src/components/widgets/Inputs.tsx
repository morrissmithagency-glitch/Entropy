import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { sfx } from '../../audio/sfx'

const key = {
  height: 60,
  borderRadius: 16,
  fontSize: 26,
  fontWeight: 700,
  background: 'var(--paper)',
  border: '2.5px solid var(--ink)',
  boxShadow: '0 4px 0 var(--ink)',
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
        style={{ width: 160, height: 72, borderRadius: 18, border: '3px solid var(--ink)', background: '#fff', display: 'grid', placeItems: 'center', fontSize: 44, fontWeight: 700, boxShadow: 'inset 0 4px 0 rgba(42,27,18,.08)' }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span key={value} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }}>
            {value || <span style={{ opacity: 0.25 }}>?</span>}
          </motion.span>
        </AnimatePresence>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, width: '100%' }}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((k) => (
          <motion.button key={k} type="button" whileTap={{ y: 3, boxShadow: '0 1px 0 #2a1b12' }} style={key} onClick={() => press(k)} disabled={disabled}>
            {k}
          </motion.button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 8, width: '100%' }}>
        <motion.button type="button" aria-label="Delete" whileTap={{ y: 3 }} style={key} onClick={() => press('⌫')} disabled={disabled}>
          ⌫
        </motion.button>
        <button type="button" className="btn teal" onClick={() => press('ok')} disabled={disabled || value === ''}>
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
      type="button"
      onClick={() => (inSlot ? unplace(i) : place(i))}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      style={{
        minWidth: wide ? 0 : 58,
        height: 58,
        padding: '0 16px',
        borderRadius: 14,
        border: '2.5px solid var(--ink)',
        background: inSlot ? 'var(--ochre)' : '#fff',
        boxShadow: '0 4px 0 var(--ink)',
        fontSize: wide ? 20 : 28,
        fontWeight: 700,
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
            <div key={s} style={{ minWidth: wide ? 70 : 62, height: 66, borderRadius: 16, border: '2.5px dashed rgba(42,27,18,.4)', display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,.35)' }}>
              {placed[s] !== undefined && tile(placed[s], true)}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', minHeight: 62 }}>
          {tiles.map((_, i) => (placed.includes(i) ? <div key={i} style={{ width: 0 }} /> : tile(i, false)))}
        </div>
        <button type="button" className="btn teal" disabled={disabled || !full} onClick={() => onSubmit(placed.map((i) => tiles[i]))}>
          Check
        </button>
      </div>
    </LayoutGroup>
  )
}
