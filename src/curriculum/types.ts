export type AreaKind = 'math' | 'english' | 'environmental' | 'kiswahili' | 'creative' | 'cre' | 'science' | 'agriculture' | 'social'
export type AreaId = string
export type GradeId = 'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6'

export interface SubStrand {
  id: string
  code: string
  title: string
  /** One line a child (or parent) can read. */
  blurb: string
}

export interface Strand {
  id: string
  code: string
  title: string
  subStrands: SubStrand[]
}

export interface LearningArea {
  id: AreaId
  kind: AreaKind
  title: string
  /** Name of this area's "world" on the journey. */
  world: string
  tagline: string
  strands: Strand[]
}

export interface Grade {
  id: GradeId
  number: number
  label: string
  areas: LearningArea[]
}
