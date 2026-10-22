// What the parent summary says, worked out from progress. Kept apart from the screen so it
// can be tested.
import { findArea, GRADES, type AreaId, type GradeId, type Strand, type SubStrand } from '../curriculum'
import { areaStars, levelReached, starsAt, type Progress } from './progress'

export interface SubReport {
  sub: SubStrand
  strand: Strand
  /** Highest level passed, 0–5. */
  reached: number
  answered: number
  /** Share right, 0–1, or null before any answers. */
  accuracy: number | null
  /** Quizzes taken at the next level without passing it. */
  failedTries: number
}

export interface AreaReport {
  area: AreaId
  stars: { earned: number; total: number }
  strong: SubReport[]
  stuck: SubReport[]
  practise: SubReport[]
}

const MIN_ANSWERS = 8

export function subReport(p: Progress, sub: SubStrand, strand: Strand): SubReport {
  const reached = levelReached(p, sub.id)
  const st = p.stats[sub.id]
  const next = Math.min(5, reached + 1)
  const passedNext = (starsAt(p, sub.id, next) ?? 0) >= 1
  return {
    sub,
    strand,
    reached,
    answered: st?.answered ?? 0,
    accuracy: st && st.answered ? (st.answered - st.missed) / st.answered : null,
    failedTries: passedNext ? 0 : (p.tries[`${sub.id}:${next}`] ?? 0),
  }
}

export const isStarted = (r: SubReport) => r.answered > 0 || r.reached > 0
export const isStrong = (r: SubReport) => r.reached >= 4 || (r.answered >= MIN_ANSWERS && (r.accuracy ?? 0) >= 0.85)
export const isStuck = (r: SubReport) => !isStrong(r) && (r.failedTries >= 2 || (r.answered >= MIN_ANSWERS && (r.accuracy ?? 1) < 0.6))

export function areaReport(p: Progress, areaId: AreaId): AreaReport {
  const area = findArea(areaId)
  const subs = area.strands.flatMap((strand) => strand.subStrands.map((sub) => subReport(p, sub, strand)))
  const started = subs.filter(isStarted)
  const strong = started.filter(isStrong)
  const stuck = started.filter(isStuck)
  // Stuck spots first, then the weakest of the rest; if nothing is weak, the next new stop.
  const weakest = started
    .filter((r) => !isStrong(r) && !isStuck(r))
    .sort((a, b) => (a.accuracy ?? 1) - (b.accuracy ?? 1) || a.reached - b.reached)
  const fresh = subs.filter((r) => !isStarted(r))
  const practise = [...stuck, ...weakest, ...fresh].slice(0, 3)
  return { area: areaId, stars: areaStars(p, areaId), strong, stuck, practise }
}

export function gradeReports(p: Progress): { grade: GradeId; label: string; areas: AreaReport[] }[] {
  return GRADES.map((g) => ({
    grade: g.id,
    label: g.label,
    areas: g.areas.filter((a) => a.strands.some((s) => s.subStrands.some((sub) => isStarted(subReport(p, sub, s))))).map((a) => areaReport(p, a.id)),
  })).filter((g) => g.areas.length > 0)
}

export function totals(p: Progress): { answered: number; accuracy: number | null } {
  let answered = 0
  let missed = 0
  for (const s of Object.values(p.stats)) {
    answered += s.answered
    missed += s.missed
  }
  return { answered, accuracy: answered ? (answered - missed) / answered : null }
}
