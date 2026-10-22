import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useNav } from '../App'
import { sfx } from '../audio/sfx'
import { NatureScene } from '../components/NatureScene'
import { Breath, Chip, Icon, LevelGlyph, SCENE_FOR, SettingsButtons, Stars, TopBar } from '../components/ui'
import { findArea, gradeOfArea, LEVEL_NAMES, type AreaId, type Strand, type SubStrand } from '../curriculum'
import type { Level } from '../engine/types'
import {
  areaStars,
  CHALLENGE_UNLOCK_LEVEL,
  challengeUnlocked,
  isUnlocked,
  levelReached,
  nextPaper,
  nextStop,
  setLastArea,
  starsAt,
  subStars,
  useProgress,
} from '../state/progress'
import './map.css'

export const LEVEL_HINTS = ['Warm up gently', 'Fewer clues, more thinking', 'Two steps of thinking', 'End-of-term paper level', 'The toughest questions']

function Ring({ reached, size = 56 }: { reached: number; size?: number }) {
  const R = 25
  return (
    <svg viewBox="0 0 56 56" width={size} height={size} className="ring" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => {
        const a0 = ((-90 + i * 72 + 5) * Math.PI) / 180
        const a1 = ((-90 + i * 72 + 67) * Math.PI) / 180
        return (
          <path
            key={i}
            d={`M${28 + R * Math.cos(a0)} ${28 + R * Math.sin(a0)} A${R} ${R} 0 0 1 ${28 + R * Math.cos(a1)} ${28 + R * Math.sin(a1)}`}
            fill="none"
            stroke={i < reached ? 'var(--gold)' : 'rgba(255,255,255,.16)'}
            strokeWidth="2.4"
            strokeLinecap="round"
            style={i < reached ? { filter: 'drop-shadow(0 0 4px rgba(241,207,135,.7))' } : undefined}
          />
        )
      })}
    </svg>
  )
}

export function MapScreen({ area: areaId, open }: { area: AreaId; open?: string }) {
  const go = useNav()
  const p = useProgress()
  const area = findArea(areaId)
  const grade = gradeOfArea(areaId)
  const next = nextStop(p, areaId)
  const nextKey = next ? ('sub' in next ? next.sub : `challenge:${next.challenge}`) : null
  const { earned, total } = areaStars(p, areaId)
  const [sheet, setSheet] = useState<{ sub: SubStrand } | { strand: Strand } | null>(() => {
    if (!open) return null
    for (const st of area.strands) for (const sub of st.subStrands) if (sub.id === open) return { sub }
    return null
  })
  const nextRef = useRef<HTMLLIElement>(null)

  useEffect(() => setLastArea(areaId), [areaId])
  useEffect(() => {
    const t = setTimeout(() => nextRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 1300)
    return () => clearTimeout(t)
  }, [])

  const start = (target: { sub?: string; strand?: string; level: Level }) => {
    const key = target.sub ? `${target.sub}:${target.level}` : `challenge:${target.strand}`
    sfx.select()
    go({ name: 'quiz', area: areaId, ...target, paper: nextPaper(key) })
  }

  return (
    <main className="journey">
      <section className="j-hero">
        <NatureScene id={SCENE_FOR[area.kind]} dim={0.1} />
        <div className="j-hero-veil" />
        <TopBar onBack={() => go({ name: 'worlds', grade: grade.id })} title={<span className="eyebrow">{grade.label}</span>} right={<SettingsButtons />} />
        <div className="j-title gutter">
          <div className="eyebrow">{area.title}</div>
          <h1 className="display">{area.world}</h1>
          <div className="j-chips">
            <Chip>
              ★ {earned} of {total}
            </Chip>
            <Chip>{area.strands.length} strands</Chip>
          </div>
        </div>
      </section>

      <div className="j-body gutter">
        {area.strands.map((strand) => {
          const chUnlocked = challengeUnlocked(p, strand.id)
          const chStars = p.challenge[strand.id] ?? 0
          const chNext = nextKey === `challenge:${strand.id}`
          return (
            <section key={strand.id} className="strand">
              <header className="strand-head">
                <span className="eyebrow">Strand {strand.code}</span>
                <h2 className="display">{strand.title}</h2>
              </header>
              <ol className="timeline">
                {strand.subStrands.map((sub, i) => {
                  const reached = levelReached(p, sub.id)
                  const isNext = nextKey === sub.id
                  const stars = subStars(p, sub.id)
                  return (
                    <motion.li
                      key={sub.id}
                      ref={isNext ? nextRef : undefined}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.3 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <button
                        type="button"
                        className={`stop ${isNext ? 'is-next' : ''}`}
                        onClick={() => {
                          sfx.tap()
                          setSheet({ sub })
                        }}
                      >
                        <span className="node">
                          {isNext && <Breath size={56} color="rgba(241,207,135,.55)" />}
                          <Ring reached={reached} />
                          <span className="node-core">{reached > 0 ? <LevelGlyph level={reached} size={24} /> : <span className="node-code">{sub.code}</span>}</span>
                        </span>
                        <span className="stop-text">
                          <span className="stop-title">{sub.title}</span>
                          <span className="stop-blurb">{sub.blurb}</span>
                        </span>
                        <span className="stop-meta">
                          {isNext && <span className="up-next">Up next</span>}
                          {reached > 0 && !isNext && <span className="stop-level">{LEVEL_NAMES[reached - 1]}</span>}
                          {stars > 0 && <span className="stop-stars">★ {stars}</span>}
                        </span>
                      </button>
                    </motion.li>
                  )
                })}
                <li ref={chNext ? nextRef : undefined}>
                  <button
                    type="button"
                    className={`stop challenge ${chUnlocked ? '' : 'locked'} ${chNext ? 'is-next' : ''}`}
                    onClick={() => {
                      sfx.tap()
                      setSheet({ strand })
                    }}
                  >
                    <span className="node">
                      {chNext && <Breath size={56} color="rgba(241,207,135,.55)" />}
                      <span className="node-core big">
                        <LevelGlyph level={5} size={30} dim={!chUnlocked} />
                      </span>
                    </span>
                    <span className="stop-text">
                      <span className="stop-title">Baobab Challenge</span>
                      <span className="stop-blurb">{chUnlocked ? 'Mixed questions at end-of-term level' : `Opens when every stop reaches ${LEVEL_NAMES[CHALLENGE_UNLOCK_LEVEL - 1]}`}</span>
                    </span>
                    <span className="stop-meta">
                      {!chUnlocked ? <span style={{ opacity: 0.5 }}>{Icon.lock}</span> : chStars > 0 ? <Stars n={chStars} size={14} /> : <span className="up-next">Ready</span>}
                    </span>
                  </button>
                </li>
              </ol>
            </section>
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
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="btn icon sheet-close" aria-label="Close" onClick={onClose}>
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
  const [chosen, setChosen] = useState<Level>(Math.min(5, reached + 1) as Level)
  return (
    <div className="sheet-body">
      <div className="eyebrow">Sub-strand {sub.code}</div>
      <h2 className="display">{sub.title}</h2>
      <p className="sheet-blurb">{sub.blurb}</p>
      <div className="levels" role="radiogroup" aria-label="Choose a level">
        {LEVEL_NAMES.map((name, i) => {
          const level = (i + 1) as Level
          const unlocked = isUnlocked(p, sub.id, level)
          const stars = starsAt(p, sub.id, level)
          return (
            <button
              key={name}
              type="button"
              role="radio"
              aria-checked={chosen === level}
              disabled={!unlocked}
              className={`level ${chosen === level ? 'chosen' : ''}`}
              onClick={() => {
                sfx.tap()
                setChosen(level)
              }}
            >
              <LevelGlyph level={level} size={30} dim={!unlocked} />
              <span className="level-text">
                <span className="level-name">{name}</span>
                <span className="level-hint">{LEVEL_HINTS[i]}</span>
              </span>
              {unlocked ? <Stars n={stars ?? 0} size={14} /> : <span style={{ opacity: 0.5 }}>{Icon.lock}</span>}
            </button>
          )
        })}
      </div>
      <button type="button" className="btn primary sheet-go" onClick={() => onStart(chosen)}>
        Begin {LEVEL_NAMES[chosen - 1]}
      </button>
      <p className="sheet-note">Eight questions. Get five right to grow to the next level.</p>
    </div>
  )
}

function ChallengeSheet({ strand, onStart }: { strand: Strand; onStart: () => void }) {
  const p = useProgress()
  const unlocked = challengeUnlocked(p, strand.id)
  return (
    <div className="sheet-body">
      <div className="eyebrow">Strand {strand.code}</div>
      <h2 className="display">Baobab Challenge</h2>
      <p className="sheet-blurb">Mixed questions from every stop in {strand.title}, at end-of-term paper difficulty.</p>
      <div className="levels">
        {strand.subStrands.map((s) => {
          const r = levelReached(p, s.id)
          const ok = r >= CHALLENGE_UNLOCK_LEVEL
          return (
            <div key={s.id} className={`level static ${ok ? 'chosen' : ''}`}>
              <LevelGlyph level={Math.max(1, r)} size={26} dim={r === 0} />
              <span className="level-text">
                <span className="level-name">{s.title}</span>
                <span className="level-hint">{r === 0 ? 'Not started' : `Reached ${LEVEL_NAMES[r - 1]}`}</span>
              </span>
              {ok ? (
                <span style={{ color: 'var(--lagoon)' }}>{Icon.check}</span>
              ) : (
                <span className="level-hint">
                  {r}/{CHALLENGE_UNLOCK_LEVEL}
                </span>
              )}
            </div>
          )
        })}
      </div>
      <button type="button" className="btn primary sheet-go" disabled={!unlocked} onClick={onStart}>
        {unlocked ? 'Take the challenge' : `Reach ${LEVEL_NAMES[CHALLENGE_UNLOCK_LEVEL - 1]} in every stop`}
      </button>
    </div>
  )
}
