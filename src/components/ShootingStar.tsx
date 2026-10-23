// Now and then a shooting star crosses the home sky. Tapping it makes Kobe say "Make a
// wish!". It never appears in a daytime sky or when motion is reduced.
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { sfx } from '../audio/sfx'

/** Ask Kobe (on the home page) to say something. */
export function kobeSay(text: string) {
  window.dispatchEvent(new CustomEvent('kobe:say', { detail: text }))
}

interface Streak {
  id: number
  top: number
  left: number
}

export function ShootingStar({ enabled }: { enabled: boolean }) {
  const [streak, setStreak] = useState<Streak | null>(null)
  useEffect(() => {
    if (!enabled || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    let t: ReturnType<typeof setTimeout>
    let id = 0
    const plan = (ms: number) => {
      t = setTimeout(() => {
        if (!document.hidden) setStreak({ id: ++id, top: 6 + Math.random() * 18, left: 45 + Math.random() * 45 })
        plan(45000 + Math.random() * 40000)
      }, ms)
    }
    plan(9000 + Math.random() * 8000)
    return () => clearTimeout(t)
  }, [enabled])

  const wish = () => {
    sfx.star(2)
    kobeSay('Make a wish!')
    setStreak(null)
  }

  return (
    <AnimatePresence>
      {streak && (
        <motion.button
          key={streak.id}
          type="button"
          className="shooting-star"
          aria-label="A shooting star. Tap to make a wish"
          style={{ top: `${streak.top}%`, left: `${streak.left}%` }}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: -260, y: 110, opacity: [0, 1, 1, 0] }}
          exit={{ opacity: 0, scale: 1.6, transition: { duration: 0.4 } }}
          transition={{ duration: 2.6, ease: 'easeIn', times: [0, 0.12, 0.75, 1] }}
          onAnimationComplete={() => setStreak((s) => (s?.id === streak.id ? null : s))}
          onClick={wish}
        >
          <span />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
