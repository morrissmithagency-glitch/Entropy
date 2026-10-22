import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { CurtainProvider, useCurtain } from './components/Curtain'
import type { AreaId, GradeId } from './curriculum'
import type { Level } from './engine/types'
import { Home } from './screens/Home'
import { MapScreen } from './screens/MapScreen'
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
}

export type Screen =
  | { name: 'home' }
  | { name: 'worlds'; grade: GradeId }
  | { name: 'map'; area: AreaId; open?: string }
  | { name: 'plans'; from?: AreaId }
  | ({ name: 'quiz' } & QuizTarget)
  | ({ name: 'results'; correct: number; total: number } & QuizTarget)

type Go = (s: Screen, opts?: { replace?: boolean; cloth?: boolean }) => void
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
  if (s?.name === 'quiz' || s?.name === 'results') return { name: 'map', area: s.area }
  if (s?.name === 'worlds' && !s.grade) return { name: 'worlds', grade: 'g1' }
  return s ?? { name: 'home' }
}

function Router() {
  const [screen, setScreen] = useState<Screen>(initialScreen)
  const curtain = useCurtain()

  const go: Go = useCallback(
    (next, { replace = false, cloth = true } = {}) => {
      const swap = () => {
        remember(next, replace)
        setScreen(next)
        window.scrollTo(0, 0)
      }
      if (cloth) void curtain(swap)
      else swap()
    },
    [curtain],
  )

  useEffect(() => {
    remember(screen, true)
    const onPop = (e: PopStateEvent) => {
      const s = (e.state as Screen | null) ?? { name: 'home' }
      void curtain(() => setScreen(s.name === 'quiz' || s.name === 'results' ? { name: 'map', area: s.area } : s))
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
      {screen.name === 'plans' && <Plans from={screen.from} />}
      {screen.name === 'quiz' && <QuizScreen key={`${screen.sub ?? screen.strand}:${screen.level}:${screen.paper}`} target={screen} />}
      {screen.name === 'results' && <Results target={screen} correct={screen.correct} total={screen.total} />}
    </NavContext.Provider>
  )
}

export default function App() {
  return (
    <div style={{ minHeight: '100%' }}>
      <CurtainProvider>
        <Router />
      </CurtainProvider>
    </div>
  )
}
