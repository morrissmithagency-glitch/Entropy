// English Language Activities: questions built from a picture-word list (phonics,
// listening, spelling, grammar) plus hand-written banks for reading and sentences.
import type { ArtId } from '../../components/art/objects'
import { choice, textOptions, uid, an } from '../helpers'
import type { BankQuestion, Generator, Level, Option, Rng } from '../types'

export interface Word {
  word: string
  art: ArtId
  plural: string
}

export const WORDS: Word[] = [
  { word: 'cat', art: 'cat', plural: 'cats' },
  { word: 'dog', art: 'dog', plural: 'dogs' },
  { word: 'hen', art: 'hen', plural: 'hens' },
  { word: 'cow', art: 'cow', plural: 'cows' },
  { word: 'goat', art: 'goat', plural: 'goats' },
  { word: 'fish', art: 'fish', plural: 'fish' },
  { word: 'bird', art: 'bird', plural: 'birds' },
  { word: 'lion', art: 'lion', plural: 'lions' },
  { word: 'zebra', art: 'zebra', plural: 'zebras' },
  { word: 'elephant', art: 'elephant', plural: 'elephants' },
  { word: 'cup', art: 'cup', plural: 'cups' },
  { word: 'pot', art: 'pot', plural: 'pots' },
  { word: 'jug', art: 'jug', plural: 'jugs' },
  { word: 'bed', art: 'bed', plural: 'beds' },
  { word: 'bag', art: 'bag', plural: 'bags' },
  { word: 'ball', art: 'ball', plural: 'balls' },
  { word: 'book', art: 'book', plural: 'books' },
  { word: 'pen', art: 'pencil', plural: 'pens' },
  { word: 'sun', art: 'sun', plural: 'suns' },
  { word: 'moon', art: 'moon', plural: 'moons' },
  { word: 'star', art: 'star', plural: 'stars' },
  { word: 'tree', art: 'tree', plural: 'trees' },
  { word: 'leaf', art: 'leaf', plural: 'leaves' },
  { word: 'egg', art: 'egg', plural: 'eggs' },
  { word: 'mango', art: 'mango', plural: 'mangoes' },
  { word: 'orange', art: 'orange', plural: 'oranges' },
  { word: 'tomato', art: 'tomato', plural: 'tomatoes' },
  { word: 'drum', art: 'drum', plural: 'drums' },
  { word: 'bell', art: 'bell', plural: 'bells' },
  { word: 'house', art: 'house', plural: 'houses' },
  { word: 'shoe', art: 'shoe', plural: 'shoes' },
  { word: 'soap', art: 'soap', plural: 'soaps' },
  { word: 'comb', art: 'comb', plural: 'combs' },
  { word: 'tap', art: 'tap', plural: 'taps' },
  { word: 'hand', art: 'hand', plural: 'hands' },
  { word: 'rock', art: 'rock', plural: 'rocks' },
  { word: 'chair', art: 'chair', plural: 'chairs' },
  { word: 'plate', art: 'plate', plural: 'plates' },
]

const SHORT = WORDS.filter((w) => w.word.length === 3 && !['pen'].includes(w.word))
const FOUR = WORDS.filter((w) => w.word.length === 4)
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('')
const VOWEL_START = new Set(['a', 'e', 'i', 'o', 'u'])

function letterOptions(rng: Rng, answer: string, n: number, avoid = ''): Option[] {
  const pool = ALPHABET.filter((l) => l !== answer && !avoid.includes(l))
  return rng.shuffle([answer, ...rng.sample(pool, n - 1)]).map((l) => ({ id: l, label: l }))
}

// ── Listening and Speaking ──────────────────────────────────────────────────

/** Hear a word, pick the letter it starts with. Pictures fade out as levels rise. */
export const letterSounds: Generator = (rng, level) => {
  const w = rng.pick(WORDS)
  if (level <= 2) {
    return choice('sound', level, 'Listen. What sound does this word start with?', letterOptions(rng, w.word[0], level === 1 ? 3 : 4), w.word[0], {
      say: w.word,
      listen: true,
      visual: { kind: 'art', art: [w.art] },
      explain: `${w.word} starts with "${w.word[0]}".`,
    })
  }
  if (level === 3) {
    return choice('sound', level, 'Listen carefully. Which letter does the word start with?', letterOptions(rng, w.word[0], 4), w.word[0], {
      say: w.word,
      listen: true,
      explain: `The word was "${w.word}". It starts with "${w.word[0]}".`,
    })
  }
  if (level === 4) {
    const s = rng.pick(SHORT)
    const last = s.word[s.word.length - 1]
    return choice('sound', level, 'Listen. What sound does this word END with?', letterOptions(rng, last, 4, s.word[0]), last, {
      say: s.word,
      listen: true,
      visual: { kind: 'art', art: [s.art] },
      explain: `${s.word} ends with "${last}".`,
    })
  }
  // Same first sound as a heard word, from pictures.
  const target = rng.pick(WORDS)
  const same = WORDS.filter((x) => x.word[0] === target.word[0] && x.word !== target.word)
  if (same.length === 0) return letterSounds(rng, 4)
  const ans = rng.pick(same)
  const wrong = rng.sample(WORDS.filter((x) => x.word[0] !== target.word[0]), 2)
  const opts = rng.shuffle([ans, ...wrong]).map((x) => ({ id: x.word, art: x.art }))
  return choice('sound', level, 'Listen. Which picture starts with the same sound?', opts, ans.word, {
    say: target.word,
    listen: true,
    explain: `"${target.word}" and "${ans.word}" both start with "${target.word[0]}".`,
  })
}

/** Hear a word, choose the picture (later: the written word). */
export const listenChoose: Generator = (rng, level) => {
  const w = rng.pick(WORDS)
  if (level <= 3) {
    const pool = level === 3 ? WORDS.filter((x) => x.word[0] === w.word[0] || x.word.length === w.word.length) : WORDS
    let wrong = rng.sample(pool.filter((x) => x.word !== w.word && x.art !== w.art), level === 1 ? 2 : 3)
    if (wrong.length < (level === 1 ? 2 : 3)) wrong = rng.sample(WORDS.filter((x) => x.art !== w.art), 3)
    const opts = rng.shuffle([w, ...wrong]).map((x) => ({ id: x.word, art: x.art }))
    return choice('listen', level, 'Listen and choose the right picture.', opts, w.word, { say: w.word, listen: true, explain: `That was "${w.word}".` })
  }
  // Read the word you hear: similar-looking distractors.
  const lookalike = WORDS.filter((x) => x.word !== w.word && (x.word[0] === w.word[0] || x.word.slice(-2) === w.word.slice(-2)))
  const wrong = rng.sample(lookalike.length >= 3 ? lookalike : WORDS.filter((x) => x.word !== w.word), 3).map((x) => x.word)
  return choice('listen', level, 'Listen. Which word did you hear?', textOptions(rng, w.word, wrong, 4), w.word, {
    say: level === 5 ? `Find the word ${w.word}` : w.word,
    listen: true,
    explain: `You heard "${w.word}".`,
  })
}

// ── Reading ─────────────────────────────────────────────────────────────────

const RHYMES: string[][] = [
  ['cat', 'hat', 'mat', 'rat', 'bat'],
  ['dog', 'log', 'fog', 'frog'],
  ['hen', 'pen', 'ten', 'men'],
  ['sun', 'run', 'fun', 'bun'],
  ['bed', 'red', 'fed', 'shed'],
  ['pot', 'hot', 'dot', 'not'],
  ['cake', 'lake', 'make', 'bake'],
  ['bell', 'well', 'tell', 'shell'],
  ['tree', 'bee', 'see', 'three'],
  ['star', 'car', 'far', 'jar'],
]

export const phonics: Generator = (rng, level) => {
  if (level === 1) {
    const l = rng.pick(ALPHABET)
    const opts = rng.shuffle([l, ...rng.sample(ALPHABET.filter((x) => x !== l), 2)]).map((x) => ({ id: x, label: x }))
    return choice('phonics', level, `Find the small letter for capital ${l.toUpperCase()}.`, opts, l, { explain: `${l.toUpperCase()} and ${l} are the same letter.` })
  }
  if (level === 2) {
    const w = rng.pick(WORDS)
    const wrong = rng.sample(WORDS.filter((x) => x.word !== w.word && x.art !== w.art), 2).map((x) => x.word)
    return choice('phonics', level, 'Read the words. Which word goes with the picture?', textOptions(rng, w.word, wrong), w.word, { visual: { kind: 'art', art: [w.art] }, explain: `The picture shows ${an(w.word)}.` })
  }
  if (level === 3) {
    const family = rng.pick(RHYMES)
    const [a, b] = rng.sample(family, 2)
    const wrong = rng.sample(RHYMES.filter((f) => f !== family).flat(), 2)
    return choice('phonics', level, `Which word rhymes with "${a}"?`, textOptions(rng, b, wrong), b, { explain: `"${a}" and "${b}" end with the same sound.` })
  }
  if (level === 4) {
    const w = rng.pick(SHORT.concat(FOUR))
    return choice('phonics', level, `Which letter is missing? _${w.word.slice(1)}`, letterOptions(rng, w.word[0], 4), w.word[0], { visual: { kind: 'art', art: [w.art] }, explain: `The word is "${w.word}".` })
  }
  const w = rng.pick(SHORT)
  const sounds = w.word.split('').join(' – ')
  const wrong = rng.sample(SHORT.filter((x) => x.word !== w.word), 3).map((x) => x.word)
  return choice('phonics', level, `Blend the sounds: ${sounds}. What word is it?`, textOptions(rng, w.word, wrong, 4), w.word, {
    say: w.word.split('').join(', '),
    explain: `${sounds} makes "${w.word}".`,
  })
}

const SIGHT_WORDS = ['the', 'is', 'a', 'I', 'can', 'see', 'we', 'my', 'go', 'to', 'he', 'she', 'in', 'on', 'it', 'and', 'look', 'like', 'come', 'here', 'play', 'you', 'was', 'saw', 'no', 'are', 'said', 'has', 'have', 'they']
const CONFUSABLE: Record<string, string[]> = {
  was: ['saw', 'has', 'as'],
  saw: ['was', 'see', 'sew'],
  on: ['no', 'in', 'an'],
  no: ['on', 'go', 'so'],
  he: ['she', 'the', 'we'],
  she: ['he', 'see', 'the'],
  here: ['have', 'he', 'her'],
  they: ['the', 'then', 'there'],
  said: ['sad', 'sail', 'sand'],
  come: ['came', 'can', 'some'],
}

const FILL_IN: [string, string, string[]][] = [
  ['I ___ a big cow.', 'see', ['sea', 'she', 'is']],
  ['The cat ___ on the mat.', 'is', ['it', 'in', 'as']],
  ['We ___ to school.', 'go', ['no', 'to', 'so']],
  ['___ is my mother.', 'She', ['He', 'See', 'The']],
  ['Look at ___ ball.', 'my', ['me', 'we', 'by']],
  ['They ___ playing football.', 'are', ['is', 'am', 'was']],
  ['I ___ a red bag.', 'have', ['has', 'here', 'had']],
  ['Juma ___ a new pencil.', 'has', ['have', 'his', 'was']],
]

export const sightWords: Generator = (rng, level) => {
  if (level <= 2) {
    const w = rng.pick(SIGHT_WORDS)
    return choice('sight', level, 'Listen. Find the word.', textOptions(rng, w, SIGHT_WORDS.filter((x) => x.length !== w.length || level === 2), level === 1 ? 3 : 4), w, { say: w, listen: true })
  }
  if (level === 3) {
    const w = rng.pick(Object.keys(CONFUSABLE))
    return choice('sight', level, 'Listen carefully. Find the word.', textOptions(rng, w, CONFUSABLE[w], 4), w, { say: w, listen: true, explain: `The word was "${w}". Look closely at the letters!` })
  }
  const [sentence, ans, wrong] = rng.pick(FILL_IN)
  return choice('sight', level, `Choose the word that fits.\n${sentence}`, textOptions(rng, ans, wrong, level === 4 ? 3 : 4), ans, {
    say: sentence.replace('___', 'blank'),
    explain: sentence.replace('___', ans),
  })
}

// ── Language Use ────────────────────────────────────────────────────────────

const NAMING = ['table', 'mother', 'school', 'goat', 'book', 'teacher', 'Nairobi', 'water', 'house', 'ball', 'mango', 'Wanjiku']
const ACTION = ['run', 'jump', 'eat', 'sing', 'sleep', 'swim', 'write', 'read', 'dance', 'clap', 'sweep', 'cook']
const DESCRIBING = ['big', 'small', 'red', 'happy', 'tall', 'sweet']

export const namingAction: Generator = (rng, level) => {
  const wantNaming = rng.next() < 0.5
  const ans = rng.pick(wantNaming ? NAMING : ACTION)
  const wrongPool = wantNaming ? ACTION : NAMING
  if (level <= 3) {
    return choice('naming', level, `Which is ${wantNaming ? 'a naming word' : 'an action word'}?`, textOptions(rng, ans, level === 3 ? wrongPool.concat(DESCRIBING) : wrongPool, level === 1 ? 2 : 3), ans, {
      explain: wantNaming ? `"${ans}" names a person, place, animal or thing.` : `"${ans}" is something we do.`,
    })
  }
  const sentences: [string, string, 'naming' | 'action'][] = [
    ['The goat eats grass.', 'eats', 'action'],
    ['Amani runs to school.', 'runs', 'action'],
    ['The baby sleeps in the bed.', 'sleeps', 'action'],
    ['Mama cooks ugali.', 'cooks', 'action'],
    ['The bird sings in the tree.', 'sings', 'action'],
    ['The cat drinks milk.', 'cat', 'naming'],
    ['My teacher is kind.', 'teacher', 'naming'],
    ['The sun is hot.', 'sun', 'naming'],
  ]
  const [s, a, kind] = rng.pick(sentences)
  const others = s.replace('.', '').split(' ').filter((x) => x !== a && x.toLowerCase() !== 'the' && x.toLowerCase() !== 'my' && x !== 'is' && x !== 'in' && x !== 'to')
  return choice('naming', level, `Read: "${s}"\nWhich word is ${kind === 'naming' ? 'a naming word' : 'the action word'}?`, textOptions(rng, a, others, Math.min(level === 5 ? 4 : 3, others.length + 1)), a, {
    say: s,
    explain: kind === 'naming' ? `"${a}" is a naming word.` : `"${a}" tells us what is happening.`,
  })
}

export const grammar: Generator = (rng, level) => {
  if (level <= 2) {
    const vowel = rng.next() < 0.5
    const pool = WORDS.filter((w) => VOWEL_START.has(w.word[0]) === vowel && w.word !== 'pen')
    const w = rng.pick(pool.length ? pool : WORDS)
    const ans = VOWEL_START.has(w.word[0]) ? 'an' : 'a'
    return choice('grammar', level, `Choose: ___ ${w.word}`, [{ id: 'a', label: 'a' }, { id: 'an', label: 'an' }], ans, {
      visual: { kind: 'art', art: [w.art] },
      explain: ans === 'an' ? `We say "an ${w.word}" because ${w.word} starts with a vowel sound.` : `We say "${an(w.word)}".`,
    })
  }
  if (level === 3) {
    const w = rng.pick(WORDS.filter((x) => x.plural === x.word + 's'))
    return choice('grammar', level, `One ${w.word}, two ___`, textOptions(rng, w.plural, [w.word, w.word + 'es', w.word + 'ss'], 3), w.plural, {
      visual: { kind: 'art', art: [w.art, w.art] },
      explain: `One ${w.word}, two ${w.plural}.`,
    })
  }
  if (level === 4) {
    const q = rng.pick<[string, string, string[]]>([
      ['___ is my book here. (near me)', 'This', ['That', 'These', 'Those']],
      ['___ is a bird in the sky. (far away)', 'That', ['This', 'These', 'Those']],
      ['One box, two ___', 'boxes', ['boxs', 'box', 'boxies']],
      ['One tomato, two ___', 'tomatoes', ['tomatos', 'tomato', 'tomatoss']],
      ['One mango, three ___', 'mangoes', ['mango', 'mangos', 'mangoss']],
      ['One bus, two ___', 'buses', ['bus', 'buss', 'busies']],
    ])
    return choice('grammar', level, q[0], textOptions(rng, q[1], q[2], 3), q[1], { explain: q[0].replace('___', q[1]).replace(/ \(.*\)/, '') })
  }
  const q = rng.pick<[string, string, string[]]>([
    ['One leaf, many ___', 'leaves', ['leafs', 'leaf', 'leafes']],
    ['One child, many ___', 'children', ['childs', 'childes', 'child']],
    ['One man, two ___', 'men', ['mans', 'manes', 'man']],
    ['One foot, two ___', 'feet', ['foots', 'footes', 'feets']],
    ['One tooth, many ___', 'teeth', ['tooths', 'toothes', 'teeths']],
    ['___ are my shoes. (near me)', 'These', ['This', 'That', 'Those']],
    ['Look at ___ cows on the hill. (far away)', 'those', ['these', 'this', 'that']],
  ])
  return choice('grammar', level, q[0], textOptions(rng, q[1], q[2], 4), q[1], { explain: q[0].replace('___', q[1]).replace(/ \(.*\)/, '') })
}

const POSITION_ART: ArtId[] = ['ball', 'cat', 'hen', 'book', 'cup']
export const position: Generator = (rng, level) => {
  const art = rng.pick(POSITION_ART)
  const name = art as string
  const wheres = level <= 2 ? (['in', 'on', 'under'] as const) : (['in', 'on', 'under', 'beside', 'behind'] as const)
  const where = rng.pick(wheres)
  const ref = 'box'
  if (level <= 3) {
    return choice('position', level, `Where is the ${name}?`, textOptions(rng, where, [...wheres], level === 1 ? 3 : 4).map((o) => ({ ...o, label: `${o.label} the ${ref}` })), where, {
      visual: { kind: 'position', art, where },
      explain: `The ${name} is ${where} the ${ref}.`,
    })
  }
  const sentence = `The ${name} is ${where} the ${ref}.`
  const options = rng.shuffle<'in' | 'on' | 'under' | 'beside' | 'behind'>(rng.sample(wheres.filter((w) => w !== where), level === 4 ? 2 : 3).concat(where))
  return choice('position', level, `Read: "${sentence}" Which picture shows it?`, options.map((w) => ({ id: w, visual: { kind: 'position' as const, art, where: w } })), where, { say: sentence, explain: sentence })
}

// ── Writing ─────────────────────────────────────────────────────────────────

export const spelling: Generator = (rng, level) => {
  if (level <= 2) {
    const w = rng.pick(level === 1 ? SHORT : SHORT.concat(FOUR))
    const i = level === 1 ? 1 : rng.int(1, w.word.length - 1)
    const masked = w.word.slice(0, i) + '_' + w.word.slice(i + 1)
    return choice('spell', level, `Which letter is missing?  ${masked}`, letterOptions(rng, w.word[i], level === 1 ? 3 : 4), w.word[i], {
      visual: { kind: 'art', art: [w.art] },
      explain: `${w.word}: ${w.word.split('').join(' – ')}`,
    })
  }
  const pool = level === 3 ? SHORT : level === 4 ? FOUR : WORDS.filter((x) => x.word.length >= 4 && x.word.length <= 6)
  const w = rng.pick(pool)
  return {
    id: uid('spell'),
    type: 'order',
    level,
    prompt: level === 5 ? 'Listen, then spell the word.' : 'Spell the word. Tap the letters in order.',
    say: w.word,
    listen: level === 5,
    visual: level === 5 ? undefined : { kind: 'art', art: [w.art] },
    tiles: rng.shuffle(w.word.split('')),
    answer: w.word.split(''),
    joiner: '',
    explain: `${w.word}: ${w.word.split('').join(' – ')}`,
  }
}

const ORDER_SENTENCES = [
  'I like mangoes.',
  'The cat is black.',
  'We go to school.',
  'My mother cooks food.',
  'The goat eats grass.',
  'I can read a book.',
  'Baraka has a red ball.',
  'The sun is very hot today.',
  'We wash our hands with soap.',
  'My teacher reads us a story.',
]

const CORRECT_SENTENCES: [string, string[]][] = [
  ['I have a dog.', ['i have a dog.', 'I have a dog', 'i have a dog']],
  ['We play football.', ['we play football.', 'We play football', 'we play Football']],
  ['Amani is my friend.', ['amani is my friend.', 'Amani is my friend', 'amani is my friend']],
  ['The hen has six eggs.', ['the hen has six eggs.', 'The hen has six eggs', 'the Hen has six eggs']],
]

export const sentences: Generator = (rng, level) => {
  if (level === 1) {
    const w = rng.pick(['school', 'mango', 'house', 'teacher'])
    const s = `This is my ${w}`
    return choice('sentence', level, 'What mark do we put at the end of a sentence?', [
      { id: '.', label: `${s}.` },
      { id: ',', label: `${s},` },
      { id: 'none', label: s },
    ], '.', { explain: 'A sentence ends with a full stop (.)' })
  }
  if (level === 2) {
    const s = rng.pick(['amani', 'the dog', 'we', 'my mother', 'nairobi'])
    const fixed = s[0].toUpperCase() + s.slice(1)
    return choice('sentence', level, 'Which is written correctly at the start of a sentence?', textOptions(rng, fixed, [s], 2), fixed, {
      explain: 'A sentence starts with a capital letter.',
    })
  }
  if (level === 5) {
    const [ok, bad] = rng.pick(CORRECT_SENTENCES)
    return choice('sentence', level, 'Which sentence is written correctly?', textOptions(rng, ok, bad, 4), ok, { explain: `"${ok}" starts with a capital letter and ends with a full stop.` })
  }
  const pool = level === 3 ? ORDER_SENTENCES.slice(0, 6) : ORDER_SENTENCES.slice(4)
  const s = rng.pick(pool)
  const words = s.replace('.', '').split(' ')
  return {
    id: uid('sentence'),
    type: 'order',
    level,
    prompt: 'Put the words in order to make a sentence.',
    tiles: rng.shuffle(words),
    answer: words,
    joiner: ' ',
    explain: s,
  }
}

// ── Banks ───────────────────────────────────────────────────────────────────

export const POLITE: BankQuestion[] = [
  { type: 'choice', level: 1, prompt: 'You meet your teacher in the morning. What do you say?', options: opts(['Good morning, teacher.', 'Good night, teacher.', 'Go away.']), answer: 'Good morning, teacher.' },
  { type: 'choice', level: 1, prompt: 'Someone gives you a gift. What do you say?', options: opts(['Thank you.', 'Sorry.', 'Goodbye.']), answer: 'Thank you.' },
  { type: 'choice', level: 1, prompt: 'You want to borrow a pencil. Which word do you use?', options: opts(['Please', 'No', 'Bye']), answer: 'Please' },
  { type: 'choice', level: 2, prompt: 'You step on your friend\'s foot by mistake. What do you say?', options: opts(['I am sorry.', 'Thank you.', 'Good morning.']), answer: 'I am sorry.' },
  { type: 'choice', level: 2, prompt: 'It is time to go home. What do you say to your friends?', options: opts(['Goodbye!', 'Good morning!', 'Please!']), answer: 'Goodbye!' },
  { type: 'choice', level: 2, prompt: 'Which word do we use to greet someone in the afternoon?', options: opts(['Good afternoon', 'Good night', 'Good morning']), answer: 'Good afternoon' },
  { type: 'choice', level: 3, prompt: 'Your friend says, "How are you?" What do you answer?', options: opts(['I am fine, thank you.', 'My name is Amani.', 'I am six years old.']), answer: 'I am fine, thank you.' },
  { type: 'choice', level: 3, prompt: 'The teacher asks, "What is your name?" What do you answer?', options: opts(['My name is Zawadi.', 'I am fine.', 'Thank you.']), answer: 'My name is Zawadi.' },
  { type: 'choice', level: 3, prompt: 'You want to pass, but someone is in the way. What do you say?', options: opts(['Excuse me, please.', 'Move!', 'Goodbye.']), answer: 'Excuse me, please.' },
  { type: 'choice', level: 4, prompt: 'Which sentence is the most polite way to ask for water?', options: opts(['May I have some water, please?', 'Give me some water right now.', 'I want water, so bring it.', 'Water! Where is my water?']), answer: 'May I have some water, please?' },
  { type: 'choice', level: 4, prompt: 'Your friend says, "Thank you." What can you say?', options: opts(['You are welcome.', 'Sorry.', 'Good night.', 'Please.']), answer: 'You are welcome.' },
  { type: 'choice', level: 4, prompt: 'A visitor comes to class. The teacher says, "Greet the visitor." What do you say?', options: opts(['Good morning, visitor. You are welcome.', 'Goodbye, visitor. Go back home.', 'Sit down there and keep quiet.', 'Who are you and what do you want?']), answer: 'Good morning, visitor. You are welcome.' },
  { type: 'choice', level: 5, prompt: 'Read: "Kamau broke Njeri\'s ruler. He felt bad." What should Kamau say?', options: opts(['Njeri, I am sorry I broke your ruler.', 'Njeri, thank you for the ruler.', 'Njeri, good night.', 'Njeri, give me another ruler.']), answer: 'Njeri, I am sorry I broke your ruler.' },
  { type: 'choice', level: 5, prompt: 'Which one is NOT a polite word?', options: opts(['Shut up', 'Please', 'Thank you', 'Sorry']), answer: 'Shut up' },
  { type: 'choice', level: 5, prompt: 'Before you speak in class, what should you do?', options: opts(['Put up your hand.', 'Shout loudly.', 'Stand on the desk.', 'Clap your hands.']), answer: 'Put up your hand.' },
]

export const COMPREHENSION: BankQuestion[] = [
  { type: 'choice', level: 1, prompt: 'Read: "The ball is red." What colour is the ball?', options: opts(['red', 'blue', 'green']), answer: 'red', visual: { kind: 'art', art: ['ball'] } },
  { type: 'choice', level: 1, prompt: 'Read: "I have two cats." How many cats?', options: opts(['two', 'one', 'three']), answer: 'two' },
  { type: 'choice', level: 2, prompt: 'Read: "Amani has a big dog. The dog is brown." What colour is the dog?', options: opts(['brown', 'black', 'white']), answer: 'brown' },
  { type: 'choice', level: 2, prompt: 'Read: "The hen is under the table." Where is the hen?', options: opts(['under the table', 'on the table', 'in the box']), answer: 'under the table' },
  ...passage(3, 'Zawadi\'s Mango', 'Zawadi has a mango. The mango is yellow. She shares it with her brother Baraka. They are happy.', [
    ['What does Zawadi have?', 'a mango', ['an orange', 'a banana']],
    ['What colour is the mango?', 'yellow', ['green', 'red']],
    ['Who is Zawadi\'s brother?', 'Baraka', ['Amani', 'Kamau']],
  ]),
  ...passage(4, 'At the Market', 'On Saturday, Mama and Otieno went to the market. Mama bought tomatoes and onions. Otieno carried the basket. It was very heavy.', [
    ['When did they go to the market?', 'on Saturday', ['on Monday', 'on Sunday', 'on Friday']],
    ['What did Mama buy?', 'tomatoes and onions', ['mangoes and bananas', 'bread and milk', 'eggs and maize']],
    ['Who carried the basket?', 'Otieno', ['Mama', 'Baba', 'the teacher']],
    ['How was the basket?', 'heavy', ['light', 'empty', 'small']],
  ]),
  ...passage(5, 'The Rain', 'It rained all night. In the morning, Achieng saw a big puddle near the gate. She put on her gumboots and jumped over it. Her little brother Kip fell in the puddle and laughed. Mama said, "Now we must wash your clothes!"', [
    ['When did it rain?', 'all night', ['in the afternoon', 'in the morning', 'on Sunday']],
    ['What did Achieng put on?', 'gumboots', ['a hat', 'a sweater', 'slippers']],
    ['Who fell in the puddle?', 'Kip', ['Achieng', 'Mama', 'the dog']],
    ['Why must Mama wash clothes?', 'Kip fell in the puddle.', ['It was Monday.', 'The clothes were new.', 'Achieng was hungry.']],
  ]),
  ...passage(5, 'Kobe the Tortoise', 'Kobe the tortoise wanted to see the lake. He walked slowly past the acacia tree. A hare ran past and laughed. "You are too slow!" Kobe did not stop. In the evening, Kobe reached the lake. The hare was asleep under a tree.', [
    ['Where did Kobe want to go?', 'to the lake', ['to the market', 'to school', 'to the forest']],
    ['Who laughed at Kobe?', 'the hare', ['the lion', 'the bird', 'the goat']],
    ['When did Kobe reach the lake?', 'in the evening', ['in the morning', 'at night', 'on Monday']],
    ['What lesson does the story teach?', 'Do not give up.', ['Run very fast.', 'Sleep a lot.', 'Laugh at others.']],
  ]),
]

function opts(labels: string[]): Option[] {
  return labels.map((l) => ({ id: l, label: l }))
}

/** A short story whose questions all show the story above them. */
export function passage(level: Level, title: string, text: string, qs: [string, string, string[]][]): BankQuestion[] {
  return qs.map(([q, a, wrong], i) => ({
    type: 'choice' as const,
    level: (i === 0 && level > 1 ? level - 1 : level) as Level,
    prompt: q,
    say: `${text} ${q}`,
    visual: { kind: 'passage' as const, title, text },
    options: opts([a, ...wrong]),
    answer: a,
  }))
}

export { opts as labelOptions }

export const ENGLISH_GENERATORS: Record<string, Generator> = {
  'e-sounds': letterSounds,
  'e-words': listenChoose,
  'e-letters': phonics,
  'e-sight': sightWords,
  'e-naming': namingAction,
  'e-grammar': grammar,
  'e-position': position,
  'e-spelling': spelling,
  'e-sentences': sentences,
}

export const ENGLISH_BANKS: Record<string, BankQuestion[]> = {
  'e-polite': POLITE,
  'e-comprehension': COMPREHENSION,
}
