import { describe, expect, it } from 'vitest'
import { GRADE1 } from '../../curriculum/grade1'
import { ART_IDS } from '../../components/art/objects'
import { buildChallenge, buildQuiz, hasSource, isCorrect, rampLevels, QUIZ_LENGTH } from '../quiz'
import type { Level, Question, Visual } from '../types'

const LEVELS: Level[] = [1, 2, 3, 4, 5]
const ART = new Set<string>(ART_IDS)

function checkVisual(v: Visual | undefined, where: string) {
  if (!v) return
  const arts: string[] = []
  if (v.kind === 'count' || v.kind === 'sizes' || v.kind === 'position') arts.push(v.art)
  if (v.kind === 'units') arts.push(v.art, v.unit)
  if (v.kind === 'groups') arts.push(...v.groups.map((g) => g.art))
  if (v.kind === 'art') arts.push(...v.art)
  if (v.kind === 'balance') arts.push(v.left, v.right)
  for (const a of arts) expect(ART.has(a), `${where}: unknown art "${a}"`).toBe(true)
}

function check(q: Question, where: string) {
  const text = JSON.stringify(q)
  expect(text, `${where}: ${text}`).not.toMatch(/undefined|NaN/)
  expect(q.prompt.length).toBeGreaterThan(0)
  checkVisual(q.visual, where)
  if (q.type === 'choice') {
    const ids = q.options.map((o) => o.id)
    expect(new Set(ids).size, `${where}: duplicate options ${ids}`).toBe(ids.length)
    expect(ids, `${where}: answer missing ${q.answer}`).toContain(q.answer)
    expect(q.options.length).toBeGreaterThanOrEqual(2)
    for (const o of q.options) {
      if (o.art) expect(ART.has(o.art), `${where}: unknown art ${o.art}`).toBe(true)
      checkVisual(o.visual, where)
    }
    // Two options must never look identical to a child.
    const looks = q.options.map((o) => o.label ?? o.art ?? JSON.stringify(o.visual))
    if (!q.options.every((o) => o.art && !o.label)) expect(new Set(looks).size, `${where}: identical options ${looks}`).toBe(looks.length)
    expect(isCorrect(q, q.answer)).toBe(true)
  } else if (q.type === 'number') {
    expect(Number.isInteger(q.answer), `${where}: ${q.answer}`).toBe(true)
    expect(q.answer).toBeGreaterThanOrEqual(0)
    expect(q.answer).toBeLessThanOrEqual(100)
  } else {
    const pool = [...q.tiles]
    for (const a of q.answer) {
      const i = pool.indexOf(a)
      expect(i, `${where}: tile ${a} missing from ${q.tiles}`).toBeGreaterThanOrEqual(0)
      pool.splice(i, 1)
    }
    expect(isCorrect(q, q.answer)).toBe(true)
  }
}

describe('grade 1 question engine', () => {
  const subs = GRADE1.flatMap((a) => a.strands.flatMap((s) => s.subStrands))

  it('every sub-strand has questions', () => {
    for (const s of subs) expect(hasSource(s.id), s.id).toBe(true)
  })

  for (const s of subs) {
    it(`${s.id} builds valid quizzes at every level`, () => {
      for (const level of LEVELS) {
        for (let seed = 1; seed <= 40; seed++) {
          const quiz = buildQuiz(s.id, level, seed)
          expect(quiz.length, `${s.id} L${level}`).toBe(QUIZ_LENGTH)
          quiz.forEach((q, i) => check(q, `${s.id} L${level} seed ${seed} q${i}`))
        }
      }
    })
  }

  it('difficulty never drops within a quiz and starts one level below', () => {
    expect(rampLevels(1)).toEqual([1, 1, 1, 1, 1, 1, 1, 1])
    expect(rampLevels(4)).toEqual([3, 3, 4, 4, 4, 4, 4, 4])
  })

  it('the same seed gives the same paper; a new seed gives a new one', () => {
    const a = buildQuiz('m-add', 4, 7).map((q) => q.prompt + JSON.stringify(q.visual))
    const b = buildQuiz('m-add', 4, 7).map((q) => q.prompt + JSON.stringify(q.visual))
    const c = buildQuiz('m-add', 4, 8).map((q) => q.prompt + JSON.stringify(q.visual))
    expect(a).toEqual(b)
    expect(a).not.toEqual(c)
  })

  it('strand challenges mix sub-strands at levels 4–5', () => {
    for (const area of GRADE1)
      for (const strand of area.strands)
        for (let seed = 1; seed <= 10; seed++) {
          const quiz = buildChallenge(strand.id, seed)
          expect(quiz.length).toBe(10)
          quiz.forEach((q, i) => {
            check(q, `${strand.id} challenge q${i}`)
            expect(q.level).toBeGreaterThanOrEqual(3)
          })
        }
  })
})
