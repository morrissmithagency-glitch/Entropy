// Grade 3 Kiswahili question makers. Only regular patterns are generated (verbs whose stem
// starts with a consonant and ends in -a; LI-YA nouns that add ma-), so the grammar is
// always right; irregular words stay in the hand-written banks.
import { factGenerator } from '../facts'
import { uid } from '../helpers'
import type { ChoiceQuestion, Generator, Level } from '../types'

const choiceQ = (level: Level, prompt: string, answer: string, wrong: string[], explain?: string): ChoiceQuestion => ({
  id: uid('ksw3'),
  type: 'choice',
  level,
  prompt,
  options: [answer, ...[...new Set(wrong)].filter((w) => w !== answer)].map((l) => ({ id: l, label: l })),
  answer,
  explain,
})

const cap = (s: string) => s[0].toUpperCase() + s.slice(1)

// ── Kukanusha ───────────────────────────────────────────────────────────────

// Verb stem (consonant first, ends in -a) and what follows it.
const VERBS: [string, string][] = [
  ['cheza', 'mpira'],
  ['soma', 'kitabu'],
  ['lima', 'shamba'],
  ['pika', 'chakula'],
  ['ruka', 'kamba'],
  ['fagia', 'darasa'],
  ['chora', 'picha'],
  ['shona', 'nguo'],
  ['beba', 'maji'],
  ['nunua', 'mkate'],
  ['safisha', 'nyumba'],
  ['sikiliza', 'redio'],
  ['piga', 'ngoma'],
  ['tembea', 'polepole'],
]
// [subject word, positive prefix, negative prefix]
const PEOPLE: [string, string, string][] = [
  ['Mimi', 'ni', 'si'],
  ['Wewe', 'u', 'hu'],
  ['Yeye', 'a', 'ha'],
  ['Sisi', 'tu', 'hatu'],
  ['Ninyi', 'm', 'ham'],
  ['Wao', 'wa', 'hawa'],
]
type Tense = 'sasa' | 'ujao' | 'uliopita'

export function kanusha(stem: string, p: [string, string, string], tense: Tense): [string, string] {
  const [, pos, neg] = p
  if (tense === 'sasa') return [`${pos}na${stem}`, `${neg}${stem.slice(0, -1)}i`]
  if (tense === 'ujao') return [`${pos}ta${stem}`, `${neg}ta${stem}`]
  return [`${pos}li${stem}`, `${neg}ku${stem}`]
}

export const kanusha3: Generator = (rng, level) => {
  const [stem, rest] = rng.pick(VERBS)
  const tense: Tense = level <= 2 ? 'sasa' : level === 3 ? 'ujao' : level === 4 ? 'uliopita' : rng.pick(['sasa', 'ujao', 'uliopita'] as const)
  const person = rng.pick(PEOPLE)
  const [yes, no] = kanusha(stem, person, tense)
  const others = (['sasa', 'ujao', 'uliopita'] as Tense[]).filter((t) => t !== tense).map((t) => kanusha(stem, person, t)[1])
  const subject = level <= 1 ? '' : `${person[0]} `
  const object = level <= 1 ? '' : ` ${rest}`
  const prompt = `Kanusha: "${cap(subject + yes + object)}."`
  const answer = cap(`${subject}${no}${object}.`)
  const wrong = [...others.map((o) => cap(`${subject}${o}${object}.`)), cap(`${subject}${yes}${object} sana.`)]
  const explain =
    tense === 'sasa' ? 'Wakati uliopo: -na- huondoka na -a ya mwisho huwa -i.' : tense === 'ujao' ? 'Wakati ujao: -ta- inabaki; ongeza ha- au si-.' : 'Wakati uliopita: -li- huwa -ku-.'
  return choiceQ(level, prompt, answer, rng.sample(wrong, level === 1 ? 2 : 3), explain)
}

// ── Yeye na wao, yule na wale ───────────────────────────────────────────────

// [mmoja, wengi] for people (M-WA), with what they do.
const WATU: [string, string, string][] = [
  ['mtoto', 'watoto', 'cheza'],
  ['mwalimu', 'walimu', 'fundisha'],
  ['mkulima', 'wakulima', 'lima'],
  ['mpishi', 'wapishi', 'pika'],
  ['mwanafunzi', 'wanafunzi', 'soma'],
  ['mvuvi', 'wavuvi', 'vua samaki'],
  ['mgeni', 'wageni', 'fika'],
  ['mzee', 'wazee', 'pumzika'],
  ['mchezaji', 'wachezaji', 'kimbia'],
  ['mshonaji', 'washonaji', 'shona nguo'],
]

export const viwakilishi3: Generator = (rng, level) => {
  const [one, many, does] = rng.pick(WATU)
  const toMany = rng.next() < 0.5
  if (level === 1) {
    if (rng.next() < 0.6)
      return toMany
        ? choiceQ(level, `Wingi wa "${one}" ni ___.`, many, [one, `ma${one}`], `${one} → ${many}.`)
        : choiceQ(level, `Umoja wa "${many}" ni ___.`, one, [many, `ki${one.slice(1)}`], `${many} → ${one}.`)
    return toMany
      ? choiceQ(level, 'Wingi wa "yeye" ni ___.', 'wao', ['sisi', 'yule'], 'Yeye ni mmoja; wao ni wengi.')
      : choiceQ(level, 'Wingi wa "yule" ni ___.', 'wale', ['hawa', 'wao'], 'Yule ni mmoja; wale ni wengi.')
  }
  if (level === 2) {
    return toMany
      ? choiceQ(level, `${cap(many)} ___ wana${does}.`, 'wale', ['yule', 'yeye'], 'Wengi huchukua "wale".')
      : choiceQ(level, `${cap(one)} ___ ana${does}.`, 'yule', ['wale', 'wao'], 'Mmoja huchukua "yule".')
  }
  if (level === 3) {
    return toMany
      ? choiceQ(level, `Andika kwa wingi: Yeye ana${does}.`, `Wao wana${does}.`, [`Wao ana${does}.`, `Yeye wana${does}.`], 'Wingi: wao, na kitenzi wa-.')
      : choiceQ(level, `Andika kwa umoja: Wao wana${does}.`, `Yeye ana${does}.`, [`Yeye wana${does}.`, `Wao ana${does}.`], 'Umoja: yeye, na kitenzi a-.')
  }
  const s1 = `${cap(one)} yule ana${does}.`
  const s2 = `${cap(many)} wale wana${does}.`
  if (toMany)
    return choiceQ(level, `Andika kwa wingi: ${s1}`, s2, [`${cap(many)} yule wana${does}.`, `${cap(one)} wale ana${does}.`, `${cap(many)} wale ana${does}.`], 'Badilisha nomino, kionyeshi na kitenzi vyote.')
  return choiceQ(level, `Andika kwa umoja: ${s2}`, s1, [`${cap(one)} wale ana${does}.`, `${cap(many)} yule wana${does}.`, `${cap(one)} yule wana${does}.`], 'Badilisha nomino, kionyeshi na kitenzi vyote.')
}

// ── Hili na haya (LI-YA) ────────────────────────────────────────────────────

// [umoja, wingi, kitenzi kinachofaa (bila kiambishi)]
const LIYA: [string, string, string][] = [
  ['embe', 'maembe', 'meiva'],
  ['chungwa', 'machungwa', 'meiva'],
  ['tunda', 'matunda', 'meiva'],
  ['boga', 'maboga', 'meiva'],
  ['yai', 'mayai', 'mevunjika'],
  ['dirisha', 'madirisha', 'mevunjika'],
  ['sanduku', 'masanduku', 'mevunjika'],
  ['kabati', 'makabati', 'mevunjika'],
  ['jembe', 'majembe', 'mevunjika'],
  ['tawi', 'matawi', 'meanguka'],
  ['ua', 'maua', 'menyauka'],
  ['jani', 'majani', 'mekauka'],
  ['darasa', 'madarasa', 'mesafishwa'],
  ['gari', 'magari', 'mefika'],
  ['bega', 'mabega', 'nauma'],
  ['shavu', 'mashavu', 'nauma'],
]

export const ngeli3: Generator = (rng, level) => {
  const [one, many, verb] = rng.pick(LIYA)
  const sing = `${cap(one)} hili li${verb}.`
  const plur = `${cap(many)} haya ya${verb}.`
  switch (level) {
    case 1:
      return choiceQ(level, `${cap(one)} ___ li${verb}.`, 'hili', ['haya', 'huyu'], 'Umoja wa ngeli ya LI-YA huchukua "hili".')
    case 2:
      return choiceQ(level, `${cap(many)} ___ ya${verb}.`, 'haya', ['hili', 'hiki'], 'Wingi huchukua "haya".')
    case 3:
      return rng.next() < 0.5
        ? choiceQ(level, `Wingi wa "${one}" ni ___.`, many, [`vi${one}`, one, `wa${one}`], `${one} → ${many}: ongeza ma-.`)
        : choiceQ(level, `Umoja wa "${many}" ni ___.`, one, [`ki${one}`, many, `m${one}`], `${many} → ${one}.`)
    case 4:
      return choiceQ(level, `Andika kwa wingi: "${sing}"`, plur, [`${cap(many)} hili li${verb}.`, `${cap(one)} haya ya${verb}.`, `${cap(many)} haya li${verb}.`], 'Badilisha nomino, hili → haya na li- → ya-.')
    default:
      return rng.next() < 0.5
        ? choiceQ(level, `Andika kwa umoja: "${plur}"`, sing, [`${cap(one)} haya ya${verb}.`, `${cap(many)} hili li${verb}.`, `${cap(one)} hili ya${verb}.`], 'Badilisha nomino, haya → hili na ya- → li-.')
        : choiceQ(level, 'Chagua sentensi sahihi.', rng.next() < 0.5 ? sing : plur, [`${cap(one)} haya li${verb}.`, `${cap(many)} hili ya${verb}.`, `${cap(one)} hili ya${verb}.`], 'Nomino, kionyeshi na kitenzi lazima vikubaliane.')
  }
}

// ── Miezi ya mwaka ──────────────────────────────────────────────────────────

const MIEZI = ['Januari', 'Februari', 'Machi', 'Aprili', 'Mei', 'Juni', 'Julai', 'Agosti', 'Septemba', 'Oktoba', 'Novemba', 'Desemba']
const NAMBARI = ['kwanza', 'pili', 'tatu', 'nne', 'tano', 'sita', 'saba', 'nane', 'tisa', 'kumi', 'kumi na moja', 'kumi na mbili']

const miezi: Generator = (rng, level) => {
  const i = rng.int(0, 11)
  const near = (j: number) => [MIEZI[(j + 11) % 12], MIEZI[(j + 1) % 12], MIEZI[(j + 2) % 12], MIEZI[(j + 10) % 12]]
  if (level <= 2) return choiceQ(level, `Mwezi wa ${NAMBARI[i]} wa mwaka ni ___.`, MIEZI[i], near(i).slice(0, level === 1 ? 2 : 3), `${MIEZI[i]} ni mwezi wa ${NAMBARI[i]}.`)
  if (level === 3) {
    const j = (i + 1) % 12
    return choiceQ(level, `Mwezi unaofuata ${MIEZI[i]} ni ___.`, MIEZI[j], [MIEZI[(i + 11) % 12], MIEZI[(i + 2) % 12], MIEZI[i]], `Baada ya ${MIEZI[i]} huja ${MIEZI[j]}.`)
  }
  if (level === 4) {
    const j = (i + 11) % 12
    return choiceQ(level, `Mwezi unaokuja kabla ya ${MIEZI[i]} ni ___.`, MIEZI[j], [MIEZI[(i + 1) % 12], MIEZI[(i + 10) % 12], MIEZI[i]], `Kabla ya ${MIEZI[i]} ni ${MIEZI[j]}.`)
  }
  const k = rng.int(2, 3)
  const j = (i + k) % 12
  return choiceQ(level, `Leo ni mwezi wa ${MIEZI[i]}. Baada ya miezi ${k === 2 ? 'miwili' : 'mitatu'} itakuwa mwezi wa ___.`, MIEZI[j], [MIEZI[(j + 11) % 12], MIEZI[(j + 1) % 12], MIEZI[(i + 1) % 12]], `Hesabu miezi ${k} baada ya ${MIEZI[i]}: ${MIEZI[j]}.`)
}

const vifaaNaKazi = factGenerator({
  pairs: [
    {
      pairs: [
        ['ufagio', 'kufagia'],
        ['kifyekeo', 'kufyeka nyasi'],
        ['dodoki', 'kujisugua mwili tunapooga'],
        ['shoka', 'kukata kuni'],
        ['sindano', 'kushona nguo'],
        ['jembe', 'kulima shamba'],
        ['kalamu', 'kuandika'],
        ['mwiko', 'kusonga ugali'],
        ['chanuo', 'kuchana nywele'],
      ],
      ask: (a) => `Tunatumia ${a} ___.`,
      askBack: (b) => `Kifaa kipi kinatumika ${b}?`,
    },
    {
      pairs: [
        ['mwalimu', 'hufundisha wanafunzi'],
        ['daktari', 'hutibu wagonjwa'],
        ['dobi', 'hufua nguo'],
        ['seremala', 'hutengeneza meza na viti'],
        ['mkulima', 'hulima shamba'],
        ['mvuvi', 'huvua samaki'],
        ['mlinzi', 'hulinda mali'],
        ['mpishi', 'hupika chakula'],
        ['mshonaji', 'hushona nguo'],
      ],
      ask: (a) => `Kazi ya ${a} ni ipi? Yeye ___.`,
      askBack: (b) => `Ni nani ${b}?`,
    },
  ],
})

export const msamiati3: Generator = (rng, level) => (rng.next() < 0.4 ? miezi(rng, level) : vifaaNaKazi(rng, level))

// ── Maamkuzi, sauti na kinyume (kutoka majedwali) ───────────────────────────

export const maamkuzi3 = factGenerator({
  pairs: [
    {
      pairs: [
        ['Shikamoo', 'Marahaba'],
        ['Hujambo?', 'Sijambo'],
        ['Hamjambo?', 'Hatujambo'],
        ['Habari za asubuhi?', 'Nzuri'],
        ['Asante', 'Karibu'],
        ['Pole', 'Asante'],
        ['Kwaheri', 'Kwaheri ya kuonana'],
        ['Lala salama', 'Nawe pia'],
        ['Karibu nyumbani', 'Asante, nimekaribia'],
      ],
      ask: (a) => `Ukiambiwa "${a}", unajibu ___.`,
      askBack: (b) => `"${b}" ni jibu la salamu ipi?`,
    },
    {
      pairs: [
        ['ukimkosea mtu', 'Samahani'],
        ['rafiki yako akianguka', 'Pole'],
        ['rafiki yako akipita mtihani', 'Hongera'],
        ['ukipewa zawadi', 'Asante'],
        ['ukimsalimia mzee', 'Shikamoo'],
        ['mnapoachana', 'Kwaheri'],
      ],
      ask: (a) => `Unasema nini ${a}?`,
    },
  ],
})

export const sauti3 = factGenerator({
  wording: {
    which: (c) => `Neno lipi lina sauti ${c.one}?`,
    not: (c) => `Neno lipi HALINA sauti ${c.one}?`,
    group: (c) => `Kundi lipi lina maneno yenye sauti ${c.one} pekee?`,
  },
  categories: [
    { one: '"ch"', many: '"ch"', items: ['chai', 'chakula', 'chumba', 'chungwa', 'kichwa', 'mchele', 'chura', 'chupa'] },
    { one: '"sh"', many: '"sh"', items: ['shamba', 'shule', 'shati', 'shangazi', 'kushona', 'shoka', 'mshumaa', 'shingo'] },
    { one: '"ny"', many: '"ny"', items: ['nyumba', 'nyanya', 'nyota', 'nyama', 'nyoka', 'nyati', 'nyuki', 'nywele'] },
    { one: `"ng'"`, many: `"ng'"`, items: ["ng'ombe", "ng'ambo", "ng'oa", "ng'ara", "ng'ata"] },
    { one: '"dh"', many: '"dh"', items: ['dhahabu', 'dhoruba', 'dhambi', 'dhaifu', 'adhuhuri'] },
    { one: '"th"', many: '"th"', items: ['thelathini', 'thamani', 'themanini', 'thurea', 'hadithi'] },
    { one: '"gh"', many: '"gh"', items: ['ghali', 'ghorofa', 'ghafla', 'ghala', 'lugha'] },
  ],
})

export const kinyume3 = factGenerator({
  pairs: [
    {
      pairs: [
        ['juu', 'chini'],
        ['kubwa', 'ndogo'],
        ['cheka', 'lia'],
        ['peleka', 'leta'],
        ['nunua', 'uza'],
        ['fungua', 'funga'],
        ['ingia', 'toka'],
        ['safi', 'chafu'],
        ['mchana', 'usiku'],
        ['zito', 'jepesi'],
        ['tajiri', 'maskini'],
        ['refu', 'fupi'],
        ['karibu', 'mbali'],
        ['ndani', 'nje'],
        ['simama', 'keti'],
        ['jibu', 'uliza'],
        ['mbele', 'nyuma'],
        ['washa', 'zima'],
        ['panda', 'shuka'],
        ['jana', 'kesho'],
      ],
      ask: (a) => `Kinyume cha "${a}" ni ___.`,
      askBack: (b) => `Neno lipi ni kinyume cha "${b}"?`,
    },
  ],
})

export const KISWAHILI3_GRAMMAR: Record<string, Generator> = {
  'tk-kanusha': kanusha3,
  'tk-viwakilishi': viwakilishi3,
  'tk-ngeli': ngeli3,
  'tk-msamiati': msamiati3,
  'tk-maamkuzi': maamkuzi3,
  'tk-sauti': sauti3,
  'tk-kinyume': kinyume3,
}
