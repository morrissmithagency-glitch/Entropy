import { AnimatePresence, motion } from 'framer-motion'
import { Fragment, useEffect, useState, type ReactNode } from 'react'
import { useNav } from '../App'
import { canSpeak, sfx, speak, stopSpeaking } from '../audio/sfx'
import { Kobe } from '../components/Kobe'
import { NatureScene } from '../components/NatureScene'
import { Icon, SCENE_FOR } from '../components/ui'
import { VisualView } from '../components/widgets/Visual'
import { findArea, findSubStrand, LEVEL_NAMES, type AreaId } from '../curriculum'
import type { Level } from '../engine/types'
import { lessonFor } from '../lessons'
import { levelReached, markLearned, nextPaper, useProgress } from '../state/progress'
import './learn.css'

/** _word_ is underlined, the way papers mark a word. */
function rich(text: string): ReactNode {
  return text.split(/(_[^_\s][^_]*?_)/g).map((part, i) =>
    /^_.+_$/.test(part) ? <u key={i}>{part.slice(1, -1)}</u> : <Fragment key={i}>{part}</Fragment>,
  )
}

export function Learn({ area: areaId, sub: subId }: { area: AreaId; sub: string }) {
  const go = useNav()
  const p = useProgress()
  const area = findArea(areaId)
  const { sub } = findSubStrand(subId)
  const lesson = lessonFor(subId)!
  const lang = area.kind === 'kiswahili' ? 'sw' : 'en'
  const sw = lang === 'sw'
  // Page 0 is the welcome, then one page per step, then "remember".
  const pages = lesson.steps.length + 2
  const [page, setPage] = useState(0)
  const last = page === pages - 1
  const step = page > 0 && !last ? lesson.steps[page - 1] : null

  const spoken = page === 0 ? `${sub.title}. ${lesson.intro}` : step ? `${step.title}. ${step.text}` : `${sw ? 'Kumbuka' : 'Remember'}. ${lesson.remember}`
  useEffect(() => {
    if (last) markLearned(subId)
    if (!p.settings.voice) return
    const t = setTimeout(() => void speak(spoken.replace(/_/g, ''), lang), 500)
    return () => clearTimeout(t)
    // Only when the page changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])
  useEffect(() => () => stopSpeaking(), [])

  const move = (d: number) => {
    sfx.tap()
    stopSpeaking()
    setPage((x) => Math.max(0, Math.min(pages - 1, x + d)))
  }
  const level = Math.min(5, levelReached(p, subId) + 1) as Level
  const practise = () => {
    sfx.select()
    go({ name: 'quiz', area: areaId, sub: subId, level, paper: nextPaper(`${subId}:${level}`) }, { replace: true })
  }
  const leave = () => go({ name: 'map', area: areaId, open: subId }, { replace: true })

  return (
    <main className="learn">
      <div className="quiz-bg">
        <NatureScene id={SCENE_FOR[area.kind]} dim={0.5} />
      </div>
      <header className="learn-top gutter">
        <button type="button" className="btn icon" aria-label={sw ? 'Funga somo' : 'Close lesson'} onClick={leave}>
          {Icon.close}
        </button>
        <div className="progress" aria-label={`Page ${page + 1} of ${pages}`}>
          {Array.from({ length: pages }, (_, i) => (
            <span key={i} className={i < page ? 'good' : i === page ? 'now' : ''} />
          ))}
        </div>
        <span className="learn-tag">{Icon.leaf} {sw ? 'Somo' : 'Lesson'}</span>
      </header>

      <section className="learn-stage gutter">
        <AnimatePresence mode="wait">
          <motion.article
            key={page}
            className={`learn-card ${last ? 'is-remember' : ''}`}
            initial={{ opacity: 0, x: 30, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="q-head">
              <span className="q-num">{page === 0 ? sub.code : step ? `${sw ? 'Hatua' : 'Step'} ${page} ${sw ? 'kati ya' : 'of'} ${lesson.steps.length}` : sw ? 'Kumbuka' : 'Remember'}</span>
              {canSpeak() && (
                <button type="button" className="q-speak" aria-label={sw ? 'Soma kwa sauti' : 'Read aloud'} onClick={() => void speak(spoken.replace(/_/g, ''), lang)}>
                  {Icon.speaker}
                </button>
              )}
            </div>

            {page === 0 && (
              <div className="learn-welcome">
                <Kobe size={110} mood="happy" />
                <h1 className="display">{sub.title}</h1>
                <p>{rich(lesson.intro)}</p>
              </div>
            )}

            {step && (
              <>
                <h2 className="display learn-title">{step.title}</h2>
                <p className="learn-text">{rich(step.text)}</p>
                {step.visual && (
                  <div className="q-visual">
                    <VisualView v={step.visual} />
                  </div>
                )}
                {step.example && (
                  <div className="learn-example" aria-label={sw ? 'Mfano' : 'Example'}>
                    {step.example.map((line, i) => (
                      <div key={i}>{rich(line)}</div>
                    ))}
                  </div>
                )}
              </>
            )}

            {last && (
              <div className="learn-welcome">
                <span className="learn-seed">{Icon.leaf}</span>
                <p className="learn-remember">{rich(lesson.remember)}</p>
              </div>
            )}
          </motion.article>
        </AnimatePresence>

        <div className="learn-nav">
          {page > 0 ? (
            <button type="button" className="btn" onClick={() => move(-1)}>
              {sw ? 'Rudi' : 'Back'}
            </button>
          ) : (
            <span />
          )}
          {last ? (
            <button type="button" className="btn primary" onClick={practise}>
              {sw ? 'Jaribu' : 'Practise'} {LEVEL_NAMES[level - 1]}
            </button>
          ) : (
            <button type="button" className="btn primary" onClick={() => move(1)} autoFocus>
              {page === 0 ? (sw ? 'Tuanze' : "Let's begin") : sw ? 'Endelea' : 'Next'}
            </button>
          )}
        </div>
      </section>
    </main>
  )
}
