import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useNav, type QuizTarget } from '../App'
import { sfx, speak } from '../audio/sfx'
import { Kobe } from '../components/Kobe'
import { CountUp } from '../components/motion'
import { NatureScene } from '../components/NatureScene'
import { LevelGlyph, SCENE_FOR, Star } from '../components/ui'
import { findArea, findStrand, findSubStrand, LEVEL_NAMES } from '../curriculum'
import { starsFor } from '../engine/quiz'
import type { Level } from '../engine/types'
import { lessonFor } from '../lessons'
import { nextPaper, recordChallenge, recordQuiz } from '../state/progress'
import './results.css'

const MESSAGES: Record<number, [string, string]> = {
  3: ['Bingwa', 'A champion’s paper. Every answer counted.'],
  2: ['Safi sana', 'Lovely work. One more step and it is three stars.'],
  1: ['You grew', 'Mwenda pole hajikwai. Slow and steady, you are growing.'],
  0: ['Good try', 'Every baobab began as a seed. A new paper is waiting.'],
}

/** Warm motes that rise slowly, like embers or fireflies, when a level is passed. */
function Lights() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    c.width = innerWidth * dpr
    c.height = innerHeight * dpr
    ctx.scale(dpr, dpr)
    const motes = Array.from({ length: 34 }, () => ({
      x: innerWidth / 2 + (Math.random() - 0.5) * innerWidth * 0.6,
      y: innerHeight * (0.55 + Math.random() * 0.5),
      vy: 0.4 + Math.random() * 1.1,
      p: Math.random() * 6.28,
      r: 0.8 + Math.random() * 1.4,
      life: 0,
    }))
    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight)
      let alive = 0
      for (const m of motes) {
        m.life++
        m.y -= m.vy
        m.x += Math.sin((m.life + m.p * 40) / 40) * 0.5
        const a = Math.min(1, m.life / 40) * Math.max(0, (m.y - innerHeight * 0.05) / innerHeight)
        if (a > 0.01) alive++
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 5)
        g.addColorStop(0, `rgba(255, 224, 160, ${a})`)
        g.addColorStop(1, 'rgba(255, 224, 160, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.r * 5, 0, Math.PI * 2)
        ctx.fill()
      }
      if (alive) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={ref} aria-hidden style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3 }} />
}

export function Results({ target, correct, total }: { target: QuizTarget; correct: number; total: number }) {
  const go = useNav()
  const area = findArea(target.area)
  const stars = starsFor(correct, total)
  const [shown, setShown] = useState(0)
  const saved = useRef(false)
  const isChallenge = !!target.strand
  const isReview = !!target.review
  const title = isReview
    ? 'Mistakes review'
    : isChallenge
      ? `${findStrand(target.strand!).strand.title} · Baobab Challenge`
      : `${findSubStrand(target.sub!).sub.title} · ${LEVEL_NAMES[target.level - 1]}`
  const [headline, body] = isReview
    ? correct === total
      ? (['All grown back', 'Every one you missed before is right now. They will visit once more, a little later, to stay strong.'] as const)
      : (['Still growing', 'The ones you missed will come back tomorrow. That is how they stick.'] as const)
    : MESSAGES[stars]
  const canGrow = !isChallenge && !isReview && stars >= 1 && target.level < 5
  const lesson = !isChallenge && !isReview && target.sub ? lessonFor(target.sub) : undefined
  const nextName = LEVEL_NAMES[Math.min(4, target.level)]
  const C = 2 * Math.PI * 76

  useEffect(() => {
    if (saved.current) return
    saved.current = true
    if (isReview) return
    if (isChallenge) recordChallenge(target.strand!, stars)
    else recordQuiz(target.sub!, target.level, stars)
  }, [isChallenge, isReview, stars, target])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    timers.push(setTimeout(() => (stars > 0 ? sfx.fanfare() : sfx.almost()), 1100))
    for (let i = 0; i < stars; i++)
      timers.push(
        setTimeout(() => {
          setShown(i + 1)
          sfx.star(i)
        }, 1700 + i * 450),
      )
    timers.push(setTimeout(() => void speak(`${headline}. ${correct} out of ${total}.`, area.kind === 'kiswahili' ? 'sw' : 'en'), 1900 + stars * 450))
    return () => timers.forEach(clearTimeout)
  }, [stars, headline, correct, total, area.kind])

  const retry = () => {
    const key = isChallenge ? `challenge:${target.strand}` : `${target.sub}:${target.level}`
    go({ ...target, name: 'quiz', paper: nextPaper(key) }, { replace: true })
  }
  const grow = () => {
    const level = (target.level + 1) as Level
    go({ ...target, name: 'quiz', level, paper: nextPaper(`${target.sub}:${level}`) }, { replace: true })
  }

  return (
    <main className="results">
      <NatureScene id={SCENE_FOR[area.kind]} dim={0.6} />
      {stars > 0 && <Lights />}
      <section className="res gutter">
        <motion.div className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}>
          {title}
        </motion.div>

        <motion.div className="res-ring" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <svg viewBox="0 0 180 180" width="180" height="180" aria-hidden>
            <circle cx="90" cy="90" r="76" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="5" />
            <motion.circle
              cx="90"
              cy="90"
              r="76"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              animate={{ strokeDashoffset: C * (1 - correct / total) }}
              transition={{ delay: 0.8, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              transform="rotate(-90 90 90)"
              style={{ filter: 'drop-shadow(0 0 8px rgba(241,207,135,.7))' }}
            />
          </svg>
          <div className="res-score">
            <span className="display">
              <CountUp to={correct} delay={0.8} duration={1.4} />
            </span>
            <span>of {total}</span>
          </div>
        </motion.div>

        <div className="res-stars">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`s${i}`}>
              <Star filled={i < shown} size={i === 1 ? 46 : 36} />
            </span>
          ))}
        </div>

        <motion.h1 className="display" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 1 }}>
          {headline}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}>
          {body}
        </motion.p>

        {canGrow && (
          <motion.div className="res-grow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 1 }}>
            <LevelGlyph level={target.level} size={30} />
            <span className="res-line" />
            <LevelGlyph level={target.level + 1} size={38} draw />
            <span>
              You grew to <b>{nextName}</b>
            </span>
          </motion.div>
        )}

        <motion.div className="res-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 0.8 }}>
          {isReview ? (
            <button type="button" className="btn primary" onClick={() => go({ name: 'home' }, { replace: true })}>
              Back home
            </button>
          ) : stars === 0 && lesson ? (
            <>
              <button type="button" className="btn primary" onClick={() => go({ name: 'learn', area: target.area, sub: target.sub! }, { replace: true })}>
                Read the lesson again
              </button>
              <button type="button" className="btn" onClick={retry}>
                Try a new paper
              </button>
            </>
          ) : canGrow ? (
            <button type="button" className="btn primary" onClick={grow}>
              Continue to {nextName}
            </button>
          ) : (
            <button type="button" className="btn primary" onClick={retry}>
              {stars === 3 ? 'Play a new paper' : 'Try a new paper'}
            </button>
          )}
          {canGrow && (
            <button type="button" className="btn" onClick={retry}>
              New paper, same level
            </button>
          )}
          {!isReview && (
            <button type="button" className="btn quiet" onClick={() => go({ name: 'map', area: target.area }, { replace: true })}>
              Back to the journey
            </button>
          )}
        </motion.div>
      </section>
      <div className="res-kobe" aria-hidden>
        <Kobe mood={stars >= 1 ? 'cheer' : 'happy'} size={120} />
      </div>
    </main>
  )
}
