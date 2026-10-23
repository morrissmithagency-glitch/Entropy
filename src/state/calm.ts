// Calm mode: the scenery and Kobe rest so the app stays quick on devices that cannot
// animate everything at once. It turns on by itself when the device asks for less motion
// or saves data, or when the first seconds of use show dropped frames; a parent can also
// switch it on or off, and that choice is remembered on this device.
import { useSyncExternalStore } from 'react'

const KEY = 'cbc:calm'
type Choice = 'on' | 'off' | 'auto'

function saved(): Choice {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'on' || v === 'off' ? v : 'auto'
  } catch {
    return 'auto'
  }
}

function deviceAsks(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return true
  const n = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number }
  return !!n.connection?.saveData || (n.deviceMemory !== undefined && n.deviceMemory <= 2)
}

let choice: Choice = saved()
let measuredSlow = false
const listeners = new Set<() => void>()

function current(): boolean {
  return choice === 'on' || (choice === 'auto' && (measuredSlow || deviceAsks()))
}

function apply() {
  if (typeof document !== 'undefined') document.documentElement.toggleAttribute('data-calm', current())
  for (const l of listeners) l()
}

export const isCalm = current

export function useCalm(): boolean {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    current,
    () => false,
  )
}

export function calmChoice(): Choice {
  return choice
}

export function setCalmChoice(next: Choice) {
  choice = next
  try {
    if (next === 'auto') localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, next)
  } catch {
    /* storage can be unavailable; the choice still holds for this visit */
  }
  apply()
}

/**
 * Watch a few seconds of real frames once the first screen has settled. If too many frames
 * arrive late (the eye sees that as lag), switch to calm mode for the rest of the visit.
 */
export function startFrameWatch() {
  apply()
  if (typeof window === 'undefined' || choice !== 'auto' || current()) return
  const gaps: number[] = []
  let last = 0
  let raf = 0
  const step = (t: number) => {
    if (last) gaps.push(t - last)
    last = t
    // Ninety frames is about a second and a half on a smooth screen; a slow one takes longer.
    if (gaps.length < 90) raf = requestAnimationFrame(step)
    else decide()
  }
  const decide = () => {
    // Ignore the odd hiccup; look at how often frames take longer than two refreshes.
    const late = gaps.filter((g) => g > 34).length / gaps.length
    const sorted = [...gaps].sort((a, b) => a - b)
    const median = sorted[Math.floor(sorted.length / 2)]
    if (late > 0.2 || median > 24) {
      measuredSlow = true
      apply()
    }
  }
  // Start once the opening animations have played, so they are not counted.
  const wait = setTimeout(() => {
    if (!document.hidden) raf = requestAnimationFrame(step)
  }, 2000)
  return () => {
    clearTimeout(wait)
    cancelAnimationFrame(raf)
  }
}
