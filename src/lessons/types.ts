import type { Visual } from '../engine/types'

/** One page of a lesson: a small idea, shown and then worked through. */
export interface LessonStep {
  title: string
  /** One to three short sentences. _word_ is underlined, as on the papers. */
  text: string
  visual?: Visual
  /** A worked example, one line per row; sums keep their columns. */
  example?: string[]
}

export interface Lesson {
  /** Why this matters, in one sentence a child can hear. */
  intro: string
  steps: LessonStep[]
  /** The one thing to keep. Also shown when a question in this sub-strand is missed. */
  remember: string
}
