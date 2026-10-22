import { describe, expect, it } from 'vitest'
import { findGrade } from '../../curriculum'
import { LESSONS, TOPIC_LESSONS, lessonFor } from '..'
import { topicOf } from '../../curriculum'

describe('Grade 1 to 3 lessons', () => {
  const subs = [findGrade('g1'), findGrade('g2'), findGrade('g3')].flatMap((g) => g.areas).flatMap((a) => a.strands.flatMap((s) => s.subStrands))

  it.each(subs.map((s) => [s.id]))('%s has a full lesson', (id) => {
    const lesson = LESSONS[id]
    expect(lesson, `missing lesson for ${id}`).toBeDefined()
    expect(lesson.intro.length).toBeGreaterThan(20)
    expect(lesson.steps.length).toBeGreaterThanOrEqual(2)
    expect(lesson.remember.length).toBeGreaterThan(15)
    for (const step of lesson.steps) {
      expect(step.title).toBeTruthy()
      expect(step.text.length).toBeGreaterThan(15)
    }
  })

  it('has no lessons for sub-strands that do not exist', () => {
    const known = new Set(subs.map((s) => s.id))
    for (const id of Object.keys(LESSONS)) expect(known.has(id), id).toBe(true)
  })
})

describe('Grade 4 to 6 lessons', () => {
  const subs = [findGrade('g4'), findGrade('g5'), findGrade('g6')].flatMap((g) => g.areas).flatMap((a) => a.strands.flatMap((s) => s.subStrands))

  it.each(subs.map((s) => [s.id]))('%s has a full lesson', (id) => {
    const lesson = lessonFor(id)
    expect(lesson, `missing lesson for ${topicOf(id)}`).toBeDefined()
    expect(lesson!.intro.length).toBeGreaterThan(20)
    expect(lesson!.steps.length).toBeGreaterThanOrEqual(3)
    expect(lesson!.remember.length).toBeGreaterThan(15)
    for (const step of lesson!.steps) expect(step.text.length).toBeGreaterThan(15)
  })

  it('has no lessons for topics that do not exist', () => {
    const known = new Set(subs.map((s) => topicOf(s.id)))
    for (const id of Object.keys(TOPIC_LESSONS)) expect(known.has(id), id).toBe(true)
  })
})
