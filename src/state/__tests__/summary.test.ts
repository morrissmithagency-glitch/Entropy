import { describe, expect, it } from 'vitest'
import type { Progress } from '../progress'
import { areaReport, gradeReports, totals } from '../summary'

const base: Progress = {
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

describe('parent summary', () => {
  it('is empty before any learning', () => {
    expect(gradeReports(base)).toEqual([])
    expect(totals(base)).toEqual({ answered: 0, accuracy: null })
  })

  it('sorts sub-strands into growing well, stuck and practise', () => {
    const p: Progress = {
      ...base,
      // Addition passed to Acacia: strong.
      best: { 't-add:1': 3, 't-add:2': 2, 't-add:3': 2, 't-add:4': 1, 't-sub:1': 2 },
      // Subtraction: two failed Sprout quizzes: stuck.
      tries: { 't-sub:2': 2 },
      stats: {
        't-add': { answered: 32, missed: 4, last: '2026-10-22' },
        't-sub': { answered: 24, missed: 12, last: '2026-10-22' },
        't-mul': { answered: 8, missed: 3, last: '2026-10-22' },
      },
    }
    const r = areaReport(p, 'g3-math')
    expect(r.strong.map((s) => s.sub.id)).toEqual(['t-add'])
    expect(r.stuck.map((s) => s.sub.id)).toEqual(['t-sub'])
    expect(r.practise.map((s) => s.sub.id)).toEqual(['t-sub', 't-mul', 't-concept'])
    expect(gradeReports(p).map((g) => g.grade)).toEqual(['g3'])
    expect(totals(p).answered).toBe(64)
  })

  it('stops calling a sub-strand stuck once the level is passed', () => {
    const p: Progress = { ...base, best: { 't-sub:1': 2, 't-sub:2': 1 }, tries: { 't-sub:2': 3 }, stats: { 't-sub': { answered: 24, missed: 8, last: '' } } }
    expect(areaReport(p, 'g3-math').stuck).toEqual([])
  })
})
