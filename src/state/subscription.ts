// The family's plan, kept on this device. Until parent accounts exist, a plan is tied to
// the browser it was bought on; the payments server keeps the record of every payment.
import { useSyncExternalStore } from 'react'
import { findPlan, type Plan, type PlanId } from '../billing/plans'
import { findStrand, gradeOfArea, type GradeId } from '../curriculum'

const KEY = 'cbc-helper:plan'

export interface Subscription {
  plan: PlanId
  /** The grade a one-grade plan covers. */
  grade?: GradeId
  expiresAt: number
  receipt: string | null
  /** Bought in test mode: no money moved. */
  test?: boolean
  /** Opened with a family login: everything, always. */
  family?: boolean
}

function load(): Subscription | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Subscription) : null
  } catch {
    return null
  }
}

let state = load()
const listeners = new Set<() => void>()

export function setSubscription(next: Subscription | null) {
  state = next
  try {
    if (next) localStorage.setItem(KEY, JSON.stringify(next))
    else localStorage.removeItem(KEY)
  } catch {
    /* the plan still works for this visit */
  }
  listeners.forEach((l) => l())
}

export function useSubscription(): Subscription | null {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => state,
  )
}

export const getSubscription = () => state

/** The plan if it is still running. */
export function activePlan(sub: Subscription | null, now = Date.now()): (Plan & { sub: Subscription }) | null {
  if (!sub || sub.expiresAt <= now) return null
  const plan = findPlan(sub.plan)
  return plan ? { ...plan, sub } : null
}

/** Each world's first strand is free, so every child can start without a plan. */
export function isFreeStrand(strandId: string): boolean {
  const { area, strand } = findStrand(strandId)
  return area.strands[0].id === strand.id
}

export function canOpenStrand(sub: Subscription | null, strandId: string, now = Date.now()): boolean {
  if (isFreeStrand(strandId)) return true
  const plan = activePlan(sub, now)
  if (!plan) return false
  return plan.allGrades || plan.sub.grade === gradeOfArea(findStrand(strandId).area.id).id
}
