// Kiswahili Language Activities. Vocabulary and syllable questions are generated from
// a picture-word list; greetings and reading passages are hand-written.
import type { ArtId } from '../../components/art/objects'
import { choice, textOptions, uid } from '../helpers'
import type { BankQuestion, Generator, Level, Option } from '../types'
import { passage } from './english'

interface Neno {
  neno: string
  art: ArtId
  silabi: string[]
}

const s = (neno: string, art: ArtId, silabi: string) => ({ neno, art, silabi: silabi.split('-') })

export const MANENO: Neno[] = [
  s('kuku', 'hen', 'ku-ku'),
  s('paka', 'cat', 'pa-ka'),
  s('mbwa', 'dog', 'mbwa'),
  s('mbuzi', 'goat', 'mbu-zi'),
  s('ng\'ombe', 'cow', 'ng\'o-mbe'),
  s('samaki', 'fish', 'sa-ma-ki'),
  s('ndege', 'bird', 'nde-ge'),
  s('simba', 'lion', 'si-mba'),
  s('tembo', 'elephant', 'te-mbo'),
  s('twiga', 'giraffe', 'twi-ga'),
  s('pundamilia', 'zebra', 'pu-nda-mi-li-a'),
  s('embe', 'mango', 'e-mbe'),
  s('chungwa', 'orange', 'chu-ngwa'),
  s('ndizi', 'banana', 'ndi-zi'),
  s('yai', 'egg', 'ya-i'),
  s('nyanya', 'tomato', 'nya-nya'),
  s('mkate', 'bread', 'm-ka-te'),
  s('mpira', 'ball', 'm-pi-ra'),
  s('kitabu', 'book', 'ki-ta-bu'),
  s('kalamu', 'pencil', 'ka-la-mu'),
  s('kikombe', 'cup', 'ki-ko-mbe'),
  s('sahani', 'plate', 'sa-ha-ni'),
  s('kijiko', 'spoon', 'ki-ji-ko'),
  s('sufuria', 'pot', 'su-fu-ri-a'),
  s('kiti', 'chair', 'ki-ti'),
  s('kitanda', 'bed', 'ki-ta-nda'),
  s('nyumba', 'house', 'nyu-mba'),
  s('kiatu', 'shoe', 'ki-a-tu'),
  s('mti', 'tree', 'm-ti'),
  s('jani', 'leaf', 'ja-ni'),
  s('ua', 'flower', 'u-a'),
  s('jua', 'sun', 'ju-a'),
  s('mwezi', 'moon', 'mwe-zi'),
  s('nyota', 'star', 'nyo-ta'),
  s('mvua', 'rain', 'm-vu-a'),
  s('ngoma', 'drum', 'ngo-ma'),
  s('kengele', 'bell', 'ke-nge-le'),
  s('sabuni', 'soap', 'sa-bu-ni'),
  s('jiwe', 'stone', 'ji-we'),
]

const NAMBARI = ['sifuri', 'moja', 'mbili', 'tatu', 'nne', 'tano', 'sita', 'saba', 'nane', 'tisa', 'kumi']
const VOKALI = ['a', 'e', 'i', 'o', 'u']

const words = (xs: string[]): Option[] => xs.map((x) => ({ id: x, label: x }))

/** Msamiati: picture → word, word → picture, counting words. */
export const msamiati: Generator = (rng, level) => {
  const n = rng.pick(MANENO)
  if (level === 1) {
    const wrong = rng.sample(MANENO.filter((x) => x.art !== n.art), 2)
    const opts = rng.shuffle([n, ...wrong]).map((x) => ({ id: x.neno, art: x.art }))
    return choice('msamiati', level, 'Sikiliza. Chagua picha sahihi.', opts, n.neno, { say: n.neno, listen: true, explain: `Hii ni ${n.neno}.` })
  }
  if (level === 2) {
    const k = rng.int(1, 10)
    const art = rng.pick<ArtId>(['mango', 'egg', 'ball', 'star', 'fish'])
    return choice('msamiati', level, 'Hesabu. Ni ngapi?', textOptions(rng, NAMBARI[k], NAMBARI.slice(1).filter((x) => x !== NAMBARI[k]), 3), NAMBARI[k], {
      visual: { kind: 'count', art, n: k },
      explain: `Ni ${NAMBARI[k]} (${k}).`,
    })
  }
  if (level === 3) {
    const wrong = rng.sample(MANENO.filter((x) => x.art !== n.art), 3).map((x) => x.neno)
    return choice('msamiati', level, 'Hii ni nini?', textOptions(rng, n.neno, wrong, 4), n.neno, { visual: { kind: 'art', art: [n.art] }, explain: `Hii ni ${n.neno}.` })
  }
  if (level === 4) {
    const q = rng.pick<[string, string, string[]]>([
      ['Tunaona kwa …', 'macho', ['masikio', 'mikono', 'miguu']],
      ['Tunasikia kwa …', 'masikio', ['macho', 'pua', 'mdomo']],
      ['Tunanusa kwa …', 'pua', ['macho', 'miguu', 'mikono']],
      ['Tunatembea kwa …', 'miguu', ['masikio', 'macho', 'pua']],
      ['Tunaandika kwa …', 'mkono', ['mguu', 'sikio', 'jicho']],
      ['Rangi ya jua ni …', 'njano', ['nyeusi', 'kijani', 'bluu']],
      ['Rangi ya jani ni …', 'kijani', ['nyekundu', 'nyeupe', 'njano']],
      ['Rangi ya maziwa ni …', 'nyeupe', ['nyeusi', 'kijani', 'nyekundu']],
    ])
    return choice('msamiati', level, q[0], textOptions(rng, q[1], q[2], 4), q[1], { explain: `${q[0].replace('…', q[1])}.` })
  }
  const q = rng.pick<[string, string, string[]]>([
    ['Mnyama yupi ni wa porini?', 'simba', ['kuku', 'mbuzi', 'paka']],
    ['Mnyama yupi hutaga mayai?', 'kuku', ['ng\'ombe', 'mbuzi', 'mbwa']],
    ['Tunapata maziwa kutoka kwa …', 'ng\'ombe', ['kuku', 'mbwa', 'paka']],
    ['Tano na mbili ni ngapi?', 'saba', ['sita', 'nane', 'tano']],
    ['Kumi toa tatu ni ngapi?', 'saba', ['sita', 'tisa', 'nane']],
    ['Kipi si tunda?', 'mkate', ['embe', 'ndizi', 'chungwa']],
  ])
  return choice('msamiati', level, q[0], textOptions(rng, q[1], q[2], 4), q[1], { explain: `Jibu ni "${q[1]}".` })
}

/** Herufi na silabi. */
export const silabi: Generator = (rng, level) => {
  if (level === 1) {
    const v = rng.pick(VOKALI)
    return choice('silabi', level, 'Sikiliza. Chagua irabu.', words(rng.shuffle([v, ...rng.sample(VOKALI.filter((x) => x !== v), 2)])), v, { say: v, listen: true })
  }
  const two = MANENO.filter((x) => x.silabi.length >= 2)
  const n = rng.pick(two)
  const allSyl = [...new Set(MANENO.flatMap((x) => x.silabi))]
  if (level === 2) {
    const first = n.silabi[0]
    return choice('silabi', level, `Neno "${n.neno}" linaanza na silabi gani?`, textOptions(rng, first, allSyl, 3), first, {
      visual: { kind: 'art', art: [n.art] },
      say: n.neno,
      explain: `${n.silabi.join(' - ')}`,
    })
  }
  if (level === 3) {
    const i = rng.int(0, n.silabi.length - 1)
    const masked = n.silabi.map((x, j) => (j === i ? '__' : x)).join(' - ')
    return choice('silabi', level, `Jaza silabi inayokosekana: ${masked}`, textOptions(rng, n.silabi[i], allSyl, 4), n.silabi[i], {
      visual: { kind: 'art', art: [n.art] },
      explain: `${n.neno}: ${n.silabi.join(' - ')}`,
    })
  }
  if (level === 4) {
    const syl = rng.pick(['ma', 'ki', 'ba', 'ta', 'ku', 'sa'])
    const yes = MANENO.filter((x) => x.silabi[0] === syl)
    if (yes.length === 0) return silabi(rng, 3)
    const ans = rng.pick(yes)
    const wrong = rng.sample(MANENO.filter((x) => x.silabi[0] !== syl), 3).map((x) => x.neno)
    return choice('silabi', level, `Neno lipi linaanza na silabi "${syl}"?`, textOptions(rng, ans.neno, wrong, 4), ans.neno, { explain: `${ans.neno}: ${ans.silabi.join(' - ')}` })
  }
  const n3 = rng.pick(MANENO.filter((x) => x.silabi.length >= 3))
  const count = n3.silabi.length
  return choice('silabi', level, `Neno "${n3.neno}" lina silabi ngapi?`, textOptions(rng, String(count), ['2', '3', '4', '5'].filter((c) => c !== String(count)), 3), String(count), {
    say: n3.neno,
    explain: `${n3.silabi.join(' - ')}: silabi ${NAMBARI[count]}.`,
  })
}

/** Kuunda maneno: tap syllables in order. */
export const kuandika: Generator = (rng, level) => {
  const pool = MANENO.filter((x) => (level <= 2 ? x.silabi.length === 2 : level <= 4 ? x.silabi.length === 3 : x.silabi.length >= 3))
  const n = rng.pick(pool)
  if (level === 1) {
    const wrong = rng.sample(MANENO.filter((x) => x.neno !== n.neno), 2).map((x) => x.neno)
    return choice('andika', level, 'Chagua neno sahihi la picha hii.', textOptions(rng, n.neno, wrong, 3), n.neno, { visual: { kind: 'art', art: [n.art] } })
  }
  const extra = level >= 4 ? rng.sample([...new Set(MANENO.flatMap((x) => x.silabi))].filter((x) => !n.silabi.includes(x)), level === 5 ? 2 : 1) : []
  return {
    id: uid('andika'),
    type: 'order',
    level,
    prompt: level === 5 ? 'Sikiliza, kisha unda neno kwa silabi.' : 'Unda neno kwa kupanga silabi.',
    say: n.neno,
    listen: level === 5,
    visual: level === 5 ? undefined : { kind: 'art', art: [n.art] },
    tiles: rng.shuffle([...n.silabi, ...extra]),
    answer: n.silabi,
    joiner: '',
    explain: `${n.silabi.join(' - ')} = ${n.neno}`,
  }
}

const t = (level: Level, prompt: string, answer: string, wrong: string[]): BankQuestion => ({ type: 'choice', level, prompt, options: words([answer, ...wrong]), answer })

export const SALAMU: BankQuestion[] = [
  t(1, 'Mwalimu anasema "Habari ya asubuhi?" Unajibu …', 'Nzuri', ['Kwaheri', 'Asante']),
  t(1, 'Unapopewa zawadi unasema …', 'Asante', ['Pole', 'Kwaheri']),
  t(1, 'Tunaposema kwaheri tunaagana au tunasalimiana?', 'tunaagana', ['tunasalimiana', 'tunacheza']),
  t(2, 'Rafiki anasema "Hujambo?" Unajibu …', 'Sijambo', ['Hujambo', 'Asante sana']),
  t(2, 'Unamsalimia bibi kwa kusema …', 'Shikamoo', ['Marahaba', 'Kwaheri']),
  t(2, 'Mtu akisema "Asante" unajibu …', 'Karibu', ['Pole', 'Shikamoo']),
  t(3, 'Ukimkanyaga mwenzako kwa bahati mbaya unasema …', 'Samahani', ['Asante', 'Karibu']),
  t(3, 'Mtu mzima akisalimiwa "Shikamoo" hujibu …', 'Marahaba', ['Sijambo', 'Nzuri']),
  t(3, 'Unapoomba kitu unatumia neno …', 'tafadhali', ['kwaheri', 'samahani']),
  t(4, 'Mwalimu anauliza "Unaitwa nani?" Jibu sahihi ni …', 'Ninaitwa Amani.', ['Nina miaka sita.', 'Sijambo.', 'Asante.']),
  t(4, 'Mwenzako ameanguka na kuumia. Unamwambia …', 'Pole sana.', ['Hongera sana.', 'Karibu sana.', 'Kwaheri.']),
  t(4, 'Salamu ya jioni ni …', 'Habari ya jioni?', ['Habari ya asubuhi?', 'Usiku mwema', 'Lala salama']),
  t(5, 'Rafiki yako amepita mtihani. Unamwambia …', 'Hongera!', ['Pole!', 'Samahani!', 'Kwaheri!']),
  t(5, 'Unapoenda kulala unawaambia wazazi …', 'Usiku mwema.', ['Habari ya asubuhi.', 'Shikamoo.', 'Karibu.']),
  t(5, 'Neno lipi si la adabu?', 'Nyamaza!', ['Tafadhali', 'Asante', 'Samahani']),
]

export const UFAHAMU: BankQuestion[] = [
  t(1, 'Soma: "Paka ni mweusi." Paka ana rangi gani?', 'nyeusi', ['nyeupe', 'njano']),
  t(1, 'Soma: "Nina mpira." Nina nini?', 'mpira', ['kitabu', 'embe']),
  t(2, 'Soma: "Baba ana ng\'ombe wawili." Baba ana ng\'ombe wangapi?', 'wawili', ['mmoja', 'watatu']),
  t(2, 'Soma: "Kuku yuko chini ya meza." Kuku yuko wapi?', 'chini ya meza', ['juu ya meza', 'ndani ya sanduku']),
  ...passage(3, 'Juma na Embe', 'Juma ana embe. Embe ni tamu. Juma anampa dada yake nusu. Wote wanafurahi.', [
    ['Juma ana nini?', 'embe', ['ndizi', 'chungwa']],
    ['Embe ni …', 'tamu', ['chungu', 'chachu']],
    ['Juma anampa nani nusu?', 'dada yake', ['mama yake', 'mwalimu']],
  ]),
  ...passage(4, 'Sokoni', 'Jumamosi, Mama na Wanjiku walienda sokoni. Mama alinunua nyanya na vitunguu. Wanjiku alibeba kikapu. Kikapu kilikuwa kizito.', [
    ['Walienda sokoni siku gani?', 'Jumamosi', ['Jumatatu', 'Jumapili', 'Ijumaa']],
    ['Mama alinunua nini?', 'nyanya na vitunguu', ['embe na ndizi', 'mkate na maziwa', 'mayai na mahindi']],
    ['Nani alibeba kikapu?', 'Wanjiku', ['Mama', 'Baba', 'mwalimu']],
    ['Kikapu kilikuwa …', 'kizito', ['chepesi', 'kitupu', 'kidogo']],
  ]),
  ...passage(5, 'Kobe na Sungura', 'Kobe alitaka kufika ziwani. Alitembea polepole. Sungura alikimbia haraka na kumcheka Kobe. Sungura alichoka na kulala chini ya mti. Kobe hakusimama. Jioni, Kobe alifika ziwani kwanza.', [
    ['Kobe alitaka kwenda wapi?', 'ziwani', ['sokoni', 'shuleni', 'mtoni']],
    ['Nani alimcheka Kobe?', 'Sungura', ['Simba', 'Ndege', 'Mbuzi']],
    ['Sungura alilala wapi?', 'chini ya mti', ['juu ya mti', 'nyumbani', 'ziwani']],
    ['Nani alifika ziwani kwanza?', 'Kobe', ['Sungura', 'Simba', 'Twiga']],
  ]),
]

export const KISWAHILI_GENERATORS: Record<string, Generator> = {
  'k-msamiati': msamiati,
  'k-silabi': silabi,
  'k-kuandika': kuandika,
}

export const KISWAHILI_BANKS: Record<string, BankQuestion[]> = {
  'k-salamu': SALAMU,
  'k-ufahamu': UFAHAMU,
}
