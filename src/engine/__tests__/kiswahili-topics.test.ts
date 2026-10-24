import { describe, expect, it } from 'vitest'
import { buildQuiz } from '../quiz'
import type { Level } from '../types'

const prompts = (sub: string) => {
  const out: string[] = []
  for (const level of [1, 2, 3, 4, 5] as Level[]) for (let seed = 1; seed <= 40; seed++) for (const q of buildQuiz(sub, level, seed * 7919 + level)) out.push(q.prompt)
  return out
}

describe('Kiswahili topics stay on topic', () => {
  // Each junior-school topic used to borrow Grade 6 revision from a different topic.
  const offTopic: [string, RegExp][] = [
    ['kauli', /Jaza pengo: \S+ ___ \S+(me|li)|Andika kwa (wingi|umoja)|amba/],
    ['usemi', /Ni alama gani|Alama hii inaitwaje|inafaa kumalizwa kwa alama/],
    ['aina', /Jaza pengo kwa umbo sahihi/],
  ]
  for (const g of [7, 8, 9]) for (const [topic, bad] of offTopic) {
    it(`Grade ${g} ${topic}`, () => {
      const stray = prompts(`j${g}k-${topic}`).filter((p) => bad.test(p))
      expect(stray).toEqual([])
    })
  }
})

describe('adjective sentences read naturally', () => {
  it('never pair a finished action with "sana" or "jana"', () => {
    for (const sub of ['u4k-vivumishi', 'u5k-vivumishi', 'u6k-vivumishi']) {
      const odd = prompts(sub).filter((p) => /me\w+ (sana|jana)\.$/.test(p))
      expect(odd).toEqual([])
    }
  })
})
