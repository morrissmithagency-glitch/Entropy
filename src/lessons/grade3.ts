import { CRE3_LESSONS, CREATIVE3_LESSONS } from './grade3-creative-cre'
import { ENGLISH3_LESSONS } from './grade3-english'
import { ENVIRONMENTAL3_LESSONS } from './grade3-environmental'
import { KISWAHILI3_LESSONS } from './grade3-kiswahili'
import { MATH3_LESSONS } from './grade3-math'
import type { Lesson } from './types'

export const GRADE3_LESSONS: Record<string, Lesson> = {
  ...MATH3_LESSONS,
  ...ENGLISH3_LESSONS,
  ...ENVIRONMENTAL3_LESSONS,
  ...KISWAHILI3_LESSONS,
  ...CREATIVE3_LESSONS,
  ...CRE3_LESSONS,
}
