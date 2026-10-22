// Question makers built from tables of true facts. One small, checked table gives many
// different questions, in the formats Grade 3 papers use: "Which one is…", "Which one is
// NOT…", "Which group has only…", and two-way pairs ("What is X used for?" / "Which X…").
import { uid } from './helpers'
import type { ChoiceQuestion, Generator, Level, Rng } from './types'

export interface Category {
  /** With its article: "a protective food". */
  one: string
  /** "protective foods" */
  many: string
  items: string[]
  /** Categories are only compared with others in the same set, so wrong answers are
   * always the same kind of thing ("ways to…" against "ways to…", not against colours). */
  set?: string
}

export interface PairSet {
  pairs: [string, string][]
  /** Question asked from the left of a pair; the answer is the right. */
  ask: (left: string) => string
  /** Question asked from the right; the answer is the left. Omit if it only goes one way. */
  askBack?: (right: string) => string
  explain?: (left: string, right: string) => string
}

export interface FactSet {
  categories?: Category[]
  pairs?: PairSet[]
  /** Wording for category questions, for sets not in English. */
  wording?: Wording
}

interface Wording {
  which: (c: Category) => string
  not: (c: Category) => string
  group: (c: Category) => string
}

const ENGLISH: Wording = {
  which: (c) => `Which one is ${c.one}?`,
  not: (c) => `Which one is NOT ${c.one}?`,
  group: (c) => `Which group has only ${c.many}?`,
}

const q = (level: Level, prompt: string, answer: string, wrong: string[], explain?: string): ChoiceQuestion => ({
  id: uid('fact'),
  type: 'choice',
  level,
  prompt,
  options: [answer, ...wrong].map((l) => ({ id: l, label: l })),
  answer,
  explain,
})

const peers = (cats: Category[], c: Category) => cats.filter((x) => x !== c && (x.set ?? '') === (c.set ?? ''))
const others = (cats: Category[], c: Category) => peers(cats, c).flatMap((x) => x.items)
const list = (xs: string[]) => xs.join(', ')

function fromCategories(rng: Rng, level: Level, cats: Category[], w: Wording): ChoiceQuestion {
  const usable = cats.filter((x) => x.items.length >= 3 && others(cats, x).length >= 3)
  // "Which one is NOT a thing we must NOT…" is a double negative: ask those lists another way.
  const plain = usable.filter((x) => !/\bnot\b/i.test(x.one))
  const c = rng.pick(level === 3 && plain.length ? plain : usable)
  // Explanations are written in English; other languages fall back to the lesson's key idea.
  const en = w === ENGLISH
  const outside = others(cats, c)
  if (level <= 2) {
    const ans = rng.pick(c.items)
    return q(level, w.which(c), ans, rng.sample(outside, level === 1 ? 2 : 3), en ? `${ans[0].toUpperCase()}${ans.slice(1)} is ${c.one}.` : undefined)
  }
  if (level === 3) {
    const odd = rng.pick(outside)
    return q(level, w.not(c), odd, rng.sample(c.items, 3), en ? `The others are all ${c.many}.` : undefined)
  }
  // "Which group has only…": the right group, and groups with one stranger hidden inside.
  const size = level === 4 ? 3 : Math.min(4, c.items.length)
  const right = rng.sample(c.items, size)
  const wrong: string[] = []
  const seen = new Set([list(right)])
  for (let i = 0; i < 40 && wrong.length < 3; i++) {
    const g = rng.shuffle([...rng.sample(c.items, size - 1), rng.pick(outside)])
    const k = list(g)
    if (!seen.has(k)) {
      seen.add(k)
      wrong.push(k)
    }
  }
  return q(level, w.group(c), list(right), wrong, en ? `${list(right)}: all of them are ${c.many}.` : undefined)
}

function fromPairs(rng: Rng, level: Level, set: PairSet): ChoiceQuestion {
  const [a, b] = rng.pick(set.pairs)
  const n = level === 1 ? 2 : 3
  const back = set.askBack && (level >= 3 ? rng.next() < 0.6 : rng.next() < 0.3)
  if (back) {
    const wrong = rng.sample([...new Set(set.pairs.filter(([x, y]) => x !== a && y !== b).map(([x]) => x))], n)
    return q(level, set.askBack!(b), a, wrong, set.explain?.(a, b))
  }
  const wrong = rng.sample([...new Set(set.pairs.filter(([x, y]) => x !== a && y !== b).map(([, y]) => y))], n)
  return q(level, set.ask(a), b, wrong, set.explain?.(a, b))
}

export function factGenerator(set: FactSet): Generator {
  return (rng, level) => {
    const kinds: ('cat' | 'pair')[] = []
    if (set.categories?.length) kinds.push('cat')
    if (set.pairs?.length) kinds.push('pair')
    return rng.pick(kinds) === 'cat' ? fromCategories(rng, level, set.categories!, set.wording ?? ENGLISH) : fromPairs(rng, level, rng.pick(set.pairs!))
  }
}
