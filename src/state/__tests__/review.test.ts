import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { buildQuiz, signature, similarQuestion } from '../../engine/quiz'
import type { Question } from '../../engine/types'
import { dueReview, getProgress, recordAnswer, recordReview, resetProgress } from '../progress'

const q: Question = { id: 'a', type: 'number', level: 3, prompt: '604 − 287 = ?', answer: 317, sub: 't-sub' }
const day = 86400000

describe('mistakes review', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-10-22T08:00:00Z'))
    resetProgress()
  })
  afterEach(() => vi.useRealTimers())

  const at = (days: number) => vi.setSystemTime(new Date(Date.parse('2026-10-22T08:00:00Z') + days * day))

  it('queues a miss for tomorrow, not today', () => {
    recordAnswer(q, 't-sub', 'g3-math', false)
    expect(dueReview(getProgress())).toHaveLength(0)
    at(1)
    expect(dueReview(getProgress())).toHaveLength(1)
  })

  it('does not queue right answers or the same miss twice', () => {
    recordAnswer(q, 't-sub', 'g3-math', true)
    recordAnswer(q, 't-sub', 'g3-math', false)
    recordAnswer({ ...q, id: 'b' }, 't-sub', 'g3-math', false)
    expect(getProgress().review).toHaveLength(1)
    expect(getProgress().stats['t-sub']).toEqual({ answered: 3, missed: 2, last: '2026-10-22' })
  })

  it('spaces right answers out 1, 3 and 7 days, then lets go', () => {
    recordAnswer(q, 't-sub', 'g3-math', false)
    at(1)
    recordReview(dueReview(getProgress())[0], true)
    expect(getProgress().review[0]).toMatchObject({ box: 2, due: '2026-10-26' })
    at(4)
    recordReview(dueReview(getProgress())[0], true)
    expect(getProgress().review[0]).toMatchObject({ box: 3, due: '2026-11-02' })
    at(11)
    recordReview(dueReview(getProgress())[0], true)
    expect(getProgress().review).toHaveLength(0)
  })

  it('starts again after a wrong review', () => {
    recordAnswer(q, 't-sub', 'g3-math', false)
    at(1)
    recordReview(dueReview(getProgress())[0], true)
    at(4)
    recordReview(dueReview(getProgress())[0], false)
    expect(getProgress().review[0]).toMatchObject({ box: 1, due: '2026-10-27' })
  })
})

describe('try one like it', () => {
  it.each([
    ['t-sub', 5],
    ['te-adj', 3],
    ['tv-heat', 4],
    ['tk-kanusha', 2],
    ['tr-jesus', 5],
  ] as const)('gives a different question on the same idea for %s', (sub, level) => {
    for (const seed of [1, 2, 3, 4, 5]) {
      const [missed] = buildQuiz(sub, level, seed).slice(-1)
      const like = similarQuestion(missed, seed)
      expect(like).not.toBeNull()
      expect(like!.sub).toBe(sub)
      expect(signature(like!)).not.toBe(signature(missed))
    }
  })
})
