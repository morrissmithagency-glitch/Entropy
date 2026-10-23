// Upper-primary mathematics (Grades 4–6). Each topic is a generator factory taking the grade,
// so number sizes and skills grow year by year. Level 5 matches the hardest JESMA and KPSEA
// questions: multi-step word problems with Kenyan contexts.
import { words3 } from './math3'
import { KENYAN_NAMES, choice, textOptions, uid, countOf, an } from '../helpers'
import type { ChoiceQuestion, Generator, Level, NumberQuestion, Option, Rng, Visual } from '../types'

export type UGrade = 4 | 5 | 6

const num = (level: Level, prompt: string, answer: number, extra: Partial<NumberQuestion> = {}): NumberQuestion => ({ id: uid('um'), type: 'number', level, prompt, answer, ...extra })
const pickQ = (level: Level, prompt: string, answer: string, wrong: string[], explain?: string): ChoiceQuestion => ({
  id: uid('um'),
  type: 'choice',
  level,
  prompt,
  options: [answer, ...[...new Set(wrong)].filter((w) => w !== answer)].slice(0, 4).map((l): Option => ({ id: l, label: l })),
  answer,
  explain,
})
export const fmt = (n: number) => n.toLocaleString('en-US')
const name = (rng: Rng) => rng.pick(KENYAN_NAMES)
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
const lcm = (a: number, b: number) => (a / gcd(a, b)) * b
/** "3/4", "1 1/2", or a whole number, always in lowest terms. */
export function frac(n: number, d: number, mixed = true): string {
  const g = gcd(n, d)
  n /= g
  d /= g
  if (d === 1) return String(n)
  if (mixed && n > d) return `${Math.floor(n / d)} ${n % d}/${d}`
  return `${n}/${d}`
}
/** Decimal to at most 3 places, without trailing zeros. */
const dec = (x: number) => String(Math.round(x * 1000) / 1000)

/** Kenyan number names: 45,302 → "forty-five thousand, three hundred and two". */
export function bigWords(n: number): string {
  if (n < 1000) return words3(n)
  const parts: string[] = []
  const m = Math.floor(n / 1_000_000)
  const th = Math.floor((n % 1_000_000) / 1000)
  const rest = n % 1000
  if (m) parts.push(`${words3(m)} million`)
  if (th) parts.push(`${words3(th)} thousand`)
  if (rest) parts.push(rest < 100 ? `and ${words3(rest)}` : words3(rest))
  return parts.join(', ').replace(', and', ' and')
}

const PLACES = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions']
const maxFor = (g: UGrade) => (g === 4 ? 99_999 : g === 5 ? 999_999 : 9_999_999)

// ── Whole numbers ───────────────────────────────────────────────────────────

export const whole = (g: UGrade): Generator => (rng, level) => {
  const digits = g === 4 ? 5 : g === 5 ? 6 : 7
  const n = rng.int(10 ** (digits - 1), maxFor(g))
  const s = String(n)
  switch (level) {
    case 1: {
      const i = rng.int(0, digits - 1)
      const place = PLACES[digits - 1 - i]
      return pickQ(level, `What is the place value of the digit ${s[i]} in ${fmt(n)}?`, place, rng.sample(PLACES.slice(0, digits).filter((p) => p !== place), 3), `${s[i]} is in the ${place} place.`)
    }
    case 2: {
      const i = rng.int(0, digits - 2)
      const val = Number(s[i]) * 10 ** (digits - 1 - i)
      if (val === 0) return num(level, `What is the total value of the digit ${s[digits - 1]} in ${fmt(n)}?`, Number(s[digits - 1]))
      return num(level, `What is the total value of the digit ${s[i]} in ${fmt(n)}?`, val, { explain: `${s[i]} × ${fmt(10 ** (digits - 1 - i))} = ${fmt(val)}` })
    }
    case 3: {
      const wrong = [n + 10 ** (digits - 2), Number(s.slice(0, -2) + s.slice(-1) + s.slice(-2, -1)), n - 1000].filter((x) => x !== n && x > 0)
      if (rng.next() < 0.5) return pickQ(level, `Which number is "${bigWords(n)}"?`, fmt(n), wrong.map(fmt), `${bigWords(n)} = ${fmt(n)}`)
      return pickQ(level, `Write ${fmt(n)} in words.`, bigWords(n), wrong.map(bigWords))
    }
    case 4: {
      const places = g === 4 ? [10, 100, 1000] : g === 5 ? [100, 1000, 10000] : [1000, 10000, 100000]
      const p = rng.pick(places)
      const r = Math.round(n / p) * p
      const word = { 10: 'ten', 100: 'hundred', 1000: 'thousand', 10000: 'ten thousand', 100000: 'hundred thousand' }[p]
      return num(level, `Round off ${fmt(n)} to the nearest ${word}.`, r, { explain: `Look at the digit after the ${word}s place: ${fmt(n)} → ${fmt(r)}.` })
    }
    default: {
      if (g === 6 && rng.next() < 0.5) {
        const k = rng.int(11, 30)
        return rng.next() < 0.5
          ? num(level, `What is the square root of ${k * k}?`, k, { explain: `${k} × ${k} = ${k * k}` })
          : num(level, `What is the square of ${k}?`, k * k, { explain: `${k} × ${k} = ${k * k}` })
      }
      if (rng.next() < 0.5) {
        const ds = rng.sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], digits === 7 ? 6 : 5)
        const big = rng.next() < 0.5
        const sorted = [...ds].sort((a, b) => (big ? b - a : a - b))
        if (!big && sorted[0] === 0) [sorted[0], sorted[1]] = [sorted[1], sorted[0]]
        return num(level, `Using the digits ${ds.join(', ')} once each, write the ${big ? 'largest' : 'smallest'} possible number.`, Number(sorted.join('')), { explain: big ? 'Biggest digit first.' : 'Smallest digit first, but a number cannot start with 0.' })
      }
      const i = rng.int(0, digits - 3)
      const a = Number(s[i]) * 10 ** (digits - 1 - i)
      const j = i + rng.int(1, 2)
      const b = Number(s[j]) * 10 ** (digits - 1 - j)
      return num(level, `In ${fmt(n)}, what is the difference between the total value of ${s[i]} and the total value of ${s[j]}?`, Math.abs(a - b), { explain: `${fmt(a)} − ${fmt(b)} = ${fmt(Math.abs(a - b))}` })
    }
  }
}

// ── Addition and subtraction ────────────────────────────────────────────────

const STORIES_ADD = [
  (a: number, b: number) => `A county planted ${fmt(a)} trees in March and ${fmt(b)} trees in April. How many trees were planted altogether?`,
  (a: number, b: number) => `A factory packed ${fmt(a)} bottles of milk on Monday and ${fmt(b)} on Tuesday. How many bottles were packed in the two days?`,
  (a: number, b: number) => `${fmt(a)} people watched a football match on Saturday and ${fmt(b)} on Sunday. How many people watched the matches?`,
  (a: number, b: number) => `A farmer harvested ${fmt(a)} kg of maize and ${fmt(b)} kg of beans. What was the total harvest in kg?`,
]
const STORIES_SUB = [
  (a: number, b: number) => `A school library had ${fmt(a)} books. ${fmt(b)} books were given to a new school. How many books remained?`,
  (a: number, b: number) => `A town had ${fmt(a)} people. ${fmt(b)} of them were children. How many were adults?`,
  (a: number, b: number) => `A tank held ${fmt(a)} litres of water. ${fmt(b)} litres were used. How many litres were left?`,
  (a: number, b: number) => `A shop had ${fmt(a)} shillings. It paid ${fmt(b)} shillings to suppliers. How much money was left?`,
]

export const addition = (g: UGrade): Generator => (rng, level) => {
  const top = g === 4 ? 99_999 : 999_999
  const a = rng.int(Math.floor(top / 20), Math.floor(top / 2))
  const b = rng.int(Math.floor(top / 30), Math.floor(top / 2.2))
  switch (level) {
    case 1: {
      const x = rng.int(1000, 4999)
      const y = rng.int(100, 4999 - (x % 1000))
      return num(level, `${fmt(x)} + ${fmt(y)} =`, x + y)
    }
    case 2:
      return num(level, `${fmt(a)} + ${fmt(b)} =`, a + b, { explain: 'Add from the ones, carrying where a column makes 10 or more.' })
    case 3: {
      const c = rng.int(100, Math.floor(top / 10))
      return num(level, `${fmt(a)} + ${fmt(b)} + ${fmt(c)} =`, a + b + c)
    }
    case 4:
      return num(level, rng.pick(STORIES_ADD)(a, b), a + b, { explain: `${fmt(a)} + ${fmt(b)} = ${fmt(a + b)}` })
    default: {
      if (rng.next() < 0.5) return num(level, `${fmt(a)} + ___ = ${fmt(a + b)}`, b, { explain: `${fmt(a + b)} − ${fmt(a)} = ${fmt(b)}` })
      const r = (x: number) => Math.round(x / 1000) * 1000
      return num(level, `Round off ${fmt(a)} and ${fmt(b)} to the nearest thousand, then add. What is the estimate?`, r(a) + r(b), { explain: `${fmt(r(a))} + ${fmt(r(b))} = ${fmt(r(a) + r(b))}` })
    }
  }
}

export const subtraction = (g: UGrade): Generator => (rng, level) => {
  const top = g === 4 ? 99_999 : 999_999
  const a = rng.int(Math.floor(top / 3), top)
  const b = rng.int(Math.floor(top / 20), a - Math.floor(top / 30))
  switch (level) {
    case 1: {
      const x = rng.int(5000, 9999)
      const y = rng.int(1000, x - 1000)
      return num(level, `${fmt(x)} − ${fmt(y)} =`, x - y)
    }
    case 2:
      return num(level, `${fmt(a)} − ${fmt(b)} =`, a - b, { explain: 'Borrow from the next column when the top digit is smaller.' })
    case 3: {
      const z = rng.int(1, 9) * 10 ** (g === 4 ? 4 : 5)
      const y = rng.int(1000, z - 1)
      return num(level, `${fmt(z)} − ${fmt(y)} =`, z - y, { explain: 'Borrow across the zeros, one place at a time.' })
    }
    case 4:
      return num(level, rng.pick(STORIES_SUB)(a, b), a - b, { explain: `${fmt(a)} − ${fmt(b)} = ${fmt(a - b)}` })
    default: {
      const c = rng.int(Math.floor(b / 4), Math.floor(b / 2))
      const who = name(rng)
      return num(level, `${who}'s school raised ${fmt(a)} shillings. It spent ${fmt(b - c)} shillings on desks and ${fmt(c)} shillings on books. How much money was left?`, a - b, { explain: `${fmt(b - c)} + ${fmt(c)} = ${fmt(b)}; ${fmt(a)} − ${fmt(b)} = ${fmt(a - b)}` })
    }
  }
}

// ── Multiplication and division ─────────────────────────────────────────────

export const multiplication = (g: UGrade): Generator => (rng, level) => {
  switch (level) {
    case 1: {
      const a = rng.int(100, g === 4 ? 999 : 9999)
      const b = rng.int(2, 9)
      return num(level, `${fmt(a)} × ${b} =`, a * b)
    }
    case 2: {
      const a = rng.int(g === 4 ? 12 : 100, g === 4 ? 99 : 999)
      const p = rng.pick([10, 100, 1000])
      return num(level, `${fmt(a)} × ${fmt(p)} =`, a * p, { explain: `Multiplying by ${fmt(p)} adds ${String(p).length - 1} zero${p > 10 ? 's' : ''}.` })
    }
    case 3: {
      const a = rng.int(g === 4 ? 100 : 1000, g === 4 ? 999 : 9999)
      const b = rng.int(11, g === 6 ? 999 : 99)
      return num(level, `${fmt(a)} × ${b} =`, a * b, { explain: 'Multiply by the ones, then the tens (and hundreds), then add.' })
    }
    case 4: {
      const [what, per, unit] = rng.pick<[string, [number, number], string]>([
        ['crates of soda, each with 24 bottles', [24, 24], 'bottles'],
        ['bags of maize, each weighing 90 kg', [90, 90], 'kg'],
        ['boxes of chalk, each with 48 sticks', [48, 48], 'sticks of chalk'],
        ['cartons of exercise books, each with 144 books', [144, 144], 'books'],
        ['rolls of wire, each 125 m long', [125, 125], 'm'],
      ])
      const n = rng.int(12, g === 4 ? 48 : 250)
      return num(level, `A school bought ${n} ${what}. How many ${unit} is that altogether?`, n * per[0], { explain: `${n} × ${per[0]} = ${fmt(n * per[0])}` })
    }
    default: {
      if (g === 6) {
        const a = rng.int(10, 60)
        const b = rng.int(2, 9)
        const c = rng.int(2, 9)
        const d = rng.int(1, a)
        const form = rng.int(0, 2)
        if (form === 0) return num(level, `Work out: ${a} + ${b} × ${c} − ${d}`, a + b * c - d, { explain: `Multiply first: ${b} × ${c} = ${b * c}; then ${a} + ${b * c} − ${d} = ${a + b * c - d}.` })
        if (form === 1) return num(level, `Work out: (${a} + ${b}) × ${c}`, (a + b) * c, { explain: `Brackets first: ${a + b} × ${c} = ${(a + b) * c}.` })
        return num(level, `Work out: ${b * c * 2} ÷ ${b} + ${a}`, 2 * c + a, { explain: `Divide first: ${b * c * 2} ÷ ${b} = ${2 * c}; then + ${a} = ${2 * c + a}.` })
      }
      const price = rng.int(15, 95) * 10
      const n = rng.int(12, 48)
      const days = rng.int(3, 7)
      return num(level, `A trader sells ${n} trays of eggs every day at ${fmt(price)} shillings each. How much money does the trader get in ${days} days?`, price * n * days, { explain: `${fmt(price)} × ${n} = ${fmt(price * n)}; × ${days} = ${fmt(price * n * days)}` })
    }
  }
}

export const division = (g: UGrade): Generator => (rng, level) => {
  switch (level) {
    case 1: {
      const b = rng.int(2, 9)
      const q = rng.int(g === 4 ? 21 : 101, g === 4 ? 199 : 999)
      return num(level, `${fmt(b * q)} ÷ ${b} =`, q)
    }
    case 2: {
      if (g === 6) {
        if (rng.next() < 0.4) {
          const primes = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
          const prime = rng.pick(primes)
          const composite = rng.sample([21, 27, 33, 39, 49, 51, 57, 63, 69, 77, 81, 87, 91, 93].filter((x) => Math.abs(x - prime) < 40), 3)
          return pickQ(level, 'Which of these is a prime number?', String(prime), composite.map(String), 'A prime number has exactly two factors: 1 and itself.')
        }
        const p = rng.pick([12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48, 50, 54, 60, 64, 72])
        const fs = Array.from({ length: p }, (_, i) => i + 1).filter((x) => p % x === 0)
        return num(level, `How many factors does ${p} have?`, fs.length, { explain: `The factors of ${p} are ${fs.join(', ')}.` })
      }
      const b = rng.int(2, 9)
      const q = rng.int(20, 300)
      const r = rng.int(1, b - 1)
      return num(level, `What is the remainder when ${fmt(b * q + r)} is divided by ${b}?`, r, { explain: `${b} × ${q} = ${fmt(b * q)}; ${fmt(b * q + r)} − ${fmt(b * q)} = ${r}` })
    }
    case 3: {
      if (g === 6) {
        const [a, b] = rng.pick([[12, 18], [8, 12], [15, 20], [6, 9], [24, 36], [16, 24], [10, 15], [14, 21]])
        return rng.next() < 0.5
          ? num(level, `Find the LCM of ${a} and ${b}.`, lcm(a, b), { explain: `The smallest number both divide into is ${lcm(a, b)}.` })
          : num(level, `Find the GCD (HCF) of ${a} and ${b}.`, gcd(a, b), { explain: `The biggest number that divides both is ${gcd(a, b)}.` })
      }
      const b = g === 4 ? rng.int(2, 9) : rng.int(11, 25)
      const q = rng.int(g === 4 ? 100 : 20, g === 4 ? 999 : 400)
      return num(level, `${fmt(b * q)} ÷ ${b} =`, q)
    }
    case 4: {
      if (g >= 5 && rng.next() < 0.5) {
        const d = rng.pick([3, 4, 5, 6, 9])
        const ok = d * rng.int(101, 999)
        const wrong = [ok + 1, ok + 2, ok - 1].filter((x) => x % d !== 0)
        return pickQ(level, `Which number is divisible by ${d}?`, fmt(ok), wrong.map(fmt), d === 3 || d === 9 ? `Add the digits; the sum divides by ${d}.` : d === 4 ? 'The last two digits divide by 4.' : d === 5 ? 'It ends in 0 or 5.' : 'It is even and divisible by 3.')
      }
      const per = rng.pick([6, 8, 12, 24])
      const items = per * rng.int(15, 80) + rng.int(1, per - 1)
      return num(level, `${fmt(items)} oranges are packed in boxes of ${per}. How many FULL boxes are there?`, Math.floor(items / per), { explain: `${fmt(items)} ÷ ${per} = ${Math.floor(items / per)} remainder ${items % per}.` })
    }
    default: {
      if (g === 6 && rng.next() < 0.5) {
        const [a, b, c] = rng.pick([[6, 8, 12], [4, 6, 10], [8, 12, 16], [5, 6, 15], [9, 12, 18]])
        const l = lcm(lcm(a, b), c)
        return num(level, `Three bells ring every ${a}, ${b} and ${c} minutes. They ring together at 8:00 a.m. After how many minutes will they next ring together?`, l, { explain: `LCM of ${a}, ${b} and ${c} = ${l}.` })
      }
      const cap = rng.pick([45, 52, 60, 64])
      const people = cap * rng.int(4, 20) + rng.int(1, cap - 1)
      return num(level, `A school is taking ${fmt(people)} learners on a trip. Each bus carries ${cap} learners. How many buses are needed?`, Math.ceil(people / cap), { explain: `${fmt(people)} ÷ ${cap} = ${Math.floor(people / cap)} remainder ${people % cap}, so one more bus is needed: ${Math.ceil(people / cap)}.` })
    }
  }
}

// ── Fractions ───────────────────────────────────────────────────────────────

function fracWrong(_rng: Rng, ans: string, n: number, d: number): string[] {
  return [frac(n + 1, d), frac(n, d + 1), frac(Math.max(1, n - 1), d), frac(d, n > 0 ? n : 1)].filter((w) => w !== ans)
}

export const fractions = (g: UGrade): Generator => (rng, level) => {
  if (g === 4) {
    switch (level) {
      case 1: {
        const d = rng.pick([2, 3, 4, 5])
        const k = rng.int(2, 5)
        return num(level, `1/${d} = ?/${d * k}`, k, { explain: `Multiply top and bottom by ${k}.` })
      }
      case 2: {
        const [a, b] = rng.pick([[2, 3], [3, 4], [3, 5], [4, 5], [5, 6], [1, 2]])
        const [c, d] = rng.pick([[1, 2], [2, 3], [3, 4], [1, 3], [2, 5], [3, 8]])
        if (a * d === b * c) return pickQ(level, `Which is bigger: ${a}/${b} or ${c}/${d}?`, 'they are equal', [`${a}/${b}`, `${c}/${d}`])
        const big = a * d > b * c ? `${a}/${b}` : `${c}/${d}`
        return pickQ(level, `Which is bigger: ${a}/${b} or ${c}/${d}?`, big, [big === `${a}/${b}` ? `${c}/${d}` : `${a}/${b}`, 'they are equal'], 'Change both to the same denominator, then compare the tops.')
      }
      case 3: {
        const d = rng.pick([5, 6, 7, 8, 9, 10])
        const a = rng.int(1, d - 2)
        const b = rng.int(1, d - a - 1)
        const ans = frac(a + b, d)
        return pickQ(level, `${a}/${d} + ${b}/${d} =`, ans, [`${a + b}/${d + d}`, ...fracWrong(rng, ans, a + b, d)], 'Same denominator: add the tops only.')
      }
      case 4: {
        const [d1, d2] = rng.pick([[2, 4], [2, 8], [4, 8], [3, 6], [2, 6], [5, 10]])
        const a = 1
        const b = rng.int(1, d2 - 1 - d2 / d1)
        const ans = frac(a * (d2 / d1) + b, d2)
        return pickQ(level, `1/${d1} + ${b}/${d2} =`, ans, [`${1 + b}/${d1 + d2}`, ...fracWrong(rng, ans, d2 / d1 + b, d2)], `1/${d1} = ${d2 / d1}/${d2}; then add.`)
      }
      default: {
        const total = rng.pick([24, 32, 36, 40, 48])
        const [n, d] = rng.pick([[1, 4], [3, 8], [1, 3], [2, 3], [3, 4], [1, 6]].filter(([, dd]) => total % dd === 0))
        return num(level, `${name(rng)} had ${total} mangoes and gave away ${n}/${d} of them. How many mangoes were left?`, total - (total / d) * n, { explain: `${n}/${d} of ${total} = ${(total / d) * n}; ${total} − ${(total / d) * n} = ${total - (total / d) * n}` })
      }
    }
  }
  if (g === 5) {
    switch (level) {
      case 1: {
        const d = rng.pick([3, 4, 5, 6, 8])
        const w = rng.int(1, 4)
        const n = rng.int(1, d - 1)
        const ans = `${w * d + n}/${d}`
        return pickQ(level, `Write ${w} ${n}/${d} as an improper fraction.`, ans, [`${w + n}/${d}`, `${w * d - n}/${d}`, `${w * n}/${d}`, `${n}/${w * d}`, `${w * d + n + 1}/${d}`], `${w} × ${d} + ${n} = ${w * d + n}.`)
      }
      case 2: {
        const d = rng.pick([3, 4, 5, 6, 8])
        const top = rng.int(d + 1, d * 4)
        if (top % d === 0) return num(level, `${top}/${d} =`, top / d)
        const ans = frac(top, d)
        return pickQ(level, `Write ${top}/${d} as a mixed number in its simplest form.`, ans, [`${top % d} ${Math.floor(top / d)}/${d}`, `${Math.floor(top / d) + 1} ${top % d}/${d}`, `${Math.floor(top / d)} ${d}/${top % d}`], `${top} ÷ ${d} = ${Math.floor(top / d)} remainder ${top % d}.`)
      }
      case 3: {
        const [d1, d2] = rng.pick([[2, 3], [3, 4], [4, 6], [2, 5], [3, 5], [4, 5]])
        const a = rng.int(1, d1 - 1)
        const b = rng.int(1, d2 - 1)
        const l = lcm(d1, d2)
        const top = (a * l) / d1 + (b * l) / d2
        const ans = frac(top, l)
        return pickQ(level, `${a}/${d1} + ${b}/${d2} =`, ans, [`${a + b}/${d1 + d2}`, ...fracWrong(rng, ans, top, l)], `Use ${l} as the denominator.`)
      }
      case 4: {
        const [d1, d2] = rng.pick([[2, 3], [3, 4], [4, 6], [2, 5], [3, 5], [4, 8]])
        const w1 = rng.int(3, 6)
        const w2 = rng.int(1, w1 - 1)
        const a = rng.int(1, d1 - 1)
        const b = rng.int(1, d2 - 1)
        const l = lcm(d1, d2)
        const top = (w1 * d1 + a) * (l / d1) - (w2 * d2 + b) * (l / d2)
        const ans = frac(top, l)
        return pickQ(level, `${w1} ${a}/${d1} − ${w2} ${b}/${d2} =`, ans, fracWrong(rng, ans, top, l), 'Change to improper fractions with a common denominator, then subtract.')
      }
      default: {
        const total = rng.pick([24, 36, 48, 60, 72])
        const [a, b] = rng.pick([[1, 3], [1, 4], [1, 6], [1, 2]])
        const [c, d] = rng.pick([[1, 4], [1, 3], [1, 6], [1, 8]].filter(([, dd]) => dd !== b))
        const used = (total / b) * a + (total / d) * c
        if (used >= total || !Number.isInteger((total / b) * a + (total / d) * c)) return num(level, `What is 3/4 of ${total}?`, (total / 4) * 3)
        return num(level, `A farmer had ${total} goats. He sold ${a}/${b} of them and gave ${c}/${d} of them to his son. How many goats remained?`, total - used, { explain: `${a}/${b} of ${total} = ${(total / b) * a}; ${c}/${d} of ${total} = ${(total / d) * c}; ${total} − ${used} = ${total - used}` })
      }
    }
  }
  switch (level) {
    case 1: {
      const [a, b] = [rng.int(1, 4), rng.pick([3, 5, 7])]
      const [c, d] = [rng.int(1, 5), rng.pick([4, 6, 8])]
      const ans = frac(a * c, b * d)
      return pickQ(level, `${a}/${b} × ${c}/${d} =`, ans, [`${a + c}/${b + d}`, frac(a * d, b * c), frac(a * c + 1, b * d)], 'Multiply the tops, multiply the bottoms, then simplify.')
    }
    case 2: {
      const n = rng.pick([12, 18, 24, 30, 36, 40, 48, 60])
      const [a, b] = rng.pick([[2, 3], [3, 4], [5, 6], [3, 5], [5, 8]].filter(([, bb]) => n % bb === 0))
      return num(level, `What is ${a}/${b} of ${n}?`, (n / b) * a, { explain: `${n} ÷ ${b} × ${a} = ${(n / b) * a}` })
    }
    case 3: {
      const b = rng.pick([2, 3, 4, 6])
      const a = rng.int(1, b - 1)
      const d = rng.pick([3, 5, 8])
      const c = rng.int(1, d - 1)
      const ans = frac(a * d, b * c)
      return pickQ(level, `${a}/${b} ÷ ${c}/${d} =`, ans, [frac(a * c, b * d), frac(b * c, a * d), `${a}/${b * c}`], `Turn the second fraction upside down and multiply: ${a}/${b} × ${d}/${c}.`)
    }
    case 4: {
      const w = rng.int(2, 6)
      const n = rng.pick([1, 3])
      const d = 4
      const k = rng.int(2, 5)
      const ans = frac((w * d + n) * k, d)
      return pickQ(level, `${w} ${n}/${d} × ${k} =`, ans, fracWrong(rng, ans, (w * d + n) * k, d), `${w} ${n}/${d} = ${w * d + n}/${d}; × ${k} = ${(w * d + n) * k}/${d}.`)
    }
    default: {
      const total = rng.pick([1200, 1800, 2400, 3600, 4800])
      const spent = total / 3
      const rest = total - spent
      const saved = rest / 4
      return num(level, `${name(rng)} earned ${fmt(total)} shillings. 1/3 of the money went on food and 1/4 of the remainder on fare. How much money was left?`, rest - saved, { explain: `1/3 of ${fmt(total)} = ${fmt(spent)}; remainder ${fmt(rest)}; 1/4 of that = ${fmt(saved)}; left: ${fmt(rest - saved)}` })
    }
  }
}

// ── Decimals ────────────────────────────────────────────────────────────────

const decWrong = (x: number) => [dec(x * 10), dec(x / 10), dec(x + 0.1), dec(x - 0.01)].filter((w) => Number(w) > 0)

export const decimals = (g: UGrade): Generator => (rng, level) => {
  if (g === 4) {
    switch (level) {
      case 1: {
        const t = rng.int(1, 9)
        if (rng.next() < 0.5) return pickQ(level, `Write ${t}/10 as a decimal.`, `0.${t}`, [`${t}.0`, `0.0${t}`, `${t}.10`], `${countOf(t, 'tenth')} = 0.${t}`)
        const w = rng.int(1, 9)
        return pickQ(level, `In ${w}.${t}, what is the value of the digit ${t}?`, countOf(t, 'tenth'), [countOf(t, 'one'), countOf(t, 'hundredth'), countOf(t, 'ten')], `The first digit after the point is tenths.`)
      }
      case 2: {
        const h = rng.int(11, 99)
        return pickQ(level, `Write ${h}/100 as a decimal.`, dec(h / 100), [dec(h / 10), dec(h / 1000), `${h}.0`], `${h} hundredths = ${dec(h / 100)}`)
      }
      case 3: {
        const a = rng.int(11, 99) / 100
        let b = rng.int(11, 99) / 100
        while (b === a) b = rng.int(11, 99) / 100
        return pickQ(level, `Which is bigger: ${dec(a)} or ${dec(b)}?`, dec(Math.max(a, b)), [dec(Math.min(a, b))], 'Compare tenths first, then hundredths.')
      }
      case 4: {
        const a = rng.int(11, 89) / 10
        const b = rng.int(11, 89) / 10
        return pickQ(level, `${dec(a)} + ${dec(b)} =`, dec(a + b), decWrong(a + b), 'Line up the decimal points, then add.')
      }
      default: {
        const a = rng.int(50, 99) / 10
        const b = rng.int(11, 49) / 10
        return pickQ(level, `A ribbon was ${dec(a)} m long. ${dec(b)} m was cut off. How long is the ribbon now?`, `${dec(a - b)} m`, decWrong(a - b).map((x) => `${x} m`))
      }
    }
  }
  if (g === 5) {
    switch (level) {
      case 1: {
        const n = rng.int(1001, 9999) / 1000
        const s = n.toFixed(3)
        const i = rng.int(2, 4)
        const place = ['', '', 'tenths', 'hundredths', 'thousandths'][i]
        return pickQ(level, `What is the place value of ${s[i]} in ${s}?`, place, ['tenths', 'hundredths', 'thousandths', 'ones'].filter((p) => p !== place))
      }
      case 2: {
        const n = rng.int(101, 999)
        const f = frac(n, 1000, false)
        return pickQ(level, `Write ${dec(n / 1000)} as a fraction in its simplest form.`, f, [`${n}/100`, `${n}/10`, `${n}/1000` === f ? `${n + 1}/1000` : `${n}/1000`])
      }
      case 3: {
        const a = rng.int(101, 999) / 100
        const b = rng.int(101, 999) / 100
        return pickQ(level, `${a.toFixed(2)} + ${b.toFixed(2)} =`, dec(a + b), decWrong(a + b))
      }
      case 4: {
        const a = rng.int(500, 999) / 100
        const b = rng.int(101, 499) / 100
        return pickQ(level, `${a.toFixed(2)} − ${b.toFixed(2)} =`, dec(a - b), decWrong(a - b))
      }
      default: {
        const a = rng.int(120, 350) / 100
        const b = rng.int(80, 220) / 100
        const c = rng.int(50, 150) / 100
        const total = a + b + c
        return pickQ(level, `${name(rng)} bought ${a.toFixed(2)} kg of sugar, ${b.toFixed(2)} kg of rice and ${c.toFixed(2)} kg of beans. What was the total mass?`, `${dec(total)} kg`, decWrong(total).map((x) => `${x} kg`))
      }
    }
  }
  switch (level) {
    case 1: {
      const a = rng.int(11, 999) / 100
      const p = rng.pick([10, 100, 1000])
      return pickQ(level, `${dec(a)} × ${fmt(p)} =`, dec(a * p), [dec(a * p * 10), dec(a * (p / 10)), dec(a + p)], `Move the decimal point ${String(p).length - 1} place${p > 10 ? 's' : ''} to the right.`)
    }
    case 2: {
      const a = rng.int(11, 99) / 10
      const b = rng.int(3, 9)
      return pickQ(level, `${dec(a)} × ${b} =`, dec(a * b), decWrong(a * b))
    }
    case 3: {
      const b = rng.int(3, 9)
      const q = rng.int(11, 99) / 100
      return pickQ(level, `${dec(q * b)} ÷ ${b} =`, dec(q), decWrong(q))
    }
    case 4: {
      const a = rng.int(11, 49) / 10
      const b = rng.int(11, 39) / 10
      return pickQ(level, `${dec(a)} × ${dec(b)} =`, dec(a * b), [dec(a * b * 10), dec(a * b / 10), dec(a + b)], 'Multiply as whole numbers, then count the decimal places in both numbers.')
    }
    default: {
      const price = rng.int(45, 95)
      const kg = rng.int(15, 45) / 10
      return pickQ(level, `Rice costs ${price} shillings per kg. How much do ${dec(kg)} kg cost?`, `${dec(price * kg)} shillings`, [dec(price * kg * 10), dec(price * kg / 10), dec(price + kg)].map((x) => `${x} shillings`))
    }
  }
}

// ── Percentages (Grade 6) ───────────────────────────────────────────────────

export const percentages = (): Generator => (rng, level) => {
  switch (level) {
    case 1: {
      const [n, d] = rng.pick([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 10], [3, 10], [7, 10], [9, 10], [1, 20], [9, 20], [13, 20], [3, 25], [7, 25], [12, 25], [1, 50], [17, 50], [3, 2], [5, 4]])
      return num(level, `Express ${n}/${d} as a percentage. (Write the number only)`, (n * 100) / d, { explain: `${n}/${d} × 100 = ${(n * 100) / d}%` })
    }
    case 2: {
      const p = rng.pick([10, 20, 25, 40, 50, 60, 75, 80, 15, 35, 45, 65, 5, 12, 24, 30, 36, 44, 55, 70, 85, 90, 95, 8])
      const ans = frac(p, 100, false)
      return pickQ(level, `Write ${p}% as a fraction in its simplest form.`, ans, [`${p}/10`, `${p}/100` === ans ? `${p + 5}/100` : `${p}/100`, frac(100 - p, 100, false)])
    }
    case 3: {
      const p = rng.pick([10, 20, 25, 30, 40, 50, 75, 15, 5])
      const q = rng.pick([200, 400, 600, 800, 1200, 1600, 2000, 2400])
      return num(level, `What is ${p}% of ${fmt(q)}?`, (p * q) / 100, { explain: `${p}/100 × ${fmt(q)} = ${fmt((p * q) / 100)}` })
    }
    case 4: {
      const total = rng.pick([20, 40, 60, 80, 100])
      const p = rng.pick([10, 20, 25, 30, 40, 50, 60, 75, 80].filter((x) => (total * x) % 100 === 0))
      const part = (total * p) / 100
      return num(level, `${part} out of ${total} learners walk to school. What percentage walk to school?`, p, { explain: `${part}/${total} × 100 = ${p}%` })
    }
    default: {
      const price = rng.pick([800, 1200, 1500, 2000, 2400, 3000])
      const off = rng.pick([10, 15, 20, 25])
      return num(level, `A pair of shoes is marked ${fmt(price)} shillings. The shop gives ${an(off)}% discount. How much does the buyer pay?`, price - (price * off) / 100, { explain: `${off}% of ${fmt(price)} = ${fmt((price * off) / 100)}; ${fmt(price)} − ${fmt((price * off) / 100)} = ${fmt(price - (price * off) / 100)}` })
    }
  }
}

// ── Length ──────────────────────────────────────────────────────────────────

export const lengthU = (g: UGrade): Generator => (rng, level) => {
  switch (level) {
    case 1: {
      if (g === 4) {
        const m = rng.int(2, 9)
        const cm = rng.int(5, 95)
        return num(level, `${m} m ${cm} cm = ___ cm`, m * 100 + cm, { explain: `1 m = 100 cm: ${m * 100} + ${cm} = ${m * 100 + cm}` })
      }
      const km = rng.int(2, 9)
      const m = rng.int(50, 950)
      return num(level, `${km} km ${m} m = ___ m`, km * 1000 + m, { explain: `1 km = 1,000 m: ${fmt(km * 1000)} + ${m} = ${fmt(km * 1000 + m)}` })
    }
    case 2: {
      const l = rng.int(5, 40)
      const w = rng.int(3, l - 1)
      return num(level, `What is the perimeter of a rectangle ${l} m long and ${w} m wide? (in metres)`, 2 * (l + w), { explain: `2 × (${l} + ${w}) = ${2 * (l + w)} m` })
    }
    case 3: {
      if (g === 6) {
        const d = 7 * rng.int(1, 20)
        return num(level, `Find the circumference of a circle of diameter ${d} cm. (Take π = 22/7)`, (22 * d) / 7, { explain: `C = πd = 22/7 × ${d} = ${(22 * d) / 7} cm` })
      }
      const a = [rng.int(1, 6), rng.int(10, 90)]
      const b = [rng.int(1, 6), rng.int(20, 95)]
      const total = a[0] * 100 + a[1] + b[0] * 100 + b[1]
      return pickQ(level, `${a[0]} m ${a[1]} cm + ${b[0]} m ${b[1]} cm =`, `${Math.floor(total / 100)} m ${total % 100} cm`, [`${a[0] + b[0]} m ${a[1] + b[1]} cm`, `${Math.floor(total / 100) + 1} m ${total % 100} cm`, `${Math.floor(total / 100)} m ${(total % 100) + 10} cm`], 'Add the cm; every 100 cm makes 1 m.')
    }
    case 4: {
      if (g === 6) {
        const r = 7 * rng.int(1, 15)
        return num(level, `A circular flower bed has a radius of ${r} m. What is its circumference? (Take π = 22/7)`, (44 * r) / 7, { explain: `C = 2πr = 2 × 22/7 × ${r} = ${(44 * r) / 7} m` })
      }
      const p = 2 * rng.int(20, 90)
      const l = rng.int(Math.ceil(p / 4) + 1, p / 2 - 2)
      return num(level, `A rectangular garden has a perimeter of ${p} m. Its length is ${l} m. What is its width?`, p / 2 - l, { explain: `Half the perimeter is ${p / 2} m; ${p / 2} − ${l} = ${p / 2 - l} m` })
    }
    default: {
      const l = rng.int(20, 80)
      const w = rng.int(10, l - 5)
      const per = rng.pick([50, 80, 120, 150])
      return num(level, `A rectangular plot is ${l} m by ${w} m. Fencing costs ${per} shillings per metre. How much will it cost to fence the plot?`, 2 * (l + w) * per, { explain: `Perimeter = ${2 * (l + w)} m; × ${per} = ${fmt(2 * (l + w) * per)} shillings` })
    }
  }
}

// ── Area ────────────────────────────────────────────────────────────────────

export const areaU = (g: UGrade): Generator => (rng, level) => {
  switch (level) {
    case 1: {
      if (g === 6) {
        const b = 2 * rng.int(3, 15)
        const h = rng.int(4, 20)
        return num(level, `Find the area of a triangle with base ${b} cm and height ${h} cm. (cm²)`, (b * h) / 2, { explain: `½ × ${b} × ${h} = ${(b * h) / 2} cm²` })
      }
      const s = rng.int(2, 20)
      return rng.next() < 0.6
        ? num(level, `Find the area of a square of side ${s} cm. (cm²)`, s * s, { explain: `${s} × ${s} = ${s * s} cm²` })
        : num(level, `A square has an area of ${s * s} cm². How long is each side? (cm)`, s, { explain: `${s} × ${s} = ${s * s}` })
    }
    case 2: {
      const l = rng.int(5, 30)
      const w = rng.int(3, l - 1)
      return num(level, `Find the area of a rectangle ${l} cm long and ${w} cm wide. (cm²)`, l * w, { explain: `${l} × ${w} = ${l * w} cm²` })
    }
    case 3: {
      const w = rng.int(4, 20)
      const l = rng.int(w + 1, 30)
      return num(level, `A rectangle has an area of ${l * w} m² and a width of ${w} m. What is its length?`, l, { explain: `${l * w} ÷ ${w} = ${l} m` })
    }
    case 4: {
      // L-shape: a big rectangle with a corner cut away.
      const L = rng.int(10, 20)
      const W = rng.int(8, 14)
      const cl = rng.int(3, L - 4)
      const cw = rng.int(2, W - 3)
      return num(level, `A rectangular room is ${L} m by ${W} m. A corner ${cl} m by ${cw} m is a store. What is the area of the rest of the room? (m²)`, L * W - cl * cw, { explain: `${L} × ${W} = ${L * W}; ${cl} × ${cw} = ${cl * cw}; ${L * W} − ${cl * cw} = ${L * W - cl * cw} m²` })
    }
    default: {
      const l = rng.int(4, 12)
      const w = rng.int(3, l)
      const tile = rng.pick([25, 50])
      const tiles = ((l * 100) / tile) * ((w * 100) / tile)
      return num(level, `A floor ${l} m by ${w} m is covered with square tiles of side ${tile} cm. How many tiles are needed?`, tiles, { explain: `${(l * 100) / tile} tiles along × ${(w * 100) / tile} across = ${fmt(tiles)}` })
    }
  }
}

// ── Volume and capacity ─────────────────────────────────────────────────────

export const volumeU = (g: UGrade): Generator => (rng, level) => {
  switch (level) {
    case 1: {
      const s = rng.int(2, 15)
      return rng.next() < 0.6
        ? num(level, `Find the volume of a cube of side ${s} cm. (cm³)`, s ** 3, { explain: `${s} × ${s} × ${s} = ${s ** 3} cm³` })
        : num(level, `A cube has a volume of ${fmt(s ** 3)} cm³. How long is each edge? (cm)`, s, { explain: `${s} × ${s} × ${s} = ${s ** 3}` })
    }
    case 2: {
      const [l, w, h] = [rng.int(5, 20), rng.int(3, 12), rng.int(2, 10)]
      return num(level, `Find the volume of a cuboid ${l} cm by ${w} cm by ${h} cm. (cm³)`, l * w * h, { explain: `${l} × ${w} × ${h} = ${l * w * h} cm³` })
    }
    case 3: {
      const [l, w, h] = [rng.int(5, 20), rng.int(3, 12), rng.int(2, 10)]
      return num(level, `A box has a volume of ${l * w * h} cm³. It is ${l} cm long and ${w} cm wide. How high is it?`, h, { explain: `${l * w * h} ÷ (${l} × ${w}) = ${h} cm` })
    }
    case 4: {
      if (g === 6) {
        const [l, w, h] = [rng.pick([50, 100, 150, 200]), rng.pick([40, 50, 100]), rng.pick([20, 50, 100])]
        return num(level, `A tank is ${l} cm long, ${w} cm wide and ${h} cm high. How many litres of water can it hold? (1 litre = 1,000 cm³)`, (l * w * h) / 1000, { explain: `${l} × ${w} × ${h} = ${fmt(l * w * h)} cm³ = ${fmt((l * w * h) / 1000)} litres` })
      }
      const s = rng.pick([2, 3, 4, 5])
      const n = rng.int(2, 6)
      return num(level, `How many cubes of side 1 cm fit in a box ${s * n} cm by ${s} cm by ${s} cm?`, s * n * s * s)
    }
    default: {
      const [L, W, H] = [rng.pick([20, 30, 40]), rng.pick([10, 20]), rng.pick([10, 15, 20])]
      const c = rng.pick([2, 5, 10])
      return num(level, `How many cubes of side ${c} cm can be packed into a box ${L} cm by ${W} cm by ${H} cm?`, (L / c) * (W / c) * Math.floor(H / c), { explain: `${L / c} × ${W / c} × ${Math.floor(H / c)} = ${(L / c) * (W / c) * Math.floor(H / c)}` })
    }
  }
}

export const capacityU = (g: UGrade): Generator => (rng, level) => {
  switch (level) {
    case 1: {
      const l = rng.int(2, 9)
      const ml = rng.int(50, 950)
      return num(level, `${l} l ${ml} ml = ___ ml`, l * 1000 + ml, { explain: `1 l = 1,000 ml` })
    }
    case 2: {
      const ml = rng.int(2, 9) * 1000 + rng.pick([0, 250, 500, 750])
      return pickQ(level, `${fmt(ml)} ml = ?`, `${Math.floor(ml / 1000)} l ${ml % 1000} ml`, [`${Math.floor(ml / 100)} l ${ml % 100} ml`, `${Math.floor(ml / 1000) + 1} l ${ml % 1000} ml`, `${ml % 1000} l ${Math.floor(ml / 1000)} ml`])
    }
    case 3: {
      const a = [rng.int(1, 5), rng.int(100, 900)]
      const b = [rng.int(1, 5), rng.int(200, 950)]
      const t = a[0] * 1000 + a[1] + b[0] * 1000 + b[1]
      return pickQ(level, `${a[0]} l ${a[1]} ml + ${b[0]} l ${b[1]} ml =`, `${Math.floor(t / 1000)} l ${t % 1000} ml`, [`${a[0] + b[0]} l ${a[1] + b[1]} ml`, `${Math.floor(t / 1000) + 1} l ${t % 1000} ml`, `${Math.floor(t / 1000) - 1} l ${t % 1000} ml`, `${Math.floor(t / 1000)} l ${(t % 1000) >= 100 ? (t % 1000) - 100 : (t % 1000) + 100} ml`])
    }
    case 4: {
      const cup = rng.pick([100, 200, 250, 500])
      const l = rng.int(2, g === 4 ? 9 : 15)
      return num(level, `How many ${cup} ml cups can be filled from ${l} litres of juice?`, (l * 1000) / cup, { explain: `${l} l = ${fmt(l * 1000)} ml; ÷ ${cup} = ${(l * 1000) / cup}` })
    }
    default: {
      const tank = rng.pick([500, 1000, 2000, 5000])
      const per = rng.pick([20, 25, 40, 50])
      const days = rng.int(3, 10)
      const used = per * rng.int(2, 6) * days
      if (used >= tank) return num(level, `A tank holds ${fmt(tank)} litres. How many 20-litre jerrycans can fill it?`, tank / 20)
      return num(level, `A school tank had ${fmt(tank)} litres of water. The school used ${fmt(used / days)} litres a day for ${days} days. How many litres were left?`, tank - used, { explain: `${fmt(used / days)} × ${days} = ${fmt(used)}; ${fmt(tank)} − ${fmt(used)} = ${fmt(tank - used)}` })
    }
  }
}

// ── Mass ────────────────────────────────────────────────────────────────────

export const massU = (g: UGrade): Generator => (rng, level) => {
  switch (level) {
    case 1: {
      const kg = rng.int(2, 9)
      const gr = rng.int(50, 950)
      return num(level, `${kg} kg ${gr} g = ___ g`, kg * 1000 + gr)
    }
    case 2: {
      if (g >= 5) {
        const t = rng.int(2, 9)
        const kg = rng.int(50, 950)
        return num(level, `${t} tonnes ${kg} kg = ___ kg (1 tonne = 1,000 kg)`, t * 1000 + kg)
      }
      const gr = rng.int(2, 9) * 1000 + rng.pick([100, 250, 500, 750])
      return pickQ(level, `${fmt(gr)} g = ?`, `${Math.floor(gr / 1000)} kg ${gr % 1000} g`, [`${Math.floor(gr / 100)} kg ${gr % 100} g`, `${Math.floor(gr / 1000) + 1} kg ${gr % 1000} g`])
    }
    case 3: {
      const a = [rng.int(3, 9), rng.int(100, 800)]
      const b = [rng.int(1, a[0] - 1), rng.int(200, 950)]
      const t = a[0] * 1000 + a[1] - (b[0] * 1000 + b[1])
      return pickQ(level, `${a[0]} kg ${a[1]} g − ${b[0]} kg ${b[1]} g =`, `${Math.floor(t / 1000)} kg ${t % 1000} g`, [`${a[0] - b[0]} kg ${Math.abs(a[1] - b[1])} g`, `${Math.floor(t / 1000) + 1} kg ${t % 1000} g`, `${Math.max(0, Math.floor(t / 1000) - 1)} kg ${t % 1000} g`, `${Math.floor(t / 1000)} kg ${(t % 1000) >= 100 ? (t % 1000) - 100 : (t % 1000) + 100} g`])
    }
    case 4: {
      const pkt = rng.pick([250, 500])
      const kg = rng.int(2, 15)
      return num(level, `How many ${pkt} g packets can be made from ${kg} kg of sugar?`, (kg * 1000) / pkt, { explain: `${kg} kg = ${fmt(kg * 1000)} g; ÷ ${pkt} = ${(kg * 1000) / pkt}` })
    }
    default: {
      const per = rng.pick([50, 70, 90])
      const lorry = g === 4 ? 5000 : 7000
      const bags = rng.int(20, Math.floor((lorry - 100) / per))
      return num(level, `A lorry can carry ${fmt(lorry)} kg. It is loaded with ${bags} bags of ${per} kg each. How many more kilograms can it carry?`, lorry - bags * per > 0 ? lorry - bags * per : 0, { explain: `${bags} × ${per} = ${fmt(bags * per)}; ${fmt(lorry)} − ${fmt(bags * per)} = ${fmt(Math.max(0, lorry - bags * per))}` })
    }
  }
}

// ── Time ────────────────────────────────────────────────────────────────────

const pad = (n: number) => String(n).padStart(2, '0')
const ampm = (h24: number, m: number) => `${h24 % 12 === 0 ? 12 : h24 % 12}:${pad(m)} ${h24 < 12 ? 'a.m.' : 'p.m.'}`
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const timeU = (g: UGrade): Generator => (rng, level) => {
  const h = rng.int(1, 23)
  const m = rng.pick([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55])
  switch (level) {
    case 1: {
      if (g === 4) {
        const hrs = rng.int(2, 9)
        const mins = rng.int(5, 55)
        return num(level, `${hrs} hours ${mins} minutes = ___ minutes`, hrs * 60 + mins, { explain: `${hrs} × 60 + ${mins}` })
      }
      return pickQ(level, `Write ${ampm(h, m)} in the 24-hour clock.`, `${pad(h)}${pad(m)} hours`, [`${pad(h % 12)}${pad(m)} hours`, `${pad((h + 12) % 24)}${pad(m)} hours`, `${pad(h)}${pad((m + 5) % 60)} hours`])
    }
    case 2: {
      if (g === 4) {
        const morning = rng.next() < 0.5
        const hh = morning ? rng.int(5, 11) : rng.int(13, 21)
        return pickQ(level, `${morning ? 'Lessons start' : 'The bus leaves'} at ${hh % 12}:${pad(m)} in the ${morning ? 'morning' : hh < 17 ? 'afternoon' : 'evening'}. How do we write it?`, ampm(hh, m), [ampm((hh + 12) % 24, m), `${hh % 12}:${pad(m)}`])
      }
      return pickQ(level, `Write ${pad(h)}${pad(m)} hours in the 12-hour clock.`, ampm(h, m), [ampm((h + 12) % 24, m), `${h}:${pad(m)}`])
    }
    case 3: {
      const sh = rng.int(6, 14)
      const sm = rng.pick([0, 15, 30, 45])
      const dur = rng.int(40, 200)
      const end = sh * 60 + sm + dur
      return pickQ(level, `A journey started at ${g === 4 ? ampm(sh, sm) : `${pad(sh)}${pad(sm)} hours`} and took ${Math.floor(dur / 60)} h ${dur % 60} min. When did it end?`, g === 4 ? ampm(Math.floor(end / 60), end % 60) : `${pad(Math.floor(end / 60))}${pad(end % 60)} hours`, [g === 4 ? ampm(Math.floor(end / 60) + 1, end % 60) : `${pad(Math.floor(end / 60) + 1)}${pad(end % 60)} hours`, g === 4 ? ampm(Math.floor(end / 60), (end + 10) % 60) : `${pad(Math.floor(end / 60))}${pad((end + 10) % 60)} hours`])
    }
    case 4: {
      if (g === 6) {
        const speed = rng.pick([40, 50, 60, 80, 90])
        const hrs = rng.int(2, 6)
        return rng.next() < 0.5
          ? num(level, `A bus travels at ${speed} km/h for ${hrs} hours. How far does it travel? (km)`, speed * hrs, { explain: `Distance = speed × time = ${speed} × ${hrs}` })
          : num(level, `A car covers ${speed * hrs} km in ${hrs} hours. What is its average speed in km/h?`, speed, { explain: `Speed = distance ÷ time = ${speed * hrs} ÷ ${hrs}` })
      }
      const i = rng.int(0, 11)
      const k = rng.int(2, 7)
      return pickQ(level, `What month is ${k} months after ${MONTHS[i]}?`, MONTHS[(i + k) % 12], [MONTHS[(i + k + 1) % 12], MONTHS[(i + k + 11) % 12], MONTHS[(i + k + 2) % 12]])
    }
    default: {
      if (g === 6) {
        const dist = rng.pick([120, 180, 240, 300, 360])
        const speed = rng.pick([40, 60, 80, 120].filter((s) => dist % s === 0))
        const sh = rng.int(6, 12)
        const end = sh + dist / speed
        return pickQ(level, `A matatu left Nairobi at ${pad(sh)}00 hours and travelled ${dist} km at ${speed} km/h. At what time did it arrive?`, `${pad(end)}00 hours`, [`${pad(end + 1)}00 hours`, `${pad(sh + Math.floor(speed / dist))}00 hours`, `${pad(end - 1)}00 hours`], `Time = ${dist} ÷ ${speed} = ${dist / speed} h; ${sh} + ${dist / speed} = ${end}.`)
      }
      const weeks = rng.int(2, 9)
      const days = rng.int(1, 6)
      return num(level, `A school term lasts ${weeks} weeks and ${days} day${days === 1 ? "" : "s"}. How many days is that?`, weeks * 7 + days, { explain: `${weeks} × 7 + ${days} = ${weeks * 7 + days}` })
    }
  }
}

// ── Money ───────────────────────────────────────────────────────────────────

// Plural forms for "3 loaves of bread", keyed by the singular.
const GOODS_MANY: Record<string, string> = {
  'a loaf of bread': 'loaves of bread',
  'a packet of milk': 'packets of milk',
  'a kilogram of sugar': 'kilograms of sugar',
  'a bar of soap': 'bars of soap',
  'an exercise book': 'exercise books',
  'a pen': 'pens',
  'a kilogram of rice': 'kilograms of rice',
  'a dozen eggs': 'dozen eggs',
  'a bundle of sukuma wiki': 'bundles of sukuma wiki',
  'a litre of cooking oil': 'litres of cooking oil',
}
/** "1 pen", "3 pens": a count of goods in plain words. */
const goods = (n: number, it: string) => (n === 1 ? it : `${n} ${GOODS_MANY[it]}`)

const GOODS: [string, number][] = [
  ['a loaf of bread', 65],
  ['a packet of milk', 60],
  ['a kilogram of sugar', 180],
  ['a bar of soap', 120],
  ['an exercise book', 50],
  ['a pen', 30],
  ['a kilogram of rice', 160],
  ['a dozen eggs', 240],
  ['a bundle of sukuma wiki', 25],
  ['a litre of cooking oil', 320],
]

export const moneyU = (g: UGrade): Generator => (rng, level) => {
  switch (level) {
    case 1: {
      const items = rng.sample(GOODS, 3)
      const qty = items.map(() => rng.int(1, 4))
      const total = items.reduce((s, [, p], i) => s + p * qty[i], 0)
      return num(level, `Find the total cost of: ${items.map(([it, p], i) => `${goods(qty[i], it)} at ${p} shillings each`).join('; ')}.`, total, {
        visual: { kind: 'table', rows: [['Item', 'Price (sh)', 'Number'], ...items.map(([it, p], i) => [it, String(p), String(qty[i])])] },
      })
    }
    case 2: {
      const [[it, p]] = rng.sample(GOODS, 1)
      const n = rng.int(2, 6)
      const note = [500, 1000].find((x) => x > p * n) ?? 2000
      return num(level, `${name(rng)} bought ${goods(n, it)} at ${p} shillings each and paid with ${an(fmt(note))} shilling note. How much change was given?`, note - p * n, { explain: `${n} × ${p} = ${p * n}; ${fmt(note)} − ${p * n} = ${fmt(note - p * n)}` })
    }
    case 3: {
      const buy = rng.int(20, 80) * 50
      const diff = rng.int(2, 20) * 50
      const profit = rng.next() < 0.6
      const sell = profit ? buy + diff : buy - diff
      return pickQ(level, `A trader bought a radio for ${fmt(buy)} shillings and sold it for ${fmt(sell)} shillings. Was there a profit or a loss, and how much?`, `${profit ? 'profit' : 'loss'} of ${fmt(diff)} shillings`, [`${profit ? 'loss' : 'profit'} of ${fmt(diff)} shillings`, `${profit ? 'profit' : 'loss'} of ${fmt(buy + sell)} shillings`, `${profit ? 'profit' : 'loss'} of ${fmt(diff * 2)} shillings`])
    }
    case 4: {
      if (g === 6) {
        const price = rng.pick([12000, 18000, 24000, 30000, 36000])
        const dep = rng.pick([2000, 3000, 5000, 6000])
        const n = rng.pick([6, 10, 12])
        // Instalments always add up to more than the cash price, as they do in real life.
        const inst = Math.ceil((price - dep) / n / 500) * 500 + rng.pick([500, 1000])
        return num(level, `A bicycle costs ${fmt(price)} shillings cash. On hire purchase, you pay a deposit of ${fmt(dep)} and ${n} monthly instalments of ${fmt(inst)}. How much more does hire purchase cost?`, dep + n * inst - price, { explain: `${fmt(dep)} + ${n} × ${fmt(inst)} = ${fmt(dep + n * inst)}; − ${fmt(price)} = ${fmt(dep + n * inst - price)}` })
      }
      const have = rng.pick([500, 1000, 2000])
      const [[it, p]] = rng.sample(GOODS.filter(([, x]) => x < 200), 1)
      return num(level, `${it[0].toUpperCase()}${it.slice(1)} costs ${p} shillings. How many ${GOODS_MANY[it]} can you buy with ${fmt(have)} shillings?`, Math.floor(have / p), { explain: `${fmt(have)} ÷ ${p} = ${Math.floor(have / p)} remainder ${have % p}` })
    }
    default: {
      if (g === 6) {
        const buy = rng.pick([2000, 4000, 5000, 8000, 10000])
        const pct = rng.pick([10, 20, 25, 30])
        return num(level, `A trader bought a phone for ${fmt(buy)} shillings and sold it at a profit of ${pct}%. What was the selling price?`, buy + (buy * pct) / 100, { explain: `${pct}% of ${fmt(buy)} = ${fmt((buy * pct) / 100)}; ${fmt(buy)} + ${fmt((buy * pct) / 100)}` })
      }
      const crates = rng.int(3, 8)
      const per = 24
      const cost = rng.pick([1200, 1440, 1500])
      const sell = rng.pick([70, 80, 90])
      const profit = crates * per * sell - crates * cost
      return num(level, `A shopkeeper bought ${crates} crates of soda at ${fmt(cost)} shillings per crate. Each crate has ${per} bottles. Every bottle was sold at ${sell} shillings. What was the profit?`, profit, { explain: `Sales: ${crates * per} × ${sell} = ${fmt(crates * per * sell)}; cost: ${fmt(crates * cost)}; profit ${fmt(profit)}` })
    }
  }
}

// ── Angles and shapes ───────────────────────────────────────────────────────

const COMPASS8 = ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west']
const kindOf = (a: number) => (a < 90 ? 'acute' : a === 90 ? 'right' : a < 180 ? 'obtuse' : a === 180 ? 'straight' : 'reflex')
/** Angle between the hands of a clock at an exact hour. */
const clockAngle = (h: number) => 30 * Math.min(h % 12, 12 - (h % 12))

function turnQ(rng: Rng, level: Level, g: UGrade): ChoiceQuestion {
  const from = rng.int(0, 7)
  const step = rng.pick(g === 4 ? [2, 4, 6] : [1, 2, 3, 4, 5, 6])
  const clockwise = rng.next() < 0.5
  const to = COMPASS8[(from + (clockwise ? step : 8 - step)) % 8]
  const who = name(rng)
  return pickQ(level, `${who} faces ${COMPASS8[from]} and turns ${clockwise ? 'clockwise' : 'anticlockwise'} through ${step * 45}°. Which direction does ${who} now face?`, to, rng.sample(COMPASS8.filter((d) => d !== to), 3), `${step * 45}° is ${step} eighth${step > 1 ? 's' : ''} of a full turn.`)
}

export const anglesU = (g: UGrade): Generator => (rng, level) => {
  switch (level) {
    case 1: {
      const a = rng.next() < 0.15 ? rng.pick([90, 180]) : g === 4 ? rng.int(5, 175) : rng.int(5, 355)
      const kinds = ['acute', 'right', 'obtuse', 'straight', ...(g >= 5 ? ['reflex'] : [])]
      return pickQ(level, `What kind of angle is ${a}°?`, kindOf(a), rng.sample(kinds.filter((k) => k !== kindOf(a)), 3), 'Acute < 90° < obtuse < 180° < reflex.')
    }
    case 2: {
      if (rng.next() < 0.5) return turnQ(rng, level, g)
      const h = rng.int(1, 11)
      return num(level, `What is the smaller angle between the hands of a clock at ${h} o'clock?`, clockAngle(h), { explain: `Each hour mark is 30° apart: ${Math.min(h, 12 - h)} × 30° = ${clockAngle(h)}°` })
    }
    case 3: {
      if (g === 4) {
        if (rng.next() < 0.4) {
          const [desc, ans] = rng.pick([
            ['Lines that never meet, like railway lines, are', 'parallel'],
            ['Lines that meet at a right angle are', 'perpendicular'],
            ['A line that goes straight across, like the horizon, is', 'horizontal'],
            ['A line that goes straight up, like a flag pole, is', 'vertical'],
            ['Two lines that cross each other are', 'intersecting'],
          ] as const)
          return pickQ(level, `${desc} ___.`, ans, ['parallel', 'perpendicular', 'horizontal', 'vertical', 'intersecting'].filter((x) => x !== ans).slice(0, 3))
        }
        const r = rng.int(1, 3)
        const extra = rng.pick([0, 30, 45, 60])
        return num(level, `An angle is made of ${r} right angle${r > 1 ? 's' : ''}${extra ? ` and ${extra}°` : ''}. How many degrees is it?`, 90 * r + extra)
      }
      const a = rng.int(15, 165)
      return num(level, `Two angles on a straight line add up to 180°. One is ${a}°. What is the other?`, 180 - a, { explain: `180 − ${a} = ${180 - a}°` })
    }
    case 4: {
      if (g === 4) {
        if (rng.next() < 0.5) return turnQ(rng, level, 5)
        const [turn, n] = rng.pick([['a half turn', 2], ['a full turn', 4], ['three quarter turns', 3], ['two full turns', 8], ['one and a half turns', 6]] as const)
        return num(level, `How many right angles are there in ${turn}?`, n, { explain: `A quarter turn is one right angle (90°).` })
      }
      const a = rng.int(25, 100)
      const b = rng.int(20, 155 - a)
      return num(level, `Two angles of a triangle are ${a}° and ${b}°. What is the third angle?`, 180 - a - b, { explain: `Angles in a triangle add up to 180°: 180 − ${a} − ${b} = ${180 - a - b}°` })
    }
    default: {
      if (g === 4) {
        const h1 = rng.int(1, 11)
        const turnsTo = rng.int(1, 5)
        return num(level, `The minute hand of a clock is on 12. How many degrees does the hour hand turn from ${h1} o'clock to ${((h1 + turnsTo - 1) % 12) + 1} o'clock?`, turnsTo * 30, { explain: `Each hour, the hour hand turns 30°: ${turnsTo} × 30 = ${turnsTo * 30}°` })
      }
      const form = rng.int(0, g === 6 ? 2 : 1)
      if (form === 0) {
        const a = rng.int(40, 150)
        const b = rng.int(30, 300 - a - 30)
        return num(level, `Three angles meet at a point. Two are ${a}° and ${b}°. What is the third? (Angles at a point add up to 360°.)`, 360 - a - b)
      }
      if (form === 1) {
        const a = rng.int(20, 80)
        const b = rng.int(20, 170 - a - 10)
        return num(level, `Three angles lie on a straight line. Two of them are ${a}° and ${b}°. What is the third?`, 180 - a - b)
      }
      const base = rng.int(25, 80)
      return rng.next() < 0.5
        ? num(level, `An isosceles triangle has two equal base angles of ${base}° each. What is the third angle?`, 180 - 2 * base, { explain: `180 − 2 × ${base} = ${180 - 2 * base}°` })
        : num(level, `The top angle of an isosceles triangle is ${180 - 2 * base}°. What is the size of each base angle?`, base, { explain: `(180 − ${180 - 2 * base}) ÷ 2 = ${base}°` })
    }
  }
}

// [name, sides, lines of symmetry (regular or usual form)]
const POLYGONS: [string, number][] = [
  ['triangle', 3],
  ['quadrilateral', 4],
  ['pentagon', 5],
  ['hexagon', 6],
  ['heptagon', 7],
  ['octagon', 8],
  ['nonagon', 9],
  ['decagon', 10],
]
const SYMMETRY: [string, number][] = [
  ['square', 4],
  ['rectangle', 2],
  ['rhombus', 2],
  ['kite', 1],
  ['isosceles triangle', 1],
  ['equilateral triangle', 3],
  ['parallelogram', 0],
  ['scalene triangle', 0],
  ['regular pentagon', 5],
  ['regular hexagon', 6],
  ['regular octagon', 8],
]
const PROPERTIES: [string, string][] = [
  ['square', 'four equal sides and four right angles'],
  ['rectangle', 'opposite sides equal and four right angles'],
  ['rhombus', 'four equal sides but no right angles'],
  ['trapezium', 'only one pair of parallel sides'],
  ['parallelogram', 'two pairs of parallel sides but no right angles'],
  ['kite', 'two pairs of equal sides that are next to each other'],
]
// [solid, faces, edges, vertices]
const SOLIDS: [string, number, number, number][] = [
  ['cube', 6, 12, 8],
  ['cuboid', 6, 12, 8],
  ['triangular prism', 5, 9, 6],
  ['square-based pyramid', 5, 8, 5],
  ['triangular pyramid', 4, 6, 4],
]

export const shapesU = (): Generator => (rng, level) => {
  switch (level) {
    case 1: {
      const [s, n] = rng.pick(POLYGONS)
      return rng.next() < 0.5 ? num(level, `How many sides does ${an(s)} have?`, n) : num(level, `How many corners (vertices) does ${an(s)} have?`, n)
    }
    case 2: {
      if (rng.next() < 0.5) {
        const [ans, n] = rng.pick(POLYGONS)
        return pickQ(level, `Which shape has ${n} sides?`, ans, rng.sample(POLYGONS.map(([x]) => x).filter((x) => x !== ans), 3))
      }
      const [s, n] = rng.pick(POLYGONS)
      const k = rng.int(2, 6)
      return num(level, `How many sides do ${k} ${s}s have altogether?`, k * n)
    }
    case 3: {
      const [s, prop] = rng.pick(PROPERTIES)
      return rng.next() < 0.5
        ? pickQ(level, `Which shape has ${prop}?`, s, rng.sample(PROPERTIES.map(([x]) => x).filter((x) => x !== s), 3))
        : pickQ(level, `Which describes ${an(s)}?`, prop, rng.sample(PROPERTIES.map(([, x]) => x).filter((x) => x !== prop), 3))
    }
    case 4: {
      if (rng.next() < 0.5) {
        const [s, n] = rng.pick(SYMMETRY)
        return num(level, `How many lines of symmetry does ${an(s)} have?`, n)
      }
      const [s, f, e, v] = rng.pick(SOLIDS)
      const [what, ans] = rng.pick([['faces', f], ['edges', e], ['vertices', v]] as const)
      return num(level, `How many ${what} does ${an(s)} have?`, ans)
    }
    default: {
      if (rng.next() < 0.5) {
        const [s, n] = rng.pick(POLYGONS.filter(([x]) => x !== 'quadrilateral'))
        const side = rng.int(3, 25)
        return rng.next() < 0.5
          ? num(level, `A regular ${s} has sides of ${side} cm. What is its perimeter? (cm)`, n * side, { explain: `${n} × ${side} = ${n * side} cm` })
          : num(level, `A regular ${s} has a perimeter of ${n * side} cm. How long is each side? (cm)`, side, { explain: `${n * side} ÷ ${n} = ${side} cm` })
      }
      const k = rng.int(2, 5)
      const [s, n] = rng.pick(POLYGONS)
      const [s2, n2] = rng.pick(POLYGONS.filter(([x]) => x !== s))
      return num(level, `What is the total number of sides of ${k} ${s}s and one ${s2}?`, k * n + n2, { explain: `${k} × ${n} + ${n2}` })
    }
  }
}

// ── Data handling ───────────────────────────────────────────────────────────

const DAYS5 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

export const dataU = (g: UGrade): Generator => (rng, level) => {
  const unit = g === 4 ? 2 : rng.pick([5, 10])
  const values = DAYS5.map(() => unit * rng.int(2, 9))
  // Keep the total a multiple of 5 so the daily average is a whole number.
  const extra = (5 * unit - (values.reduce((a, b) => a + b, 0) % (5 * unit))) % (5 * unit)
  values[4] += extra
  const max = Math.max(...values)
  const min = Math.min(...values)
  const iMax = values.indexOf(max)
  const [what, noun, verb] = rng.pick<[string, string, string]>([
    ['mangoes sold', 'mangoes', 'sold'],
    ['learners absent', 'learners', 'absent'],
    ['litres of milk', 'litres of milk', 'collected'],
    ['books borrowed', 'books', 'borrowed'],
  ])
  const visual: Visual =
    g === 4
      ? { kind: 'table', caption: `Each ● stands for ${unit} ${what}`, rows: [['Day', what], ...DAYS5.map((d, i) => [d, '●'.repeat(values[i] / unit)])] }
      : { kind: 'bars', labels: DAYS5, values, title: what, unit: what }
  switch (level) {
    case 1:
      return choice('um', level, `On which day were the most ${noun} ${verb}?`, DAYS5.map((d) => ({ id: d, label: d })), DAYS5[iMax], { visual: { ...visual } })
    case 2: {
      const i = rng.int(0, 4)
      return num(level, `How many ${noun} were ${verb} on ${DAYS5[i]}?`, values[i], { visual: { ...visual } })
    }
    case 3: {
      return num(level, `How many more ${noun} were ${verb} on the highest day than on the lowest day?`, max - min, { visual: { ...visual } })
    }
    case 4:
      return num(level, `What was the total number of ${what} for the five days?`, values.reduce((a, b) => a + b, 0), { visual: { ...visual } })
    default: {
      if (g === 6) {
        const marks = Array.from({ length: 5 }, () => rng.int(40, 95))
        const sum = marks.reduce((a, b) => a + b, 0)
        const fix = sum % 5
        marks[0] -= fix
        return rng.next() < 0.5
          ? num(level, `Five learners scored ${marks.join(', ')}. What was the mean (average) score?`, (sum - fix) / 5, { explain: `Total ${sum - fix} ÷ 5 = ${(sum - fix) / 5}` })
          : (() => {
              const mean = rng.int(12, 40)
              const known = [rng.int(5, mean + 10), rng.int(5, mean + 10), rng.int(5, mean + 10)]
              const missing = 4 * mean - known.reduce((a, b) => a + b, 0)
              return missing > 0
                ? num(level, `The mean of four numbers is ${mean}. Three of them are ${known.join(', ')}. What is the fourth number?`, missing, { explain: `Total = 4 × ${mean} = ${4 * mean}; ${4 * mean} − ${known.reduce((a, b) => a + b, 0)} = ${missing}` })
                : num(level, `The mean of four numbers is ${mean}. What is their total?`, 4 * mean)
            })()
      }
      const total = values.reduce((a, b) => a + b, 0)
      return num(level, `What was the average number of ${what} per day? (Total ÷ 5)`, total / 5, { visual: { ...visual }, explain: `${total} ÷ 5 = ${total / 5}` })
    }
  }
}

/** Every upper-primary maths sub-strand, by id. */
export function upperMathGenerators(): Record<string, Generator> {
  const out: Record<string, Generator> = {}
  for (const g of [4, 5, 6] as UGrade[]) {
    const p = `u${g}m-`
    out[`${p}whole`] = whole(g)
    if (g !== 6) {
      out[`${p}add`] = addition(g)
      out[`${p}sub`] = subtraction(g)
      out[`${p}capacity`] = capacityU(g)
    }
    out[`${p}mul`] = multiplication(g)
    out[`${p}div`] = division(g)
    out[`${p}frac`] = fractions(g)
    out[`${p}dec`] = decimals(g)
    out[`${p}length`] = lengthU(g)
    out[`${p}area`] = areaU(g)
    out[`${p}mass`] = massU(g)
    out[`${p}time`] = timeU(g)
    out[`${p}money`] = moneyU(g)
    out[`${p}angles`] = anglesU(g)
    out[`${p}data`] = dataU(g)
    if (g >= 5) out[`${p}volume`] = volumeU(g)
  }
  out['u4m-shapes'] = shapesU()
  out['u6m-percent'] = percentages()
  return out
}

export { textOptions }
