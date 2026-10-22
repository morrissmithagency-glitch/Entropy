// Every Grade 1 to 3 sub-strand must have enough different questions at every level that a
// child can practise daily for a term without the papers going stale.
import { describe, expect, it } from 'vitest'
import { findGrade } from '../../curriculum'
import type { Level } from '../types'
import { buildQuiz, signature } from '../quiz'

// Stories take longer to write than questions can be generated, so comprehension has a
// lower bar for now.
const MIN: Record<string, number> = { 'te-comp': 7, 'tk-ufahamu': 7, 'se-comp': 5, 'sk-ufahamu': 5, 'e-comprehension': 5, 'k-ufahamu': 5 }
const DEFAULT_MIN = 15

describe('Grade 1 to 3 depth', () => {
  const subs = [findGrade('g1'), findGrade('g2'), findGrade('g3')].flatMap((g) => g.areas).flatMap((a) => a.strands.flatMap((s) => s.subStrands))
  it.each(subs.map((s) => [s.id]))('%s has enough different questions at every level', (id) => {
    for (const level of [1, 2, 3, 4, 5] as Level[]) {
      const seen = new Set<string>()
      for (let seed = 1; seed <= 120; seed++) for (const q of buildQuiz(id, level, seed * 7919)) if (q.level === level) seen.add(signature(q))
      expect(seen.size, `${id} level ${level}`).toBeGreaterThanOrEqual(MIN[id] ?? DEFAULT_MIN)
    }
  })
})

// Grades 4–6: written-sentence formats (passages, joining, reported speech) have smaller
// pools than the generated ones, so the bar is lower there.
const UPPER_PASSAGES = /^u[456](e-(comp|cloze)|k-(ufahamu|cloze))$/
describe('Grade 4 to 6 depth', () => {
  const subs = [findGrade('g4'), findGrade('g5'), findGrade('g6')].flatMap((g) => g.areas).flatMap((a) => a.strands.flatMap((s) => s.subStrands))
  it.each(subs.map((s) => [s.id]))('%s has enough different questions at every level', (id) => {
    for (const level of [1, 2, 3, 4, 5] as Level[]) {
      const seen = new Set<string>()
      for (let seed = 1; seed <= 120; seed++) for (const q of buildQuiz(id, level, seed * 7919)) if (q.level === level) seen.add(signature(q))
      expect(seen.size, `${id} level ${level}`).toBeGreaterThanOrEqual(UPPER_PASSAGES.test(id) ? 8 : 10)
    }
  })
})
