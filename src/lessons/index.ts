import { GRADE3_LESSONS } from './grade3'
import type { Lesson } from './types'

export type { Lesson, LessonStep } from './types'

export const LESSONS: Record<string, Lesson> = { ...GRADE3_LESSONS }

export const lessonFor = (subId: string): Lesson | undefined => LESSONS[subId]
