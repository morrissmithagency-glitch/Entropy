import { topicOf } from '../curriculum'
import { ENGLISH1_LESSONS, MATH1_LESSONS } from './grade1-math-english'
import { CRE1_LESSONS, CREATIVE1_LESSONS, ENVIRONMENTAL1_LESSONS, KISWAHILI1_LESSONS } from './grade1-more'
import { ENGLISH2_LESSONS, MATH2_LESSONS } from './grade2-math-english'
import { CRE2_LESSONS, CREATIVE2_LESSONS, ENVIRONMENTAL2_LESSONS, KISWAHILI2_LESSONS } from './grade2-more'
import { GRADE3_LESSONS } from './grade3'
import { PREPRIMARY_LESSONS } from './preprimary'
import { UPPER_ENGLISH_LESSONS, UPPER_KISWAHILI_LESSONS } from './upper-languages'
import { UPPER_MATH_LESSONS } from './upper-math'
import { UPPER_AGRICULTURE_LESSONS, UPPER_SCIENCE_LESSONS } from './upper-science'
import { UPPER_CREATIVE_LESSONS, UPPER_CRE_LESSONS, UPPER_SOCIAL_LESSONS } from './upper-social-arts-cre'
import { JSS_CRE_LESSONS, JSS_CREATIVE_LESSONS, JSS_SOCIAL_LESSONS } from './jss-humanities'
import { JSS_ENGLISH_LESSONS, JSS_KISWAHILI_LESSONS } from './jss-languages'
import { JSS_MATH_LESSONS } from './jss-math'
import { JSS_AGRICULTURE_LESSONS, JSS_PRETECH_LESSONS, JSS_SCIENCE_LESSONS } from './jss-science'
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

/** Pre-primary, upper-primary and junior school lessons are written once per topic (um-frac) and shared by every grade that has it. */
export const TOPIC_LESSONS: Record<string, Lesson> = {
  ...PREPRIMARY_LESSONS,
  ...UPPER_MATH_LESSONS,
  ...UPPER_ENGLISH_LESSONS,
  ...UPPER_KISWAHILI_LESSONS,
  ...UPPER_SCIENCE_LESSONS,
  ...UPPER_AGRICULTURE_LESSONS,
  ...UPPER_SOCIAL_LESSONS,
  ...UPPER_CREATIVE_LESSONS,
  ...UPPER_CRE_LESSONS,
  ...JSS_MATH_LESSONS,
  ...JSS_ENGLISH_LESSONS,
  ...JSS_KISWAHILI_LESSONS,
  ...JSS_SCIENCE_LESSONS,
  ...JSS_PRETECH_LESSONS,
  ...JSS_SOCIAL_LESSONS,
  ...JSS_AGRICULTURE_LESSONS,
  ...JSS_CREATIVE_LESSONS,
  ...JSS_CRE_LESSONS,
}

export const lessonFor = (subId: string): Lesson | undefined => LESSONS[subId] ?? TOPIC_LESSONS[topicOf(subId)]
