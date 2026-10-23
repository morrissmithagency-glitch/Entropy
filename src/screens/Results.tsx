import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useNav, type QuizTarget } from '../App'
import { sfx, speak } from '../audio/sfx'
import { GrowTree } from '../components/GrowTree'
import { Kobe } from '../components/Kobe'
import { CountUp } from '../components/motion'
import { NatureScene } from '../components/NatureScene'
import { SCENE_FOR, Star } from '../components/ui'
import { findArea, findStrand, findSubStrand, LEVEL_NAMES } from '../curriculum'
import { findPaper } from '../engine/kpsea'
import { starsFor } from '../engine/quiz'
import type { Level } from '../engine/types'
import { lessonFor } from '../lessons'
import { kpseaAccess, recordKpsea, startKpsea } from '../state/kpsea'
import { nextPaper, recordChallenge, recordQuiz } from '../state/progress'
import { getSubscription } from '../state/subscription'
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

/** A firefly rises from Kobe and settles into star slot `i`, which lights as it lands. */
function StarFly({ i, delay }: { i: number; delay: number }) {
  const sx = 150 - i * 55
  return (
    <motion.span
      className="res-fly"
      aria-hidden
      initial={{ x: sx, y: 320, opacity: 0, scale: 0.6 }}
      animate={{ x: [sx, sx * 0.35 + (i - 1) * 30, 0], y: [320, 120, 0], opacity: [0, 1, 1, 0], scale: [0.6, 1, 1.4, 0.4] }}
      transition={{ delay, duration: 0.85, ease: 'easeInOut', times: [0, 0.55, 1], opacity: { delay, duration: 0.9, times: [0, 0.15, 0.85, 1] } }}
    />
  )
}

/** After a Baobab Challenge: the sky warms, a sun rises and birds lift off. */
function Sunrise() {
  const reduce = useReducedMotion()
  if (reduce) return <div className="sunrise-warm" style={{ opacity: 0.5 }} aria-hidden />
  const birds = [
    [-30, 0, 0],
    [-10, 30, 0.25],
    [10, -20, 0.5],
    [30, 18, 0.7],
    [48, -6, 0.95],
  ]
  return (
    <div className="sunrise" aria-hidden>
      <motion.div className="sunrise-warm" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 5, ease: 'easeOut' }} />
      <motion.div className="sunrise-sun" initial={{ y: '40vh', opacity: 0 }} animate={{ y: '0vh', opacity: 1 }} transition={{ duration: 6, ease: [0.22, 1, 0.36, 1] }} />
      {birds.map(([x, y, d], i) => (
        <motion.svg
          key={i}
          className="sunrise-bird"
          viewBox="0 0 24 10"
          width="22"
          height="10"
          initial={{ x: `${x}vw`, y: `${30 + y / 4}vh`, opacity: 0 }}
          animate={{ x: `${x + 70}vw`, y: `${-20 + y / 4}vh`, opacity: [0, 0.85, 0.85, 0] }}
          transition={{ delay: 1.6 + d, duration: 9, ease: 'easeIn' }}
        >
          <motion.path
            d="M1 8q5-7 11 0q6-7 11 0"
            fill="none"
            stroke="#2a2240"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{ scaleY: [1, -0.5, 1] }}
            transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originY: 0.8 }}
          />
        </motion.svg>
      ))}
    </div>
  )
}

export function Results({ target, correct, total }: { target: QuizTarget; correct: number; total: number }) {
  const go = useNav()
  const area = findArea(target.area)
  const stars = starsFor(correct, total)
  const [shown, setShown] = useState(0)
  const saved = useRef(false)
  const isChallenge = !!target.strand
  const isReview = !!target.review
  const isKpsea = !!target.kpsea
  const percent = Math.round((correct / total) * 100)
  const title = isReview
    ? 'Mistakes review'
    : isKpsea
      ? `KPSEA practice · ${findPaper(target.kpsea!).title}`
    : isChallenge
      ? `${findStrand(target.strand!).strand.title} · Baobab Challenge`
      : `${findSubStrand(target.sub!).sub.title} · ${LEVEL_NAMES[target.level - 1]}`
  const [headline, body] = isReview
    ? correct === total
      ? (['All grown back', 'Every one you missed before is right now. They will visit once more, a little later, to stay strong.'] as const)
      : (['Still growing', 'The ones you missed will come back tomorrow. That is how they stick.'] as const)
    : isKpsea
      ? ([`${percent}%`, percent >= 75 ? 'Exam-ready on this paper. Keep it sharp with another one.' : percent >= 50 ? 'A solid paper. The questions you missed are waiting in your mistakes review.' : 'Every paper teaches. Your missed questions are saved for review, and the lessons will help.'] as const)
      : MESSAGES[stars]
  const canGrow = !isChallenge && !isReview && !isKpsea && stars >= 1 && target.level < 5
  const topped = !isChallenge && !isReview && !isKpsea && stars >= 1 && target.level === 5
  const sunrise = isChallenge && stars >= 1
  const lesson = !isChallenge && !isReview && !isKpsea && target.sub ? lessonFor(target.sub) : undefined
  const nextName = LEVEL_NAMES[Math.min(4, target.level)]
  const C = 2 * Math.PI * 76

  useEffect(() => {
    if (saved.current) return
    saved.current = true
    if (isReview) return
    if (isKpsea) recordKpsea(target.kpsea!, percent)
    else if (isChallenge) recordChallenge(target.strand!, stars)
    else {
      recordQuiz(target.sub!, target.level, stars)
      // The map lights a trail of footprints from this stop to the next one.
      if (stars >= 1)
        try {
          sessionStorage.setItem('cbc:lit', target.sub!)
        } catch {
          /* private mode */
        }
    }
  }, [isChallenge, isReview, isKpsea, percent, stars, target])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    timers.push(setTimeout(() => (stars > 0 ? sfx.fanfare() : sfx.almost()), 1100))
    for (let i = 0; i < stars; i++)
      timers.push(
        setTimeout(() => {
          setShown(i + 1)
          sfx.star(i)
        }, 1850 + i * 450),
      )
    timers.push(setTimeout(() => void speak(`${headline}. ${correct} out of ${total}.`, area.kind === 'kiswahili' ? 'sw' : 'en'), 1900 + stars * 450))
    return () => timers.forEach(clearTimeout)
  }, [stars, headline, correct, total, area.kind])

  const retry = () => {
    if (isKpsea) {
      const access = kpseaAccess(getSubscription())
      if (access === 'locked') go({ name: 'plans', from: target.area }, { replace: true })
      else go({ ...target, name: 'quiz', paper: startKpsea(target.kpsea!, access === 'free') }, { replace: true })
      return
    }
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
      {sunrise && <Sunrise />}
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
              {i < stars && <StarFly i={i} delay={1.05 + i * 0.45} />}
              <Star filled={i < shown} size={i === 1 ? 46 : 36} />
              {i < shown && <motion.span className="res-burst" aria-hidden initial={{ scale: 0.3, opacity: 0.9 }} animate={{ scale: 2.2, opacity: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} />}
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
            <span className="res-tree">
              <GrowTree from={target.level} to={target.level + 1} size={78} delay={0.5} />
            </span>
            <span>
              You grew to <b>{nextName}</b>
            </span>
          </motion.div>
        )}
        {topped && (
          <motion.div className="res-grow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 1 }}>
            <span className="res-tree">
              <GrowTree from={4} to={5} size={78} delay={0.5} />
            </span>
            <span>
              A full <b>Baobab</b>: the top of the tree
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
            <button type="button" className="btn quiet" onClick={() => go(isKpsea ? { name: 'worlds', grade: 'g6' } : { name: 'map', area: target.area }, { replace: true })}>
              {isKpsea ? 'Back to Grade 6' : 'Back to the journey'}
            </button>
          )}
        </motion.div>
      </section>
      <div className="res-kobe" aria-hidden>
        <Kobe mood={stars >= 1 ? 'cheer' : 'happy'} size={120} gaze={sunrise ? { x: -0.5, y: -1 } : undefined} />
      </div>
    </main>
  )
}
