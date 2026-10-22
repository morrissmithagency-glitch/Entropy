import { GRADE1 } from './grade1'
import { GRADE2 } from './grade2'
import { GRADE3 } from './grade3'
import type { Grade, GradeId, LearningArea, Strand, SubStrand } from './types'

export * from './types'

export const LEVEL_NAMES = ['Seed', 'Sprout', 'Sapling', 'Acacia', 'Baobab'] as const

export const GRADES: Grade[] = [
  { id: 'g1', number: 1, label: 'Grade 1', areas: GRADE1 },
  { id: 'g2', number: 2, label: 'Grade 2', areas: GRADE2 },
  { id: 'g3', number: 3, label: 'Grade 3', areas: GRADE3 },
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
