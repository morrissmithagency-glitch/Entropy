// Upper-primary Kiswahili (Grades 4–6) in KPSEA form: sarufi with four choices, methali,
// msamiati, ufahamu and cloze. Sentences are built from noun-class tables (ngeli), so every
// prefix agrees; irregular words stay in the written lists.
import { uid } from '../helpers'
import type { BankQuestion, ChoiceQuestion, Generator, Level } from '../types'
import { labelOptions as opts } from './english'
import { kanusha } from './kiswahili3-grammar'

type G = 4 | 5 | 6

const q = (level: Level, prompt: string, answer: string, wrong: string[], explain?: string): ChoiceQuestion => ({
  id: uid('uk'),
  type: 'choice',
  level,
  prompt,
  options: [answer, ...[...new Set(wrong)].filter((w) => w !== answer)].slice(0, 4).map((l) => ({ id: l, label: l })),
  answer,
  explain,
})
const cap = (s: string) => s[0].toUpperCase() + s.slice(1)
const forGrade = <T extends unknown[]>(rows: [G, ...T][], g: G): T[] => rows.filter(([min]) => min <= g).map(([, ...rest]) => rest as unknown as T)

// ── Ngeli ───────────────────────────────────────────────────────────────────

type Ngeli = 'A-WA' | 'KI-VI' | 'LI-YA' | 'U-I' | 'I-ZI' | 'U-ZI' | 'U-YA'
interface Forms {
  adj: [string, string] // before a consonant adjective stem
  subj: [string, string]
  poss: [string, string] // -angu
  dem: [string, string] // huyu / hawa
  amba: [string, string]
  ingi: string
  ote: string
  wili: string
  enye: [string, string]
  ingine: [string, string]
}
const NGELI: Record<Ngeli, Forms> = {
  'A-WA': { adj: ['m', 'wa'], subj: ['a', 'wa'], poss: ['wangu', 'wangu'], dem: ['huyu', 'hawa'], amba: ['ambaye', 'ambao'], ingi: 'wengi', ote: 'wote', wili: 'wawili', enye: ['mwenye', 'wenye'], ingine: ['mwingine', 'wengine'] },
  'KI-VI': { adj: ['ki', 'vi'], subj: ['ki', 'vi'], poss: ['changu', 'vyangu'], dem: ['hiki', 'hivi'], amba: ['ambacho', 'ambavyo'], ingi: 'vingi', ote: 'vyote', wili: 'viwili', enye: ['chenye', 'vyenye'], ingine: ['kingine', 'vingine'] },
  'LI-YA': { adj: ['', 'ma'], subj: ['li', 'ya'], poss: ['langu', 'yangu'], dem: ['hili', 'haya'], amba: ['ambalo', 'ambayo'], ingi: 'mengi', ote: 'yote', wili: 'mawili', enye: ['lenye', 'yenye'], ingine: ['jingine', 'mengine'] },
  'U-I': { adj: ['m', 'mi'], subj: ['u', 'i'], poss: ['wangu', 'yangu'], dem: ['huu', 'hii'], amba: ['ambao', 'ambayo'], ingi: 'mingi', ote: 'yote', wili: 'miwili', enye: ['wenye', 'yenye'], ingine: ['mwingine', 'mingine'] },
  'I-ZI': { adj: ['n', 'n'], subj: ['i', 'zi'], poss: ['yangu', 'zangu'], dem: ['hii', 'hizi'], amba: ['ambayo', 'ambazo'], ingi: 'nyingi', ote: 'zote', wili: 'mbili', enye: ['yenye', 'zenye'], ingine: ['nyingine', 'nyingine'] },
  'U-ZI': { adj: ['m', 'n'], subj: ['u', 'zi'], poss: ['wangu', 'zangu'], dem: ['huu', 'hizi'], amba: ['ambao', 'ambazo'], ingi: 'nyingi', ote: 'zote', wili: 'mbili', enye: ['wenye', 'zenye'], ingine: ['mwingine', 'nyingine'] },
  'U-YA': { adj: ['m', 'ma'], subj: ['u', 'ya'], poss: ['wangu', 'yangu'], dem: ['huu', 'haya'], amba: ['ambao', 'ambayo'], ingi: 'mengi', ote: 'yote', wili: 'mawili', enye: ['wenye', 'yenye'], ingine: ['mwingine', 'mengine'] },
}
/** Adjective with a consonant stem: N- class nouns follow the sound rules (nzuri, ndefu, kubwa). */
function adj(cls: Ngeli, stem: string, plural: boolean): string {
  const p = NGELI[cls].adj[plural ? 1 : 0]
  if (p !== 'n') return p + stem
  if (stem.startsWith('r')) return 'nd' + stem.slice(1)
  if (/^[zdgj]/.test(stem)) return 'n' + stem
  if (/^[bv]/.test(stem)) return 'm' + stem
  return stem
}

// [min grade, ngeli, umoja, wingi, verb stem after -me-]
const NOUNS: [G, Ngeli, string, string, string][] = [
  [4, 'A-WA', 'mtoto', 'watoto', 'fika'],
  [4, 'A-WA', 'mwalimu', 'walimu', 'fika'],
  [4, 'A-WA', 'mkulima', 'wakulima', 'rudi'],
  [4, 'A-WA', 'mgeni', 'wageni', 'ondoka'],
  [4, 'KI-VI', 'kiti', 'viti', 'vunjika'],
  [4, 'KI-VI', 'kitabu', 'vitabu', 'potea'],
  [4, 'KI-VI', 'kikombe', 'vikombe', 'vunjika'],
  [4, 'KI-VI', 'chumba', 'vyumba', 'safishwa'],
  [4, 'LI-YA', 'tunda', 'matunda', 'oza'],
  [4, 'LI-YA', 'yai', 'mayai', 'vunjika'],
  [4, 'LI-YA', 'jiwe', 'mawe', 'anguka'],
  [4, 'LI-YA', 'embe', 'maembe', 'iva'],
  [4, 'U-I', 'mti', 'miti', 'anguka'],
  [4, 'U-I', 'mlango', 'milango', 'funguliwa'],
  [4, 'U-I', 'mkate', 'mikate', 'liwa'],
  [4, 'U-I', 'mto', 'mito', 'furika'],
  [4, 'I-ZI', 'nyumba', 'nyumba', 'jengwa'],
  [4, 'I-ZI', 'kalamu', 'kalamu', 'potea'],
  [4, 'I-ZI', 'meza', 'meza', 'vunjika'],
  [4, 'I-ZI', 'ndizi', 'ndizi', 'iva'],
  [5, 'U-ZI', 'ukuta', 'kuta', 'anguka'],
  [5, 'U-ZI', 'ufunguo', 'funguo', 'potea'],
  [5, 'U-ZI', 'wimbo', 'nyimbo', 'imbwa'],
  [5, 'U-ZI', 'ubao', 'mbao', 'vunjika'],
  [6, 'U-YA', 'ugonjwa', 'magonjwa', 'enea'],
  [6, 'U-YA', 'ugomvi', 'magomvi', 'isha'],
  [6, 'U-YA', 'unyoya', 'manyoya', 'anguka'],
]
type Noun = [Ngeli, string, string, string]
const nounsFor = (g: G): Noun[] => forGrade(NOUNS, g)
const classesFor = (g: G): Ngeli[] => [...new Set(nounsFor(g).map(([c]) => c))]
/** Ngeli taught alongside the table above but whose nouns do not take these patterns. */
const EXTRA_NGELI: [G, string, string][] = [
  [5, 'maji', 'YA-YA'],
  [5, 'mafuta', 'YA-YA'],
  [5, 'maziwa', 'YA-YA'],
  [6, 'unga', 'U-U'],
  [6, 'uji', 'U-U'],
  [6, 'sukari', 'I-I'],
  [6, 'chai', 'I-I'],
  [6, 'kucheza', 'KU-KU'],
  [6, 'kusoma', 'KU-KU'],
]

/** "Kitabu changu kikubwa kimepotea." in umoja or wingi. */
function sentence([cls, sg, pl, verb]: Noun, plural: boolean, stem = 'kubwa', pick: { poss?: Ngeli; adj?: Ngeli; subj?: Ngeli } = {}): string {
  const i = plural ? 1 : 0
  const n = plural ? pl : sg
  return cap(`${n} ${NGELI[pick.poss ?? cls].poss[i]} ${adj(pick.adj ?? cls, stem, plural)} ${NGELI[pick.subj ?? cls].subj[i]}me${verb}.`)
}

/** The noun in the right number, but with some agreements left in the other number. */
function halfChanged([cls, sg, pl, verb]: Noun, plural: boolean): string[] {
  const n = plural ? pl : sg
  const i = plural ? 1 : 0
  const out: string[] = []
  for (const p of [0, 1]) for (const a of [0, 1]) for (const s of [0, 1]) if (!(p === i && a === i && s === i)) out.push(cap(`${n} ${NGELI[cls].poss[p]} ${adj(cls, 'kubwa', a === 1)} ${NGELI[cls].subj[s]}me${verb}.`))
  return out
}

export const ngeliU = (g: G): Generator => (rng, level) => {
  const nouns = nounsFor(g)
  const classes = classesFor(g)
  const noun = rng.pick(nouns)
  const [cls, sg, pl, verb] = noun
  const others = rng.shuffle(classes.filter((c) => c !== cls))
  switch (level) {
    case 1: {
      const extra = forGrade(EXTRA_NGELI, g)
      if (extra.length && rng.next() < 0.3) {
        const [w, c] = rng.pick(extra)
        return q(level, `Neno "${w}" liko katika ngeli gani?`, c, ['A-WA', 'KI-VI', 'LI-YA', 'U-I', 'YA-YA', 'U-U', 'I-I', 'KU-KU'].filter((x) => x !== c).slice(0, 3))
      }
      const word = rng.next() < 0.5 ? sg : pl
      return q(level, `Neno "${word}" liko katika ngeli gani?`, cls, others, `${cap(sg)} – ${pl}: ngeli ya ${cls}.`)
    }
    case 2: {
      const plural = rng.next() < 0.5
      const i = plural ? 1 : 0
      const n = plural ? pl : sg
      const right = NGELI[cls].poss[i]
      const wrong = others.map((c) => NGELI[c].poss[i]).filter((w) => w !== right)
      return q(level, `Jaza pengo: ${cap(n)} ___ ${NGELI[cls].subj[i]}me${verb}.`, right, wrong, `${cap(n)} ni ngeli ya ${cls}: ${n} ${right}.`)
    }
    case 3: {
      const plural = rng.next() < 0.5
      const right = sentence(noun, plural)
      const wrong = others.map((c) => sentence(noun, plural, 'kubwa', { subj: c })).filter((w) => w !== right)
      return q(level, 'Chagua sentensi sahihi.', right, wrong, `Kiambishi cha ngeli ya ${cls} ni ${NGELI[cls].subj[plural ? 1 : 0]}-.`)
    }
    case 4: {
      const right = sentence(noun, true)
      const [a, b, c] = others
      const wrong = [sentence(noun, true, 'kubwa', { poss: a ?? cls }), sentence(noun, true, 'kubwa', { subj: b ?? a }), sentence(noun, true, 'kubwa', { adj: c ?? a, poss: c ?? a }), cap(`${pl} ${NGELI[cls].poss[0]} ${adj(cls, 'kubwa', false)} ${NGELI[cls].subj[0]}me${verb}.`)]
      const pool = [...new Set([...wrong, ...rng.shuffle(halfChanged(noun, true))])].filter((w) => w !== right)
      return q(level, `Andika kwa wingi: "${sentence(noun, false)}"`, right, pool)
    }
    default: {
      if (g >= 5 && rng.next() < 0.5) {
        const plural = rng.next() < 0.5
        const i = plural ? 1 : 0
        const n = plural ? pl : sg
        const right = NGELI[cls].amba[i]
        const wrong = others.map((c) => NGELI[c].amba[i]).filter((w) => w !== right)
        return q(level, `Jaza pengo: ${cap(n)} ___ ${NGELI[cls].subj[i]}me${verb} ni ${NGELI[cls].poss[i]}.`, right, wrong, `Amba- huchukua kiambishi cha ngeli ya ${cls}: ${right}.`)
      }
      const right = sentence(noun, false)
      const [a, b] = others
      const wrong = [sentence(noun, false, 'kubwa', { poss: a }), sentence(noun, false, 'kubwa', { subj: b ?? a }), cap(`${sg} ${NGELI[cls].poss[1]} ${adj(cls, 'kubwa', true)} ${NGELI[cls].subj[1]}me${verb}.`)]
      const pool = [...new Set([...wrong, ...rng.shuffle(halfChanged(noun, false))])].filter((w) => w !== right)
      return q(level, `Andika kwa umoja: "${sentence(noun, true)}"`, right, pool)
    }
  }
}

// ── Vivumishi ───────────────────────────────────────────────────────────────

const AINA: [G, string, string, string][] = [
  [4, 'Kikombe _kidogo_ kimevunjika.', 'kidogo', 'kivumishi cha sifa'],
  [4, 'Nina dada _wawili_.', 'wawili', 'kivumishi cha idadi'],
  [4, 'Nyumba _yetu_ ni safi.', 'yetu', 'kivumishi kimilikishi'],
  [4, 'Kiti _hiki_ ni changu.', 'hiki', 'kivumishi kionyeshi'],
  [4, 'Maembe _matamu_ yameiva.', 'matamu', 'kivumishi cha sifa'],
  [4, 'Kalamu _zile_ ni za mwalimu.', 'zile', 'kivumishi kionyeshi'],
  // [min grade, phrase, underlined word, aina]
  [4, 'Mtoto _mrefu_ anacheza.', 'mrefu', 'kivumishi cha sifa'],
  [4, 'Nyumba _nzuri_ imejengwa.', 'nzuri', 'kivumishi cha sifa'],
  [4, 'Ng\'ombe _mweusi_ anakula nyasi.', 'mweusi', 'kivumishi cha sifa'],
  [4, 'Nilinunua kalamu _tatu_.', 'tatu', 'kivumishi cha idadi'],
  [4, 'Wanafunzi _wengi_ walifika mapema.', 'wengi', 'kivumishi cha idadi'],
  [4, 'Viti _vitano_ vimevunjika.', 'vitano', 'kivumishi cha idadi'],
  [4, 'Kitabu _changu_ kimepotea.', 'changu', 'kivumishi kimilikishi'],
  [4, 'Shamba _lao_ ni kubwa.', 'lao', 'kivumishi kimilikishi'],
  [4, 'Mti _huu_ ni mrefu.', 'huu', 'kivumishi kionyeshi'],
  [4, 'Watoto _wale_ wanaimba.', 'wale', 'kivumishi kionyeshi'],
  [5, 'Unataka kitabu _kipi_?', 'kipi', 'kivumishi kiulizi'],
  [5, 'Umenunua machungwa _mangapi_?', 'mangapi', 'kivumishi kiulizi'],
  [5, 'Ni nguo _gani_ uliyonunua?', 'gani', 'kivumishi kiulizi'],
  [6, 'Mwalimu _mwenyewe_ alikuja.', 'mwenyewe', 'kivumishi cha -enyewe'],
  [6, 'Mtoto _mwenye_ bidii atafaulu.', 'mwenye', 'kivumishi cha -enye'],
  [6, 'Wanafunzi _wote_ walipita.', 'wote', 'kivumishi cha -ote'],
]
/** What a noun can "have" for -enye: kitabu chenye picha. */
const ENYE: Record<string, string> = {
  mtoto: 'bidii',
  mwalimu: 'hekima',
  kitabu: 'picha',
  kikombe: 'ufa',
  embe: 'doa',
  mti: 'matunda',
  mlango: 'kufuli',
  nyumba: 'bustani',
  kalamu: 'wino mwekundu',
  ukuta: 'ufa',
  ufunguo: 'kutu',
  chumba: 'madirisha mawili',
}
const AINA_ALL = ['kivumishi cha sifa', 'kivumishi cha idadi', 'kivumishi kimilikishi', 'kivumishi kionyeshi', 'kivumishi kiulizi', 'kivumishi cha -enye', 'kivumishi cha -ote']

export const vivumishiU = (g: G): Generator => (rng, level) => {
  const nouns = nounsFor(g)
  const noun = rng.pick(nouns)
  const [cls, sg, pl, verb] = noun
  const others = rng.shuffle(classesFor(g).filter((c) => c !== cls))
  switch (level) {
    case 1: {
      const stem = rng.pick(['kubwa', 'zuri', 'dogo'])
      const plural = rng.next() < 0.5
      const i = plural ? 1 : 0
      const n = plural ? pl : sg
      const a = adj(cls, stem, plural)
      const v = `${NGELI[cls].subj[i]}me${verb}`
      const extra = rng.pick(['sana', 'leo', 'jana'])
      return q(level, `Kivumishi katika sentensi hii ni kipi?\n${cap(n)} ${a} ${v} ${extra}.`, a, [n, v, extra], 'Kivumishi hueleza zaidi kuhusu nomino.')
    }
    case 2: {
      const stem = rng.pick(['zuri', 'kubwa', 'refu', 'dogo'])
      const plural = rng.next() < 0.5
      const n = plural ? pl : sg
      const right = adj(cls, stem, plural)
      const wrong = others.map((c) => adj(c, stem, plural)).concat(['ma' + stem, 'ki' + stem]).filter((w) => w !== right)
      return q(level, `Jaza pengo kwa umbo sahihi la "-${stem}":\n${cap(n)} ___ ${NGELI[cls].subj[plural ? 1 : 0]}me${verb}.`, right, rng.sample([...new Set(wrong)], 3))
    }
    case 3: {
      const which = rng.pick(['ingi', 'ote', 'wili'] as const)
      const right = NGELI[cls][which]
      const wrong = [...new Set(others.map((c) => NGELI[c][which]))].filter((w) => w !== right)
      return q(level, `Jaza pengo kwa umbo sahihi la "-${which}":\n${cap(pl)} ___ ${NGELI[cls].subj[1]}me${verb}.`, right, rng.sample(wrong, Math.min(3, wrong.length)))
    }
    case 4: {
      const [s, word, aina] = rng.pick(forGrade(AINA, g))
      return q(level, `Neno lililopigiwa mstari ni aina gani ya kivumishi?\n${s}`, aina, rng.sample(AINA_ALL.filter((a) => a !== aina && (g >= 6 || !a.includes('-'))), 3), `"${word}" ni ${aina}.`)
    }
    default: {
      const which = ENYE[sg] && rng.next() < 0.5 ? 'enye' : 'ingine'
      const plural = rng.next() < 0.5
      const i = plural ? 1 : 0
      const right = NGELI[cls][which][i]
      const wrong = [...new Set(others.map((c) => NGELI[c][which][i]))].filter((w) => w !== right)
      const tail = which === 'enye' ? ` ${ENYE[sg]} ${NGELI[cls].subj[i]}me${verb}.` : ` ${NGELI[cls].subj[i]}me${verb} pia.`
      return q(level, `Jaza pengo kwa umbo sahihi la "-${which}":\n${cap(plural ? pl : sg)} ___${tail}`, right, rng.sample(wrong, Math.min(3, wrong.length)))
    }
  }
}

// ── Nyakati na kukanusha ────────────────────────────────────────────────────

const VERBS: [string, string][] = [
  ['soma', 'kitabu'],
  ['cheza', 'mpira'],
  ['lima', 'shamba'],
  ['pika', 'chakula'],
  ['andika', 'barua'],
  ['imba', 'wimbo'],
  ['chora', 'picha'],
  ['nunua', 'mkate'],
  ['safisha', 'darasa'],
  ['beba', 'mzigo'],
  ['jenga', 'nyumba'],
  ['shona', 'nguo'],
]
const PEOPLE: [string, string, string][] = [
  ['Mimi', 'ni', 'si'],
  ['Wewe', 'u', 'hu'],
  ['Yeye', 'a', 'ha'],
  ['Sisi', 'tu', 'hatu'],
  ['Ninyi', 'm', 'ham'],
  ['Wao', 'wa', 'hawa'],
]
const TENSES: [string, string][] = [
  ['na', 'wakati uliopo'],
  ['li', 'wakati uliopita'],
  ['ta', 'wakati ujao'],
  ['me', 'hali timilifu'],
]

export const nyakatiU = (g: G): Generator => (rng, level) => {
  const [stem, obj] = rng.pick(VERBS)
  const person = rng.pick(PEOPLE)
  const [who, pos, neg] = person
  const tensed = (t: string) => `${pos}${t}${stem}`
  switch (level) {
    case 1: {
      const [t, name] = rng.pick(TENSES)
      return q(level, `Kitenzi "${tensed(t)}" kiko katika wakati gani?`, name, TENSES.map(([, n]) => n).filter((n) => n !== name), `Kiambishi -${t}- ni cha ${name}.`)
    }
    case 2: {
      const [from] = rng.pick(TENSES.filter(([t]) => t !== 'ta'))
      return q(level, `Andika katika wakati ujao: "${who} ${tensed(from)} ${obj}."`, `${who} ${tensed('ta')} ${obj}.`, TENSES.filter(([t]) => t !== 'ta').map(([t]) => `${who} ${tensed(t)} ${obj}.`), 'Wakati ujao hutumia -ta-.')
    }
    case 3: {
      const t = rng.pick(['sasa', 'uliopita', 'ujao'] as const)
      const [yes, no] = kanusha(stem, person, t)
      const wrong = (['sasa', 'uliopita', 'ujao'] as const).filter((x) => x !== t).map((x) => kanusha(stem, person, x)[1]).concat(`${neg}${yes.slice(pos.length)}`)
      return q(level, `Kanusha: "${who} ${yes} ${obj}."`, `${who} ${no} ${obj}.`, wrong.map((w) => `${who} ${w} ${obj}.`))
    }
    case 4: {
      // -me- becomes -ja- in the negative.
      const yes = tensed('me')
      const no = `${neg}ja${stem}`
      return q(level, `Kanusha: "${who} ${yes} ${obj}."`, `${who} ${no} ${obj}.`, [`${neg}me${stem}`, `${neg}ku${stem}`, `${neg}ta${stem}`].map((w) => `${who} ${w} ${obj}.`), 'Hali timilifu: -me- huwa -ja- katika ukanushaji.')
    }
    default: {
      if (g === 4 || rng.next() < 0.4) {
        const t = rng.pick(['sasa', 'uliopita', 'ujao'] as const)
        const [yes, no] = kanusha(stem, person, t)
        return q(level, `Tegua ukanushaji: "${who} ${no} ${obj}."`, `${who} ${yes} ${obj}.`, (['sasa', 'uliopita', 'ujao'] as const).filter((x) => x !== t).map((x) => `${who} ${kanusha(stem, person, x)[0]} ${obj}.`).concat(`${who} ${pos}me${stem} ${obj}.`))
      }
      // Grades 5–6: -nge- (conditional) and -ki- (if).
      const [s, right, wrong] = rng.pick<[string, string, string[]]>([
        [`Kama ningekuwa na pesa, ___ baiskeli.`, 'ningenunua', ['nitanunua', 'nilinunua', 'ninanunua']],
        [`Kama ungesoma kwa bidii, ___ mtihani.`, 'ungepita', ['utapita', 'ulipita', 'unapita']],
        [`___ mapema, utafika shuleni kwa wakati.`, 'Ukiamka', ['Uliamka', 'Ungeamka', 'Umeamka']],
        [`Mvua ___, tutapanda mahindi.`, 'ikinyesha', ['ilinyesha', 'inanyesha', 'imenyesha']],
        [`Kama wangejua, ___ mapema.`, 'wangekuja', ['watakuja', 'walikuja', 'wanakuja']],
        [`Mkulima ___ mbegu bora, atapata mavuno mengi.`, 'akipanda', ['alipanda', 'anapanda', 'amepanda']],
        [`Kama ningejua jibu, ___ mkono.`, 'ningeinua', ['nitainua', 'niliinua', 'ninainua']],
        [`Ukimwona Juma, ___ salamu zangu.`, 'mpe', ['ulimpa', 'ungempa', 'umempa']],
        [`Kama mvua ingenyesha, mimea ___ vizuri.`, 'ingemea', ['itamea', 'ilimea', 'inamea']],
        [`Tukifanya kazi pamoja, ___ haraka.`, 'tutamaliza', ['tulimaliza', 'tungemaliza zamani', 'tumemaliza']],
        [`Kama angalisoma, ___ mtihani.`, 'angalipita', ['atapita', 'alipita', 'anapita']],
        [`Wanafunzi ___ mapema, watapata viti vya mbele.`, 'wakifika', ['walifika', 'wanafika', 'wamefika']],
        [`Kama tungekuwa na basi, ___ Mombasa.`, 'tungesafiri', ['tutasafiri', 'tulisafiri', 'tunasafiri']],
        [`Ukipanda mti leo, ___ kivuli kesho.`, 'utapata', ['ulipata', 'ungepata jana', 'umepata']],
      ])
      return q(level, `Jaza pengo kwa kitenzi sahihi:\n${s}`, right, wrong, '-nge- huonyesha masharti yasiyowezekana; -ki- huonyesha masharti yanayowezekana.')
    }
  }
}

// ── Viunganishi ─────────────────────────────────────────────────────────────

const VIUNGANISHI: [G, string, string, string[]][] = [
  [4, 'Ninapenda chai ___ mandazi.', 'na', ['wala', 'ili', 'lakini']],
  [4, 'Nilichelewa ___ basi liliharibika.', 'kwa sababu', ['ili', 'au', 'na']],
  [4, 'Soma kwa bidii ___ upite mtihani.', 'ili', ['lakini', 'au', 'wala']],
  [4, 'Alikuwa na njaa ___ hakula chochote.', 'lakini', ['ili', 'au', 'kwa sababu']],
  [4, 'Utakula wali ___ ugali?', 'au', ['na', 'lakini', 'ili']],
  [4, 'Nawa mikono ___ kula.', 'kabla ya', ['ili', 'wala', 'lakini']],
  [4, 'Tutacheza ___ kumaliza kazi.', 'baada ya', ['wala', 'au', 'ili']],
  [4, 'Juma ___ Amina ni marafiki.', 'na', ['au', 'ili', 'lakini']],
  [4, 'Nilinunua mkate ___ maziwa.', 'na', ['lakini', 'wala', 'ili']],
  [4, 'Juma alichelewa ___ mvua ilikuwa ikinyesha.', 'kwa sababu', ['lakini', 'ili', 'au']],
  [4, 'Nilimpigia simu ___ hakupokea.', 'lakini', ['kwa sababu', 'na', 'ili']],
  [4, 'Unataka chai ___ maziwa?', 'au', ['na', 'lakini', 'wala']],
  [4, 'Alisoma kwa bidii ___ apite mtihani.', 'ili', ['lakini', 'au', 'wala']],
  [4, 'Mama alipika chakula, ___ tukala.', 'kisha', ['wala', 'au', 'ingawa']],
  [5, 'Hakula ___ hakunywa chochote.', 'wala', ['na', 'au', 'ili']],
  [5, '___ alikuwa mgonjwa, alienda shuleni.', 'Ingawa', ['Kwa sababu', 'Ili', 'Kisha']],
  [5, 'Mvua ilinyesha sana, ___ mto ulifurika.', 'kwa hivyo', ['ingawa', 'ili', 'wala']],
  [5, 'Utapewa zawadi ___ upite mtihani.', 'mradi', ['lakini', 'ingawa', 'wala']],
  [5, 'Alikuwa maskini, ___ alikuwa mkarimu.', 'hata hivyo', ['kwa sababu', 'ili', 'kwa hivyo']],
  [6, '___ ya mvua kubwa, tulienda sokoni.', 'Licha', ['Ingawa', 'Ijapokuwa', 'Kwa sababu']],
  [6, 'Alijitahidi sana ___ akashinda tuzo.', 'hadi', ['ingawa', 'wala', 'licha']],
  [6, 'Hatutaondoka ___ mwalimu afike.', 'mpaka', ['ili', 'licha', 'wala']],
  [6, '___ alikuwa amechoka, aliendelea kufanya kazi.', 'Ijapokuwa', ['Kwa kuwa', 'Ili', 'Kisha']],
  [6, 'Alifaulu ___ alisoma kwa bidii.', 'kwa kuwa', ['ingawa', 'licha', 'wala']],
  [4, 'Funga dirisha ___ mvua isiingie.', 'ili', ['lakini', 'wala', 'au']],
  [4, 'Baba alilima shamba ___ akapanda mahindi.', 'kisha', ['wala', 'ingawa', 'au']],
  [4, 'Mtoto analia ___ ana njaa.', 'kwa sababu', ['lakini', 'ili', 'au']],
  [4, 'Ningependa kwenda ___ sina nauli.', 'lakini', ['ili', 'na', 'kwa sababu']],
  [4, 'Utasoma kitabu ___ utaandika insha?', 'au', ['na', 'ili', 'wala']],
  [4, 'Wanafunzi waliimba ___ kucheza ngoma.', 'na', ['wala', 'ili', 'lakini']],
  [5, '___ umechoka, pumzika kwanza.', 'Kama', ['Ili', 'Wala', 'Kisha']],
  [5, 'Hatukwenda sokoni ___ mvua ilinyesha sana.', 'kwa kuwa', ['ingawa', 'ili', 'wala']],
  [5, 'Alikimbia haraka ___ alichelewa.', 'hata hivyo', ['kwa hivyo', 'ili', 'kwa sababu']],
  [6, 'Fanya kazi kwa bidii ___ ufaulu maishani.', 'ili', ['licha', 'ingawa', 'wala']],
  [6, '___ ya kuwa mgonjwa, alishinda mbio.', 'Licha', ['Ingawa', 'Kwa sababu', 'Ili']],
  [6, 'Hatutaanza mkutano ___ wageni wote wafike.', 'hadi', ['ili', 'licha', 'wala']],
]

export const viunganishiU = (g: G): Generator => (rng, level) => {
  const rows = forGrade(VIUNGANISHI, g)
  const pool = level <= 2 ? forGrade(VIUNGANISHI, 4) : rows
  const [s, right, wrong] = rng.pick(pool)
  return q(level, `Chagua kiunganishi kifaacho:\n${s}`, right, wrong)
}

// ── Uakifishaji ─────────────────────────────────────────────────────────────

const ALAMA: [G, string, string][] = [
  [4, '.', 'kitone (nukta)'],
  [4, '?', 'alama ya kuuliza'],
  [4, '!', 'alama ya hisi'],
  [4, ',', 'kipumuo (koma)'],
  [5, "'", 'ritifaa'],
  [5, ':', 'nukta pacha'],
  [6, '" "', 'alama za kunukuu'],
  [6, '-', 'kistari'],
  [6, '( )', 'mabano'],
]
const SAHIHI: [G, string, string[]][] = [
  [4, 'Jina langu ni Baraka.', ['jina langu ni Baraka.', 'Jina langu ni baraka.', 'Jina langu ni Baraka']],
  [4, 'Je, umekula?', ['Je, umekula.', 'je, umekula?', 'Je umekula!']],
  [4, 'Tutaenda Kisumu mwezi Aprili.', ['Tutaenda kisumu mwezi Aprili.', 'Tutaenda Kisumu mwezi aprili.', 'tutaenda Kisumu mwezi Aprili.']],
  [4, 'Ala! Mvua imeanza kunyesha!', ['Ala? Mvua imeanza kunyesha?', 'ala! mvua imeanza kunyesha!', 'Ala. Mvua imeanza kunyesha.']],
  [4, 'Mama alinunua sukari, chumvi na mafuta.', ['Mama alinunua sukari chumvi na mafuta.', 'mama alinunua sukari, chumvi na mafuta.', 'Mama alinunua, sukari, chumvi, na, mafuta.']],
  [4, 'Bwana Otieno ni mwalimu wetu.', ['bwana Otieno ni mwalimu wetu.', 'Bwana otieno ni mwalimu wetu.', 'Bwana Otieno ni mwalimu wetu?']],
  [4, 'Unaenda wapi?', ['Unaenda wapi.', 'unaenda wapi?', 'Unaenda wapi!']],
  [4, 'Lo! Umevunja kikombe!', ['Lo. Umevunja kikombe.', 'Lo? umevunja kikombe?', 'lo! umevunja kikombe']],
  [4, 'Nilinunua maembe, machungwa na ndizi.', ['Nilinunua maembe machungwa na ndizi.', 'nilinunua maembe, machungwa na ndizi.', 'Nilinunua, maembe, machungwa, na, ndizi.']],
  [4, 'Juma anaishi Nakuru.', ['Juma anaishi nakuru.', 'juma anaishi Nakuru.', 'Juma anaishi Nakuru?']],
  [5, "Ng'ombe wetu ametoroka.", ['Ngombe wetu ametoroka.', "Ng'ombe wetu ametoroka?", "ng'ombe wetu ametoroka."]],
  [5, 'Alinunua vitu vifuatavyo: sukari, chumvi na unga.', ['Alinunua vitu vifuatavyo, sukari, chumvi na unga.', 'Alinunua vitu vifuatavyo sukari chumvi na unga.', 'Alinunua vitu: vifuatavyo sukari, chumvi na unga.']],
  [6, 'Mwalimu alisema, "Fungueni vitabu vyenu."', ['Mwalimu alisema "fungueni vitabu vyenu."', 'Mwalimu alisema, Fungueni vitabu vyenu.', 'Mwalimu alisema, "Fungueni vitabu vyenu".']],
  [6, 'Mama aliuliza, "Umemaliza kazi yako?"', ['Mama aliuliza, "Umemaliza kazi yako."', 'Mama aliuliza "umemaliza kazi yako?"', 'Mama aliuliza, Umemaliza kazi yako?']],
  [4, 'Shule yetu itafungwa mwezi Novemba.', ['shule yetu itafungwa mwezi Novemba.', 'Shule yetu itafungwa mwezi novemba.', 'Shule yetu itafungwa mwezi Novemba']],
  [4, 'Je, umeona kalamu yangu?', ['Je, umeona kalamu yangu.', 'je, umeona kalamu yangu?', 'Je umeona kalamu yangu!']],
  [4, 'Halima anaishi Garissa.', ['Halima anaishi garissa.', 'halima anaishi Garissa.', 'Halima anaishi Garissa?']],
  [4, 'Tunahitaji sukari, chumvi na majani ya chai.', ['Tunahitaji sukari chumvi na majani ya chai.', 'tunahitaji sukari, chumvi na majani ya chai.', 'Tunahitaji, sukari, chumvi, na, majani ya chai.']],
  [4, 'Ajabu! Umekua mrefu sana!', ['Ajabu? Umekua mrefu sana?', 'ajabu! umekua mrefu sana!', 'Ajabu. Umekua mrefu sana.']],
  [5, 'Daktari Achieng hufanya kazi mjini Kisumu.', ['daktari Achieng hufanya kazi mjini Kisumu.', 'Daktari achieng hufanya kazi mjini Kisumu.', 'Daktari Achieng hufanya kazi mjini kisumu.']],
]

const MATUMIZI: [G, string, string][] = [
  [4, 'kumaliza sentensi ya kawaida', '.'],
  [4, 'kumaliza swali', '?'],
  [4, 'kuonyesha hisia kama mshangao au furaha', '!'],
  [4, 'kutenganisha vitu katika orodha', ','],
  [5, 'kuonyesha sauti ya ng\' kama katika ng\'ombe', "'"],
  [5, 'kutanguliza orodha ya vitu', ':'],
  [6, 'kunukuu maneno halisi ya msemaji', '" "'],
  [6, 'kuonyesha kwamba neno limekatwa mwishoni mwa mstari', '-'],
  [6, 'kuzingira maelezo ya ziada', '( )'],
]

export const uakifishajiU = (g: G): Generator => (rng, level) => {
  const endMark = level === 3 || (level === 1 && rng.next() < 0.4)
  if (!endMark && level <= 2 && rng.next() < 0.5) {
    const [kazi, mark] = rng.pick(forGrade(MATUMIZI, g))
    return q(level, `Ni alama gani hutumika ${kazi}?`, mark, rng.sample(forGrade(MATUMIZI, g).map(([, m]) => m).filter((m) => m !== mark), 3))
  }
  if (!endMark && level <= 2) {
    const [mark, jina] = rng.pick(forGrade(ALAMA, g))
    const all = forGrade(ALAMA, g).map(([, j]) => j)
    if (level === 1 || rng.next() < 0.5) return q(level, `Alama hii inaitwaje?  ${mark}`, jina, rng.sample(all.filter((j) => j !== jina), 3))
    return q(level, `Ni alama gani inayoitwa "${jina}"?`, mark, rng.sample(forGrade(ALAMA, g).map(([m]) => m).filter((m) => m !== mark), 3))
  }
  if (endMark) {
    const [s, mark] = rng.pick<[string, string]>([
      ['Jina lako ni nani', '?'],
      ['Ala! Umefika mapema', '!'],
      ['Jua huchomoza mashariki', '.'],
      ['Unaishi wapi', '?'],
      ['Lo! Mtoto ameanguka', '!'],
      ['Tafadhali funga mlango', '.'],
      ['Umetoka wapi', '?'],
      ['Hongera! Umeshinda', '!'],
      ['Ng\'ombe hula nyasi', '.'],
      ['Je, umemaliza kazi yako', '?'],
      ['Ajabu! Ndege huyu ni mkubwa', '!'],
      ['Shule hufunguliwa Januari', '.'],
      ['Kwa nini unacheka', '?'],
      ['Ole wangu! Nimesahau kitabu', '!'],
    ])
    return q(level, `Sentensi hii inafaa kumalizwa kwa alama gani?\n${s} ___`, mark, ['?', '!', '.', ','].filter((m) => m !== mark))
  }
  const [right, wrong] = rng.pick(forGrade(SAHIHI, g))
  return q(level, 'Ni sentensi ipi iliyoakifishwa ipasavyo?', right, wrong)
}

// ── Methali ─────────────────────────────────────────────────────────────────

// [min grade, first half, second half, meaning]
const METHALI: [G, string, string, string][] = [
  [4, 'Mwenda pole', 'hajikwai', 'Anayefanya mambo kwa uangalifu hapati matatizo.'],
  [4, 'Akili ni nywele', 'kila mtu ana zake', 'Kila mtu ana mawazo na uwezo wake.'],
  [4, 'Kupotea njia', 'ndiko kujua njia', 'Makosa hutufunza kufanya vizuri zaidi.'],
  [4, 'Damu nzito', 'kuliko maji', 'Uhusiano wa jamaa ni wenye nguvu.'],
  [4, 'Tone na tone', 'huwa mchirizi', 'Vitu vidogo vikikusanywa huwa vingi.'],
  [4, 'Fuata nyuki', 'ule asali', 'Ukiandamana na watu wema utapata mema.'],
  [4, 'Nyumba njema', 'si mlango', 'Usihukumu kitu kwa sura yake ya nje.'],
  [4, 'Mtoto umleavyo', 'ndivyo akuavyo', 'Malezi ya mtoto huonekana katika tabia yake.'],
  [5, 'Chovya chovya', 'humaliza buyu la asali', 'Kutumia kidogo kidogo bila kuongeza humaliza kila kitu.'],
  [5, 'Mchagua jembe', 'si mkulima', 'Mfanyakazi halisi hafanyi visingizio.'],
  [5, 'Asiyekubali kushindwa', 'si mshindani', 'Mshindani mwema hukubali matokeo.'],
  [5, 'Mwenye kelele', 'hana neno', 'Anayepiga kelele nyingi mara nyingi hana jambo la maana.'],
  [6, 'Siri ya mtungi', 'aijuaye kata', 'Mambo ya ndani hujulikana na walio karibu.'],
  [6, 'Jogoo la shamba', 'haliwiki mjini', 'Sifa za mtu nyumbani huenda zisijulikane kwingine.'],
  [6, 'Ngoja ngoja', 'huumiza matumbo', 'Kungoja muda mrefu mno huleta hasara.'],
  [4, 'Haraka haraka', 'haina baraka', 'Jambo linalofanywa kwa haraka huharibika.'],
  [4, 'Pole pole', 'ndio mwendo', 'Kufanya mambo taratibu huleta mafanikio.'],
  [4, 'Haba na haba', 'hujaza kibaba', 'Kidogo kidogo hukusanyika kuwa kingi.'],
  [4, 'Penye nia', 'pana njia', 'Ukiwa na nia ya kweli, utafanikiwa.'],
  [4, 'Mvumilivu', 'hula mbivu', 'Mwenye subira hupata matunda mazuri.'],
  [4, 'Kidole kimoja', 'hakivunji chawa', 'Umoja ni nguvu; tushirikiane.'],
  [4, 'Asiyesikia la mkuu', 'huvunjika guu', 'Asiyesikiliza ushauri hupata matatizo.'],
  [4, 'Maji yakimwagika', 'hayazoleki', 'Jambo likiharibika haliwezi kurekebishwa.'],
  [5, 'Usipoziba ufa', 'utajenga ukuta', 'Tatua tatizo dogo kabla halijakuwa kubwa.'],
  [5, 'Mtaka cha mvunguni', 'sharti ainame', 'Ukitaka kitu lazima ujitahidi.'],
  [5, 'Fimbo ya mbali', 'haiui nyoka', 'Msaada ulio mbali haukufai wakati wa shida.'],
  [5, 'Samaki mkunje', 'angali mbichi', 'Mfunze mtoto tabia njema akiwa bado mdogo.'],
  [5, 'Bandu bandu', 'huisha gogo', 'Kidogo kidogo, kazi kubwa humalizika.'],
  [5, 'Dalili ya mvua', 'ni mawingu', 'Kila jambo lina ishara kabla ya kutokea.'],
  [5, 'Mgeni njoo', 'mwenyeji apone', 'Mgeni huleta manufaa kwa mwenyeji.'],
  [6, 'Wapiganapo tembo', 'nyasi huumia', 'Wakubwa wakigombana, wanyonge ndio huumia.'],
  [6, 'Heri kujikwaa kidole', 'kuliko kujikwaa ulimi', 'Tuwe waangalifu na maneno tunayosema.'],
  [6, 'Asiyefunzwa na mamaye', 'hufunzwa na ulimwengu', 'Asiyesikiliza wazazi hujifunza kwa taabu.'],
  [6, 'Mchelea mwana kulia', 'hulia yeye', 'Asiyemrekebisha mtoto mapema atajuta baadaye.'],
  [6, 'Mwenye macho', 'haambiwi tazama', 'Jambo lililo wazi halihitaji kuelezwa.'],
  [6, 'Ukiona vyaelea', 'vimeundwa', 'Kila mafanikio ni matokeo ya juhudi.'],
  [6, 'Baada ya dhiki', 'faraja', 'Shida haidumu; furaha hufuata.'],
]

export const methaliU = (g: G): Generator => (rng, level) => {
  const rows = forGrade(METHALI, g)
  const [a, b, maana] = rng.pick(level >= 4 ? rows.slice(-20) : rows)
  const others = rows.filter(([x]) => x !== a)
  if (level <= 2) return q(level, `Kamilisha methali: "${a} ___"`, b, rng.sample(others.map(([, y]) => y), 3), `${a} ${b}.`)
  if (level === 3) return q(level, `Kamilisha methali: "___ ${b}"`, a, rng.sample(others.map(([x]) => x), 3), `${a} ${b}.`)
  if (level === 4) return q(level, `Methali "${a} ${b}" ina maana gani?`, maana, rng.sample(others.map(([, , m]) => m), 3))
  return q(level, `Ni methali ipi inayoafiki maelezo haya?\n"${maana}"`, `${a} ${b}`, rng.sample(others.map(([x, y]) => `${x} ${y}`), 3))
}

// ── Msamiati ────────────────────────────────────────────────────────────────

const VISAWE: [G, string, string][] = [
  [4, 'furaha', 'shangwe'],
  [4, 'haraka', 'upesi'],
  [4, 'tabibu', 'daktari'],
  [4, 'maskini', 'fukara'],
  [4, 'ugonjwa', 'maradhi'],
  [4, 'jibu', 'jawabu'],
  [4, 'pesa', 'fedha'],
  [4, 'chakula', 'mlo'],
  [4, 'kazi', 'shughuli'],
  [4, 'mtoto', 'mwana'],
  [4, 'nchi', 'taifa'],
  [5, 'hodari', 'shujaa'],
  [5, 'bahili', 'mchoyo'],
  [5, 'tajiri', 'mkwasi'],
  [5, 'kiburi', 'majivuno'],
  [5, 'rafiki', 'sahibu'],
  [5, 'hasira', 'ghadhabu'],
  [6, 'kifo', 'mauti'],
  [6, 'hekima', 'busara'],
  [6, 'zawadi', 'tunu'],
  [6, 'msichana', 'binti'],
  [6, 'mwalimu', 'mkufunzi'],
]
const VINYUME: [G, string, string][] = [
  [4, 'kulala', 'kuamka'],
  [4, 'kufika', 'kuondoka'],
  [4, 'mbele', 'nyuma'],
  [4, 'ndani', 'nje'],
  [4, 'karibu', 'mbali'],
  [4, 'kuvaa', 'kuvua'],
  [4, 'kuwasha', 'kuzima'],
  [4, 'safi', 'chafu'],
  [4, 'mwanzo', 'mwisho'],
  [4, 'asubuhi', 'jioni'],
  [4, 'kununua', 'kuuza'],
  [4, 'kucheka', 'kulia'],
  [4, 'kufungua', 'kufunga'],
  [4, 'juu', 'chini'],
  [4, 'mchana', 'usiku'],
  [4, 'kupanda', 'kushuka'],
  [4, 'kuingia', 'kutoka'],
  [5, 'kujenga', 'kubomoa'],
  [5, 'kukumbuka', 'kusahau'],
  [5, 'kupenda', 'kuchukia'],
  [5, 'mgeni', 'mwenyeji'],
  [5, 'kutuma', 'kupokea'],
  [6, 'kusifu', 'kukashifu'],
  [6, 'mshindi', 'mshindwa'],
  [6, 'kuinama', 'kuinuka'],
  [6, 'kuanza', 'kumaliza'],
]
const WATOTO: [string, string][] = [
  ["ng'ombe", 'ndama'],
  ['kuku', 'kifaranga'],
  ['mbwa', 'kilebu'],
  ['chura', 'kiluwiluwi'],
  ['paka', 'kinyau'],
  ['kipepeo', 'kiwavi'],
  ['mbuzi', 'mwanambuzi'],
  ['kondoo', 'mwanakondoo'],
  ['nzi', 'funza'],
]
// [min grade, things, group word, connector]
const MAKUNDI: [G, string, string, string][] = [
  [4, 'maua', 'shada', 'la'],
  [4, 'kuni', 'tita', 'la'],
  [4, 'ndizi', 'mkungu', 'wa'],
  [4, 'watu', 'umati', 'wa'],
  [5, 'noti', 'bunda', 'la'],
  [5, 'askari', 'kikosi', 'cha'],
  [5, 'magari', 'msafara', 'wa'],
  [5, 'funguo', 'kicha', 'cha'],
  [6, 'milima', 'safu', 'ya'],
  [6, 'wezi', 'genge', 'la'],
  [6, 'majaji', 'jopo', 'la'],
]
const MAKAZI: [string, string][] = [
  ['nyuki', 'mzinga'],
  ['ndege', 'kiota'],
  ["ng'ombe", 'zizi'],
  ['simba', 'pango'],
  ['kuku', 'kizimba'],
  ['mchwa', 'kichuguu'],
  ['buibui', 'utando'],
  ['panya', 'shimo'],
]
const MILIO: [string, string][] = [
  ['simba', 'hunguruma'],
  ['mbwa', 'hubweka'],
  ['jogoo', 'huwika'],
  ['nyuki', 'huvuma'],
]

export const msamiatiU = (g: G): Generator => (rng, level) => {
  const kind = level === 1 ? rng.pick(['watoto', 'milio', 'visawe']) : level === 2 ? rng.pick(['visawe', 'watoto']) : level === 3 ? 'vinyume' : level === 4 ? rng.pick(['makundi', 'vinyume']) : rng.pick(['makazi', 'makundi', 'visawe'])
  if (kind === 'watoto') {
    const [m, t] = rng.pick(WATOTO)
    return q(level, `Mtoto wa ${m} huitwa nini?`, t, rng.sample(WATOTO.map(([, x]) => x).filter((x) => x !== t), 3))
  }
  if (kind === 'milio') {
    const [m, s] = rng.pick(MILIO)
    return q(level, `Jaza pengo: ${cap(m)} ___.`, s, MILIO.map(([, x]) => x).filter((x) => x !== s))
  }
  if (kind === 'visawe') {
    const rows = forGrade(VISAWE, g)
    const [w, s] = rng.pick(level >= 5 ? rows.slice(-8) : rows)
    return q(level, `Kisawe cha neno "${w}" ni kipi?`, s, rng.sample(rows.map(([, x]) => x).filter((x) => x !== s), 3), `${cap(w)} = ${s}.`)
  }
  if (kind === 'vinyume') {
    const rows = forGrade(VINYUME, g)
    const [w, a] = rng.pick(rows)
    return q(level, `Kinyume cha "${w}" ni kipi?`, a, rng.sample(rows.map(([, x]) => x).filter((x) => x !== a), 3))
  }
  if (kind === 'makundi') {
    const rows = forGrade(MAKUNDI, g)
    const [thing, word, conn] = rng.pick(rows)
    return q(level, `Jaza pengo kwa jina la kundi: ___ ${conn} ${thing}`, word, rng.sample(rows.map(([, x]) => x).filter((x) => x !== word), 3), `${cap(word)} ${conn} ${thing}.`)
  }
  const [m, home] = rng.pick(MAKAZI)
  return q(level, `Makazi ya ${m} huitwa nini?`, home, rng.sample(MAKAZI.map(([, x]) => x).filter((x) => x !== home), 3))
}

// ── Ufahamu na cloze ────────────────────────────────────────────────────────

function cloze(level: Level, title: string, text: string, blanks: [string, string[]][]): BankQuestion[] {
  return blanks.map(([ans, wrong], i) => ({
    type: 'choice' as const,
    level,
    prompt: `Soma kifungu. Ni jibu lipi linalofaa pengo (${i + 1})?`,
    say: `Ni jibu lipi linalofaa pengo ${i + 1}?`,
    visual: { kind: 'passage' as const, title, text },
    options: opts([ans, ...wrong]),
    answer: ans,
  }))
}
function ufahamu(level: Level, title: string, text: string, qs: [string, string, string[]][]): BankQuestion[] {
  return qs.map(([prompt, ans, wrong], i) => ({
    type: 'choice' as const,
    level: (i === 0 && level > 1 ? level - 1 : level) as Level,
    prompt,
    say: `${text} ${prompt}`,
    visual: { kind: 'passage' as const, title, text },
    options: opts([ans, ...wrong]),
    answer: ans,
  }))
}

export const CLOZE_K: BankQuestion[] = [
  ...cloze(1, 'Rafiki Yangu', 'Rafiki yangu (1) Juma. Yeye (2) miaka kumi. Tunasoma darasa (3). Juma anapenda (4) mpira. Yeye ni rafiki (5) sana.', [
    ['anaitwa', ['wanaitwa', 'kinaitwa', 'ninaitwa']],
    ['ana', ['una', 'kina', 'wana']],
    ['moja', ['mmoja', 'wamoja', 'kimoja']],
    ['kucheza', ['anacheza', 'mchezaji', 'mchezo']],
    ['mwema', ['chema', 'jema', 'wema']],
  ]),
  ...cloze(2, 'Kuku Wetu', 'Nyumbani kwetu tuna kuku (1). Kuku hao hutaga mayai (2) kila siku. Mama huuza mayai hayo sokoni (3) apate pesa. Pesa (4) hutumika kununua chakula. Mimi (5) jukumu la kuwapa kuku maji.', [
    ['wengi', ['mengi', 'vingi', 'mingi']],
    ['mengi', ['wengi', 'vingi', 'mingi']],
    ['ili', ['lakini', 'wala', 'au']],
    ['hizo', ['hao', 'hayo', 'hivyo']],
    ['nina', ['una', 'kina', 'lina']],
  ]),
  ...cloze(3, 'Mvua Kubwa', 'Mvua ilinyesha (1) usiku kucha. Asubuhi, mto (2) kijiji ulikuwa umefurika. Wanafunzi (3) waliishi ng\'ambo ya mto hawakuweza kufika shuleni. Mwalimu mkuu (4) wazazi wawaweke watoto nyumbani (5) maji yapungue.', [
    ['sana', ['kubwa', 'mingi', 'nyingi']],
    ['wa', ['ya', 'la', 'cha']],
    ['ambao', ['ambayo', 'ambalo', 'ambacho']],
    ['aliwashauri', ['alishauriwa', 'wanashauri', 'tulishauri']],
    ['hadi', ['ili', 'lakini', 'wala']],
  ]),
  ...cloze(3, 'Afya Bora', 'Ili kuwa na afya bora, tunapaswa kula chakula (1) lishe bora. Chakula (2) kiwe na vyakula vya kujenga mwili, vya kutia nguvu na vya kulinda mwili. Pia tunapaswa kunywa maji (3) kutosha. Mazoezi ya mwili (4) muhimu vilevile. Tusisahau kunawa mikono (5) kutoka msalani.', [
    ['chenye', ['yenye', 'wenye', 'lenye']],
    ['hicho', ['hilo', 'huo', 'hiyo']],
    ['ya', ['wa', 'la', 'za']],
    ['ni', ['na', 'kwa', 'wa']],
    ['baada ya', ['kabla ya', 'mbele ya', 'juu ya']],
  ]),
  ...cloze(4, 'Ziara ya Mombasa', 'Mwezi uliopita, darasa letu (1) ziara ya kwenda Mombasa. Tulisafiri (2) gari moshi la kisasa. Tulipofika, tulitembelea Fort Jesus, ngome (3) ilijengwa na Wareno zamani sana. Jioni tulitembea ufuoni (4) bahari. Ziara hiyo ilikuwa ya (5) sana.', [
    ['lilifanya', ['walifanya', 'kilifanya', 'ilifanya']],
    ['kwa', ['ya', 'la', 'cha']],
    ['ambayo', ['ambalo', 'ambaye', 'ambacho']],
    ['mwa', ['wa', 'ya', 'la']],
    ['kufurahisha', ['furahisha', 'kufurahishwa', 'mfurahishaji']],
  ]),
  ...cloze(4, 'Mashindano ya Insha', 'Mwaka huu, shule yetu (1) katika mashindano ya uandishi wa insha. Mwanafunzi (2) aliandika insha bora alikuwa Neema. Insha (3) ilihusu umuhimu wa amani. Majaji (4) walimsifu kwa lugha yake nzuri. Neema (5) zawadi ya kompyuta.', [
    ['ilishiriki', ['alishiriki', 'walishiriki', 'kilishiriki']],
    ['ambaye', ['ambao', 'ambayo', 'ambacho']],
    ['yake', ['wake', 'lake', 'chake']],
    ['wote', ['yote', 'zote', 'vyote']],
    ['alituzwa', ['alituza', 'walituzwa', 'kilituzwa']],
  ]),
  ...cloze(5, 'Teknolojia', 'Teknolojia (1) mabadiliko makubwa katika maisha yetu. Siku hizi, wanafunzi (2) kupata habari kwa urahisi kupitia mtandao. (3), matumizi mabaya ya simu yanaweza kuathiri masomo. Wazazi wanapaswa (4) watoto wao jinsi ya kutumia vifaa hivi (5) busara.', [
    ['imeleta', ['umeleta', 'kimeleta', 'limeleta']],
    ['wanaweza', ['anaweza', 'kinaweza', 'mnaweza']],
    ['Hata hivyo', ['Kwa sababu', 'Ili', 'Wala']],
    ['kuwafundisha', ['kufundishwa', 'wanafundisha', 'mafundisho']],
    ['kwa', ['na', 'ya', 'la']],
  ]),
  ...cloze(5, 'Mazingira Yetu', '(1) mazingira ni jukumu letu sote. Tunapaswa (2) taka mahali panapostahili. Miti (3) hukatwa inafaa kubadilishwa kwa kupanda miti (4). Vyanzo vya maji (5) safi kwa manufaa ya vizazi vijavyo.', [
    ['Kutunza', ['Watunzaji', 'Utunzi', 'Tunza']],
    ['kutupa', ['kutupwa', 'tunatupa', 'mtupaji']],
    ['ambayo', ['ambao', 'ambalo', 'ambacho']],
    ['mingine', ['wengine', 'mengine', 'vingine']],
    ['viwekwe', ['yawekwe', 'iwekwe', 'ziwekwe']],
  ]),
  ...cloze(2, 'Shuleni Kwetu', 'Shule yetu (1) madarasa kumi. Kila darasa lina madirisha (2). Nyuma ya shule kuna shamba (3) tunapanda mboga. Mwalimu wetu (4) darasa ni Bi. Achieng. Yeye hutufundisha (5) upendo.', [
    ['ina', ['kina', 'lina', 'wana']],
    ['manne', ['wanne', 'vinne', 'minne']],
    ['ambapo', ['ambaye', 'ambavyo', 'ambazo']],
    ['wa', ['ya', 'cha', 'la']],
    ['kwa', ['ya', 'wa', 'la']],
  ]),
  ...cloze(1, 'Siku ya Soko', 'Kila Jumamosi, mama (1) sokoni. Yeye hununua mboga (2) matunda. Mimi huenda (3) yeye. Soko (4) huwa na watu wengi. Sisi (5) nyumbani kabla ya saa sita.', [
    ['huenda', ['huendi', 'tunaenda', 'wanaenda']],
    ['na', ['wala', 'ili', 'lakini']],
    ['pamoja na', ['juu ya', 'chini ya', 'ndani ya']],
    ['hilo', ['hiyo', 'huo', 'hicho']],
    ['hurudi', ['hurudia', 'mrudi', 'kurudi']],
  ]),
  ...cloze(1, 'Familia Yangu', 'Familia yangu (1) watu watano. Baba yangu ni (2). Mama yangu ni muuguzi (3) hospitali ya Kitale. Nina kaka mmoja (4) dada mmoja. Sisi sote (5) upendo.', [
    ['ina', ['kina', 'lina', 'wana']],
    ['mkulima', ['kulima', 'kilimo', 'shamba']],
    ['katika', ['juu', 'chini', 'nyuma']],
    ['na', ['wala', 'ili', 'lakini']],
    ['tuna', ['una', 'ana', 'kina']],
  ]),
  ...cloze(2, 'Kuweka Akiba', 'Neema ana kibweta (1) huweka akiba yake. Kila (2) anapopata sarafu, huitia ndani. Mwezi uliopita alihesabu pesa (3) akapata shilingi mia mbili. Alizitumia kununua kitabu cha (4). Sasa anaweka akiba (5) kununua viatu.', [
    ['ambamo', ['ambaye', 'ambao', 'ambacho']],
    ['mara', ['siku', 'wakati', 'saa']],
    ['zake', ['yake', 'wake', 'lake']],
    ['hadithi', ['hadithia', 'kuhadithia', 'mhadithi']],
    ['ili', ['lakini', 'wala', 'au']],
  ]),
  ...cloze(4, 'Fainali ya Kandanda', 'Mechi ya fainali kati ya shule ya Moi na Tumaini (1) Jumamosi. Katika kipindi cha kwanza, hakuna timu (2) bao. Dakika kumi baada ya mapumziko, Otieno (3) bao zuri. Mashabiki walishangilia (4) sana. Wachezaji wa Moi walipewa kombe na walijivunia (5) yao.', [
    ['ilichezwa', ['alichezwa', 'kilichezwa', 'zilichezwa']],
    ['iliyofunga', ['aliyefunga', 'kilichofunga', 'lililofunga']],
    ['alifunga', ['walifunga', 'ilifunga', 'kilifunga']],
    ['kwa nguvu', ['kwa nguvuni', 'nguvu za', 'nguvuni']],
    ['juhudi', ['juhudisha', 'kujuhudi', 'mjuhudi']],
  ]),
  ...cloze(5, 'Nyuki na Wakulima', 'Nyuki ni (1) ya wadudu wenye manufaa makubwa duniani. Wanapotoka ua moja hadi jingine, hubeba chavua (2) husaidia mimea kutoa matunda. Bila nyuki, mazao mengi (3). Wakulima wanaofuga nyuki pia hupata asali na nta. (4), nyuki wako hatarini kutokana na matumizi mabaya ya dawa. Kwa hivyo wakulima wanashauriwa kunyunyizia dawa (5) inapohitajika tu.', [
    ['baadhi', ['mmoja', 'kila', 'wote']],
    ['ambayo', ['ambaye', 'ambao', 'ambacho']],
    ['yangepungua', ['litapungua', 'kingepungua', 'angepungua']],
    ['Hata hivyo', ['Kwa sababu', 'Ili', 'Wala']],
    ['pale', ['mahali', 'ndani', 'juu']],
  ]),
]

export const UFAHAMU_K: BankQuestion[] = [
  ...ufahamu(1, 'Shamba la Babu', 'Wakati wa likizo, Amina alienda kumtembelea babu yake huko Kitui. Babu ana shamba kubwa la mahindi na maharagwe. Kila asubuhi, Amina aliamka mapema kumsaidia babu kuchunga mbuzi. Jioni, walikaa nje wakisikiliza hadithi za babu. Amina alifurahi sana.', [
    ['Amina alienda wapi wakati wa likizo?', 'Kitui', ['Mombasa', 'Nakuru', 'Kisumu']],
    ['Babu ana shamba la nini?', 'mahindi na maharagwe', ['chai na kahawa', 'miwa', 'ndizi']],
    ['Amina alifanya nini kila asubuhi?', 'alichunga mbuzi', ['alienda shuleni', 'alipika chakula', 'alilala']],
    ['Walifanya nini jioni?', 'walisikiliza hadithi za babu', ['walitazama runinga', 'walilima shamba', 'walienda sokoni']],
  ]),
  ...ufahamu(2, 'Siku ya Michezo', 'Siku ya Ijumaa, shule yetu ilifanya mashindano ya michezo. Wanafunzi walishiriki katika mbio, kuruka juu na mpira wa miguu. Chebet aliibuka mshindi wa mbio za mita mia nne. Mwalimu mkuu alimpa zawadi ya kombe. Wazazi wengi walihudhuria na kuwashangilia watoto wao.', [
    ['Mashindano yalifanyika siku gani?', 'Ijumaa', ['Jumatatu', 'Jumamosi', 'Jumapili']],
    ['Chebet alishinda mbio za mita ngapi?', 'mia nne', ['mia moja', 'mia mbili', 'elfu moja']],
    ['Chebet alipewa zawadi gani?', 'kombe', ['kitabu', 'pesa', 'mpira']],
    ['Neno "walihudhuria" lina maana gani?', 'walifika', ['walikimbia', 'walilia', 'walikataa']],
  ]),
  ...ufahamu(2, 'Soko la Jumamosi', 'Kila Jumamosi, mama huenda sokoni kununua vyakula. Mimi huandamana naye ili nimsaidie kubeba kikapu. Sokoni kuna wauzaji wengi wa matunda, mboga na samaki. Mama hupenda kununua sukumawiki, nyanya na vitunguu. Tukimaliza, tunapanda matatu kurudi nyumbani.', [
    ['Mama huenda sokoni lini?', 'kila Jumamosi', ['kila Jumapili', 'kila siku', 'mara moja kwa mwezi']],
    ['Mwandishi huandamana na mama ili afanye nini?', 'amsaidie kubeba kikapu', ['anunue pipi', 'acheze sokoni', 'auze samaki']],
    ['Mama hupenda kununua nini?', 'sukumawiki, nyanya na vitunguu', ['mkate, maziwa na mayai', 'samaki, nyama na kuku', 'sukari, chumvi na unga']],
    ['Wao hurudi nyumbani kwa nini?', 'kwa matatu', ['kwa miguu', 'kwa baiskeli', 'kwa gari moshi']],
  ]),
  ...ufahamu(3, 'Maji ni Uhai', 'Maji ni muhimu kwa viumbe vyote. Binadamu, wanyama na mimea hutegemea maji ili kuishi. Hata hivyo, katika sehemu nyingi za nchi yetu, maji ni haba. Watu hutembea mwendo mrefu kutafuta maji. Ni jukumu letu kuhifadhi vyanzo vya maji kwa kupanda miti na kutotupa taka mitoni. Pia tunapaswa kuchemsha maji ya kunywa ili kuepuka magonjwa kama vile kipindupindu.', [
    ['Kulingana na kifungu, ni nani hutegemea maji?', 'binadamu, wanyama na mimea', ['binadamu na wanyama pekee', 'mimea na samaki pekee', 'wakulima na wavuvi pekee']],
    ['Neno "haba" lina maana gani?', 'kidogo', ['mengi', 'machafu', 'baridi']],
    ['Tunahifadhi vyanzo vya maji kwa njia gani?', 'kwa kupanda miti na kutotupa taka mitoni', ['kwa kukata miti iliyo karibu na mito', 'kwa kuchoma taka kando ya mito', 'kwa kujenga nyumba karibu na chemchemi']],
    ['Kwa nini tunapaswa kuchemsha maji ya kunywa?', 'ili kuepuka magonjwa', ['ili yawe matamu', 'ili yapoe', 'ili yaongezeke']],
    ['Ni ugonjwa upi uliotajwa katika kifungu?', 'kipindupindu', ['malaria', 'homa ya matumbo', 'kifua kikuu']],
  ]),
  ...ufahamu(3, 'Usalama Barabarani', 'Ajali nyingi za barabarani husababishwa na uzembe. Madereva wengine huendesha magari kwa kasi kupita kiasi. Wapita njia nao huvuka barabara bila kuangalia pande zote mbili. Abiria wanashauriwa kufunga mikanda ya usalama wakati wote. Watoto wanapaswa kuvuka barabara kwenye vivuko vya wapita njia wakiongozwa na mtu mzima. Tukifuata sheria za barabarani, tutapunguza ajali.', [
    ['Ajali nyingi husababishwa na nini?', 'uzembe', ['mvua', 'barabara nzuri', 'wanyama']],
    ['Abiria wanashauriwa kufanya nini?', 'kufunga mikanda ya usalama', ['kusimama garini', 'kuongea na dereva', 'kufungua madirisha']],
    ['Watoto wanapaswa kuvuka barabara wapi?', 'kwenye vivuko vya wapita njia', ['karibu na kona ya barabara', 'katikati ya magari yaliyosimama', 'mahali popote pasipo na gari']],
    ['Maneno "kwa kasi kupita kiasi" yana maana gani?', 'kwa mwendo wa haraka mno', ['polepole sana', 'kwa uangalifu', 'kwa kurudi nyuma']],
  ]),
  ...ufahamu(4, 'Sungura na Fisi', 'Hapo zamani za kale, Sungura na Fisi walikuwa marafiki. Siku moja walikubaliana kulima shamba pamoja na kugawana mavuno. Fisi alikuwa mvivu; kila siku alijifanya mgonjwa. Sungura alilima peke yake mpaka mahindi yakakomaa. Wakati wa mavuno ulipofika, Fisi alikuwa wa kwanza kufika shambani akitaka sehemu kubwa. Sungura alimwambia, "Asiyefanya kazi asile." Fisi aliondoka kwa aibu.', [
    ['Sungura na Fisi walikubaliana nini?', 'kulima shamba pamoja na kugawana mavuno', ['kujenga nyumba moja na kuishi pamoja', 'kuwinda pamoja na kugawana nyama', 'kwenda safari ndefu hadi mjini']],
    ['Fisi alifanya nini kila siku?', 'alijifanya mgonjwa', ['alilima kwa bidii', 'alileta chakula', 'alimsaidia Sungura']],
    ['Ni neno lipi linalomfaa Fisi?', 'mvivu', ['mwenye bidii', 'mkarimu', 'mwaminifu']],
    ['Fisi alitaka nini wakati wa mavuno?', 'sehemu kubwa ya mavuno', ['kulima tena', 'kumsaidia Sungura', 'kuondoka']],
    ['Hadithi hii inatufunza nini?', 'Tufanye kazi kwa bidii ili tufaidi.', ['Fisi ni mnyama mkubwa.', 'Mahindi hukomaa haraka.', 'Sungura hapendi marafiki.']],
  ]),
  ...ufahamu(4, 'Barua kwa Rafiki', 'Mpendwa Rehema, pokea salamu nyingi kutoka Eldoret. Natumaini u mzima. Nakuandikia kukueleza kuhusu mashindano ya riadha tuliyoshiriki wiki iliyopita. Shule yetu ilishinda medali tatu za dhahabu. Mimi nilikuwa wa pili katika mbio za mita mia nane. Kocha wetu alisema kwamba tukiendelea kufanya mazoezi, tutashiriki mashindano ya kitaifa. Nisalimie wazazi wako. Ni mimi, rafiki yako, Jepkoech.', [
    ['Barua hii iliandikwa na nani?', 'Jepkoech', ['Rehema', 'kocha', 'wazazi']],
    ['Mwandishi anaishi wapi?', 'Eldoret', ['Nairobi', 'Kisumu', 'Mombasa']],
    ['Shule yao ilishinda medali ngapi za dhahabu?', 'tatu', ['mbili', 'nne', 'moja']],
    ['Jepkoech alikuwa wa ngapi katika mbio za mita mia nane?', 'wa pili', ['wa kwanza', 'wa tatu', 'wa mwisho']],
    ['Kocha alisema watafanya nini wakiendelea na mazoezi?', 'watashiriki mashindano ya kitaifa', ['watapewa medali bila kushindana', 'wataacha riadha na kucheza kandanda', 'watapumzika hadi mwaka ujao']],
  ]),
  ...ufahamu(5, 'Misitu Yetu', 'Misitu ni hazina kubwa kwa taifa letu. Misitu kama ule wa Mau na wa Mlima Kenya hujulikana kama minara ya maji kwa sababu mito mingi huanzia huko. Miti husaidia kuleta mvua, huzuia mmomonyoko wa udongo na ni makazi ya wanyama pori. Kwa bahati mbaya, watu wengi hukata miti kiholela ili kupata makaa, mbao na mashamba. Matokeo yake ni ukame, mito kukauka na wanyama kukosa makao. Serikali imeanzisha kampeni ya upandaji miti, na kila mwananchi anahimizwa kupanda angalau mti mmoja kila mwaka.', [
    ['Kwa nini misitu ya Mau na Mlima Kenya huitwa minara ya maji?', 'kwa sababu mito mingi huanzia huko', ['kwa sababu ni mirefu', 'kwa sababu ina minara', 'kwa sababu ina mvua kidogo']],
    ['Ni ipi SI faida ya miti kulingana na kifungu?', 'kusababisha ukame', ['kuleta mvua', 'kuzuia mmomonyoko wa udongo', 'kuwa makazi ya wanyama pori']],
    ['Neno "kiholela" lina maana gani?', 'bila mpango', ['kwa uangalifu', 'kwa haraka', 'kwa ruhusa']],
    ['Kukata miti kiholela husababisha nini?', 'ukame na mito kukauka', ['mvua nyingi', 'wanyama zaidi', 'mito kujaa']],
    ['Ni kichwa kipi kinachofaa kifungu hiki?', 'Umuhimu wa Kuhifadhi Misitu', ['Wanyama wa Mau', 'Jinsi ya Kuchoma Makaa', 'Kilimo cha Mahindi']],
  ]),
  ...ufahamu(5, 'Juhudi za Kioko', 'Kioko alikuwa mwanafunzi wa darasa la sita katika shule ya msingi ya Kalama. Wazazi wake walikuwa maskini, na mara nyingi alikosa karo. Hata hivyo, hakukata tamaa. Baada ya masomo, alimsaidia mama yake kuuza mboga sokoni, na usiku alisoma kwa taa ya mafuta ya taa. Walimu wake walivutiwa na bidii yake. Katika mtihani wa mwisho wa mwaka, Kioko alikuwa wa kwanza katika kaunti nzima. Mfadhili mmoja alijitolea kumlipia karo hadi chuo kikuu.', [
    ['Kioko alikuwa katika darasa gani?', 'la sita', ['la nne', 'la tano', 'la saba']],
    ['Kioko alikosa nini mara nyingi?', 'karo', ['chakula', 'marafiki', 'viatu']],
    ['Maneno "hakukata tamaa" yana maana gani?', 'aliendelea kujitahidi', ['alikasirika', 'aliacha shule', 'alilala sana']],
    ['Kioko alisoma vipi usiku?', 'kwa taa ya mafuta ya taa', ['kwa umeme', 'kwa mwezi', 'kwa simu']],
    ['Ni methali ipi inayofaa hadithi hii?', 'Penye nia pana njia', ['Haraka haraka haina baraka', 'Mgeni njoo mwenyeji apone', 'Mwenye macho haambiwi tazama']],
  ]),
  ...ufahamu(1, 'Paka wa Neema', 'Neema ana paka mweupe anayeitwa Pamba. Pamba hupenda kulala juani. Kila asubuhi Neema humpa maziwa. Siku moja Pamba alipotea. Neema alilia sana. Jioni, Pamba alirudi akiwa na watoto watatu.', [
    ['Paka wa Neema anaitwa nani?', 'Pamba', ['Simba', 'Neema', 'Chui']],
    ['Paka huyo ana rangi gani?', 'nyeupe', ['nyeusi', 'kahawia', 'kijivu']],
    ['Neema humpa paka nini kila asubuhi?', 'maziwa', ['nyama', 'maji', 'mkate']],
    ['Pamba alirudi na watoto wangapi?', 'watatu', ['wawili', 'wanne', 'mmoja']],
  ]),
  ...ufahamu(1, 'Bustani ya Shule', 'Shule yetu ina bustani ndogo. Tunapanda sukumawiki, spinachi na karoti. Kila Jumanne tunamwagilia mimea na kung\'oa magugu. Wiki iliyopita tulivuna sukumawiki nyingi. Mpishi aliipika kwa chakula cha mchana.', [
    ['Shule ina nini?', 'bustani ndogo', ['shamba la chai', 'ziwa', 'msitu']],
    ['Wanafunzi humwagilia mimea siku gani?', 'Jumanne', ['Ijumaa', 'Jumamosi', 'Jumapili']],
    ['Walivuna nini wiki iliyopita?', 'sukumawiki', ['karoti', 'mahindi', 'ndizi']],
    ['Nani alipika sukumawiki?', 'mpishi', ['mwalimu mkuu', 'mzazi', 'mwanafunzi']],
  ]),
  ...ufahamu(3, 'Kiongozi wa Darasa', 'Zawadi alichaguliwa kuwa kiongozi wa darasa la tano. Alikuwa mwanafunzi mwadilifu na mcheshi. Kila asubuhi, alihakikisha darasa limefagiliwa na madawati yamepangwa vizuri. Wenzake walipogombana, aliwasikiliza wote wawili kisha akawapatanisha. Mwalimu wao alisema kwamba Zawadi alikuwa mfano mzuri wa uongozi bora.', [
    ['Zawadi alichaguliwa kuwa nini?', 'kiongozi wa darasa', ['mwalimu', 'mpishi', 'mlinzi']],
    ['Zawadi alihakikisha nini kila asubuhi?', 'darasa limefagiliwa na madawati yamepangwa', ['mlango umefungwa na madirisha yamefunguliwa', 'mwalimu amefika na vitabu vimegawanywa', 'wanafunzi wamefika na kengele imelia']],
    ['Zawadi alifanya nini wenzake walipogombana?', 'aliwasikiliza na kuwapatanisha', ['aliwacheka na kuondoka zake', 'aliwaripoti kwa wazazi wao', 'aliwapigia kelele wanyamaze']],
    ['Neno "mwadilifu" lina maana gani?', 'mwenye tabia njema', ['mvivu', 'mkorofi', 'mgonjwa']],
  ]),
  ...ufahamu(4, 'Safari ya Lamu', 'Wakati wa likizo ya Desemba, familia ya Bwana Hamisi ilisafiri hadi kisiwa cha Lamu. Walipanda basi kutoka Malindi hadi Mokowe, kisha wakavuka bahari kwa mashua. Lamu ni mji wa kale wenye barabara nyembamba na nyumba za mawe. Hakuna magari mengi; watu hutembea au kupanda punda. Watoto walifurahia kuona mafundi wakitengeneza majahazi kwa mikono. Kabla ya kurudi, walinunua zawadi za vikapu vilivyosukwa kwa ukindu.', [
    ['Familia ilisafiri lini?', 'wakati wa likizo ya Desemba', ['wakati wa likizo ya Aprili', 'wiki iliyopita siku ya Jumamosi', 'wakati wa mvua za masika']],
    ['Walivuka bahari kwa nini?', 'kwa mashua', ['kwa ndege', 'kwa basi', 'kwa punda']],
    ['Watu wa Lamu husafiri vipi mjini?', 'hutembea au hupanda punda', ['hupanda magari mengi', 'hupanda treni', 'hupanda ndege']],
    ['Watoto walifurahia kuona nini?', 'mafundi wakitengeneza majahazi', ['magari mengi yakipita barabarani', 'ndege kubwa ikitua uwanjani', 'wavuvi wakiuza samaki sokoni']],
    ['Vikapu walivyonunua vilisukwa kwa nini?', 'ukindu', ['plastiki', 'chuma', 'karatasi']],
  ]),
  ...ufahamu(5, 'Nishati ya Jua', 'Miaka miwili iliyopita, kijiji chetu hakikuwa na umeme. Familia nyingi zilitumia taa za mafuta ya taa ambazo zilitoa moshi na zilikuwa ghali. Kisha kikundi cha wanakijiji kiliweka paneli za sola kwenye paa za shule na zahanati. Sasa wanafunzi husoma jioni kwa mwangaza mzuri, na zahanati huhifadhi chanjo katika jokofu linalotumia nguvu za jua. Wazee husema kwamba nishati safi imeleta mwangaza na matumaini. Hata hivyo, paneli hizo lazima zisafishwe mara kwa mara ili ziendelee kufanya kazi vizuri.', [
    ['Familia zilitumia nini kabla ya sola?', 'taa za mafuta ya taa', ['balbu za umeme', 'mishumaa pekee', 'jiko la gesi']],
    ['Taa za mafuta ya taa zilikuwa na tatizo gani?', 'zilitoa moshi na zilikuwa ghali', ['zilikuwa angavu sana', 'zilikuwa bure', 'zilihitaji jua']],
    ['Zahanati imefaidika vipi?', 'huhifadhi chanjo katika jokofu la sola', ['huuza simu na vifaa vya sola', 'imepata madaktari wengi wapya', 'hufunguliwa usiku pekee sasa']],
    ['Neno "ghali" lina maana gani?', 'bei ya juu', ['rahisi', 'safi', 'nzito']],
    ['Ni nini kifanyike ili paneli ziendelee kufanya kazi?', 'zisafishwe mara kwa mara', ['zifunikwe kwa udongo', 'zizimwe', 'ziwekwe ndani ya nyumba']],
  ]),
]

export function upperKiswahiliGenerators(): Record<string, Generator> {
  const out: Record<string, Generator> = {}
  for (const g of [4, 5, 6] as G[]) {
    const p = `u${g}k-`
    out[`${p}msamiati`] = msamiatiU(g)
    out[`${p}methali`] = methaliU(g)
    out[`${p}ngeli`] = ngeliU(g)
    out[`${p}nyakati`] = nyakatiU(g)
    out[`${p}vivumishi`] = vivumishiU(g)
    out[`${p}viunganishi`] = viunganishiU(g)
    out[`${p}uakifishaji`] = uakifishajiU(g)
  }
  return out
}

export function upperKiswahiliBanks(): Record<string, BankQuestion[]> {
  const out: Record<string, BankQuestion[]> = {}
  for (const g of [4, 5, 6]) {
    out[`u${g}k-ufahamu`] = UFAHAMU_K
    out[`u${g}k-cloze`] = CLOZE_K
  }
  return out
}

