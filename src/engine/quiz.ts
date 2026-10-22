import { findStrand } from '../curriculum'
import { ENVIRONMENTAL_BANKS } from './banks/environmental'
import { ENGLISH_BANKS, ENGLISH_GENERATORS } from './generators/english'
import { KISWAHILI_BANKS, KISWAHILI_GENERATORS } from './generators/kiswahili'
import { MATH_GENERATORS } from './generators/math'
import { MATH3_GENERATORS } from './generators/math3'
import { ENGLISH3_BANKS, ENGLISH3_GENERATORS } from './generators/english3'
import { ENVIRONMENTAL3_BANKS } from './banks/environmental3'
import { GRADE3_MORE_BANKS, GRADE3_MORE_GENERATORS } from './banks/grade3-more'
import { uid } from './helpers'
import { createRng, hashString } from './rng'
import type { BankQuestion, Generator, Level, Question, Rng } from './types'

export const QUIZ_LENGTH = 8
export const CHALLENGE_LENGTH = 10

const GENERATORS: Record<string, Generator> = { ...MATH_GENERATORS, ...ENGLISH_GENERATORS, ...KISWAHILI_GENERATORS, ...MATH3_GENERATORS, ...ENGLISH3_GENERATORS, ...GRADE3_MORE_GENERATORS }
const BANKS: Record<string, BankQuestion[]> = { ...ENVIRONMENTAL_BANKS, ...ENGLISH_BANKS, ...KISWAHILI_BANKS, ...ENVIRONMENTAL3_BANKS, ...ENGLISH3_BANKS, ...GRADE3_MORE_BANKS }

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

export function signature(q: Question): string {
  const visual = q.visual ? JSON.stringify(q.visual) : ''
  const ans = q.type === 'choice' ? q.answer : q.type === 'number' ? String(q.answer) : q.answer.join('|')
  return `${q.prompt}::${visual}::${ans}`
}

function fromBank(rng: Rng, bank: BankQuestion[], level: Level, used: Set<BankQuestion>, floor = 1): Question | null {
  // Prefer the exact level, then step outward: below first (easier), then above.
  for (const d of [0, -1, 1, -2, 2, -3, 3, -4, 4]) {
    const pool = bank.filter((b) => b.level === level + d && b.level >= floor && !used.has(b))
    if (pool.length) {
      const pick = rng.pick(pool)
      used.add(pick)
      const q = { ...pick, id: uid('bank') } as Question
      if (q.type === 'choice') q.options = rng.shuffle(q.options)
      if (q.type === 'order') {
        let tiles = rng.shuffle(q.tiles)
        for (let i = 0; i < 5 && tiles.join() === q.answer.join(); i++) tiles = rng.shuffle(q.tiles)
        q.tiles = tiles
      }
      return q
    }
  }
  return null
}

function questionsFor(rng: Rng, subId: string, levels: Level[], usedBank: Set<BankQuestion>, seen: Set<string>, floor = 1): Question[] {
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
      q = fromBank(rng, bank, level, usedBank, floor)
    }
    if (q) {
      seen.add(signature(q))
      out.push({ ...q, sub: subId })
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
  // A strand with a single stop may not have ten hard questions; the challenge is then
  // shorter rather than padded with easy ones.
  CHALLENGE_RAMP.forEach((level, i) => {
    out.push(...questionsFor(rng, order[i % order.length], [level], usedBank, seen, 3))
  })
  return out
}

/**
 * A fresh question on the same idea, for "try one like it" after a miss: same sub-strand
 * and level, different question.
 */
export function similarQuestion(missed: Question, seed: number): Question | null {
  if (!missed.sub) return null
  const rng = createRng(seed ^ hashString(`similar:${missed.sub}:${missed.prompt}`))
  const seen = new Set([signature(missed)])
  const bank = BANKS[missed.sub]
  // A bank question is "like" the missed one only if it is not the same one.
  const used = new Set(bank?.filter((b) => b.prompt === missed.prompt) ?? [])
  const [q] = questionsFor(rng, missed.sub, [missed.level], used, seen, missed.level)
  return q && signature(q) !== signature(missed) ? q : null
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
