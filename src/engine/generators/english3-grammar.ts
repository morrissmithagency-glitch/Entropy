// Grade 3 English question makers: verbs, describing words, pronouns, capitals and
// punctuation, building sentences, and vocabulary. Each is driven by a checked word table,
// so every paper is different but every answer is right.
import { factGenerator } from '../facts'
import { KENYAN_NAMES, uid } from '../helpers'
import type { ArtId } from '../../components/art/objects'
import type { ChoiceQuestion, Generator, Level, OrderQuestion, Rng } from '../types'

const choiceQ = (level: Level, prompt: string, answer: string, wrong: string[], explain?: string): ChoiceQuestion => ({
  id: uid('eng3'),
  type: 'choice',
  level,
  prompt,
  options: [answer, ...[...new Set(wrong)].filter((w) => w !== answer)].map((l) => ({ id: l, label: l })),
  answer,
  explain,
})

const name = (rng: Rng) => rng.pick(KENYAN_NAMES)

// ── Verbs and tenses ────────────────────────────────────────────────────────

// [base, he/she form, past, -ing, what follows]
const REGULAR: [string, string, string, string, string][] = [
  ['walk', 'walks', 'walked', 'walking', 'to school'],
  ['play', 'plays', 'played', 'playing', 'football'],
  ['cook', 'cooks', 'cooked', 'cooking', 'ugali'],
  ['wash', 'washes', 'washed', 'washing', 'the plates'],
  ['clean', 'cleans', 'cleaned', 'cleaning', 'the classroom'],
  ['plant', 'plants', 'planted', 'planting', 'trees'],
  ['jump', 'jumps', 'jumped', 'jumping', 'over the rope'],
  ['help', 'helps', 'helped', 'helping', 'Grandmother'],
  ['carry', 'carries', 'carried', 'carrying', 'water'],
  ['visit', 'visits', 'visited', 'visiting', 'the market'],
]
// [base, he/she form, past, done-form, what follows]
const IRREGULAR: [string, string, string, string, string][] = [
  ['go', 'goes', 'went', 'gone', 'to church'],
  ['eat', 'eats', 'ate', 'eaten', 'a mango'],
  ['drink', 'drinks', 'drank', 'drunk', 'milk'],
  ['write', 'writes', 'wrote', 'written', 'a letter'],
  ['sing', 'sings', 'sang', 'sung', 'a song'],
  ['swim', 'swims', 'swam', 'swum', 'in the pool'],
  ['see', 'sees', 'saw', 'seen', 'a giraffe'],
  ['take', 'takes', 'took', 'taken', 'the bus'],
  ['buy', 'buys', 'bought', 'bought', 'bread'],
  ['bring', 'brings', 'brought', 'brought', 'a pencil'],
  ['sweep', 'sweeps', 'swept', 'swept', 'the house'],
  ['catch', 'catches', 'caught', 'caught', 'the ball'],
  ['give', 'gives', 'gave', 'given', 'a gift'],
  ['run', 'runs', 'ran', 'run', 'to the gate'],
  ['sleep', 'sleeps', 'slept', 'slept', 'early'],
  ['come', 'comes', 'came', 'come', 'home'],
]

export const verbs3: Generator = (rng, level) => {
  const n = name(rng)
  switch (level) {
    case 1: {
      const [, s, past, ing, rest] = rng.pick(REGULAR)
      return choiceQ(level, `Yesterday ${n} ___ ${rest}.`, past, [s, ing], `"Yesterday" tells us it is past, so we add -ed: ${past}.`)
    }
    case 2: {
      const [base, s, past, , rest] = rng.pick(IRREGULAR)
      return choiceQ(level, `Last week ${n} ___ ${rest}.`, past, [base, s, `will ${base}`], `${base} → ${past}. Some verbs do not take -ed.`)
    }
    case 3: {
      const [subject, ans] = rng.pick([
        [n, 'does'],
        ['My mother', 'does'],
        ['The teacher', 'does'],
        ['Our cook', 'does'],
        ['They', 'do'],
        ['We', 'do'],
        ['I', 'do'],
        ['The children', 'do'],
      ] as const)
      const job = rng.pick(['the dishes', 'the washing', 'the shopping', 'homework', 'the cleaning'])
      return choiceQ(level, `${subject} ___ ${job} every day.`, ans, [ans === 'do' ? 'does' : 'do', 'done'], ans === 'does' ? 'One person or thing (not I or you) takes "does".' : 'I, you, we and they take "do".')
    }
    case 4: {
      const [base, , past, done, rest] = rng.pick(IRREGULAR.filter(([b, , p, d]) => p !== d && b !== d))
      if (rng.next() < 0.5) return choiceQ(level, `${n} has ___ ${rest}.`, done, [past, base], `After "has" or "have" we use ${done}, not ${past}.`)
      return choiceQ(level, `${n} ___ ${rest} yesterday.`, past, [done, base], `"Yesterday" with no helper word takes ${past}.`)
    }
    default: {
      const [base, s, past, , rest] = rng.pick([...IRREGULAR, ...REGULAR])
      const when = rng.pick([
        ['Every morning', s, `Things done every day take "${s}".`],
        ['Yesterday', past, `"Yesterday" means past: ${past}.`],
        ['Tomorrow', `will ${base}`, `"Tomorrow" means future: will ${base}.`],
      ] as const)
      return choiceQ(level, `${when[0]} ${n} ___ ${rest}.`, when[1], [s, past, `will ${base}`, base].filter((x) => x !== when[1]), when[2])
    }
  }
}

// ── Describing words ────────────────────────────────────────────────────────

// [adjective, -er, -est]
const ADJ: [string, string, string][] = [
  ['tall', 'taller', 'tallest'],
  ['short', 'shorter', 'shortest'],
  ['long', 'longer', 'longest'],
  ['small', 'smaller', 'smallest'],
  ['fast', 'faster', 'fastest'],
  ['slow', 'slower', 'slowest'],
  ['old', 'older', 'oldest'],
  ['young', 'younger', 'youngest'],
  ['strong', 'stronger', 'strongest'],
  ['big', 'bigger', 'biggest'],
  ['hot', 'hotter', 'hottest'],
  ['thin', 'thinner', 'thinnest'],
  ['wet', 'wetter', 'wettest'],
  ['heavy', 'heavier', 'heaviest'],
  ['happy', 'happier', 'happiest'],
  ['busy', 'busier', 'busiest'],
  ['dirty', 'dirtier', 'dirtiest'],
]
// Three things in order, smallest to largest, for each comparing word.
const LADDERS: Record<string, [string, string, string]> = {
  short: ['a giraffe', 'a man', 'a hen'],
  strong: ['a cat', 'a donkey', 'an elephant'],
  thin: ['a tree trunk', 'a stick', 'a thread'],
  old: ['a baby', 'a mother', 'a grandmother'],
  young: ['a grandmother', 'a mother', 'a baby'],
  big: ['a mouse', 'a goat', 'an elephant'],
  small: ['an elephant', 'a goat', 'a mouse'],
  tall: ['a hen', 'a man', 'a giraffe'],
  fast: ['a snail', 'a dog', 'a cheetah'],
  slow: ['a cheetah', 'a dog', 'a snail'],
  heavy: ['a feather', 'a book', 'a bag of maize'],
  long: ['a pencil', 'a desk', 'a bus'],
  hot: ['ice', 'tea', 'fire'],
}
const DESCRIBE: [string, string][] = [
  ['sweet', 'mango'],
  ['red', 'ball'],
  ['soft', 'pillow'],
  ['tall', 'tree'],
  ['clean', 'cup'],
  ['noisy', 'class'],
  ['heavy', 'bag'],
  ['kind', 'teacher'],
  ['green', 'leaf'],
  ['cold', 'water'],
]
const JOIN: [string, string, string][] = [
  ['I wanted to play', 'but', 'it was raining'],
  ['The shop was open', 'but', 'it had no bread'],
  ['Kendi is short', 'but', 'she jumps very high'],
  ['We stayed indoors', 'because', 'it was raining'],
  ['He drank water', 'because', 'he was thirsty'],
  ['The road was closed', 'because', 'of the floods'],
  ['Mother bought sugar', 'and', 'tea leaves'],
  ['The goat ate grass', 'and', 'drank water'],
  ['I washed my hands', 'and', 'sat down to eat'],
  ['I have a pen', 'and', 'a ruler'],
  ['We ate rice', 'and', 'beans'],
  ['She ran fast', 'but', 'she did not win'],
  ['The tea was hot', 'but', 'I drank it'],
  ['He was tired', 'but', 'he finished his work'],
  ['We wore sweaters', 'because', 'it was cold'],
  ['The grass is wet', 'because', 'it rained'],
  ['I am happy', 'because', 'it is my birthday'],
  ['The baby cried', 'because', 'she was hungry'],
  ['We went to the market', 'and', 'bought tomatoes'],
]

export const adjectives3: Generator = (rng, level) => {
  switch (level) {
    case 1: {
      const [adj, noun] = rng.pick(DESCRIBE)
      const verb = rng.pick(['see', 'have', 'like'])
      return choiceQ(level, `Which word describes the ${noun}?\nI ${verb} a _${adj}_ ${noun}.`, adj, [noun, verb], `"${adj}" tells us what the ${noun} is like.`)
    }
    case 2: {
      const key = rng.pick(Object.keys(LADDERS))
      const [a, b] = LADDERS[key]
      const [, er, est] = ADJ.find(([x]) => x === key)!
      return choiceQ(level, `${cap(b)} is ___ than ${a}.`, er, [key, est], `Comparing two things: add -er.`)
    }
    case 3: {
      const key = rng.pick(Object.keys(LADDERS))
      const [a, b, c] = LADDERS[key]
      const [, er, est] = ADJ.find(([x]) => x === key)!
      return choiceQ(level, `Of ${a}, ${b} and ${c}, ${c} is the ___.`, est, [er, key], `Comparing three or more: add -est.`)
    }
    case 4: {
      const [adj, er, est] = rng.pick(ADJ.filter(([a, e]) => e !== `${a}er`))
      const asEst = rng.next() < 0.5
      const ans = asEst ? est : er
      const wrong = asEst ? [`${adj}est`, `more ${adj}`] : [`${adj}er`, `more ${adj}`]
      return choiceQ(level, `Which is spelt correctly?`, ans, wrong, adj.endsWith('y') ? `y changes to i: ${er}, ${est}.` : `Double the last letter: ${er}, ${est}.`)
    }
    default: {
      const [a, join, b] = rng.pick(JOIN)
      return choiceQ(level, `${a} ___ ${b}.`, join, ['and', 'but', 'because'].filter((x) => x !== join), join === 'because' ? '"Because" gives the reason.' : join === 'but' ? '"But" shows something different.' : '"And" adds more.')
    }
  }
}

const cap = (s: string) => s[0].toUpperCase() + s.slice(1)

// ── Pronouns and question words ─────────────────────────────────────────────

const OWNERS: [string, string][] = [
  ['me', 'mine'],
  ['you', 'yours'],
  ['my brother', 'his'],
  ['Baba', 'his'],
  ['my sister', 'hers'],
  ['Mama', 'hers'],
  ['my friends and me', 'ours'],
  ['us', 'ours'],
  ['the twins', 'theirs'],
  ['our neighbours', 'theirs'],
]
const THINGS = ['book', 'bag', 'pencil', 'ball', 'cup', 'jacket', 'goat', 'bicycle']
const QUESTION_WORDS: [string, string][] = [
  ['___ is your teacher?', 'Who'],
  ['___ won the race?', 'Who'],
  ['___ shoes are these?', 'Whose'],
  ['___ did you put my pencil?', 'Where'],
  ['___ will the rains start?', 'When'],
  ['___ did you eat for lunch?', 'What'],
  ['___ is the road closed?', 'Why'],
  ['___ do you go to school, on foot or by bus?', 'How'],
  ['___ helped you carry the water?', 'Who'],
  ['___ pen is this?', 'Whose'],
  ['___ bag is on the floor?', 'Whose'],
  ['___ do you live?', 'Where'],
  ['___ is the market?', 'Where'],
  ['___ is your birthday?', 'When'],
  ['___ do we go home?', 'When'],
  ['___ is in the box?', 'What'],
  ['___ is your name?', 'What'],
  ['___ are you crying?', 'Why'],
  ['___ is the baby sleeping?', 'Why'],
  ['___ old are you?', 'How'],
  ['___ many goats do you have?', 'How'],
]

export const pronouns3: Generator = (rng, level) => {
  if (level === 1 || level === 3 || level === 5) {
    const [owner, ans] = rng.pick(level === 5 ? OWNERS.filter(([o]) => !['me', 'you', 'us'].includes(o)) : OWNERS)
    const thing = rng.pick(THINGS)
    const wrong = rng.sample(['mine', 'yours', 'his', 'hers', 'ours', 'theirs'].filter((x) => x !== ans), level === 1 ? 2 : 3)
    if (level === 5) {
      const n = rng.pick(KENYAN_NAMES)
      return choiceQ(level, `"Is this your ${thing}, ${n}?" "No, it is not ___. It belongs to ${owner}."`, 'mine', ['yours', 'his', 'hers'], `${n} is speaking about themself, so the word is "mine".`)
    }
    return choiceQ(level, `This ${thing} belongs to ${owner}. It is ___.`, ans, wrong, `Something that belongs to ${owner} is ${ans}.`)
  }
  const [sentence, ans] = rng.pick(QUESTION_WORDS)
  const wrong = rng.sample(['Who', 'Whose', 'Where', 'When', 'What', 'Why', 'How'].filter((x) => x !== ans), level === 2 ? 2 : 3)
  const meaning: Record<string, string> = { Who: 'a person', Whose: 'who owns something', Where: 'a place', When: 'a time', What: 'a thing', Why: 'a reason', How: 'how many or what way' }
  return choiceQ(level, `Choose the question word: ${sentence}`, ans, wrong, `"${ans}" asks about ${meaning[ans]}.`)
}

// ── Capitals and punctuation ────────────────────────────────────────────────

const PLACES = ['Kisumu', 'Nairobi', 'Mombasa', 'Nakuru', 'Eldoret', 'Garissa', 'Lamu', 'Kitui']
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['January', 'March', 'April', 'June', 'August', 'December']

function sentence(rng: Rng): { right: string; parts: string[] } {
  const n = name(rng)
  const place = rng.pick(PLACES)
  const day = rng.pick(DAYS)
  const month = rng.pick(MONTHS)
  const pick = rng.int(0, 2)
  if (pick === 0) return { right: `On ${day} ${n} went to ${place}.`, parts: [n, place, day] }
  if (pick === 1) return { right: `${n} and I visited ${place} in ${month}.`, parts: [n, place, month, 'I'] }
  return { right: `My cousin ${n} lives in ${place}.`, parts: [n, place] }
}

export const mechanics3: Generator = (rng, level) => {
  const { right, parts } = sentence(rng)
  if (level === 1) {
    const word = rng.pick(parts.filter((p) => p !== 'I'))
    const plain = [...new Set([...right.split(' ').filter((w) => /^[a-z]+\.?$/.test(w) && w.length > 2).map((w) => w.replace('.', '')), 'school', 'market', 'river'])]
    return choiceQ(level, `Which word should always start with a capital letter?`, word, rng.sample(plain, 2).filter((w) => w.toLowerCase() !== word.toLowerCase()), `${word} is a name, so it always starts with a capital letter.`)
  }
  if (level === 2) {
    const q = rng.pick([
      ['Where do you live', '?'],
      ['What is your name', '?'],
      ['Do you like mangoes', '?'],
      ['I live in a big house', '.'],
      ['We are going to school', '.'],
      ['My goat is brown', '.'],
      ['When does school open', '?'],
      ['Who is your best friend', '?'],
      ['How many legs does a spider have', '?'],
      ['Is it going to rain today', '?'],
      ['Can you help me carry this bag', '?'],
      ['Why is the baby crying', '?'],
      ['The sun rises in the east', '.'],
      ['Our teacher is very kind', '.'],
      ['Fish live in water', '.'],
      ['I have two sisters and one brother', '.'],
      ['The market is open on Saturday', '.'],
      ['We planted trees last week', '.'],
    ] as const)
    return choiceQ(level, `Which mark ends this sentence?\n${q[0]} ___`, q[1], q[1] === '?' ? ['.', ','] : ['?', ','], q[1] === '?' ? 'A question ends with a question mark.' : 'A telling sentence ends with a full stop.')
  }
  // Wrong versions: a name in small letters, a small first letter, or no full stop.
  const wrongs = new Set<string>()
  for (const p of parts) if (p !== 'I') wrongs.add(right.replace(p, p.toLowerCase()))
  wrongs.add(right[0].toLowerCase() + right.slice(1))
  wrongs.add(right.slice(0, -1))
  if (right.includes(' I ')) wrongs.add(right.replace(' I ', ' i '))
  const n = level === 3 ? 2 : 3
  return choiceQ(level, 'Which sentence is written correctly?', right, rng.sample([...wrongs], n), 'Capital letters for the first word, names, places, days, months and "I"; a full stop at the end.')
}

// ── Building sentences ──────────────────────────────────────────────────────

const SENTENCES: string[] = [
  'The cat is sleeping.',
  'Dogs bark.',
  'Fish can swim.',
  'I love my school.',
  'Juma reads books.',
  'The sun is hot.',
  'We drink clean water.',
  'Cows give us milk.',
  'Wanjiku sings well.',
  'The bell is ringing.',
  'She has two pencils.',
  'My shoes are new.',
  'The river is deep.',
  'We plant trees in April.',
  'The bus left very early.',
  'Hens lay eggs every day.',
  'My uncle sells fresh fish.',
  'The baby is sleeping now.',
  'Rain makes the grass green.',
  'Otieno kicked the ball hard.',
  'Please close the door quietly.',
  'Our classroom is clean and bright.',
  'Chebet brushes her teeth every morning.',
  'The teacher gave us new exercise books.',
  'My grandmother lives near a big river.',
  'We washed our hands before eating lunch.',
  'The lion slept under a tall acacia tree.',
  'Bees make honey from the flowers in our garden.',
  'Yesterday we planted beans because the rains came.',
  'Birds can fly.',
  'I like ripe mangoes.',
  'Mama is cooking ugali.',
  'We sing every morning.',
  'The goat is eating grass.',
  'My father drives a lorry.',
  'Our school has many trees.',
  'Zawadi fetched water yesterday.',
  'The children are playing football.',
  'Grandmother tells us good stories.',
  'The farmer planted maize and beans.',
  'Our teacher reads us a story.',
  'Hassan swept the classroom after lessons.',
  'We visited Lamu during the holidays.',
  'The baby cried because she was hungry.',
  'My brother is taller than my sister.',
  'Nekesa waters her vegetables every evening.',
  'Kamau was tired but he finished his work.',
  'We wore sweaters because it was very cold.',
  'Akinyi and her friends went to the market.',
]

export const build3: Generator = (rng, level) => {
  const [min, max] = ([[3, 4], [4, 5], [5, 6], [6, 7], [7, 9]] as const)[level - 1]
  const pool = SENTENCES.filter((s) => {
    const words = s.split(' ')
    return words.length >= min && words.length <= max && new Set(words).size === words.length
  })
  const s = rng.pick(pool)
  const words = s.split(' ')
  const q: OrderQuestion = {
    id: uid('build'),
    type: 'order',
    level,
    prompt: 'Arrange the words to make a correct sentence.',
    tiles: rng.shuffle(words),
    answer: words,
    joiner: ' ',
    explain: 'The word with a capital letter comes first; the word with a full stop comes last.',
  }
  return q
}

// ── Vocabulary and jobs (from word tables) ──────────────────────────────────

export const vocab3 = factGenerator({
  pairs: [
    {
      pairs: [
        ['wide', 'narrow'],
        ['sweet', 'bitter'],
        ['early', 'late'],
        ['full', 'empty'],
        ['heavy', 'light'],
        ['rich', 'poor'],
        ['strong', 'weak'],
        ['open', 'close'],
        ['buy', 'sell'],
        ['come', 'go'],
        ['inside', 'outside'],
        ['clean', 'dirty'],
        ['young', 'old'],
        ['day', 'night'],
        ['happy', 'sad'],
        ['loud', 'quiet'],
        ['above', 'below'],
        ['first', 'last'],
      ],
      ask: (a) => `What is the opposite of "${a}"?`,
      askBack: (b) => `Which word is the opposite of "${b}"?`,
      explain: (a, b) => `${a} and ${b} are opposites.`,
    },
    {
      pairs: [
        ['big', 'large'],
        ['small', 'tiny'],
        ['happy', 'glad'],
        ['quick', 'fast'],
        ['shut', 'close'],
        ['begin', 'start'],
        ['look', 'see'],
        ['shout', 'yell'],
        ['gift', 'present'],
        ['friend', 'pal'],
      ],
      ask: (a) => `Which word means the same as "${a}"?`,
      askBack: (b) => `Which word means the same as "${b}"?`,
      explain: (a, b) => `"${a}" and "${b}" mean almost the same.`,
    },
  ],
})

export const respond3 = factGenerator({
  pairs: [
    {
      pairs: [
        ['a farmer', 'grows crops'],
        ['a tailor', 'sews clothes'],
        ['a mason', 'builds with stones'],
        ['a pilot', 'flies aeroplanes'],
        ['a nurse', 'cares for the sick'],
        ['a carpenter', 'makes furniture'],
        ['a cobbler', 'mends shoes'],
        ['a barber', 'cuts hair'],
        ['a fisherman', 'catches fish'],
        ['a butcher', 'sells meat'],
        ['a driver', 'drives vehicles'],
        ['a teacher', 'teaches learners'],
      ],
      ask: (a) => `What does ${a} do? A person who ___.`,
      askBack: (b) => `Who ${b}?`,
    },
    {
      pairs: [
        ['someone gives you a gift', '"Thank you."'],
        ['you step on someone\'s foot', '"Sorry."'],
        ['you want to borrow a ruler', '"May I borrow your ruler, please?"'],
        ['you meet your teacher in the morning', '"Good morning, teacher."'],
        ['a visitor knocks on the door', '"Come in, you are welcome."'],
        ['you want to pass between people', '"Excuse me, please."'],
      ],
      ask: (a) => `What do you say when ${a}?`,
    },
  ],
})

// ── Prepositions ────────────────────────────────────────────────────────────

const PREP_ART: ArtId[] = ['ball', 'cat', 'book', 'cup', 'shoe', 'hen', 'mango', 'dog', 'bag', 'orange']
const PREP_SENTENCES: [string, string][] = [
  ['Juma sits ___ Ali and Wanjiru.', 'between'],
  ['The goat is hiding ___ the house.', 'behind'],
  ['I drank a cup ___ tea.', 'of'],
  ['The birds flew ___ the trees.', 'over'],
  ['We walked ___ the bridge to the other side.', 'across'],
  ['The children ran ___ the classroom when the bell rang.', 'into'],
  ['Put the books ___ the table.', 'on'],
  ['The fish swim ___ the water.', 'in'],
  ['The cat sleeps ___ the bed.', 'under'],
  ['Our school is ___ the hospital, just next to it.', 'beside'],
  ['She took the letter ___ the envelope.', 'out of'],
  ['We go to church ___ Sunday.', 'on'],
  ['Lessons start ___ eight o\'clock.', 'at'],
  ['The colour ___ the sky is blue.', 'of'],
  ['He climbed ___ the tree to pick a mango.', 'up'],
]
const PREPS = ['in', 'on', 'under', 'beside', 'behind', 'between', 'of', 'over', 'across', 'into', 'at', 'up', 'out of']

export const prep3: Generator = (rng, level) => {
  if (level <= 2) {
    const where = rng.pick(level === 1 ? (['in', 'on', 'under'] as const) : (['in', 'on', 'under', 'beside', 'behind'] as const))
    const art = rng.pick(PREP_ART)
    const wrong = rng.sample(['in', 'on', 'under', 'beside', 'behind'].filter((x) => x !== where), level === 1 ? 2 : 3)
    return {
      ...choiceQ(level, `Where is the ${art}? It is ___ the box.`, where, wrong, `The ${art} is ${where} the box.`),
      visual: { kind: 'position', art, where },
    }
  }
  const [sentence, ans] = rng.pick(PREP_SENTENCES)
  return choiceQ(level, `Choose the right word: ${sentence}`, ans, rng.sample(PREPS.filter((x) => x !== ans), 3))
}

export const ENGLISH3_GRAMMAR: Record<string, Generator> = {
  'te-prep': prep3,
  'te-verbs': verbs3,
  'te-adj': adjectives3,
  'te-pron': pronouns3,
  'te-mech': mechanics3,
  'te-build': build3,
  'te-vocab': vocab3,
  'te-respond': respond3,
}
