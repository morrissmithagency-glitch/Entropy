// Procedural maths questions for Grade 1. Each generator takes a level (1 = Seed …
// 5 = Baobab) and returns a fresh question, so every paper is different while the
// difficulty stays controlled. Level 4–5 matches end-term paper standard.
import type { ArtId } from '../../components/art/objects'
import { artName } from '../../components/art/objects'
import { KENYAN_NAMES, artOptions, choice, numberOptions, numberWord, plural, textOptions, uid, countOf, An, an } from '../helpers'
import type { Generator, Level, NumberQuestion, Rng, ShapeKind, ShapeSpec } from '../types'

const COUNTABLE: ArtId[] = ['mango', 'orange', 'banana', 'egg', 'ball', 'pencil', 'book', 'cup', 'goat', 'hen', 'fish', 'bird', 'flower', 'star', 'leaf', 'tomato']

const num = (prefix: string, level: Level, prompt: string, answer: number, extra: Partial<NumberQuestion> = {}): NumberQuestion => ({
  id: uid(prefix),
  type: 'number',
  level,
  prompt,
  answer,
  ...extra,
})

/** Two-digit pair (a, b) whose ones and tens never need regrouping. */
function noRegroupAdd(rng: Rng, maxSum: number): [number, number] {
  for (;;) {
    const a = rng.int(10, maxSum - 1)
    const b = rng.int(1, maxSum - a)
    if ((a % 10) + (b % 10) < 10 && a + b <= maxSum) return [a, b]
  }
}

function noRegroupSub(rng: Rng, maxA: number): [number, number] {
  for (;;) {
    const a = rng.int(11, maxA)
    const b = rng.int(1, a - 1)
    if (a % 10 >= b % 10) return [a, b]
  }
}

// ── 1.1 Number concept ───────────────────────────────────────────────────────

const GROUPS: Record<string, ArtId[]> = {
  fruits: ['mango', 'orange', 'banana', 'tomato'],
  animals: ['goat', 'cow', 'hen', 'dog', 'cat'],
  school: ['pencil', 'book', 'bag', 'ball'],
  kitchen: ['cup', 'jug', 'spoon', 'plate', 'pot'],
  sky: ['sun', 'moon', 'star', 'cloud'],
}

export const numberConcept: Generator = (rng, level) => {
  if (level === 1) {
    const art = rng.pick(COUNTABLE)
    const odd = rng.pick(COUNTABLE.filter((a) => a !== art))
    const opts = rng.shuffle<ArtId>([art, art, art, odd]).map((a, i) => ({ id: `${a}-${i}`, art: a }))
    return choice('concept', level, 'Which one is different?', opts, opts.find((o) => o.art === odd)!.id, {
      explain: `The ${artName(odd)} is different. The others are all ${artName(art, 3)}.`,
    })
  }
  if (level === 2) {
    const [k1, k2] = rng.sample(Object.keys(GROUPS), 2)
    const members = rng.sample(GROUPS[k1], 3)
    const odd = rng.pick(GROUPS[k2])
    const opts = rng.shuffle<ArtId>([...members, odd]).map((a) => ({ id: a, art: a }))
    return choice('concept', level, 'Sort them! Which one does not belong to the group?', opts, odd, {
      explain: `The ${artName(odd)} does not belong. The others are ${k1 === 'school' ? 'things we use at school' : k1 === 'kitchen' ? 'things in the kitchen' : k1}.`,
    })
  }
  if (level === 3) {
    const art = rng.pick(COUNTABLE)
    const a = rng.int(3, 9)
    let b = rng.int(3, 9)
    while (Math.abs(a - b) < 1 || a === b) b = rng.int(3, 9)
    const askMore = rng.next() < 0.5
    const opts = [
      { id: 'A', visual: { kind: 'count' as const, art, n: a } },
      { id: 'B', visual: { kind: 'count' as const, art, n: b } },
    ]
    const answer = askMore === a > b ? 'A' : 'B'
    return choice('concept', level, `Which group has ${askMore ? 'more' : 'fewer'} ${artName(art, 2)}?`, opts, answer, {
      explain: `One group has ${a} and the other has ${b}. ${Math.max(a, b)} is more than ${Math.min(a, b)}.`,
    })
  }
  if (level === 4) {
    const start = rng.int(1, 20)
    const nums = rng.sample(Array.from({ length: 15 }, (_, i) => start + i), 4)
    const asc = [...nums].sort((x, y) => x - y)
    return {
      id: uid('concept'),
      type: 'order',
      level,
      prompt: 'Put the numbers in order, starting with the smallest.',
      tiles: nums.map(String),
      answer: asc.map(String),
      joiner: ', ',
      explain: `Smallest to largest: ${asc.join(', ')}.`,
    }
  }
  // Level 5: order bigger numbers from the largest, with digit-swap traps (e.g. 46 and 64).
  const t = rng.int(1, 8)
  const o = rng.int(t + 1, 9)
  const pool = [t * 10 + o, o * 10 + t, rng.int(10, 99), rng.int(10, 99)]
  const nums = [...new Set(pool)]
  while (nums.length < 4) {
    const n = rng.int(10, 99)
    if (!nums.includes(n)) nums.push(n)
  }
  const desc = [...nums].sort((x, y) => y - x)
  return {
    id: uid('concept'),
    type: 'order',
    level,
    prompt: 'Arrange from the largest to the smallest.',
    tiles: rng.shuffle(nums).map(String),
    answer: desc.map(String),
    joiner: ', ',
    explain: `Look at the tens first. Largest to smallest: ${desc.join(', ')}.`,
  }
}

// ── 1.2 Whole numbers ────────────────────────────────────────────────────────

export const wholeNumbers: Generator = (rng, level) => {
  const art = rng.pick(COUNTABLE)
  switch (level) {
    case 1: {
      const n = rng.int(2, 10)
      return choice('whole', level, `How many ${artName(art, 2)} are there?`, numberOptions(rng, n, 3, 1, 12), String(n), {
        visual: { kind: 'count', art, n },
        explain: `Point and count: there are ${n}.`,
      })
    }
    case 2: {
      const kind = rng.int(0, 2)
      if (kind === 0) {
        const n = rng.int(8, 20)
        return num('whole', level, `Count the ${artName(art, 2)}. Write the number.`, n, { visual: { kind: 'count', art, n }, explain: `There are ${n}. Count in fives to go faster!` })
      }
      const n = rng.int(2, 19)
      const after = kind === 1
      return num('whole', level, `What number comes just ${after ? 'after' : 'before'} ${n}?`, after ? n + 1 : n - 1, {
        visual: { kind: 'sequence', items: after ? [n, null] : [null, n] },
        explain: `${after ? `${n} + 1 = ${n + 1}` : `${n} − 1 = ${n - 1}`}.`,
      })
    }
    case 3: {
      const kind = rng.int(0, 3)
      if (kind === 0) {
        const step = rng.pick([1, 2])
        const start = rng.int(1, 40)
        const seq = [0, 1, 2, 3, 4].map((i) => start + i * step)
        const gap = rng.int(1, 3)
        return num('whole', level, 'Fill in the missing number.', seq[gap], {
          visual: { kind: 'sequence', items: seq.map((v, i) => (i === gap ? null : v)) },
          explain: `The numbers go up by ${step}. The missing number is ${seq[gap]}.`,
        })
      }
      if (kind === 1) {
        const n = rng.int(11, 48)
        return num('whole', level, `What number is between ${n} and ${n + 2}?`, n + 1, { explain: `${n}, ${n + 1}, ${n + 2}.` })
      }
      if (kind === 2) {
        const a = rng.int(10, 60)
        let b = rng.int(10, 60)
        while (b === a) b = rng.int(10, 60)
        const opts = rng.shuffle([a, b]).map((n) => ({ id: String(n), label: String(n) }))
        return choice('whole', level, 'Which number is greater?', opts, String(Math.max(a, b)), { explain: `${Math.max(a, b)} is greater than ${Math.min(a, b)}.` })
      }
      const n = rng.int(1, 20)
      const words = textOptions(rng, numberWord(n), [numberWord(n + 1), numberWord(Math.max(0, n - 1)), numberWord(n + 10 > 20 ? n - 2 : n + 10)], 3)
      return choice('whole', level, `Which word is the number ${n}?`, words, numberWord(n), { explain: `${n} is written "${numberWord(n)}".` })
    }
    case 4: {
      const kind = rng.int(0, 3)
      if (kind === 0) {
        const tens = rng.int(1, 9)
        const ones = rng.int(0, 9)
        return num('whole', level, 'How many altogether? Count the tens, then the ones.', tens * 10 + ones, {
          visual: { kind: 'tens', tens, ones },
          explain: `${countOf(tens, 'ten')} and ${countOf(ones, 'one')} make ${tens * 10 + ones}.`,
        })
      }
      if (kind === 1) {
        const t = rng.int(1, 9)
        const o = rng.int(1, 9)
        const n = t * 10 + o
        const askTens = rng.next() < 0.6
        const ans = askTens ? t * 10 : o
        const opts = rng.shuffle([String(t), String(t * 10), String(n), String(o)].filter((v, i, a) => a.indexOf(v) === i)).map((v) => ({ id: v, label: v }))
        return choice('whole', level, `What is the value of the digit ${askTens ? t : o} in ${n}?`, opts, String(ans), {
          explain: `In ${n}, ${t} is in the tens place (${t * 10}) and ${o} is in the ones place (${o}).`,
        })
      }
      if (kind === 2) {
        const step = rng.pick([5, 10])
        const start = step * rng.int(1, 6)
        const seq = [0, 1, 2, 3, 4].map((i) => start + i * step)
        const gap = rng.int(1, 4)
        return num('whole', level, `Count in ${step}s. Fill in the missing number.`, seq[gap], {
          visual: { kind: 'sequence', items: seq.map((v, i) => (i === gap ? null : v)) },
          explain: `Add ${step} each time: ${seq.join(', ')}.`,
        })
      }
      const n = rng.int(21, 99)
      const opts = numberOptions(rng, n, 4, 10, 99)
      return choice('whole', level, `Which number is "${numberWord(n)}"?`, opts, String(n), { say: `Which number is ${numberWord(n)}?`, explain: `${numberWord(n)} is ${n}.` })
    }
    default: {
      const kind = rng.int(0, 3)
      if (kind === 0) {
        const step = rng.pick([2, 5, 10])
        const start = rng.int(4, 9) * 10 + (step === 2 ? rng.int(0, 4) * 2 : 0)
        const seq = [0, 1, 2, 3, 4, 5].map((i) => start - i * step)
        const gap = rng.int(1, 4)
        return num('whole', level, 'The numbers count backwards. What is the missing number?', seq[gap], {
          visual: { kind: 'sequence', items: seq.map((v, i) => (i === gap ? null : v)) },
          explain: `Each number is ${step} less: ${seq.join(', ')}.`,
        })
      }
      if (kind === 1) {
        const t = rng.int(1, 9)
        const o = rng.int(0, 9)
        return num('whole', level, `What number has ${t} ${plural(t, 'ten', 'tens')} and ${o} ${plural(o, 'one', 'ones')}?`, t * 10 + o, { explain: `${countOf(t, 'ten')} = ${t * 10}, plus ${o} makes ${t * 10 + o}.` })
      }
      if (kind === 2) {
        const n = rng.int(12, 89)
        const more = rng.next() < 0.5
        return num('whole', level, `What is 10 ${more ? 'more' : 'less'} than ${n}?`, more ? n + 10 : n - 10, { explain: `Only the tens digit changes: ${more ? n + 10 : n - 10}.` })
      }
      const t = rng.int(2, 8)
      const o = rng.int(1, 9)
      const nums = [...new Set([t * 10 + o, o * 10 + t, t * 10 + o + 1, (t - 1) * 10 + 9])]
      const largest = Math.max(...nums)
      const opts = rng.shuffle(nums).map((n) => ({ id: String(n), label: String(n) }))
      return choice('whole', level, 'Which is the largest number?', opts, String(largest), { explain: `Compare the tens first. ${largest} is the largest.` })
    }
  }
}

// ── 1.3 Addition / 1.4 Subtraction ──────────────────────────────────────────

function word(rng: Rng, op: '+' | '−', a: number, b: number): string {
  const name = rng.pick(KENYAN_NAMES)
  const friend = rng.pick(KENYAN_NAMES.filter((n) => n !== name))
  const items = rng.pick<[string, string]>([
    ['mangoes', 'picked'],
    ['oranges', 'bought'],
    ['sweets', 'got'],
    ['pencils', 'had'],
    ['eggs', 'collected'],
  ])
  if (op === '+') {
    return rng.pick([
      `${name} had ${a} ${items[0]}. ${friend} gave ${name} ${b} more. How many ${items[0]} does ${name} have now?`,
      `There were ${a} people in a matatu. ${b} more got in at the next stage. How many people are in the matatu now?`,
      `A farmer has ${a} goats and ${b} sheep. How many animals does the farmer have altogether?`,
      `Class 1 East has ${a} learners. Class 1 West has ${b} learners. How many learners are there altogether?`,
    ])
  }
  return rng.pick([
    `${name} had ${a} ${items[0]}. ${name} gave ${friend} ${b}. How many ${items[0]} are left?`,
    `There were ${a} people in a matatu. ${b} got off at the stage. How many are still in the matatu?`,
    `Mama had ${a} eggs. ${b} eggs broke. How many eggs are not broken?`,
    `A tree had ${a} birds. ${countOf(b, 'bird')} flew away. How many birds stayed?`,
  ])
}

export const addition: Generator = (rng, level) => {
  switch (level) {
    case 1: {
      const art = rng.pick(COUNTABLE)
      const a = rng.int(1, 4)
      const b = rng.int(1, 5 - a)
      return choice('add', level, `${a} ${artName(art, a)} and ${b} more. How many altogether?`, numberOptions(rng, a + b, 3, 1, 10), String(a + b), {
        visual: { kind: 'groups', groups: [{ art, n: a }, { art, n: b }], joiner: '+' },
        explain: `${a} + ${b} = ${a + b}`,
      })
    }
    case 2: {
      const a = rng.int(1, 9)
      const b = rng.int(1, 10 - a)
      return num('add', level, 'Add.', a + b, { visual: { kind: 'sum', a, b, op: '+', result: null }, explain: `Start at ${a} and count on ${b}: ${a + b}.` })
    }
    case 3: {
      const kind = rng.int(0, 2)
      if (kind === 0) {
        const a = rng.int(3, 9)
        const b = rng.int(2, 9)
        return num('add', level, 'Add.', a + b, { visual: { kind: 'sum', a, b, op: '+', result: null }, explain: `${a} + ${b} = ${a + b}. Tip: make a ten first!` })
      }
      if (kind === 1) {
        const t = rng.int(1, 8) * 10
        const o = rng.int(1, 9)
        return num('add', level, 'Add.', t + o, { visual: { kind: 'sum', a: t, b: o, op: '+', result: null }, explain: `${t} + ${o} = ${t + o}` })
      }
      const total = rng.int(6, 10)
      const a = rng.int(1, total - 1)
      return num('add', level, 'What number is missing?', total - a, { visual: { kind: 'sum', a, b: -1, op: '+', result: total }, explain: `${a} + ${total - a} = ${total}` })
    }
    case 4: {
      let a: number, bb: number
      if (rng.next() < 0.4) {
        a = rng.int(11, 88)
        while (a % 10 === 9) a = rng.int(11, 88)
        bb = rng.int(1, 9 - (a % 10))
      } else [a, bb] = noRegroupAdd(rng, 99)
      return num('add', level, 'Work it out.', a + bb, { visual: { kind: 'sum', a, b: bb, op: '+', result: null, vertical: true }, explain: `Add the ones, then the tens: ${a} + ${bb} = ${a + bb}.` })
    }
    default: {
      const kind = rng.int(0, 2)
      if (kind === 0) {
        const [a, b] = noRegroupAdd(rng, 99)
        return num('add', level, word(rng, '+', a, b), a + b, { explain: `${a} + ${b} = ${a + b}` })
      }
      if (kind === 1) {
        const a = rng.int(1, 5)
        const b = rng.int(1, 5)
        const c = rng.int(1, 6)
        return num('add', level, `Add: ${a} + ${b} + ${c}`, a + b + c, { explain: `${a} + ${b} = ${a + b}, then + ${c} = ${a + b + c}.` })
      }
      const [a, b] = noRegroupAdd(rng, 99)
      return num('add', level, 'What number is missing?', b, { visual: { kind: 'sum', a, b: -1, op: '+', result: a + b }, explain: `${a + b} − ${a} = ${b}, so ${a} + ${b} = ${a + b}.` })
    }
  }
}

export const subtraction: Generator = (rng, level) => {
  switch (level) {
    case 1: {
      const art = rng.pick(COUNTABLE)
      const a = rng.int(3, 6)
      const b = rng.int(1, a - 1)
      return choice('sub', level, `There are ${a} ${artName(art, a)}. Take away ${b}. How many are left?`, numberOptions(rng, a - b, 3, 0, 10), String(a - b), {
        visual: { kind: 'groups', groups: [{ art, n: a }, { art, n: b }], joiner: '−' },
        explain: `${a} − ${b} = ${a - b}`,
      })
    }
    case 2: {
      const a = rng.int(4, 10)
      const b = rng.int(1, a)
      return num('sub', level, 'Subtract.', a - b, { visual: { kind: 'sum', a, b, op: '−', result: null }, explain: `Start at ${a} and count back ${b}: ${a - b}.` })
    }
    case 3: {
      const kind = rng.int(0, 2)
      if (kind === 0) {
        const a = rng.int(11, 19)
        const b = rng.int(1, a - 10)
        return num('sub', level, 'Subtract.', a - b, { visual: { kind: 'sum', a, b, op: '−', result: null }, explain: `${a} − ${b} = ${a - b}` })
      }
      if (kind === 1) {
        const a = rng.int(2, 9) * 10
        const b = rng.int(1, a / 10 - 1) * 10
        return num('sub', level, 'Subtract.', a - b, { visual: { kind: 'sum', a, b, op: '−', result: null }, explain: `${countOf(a / 10, 'ten')} − ${countOf(b / 10, 'ten')} = ${countOf((a - b) / 10, 'ten')} = ${a - b}.` })
      }
      const a = rng.int(6, 10)
      const b = rng.int(1, a - 1)
      return num('sub', level, 'What number is missing?', b, { visual: { kind: 'sum', a, b: -1, op: '−', result: a - b }, explain: `${a} − ${b} = ${a - b}` })
    }
    case 4: {
      const [a, b] = noRegroupSub(rng, 99)
      return num('sub', level, 'Work it out.', a - b, { visual: { kind: 'sum', a, b, op: '−', result: null, vertical: true }, explain: `Subtract the ones, then the tens: ${a} − ${b} = ${a - b}.` })
    }
    default: {
      const kind = rng.int(0, 2)
      if (kind === 0) {
        const [a, b] = noRegroupSub(rng, 99)
        return num('sub', level, word(rng, '−', a, b), a - b, { explain: `${a} − ${b} = ${a - b}` })
      }
      if (kind === 1) {
        const [a, b] = noRegroupSub(rng, 99)
        return num('sub', level, 'What number is missing?', b, { visual: { kind: 'sum', a, b: -1, op: '−', result: a - b }, explain: `${a} − ${a - b} = ${b}... so the missing number is ${b}.` })
      }
      const a = rng.int(15, 20)
      const b = rng.int(2, 6)
      const c = rng.int(1, 5)
      return num('sub', level, `Work out: ${a} − ${b} − ${c}`, a - b - c, { explain: `${a} − ${b} = ${a - b}, then − ${c} = ${a - b - c}.` })
    }
  }
}

// ── 2.1 Length / 2.2 Mass / 2.3 Capacity ────────────────────────────────────

export const length: Generator = (rng, level) => {
  if (level <= 2) {
    const art = rng.pick<ArtId>(['pencil', 'stick', 'tree'])
    const vertical = art === 'tree'
    const n = level === 1 ? 2 : 3
    const scales = rng.shuffle([0.55, 0.8, 1].slice(3 - n))
    const askBig = rng.next() < 0.5
    const word = vertical ? (askBig ? 'tallest' : 'shortest') : askBig ? 'longest' : 'shortest'
    const target = askBig ? Math.max(...scales) : Math.min(...scales)
    const opts = scales.map((s, i) => ({ id: String(i), visual: { kind: 'sizes' as const, art, scales: [s], axis: vertical ? ('y' as const) : ('x' as const) } }))
    const prompt = n === 2 ? `Which ${artName(art)} is ${word.replace('est', 'er')}?` : `Which ${artName(art)} is the ${word}?`
    return choice('length', level, prompt, opts, String(scales.indexOf(target)), {
      explain: `Compare the ends. Start them at the same line, then look at which goes further.`,
    })
  }
  if (level === 3) {
    const n = rng.int(3, 8)
    const unit = rng.pick<ArtId>(['clip', 'hand'])
    return num('length', level, `How many ${unit === 'clip' ? 'paper clips' : 'hand spans'} long is the stick?`, n, {
      visual: { kind: 'units', art: 'stick', unit, n },
      explain: `Count each ${unit === 'clip' ? 'clip' : 'hand span'}: ${n}.`,
    })
  }
  if (level === 4) {
    const a = rng.int(6, 15)
    const b = rng.int(2, a - 2)
    const [x, y] = rng.pick([
      ['the table', 'the desk'],
      ['the door', 'the window'],
      ['the blackboard', 'the cupboard'],
    ])
    return num('length', level, `${x[0].toUpperCase() + x.slice(1)} is ${a} hand spans long. ${y[0].toUpperCase() + y.slice(1)} is ${b} hand spans long. How many hand spans longer is ${x}?`, a - b, {
      explain: `${a} − ${b} = ${a - b} hand spans.`,
    })
  }
  const kind = rng.int(0, 1)
  if (kind === 0) {
    const name = rng.pick(KENYAN_NAMES)
    const a = rng.int(12, 20)
    const b = rng.int(3, 9)
    return num('length', level, `${name} had a rope ${a} sticks long. ${name} cut off ${b} sticks. How long is the rope now?`, a - b, { explain: `${a} − ${b} = ${a - b} sticks long.` })
  }
  const opts = textOptions(rng, 'footsteps', ['paper clips', 'pencils', 'beans'], 3)
  return choice('length', level, 'Which is the best unit for measuring the length of the classroom?', opts, 'footsteps', {
    explain: 'The classroom is big, so a bigger unit like footsteps is best. Paper clips would take too long!',
  })
}

const HEAVY_LIGHT: [ArtId, ArtId][] = [
  ['stone', 'feather'],
  ['pumpkin', 'leaf'],
  ['cow', 'hen'],
  ['elephant', 'goat'],
  ['bucket', 'cup'],
  ['book', 'pencil'],
  ['jerrycan', 'spoon'],
]

export const mass: Generator = (rng, level) => {
  if (level <= 2) {
    const [heavy, light] = rng.pick(HEAVY_LIGHT)
    const heavyLeft = rng.next() < 0.5
    const askHeavy = level === 1 ? true : rng.next() < 0.5
    const opts = [heavy, light].map((a) => ({ id: a, art: a }))
    return choice('mass', level, level === 1 ? 'Look at the balance. Which one is heavier?' : `Which one is ${askHeavy ? 'heavier' : 'lighter'}?`, rng.shuffle(opts), askHeavy ? heavy : light, {
      visual: level === 1 ? { kind: 'balance', left: heavyLeft ? heavy : light, right: heavyLeft ? light : heavy, heavier: heavyLeft ? 'left' : 'right' } : { kind: 'art', art: [heavy, light] },
      explain: level === 1 ? 'The heavier side goes down.' : `${An(artName(heavy))} is heavier than ${an(artName(light))}.`,
    })
  }
  if (level === 3) {
    const sets: ArtId[][] = [
      ['elephant', 'goat', 'hen'],
      ['jerrycan', 'book', 'feather'],
      ['pumpkin', 'orange', 'leaf'],
      ['cow', 'dog', 'bird'],
    ]
    const set = rng.pick(sets)
    const names = set.map((a) => artName(a))
    return {
      id: uid('mass'),
      type: 'order',
      level,
      prompt: 'Arrange from the heaviest to the lightest.',
      tiles: rng.shuffle(names),
      answer: names,
      joiner: ', ',
      visual: { kind: 'art', art: rng.shuffle(set) },
      explain: `Heaviest to lightest: ${names.join(', ')}.`,
    }
  }
  if (level === 4) {
    const n = rng.int(3, 9)
    const [thing, unit] = rng.pick<[string, string]>([
      ['pumpkin', 'oranges'],
      ['bag of beans', 'stones'],
      ['pot', 'cups'],
    ])
    return num('mass', level, `${An(thing)} balances ${n} ${unit}. Two ${thing}s will balance how many ${unit}?`, n * 2, { explain: `${n} + ${n} = ${n * 2}.` })
  }
  const a = rng.int(8, 16)
  const b = rng.int(3, a - 2)
  return num('mass', level, `A bag of maize balances ${a} stones. A bag of beans balances ${b} stones. How many more stones does the maize balance?`, a - b, {
    explain: `${a} − ${b} = ${a - b} more stones, so the maize is heavier.`,
  })
}

const BIG_SMALL: [ArtId, ArtId][] = [
  ['bucket', 'cup'],
  ['jerrycan', 'glass'],
  ['basin', 'spoonful'],
  ['pot', 'cup'],
  ['jug', 'spoon'],
]

export const capacity: Generator = (rng, level) => {
  if (level <= 2) {
    const [big, small] = rng.pick(BIG_SMALL)
    const askMore = level === 1 ? true : rng.next() < 0.5
    const opts = rng.shuffle([big, small]).map((a) => ({ id: a, art: a }))
    return choice('cap', level, `Which one holds ${askMore ? 'more' : 'less'} water?`, opts, askMore ? big : small, {
      explain: `${An(big === 'spoonful' ? 'basin' : big)} holds more water than ${an(small === 'spoonful' ? 'spoon' : small)}.`,
    })
  }
  if (level === 3) {
    const n = rng.int(2, 8)
    return num('cap', level, 'How many cups of water fill the jug?', n, { visual: { kind: 'units', art: 'jug', unit: 'cup', n }, explain: `${n} cups fill the jug.` })
  }
  if (level === 4) {
    const a = rng.int(6, 12)
    const b = rng.int(2, a - 1)
    return num('cap', level, `A jerrycan fills ${a} jugs. A bucket fills ${b} jugs. How many more jugs does the jerrycan fill?`, a - b, { explain: `${a} − ${b} = ${a - b}.` })
  }
  const a = rng.int(2, 6)
  const b = rng.int(2, 6)
  const c = rng.int(1, a + b - 1)
  return num('cap', level, `Mama fetched ${a} jerrycans of water in the morning and ${b} in the evening. She used ${c} for cooking. How many jerrycans are left?`, a + b - c, {
    explain: `${a} + ${b} = ${a + b}, then ${a + b} − ${c} = ${a + b - c}.`,
  })
}

// ── 2.4 Time ────────────────────────────────────────────────────────────────

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const dayAt = (i: number) => DAYS[((i % 7) + 7) % 7]

export const time: Generator = (rng, level) => {
  if (level === 1) {
    const q = rng.pick<[string, string]>([
      ['We see the sun rise in the …', 'morning'],
      ['We go to sleep at …', 'night'],
      ['We see the moon and stars at …', 'night'],
      ['We eat breakfast in the …', 'morning'],
      ['We eat lunch in the …', 'afternoon'],
    ])
    return choice('time', level, q[0], textOptions(rng, q[1], ['morning', 'afternoon', 'night']), q[1], { visual: q[1] === 'night' ? { kind: 'art', art: ['moon', 'star'] } : { kind: 'art', art: ['sun'] } })
  }
  if (level === 2) {
    const i = rng.int(0, 6)
    const ask = rng.pick(['tomorrow', 'yesterday'] as const)
    const ans = ask === 'tomorrow' ? dayAt(i + 1) : dayAt(i - 1)
    return choice('time', level, `Today is ${DAYS[i]}. What day ${ask === 'tomorrow' ? 'will it be tomorrow' : 'was it yesterday'}?`, textOptions(rng, ans, [dayAt(i + 1), dayAt(i - 1), DAYS[i], dayAt(i + 2)]), ans, {
      explain: `${dayAt(i - 1)} → ${DAYS[i]} → ${dayAt(i + 1)}.`,
    })
  }
  if (level === 3) {
    const kind = rng.int(0, 2)
    if (kind === 2) return num('time', level, 'How many days are in one week?', 7, { explain: 'Monday to Sunday: 7 days.' })
    const i = rng.int(0, 6)
    const after = kind === 0
    const ans = after ? dayAt(i + 1) : dayAt(i - 1)
    return choice('time', level, `Which day comes just ${after ? 'after' : 'before'} ${DAYS[i]}?`, textOptions(rng, ans, DAYS, 4), ans, { explain: `The days go ${dayAt(i - 1)}, ${DAYS[i]}, ${dayAt(i + 1)}.` })
  }
  if (level === 4) {
    if (rng.next() < 0.6) {
      const h = rng.int(1, 12)
      const opts = textOptions(rng, `${h} o'clock`, [h % 12 + 1, ((h + 10) % 12) + 1, 12 - h || 6, ((h + 5) % 12) + 1].map((x) => `${x} o'clock`), 3)
      return choice('time', level, 'What time does the clock show?', opts, `${h} o'clock`, { visual: { kind: 'clock', hour: h }, explain: `The long hand is on 12 and the short hand is on ${h}: ${h} o'clock.` })
    }
    const i = rng.int(0, 6)
    const ans = dayAt(i + 2)
    return choice('time', level, `What day is two days after ${DAYS[i]}?`, textOptions(rng, ans, DAYS, 4), ans, { explain: `${DAYS[i]} → ${dayAt(i + 1)} → ${ans}.` })
  }
  const kind = rng.int(0, 2)
  if (kind === 0) {
    const h = rng.int(1, 9)
    const k = rng.int(1, 3)
    return num('time', level, `The clock shows ${h} o'clock. What time will it be ${k} ${plural(k, 'hour', 'hours')} later? (Write the number)`, h + k, {
      visual: { kind: 'clock', hour: h },
      explain: `${h} + ${k} = ${h + k} o'clock.`,
    })
  }
  if (kind === 1) {
    const i = rng.int(0, 6)
    const ans = dayAt(i - 2)
    const name = rng.pick(KENYAN_NAMES)
    return choice('time', level, `Today is ${DAYS[i]}. ${name} went to the market the day before yesterday. Which day was that?`, textOptions(rng, ans, DAYS, 4), ans, {
      explain: `Yesterday was ${dayAt(i - 1)}, so the day before yesterday was ${ans}.`,
    })
  }
  const ans = rng.pick(['Saturday', 'Sunday'])
  return choice('time', level, 'We do not go to school on two days of the week. Which is one of them?', textOptions(rng, ans, DAYS.slice(0, 5), 4), ans, { explain: 'Saturday and Sunday are the weekend.' })
}

// ── 2.5 Money ───────────────────────────────────────────────────────────────

const COIN_ART: Record<number, ArtId> = { 1: 'coin1', 5: 'coin5', 10: 'coin10', 20: 'coin20', 50: 'note50', 100: 'note100' }

export const money: Generator = (rng, level) => {
  if (level === 1) {
    const v = rng.pick([1, 5, 10, 20, 50])
    const opts = artOptions(rng, COIN_ART[v], [1, 5, 10, 20, 50, 100].map((x) => COIN_ART[x]), 3)
    return choice('money', level, `Which one is ${v} ${plural(v, 'shilling', 'shillings')}?`, opts, COIN_ART[v], { explain: `Look for the number ${v}.` })
  }
  if (level === 2) {
    const [a, b] = rng.pick([[5, 1], [10, 5], [10, 10], [20, 5], [10, 1], [20, 10]])
    return choice('money', level, 'How much money is this altogether?', numberOptions(rng, a + b, 3, 1, 50).map((o) => ({ ...o, label: `${o.label} sh` })), String(a + b), {
      visual: { kind: 'money', values: [a, b] },
      explain: `${a} + ${b} = ${a + b} shillings.`,
    })
  }
  if (level === 3) {
    const values = rng.sample([1, 5, 5, 10, 10, 20], rng.int(3, 4))
    const total = values.reduce((s, v) => s + v, 0)
    return num('money', level, 'Count the money. How many shillings?', total, { visual: { kind: 'money', values: values.sort((x, y) => y - x) }, explain: `${values.join(' + ')} = ${total} shillings.` })
  }
  if (level === 4) {
    const [item, price] = rng.pick<[string, number]>([
      ['a mandazi', 10],
      ['a pencil', 20],
      ['an exercise book', 30],
      ['a packet of milk', 40],
      ['a sweet', 5],
    ])
    const have = price < 50 ? 50 : 100
    return num('money', level, `${rng.pick(KENYAN_NAMES)} had ${have} shillings and bought ${item} for ${price} shillings. What was the balance?`, have - price, {
      visual: { kind: 'money', values: [have] },
      explain: `Balance = ${have} − ${price} = ${have - price} shillings.`,
    })
  }
  const kind = rng.int(0, 1)
  if (kind === 0) {
    const a = rng.pick([10, 20, 15, 25])
    const b = rng.pick([20, 30, 10, 40])
    return num('money', level, `A mango costs ${a} shillings and an avocado costs ${b} shillings. Wanjiku paid with a 100 shilling note. What balance did she get?`, 100 - a - b, {
      explain: `${a} + ${b} = ${a + b}. 100 − ${a + b} = ${100 - a - b} shillings.`,
    })
  }
  const target = rng.pick([15, 25, 30, 35])
  const right = target === 15 ? [10, 5] : target === 25 ? [20, 5] : target === 30 ? [20, 10] : [20, 10, 5]
  const wrong1 = right.map((v, i) => (i === 0 ? (v === 20 ? 10 : 20) : v))
  const wrong2 = [...right, 5]
  const opts = rng.shuffle([
    { id: 'right', visual: { kind: 'money' as const, values: right } },
    { id: 'w1', visual: { kind: 'money' as const, values: wrong1 } },
    { id: 'w2', visual: { kind: 'money' as const, values: wrong2 } },
  ])
  return choice('money', level, `Which coins make exactly ${target} shillings?`, opts, 'right', { explain: `${right.join(' + ')} = ${target}.` })
}

// ── 3.1 Lines / 3.2 Shapes ──────────────────────────────────────────────────

type LineKind = 'straight' | 'curved'

export const lines: Generator = (rng, level) => {
  if (level <= 2) {
    const want: LineKind = level === 1 ? 'straight' : rng.pick(['straight', 'curved'] as const)
    const other: LineKind = want === 'straight' ? 'curved' : 'straight'
    const opts = rng.shuffle([
      { id: 'a', visual: { kind: 'lines' as const, lines: [want], variant: rng.int(0, 3) } },
      { id: 'b', visual: { kind: 'lines' as const, lines: [other], variant: 0 } },
      { id: 'c', visual: { kind: 'lines' as const, lines: [other], variant: 1 } },
    ])
    return choice('lines', level, `Which is ${an(want)} line?`, opts, 'a', { explain: want === 'straight' ? 'A straight line does not bend.' : 'A curved line bends like a rainbow.' })
  }
  if (level === 3) {
    const ls = Array.from({ length: rng.int(4, 7) }, () => rng.pick(['straight', 'curved'] as const))
    if (!ls.includes('straight')) ls[0] = 'straight'
    const want = rng.pick(['straight', 'curved'] as const)
    const n = ls.filter((l) => l === want).length
    return num('lines', level, `How many ${want} lines are there?`, n, { visual: { kind: 'lines', lines: ls }, explain: `There are ${n} ${want} lines.` })
  }
  if (level === 4) {
    const q = rng.pick<[string, string, string[]]>([
      ['Which letter is made of straight lines only?', 'E', ['O', 'S', 'C']],
      ['Which letter is made of curved lines only?', 'O', ['T', 'L', 'E']],
      ['Which number has only a straight line?', '1', ['3', '8', '0']],
      ['Which letter has a straight line and a curved line?', 'D', ['O', 'L', 'T']],
    ])
    return choice('lines', level, q[0], textOptions(rng, q[1], q[2], 4), q[1], { explain: `${q[1]} is the answer. Trace it with your finger to check!` })
  }
  const shape = rng.pick<[ShapeKind, number]>([
    ['triangle', 3],
    ['square', 4],
    ['rectangle', 4],
  ])
  const k = rng.int(2, 3)
  return num('lines', level, `How many straight lines are needed to draw ${k} ${shape[0]}s?`, shape[1] * k, {
    visual: { kind: 'shapes', shapes: Array.from({ length: k }, () => ({ kind: shape[0] })) },
    explain: `One ${shape[0]} has ${shape[1]} straight lines. ${k} × ${shape[1]} = ${shape[1] * k}.`,
  })
}

const SHAPES: ShapeKind[] = ['circle', 'triangle', 'rectangle', 'square']
const SHAPE_COLORS = ['#c8553d', '#2f7d72', '#f2b33d', '#3f8fa3']
const SIDES: Record<ShapeKind, number> = { circle: 0, oval: 0, triangle: 3, rectangle: 4, square: 4 }

export const shapes: Generator = (rng, level) => {
  if (level === 1) {
    const want = rng.pick(SHAPES)
    const opts = rng.shuffle(rng.sample(SHAPES.filter((s) => s !== want), 2).concat(want)).map((k, i) => ({ id: k, visual: { kind: 'shapes' as const, shapes: [{ kind: k, color: SHAPE_COLORS[i] }] } }))
    return choice('shapes', level, `Which one is ${an(want)}?`, opts, want, { explain: `This is ${an(want)}${SIDES[want] ? ` — it has ${SIDES[want]} sides` : ' — it is round'}.` })
  }
  if (level === 2) {
    if (rng.next() < 0.5) {
      const k = rng.pick<ShapeKind>(['triangle', 'rectangle', 'square'])
      return num('shapes', level, `How many sides does ${an(k)} have?`, SIDES[k], { visual: { kind: 'shapes', shapes: [{ kind: k, color: rng.pick(SHAPE_COLORS) }] }, explain: `${An(k)} has ${SIDES[k]} sides.` })
    }
    const [want, ans, wrong] = rng.pick<[string, ArtId, ArtId[]]>([
      ['circle', 'orange', ['book', 'pencil', 'house']],
      ['rectangle', 'book', ['ball', 'orange', 'egg']],
      ['circle', 'ball', ['book', 'bag', 'stool']],
    ])
    return choice('shapes', level, `Which object is shaped like ${an(want)}?`, artOptions(rng, ans, wrong), ans, { explain: `${An(artName(ans))} looks like ${an(want)}.` })
  }
  if (level === 3) {
    const list: ShapeSpec[] = Array.from({ length: rng.int(6, 9) }, () => ({ kind: rng.pick(SHAPES), color: rng.pick(SHAPE_COLORS) }))
    const want = rng.pick(SHAPES)
    if (!list.some((s) => s.kind === want)) list[rng.int(0, list.length - 1)] = { kind: want, color: SHAPE_COLORS[0] }
    const n = list.filter((s) => s.kind === want).length
    return num('shapes', level, `How many ${want}s can you see?`, n, { visual: { kind: 'shapes', shapes: list }, explain: `Count only the ${want}s: ${n}.` })
  }
  // Pattern: level 4 = AB, level 5 = ABB / ABC with colour as well as shape.
  const unit: ShapeSpec[] =
    level === 4
      ? rng.sample(SHAPES, 2).map((k, i) => ({ kind: k, color: SHAPE_COLORS[i] }))
      : rng.next() < 0.5
        ? (() => {
            const [a, b] = rng.sample(SHAPES, 2)
            return [{ kind: a, color: SHAPE_COLORS[0] }, { kind: b, color: SHAPE_COLORS[1] }, { kind: b, color: SHAPE_COLORS[1] }]
          })()
        : rng.sample(SHAPES, 3).map((k, i) => ({ kind: k, color: SHAPE_COLORS[i] }))
  const len = level === 4 ? 6 : unit.length * 2 + 1
  const items = Array.from({ length: len }, (_, i) => unit[i % unit.length])
  const gap = len - 1 - (level === 5 ? rng.int(0, 1) : 0)
  const answer = items[gap]
  const wrongs = SHAPES.filter((k) => k !== answer.kind).slice(0, 2).map((k, i) => ({ kind: k, color: SHAPE_COLORS[(i + 2) % 4] }))
  if (level === 5) wrongs[1] = { kind: answer.kind, color: SHAPE_COLORS.find((c) => c !== answer.color)! }
  const opts = rng.shuffle([answer, ...wrongs].map((s, i) => ({ id: i === 0 ? 'ok' : `w${i}`, visual: { kind: 'shapes' as const, shapes: [s] } })))
  return choice('shapes', level, 'What comes in the empty space?', opts, 'ok', {
    visual: { kind: 'pattern', items: items.map((s, i) => (i === gap ? null : s)) },
    explain: 'Find the part that repeats, then keep the pattern going.',
  })
}

export const MATH_GENERATORS: Record<string, Generator> = {
  'm-concept': numberConcept,
  'm-whole': wholeNumbers,
  'm-add': addition,
  'm-sub': subtraction,
  'm-length': length,
  'm-mass': mass,
  'm-capacity': capacity,
  'm-time': time,
  'm-money': money,
  'm-lines': lines,
  'm-shapes': shapes,
}
