export type AreaKind = 'math' | 'english' | 'environmental' | 'kiswahili' | 'creative' | 'cre' | 'science' | 'agriculture' | 'social' | 'pretech'
export type AreaId = string
export type GradeId = 'pp1' | 'pp2' | 'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6' | 'g7' | 'g8' | 'g9'

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
  /** What the grade card shows in large type: "4", or "PP1". */
  mark: string
  label: string
  areas: LearningArea[]
}
