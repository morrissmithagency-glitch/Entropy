import type { ArtId } from '../components/art/objects'
import type { ChoiceQuestion, Level, Option, Rng, Visual } from './types'

let counter = 0
export const uid = (prefix: string) => `${prefix}-${(counter++).toString(36)}`

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

export function numberWord(n: number): string {
  if (n < 20) return ONES[n]
  if (n === 100) return 'one hundred'
  const t = TENS[Math.floor(n / 10)]
  return n % 10 === 0 ? t : `${t}-${ONES[n % 10]}`
}

/**
 * Plausible wrong answers for a number: off-by-one, off-by-ten and swapped digits are the
 * mistakes Grade 1 learners actually make, so they make better distractors than random numbers.
 */
export function numberOptions(rng: Rng, answer: number, count = 3, min = 0, max = 100): Option[] {
  const pool = new Set<number>()
  const candidates = [answer + 1, answer - 1, answer + 10, answer - 10, answer + 2, answer - 2]
  if (answer >= 10 && answer % 10 !== 0) candidates.push((answer % 10) * 10 + Math.floor(answer / 10))
  for (const c of rng.shuffle(candidates)) if (c !== answer && c >= min && c <= max) pool.add(c)
  while (pool.size < count - 1) {
    const c = rng.int(Math.max(min, answer - 5), Math.min(max, answer + 5))
    if (c !== answer) pool.add(c)
  }
  const picks = [answer, ...[...pool].slice(0, count - 1)]
  return rng.shuffle(picks).map((n) => ({ id: String(n), label: String(n) }))
}

export function textOptions(rng: Rng, answer: string, wrong: readonly string[], count = 3): Option[] {
  const others = rng.sample([...new Set(wrong)].filter((w) => w !== answer), count - 1)
  return rng.shuffle([answer, ...others]).map((w) => ({ id: w, label: w }))
}

export function artOptions(rng: Rng, answer: ArtId, wrong: readonly ArtId[], count = 3): Option[] {
  const others = rng.sample([...new Set(wrong)].filter((w) => w !== answer), count - 1)
  return rng.shuffle([answer, ...others]).map((a) => ({ id: a, art: a }))
}

export function choice(
  prefix: string,
  level: Level,
  prompt: string,
  options: Option[],
  answer: string,
  extra: { visual?: Visual; explain?: string; say?: string; listen?: boolean } = {},
): ChoiceQuestion {
  return { id: uid(prefix), type: 'choice', level, prompt, options, answer, ...extra }
}

export const plural = (n: number, one: string, many: string) => (n === 1 ? one : many)
/** "a" or "an", by how the word (or number) sounds: an egg, a unit, an hour, an 8, an 18. */
export function article(word: string | number): 'a' | 'an' {
  const w = String(word).trim()
  const digits = /^\d+/.exec(w.replace(/^(\d{1,3}),\d{3}.*/, '$1'))?.[0]
  if (digits) return digits.startsWith('8') || digits === '11' || digits === '18' ? 'an' : 'a'
  if (/^(hour|honest|honour|heir)/i.test(w)) return 'an'
  if (/^(uni|use|usu|uti|ure|uro|eu|ewe|one|once|ufo)/i.test(w)) return 'a'
  return /^[aeiou]/i.test(w) ? 'an' : 'a'
}
/** The word with its article: an("egg") is "an egg". */
export const an = (word: string | number) => `${article(word)} ${word}`
/** The same, capitalised for the start of a sentence. */
export const An = (word: string | number) => `${article(word) === 'an' ? 'An' : 'A'} ${word}`
/** "1 ten", "3 tens": a number with its noun in the right form. */
export const countOf = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`

export const KENYAN_NAMES = ['Amani', 'Wanjiku', 'Otieno', 'Achieng', 'Kiprono', 'Njeri', 'Baraka', 'Zawadi', 'Mutua', 'Akinyi', 'Hassan', 'Chebet', 'Kamau', 'Nekesa', 'Jabali', 'Wambui']
