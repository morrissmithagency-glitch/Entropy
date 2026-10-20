import { motion } from 'framer-motion'
import { useNav } from '../App'
import { sfx } from '../audio/sfx'
import { GlassPane } from '../components/Glass'
import { Kobe } from '../components/Kobe'
import { Scene } from '../components/Scene'
import { Bubble, Icon, SettingsButtons } from '../components/ui'
import './home.css'

const GRADES = [
  { id: 'pp1', top: 'PP', big: '1' },
  { id: 'pp2', top: 'PP', big: '2' },
  ...Array.from({ length: 9 }, (_, i) => ({ id: `g${i + 1}`, top: 'Grade', big: String(i + 1) })),
]

export function Home() {
  const go = useNav()
  return (
    <main className="home">
      <Scene variant="savanna" />
      <header className="home-head">
        <div>
          <motion.h1 className="display wordmark" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 14 }}>
            <span className="wm-cbc">CBC</span> Helper
          </motion.h1>
          <div className="kanga-band thin" style={{ width: 132, borderRadius: 4, marginTop: 6 }} />
        </div>
        <SettingsButtons />
      </header>

      <section className="home-stage">
        <div className="home-kobe">
          <Bubble tail="left" style={{ maxWidth: 300, marginLeft: 40, marginBottom: 6 }}>
            <div className="display" style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.15 }}>Jambo! I'm Kobe.</div>
            <div style={{ fontSize: 16, color: 'var(--ink-soft)', marginTop: 4 }}>Slow and steady, we climb every strand. Which grade are you in?</div>
          </Bubble>
          <Kobe mood="idle" size={260} />
        </div>

        <div className="grade-grid" role="list" aria-label="Choose your grade">
          {GRADES.map((g, i) => {
            const open = g.id === 'g1'
            return (
              <motion.div key={g.id} role="listitem" initial={{ opacity: 0, y: 30, rotateX: -30 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 0.15 + i * 0.04, type: 'spring', stiffness: 140, damping: 15 }}>
                <GlassPane
                  className={`grade-pane ${open ? 'open' : 'soon'}`}
                  disabled={!open}
                  label={open ? `${g.top} ${g.big}` : `${g.top} ${g.big}, coming soon`}
                  onClick={() => {
                    sfx.select()
                    go({ name: 'worlds' })
                  }}
                >
                  <span className="gp-top">{g.top}</span>
                  <span className="display gp-big">{g.big}</span>
                  {open ? <span className="gp-badge">Start</span> : <span className="gp-soon">{Icon.lock} Soon</span>}
                </GlassPane>
              </motion.div>
            )
          })}
        </div>
      </section>
      <footer className="home-foot">Original practice questions for the rationalised KICD curriculum</footer>
    </main>
  )
}
