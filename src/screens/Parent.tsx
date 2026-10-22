import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useNav } from '../App'
import { sfx } from '../audio/sfx'
import { NatureScene } from '../components/NatureScene'
import { Chip, Icon, LevelGlyph, TopBar } from '../components/ui'
import { findArea, LEVEL_NAMES } from '../curriculum'
import { lessonFor } from '../lessons'
import { dueReview, useProgress } from '../state/progress'
import { gradeReports, totals, type SubReport } from '../state/summary'
import './parent.css'

const pct = (x: number | null) => (x == null ? '–' : `${Math.round(x * 100)}%`)

/** A small sum keeps children out of the grown-ups' page. */
function Gate({ onPass }: { onPass: () => void }) {
  const [a, b] = useMemo(() => [6 + Math.floor(Math.random() * 4), 6 + Math.floor(Math.random() * 4)], [])
  const options = useMemo(() => [a * b, a * b + a, a * b - b].sort(() => Math.random() - 0.5), [a, b])
  const [wrong, setWrong] = useState(false)
  return (
    <div className="pg-gate glass">
      <span className="eyebrow">For grown-ups</span>
      <h2 className="display">
        What is {a} × {b}?
      </h2>
      <div className="pg-options">
        {options.map((n) => (
          <button
            key={n}
            type="button"
            className="btn"
            onClick={() => {
              if (n === a * b) {
                sfx.select()
                onPass()
              } else {
                sfx.almost()
                setWrong(true)
              }
            }}
          >
            {n}
          </button>
        ))}
      </div>
      {wrong && <p className="pg-wrong">Not quite. Ask a grown-up to open this page.</p>}
    </div>
  )
}

function Row({ r, note, onOpen }: { r: SubReport; note?: string; onOpen?: () => void }) {
  return (
    <li className="pr-row">
      <LevelGlyph level={Math.max(1, r.reached)} size={26} dim={r.reached === 0} />
      <span className="pr-text">
        <span className="pr-name">{r.sub.title}</span>
        <span className="pr-meta">
          {r.reached ? LEVEL_NAMES[r.reached - 1] : 'Not started'}
          {r.answered > 0 && ` · ${pct(r.accuracy)} right of ${r.answered}`}
        </span>
        {note && <span className="pr-note">{note}</span>}
      </span>
      {onOpen && (
        <button type="button" className="btn pr-open" onClick={onOpen}>
          Open
        </button>
      )}
    </li>
  )
}

export function Parent() {
  const go = useNav()
  const p = useProgress()
  const [open, setOpen] = useState(false)
  const reports = gradeReports(p)
  const t = totals(p)
  const waiting = dueReview(p, 99).length

  return (
    <main className="parent">
      <section className="pg-hero">
        <NatureScene id="lake-dusk" dim={0.35} />
        <div className="pg-veil" />
        <TopBar onBack={() => go({ name: 'home' })} title={<span className="eyebrow">For parents</span>} />
        <div className="pg-title gutter">
          <h1 className="display">How your child is growing</h1>
          <p>What they are good at, where they are stuck, and what to practise together this week.</p>
        </div>
      </section>

      <div className="pg-body gutter">
        {!open ? (
          <Gate onPass={() => setOpen(true)} />
        ) : (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="pg-chips">
              <Chip>
                {Icon.flame} {p.streak.days} day{p.streak.days === 1 ? '' : 's'} in a row
              </Chip>
              <Chip>{t.answered} questions answered</Chip>
              <Chip>{pct(t.accuracy)} right</Chip>
              {waiting > 0 && <Chip>{waiting} to review</Chip>}
            </div>

            {reports.length === 0 && (
              <p className="pg-empty">Nothing here yet. Once your child starts a world, their progress will show here.</p>
            )}

            {reports.map((g) => (
              <section key={g.grade} className="pg-grade">
                <h2 className="display">{g.label}</h2>
                {g.areas.map((r) => {
                  const area = findArea(r.area)
                  const openSub = (sub: string) => go({ name: 'map', area: r.area, open: sub })
                  return (
                    <article key={r.area} className="pr-card glass">
                      <header className="pr-head">
                        <span>
                          <span className="eyebrow">{area.title}</span>
                          <span className="pr-world display">{area.world}</span>
                        </span>
                        <span className="pr-stars">
                          ★ {r.stars.earned} <small>of {r.stars.total}</small>
                        </span>
                      </header>
                      <div className="pr-bar" aria-hidden>
                        <span style={{ width: `${(100 * r.stars.earned) / r.stars.total}%` }} />
                      </div>

                      {r.stuck.length > 0 && (
                        <>
                          <h3 className="pr-h stuck">Needs your help</h3>
                          <ul>
                            {r.stuck.map((s) => (
                              <Row key={s.sub.id} r={s} note={lessonFor(s.sub.id) ? `Read the lesson together. Key idea: ${lessonFor(s.sub.id)!.remember}` : undefined} onOpen={() => openSub(s.sub.id)} />
                            ))}
                          </ul>
                        </>
                      )}

                      <h3 className="pr-h">Practise this week</h3>
                      <ul>
                        {r.practise.filter((s) => !r.stuck.includes(s)).map((s) => (
                          <Row key={s.sub.id} r={s} onOpen={() => openSub(s.sub.id)} />
                        ))}
                        {r.practise.every((s) => r.stuck.includes(s)) && <li className="pr-none">Start with the ones above.</li>}
                      </ul>

                      {r.strong.length > 0 && (
                        <>
                          <h3 className="pr-h good">Growing well</h3>
                          <ul>
                            {r.strong.map((s) => (
                              <Row key={s.sub.id} r={s} />
                            ))}
                          </ul>
                        </>
                      )}
                    </article>
                  )
                })}
              </section>
            ))}

            <p className="pg-fine">Progress is kept on this device. Super Pro will add a weekly report sent to your phone.</p>
          </motion.div>
        )}
      </div>
    </main>
  )
}
