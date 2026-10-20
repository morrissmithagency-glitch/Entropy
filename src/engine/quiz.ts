import { findStrand } from '../curriculum/grade1'
import { ENVIRONMENTAL_BANKS } from './banks/environmental'
import { ENGLISH_BANKS, ENGLISH_GENERATORS } from './generators/english'
import { KISWAHILI_BANKS, KISWAHILI_GENERATORS } from './generators/kiswahili'
import { MATH_GENERATORS } from './generators/math'
import { uid } from './helpers'
import { createRng, hashString } from './rng'
import type { BankQuestion, Generator, Level, Question, Rng } from './types'

export const QUIZ_LENGTH = 8
export const CHALLENGE_LENGTH = 10

const GENERATORS: Record<string, Generator> = { ...MATH_GENERATORS, ...ENGLISH_GENERATORS, ...KISWAHILI_GENERATORS }
const BANKS: Record<string, BankQuestion[]> = { ...ENVIRONMENTAL_BANKS, ...ENGLISH_BANKS, ...KISWAHILI_BANKS }

export function hasSource(subId: string): boolean {
  return subId in GENERATORS || subId in BANKS
}

/**
 * Difficulty inside one quiz: two warm-up questions one level below, then the level
 * itself. Across levels the floor rises by one each time, so the climb is gradual.
 */
export function rampLevels(level: Level, length = QUIZ_LENGTH): Level[] {
  const warm = Math.max(1, level - 1) as Level
  return Array.from({ length }, (_, i) => (i < 2 ? warm : level))
}

const CHALLENGE_RAMP: Level[] = [4, 4, 4, 4, 5, 4, 5, 5, 5, 5]

function signature(q: Question): string {
  const visual = q.visual ? JSON.stringify(q.visual) : ''
  const ans = q.type === 'choice' ? q.answer : q.type === 'number' ? String(q.answer) : q.answer.join('|')
  return `${q.prompt}::${visual}::${ans}`
}

function fromBank(rng: Rng, bank: BankQuestion[], level: Level, used: Set<BankQuestion>): Question | null {
  // Prefer the exact level, then step outward: below first (easier), then above.
  for (const d of [0, -1, 1, -2, 2, -3, 3, -4, 4]) {
    const pool = bank.filter((b) => b.level === level + d && !used.has(b))
    if (pool.length) {
      const pick = rng.pick(pool)
      used.add(pick)
      const q = { ...pick, id: uid('bank') } as Question
      if (q.type === 'choice') q.options = rng.shuffle(q.options)
      return q
    }
  }
  return null
}

function questionsFor(rng: Rng, subId: string, levels: Level[], usedBank: Set<BankQuestion>, seen: Set<string>): Question[] {
  const gen = GENERATORS[subId]
  const bank = BANKS[subId]
  const out: Question[] = []
  for (const level of levels) {
    let q: Question | null = null
    if (gen) {
      // Avoid repeats, but a small pool (five vowels…) may have to repeat eventually.
      for (let attempt = 0; attempt < 25; attempt++) {
        q = gen(rng, level)
        if (!seen.has(signature(q))) break
      }
    } else if (bank) {
      q = fromBank(rng, bank, level, usedBank)
    }
    if (q) {
      seen.add(signature(q))
      out.push(q)
    }
  }
  return out
}

export function buildQuiz(subId: string, level: Level, seed: number): Question[] {
  const rng = createRng(seed ^ hashString(`${subId}:${level}`))
  return questionsFor(rng, subId, rampLevels(level), new Set(), new Set())
}

/** The Baobab Challenge: every sub-strand of a strand, mixed, at end-term difficulty. */
export function buildChallenge(strandId: string, seed: number): Question[] {
  const { strand } = findStrand(strandId)
  const rng = createRng(seed ^ hashString(`challenge:${strandId}`))
  const subs = strand.subStrands.map((s) => s.id).filter(hasSource)
  const order = rng.shuffle(subs)
  const usedBank = new Set<BankQuestion>()
  const seen = new Set<string>()
  const out: Question[] = []
  CHALLENGE_RAMP.forEach((level, i) => {
    out.push(...questionsFor(rng, order[i % order.length], [level], usedBank, seen))
  })
  return out
}

export function isCorrect(q: Question, response: string | number | string[]): boolean {
  if (q.type === 'choice') return response === q.answer
  if (q.type === 'number') return Number(response) === q.answer
  return Array.isArray(response) && response.join('\u0000') === q.answer.join('\u0000')
}

export function starsFor(correct: number, total: number): 0 | 1 | 2 | 3 {
  const p = total === 0 ? 0 : correct / total
  if (p >= 0.9) return 3
  if (p >= 0.75) return 2
  if (p >= 0.6) return 1
  return 0
}
