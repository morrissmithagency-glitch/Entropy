// Grade 3 maths. Levels 4–5 match Grade 3 end-term papers: 3-digit work with
// carrying and borrowing, shillings and cents, fractions of amounts, hidden triangles.
import type { ArtId } from '../../components/art/objects'
import { KENYAN_NAMES, choice, numberOptions, numberWord, textOptions, uid } from '../helpers'
import type { Generator, Level, NumberQuestion, Option, Rng, ShapeKind, Visual } from '../types'
import { DAYS } from './math'

const num = (level: Level, prompt: string, answer: number, extra: Partial<NumberQuestion> = {}): NumberQuestion => ({
  id: uid('m3'),
  type: 'number',
  level,
  prompt,
  answer,
  ...extra,
})

/** Number names the way Kenyan papers write them: "one hundred and seventy-nine". */
export function words3(n: number): string {
  if (n < 100) return numberWord(n)
  const h = Math.floor(n / 100)
  const rest = n % 100
  if (h === 10) return 'one thousand'
  return rest === 0 ? `${numberWord(h)} hundred` : `${numberWord(h)} hundred and ${numberWord(rest)}`
}

const name = (rng: Rng) => rng.pick(KENYAN_NAMES)

/** Three-digit numbers whose column sums all carry, or never carry. */
function addPair(rng: Rng, carry: boolean, max = 999): [number, number] {
  for (;;) {
    const a = rng.int(100, 899)
    const b = rng.int(100, 899)
    if (a + b > max) continue
    const carries = (a % 10) + (b % 10) >= 10 || (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10) >= 10
    if (carries === carry) return [a, b]
  }
}

function subPair(rng: Rng, borrow: boolean): [number, number] {
  for (;;) {
    const a = rng.int(300, 999)
    const b = rng.int(100, a - 50)
    const borrows = a % 10 < b % 10 || Math.floor(a / 10) % 10 < Math.floor(b / 10) % 10
    if (borrows === borrow) return [a, b]
  }
}

// ── Whole numbers ───────────────────────────────────────────────────────────

export const whole3: Generator = (rng, level) => {
  const n = rng.int(101, 989)
  const [h, t, o] = [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10]
  switch (level) {
    case 1:
      return num(level, `What number has ${h} hundreds, ${t} tens and ${o} ones?`, n, { explain: `${h * 100} + ${t * 10} + ${o} = ${n}` })
    case 2: {
      const step = rng.pick([10, 2, 5])
      const start = step === 10 ? rng.int(10, 70) * 10 : step * rng.int(20, 150)
      const seq = [0, 1, 2, 3, 4].map((i) => start + i * step)
      const gap = rng.int(2, 4)
      return num(level, 'Fill in the missing number.', seq[gap], { visual: { kind: 'sequence', items: seq.map((v, i) => (i === gap ? null : v)) }, explain: `The numbers go up by ${step}.` })
    }
    case 3: {
      if (rng.next() < 0.5) {
        const ask = rng.pick(['hundreds', 'tens', 'ones'] as const)
        const ans = ask === 'hundreds' ? h : ask === 'tens' ? t : o
        return num(level, `${n} = ___ hundreds, ___ tens, ___ ones. How many ${ask}?`, ans, { explain: `${n} = ${h} hundreds, ${t} tens and ${o} ones.` })
      }
      const wrong = [words3(n + 10), words3(n - 1 > 100 ? n - 1 : n + 2), words3(o * 100 + t * 10 + h > 100 ? o * 100 + t * 10 + h : n + 100)]
      return choice('m3', level, `Which words show the number ${n}?`, textOptions(rng, words3(n), wrong, 3), words3(n), { explain: `${n} is "${words3(n)}".` })
    }
    case 4: {
      const k = rng.int(0, 2)
      if (k === 0) {
        const m = rng.int(1, 9) * 100 + rng.int(0, 9)
        const mh = Math.floor(m / 100)
        const opts = [...new Set([m, mh * 100 + (m % 10) * 10, mh * 10 + (m % 10), m + 100])].map((v) => ({ id: String(v), label: String(v) }))
        return choice('m3', level, `Write in symbols: "${words3(m)}"`, rng.shuffle(opts), String(m), {
          say: `Write in symbols: ${words3(m)}`,
          explain: `${words3(m)} = ${m}. The zero keeps the tens place.`,
        })
      }
      if (k === 1) {
        const step = rng.pick([100, 50, 10])
        const start = rng.int(6, 9) * 100 + (step === 10 ? rng.int(0, 9) * 10 : 0)
        const seq = [0, 1, 2, 3, 4].map((i) => start - i * step)
        const gap = rng.int(1, 3)
        return num(level, 'The numbers count backwards. Find the missing number.', seq[gap], { visual: { kind: 'sequence', items: seq.map((v, i) => (i === gap ? null : v)) }, explain: `Each number is ${step} less.` })
      }
      const pool = [...new Set([h * 100 + t * 10 + o, h * 100 + o * 10 + t, t * 100 + h * 10 + o, o * 100 + t * 10 + h].filter((x) => x >= 100))]
      while (pool.length < 4) pool.push(rng.int(100, 999))
      const nums = [...new Set(pool)].slice(0, 4)
      const max = Math.max(...nums)
      return choice('m3', level, 'Which is the greatest number?', rng.shuffle(nums).map((v) => ({ id: String(v), label: String(v) })), String(max), { explain: `Compare hundreds first, then tens. ${max} is the greatest.` })
    }
    default: {
      const k = rng.int(0, 3)
      if (k === 0) {
        const m = rng.int(10, 99)
        return num(level, `${m} = ___ hundreds, ___ tens, ___ ones. How many hundreds?`, 0, { explain: `${m} has no hundreds: 0 hundreds, ${Math.floor(m / 10)} tens, ${m % 10} ones.` })
      }
      if (k === 1) {
        const m = rng.int(100, 899)
        const more = rng.next() < 0.5
        return num(level, `What is 100 ${more ? 'more' : 'less'} than ${m}?`, more ? m + 100 : m - 100, { explain: `Only the hundreds digit changes.` })
      }
      if (k === 2) {
        const nums = rng.sample(Array.from({ length: 60 }, (_, i) => 300 + i * 11), 4)
        return { id: uid('m3'), type: 'order', level, prompt: 'Arrange from the smallest to the largest.', tiles: rng.shuffle(nums.map(String)), answer: [...nums].sort((a, b) => a - b).map(String), joiner: ', ', explain: 'Compare the hundreds, then the tens, then the ones.' }
      }
      const order = ['first', 'second', 'third', 'fourth', 'fifth']
      const i = rng.int(0, 4)
      return choice('m3', level, `Monday is the first school day. In which position is ${DAYS[i]}?`, textOptions(rng, order[i], order, 4), order[i], { explain: `Monday, Tuesday, Wednesday, Thursday, Friday: ${DAYS[i]} is ${order[i]}.` })
    }
  }
}

// ── Addition / subtraction ──────────────────────────────────────────────────

export const add3: Generator = (rng, level) => {
  switch (level) {
    case 1: {
      let a = rng.int(15, 69)
      let b = rng.int(12, 29)
      while ((a % 10) + (b % 10) < 10) {
        a = rng.int(15, 69)
        b = rng.int(12, 29)
      }
      return num(level, 'Add.', a + b, { visual: { kind: 'sum', a, b, op: '+', result: null, vertical: true }, explain: `Carry the ten: ${a} + ${b} = ${a + b}.` })
    }
    case 2: {
      const xs = rng.next() < 0.5 ? [rng.int(11, 30), rng.int(11, 20), rng.int(10, 20)] : [rng.int(40, 70), rng.int(3, 9), rng.int(3, 9)]
      const total = xs.reduce((s, v) => s + v, 0)
      return num(level, `What is ${xs.join(' + ')}?`, total, { explain: `${xs[0]} + ${xs[1]} = ${xs[0] + xs[1]}, then + ${xs[2]} = ${total}.` })
    }
    case 3: {
      const [a, b] = addPair(rng, false)
      return num(level, 'Add.', a + b, { visual: { kind: 'sum', a, b, op: '+', result: null, vertical: true }, explain: `${a} + ${b} = ${a + b}` })
    }
    case 4: {
      const [a, b] = addPair(rng, true)
      return num(level, 'Add.', a + b, { visual: { kind: 'sum', a, b, op: '+', result: null, vertical: true }, explain: `Add ones, carry; add tens, carry; then hundreds: ${a + b}.` })
    }
    default: {
      const [a, b] = addPair(rng, true)
      const who = name(rng)
      const story = rng.pick([
        `A school has ${a} boys and ${b} girls. How many learners are in the school?`,
        `${who} counted ${a} cars on Monday and ${b} cars on Tuesday. How many cars altogether?`,
        `A farmer harvested ${a} kg of maize and ${b} kg of beans. How many kilograms altogether?`,
        `On Saturday ${a} people visited the park. On Sunday ${b} people came. How many visitors in total?`,
      ])
      return num(level, story, a + b, { explain: `${a} + ${b} = ${a + b}` })
    }
  }
}

export const sub3: Generator = (rng, level) => {
  switch (level) {
    case 1: {
      let a = rng.int(31, 95)
      let b = rng.int(12, a - 8)
      while (a % 10 >= b % 10) {
        a = rng.int(31, 95)
        b = rng.int(12, a - 8)
      }
      return num(level, 'Subtract.', a - b, { visual: { kind: 'sum', a, b, op: '−', result: null, vertical: true }, explain: `Borrow a ten: ${a} − ${b} = ${a - b}.` })
    }
    case 2: {
      // Every digit of a is at least 2, so a two-digit b without borrowing always exists.
      const a = rng.int(2, 9) * 100 + rng.int(2, 9) * 10 + rng.int(2, 9)
      const b = rng.int(1, Math.floor(a / 10) % 10) * 10 + rng.int(1, a % 10)
      return num(level, 'Subtract.', a - b, { visual: { kind: 'sum', a, b, op: '−', result: null, vertical: true }, explain: `${a} − ${b} = ${a - b}` })
    }
    case 3: {
      const [a, b] = subPair(rng, false)
      return num(level, 'Subtract.', a - b, { visual: { kind: 'sum', a, b, op: '−', result: null, vertical: true }, explain: `${a} − ${b} = ${a - b}` })
    }
    case 4: {
      const [a, b] = subPair(rng, true)
      return num(level, 'Subtract.', a - b, { visual: { kind: 'sum', a, b, op: '−', result: null, vertical: true }, explain: `Borrow where the top digit is smaller: ${a} − ${b} = ${a - b}.` })
    }
    default: {
      if (rng.next() < 0.4) {
        // Borrowing across a zero, the hardest Grade 3 subtraction (604 − 287).
        const a = rng.int(3, 9) * 100 + rng.int(0, 4)
        const b = rng.int(1, Math.floor(a / 100) - 1) * 100 + rng.int(1, 9) * 10 + rng.int((a % 10) + 1, 9)
        return num(level, 'Subtract.', a - b, {
          visual: { kind: 'sum', a, b, op: '−', result: null, vertical: true },
          explain: `The tens digit is 0, so borrow from the hundreds first, then from the tens: ${a} − ${b} = ${a - b}.`,
        })
      }
      const [a, b] = subPair(rng, true)
      const story = rng.pick([
        `A farmer had ${a} chickens. He sold ${b} of them. How many chickens were left?`,
        `A library had ${a} books. Learners borrowed ${b}. How many books stayed in the library?`,
        `A tank had ${a} litres of water. ${b} litres were used. How many litres remained?`,
        `${name(rng)} had ${a} shillings and spent ${b} shillings. How much money was left?`,
      ])
      return num(level, story, a - b, { explain: `${a} − ${b} = ${a - b}` })
    }
  }
}

// ── Multiplication / division ───────────────────────────────────────────────

const GROUP_ART: ArtId[] = ['mango', 'egg', 'orange', 'pencil', 'star']

export const mul3: Generator = (rng, level) => {
  switch (level) {
    case 1: {
      const g = rng.int(2, 4)
      const k = rng.int(2, 5)
      const art = rng.pick(GROUP_ART)
      return choice('m3', level, `${g} groups of ${k}. How many altogether?`, numberOptions(rng, g * k, 3, 1, 40), String(g * k), {
        visual: { kind: 'groups', groups: Array.from({ length: g }, () => ({ art, n: k })) },
        explain: `${g} × ${k} = ${g * k}`,
      })
    }
    case 2: {
      const a = rng.pick([2, 3, 5, 10])
      const b = rng.int(2, 10)
      return num(level, `${a} × ${b} =`, a * b, { explain: `${a} × ${b} = ${a * b}` })
    }
    case 3: {
      const [thing, per] = rng.pick<[string, number]>([
        ['goats', 4],
        ['hens', 2],
        ['tables', 4],
        ['tricycles', 3],
        ['hands', 5],
      ])
      const k = rng.int(3, 9)
      const what = thing === 'hands' ? 'fingers' : thing === 'tricycles' ? 'wheels' : 'legs'
      return num(level, `One of the ${thing} has ${per} ${what}. How many ${what} do ${k} ${thing} have?`, per * k, { explain: `${k} × ${per} = ${per * k}` })
    }
    case 4: {
      if (rng.next() < 0.5) {
        const a = rng.pick([11, 12, 13, 20, 21, 22, 30, 31, 32])
        const b = rng.int(2, 3)
        return num(level, `${a} × ${b} =`, a * b, { explain: `${a} × ${b}: multiply the ones, then the tens. ${a * b}.` })
      }
      const k = rng.int(3, 6)
      const v = rng.int(2, 9)
      return choice('m3', level, `${Array(k).fill(v).join(' + ')} is the same as:`, textOptions(rng, `${k} × ${v}`, [`${v} + ${k}`, `${k} + ${v} + ${k}`, `${k} × ${k}`, `${v} × ${v}`], 4), `${k} × ${v}`, {
        explain: `${k} lots of ${v} is ${k} × ${v} = ${k * v}.`,
      })
    }
    default: {
      if (rng.next() < 0.5) {
        const a = rng.int(3, 9)
        const b = rng.int(3, 9)
        return num(level, `What number is missing?  ___ × ${b} = ${a * b}`, a, { explain: `${a} × ${b} = ${a * b}` })
      }
      const per = rng.int(10, 20)
      const days = rng.int(3, 6)
      const who = name(rng)
      return num(level, `${who} sells ${per} oranges every day. How many oranges does ${who} sell in ${days} days?`, per * days, { explain: `${per} × ${days} = ${per * days}` })
    }
  }
}

export const div3: Generator = (rng, level) => {
  switch (level) {
    case 1: {
      const people = rng.int(2, 4)
      const each = rng.int(2, 5)
      const art = rng.pick(GROUP_ART)
      return choice('m3', level, `Share ${people * each} equally among ${people} children. How many does each child get?`, numberOptions(rng, each, 3, 1, 12), String(each), {
        visual: { kind: 'count', art, n: people * each },
        explain: `${people * each} ÷ ${people} = ${each}`,
      })
    }
    case 2: {
      const d = rng.pick([2, 5, 10])
      const q = rng.int(2, 10)
      return num(level, `${d * q} ÷ ${d} =`, q, { explain: `${d} × ${q} = ${d * q}, so ${d * q} ÷ ${d} = ${q}.` })
    }
    case 3: {
      const story = rng.int(0, 1)
      const d = rng.pick([2, 3, 4, 5, 10])
      const q = rng.int(3, 10)
      return story === 0
        ? num(level, `${d} boys shared ${d * q} mangoes equally. How many mangoes did each boy get?`, q, { explain: `${d * q} ÷ ${d} = ${q}` })
        : num(level, `A car carries ${d} passengers. How many cars will carry ${d * q} passengers?`, q, { explain: `${d * q} ÷ ${d} = ${q}` })
    }
    case 4: {
      const d = rng.int(3, 9)
      const q = rng.int(4, 11)
      if (rng.next() < 0.5) return num(level, `${d * q} ÷ ${d} =`, q, { explain: `${d} × ${q} = ${d * q}` })
      return num(level, `What number is missing?  ___ ÷ ${d} = ${q}`, d * q, { explain: `${q} × ${d} = ${d * q}` })
    }
    default: {
      const tray = rng.pick([6, 10, 5])
      const trays = rng.int(4, 9)
      const sold = rng.int(1, trays - 2)
      return num(level, `Mama had ${tray * trays} eggs. She packed them in trays of ${tray}. She sold ${sold} trays. How many trays were left?`, trays - sold, {
        explain: `${tray * trays} ÷ ${tray} = ${trays} trays. ${trays} − ${sold} = ${trays - sold}.`,
      })
    }
  }
}

// ── Fractions ───────────────────────────────────────────────────────────────

const FRAC_NAMES: Record<string, string> = { '1/2': 'one half', '1/4': 'one quarter', '1/3': 'one third', '1/8': 'one eighth', '3/4': 'three quarters' }

function fracOptions(rng: Rng, answer: string, wrong: string[]): Option[] {
  return textOptions(rng, answer, wrong, 4)
}

export const frac3: Generator = (rng, level) => {
  switch (level) {
    case 1: {
      const parts = rng.pick([2, 3, 4])
      const shape = rng.pick(['circle', 'bar'] as const)
      return choice('m3', level, 'What fraction is shaded?', fracOptions(rng, `1/${parts}`, ['1/2', '1/3', '1/4', '1/8']), `1/${parts}`, {
        visual: { kind: 'fraction', parts, shaded: 1, shape },
        explain: `1 out of ${parts} equal parts is shaded: 1/${parts}.`,
      })
    }
    case 2: {
      if (rng.next() < 0.5) {
        const [parts, shaded] = rng.pick([[4, 2], [4, 3], [8, 3], [3, 2], [8, 5]])
        return choice('m3', level, 'What fraction is shaded?', fracOptions(rng, `${shaded}/${parts}`, [`${parts - shaded}/${parts}`, `${shaded}/${parts + 1}`, `1/${parts}`, `${parts}/${shaded}`]), `${shaded}/${parts}`, {
          visual: { kind: 'fraction', parts, shaded, shape: rng.pick(['circle', 'bar'] as const) },
          explain: `${shaded} out of ${parts} equal parts are shaded.`,
        })
      }
      const f = rng.pick(Object.keys(FRAC_NAMES))
      return choice('m3', level, `Which fraction is "${FRAC_NAMES[f]}"?`, fracOptions(rng, f, Object.keys(FRAC_NAMES)), f, { explain: `${FRAC_NAMES[f]} is written ${f}.` })
    }
    case 3: {
      const d = rng.pick([2, 4])
      const n = d * rng.int(2, 10)
      return num(level, `1/${d} of ${n} =`, n / d, { explain: `Share ${n} into ${d} equal groups: ${n / d}.` })
    }
    case 4: {
      if (rng.next() < 0.5) {
        const bigger = rng.next() < 0.5
        const ans = bigger ? '1/2' : '1/8'
        return choice('m3', level, `Which fraction is the ${bigger ? 'biggest' : 'smallest'}?`, rng.shuffle(['1/2', '1/4', '1/8']).map((f) => ({ id: f, label: f })), ans, {
          explain: 'The more equal parts a whole is cut into, the smaller each part. 1/2 > 1/4 > 1/8.',
        })
      }
      const d = rng.pick([3, 8])
      const n = d * rng.int(2, 6)
      return num(level, `1/${d} of ${n} =`, n / d, { explain: `${n} ÷ ${d} = ${n / d}` })
    }
    default: {
      if (rng.next() < 0.5) {
        const n = 4 * rng.int(3, 10)
        return num(level, `3/4 of ${n} =`, (3 * n) / 4, { explain: `1/4 of ${n} is ${n / 4}, so 3/4 is 3 × ${n / 4} = ${(3 * n) / 4}.` })
      }
      const n = 4 * rng.int(3, 8)
      const who = name(rng)
      return num(level, `${who} had ${n} sweets and gave 1/4 of them to a brother. How many sweets were left?`, n - n / 4, {
        explain: `1/4 of ${n} = ${n / 4}. ${n} − ${n / 4} = ${n - n / 4}.`,
      })
    }
  }
}

// ── Measurement ─────────────────────────────────────────────────────────────

function measure(unit: 'm' | 'kg' | 'litres', what: { add: string[]; sub: string[]; fill: [string, string] }): Generator {
  const u = unit === 'litres' ? ' litres' : unit
  const unitWord = unit === 'm' ? 'metres' : unit === 'kg' ? 'kilograms' : 'litres'
  return (rng, level) => {
    switch (level) {
      case 1: {
        const q = rng.pick<[string, string]>([
          ['the length of a classroom', 'metres'],
          ['the mass of a bag of maize', 'kilograms'],
          ['the water in a jerrycan', 'litres'],
          ['the length of a road', 'metres'],
          ['the milk in a cow\'s bucket', 'litres'],
          ['the mass of a sack of potatoes', 'kilograms'],
        ])
        return choice('m3', level, `Which unit do we use to measure ${q[0]}?`, textOptions(rng, q[1], ['metres', 'kilograms', 'litres']), q[1], { explain: `We measure ${q[0]} in ${q[1]}.` })
      }
      case 2: {
        const a = rng.int(12, 48)
        const b = rng.int(8, 39)
        return num(level, `${a}${u} + ${b}${u} =`, a + b, { explain: `${a} + ${b} = ${a + b} ${unitWord}` })
      }
      case 3: {
        const a = rng.int(40, 99)
        const b = rng.int(12, a - 10)
        const [s1] = what.sub
        return num(level, s1.replace('{a}', String(a)).replace('{b}', String(b)), a - b, { explain: `${a} − ${b} = ${a - b} ${unitWord}` })
      }
      case 4: {
        const small = rng.pick([2, 5, 10])
        const k = rng.int(3, 10)
        return num(level, `How many ${small}${u} ${what.fill[1]} can fill a ${small * k}${u} ${what.fill[0]}?`, k, { explain: `${small * k} ÷ ${small} = ${k}` })
      }
      default: {
        const a = rng.int(60, 99)
        const b = rng.int(10, 30)
        const c = rng.int(10, a - b - 5)
        const [s] = what.add
        return num(level, s.replace('{a}', String(a)).replace('{b}', String(b)).replace('{c}', String(c)), a - b - c, { explain: `${a} − ${b} − ${c} = ${a - b - c} ${unitWord}` })
      }
    }
  }
}

export const length3 = measure('m', {
  sub: ['A rope was {a} m long. {b} m was cut off. How many metres are left?'],
  add: ['A fence is {a} m long. Baraka painted {b} m on Monday and {c} m on Tuesday. How many metres are not painted?'],
  fill: ['road', 'steps'],
})
export const mass3 = measure('kg', {
  sub: ['A trader had {a} kg of sugar. She sold {b} kg. How many kilograms were left?'],
  add: ['A shop had {a} kg of rice. It sold {b} kg on Monday and {c} kg on Tuesday. How many kilograms were left?'],
  fill: ['box', 'cans'],
})
export const capacity3 = measure('litres', {
  sub: ['A tank had {a} litres of water. {b} litres were used for cooking. How many litres remained?'],
  add: ['A cow gave {a} litres of milk in a week. The family drank {b} litres and sold {c} litres. How many litres were left?'],
  fill: ['jerrycan', 'tins'],
})

// ── Time ────────────────────────────────────────────────────────────────────

const MONTHS: [string, number][] = [
  ['January', 31], ['February', 28], ['March', 31], ['April', 30], ['May', 31], ['June', 30],
  ['July', 31], ['August', 31], ['September', 30], ['October', 31], ['November', 30], ['December', 31],
]

function clockLabel(h: number, m: number) {
  if (m === 0) return `${h} o'clock`
  if (m === 30) return `half past ${h}`
  if (m === 15) return `quarter past ${h}`
  return `quarter to ${(h % 12) + 1}`
}

export const time3: Generator = (rng, level) => {
  switch (level) {
    case 1: {
      const order = ['first', 'second', 'third', 'fourth', 'fifth']
      const i = rng.int(0, 4)
      return choice('m3', level, `Monday is the first school day. Which day is the ${order[i]} school day?`, textOptions(rng, DAYS[i], DAYS.slice(0, 5), 4), DAYS[i], { explain: `${DAYS.slice(0, i + 1).join(', ')}.` })
    }
    case 2: {
      if (rng.next() < 0.4) return num(level, 'How many months are there in one year?', 12, { explain: 'January to December: 12 months.' })
      const i = rng.int(0, 10)
      return choice('m3', level, `Which month comes after ${MONTHS[i][0]}?`, textOptions(rng, MONTHS[i + 1][0], MONTHS.map((m) => m[0]), 4), MONTHS[i + 1][0], { explain: `${MONTHS[i][0]}, then ${MONTHS[i + 1][0]}.` })
    }
    case 3: {
      if (rng.next() < 0.5) {
        const [m, d] = rng.pick(MONTHS.filter((x) => x[0] !== 'February'))
        return num(level, `How many days are there in the month of ${m}?`, d, { explain: `${m} has ${d} days.` })
      }
      const h = rng.int(1, 12)
      return choice('m3', level, 'What is the time?', textOptions(rng, clockLabel(h, 0), [clockLabel((h % 12) + 1, 0), clockLabel(h, 30), `12 o'clock`, clockLabel(((h + 5) % 12) + 1, 0)], 3), clockLabel(h, 0), {
        visual: { kind: 'clock', hour: h, minute: 0 },
        explain: `The long hand is on 12 and the short hand on ${h}.`,
      })
    }
    case 4: {
      if (rng.next() < 0.3) {
        const w = rng.int(2, 4)
        return num(level, `How many days are there in ${w} weeks?`, w * 7, { explain: `${w} × 7 = ${w * 7}` })
      }
      const h = rng.int(1, 11)
      const m = rng.pick([30, 15, 45])
      const ans = clockLabel(h, m)
      const wrong = [clockLabel(h, 0), clockLabel(h, m === 30 ? 15 : 30), clockLabel(h + 1, m), clockLabel(h, m === 45 ? 15 : 45)].filter((x) => x !== ans)
      return choice('m3', level, 'What is the time?', textOptions(rng, ans, wrong, 4), ans, {
        visual: { kind: 'clock', hour: h, minute: m },
        explain: m === 30 ? 'The long hand on 6 means half past.' : m === 15 ? 'The long hand on 3 means quarter past.' : 'The long hand on 9 means quarter to the next hour.',
      })
    }
    default: {
      const k = rng.int(0, 2)
      if (k === 0) {
        const a = rng.int(7, 9)
        const b = rng.int(1, 4)
        return num(level, `School starts at ${a} o'clock in the morning and ends at ${b} o'clock in the afternoon. How many hours is that?`, 12 - a + b, {
          explain: `From ${a} to 12 is ${12 - a} hours, then 12 to ${b} is ${b} more: ${12 - a + b} hours.`,
        })
      }
      if (k === 1) {
        const i = rng.int(0, 6)
        const n = rng.int(3, 5)
        const ans = DAYS[(i + n) % 7]
        return choice('m3', level, `Today is ${DAYS[i]}. What day will it be after ${n} days?`, textOptions(rng, ans, DAYS, 4), ans, { explain: `Count on ${n} days from ${DAYS[i]}: ${ans}.` })
      }
      const [m, d] = rng.pick(MONTHS.filter((x) => x[1] === 30 || x[1] === 31))
      const day = rng.int(d - 6, d - 1)
      const left = d - day
      return num(level, `Today is ${day} ${m}. How many more days until the end of ${m}?`, left, { explain: `${m} has ${d} days. ${d} − ${day} = ${left}.` })
    }
  }
}

// ── Money (shillings and cents) ─────────────────────────────────────────────

const fmt = (sh: number, cts: number) => `Sh ${sh} cts ${String(cts).padStart(2, '0')}`

function ledgerQ(rng: Rng, level: Level, op: '+' | '−', borrow: boolean) {
  for (;;) {
    const a: [number, number] = [rng.int(150, 600), rng.pick([0, 15, 25, 40, 50, 75, 90])]
    const b: [number, number] = [rng.int(100, a[0] - 20), rng.pick([10, 20, 35, 45, 50, 60, 70, 90])]
    const total = op === '+' ? a[0] * 100 + a[1] + b[0] * 100 + b[1] : a[0] * 100 + a[1] - (b[0] * 100 + b[1])
    const carries = op === '+' ? a[1] + b[1] >= 100 : a[1] < b[1]
    if (carries !== borrow || total <= 0) continue
    const sh = Math.floor(total / 100)
    const cts = total % 100
    const ans = fmt(sh, cts)
    const wrong = [fmt(sh + (borrow ? 1 : -1), cts), fmt(sh, (cts + 10) % 100), op === '+' ? fmt(a[0] + b[0], (a[1] + b[1]) % 100 === cts ? (cts + 5) % 100 : (a[1] + b[1]) % 100) : fmt(a[0] - b[0], Math.abs(a[1] - b[1]))].filter((w) => w !== ans)
    const visual: Visual = { kind: 'ledger', rows: [a, b], op }
    return choice('m3', level, op === '+' ? 'Add the money.' : 'Subtract the money.', textOptions(rng, ans, wrong, 4), ans, {
      visual,
      explain: borrow ? (op === '+' ? '100 cents make 1 shilling, so carry 1 to the shillings.' : 'Borrow 1 shilling = 100 cents.') : `Work the cents first, then the shillings: ${ans}.`,
    })
  }
}

export const money3: Generator = (rng, level) => {
  switch (level) {
    case 1: {
      const values = rng.sample([100, 50, 50, 20, 20, 10, 10, 5], rng.int(3, 4)).sort((a, b) => b - a)
      const total = values.reduce((s, v) => s + v, 0)
      return num(level, 'How many shillings is this altogether?', total, { visual: { kind: 'money', values }, explain: `${values.join(' + ')} = ${total}` })
    }
    case 2:
      return ledgerQ(rng, level, '+', false)
    case 3:
      return ledgerQ(rng, level, '−', false)
    case 4:
      return ledgerQ(rng, level, rng.next() < 0.5 ? '+' : '−', true)
    default: {
      const [i1, p1] = rng.pick<[string, number]>([['an exercise book', 45], ['a ruler', 30], ['a story book', 120], ['a pen', 25]])
      const [i2, p2] = rng.pick<[string, number]>([['a pencil', 15], ['a rubber', 10], ['a sharpener', 20], ['a crayon box', 55]])
      const paid = p1 + p2 > 100 ? 200 : 100
      return num(level, `${name(rng)} bought ${i1} at sh ${p1} and ${i2} at sh ${p2}, and paid with a sh ${paid} note. What was the balance in shillings?`, paid - p1 - p2, {
        explain: `${p1} + ${p2} = ${p1 + p2}. ${paid} − ${p1 + p2} = ${paid - p1 - p2}.`,
      })
    }
  }
}

// ── Shapes ──────────────────────────────────────────────────────────────────

const FIG_COUNT = { 'rect-diag': 2, tri2: 3, tri4: 5, tri3: 6, 'rect-cross': 8 } as const

export const shapes3: Generator = (rng, level) => {
  const COLORS = ['#e0876a', '#5fa39a', '#e9c46a', '#6c8ebf']
  switch (level) {
    case 1: {
      const want = rng.pick<ShapeKind>(['circle', 'triangle', 'rectangle', 'square', 'oval'])
      const others = rng.sample((['circle', 'triangle', 'rectangle', 'square', 'oval'] as ShapeKind[]).filter((s) => s !== want), 2)
      const opts = rng.shuffle([want, ...others]).map((k, i) => ({ id: k, visual: { kind: 'shapes' as const, shapes: [{ kind: k, color: COLORS[i] }] } }))
      return choice('m3', level, `Which one is ${want === 'oval' ? 'an oval' : `a ${want}`}?`, opts, want)
    }
    case 2: {
      const k = rng.pick<ShapeKind>(['triangle', 'rectangle', 'square'])
      const ask = rng.pick(['sides', 'corners'])
      const n = k === 'triangle' ? 3 : 4
      return num(level, `How many ${ask} does a ${k} have?`, n, { visual: { kind: 'shapes', shapes: [{ kind: k, color: rng.pick(COLORS) }] }, explain: `A ${k} has ${n} ${ask}.` })
    }
    case 3:
    case 4:
    case 5: {
      const fig = level === 3 ? rng.pick(['rect-diag', 'tri2'] as const) : level === 4 ? rng.pick(['tri4', 'tri3'] as const) : 'rect-cross'
      return num(level, 'How many triangles are there? Look for big ones too!', FIG_COUNT[fig], {
        visual: { kind: 'figure', figure: fig },
        explain: fig === 'tri4' ? '4 small triangles + 1 big triangle = 5.' : fig === 'tri3' ? '3 small, 2 made of two, and 1 big = 6.' : fig === 'tri2' ? '2 small + 1 big = 3.' : fig === 'rect-cross' ? '4 small triangles + 4 made of two small ones = 8.' : 'One line cuts the rectangle into 2 triangles.',
      })
    }
  }
}


// ── Number concept ──────────────────────────────────────────────────────────

const ORD = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twentieth']
const ROW_ART: ArtId[] = ['goat', 'cow', 'hen', 'fish', 'bird', 'tree', 'ball', 'drum', 'book', 'cup', 'mango']
const artOpts = (ids: ArtId[]): Option[] => ids.map((a) => ({ id: a, art: a, label: a }))

function compareOptions(): Option[] {
  return ['<', '>', '='].map((x) => ({ id: x, label: x }))
}

export const concept3: Generator = (rng, level) => {
  switch (level) {
    case 1: {
      const a = rng.int(20, 99)
      let b = rng.int(20, 99)
      while (b === a) b = rng.int(20, 99)
      const ans = a > b ? '>' : '<'
      return choice('m3', level, `Choose the sign: ${a} ___ ${b}`, compareOptions(), ans, { explain: `${a} is ${a > b ? 'greater' : 'less'} than ${b}, so we write ${a} ${ans} ${b}.` })
    }
    case 2: {
      const row = rng.sample(ROW_ART, 5)
      const i = rng.int(0, 4)
      const fromRight = rng.next() < 0.4
      const target = fromRight ? row[4 - i] : row[i]
      const opts = rng.shuffle([target, ...rng.sample(row.filter((x) => x !== target), 2)])
      return choice('m3', level, `Which picture is ${ORD[i]} from the ${fromRight ? 'right' : 'left'}?`, artOpts(opts), target, {
        visual: { kind: 'art', art: row },
        explain: `Count from the ${fromRight ? 'right' : 'left'}: the ${ORD[i]} one is the ${target}.`,
      })
    }
    case 3: {
      if (rng.next() < 0.5) {
        const a = rng.int(100, 999)
        const swap = Math.floor(a / 100) * 100 + (a % 10) * 10 + (Math.floor(a / 10) % 10)
        const b = swap === a ? (a >= 990 ? a - 10 : a + 10) : swap
        const ans = a > b ? '>' : a < b ? '<' : '='
        return choice('m3', level, `Choose the sign: ${a} ___ ${b}`, compareOptions(), ans, { explain: `The hundreds are the same, so compare the tens: ${a} ${ans} ${b}.` })
      }
      const n = rng.int(6, 10)
      const k = rng.int(1, n)
      return num(level, `Children stand in a line of ${n}. Kendi is ${ORD[k - 1]} from the front. How many children are in front of her?`, k - 1, { explain: `If she is ${ORD[k - 1]}, there are ${k - 1} children before her.` })
    }
    case 4: {
      if (rng.next() < 0.5) {
        const h = rng.int(1, 9) * 100
        const t = rng.int(1, 9) * 10
        const o = rng.int(1, 9)
        const n = h + t + o
        const other = rng.next() < 0.4 ? n : n + rng.pick([-10, 10, 1, -1, 100])
        const ans = n > other ? '>' : n < other ? '<' : '='
        return choice('m3', level, `Choose the sign: ${h} + ${t} + ${o} ___ ${other}`, compareOptions(), ans, { explain: `${h} + ${t} + ${o} = ${n}, so ${n} ${ans} ${other}.` })
      }
      const n = rng.int(12, 20)
      const k = rng.int(5, n - 2)
      return num(level, `In a race of ${n} runners, Kiprotich finished ${ORD[k - 1]}. How many runners finished after him?`, n - k, { explain: `${n} − ${k} = ${n - k} runners came after him.` })
    }
    default: {
      if (rng.next() < 0.5) {
        const n = rng.int(12, 20)
        const k = rng.int(3, n - 3)
        return num(level, `There are ${n} learners in a line. Amina is ${ORD[k - 1]} from the front. What is her position from the back? (Write the number)`, n - k + 1, {
          explain: `From the back: ${n} − ${k} + 1 = ${n - k + 1}.`,
        })
      }
      const d = rng.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)
      const nums = [d[0] * 100 + d[1] * 10 + d[2], d[0] * 100 + d[2] * 10 + d[1], d[1] * 100 + d[0] * 10 + d[2], d[2] * 100 + d[1] * 10 + d[0]]
      return {
        id: uid('m3'),
        type: 'order' as const,
        level,
        prompt: 'The numbers use the same digits. Arrange them from the largest to the smallest.',
        tiles: rng.shuffle(nums.map(String)),
        answer: [...nums].sort((a, b) => b - a).map(String),
        joiner: ', ',
        explain: 'Compare the hundreds first, then the tens, then the ones.',
      }
    }
  }
}

// ── Position and direction ──────────────────────────────────────────────────

// Facing order when turning right in a classroom: blackboard → door → back wall → window.
const ROOM = ['the blackboard', 'the door', 'the back wall', 'the window']

export const position3: Generator = (rng, level) => {
  switch (level) {
    case 1: {
      const row = rng.sample(ROW_ART, 3)
      const left = rng.next() < 0.5
      const ans = left ? row[0] : row[2]
      return choice('m3', level, `Look at the row. Which picture is on the ${left ? 'LEFT' : 'RIGHT'} of the ${row[1]}?`, artOpts(rng.shuffle(row)), ans, {
        visual: { kind: 'art', art: row },
        explain: `Your ${left ? 'left' : 'right'} hand side is the ${left ? 'first' : 'last'} one in the row.`,
      })
    }
    case 2: {
      const row = rng.sample(ROW_ART, 5)
      const i = rng.int(1, 3)
      const opts = rng.shuffle([row[i], row[i - 1], row[i + 1]])
      return choice('m3', level, `Which picture is between the ${row[i - 1]} and the ${row[i + 1]}?`, artOpts(opts), row[i], {
        visual: { kind: 'art', art: row },
        explain: `The ${row[i]} is between the ${row[i - 1]} and the ${row[i + 1]}.`,
      })
    }
    case 3: {
      const start = rng.int(0, 3)
      const right = rng.next() < 0.5
      const ans = ROOM[(start + (right ? 1 : 3)) % 4]
      return choice('m3', level, `In our classroom the blackboard is in front, the door is on the right, the window is on the left and the back wall is behind. You face ${ROOM[start]} and turn ${right ? 'right' : 'left'}. What do you face now?`, ROOM.map((r) => ({ id: r, label: r })), ans, {
        explain: `A quarter turn to the ${right ? 'right' : 'left'} from ${ROOM[start]} faces ${ans}.`,
      })
    }
    case 4: {
      const start = rng.int(0, 3)
      const kind = rng.pick(['half', 'full', 'two-right'] as const)
      const steps = kind === 'half' || kind === 'two-right' ? 2 : 4
      const ans = ROOM[(start + steps) % 4]
      const words = kind === 'half' ? 'make a half turn' : kind === 'full' ? 'make a full turn' : 'turn right two times'
      return choice('m3', level, `The blackboard is in front, the door on the right, the window on the left, the back wall behind. You face ${ROOM[start]} and ${words}. What do you face now?`, ROOM.map((r) => ({ id: r, label: r })), ans, {
        explain: kind === 'full' ? 'A full turn brings you back to where you started.' : 'Two quarter turns make a half turn: you face the opposite side.',
      })
    }
    default: {
      if (rng.next() < 0.5) {
        const start = rng.int(0, 3)
        const ans = ROOM[(start + 3) % 4]
        return choice('m3', level, `Blackboard in front, door on the right, window on the left, back wall behind. You face ${ROOM[start]} and turn RIGHT three times. What do you face now?`, ROOM.map((r) => ({ id: r, label: r })), ans, {
          explain: 'Three right turns end in the same place as one left turn.',
        })
      }
      const n = rng.int(6, 9)
      const k = rng.int(2, n - 1)
      return num(level, `${n} pots stand in a row. A red pot is ${ORD[k - 1]} from the left. What is its position from the right? (Write the number)`, n - k + 1, {
        explain: `${n} − ${k} + 1 = ${n - k + 1}.`,
      })
    }
  }
}

export const MATH3_GENERATORS: Record<string, Generator> = {
  't-concept': concept3,
  't-position': position3,
  't-whole': whole3,
  't-add': add3,
  't-sub': sub3,
  't-mul': mul3,
  't-div': div3,
  't-frac': frac3,
  't-length': length3,
  't-mass': mass3,
  't-capacity': capacity3,
  't-time': time3,
  't-money': money3,
  't-shapes': shapes3,
}
