import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useNav, type QuizTarget } from '../App'
import { sfx, speak } from '../audio/sfx'
import { LevelIcon } from '../components/art/levels'
import { Kobe } from '../components/Kobe'
import { Scene } from '../components/Scene'
import { Star } from '../components/ui'
import { findStrand, findSubStrand, LEVEL_NAMES } from '../curriculum'
import { starsFor } from '../engine/quiz'
import type { Level } from '../engine/types'
import { nextPaper, recordChallenge, recordQuiz } from '../state/progress'
import './results.css'

const MESSAGES: Record<number, [string, string]> = {
  3: ['Bingwa!', 'You are a champion. Every answer counted.'],
  2: ['Safi sana!', 'Great work. One more push and it is three stars.'],
  1: ['You passed!', 'Mwenda pole hajikwai: slow and steady, you are growing.'],
  0: ['Good try!', 'Every baobab started as a seed. Let us try a new paper.'],
}

function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    c.width = innerWidth * dpr
    c.height = innerHeight * dpr
    ctx.scale(dpr, dpr)
    const colors = ['#c8553d', '#f2b33d', '#1f5b52', '#2f7d72', '#fbf4e6', '#6b8f3a']
    const bits = Array.from({ length: 130 }, () => ({
      x: innerWidth / 2 + (Math.random() - 0.5) * 120,
      y: innerHeight * 0.45,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 16 - 6,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      s: 6 + Math.random() * 8,
      c: colors[Math.floor(Math.random() * colors.length)],
      kind: Math.floor(Math.random() * 3),
    }))
    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight)
      let alive = 0
      for (const b of bits) {
        b.vy += 0.42
        b.vx *= 0.985
        b.x += b.vx
        b.y += b.vy
        b.r += b.vr
        if (b.y < innerHeight + 30) alive++
        ctx.save()
        ctx.translate(b.x, b.y)
        ctx.rotate(b.r)
        ctx.fillStyle = b.c
        ctx.strokeStyle = '#2a1b12'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        if (b.kind === 0) ctx.arc(0, 0, b.s / 2, 0, Math.PI * 2)
        else if (b.kind === 1) {
          ctx.moveTo(0, -b.s / 2)
          ctx.lineTo(b.s / 2, b.s / 2)
          ctx.lineTo(-b.s / 2, b.s / 2)
          ctx.closePath()
        } else ctx.rect(-b.s / 2, -b.s / 4, b.s, b.s / 2)
        ctx.fill()
        ctx.stroke()
        ctx.restore()
      }
      if (alive) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={ref} aria-hidden style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }} />
}

export function Results({ target, correct, total }: { target: QuizTarget; correct: number; total: number }) {
  const go = useNav()
  const stars = starsFor(correct, total)
  const [shown, setShown] = useState(0)
  const saved = useRef(false)
  const isChallenge = !!target.strand
  const title = isChallenge ? `${findStrand(target.strand!).strand.title}: Baobab Challenge` : `${findSubStrand(target.sub!).sub.title} · ${LEVEL_NAMES[target.level - 1]}`
  const [headline, body] = MESSAGES[stars]
  const canGrow = !isChallenge && stars >= 1 && target.level < 5
  const nextName = LEVEL_NAMES[Math.min(4, target.level)]

  useEffect(() => {
    if (saved.current) return
    saved.current = true
    if (isChallenge) recordChallenge(target.strand!, stars)
    else recordQuiz(target.sub!, target.level, stars)
  }, [isChallenge, stars, target])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    timers.push(setTimeout(() => (stars > 0 ? sfx.fanfare() : sfx.almost()), 900))
    for (let i = 0; i < stars; i++)
      timers.push(
        setTimeout(() => {
          setShown(i + 1)
          sfx.star(i)
        }, 1300 + i * 420),
      )
    timers.push(setTimeout(() => void speak(`${headline} ${correct} out of ${total}.`, target.area === 'kiswahili' ? 'sw' : 'en'), 1500 + stars * 420))
    return () => timers.forEach(clearTimeout)
  }, [stars, headline, correct, total, target.area])

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
      <Scene variant={stars >= 2 ? 'savanna' : 'garden'} />
      {stars > 0 && <Confetti />}
      <motion.section className="res-card glass" initial={{ y: 80, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 140, damping: 16, delay: 0.3 }}>
        <div className="kanga-band" style={{ borderRadius: '30px 30px 0 0' }} />
        <div className="res-body">
          <div className="res-kobe">
            <Kobe mood={stars >= 1 ? 'cheer' : 'happy'} size={190} />
          </div>
          <div className="res-sub">{title}</div>
          <div className="res-stars">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`res-star s${i}`}>
                <Star filled={i < shown} size={i === 1 ? 84 : 66} />
              </div>
            ))}
          </div>
          <h1 className="display res-head">{headline}</h1>
          <div className="res-score">
            <b>{correct}</b> out of <b>{total}</b> correct
          </div>
          <p className="res-msg">{body}</p>
          {canGrow && (
            <div className="res-grow">
              <LevelIcon level={target.level} size={44} />
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 2.4 }} className="res-arrow">
                →
              </motion.span>
              <motion.span initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 2.6, type: 'spring' }}>
                <LevelIcon level={target.level + 1} size={56} />
              </motion.span>
              <span className="res-grow-text">
                You grew to <b>{nextName}</b>!
              </span>
            </div>
          )}
          <div className="res-actions">
            {canGrow ? (
              <button type="button" className="btn terracotta" onClick={grow}>
                Next: {nextName} →
              </button>
            ) : (
              <button type="button" className="btn terracotta" onClick={retry}>
                {stars === 3 ? 'Play a new paper' : 'Try a new paper'}
              </button>
            )}
            {canGrow && (
              <button type="button" className="btn paper" onClick={retry}>
                New paper, same level
              </button>
            )}
            <button type="button" className="btn paper" onClick={() => go({ name: 'map', area: target.area }, { replace: true })}>
              Back to the map
            </button>
          </div>
        </div>
      </motion.section>
    </main>
  )
}
