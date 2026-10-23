// Grade 2 English question makers, built on small checked word tables.
import type { ArtId } from '../../components/art/objects'
import { factGenerator } from '../facts'
import { uid } from '../helpers'
import type { BankQuestion, ChoiceQuestion, Generator, Level, OrderQuestion, Rng } from '../types'
import { passage } from './english'

const q = (level: Level, prompt: string, answer: string, wrong: string[], explain?: string): ChoiceQuestion => ({
  id: uid('eng2'),
  type: 'choice',
  level,
  prompt,
  options: [answer, ...[...new Set(wrong)].filter((w) => w !== answer)].map((l) => ({ id: l, label: l })),
  answer,
  explain,
})

// ── Polite talk ─────────────────────────────────────────────────────────────

export const listen2 = factGenerator({
  pairs: [
    {
      pairs: [
        ['someone gives you a present', '"Thank you."'],
        ['you bump into a friend', '"Sorry."'],
        ['you want a pencil from your friend', '"May I have a pencil, please?"'],
        ['you meet your teacher in the morning', '"Good morning, teacher."'],
        ['you leave your friends to go home', '"Goodbye."'],
        ['you want to go out of class', '"May I go out, please?"'],
        ['someone says "Thank you" to you', '"You are welcome."'],
        ['a friend is hurt', '"Sorry. Are you okay?"'],
      ],
      ask: (a) => `What do you say when ${a}?`,
    },
    {
      pairs: [
        ['in the morning', '"Good morning."'],
        ['in the afternoon', '"Good afternoon."'],
        ['in the evening', '"Good evening."'],
        ['before going to bed', '"Good night."'],
      ],
      ask: (a) => `How do we greet people ${a}?`,
      askBack: (b) => `When do we say ${b}?`,
    },
    {
      pairs: [
        ['What is your name?', '"My name is Amani."'],
        ['How old are you?', '"I am seven years old."'],
        ['Where do you live?', '"I live in Nakuru."'],
        ['How are you?', '"I am fine, thank you."'],
        ['What is your favourite fruit?', '"I like mangoes."'],
      ],
      ask: (a) => `Which is the best answer to "${a}"`,
    },
  ],
})

// ── Sounds and blends ───────────────────────────────────────────────────────

const SOUNDS: Record<string, string[]> = {
  sh: ['ship', 'shop', 'fish', 'dish', 'shoe', 'sheep', 'shell'],
  ch: ['chair', 'chin', 'chick', 'lunch', 'chop', 'cheek', 'rich'],
  th: ['thin', 'three', 'bath', 'teeth', 'think', 'thumb', 'moth'],
  ee: ['tree', 'bee', 'seed', 'feet', 'see', 'green', 'sheep'],
  oo: ['moon', 'spoon', 'food', 'room', 'school', 'roof', 'zoo'],
  ai: ['rain', 'tail', 'nail', 'train', 'snail', 'paint', 'wait'],
  ar: ['car', 'star', 'farm', 'jar', 'park', 'arm', 'card'],
  ng: ['sing', 'ring', 'king', 'swing', 'long', 'song', 'wing'],
}
const SOUND_KEYS = Object.keys(SOUNDS)
const RHYMES: string[][] = [
  ['cat', 'hat', 'mat', 'bat', 'rat'],
  ['pen', 'hen', 'ten', 'men'],
  ['moon', 'spoon', 'soon', 'noon'],
  ['ring', 'king', 'sing', 'wing'],
  ['tree', 'bee', 'see', 'three'],
  ['rain', 'train', 'pain', 'chain'],
  ['star', 'car', 'jar', 'far'],
  ['dog', 'log', 'frog', 'fog'],
  ['cake', 'lake', 'snake', 'bake'],
]

const has = (w: string, s: string) => w.includes(s)

export const phonics2: Generator = (rng, level) => {
  const key = rng.pick(SOUND_KEYS)
  const word = rng.pick(SOUNDS[key])
  const others = SOUND_KEYS.filter((k) => k !== key)
  const clean = (ws: string[]) => ws.filter((w) => !has(w, key))
  switch (level) {
    case 1:
      return q(level, `Which word has the sound "${key}"?`, word, rng.sample(clean(others.flatMap((k) => SOUNDS[k])), 2), `"${word}" has "${key}".`)
    case 2: {
      const wrong = rng.sample(others.filter((k) => !has(word, k)), 3)
      return q(level, `Which sound do you hear in "${word}"?`, key, wrong, `${word}: ${key}.`)
    }
    case 3: {
      const blank = word.replace(key, '__')
      const wrong = rng.sample(others.filter((k) => !has(word, k)), 3)
      return q(level, `Which sound completes the word? ${blank}`, key, wrong, `${word} has "${key}".`)
    }
    case 4: {
      const fam = rng.pick(RHYMES)
      const [a, b] = rng.sample(fam, 2)
      const wrong = rng.sample(RHYMES.filter((f) => f !== fam).flat(), 3)
      return q(level, `Which word rhymes with "${a}"?`, b, wrong, `"${a}" and "${b}" end with the same sound.`)
    }
    default: {
      const bad = [word.replace(key, rng.pick(others.filter((k) => k.length === key.length && !has(word, k)))), word.replace(key, key[0]), word + 'e']
      return q(level, 'Which word is spelt correctly?', word, bad.filter((b) => b !== word), `The word is "${word}", with "${key}".`)
    }
  }
}

// ── Word meanings ───────────────────────────────────────────────────────────

export const vocab2 = factGenerator({
  categories: [
    { one: 'a fruit', many: 'fruits', items: ['mango', 'orange', 'banana', 'pawpaw', 'pineapple', 'avocado', 'guava'] },
    { one: 'an animal', many: 'animals', items: ['goat', 'cow', 'lion', 'zebra', 'dog', 'cat', 'elephant'] },
    { one: 'a thing we wear', many: 'things we wear', items: ['shirt', 'dress', 'shoes', 'sweater', 'socks', 'hat', 'skirt'] },
    { one: 'a part of the body', many: 'parts of the body', items: ['head', 'hand', 'leg', 'nose', 'ear', 'eye', 'mouth'] },
  ],
  pairs: [
    {
      pairs: [
        ['big', 'small'],
        ['hot', 'cold'],
        ['up', 'down'],
        ['open', 'shut'],
        ['happy', 'sad'],
        ['fast', 'slow'],
        ['wet', 'dry'],
        ['long', 'short'],
        ['full', 'empty'],
        ['day', 'night'],
        ['in', 'out'],
        ['come', 'go'],
      ],
      ask: (a) => `What is the opposite of "${a}"?`,
      askBack: (b) => `Which word is the opposite of "${b}"?`,
    },
  ],
})

// ── Naming words ────────────────────────────────────────────────────────────

const PLAIN: [string, string][] = [
  ['cat', 'cats'],
  ['book', 'books'],
  ['cup', 'cups'],
  ['goat', 'goats'],
  ['pen', 'pens'],
  ['tree', 'trees'],
  ['girl', 'girls'],
  ['ball', 'balls'],
  ['egg', 'eggs'],
  ['shoe', 'shoes'],
  ['dog', 'dogs'],
  ['hat', 'hats'],
  ['cow', 'cows'],
  ['bed', 'beds'],
  ['desk', 'desks'],
  ['spoon', 'spoons'],
]
const ES: [string, string][] = [
  ['box', 'boxes'],
  ['bus', 'buses'],
  ['dish', 'dishes'],
  ['brush', 'brushes'],
  ['watch', 'watches'],
  ['glass', 'glasses'],
  ['fox', 'foxes'],
]
const SPECIAL: [string, string][] = [
  ['person', 'people'],
  ['ox', 'oxen'],
  ['goose', 'geese'],
  ['leaf', 'leaves'],
  ['knife', 'knives'],
  ['wife', 'wives'],
  ['man', 'men'],
  ['woman', 'women'],
  ['child', 'children'],
  ['foot', 'feet'],
  ['tooth', 'teeth'],
  ['mouse', 'mice'],
]
const SENT: [string, string, string[]][] = [
  ['The dog barks.', 'dog', ['barks', 'The']],
  ['Mama cooks rice.', 'rice', ['cooks', 'The']],
  ['The bird sings.', 'bird', ['sings', 'The']],
  ['A cow eats grass.', 'cow', ['eats', 'A']],
  ['Juma kicks the ball.', 'ball', ['kicks', 'the']],
  ['The baby sleeps.', 'baby', ['sleeps', 'The']],
  ['Hens lay eggs.', 'eggs', ['lay', 'Hens lay']],
  ['The teacher writes.', 'teacher', ['writes', 'The']],
  ['A lion roars loudly.', 'lion', ['roars', 'loudly']],
  ['We eat ugali.', 'ugali', ['eat', 'We']],
  ['The bus is red.', 'bus', ['is', 'red']],
  ['Akinyi reads a book.', 'book', ['reads', 'a']],
  ['The cat drinks milk.', 'milk', ['drinks', 'The']],
  ['My shoes are new.', 'shoes', ['are', 'new']],
  ['The farmer grows maize.', 'farmer', ['grows', 'The']],
  ['Fish swim in water.', 'water', ['swim', 'in']],
]
const NUMS = ['two', 'three', 'four', 'five', 'six']

export const nouns2: Generator = (rng, level) => {
  switch (level) {
    case 1: {
      const [one, many] = rng.pick(PLAIN)
      return q(level, `one ${one}, two ___`, many, [one, `${one}es`], `Add s: ${many}.`)
    }
    case 2: {
      const [one, many] = rng.pick(ES)
      return q(level, `one ${one}, ${rng.pick(NUMS)} ___`, many, [`${one}s`, one], `Words ending in s, x, sh or ch add es: ${many}.`)
    }
    case 3: {
      const [s, ans, wrong] = rng.pick(SENT)
      return q(level, `Which is the naming word?\n${s}`, ans, wrong, `"${ans}" names a person, animal or thing.`)
    }
    case 4: {
      const [one, many] = rng.pick(SPECIAL)
      return q(level, `one ${one}, ${rng.pick(['many', 'two', 'three', 'four'])} ___`, many, [`${one}s`, `${one}es`], `${one} has a special plural: ${many}.`)
    }
    default: {
      const [one, many] = rng.pick([...PLAIN, ...ES, ...SPECIAL])
      const n = rng.pick(NUMS)
      const wrong = [one, `${one}s`, `${one}es`].filter((w) => w !== many)
      return q(level, `There are ${n} ___ in the picture. (${one})`, many, wrong, `More than one ${one}: ${many}.`)
    }
  }
}

// ── I, you, he, she ─────────────────────────────────────────────────────────

const PRON: [string, string][] = [
  ['My father', 'He'],
  ['My brother', 'He'],
  ['Grandfather', 'He'],
  ['The man', 'He'],
  ['The king', 'He'],
  ['Mr Otieno', 'He'],
  ['Grandmother', 'She'],
  ['My aunt', 'She'],
  ['The woman', 'She'],
  ['The queen', 'She'],
  ['Mrs Kamau', 'She'],
  ['My uncle', 'He'],
  ['The boy', 'He'],
  ['My mother', 'She'],
  ['My sister', 'She'],
  ['The girl', 'She'],
  ['The dog', 'It'],
  ['The ball', 'It'],
  ['The children', 'They'],
  ['The goats', 'They'],
  ['My friends and I', 'We'],
  ['Juma and I', 'We'],
]
const AFTER: Record<string, string> = { He: 'is kind.', She: 'is kind.', It: 'is brown.', They: 'are in the field.', We: 'are in Grade 2.' }

export const pron2: Generator = (rng, level) => {
  if (level <= 3) {
    const [who, p] = rng.pick(level === 1 ? PRON.filter(([, x]) => x === 'He' || x === 'She') : PRON)
    const wrong = rng.sample(['He', 'She', 'It', 'They', 'We'].filter((x) => x !== p), level === 1 ? 2 : 3)
    return q(level, `${who} ${p === 'They' || p === 'We' ? 'are' : 'is'} here. ___ ${AFTER[p]}`, p, wrong, `We use "${p}" for ${who.toLowerCase()}.`)
  }
  const [word, n, ans, wrongs] = rng.pick<[string, number, string, string[]]>([
    ['book', 1, 'This', ['These', 'Those']],
    ['books', 3, 'These', ['This', 'That']],
    ['mango', 1, 'This', ['These', 'Those']],
    ['mangoes', 4, 'These', ['This', 'That']],
    ['cup', 1, 'That', ['Those', 'These']],
    ['cups', 2, 'Those', ['That', 'This']],
    ['tree', 1, 'That', ['Those', 'These']],
    ['trees', 5, 'Those', ['That', 'This']],
    ['pen', 1, 'This', ['These', 'Those']],
    ['pens', 2, 'These', ['This', 'That']],
    ['chair', 1, 'This', ['These', 'Those']],
    ['chairs', 3, 'These', ['This', 'That']],
    ['cow', 1, 'That', ['Those', 'These']],
    ['cows', 6, 'Those', ['That', 'This']],
    ['bird', 1, 'That', ['Those', 'These']],
    ['birds', 4, 'Those', ['That', 'This']],
  ])
  const near = ans === 'This' || ans === 'These'
  return q(level, `___ ${word} ${n === 1 ? 'is' : 'are'} ${near ? 'here, near me' : 'over there, far away'}.`, ans, wrongs, `${n === 1 ? 'One' : 'Many'}, ${near ? 'near' : 'far'}: "${ans}".`)
}

// ── Action words ────────────────────────────────────────────────────────────

const ING: [string, string][] = [
  ['run', 'running'],
  ['sit', 'sitting'],
  ['swim', 'swimming'],
  ['play', 'playing'],
  ['read', 'reading'],
  ['sing', 'singing'],
  ['eat', 'eating'],
  ['jump', 'jumping'],
  ['write', 'writing'],
  ['dance', 'dancing'],
  ['hop', 'hopping'],
  ['skip', 'skipping'],
  ['clap', 'clapping'],
  ['ride', 'riding'],
  ['smile', 'smiling'],
  ['come', 'coming'],
  ['dig', 'digging'],
  ['cut', 'cutting'],
  ['make', 'making'],
  ['bake', 'baking'],
  ['shop', 'shopping'],
]
const ED: [string, string, string][] = [
  ['walk', 'walked', 'to school'],
  ['play', 'played', 'football'],
  ['jump', 'jumped', 'over the rope'],
  ['cook', 'cooked', 'rice'],
  ['wash', 'washed', 'the plates'],
  ['clean', 'cleaned', 'the house'],
  ['kick', 'kicked', 'the ball'],
  ['help', 'helped', 'Grandmother'],
  ['visit', 'visited', 'the market'],
  ['paint', 'painted', 'a picture'],
]
const WHO_ONE = ['The boy', 'The girl', 'Mama', 'Juma', 'My friend']
const WHO_MANY = ['The boys', 'The girls', 'We', 'They', 'The children']

export const verbs2: Generator = (rng, level) => {
  switch (level) {
    case 1: {
      const [base, ing] = rng.pick(ING)
      return q(level, `${rng.pick(WHO_ONE)} is ___ now.`, ing, [base, `${base}s`], `"is" goes with the -ing word: ${ing}.`)
    }
    case 2: {
      const many = rng.next() < 0.5
      const [, ing] = rng.pick(ING)
      return q(level, `${rng.pick(many ? WHO_MANY : WHO_ONE)} ___ ${ing}.`, many ? 'are' : 'is', [many ? 'is' : 'are', 'am'], many ? 'Many people take "are".' : 'One person takes "is".')
    }
    case 3: {
      const [base, ed, rest] = rng.pick(ED)
      return q(level, `Yesterday ${rng.pick(WHO_ONE).toLowerCase()} ___ ${rest}.`, ed, [base, `${base}ing`], `"Yesterday" means it already happened: add -ed.`)
    }
    case 4: {
      const [base, ing] = rng.pick(ING.filter(([b, i]) => i !== `${b}ing`))
      return q(level, `Which is spelt correctly?`, ing, [`${base}ing`, `${base.slice(0, -1)}ng`].filter((x) => x !== ing), `${base} → ${ing}.`)
    }
    default: {
      const now = rng.next() < 0.5
      if (now) {
        const [base, ing] = rng.pick(ING)
        return q(level, `Look! ${rng.pick(WHO_MANY)} are ___.`, ing, [base, `${base}ed`], '"Look!" tells us it is happening now.')
      }
      const [base, ed, rest] = rng.pick(ED)
      return q(level, `Last week we ___ ${rest}.`, ed, [base, `${base}ing`], '"Last week" means it already happened: add -ed.')
    }
  }
}

// ── In, on, under ───────────────────────────────────────────────────────────

const PREP_ART: ArtId[] = ['ball', 'cat', 'book', 'cup', 'shoe', 'hen', 'mango', 'dog', 'orange', 'egg']

export const prep2: Generator = (rng, level) => {
  const art = rng.pick(PREP_ART)
  if (level <= 3) {
    const set = level === 1 ? (['in', 'on'] as const) : level === 2 ? (['in', 'on', 'under'] as const) : (['in', 'on', 'under', 'beside', 'behind'] as const)
    const where = rng.pick(set)
    return { ...q(level, `Where is the ${art}? It is ___ the box.`, where, set.filter((x) => x !== where).slice(0, 3) as string[]), visual: { kind: 'position', art, where } }
  }
  // Each sentence lists only wrong words that cannot also fit.
  const [s, ans, wrong] = rng.pick<[string, string, string[]]>([
    ['The fish lives ___ the water.', 'in', ['on', 'beside', 'behind']],
    ['Put the plate ___ the table so we can eat.', 'on', ['in', 'under', 'behind']],
    ['The cat hides ___ the bed, in the dark space below it.', 'under', ['in', 'on', 'beside']],
    ['The bird built its nest ___ the tree.', 'in', ['under', 'beside', 'behind']],
    ['I put my books ___ my bag and closed it.', 'in', ['on', 'under', 'behind']],
    ['The clock hangs ___ the wall.', 'on', ['in', 'under', 'beside']],
    ['Juma sits next to me. He sits ___ me.', 'beside', ['in', 'on', 'under']],
    ['The hat is ___ his head.', 'on', ['in', 'under', 'beside']],
    ['The milk is ___ the cup. Drink it!', 'in', ['on', 'under', 'behind']],
    ['Mama put the food ___ the pot and covered it.', 'in', ['on', 'under', 'behind']],
    ['The dog sleeps ___ the table, in the shade below it.', 'under', ['in', 'on', 'beside']],
    ['The goat hides at the back of the house. It is ___ the house.', 'behind', ['in', 'on', 'under']],
    ['I sit next to my best friend. I sit ___ her.', 'beside', ['in', 'on', 'under']],
    ['The picture hangs ___ the wall.', 'on', ['in', 'under', 'beside']],
    ['Mama pours the tea ___ the cup.', 'in', ['on', 'under', 'behind']],
    ['The shoes are ___ the bed, on the floor below it.', 'under', ['in', 'on', 'beside']],
    ['The cow stands next to the tree. It is ___ the tree.', 'beside', ['in', 'on', 'under']],
    ['The sun hides at the back of a cloud. It is ___ the cloud.', 'behind', ['in', 'on', 'under']],
    ['The baby sleeps ___ the bed, on top of the blanket.', 'on', ['in', 'under', 'behind']],
    ['The keys are ___ the box, so close the lid.', 'in', ['on', 'under', 'behind']],
    ['The boy hides at the back of the door. He is ___ the door.', 'behind', ['in', 'on', 'under']],
  ])
  return q(level, `Choose the right word: ${s}`, ans, rng.sample(wrong, level === 4 ? 2 : 3))
}

// ── Describing words ────────────────────────────────────────────────────────

export const adj2 = factGenerator({
  categories: [
    { one: 'a colour word', many: 'colour words', items: ['red', 'blue', 'green', 'yellow', 'black', 'white', 'brown'] },
    { one: 'a size word', many: 'size words', items: ['big', 'small', 'tall', 'short', 'long', 'tiny'] },
    { one: 'a word that tells how something feels', many: 'words that tell how things feel', items: ['soft', 'hard', 'rough', 'smooth', 'hot', 'cold'] },
  ],
  pairs: [
    {
      pairs: [
        ['a ripe tomato', 'red'],
        ['grass', 'green'],
        ['milk', 'white'],
        ['the clear sky', 'blue'],
        ['a ripe banana', 'yellow'],
        ['charcoal', 'black'],
        ['soil', 'brown'],
      ],
      ask: (a) => `What colour is ${a}?`,
    },
    {
      pairs: [
        ['a pillow', 'soft'],
        ['a stone', 'hard'],
        ['water from the fridge', 'cold'],
        ['the midday sun', 'hot'],
        ['an ant', 'tiny'],
        ['a bag of maize', 'heavy'],
      ],
      ask: (a) => `Which word describes ${a}?`,
    },
  ],
})

// ── Capital letters and full stops ──────────────────────────────────────────

const PLAIN_SENT = ['we go to school.', 'my cat is black.', 'i like mangoes.', 'the sun is hot.', 'mama is cooking.', 'the baby is sleeping.', 'we play football.', 'the goat is eating grass.', 'my bag is blue.', 'birds can fly.', 'the river is wide.', 'baba reads a book.', 'we drink milk.', 'the cow is big.', 'my teacher is kind.', 'it is raining.']
const NAMES = ['Amina', 'Juma', 'Otieno', 'Wanjiku', 'Kipchoge', 'Achieng', 'Baraka', 'Zawadi', 'Mutua', 'Chebet', 'Hassan', 'Nekesa', 'Kamau', 'Akinyi', 'Wafula', 'Halima']
const TOWNS = ['Kisumu', 'Nairobi', 'Nakuru', 'Mombasa', 'Embu']

export const mech2: Generator = (rng, level) => {
  switch (level) {
    case 1: {
      const s = rng.pick(PLAIN_SENT)
      const right = s[0].toUpperCase() + s.slice(1)
      return q(level, 'Which sentence starts correctly?', right.replace(' i ', ' I '), [s, s.toUpperCase()], 'A sentence starts with a capital letter.')
    }
    case 2: {
      const n = rng.pick(NAMES)
      return q(level, 'Which name is written correctly?', n, [n.toLowerCase(), n[0].toLowerCase() + n.slice(1, -1) + n.slice(-1).toUpperCase()], 'Names start with a capital letter.')
    }
    case 3: {
      const [s, mark] = rng.pick<[string, string]>([
        ['Where is my pencil', '?'],
        ['I have a red ball', '.'],
        ['What is your name', '?'],
        ['We are going home', '.'],
        ['Do you like tea', '?'],
        ['The goat is eating', '.'],
        ['How old are you', '?'],
        ['My sister is tall', '.'],
        ['Can you see the bird', '?'],
        ['Is it raining', '?'],
        ['Who is your teacher', '?'],
        ['When is your birthday', '?'],
        ['I can ride a bicycle', '.'],
        ['The tea is hot', '.'],
        ['We love our school', '.'],
        ['Baba is a farmer', '.'],
      ])
      return q(level, `Which mark ends this sentence?\n${s} ___`, mark, mark === '?' ? ['.', ','] : ['?', ','], mark === '?' ? 'A question ends with ?' : 'A telling sentence ends with a full stop.')
    }
    case 4: {
      const n = rng.pick(NAMES)
      const t = rng.pick(TOWNS)
      const right = `${n} lives in ${t}.`
      return q(level, 'Which sentence is written correctly?', right, [`${n.toLowerCase()} lives in ${t}.`, `${n} lives in ${t.toLowerCase()}.`, `${n} lives in ${t}`], 'Names and places start with capital letters; end with a full stop.')
    }
    default: {
      const n = rng.pick(NAMES)
      const place = rng.pick(['the market', 'church', 'the river', 'school', 'the farm', 'the shop'])
      const right = `${n} and I went to ${place}.`
      return q(level, 'Which sentence is written correctly?', right, [`${n} and i went to ${place}.`, `${n.toLowerCase()} and I went to ${place}.`, `${n} and I went to ${place}`], '"I" is always a capital letter.')
    }
  }
}

// ── Spelling ────────────────────────────────────────────────────────────────

const SPELL: [string, ArtId][] = [
  ['cat', 'cat'],
  ['dog', 'dog'],
  ['hen', 'hen'],
  ['cup', 'cup'],
  ['egg', 'egg'],
  ['sun', 'sun'],
  ['bed', 'bed'],
  ['pot', 'pot'],
  ['fish', 'fish'],
  ['ball', 'ball'],
  ['book', 'book'],
  ['tree', 'tree'],
  ['goat', 'goat'],
  ['drum', 'drum'],
  ['bell', 'bell'],
  ['shoe', 'shoe'],
  ['moon', 'moon'],
  ['star', 'star'],
  ['mango', 'mango'],
  ['house', 'house'],
  ['chair', 'chair'],
  ['bread', 'bread'],
  ['bag', 'bag'],
  ['jug', 'jug'],
  ['ear', 'ear'],
  ['cow', 'cow'],
  ['lion', 'lion'],
  ['bird', 'bird'],
  ['hand', 'hand'],
  ['rock', 'rock'],
  ['leaf', 'leaf'],
  ['lake', 'lake'],
  ['sand', 'sand'],
  ['shirt', 'shirt'],
  ['plate', 'plate'],
  ['stone', 'stone'],
  ['cloud', 'cloud'],
  ['zebra', 'zebra'],
  ['towel', 'towel'],
  ['radio', 'radio'],
]

function tiles(level: Level, word: string, rng: Rng, art: ArtId): OrderQuestion {
  const letters = word.split('')
  return { id: uid('spell2'), type: 'order', level, prompt: 'Put the letters in order to spell the word.', tiles: rng.shuffle(letters), answer: letters, joiner: '', visual: { kind: 'art', art: [art] }, explain: `${letters.join(' - ')}: ${word}.` }
}

export const spell2: Generator = (rng, level) => {
  const pool = SPELL.filter(([w]) => (level === 1 ? w.length === 3 : level === 2 ? w.length <= 4 : level === 3 ? w.length <= 4 && new Set(w).size === w.length : level === 4 ? w.length >= 4 && new Set(w).size === w.length : w.length >= 4))
  const [word, art] = rng.pick(pool)
  if (level === 1) {
    const i = rng.pick([0, word.length - 1])
    const missing = word[i]
    const shown = word.slice(0, i) + '_' + word.slice(i + 1)
    return { ...q(level, `Which letter is missing? ${shown}`, missing, rng.sample('bcdfghlmnprstw'.split('').filter((x) => x !== missing), 2)), visual: { kind: 'art', art: [art] } }
  }
  if (level === 2) {
    const i = [...word].findIndex((c, k) => k > 0 && 'aeiou'.includes(c))
    const at = i > 0 ? i : 1
    const missing = word[at]
    return { ...q(level, `Which letter is missing? ${word.slice(0, at)}_${word.slice(at + 1)}`, missing, 'aeiou'.split('').filter((x) => x !== missing).slice(0, 3)), visual: { kind: 'art', art: [art] } }
  }
  if (level === 5) {
    const swap = word.length > 3 ? word[0] + word[2] + word[1] + word.slice(3) : word
    const wrong = [swap, word.slice(0, -1), word + word.slice(-1)].filter((w) => w !== word)
    return { ...q(level, 'Which word is spelt correctly?', word, wrong), visual: { kind: 'art', art: [art] } }
  }
  return tiles(level, word, rng, art)
}

// ── Reading a story ─────────────────────────────────────────────────────────

export const COMP2: BankQuestion[] = [
  ...passage(1, 'My Dog', 'I have a dog. His name is Rex. Rex is brown. He likes to run.', [
    ['What is the name of the dog?', 'Rex', ['Max', 'Tom']],
    ['What colour is Rex?', 'brown', ['black', 'white']],
    ['What does Rex like to do?', 'run', ['sleep', 'swim']],
  ]),
  ...passage(1, 'The Red Ball', 'Amina has a red ball. She plays with her friend Neema. They play in the garden.', [
    ['What colour is the ball?', 'red', ['blue', 'green']],
    ['Who is Amina\'s friend?', 'Neema', ['Juma', 'Rex']],
    ['Where do they play?', 'in the garden', ['in the kitchen', 'at the market']],
  ]),
  ...passage(2, 'At the Market', 'On Saturday, Baba went to the market. He bought tomatoes, onions and a big pumpkin. He carried them home in a basket.', [
    ['When did Baba go to the market?', 'on Saturday', ['on Monday', 'on Sunday']],
    ['What big thing did he buy?', 'a pumpkin', ['a goat', 'a bag']],
    ['How did he carry the things?', 'in a basket', ['in a car', 'on his head']],
  ]),
  ...passage(2, 'Rain', 'It rained all night. In the morning, the grass was wet. Juma wore his gumboots to school. He did not get his feet wet.', [
    ['When did it rain?', 'all night', ['in the morning', 'in the afternoon']],
    ['What did Juma wear?', 'gumboots', ['sandals', 'slippers']],
    ['Why did Juma wear gumboots?', 'The grass was wet.', ['It was hot.', 'He was late.']],
  ]),
  ...passage(3, 'The Hungry Goat', 'Kamau has a white goat. One morning the goat ran into Mama\'s garden. It ate the sukuma wiki. Mama was not happy. Now Kamau ties the goat under a tree.', [
    ['What colour is the goat?', 'white', ['black', 'brown']],
    ['What did the goat eat?', 'sukuma wiki', ['grass', 'maize']],
    ['How did Mama feel?', 'not happy', ['very happy', 'sleepy']],
    ['Where does Kamau tie the goat now?', 'under a tree', ['in the house', 'in the garden']],
  ]),
  ...passage(3, 'My Birthday', 'Today is my birthday. I am seven years old. Mama made a cake. My friends came and we sang songs. Baba gave me a new book.', [
    ['How old is the child?', 'seven', ['six', 'eight']],
    ['Who made the cake?', 'Mama', ['Baba', 'my friends']],
    ['What did Baba give the child?', 'a new book', ['a ball', 'a cake']],
    ['What did the friends do?', 'sang songs', ['slept', 'cooked']],
  ]),
  ...passage(4, 'The Lost Pencil', 'Wanjiru could not find her pencil. She looked in her bag and under her desk. Her friend Akinyi gave her a pencil to use. After school, Wanjiru found her pencil in her pocket! She gave Akinyi her pencil back and said, "Thank you."', [
    ['What did Wanjiru lose?', 'her pencil', ['her bag', 'her book']],
    ['Where did she look first?', 'in her bag', ['in her pocket', 'at home']],
    ['Who helped Wanjiru?', 'Akinyi', ['the teacher', 'Mama']],
    ['Where was the pencil?', 'in her pocket', ['under the desk', 'in the bag']],
    ['What did Wanjiru say to Akinyi?', '"Thank you."', ['"Sorry."', '"Goodbye."']],
  ]),
  ...passage(2, 'The Kite', 'Hassan made a kite from paper and sticks. He ran in the field and the kite went up. The wind was strong.', [
    ['What did Hassan make?', 'a kite', ['a ball', 'a boat']],
    ['Where did he run?', 'in the field', ['in the house', 'in the river']],
    ['What made the kite go up?', 'the strong wind', ['the rain', 'the sun']],
  ]),
  ...passage(4, 'Helping Grandmother', 'Every Saturday, Zawadi visits her grandmother. She sweeps the house and fetches water from the well. Grandmother tells her stories about animals. Last Saturday, Grandmother gave Zawadi two eggs to take home. Zawadi carried them carefully so they would not break.', [
    ['When does Zawadi visit her grandmother?', 'every Saturday', ['every Sunday', 'every morning']],
    ['Where does Zawadi fetch water?', 'from the well', ['from the river', 'from the tap']],
    ['What does Grandmother tell her?', 'stories about animals', ['songs', 'riddles']],
    ['How many eggs did Zawadi get?', '2', ['3', '1']],
    ['Why did Zawadi carry the eggs carefully?', 'so they would not break', ['so they would cook', 'so they would grow']],
  ]),
  ...passage(5, 'The Clever Crow', 'A thirsty crow found a jug with a little water at the bottom. Its beak could not reach the water. The crow had an idea. It dropped small stones into the jug, one by one. Slowly, the water came up to the top. The crow drank and flew away happily.', [
    ['What did the crow want?', 'water', ['food', 'a nest', 'a friend']],
    ['Why could the crow not drink at first?', 'its beak could not reach the water', ['a dog chased it away from the jug', 'the jug was broken and empty', 'the water was too hot to drink']],
    ['What did the crow drop into the jug?', 'small stones', ['leaves', 'seeds', 'sand']],
    ['What happened to the water?', 'it came up to the top', ['it dried up', 'it spilled', 'it turned cold']],
    ['Which word best describes the crow?', 'clever', ['lazy', 'rude', 'slow']],
  ]),
  ...passage(5, 'Sports Day', 'On sports day, Grade 2 ran a race. Juma ran fast but he fell down. Kendi stopped to help him up. They finished the race together and came last. The head teacher gave them a prize for kindness. Everyone clapped for them.', [
    ['What happened to Juma?', 'he fell down', ['he won the race', 'he went home', 'he lost his shoe']],
    ['Who helped Juma?', 'Kendi', ['the head teacher', 'his mother', 'nobody']],
    ['In what position did they finish?', 'last', ['first', 'second', 'third']],
    ['Why did they get a prize?', 'for kindness', ['for running fastest', 'for jumping', 'for singing']],
    ['What did everyone do?', 'clapped for them', ['laughed at them', 'went home', 'sat down']],
  ]),
  ...passage(5, 'The Little Seed', 'Otieno planted a bean seed in a small tin. He watered it every morning and put it in the sun. After five days, a small green shoot came out. After two weeks, the plant had four leaves. Otieno was very proud. He planted it in the garden so it could grow bigger.', [
    ['Where did Otieno first plant the seed?', 'in a small tin', ['in the garden', 'in a bag', 'in a cup']],
    ['When did he water it?', 'every morning', ['every evening', 'once a week', 'never']],
    ['After how many days did the shoot come out?', '5', ['2', '7', '14']],
    ['How did Otieno feel?', 'proud', ['sad', 'angry', 'afraid']],
    ['Why did he move the plant to the garden?', 'so it could grow bigger', ['because it died', 'to hide it', 'to sell it']],
  ]),
]

export const ENGLISH2_GENERATORS: Record<string, Generator> = {
  'se-listen': listen2,
  'se-phonics': phonics2,
  'se-vocab': vocab2,
  'se-nouns': nouns2,
  'se-pron': pron2,
  'se-verbs': verbs2,
  'se-prep': prep2,
  'se-adj': adj2,
  'se-mech': mech2,
  'se-spell': spell2,
}

export const ENGLISH2_BANKS: Record<string, BankQuestion[]> = {
  'se-comp': COMP2,
}
