import { topicOf } from '../curriculum'
import { ENGLISH1_LESSONS, MATH1_LESSONS } from './grade1-math-english'
import { CRE1_LESSONS, CREATIVE1_LESSONS, ENVIRONMENTAL1_LESSONS, KISWAHILI1_LESSONS } from './grade1-more'
import { ENGLISH2_LESSONS, MATH2_LESSONS } from './grade2-math-english'
import { CRE2_LESSONS, CREATIVE2_LESSONS, ENVIRONMENTAL2_LESSONS, KISWAHILI2_LESSONS } from './grade2-more'
import { GRADE3_LESSONS } from './grade3'
import type { Lesson } from './types'

export type { Lesson, LessonStep } from './types'

export const LESSONS: Record<string, Lesson> = {
  ...MATH1_LESSONS,
  ...ENGLISH1_LESSONS,
  ...ENVIRONMENTAL1_LESSONS,
  ...KISWAHILI1_LESSONS,
  ...CREATIVE1_LESSONS,
  ...CRE1_LESSONS,
  ...MATH2_LESSONS,
  ...ENGLISH2_LESSONS,
  ...ENVIRONMENTAL2_LESSONS,
  ...KISWAHILI2_LESSONS,
  ...CREATIVE2_LESSONS,
  ...CRE2_LESSONS,
  ...GRADE3_LESSONS,
}

/** Upper-primary lessons are written once per topic and shared by every grade that has it. */
export const lessonFor = (subId: string): Lesson | undefined => LESSONS[subId] ?? LESSONS[topicOf(subId)]
