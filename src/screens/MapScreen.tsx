import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNav } from '../App'
import { sfx } from '../audio/sfx'
import { LevelIcon, SUB_ICON } from '../components/art/levels'
import { Art, type ArtId } from '../components/art/objects'
import { Kobe } from '../components/Kobe'
import { Scene } from '../components/Scene'
import { Icon, SettingsButtons, Stars, TopBar } from '../components/ui'
import { findArea, LEVEL_NAMES, type AreaId, type Strand, type SubStrand } from '../curriculum'
import type { Level } from '../engine/types'
import { CHALLENGE_UNLOCK_LEVEL, challengeUnlocked, isUnlocked, levelReached, nextPaper, nextStop, starsAt, useProgress } from '../state/progress'
import { WORLD_LOOK } from './Worlds'
import './map.css'

const W = 400
const H_SIGN = 130
const H_STOP = 170
const H_CHALLENGE = 210

const PROPS: ArtId[] = ['tree', 'flower', 'goat', 'rock', 'bird', 'giraffe', 'hen', 'tree', 'zebra', 'cow', 'leaf', 'elephant']

export const LEVEL_HINTS = ['Warm up with pictures', 'Fewer clues, more thinking', 'Two steps of thinking', 'End-of-term paper level', 'The toughest questions']

type Row =
  | { kind: 'sign'; strand: Strand; y: number }
  | { kind: 'stop'; sub: SubStrand; strand: Strand; x: number; y: number; k: number }
  | { kind: 'challenge'; strand: Strand; x: number; y: number }

function layout(strands: Strand[]) {
  const rows: Row[] = []
  let y = 40
  let k = 0
  for (const strand of strands) {
    rows.push({ kind: 'sign', strand, y: y + H_SIGN / 2 })
    y += H_SIGN
    for (const sub of strand.subStrands) {
      rows.push({ kind: 'stop', sub, strand, x: 200 + 105 * Math.sin(k * 1.25 + 0.6), y: y + H_STOP / 2, k })
      y += H_STOP
      k++
    }
    rows.push({ kind: 'challenge', strand, x: 200, y: y + H_CHALLENGE / 2 - 10 })
    y += H_CHALLENGE
  }
  return { rows, height: y + 40 }
}

function pathThrough(pts: { x: number; y: number }[]) {
  if (pts.length === 0) return ''
  let d = `M${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]
    const b = pts[i]
    const dy = (b.y - a.y) * 0.55
    d += ` C${a.x} ${a.y + dy} ${b.x} ${b.y - dy} ${b.x} ${b.y}`
  }
  return d
}

export function MapScreen({ area: areaId, open }: { area: AreaId; open?: string }) {
  const go = useNav()
  const p = useProgress()
  const area = findArea(areaId)
  const look = WORLD_LOOK[areaId]
  const { rows, height } = useMemo(() => layout(area.strands), [area])
  const next = nextStop(p, areaId)
  const nextKey = next ? ('sub' in next ? next.sub : `challenge:${next.challenge}`) : null
  const [sheet, setSheet] = useState<{ sub: SubStrand } | { strand: Strand } | null>(() => {
    if (!open) return null
    for (const r of rows) if (r.kind === 'stop' && r.sub.id === open) return { sub: r.sub }
    return null
  })
  const nextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => nextRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 900)
    return () => clearTimeout(t)
  }, [])

  const points = rows.filter((r) => r.kind !== 'sign') as Exclude<Row, { kind: 'sign' }>[]
  const nextIdx = points.findIndex((r) => (r.kind === 'stop' ? r.sub.id : `challenge:${r.strand.id}`) === nextKey)
  const walked = nextIdx < 0 ? points : points.slice(0, nextIdx + 1)

  const start = (target: { sub?: string; strand?: string; level: Level }) => {
    const key = target.sub ? `${target.sub}:${target.level}` : `challenge:${target.strand}`
    sfx.select()
    go({ name: 'quiz', area: areaId, ...target, paper: nextPaper(key) })
  }

  return (
    <main className="map" style={{ ['--accent' as string]: look.accent }}>
      <div className="map-hero">
        <Scene variant={look.scene} />
        <TopBar
          onBack={() => go({ name: 'worlds' })}
          title={
            <div className="map-title">
              <div className="map-area">{area.title}</div>
              <h1 className="display">{area.world}</h1>
            </div>
          }
          right={<SettingsButtons />}
        />
      </div>

      <div className="map-trail" style={{ height }}>
        <svg className="map-path" viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none" aria-hidden>
          <path d={pathThrough(points)} fill="none" stroke="rgba(42,27,18,.28)" strokeWidth="5" strokeDasharray="2 14" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <motion.path
            d={pathThrough(walked)}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="9"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.7 }}
          />
        </svg>

        {rows.map((r, i) =>
          r.kind === 'stop' ? (
            <div key={`prop-${i}`} className={`map-prop ${r.x > W / 2 ? 'l' : 'r'}`} style={{ top: r.y }} aria-hidden>
              <Art id={PROPS[i % PROPS.length]} size={i % 3 === 0 ? 92 : 64} />
            </div>
          ) : null,
        )}

        {rows.map((r) => {
          if (r.kind === 'sign') {
            return (
              <div key={`sign-${r.strand.id}`} className="map-sign" style={{ top: r.y }}>
                <div className="kanga-band thin" />
                <div className="sign-body">
                  <span className="sign-code">Strand {r.strand.code}</span>
                  <span className="display sign-title">{r.strand.title}</span>
                </div>
              </div>
            )
          }
          if (r.kind === 'stop') {
            const reached = levelReached(p, r.sub.id)
            const isNext = nextKey === r.sub.id
            return (
              <div key={r.sub.id} ref={isNext ? nextRef : undefined} className={`map-stop ${isNext ? 'is-next' : ''}`} style={{ left: `${(r.x / W) * 100}%`, top: r.y }}>
                <motion.button
                  type="button"
                  className="stop-btn"
                  whileHover={{ scale: 1.06, rotate: -2 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    sfx.tap()
                    setSheet({ sub: r.sub })
                  }}
                  aria-label={`${r.sub.title}. ${reached} of 5 levels passed`}
                >
                  <svg viewBox="0 0 100 100" className="stop-ring" aria-hidden>
                    {[0, 1, 2, 3, 4].map((i) => {
                      const a0 = -90 + i * 72 + 4
                      const a1 = a0 + 64
                      const rad = (d: number) => (d * Math.PI) / 180
                      const R = 46
                      return (
                        <path
                          key={i}
                          d={`M${50 + R * Math.cos(rad(a0))} ${50 + R * Math.sin(rad(a0))} A${R} ${R} 0 0 1 ${50 + R * Math.cos(rad(a1))} ${50 + R * Math.sin(rad(a1))}`}
                          fill="none"
                          stroke={i < reached ? 'var(--accent)' : 'rgba(42,27,18,.16)'}
                          strokeWidth="7"
                          strokeLinecap="round"
                        />
                      )
                    })}
                  </svg>
                  <span className="stop-face">
                    <Art id={SUB_ICON[r.sub.id] ?? 'star'} size={56} />
                  </span>
                  {reached > 0 && (
                    <span className="stop-level">
                      <LevelIcon level={reached} size={30} />
                    </span>
                  )}
                </motion.button>
                <div className="stop-label">
                  <span className="stop-code">{r.sub.code}</span> {r.sub.title}
                </div>
                {isNext && (
                  <motion.div className={`stop-kobe ${r.x > W / 2 ? 'left' : ''}`} initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ delay: 1.6, type: 'spring' }}>
                    <Kobe size={96} mood="happy" />
                  </motion.div>
                )}
              </div>
            )
          }
          const unlocked = challengeUnlocked(p, r.strand.id)
          const stars = p.challenge[r.strand.id] ?? 0
          const isNext = nextKey === `challenge:${r.strand.id}`
          return (
            <div key={`ch-${r.strand.id}`} ref={isNext ? nextRef : undefined} className={`map-stop challenge ${unlocked ? '' : 'locked'} ${isNext ? 'is-next' : ''}`} style={{ left: `${(r.x / W) * 100}%`, top: r.y }}>
              <motion.button
                type="button"
                className="challenge-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  sfx.tap()
                  setSheet({ strand: r.strand })
                }}
                aria-label={`${r.strand.title} Baobab Challenge${unlocked ? '' : ', locked'}`}
              >
                <LevelIcon level={5} size={120} dim={!unlocked} />
                {!unlocked && <span className="challenge-lock">{Icon.lock}</span>}
              </motion.button>
              <div className="stop-label">
                <span className="display" style={{ fontWeight: 800 }}>
                  Baobab Challenge
                </span>
                {stars > 0 && (
                  <div>
                    <Stars n={stars} size={18} />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <AnimatePresence>
        {sheet && (
          <Sheet onClose={() => setSheet(null)}>
            {'sub' in sheet ? (
              <SubSheet sub={sheet.sub} onStart={(level) => start({ sub: sheet.sub.id, level })} />
            ) : (
              <ChallengeSheet strand={sheet.strand} onStart={() => start({ strand: sheet.strand.id, level: 5 })} />
            )}
          </Sheet>
        )}
      </AnimatePresence>
    </main>
  )
}

function Sheet({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <motion.div className="sheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        role="dialog"
        aria-modal
        className="sheet glass"
        initial={{ y: '100%', rotate: 1 }}
        animate={{ y: 0, rotate: 0 }}
        exit={{ y: '110%' }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="kanga-band" style={{ borderRadius: '30px 30px 0 0' }} />
        <button type="button" className="sheet-close btn paper round" aria-label="Close" onClick={onClose}>
          {Icon.close}
        </button>
        {children}
      </motion.div>
    </motion.div>
  )
}

function SubSheet({ sub, onStart }: { sub: SubStrand; onStart: (l: Level) => void }) {
  const p = useProgress()
  const reached = levelReached(p, sub.id)
  const suggested = Math.min(5, reached + 1) as Level
  const [chosen, setChosen] = useState<Level>(suggested)
  return (
    <div className="sheet-body">
      <div className="sheet-head">
        <Art id={SUB_ICON[sub.id] ?? 'star'} size={64} />
        <div>
          <div className="sheet-code">Sub-strand {sub.code}</div>
          <h2 className="display">{sub.title}</h2>
          <p>{sub.blurb}</p>
        </div>
      </div>
      <div className="levels" role="radiogroup" aria-label="Choose a level">
        {LEVEL_NAMES.map((name, i) => {
          const level = (i + 1) as Level
          const unlocked = isUnlocked(p, sub.id, level)
          const stars = starsAt(p, sub.id, level)
          return (
            <motion.button
              key={name}
              type="button"
              role="radio"
              aria-checked={chosen === level}
              disabled={!unlocked}
              className={`level-row ${chosen === level ? 'chosen' : ''} ${unlocked ? '' : 'locked'}`}
              onClick={() => {
                sfx.tap()
                setChosen(level)
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <LevelIcon level={level} size={44} dim={!unlocked} />
              <span className="level-text">
                <span className="display level-name">
                  {level}. {name}
                </span>
                <span className="level-hint">{LEVEL_HINTS[i]}</span>
              </span>
              {unlocked ? <Stars n={stars ?? 0} size={20} /> : <span className="level-lock">{Icon.lock}</span>}
            </motion.button>
          )
        })}
      </div>
      <button type="button" className="btn terracotta sheet-go" onClick={() => onStart(chosen)}>
        Start {LEVEL_NAMES[chosen - 1]} →
      </button>
      <p className="sheet-note">Pass with 5 out of 8 to grow to the next level.</p>
    </div>
  )
}

function ChallengeSheet({ strand, onStart }: { strand: Strand; onStart: () => void }) {
  const p = useProgress()
  const unlocked = challengeUnlocked(p, strand.id)
  return (
    <div className="sheet-body">
      <div className="sheet-head">
        <LevelIcon level={5} size={72} dim={!unlocked} />
        <div>
          <div className="sheet-code">Strand {strand.code}</div>
          <h2 className="display">{strand.title}: Baobab Challenge</h2>
          <p>10 mixed questions from every stop in this strand, at end-of-term paper difficulty.</p>
        </div>
      </div>
      <div className="challenge-reqs">
        {strand.subStrands.map((s) => {
          const r = levelReached(p, s.id)
          const ok = r >= CHALLENGE_UNLOCK_LEVEL
          return (
            <div key={s.id} className={`req ${ok ? 'ok' : ''}`}>
              <LevelIcon level={Math.max(1, r)} size={28} dim={r === 0} />
              <span>{s.title}</span>
              <span className="req-state">{ok ? '✓' : `${r}/${CHALLENGE_UNLOCK_LEVEL}`}</span>
            </div>
          )
        })}
      </div>
      <button type="button" className="btn terracotta sheet-go" disabled={!unlocked} onClick={onStart}>
        {unlocked ? 'Take the challenge →' : `Reach ${LEVEL_NAMES[CHALLENGE_UNLOCK_LEVEL - 1]} in every stop`}
      </button>
    </div>
  )
}
