import { ENGLISH2_LESSONS, MATH2_LESSONS } from './grade2-math-english'
import { CRE2_LESSONS, CREATIVE2_LESSONS, ENVIRONMENTAL2_LESSONS, KISWAHILI2_LESSONS } from './grade2-more'
import { GRADE3_LESSONS } from './grade3'
import type { Lesson } from './types'

export type { Lesson, LessonStep } from './types'

export const LESSONS: Record<string, Lesson> = {
  ...MATH2_LESSONS,
  ...ENGLISH2_LESSONS,
  ...ENVIRONMENTAL2_LESSONS,
  ...KISWAHILI2_LESSONS,
  ...CREATIVE2_LESSONS,
  ...CRE2_LESSONS,
  ...GRADE3_LESSONS,
}

export const lessonFor = (subId: string): Lesson | undefined => LESSONS[subId]
