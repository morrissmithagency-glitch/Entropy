import { motion } from 'framer-motion'
import { useNav } from '../App'
import { sfx } from '../audio/sfx'
import { NatureScene } from '../components/NatureScene'
import { ReviewCard } from '../components/ReviewCard'
import { Breath, Chip, Icon, SCENE_FOR, SettingsButtons, TopBar } from '../components/ui'
import { findGrade, findSubStrand, findStrand, LEVEL_NAMES, type GradeId } from '../curriculum'
import { areaStars, levelReached, nextStop, useProgress } from '../state/progress'
import './worlds.css'

export function Worlds({ grade }: { grade: GradeId }) {
  const go = useNav()
  const p = useProgress()
  const g = findGrade(grade)
  const featured = g.areas.find((a) => a.id === p.last) ?? g.areas[0]
  const next = nextStop(p, featured.id)
  const totals = g.areas.reduce((s, a) => s + areaStars(p, a.id).earned, 0)
  const started = areaStars(p, featured.id).earned > 0
  let upNext = 'Your first stop'
  if (next && 'sub' in next) {
    const { sub } = findSubStrand(next.sub)
    upNext = `${sub.title} · ${LEVEL_NAMES[Math.min(4, levelReached(p, next.sub))]}`
  } else if (next) upNext = `${findStrand(next.challenge).strand.title} · Baobab Challenge`

  return (
    <main className="gh">
      <section className="gh-hero">
        <NatureScene id={SCENE_FOR[featured.kind]} dim={0.15} />
        <div className="gh-hero-veil" />
        <TopBar
          onBack={() => go({ name: 'home' })}
          title={<span className="eyebrow">{g.label}</span>}
          right={
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {p.streak.days > 0 && (
                <Chip>
                  {Icon.flame} {p.streak.days}
                </Chip>
              )}
              <Chip>★ {totals}</Chip>
              <SettingsButtons />
            </div>
          }
        />
        <div className="gh-feature gutter">
          <motion.div className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}>
            {started ? 'Continue your journey' : 'Begin your journey'}
          </motion.div>
          <motion.h1 className="display" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
            {featured.world}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 1 }}>
            {featured.title} · {upNext}
          </motion.p>
          <motion.button
            type="button"
            className="gh-play"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            onClick={() => {
              sfx.select()
              go({ name: 'map', area: featured.id, open: next && 'sub' in next ? next.sub : undefined })
            }}
          >
            <span className="gh-play-orb">
              <Breath size={64} />
              {Icon.play}
            </span>
            {started ? 'Continue' : 'Start'}
          </motion.button>
        </div>
      </section>

      <section className="gh-worlds gutter">
        <div className="gh-review">
          <ReviewCard />
        </div>
        <h2 className="display">Worlds to explore</h2>
        <div className="gh-grid">
          {g.areas.map((area, i) => {
            const { earned, total } = areaStars(p, area.id)
            return (
              <motion.button
                key={area.id}
                type="button"
                className="world-card"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  sfx.select()
                  go({ name: 'map', area: area.id })
                }}
              >
                <span className="wc-scene">
                  <NatureScene id={SCENE_FOR[area.kind]} still />
                </span>
                <span className="wc-veil" />
                <span className="wc-body">
                  <span className="eyebrow">{area.title}</span>
                  <span className="display wc-name">{area.world}</span>
                  <span className="wc-tag">{area.tagline}</span>
                  <span className="wc-progress" aria-label={`${earned} of ${total} stars`}>
                    <span style={{ width: `${Math.max(2, (earned / total) * 100)}%` }} />
                  </span>
                  <span className="wc-meta">
                    <span>{area.strands.length} strands</span>
                    <span>★ {earned}</span>
                  </span>
                </span>
              </motion.button>
            )
          })}
        </div>
      </section>
    </main>
  )
}
