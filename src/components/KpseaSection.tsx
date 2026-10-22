// The KPSEA practice papers on the Grade 6 page: five exam-style papers drawn from all of
// Grades 4 to 6. A plan covering Grade 6 opens them; without one, the first paper is free.
import { motion } from 'framer-motion'
import { useNav } from '../App'
import { sfx } from '../audio/sfx'
import { KPSEA_PAPERS, paperArea } from '../engine/kpsea'
import { kpseaAccess, startKpsea, useKpsea } from '../state/kpsea'
import { useSubscription } from '../state/subscription'
import { NatureScene } from './NatureScene'
import { Icon, SCENE_FOR } from './ui'

export function KpseaSection() {
  const go = useNav()
  const k = useKpsea()
  const sub = useSubscription()
  const access = kpseaAccess(sub, k)

  return (
    <section className="kp">
      <h2 className="display">KPSEA practice papers</h2>
      <p className="kp-lead">
        Exam-style papers drawn from everything in Grades 4 to 6. Each one is new, and every missed question goes into your mistakes review.
        {access === 'free' && <b> Your first paper is free.</b>}
      </p>
      <div className="kp-grid">
        {KPSEA_PAPERS.map((paper, i) => {
          const best = k.best[paper.id]
          return (
            <motion.button
              key={paper.id}
              type="button"
              className="kp-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                sfx.select()
                if (access === 'locked') return go({ name: 'plans', from: paperArea(paper.id) })
                go({ name: 'quiz', area: paperArea(paper.id), kpsea: paper.id, level: 5, paper: startKpsea(paper.id, access === 'free') })
              }}
            >
              <span className="kp-scene">
                <NatureScene id={SCENE_FOR[paper.kinds[0]]} still />
              </span>
              <span className="kp-veil" />
              <span className="kp-body">
                <span className="eyebrow">Paper {i + 1}</span>
                <span className="display kp-name">{paper.title}</span>
                <span className="kp-blurb">{paper.blurb}</span>
                <span className="kp-meta">
                  <span>{paper.length} questions</span>
                  {access === 'locked' ? <span className="kp-lock">{Icon.lock} Plan</span> : best !== undefined ? <span className="kp-best">Best {best}%</span> : <span>Not yet sat</span>}
                </span>
              </span>
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}
