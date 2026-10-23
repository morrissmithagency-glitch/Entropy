// Pre-primary (PP1 and PP2) question makers. Children of four and five cannot read yet, so
// every question is short, read aloud, and answered by tapping a picture, a shape or a
// number. PP1 counts to 5 at first and 10 at most; PP2 goes to 15 and begins to add.
import { artName, type ArtId } from '../../components/art/objects'
import { factGenerator } from '../facts'
import { artOptions, choice, numberWord, textOptions, countOf, An, an } from '../helpers'
import type { Generator, Level, Option, ShapeKind, ShapeSpec } from '../types'

export type PP = 1 | 2

const P = 'pp'
/** The largest number at each level. */
const top = (g: PP, level: Level) => (g === 1 ? [3, 5, 6, 8, 10] : [5, 8, 10, 12, 15])[level - 1]
const nOpts = (level: Level) => (level <= 2 ? 3 : 4)

/** Number choices for small children: only close neighbours, never a jump of ten. */
function numberOptions(rng: { pick: <T>(xs: readonly T[]) => T; shuffle: <T>(xs: T[]) => T[] }, answer: number, count: number, min: number, max: number): Option[] {
  // Neighbours in a random mix, so the answer is not always the middle number.
  const near = rng.shuffle([answer - 1, answer + 1, answer - 2, answer + 2, answer - 3, answer + 3].filter((n) => n >= min && n <= max))
  const far = [answer + 4, answer - 4, answer + 5, answer - 5].filter((n) => n >= min && n <= max)
  const picks = [answer, ...near.concat(far).slice(0, Math.max(0, count - 1))]
  return rng.shuffle(picks).map((n) => ({ id: String(n), label: String(n) }))
}

const COUNTABLE: ArtId[] = ['mango', 'orange', 'banana', 'egg', 'ball', 'cup', 'goat', 'cow', 'hen', 'fish', 'bird', 'tree', 'flower', 'star', 'shoe', 'drum', 'leaf', 'stone', 'pencil', 'book', 'tomato']

// ── Classification ──────────────────────────────────────────────────────────

const GROUPS: Record<string, ArtId[]> = {
  fruit: ['mango', 'orange', 'banana', 'tomato', 'pumpkin'],
  animal: ['goat', 'cow', 'hen', 'dog', 'cat', 'fish', 'elephant', 'giraffe', 'lion', 'zebra', 'bird'],
  home: ['cup', 'jug', 'spoon', 'plate', 'pot', 'chair', 'bed', 'bucket'],
  school: ['pencil', 'book', 'bag'],
  sky: ['sun', 'moon', 'star', 'cloud'],
}
const GROUP_NAMES: Record<string, string> = { fruit: 'fruits', animal: 'animals', home: 'things at home', school: 'school things', sky: 'things in the sky' }

export const sortP = (g: PP): Generator => (rng, level) => {
  if (level <= (g === 1 ? 3 : 2)) {
    // Three the same and one different.
    const [same, odd] = rng.sample(COUNTABLE, 2)
    const opts: Option[] = rng.shuffle([0, 1, 2, 3]).map((i) => ({ id: i === 0 ? odd : `${same}-${i}`, art: i === 0 ? odd : same }))
    return choice(P, level, 'Which one is different?', opts, odd, { explain: `The ${artName(odd)} is different from the ${artName(same, 2)}.` })
  }
  const keys = Object.keys(GROUPS)
  const [kin, other] = rng.sample(keys, 2)
  const odd = rng.pick(GROUPS[other])
  const sames = rng.sample(GROUPS[kin], 3)
  const opts = rng.shuffle([odd, ...sames]).map((a) => ({ id: a, art: a }))
  return choice(P, level, 'Which one does not belong?', opts, odd, { explain: `The others are ${GROUP_NAMES[kin]}. The ${artName(odd)} is not.` })
}

const PAIRS: [ArtId, ArtId][] = [
  ['hen', 'egg'],
  ['moon', 'star'],
  ['cloud', 'rain'],
  ['pencil', 'book'],
  ['spoon', 'plate'],
  ['cup', 'jug'],
  ['soap', 'towel'],
  ['tap', 'bucket'],
  ['fish', 'river'],
  ['toothbrush', 'soap'],
  ['comb', 'towel'],
  ['drum', 'bell'],
]

export const matchP = (g: PP): Generator => (rng, level) => {
  if (level === 1 || (g === 1 && level === 2)) {
    // Find the same picture.
    const a = rng.pick(COUNTABLE)
    return choice(P, level, 'Find the same picture.', artOptions(rng, a, COUNTABLE, nOpts(level)), a, { visual: { kind: 'art', art: [a] }, explain: `They are both ${artName(a, 2)}.` })
  }
  const [a, b] = rng.pick(PAIRS)
  const flip = rng.next() < 0.5
  const [show, ans] = flip ? [b, a] : [a, b]
  const wrong = PAIRS.flatMap((p) => p).filter((x) => x !== show && x !== ans && !PAIRS.some(([p, q]) => (p === show && q === x) || (q === show && p === x)))
  return choice(P, level, 'Which one goes with this?', artOptions(rng, ans, wrong, nOpts(level)), ans, { visual: { kind: 'art', art: [show] }, explain: `The ${artName(show)} and the ${artName(ans)} go together.` })
}

// ── Numbers ─────────────────────────────────────────────────────────────────

export const countP = (g: PP): Generator => (rng, level) => {
  const art = rng.pick(COUNTABLE)
  const n = rng.int(level <= 2 ? 1 : Math.ceil(top(g, level) / 2), top(g, level))
  return choice(P, level, `How many ${artName(art, 2)}?`, numberOptions(rng, n, nOpts(level), 1, top(g, 5) + 2), String(n), {
    visual: { kind: 'count', art, n },
    explain: `Touch each one as you count: ${n}.`,
  })
}

export const numeralP = (g: PP): Generator => (rng, level) => {
  const max = top(g, level)
  const n = rng.int(level === 1 ? 1 : 2, max)
  if (level <= 2 && rng.next() < 0.5) {
    const art = rng.pick(COUNTABLE)
    return choice(P, level, 'Which number tells how many?', numberOptions(rng, n, nOpts(level), 1, max + 2), String(n), { visual: { kind: 'count', art, n }, explain: `There are ${n}. We write ${n}.` })
  }
  if (level <= 2 || (level === 3 && rng.next() < 0.5)) {
    return choice(P, level, `Find the number ${numberWord(n)}.`, numberOptions(rng, n, nOpts(level), 1, max + 2), String(n), { say: `Find the number ${numberWord(n)}.`, explain: `This is ${numberWord(n)}: ${n}.` })
  }
  if (level === 3 || level === 4) {
    const after = rng.next() < 0.6
    const m = rng.int(2, max - 1)
    const ans = after ? m + 1 : m - 1
    return choice(P, level, after ? 'Which number comes next?' : 'Which number comes before?', numberOptions(rng, ans, nOpts(level), 0, max + 2), String(ans), {
      visual: { kind: 'sequence', items: after ? [m - 1, m, null] : [null, m, m + 1] },
      explain: after ? `After ${m} comes ${ans}.` : `Before ${m} comes ${ans}.`,
    })
  }
  const start = rng.int(1, Math.max(1, max - 4))
  const seq = [start, start + 1, start + 2, start + 3, start + 4]
  const gap = rng.int(1, 3)
  return choice(P, level, 'Which number is missing?', numberOptions(rng, seq[gap], 4, 0, max + 3), String(seq[gap]), {
    visual: { kind: 'sequence', items: seq.map((v, i) => (i === gap ? null : v)) },
    explain: `Count on: ${seq.join(', ')}.`,
  })
}

export const compareP = (g: PP): Generator => (rng, level) => {
  const max = top(g, level)
  if (level <= 3) {
    const [a1, a2] = rng.sample(COUNTABLE, 2)
    // Two different counts; at the first level they differ by at least two, so it is easy to see.
    const lo = rng.int(1, max - (level === 1 ? 2 : 1))
    const hi = rng.int(lo + (level === 1 ? 2 : 1), max)
    const [x, y] = rng.next() < 0.5 ? [lo, hi] : [hi, lo]
    const more = rng.next() < 0.6
    const right = (more ? x > y : x < y) ? a1 : a2
    return choice(P, level, `Are there ${more ? 'more' : 'fewer'} ${artName(a1, 2)} or ${artName(a2, 2)}?`, [{ id: a1, art: a1 }, { id: a2, art: a2 }], right, {
      visual: { kind: 'groups', groups: [{ art: a1, n: x }, { art: a2, n: y }], joiner: 'vs' },
      explain: `${x} ${artName(a1, x)} and ${y} ${artName(a2, y)}.`,
    })
  }
  const x = rng.int(1, max)
  let y = rng.int(1, max)
  while (y === x) y = rng.int(1, max)
  const big = rng.next() < 0.5
  const ans = big ? Math.max(x, y) : Math.min(x, y)
  return choice(P, level, `Which number is ${big ? 'bigger' : 'smaller'}?`, rng.shuffle([x, y]).map((v) => ({ id: String(v), label: String(v) })), String(ans), { explain: `${Math.min(x, y)} comes before ${Math.max(x, y)} when we count.` })
}

export const addP = (g: PP): Generator => (rng, level) => {
  const max = g === 1 ? [3, 4, 5, 5, 6][level - 1] : [5, 6, 8, 9, 10][level - 1]
  const art = rng.pick(COUNTABLE)
  const a = rng.int(1, max - 1)
  const b = g === 1 ? 1 : rng.int(1, max - a)
  const prompt = g === 1 ? `${a} ${artName(art, a)} and one more. How many now?` : `${a} ${artName(art, a)} and ${b} more. How many altogether?`
  return choice(P, level, prompt, numberOptions(rng, a + b, nOpts(level), 1, max + 2), String(a + b), {
    visual: { kind: 'groups', groups: [{ art, n: a }, { art, n: b }], joiner: '+' },
    explain: `${a} and ${b} make ${a + b}.`,
  })
}

export const subP = (_g: PP): Generator => (rng, level) => {
  const max = [4, 5, 7, 8, 10][level - 1]
  const art = rng.pick(COUNTABLE)
  const a = rng.int(2, max)
  const b = rng.int(1, level <= 2 ? 1 : a - 1)
  return choice(P, level, `There are ${a} ${artName(art, a)}. ${b} ${b === 1 ? 'goes' : 'go'} away. How many are left?`, numberOptions(rng, a - b, nOpts(level), 0, max), String(a - b), {
    visual: { kind: 'groups', groups: [{ art, n: a }, { art, n: b }], joiner: '−' },
    explain: `${a} take away ${b} leaves ${a - b}.`,
  })
}

// ── Measurement ─────────────────────────────────────────────────────────────

export const sizeP = (_g: PP): Generator => (rng, level) => {
  const kind = rng.pick(['big', 'long', 'tall'] as const)
  const art = kind === 'big' ? rng.pick<ArtId>(['ball', 'mango', 'orange', 'drum', 'cup', 'pumpkin']) : kind === 'long' ? rng.pick<ArtId>(['pencil', 'stick']) : rng.pick<ArtId>(['tree', 'giraffe'])
  const n = level <= 2 ? 2 : 3
  const scales = rng.shuffle([0.5, 0.75, 1].slice(3 - n))
  const most = rng.next() < 0.5
  const word = kind === 'big' ? (most ? 'big' : 'small') : kind === 'long' ? (most ? 'long' : 'short') : most ? 'tall' : 'short'
  const target = most ? Math.max(...scales) : Math.min(...scales)
  const axis = kind === 'big' ? ('both' as const) : kind === 'long' ? ('x' as const) : ('y' as const)
  const opts = scales.map((s, i) => ({ id: String(i), visual: { kind: 'sizes' as const, art, scales: [s], axis } }))
  const comparative = word === 'big' ? 'bigger' : word === 'small' ? 'smaller' : `${word}er`
  const superlative = word === 'big' ? 'biggest' : word === 'small' ? 'smallest' : `${word}est`
  return choice(P, level, n === 2 ? `Which ${artName(art)} is ${comparative}?` : `Which ${artName(art)} is the ${superlative}?`, opts, String(scales.indexOf(target)), { explain: `Look carefully and compare them side by side.` })
}

const HEAVY_LIGHT: [ArtId, ArtId][] = [
  ['stone', 'feather'],
  ['cow', 'hen'],
  ['pumpkin', 'leaf'],
  ['elephant', 'bird'],
  ['bucket', 'cup'],
  ['chair', 'pencil'],
  ['jerrycan', 'spoon'],
  ['bed', 'book'],
  ['goat', 'egg'],
  ['drum', 'ball'],
  ['rock', 'flower'],
  ['giraffe', 'cat'],
  ['zebra', 'dog'],
  ['house', 'shoe'],
  ['lion', 'fish'],
]

export const massP = (_g: PP): Generator => (rng, level) => {
  const [heavy, light] = rng.pick(HEAVY_LIGHT)
  const askHeavy = rng.next() < 0.5
  const ans = askHeavy ? heavy : light
  if (level <= 2) {
    const heavyLeft = rng.next() < 0.5
    return choice(P, level, `Look at the balance. Which one is ${askHeavy ? 'heavier' : 'lighter'}?`, rng.shuffle([heavy, light]).map((a) => ({ id: a, art: a })), ans, {
      visual: { kind: 'balance', left: heavyLeft ? heavy : light, right: heavyLeft ? light : heavy, heavier: heavyLeft ? 'left' : 'right' },
      explain: 'The heavier side of a balance goes down.',
    })
  }
  if (level === 3) return choice(P, level, `Which one is ${askHeavy ? 'heavier' : 'lighter'}?`, rng.shuffle([heavy, light]).map((a) => ({ id: a, art: a })), ans, { explain: `${An(artName(heavy))} is heavier than ${an(artName(light))}.` })
  const set = rng.sample(HEAVY_LIGHT, 2)
  const items = [set[0][0], set[0][1], set[1][1]]
  const heaviest = set[0][0]
  return choice(P, level, 'Which one is the heaviest?', rng.shuffle(items).map((a) => ({ id: a, art: a })), heaviest, { explain: `The ${artName(heaviest)} is the heaviest.` })
}

const HOLDS: [ArtId, ArtId][] = [
  ['jerrycan', 'cup'],
  ['bucket', 'spoon'],
  ['pot', 'glass'],
  ['jug', 'cup'],
  ['basin', 'spoonful'],
  ['bucket', 'glass'],
  ['jerrycan', 'jug'],
  ['basin', 'cup'],
  ['well', 'jug'],
  ['lake', 'bucket'],
  ['pot', 'spoon'],
  ['jerrycan', 'glass'],
]

export const capacityP = (_g: PP): Generator => (rng, level) => {
  const [big, small] = rng.pick(HOLDS)
  const more = rng.next() < 0.6
  if (level <= 3 || rng.next() < 0.4) return choice(P, level, `Which one holds ${more ? 'more' : 'less'} water?`, rng.shuffle([big, small]).map((a) => ({ id: a, art: a })), more ? big : small, { explain: `${An(artName(big))} holds more water than ${an(artName(small))}.` })
  const [s, ans, wrong] = rng.pick<[string, string, string[]]>([
    ['A cup with no water in it is ___.', 'empty', ['full', 'heavy']],
    ['A bucket filled to the top is ___.', 'full', ['empty', 'light']],
    ['We pour water to make a cup ___.', 'full', ['empty', 'dry']],
    ['We drink all the milk. Now the cup is ___.', 'empty', ['full', 'bigger']],
    ['Which holds more: a big jerrycan or a small cup?', 'a big jerrycan', ['a small cup', 'they hold the same']],
    ['A bottle that is half full has water up to the ___.', 'middle', ['top', 'bottom only']],
    ['Mama fills the jerrycan at the tap. Now it is ___.', 'full', ['empty', 'smaller']],
    ['The baby drank all the water in the glass. The glass is ___.', 'empty', ['full', 'heavy']],
    ['Which holds less: a spoon or a bucket?', 'a spoon', ['a bucket', 'they hold the same']],
    ['Which holds more: a basin or a cup?', 'a basin', ['a cup', 'they hold the same']],
    ['We need many cups of water to fill a ___.', 'bucket', ['spoon', 'cup']],
    ['A full cup of tea is heavier than an ___ cup.', 'empty', ['full', 'big']],
  ])
  return choice(P, level, s, textOptions(rng, ans, wrong, 3), ans, { explain: `${ans[0].toUpperCase()}${ans.slice(1)}.` })
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const timeP = (g: PP): Generator => (rng, level) => {
  if (level <= 2 || g === 1) {
    const [s, ans, wrong] = rng.pick<[string, string, string[]]>([
      ['When do we see the sun?', 'day', ['night']],
      ['When do we see the moon and stars?', 'night', ['day']],
      ['When do we sleep?', 'night', ['day']],
      ['When do we go to school?', 'day', ['night']],
      ['When do we eat breakfast?', 'morning', ['night', 'evening']],
      ['When do we go to bed?', 'night', ['morning', 'afternoon']],
      ['When do we brush our teeth before school?', 'morning', ['night', 'afternoon']],
      ['When is it dark outside?', 'night', ['day']],
      ['When do we play outside in the sun?', 'day', ['night']],
      ['When does the cock crow to wake us up?', 'morning', ['night', 'afternoon']],
      ['When do we eat supper?', 'evening', ['morning', 'afternoon']],
      ['When do we have lunch?', 'afternoon', ['morning', 'night']],
    ])
    const n = level <= 2 ? 2 : 3
    return choice(P, level, s, textOptions(rng, ans, wrong, Math.min(n, wrong.length + 1)), ans, { visual: ans === 'night' ? { kind: 'art', art: ['moon', 'star'] } : undefined, explain: `We do it in the ${ans}.` })
  }
  const i = rng.int(0, 6)
  if (level === 3)
    return rng.next() < 0.5
      ? choice(P, level, `Today is ${DAYS[i]}. What day is tomorrow?`, textOptions(rng, DAYS[(i + 1) % 7], DAYS, 3), DAYS[(i + 1) % 7], { explain: `After ${DAYS[i]} comes ${DAYS[(i + 1) % 7]}.` })
      : choice(P, level, `Today is ${DAYS[i]}. What day was yesterday?`, textOptions(rng, DAYS[(i + 6) % 7], DAYS, 3), DAYS[(i + 6) % 7], { explain: `Before ${DAYS[i]} comes ${DAYS[(i + 6) % 7]}.` })
  if (level === 4)
    return rng.next() < 0.5
      ? choice(P, level, `Which day comes before ${DAYS[i]}?`, textOptions(rng, DAYS[(i + 6) % 7], DAYS, 4), DAYS[(i + 6) % 7], { explain: `${DAYS[(i + 6) % 7]} comes before ${DAYS[i]}.` })
      : choice(P, level, `Which day comes after ${DAYS[i]}?`, textOptions(rng, DAYS[(i + 1) % 7], DAYS, 4), DAYS[(i + 1) % 7], { explain: `${DAYS[(i + 1) % 7]} comes after ${DAYS[i]}.` })
  if (rng.next() < 0.7) {
    const k = rng.int(2, 3)
    return choice(P, level, `Today is ${DAYS[i]}. Which day will it be in ${k === 2 ? 'two' : 'three'} days?`, textOptions(rng, DAYS[(i + k) % 7], DAYS, 4), DAYS[(i + k) % 7], { explain: `Count on ${k} days from ${DAYS[i]}: ${DAYS[(i + k) % 7]}.` })
  }
  return rng.next() < 0.5
    ? choice(P, level, 'How many days are in a week?', numberOptions(rng, 7, 4, 1, 12), '7', { explain: 'Monday to Sunday: seven days.' })
    : (() => {
        const rest = rng.pick(['Saturday', 'Sunday'])
        return choice(P, level, 'On which day do we stay home from school?', textOptions(rng, rest, DAYS.slice(0, 5), 4), rest, { explain: 'Saturday and Sunday are the weekend.' })
      })()
}

const COINS: [ArtId, number][] = [
  ['coin1', 1],
  ['coin5', 5],
  ['coin10', 10],
  ['coin20', 20],
]

export const moneyP = (_g: PP): Generator => (rng, level) => {
  if (level <= 2 && rng.next() < 0.4) {
    const [c, v] = rng.pick(COINS)
    return choice(P, level, `Find the ${numberWord(v)} shilling coin.`, artOptions(rng, c, COINS.map(([x]) => x), level === 1 ? 3 : 4), c, { explain: `It has ${v} on it.` })
  }
  if (level <= 2) {
    const [a, b] = rng.sample(COINS, 2)
    const more = rng.next() < 0.5
    const ans = (more ? a[1] > b[1] : a[1] < b[1]) ? a[0] : b[0]
    return choice(P, level, `Which coin is worth ${more ? 'more' : 'less'}?`, rng.shuffle([a[0], b[0]]).map((c) => ({ id: c, art: c })), ans, { explain: `Look at the number on each coin.` })
  }
  if (level === 3 && rng.next() < 0.6) {
    const v = rng.pick([1, 5, 10])
    const k = rng.int(2, 3)
    return choice(P, level, `${k === 2 ? 'Two' : 'Three'} ${v} shilling coins make how many shillings?`, numberOptions(rng, v * k, 4, 1, 35), String(v * k), { visual: { kind: 'money', values: Array(k).fill(v) }, explain: `${Array(k).fill(v).join(' + ')} = ${v * k}.` })
  }
  if (level === 3) {
    const [c, v] = rng.pick(COINS)
    return choice(P, level, 'How many shillings is this coin?', numberOptions(rng, v, 4, 1, 25), String(v), { visual: { kind: 'art', art: [c] }, explain: `It is ${an(v)} shilling coin.` })
  }
  if (level === 5 && rng.next() < 0.45) {
    const have = rng.pick([10, 20])
    const cost = rng.int(1, have - 1)
    const thing = rng.pick(['a sweet', 'a mandazi', 'a banana', 'an egg', 'a pencil', 'a book'])
    return choice(P, level, `You have ${have} shillings. You buy ${thing} for ${countOf(cost, 'shilling')}. How many shillings are left?`, numberOptions(rng, have - cost, 4, 0, 25), String(have - cost), { visual: { kind: 'money', values: [have] }, explain: `${have} take away ${cost} leaves ${have - cost}.` })
  }
  const vals = level === 4 ? [rng.pick([1, 5, 10, 20]), rng.pick([1, 5, 10, 20])] : [rng.pick([10, 20]), rng.pick([5, 10]), rng.pick([1, 5])]
  const total = vals.reduce((x, y) => x + y, 0)
  return choice(P, level, 'How many shillings altogether?', numberOptions(rng, total, 4, 1, 50), String(total), { visual: { kind: 'money', values: vals.sort((x, y) => y - x) }, explain: `${vals.join(' + ')} = ${total} shillings.` })
}

// ── Shapes, patterns and colours ────────────────────────────────────────────

const SHAPES: ShapeKind[] = ['circle', 'triangle', 'square', 'rectangle']
const COLORS: [string, string][] = [
  ['red', '#d64545'],
  ['blue', '#3f7fd1'],
  ['yellow', '#f2c53d'],
  ['green', '#3f9e5a'],
  ['orange', '#ee8a3a'],
  ['purple', '#8b5cc4'],
  ['pink', '#e88bb3'],
  ['brown', '#8a5a3b'],
  ['black', '#222222'],
  ['white', '#f4f1ea'],
]
const SHAPE_ART: [ShapeKind, ArtId, ArtId[]][] = [
  ['circle', 'ball', ['book', 'chair']],
  ['circle', 'orange', ['book', 'house']],
  ['circle', 'sun', ['book', 'bed']],
  ['rectangle', 'book', ['ball', 'orange']],
  ['rectangle', 'bed', ['ball', 'sun']],
  ['triangle', 'house', ['ball', 'orange']],
  ['circle', 'plate', ['book', 'bed']],
  ['circle', 'drum', ['book', 'house']],
  ['circle', 'coin10', ['book', 'bed']],
  ['circle', 'moon', ['book', 'house']],
  ['rectangle', 'bag', ['ball', 'orange']],
]

export const shapesP = (g: PP): Generator => (rng, level) => {
  const pool = g === 1 ? SHAPES.slice(0, 3) : SHAPES
  if (level <= 3) {
    const want = rng.pick(pool)
    const n = level === 1 ? 2 : 3
    const cols = rng.sample(COLORS.slice(0, 8), n)
    const kinds = [want, ...rng.sample(pool.filter((s) => s !== want), n - 1)]
    const opts = rng.shuffle(kinds.map((k, i) => ({ id: `${k}-${cols[i][0]}`, visual: { kind: 'shapes' as const, shapes: [{ kind: k, color: cols[i][1] }] } })))
    return choice(P, level, `Which one is ${an(want)}?`, opts, `${want}-${cols[0][0]}`, { explain: want === 'circle' ? 'A circle is round.' : `${An(want)} has straight sides.` })
  }
  if (level === 4 && rng.next() < 0.4) {
    const [k, n] = rng.pick<[ShapeKind, number]>([['triangle', 3], ['square', 4], ['rectangle', 4]])
    const what = rng.pick(['sides', 'corners'])
    return choice(P, level, `How many ${what} does ${an(k)} have?`, numberOptions(rng, n, 3, 0, 6), String(n), { visual: { kind: 'shapes', shapes: [{ kind: k, color: rng.pick(COLORS)[1] }] }, explain: `Count them with your finger: ${n}.` })
  }
  if (level === 4) {
    const [shape, ans, wrong] = rng.pick(SHAPE_ART.filter(([s]) => pool.includes(s)))
    return choice(P, level, `Which one looks like ${an(shape)}?`, artOptions(rng, ans, wrong, 3), ans, { explain: `${An(artName(ans))} looks like ${an(shape)}.` })
  }
  const list: ShapeSpec[] = Array.from({ length: rng.int(4, g === 1 ? 6 : 8) }, () => ({ kind: rng.pick(pool), color: rng.pick(COLORS)[1] }))
  const want = rng.pick(pool)
  if (!list.some((s) => s.kind === want)) list[0] = { kind: want, color: COLORS[0][1] }
  const n = list.filter((s) => s.kind === want).length
  return choice(P, level, `How many ${want}s can you see?`, numberOptions(rng, n, 4, 0, 9), String(n), { visual: { kind: 'shapes', shapes: list }, explain: `Count only the ${want}s: ${n}.` })
}

export const patternP = (g: PP): Generator => (rng, level) => {
  const pool = SHAPES
  const twoColour = level <= 2 || g === 1 || level === 3
  const kinds = rng.sample(pool, twoColour ? 2 : 3)
  const unit: ShapeSpec[] = twoColour || level === 4 ? kinds.slice(0, 2).map((k, i) => ({ kind: k, color: COLORS[i][1] })) : kinds.map((k, i) => ({ kind: k, color: COLORS[i][1] }))
  const unitAbb = level === 5 && g === 2 && rng.next() < 0.5 ? [unit[0], unit[1], unit[1]] : unit
  const len = level <= 2 ? 5 : 6
  const items = Array.from({ length: len }, (_, i) => unitAbb[i % unitAbb.length])
  const gap = level <= 2 ? len - 1 : rng.int(2, len - 1)
  const answer = items[gap]
  const wrong = pool.filter((k) => k !== answer.kind).slice(0, 2).map((k, i) => ({ kind: k, color: COLORS[i + 3][1] }))
  const opts = rng.shuffle([answer, ...wrong].map((s, i) => ({ id: i === 0 ? 'ok' : `w${i}`, visual: { kind: 'shapes' as const, shapes: [s] } })))
  return choice(P, level, level <= 2 ? 'What comes next?' : 'What goes in the empty space?', opts, 'ok', {
    visual: { kind: 'pattern', items: items.map((s, i) => (i === gap ? null : s)) },
    explain: 'Say the pattern out loud, then keep it going.',
  })
}

export const coloursP = (g: PP): Generator => (rng, level) => {
  const pool = g === 1 ? COLORS.slice(0, 6) : COLORS
  if (level <= 3) {
    const [name, hex] = rng.pick(pool)
    const others = rng.sample(pool.filter(([n]) => n !== name), level === 1 ? 1 : 2)
    const shape = rng.pick(SHAPES)
    const opts = rng.shuffle([[name, hex], ...others]).map(([n, h]) => ({ id: `${n}-${shape}`, visual: { kind: 'shapes' as const, shapes: [{ kind: shape, color: h }] } }))
    return choice(P, level, `Which one is ${name}?`, opts, `${name}-${shape}`, { explain: `This one is ${name}.` })
  }
  const [thing, colour, wrong] = rng.pick<[string, string, string[]]>([
    ['the sun', 'yellow', ['blue', 'black']],
    ['grass', 'green', ['red', 'white']],
    ['the sky on a sunny day', 'blue', ['brown', 'green']],
    ['milk', 'white', ['black', 'green']],
    ['charcoal', 'black', ['yellow', 'white']],
    ['a ripe tomato', 'red', ['blue', 'white']],
    ['a ripe banana', 'yellow', ['blue', 'purple']],
    ['leaves on a tree', 'green', ['red', 'purple']],
    ['soil', 'brown', ['blue', 'white']],
    ['a ripe orange', 'orange', ['blue', 'black']],
    ['snow on Mount Kenya', 'white', ['green', 'red']],
    ['a crow', 'black', ['yellow', 'green']],
  ])
  return choice(P, level, `What colour is ${thing}?`, textOptions(rng, colour, wrong, 3), colour, { explain: `${thing[0].toUpperCase()}${thing.slice(1)} is ${colour}.` })
}

// ── Language: letters, words and spelling ───────────────────────────────────

const ABC = 'abcdefghijklmnopqrstuvwxyz'.split('')
const PP1_LETTERS = 'abcdefghijklmnop'.split('')

export const lettersP = (g: PP): Generator => (rng, level) => {
  const pool = g === 1 ? PP1_LETTERS : ABC
  const l = rng.pick(pool)
  if (level <= 2) return choice(P, level, `Find the letter ${l}.`, textOptions(rng, l, pool, nOpts(level)), l, { say: `Find the letter ${l}.`, explain: `This is the letter ${l}.` })
  if (level === 3) return choice(P, level, `Find the big letter for ${l}.`, textOptions(rng, l.toUpperCase(), pool.map((x) => x.toUpperCase()), 3), l.toUpperCase(), { explain: `${l.toUpperCase()} and ${l} are the same letter.` })
  if (level === 4) return choice(P, level, `Find the small letter for ${l.toUpperCase()}.`, textOptions(rng, l, pool, 4), l, { explain: `${l.toUpperCase()} and ${l} are the same letter.` })
  const i = rng.int(0, pool.length - 2)
  return choice(P, level, `Which letter comes after ${pool[i]}?`, textOptions(rng, pool[i + 1], pool, 4), pool[i + 1], { visual: { kind: 'sequence', items: [pool[Math.max(0, i - 1)], pool[i], null] }, explain: `a, b, c… after ${pool[i]} comes ${pool[i + 1]}.` })
}

const WORDS: [ArtId, string][] = [
  ['cat', 'cat'],
  ['dog', 'dog'],
  ['hen', 'hen'],
  ['cup', 'cup'],
  ['pot', 'pot'],
  ['bed', 'bed'],
  ['bag', 'bag'],
  ['sun', 'sun'],
  ['egg', 'egg'],
  ['cow', 'cow'],
  ['jug', 'jug'],
  ['tap', 'tap'],
  ['ear', 'ear'],
  ['hoe', 'hoe'],
  ['fish', 'fish'],
  ['ball', 'ball'],
  ['book', 'book'],
  ['tree', 'tree'],
  ['goat', 'goat'],
  ['star', 'star'],
  ['moon', 'moon'],
  ['shoe', 'shoe'],
  ['drum', 'drum'],
  ['leaf', 'leaf'],
  ['bell', 'bell'],
  ['soap', 'soap'],
  ['comb', 'comb'],
  ['rock', 'rock'],
  ['rain', 'rain'],
  ['hand', 'hand'],
  ['seed', 'seed'],
  ['bird', 'bird'],
  ['lion', 'lion'],
]

export const wordsP = (_g: PP): Generator => (rng, level) => {
  const pool = level <= 2 ? WORDS.filter(([, w]) => w.length === 3) : WORDS
  const [art, word] = rng.pick(pool)
  if (level <= 4) return choice(P, level, 'Which word goes with the picture?', textOptions(rng, word, pool.map(([, w]) => w), nOpts(level)), word, { visual: { kind: 'art', art: [art] }, explain: `This is ${an(word)}: ${word.split('').join('-')}.` })
  return choice(P, level, `Read the word: ${word}. Which picture is it?`, artOptions(rng, art, pool.map(([a]) => a), 4), art, { explain: `${word.split('').join('-')} spells ${word}.` })
}

export const spellP = (_g: PP): Generator => (rng, level) => {
  const pool = level <= 3 ? WORDS.filter(([, w]) => w.length === 3) : WORDS
  const [art, word] = rng.pick(pool)
  const i = level <= 2 ? 0 : level === 3 ? 1 : rng.int(0, word.length - 1)
  const missing = word[i]
  const shown = word.split('').map((c, j) => (j === i ? '_' : c)).join(' ')
  return choice(P, level, `Which letter is missing? ${shown}`, textOptions(rng, missing, ABC, nOpts(level)), missing, { visual: { kind: 'art', art: [art] }, say: `Which letter is missing from ${word}?`, explain: `${word.split('').join('-')}: the missing letter is ${missing}.` })
}

// ── Fact tables for the activity areas ──────────────────────────────────────

export const myselfP = factGenerator({
  pairs: [
    {
      pairs: [
        ['eyes', 'see'],
        ['ears', 'hear'],
        ['nose', 'smell'],
        ['tongue', 'taste'],
        ['legs', 'walk'],
        ['hands', 'hold things'],
        ['teeth', 'chew food'],
      ],
      ask: (a) => `We use our ${a} to ___.`,
      askBack: (b) => `Which part of the body do we use to ${b}?`,
    },
  ],
  categories: [
    { one: 'a part of the head', many: 'parts of the head', items: ['eyes', 'ears', 'nose', 'mouth', 'hair'], set: 'b' },
    { one: 'a part of the leg', many: 'parts of the leg', items: ['knee', 'foot', 'toes', 'heel', 'ankle'], set: 'b' },
  ],
})

export const foodP = factGenerator({
  categories: [
    { one: 'a healthy snack', many: 'healthy snacks', items: ['banana', 'mango', 'orange', 'boiled egg', 'groundnuts', 'carrot'], set: 'f' },
    { one: 'a food to eat only a little of', many: 'foods to eat only a little of', items: ['sweets', 'soda', 'lollipop', 'chips', 'biscuits'], set: 'f' },
    { one: 'a fruit', many: 'fruits', items: ['mango', 'banana', 'orange', 'pawpaw', 'avocado', 'pineapple'], set: 'k' },
    { one: 'a vegetable', many: 'vegetables', items: ['sukuma wiki', 'cabbage', 'carrot', 'spinach', 'tomato', 'onion'], set: 'k' },
  ],
  pairs: [
    {
      pairs: [
        ['wash our hands', 'before we eat'],
        ['eat lunch', 'at midday'],
        ['eat breakfast', 'in the morning'],
        ['eat supper', 'in the evening'],
      ],
      ask: (a) => `When do we ${a}?`,
    },
  ],
})

export const safetyP = factGenerator({
  categories: [
    { one: 'a safe thing to play with', many: 'safe things to play with', items: ['a ball', 'a skipping rope', 'building blocks', 'a picture book', 'crayons'], set: 's' },
    { one: 'a thing only grown-ups should use', many: 'things only grown-ups should use', items: ['a knife', 'a jiko', 'medicine', 'a razor blade', 'a hot iron'], set: 's' },
    { one: 'a safe way to cross the road', many: 'safe ways to cross the road', items: ['hold a grown-up\'s hand', 'use the zebra crossing', 'look left and right', 'walk, do not run'], set: 'r' },
    { one: 'a person who keeps us safe', many: 'people who keep us safe', items: ['a teacher', 'a parent', 'a police officer', 'a nurse', 'a crossing guard'], set: 'p' },
    { one: 'a place to play safely', many: 'places to play safely', items: ['the school field', 'the playground', 'our compound', 'the classroom at break'], set: 'p2' },
    { one: 'a place not to play', many: 'places not to play', items: ['the road', 'near a river', 'near the fire', 'near electric wires'], set: 'p2' },
  ],
})

export const careP = factGenerator({
  categories: [
    { one: 'a way to care for our surroundings', many: 'ways to care for our surroundings', items: ['put litter in the bin', 'water the plants', 'close the tap', 'plant a tree', 'sweep the classroom'], set: 'c' },
    { one: 'a way to spoil our surroundings', many: 'ways to spoil our surroundings', items: ['throw papers on the ground', 'leave the tap running', 'pick the school flowers', 'step on young plants'], set: 'c' },
  ],
  pairs: [
    {
      pairs: [
        ['sweet wrappers', 'the dustbin'],
        ['dirty water', 'the drain'],
        ['fruit peels', 'the compost pit'],
      ],
      ask: (a) => `Where should we put ${a}?`,
      askBack: (b) => `What should we put in ${b}?`,
    },
  ],
})

export const prayerP = factGenerator({
  categories: [
    { one: 'a time to pray', many: 'times to pray', items: ['before we eat', 'before we sleep', 'when we wake up', 'in church', 'when someone is sick'], set: 'p' },
    { one: 'a kind thing to do', many: 'kind things to do', items: ['sharing toys', 'helping a friend', 'saying thank you', 'saying sorry', 'obeying parents'], set: 'k' },
    { one: 'an unkind thing to do', many: 'unkind things to do', items: ['grabbing toys', 'calling names', 'telling lies', 'refusing to share'], set: 'k' },
  ],
  pairs: [
    {
      pairs: [
        ['before we eat', 'thank God for our food'],
        ['before we sleep', 'ask God to keep us safe at night'],
        ['when we wake up', 'thank God for a new day'],
      ],
      ask: (a) => `What do we say to God ${a}?`,
      askBack: (b) => `When do we ${b}?`,
    },
  ],
})

/** Pre-primary makers that need nothing from other grades. */
export function preprimaryOwn(g: PP): Record<string, Generator> {
  const p = `p${g}`
  const out: Record<string, Generator> = {
    [`${p}m-sort`]: sortP(g),
    [`${p}m-match`]: matchP(g),
    [`${p}m-count`]: countP(g),
    [`${p}m-numerals`]: numeralP(g),
    [`${p}m-compare`]: compareP(g),
    [`${p}m-size`]: sizeP(g),
    [`${p}m-mass`]: massP(g),
    [`${p}m-capacity`]: capacityP(g),
    [`${p}m-time`]: timeP(g),
    [`${p}m-shapes`]: shapesP(g),
    [`${p}m-patterns`]: patternP(g),
    [`${p}e-letters`]: lettersP(g),
    [`${p}v-myself`]: myselfP,
    [`${p}v-food`]: foodP,
    [`${p}v-safety`]: safetyP,
    [`${p}v-care`]: careP,
    [`${p}c-colours`]: coloursP(g),
    [`${p}r-prayer`]: prayerP,
  }
  out[`${p}m-add`] = addP(g)
  if (g === 2) Object.assign(out, { 'p2m-sub': subP(2), 'p2m-money': moneyP(2), 'p2e-words': wordsP(2), 'p2e-spell': spellP(2) })
  return out
}
