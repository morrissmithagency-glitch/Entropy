// Junior school mathematics (Grades 7–9). Each topic climbs from a direct skill (level 1) to a
// multi-step word problem (level 5). Answers that are negative, fractional or algebraic are
// multiple choice; whole-number answers are typed.
import { KENYAN_NAMES, uid, An, an, countOf } from '../helpers'
import type { ChoiceQuestion, Generator, Level, NumberQuestion, Option, Rng, Visual } from '../types'
import { fmt, frac } from './upper-math'

type J = 7 | 8 | 9

const num = (level: Level, prompt: string, answer: number, extra: Partial<NumberQuestion> = {}): NumberQuestion => ({ id: uid('jm'), type: 'number', level, prompt, answer, ...extra })
const pick = (level: Level, prompt: string, answer: string, wrong: (string | number)[], explain?: string, visual?: Visual): ChoiceQuestion => ({
  id: uid('jm'),
  type: 'choice',
  level,
  prompt,
  options: [answer, ...[...new Set(wrong.map(String))].filter((w) => w !== answer)].slice(0, 4).map((l): Option => ({ id: l, label: l })),
  answer,
  explain,
  visual,
})
const name = (rng: Rng) => rng.pick(KENYAN_NAMES)
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
const lcm = (a: number, b: number) => (a / gcd(a, b)) * b
/** A signed number written the way papers write it: −5, not -5. */
const sg = (n: number) => (n < 0 ? `−${Math.abs(n)}` : String(n))
/** A power written as papers print it: 10⁷, a⁻³. */
const sup = (n: number) => String(n).replace(/[-0-9]/g, (c) => '⁻⁰¹²³⁴⁵⁶⁷⁸⁹'['-0123456789'.indexOf(c)])
/** Wrong integer answers near a value, for choice questions with negatives. */
const nearInts = (n: number) => [n + 1, n - 1, -n, n + 2, n - 2].filter((x) => x !== n).map(sg)
/** A term like 3x, −x, x, with a sign written before it when not first. */
function term(c: number, v: string, first = false): string {
  if (c === 0) return ''
  const abs = Math.abs(c)
  const body = `${abs === 1 && v ? '' : abs}${v}`
  if (first) return c < 0 ? `−${body}` : body
  return c < 0 ? ` − ${body}` : ` + ${body}`
}
const expr = (terms: [number, string][]) => {
  const parts = terms.filter(([c]) => c !== 0)
  if (!parts.length) return '0'
  return parts.map(([c, v], i) => term(c, v, i === 0)).join('')
}

// ── Numbers ─────────────────────────────────────────────────────────────────

export const wholeJ = (): Generator => (rng, level) => {
  switch (level) {
    case 1: {
      const n = rng.int(10_000_000, 99_999_999)
      const s = String(n)
      const i = rng.int(0, 7)
      const place = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions', 'ten millions'][7 - i]
      return pick(level, `What is the place value of the digit ${s[i]} in ${fmt(n)}?`, place, ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions', 'ten millions'].filter((p) => p !== place).slice(rng.int(0, 4), 7))
    }
    case 2: {
      const n = rng.int(1_000_000, 99_999_999)
      const to = rng.pick([1000, 10_000, 100_000, 1_000_000])
      const r = Math.round(n / to) * to
      return num(level, `Round ${fmt(n)} to the nearest ${fmt(to)}.`, r, { explain: `Look at the digit to the right of the ${fmt(to)}s place.` })
    }
    case 3: {
      const a = rng.int(2, 9)
      const b = rng.int(2, 9)
      const c = rng.int(2, 12)
      const d = c * rng.int(2, 9)
      return num(level, `Work out: ${a * 10} + ${b} × (${d} ÷ ${c}) − ${a}`, a * 10 + b * (d / c) - a, { explain: `Brackets first: ${d} ÷ ${c} = ${d / c}; then ${b} × ${d / c} = ${b * (d / c)}; then add and subtract from left to right.` })
    }
    case 4: {
      const pop = rng.int(120, 480) * 1000
      const boys = rng.int(40, 48)
      const b = Math.round((pop * boys) / 100 / 10) * 10
      return num(level, `A county has ${fmt(pop)} learners. ${fmt(b)} are boys. How many more girls than boys are there?`, pop - 2 * b, { explain: `Girls = ${fmt(pop)} − ${fmt(b)} = ${fmt(pop - b)}; difference = ${fmt(pop - 2 * b)}` })
    }
    default: {
      const per = rng.pick([24, 36, 48, 50])
      const crates = rng.int(120, 900)
      const sold = rng.int(Math.floor(crates / 3), crates - 20)
      const price = rng.pick([45, 55, 60, 65])
      return num(level, `A factory packed ${fmt(crates)} crates of ${per} bottles. It sold ${fmt(sold)} crates and each bottle sold at ${price} shillings. How much money did it get?`, sold * per * price, { explain: `${fmt(sold)} × ${per} × ${price} = ${fmt(sold * per * price)}` })
    }
  }
}

export const factorsJ = (): Generator => (rng, level) => {
  switch (level) {
    case 1: {
      const d = rng.pick([3, 4, 6, 8, 9, 11])
      const ok = d * rng.int(102, 999)
      return pick(level, `Which number is divisible by ${d}?`, fmt(ok), [ok + 1, ok + 2, ok - 1].map(fmt), d === 11 ? 'Alternate digits: the difference of their sums is 0 or a multiple of 11.' : `Use the test for ${d}.`)
    }
    case 2: {
      // Two multiples of a common factor, so the HCF is that factor.
      const h = rng.int(2, 15)
      const [p, q] = rng.pick([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [4, 7], [5, 7], [3, 8], [5, 8], [7, 8], [2, 9], [4, 9], [7, 9]] as const)
      const [a, b] = [h * p, h * q]
      return num(level, `Find the HCF (GCD) of ${a} and ${b}.`, gcd(a, b), { explain: `The biggest number that divides both is ${gcd(a, b)}.` })
    }
    case 3: {
      const [a, b, c] = rng.pick([[4, 6, 10], [6, 8, 12], [3, 5, 9], [8, 12, 18], [5, 6, 15], [9, 12, 15], [10, 12, 15], [4, 9, 12], [2, 7, 9], [6, 10, 15], [4, 10, 14], [3, 8, 12], [12, 16, 20], [5, 8, 10], [6, 14, 21], [7, 10, 14]])
      return num(level, `Find the LCM of ${a}, ${b} and ${c}.`, lcm(lcm(a, b), c), { explain: `The smallest number all three divide into is ${lcm(lcm(a, b), c)}.` })
    }
    case 4: {
      const n = rng.pick([36, 40, 48, 54, 56, 60, 63, 72, 80, 84, 88, 90, 96, 100, 104, 108, 112, 120, 126, 132, 140, 144, 150, 168, 180, 196])
      const fs: number[] = []
      let m = n
      for (let p = 2; m > 1; p++) while (m % p === 0) (fs.push(p), (m /= p))
      const right = fs.join(' × ')
      const wrong = [[...fs.slice(0, -1), fs[fs.length - 1] * 2].join(' × '), [2, ...fs].join(' × '), fs.slice(1).join(' × ')]
      return pick(level, `Which is ${n} written as a product of its prime factors?`, right, wrong, `${right} = ${n}`)
    }
    default: {
      if (rng.next() < 0.5) {
        const [a, b, c] = rng.pick([[12, 15, 20], [8, 12, 18], [10, 15, 25], [6, 9, 15], [20, 30, 45], [4, 6, 10], [6, 8, 12], [9, 12, 18], [10, 12, 15], [5, 8, 10], [15, 20, 30], [6, 10, 15]])
        const t = lcm(lcm(a, b), c)
        const what = rng.pick([['bells ring', 'ring'], ['lights flash', 'flash'], ['buses leave the stage', 'leave'], ['sprinklers turn on', 'turn on']] as const)
        return num(level, `Three ${what[0]} every ${a}, ${b} and ${c} minutes. They ${what[1]} together at 8:00 a.m. After how many minutes will they next ${what[1]} together?`, t, { explain: `LCM of ${a}, ${b} and ${c} = ${t} minutes.` })
      }
      const h = rng.pick([6, 8, 9, 12, 14, 15, 18, 21, 24, 36])
      const [p0, q0] = rng.pick([[2, 3], [3, 4], [3, 5], [4, 5], [5, 7], [4, 7], [5, 8], [7, 9]] as const)
      const [a, b] = [h * p0, h * q0]
      return num(level, `Two ${rng.pick(['ribbons', 'ropes', 'pieces of wire', 'planks'])} of ${a} cm and ${b} cm are cut into equal pieces, as long as possible, with nothing left over. How long is each piece? (cm)`, gcd(a, b), { explain: `HCF of ${a} and ${b} = ${gcd(a, b)} cm.` })
    }
  }
}

export const fracJ = (g: J): Generator => (rng, level) => {
  if (g === 8 && level <= 2) {
    if (level === 1) {
      const d = rng.pick([4, 5, 8, 16, 20, 25, 40, 50])
      let n = rng.int(1, d - 1)
      while (gcd(n, d) !== 1) n = (n % (d - 1)) + 1
      return pick(level, `Write ${n}/${d} as a decimal.`, String(n / d), [String((n / d) * 10), String(n / d / 10), `${n}.${d}`], `${n} ÷ ${d} = ${n / d}`)
    }
    const [dec, f, wrong] = rng.pick<[string, string, string[]]>([
      ['0.333…', '1/3', ['3/10', '33/100', '1/30']],
      ['0.666…', '2/3', ['6/10', '66/100', '3/5']],
      ['0.111…', '1/9', ['1/10', '11/100', '1/11']],
      ['0.1666…', '1/6', ['16/100', '1/16', '3/20']],
      ['0.8333…', '5/6', ['83/100', '8/9', '4/5']],
      ['0.0909…', '1/11', ['9/100', '1/9', '9/10']],
      ['0.4545…', '5/11', ['45/100', '4/9', '9/20']],
      ['0.777…', '7/9', ['7/10', '77/100', '3/4']],
      ['0.222…', '2/9', ['2/10', '22/100', '1/5']],
      ['0.555…', '5/9', ['5/10', '55/100', '1/2']],
      ['0.888…', '8/9', ['8/10', '88/100', '7/8']],
      ['0.2727…', '3/11', ['27/100', '3/10', '2/7']],
      ['0.444…', '4/9', ['4/10', '44/100', '2/5']],
    ])
    return pick(level, `Write the recurring decimal ${dec} as a fraction.`, f, wrong)
  }
  switch (level) {
    case 1: {
      const k = rng.int(2, 9)
      const [n, d] = rng.pick([[3, 4], [2, 5], [5, 6], [3, 8], [4, 7], [7, 9], [5, 12], [2, 3]])
      return pick(level, `Simplify ${n * k}/${d * k}.`, `${n}/${d}`, [`${n * k}/${d}`, `${n}/${d * k}`, `${n + 1}/${d}`])
    }
    case 2: {
      const [a, b, c, d] = [rng.int(1, 4), rng.pick([3, 5, 7]), rng.int(1, 5), rng.pick([4, 6, 8])]
      const op = rng.next() < 0.5 ? '+' : '−'
      const val = op === '+' ? a / b + c / d : a / b - c / d
      const top = op === '+' ? a * d + c * b : a * d - c * b
      if (val <= 0) return pick(level, `${a}/${b} + ${c}/${d} =`, frac(a * d + c * b, b * d), [frac(a + c, b + d), frac(a * d + c * b, b * d * 2), frac(a + c, b * d)])
      return pick(level, `${a}/${b} ${op} ${c}/${d} =`, frac(top, b * d), [frac(op === '+' ? a + c : Math.abs(a - c), b + d), frac(top + b, b * d), frac(top, b * d * 2)])
    }
    case 3: {
      const [w1, n1, d1] = [rng.int(1, 4), rng.pick([1, 3]), 4]
      const [w2, n2, d2] = [rng.int(1, 3), rng.int(1, 2), 3]
      const A = w1 * d1 + n1
      const B = w2 * d2 + n2
      return pick(level, `${w1} ${n1}/${d1} × ${w2} ${n2}/${d2} =`, frac(A * B, d1 * d2), [frac(A * B + d1, d1 * d2), `${w1 * w2} ${frac(n1 * n2, d1 * d2)}`, frac(A * B, d1 * d2 + 1)], 'Change to improper fractions, then multiply tops and bottoms.')
    }
    case 4: {
      const [a, b] = [rng.int(2, 7), rng.pick([3, 4, 5, 8])]
      const [c, d] = [rng.int(1, 4), rng.pick([2, 3, 6])]
      return pick(level, `${a} ${1}/${b} ÷ ${c}/${d} =`, frac((a * b + 1) * d, b * c), [frac((a * b + 1) * c, b * d), frac(a * b + 1, b * c), frac((a * b + 1) * d, b)], 'Change to an improper fraction, flip the divisor and multiply.')
    }
    default: {
      const total = rng.pick([360, 480, 600, 720, 840, 960, 1200])
      const [f1, f2] = rng.pick<[[number, number], [number, number]]>([[[1, 3], [1, 4]], [[1, 4], [2, 3]], [[2, 5], [1, 2]], [[1, 6], [3, 5]], [[3, 8], [2, 5]]])
      const first = (total * f1[0]) / f1[1]
      const second = ((total - first) * f2[0]) / f2[1]
      const left = total - first - second
      return num(level, `${name(rng)} had ${fmt(total)} shillings. ${f1[0]}/${f1[1]} was spent on books and ${f2[0]}/${f2[1]} of the remainder on fare. How much was left?`, left, { explain: `Books: ${fmt(first)}; remainder ${fmt(total - first)}; fare ${fmt(second)}; left ${fmt(left)}.` })
    }
  }
}

export const decJ = (): Generator => (rng, level) => {
  switch (level) {
    case 1: {
      const x = rng.int(10001, 99999) / 1000
      const dp = rng.int(1, 2)
      return pick(level, `Round ${x} to ${dp} decimal place${dp > 1 ? 's' : ''}.`, x.toFixed(dp), [(x + 10 ** -dp).toFixed(dp), x.toFixed(dp + 1), Math.trunc(x * 10 ** dp) / 10 ** dp === Number(x.toFixed(dp)) ? (Number(x.toFixed(dp)) - 10 ** -dp).toFixed(dp) : (Math.trunc(x * 10 ** dp) / 10 ** dp).toFixed(dp)])
    }
    case 2: {
      const a = rng.int(12, 95) / 10
      const b = rng.int(12, 45) / 100
      const p = Math.round(a * b * 1000) / 1000
      return pick(level, `${a} × ${b} =`, String(p), [String(Math.round(p * 10000) / 1000), String(Math.round(p * 100) / 1000), String(Math.round((a + b) * 100) / 100)], 'Multiply as whole numbers, then count the decimal places.')
    }
    case 3: {
      const b = rng.pick([0.2, 0.4, 0.5, 0.25, 0.04, 0.05])
      const q = rng.int(12, 96)
      const a = Math.round(q * b * 100) / 100
      return num(level, `${a} ÷ ${b} =`, q, { explain: `Multiply both by 100 to make the divisor whole, then divide.` })
    }
    case 4: {
      const m = rng.int(11, 99) / 10
      const e = rng.int(4, 9)
      const n = Math.round(m * 10 ** e)
      return pick(level, `Write ${fmt(n)} in standard form.`, `${m} × 10${sup(e)}`, [`${m} × 10${sup(e - 1)}`, `${m * 10} × 10${sup(e - 1)}`, `${m} × 10${sup(e + 1)}`], 'A number from 1 to 10, times a power of 10.')
    }
    default: {
      const l = rng.int(25, 95) / 10
      const price = rng.pick([120, 150, 180, 240])
      const cost = Math.round(l * price * 100) / 100
      return pick(level, `Fabric costs ${price} shillings per metre. How much do ${l} m cost?`, `${fmt(cost)} shillings`, [`${fmt(Math.round(cost * 10) / 100)} shillings`, `${fmt(cost * 10)} shillings`, `${fmt(cost + price)} shillings`])
    }
  }
}

export const squaresJ = (g: J): Generator => (rng, level) => {
  const cubes = g >= 8
  switch (level) {
    case 1: {
      const n = rng.int(11, 35)
      return num(level, `Find ${n}².`, n * n, { explain: `${n} × ${n} = ${n * n}` })
    }
    case 2: {
      const n = rng.int(12, 40)
      return num(level, `Find √${fmt(n * n)}.`, n, { explain: `${n} × ${n} = ${n * n}` })
    }
    case 3: {
      if (cubes) {
        const n = rng.int(2, 12)
        return rng.next() < 0.5 ? num(level, `Find ${n}³.`, n ** 3, { explain: `${n} × ${n} × ${n} = ${n ** 3}` }) : num(level, `Find the cube root of ${fmt(n ** 3)}.`, n, { explain: `${n} × ${n} × ${n} = ${n ** 3}` })
      }
      const n = rng.pick([11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29])
      return pick(level, `Find (${n / 10})².`, String((n * n) / 100), [String((n * n) / 10), String((n * 2) / 10), String((n * n) / 1000)], `${n} × ${n} = ${n * n}, with two decimal places.`)
    }
    case 4: {
      const q0 = rng.int(3, 12)
      let p0 = rng.int(1, q0 - 1)
      while (gcd(p0, q0) !== 1) p0 = (p0 % (q0 - 1)) + 1
      const [a, b] = [p0 * p0, q0 * q0]
      return pick(level, `Find √(${a}/${b}).`, `${Math.sqrt(a)}/${Math.sqrt(b)}`, [`${a / 2}/${b / 2}`, `${Math.sqrt(a)}/${b}`, `${a}/${Math.sqrt(b)}`])
    }
    default: {
      if (cubes && rng.next() < 0.5) {
        const s = rng.int(3, 12)
        return num(level, `A cube-shaped tank holds ${fmt(s ** 3)} litres of water when full. If 1 litre fills 1 cubic decimetre, how long is each edge in decimetres?`, s, { explain: `∛${s ** 3} = ${s} dm` })
      }
      const s = rng.int(12, 45)
      const per = rng.pick([50, 80, 100, 120])
      return num(level, `A square plot has an area of ${fmt(s * s)} m². Fencing costs ${per} shillings per metre. How much will it cost to fence it?`, 4 * s * per, { explain: `Side = √${s * s} = ${s} m; perimeter ${4 * s} m; × ${per} = ${fmt(4 * s * per)}` })
    }
  }
}

export const integersJ = (g: J): Generator => (rng, level) => {
  const R = g === 9 ? 30 : 15
  const a = rng.int(-R, R) || 4
  const b = rng.int(-R, R) || -3
  switch (level) {
    case 1:
      return pick(level, `${sg(a)} + ${b < 0 ? `(${sg(b)})` : b} =`, sg(a + b), nearInts(a + b), 'Adding a negative number moves left on the number line.')
    case 2:
      return pick(level, `${sg(a)} − ${b < 0 ? `(${sg(b)})` : b} =`, sg(a - b), nearInts(a - b), 'Subtracting a negative is the same as adding.')
    case 3: {
      const x = rng.int(-12, 12) || 5
      const y = rng.int(-9, 9) || -4
      return rng.next() < 0.5 ? pick(level, `${sg(x)} × ${y < 0 ? `(${sg(y)})` : y} =`, sg(x * y), nearInts(x * y), 'Same signs give a positive; different signs give a negative.') : pick(level, `${sg(x * y)} ÷ ${y < 0 ? `(${sg(y)})` : y} =`, sg(x), nearInts(x), 'Same signs give a positive; different signs give a negative.')
    }
    case 4: {
      const p = rng.int(2, 6)
      const q = rng.int(-8, -2)
      const r = rng.int(-20, 20)
      const v = p * q - r
      return pick(level, `Work out: ${p} × (${sg(q)}) − ${r < 0 ? `(${sg(r)})` : r}`, sg(v), nearInts(v), `Multiply first: ${p} × ${sg(q)} = ${sg(p * q)}; then subtract ${sg(r)}.`)
    }
    default: {
      const t = rng.int(-6, 8)
      const drop = rng.int(5, 18)
      const town = rng.pick(['the top of Mount Kenya', 'a freezer', 'a cold store', 'the peak of Kilimanjaro'])
      return pick(level, `The temperature at ${town} was ${sg(t)} °C. It dropped by ${drop} °C at night. What was the night temperature?`, `${sg(t - drop)} °C`, nearInts(t - drop).map((x) => `${x} °C`))
    }
  }
}

export const ratioJ = (g: J): Generator => (rng, level) => {
  if (g === 9) {
    switch (level) {
      case 1: {
        const k = rng.int(3, 9)
        const per = rng.pick([45, 60, 80, 120])
        const m = rng.int(2, 9)
        return num(level, `${k} exercise books cost ${fmt(k * per)} shillings. How much do ${m} books cost?`, m * per, { explain: `One costs ${per}; ${m} cost ${fmt(m * per)}.` })
      }
      case 2: {
        const w = rng.pick([4, 6, 8, 12])
        const d = rng.pick([6, 9, 12, 15])
        const w2 = rng.pick([2, 3, 4, 6, 9, 18].filter((x) => (w * d) % x === 0 && x !== w))
        return num(level, `${w} workers take ${d} days to build a wall. How many days would ${w2} workers take at the same rate?`, (w * d) / w2, { explain: `Inverse proportion: ${w} × ${d} = ${w * d} worker-days; ÷ ${w2} = ${(w * d) / w2}.` })
      }
      case 3: {
        const [w, d, h] = [rng.pick([6, 8, 10, 12]), rng.pick([4, 5, 6, 9, 10]), 8]
        let [w2, h2] = [w * 2, 4]
        for (let i = 0; i < 20; i++) {
          w2 = rng.pick([w / 2, w * 2, w + 2, w + 4])
          h2 = rng.pick([4, 6, 10, 12])
          if (Number.isInteger((w * d * h) / (w2 * h2)) && Number.isInteger(w2)) break
          w2 = w * 2
          h2 = 4
        }
        const d2 = (w * d * h) / (w2 * h2)
        return num(level, `${w} people working ${h} hours a day finish a job in ${d} days. How many days would ${w2} people working ${h2} hours a day take?`, d2, { explain: `Total work = ${w} × ${h} × ${d} = ${w * h * d} person-hours; ÷ (${w2} × ${h2}) = ${d2}.` })
      }
      case 4: {
        const [a, b] = rng.pick([[3, 6], [4, 12], [6, 12], [6, 3], [10, 15], [12, 4], [2, 3], [2, 6], [3, 4], [4, 6], [5, 20], [8, 24], [9, 18], [12, 24], [20, 30]])
        const t = (a * b) / (a + b)
        return Number.isInteger(t)
          ? num(level, `One tap fills a tank in ${a} hours; another fills it in ${b} hours. How long do both take together? (hours)`, t, { explain: `Rates 1/${a} + 1/${b} = ${frac(a + b, a * b)} per hour; time = ${t} h.` })
          : pick(level, `One tap fills a tank in ${a} hours; another fills it in ${b} hours. How long do both take together?`, `${frac(a * b, a + b)} hours`, [`${a + b} hours`, `${frac(a + b, 2)} hours`, `${Math.abs(a - b)} hours`])
      }
      default: {
        const price = rng.pick([80, 100, 120, 150])
        const up = rng.pick([10, 20, 25])
        const down = rng.pick([10, 20])
        const end = (price * (100 + up) * (100 - down)) / 10000
        return Number.isInteger(end)
          ? num(level, `The price of a kilogram of sugar was ${price} shillings. It rose by ${up}% and later fell by ${down}%. What is the new price?`, end, { explain: `${price} × ${(100 + up) / 100} × ${(100 - down) / 100} = ${end}` })
          : num(level, `The price of a book was ${price * 10} shillings. It rose by ${up}%. What is the new price?`, (price * 10 * (100 + up)) / 100)
      }
    }
  }
  switch (level) {
    case 1: {
      const k = rng.int(2, 12)
      const [a, b] = rng.pick([[2, 3], [3, 4], [3, 5], [4, 7], [5, 8], [2, 9], [7, 3]])
      return pick(level, `Simplify the ratio ${a * k} : ${b * k}.`, `${a} : ${b}`, [`${b} : ${a}`, `${a * k} : ${b}`, `${a + 1} : ${b}`])
    }
    case 2: {
      const [a, b] = rng.pick([[2, 3], [3, 5], [1, 4], [4, 5], [5, 7], [3, 7]])
      const total = (a + b) * rng.int(20, 150)
      return num(level, `${fmt(total)} shillings is shared between ${name(rng)} and a friend in the ratio ${a} : ${b}. How much does the bigger share get?`, (total * Math.max(a, b)) / (a + b), { explain: `${a + b} parts; one part = ${fmt(total / (a + b))}; ${Math.max(a, b)} parts = ${fmt((total * Math.max(a, b)) / (a + b))}.` })
    }
    case 3: {
      const s = rng.pick([40, 50, 60, 72, 80, 90])
      const h = rng.pick([2, 3, 4, 5])
      return rng.next() < 0.5 ? num(level, `A matatu travels ${s * h} km in ${h} hours. What is its average speed in km/h?`, s) : num(level, `A tap fills ${an(s * h)}-litre tank in ${h} hours. At what rate does it fill, in litres per hour?`, s)
    }
    case 4: {
      const old = rng.pick([200, 400, 500, 800, 1200, 2000])
      const p = rng.pick([5, 10, 15, 20, 25, 30, 40])
      const up = rng.next() < 0.5
      return num(level, `A price of ${fmt(old)} shillings is ${up ? 'increased' : 'decreased'} by ${p}%. What is the new price?`, up ? old + (old * p) / 100 : old - (old * p) / 100, { explain: `${p}% of ${fmt(old)} = ${fmt((old * p) / 100)}.` })
    }
    default: {
      const old = rng.pick([40, 50, 80, 120, 200, 250])
      const now = old + (old * rng.pick([10, 20, 25, 50])) / 100
      return num(level, `The number of learners in a club grew from ${old} to ${now}. What was the percentage increase?`, ((now - old) / old) * 100, { explain: `(${now} − ${old}) ÷ ${old} × 100 = ${((now - old) / old) * 100}%` })
    }
  }
}

export const indicesJ = (): Generator => (rng, level) => {
  const b = rng.pick([2, 3, 5, 10, 'a', 'x'] as const)
  const m = rng.int(2, 7)
  const n = rng.int(2, 5)
  switch (level) {
    case 1:
      return pick(level, `Simplify ${b}${sup(m)} × ${b}${sup(n)}.`, `${b}${sup(m + n)}`, [`${b}${sup(m * n)}`, `${b}${sup(m - n)}`, `${typeof b === 'number' ? b * 2 : `2${b}`}${sup(m + n)}`], 'Same base: add the powers.')
    case 2:
      return pick(level, `Simplify ${b}${sup(m + n)} ÷ ${b}${sup(n)}.`, `${b}${sup(m)}`, [`${b}${sup(m + 2 * n)}`, `${b}${sup(n)}`, `1${sup(m)}`], 'Same base: subtract the powers.')
    case 3:
      return pick(level, `Simplify (${b}${sup(m)})${sup(n)}.`, `${b}${sup(m * n)}`, [`${b}${sup(m + n)}`, `${b}${sup(m * n + 1)}`, `${b}${sup(m)}`], 'Power of a power: multiply the powers.')
    case 4: {
      const kind = rng.int(1, 4)
      if (kind === 1) {
        // Negative powers: a⁻ⁿ = 1/aⁿ.
        const [base, p] = rng.pick([[2, 1], [2, 2], [2, 3], [2, 4], [3, 1], [3, 2], [3, 3], [4, 2], [5, 2], [5, 3], [10, 1], [10, 2], [10, 3], [6, 2], [7, 2]] as const)
        const v = base ** p
        return pick(level, `Evaluate ${base}${sup(-p)}.`, `1/${v}`, [sg(-v), String(v), sg(-base * p)], 'A negative power means one over: a⁻ⁿ = 1/aⁿ.')
      }
      if (kind === 2) {
        const base = rng.pick([2, 3, 7, 12, 25, 100, 'x', 'm'] as const)
        return pick(level, `Evaluate ${base}⁰.`, '1', ['0', String(base), `1/${base}`], 'Anything (except 0) to the power 0 is 1.')
      }
      if (kind === 3) {
        const root = rng.int(2, 12)
        return pick(level, `Evaluate ${root * root} to the power ½.`, String(root), [String(root * root * 2), String((root * root) / 2), String(root * 2)], 'The power ½ means the square root.')
      }
      const root = rng.int(2, 6)
      const sq = rng.next() < 0.5
      return sq
        ? pick(level, `Evaluate ${root ** 3} to the power ⅔.`, String(root * root), [String(root), String(root ** 2 * 2), String(Math.round((root ** 3 * 2) / 3))], 'Take the cube root, then square it.')
        : pick(level, `Evaluate ${root ** 3} to the power ⅓.`, String(root), [String(root ** 2), String(Math.round(root ** 3 / 3)), String(root * 3)], 'The power ⅓ means the cube root.')
    }
    default: {
      const big = rng.next() < 0.5
      const mant = rng.int(11, 99) / 10
      const e = rng.int(3, 8)
      return big
        ? pick(level, `${rng.pick(['A county has a budget of ${n} shillings.', 'A factory made ${n} bottles last year.', 'A satellite travelled ${n} kilometres.', 'A stadium sold ${n} tickets in a season.']).replace('${n}', fmt(Math.round(mant * 10 ** e)))} Write this number in standard form.`, `${mant} × 10${sup(e)}`, [`${mant} × 10${sup(e - 1)}`, `${mant * 10} × 10${sup(e)}`, `${mant} × 10${sup(-e)}`])
        : pick(level, `A bacterium is ${(mant / 10 ** e).toFixed(e + 1).replace(/0+$/, '')} mm long. Write this in standard form.`, `${mant} × 10${sup(-e)}`, [`${mant} × 10${sup(e)}`, `${mant} × 10${sup(-(e + 1))}`, `${mant * 10} × 10${sup(-e)}`])
    }
  }
}

// ── Algebra ─────────────────────────────────────────────────────────────────

export const exprJ = (g: J): Generator => (rng, level) => {
  const v = rng.pick(['x', 'y', 'a', 'p', 'm'])
  const w = rng.pick(['b', 'n', 'q', 'k'])
  if (g === 9) {
    const p = rng.int(1, 9) * (rng.next() < 0.3 ? -1 : 1)
    const q = rng.int(1, 9) * (rng.next() < 0.3 ? -1 : 1)
    const quad = (s: number, t: number) => expr([[1, `${v}²`], [s, v], [t, '']])
    const br = (s: number) => `(${v}${s < 0 ? ` − ${-s}` : ` + ${s}`})`
    switch (level) {
      case 1:
        return pick(level, `Expand ${br(p)}${br(q)}.`, quad(p + q, p * q), [quad(p * q, p + q), quad(p + q, p + q), expr([[1, `${v}²`], [p * q, '']])], 'Multiply each term in the first bracket by each in the second.')
      case 2:
        return pick(level, `Factorise ${quad(p + q, p * q)}.`, `${br(p)}${br(q)}`, [`${br(-p)}${br(-q)}`, `${br(p + q)}${br(1)}`, `${br(p * q)}${br(1)}`], `Find two numbers that multiply to ${sg(p * q)} and add to ${sg(p + q)}.`)
      case 3: {
        const k = rng.int(2, 12)
        return pick(level, `Factorise ${v}² − ${k * k}.`, `(${v} + ${k})(${v} − ${k})`, [`(${v} − ${k})²`, `(${v} + ${k})²`, `(${v} − ${k * k})(${v} + 1)`], 'Difference of two squares: a² − b² = (a + b)(a − b).')
      }
      case 4: {
        const k = rng.int(2, 9)
        return pick(level, `Expand (${v} + ${k})².`, quad(2 * k, k * k), [quad(0, k * k), quad(k, k * k), quad(2 * k, 2 * k)], '(a + b)² = a² + 2ab + b².')
      }
      default: {
        const r1 = rng.int(1, 9)
        const r2 = rng.int(1, 9)
        return pick(level, `Solve ${quad(-(r1 + r2), r1 * r2)} = 0.`, `${v} = ${Math.min(r1, r2)} or ${v} = ${Math.max(r1, r2)}`, [`${v} = −${Math.min(r1, r2)} or ${v} = −${Math.max(r1, r2)}`, `${v} = ${r1 + r2} or ${v} = 0`, `${v} = ${r1 * r2} or ${v} = 1`], 'Factorise, then set each bracket equal to zero.')
      }
    }
  }
  switch (level) {
    case 1: {
      const [a, b, c] = [rng.int(2, 9), rng.int(2, 9), rng.int(1, 6)]
      return pick(level, `Simplify ${a}${v} + ${b}${v} − ${c}${v}.`, expr([[a + b - c, v]]), [expr([[a + b + c, v]]), expr([[a + b - c, `${v}²`]]), `${a + b - c}`])
    }
    case 2: {
      const [a, b, c, d] = [rng.int(2, 9), rng.int(2, 9), rng.int(1, 9), rng.int(1, 9)]
      return pick(level, `Simplify ${a}${v} + ${b}${w} + ${c}${v} − ${d}${w}.`, expr([[a + c, v], [b - d, w]]), [expr([[a + c, v], [b + d, w]]), expr([[a + b, v], [c - d, w]]), `${a + b + c - d}${v}${w}`])
    }
    case 3: {
      const [a, b] = [rng.int(2, 6), rng.int(1, 9)]
      const x = g === 8 ? rng.int(-6, -1) : rng.int(2, 9)
      const y = rng.int(2, 9)
      const val = a * x * x + b * y
      return g === 8
        ? pick(level, `Find the value of ${a}${v}² + ${b}${w} when ${v} = ${sg(x)} and ${w} = ${y}.`, sg(val), nearInts(val), `${a} × (${sg(x)})² + ${b} × ${y} = ${a * x * x} + ${b * y} = ${val}`)
        : num(level, `Find the value of ${a}${v}² + ${b}${w} when ${v} = ${x} and ${w} = ${y}.`, val, { explain: `${a} × ${x * x} + ${b} × ${y} = ${val}` })
    }
    case 4: {
      const [a, b, c, d] = [rng.int(2, 5), rng.int(1, 9), rng.int(2, 4), rng.int(1, 9)]
      if (g === 8 && rng.next() < 0.5) {
        const k = rng.int(2, 6)
        return pick(level, `Factorise ${k * a}${v} + ${k * b}.`, `${k}(${a}${v} + ${b})`, [`${k * a}(${v} + ${b})`, `${a}(${k}${v} + ${b})`, `${k}(${a}${v} + ${k * b})`], 'Take out the highest common factor.')
      }
      return pick(level, `Expand and simplify ${a}(${v} + ${b}) − ${c}(${v} − ${d}).`, expr([[a - c, v], [a * b + c * d, '']]), [expr([[a - c, v], [a * b - c * d, '']]), expr([[a + c, v], [a * b + c * d, '']]), expr([[a - c, v], [b + d, '']])], 'Multiply out each bracket; − × − = +.')
    }
    default: {
      const [s, t] = [rng.int(20, 60), rng.int(30, 90)]
      const items = rng.pick([['pens', 'books'], ['mangoes', 'oranges'], ['bread', 'milk']])
      return pick(level, `A pupil buys ${v} ${items[0]} at ${s} shillings each and ${w} ${items[1]} at ${t} shillings each, and pays with a 1,000 shilling note. Which expression gives the change?`, `1000 − ${s}${v} − ${t}${w}`, [`1000 − ${s + t}${v}${w}`, `${s}${v} + ${t}${w} − 1000`, `1000 − ${s}${v} + ${t}${w}`])
    }
  }
}

export const equationsJ = (g: J): Generator => (rng, level) => {
  const v = g === 9 ? 'x' : rng.pick(['x', 'y', 'm', 'n', 'p'])
  if (g === 9) {
    const x = rng.int(1, 12)
    const y = rng.int(1, 12)
    switch (level) {
      case 1:
        return num(level, `Solve: ${v} + y = ${x + y} and ${v} − y = ${x - y < 0 ? `−${y - x}` : x - y}. What is ${v}?`, x, { explain: `Add the equations: 2${v} = ${2 * x}, so ${v} = ${x}.` })
      case 2:
        return num(level, `Solve: 2x + y = ${2 * x + y} and x + y = ${x + y}. What is y?`, y, { explain: `Subtract: x = ${x}; then y = ${x + y} − ${x} = ${y}.` })
      case 3: {
        const [a, b, c, d] = [rng.int(2, 5), rng.int(1, 4), rng.int(1, 4), rng.int(2, 5)]
        return num(level, `Solve: ${a}x + ${b}y = ${a * x + b * y} and ${c}x + ${d}y = ${c * x + d * y}. What is x?`, x, { explain: `Eliminate y, then solve for x: x = ${x}, y = ${y}.` })
      }
      case 4: {
        const [p1, p2] = [rng.pick([20, 30, 40, 50]), rng.pick([60, 80, 100, 120])]
        const [a, b] = [rng.int(2, 6), rng.int(1, 5)]
        const [c, d] = [rng.int(1, 5), rng.int(2, 6)]
        return num(level, `${a} pen${a > 1 ? 's' : ''} and ${b} ruler${b > 1 ? 's' : ''} cost ${a * p1 + b * p2} shillings. ${c} pen${c > 1 ? 's' : ''} and ${d} ruler${d > 1 ? 's' : ''} cost ${c * p1 + d * p2} shillings. How much is one ruler?`, p2, { explain: `Form two equations and solve: pen ${p1}, ruler ${p2}.` })
      }
      default: {
        const [adult, child] = [rng.pick([200, 250, 300]), rng.pick([100, 120, 150])]
        const [na, nc] = [rng.int(10, 40), rng.int(20, 80)]
        return num(level, `${na + nc} people paid ${fmt(na * adult + nc * child)} shillings to enter a park. Adults paid ${adult} and children ${child}. How many children were there?`, nc, { explain: `a + c = ${na + nc}; ${adult}a + ${child}c = ${fmt(na * adult + nc * child)}; c = ${nc}.` })
      }
    }
  }
  const x = rng.int(2, 15)
  switch (level) {
    case 1: {
      if (g === 8) {
        const [a, b, c] = [rng.int(4, 9), rng.int(1, 3), rng.int(1, 20)]
        const d = a * x + c - b * x
        return num(level, `Solve: ${a}${v} + ${c} = ${b}${v} + ${d}.`, x, { explain: `${a - b}${v} = ${d - c}, so ${v} = ${x}.` })
      }
      const a = rng.int(5, 40)
      return num(level, `Solve: ${v} + ${a} = ${x + a}.`, x)
    }
    case 2: {
      const a = rng.int(2, 9)
      if (g === 8) {
        const b = rng.int(1, 9)
        return num(level, `Solve: ${v}/${a} + ${b} = ${x + b}.`, a * x, { explain: `${v}/${a} = ${x}, so ${v} = ${a * x}.` })
      }
      return num(level, `Solve: ${a}${v} = ${a * x}.`, x)
    }
    case 3: {
      const [a, b] = [rng.int(2, 9), rng.int(1, 20)]
      if (g === 8) {
        const lim = a * x + b
        return pick(level, `Solve the inequality ${a}${v} + ${b} > ${lim}.`, `${v} > ${x}`, [`${v} < ${x}`, `${v} > ${lim}`, `${v} = ${x}`], `${a}${v} > ${lim - b}, so ${v} > ${x}.`)
      }
      return num(level, `Solve: ${a}${v} + ${b} = ${a * x + b}.`, x, { explain: `${a}${v} = ${a * x}, so ${v} = ${x}.` })
    }
    case 4: {
      const [a, b] = [rng.int(2, 6), rng.int(1, 9)]
      return num(level, `Solve: ${a}(${v} + ${b}) = ${a * (x + b)}.`, x, { explain: `${v} + ${b} = ${x + b}, so ${v} = ${x}.` })
    }
    default: {
      const kind = rng.int(0, 2)
      if (kind === 0) {
        const age = rng.int(8, 14)
        const k = rng.int(3, 4)
        return num(level, `A mother is ${k} times as old as her son. Their ages add up to ${age * (k + 1)} years. How old is the son?`, age, { explain: `x + ${k}x = ${age * (k + 1)}, so x = ${age}.` })
      }
      if (kind === 1) {
        const w = rng.int(5, 20)
        const l = w + rng.int(3, 12)
        return num(level, `A rectangle's length is ${l - w} m more than its width. Its perimeter is ${2 * (l + w)} m. Find the width. (m)`, w, { explain: `2(w + w + ${l - w}) = ${2 * (l + w)}, so w = ${w}.` })
      }
      const n = rng.int(10, 40)
      return num(level, `Three consecutive numbers add up to ${3 * n + 3}. What is the smallest?`, n, { explain: `n + (n + 1) + (n + 2) = ${3 * n + 3}, so n = ${n}.` })
    }
  }
}

// ── Measurement ─────────────────────────────────────────────────────────────

const TRIPLES: [number, number, number][] = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [6, 8, 10],
  [9, 12, 15],
  [12, 16, 20],
  [15, 20, 25],
  [20, 21, 29],
  [9, 40, 41],
]

export const pythagJ = (): Generator => (rng, level) => {
  const [a0, b0, c0] = rng.pick(TRIPLES)
  // Scaled triples keep whole-number answers while giving many more triangles.
  const s = level <= 2 ? rng.int(1, 4) : 1
  const [a, b, c] = [a0 * s, b0 * s, c0 * s]
  const k = level >= 4 ? rng.int(1, 3) : 1
  switch (level) {
    case 1:
      return num(level, `A right-angled triangle has shorter sides ${a} cm and ${b} cm. How long is the hypotenuse? (cm)`, c, { explain: `${a}² + ${b}² = ${a * a + b * b} = ${c}²` })
    case 2:
      return num(level, `A right-angled triangle has hypotenuse ${c} cm and one side ${a} cm. How long is the other side? (cm)`, b, { explain: `${c}² − ${a}² = ${c * c - a * a} = ${b}²` })
    case 3: {
      const t = rng.int(1, 3)
      const [p, q, r] = rng.pick(TRIPLES).map((x) => x * t)
      return pick(level, 'Which set of side lengths makes a right-angled triangle?', `${p}, ${q}, ${r}`, [`${p}, ${q}, ${r + 1}`, `${p + 1}, ${q}, ${r}`, `${p}, ${q + 2}, ${r}`], 'Check whether the squares of the two shorter sides add up to the square of the longest.')
    }
    case 4:
      return num(level, `A ladder ${c * k} m long leans against a wall. Its foot is ${a * k} m from the wall. How high up the wall does it reach? (m)`, b * k, { explain: `√(${(c * k) ** 2} − ${(a * k) ** 2}) = ${b * k} m` })
    default:
      return num(level, `A rectangular field is ${a * k * 10} m by ${b * k * 10} m. How long is the path along its diagonal? (m)`, c * k * 10, { explain: `√(${(a * k * 10) ** 2} + ${(b * k * 10) ** 2}) = ${c * k * 10} m` })
  }
}

export const measureJ = (g: J): Generator => (rng, level) => {
  if (g === 9) {
    const r = 7 * rng.int(1, 4)
    const h = rng.int(2, 20)
    switch (level) {
      case 1:
        return num(level, `Find the volume of a cylinder of radius ${r} cm and height ${h} cm. (Take π = 22/7) (cm³)`, (22 * r * r * h) / 7, { explain: `V = πr²h = 22/7 × ${r}² × ${h} = ${fmt((22 * r * r * h) / 7)} cm³` })
      case 2: {
        const h3 = 3 * rng.int(2, 8)
        return num(level, `Find the volume of a cone of radius ${r} cm and height ${h3} cm. (Take π = 22/7) (cm³)`, (22 * r * r * h3) / 21, { explain: `V = ⅓πr²h = ⅓ × 22/7 × ${r}² × ${h3} = ${fmt((22 * r * r * h3) / 21)} cm³` })
      }
      case 3: {
        const s = rng.int(3, 15)
        const hp = 3 * rng.int(2, 8)
        return num(level, `A square-based pyramid has base ${s} cm by ${s} cm and height ${hp} cm. Find its volume. (cm³)`, (s * s * hp) / 3, { explain: `V = ⅓ × base area × height = ⅓ × ${s * s} × ${hp} = ${(s * s * hp) / 3} cm³` })
      }
      case 4:
        return num(level, `Find the total surface area of a closed cylinder of radius ${r} cm and height ${h} cm. (Take π = 22/7) (cm²)`, (2 * 22 * r * r) / 7 + (2 * 22 * r * h) / 7, { explain: `2πr² + 2πrh = ${fmt((2 * 22 * r * r) / 7)} + ${fmt((2 * 22 * r * h) / 7)} cm²` })
      default: {
        const rr = 7 * rng.int(1, 3)
        const hh = 10 * rng.int(1, 5)
        const litres = (22 * rr * rr * hh) / 7 / 1000
        return pick(level, `A cylindrical water tank has radius ${rr * 10} cm and height ${hh * 10} cm. How many litres does it hold? (π = 22/7)`, `${fmt(litres * 1000)} litres`, [`${fmt(litres * 100)} litres`, `${fmt(litres * 10000)} litres`, `${fmt(litres * 2000)} litres`], `V = 22/7 × ${rr * 10}² × ${hh * 10} cm³; ÷ 1,000 for litres.`)
      }
    }
  }
  if (g === 8) {
    const [l, w, h] = [rng.int(4, 20), rng.int(3, 12), rng.int(2, 10)]
    switch (level) {
      case 1:
        return num(level, `Find the total surface area of a closed box ${l} cm by ${w} cm by ${h} cm. (cm²)`, 2 * (l * w + l * h + w * h), { explain: `2(lw + lh + wh) = 2(${l * w} + ${l * h} + ${w * h})` })
      case 2: {
        const b = 2 * rng.int(2, 8)
        const ht = rng.int(3, 12)
        const len = rng.int(5, 20)
        return num(level, `A triangular prism has a triangle face of base ${b} cm and height ${ht} cm, and is ${len} cm long. Find its volume. (cm³)`, (b * ht * len) / 2, { explain: `Cross-section area ${(b * ht) / 2} cm² × length ${len} = ${(b * ht * len) / 2} cm³` })
      }
      case 3: {
        const [a, b2, ht] = [rng.int(4, 12), rng.int(13, 24), rng.int(3, 10)]
        return num(level, `Find the area of a trapezium with parallel sides ${a} cm and ${b2} cm, and height ${2 * ht} cm. (cm²)`, (a + b2) * ht, { explain: `½ × (${a} + ${b2}) × ${2 * ht} = ${(a + b2) * ht} cm²` })
      }
      case 4:
        return pick(level, `Convert ${fmt(l * w * 100)} cm² to m².`, String((l * w * 100) / 10000), [String(l * w), String((l * w * 100) / 100), String((l * w * 100) / 1000)], '1 m² = 10,000 cm².')
      default: {
        const tank = [rng.pick([100, 120, 150, 200]), rng.pick([50, 80, 100]), rng.pick([60, 80, 100])]
        const v = (tank[0] * tank[1] * tank[2]) / 1000
        const per = rng.pick([20, 25, 40, 50])
        return num(level, `A tank ${tank[0]} cm by ${tank[1]} cm by ${tank[2]} cm is full of water. How many ${per}-litre jerrycans can it fill completely?`, Math.floor(v / per), { explain: `${fmt(v)} litres ÷ ${per} = ${Math.floor(v / per)}` })
      }
    }
  }
  switch (level) {
    case 1: {
      const [a, b, c, d] = [rng.int(10, 20), rng.int(8, 14), rng.int(3, 7), rng.int(2, 6)]
      return num(level, `An L-shaped room is ${an(a)} m by ${b} m rectangle with ${an(c)} m by ${d} m corner cut out. What is its perimeter? (m)`, 2 * (a + b), { explain: `Cutting a corner does not change the perimeter: 2 × (${a} + ${b}) = ${2 * (a + b)} m.` })
    }
    case 2: {
      const b = 2 * rng.int(2, 15)
      const h = rng.int(3, 20)
      return rng.next() < 0.5 ? num(level, `Find the area of a triangle of base ${b} cm and height ${h} cm. (cm²)`, (b * h) / 2) : num(level, `Find the area of a parallelogram of base ${b} cm and height ${h} cm. (cm²)`, b * h)
    }
    case 3: {
      const [l, w, h] = [rng.pick([10, 20, 25, 50]), rng.pick([10, 20, 25, 50]), rng.pick([40, 80])]
      return num(level, `How many litres does a box ${l} cm by ${w} cm by ${h} cm hold?`, (l * w * h) / 1000, { explain: `${fmt(l * w * h)} cm³ ÷ 1,000 = ${(l * w * h) / 1000} litres` })
    }
    case 4: {
      const ha = rng.int(2, 9)
      return rng.next() < 0.5 ? num(level, `${ha} hectares = ___ m² (1 ha = 10,000 m²)`, ha * 10000) : num(level, `${ha * 1000} cm³ = ___ litres`, ha)
    }
    default: {
      const [l, w] = [rng.int(15, 40), rng.int(10, 25)]
      const path = rng.int(1, 3)
      return num(level, `A garden ${l} m by ${w} m has a path ${path} m wide all round the outside. Find the area of the path. (m²)`, (l + 2 * path) * (w + 2 * path) - l * w, { explain: `(${l + 2 * path} × ${w + 2 * path}) − (${l} × ${w}) = ${(l + 2 * path) * (w + 2 * path) - l * w} m²` })
    }
  }
}

export const circlesJ = (): Generator => (rng, level) => {
  const r = 7 * rng.int(1, 10)
  switch (level) {
    case 1:
      if (rng.next() < 0.4) return num(level, `Find the circumference of a circle of diameter ${r} cm. (π = 22/7)`, (22 * r) / 7, { explain: `C = πd = 22/7 × ${r} = ${(22 * r) / 7} cm` })
      return num(level, `Find the circumference of a circle of radius ${r} cm. (π = 22/7)`, (44 * r) / 7, { explain: `C = 2πr = 2 × 22/7 × ${r} = ${(44 * r) / 7} cm` })
    case 2:
      if (rng.next() < 0.4) return num(level, `Find the area of a circle of diameter ${2 * r} cm. (π = 22/7) (cm²)`, (22 * r * r) / 7, { explain: `r = ${r} cm; A = πr² = ${(22 * r * r) / 7} cm²` })
      return num(level, `Find the area of a circle of radius ${r} cm. (π = 22/7) (cm²)`, (22 * r * r) / 7, { explain: `A = πr² = 22/7 × ${r}² = ${(22 * r * r) / 7} cm²` })
    case 3: {
      const C = (44 * r) / 7
      if (rng.next() < 0.4) return num(level, `A circle has an area of ${fmt((22 * r * r) / 7)} cm². Find its radius. (π = 22/7) (cm)`, r, { explain: `r² = A ÷ π = ${(22 * r * r) / 7} ÷ 22/7 = ${r * r}, so r = ${r} cm` })
      if (rng.next() < 0.5) return num(level, `A circular track has a circumference of ${C} m. Find its diameter. (π = 22/7) (m)`, 2 * r, { explain: `d = C ÷ π = ${C} ÷ 22/7 = ${2 * r} m` })
      return num(level, `A circle has a circumference of ${C} cm. Find its radius. (π = 22/7) (cm)`, r, { explain: `r = C ÷ 2π = ${C} ÷ 44/7 = ${r} cm` })
    }
    case 4: {
      const angle = rng.pick([90, 180, 45, 120, 60])
      const arc = (44 * r * angle) / 7 / 360
      return Number.isInteger(arc)
        ? num(level, `Find the length of an arc that subtends ${angle}° at the centre of a circle of radius ${r} cm. (π = 22/7) (cm)`, arc, { explain: `${angle}/360 × 2πr = ${arc} cm` })
        : num(level, `Find the area of a semicircle of radius ${r} cm. (π = 22/7) (cm²)`, (11 * r * r) / 7, { explain: `½πr² = ${(11 * r * r) / 7} cm²` })
    }
    default: {
      const R = r + 7 * rng.int(1, 2)
      return num(level, `A circular pond of radius ${r} m has a path around it, making a bigger circle of radius ${R} m. Find the area of the path. (π = 22/7) (m²)`, (22 * (R * R - r * r)) / 7, { explain: `π(R² − r²) = 22/7 × (${R * R} − ${r * r}) = ${(22 * (R * R - r * r)) / 7} m²` })
    }
  }
}

export const timeJ = (): Generator => (rng, level) => {
  switch (level) {
    case 1: {
      const h = rng.int(1, 11)
      const m = rng.pick([0, 5, 15, 20, 30, 45, 50])
      const pm = rng.next() < 0.6
      const t = `${(pm ? h + 12 : h).toString().padStart(2, '0')}${m.toString().padStart(2, '0')} h`
      return pick(level, `Write ${h}:${m.toString().padStart(2, '0')} ${pm ? 'p.m.' : 'a.m.'} in the 24-hour clock.`, t, [`${(pm ? h : h + 12).toString().padStart(2, '0')}${m.toString().padStart(2, '0')} h`, `${h}${m.toString().padStart(2, '0')} h`, `${(h + 10).toString().padStart(2, '0')}${m.toString().padStart(2, '0')} h`])
    }
    case 2: {
      const start = rng.int(19, 23) * 60 + rng.pick([0, 15, 30, 45])
      const dur = rng.int(5, 10) * 60 + rng.pick([10, 20, 40, 50])
      const end = (start + dur) % 1440
      const f = (x: number) => `${Math.floor(x / 60).toString().padStart(2, '0')}${(x % 60).toString().padStart(2, '0')} h`
      return pick(level, `A night bus leaves Nairobi at ${f(start)} and the journey takes ${Math.floor(dur / 60)} h ${dur % 60} min. At what time does it arrive?`, f(end), [f((end + 60) % 1440), f((end + 1430) % 1440), f((start + dur - 60) % 1440)])
    }
    case 3: {
      const months: [string, number][] = [['January', 31], ['February', 28], ['March', 31], ['April', 30], ['May', 31], ['June', 30], ['July', 31], ['August', 31], ['September', 30], ['October', 31], ['November', 30], ['December', 31]]
      const i = rng.int(0, 10)
      const d1 = rng.int(5, 25)
      const d2 = rng.int(3, 25)
      const days = months[i][1] - d1 + d2
      return num(level, `How many days are there from ${d1} ${months[i][0]} to ${d2} ${months[i + 1][0]} (not counting the first day)?`, days, { explain: `${months[i][1] - d1} days left in ${months[i][0]}, plus ${d2} = ${days}.` })
    }
    case 4: {
      const lo = rng.int(-12, 5)
      const hi = rng.int(8, 32)
      return num(level, `The lowest temperature was ${sg(lo)} °C and the highest was ${hi} °C. What is the difference in degrees?`, hi - lo, { explain: `${hi} − (${sg(lo)}) = ${hi - lo} °C` })
    }
    default: {
      const lessons = rng.int(6, 9)
      const len = rng.pick([35, 40])
      const brk = rng.pick([20, 30])
      const lunch = 60
      const startM = 8 * 60
      const end = startM + lessons * len + brk + lunch
      return pick(level, `A school day starts at 0800 h with ${lessons} lessons of ${len} minutes, one ${brk}-minute break and a one-hour lunch. When does it end?`, `${Math.floor(end / 60).toString().padStart(2, '0')}${(end % 60).toString().padStart(2, '0')} h`, [`${Math.floor((end - 60) / 60).toString().padStart(2, '0')}${((end - 60) % 60).toString().padStart(2, '0')} h`, `${Math.floor((end + brk) / 60).toString().padStart(2, '0')}${((end + brk) % 60).toString().padStart(2, '0')} h`, `${Math.floor((end - brk) / 60).toString().padStart(2, '0')}${((end - brk) % 60).toString().padStart(2, '0')} h`])
    }
  }
}

export const densityJ = (): Generator => (rng, level) => {
  const d = rng.pick([2, 3, 5, 8, 10, 11, 19])
  const v = rng.int(5, 60)
  switch (level) {
    case 1:
      return num(level, `A block has a mass of ${d * v} g and a volume of ${v} cm³. Find its density in g/cm³.`, d, { explain: `Density = mass ÷ volume = ${d * v} ÷ ${v} = ${d} g/cm³` })
    case 2:
      return num(level, `A metal has density ${d} g/cm³. Find the mass of ${v} cm³ of it. (g)`, d * v, { explain: `Mass = density × volume = ${d} × ${v}` })
    case 3:
      return num(level, `A stone of mass ${d * v} g has density ${d} g/cm³. Find its volume. (cm³)`, v, { explain: `Volume = mass ÷ density = ${d * v} ÷ ${d}` })
    case 4: {
      const dd = rng.int(1, 21)
      return rng.next() < 0.5
        ? num(level, `Convert ${dd} g/cm³ to kg/m³.`, dd * 1000, { explain: `1 g/cm³ = 1,000 kg/m³` })
        : num(level, `Convert ${fmt(dd * 1000)} kg/m³ to g/cm³.`, dd, { explain: `Divide by 1,000.` })
    }
    default: {
      const [l, w, h] = [rng.int(2, 10), rng.int(2, 8), rng.int(2, 6)]
      return num(level, `A metal block ${l} cm by ${w} cm by ${h} cm has density ${d} g/cm³. What is its mass? (g)`, l * w * h * d, { explain: `Volume ${l * w * h} cm³ × ${d} g/cm³ = ${l * w * h * d} g` })
    }
  }
}

export const speedJ = (): Generator => (rng, level) => {
  switch (level) {
    case 1: {
      const s = 18 * rng.int(1, 16)
      return num(level, `Convert ${s} km/h to m/s.`, (s * 5) / 18, { explain: `× 1,000 ÷ 3,600 = × 5/18: ${s} × 5/18 = ${(s * 5) / 18} m/s` })
    }
    case 2: {
      const s = 5 * rng.int(1, 18)
      return num(level, `Convert ${s} m/s to km/h.`, (s * 18) / 5, { explain: `× 3,600 ÷ 1,000 = × 18/5` })
    }
    case 3: {
      const sp = rng.pick([40, 60, 80, 90, 120])
      const t = rng.pick([1.5, 2.5, 3, 4.5, 0.5])
      return num(level, `A car travels at ${sp} km/h for ${t} hours. How far does it go? (km)`, sp * t, { explain: `Distance = speed × time = ${sp} × ${t}` })
    }
    case 4: {
      const [d1, s1] = [rng.pick([60, 120, 180]), rng.pick([60, 30])]
      const [d2, s2] = [rng.pick([80, 160, 240]), rng.pick([80, 40])]
      const t = d1 / s1 + d2 / s2
      const avg = (d1 + d2) / t
      return Number.isInteger(avg)
        ? num(level, `A cyclist rides ${d1} km at ${s1} km/h, then ${d2} km at ${s2} km/h. What is the average speed for the whole journey? (km/h)`, avg, { explain: `Total distance ${d1 + d2} km ÷ total time ${t} h = ${avg} km/h` })
        : num(level, `A bus covers ${d1 + d2} km in ${t} hours. What is the average speed? (km/h, nearest whole number)`, Math.round((d1 + d2) / t))
    }
    default: {
      const s1 = rng.pick([40, 50, 60])
      const s2 = s1 + rng.pick([10, 20, 30])
      const head = rng.pick([1, 2])
      const t = (s1 * head) / (s2 - s1)
      return Number.isInteger(t)
        ? num(level, `A lorry leaves a town at ${s1} km/h. ${head} hour${head > 1 ? 's' : ''} later, a car leaves the same town on the same road at ${s2} km/h. After how many hours of driving does the car catch up?`, t, { explain: `The lorry is ${s1 * head} km ahead; the car closes ${s2 - s1} km each hour: ${s1 * head} ÷ ${s2 - s1} = ${t} h.` })
        : num(level, `A train travels ${s2 * 3} km in 3 hours. What is its speed? (km/h)`, s2)
    }
  }
}

export const moneyJ = (g: J): Generator => (rng, level) => {
  if (g === 9) {
    switch (level) {
      case 1: {
        const rate = rng.pick([128, 130, 135, 140])
        const usd = rng.pick([20, 50, 100, 150, 200])
        return num(level, `If 1 US dollar = ${rate} Kenya shillings, how many shillings are ${usd} dollars?`, usd * rate)
      }
      case 2: {
        const rate = rng.pick([125, 130, 140, 160])
        const usd = rng.pick([20, 40, 50, 80, 100])
        return num(level, `If 1 US dollar = ${rate} Kenya shillings, how many dollars do you get for ${fmt(usd * rate)} shillings?`, usd)
      }
      case 3: {
        const price = rng.pick([1000, 1500, 2000, 2500, 3000, 5000, 7500, 10000, 12500, 20000, 25000])
        if (rng.next() < 0.5) return num(level, `An item costs ${fmt((price * 116) / 100)} shillings including 16% VAT. What was the price before VAT?`, price, { explain: `${fmt((price * 116) / 100)} ÷ 1.16 = ${fmt(price)}` })
        return num(level, `An item costs ${fmt(price)} shillings before VAT. VAT is 16%. What is the price including VAT?`, (price * 116) / 100, { explain: `16% of ${fmt(price)} = ${fmt((price * 16) / 100)}` })
      }
      case 4: {
        const p = rng.pick([10000, 20000, 30000, 40000, 50000, 80000, 100000])
        const r = rng.pick([5, 10, 20])
        const a = (p * (100 + r) * (100 + r)) / 10000
        return num(level, `${fmt(p)} shillings is saved at ${r}% compound interest per year. How much is in the account after 2 years?`, a, { explain: `${fmt(p)} × ${(100 + r) / 100} × ${(100 + r) / 100} = ${fmt(a)}` })
      }
      default: {
        const p = rng.pick([40000, 50000, 60000, 80000, 100000, 120000, 150000, 200000])
        const r = rng.pick([10, 20])
        const v = (p * (100 - r) * (100 - r)) / 10000
        return num(level, `A motorbike bought for ${fmt(p)} shillings loses ${r}% of its value every year. What is it worth after 2 years?`, v, { explain: `${fmt(p)} × ${(100 - r) / 100} × ${(100 - r) / 100} = ${fmt(v)}` })
      }
    }
  }
  if (g === 8) {
    switch (level) {
      case 1: {
        const sales = rng.pick([20000, 50000, 80000, 120000])
        const c = rng.pick([2, 5, 8, 10])
        return num(level, `An agent earns ${c}% commission. How much commission is earned on sales of ${fmt(sales)} shillings?`, (sales * c) / 100)
      }
      case 2: {
        const [p, r, t] = [rng.pick([10000, 20000, 40000, 50000]), rng.pick([5, 8, 10, 12]), rng.int(2, 5)]
        return num(level, `Find the simple interest on ${fmt(p)} shillings at ${r}% per year for ${t} years.`, (p * r * t) / 100, { explain: `I = PRT/100 = ${fmt(p)} × ${r} × ${t} ÷ 100` })
      }
      case 3: {
        const [p, r, t] = [rng.pick([10000, 20000, 30000]), rng.pick([5, 10]), rng.int(2, 4)]
        return num(level, `${fmt(p)} shillings is borrowed at ${r}% simple interest per year for ${t} years. What is the total amount repaid?`, p + (p * r * t) / 100)
      }
      case 4: {
        const cash = rng.pick([18000, 24000, 30000, 45000])
        const dep = cash / rng.pick([4, 5, 6])
        const n = rng.pick([6, 10, 12])
        const inst = Math.ceil((cash - dep) / n / 100) * 100 + rng.pick([200, 300, 500])
        return num(level, `A TV costs ${fmt(cash)} shillings cash. On hire purchase it needs a deposit of ${fmt(dep)} and ${n} monthly instalments of ${fmt(inst)}. How much more does hire purchase cost?`, dep + n * inst - cash, { explain: `${fmt(dep)} + ${n} × ${fmt(inst)} − ${fmt(cash)}` })
      }
      default: {
        const salary = rng.pick([20000, 30000, 40000])
        const c = rng.pick([3, 4, 5])
        const sales = rng.pick([100000, 200000, 300000])
        return num(level, `A salesperson earns a salary of ${fmt(salary)} shillings plus ${c}% commission on all sales. In March, sales were ${fmt(sales)} shillings. What was the total pay?`, salary + (sales * c) / 100)
      }
    }
  }
  switch (level) {
    case 1: {
      const [b, s] = [rng.int(20, 90) * 50, rng.int(20, 90) * 50]
      return pick(level, `Bought at ${fmt(b)}, sold at ${fmt(s)}. Profit or loss?`, b === s ? 'neither' : s > b ? `profit of ${fmt(s - b)}` : `loss of ${fmt(b - s)}`, [`profit of ${fmt(Math.abs(s - b) + 50)}`, `loss of ${fmt(Math.abs(s - b) + 100)}`, s > b ? `loss of ${fmt(s - b)}` : `profit of ${fmt(b - s)}`])
    }
    case 2: {
      const b = rng.pick([200, 400, 500, 800, 1000, 2000])
      const p = rng.pick([10, 20, 25, 30, 40])
      return num(level, `A trader bought a radio for ${fmt(b)} shillings and sold it at ${an(p)}% profit. What was the selling price?`, b + (b * p) / 100)
    }
    case 3: {
      const b = rng.pick([400, 500, 800, 1200, 1600])
      const pr = (b * rng.pick([10, 20, 25, 50])) / 100
      return num(level, `An item bought for ${fmt(b)} was sold for ${fmt(b + pr)}. What was the percentage profit?`, (pr / b) * 100)
    }
    case 4: {
      const marked = rng.pick([1200, 2400, 3600, 4800])
      const d = rng.pick([5, 10, 15, 20, 25])
      return num(level, `Shoes are marked at ${fmt(marked)} shillings. ${An(d)}% discount is given. What does the buyer pay?`, marked - (marked * d) / 100)
    }
    default: {
      const cost = rng.pick([30, 40, 50])
      const n = rng.pick([100, 120, 150, 200])
      const spoil = rng.int(5, 20)
      const sell = cost + rng.pick([15, 20, 25])
      const profit = (n - spoil) * sell - n * cost
      return num(level, `A farmer bought ${n} seedlings at ${cost} shillings each. ${spoil} dried up and the rest were sold at ${sell} shillings each. What was the profit?`, Math.max(0, profit), { explain: `${n - spoil} × ${sell} − ${n} × ${cost} = ${profit}` })
    }
  }
}

// ── Geometry ────────────────────────────────────────────────────────────────

const POLY: [string, number][] = [
  ['pentagon', 5],
  ['hexagon', 6],
  ['heptagon', 7],
  ['octagon', 8],
  ['nonagon', 9],
  ['decagon', 10],
  ['dodecagon', 12],
]

export const anglesJ = (g: J): Generator => (rng, level) => {
  if (g === 8) {
    switch (level) {
      case 1: {
        const a = rng.int(25, 155)
        const kind = rng.pick([['corresponding', a], ['alternate', a], ['co-interior', 180 - a]] as const)
        return num(level, `Two parallel lines are cut by a transversal. One angle is ${a}°. What is the ${kind[0]} angle to it?`, kind[1], { explain: kind[0] === 'co-interior' ? 'Co-interior angles add up to 180°.' : `${kind[0][0].toUpperCase()}${kind[0].slice(1)} angles are equal.` })
      }
      case 2: {
        if (rng.next() < 0.5) {
          const x = rng.int(10, 80)
          const [from, to, b] = rng.pick<[string, string, number]>([['N', 'E', x], ['S', 'E', 180 - x], ['S', 'W', 180 + x], ['N', 'W', 360 - x]])
          const three = (n: number) => `${String(((n % 360) + 360) % 360).padStart(3, '0')}°`
          return pick(level, `Write the compass bearing ${from} ${x}° ${to} as a three-figure bearing.`, three(b), [three(x), three(b + 90), three(360 - b)], 'Three-figure bearings are measured clockwise from north.')
        }
        const [dir, b] = rng.pick<[string, number]>([['N', 0], ['NE', 45], ['E', 90], ['SE', 135], ['S', 180], ['SW', 225], ['W', 270], ['NW', 315]])
        return pick(level, `What is the compass direction ${dir} as a three-figure bearing?`, `${String(b).padStart(3, '0')}°`, [`${String((b + 90) % 360).padStart(3, '0')}°`, `${String((b + 180) % 360).padStart(3, '0')}°`, `${String((b + 45) % 360).padStart(3, '0')}°`])
      }
      case 3: {
        const b = rng.int(10, 350)
        return pick(level, `The bearing of B from A is ${String(b).padStart(3, '0')}°. What is the bearing of A from B?`, `${String((b + 180) % 360).padStart(3, '0')}°`, [`${String((360 - b) % 360).padStart(3, '0')}°`, `${String(Math.abs(b - 90)).padStart(3, '0')}°`, `${String(b).padStart(3, '0')}°`], 'Add or subtract 180°.')
      }
      case 4: {
        const scale = rng.pick([100000, 200000, 500000, 1000000])
        const cm = rng.int(2, 12)
        return num(level, `A map has a scale of 1 : ${fmt(scale)}. Two towns are ${cm} cm apart on the map. How far apart are they in kilometres?`, (cm * scale) / 100000, { explain: `${cm} × ${fmt(scale)} cm = ${(cm * scale) / 100000} km` })
      }
      default: {
        const km = rng.pick([5, 10, 20, 25, 50])
        const cm = rng.pick([2, 4, 5, 10])
        return pick(level, `On a scale drawing, ${cm} cm represents ${km} km. What is the scale as a ratio?`, `1 : ${fmt((km * 100000) / cm)}`, [`1 : ${fmt((km * 1000) / cm)}`, `1 : ${fmt(km * 100000)}`, `${cm} : ${km}`])
      }
    }
  }
  switch (level) {
    case 1: {
      const a = rng.int(20, 160)
      return rng.next() < 0.5 ? num(level, `Two angles on a straight line: one is ${a}°. Find the other.`, 180 - a) : num(level, `Two straight lines cross. One angle is ${a}°. What is the vertically opposite angle?`, a, { explain: 'Vertically opposite angles are equal.' })
    }
    case 2: {
      const a = rng.int(25, 90)
      const b = rng.int(20, 150 - a)
      return num(level, `A triangle has angles ${a}° and ${b}°. Find the third angle.`, 180 - a - b)
    }
    case 3: {
      const k = rng.int(5, 20)
      const n = POLY.find(([, x]) => x === k)?.[0] ?? `polygon with ${k} sides`
      return num(level, `Find the sum of the interior angles of ${an(n)}.`, (k - 2) * 180, { explain: `(${k} − 2) × 180° = ${(k - 2) * 180}°` })
    }
    case 4: {
      const k = rng.pick([5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36])
      const n = POLY.find(([, x]) => x === k)?.[0] ?? `polygon with ${k} sides`
      return rng.next() < 0.5 ? num(level, `Find each exterior angle of a regular ${n}.`, 360 / k) : num(level, `Find each interior angle of a regular ${n}.`, 180 - 360 / k)
    }
    default: {
      const ext = rng.pick([10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120])
      return num(level, `Each exterior angle of a regular polygon is ${ext}°. How many sides does it have?`, 360 / ext, { explain: `360 ÷ ${ext} = ${360 / ext}` })
    }
  }
}

export const coordsJ = (g: J): Generator => (rng, level) => {
  const x = rng.int(-6, 6)
  const y = rng.int(-6, 6)
  if (g === 8) {
    switch (level) {
      case 1: {
        const xx = x || 3
        const yy = y || -2
        const q = xx > 0 ? (yy > 0 ? 'first' : 'fourth') : yy > 0 ? 'second' : 'third'
        return pick(level, `In which quadrant is the point (${sg(xx)}, ${sg(yy)})?`, q, ['first', 'second', 'third', 'fourth'].filter((z) => z !== q))
      }
      case 2: {
        const [m, c] = [rng.int(1, 4), rng.int(-5, 5)]
        const xx = rng.int(-3, 5)
        return pick(level, `For the line y = ${m === 1 ? '' : m}x${c < 0 ? ` − ${-c}` : c > 0 ? ` + ${c}` : ''}, find y when x = ${sg(xx)}.`, sg(m * xx + c), nearInts(m * xx + c))
      }
      case 3: {
        const [m, c] = [rng.int(1, 3), rng.int(-4, 4)]
        const good = rng.int(-3, 4)
        const line = `y = ${m === 1 ? '' : m}x${c < 0 ? ` − ${-c}` : c > 0 ? ` + ${c}` : ''}`
        const pt = (a: number, b: number) => `(${sg(a)}, ${sg(b)})`
        return pick(level, `Which point lies on the line ${line}?`, pt(good, m * good + c), [pt(good, m * good + c + 1), pt(good + 1, m * good + c), pt(-good || 2, m * good + c - 2)])
      }
      case 4: {
        const [a, b, c, d] = [rng.int(-6, 6), rng.int(-6, 6), rng.int(-6, 6), rng.int(-6, 6)]
        const mx = a + c
        const my = b + d
        const half = (n: number) => (n % 2 === 0 ? sg(n / 2) : sg(n / 2).replace('.5', '½'))
        return pick(level, `Find the midpoint of (${sg(a)}, ${sg(b)}) and (${sg(c)}, ${sg(d)}).`, `(${half(mx)}, ${half(my)})`, [`(${half(mx + 2)}, ${half(my)})`, `(${half(c - a)}, ${half(d - b)})`, `(${sg(mx)}, ${sg(my)})`])
      }
      default: {
        const k = rng.int(2, 3)
        const xx = rng.int(1, 5)
        const yy = rng.int(1, 5)
        return pick(level, `Triangle ABC has a vertex at (${xx}, ${yy}). It is enlarged by scale factor ${k} with the origin as centre. Where does that vertex move to?`, `(${xx * k}, ${yy * k})`, [`(${xx + k}, ${yy + k})`, `(${xx * k}, ${yy})`, `(${xx}, ${yy * k})`])
      }
    }
  }
  switch (level) {
    case 1: {
      const [x1, y1] = [rng.int(-5, 5), rng.int(-5, 5)]
      const m = rng.int(-3, 4) || 2
      const dx = rng.int(1, 4)
      return pick(level, `Find the gradient of the line through (${sg(x1)}, ${sg(y1)}) and (${sg(x1 + dx)}, ${sg(y1 + m * dx)}).`, sg(m), nearInts(m), 'Gradient = change in y ÷ change in x.')
    }
    case 2: {
      const [m, c] = [rng.int(-4, 5) || 3, rng.int(-6, 6)]
      return pick(level, `What is the gradient and y-intercept of y = ${m === 1 ? '' : m === -1 ? '−' : sg(m)}x${c < 0 ? ` − ${-c}` : ` + ${c}`}?`, `gradient ${sg(m)}, y-intercept ${sg(c)}`, [`gradient ${sg(c)}, y-intercept ${sg(m)}`, `gradient ${sg(-m)}, y-intercept ${sg(c)}`, `gradient ${sg(m)}, y-intercept ${sg(-c)}`])
    }
    case 3: {
      const [m, c] = [rng.int(1, 4), rng.int(-5, 5)]
      const x1 = rng.int(-3, 3)
      const eq = (mm: number, cc: number) => `y = ${mm === 1 ? '' : mm}x${cc < 0 ? ` − ${-cc}` : cc > 0 ? ` + ${cc}` : ''}`
      return pick(level, `Find the equation of the line with gradient ${m} passing through (${sg(x1)}, ${sg(m * x1 + c)}).`, eq(m, c), [eq(m, c + 1), eq(m, -c || 2), eq(m + 1, c)])
    }
    case 4: {
      const m = rng.int(-3, 4) || 2
      const c1 = rng.int(1, 9)
      const c2 = rng.pick([-7, -5, -3, -2, 4, 6, 8].filter((c) => c !== c1))
      const line = (mm: number, cc: number) => `y = ${expr([[mm, 'x'], [cc, '']])}`
      return pick(level, `Which line is parallel to ${line(m, c1)}?`, line(m, c2), [line(-m, c1), line(m + 1, c1), line(m === 2 ? 3 : 2, c2)], 'Parallel lines have the same gradient.')
    }
    default: {
      const [x1, y1, x2] = [rng.int(-4, 2), rng.int(-4, 4), rng.int(3, 7)]
      const m = rng.int(1, 3)
      const y2 = y1 + m * (x2 - x1)
      const c = y1 - m * x1
      return pick(level, `Find the equation of the line through (${sg(x1)}, ${sg(y1)}) and (${x2}, ${sg(y2)}).`, `y = ${m === 1 ? '' : m}x${c < 0 ? ` − ${-c}` : c > 0 ? ` + ${c}` : ''}`, [`y = ${m + 1}x${c < 0 ? ` − ${-c}` : ` + ${c}`}`, `y = ${m === 1 ? '' : m}x + ${Math.abs(c) + 2}`, `y = ${sg(-m)}x${c < 0 ? ` − ${-c}` : ` + ${c}`}`])
    }
  }
}

export const similarityJ = (): Generator => (rng, level) => {
  const k = rng.int(2, 5)
  const s = rng.int(3, 12)
  switch (level) {
    case 1:
      return num(level, `Two similar triangles: a side of ${s} cm in the small one matches ${s * k} cm in the big one. What is the scale factor?`, k)
    case 2: {
      const t = rng.int(3, 12)
      return num(level, `Two similar rectangles have widths ${s} cm and ${s * k} cm. The small one is ${t} cm long. How long is the big one? (cm)`, t * k)
    }
    case 3:
      return num(level, `A shape is enlarged by scale factor ${k}. Its area was ${s} cm². What is the new area? (cm²)`, s * k * k, { explain: `Area scale factor = ${k}² = ${k * k}` })
    case 4: {
      const h = rng.int(2, 6)
      const sh = rng.int(1, 3)
      const tree = rng.int(3, 8)
      return num(level, `${An(h)} m pole casts ${an(sh)} m shadow. At the same time a tree casts ${an(sh * tree)} m shadow. How tall is the tree? (m)`, h * tree, { explain: `Similar triangles: ${h} × ${tree} = ${h * tree} m` })
    }
    default: {
      const v = rng.int(2, 9)
      return num(level, `Two similar cylinders have heights in the ratio 1 : ${k}. The small one holds ${v} litres. How many litres does the large one hold?`, v * k ** 3, { explain: `Volume scale factor = ${k}³ = ${k ** 3}` })
    }
  }
}

export const trigJ = (): Generator => (rng, level) => {
  const [a, b, c] = rng.pick(TRIPLES.slice(0, 5))
  switch (level) {
    case 1: {
      const form = rng.int(1, 3)
      if (form === 3) {
        const [p, q, h] = rng.pick(TRIPLES)
        return pick(level, `A right-angled triangle has sides ${p} cm, ${q} cm and ${h} cm. Which side is the hypotenuse?`, `${h} cm`, [`${p} cm`, `${q} cm`, `${p + q} cm`], 'The hypotenuse is the longest side, opposite the right angle.')
      }
      const ratio = rng.pick(['sin', 'cos', 'tan'] as const)
      const right = ratio === 'sin' ? 'opposite ÷ hypotenuse' : ratio === 'cos' ? 'adjacent ÷ hypotenuse' : 'opposite ÷ adjacent'
      if (form === 2) return pick(level, `Which trigonometric ratio equals ${right}?`, `${ratio} θ`, ['sin θ', 'cos θ', 'tan θ'].filter((x) => x !== `${ratio} θ`))
      return pick(level, `In a right-angled triangle, ${ratio} θ = ___`, right, ['opposite ÷ hypotenuse', 'adjacent ÷ hypotenuse', 'opposite ÷ adjacent', 'hypotenuse ÷ opposite'].filter((x) => x !== right))
    }
    case 2: {
      const ratio = rng.pick(['sin', 'cos', 'tan'] as const)
      const ans = ratio === 'sin' ? `${a}/${c}` : ratio === 'cos' ? `${b}/${c}` : `${a}/${b}`
      return pick(level, `A right-angled triangle has sides ${a} (opposite θ), ${b} (adjacent to θ) and ${c} (hypotenuse). Find ${ratio} θ.`, ans, [`${a}/${c}`, `${b}/${c}`, `${a}/${b}`, `${b}/${a}`, `${c}/${a}`].filter((x) => x !== ans))
    }
    case 3: {
      const [q, ans] = rng.pick<[string, string]>([['sin 30°', '0.5'], ['cos 60°', '0.5'], ['tan 45°', '1'], ['sin 90°', '1'], ['cos 0°', '1'], ['sin 0°', '0'], ['cos 90°', '0'], ['2 sin 30°', '1'], ['sin 30° + cos 60°', '1'], ['tan 45° + sin 30°', '1.5'], ['4 cos 60°', '2'], ['sin 90° − cos 60°', '0.5'], ['2 tan 45°', '2']])
      if (rng.next() < 0.5) {
        const k = rng.int(2, 12)
        const [f, v] = rng.pick([['sin 30°', 0.5], ['cos 60°', 0.5], ['tan 45°', 1], ['sin 90°', 1]] as const)
        const ans2 = String(k * v)
        return pick(level, `What is the value of ${k} ${f}?`, ans2, [String(k), String(k * 2), String(k + v), String(k / 4)].filter((x) => x !== ans2), `${f} = ${v}, so ${k} × ${v} = ${ans2}.`)
      }
      return pick(level, `What is the value of ${q}?`, ans, ['0', '0.5', '1', '1.5', '2'].filter((x) => x !== ans))
    }
    case 4: {
      const L = 2 * rng.int(2, 25)
      return num(level, `A ladder ${L} m long makes an angle of 30° with the ground. How high up the wall does it reach? (sin 30° = 0.5) (m)`, L / 2, { explain: `height = ${L} × sin 30° = ${L / 2} m` })
    }
    default: {
      const d = rng.int(10, 80)
      return num(level, `From a point ${d} m from the foot of a tower, the angle of elevation of the top is 45°. How tall is the tower? (tan 45° = 1) (m)`, d, { explain: `height = ${d} × tan 45° = ${d} m` })
    }
  }
}

// ── Data and probability ────────────────────────────────────────────────────

const LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

export const dataJ = (g: J): Generator => (rng, level) => {
  const vals = Array.from({ length: 5 }, () => rng.int(3, 20) * (g === 7 ? 5 : 2))
  const fix = vals.reduce((x, y) => x + y, 0) % 5
  vals[0] += (5 - fix) % 5
  const sorted = [...vals].sort((x, y) => x - y)
  const mean = vals.reduce((x, y) => x + y, 0) / 5
  switch (level) {
    case 1:
      return num(level, `Find the mean of ${vals.join(', ')}.`, mean, { explain: `Total ${vals.reduce((x, y) => x + y, 0)} ÷ 5 = ${mean}` })
    case 2:
      return num(level, `Find the range of ${vals.join(', ')}.`, sorted[4] - sorted[0])
    case 3:
      return g === 7
        ? num(level, 'How many learners came on the busiest day?', Math.max(...vals), { visual: { kind: 'bars', labels: LABELS, values: vals, title: 'Learners at the library', unit: 'learners' } })
        : num(level, `Find the median of ${vals.join(', ')}.`, sorted[2], { explain: `In order: ${sorted.join(', ')}; the middle value is ${sorted[2]}.` })
    case 4: {
      const scores = [rng.int(1, 3), rng.int(4, 5), rng.int(6, 7), rng.int(8, 9)]
      const freq = scores.map(() => rng.int(2, 9))
      const modeIdx = freq.indexOf(Math.max(...freq))
      if (freq.filter((f) => f === freq[modeIdx]).length > 1) freq[modeIdx] += 1
      const total = freq.reduce((x, y) => x + y, 0)
      return g === 9
        ? num(level, 'The table shows marks and how many learners got each. How many learners are there altogether?', total, { visual: { kind: 'table', rows: [['Mark', ...scores.map(String)], ['Learners', ...freq.map(String)]] } })
        : num(level, 'The table shows marks and how many learners got each. What is the mode?', scores[modeIdx], { visual: { kind: 'table', rows: [['Mark', ...scores.map(String)], ['Learners', ...freq.map(String)]] } })
    }
    default: {
      const marks = [2, 4, 6, 8, 10]
      const f = marks.map(() => rng.int(1, 6))
      const total = f.reduce((x, y) => x + y, 0)
      const sum = marks.reduce((s, m, i) => s + m * f[i], 0)
      const mean = sum / total
      return Number.isInteger(mean)
        ? num(level, 'Find the mean mark from the frequency table.', mean, { visual: { kind: 'table', rows: [['Mark', ...marks.map(String)], ['Frequency', ...f.map(String)]] }, explain: `Σfx = ${sum}; Σf = ${total}; mean = ${mean}` })
        : num(level, 'From the frequency table, what is Σfx (the sum of mark × frequency)?', sum, { visual: { kind: 'table', rows: [['Mark', ...marks.map(String)], ['Frequency', ...f.map(String)]] }, explain: `Multiply each mark by its frequency and add: ${sum}` })
    }
  }
}

export const probJ = (g: J): Generator => (rng, level) => {
  switch (level) {
    case 1: {
      if (rng.next() < 0.5) {
        const k = rng.int(1, 5)
        const more = rng.next() < 0.5
        const ways = more ? 6 - k : k - 1
        const what = more ? `a number greater than ${k}` : `a number less than ${k}`
        return pick(level, `A fair die is rolled. What is the probability of getting ${what}?`, frac(ways, 6, false), [frac(ways + 1, 6, false), frac(6 - ways, 6, false), frac(1, 6, false), frac(ways, 12, false)].filter((x) => x !== frac(ways, 6, false)), 'Probability = favourable outcomes ÷ all possible outcomes.')
      }
      const total = rng.pick([10, 12, 20, 25, 30, 40, 50])
      const win = rng.int(1, total - 1)
      return pick(level, `A box has ${total} raffle tickets and ${countOf(win, 'ticket')} ${win === 1 ? 'wins' : 'win'} a prize. One ticket is picked at random. What is the probability that it wins?`, frac(win, total, false), [frac(total - win, total, false), frac(1, win + 1, false), frac(win, total + win, false)], 'Probability = favourable outcomes ÷ all possible outcomes.')
    }
    default:
      break
  }
  const red = rng.int(2, 9)
  const blue = rng.int(2, 9)
  const green = rng.int(1, 6)
  const t = red + blue + green
  switch (level) {
    case 2:
      return pick(level, `A bag has ${red} red, ${blue} blue and ${green} green balls. One is picked at random. What is the probability it is blue?`, frac(blue, t, false), [frac(blue, t + 1, false), frac(red, t, false), frac(blue, red + green, false)])
    case 3:
      return pick(level, `A bag has ${red} red, ${blue} blue and ${green} green balls. What is the probability that a ball picked is NOT red?`, frac(blue + green, t, false), [frac(red, t, false), frac(blue + green, red, false), frac(green, t, false)], 'P(not A) = 1 − P(A).')
    case 4: {
      if (g === 9 && rng.next() < 0.5) {
        // Two coins or a coin and a die: "at least one" and "both" events.
        const coins = rng.next() < 0.5
        if (coins) {
          const [what, ans] = rng.pick([['two heads', '1/4'], ['two tails', '1/4'], ['at least one head', '3/4'], ['one head and one tail', '1/2'], ['no heads', '1/4']] as const)
          return pick(level, `Two fair coins are tossed. What is the probability of ${what}?`, ans, ['1/4', '1/2', '3/4', '1/3'].filter((x) => x !== ans), 'The outcomes are HH, HT, TH and TT.')
        }
        const k = rng.int(1, 6)
        return pick(level, `A coin is tossed and a die is rolled. What is the probability of a tail and a ${k}?`, '1/12', ['1/6', '1/2', '1/8', '2/12'].filter((x) => x !== '1/12'), `12 equally likely outcomes; only one is a tail with a ${k}.`)
      }
      if (g === 9) {
        const sum = rng.int(2, 12)
        const ways = 6 - Math.abs(sum - 7)
        return pick(level, `Two fair dice are rolled and their scores added. What is the probability of a total of ${sum}?`, frac(ways, 36, false), [frac(ways + 1, 36, false), frac(1, sum, false), frac(ways, 12, false), frac(sum, 36, false)], `There are 36 equally likely outcomes; ${ways} of them give ${sum}.`)
      }
      if (rng.next() < 0.5) {
        const n = rng.int(3, 10)
        return num(level, `A coin is tossed and a spinner with ${n} equal sections is spun. How many possible outcomes are there?`, 2 * n, { explain: `2 × ${n} = ${2 * n}` })
      }
      const k = rng.int(1, 5)
      return pick(level, `A coin is tossed and a die is rolled. What is the probability of a head and a number less than or equal to ${k}?`, frac(k, 12, false), [frac(k, 6, false), frac(1, 2, false), frac(k + 1, 12, false), frac(k, 8, false)], `12 outcomes; ${k} of them are a head with 1–${k}.`)
    }
    default: {
      const p = rng.pick([[1, 5], [1, 4], [2, 5], [3, 10], [1, 10]] as const)
      const n = rng.pick([100, 200, 300, 400, 500].filter((x) => (x * p[0]) % p[1] === 0))
      return pick(level, `The probability that a seed germinates is ${p[0]}/${p[1]}. If ${n} seeds are planted, how many are expected to germinate?`, String((n * p[0]) / p[1]), [String((n * p[1]) / 10), String(n - (n * p[0]) / p[1]), String((n * p[0]) / p[1] + 10)])
    }
  }
}

export function jssMathGenerators(): Record<string, Generator> {
  const out: Record<string, Generator> = {
    'j7m-whole': wholeJ(),
    'j7m-factors': factorsJ(),
    'j7m-dec': decJ(),
    'j7m-pythag': pythagJ(),
    'j7m-time': timeJ(),
    'j8m-circles': circlesJ(),
    'j9m-indices': indicesJ(),
    'j9m-density': densityJ(),
    'j9m-speed': speedJ(),
    'j9m-similarity': similarityJ(),
    'j9m-trig': trigJ(),
  }
  for (const g of [7, 8, 9] as J[]) {
    out[`j${g}m-expr`] = exprJ(g)
    out[`j${g}m-equations`] = equationsJ(g)
    out[`j${g}m-measure`] = measureJ(g)
    out[`j${g}m-money`] = moneyJ(g)
    out[`j${g}m-data`] = dataJ(g)
  }
  for (const g of [7, 8] as J[]) {
    out[`j${g}m-frac`] = fracJ(g)
    out[`j${g}m-squares`] = squaresJ(g)
    out[`j${g}m-angles`] = anglesJ(g)
  }
  for (const g of [8, 9] as J[]) {
    out[`j${g}m-integers`] = integersJ(g)
    out[`j${g}m-ratio`] = ratioJ(g)
    out[`j${g}m-coords`] = coordsJ(g)
    out[`j${g}m-prob`] = probJ(g)
  }
  return out
}
