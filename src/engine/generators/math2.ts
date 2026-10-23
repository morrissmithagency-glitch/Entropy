// Grade 2 maths. Numbers to 100; adding and taking away within 100, carrying from Sapling
// up; equal groups of 2, 5 and 10; halves and quarters; metres, kilograms, litres, the
// clock and Kenyan money to 100 shillings. Baobab level matches Grade 2 end-term papers.
import type { ArtId } from '../../components/art/objects'
import { artName } from '../../components/art/objects'
import { artOptions, choice, KENYAN_NAMES, numberOptions, numberWord, textOptions, uid, countOf, An, an } from '../helpers'
import type { Generator, Level, NumberQuestion, Option, Rng, ShapeKind } from '../types'
import { DAYS } from './math'

const num = (level: Level, prompt: string, answer: number, extra: Partial<NumberQuestion> = {}): NumberQuestion => ({
  id: uid('m2'),
  type: 'number',
  level,
  prompt,
  answer,
  ...extra,
})
const name = (rng: Rng) => rng.pick(KENYAN_NAMES)
const ORD = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth']
const COUNTABLE: ArtId[] = ['mango', 'orange', 'egg', 'ball', 'pencil', 'book', 'cup', 'goat', 'hen', 'fish', 'tomato', 'banana']
const ROW: ArtId[] = ['goat', 'cow', 'hen', 'fish', 'bird', 'tree', 'ball', 'drum', 'book', 'cup', 'mango', 'dog', 'cat']
const artOpts = (ids: ArtId[]): Option[] => ids.map((a) => ({ id: a, art: a, label: artName(a) }))
const cmp = (): Option[] => ['<', '>', '='].map((x) => ({ id: x, label: x }))

// ── 1.1 Number concept ──────────────────────────────────────────────────────

export const concept2: Generator = (rng, level) => {
  switch (level) {
    case 1: {
      const a = rng.pick(COUNTABLE)
      const n = rng.int(3, 9)
      let m = rng.int(3, 9)
      while (m === n) m = rng.int(3, 9)
      const b = rng.pick(COUNTABLE.filter((x) => x !== a))
      const more = n > m ? a : b
      return choice('m2', level, `Which group has MORE?`, artOpts([a, b]), more, {
        visual: { kind: 'groups', groups: [{ art: a, n }, { art: b, n: m }], joiner: 'vs' },
        explain: `${Math.max(n, m)} is more than ${Math.min(n, m)}.`,
      })
    }
    case 2: {
      const a = rng.int(10, 50)
      let b = rng.int(10, 50)
      while (b === a) b = rng.int(10, 50)
      const ans = a > b ? '>' : '<'
      return choice('m2', level, `Choose the sign: ${a} ___ ${b}`, cmp(), ans, { explain: `${a} is ${a > b ? 'greater' : 'less'} than ${b}.` })
    }
    case 3: {
      const row = rng.sample(ROW, 6)
      const i = rng.int(0, 5)
      return choice('m2', level, `Which picture is ${ORD[i]} from the left?`, artOpts(rng.shuffle([row[i], ...rng.sample(row.filter((x) => x !== row[i]), 2)])), row[i], {
        visual: { kind: 'art', art: row },
        explain: `Count from the left: the ${ORD[i]} is the ${artName(row[i])}.`,
      })
    }
    case 4: {
      const nums = rng.sample(Array.from({ length: 90 }, (_, i) => i + 10), 4)
      const asc = rng.next() < 0.5
      return {
        id: uid('m2'),
        type: 'order',
        level,
        prompt: `Arrange from the ${asc ? 'smallest to the biggest' : 'biggest to the smallest'}.`,
        tiles: rng.shuffle(nums.map(String)),
        answer: [...nums].sort((x, y) => (asc ? x - y : y - x)).map(String),
        joiner: ', ',
        explain: 'Compare the tens first, then the ones.',
      }
    }
    default: {
      if (rng.next() < 0.5) {
        const n = rng.int(6, 10)
        const k = rng.int(2, n - 1)
        return num(level, `${n} children stand in a line. Baraka is ${ORD[k - 1]} from the front. How many children are behind him?`, n - k, { explain: `${n} − ${k} = ${n - k}.` })
      }
      const t = rng.int(1, 9) * 10
      const o = rng.int(1, 9)
      const other = rng.pick([t + o, t + o + 1, t + o - 1, o * 10 + t / 10])
      const ans = t + o > other ? '>' : t + o < other ? '<' : '='
      return choice('m2', level, `Choose the sign: ${t} + ${o} ___ ${other}`, cmp(), ans, { explain: `${t} + ${o} = ${t + o}, so ${t + o} ${ans} ${other}.` })
    }
  }
}

// ── 1.2 Whole numbers ───────────────────────────────────────────────────────

export const whole2: Generator = (rng, level) => {
  const n = rng.int(11, 99)
  const t = Math.floor(n / 10)
  const o = n % 10
  switch (level) {
    case 1:
      return num(level, 'How many sticks are there?', t * 10 + o, { visual: { kind: 'tens', tens: t, ones: o }, explain: `${countOf(t, 'bundle')} of ten and ${countOf(o, 'one')} make ${n}.` })
    case 2: {
      if (rng.next() < 0.5) {
        const ask = rng.pick(['tens', 'ones'] as const)
        return num(level, `How many ${ask} are in ${n}?`, ask === 'tens' ? t : o, { explain: `${n} = ${countOf(t, 'ten')} and ${countOf(o, 'one')}.` })
      }
      const step = rng.pick([1, 2, 5, 10])
      const start = step === 1 ? rng.int(10, 90) : step * rng.int(1, Math.floor(80 / step))
      const seq = [0, 1, 2, 3, 4].map((i) => start + i * step)
      const gap = rng.int(1, 4)
      return num(level, 'Fill in the missing number.', seq[gap], { visual: { kind: 'sequence', items: seq.map((v, i) => (i === gap ? null : v)) }, explain: `The numbers go up by ${step}.` })
    }
    case 3: {
      const r = rng.next()
      if (r < 0.35) return choice('m2', level, `Which number is "${numberWord(n)}"?`, numberOptions(rng, n, 3, 10, 99), String(n), { explain: `${numberWord(n)} is ${n}.` })
      const safe = (x: number) => (x >= 11 && x <= 99 ? x : n > 50 ? n - 11 : n + 11)
      if (r < 0.7) return choice('m2', level, `How do we write ${n} in words?`, textOptions(rng, numberWord(n), [numberWord(safe(o * 10 + t)), numberWord(safe(n + 1)), numberWord(safe(n - 10))]), numberWord(n), { explain: `${n} = ${numberWord(n)}.` })
      const odd = rng.next() < 0.5
      const pick = odd ? 2 * rng.int(5, 49) + 1 : 2 * rng.int(5, 49)
      const wrong = [pick + 1, pick - 1, pick + 3].map(String)
      return choice('m2', level, `Which number is ${odd ? 'ODD' : 'EVEN'}?`, textOptions(rng, String(pick), wrong, 3), String(pick), { explain: odd ? 'Odd numbers end in 1, 3, 5, 7 or 9.' : 'Even numbers end in 0, 2, 4, 6 or 8.' })
    }
    case 4: {
      const r = rng.next()
      if (r < 0.4) {
        const a = rng.int(20, 97)
        const kind = rng.pick(['before', 'after', 'between'] as const)
        if (kind === 'before') return num(level, `What number comes just before ${a}?`, a - 1)
        if (kind === 'after') return num(level, `What number comes just after ${a}?`, a + 1)
        return num(level, `What number is between ${a - 1} and ${a + 1}?`, a)
      }
      if (r < 0.7) return num(level, `${countOf(t, 'ten')} and ${countOf(o, 'one')} make what number?`, n, { explain: `${t * 10} + ${o} = ${n}.` })
      return num(level, `What is the value of the digit ${t} in ${n}?`, t * 10, { explain: `In ${n}, ${t} is in the tens place: ${t * 10}.` })
    }
    default: {
      const r = rng.next()
      if (r < 0.35) {
        const step = rng.pick([2, 5, 10])
        const start = rng.int(60, 99 - step * 4)
        const s0 = start - (start % step)
        const seq = [0, 1, 2, 3, 4].map((i) => s0 + step * 4 - i * step)
        const gap = rng.int(1, 4)
        return num(level, 'The numbers count backwards. Fill in the missing number.', seq[gap], { visual: { kind: 'sequence', items: seq.map((v, i) => (i === gap ? null : v)) }, explain: `They go down by ${step}.` })
      }
      if (r < 0.7) {
        const [a, b] = rng.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 2)
        const big = rng.next() < 0.5
        const ans = big ? Math.max(a, b) * 10 + Math.min(a, b) : Math.min(a, b) * 10 + Math.max(a, b)
        return num(level, `Use the digits ${a} and ${b} once each. What is the ${big ? 'biggest' : 'smallest'} number you can make?`, ans, { explain: big ? 'Put the bigger digit in the tens place.' : 'Put the smaller digit in the tens place.' })
      }
      return num(level, `${countOf(o, 'one')} and ${countOf(t, 'ten')} make what number?`, n, { explain: `Tens first: ${countOf(t, 'ten')} = ${t * 10}, add ${o}: ${n}. The order of the words is a trap!` })
    }
  }
}

// ── 1.3 Addition / 1.4 Subtraction ──────────────────────────────────────────

function pair(rng: Rng, carry: boolean, max: number): [number, number] {
  for (;;) {
    const a = rng.int(10, max - 10)
    const b = rng.int(10, max - a)
    if ((a % 10) + (b % 10) >= 10 === carry && a + b <= max) return [a, b]
  }
}

export const add2: Generator = (rng, level) => {
  switch (level) {
    case 1: {
      const a = rng.int(2, 9)
      const b = rng.int(1, 9)
      const art = rng.pick(COUNTABLE)
      return num(level, `How many ${artName(art, 2)} altogether?`, a + b, { visual: { kind: 'groups', groups: [{ art, n: a }, { art, n: b }], joiner: '+' }, explain: `${a} + ${b} = ${a + b}.` })
    }
    case 2: {
      const [a, b] = pair(rng, false, 99)
      return num(level, 'Add.', a + b, { visual: { kind: 'sum', a, b, op: '+', result: null, vertical: true }, explain: `Ones: ${a % 10} + ${b % 10}. Tens: ${Math.floor(a / 10)} + ${Math.floor(b / 10)}. ${a + b}.` })
    }
    case 3: {
      const [a, b] = pair(rng, true, 99)
      return num(level, 'Add.', a + b, { visual: { kind: 'sum', a, b, op: '+', result: null, vertical: true }, explain: `${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}: write ${(a + b) % 10}, carry 1 ten. ${a} + ${b} = ${a + b}.` })
    }
    case 4: {
      const [a, b] = pair(rng, rng.next() < 0.6, 99)
      const story = rng.pick([
        `${name(rng)} picked ${a} mangoes in the morning and ${b} in the evening. How many mangoes did she pick?`,
        `A class has ${a} boys and ${b} girls. How many learners are in the class?`,
        `A farmer has ${a} hens and ${b} ducks. How many birds does he have altogether?`,
        `${a} people got into a bus. ${b} more got in at the next stage. How many people are in the bus now?`,
      ])
      return num(level, story, a + b, { explain: `${a} + ${b} = ${a + b}.` })
    }
    default: {
      if (rng.next() < 0.5) {
        const a = rng.int(10, 40)
        const b = rng.int(10, 30)
        const c = rng.int(5, 99 - a - b)
        return num(level, `${a} + ${b} + ${c} =`, a + b + c, { explain: `${a} + ${b} = ${a + b}; ${a + b} + ${c} = ${a + b + c}.` })
      }
      const total = rng.int(40, 99)
      const a = rng.int(10, total - 10)
      return num(level, `${a} + ___ = ${total}`, total - a, { explain: `${total} − ${a} = ${total - a}.` })
    }
  }
}

export const sub2: Generator = (rng, level) => {
  switch (level) {
    case 1: {
      const a = rng.int(5, 12)
      const b = rng.int(1, a - 1)
      const art = rng.pick(COUNTABLE)
      return num(level, `There were ${a} ${artName(art, 2)}. ${b} were taken away. How many are left?`, a - b, { visual: { kind: 'count', art, n: a }, explain: `${a} − ${b} = ${a - b}.` })
    }
    case 2: {
      const a = rng.int(2, 9) * 10 + rng.int(2, 9)
      const b = rng.int(1, Math.floor(a / 10) - 1) * 10 + rng.int(0, a % 10)
      return num(level, 'Subtract.', a - b, { visual: { kind: 'sum', a, b, op: '−', result: null, vertical: true }, explain: `Ones first, then tens: ${a - b}.` })
    }
    case 3: {
      const a = rng.int(3, 9) * 10 + rng.int(0, 7)
      const b = rng.int(1, Math.floor(a / 10) - 1) * 10 + rng.int((a % 10) + 1, 9)
      return num(level, 'Subtract.', a - b, { visual: { kind: 'sum', a, b, op: '−', result: null, vertical: true }, explain: `${a % 10} is less than ${b % 10}, so borrow a ten: ${a} − ${b} = ${a - b}.` })
    }
    case 4: {
      const a = rng.int(40, 99)
      const b = rng.int(11, a - 10)
      const story = rng.pick([
        `A tray had ${a} eggs. ${b} eggs broke. How many eggs were not broken?`,
        `${name(rng)} had ${a} shillings and spent ${b} shillings. How much was left?`,
        `There were ${a} learners in the field. ${b} went back to class. How many stayed in the field?`,
        `A seller had ${a} oranges and sold ${b}. How many oranges remained?`,
      ])
      return num(level, story, a - b, { explain: `${a} − ${b} = ${a - b}.` })
    }
    default: {
      if (rng.next() < 0.5) {
        const a = rng.int(50, 99)
        const b = rng.int(10, a - 20)
        return num(level, `${a} − ___ = ${a - b}`, b, { explain: `${a} − ${a - b} = ${b}.` })
      }
      const a = rng.int(20, 60)
      const b = rng.int(a + 5, 99)
      return num(level, `${name(rng)} has ${a} marbles. Juma has ${b}. How many more marbles does Juma have?`, b - a, { explain: `${b} − ${a} = ${b - a}.` })
    }
  }
}

// ── 1.5 Multiplication / 1.6 Division ───────────────────────────────────────

export const mul2: Generator = (rng, level) => {
  const art = rng.pick(COUNTABLE)
  switch (level) {
    case 1: {
      const g = rng.int(2, 4)
      const k = rng.pick([2, 3, 5])
      return num(level, `${g} groups of ${k}. How many ${artName(art, 2)} altogether?`, g * k, { visual: { kind: 'groups', groups: Array.from({ length: g }, () => ({ art, n: k })) }, explain: `${Array(g).fill(k).join(' + ')} = ${g * k}.` })
    }
    case 2: {
      const g = rng.int(2, 6)
      const k = rng.pick([2, 3, 4, 5, 10])
      return choice('m2', level, `${Array(g).fill(k).join(' + ')} is the same as:`, textOptions(rng, `${g} × ${k}`, [`${g} + ${k}`, `${g + 1} × ${k}`, `${k} × ${k}`]), `${g} × ${k}`, { explain: `${g} groups of ${k} = ${g} × ${k}.` })
    }
    case 3: {
      const a = rng.int(1, 10)
      const b = rng.pick([2, 5, 10])
      return num(level, `${a} × ${b} =`, a * b, { explain: `${a} groups of ${b} = ${a * b}.` })
    }
    case 4: {
      const [thing, per, what] = rng.pick<[string, number, string]>([
        ['hens', 2, 'legs'],
        ['hands', 5, 'fingers'],
        ['bicycles', 2, 'wheels'],
        ['bundles of 10 sticks', 10, 'sticks'],
        ['packets of 5 biscuits', 5, 'biscuits'],
        ['pairs of shoes', 2, 'shoes'],
        ['cows', 4, 'legs'],
      ])
      const n = rng.int(2, 9)
      return num(level, `There are ${n} ${thing}. How many ${what} are there altogether?`, n * per, { explain: `${n} × ${per} = ${n * per}.` })
    }
    default: {
      if (rng.next() < 0.5) {
        const a = rng.int(2, 10)
        const b = rng.pick([2, 3, 4, 5, 10])
        return num(level, `___ × ${b} = ${a * b}`, a, { explain: `${a} × ${b} = ${a * b}.` })
      }
      const d = rng.int(2, 7)
      return num(level, `${name(rng)} saves 5 shillings every day. How much will she save in ${d} days?`, d * 5, { explain: `${d} × 5 = ${d * 5} shillings.` })
    }
  }
}

export const div2: Generator = (rng, level) => {
  const art = rng.pick(COUNTABLE)
  switch (level) {
    case 1: {
      const k = rng.int(2, 4)
      const each = rng.int(2, 4)
      return num(level, `Share ${k * each} ${artName(art, 2)} equally between ${k} children. How many does each child get?`, each, { visual: { kind: 'count', art, n: k * each }, explain: `${k * each} shared by ${k} = ${each} each.` })
    }
    case 2: {
      const k = rng.pick([2, 5, 10])
      const g = rng.int(2, 5)
      return num(level, `How many groups of ${k} can you make from ${k * g} ${artName(art, 2)}?`, g, { visual: { kind: 'count', art, n: k * g }, explain: `${k * g} ÷ ${k} = ${g}.` })
    }
    case 3: {
      const k = rng.pick([2, 5, 10])
      const g = rng.int(2, 10)
      return num(level, `${k * g} ÷ ${k} =`, g, { explain: `${k} × ${g} = ${k * g}, so ${k * g} ÷ ${k} = ${g}.` })
    }
    case 4: {
      const k = rng.int(2, 5)
      const g = rng.int(2, 6)
      return num(level, `${name(rng)} has ${k * g} sweets to share equally among ${k} friends. How many sweets will each friend get?`, g, { explain: `${k * g} ÷ ${k} = ${g}.` })
    }
    default: {
      if (rng.next() < 0.5) {
        const g = rng.int(2, 9)
        return num(level, `A matatu carries 10 people. How many matatus are needed for ${g * 10} people?`, g, { explain: `${g * 10} ÷ 10 = ${g}.` })
      }
      const k = rng.pick([2, 5])
      const g = rng.int(3, 9)
      return num(level, `Mama put ${k * g} eggs into trays. Each tray holds ${k} eggs. How many trays did she fill?`, g, { explain: `${k * g} ÷ ${k} = ${g}.` })
    }
  }
}

// ── 1.7 Fractions ───────────────────────────────────────────────────────────

export const frac2: Generator = (rng, level) => {
  const shape = rng.pick(['circle', 'bar'] as const)
  switch (level) {
    case 1: {
      const r = rng.next()
      if (r < 0.35) {
        const p = rng.pick([2, 3, 4, 6, 8])
        return num(level, 'Into how many equal parts is this cut?', p, { visual: { kind: 'fraction', parts: p, shaded: 0, shape } })
      }
      if (r < 0.7) {
        const p = rng.pick([4, 6, 8])
        const sh = rng.int(1, p - 1)
        return num(level, 'How many parts are shaded?', sh, { visual: { kind: 'fraction', parts: p, shaded: sh, shape } })
      }
      const parts = rng.pick([2, 4])
      return choice('m2', level, 'What part is shaded?', textOptions(rng, parts === 2 ? 'a half' : 'a quarter', ['a half', 'a quarter', 'a whole']), parts === 2 ? 'a half' : 'a quarter', {
        visual: { kind: 'fraction', parts, shaded: 1, shape },
        explain: parts === 2 ? '1 of 2 equal parts is a half.' : '1 of 4 equal parts is a quarter.',
      })
    }
    case 2: {
      const [parts, shaded] = rng.pick([[2, 1], [4, 1], [4, 2], [4, 3]])
      if (rng.next() < 0.5) {
        const nf = `${parts - shaded}/${parts}`
        return choice('m2', level, 'What fraction is NOT shaded?', textOptions(rng, nf, ['1/2', '1/4', '2/4', '3/4']), nf, { visual: { kind: 'fraction', parts, shaded, shape }, explain: `${parts - shaded} of ${parts} parts are not shaded: ${nf}.` })
      }
      const f = `${shaded}/${parts}`
      return choice('m2', level, 'What fraction is shaded?', textOptions(rng, f, ['1/2', '1/4', '2/4', '3/4']), f, { visual: { kind: 'fraction', parts, shaded, shape }, explain: `${shaded} of ${parts} equal parts: ${f}.` })
    }
    case 3: {
      const n = 2 * rng.int(2, 6)
      const art = rng.pick(COUNTABLE)
      if (rng.next() < 0.6) return num(level, `What is half of these ${artName(art, 2)}?`, n / 2, { visual: { kind: 'count', art, n }, explain: `Share ${n} into 2 equal groups: ${n / 2}.` })
      const m = 2 * rng.int(2, 10)
      return num(level, `What is half of ${m}?`, m / 2, { explain: `Share ${m} into 2 equal groups: ${m / 2}.` })
    }
    case 4: {
      const n = 4 * rng.int(1, 3)
      const art = rng.pick(COUNTABLE)
      if (rng.next() < 0.6) return num(level, `What is a quarter of these ${artName(art, 2)}?`, n / 4, { visual: { kind: 'count', art, n }, explain: `Share ${n} into 4 equal groups: ${n / 4}.` })
      const m = 4 * rng.int(1, 5)
      return num(level, `What is a quarter of ${m}?`, m / 4, { explain: `Share ${m} into 4 equal groups: ${m / 4}.` })
    }
    default: {
      if (rng.next() < 0.5) {
        const n = 2 * rng.int(3, 10)
        return num(level, `${name(rng)} had ${n} oranges and gave half to her sister. How many did she give away?`, n / 2, { explain: `Half of ${n} = ${n / 2}.` })
      }
      const n = 4 * rng.int(2, 5)
      return num(level, `A loaf of bread has ${n} slices. A quarter of the slices were eaten. How many slices were eaten?`, n / 4, { explain: `A quarter of ${n} = ${n / 4}.` })
    }
  }
}

// ── 2.1–2.3 Length, mass and capacity ───────────────────────────────────────

function measure2(kind: 'length' | 'mass' | 'capacity'): Generator {
  const unit = kind === 'length' ? 'm' : kind === 'mass' ? 'kg' : 'litres'
  const u = (n: number) => (kind === 'capacity' ? `${n} litres` : `${n} ${unit}`)
  return (rng, level) => {
    switch (level) {
      case 1: {
        if (kind === 'mass') {
          const [heavy, light] = rng.pick<[ArtId, ArtId]>([
            ['pumpkin', 'feather'],
            ['jerrycan', 'cup'],
            ['stone', 'leaf'],
            ['bucket', 'spoon'],
            ['book', 'pencil'],
          ])
          const left = rng.next() < 0.5
          const askHeavy = rng.next() < 0.5
          return choice('m2', level, `Which one is ${askHeavy ? 'heavier' : 'lighter'}?`, artOpts([heavy, light]), askHeavy ? heavy : light, {
            visual: { kind: 'balance', left: left ? heavy : light, right: left ? light : heavy, heavier: left ? 'left' : 'right' },
            explain: 'The heavier side of the balance goes down.',
          })
        }
        const art: ArtId = kind === 'length' ? rng.pick(['pencil', 'stick', 'feather']) : rng.pick(['jerrycan', 'bucket', 'pot', 'jug'])
        const scales = rng.shuffle([0.55, 0.8, 1.05])
        const askBig = rng.next() < 0.5
        const target = askBig ? Math.max(...scales) : Math.min(...scales)
        const labels = ['A', 'B', 'C']
        const ans = labels[scales.indexOf(target)]
        const prompt = kind === 'length' ? `Which ${artName(art)} is the ${askBig ? 'longest' : 'shortest'}?` : `Which ${artName(art)} holds the ${askBig ? 'most' : 'least'} water?`
        return choice('m2', level, prompt, labels.map((l) => ({ id: l, label: l })), ans, {
          visual: { kind: 'sizes', art, scales, axis: kind === 'length' ? 'x' : 'both', labels },
        })
      }
      case 2: {
        if (rng.next() < 0.5) {
          const a = rng.int(2, 20)
          let b = rng.int(2, 20)
          while (b === a) b = rng.int(2, 20)
          const [x, y] = rng.sample(KENYAN_NAMES, 2)
          const what = kind === 'length' ? ['rope', 'longer', 'm'] : kind === 'mass' ? ['bag', 'heavier', 'kg'] : ['jerrycan', 'holds more', 'litres']
          const ans = a > b ? x : y
          return choice('m2', level, `${x}'s ${what[0]} is ${a} ${what[2]}. ${y}'s ${what[0]} is ${b} ${what[2]}. Whose ${what[0]} ${what[1] === 'holds more' ? 'holds more' : `is ${what[1]}`}?`, [x, y].map((n) => ({ id: n, label: n })), ans, { explain: `${Math.max(a, b)} is more than ${Math.min(a, b)}.` })
        }
        if (kind === 'length') {
          const n = rng.int(3, 9)
          return num(level, 'How many paper clips long is the stick?', n, { visual: { kind: 'units', art: 'stick', unit: 'clip', n }, explain: `Count the clips: ${n}.` })
        }
        const n = rng.int(2, 8)
        const [big, small] = kind === 'mass' ? ['bag of maize', 'packets of sugar'] : ['jerrycan', 'cups']
        return num(level, `${An(big)} is as ${kind === 'mass' ? 'heavy' : 'full'} as ${n} ${small}. Two such ${big === 'bag of maize' ? 'bags' : 'jerrycans'} equal how many ${small}?`, 2 * n, { explain: `${n} + ${n} = ${2 * n}.` })
      }
      case 3: {
        const a = rng.int(5, 40)
        const b = rng.int(3, 40)
        return num(level, `${u(a)} + ${u(b)} = ___ ${kind === 'capacity' ? 'litres' : unit}`, a + b, { explain: `${a} + ${b} = ${a + b}.` })
      }
      case 4: {
        const a = rng.int(20, 90)
        const b = rng.int(5, a - 5)
        const story =
          kind === 'length'
            ? `A rope was ${u(a)} long. ${u(b)} was cut off. How many metres were left?`
            : kind === 'mass'
              ? `A sack had ${u(a)} of potatoes. ${u(b)} were sold. How many kilograms were left?`
              : `A tank had ${u(a)} of water. ${u(b)} were used. How many litres were left?`
        return num(level, story, a - b, { explain: `${a} − ${b} = ${a - b}.` })
      }
      default: {
        const k = rng.int(2, 9)
        const each = rng.pick([2, 5, 10])
        const story =
          kind === 'length'
            ? `${name(rng)} has ${k} ribbons. Each is ${u(each)} long. How many metres of ribbon are there altogether?`
            : kind === 'mass'
              ? `A shopkeeper has ${k} bags of rice. Each bag is ${u(each)}. What is the total mass in kilograms?`
              : `${k} jerrycans each hold ${u(each)}. How many litres do they hold altogether?`
        return num(level, story, k * each, { explain: `${k} × ${each} = ${k * each}.` })
      }
    }
  }
}

// ── 2.4 Time ────────────────────────────────────────────────────────────────

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const clockLabel = (h: number, m: number) => (m === 0 ? `${h} o'clock` : `half past ${h}`)

export const time2: Generator = (rng, level) => {
  const h = rng.int(1, 12)
  switch (level) {
    case 1:
      if (rng.next() < 0.4) {
        const i = rng.int(0, 6)
        return choice('m2', level, `Which day comes after ${DAYS[i]}?`, textOptions(rng, DAYS[(i + 1) % 7], DAYS), DAYS[(i + 1) % 7])
      }
      return choice('m2', level, 'What is the time?', textOptions(rng, clockLabel(h, 0), [clockLabel((h % 12) + 1, 0), clockLabel(((h + 10) % 12) + 1, 0), clockLabel(((h + 5) % 12) + 1, 0)]), clockLabel(h, 0), {
        visual: { kind: 'clock', hour: h, minute: 0 },
        explain: `The long hand is on 12 and the short hand is on ${h}.`,
      })
    case 2:
      if (rng.next() < 0.4) {
        const i = rng.int(0, 6)
        return choice('m2', level, `Which day comes before ${DAYS[i]}?`, textOptions(rng, DAYS[(i + 6) % 7], DAYS), DAYS[(i + 6) % 7])
      }
      return choice('m2', level, 'What is the time?', textOptions(rng, clockLabel(h, 30), [clockLabel(h, 0), clockLabel((h % 12) + 1, 30), clockLabel(((h + 10) % 12) + 1, 30)]), clockLabel(h, 30), {
        visual: { kind: 'clock', hour: h, minute: 30 },
        explain: `The long hand is on 6: half past. The short hand is just past ${h}.`,
      })
    case 3: {
      if (rng.next() < 0.4) {
        const k = rng.int(1, 3)
        const end = ((h + k - 1) % 12) + 1
        return choice('m2', level, `It is ${h} o'clock. What time will it be in ${k} hour${k > 1 ? 's' : ''}?`, textOptions(rng, `${end} o'clock`, [`${((end) % 12) + 1} o'clock`, `${h} o'clock`, `${((h + 10) % 12) + 1} o'clock`]), `${end} o'clock`)
      }
      const i = rng.int(0, 6)
      const after = rng.next() < 0.5
      const ans = DAYS[after ? (i + 1) % 7 : (i + 6) % 7]
      return choice('m2', level, `Which day comes ${after ? 'after' : 'before'} ${DAYS[i]}?`, textOptions(rng, ans, DAYS), ans, { explain: `${after ? DAYS[i] : ans}, then ${after ? ans : DAYS[i]}.` })
    }
    case 4: {
      const i = rng.int(0, 10)
      if (rng.next() < 0.5) return choice('m2', level, `Which month comes after ${MONTHS[i]}?`, textOptions(rng, MONTHS[i + 1], MONTHS), MONTHS[i + 1])
      return num(level, `${MONTHS[i]} is month number ___ of the year.`, i + 1, { explain: `Count from January: ${MONTHS[i]} is month ${i + 1}.` })
    }
    default: {
      const i = rng.int(0, 6)
      const k = rng.int(2, 4)
      if (rng.next() < 0.5) return choice('m2', level, `Today is ${DAYS[i]}. What day will it be in ${k} days?`, textOptions(rng, DAYS[(i + k) % 7], DAYS), DAYS[(i + k) % 7], { explain: `Count ${k} days on from ${DAYS[i]}.` })
      const start = rng.int(6, 10)
      return choice('m2', level, `School starts at ${start} o'clock. Break is 2 hours later. When is break?`, textOptions(rng, `${start + 2} o'clock`, [`${start + 1} o'clock`, `${start + 3} o'clock`, `${start - 2} o'clock`]), `${start + 2} o'clock`, { explain: `${start} + 2 = ${start + 2}.` })
    }
  }
}

// ── 2.5 Money ───────────────────────────────────────────────────────────────

const COIN: Record<number, ArtId> = { 1: 'coin1', 5: 'coin5', 10: 'coin10', 20: 'coin20', 50: 'note50', 100: 'note100' }
const ITEMS: [string, number][] = [
  ['a mandazi', 10],
  ['a pencil', 15],
  ['an exercise book', 30],
  ['a ruler', 20],
  ['a packet of milk', 55],
  ['a loaf of bread', 60],
  ['a sweet', 5],
  ['an orange', 15],
  ['a rubber', 10],
  ['a bar of soap', 45],
]

export const money2: Generator = (rng, level) => {
  switch (level) {
    case 1: {
      const r = rng.next()
      const v = rng.pick([1, 5, 10, 20, 50, 100])
      if (r < 0.3) return num(level, 'How many shillings is this?', v, { visual: { kind: 'money', values: [v] } })
      if (r < 0.6) {
        const [a, b] = rng.sample([1, 5, 10, 20, 50, 100], 2)
        const sh = (x: number) => `${x} ${x === 1 ? 'shilling' : 'shillings'}`
        return choice('m2', level, `Which is worth more: ${sh(a)} or ${sh(b)}?`, [a, b].map((x) => ({ id: String(x), label: sh(x) })), String(Math.max(a, b)))
      }
      return choice('m2', level, `Which one is ${v} ${v === 1 ? 'shilling' : 'shillings'}?`, artOptions(rng, COIN[v], Object.values(COIN), 3), COIN[v], { explain: `Look for the number ${v}.` })
    }
    case 2: {
      const values = [rng.pick([1, 5, 10, 20, 50]), rng.pick([1, 5, 10, 20, 50])].sort((a, b) => b - a)
      const total = values[0] + values[1]
      return num(level, 'How many shillings altogether?', total, { visual: { kind: 'money', values }, explain: `${values.join(' + ')} = ${total}.` })
    }
    case 3: {
      const values = rng.sample([1, 5, 5, 10, 10, 20, 20, 50], rng.int(3, 4)).sort((a, b) => b - a)
      const total = values.reduce((s, v) => s + v, 0)
      return num(level, 'Count the money. How many shillings?', total, { visual: { kind: 'money', values }, explain: `${values.join(' + ')} = ${total}.` })
    }
    case 4: {
      const [item, price] = rng.pick(ITEMS)
      const have = price < 50 ? rng.pick([50, 100]) : 100
      return num(level, `${name(rng)} had ${have} shillings and bought ${item} for ${price} shillings. What was the balance?`, have - price, { visual: { kind: 'money', values: [have] }, explain: `${have} − ${price} = ${have - price}.` })
    }
    default: {
      const [[a, pa], [b, pb]] = rng.sample(ITEMS.filter(([, p]) => p <= 45), 2)
      if (rng.next() < 0.5) return num(level, `What is the total cost of ${a} at ${pa} shillings and ${b} at ${pb} shillings?`, pa + pb, { explain: `${pa} + ${pb} = ${pa + pb}.` })
      return num(level, `${name(rng)} bought ${a} for ${pa} shillings and ${b} for ${pb} shillings. She paid with a 100 shilling note. What was her balance?`, 100 - pa - pb, { explain: `${pa} + ${pb} = ${pa + pb}; 100 − ${pa + pb} = ${100 - pa - pb}.` })
    }
  }
}

// ── 3.1 Position ────────────────────────────────────────────────────────────

export const position2: Generator = (rng, level) => {
  const row = rng.sample(ROW, level <= 2 ? 3 : 5)
  switch (level) {
    case 1: {
      const left = rng.next() < 0.5
      return choice('m2', level, `Which picture is on the ${left ? 'LEFT' : 'RIGHT'} end of the row?`, artOpts(rng.shuffle(row)), left ? row[0] : row[2], { visual: { kind: 'art', art: row } })
    }
    case 2:
      return choice('m2', level, `Which picture is in the MIDDLE?`, artOpts(rng.shuffle(row)), row[1], { visual: { kind: 'art', art: row } })
    case 3: {
      const i = rng.int(1, 3)
      return choice('m2', level, `Which picture is between the ${artName(row[i - 1])} and the ${artName(row[i + 1])}?`, artOpts(rng.shuffle([row[i], row[i - 1], row[i + 1]])), row[i], { visual: { kind: 'art', art: row } })
    }
    case 4: {
      const i = rng.int(0, 3)
      const after = rng.next() < 0.5
      const j = after ? i + 1 : i
      const k = after ? i : i + 1
      return choice('m2', level, `Reading from the left, which picture comes just ${after ? 'after' : 'before'} the ${artName(row[k])}?`, artOpts(rng.shuffle([row[j], row[k], rng.pick(row.filter((x) => x !== row[j] && x !== row[k]))])), row[j], { visual: { kind: 'art', art: row } })
    }
    default: {
      const i = rng.int(0, 4)
      return num(level, `The ${artName(row[i])} is number ___ from the right.`, 5 - i, { visual: { kind: 'art', art: row }, explain: `Count from the right end: ${5 - i}.` })
    }
  }
}

// ── 3.2 Lines and shapes ────────────────────────────────────────────────────

const OBJECT_SHAPES: [string, ShapeKind][] = [
  ['a coin', 'circle'],
  ['a clock face', 'circle'],
  ['a plate', 'circle'],
  ['a door', 'rectangle'],
  ['a book', 'rectangle'],
  ['a blackboard', 'rectangle'],
  ['a samosa', 'triangle'],
  ['a floor tile', 'square'],
  ['a handkerchief', 'square'],
  ['an egg', 'oval'],
]
const COLORS = ['#e0876a', '#5fa39a', '#e9c46a', '#6c8ebf']
const ALL_SHAPES: ShapeKind[] = ['circle', 'triangle', 'rectangle', 'square', 'oval']

export const shapes2: Generator = (rng, level) => {
  switch (level) {
    case 1: {
      if (rng.next() < 0.5) {
        const [thing, shape] = rng.pick(OBJECT_SHAPES)
        return choice('m2', level, `${thing[0].toUpperCase()}${thing.slice(1)} has the shape of a ___.`, textOptions(rng, shape, ALL_SHAPES), shape)
      }
      const want = rng.pick(ALL_SHAPES)
      const opts = rng.shuffle([want, ...rng.sample(ALL_SHAPES.filter((s) => s !== want), 2)]).map((k, i) => ({ id: k, visual: { kind: 'shapes' as const, shapes: [{ kind: k, color: COLORS[i] }] } }))
      return choice('m2', level, `Which one is ${want === 'oval' ? 'an oval' : `${an(want)}`}?`, opts, want)
    }
    case 2: {
      const curved = rng.next() < 0.5
      const lines = rng.shuffle(curved ? ['curved', 'straight', 'straight'] : ['straight', 'curved', 'curved']) as ('straight' | 'curved')[]
      const idx = lines.indexOf(curved ? 'curved' : 'straight')
      const labels = ['A', 'B', 'C']
      return choice('m2', level, `Which line is ${curved ? 'CURVED' : 'STRAIGHT'}?`, labels.map((l) => ({ id: l, label: l })), labels[idx], { visual: { kind: 'lines', lines, variant: rng.int(0, 3) } })
    }
    case 3: {
      if (rng.next() < 0.4) {
        const [prompt, ans] = rng.pick([
          ['Which shape has 3 sides?', 'triangle'],
          ['Which shape has 4 equal sides?', 'square'],
          ['Which shape is round?', 'circle'],
          ['Which shape has 2 long sides and 2 short sides?', 'rectangle'],
          ['Which shape is shaped like an egg?', 'oval'],
        ] as const)
        return choice('m2', level, prompt, textOptions(rng, ans, ALL_SHAPES.filter((x) => !(ans === 'circle' && x === 'oval') && !(ans === 'oval' && x === 'circle'))), ans)
      }
      const [thing, shape] = rng.pick(OBJECT_SHAPES)
      return choice('m2', level, `${thing[0].toUpperCase()}${thing.slice(1)} has the shape of a ___.`, textOptions(rng, shape, ALL_SHAPES), shape)
    }
    case 4: {
      const k = rng.pick<ShapeKind>(['triangle', 'square', 'rectangle'])
      const ask = rng.pick(['sides', 'corners'])
      const n = k === 'triangle' ? 3 : 4
      return num(level, `How many ${ask} does ${an(k)} have?`, n, { visual: { kind: 'shapes', shapes: [{ kind: k, color: rng.pick(COLORS) }] } })
    }
    default: {
      const unit = rng.sample(ALL_SHAPES, 2)
      const seq = [0, 1, 2, 3, 4, 5].map((i) => unit[i % 2])
      const gap = rng.int(2, 5)
      const ans = seq[gap]
      const opts = rng.shuffle([ans, ...rng.sample(ALL_SHAPES.filter((x) => x !== ans), 2)]).map((k, i) => ({ id: k, visual: { kind: 'shapes' as const, shapes: [{ kind: k, color: COLORS[i] }] } }))
      return choice('m2', level, 'Which shape is missing?', opts, ans, { visual: { kind: 'pattern', items: seq.map((k, i) => (i === gap ? null : { kind: k, color: COLORS[unit.indexOf(k)] })) } })
    }
  }
}

export const MATH2_GENERATORS: Record<string, Generator> = {
  's-concept': concept2,
  's-whole': whole2,
  's-add': add2,
  's-sub': sub2,
  's-mul': mul2,
  's-div': div2,
  's-frac': frac2,
  's-length': measure2('length'),
  's-mass': measure2('mass'),
  's-capacity': measure2('capacity'),
  's-time': time2,
  's-money': money2,
  's-position': position2,
  's-shapes': shapes2,
}
