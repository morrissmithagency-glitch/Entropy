import type { ArtId } from '../components/art/objects'

export type Level = 1 | 2 | 3 | 4 | 5

export type ShapeKind = 'circle' | 'square' | 'rectangle' | 'triangle' | 'oval'

export interface ShapeSpec {
  kind: ShapeKind
  color?: string
  size?: number
}

/** Something drawn above (or inside) a question. */
export type Visual =
  | { kind: 'count'; art: ArtId; n: number }
  | { kind: 'groups'; groups: { art: ArtId; n: number }[]; joiner?: '+' | '−' | 'vs' }
  | { kind: 'clock'; hour: number; minute?: number }
  | { kind: 'money'; values: number[] }
  | { kind: 'shapes'; shapes: ShapeSpec[] }
  | { kind: 'sizes'; art: ArtId; scales: number[]; axis: 'x' | 'y' | 'both'; labels?: string[] }
  | { kind: 'balance'; left: ArtId; right: ArtId; heavier: 'left' | 'right' }
  | { kind: 'units'; art: ArtId; unit: ArtId; n: number }
  | { kind: 'tens'; tens: number; ones: number }
  | { kind: 'sequence'; items: (number | string | null)[] }
  | { kind: 'sum'; a: number; b: number; op: '+' | '−'; result?: number | null; vertical?: boolean }
  | { kind: 'passage'; title?: string; text: string }
  | { kind: 'lines'; lines: ('straight' | 'curved')[]; variant?: number }
  | { kind: 'pattern'; items: (ShapeSpec | null)[] }
  | { kind: 'art'; art: ArtId[] }
  | { kind: 'fraction'; parts: number; shaded: number; shape?: 'bar' | 'circle' }
  /** A figure with lines inside it, for "how many triangles?" questions. */
  | { kind: 'figure'; figure: 'tri4' | 'tri3' | 'tri2' | 'rect-diag' | 'rect-cross' }
  /** Shillings and cents set out in two columns, as on Kenyan papers. */
  | { kind: 'ledger'; rows: [number, number][]; op: '+' | '−' }
  | { kind: 'position'; art: ArtId; where: 'in' | 'on' | 'under' | 'beside' | 'behind' }
  /** A small table, first row is the header. */
  | { kind: 'table'; rows: string[][]; caption?: string }
  /** A bar graph with labelled bars and a value axis. */
  | { kind: 'bars'; labels: string[]; values: number[]; title?: string; unit?: string }

export interface Option {
  id: string
  label?: string
  art?: ArtId
  visual?: Visual
}

interface Base {
  id: string
  level: Level
  prompt: string
  /** Text read aloud. Defaults to the prompt. For listening questions this holds the hidden word. */
  say?: string
  /** If true the child must listen: the speaker plays automatically and is the focus. */
  listen?: boolean
  visual?: Visual
  /** Shown after answering, to teach rather than just mark. */
  explain?: string
  /** The sub-strand it came from; set by the quiz builder. */
  sub?: string
}

export interface ChoiceQuestion extends Base {
  type: 'choice'
  options: Option[]
  answer: string
}

export interface NumberQuestion extends Base {
  type: 'number'
  answer: number
}

export interface OrderQuestion extends Base {
  type: 'order'
  /** Tiles shown shuffled. */
  tiles: string[]
  answer: string[]
  /** How the answer is joined when shown, e.g. '' for spelling, ' ' for sentences. */
  joiner: string
}

export type Question = ChoiceQuestion | NumberQuestion | OrderQuestion

/** A deterministic random source so a given quiz seed always produces the same paper. */
export interface Rng {
  next(): number
  int(min: number, max: number): number
  pick<T>(xs: readonly T[]): T
  shuffle<T>(xs: readonly T[]): T[]
  sample<T>(xs: readonly T[], n: number): T[]
}

export type Generator = (rng: Rng, level: Level) => Question

/** Hand-written question in a bank: no id yet; the builder assigns one. */
export type BankQuestion = Omit<ChoiceQuestion, 'id'> | Omit<NumberQuestion, 'id'> | Omit<OrderQuestion, 'id'>
