import { useSyncExternalStore } from 'react'
import { findArea, findStrand, type AreaId } from '../curriculum'
import type { Level } from '../engine/types'

const KEY = 'cbc-helper:v1'

export interface Progress {
  /** Best stars per `${subId}:${level}`. Present = attempted. */
  best: Record<string, number>
  /** Best stars per strand challenge. */
  challenge: Record<string, number>
  /** How many papers taken per quiz key, so each attempt gets a fresh paper. */
  papers: Record<string, number>
  streak: { last: string; days: number }
  settings: { sound: boolean; voice: boolean }
}

const EMPTY: Progress = { best: {}, challenge: {}, papers: {}, streak: { last: '', days: 0 }, settings: { sound: true, voice: true } }

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<Progress>
    return { ...EMPTY, ...parsed, settings: { ...EMPTY.settings, ...parsed.settings } }
  } catch {
    return EMPTY
  }
}

let state: Progress = load()
const listeners = new Set<() => void>()

function set(next: Progress) {
  state = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Private mode or full storage: progress just won't persist.
  }
  listeners.forEach((l) => l())
}

export function useProgress(): Progress {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => state,
  )
}

export const getProgress = () => state

const today = () => new Date().toISOString().slice(0, 10)

function bumpStreak(p: Progress): Progress['streak'] {
  const t = today()
  if (p.streak.last === t) return p.streak
  const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  return { last: t, days: p.streak.last === y ? p.streak.days + 1 : 1 }
}

export function recordQuiz(subId: string, level: Level, stars: number) {
  const k = `${subId}:${level}`
  set({ ...state, best: { ...state.best, [k]: Math.max(stars, state.best[k] ?? 0) }, streak: bumpStreak(state) })
}

export function recordChallenge(strandId: string, stars: number) {
  set({ ...state, challenge: { ...state.challenge, [strandId]: Math.max(stars, state.challenge[strandId] ?? 0) }, streak: bumpStreak(state) })
}

/** Returns a new paper number for this quiz; each attempt gets different questions. */
export function nextPaper(key: string): number {
  const n = (state.papers[key] ?? 0) + 1
  set({ ...state, papers: { ...state.papers, [key]: n } })
  return n
}

export function setSetting<K extends keyof Progress['settings']>(k: K, v: Progress['settings'][K]) {
  set({ ...state, settings: { ...state.settings, [k]: v } })
}

export function resetProgress() {
  set({ ...EMPTY, settings: state.settings })
}

// ── Derived ─────────────────────────────────────────────────────────────────

export const PASS_STARS = 1

export function starsAt(p: Progress, subId: string, level: number): number | undefined {
  return p.best[`${subId}:${level}`]
}

export function isUnlocked(p: Progress, subId: string, level: number): boolean {
  return level === 1 || (starsAt(p, subId, level - 1) ?? 0) >= PASS_STARS
}

/** Highest level passed in a sub-strand (0 if none). */
export function levelReached(p: Progress, subId: string): number {
  let n = 0
  for (let l = 1; l <= 5; l++) if ((starsAt(p, subId, l) ?? 0) >= PASS_STARS) n = l
  return n
}

export function subStars(p: Progress, subId: string): number {
  let s = 0
  for (let l = 1; l <= 5; l++) s += starsAt(p, subId, l) ?? 0
  return s
}

/** The challenge is levels 4–5 mixed, so it opens once every stop has passed Acacia (4). */
export const CHALLENGE_UNLOCK_LEVEL = 4

export function challengeUnlocked(p: Progress, strandId: string): boolean {
  const { strand } = findStrand(strandId)
  return strand.subStrands.every((s) => levelReached(p, s.id) >= CHALLENGE_UNLOCK_LEVEL)
}

export function areaStars(p: Progress, areaId: AreaId): { earned: number; total: number } {
  const area = findArea(areaId)
  let earned = 0
  let total = 0
  for (const strand of area.strands) {
    for (const sub of strand.subStrands) {
      earned += subStars(p, sub.id)
      total += 15
    }
    earned += p.challenge[strand.id] ?? 0
    total += 3
  }
  return { earned, total }
}

/**
 * Where Kobe points next. Strands go in curriculum order: a strand is finished once its
 * Baobab Challenge is passed. Inside the current strand, the sub-strand with the lowest
 * level goes first, so all its stops grow together.
 */
export function nextStop(p: Progress, areaId: AreaId): { sub: string } | { challenge: string } | null {
  const area = findArea(areaId)
  for (const strand of area.strands) {
    if ((p.challenge[strand.id] ?? 0) >= PASS_STARS) continue
    if (challengeUnlocked(p, strand.id)) return { challenge: strand.id }
    let best = strand.subStrands[0]
    for (const sub of strand.subStrands) if (levelReached(p, sub.id) < levelReached(p, best.id)) best = sub
    return { sub: best.id }
  }
  return null
}
