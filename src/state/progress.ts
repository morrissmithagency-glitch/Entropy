import { useSyncExternalStore } from 'react'
import { findArea, findStrand, type AreaId } from '../curriculum'
import type { Level, Question } from '../engine/types'

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
  /** The world opened most recently, featured on the grade page. */
  last?: string
  /** Sub-strands whose lesson has been read, with when. */
  learned: Record<string, number>
  /** Missed questions waiting to be tried again, spaced out over days. */
  review: ReviewItem[]
  /** Scored answers per sub-strand, for the parent summary. */
  stats: Record<string, { answered: number; missed: number; last: string }>
  /** Quizzes taken per `${subId}:${level}`, passed or not. */
  tries: Record<string, number>
}

export interface ReviewItem {
  q: Question
  sub: string
  area: string
  /** 1 → back tomorrow, 2 → in 3 days, 3 → in a week; right at 3 and it is learned. */
  box: 1 | 2 | 3
  due: string
}

const EMPTY: Progress = {
  best: {},
  challenge: {},
  papers: {},
  streak: { last: '', days: 0 },
  settings: { sound: true, voice: true },
  learned: {},
  review: [],
  stats: {},
  tries: {},
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<Progress>
    return { ...EMPTY, ...parsed, settings: { ...EMPTY.settings, ...parsed.settings } } as Progress
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
const daysFromNow = (n: number) => new Date(Date.now() + n * 86400000).toISOString().slice(0, 10)

function bumpStreak(p: Progress): Progress['streak'] {
  const t = today()
  if (p.streak.last === t) return p.streak
  const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  return { last: t, days: p.streak.last === y ? p.streak.days + 1 : 1 }
}

export function recordQuiz(subId: string, level: Level, stars: number) {
  const k = `${subId}:${level}`
  set({
    ...state,
    best: { ...state.best, [k]: Math.max(stars, state.best[k] ?? 0) },
    tries: { ...state.tries, [k]: (state.tries[k] ?? 0) + 1 },
    streak: bumpStreak(state),
  })
}

export function markLearned(subId: string) {
  set({ ...state, learned: { ...state.learned, [subId]: Date.now() } })
}

const sameQuestion = (a: Question, b: Question) => a.prompt === b.prompt && JSON.stringify(a.visual ?? null) === JSON.stringify(b.visual ?? null)

/** Called for every scored answer: counts it, and queues a miss for review tomorrow. */
export function recordAnswer(q: Question, sub: string, area: string, ok: boolean) {
  const st = state.stats[sub] ?? { answered: 0, missed: 0, last: '' }
  const stats = { ...state.stats, [sub]: { answered: st.answered + 1, missed: st.missed + (ok ? 0 : 1), last: today() } }
  let review = state.review
  if (!ok && !review.some((r) => sameQuestion(r.q, q))) {
    // Keep the queue small: the oldest misses make way for new ones.
    review = [...review, { q, sub, area, box: 1 as const, due: daysFromNow(1) }].slice(-60)
  }
  set({ ...state, stats, review })
}

export function dueReview(p: Progress, limit = 8): ReviewItem[] {
  const t = today()
  return p.review.filter((r) => r.due <= t).slice(0, limit)
}

/** Right moves a question to a longer gap (and off the list after a week); wrong starts it again. */
export function recordReview(item: ReviewItem, ok: boolean) {
  const review = state.review.flatMap((r) => {
    if (!sameQuestion(r.q, item.q)) return [r]
    if (!ok) return [{ ...r, box: 1 as const, due: daysFromNow(1) }]
    if (r.box === 3) return []
    const box = (r.box + 1) as 2 | 3
    return [{ ...r, box, due: daysFromNow(box === 2 ? 3 : 7) }]
  })
  set({ ...state, review, streak: bumpStreak(state) })
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

export function setLastArea(area: string) {
  if (state.last !== area) set({ ...state, last: area })
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
