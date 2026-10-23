import { AnimatePresence, motion } from 'framer-motion'
import { Fragment, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useNav, type QuizTarget } from '../App'
import { canSpeak, sfx, speak, stopSpeaking } from '../audio/sfx'
import { Art } from '../components/art/objects'
import { Kobe, type Mood } from '../components/Kobe'
import { Bloom, haptic } from '../components/motion'
import { NatureScene } from '../components/NatureScene'
import { Breath, Icon, LevelGlyph, SCENE_FOR } from '../components/ui'
import { NumberPad, OrderTiles } from '../components/widgets/Inputs'
import { VisualView } from '../components/widgets/Visual'
import { findArea, findStrand, findSubStrand, LEVEL_NAMES } from '../curriculum'
import { findPaper } from '../engine/kpsea'
import { buildChallenge, buildKpsea, buildQuiz, isCorrect, similarQuestion } from '../engine/quiz'
import type { Option, Question } from '../engine/types'
import { lessonFor } from '../lessons'
import { dueReview, getProgress, recordAnswer, recordReview, useProgress, type ReviewItem } from '../state/progress'
import './quiz.css'

const PRAISE_EN = ['Well done', 'Beautiful', 'You got it', 'Lovely thinking', 'Exactly right']
const PRAISE_SW = ['Hongera', 'Safi sana', 'Umeweza', 'Hodari', 'Vizuri sana']
const ALMOST_EN = ['Almost', 'Nearly there', 'Good try']
const ALMOST_SW = ['Karibu', 'Pole pole', 'Jaribu tena']
const GOT_IT_EN = ['Now you have it', 'That is it', 'You learnt it']
const GOT_IT_SW = ['Sasa umeweza', 'Umeelewa', 'Hongera']

const EMPTY_Q: Question = { id: 'none', type: 'number', level: 1, prompt: '', answer: 0 }

/** A quiz is a list of items: scored questions, plus unscored "try one like it" after a miss. */
interface Item {
  q: Question
  practice?: boolean
  review?: ReviewItem
}

type Response = string | number | string[]

function answerText(q: Question): string {
  if (q.type === 'number') return String(q.answer)
  if (q.type === 'order') return q.answer.join(q.joiner)
  return q.options.find((o) => o.id === q.answer)?.label ?? ''
}

/** Prompts mark an underlined word as _word_, the way papers underline it. */
function richText(text: string): ReactNode {
  return text.split(/(_[A-Za-z][^_\s]*?_)/g).map((part, i) =>
    /^_[A-Za-z].*_$/.test(part) ? (
      <u key={i} style={{ textDecorationColor: 'var(--dawn)', textDecorationThickness: 3, textUnderlineOffset: 5 }}>
        {part.slice(1, -1)}
      </u>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

/** "3/4" becomes a stacked fraction. */
function Label({ text }: { text: string }) {
  const m = /^(\d+)\/(\d+)$/.exec(text)
  if (!m) return <>{text}</>
  return (
    <span className="frac" aria-label={`${m[1]} over ${m[2]}`}>
      <span>{m[1]}</span>
      <span>{m[2]}</span>
    </span>
  )
}

export function QuizScreen({ target }: { target: QuizTarget }) {
  const go = useNav()
  const { settings } = useProgress()
  const [items, setItems] = useState<Item[]>(() => {
    if (target.review) return dueReview(getProgress()).map((r) => ({ q: r.q, review: r }))
    const qs = target.kpsea ? buildKpsea(target.kpsea, target.paper * 7919) : target.strand ? buildChallenge(target.strand, target.paper * 7919) : buildQuiz(target.sub!, target.level, target.paper * 7919)
    return qs.map((q) => ({ q }))
  })
  const [idx, setIdx] = useState(0)
  // Nothing waiting (say, review opened twice): go home rather than show an empty quiz.
  useEffect(() => {
    if (!items.length) go({ name: 'home' }, { replace: true })
  }, [items.length, go])
  const item = items[idx] ?? { q: EMPTY_Q }
  const q = item.q
  // Review mixes worlds, so the scene and voice follow each question.
  const areaId = item.review?.area ?? target.area
  const area = findArea(areaId)
  const lang = area.kind === 'kiswahili' ? 'sw' : 'en'
  const sw = lang === 'sw'
  const title = target.review ? (sw ? 'Marudio' : 'Mistakes review') : target.kpsea ? `KPSEA · ${findPaper(target.kpsea).title}` : target.strand ? findStrand(target.strand).strand.title : findSubStrand(target.sub!).sub.title
  const scored = useMemo(() => items.map((it, i) => (it.practice ? -1 : i)).filter((i) => i >= 0), [items])
  const [results, setResults] = useState<Record<number, boolean>>({})
  const [response, setResponse] = useState<Response | null>(null)
  const [mood, setMood] = useState<Mood>('idle')
  const [phrase, setPhrase] = useState('')
  const answered = response !== null
  const correct = answered && isCorrect(q, response)
  const sub = q.sub ?? item.review?.sub ?? target.sub
  const lesson = sub ? lessonFor(sub) : undefined
  const why = q.explain ?? (lesson ? `${sw ? 'Kumbuka' : 'Remember'}: ${lesson.remember}` : undefined)
  const numberOf = scored.indexOf(idx) + 1
  const nextIsPractice = !!items[idx + 1]?.practice

  const readAloud = useCallback(() => {
    void speak(q.listen ? q.say! : (q.say ?? q.prompt.replace(/_/g, ' ')), lang)
  }, [q, lang])

  useEffect(() => {
    if (!settings.voice) return
    const t = setTimeout(readAloud, q.listen ? 600 : 800)
    return () => clearTimeout(t)
    // Only when a new question appears.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx])

  useEffect(() => () => stopSpeaking(), [])

  const submit = (r: Response) => {
    if (answered) return
    const ok = isCorrect(q, r)
    setResponse(r)
    stopSpeaking()
    if (!item.practice) setResults((rs) => ({ ...rs, [idx]: ok }))
    if (item.review) recordReview(item.review, ok)
    else if (!item.practice && sub) recordAnswer(q, sub, areaId, ok)
    // A miss in a quiz gets one fresh question on the same idea, straight after. Practice
    // papers run straight through, like the real exam.
    if (!ok && !item.practice && !item.review && !target.kpsea) {
      const like = similarQuestion(q, target.paper * 131 + idx)
      if (like) setItems((xs) => [...xs.slice(0, idx + 1), { q: like, practice: true }, ...xs.slice(idx + 1)])
    }
    const pick = (xs: string[]) => xs[Math.floor(Math.random() * xs.length)]
    if (settings.sound) haptic(ok ? 'right' : 'wrong')
    if (ok) {
      sfx.correct()
      setMood(Math.random() < 0.4 ? 'cheer' : 'happy')
      setPhrase(pick(item.practice ? (sw ? GOT_IT_SW : GOT_IT_EN) : sw || Math.random() < 0.3 ? PRAISE_SW : PRAISE_EN))
    } else {
      sfx.almost()
      setMood('oops')
      setPhrase(pick(sw ? ALMOST_SW : ALMOST_EN))
    }
  }

  const advance = useCallback(() => {
    sfx.tap()
    if (idx + 1 >= items.length) {
      const right = Object.values(results).filter(Boolean).length
      go({ ...target, name: 'results', correct: right, total: scored.length }, { replace: true })
      return
    }
    setIdx(idx + 1)
    setResponse(null)
    setMood('idle')
  }, [idx, items.length, results, scored.length, go, target])

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
      <div className="quiz-bg">
        <NatureScene id={target.review ? 'lake-dusk' : SCENE_FOR[area.kind]} dim={0.55} />
      </div>
      <header className="quiz-top gutter">
        <button type="button" className="btn icon" aria-label="Leave quiz" onClick={() => go(target.review ? { name: 'home' } : { name: 'map', area: target.area, open: target.sub })}>
          {Icon.close}
        </button>
        <div className="progress" aria-label={`Question ${Math.max(1, numberOf)} of ${scored.length}`}>
          {scored.map((i) => (
            <span key={i} className={i in results ? (results[i] ? 'good' : 'miss') : i === idx ? 'now' : ''} />
          ))}
        </div>
        <div className="quiz-level">
          <LevelGlyph level={target.strand || target.kpsea ? 5 : target.review ? q.level : target.level} size={30} />
          <span>
            <span className="ql-name">{target.review ? (sw ? 'Marudio' : 'Review') : target.kpsea ? (sw ? 'Mtihani wa mazoezi' : 'Practice paper') : target.strand ? 'Baobab Challenge' : LEVEL_NAMES[target.level - 1]}</span>
            <span className="ql-title">{title}</span>
          </span>
        </div>
      </header>

      <section className="quiz-stage gutter">
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            className="q-wrap"
            initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <article className={`q-card ${item.practice ? 'is-practice' : ''} ${answered ? (correct ? 'is-good' : 'is-miss') : ''}`}>
              <div className="q-head">
                <span className="q-num">
                  {item.practice ? (sw ? 'Jaribu moja kama hili' : 'Try one like it') : `${numberOf} ${sw ? 'kati ya' : 'of'} ${scored.length}`}
                </span>
                {canSpeak() && (
                  <button
                    type="button"
                    className={`q-speak ${q.listen ? 'listen' : ''}`}
                    onClick={() => {
                      sfx.tap()
                      readAloud()
                    }}
                    aria-label="Read aloud"
                  >
                    {q.listen && <Breath size={46} color="rgba(201,139,60,.5)" />}
                    {Icon.speaker}
                    {q.listen && <span>Listen</span>}
                  </button>
                )}
              </div>
              <h2 className="q-prompt">
                {q.prompt.split('\n').map((line, i) => (
                  <span key={i} className={i > 0 ? 'q-line2' : undefined}>
                    {richText(line)}
                  </span>
                ))}
              </h2>
              {q.visual && (
                <div className="q-visual">
                  <VisualView v={q.visual} />
                </div>
              )}
              {correct && q.type !== 'choice' && <Bloom />}
            </article>

            <div className="q-answer">
              {q.type === 'choice' && <Choices q={q} response={response as string | null} onPick={submit} />}
              {q.type === 'number' && <NumberPad key={q.id} disabled={answered} onSubmit={submit} maxDigits={/^(u[456]|j[789])/.test(q.sub ?? '') ? 8 : 3} />}
              {q.type === 'order' && <OrderTiles key={q.id} tiles={q.tiles} slots={q.answer.length} joiner={q.joiner} disabled={answered} onSubmit={submit} />}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      <AnimatePresence>
        {answered && (
          <motion.div
            className={`feedback ${correct ? 'good' : 'miss'}`}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            role="status"
          >
            <div className="fb-inner">
              <div className="fb-kobe">
                <Kobe mood={mood} size={92} interactive={false} />
              </div>
              <div className="fb-text">
                <div className="display fb-title">{phrase}</div>
                {!correct && (
                  <div className="fb-answer">
                    The answer is{' '}
                    {answerText(q) ? <b><Label text={answerText(q)} /></b> : q.type === 'choice' && <AnswerArt option={q.options.find((o) => o.id === q.answer)} />}
                  </div>
                )}
                {why && (!correct || q.explain) && <div className="fb-explain">{why}</div>}
              </div>
              <button type="button" className="btn primary fb-go" onClick={advance} autoFocus>
                {idx + 1 >= items.length ? (sw ? 'Matokeo yangu' : 'See how I did') : nextIsPractice ? (sw ? 'Jaribu moja kama hili' : 'Try one like it') : sw ? 'Endelea' : 'Continue'}
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
    <span className="fb-art">
      {option.art ? (
        <Art id={option.art} size={40} />
      ) : option.visual ? (
        <span style={{ display: 'inline-block', transform: 'scale(.6)', transformOrigin: 'left center' }}>
          <VisualView v={option.visual} compact />
        </span>
      ) : null}
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
            initial={{ opacity: 0, y: 14 }}
            animate={state === 'wrong' ? { opacity: 1, y: 0, x: [0, -8, 8, -4, 4, 0] } : { opacity: 1, y: 0 }}
            transition={{ delay: response === null ? 0.2 + i * 0.06 : 0, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={response === null ? { y: -3 } : undefined}
            whileTap={response === null ? { scale: 0.97 } : undefined}
          >
            {o.art && <Art id={o.art} size={artOnly ? 84 : 52} />}
            {o.visual && <VisualView v={o.visual} compact />}
            {o.label && (
              <span className="choice-label">
                <Label text={o.label} />
              </span>
            )}
            {state === 'right' && picked && <Bloom />}
            {state === 'right' && (
              <motion.span className="choice-tick" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
                {Icon.check}
              </motion.span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
