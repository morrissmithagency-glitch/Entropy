import { MotionConfig } from 'framer-motion'
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { CurtainProvider, useCurtain } from './components/Curtain'
import { startFrameWatch, useCalm } from './state/calm'
import type { AreaId, GradeId } from './curriculum'
import type { Level } from './engine/types'
import { Home } from './screens/Home'
import { MapScreen } from './screens/MapScreen'
import { Earn } from './screens/Earn'
import { Learn } from './screens/Learn'
import { Parent } from './screens/Parent'
import { Plans } from './screens/Plans'
import { QuizScreen } from './screens/QuizScreen'
import { Results } from './screens/Results'
import { Worlds } from './screens/Worlds'

export interface QuizTarget {
  area: AreaId
  /** Either a sub-strand at a level, or a strand challenge. */
  sub?: string
  strand?: string
  level: Level
  paper: number
  /** A mistakes-review session instead of a quiz. */
  review?: boolean
  /** A KPSEA practice paper instead of a quiz. */
  kpsea?: string
}

export type Screen =
  | { name: 'home' }
  | { name: 'worlds'; grade: GradeId }
  | { name: 'map'; area: AreaId; open?: string }
  | { name: 'plans'; from?: AreaId }
  | { name: 'learn'; area: AreaId; sub: string }
  | { name: 'parent' }
  | { name: 'earn' }
  | ({ name: 'quiz' } & QuizTarget)
  | ({ name: 'results'; correct: number; total: number } & QuizTarget)

type Go = (s: Screen, opts?: { replace?: boolean; cloth?: boolean }) => void

/** The kanga cloth marks the big steps inward: choosing a grade and entering a world. */
const bigStep = (from: Screen, to: Screen) => (from.name === 'home' && to.name === 'worlds') || (from.name === 'worlds' && to.name === 'map')
const NavContext = createContext<Go>(() => {})
export const useNav = () => useContext(NavContext)

// History can be unavailable inside sandboxed frames; navigation still works without it.
function remember(s: Screen, replace: boolean) {
  try {
    if (replace) history.replaceState(s, '')
    else history.pushState(s, '')
  } catch {
    /* ignore */
  }
}

function initialScreen(): Screen {
  // Dev only: open any screen directly, e.g. ?screen={"name":"quiz",...} for visual checks.
  const forced = import.meta.env.DEV && new URLSearchParams(location.search).get('screen')
  if (forced) return JSON.parse(forced) as Screen
  let s: Screen | null = null
  try {
    s = history.state as Screen | null
  } catch {
    /* ignore */
  }
  // Results and quizzes are not restorable after a reload; send those back to the map.
  if (s?.name === 'quiz' || s?.name === 'results' || s?.name === 'learn') return s.name !== 'learn' && s.kpsea ? { name: 'worlds', grade: 'g6' } : { name: 'map', area: s.area }
  if (s?.name === 'worlds' && !s.grade) return { name: 'worlds', grade: 'g1' }
  return s ?? { name: 'home' }
}

function Router() {
  const [screen, setScreen] = useState<Screen>(initialScreen)
  const curtain = useCurtain()

  // Read inside go() without making it change on every screen.
  const current = useRef(screen)
  current.current = screen

  const go: Go = useCallback(
    (next, { replace = false, cloth = true } = {}) => {
      const swap = () => {
        remember(next, replace)
        setScreen(next)
        window.scrollTo(0, 0)
      }
      if (cloth) void curtain(swap, bigStep(current.current, next) ? 'cloth' : 'fade')
      else swap()
    },
    [curtain],
  )

  useEffect(() => {
    remember(screen, true)
    const onPop = (e: PopStateEvent) => {
      const s = (e.state as Screen | null) ?? { name: 'home' }
      void curtain(() => setScreen(s.name === 'quiz' || s.name === 'results' || s.name === 'learn' ? { name: 'map', area: s.area } : s), 'fade')
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <NavContext.Provider value={go}>
      {screen.name === 'home' && <Home />}
      {screen.name === 'worlds' && <Worlds key={screen.grade} grade={screen.grade} />}
      {screen.name === 'map' && <MapScreen key={screen.area} area={screen.area} open={screen.open} />}
      {screen.name === 'learn' && <Learn key={screen.sub} area={screen.area} sub={screen.sub} />}
      {screen.name === 'parent' && <Parent />}
      {screen.name === 'earn' && <Earn />}
      {screen.name === 'plans' && <Plans from={screen.from} />}
      {screen.name === 'quiz' && <QuizScreen key={`${screen.review ? 'review' : (screen.kpsea ?? screen.sub ?? screen.strand)}:${screen.level}:${screen.paper}`} target={screen} />}
      {screen.name === 'results' && <Results target={screen} correct={screen.correct} total={screen.total} />}
    </NavContext.Provider>
  )
}

export default function App() {
  const calm = useCalm()
  useEffect(() => startFrameWatch(), [])
  return (
    // In calm mode framer-motion skips movement and keeps only fades.
    <MotionConfig reducedMotion={calm ? 'always' : 'user'}>
      <div style={{ minHeight: '100%' }}>
        <CurtainProvider>
          <Router />
        </CurtainProvider>
      </div>
    </MotionConfig>
  )
}
