import { motion } from 'framer-motion'
import { useNav } from '../App'
import { ambient } from '../audio/ambient'
import { sfx } from '../audio/sfx'
import { GlassPane } from '../components/Glass'
import { Kobe } from '../components/Kobe'
import { NatureScene } from '../components/NatureScene'
import { Icon, SettingsButtons, TopBar } from '../components/ui'
import { GRADES } from '../curriculum'
import { areaStars, useProgress } from '../state/progress'
import { activePlan, useSubscription } from '../state/subscription'
import './home.css'

const SOON = ['PP1', 'PP2', '2', '4', '5', '6', '7', '8', '9']

function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Habari ya asubuhi'
  if (h < 16) return 'Habari ya mchana'
  if (h < 19) return 'Habari ya jioni'
  return 'Habari za usiku'
}

export function Home() {
  const go = useNav()
  const p = useProgress()
  const plan = activePlan(useSubscription())
  return (
    <main className="home">
      <NatureScene id="lake-dusk" />
      <div className="home-veil" />
      <TopBar
        title={
          <span className="display wordmark">
            CBC <em>Helper</em>
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
          Practice for Kenya&rsquo;s curriculum, one strand at a time, at the pace of a tortoise.
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
                  <span className="display gc-num">{g.number}</span>
                  <span className="gc-text">
                    <span className="gc-title">{g.label}</span>
                    <span className="gc-sub">{g.areas.length} worlds · {earned} ★</span>
                  </span>
                  <span className="gc-go">{Icon.play}</span>
                </GlassPane>
              </motion.div>
            )
          })}
        </div>

        <motion.div className="soon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }}>
          <span className="eyebrow">Coming soon</span>
          <span className="soon-list">
            {SOON.map((s) => (
              <span key={s}>{s.startsWith('PP') ? s : `Grade ${s}`}</span>
            ))}
          </span>
        </motion.div>
      </section>

      <div className="home-kobe" aria-hidden>
        <Kobe size={130} />
      </div>
    </main>
  )
}
