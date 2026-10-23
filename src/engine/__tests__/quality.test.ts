// Strict quality checks on generated questions from every grade: answers must be valid,
// options distinct, text unbroken, and English free of the slips children copy
// ("a egg", "1 trays"). It also stops the right answer from giving itself away by
// being far longer than every wrong one.
import { describe, expect, it } from 'vitest'
import { GRADES } from '../../curriculum'
import { BANKS_FOR_AUDIT, buildQuiz } from '../quiz'
import type { Level, Question } from '../types'

const BROKEN = /undefined|NaN|\bnull\b|\[object|Infinity|\$\{/
const AMERICAN = /\b(color|colors|favorite|center|centers|meter|meters|liter|liters|gray|neighbor|neighbors|behavior|honor|labor|flavor|organize|organized|realize|recognize|apologize|analyze|traveling|traveled|jewelry|catalog|plow|aluminum|kilometer|kilometers|centimeter|centimeters|millimeter|millimeters)\b/i
const A_OK = /^(one|once|uni|use|usu|uti|ure|uro|eu|ewe|ufo)/i
const AN_OK = /^(hour|honest|honour|heir)/i
// Sounds, songs and names that are rightly said twice.
const TWICE = /^(very|had|that|ha|no|knock|tick|drip|buzz|ding|boom|clap|tap|ring|choo|plop|splash|hop|tweet|moo|baa|quack|cluck|oink|woof|meow|hiss|chirp|toot|beep|pole|haba|tone|bandu|mau|boda|ngri|haraka|polepole)$/i

function texts(q: Question): string[] {
  const t = [q.prompt]
  if (q.explain) t.push(q.explain)
  if (q.type === 'choice') for (const o of q.options) if (o.label) t.push(o.label)
  return t
}

// Animals whose names begin ki-/vi- still take the A-WA agreement of living things:
// "vifaranga wawili", "kifaru mkubwa", never "vifaranga viwili" or "vifaranga vya samaki".
const KIVI_ANIMATE = /\b(kifaranga|vifaranga|kifaru|vifaru|kipepeo|vipepeo|kiboko|viboko|kiwavi|viwavi|kinyonga|vinyonga|kiluwiluwi|viluwiluwi|kilebu|vilebu|kinyau|vinyau)\s+(cha|vya|ki\w+|vi\w+)\b/i
/** The Kiswahili slips a teacher would mark wrong, checked in stories, questions and right answers. */
function kiswahiliProblems(q: Question): string[] {
  const out: string[] = []
  const v = q.visual as { kind?: string; text?: string } | undefined
  const right = q.type === 'choice' ? (q.options.find((o) => o.id === q.answer)?.label ?? '') : ''
  for (const t of [q.prompt, v?.kind === 'passage' ? (v.text ?? '') : '', right]) {
    const m = KIVI_ANIMATE.exec(t)
    if (m && !/^(kiasi|kila|kidogo|vile|vilevile|kimya)$/i.test(m[2])) out.push(`animal noun with KI-VI agreement: ${m[0]}`)
    // A diminutive is not school Kiswahili for the young of people or animals.
    if (/\b(kitoto|vitoto)\b/i.test(t)) out.push(`diminutive in place of mtoto/watoto: ${t.slice(0, 80)}`)
  }
  // "Ana rangi gani?" is answered in agreement with rangi: nyekundu, nyeupe, nyeusi.
  if (/rangi gani\?/.test(q.prompt) && /^mw?(ekundu|eupe|eusi)$/.test(right)) out.push(`colour does not agree with "rangi": ${right}`)
  return out
}

/** Every problem in one question, as short messages. */
function problems(q: Question, english: boolean): string[] {
  const out: string[] = []
  if (!q.prompt.trim()) out.push('empty prompt')
  for (const t of texts(q)) {
    if (BROKEN.test(t)) out.push(`broken text: ${t}`)
    if (english) {
      for (const m of t.matchAll(/(^|[^A-Za-z])([Aa]) ([a-z][\w-]+)/g)) {
        const mid = m[2] === 'A' && m.index! > 0 && !/[.!?"]\s*$/.test(t.slice(0, m.index! + m[1].length))
        if (/^[aeiou]/.test(m[3]) && !A_OK.test(m[3]) && !mid && !/^(are|and)$/.test(m[3])) out.push(`"a" before a vowel: ${m[0].trim()}`)
      }
      for (const m of t.matchAll(/\b([Aa]n) ([a-z][\w-]*)/g)) if (!/^[aeiou]/.test(m[2]) && !AN_OK.test(m[2])) out.push(`"an" before a consonant: ${m[0]}`)
      const one = /\b(?:has|and|for|sold|bought|buy|with|gave|ate|had|of|,) 1 (?!out\b|of\b|is\b|was\b|has\b|does\b)([a-z]+s)\b/.exec(t)
      if (one) out.push(`plural after 1: ${one[0]}`)
      const twice = /\b(\w{2,}) \1\b/i.exec(t)
      if (twice && !TWICE.test(twice[1])) out.push(`word repeated: ${twice[0]}`)
      if (AMERICAN.test(t)) out.push(`American spelling: ${AMERICAN.exec(t)![0]}`)
    }
  }
  if (q.type === 'choice') {
    const ids = q.options.map((o) => o.id)
    if (new Set(ids).size !== ids.length) out.push('duplicate option ids')
    const labels = q.options.filter((o) => o.label).map((o) => o.label!.trim())
    if (new Set(labels).size !== labels.length) out.push(`duplicate options: ${labels.join(' | ')}`)
    if (!ids.includes(q.answer)) out.push(`answer not among options: ${q.answer}`)
    if (q.options.length < 2) out.push('fewer than two options')
    const right = q.options.find((o) => o.id === q.answer)
    const others = q.options.filter((o) => o !== right && o.label).map((o) => o.label!.length)
    if (right?.label && others.length && right.label.length > 36 && right.label.length >= 2 * Math.max(...others)) out.push(`right answer gives itself away by length: ${right.label}`)
  }
  if (q.type === 'number' && (!Number.isInteger(q.answer) || q.answer < 0)) out.push(`bad number answer: ${q.answer}`)
  if (q.type === 'order' && (!q.answer.length || q.answer.some((a) => !q.tiles.includes(a)))) out.push('order answer not made from its tiles')
  return out
}

describe('question quality', () => {
  for (const g of GRADES)
    it(`${g.label}: every sampled question passes the strict checks`, () => {
      const found = new Set<string>()
      for (const a of g.areas) {
        const english = a.kind !== 'kiswahili'
        for (const s of a.strands)
          for (const sub of s.subStrands)
            for (const level of [1, 2, 3, 4, 5] as Level[])
              for (let seed = 1; seed <= 8; seed++)
                for (const q of buildQuiz(sub.id, level, seed * 104729)) for (const p of [...problems(q, english), ...(english ? [] : kiswahiliProblems(q))]) found.add(`${sub.id} L${q.level}: ${p}`)
      }
      expect([...found].slice(0, 25)).toEqual([])
    })
})

describe('Kiswahili agreement', () => {
  it('catches the slips it is meant to catch', () => {
    const story = (text: string): Question => ({ id: 't', type: 'choice', level: 1, prompt: 'Swali?', visual: { kind: 'passage', title: 'T', text }, options: [{ id: 'a', label: 'a' }], answer: 'a' })
    expect(kiswahiliProblems(story('Jioni, Pamba alirudi akiwa na vitoto vitatu.'))).not.toEqual([])
    expect(kiswahiliProblems(story('Aliweka vifaranga vya samaki bwawani.'))).not.toEqual([])
    expect(kiswahiliProblems(story('Kuku huyo ana vifaranga sita. Pamba alirudi na watoto watatu.'))).toEqual([])
  })

  it('every written Kiswahili question and story agrees', () => {
    const subs = GRADES.flatMap((g) => g.areas.filter((a) => a.kind === 'kiswahili').flatMap((a) => a.strands.flatMap((s) => s.subStrands.map((x) => x.id))))
    const found: string[] = []
    for (const id of subs) for (const b of BANKS_FOR_AUDIT[id] ?? []) for (const p of kiswahiliProblems({ ...b, id: 'bank' } as Question)) found.push(`${id}: ${p}`)
    expect([...new Set(found)].slice(0, 25)).toEqual([])
  })
})

