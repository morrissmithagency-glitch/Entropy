import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNav, type QuizTarget } from '../App'
import { canSpeak, sfx, speak, stopSpeaking } from '../audio/sfx'
import { LevelIcon } from '../components/art/levels'
import { Art } from '../components/art/objects'
import { Kobe, type Mood } from '../components/Kobe'
import { Icon } from '../components/ui'
import { NumberPad, OrderTiles } from '../components/widgets/Inputs'
import { VisualView } from '../components/widgets/Visual'
import { findStrand, findSubStrand, LEVEL_NAMES } from '../curriculum/grade1'
import { buildChallenge, buildQuiz, isCorrect } from '../engine/quiz'
import type { Option, Question } from '../engine/types'
import { useProgress } from '../state/progress'
import './quiz.css'

const PRAISE_EN = ['Well done!', 'Brilliant!', 'You got it!', 'Super!', 'Great thinking!']
const PRAISE_SW = ['Hongera!', 'Safi sana!', 'Umeweza!', 'Hodari!', 'Vizuri sana!']
const ALMOST_EN = ['Almost!', 'Good try!', 'Nearly there!']
const ALMOST_SW = ['Karibu!', 'Jaribu tena!', 'Pole pole!']

type Response = string | number | string[]

function answerText(q: Question): string {
  if (q.type === 'number') return String(q.answer)
  if (q.type === 'order') return q.answer.join(q.joiner)
  const o = q.options.find((o) => o.id === q.answer)
  return o?.label ?? ''
}

export function QuizScreen({ target }: { target: QuizTarget }) {
  const go = useNav()
  const { settings } = useProgress()
  const lang = target.area === 'kiswahili' ? 'sw' : 'en'
  const questions = useMemo(
    () => (target.strand ? buildChallenge(target.strand, target.paper * 7919) : buildQuiz(target.sub!, target.level, target.paper * 7919)),
    [target],
  )
  const title = target.strand ? `${findStrand(target.strand).strand.title} · Baobab Challenge` : findSubStrand(target.sub!).sub.title
  const [idx, setIdx] = useState(0)
  const [results, setResults] = useState<boolean[]>([])
  const [response, setResponse] = useState<Response | null>(null)
  const [mood, setMood] = useState<Mood>('idle')
  const [phrase, setPhrase] = useState('')
  const q = questions[idx]
  const answered = response !== null
  const correct = answered && isCorrect(q, response)

  const readAloud = useCallback(() => {
    const text = q.listen ? q.say! : (q.say ?? q.prompt)
    void speak(text, lang)
  }, [q, lang])

  useEffect(() => {
    if (!settings.voice) return
    const t = setTimeout(readAloud, q.listen ? 500 : 700)
    return () => clearTimeout(t)
    // Only when a new question appears.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx])

  useEffect(() => () => stopSpeaking(), [])

  const submit = (r: Response) => {
    if (answered) return
    const ok = isCorrect(q, r)
    setResponse(r)
    setResults((rs) => [...rs, ok])
    stopSpeaking()
    if (ok) {
      sfx.correct()
      setMood(idx === questions.length - 1 || Math.random() < 0.35 ? 'cheer' : 'happy')
      const list = lang === 'sw' ? PRAISE_SW : Math.random() < 0.3 ? PRAISE_SW : PRAISE_EN
      setPhrase(list[Math.floor(Math.random() * list.length)])
    } else {
      sfx.almost()
      setMood('oops')
      const list = lang === 'sw' ? ALMOST_SW : ALMOST_EN
      setPhrase(list[Math.floor(Math.random() * list.length)])
    }
  }

  const advance = useCallback(() => {
    sfx.tap()
    if (idx + 1 >= questions.length) {
      const total = questions.length
      const right = results.filter(Boolean).length
      go({ ...target, name: 'results', correct: right, total }, { replace: true })
      return
    }
    setIdx(idx + 1)
    setResponse(null)
    setMood('idle')
  }, [idx, questions.length, results, go, target])

  useEffect(() => {
    if (!answered) return
    const onKey = (e: KeyboardEvent) => e.key === 'Enter' && advance()
    const t = setTimeout(() => window.addEventListener('keydown', onKey), 250)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [answered, advance])

  return (
    <main className="quiz">
      <div className="kanga-band" />
      <header className="quiz-top">
        <button type="button" className="btn paper round" aria-label="Leave quiz" onClick={() => go({ name: 'map', area: target.area, open: target.sub })}>
          {Icon.close}
        </button>
        <div className="trail" aria-label={`Question ${idx + 1} of ${questions.length}`}>
          {questions.map((_, i) => (
            <span key={i} className={`step ${i < results.length ? (results[i] ? 'good' : 'miss') : ''} ${i === idx ? 'now' : ''}`}>
              <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden>
                <ellipse cx="12" cy="14" rx="6" ry="7" />
                <circle cx="6" cy="6" r="2.3" />
                <circle cx="10.5" cy="4" r="2.3" />
                <circle cx="15" cy="4.5" r="2.3" />
                <circle cx="19" cy="7" r="2.1" />
              </svg>
            </span>
          ))}
        </div>
        <div className="quiz-level">
          <LevelIcon level={target.level} size={38} />
          <span>
            <span className="ql-name">{target.strand ? 'Challenge' : LEVEL_NAMES[target.level - 1]}</span>
            <span className="ql-title">{title}</span>
          </span>
        </div>
      </header>

      <section className="quiz-stage">
        <aside className="quiz-kobe" aria-hidden>
          <Kobe mood={mood} size={200} />
        </aside>
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            className="q-wrap"
            initial={{ opacity: 0, x: 60, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -60, rotate: -2 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          >
            <article className={`q-card ${answered ? (correct ? 'is-good' : 'is-miss') : ''}`}>
              <div className="q-head">
                <span className="q-num">
                  {idx + 1}/{questions.length}
                </span>
                {canSpeak() && (
                  <motion.button
                    type="button"
                    className={`q-speak ${q.listen ? 'listen' : ''}`}
                    onClick={() => {
                      sfx.tap()
                      readAloud()
                    }}
                    aria-label="Read aloud"
                    whileTap={{ scale: 0.9 }}
                  >
                    {Icon.speaker}
                    {q.listen && <span>Listen</span>}
                  </motion.button>
                )}
              </div>
              <h2 className="q-prompt">
                {q.prompt.split('\n').map((line, i) => (
                  <span key={i} style={{ display: 'block' }}>
                    {line}
                  </span>
                ))}
              </h2>
              {q.visual && (
                <div className="q-visual">
                  <VisualView v={q.visual} />
                </div>
              )}
            </article>

            <div className="q-answer">
              {q.type === 'choice' && <Choices q={q} response={response as string | null} onPick={submit} />}
              {q.type === 'number' && <NumberPad key={q.id} disabled={answered} onSubmit={submit} />}
              {q.type === 'order' && <OrderTiles key={q.id} tiles={q.tiles} slots={q.answer.length} joiner={q.joiner} disabled={answered} onSubmit={submit} />}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      <AnimatePresence>
        {answered && (
          <motion.div className={`feedback ${correct ? 'good' : 'miss'}`} initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} role="status">
            <div className="fb-inner">
              <div className="fb-kobe">
                <Kobe mood={correct ? 'cheer' : 'oops'} size={96} />
              </div>
              <div className="fb-text">
                <div className="display fb-title">{phrase}</div>
                {!correct && (
                  <div className="fb-answer">
                    The answer is {answerText(q) ? <b>{answerText(q)}</b> : q.type === 'choice' && <AnswerArt option={q.options.find((o) => o.id === q.answer)} />}
                  </div>
                )}
                {q.explain && <div className="fb-explain">{q.explain}</div>}
              </div>
              <button type="button" className={`btn ${correct ? 'teal' : ''} fb-go`} onClick={advance} autoFocus>
                {idx + 1 >= questions.length ? 'See my stars' : 'Continue'} →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function AnswerArt({ option }: { option?: Option }) {
  if (!option) return null
  return (
    <span style={{ display: 'inline-flex', verticalAlign: 'middle', marginLeft: 8 }}>
      {option.art ? <Art id={option.art} size={40} /> : option.visual ? <span style={{ display: 'inline-block', transform: 'scale(.6)', transformOrigin: 'left center' }}><VisualView v={option.visual} compact /></span> : null}
    </span>
  )
}

function Choices({ q, response, onPick }: { q: Extract<Question, { type: 'choice' }>; response: string | null; onPick: (id: string) => void }) {
  const artOnly = q.options.every((o) => o.art && !o.label)
  const visual = q.options.some((o) => o.visual)
  const long = q.options.some((o) => (o.label?.length ?? 0) > 22)
  const cls = artOnly ? 'choices art' : visual ? 'choices visual' : long ? 'choices long' : 'choices'
  return (
    <div className={cls} style={{ ['--n' as string]: q.options.length }}>
      {q.options.map((o, i) => {
        const picked = response === o.id
        const isAnswer = o.id === q.answer
        const state = response === null ? '' : isAnswer ? 'right' : picked ? 'wrong' : 'fade'
        return (
          <motion.button
            key={o.id}
            type="button"
            className={`choice ${state}`}
            disabled={response !== null}
            onClick={() => onPick(o.id)}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={state === 'wrong' ? { opacity: 1, y: 0, scale: 1, x: [0, -10, 10, -6, 6, 0] } : { opacity: 1, y: 0, scale: state === 'right' ? 1.04 : 1 }}
            transition={{ delay: response === null ? 0.15 + i * 0.06 : 0, type: 'spring', stiffness: 400, damping: 20 }}
            whileHover={response === null ? { y: -4 } : undefined}
            whileTap={response === null ? { scale: 0.95, y: 2 } : undefined}
          >
            {o.art && <Art id={o.art} size={artOnly ? 88 : 56} />}
            {o.visual && <VisualView v={o.visual} compact />}
            {o.label && <span className="choice-label">{o.label}</span>}
            {state === 'right' && (
              <motion.span className="choice-tick" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 14 }}>
                ✓
              </motion.span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
