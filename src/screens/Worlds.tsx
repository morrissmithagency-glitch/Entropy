import { motion } from 'framer-motion'
import { useNav } from '../App'
import { sfx } from '../audio/sfx'
import { Art, type ArtId } from '../components/art/objects'
import { GlassPane } from '../components/Glass'
import { Scene, type SceneVariant } from '../components/Scene'
import { Chip, Icon, SettingsButtons, TopBar } from '../components/ui'
import { GRADE1, type AreaId } from '../curriculum'
import { areaStars, useProgress } from '../state/progress'
import './worlds.css'

export const WORLD_LOOK: Record<AreaId, { scene: SceneVariant; hero: ArtId[]; glyphs: string[]; accent: string }> = {
  math: { scene: 'savanna', hero: ['giraffe', 'zebra'], glyphs: ['1', '+', '3', '=', '7'], accent: 'var(--ochre)' },
  english: { scene: 'forest', hero: ['book', 'bird'], glyphs: ['a', 'B', 'c', 'd', 'E'], accent: 'var(--acacia)' },
  environmental: { scene: 'village', hero: ['house', 'cow'], glyphs: ['☼', '♪', '✿', '♪'], accent: 'var(--lake)' },
  kiswahili: { scene: 'garden', hero: ['drum', 'lion'], glyphs: ['ma', 'me', 'mi', 'mo'], accent: 'var(--terracotta)' },
}

export function Worlds() {
  const go = useNav()
  const p = useProgress()
  const totalEarned = GRADE1.reduce((s, a) => s + areaStars(p, a.id).earned, 0)
  return (
    <main className="worlds">
      <Scene variant="dusk" showSun />
      <TopBar
        onBack={() => go({ name: 'home' })}
        title={
          <div>
            <div style={{ fontSize: 13, fontWeight: 650, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,250,240,.8)' }}>Grade 1</div>
            <h1 className="display" style={{ margin: 0, fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--paper)', lineHeight: 1.05 }}>
              Choose your world
            </h1>
          </div>
        }
        right={
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {p.streak.days > 0 && (
              <Chip>
                {Icon.flame} {p.streak.days} day{p.streak.days === 1 ? '' : 's'}
              </Chip>
            )}
            <Chip>
              <svg viewBox="0 0 64 64" width="18" height="18">
                <path d="M32 6l7.6 16.4 17.9 2-13.3 12.2 3.7 17.7L32 45.3l-15.9 9 3.7-17.7L6.5 24.4l17.9-2z" fill="#f2b33d" stroke="#2a1b12" strokeWidth="4" />
              </svg>
              {totalEarned}
            </Chip>
            <SettingsButtons />
          </div>
        }
      />
      <section className="world-grid">
        {GRADE1.map((area, i) => {
          const look = WORLD_LOOK[area.id]
          const { earned, total } = areaStars(p, area.id)
          return (
            <motion.div key={area.id} initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 120, damping: 16 }}>
              <GlassPane
                className="world-card"
                tilt={6}
                label={`${area.world}: ${area.title}`}
                onClick={() => {
                  sfx.select()
                  go({ name: 'map', area: area.id })
                }}
              >
                <div className="world-window">
                  <Scene variant={look.scene} />
                  <div className="world-glyphs" aria-hidden>
                    {look.glyphs.map((g, j) => (
                      <span key={j} className="display" style={{ left: `${6 + (j * 88) / look.glyphs.length}%`, animationDelay: `${j * 0.7}s` }}>
                        {g}
                      </span>
                    ))}
                  </div>
                  <div className="world-hero">
                    {look.hero.map((h, j) => (
                      <Art key={h} id={h} size={j === 0 ? 96 : 70} />
                    ))}
                  </div>
                </div>
                <div className="world-text">
                  <div className="world-area">{area.title}</div>
                  <div className="display world-name">{area.world}</div>
                  <div className="world-tag">{area.tagline}</div>
                  <div className="world-progress" aria-label={`${earned} of ${total} stars`}>
                    <div style={{ width: `${(earned / total) * 100}%`, background: look.accent }} />
                  </div>
                  <div className="world-meta">
                    <span>{area.strands.length} strands</span>
                    <span>
                      ★ {earned} / {total}
                    </span>
                  </div>
                </div>
              </GlassPane>
            </motion.div>
          )
        })}
      </section>
    </main>
  )
}
