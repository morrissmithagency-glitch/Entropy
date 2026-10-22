// Grade 3 English. Formats follow Grade 3 papers (do/does/did/done, of/under/in,
// possessive pronouns, irregular plurals, alphabetical order, opposites, jobs, and
// stories with detail, vocabulary and "why" questions). All content is original.
import { uid } from '../helpers'
import type { BankQuestion, Generator, Level } from '../types'
import { labelOptions as opts, passage } from './english'

const t = (level: Level, prompt: string, answer: string, wrong: string[]): BankQuestion => ({ type: 'choice', level, prompt, options: opts([answer, ...wrong]), answer })

// ── Alphabetical order (generated) ──────────────────────────────────────────

const WORD_SETS: string[][] = [
  ['teacher', 'pilot', 'farmer', 'nurse', 'driver', 'cook', 'mason', 'tailor'],
  ['zebra', 'lion', 'goat', 'elephant', 'monkey', 'cat', 'hippo', 'antelope'],
  ['mango', 'banana', 'orange', 'pawpaw', 'guava', 'apple', 'lemon', 'avocado'],
  ['river', 'hill', 'lake', 'valley', 'ocean', 'forest', 'desert', 'island'],
  ['Kisumu', 'Nairobi', 'Mombasa', 'Eldoret', 'Garissa', 'Lamu', 'Thika', 'Kitui'],
]
// Same first letter: the learner must look at the second letter.
const HARD_SETS: string[][] = [
  ['bread', 'bean', 'banana', 'butter', 'biscuit'],
  ['make', 'mango', 'melon', 'milk', 'mother'],
  ['sing', 'sand', 'soap', 'sugar', 'seed'],
  ['tree', 'table', 'tomato', 'tiger', 'tea'],
]

export const alphabetical: Generator = (rng, level) => {
  if (level === 1) {
    const set = rng.pick(WORD_SETS)
    const words = rng.sample(set.filter((w, i, a) => a.findIndex((x) => x[0] === w[0]) === i), 3)
    const first = [...words].sort((a, b) => a.localeCompare(b))[0]
    return { id: uid('abc'), type: 'choice', level, prompt: 'Which word comes first in alphabetical order?', options: opts(words), answer: first, explain: `${first} starts with "${first[0]}", which comes first in the alphabet.` }
  }
  const pool = level >= 5 ? rng.pick(HARD_SETS) : rng.pick(WORD_SETS)
  const n = level === 2 ? 3 : level === 3 ? 4 : 5
  const unique = level >= 5 ? pool : pool.filter((w, i, a) => a.findIndex((x) => x[0].toLowerCase() === w[0].toLowerCase()) === i)
  const words = rng.sample(unique, Math.min(n, unique.length))
  const sorted = [...words].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
  return {
    id: uid('abc'),
    type: 'order',
    level,
    prompt: level >= 5 ? 'Arrange in alphabetical order. They start with the same letter, so look at the next one!' : 'Arrange the words in alphabetical order.',
    tiles: rng.shuffle(words),
    answer: sorted,
    joiner: ', ',
    explain: sorted.join(', '),
  }
}

// ── Plurals (generated from a list) ─────────────────────────────────────────

const PLURALS: [string, string, number][] = [
  ['book', 'books', 1], ['pen', 'pens', 1], ['cow', 'cows', 1],
  ['box', 'boxes', 2], ['bus', 'buses', 2], ['dish', 'dishes', 2], ['watch', 'watches', 2], ['tomato', 'tomatoes', 2],
  ['baby', 'babies', 3], ['lady', 'ladies', 3], ['city', 'cities', 3], ['story', 'stories', 3], ['puppy', 'puppies', 3],
  ['leaf', 'leaves', 4], ['knife', 'knives', 4], ['loaf', 'loaves', 4], ['wife', 'wives', 4], ['thief', 'thieves', 4],
  ['child', 'children', 5], ['man', 'men', 5], ['woman', 'women', 5], ['mouse', 'mice', 5], ['tooth', 'teeth', 5], ['foot', 'feet', 5], ['sheep', 'sheep', 5], ['goose', 'geese', 5],
]

function wrongPlurals(w: string, right: string): string[] {
  const set = new Set([w + 's', w + 'es', w.replace(/y$/, 'ys'), w.replace(/f(e)?$/, 'fs'), w + 'ren', w.replace(/oo/, 'ee') + 's', right + 's'])
  set.delete(right)
  return [...set].filter((x) => x !== w || right !== w)
}

export const plurals3: Generator = (rng, level) => {
  const pool = PLURALS.filter((p) => p[2] === level || (level === 1 && p[2] <= 2))
  const [w, pl] = rng.pick(pool)
  const sentence = rng.pick([`The ${w} is here.`, `I saw a ${w}.`, `Look at that ${w}.`])
  const wrong = rng.sample(wrongPlurals(w, pl), 3)
  return {
    id: uid('plural'),
    type: 'choice',
    level,
    prompt: `Write the plural of the underlined word.\n${sentence.replace(w, `_${w}_`)}`,
    say: `What is the plural of ${w}?`,
    options: rng.shuffle([pl, ...wrong]).map((x) => ({ id: x, label: x })),
    answer: pl,
    explain: `One ${w}, many ${pl}.`,
  }
}

// ── Banks ───────────────────────────────────────────────────────────────────

export const RESPOND3: BankQuestion[] = [
  t(1, 'The teacher asks, "Where do we play during break time?" Which is the best answer?', 'We play in the field.', ['We play in the toilet.', 'We play in the kitchen.']),
  t(1, 'What do we use when sweeping?', 'a broom', ['a spoon', 'a pencil']),
  t(1, 'Who treats sick people in a hospital?', 'a doctor', ['a pilot', 'a mason']),
  t(2, 'Who flies an aeroplane?', 'a pilot', ['a driver', 'a sailor', 'a farmer']),
  t(2, 'Who sells meat?', 'a butcher', ['a baker', 'a tailor', 'a barber']),
  t(2, 'Who makes clothes using a sewing machine?', 'a tailor', ['a carpenter', 'a cook', 'a nurse']),
  t(3, 'Who builds houses using stones?', 'a mason', ['a fisherman', 'a pilot', 'a shopkeeper']),
  t(3, 'Who makes chairs and tables from wood?', 'a carpenter', ['a mason', 'a butcher', 'a doctor']),
  t(3, 'Your friend asks, "What is your favourite game?" Which is the best answer?', 'My favourite game is football.', ['I am eight years old.', 'My mother is a nurse.', 'I go to school.']),
  t(4, 'Who catches fish in the lake?', 'a fisherman', ['a shepherd', 'a farmer', 'a hunter']),
  t(4, 'Who takes care of sheep and goats?', 'a shepherd', ['a fisherman', 'a mason', 'a barber']),
  t(4, 'Who cuts and plaits hair?', 'a hairdresser', ['a tailor', 'a cook', 'a mechanic']),
  t(5, 'Who repairs cars in a garage?', 'a mechanic', ['a carpenter', 'a pilot', 'a plumber']),
  t(5, 'Who fixes broken water pipes?', 'a plumber', ['a mechanic', 'a baker', 'a mason']),
  t(5, 'Which answer is polite when an elder asks, "Can you help me carry this bag?"', 'Yes, I will help you.', ['No, carry it yourself.', 'Why should I?', 'I am busy playing.']),
]

export const VOCAB3: BankQuestion[] = [
  t(1, 'What is the opposite of "big"?', 'small', ['tall', 'fat']),
  t(1, 'What is the opposite of "hot"?', 'cold', ['warm', 'wet']),
  t(1, 'What is the opposite of "up"?', 'down', ['in', 'on']),
  t(2, 'What is the opposite of "narrow"?', 'wide', ['short', 'thin']),
  t(2, 'What is the opposite of "bitter"?', 'sweet', ['sour', 'salty']),
  t(2, 'What is the opposite of "early"?', 'late', ['fast', 'soon']),
  t(3, 'What is the opposite of "heavy"?', 'light', ['dark', 'strong', 'big']),
  t(3, 'What is the opposite of "full"?', 'empty', ['half', 'open', 'many']),
  t(3, 'What is the opposite of "rough"?', 'smooth', ['soft', 'hard', 'flat']),
  t(4, 'Which word means the same as "huge"?', 'very big', ['very small', 'very old', 'very fast']),
  t(4, 'Which word means the same as "glad"?', 'happy', ['sad', 'angry', 'tired']),
  t(4, 'Which word means the same as "begin"?', 'start', ['end', 'stop', 'wait']),
  t(5, 'Choose the opposite of the underlined word: "The river is _deep_."', 'shallow', ['wide', 'long', 'clean']),
  t(5, 'Choose the opposite: "Amina arrived _first_."', 'last', ['early', 'second', 'next']),
  t(5, 'Choose the word that means "a person who buys things":', 'customer', ['seller', 'farmer', 'trader']),
]

export const VERBS3: BankQuestion[] = [
  t(1, 'I ___ my homework every evening.', 'do', ['does', 'done']),
  t(1, 'She ___ her homework every evening.', 'does', ['do', 'done']),
  t(1, 'They ___ not like cold tea.', 'do', ['does', 'done']),
  t(2, 'He ___ the work faster than me.', 'does', ['do', 'done']),
  t(2, 'We ___ the cleaning yesterday.', 'did', ['do', 'done']),
  t(2, 'I will ___ my best in class.', 'do', ['did', 'does']),
  t(3, 'They have ___ the work.', 'done', ['did', 'do', 'does']),
  t(3, 'What ___ you eat for supper last night?', 'did', ['do', 'does', 'done']),
  t(3, 'Has Wanjiru ___ her chores?', 'done', ['did', 'does', 'do']),
  t(4, 'Yesterday Otieno ___ to the market. (go)', 'went', ['goes', 'gone', 'going']),
  t(4, 'Every morning the children ___ to school. (walk)', 'walk', ['walks', 'walked', 'walking']),
  t(4, 'Look! The baby ___ now. (sleep)', 'is sleeping', ['sleep', 'slept', 'sleeps']),
  t(5, 'Which sentence is correct?', 'She has done her homework.', ['She has did her homework.', 'She have done her homework.', 'She done her homework.']),
  t(5, 'Which sentence is correct?', 'They did the work yesterday.', ['They done the work yesterday.', 'They does the work yesterday.', 'They do the work yesterday.']),
  t(5, 'Last week Mama ___ a cake for my birthday. (bake)', 'baked', ['bakes', 'baking', 'bake']),
]

export const PREP3: BankQuestion[] = [
  { type: 'choice', level: 1, prompt: 'The ball is ___ the box.', options: opts(['in', 'of', 'at']), answer: 'in', visual: { kind: 'position', art: 'ball', where: 'in' } },
  { type: 'choice', level: 1, prompt: 'The cat is ___ the box.', options: opts(['under', 'of', 'in']), answer: 'under', visual: { kind: 'position', art: 'cat', where: 'under' } },
  { type: 'choice', level: 1, prompt: 'The cup is ___ the box.', options: opts(['on', 'under', 'of']), answer: 'on', visual: { kind: 'position', art: 'cup', where: 'on' } },
  t(2, 'The mangoes are ___ the basket.', 'in', ['of', 'at']),
  t(2, 'The dog is sleeping ___ the table.', 'under', ['of', 'at']),
  t(2, 'We go to school ___ Monday.', 'on', ['in', 'at']),
  t(3, 'Benson is proud ___ his Mathematics teacher.', 'of', ['in', 'under', 'on']),
  t(3, 'Lunch is ___ one o\'clock.', 'at', ['on', 'in', 'of']),
  t(3, 'My birthday is ___ June.', 'in', ['on', 'at', 'of']),
  t(4, 'The school is ___ the church and the market. (in the middle)', 'between', ['under', 'of', 'on']),
  t(4, 'Hide ___ the door so nobody sees you.', 'behind', ['between', 'of', 'at']),
  t(4, 'The bird flew ___ the house to the tree.', 'from', ['of', 'at', 'under']),
  t(5, 'Choose the correct sentence.', 'The book is under the bed.', ['The book is of the bed.', 'The book is at under the bed.', 'The book is the bed under.']),
  t(5, 'We swam ___ the lake ___ Saturday.', 'in, on', ['on, in', 'of, at', 'at, of']),
  t(5, 'A glass ___ milk is good ___ your bones.', 'of, for', ['in, of', 'for, of', 'on, at']),
]

export const PRON3: BankQuestion[] = [
  t(1, 'This is my bicycle. The bicycle is ___.', 'mine', ['me', 'my']),
  t(1, '___ is your class teacher?', 'Who', ['What', 'Where']),
  t(1, '___ is your name?', 'What', ['Who', 'When']),
  t(2, 'I carried her bag. The bag is ___.', 'hers', ['her', 'she']),
  t(2, 'That is his pencil. The pencil is ___.', 'his', ['him', 'he']),
  t(2, '___ do you live? I live in Nakuru.', 'Where', ['Who', 'What']),
  t(3, 'They cleaned our clothes. The clothes are ___.', 'ours', ['us', 'we', 'our']),
  t(3, 'The goats belong to the farmers. The goats are ___.', 'theirs', ['them', 'they', 'their']),
  t(3, '___ is the school bus coming? At seven o\'clock.', 'When', ['Who', 'Where', 'Which']),
  t(4, 'Kamau and I are friends. ___ play together every day.', 'We', ['Us', 'Our', 'Ours']),
  t(4, 'Achieng lost ___ pen in the field.', 'her', ['hers', 'she', 'him']),
  t(4, '___ book is this? It is Juma\'s.', 'Whose', ['Who', 'What', 'Where']),
  t(5, 'Choose the correct sentence.', 'The red bag is mine, and the blue one is yours.', ['The red bag is my, and the blue one is your.', 'The red bag is me, and the blue one is you.', 'The red bag is mine, and the blue one is your.']),
  t(5, 'Mother gave Tom and me a mango. She gave it to ___.', 'us', ['we', 'our', 'ours']),
  t(5, 'The teacher said to the girls, "These books are ___."', 'yours', ['your', 'you', 'yourselves']),
]

export const MECH3: BankQuestion[] = [
  t(1, 'Write in small letters: ELEPHANT', 'elephant', ['Elephant', 'eLEPHANT']),
  t(1, 'Write in small letters: GOODBYE', 'goodbye', ['Goodbye', 'GOODbye']),
  t(1, 'Which name is written correctly?', 'Nairobi', ['nairobi', 'nAIROBI']),
  t(2, 'Write in small letters: CLASSROOM', 'classroom', ['Classroom', 'class room']),
  t(2, 'Which sentence begins correctly?', 'My friend is kind.', ['my friend is kind.', 'mY friend is kind.']),
  t(2, 'What mark ends a question?', '?', ['.', ',']),
  t(3, 'Which sentence is a question?', 'Where is my book?', ['My book is here.', 'Bring my book.', 'What a nice book!']),
  t(3, 'Which needs capital letters?', 'kisumu and mombasa', ['the dog and cat', 'a big tree', 'my red bag']),
  t(3, 'Choose the correctly written sentence.', 'Juma lives in Kitui.', ['juma lives in kitui.', 'Juma lives in kitui', 'juma Lives In Kitui.']),
  t(4, 'Which sentence uses a comma correctly?', 'I bought eggs, milk and bread.', ['I bought, eggs milk and bread.', 'I, bought eggs milk and bread.', 'I bought eggs milk, and, bread.']),
  t(4, 'Which day is written correctly?', 'Wednesday', ['wednesday', 'WEDNESday', 'wenesday']),
  t(4, 'Choose the correct spelling.', 'beautiful', ['beutiful', 'beautifull', 'bueatiful']),
  t(5, 'Which sentence is written correctly?', 'On Friday, Wanjiru and I visited Lake Nakuru.', ['on friday, Wanjiru and i visited lake nakuru.', 'On friday Wanjiru and I visited lake Nakuru', 'On Friday, wanjiru and I visited Lake nakuru.']),
  t(5, 'Choose the correct spelling.', 'environment', ['enviroment', 'environmant', 'invironment']),
  t(5, 'Which is a full sentence?', 'The children sang a song.', ['The children and.', 'Sang a song.', 'A song the.']),
]

export const COMP3: BankQuestion[] = [
  ...passage(1, 'The New Bicycle', 'Halima got a new bicycle on her birthday. It was blue with a small bell. She rode it to her grandmother\'s house.', [
    ['What did Halima get?', 'a bicycle', ['a doll', 'a book']],
    ['What colour was it?', 'blue', ['red', 'green']],
    ['Where did she ride it?', 'to her grandmother\'s house', ['to school', 'to the market']],
  ]),
  ...passage(2, 'Market Day', 'On Saturday, Baba and Kiprono went to Kapsabet market. Baba sold two bags of potatoes. With the money, he bought a jacket for Kiprono and some sugar for the house.', [
    ['When did they go to the market?', 'on Saturday', ['on Monday', 'on Sunday']],
    ['What did Baba sell?', 'potatoes', ['maize', 'milk', 'eggs']],
    ['What did Baba buy for Kiprono?', 'a jacket', ['a ball', 'shoes', 'a bag']],
    ['Why did Baba have money to buy things?', 'He sold the potatoes.', ['He found it.', 'Kiprono gave it to him.', 'He borrowed it.']],
  ]),
  ...passage(3, 'The Squirrel\'s Garden', 'Squirrel grew sukuma wiki and onions behind his house. A big tree blocked the sun. Monkey said, "I can cut it down." The next day Monkey cut the tree, but it fell on the garden and broke the fence. Monkey ran away into the forest.', [
    ['What did Squirrel grow?', 'sukuma wiki and onions', ['maize and beans', 'mangoes and bananas', 'tea and coffee']],
    ['Why did Squirrel not like the tree?', 'It blocked the sun.', ['It was too small.', 'It had no leaves.', 'Monkey lived in it.']],
    ['Where did the tree fall?', 'on the garden', ['on the house', 'in the river', 'on the road']],
    ['Who ran away?', 'Monkey', ['Squirrel', 'Elephant', 'the farmer']],
  ]),
  ...passage(4, 'Growing Sukuma Wiki', 'Nekesa\'s mother said vegetables were costly at the market. So Nekesa planted four rows of sukuma wiki and two rows of spinach near the house. She watered them every evening after school. Soon they had more vegetables than they could eat, so Mother sold some to the neighbours.', [
    ['Why did Nekesa plant vegetables?', 'Vegetables were costly at the market.', ['She did not like them.', 'Her teacher told her to.', 'The neighbours asked her.']],
    ['How many rows of sukuma wiki did she plant?', '4', ['2', '6', '3']],
    ['How many rows did she plant in all?', '6', ['4', '2', '8']],
    ['When did she water the plants?', 'every evening after school', ['every Sunday', 'in the morning', 'once a month']],
    ['Which word tells us the vegetables were expensive?', 'costly', ['more', 'soon', 'near']],
  ]),
  ...passage(5, 'Hide and Seek', 'The moon was big and bright over Kakamega. After supper the children played hide and seek. Imani hid behind the water tank. Juma hid behind some banana plants. Wafula hid in a pile of firewood. Akinyi counted to twenty and looked around. Then the firewood moved! "One, two, three, Wafula!" she shouted. Now Wafula had to look for the others.', [
    ['What part of the day was it?', 'night', ['morning', 'afternoon', 'noon']],
    ['Who hid behind the banana plants?', 'Juma', ['Imani', 'Wafula', 'Akinyi']],
    ['Who was looking for the others first?', 'Akinyi', ['Wafula', 'Juma', 'Imani']],
    ['How did Akinyi know where Wafula was?', 'The firewood moved.', ['He laughed.', 'Juma told her.', 'She saw his shoes.']],
    ['Who had to look for the others next?', 'Wafula', ['Akinyi', 'Juma', 'Imani']],
  ]),
  ...passage(5, 'The Baobab', 'The baobab is a very large tree with a thick trunk. It can live for hundreds of years. In the dry season it has no leaves. Its fruit has a white powder that people mix with water to make a sour drink. Birds build nests in its branches, and its bark can be made into rope.', [
    ['What does the passage say about the trunk?', 'It is thick.', ['It is thin.', 'It is short.', 'It is weak.']],
    ['When does the baobab have no leaves?', 'in the dry season', ['in the rainy season', 'at night', 'every morning']],
    ['What do people make from the fruit powder?', 'a drink', ['rope', 'nests', 'soap']],
    ['What can be made from the bark?', 'rope', ['a drink', 'nests', 'powder']],
    ['Which sentence is TRUE?', 'Birds build nests in the baobab.', ['The baobab lives for one year.', 'The fruit makes a sweet cake.', 'The baobab is a small tree.']],
  ]),
]

export const ENGLISH3_GENERATORS: Record<string, Generator> = {
  'te-abc': alphabetical,
  'te-plural': plurals3,
}

export const ENGLISH3_BANKS: Record<string, BankQuestion[]> = {
  'te-respond': RESPOND3,
  'te-vocab': VOCAB3,
  'te-verbs': VERBS3,
  'te-prep': PREP3,
  'te-pron': PRON3,
  'te-mech': MECH3,
  'te-comp': COMP3,
}
