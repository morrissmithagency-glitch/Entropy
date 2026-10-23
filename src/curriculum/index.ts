import { GRADE1 } from './grade1'
import { GRADE2 } from './grade2'
import { GRADE4, GRADE5, GRADE6 } from './upper'
import { PP1, PP2 } from './pre'
import { GRADE3 } from './grade3'
import type { Grade, GradeId, LearningArea, Strand, SubStrand } from './types'

export * from './types'

export const LEVEL_NAMES = ['Seed', 'Sprout', 'Sapling', 'Acacia', 'Baobab'] as const

export const GRADES: Grade[] = [
  { id: 'pp1', number: 0, mark: 'PP1', label: 'Pre-Primary 1', areas: PP1 },
  { id: 'pp2', number: 0, mark: 'PP2', label: 'Pre-Primary 2', areas: PP2 },
  { id: 'g1', number: 1, mark: '1', label: 'Grade 1', areas: GRADE1 },
  { id: 'g2', number: 2, mark: '2', label: 'Grade 2', areas: GRADE2 },
  { id: 'g3', number: 3, mark: '3', label: 'Grade 3', areas: GRADE3 },
  { id: 'g4', number: 4, mark: '4', label: 'Grade 4', areas: GRADE4 },
  { id: 'g5', number: 5, mark: '5', label: 'Grade 5', areas: GRADE5 },
  { id: 'g6', number: 6, mark: '6', label: 'Grade 6', areas: GRADE6 },
]

export const ALL_AREAS: LearningArea[] = GRADES.flatMap((g) => g.areas)

export function findGrade(id: GradeId): Grade {
  return GRADES.find((g) => g.id === id)!
}

export function gradeOfArea(areaId: string): Grade {
  const g = GRADES.find((g) => g.areas.some((a) => a.id === areaId))
  if (!g) throw new Error(`Unknown area ${areaId}`)
  return g
}

export function findArea(id: string): LearningArea {
  const area = ALL_AREAS.find((a) => a.id === id)
  if (!area) throw new Error(`Unknown area ${id}`)
  return area
}

export function findSubStrand(id: string): { area: LearningArea; strand: Strand; sub: SubStrand } {
  for (const area of ALL_AREAS)
    for (const strand of area.strands)
      for (const sub of strand.subStrands) if (sub.id === id) return { area, strand, sub }
  throw new Error(`Unknown sub-strand ${id}`)
}

export function findStrand(id: string): { area: LearningArea; strand: Strand } {
  for (const area of ALL_AREAS) for (const strand of area.strands) if (strand.id === id) return { area, strand }
  throw new Error(`Unknown strand ${id}`)
}

export { upperGrade } from './upper'

/** The topic a sub-strand shares across years: u5m-frac → um-frac, p2m-count → pm-count. */
export const topicOf = (subId: string) => subId.replace(/^u[456]/, 'u').replace(/^p[12]/, 'p')
