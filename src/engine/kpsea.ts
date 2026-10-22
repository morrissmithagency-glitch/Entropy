// KPSEA practice papers: the five papers learners sit at the end of Grade 6, drawn from
// everything taught in Grades 4 to 6 at exam difficulty (levels 3 to 5).
import type { AreaKind } from '../curriculum'

export interface KpseaPaper {
  id: string
  title: string
  blurb: string
  kinds: AreaKind[]
  length: number
}

export const KPSEA_PAPERS: KpseaPaper[] = [
  { id: 'math', title: 'Mathematics', blurb: 'Numbers, measurement, geometry and data', kinds: ['math'], length: 25 },
  { id: 'english', title: 'English', blurb: 'Comprehension, cloze and grammar', kinds: ['english'], length: 25 },
  { id: 'kiswahili', title: 'Kiswahili', blurb: 'Ufahamu, mapengo na sarufi', kinds: ['kiswahili'], length: 25 },
  { id: 'science', title: 'Integrated Science', blurb: 'Science and Technology with Agriculture and Nutrition', kinds: ['science', 'agriculture'], length: 25 },
  { id: 'social', title: 'Creative Arts and Social Studies', blurb: 'Social Studies, Creative Arts and CRE', kinds: ['social', 'creative', 'cre'], length: 25 },
]

export const findPaper = (id: string): KpseaPaper => KPSEA_PAPERS.find((p) => p.id === id) ?? KPSEA_PAPERS[0]
/** The world whose scenery and voice the paper borrows. */
export const paperArea = (id: string) => `g6-${findPaper(id).kinds[0]}`
