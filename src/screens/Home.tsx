import { motion } from 'framer-motion'
import { useNav } from '../App'
import { ambient } from '../audio/ambient'
import { sfx } from '../audio/sfx'
import { GlassPane } from '../components/Glass'
import { KenyaFlag } from '../components/KenyaFlag'
import { KobeWander } from '../components/KobeWander'
import { NatureScene, type SkyTime } from '../components/NatureScene'
import { ShootingStar } from '../components/ShootingStar'
import { ReviewCard } from '../components/ReviewCard'
import { CountUp } from '../components/motion'
import { Icon, SettingsButtons, TopBar } from '../components/ui'
import { GRADES } from '../curriculum'
import { areaStars, useProgress } from '../state/progress'
import { activePlan, useSubscription } from '../state/subscription'
import './home.css'

function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Habari ya asubuhi'
  if (h < 16) return 'Habari ya mchana'
  if (h < 19) return 'Habari ya jioni'
  return 'Habari za usiku'
}

/** The home sky follows the clock: dawn, day, golden hour, then stars. */
function skyTime(): SkyTime {
  const h = new Date().getHours()
  if (h >= 5 && h < 9) return 'dawn'
  if (h >= 9 && h < 16) return 'day'
  if (h >= 16 && h < 19) return 'golden'
  return 'night'
}

export function Home() {
  const go = useNav()
  const p = useProgress()
  const plan = activePlan(useSubscription())
  const time = skyTime()
  return (
    <main className="home">
      <NatureScene id="lake-dusk" time={time} />
      <div className="home-veil" />
      <TopBar
        title={
          <span className="display wordmark">
            <KenyaFlag width={50} />
            <span className="wm-text">
              CBC <em>Helper</em>
            </span>
          </span>
        }
        right={
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" className="btn plan-pill" onClick={() => go({ name: 'plans' })}>
              {plan ? plan.name : 'Plans'}
            </button>
            <SettingsButtons />
          </div>
        }
      />

      <section className="home-hero gutter">
        <motion.div className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
          {greeting()}
        </motion.div>
        <motion.h1 className="display" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}>
          Where shall we
          <br />
          learn today?
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.7 }}>
          <em className="home-methali">Haba na haba hujaza kibaba.</em> Little by little, strand by strand, every child grows into something bright.
        </motion.p>

        <div className="grade-cards">
          {GRADES.map((g, i) => {
            const earned = g.areas.reduce((s, a) => s + areaStars(p, a.id).earned, 0)
            return (
              <motion.div key={g.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}>
                <GlassPane
                  className="grade-card"
                  tilt={5}
                  label={`${g.label}, ${g.areas.length} worlds`}
                  onClick={() => {
                    sfx.select()
                    ambient.start()
                    go({ name: 'worlds', grade: g.id })
                  }}
                >
                  <span className={`display gc-num${g.mark.length > 1 ? ' gc-num-pp' : ''}`}>{g.mark}</span>
                  <span className="gc-text">
                    <span className="gc-title">{g.label}</span>
                    <span className="gc-sub">
                      {g.areas.length} worlds · <CountUp to={earned} delay={1 + i * 0.12} /> ★
                    </span>
                  </span>
                  <span className="gc-go">{Icon.play}</span>
                </GlassPane>
              </motion.div>
            )
          })}
        </div>

        <div className="home-review">
          <ReviewCard delay={1.1} />
        </div>

        <motion.button
          type="button"
          className="btn quiet home-parents"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          onClick={() => go({ name: 'parent' })}
        >
          For parents: see how your child is growing
        </motion.button>

      </section>

      <ShootingStar enabled={time !== 'day'} />
      <KobeWander />
      <div className="home-credit">Coded by M.N. Muturi</div>
    </main>
  )
}
