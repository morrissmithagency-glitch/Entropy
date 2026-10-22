// KPSEA practice results, kept on this device: the best score for each paper, how many
// papers have been sat, and whether the one free paper has been used.
import { useSyncExternalStore } from 'react'
import { activePlan, type Subscription } from './subscription'

const KEY = 'cbc-helper:kpsea'

export interface KpseaState {
  best: Record<string, number>
  sat: Record<string, number>
  freeUsed: boolean
}

const EMPTY: KpseaState = { best: {}, sat: {}, freeUsed: false }

function load(): KpseaState {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<KpseaState>) } : EMPTY
  } catch {
    return EMPTY
  }
}

let state = load()
const listeners = new Set<() => void>()

function set(next: KpseaState) {
  state = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* kept for this visit */
  }
  listeners.forEach((l) => l())
}

export function useKpsea(): KpseaState {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => state,
  )
}

/** A plan that covers Grade 6 opens every paper; without one, the first paper is free. */
export function kpseaAccess(sub: Subscription | null, k: KpseaState = state): 'plan' | 'free' | 'locked' {
  const plan = activePlan(sub)
  if (plan && (plan.allGrades || plan.sub.grade === 'g6')) return 'plan'
  return k.freeUsed ? 'locked' : 'free'
}

/** Starts a paper and returns its number, so every sitting gets different questions. */
export function startKpsea(id: string, free: boolean): number {
  const n = (state.sat[id] ?? 0) + 1
  set({ ...state, sat: { ...state.sat, [id]: n }, freeUsed: state.freeUsed || free })
  return n
}

export function recordKpsea(id: string, percent: number) {
  set({ ...state, best: { ...state.best, [id]: Math.max(percent, state.best[id] ?? 0) } })
}
