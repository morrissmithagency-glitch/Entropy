// Shughuli za Kiswahili, Gredi ya 2. Maswali hutengenezwa kutoka kwa majedwali madogo
// yaliyokaguliwa: salamu, msamiati, silabi, umoja na wingi (KI-VI, M-WA), viulizi na kinyume.
import { factGenerator } from '../facts'
import { uid } from '../helpers'
import type { BankQuestion, ChoiceQuestion, Generator, Level, OrderQuestion } from '../types'
import { passage } from './english'
import { kinyume3 } from './kiswahili3-grammar'

const q = (level: Level, prompt: string, answer: string, wrong: string[], explain?: string): ChoiceQuestion => ({
  id: uid('ksw2'),
  type: 'choice',
  level,
  prompt,
  options: [answer, ...[...new Set(wrong)].filter((w) => w !== answer)].map((l) => ({ id: l, label: l })),
  answer,
  explain,
})
const cap = (s: string) => s[0].toUpperCase() + s.slice(1)

const SW_WORDING = {
  which: (c: { one: string }) => `Neno lipi ni ${c.one}?`,
  not: (c: { one: string }) => `Neno lipi SI ${c.one}?`,
  group: (c: { many: string }) => `Kundi lipi lina ${c.many} pekee?`,
}

// ── Salamu ──────────────────────────────────────────────────────────────────

export const salamu2 = factGenerator({
  pairs: [
    {
      pairs: [
        ['Hujambo?', 'Sijambo'],
        ['Hamjambo?', 'Hatujambo'],
        ['Shikamoo', 'Marahaba'],
        ['Habari yako?', 'Nzuri'],
        ['Asante', 'Karibu'],
        ['Kwaheri', 'Kwaheri'],
      ],
      ask: (a) => `Ukiambiwa "${a}", unajibu ___.`,
    },
    {
      pairs: [
        ['asubuhi', 'Habari za asubuhi?'],
        ['mchana', 'Habari za mchana?'],
        ['jioni', 'Habari za jioni?'],
        ['usiku tunapoenda kulala', 'Usiku mwema'],
      ],
      ask: (a) => `Tunasalimiana vipi ${a}?`,
      askBack: (b) => `Tunasema "${b}" wakati gani?`,
    },
    {
      pairs: [
        ['ukipewa zawadi', 'Asante'],
        ['ukimkanyaga mtu', 'Samahani'],
        ['rafiki akianguka', 'Pole'],
        ['ukiondoka kwenda nyumbani', 'Kwaheri'],
        ['ukimwona bibi', 'Shikamoo'],
        ['mgeni akifika nyumbani', 'Karibu'],
      ],
      ask: (a) => `Unasema nini ${a}?`,
    },
  ],
})

// ── Msamiati ────────────────────────────────────────────────────────────────

const NAMBARI: [string, string][] = [
  ['1', 'moja'],
  ['2', 'mbili'],
  ['3', 'tatu'],
  ['4', 'nne'],
  ['5', 'tano'],
  ['6', 'sita'],
  ['7', 'saba'],
  ['8', 'nane'],
  ['9', 'tisa'],
  ['10', 'kumi'],
  ['11', 'kumi na moja'],
  ['12', 'kumi na mbili'],
  ['15', 'kumi na tano'],
  ['20', 'ishirini'],
]

export const msamiati2 = factGenerator({
  wording: SW_WORDING,
  categories: [
    { one: 'mtu wa familia', many: 'watu wa familia', items: ['baba', 'mama', 'kaka', 'dada', 'bibi', 'babu', 'shangazi'] },
    { one: 'sehemu ya mwili', many: 'sehemu za mwili', items: ['kichwa', 'mkono', 'mguu', 'jicho', 'sikio', 'pua', 'mdomo'] },
    { one: 'mnyama', many: 'wanyama', items: ['mbuzi', "ng'ombe", 'kuku', 'paka', 'mbwa', 'simba', 'twiga'] },
    { one: 'rangi', many: 'rangi', items: ['nyekundu', 'njano', 'kijani', 'bluu', 'nyeusi', 'nyeupe'] },
    { one: 'tunda', many: 'matunda', items: ['embe', 'chungwa', 'ndizi', 'papai', 'nanasi', 'pera'] },
  ],
  pairs: [
    {
      pairs: NAMBARI,
      ask: (a) => `Nambari ${a} kwa maneno ni ___.`,
      askBack: (b) => `"${cap(b)}" ni nambari ipi?`,
    },
    {
      pairs: [
        ['jicho', 'kuona'],
        ['sikio', 'kusikia'],
        ['pua', 'kunusa'],
        ['mdomo', 'kula na kuongea'],
        ['mguu', 'kutembea'],
        ['mkono', 'kushika'],
      ],
      ask: (a) => `Tunatumia ${a} ___.`,
      askBack: (b) => `Tunatumia sehemu gani ya mwili ${b}?`,
    },
  ],
})

// ── Silabi ──────────────────────────────────────────────────────────────────

const WORDS: string[][] = [
  ['ba', 'ba'],
  ['ma', 'ma'],
  ['ku', 'ku'],
  ['ka', 'ka'],
  ['da', 'da'],
  ['pa', 'ka'],
  ['ki', 'ti'],
  ['ga', 'ri'],
  ['ma', 'ji'],
  ['tu', 'nda'],
  ['ka', 'la', 'mu'],
  ['ki', 'ta', 'bu'],
  ['ki', 'ko', 'mbe'],
  ['ki', 'ji', 'ko'],
  ['ba', 'ra', 'ba', 'ra'],
  ['nya', 'nya'],
  ['ndi', 'zi'],
  ['ma', 'ya', 'i'],
  ['sa', 'ma', 'ki'],
  ['me', 'za'],
  ['wa', 'li'],
  ['ki', 'su'],
  ['ji', 'ko'],
  ['ki', 'ta', 'nda'],
  ['ki', 'pe', 'pe', 'o'],
  ['sa', 'ha', 'ni'],
  ['mwa', 'li', 'mu'],
  ['ra', 'fi', 'ki'],
  ['ki', 'a', 'tu'],
  ['cha', 'ku', 'la'],
  ['ba', 'ku', 'li'],
  ['ki', 'si', 'ma'],
  ['di', 'ri', 'sha'],
]

const NAMBA = ['sifuri', 'moja', 'mbili', 'tatu', 'nne', 'tano']

export const silabi2: Generator = (rng, level) => {
  const parts = rng.pick(WORDS)
  const word = parts.join('')
  switch (level) {
    case 1: {
      const others = rng.sample(WORDS.filter((w) => w[0] !== parts[0]).map((w) => w[0]), 2)
      return q(level, `Neno "${word}" linaanza na silabi ipi?`, parts[0], others, `${parts.join(' - ')}`)
    }
    case 2: {
      const shown = parts.join(' + ')
      const wrong = [parts.slice().reverse().join(''), parts[0] + parts[0], word.slice(0, -1)]
      return q(level, `Unganisha silabi: ${shown} = ?`, word, wrong, `${shown} = ${word}`)
    }
    case 3: {
      const i = rng.int(0, parts.length - 1)
      const shown = parts.map((p, k) => (k === i ? '__' : p)).join('')
      const wrong = rng.sample([...new Set(WORDS.flat())].filter((x) => x !== parts[i]), 3)
      return q(level, `Silabi ipi inakosekana? ${shown} (${word})`, parts[i], wrong, `${parts.join(' - ')}`)
    }
    case 4:
      return q(level, `Neno "${word}" lina silabi ngapi?`, NAMBA[parts.length], NAMBA.filter((_, k) => k !== parts.length && k > 0).slice(0, 3), `${parts.join(' - ')}: silabi ${NAMBA[parts.length]}.`)
    default: {
      const long = WORDS.filter((w) => w.length >= 3)
      const p = rng.pick(long)
      const o: OrderQuestion = { id: uid('silabi2'), type: 'order', level, prompt: 'Panga silabi uunde neno.', tiles: rng.shuffle([...p]), answer: [...p], joiner: '', explain: p.join(' - ') }
      return new Set(p).size === p.length ? o : q(level, `Neno "${p.join('')}" lina silabi ngapi?`, NAMBA[p.length], NAMBA.filter((_, k) => k !== p.length && k > 0).slice(0, 3))
    }
  }
}

// ── Tahajia ─────────────────────────────────────────────────────────────────

const TAHAJIA = ['kiti', 'meza', 'mama', 'baba', 'kuku', 'paka', 'gari', 'maji', 'kalamu', 'kitabu', 'shule', 'nyumba', 'samaki', 'ndizi', 'mbuzi', 'jiko', 'sufuria', 'mwalimu', 'rafiki', 'chai']

export const tahajia2: Generator = (rng, level) => {
  const w = rng.pick(level === 1 ? TAHAJIA.filter((x) => x.length <= 5) : TAHAJIA)
  if (level <= 2) {
    const i = level === 1 ? rng.pick([0, w.length - 1]) : rng.int(1, w.length - 1)
    const missing = w[i]
    const shown = w.slice(0, i) + '_' + w.slice(i + 1)
    const wrong = rng.sample(('aeiou'.includes(missing) ? 'aeiou' : 'bdgkmnpst').split('').filter((x) => x !== missing), 2)
    return q(level, `Herufi ipi inakosekana? ${shown}`, missing, wrong, `Neno ni "${w}".`)
  }
  const swap = w[0] + w[2] + w[1] + w.slice(3)
  const wrong = [swap, w.slice(0, -1), w.replace(/[aeiou]/, (c) => (c === 'a' ? 'e' : 'a'))].filter((x) => x !== w)
  return q(level, 'Neno lipi limeandikwa sawa?', w, wrong, `Tamka polepole: ${w}.`)
}

// ── Umoja na wingi ──────────────────────────────────────────────────────────

// KI-VI: [umoja, wingi]
const KIVI: [string, string][] = [
  ['kiti', 'viti'],
  ['kitabu', 'vitabu'],
  ['kikombe', 'vikombe'],
  ['kijiko', 'vijiko'],
  ['kiatu', 'viatu'],
  ['kisu', 'visu'],
  ['kitanda', 'vitanda'],
  ['kidole', 'vidole'],
]
// M-WA: [umoja, wingi]
const MWA: [string, string][] = [
  ['mtoto', 'watoto'],
  ['mwalimu', 'walimu'],
  ['mkulima', 'wakulima'],
  ['mpishi', 'wapishi'],
  ['mgeni', 'wageni'],
  ['mzee', 'wazee'],
  ['mtu', 'watu'],
]

export const umoja2: Generator = (rng, level) => {
  const ki = rng.next() < 0.5
  const [one, many] = rng.pick(ki ? KIVI : MWA)
  switch (level) {
    case 1:
      return q(level, `Wingi wa "${one}" ni ___.`, many, ki ? [`ma${one}`, one] : [`ma${one.slice(1)}`, one], `${one} → ${many}.`)
    case 2:
      return q(level, `Umoja wa "${many}" ni ___.`, one, [many, ki ? `ma${one.slice(2)}` : `ki${one.slice(1)}`], `${many} → ${one}.`)
    case 3:
      return ki
        ? q(level, `${cap(many)} ___ ni vizuri.`, 'hivi', ['hiki', 'hawa'], 'Wingi wa KI-VI: hivi.')
        : q(level, `${cap(many)} ___ ni wazuri.`, 'hawa', ['huyu', 'hivi'], 'Wingi wa watu: hawa.')
    case 4:
      return ki
        ? q(level, `Andika kwa wingi: ${cap(one)} hiki ni kizuri.`, `${cap(many)} hivi ni vizuri.`, [`${cap(many)} hiki ni kizuri.`, `${cap(one)} hivi ni vizuri.`, `${cap(many)} hivi ni kizuri.`], 'Badilisha kila neno: ki → vi.')
        : q(level, `Andika kwa wingi: ${cap(one)} huyu ni mzuri.`, `${cap(many)} hawa ni wazuri.`, [`${cap(many)} huyu ni mzuri.`, `${cap(one)} hawa ni wazuri.`, `${cap(many)} hawa ni mzuri.`], 'Badilisha kila neno: m → wa.')
    default:
      return ki
        ? q(level, `Andika kwa umoja: ${cap(many)} hivi ni vikubwa.`, `${cap(one)} hiki ni kikubwa.`, [`${cap(one)} hivi ni vikubwa.`, `${cap(many)} hiki ni kikubwa.`, `${cap(one)} hiki ni vikubwa.`], 'Badilisha kila neno: vi → ki.')
        : q(level, `Andika kwa umoja: ${cap(many)} hawa ni warefu.`, `${cap(one)} huyu ni mrefu.`, [`${cap(one)} hawa ni warefu.`, `${cap(many)} huyu ni mrefu.`, `${cap(one)} huyu ni warefu.`], 'Badilisha kila neno: wa → m.')
  }
}

// ── Maswali (viulizi) ───────────────────────────────────────────────────────

export const viulizi2 = factGenerator({
  pairs: [
    {
      pairs: [
        ['___ ni mwalimu wako?', 'Nani'],
        ['___ amekuja nyumbani?', 'Nani'],
        ['Unakula ___?', 'nini'],
        ['Mfuko una ___?', 'nini'],
        ['Unaishi ___?', 'wapi'],
        ['Kalamu yangu iko ___?', 'wapi'],
        ['Utaenda shuleni ___?', 'lini'],
        ['Mvua itanyesha ___?', 'lini'],
        ['Una miaka ___?', 'mingapi'],
        ['Una kalamu ___?', 'ngapi'],
      ],
      ask: (a) => `Jaza pengo: ${a}`,
    },
    {
      pairs: [
        ['nani', 'mtu'],
        ['nini', 'kitu'],
        ['wapi', 'mahali'],
        ['lini', 'wakati'],
        ['ngapi', 'idadi'],
      ],
      ask: (a) => `Neno "${a}" huuliza kuhusu ___.`,
      askBack: (b) => `Neno lipi huuliza kuhusu ${b}?`,
    },
  ],
})

// ── Ufahamu ─────────────────────────────────────────────────────────────────

export const UFAHAMU2: BankQuestion[] = [
  ...passage(1, 'Paka', 'Nina paka. Jina lake ni Pusi. Pusi ni mweupe. Anapenda maziwa.', [
    ['Jina la paka ni nani?', 'Pusi', ['Simba', 'Toto']],
    ['Pusi ana rangi gani?', 'nyeupe', ['nyeusi', 'kahawia']],
    ['Pusi anapenda nini?', 'maziwa', ['chai', 'maji']],
  ]),
  ...passage(1, 'Shuleni', 'Juma anaenda shuleni. Ana kitabu na kalamu. Mwalimu wake ni Bi. Neema.', [
    ['Juma anaenda wapi?', 'shuleni', ['sokoni', 'nyumbani']],
    ['Juma ana nini?', 'kitabu na kalamu', ['mpira na kikombe', 'viatu na kofia']],
    ['Mwalimu wa Juma ni nani?', 'Bi. Neema', ['Bw. Otieno', 'Mama']],
  ]),
  ...passage(2, 'Sokoni', 'Jumamosi, Mama alienda sokoni. Alinunua ndizi na machungwa. Alirudi nyumbani jioni.', [
    ['Mama alienda sokoni siku gani?', 'Jumamosi', ['Jumapili', 'Jumatatu']],
    ['Mama alinunua nini?', 'ndizi na machungwa', ['mkate na maziwa', 'nyama na samaki']],
    ['Mama alirudi lini?', 'jioni', ['asubuhi', 'usiku']],
  ]),
  ...passage(2, 'Mbwa wa Baraka', 'Baraka ana mbwa mweusi. Mbwa huyo hulinda nyumba usiku. Baraka humpa chakula kila jioni.', [
    ['Mbwa wa Baraka ana rangi gani?', 'nyeusi', ['nyeupe', 'kahawia']],
    ['Mbwa hulinda nini?', 'nyumba', ['shamba', 'shule']],
    ['Baraka humpa mbwa chakula lini?', 'kila jioni', ['kila asubuhi', 'Jumapili']],
  ]),
  ...passage(3, 'Mvua', 'Jana mvua kubwa ilinyesha. Watoto hawakucheza nje. Walikaa ndani na kusoma vitabu. Mama aliwapikia chai moto.', [
    ['Mvua ilinyesha lini?', 'jana', ['leo', 'kesho']],
    ['Kwa nini watoto hawakucheza nje?', 'mvua ilinyesha', ['walikuwa wagonjwa', 'walikuwa wamelala']],
    ['Watoto walifanya nini ndani?', 'walisoma vitabu', ['walipika', 'walilala']],
    ['Mama aliwapikia nini?', 'chai moto', ['wali', 'uji baridi']],
  ]),
  ...passage(4, 'Shamba la Mama', 'Mama ana shamba dogo nyuma ya nyumba. Analima sukuma wiki, nyanya na vitunguu. Kila asubuhi mimi humsaidia kumwagilia maji. Tunapovuna, tunauza baadhi ya mboga sokoni.', [
    ['Shamba la Mama liko wapi?', 'nyuma ya nyumba', ['karibu na shule', 'mjini']],
    ['Mama analima mboga ngapi?', 'tatu', ['mbili', 'nne']],
    ['Mtoto humsaidia Mama kufanya nini?', 'kumwagilia maji', ['kupika', 'kufagia']],
    ['Mboga nyingine hupelekwa wapi?', 'sokoni', ['shuleni', 'kanisani']],
  ]),
  ...passage(3, 'Kuku na Vifaranga', 'Bibi ana kuku mmoja mweupe. Kuku huyo ana vifaranga sita. Kila asubuhi Bibi huwapa mahindi. Mwewe akija, kuku huwaficha vifaranga chini ya mabawa yake.', [
    ['Kuku wa Bibi ana rangi gani?', 'nyeupe', ['nyeusi', 'kahawia']],
    ['Kuku ana vifaranga wangapi?', 'sita', ['watano', 'saba']],
    ['Bibi huwapa kuku nini?', 'mahindi', ['maziwa', 'mkate']],
    ['Kuku huwaficha vifaranga wapi?', 'chini ya mabawa yake', ['ndani ya nyumba', 'mtini']],
  ]),
  ...passage(4, 'Safari ya Mombasa', 'Wakati wa likizo, Halima na wazazi wake walisafiri kwenda Mombasa kwa gari moshi. Walifika asubuhi. Waliogelea baharini na kula samaki. Halima aliokota makombe mazuri ufukweni. Alirudi na zawadi kwa rafiki yake.', [
    ['Halima alisafiri kwenda wapi?', 'Mombasa', ['Kisumu', 'Nakuru']],
    ['Walisafiri kwa nini?', 'gari moshi', ['ndege', 'basi']],
    ['Walifika lini?', 'asubuhi', ['usiku', 'jioni']],
    ['Halima aliokota nini?', 'makombe', ['mawe', 'majani']],
    ['Zawadi ilikuwa ya nani?', 'rafiki yake', ['mwalimu wake', 'kaka yake']],
  ]),
  ...passage(5, 'Mti wa Mwembe', 'Babu alipanda mwembe miaka mingi iliyopita. Sasa ni mti mkubwa wenye kivuli kizuri. Watoto hucheza chini yake mchana. Wakati wa msimu, mwembe huzaa maembe mengi matamu. Babu huwagawia majirani maembe. Wote humshukuru Babu kwa kupanda mti huo.', [
    ['Nani alipanda mwembe?', 'Babu', ['Baba', 'Mama', 'watoto']],
    ['Watoto hufanya nini chini ya mti?', 'hucheza', ['hulala', 'hupika', 'husoma']],
    ['Mwembe huzaa nini?', 'maembe', ['machungwa', 'ndizi', 'mapapai']],
    ['Babu huwagawia nani maembe?', 'majirani', ['walimu', 'wanyama', 'wageni']],
    ['Kwa nini watu humshukuru Babu?', 'kwa kupanda mti', ['kwa kuuza maembe', 'kwa kukata mti', 'kwa kujenga nyumba']],
  ]),
  ...passage(5, 'Siku ya Kuzaliwa', 'Leo ni siku ya kuzaliwa ya Zawadi. Ametimiza miaka minane. Rafiki zake watano walikuja nyumbani. Walikula keki na kunywa sharubati. Baba alimpa Zawadi baiskeli mpya. Zawadi alifurahi sana na kusema, "Asanteni nyote!"', [
    ['Zawadi ametimiza miaka mingapi?', 'minane', ['saba', 'tisa', 'sita']],
    ['Rafiki wangapi walikuja?', 'watano', ['wanne', 'sita', 'watatu']],
    ['Walikula nini?', 'keki', ['wali', 'ugali', 'samaki']],
    ['Baba alimpa Zawadi nini?', 'baiskeli mpya', ['kitabu', 'mpira', 'nguo']],
    ['Zawadi alijisikiaje?', 'alifurahi sana', ['alihuzunika', 'alikasirika', 'aliogopa']],
  ]),
]

export const KISWAHILI2_GENERATORS: Record<string, Generator> = {
  'sk-salamu': salamu2,
  'sk-msamiati': msamiati2,
  'sk-silabi': silabi2,
  'sk-tahajia': tahajia2,
  'sk-umoja': umoja2,
  'sk-viulizi': viulizi2,
  'sk-kinyume': kinyume3,
}

export const KISWAHILI2_BANKS: Record<string, BankQuestion[]> = {
  'sk-ufahamu': UFAHAMU2,
}
