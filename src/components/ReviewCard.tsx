import { motion } from 'framer-motion'
import { useNav } from '../App'
import { sfx } from '../audio/sfx'
import { dueReview, useProgress } from '../state/progress'
import { Breath } from './ui'

/** Today's mistakes review: shown only when something is waiting. */
export function ReviewCard({ delay = 0 }: { delay?: number }) {
  const go = useNav()
  const p = useProgress()
  const due = dueReview(p)
  if (!due.length) return null
  return (
    <motion.button
      type="button"
      className="review-card glass"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => {
        sfx.select()
        go({ name: 'quiz', review: true, area: due[0].area, level: 1, paper: Date.now() % 100000 })
      }}
    >
      <span className="rc-orb">
        <Breath size={52} color="rgba(127,214,200,.55)" />
        <span className="display">{due.length}</span>
      </span>
      <span className="rc-text">
        <span className="rc-title">Grow them back</span>
        <span className="rc-sub">{due.length === 1 ? 'A question you missed is' : `${due.length} questions you missed are`} ready to try again</span>
      </span>
    </motion.button>
  )
}
