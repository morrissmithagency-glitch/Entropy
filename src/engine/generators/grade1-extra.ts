// Extra Grade 1 question makers. Each is mixed into an existing Grade 1 sub-strand only at
// the levels where it was thin, so the original questions keep their place.
import type { ArtId } from '../../components/art/objects'
import { artName } from '../../components/art/objects'
import { factGenerator, type FactSet } from '../facts'
import { KENYAN_NAMES, choice, textOptions, uid } from '../helpers'
import type { BankQuestion, ChoiceQuestion, Generator, Level, NumberQuestion, OrderQuestion, ShapeKind } from '../types'
import { mech2, spell2 } from './english2'
import { passage } from './english'
import { msamiati2, salamu2, silabi2, tahajia2 } from './kiswahili2'
import { DAYS } from './math'

/** Use `extra` for about half the questions at the given levels; `base` otherwise. */
export const levelMix = (base: Generator, extra: Generator, levels: Level[], share = 0.5): Generator => (rng, level) =>
  levels.includes(level) && rng.next() < share ? extra(rng, level) : base(rng, level)

const num = (level: Level, prompt: string, answer: number, extra: Partial<NumberQuestion> = {}): NumberQuestion => ({ id: uid('g1x'), type: 'number', level, prompt, answer, ...extra })
const q = (level: Level, prompt: string, answer: string, wrong: string[], explain?: string): ChoiceQuestion => ({
  id: uid('g1x'),
  type: 'choice',
  level,
  prompt,
  options: [answer, ...[...new Set(wrong)].filter((w) => w !== answer)].map((l) => ({ id: l, label: l })),
  answer,
  explain,
})
const artOpts = (ids: ArtId[]) => ids.map((a) => ({ id: a, art: a }))
const an = (w: string) => `${'aeiou'.includes(w[0]) ? 'an' : 'a'} ${w}`

// ── Maths ───────────────────────────────────────────────────────────────────

export const length1: Generator = (rng, level) => {
  if (level === 1) {
    const [art, axis] = rng.pick<[ArtId, 'x' | 'y']>([
      ['pencil', 'x'],
      ['stick', 'x'],
      ['feather', 'x'],
      ['tree', 'y'],
      ['giraffe', 'y'],
      ['house', 'y'],
    ])
    const scales = rng.shuffle([0.55, 0.8, 1.05])
    const big = rng.next() < 0.5
    const target = big ? Math.max(...scales) : Math.min(...scales)
    const labels = ['A', 'B', 'C']
    const word = axis === 'x' ? (big ? 'longest' : 'shortest') : big ? 'tallest' : 'shortest'
    return choice('g1x', level, `Which ${artName(art)} is the ${word}?`, labels.map((l) => ({ id: l, label: l })), labels[scales.indexOf(target)], { visual: { kind: 'sizes', art, scales, axis, labels } })
  }
  if (rng.next() < 0.5) {
    const n = rng.int(2, 9)
    return num(level, 'How many paper clips long is the stick?', n, { visual: { kind: 'units', art: 'stick', unit: 'clip', n } })
  }
  const [x, y] = rng.sample(KENYAN_NAMES, 2)
  const a = rng.int(3, 12)
  let b = rng.int(3, 12)
  while (b === a) b = rng.int(3, 12)
  return choice('g1x', level, `${x}'s rope is ${a} steps long. ${y}'s rope is ${b} steps long. Whose rope is longer?`, [x, y].map((n) => ({ id: n, label: n })), a > b ? x : y)
}

const HEAVY_LIGHT: [ArtId, ArtId][] = [
  ['pumpkin', 'feather'],
  ['jerrycan', 'cup'],
  ['stone', 'leaf'],
  ['bucket', 'spoon'],
  ['book', 'pencil'],
  ['cow', 'hen'],
  ['elephant', 'cat'],
  ['bag', 'egg'],
]

export const mass1: Generator = (rng, level) => {
  const [heavy, light] = rng.pick(HEAVY_LIGHT)
  if (level <= 2) {
    const left = rng.next() < 0.5
    const askHeavy = rng.next() < 0.5
    return choice('g1x', level, `Which one is ${askHeavy ? 'heavier' : 'lighter'}?`, artOpts(rng.shuffle([heavy, light])), askHeavy ? heavy : light, {
      visual: { kind: 'balance', left: left ? heavy : light, right: left ? light : heavy, heavier: left ? 'left' : 'right' },
      explain: 'The heavier side goes down.',
    })
  }
  const askHeavy = rng.next() < 0.5
  return q(level, `Which is ${askHeavy ? 'heavier' : 'lighter'}: ${an(artName(heavy))} or ${an(artName(light))}?`, an(artName(askHeavy ? heavy : light)), [an(artName(askHeavy ? light : heavy))])
}

const BIG_SMALL: [string, string][] = [
  ['a jerrycan', 'a cup'],
  ['a bucket', 'a spoon'],
  ['a water tank', 'a jug'],
  ['a basin', 'a glass'],
  ['a drum', 'a bottle'],
  ['a sufuria', 'a teaspoon'],
  ['a bathtub', 'a bowl'],
]

export const capacity1: Generator = (rng, level) => {
  if (level === 1) {
    const [big, small] = rng.pick(BIG_SMALL)
    const more = rng.next() < 0.5
    return q(level, `Which holds ${more ? 'more' : 'less'} water: ${big} or ${small}?`, more ? big : small, [more ? small : big])
  }
  const [art, unit, big, smalls] = rng.pick<[ArtId, ArtId, string, string]>([
    ['jug', 'cup', 'jug', 'cups'],
    ['bucket', 'cup', 'bucket', 'cups'],
    ['basin', 'jug', 'basin', 'jugs'],
    ['jerrycan', 'jug', 'jerrycan', 'jugs'],
  ])
  const n = rng.int(2, 9)
  return num(level, `How many ${smalls} of water fill the ${big}?`, n, { visual: { kind: 'units', art, unit, n } })
}

const DAY_PARTS: FactSet = {
  categories: [
    { one: 'a thing we do in the morning', many: 'things we do in the morning', items: ['wake up', 'brush our teeth', 'eat breakfast', 'go to school', 'wash our face'] },
    { one: 'a thing we do at night', many: 'things we do at night', items: ['sleep', 'see the moon', 'say good night', 'eat supper', 'switch on the lamp'] },
  ],
}
const dayParts = factGenerator(DAY_PARTS)

export const time1: Generator = (rng, level) => {
  if (level === 1 && rng.next() < 0.5) return dayParts(rng, level)
  if (level === 1) {
    const h = rng.int(1, 12)
    return choice('g1x', level, 'What is the time?', textOptions(rng, `${h} o'clock`, [`${(h % 12) + 1} o'clock`, `${((h + 5) % 12) + 1} o'clock`]), `${h} o'clock`, { visual: { kind: 'clock', hour: h, minute: 0 } })
  }
  const i = rng.int(0, 6)
  const after = rng.next() < 0.5
  const ans = DAYS[after ? (i + 1) % 7 : (i + 6) % 7]
  return choice('g1x', level, `Which day comes ${after ? 'after' : 'before'} ${DAYS[i]}?`, textOptions(rng, ans, DAYS), ans)
}

const COINS = [1, 5, 10, 20, 50, 100]
export const money1: Generator = (rng, level) => {
  if (level === 1) {
    const v = rng.pick(COINS)
    if (rng.next() < 0.5) return num(level, 'How many shillings is this?', v, { visual: { kind: 'money', values: [v] } })
    const [a, b] = rng.sample(COINS, 2)
    const sh = (x: number) => `${x} ${x === 1 ? 'shilling' : 'shillings'}`
    return choice('g1x', level, `Which is worth more: ${sh(a)} or ${sh(b)}?`, [a, b].map((x) => ({ id: String(x), label: sh(x) })), String(Math.max(a, b)))
  }
  const values = [rng.pick([1, 5, 10, 20]), rng.pick([1, 5, 10])].sort((x, y) => y - x)
  return num(level, 'How many shillings altogether?', values[0] + values[1], { visual: { kind: 'money', values } })
}

export const lines1: Generator = (rng, level) => {
  if (level <= 2) {
    const curved = rng.next() < 0.5
    const lines = rng.shuffle(curved ? ['curved', 'straight', 'straight'] : ['straight', 'curved', 'curved']) as ('straight' | 'curved')[]
    const labels = ['A', 'B', 'C']
    return choice('g1x', level, `Which line is ${curved ? 'CURVED' : 'STRAIGHT'}?`, labels.map((l) => ({ id: l, label: l })), labels[lines.indexOf(curved ? 'curved' : 'straight')], { visual: { kind: 'lines', lines, variant: rng.int(0, 3) } })
  }
  const n = rng.int(3, 5)
  const lines = Array.from({ length: n }, () => (rng.next() < 0.5 ? 'straight' : 'curved')) as ('straight' | 'curved')[]
  const ask = lines.includes('straight') && (rng.next() < 0.5 || !lines.includes('curved')) ? 'straight' : 'curved'
  return num(level, `How many ${ask} lines are there?`, lines.filter((l) => l === ask).length, { visual: { kind: 'lines', lines, variant: rng.int(0, 3) } })
}

const SHAPE_OF: [string, ShapeKind][] = [
  ['a coin', 'circle'],
  ['a clock face', 'circle'],
  ['a plate', 'circle'],
  ['a door', 'rectangle'],
  ['a book', 'rectangle'],
  ['a samosa', 'triangle'],
  ['a floor tile', 'square'],
  ['an egg', 'oval'],
  ['a window pane', 'square'],
  ['a mandazi cut corner to corner', 'triangle'],
  ['a blackboard', 'rectangle'],
  ['a road sign that says give way', 'triangle'],
  ['a handkerchief', 'square'],
  ['a rugby ball', 'oval'],
  ['the top of a cup', 'circle'],
]
const COLORS = ['#e0876a', '#5fa39a', '#e9c46a', '#6c8ebf']
export const shapes1: Generator = (rng, level) => {
  if (level <= 3) {
    const [thing, shape] = rng.pick(SHAPE_OF)
    return choice('g1x', level, `${thing[0].toUpperCase()}${thing.slice(1)} has the shape of a ___.`, textOptions(rng, shape, ['circle', 'triangle', 'rectangle', 'square', 'oval']), shape)
  }
  const k = rng.pick<ShapeKind>(['triangle', 'square', 'rectangle'])
  const c = rng.int(2, 4)
  const per = k === 'triangle' ? 3 : 4
  const ask = rng.pick(['sides', 'corners'])
  return num(level, `How many ${ask} do these ${c} ${k}s have altogether?`, c * per, { visual: { kind: 'shapes', shapes: Array.from({ length: c }, (_, i) => ({ kind: k, color: COLORS[i % 4] })) } })
}

// ── English ─────────────────────────────────────────────────────────────────

export const polite1 = factGenerator({
  pairs: [
    {
      pairs: [
        ['someone gives you a sweet', '"Thank you."'],
        ['you step on a friend\'s foot', '"Sorry."'],
        ['you want to borrow a crayon', '"Please, may I have a crayon?"'],
        ['you meet your teacher in the morning', '"Good morning, teacher."'],
        ['you leave for home', '"Goodbye."'],
        ['someone says "Thank you"', '"You are welcome."'],
        ['you want to pass', '"Excuse me."'],
        ['you go to bed', '"Good night."'],
      ],
      ask: (a) => `What do you say when ${a}?`,
    },
    {
      pairs: [
        ['in the morning', '"Good morning."'],
        ['in the afternoon', '"Good afternoon."'],
        ['in the evening', '"Good evening."'],
      ],
      ask: (a) => `How do we greet people ${a}?`,
      askBack: (b) => `When do we say ${b}?`,
    },
  ],
})

const FIRST: ArtId[] = ['mango', 'orange', 'banana', 'egg', 'tomato', 'pencil', 'book', 'ball', 'cup', 'goat', 'cow', 'hen', 'fish', 'bird', 'tree', 'flower', 'star', 'shoe', 'drum', 'leaf']
export const firstSound1: Generator = (rng, level) => {
  const ans = rng.pick(FIRST)
  const letter = artName(ans)[0]
  const wrong = rng.sample(FIRST.filter((x) => artName(x)[0] !== letter), 2)
  return choice('g1x', level, `Which picture starts with the sound "${letter}"?`, artOpts(rng.shuffle([ans, ...wrong])), ans, { say: `Which picture starts with the sound ${letter}?` })
}

const ABC = 'abcdefghijklmnopqrstuvwxyz'
const RHYME: string[][] = [
  ['cat', 'hat', 'mat', 'bat'],
  ['pen', 'hen', 'ten'],
  ['dog', 'log', 'frog'],
  ['sun', 'run', 'fun'],
  ['bed', 'red', 'fed'],
  ['pig', 'big', 'dig'],
  ['cake', 'lake', 'bake'],
  ['ring', 'king', 'sing'],
]
export const letters1: Generator = (rng, level) => {
  if (level === 1) {
    const i = rng.int(0, 24)
    return q(level, `Which letter comes after "${ABC[i]}"?`, ABC[i + 1], [ABC[(i + 5) % 26], ABC[(i + 13) % 26]])
  }
  if (level === 4) {
    const fam = rng.pick(RHYME)
    const [a, b] = rng.sample(fam, 2)
    return q(level, `Which word rhymes with "${a}"?`, b, rng.sample(RHYME.filter((f) => f !== fam).flat(), 2))
  }
  const i = rng.int(1, 23)
  const shown = `${ABC[i - 1]}  ${ABC[i]}  _  ${ABC[i + 2]}`
  return q(level, `Which letter is missing? ${shown}`, ABC[i + 1], [ABC[(i + 7) % 26], ABC[(i + 15) % 26], ABC[i + 2]])
}

const SIGHT: [string, string, string[]][] = [
  ['I ___ a red ball.', 'have', ['has', 'he']],
  ['___ is my mother.', 'She', ['Is', 'Her']],
  ['We ___ going to school.', 'are', ['is', 'am']],
  ['I ___ six years old.', 'am', ['are', 'is']],
  ['Look ___ the bird!', 'at', ['on', 'it']],
  ['This ___ my book.', 'is', ['are', 'am']],
  ['Come ___ me.', 'with', ['was', 'what']],
  ['The cat is ___ the box.', 'in', ['an', 'is']],
  ['I can ___ a dog.', 'see', ['sea', 'so']],
  ['Where ___ my shoes?', 'are', ['is', 'am']],
  ['My dog ___ big.', 'is', ['are', 'am']],
  ['___ you like mangoes?', 'Do', ['Does', 'Did not']],
  ['Give it ___ me.', 'to', ['two', 'too much']],
  ['He ___ a cup of tea.', 'has', ['have', 'had to']],
  ['They ___ playing.', 'are', ['is', 'am']],
  ['We go to school ___ Monday.', 'on', ['in', 'at']],
]
export const sight1: Generator = (rng, level) => {
  const [s, ans, wrong] = rng.pick(SIGHT)
  return q(level, `Choose the right word: ${s}`, ans, wrong)
}

const NAMING_ACTION: [string, string, string][] = [
  ['The dog runs.', 'dog', 'runs'],
  ['A bird flies.', 'bird', 'flies'],
  ['Mama cooks.', 'Mama', 'cooks'],
  ['The baby sleeps.', 'baby', 'sleeps'],
  ['Fish swim.', 'Fish', 'swim'],
  ['The cow eats.', 'cow', 'eats'],
  ['Juma jumps.', 'Juma', 'jumps'],
  ['The girl sings.', 'girl', 'sings'],
  ['A hen clucks.', 'hen', 'clucks'],
  ['The boy reads.', 'boy', 'reads'],
  ['Baba digs.', 'Baba', 'digs'],
  ['The cat drinks.', 'cat', 'drinks'],
]
export const naming1: Generator = (rng, level) => {
  const [s, noun, verb] = rng.pick(NAMING_ACTION)
  const askAction = rng.next() < 0.5
  return q(level, `Which is the ${askAction ? 'action' : 'naming'} word?\n${s}`, askAction ? verb : noun, [askAction ? noun : verb, s.split(' ')[0] === noun ? 'the' : s.split(' ')[0]].filter((x) => x !== (askAction ? verb : noun)))
}

const A_AN: string[] = ['apple', 'egg', 'orange', 'umbrella', 'ant', 'elephant', 'ear', 'owl', 'insect', 'ox', 'banana', 'cup', 'goat', 'pen', 'mango', 'dog', 'book', 'hat', 'tree', 'ball']
export const grammar1: Generator = (rng, level) => {
  if (rng.next() < 0.6) {
    const w = rng.pick(A_AN)
    const ans = 'aeiou'.includes(w[0]) ? 'an' : 'a'
    return q(level, `Choose: ___ ${w}`, ans, [ans === 'a' ? 'an' : 'a'], ans === 'an' ? `"${w}" starts with a vowel sound, so we say "an".` : `We say "a ${w}".`)
  }
  const [word, many] = rng.pick<[string, boolean]>([
    ['cup', false],
    ['cups', true],
    ['ball', false],
    ['balls', true],
    ['goat', false],
    ['goats', true],
    ['pen', false],
    ['pens', true],
  ])
  return q(level, `___ ${word} ${many ? 'are' : 'is'} here.`, many ? 'These' : 'This', [many ? 'This' : 'These'], many ? 'Many things near us: "These".' : 'One thing near us: "This".')
}

const SIMPLE: string[] = ['I see a cat.', 'We like milk.', 'The sun is hot.', 'I can run.', 'Mama is here.', 'The dog is big.', 'I have a pen.', 'We go home.', 'The cup is red.', 'Birds can fly.', 'I love my school.', 'The goat eats grass.', 'My hen lays eggs.', 'We play ball.', 'Baba reads a book.', 'The fish can swim.']
export const sentences1: Generator = (rng, level) => {
  if (level <= 2) {
    const s = rng.pick(SIMPLE.filter((x) => x.split(' ').length <= (level === 1 ? 4 : 5)))
    const words = s.split(' ')
    const o: OrderQuestion = { id: uid('g1s'), type: 'order', level, prompt: 'Put the words in order to make a sentence.', tiles: rng.shuffle(words), answer: words, joiner: ' ', explain: 'The word with a capital letter goes first; the word with a full stop goes last.' }
    return o
  }
  // Capitals and end marks, from the Grade 2 maker's easier levels, kept at this level.
  return { ...mech2(rng, (level - 2) as Level), level }
}

export const COMP1_MORE: BankQuestion[] = [
  ...passage(1, 'My Ball', 'I have a ball. It is red. I kick it.', [
    ['What do I have?', 'a ball', ['a cat', 'a cup']],
    ['What colour is the ball?', 'red', ['blue', 'green']],
    ['What do I do with it?', 'kick it', ['eat it', 'read it']],
  ]),
  ...passage(1, 'The Hen', 'Mama has a hen. The hen is brown. It lays eggs.', [
    ['Who has a hen?', 'Mama', ['Baba', 'Juma']],
    ['What colour is the hen?', 'brown', ['white', 'black']],
    ['What does the hen lay?', 'eggs', ['milk', 'bread']],
  ]),
  ...passage(2, 'At School', 'Amani goes to school. She has a bag and a pencil. Her teacher is kind.', [
    ['Where does Amani go?', 'to school', ['to the market', 'to church']],
    ['What does she have?', 'a bag and a pencil', ['a cup and a plate', 'a ball and a drum']],
    ['What is her teacher like?', 'kind', ['angry', 'sleepy']],
  ]),
  ...passage(3, 'The Rain', 'It is raining. Juma has an umbrella. He does not get wet. He jumps in a puddle!', [
    ['What is the weather?', 'rainy', ['sunny', 'windy']],
    ['What does Juma have?', 'an umbrella', ['a ball', 'a book']],
    ['Does Juma get wet?', 'No', ['Yes']],
    ['What does Juma jump in?', 'a puddle', ['a river', 'a box']],
  ]),
  ...passage(4, 'The Garden', 'Baba and Wanjiru have a small garden. They plant beans and maize. Wanjiru waters the plants every evening. The plants grow tall and green.', [
    ['Who has a garden?', 'Baba and Wanjiru', ['Mama and Juma', 'the teacher']],
    ['What do they plant?', 'beans and maize', ['roses', 'mangoes']],
    ['When does Wanjiru water the plants?', 'every evening', ['every morning', 'never']],
    ['How do the plants grow?', 'tall and green', ['small and brown', 'dry']],
  ]),
  ...passage(5, 'The Lost Goat', 'Otieno has a white goat. One day the goat was lost. Otieno looked behind the house and near the river. He found the goat eating grass under a tree. Otieno was very happy.', [
    ['What colour is the goat?', 'white', ['black', 'brown', 'grey']],
    ['Where did Otieno look first?', 'behind the house', ['near the river', 'under a tree', 'at school']],
    ['Where was the goat?', 'under a tree', ['in the river', 'in the house', 'at the market']],
    ['What was the goat doing?', 'eating grass', ['sleeping', 'drinking milk', 'running']],
    ['How did Otieno feel?', 'very happy', ['sad', 'angry', 'afraid']],
  ]),
]

// ── Kiswahili stories ───────────────────────────────────────────────────────

export const UFAHAMU1_MORE: BankQuestion[] = [
  ...passage(1, 'Mpira', 'Nina mpira. Mpira ni mwekundu. Ninapenda kucheza.', [
    ['Nina nini?', 'mpira', ['paka', 'kikombe']],
    ['Mpira una rangi gani?', 'nyekundu', ['nyeupe', 'kijani']],
    ['Ninapenda kufanya nini?', 'kucheza', ['kulala', 'kulia']],
  ]),
  ...passage(1, 'Kuku', 'Mama ana kuku. Kuku ni mweupe. Kuku anataga mayai.', [
    ['Nani ana kuku?', 'Mama', ['Baba', 'Juma']],
    ['Kuku ana rangi gani?', 'nyeupe', ['nyeusi', 'kahawia']],
    ['Kuku anataga nini?', 'mayai', ['maziwa', 'mkate']],
  ]),
  ...passage(2, 'Shuleni', 'Amina anaenda shuleni. Ana mkoba na kalamu. Mwalimu wake ni mzuri.', [
    ['Amina anaenda wapi?', 'shuleni', ['sokoni', 'kanisani']],
    ['Amina ana nini?', 'mkoba na kalamu', ['kikombe na sahani', 'mpira na ngoma']],
    ['Mwalimu wake ni mtu wa aina gani?', 'mzuri', ['mbaya', 'mgonjwa']],
  ]),
  ...passage(3, 'Mvua', 'Leo mvua inanyesha. Juma ana mwavuli. Halowi. Anaruka katika maji!', [
    ['Hali ya hewa ikoje leo?', 'mvua inanyesha', ['jua kali', 'upepo']],
    ['Juma ana nini?', 'mwavuli', ['mpira', 'kitabu']],
    ['Je, Juma analowa?', 'hapana', ['ndiyo']],
  ]),
  ...passage(4, 'Shamba la Baba', 'Baba ana shamba. Analima mahindi na maharagwe. Mimi humsaidia kumwagilia maji jioni. Mimea inakua vizuri.', [
    ['Nani ana shamba?', 'Baba', ['Mama', 'Bibi']],
    ['Baba analima nini?', 'mahindi na maharagwe', ['ndizi', 'nyanya']],
    ['Mtoto humsaidia Baba lini?', 'jioni', ['asubuhi', 'usiku']],
  ]),
  ...passage(5, 'Mbuzi Aliyepotea', 'Otieno ana mbuzi mweupe. Siku moja mbuzi alipotea. Otieno alimtafuta nyuma ya nyumba na karibu na mto. Alimpata akila majani chini ya mti. Otieno alifurahi sana.', [
    ['Mbuzi ana rangi gani?', 'nyeupe', ['nyeusi', 'kahawia', 'kijivu']],
    ['Otieno alitafuta wapi kwanza?', 'nyuma ya nyumba', ['karibu na mto', 'shuleni', 'sokoni']],
    ['Mbuzi alipatikana wapi?', 'chini ya mti', ['mtoni', 'ndani ya nyumba', 'sokoni']],
    ['Mbuzi alikuwa akifanya nini?', 'akila majani', ['akilala', 'akinywa maziwa', 'akikimbia']],
    ['Otieno alijisikiaje?', 'alifurahi sana', ['alihuzunika', 'alikasirika', 'aliogopa']],
  ]),
]

export { msamiati2, salamu2, silabi2, spell2, tahajia2 }
