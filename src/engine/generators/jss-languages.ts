// Junior school English and Kiswahili (Grades 7–9). New tables for the junior school topics
// (figures of speech, idioms, word classes, conditionals, sentence types, reported speech;
// fasihi simulizi, aina za maneno, kauli za vitenzi, usemi wa taarifa), blended with the
// Grade 6 makers so revision stays in the mix. The share of junior school questions grows
// from Grade 7 to Grade 9.
import { uid } from '../helpers'
import type { BankQuestion, ChoiceQuestion, Generator, Level, Rng } from '../types'
import { labelOptions as opts } from './english'
import { adjU, nounsU, prepU, pronounsU, punctU, sentencesU, spellU, verbsU, vocabU, CLOZE_U, COMP_U } from './upper-english'
import { methaliU, msamiatiU, ngeliU, nyakatiU, uakifishajiU, vivumishiU, CLOZE_K, UFAHAMU_K } from './upper-kiswahili'

type J = 7 | 8 | 9

const q = (level: Level, prompt: string, answer: string, wrong: string[], explain?: string): ChoiceQuestion => ({
  id: uid('jl'),
  type: 'choice',
  level,
  prompt,
  options: [answer, ...[...new Set(wrong)].filter((w) => w !== answer)].slice(0, 4).map((l) => ({ id: l, label: l })),
  answer,
  explain,
})
const share = (g: J) => (g === 7 ? 0.55 : g === 8 ? 0.7 : 0.8)
/** Grade 6 questions, one level harder than asked (capped at 5), for revision. */
const g6 = (gen: Generator): Generator => (rng, level) => ({ ...gen(rng, Math.min(5, level + 1) as Level), level })
/** Junior school questions most of the time, Grade 6 revision the rest. */
const blend = (g: J, jss: Generator, ...old: Generator[]): Generator => (rng, level) => (old.length === 0 || rng.next() < share(g) ? jss(rng, level) : g6(rng.pick(old))(rng, level))
/** Rows are [first grade, ...data]. */
const rowsFor = <T extends unknown[]>(rows: [J, ...T][], g: J): T[] => rows.filter(([min]) => min <= g).map(([, ...rest]) => rest as unknown as T)
const tableQ = (rng: Rng, level: Level, rows: [string, string, string[]][], prefix = '') => {
  const [p, a, w] = rng.pick(rows)
  return q(level, `${prefix}${p}`, a, w)
}

// ── English: literature ─────────────────────────────────────────────────────

const FIGURES: [J, string, string][] = [
  [7, 'She is as brave as a lion.', 'simile'],
  [7, 'He ran like the wind.', 'simile'],
  [7, 'Her smile was as bright as the sun.', 'simile'],
  [7, 'The classroom was a zoo after the bell.', 'metaphor'],
  [7, 'My brother is a walking dictionary.', 'metaphor'],
  [7, 'Time is money.', 'metaphor'],
  [7, 'The wind whispered through the trees.', 'personification'],
  [7, 'The sun smiled down on the farmers.', 'personification'],
  [7, 'The old door groaned as it opened.', 'personification'],
  [7, 'I have told you a million times!', 'hyperbole'],
  [7, 'My school bag weighs a ton.', 'hyperbole'],
  [7, 'The bees buzzed around the flowers.', 'onomatopoeia'],
  [7, 'The rain went drip, drip, drip on the roof.', 'onomatopoeia'],
  [8, 'Big brown bears bounced on the bridge.', 'alliteration'],
  [8, 'Seven slow snails slid silently.', 'alliteration'],
  [8, 'The lazy river lay asleep in the sun.', 'personification'],
  [8, 'I was so hungry I could eat an elephant.', 'hyperbole'],
  [8, 'The thunder boomed across the valley.', 'onomatopoeia'],
  [9, 'There was a deafening silence in the hall.', 'oxymoron'],
  [9, 'It was a bittersweet farewell.', 'oxymoron'],
  [9, 'Who does not love a good story?', 'rhetorical question'],
  [9, 'Can we ever thank our mothers enough?', 'rhetorical question'],
  [9, 'Run, run, run as fast as you can!', 'repetition'],
]
const FIGURE_NAMES = ['simile', 'metaphor', 'personification', 'hyperbole', 'onomatopoeia', 'alliteration', 'oxymoron', 'rhetorical question', 'repetition']

const IDIOMS: [J, string, string][] = [
  [7, 'a piece of cake', 'something very easy'],
  [7, 'once in a blue moon', 'very rarely'],
  [7, 'under the weather', 'feeling unwell'],
  [7, 'hit the books', 'study hard'],
  [7, 'let the cat out of the bag', 'reveal a secret'],
  [7, 'cost an arm and a leg', 'be very expensive'],
  [8, 'break the ice', 'start a conversation in an awkward moment'],
  [8, 'see eye to eye', 'agree with someone'],
  [8, 'burn the midnight oil', 'work late into the night'],
  [8, 'call it a day', 'stop working for now'],
  [8, 'on cloud nine', 'extremely happy'],
  [9, 'a blessing in disguise', 'something good that first seemed bad'],
  [9, 'hit the nail on the head', 'say exactly the right thing'],
  [9, 'in hot water', 'in trouble'],
  [9, 'pull someone\'s leg', 'joke with someone'],
  [9, 'turn over a new leaf', 'change and start behaving better'],
]

const PROVERBS: [J, string, string][] = [
  [7, 'Practice makes perfect.', 'Doing something often makes you good at it.'],
  [7, 'Honesty is the best policy.', 'It is always better to tell the truth.'],
  [7, 'Look before you leap.', 'Think carefully before you act.'],
  [7, 'Haste makes waste.', 'Doing things too quickly leads to mistakes.'],
  [8, 'A stitch in time saves nine.', 'Fixing a small problem early prevents a bigger one.'],
  [8, 'Actions speak louder than words.', 'What you do matters more than what you say.'],
  [8, 'Where there is a will, there is a way.', 'Determination finds a solution.'],
  [8, 'Too many cooks spoil the broth.', 'Too many people in charge can ruin a task.'],
  [9, 'Every cloud has a silver lining.', 'Something good can come out of a bad situation.'],
  [9, 'Birds of a feather flock together.', 'People with similar interests stay together.'],
  [9, 'Rome was not built in a day.', 'Great things take time.'],
  [9, 'Do not count your chickens before they hatch.', 'Do not depend on something before it happens.'],
]

const ORAL: [J, string, string][] = [
  [7, 'a riddle', 'a puzzling question with a clever answer'],
  [7, 'a proverb', 'a short wise saying'],
  [7, 'a tongue twister', 'a phrase that is hard to say quickly'],
  [8, 'a folk tale', 'a traditional story passed down by word of mouth'],
  [8, 'a legend', 'a story about a hero from the past, partly true'],
  [9, 'a myth', 'a traditional story explaining how something began'],
  [9, 'a lullaby', 'a song sung to put a baby to sleep'],
]

export const literatureJ = (g: J): Generator => (rng, level) => {
  const pickType = level <= 2 ? 0 : level === 3 ? rng.int(0, 1) : level === 4 ? rng.int(1, 2) : rng.int(2, 3)
  if (pickType === 0) {
    const rows = rowsFor(FIGURES, g)
    const [s, fig] = rng.pick(rows)
    const pool = FIGURE_NAMES.filter((f) => f !== fig && rows.some(([, x]) => x === f))
    return q(level, `Which figure of speech is used?\n"${s}"`, fig, rng.sample(pool, 3))
  }
  if (pickType === 1) {
    const rows = rowsFor(IDIOMS, g)
    const [i, m] = rng.pick(rows)
    return q(level, `What does the idiom "${i}" mean?`, m, rng.sample(rows.map(([, x]) => x).filter((x) => x !== m), 3))
  }
  if (pickType === 2) {
    const rows = rowsFor(PROVERBS, g)
    const [p, m] = rng.pick(rows)
    return rng.next() < 0.5
      ? q(level, `What does the proverb "${p}" mean?`, m, rng.sample(rows.map(([, x]) => x).filter((x) => x !== m), 3))
      : q(level, `Which proverb best matches this idea?\n"${m}"`, p, rng.sample(rows.map(([x]) => x).filter((x) => x !== p), 3))
  }
  const rows = rowsFor(ORAL, g)
  const [term, d] = rng.pick(rows)
  return q(level, `In oral literature, what is ${term}?`, d, rng.sample(rows.map(([, x]) => x).filter((x) => x !== d), 3))
}

// ── English: grammar ────────────────────────────────────────────────────────

const WORDCLASS: [string, string][] = [
  ['The _children_ played in the field.', 'noun'],
  ['_Kindness_ costs nothing.', 'noun'],
  ['_She_ gave me a book.', 'pronoun'],
  ['This bag is _mine_.', 'pronoun'],
  ['The farmers _harvested_ the maize.', 'verb'],
  ['We _will travel_ tomorrow.', 'verb'],
  ['It was a _beautiful_ morning.', 'adjective'],
  ['He wore a _red_ shirt.', 'adjective'],
  ['The old man walked _slowly_.', 'adverb'],
  ['She _always_ arrives early.', 'adverb'],
  ['The cat hid _under_ the table.', 'preposition'],
  ['We waited _for_ the bus.', 'preposition'],
  ['I wanted to go, _but_ it rained.', 'conjunction'],
  ['She stayed home _because_ she was sick.', 'conjunction'],
  ['_Wow_, what a goal!', 'interjection'],
  ['_Ouch_, that hurts!', 'interjection'],
  ['_The_ sun rises in the east.', 'article'],
  ['She bought _an_ umbrella.', 'article'],
  ['_Those_ books belong to the library.', 'determiner'],
  ['_Every_ learner received a certificate.', 'determiner'],
]
const CLASS_NAMES = ['noun', 'pronoun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction', 'interjection', 'article', 'determiner']
const KINDS_JSS: [string, string, string[]][] = [
  ['What kind of noun is "honesty"?', 'abstract noun', ['proper noun', 'collective noun', 'common noun']],
  ['What kind of noun is "flock"?', 'collective noun', ['abstract noun', 'proper noun', 'material noun']],
  ['What kind of noun is "Nairobi"?', 'proper noun', ['common noun', 'abstract noun', 'collective noun']],
  ['What kind of pronoun is "herself"?', 'reflexive pronoun', ['possessive pronoun', 'relative pronoun', 'demonstrative pronoun']],
  ['What kind of pronoun is "whose"?', 'relative pronoun', ['reflexive pronoun', 'personal pronoun', 'demonstrative pronoun']],
  ['What kind of pronoun is "these"?', 'demonstrative pronoun', ['relative pronoun', 'reflexive pronoun', 'possessive pronoun']],
  ['What kind of adverb is "yesterday"?', 'adverb of time', ['adverb of place', 'adverb of manner', 'adverb of frequency']],
  ['What kind of adverb is "carefully"?', 'adverb of manner', ['adverb of time', 'adverb of place', 'adverb of degree']],
  ['What kind of adverb is "often"?', 'adverb of frequency', ['adverb of manner', 'adverb of place', 'adverb of time']],
  ['What kind of adverb is "everywhere"?', 'adverb of place', ['adverb of time', 'adverb of manner', 'adverb of frequency']],
  ['What kind of adjective is "Kenyan"?', 'proper adjective', ['adjective of quantity', 'demonstrative adjective', 'possessive adjective']],
  ['What kind of adjective is "several"?', 'adjective of quantity', ['proper adjective', 'adjective of quality', 'possessive adjective']],
]

export const wordclassJ = (g: J): Generator =>
  blend(g, (rng, level) => {
    if (level <= 3) {
      const [s, cls] = rng.pick(WORDCLASS.filter(([, c]) => level >= 3 || !['article', 'determiner', 'interjection'].includes(c)))
      return q(level, `What part of speech is the underlined word?\n${s}`, cls, rng.sample(CLASS_NAMES.filter((c) => c !== cls), 3))
    }
    return tableQ(rng, level, KINDS_JSS)
  }, nounsU(6), pronounsU(6), adjU(6), prepU(6))

const VERBS_JSS: [J, string, string, string[]][] = [
  [7, 'You ___ wear a helmet when riding a motorbike. (it is a rule)', 'must', ['might', 'could', 'would']],
  [7, '___ I borrow your ruler, please?', 'May', ['Must', 'Should', 'Would']],
  [7, 'She ___ speak three languages fluently.', 'can', ['must', 'shall', 'ought']],
  [7, 'You ___ eat more vegetables. (advice)', 'should', ['must not', 'can', 'might']],
  [7, 'Take an umbrella; it ___ rain later.', 'might', ['must', 'should', 'shall']],
  [7, 'I enjoy ___ in the river. (swim)', 'swimming', ['swim', 'to swimming', 'swam']],
  [7, 'She decided ___ early. (leave)', 'to leave', ['leaving', 'leave', 'left']],
  [8, 'If it rains, we ___ indoors.', 'will stay', ['would stay', 'would have stayed', 'stayed']],
  [8, 'If I were a bird, I ___ over the mountains.', 'would fly', ['will fly', 'flew', 'would have flown']],
  [8, 'She ___ for the bus for two hours now.', 'has been waiting', ['is waiting', 'waited', 'had waiting']],
  [8, 'By the time we arrived, the film ___.', 'had started', ['has started', 'starts', 'was start']],
  [8, 'Neither of the answers ___ correct.', 'is', ['are', 'were', 'have been']],
  [9, 'If she had studied harder, she ___ the exam.', 'would have passed', ['would pass', 'will pass', 'had passed']],
  [9, 'By next June, I ___ in this school for three years.', 'will have been', ['will be', 'have been', 'was']],
  [9, 'Had I known, I ___ you.', 'would have helped', ['will help', 'would help', 'helped']],
  [9, 'I wish I ___ the answer. (I do not know it now)', 'knew', ['know', 'had know', 'will know']],
  [9, 'The news ___ broadcast at seven o\'clock every evening.', 'is', ['are', 'were', 'be']],
]

export const verbsJ = (g: J): Generator =>
  blend(g, (rng, level) => {
    const rows = rowsFor(VERBS_JSS, g)
    const pool = level <= 2 ? rows.slice(0, 7) : level >= 4 ? rows.slice(-9) : rows
    const [s, a, w] = rng.pick(pool.length ? pool : rows)
    return q(level, `Choose the correct answer:\n${s}`, a, w)
  }, verbsU(6))

const SENT_TYPES: [J, string, string][] = [
  [7, 'The sun rises in the east.', 'simple sentence'],
  [7, 'Wanjiru sang and Otieno danced.', 'compound sentence'],
  [7, 'I stayed indoors because it was raining.', 'complex sentence'],
  [7, 'The boy who won the race is my cousin.', 'complex sentence'],
  [7, 'We wanted to play, but the field was wet.', 'compound sentence'],
  [7, 'My grandmother keeps bees.', 'simple sentence'],
  [8, 'Although he was tired, he finished his homework.', 'complex sentence'],
  [8, 'You can come with us, or you can stay at home.', 'compound sentence'],
  [8, 'The tall trees near the river provide shade.', 'simple sentence'],
  [9, 'When the bell rang, the pupils lined up and the teacher counted them.', 'compound-complex sentence'],
  [9, 'She smiled because she had passed, and her parents were proud.', 'compound-complex sentence'],
]
const PURPOSE: [string, string][] = [
  ['Please close the window.', 'imperative'],
  ['Where are you going?', 'interrogative'],
  ['What a beautiful dress!', 'exclamatory'],
  ['Kisumu is on the shores of Lake Victoria.', 'declarative'],
  ['Bring me that book.', 'imperative'],
  ['How lovely the garden looks!', 'exclamatory'],
  ['Did you finish your work?', 'interrogative'],
  ['Our school has a big library.', 'declarative'],
]
const SUBJECTS: [string, string, string[]][] = [
  ['The tall girl in the red dress won the race.', 'The tall girl in the red dress', ['won the race', 'the race', 'The tall girl']],
  ['My uncle from Eldoret visited us last week.', 'My uncle from Eldoret', ['visited us', 'last week', 'us']],
  ['A herd of zebras crossed the road slowly.', 'A herd of zebras', ['crossed the road', 'the road slowly', 'zebras']],
  ['Reading books improves our vocabulary.', 'Reading books', ['improves', 'our vocabulary', 'books']],
]
const PHRASE_CLAUSE: [string, string][] = [
  ['under the old mango tree', 'phrase'],
  ['because she was hungry', 'clause'],
  ['in the morning', 'phrase'],
  ['when the rain stopped', 'clause'],
  ['the boy with a blue bag', 'phrase'],
  ['who sells vegetables', 'clause'],
  ['after the long journey', 'phrase'],
  ['if you work hard', 'clause'],
]

export const sentencesJ = (g: J): Generator =>
  blend(g, (rng, level) => {
    const form = level <= 2 ? rng.int(0, 1) : level === 3 ? rng.int(1, 2) : rng.int(2, 3)
    if (form === 0) {
      const [s, t] = rng.pick(PURPOSE)
      return q(level, `What kind of sentence is this?\n"${s}"`, t, ['declarative', 'interrogative', 'imperative', 'exclamatory'].filter((x) => x !== t))
    }
    if (form === 1) {
      const [s, t] = rng.pick(PHRASE_CLAUSE)
      return q(level, `Is this group of words a phrase or a clause?\n"${s}"`, t, [t === 'phrase' ? 'clause' : 'phrase'], 'A clause has its own verb; a phrase does not.')
    }
    if (form === 2) {
      const [s, subj, w] = rng.pick(SUBJECTS)
      if (rng.next() < 0.4) return q(level, `What is the subject of this sentence?\n"${s}"`, subj, w)
      const rows = rowsFor(SENT_TYPES, g)
      const [x, t] = rng.pick(rows)
      return q(level, `What type of sentence is this?\n"${x}"`, t, ['simple sentence', 'compound sentence', 'complex sentence', ...(g === 9 ? ['compound-complex sentence'] : [])].filter((y) => y !== t))
    }
    const rows = rowsFor(SENT_TYPES, g)
    const [x, t] = rng.pick(rows)
    return q(level, `What type of sentence is this?\n"${x}"`, t, ['simple sentence', 'compound sentence', 'complex sentence', ...(g === 9 ? ['compound-complex sentence'] : [])].filter((y) => y !== t))
  }, sentencesU(6))

const TRANSFORM: [J, string, string, string[]][] = [
  [7, 'Change to the passive: "They are building a new school."', 'A new school is being built.', ['A new school was built.', 'A new school is building.', 'They are being built a new school.']],
  [7, 'Change to the passive: "The cook prepares lunch every day."', 'Lunch is prepared by the cook every day.', ['Lunch was prepared by the cook every day.', 'Lunch prepares the cook every day.', 'The cook is prepared by lunch every day.']],
  [7, 'Change into reported speech: "I am reading a novel," said Kendi.', 'Kendi said that she was reading a novel.', ['Kendi said that I am reading a novel.', 'Kendi said she is reading a novel.', 'Kendi says that she was reading a novel.']],
  [7, 'Choose the correct question tag: "She has finished her work, ___?"', "hasn't she", ["didn't she", "isn't she", 'has she']],
  [8, 'Change to the passive: "Someone has taken my pen."', 'My pen has been taken.', ['My pen was taken by someone.', 'My pen has taken.', 'Someone has been taken by my pen.']],
  [8, 'Change into reported speech: "Where do you live?" she asked me.', 'She asked me where I lived.', ['She asked me where do I live.', 'She asked me where I live?', 'She asked where did I live.']],
  [8, 'Change into reported speech: "Close the door," the teacher told us.', 'The teacher told us to close the door.', ['The teacher told us close the door.', 'The teacher told that we close the door.', 'The teacher said us to close the door.']],
  [8, 'Choose the correct question tag: "Nobody came to the meeting, ___?"', 'did they', ["didn't they", 'did he', "didn't he"]],
  [8, 'Change to the passive: "The farmers will harvest the tea tomorrow."', 'The tea will be harvested by the farmers tomorrow.', ['The tea will harvest the farmers tomorrow.', 'The tea is harvested by the farmers tomorrow.', 'The tea will been harvested by the farmers tomorrow.']],
  [9, 'Change into reported speech: "Have you seen my keys?" Mother asked Juma.', 'Mother asked Juma if he had seen her keys.', ['Mother asked Juma had he seen her keys.', 'Mother asked Juma if he has seen my keys.', 'Mother asked Juma that he had seen her keys.']],
  [9, 'Change into reported speech: "We will win the match tomorrow," the captain said.', 'The captain said that they would win the match the next day.', ['The captain said that we will win the match tomorrow.', 'The captain said they will win the match the next day.', 'The captain says that they would win the match tomorrow.']],
  [9, 'Change to the active voice: "The letter was written by Amina."', 'Amina wrote the letter.', ['Amina was written the letter.', 'The letter wrote Amina.', 'Amina writes the letter.']],
  [9, 'Rewrite using "Not only … but also": "She sings. She also plays the guitar."', 'Not only does she sing but she also plays the guitar.', ['Not only she sings but also plays the guitar.', 'Not only she sing but also she plays the guitar.', 'Not only does she sings but also play the guitar.']],
  [9, 'Rewrite beginning "Unless…": "If you do not hurry, you will miss the bus."', 'Unless you hurry, you will miss the bus.', ['Unless you do not hurry, you will miss the bus.', 'Unless you hurry, you will not miss the bus.', 'Unless you will hurry, you miss the bus.']],
  [9, 'Rewrite using "too … to": "The box is so heavy that I cannot lift it."', 'The box is too heavy for me to lift.', ['The box is too heavy that I cannot lift it.', 'The box is too heavy to lift it.', 'The box is very heavy to lift.']],
]

export const transformJ = (g: J): Generator =>
  blend(g, (rng, level) => {
    const rows = rowsFor(TRANSFORM, g)
    const pool = level <= 2 ? rows.slice(0, 4) : level >= 4 ? rows.slice(-8) : rows
    const [s, a, w] = rng.pick(pool)
    return q(level, s, a, w)
  }, sentencesU(6), verbsU(6))

const PHRASAL: [J, string, string][] = [
  [7, 'look after', 'take care of'],
  [7, 'give up', 'stop trying'],
  [7, 'carry on', 'continue'],
  [7, 'set off', 'begin a journey'],
  [7, 'run out of', 'have none left'],
  [8, 'put off', 'postpone'],
  [8, 'call off', 'cancel'],
  [8, 'turn down', 'refuse an offer'],
  [8, 'look up', 'search for information'],
  [9, 'take after', 'resemble an older relative'],
  [9, 'make up', 'become friends again'],
  [9, 'bring up', 'raise a child'],
  [9, 'come across', 'find by chance'],
]
const CONFUSING: [string, string, string[]][] = [
  ['Everyone came ___ Juma.', 'except', ['accept', 'expect', 'excerpt']],
  ['Please ___ my apology.', 'accept', ['except', 'expect', 'access']],
  ['The doctor gave me good ___.', 'advice', ['advise', 'advices', 'adviced']],
  ['I ___ you to rest.', 'advise', ['advice', 'advised you', 'advising']],
  ['Do not ___ your ticket.', 'lose', ['loose', 'loss', 'lost']],
  ['The bus stood ___ at the stage.', 'stationary', ['stationery', 'station', 'stationed']],
  ['We buy pens and paper at the ___ shop.', 'stationery', ['stationary', 'station', 'stationeries']],
  ['Can you ___ me your bicycle?', 'lend', ['borrow', 'loan from', 'lent']],
  ['The dog wagged ___ tail.', 'its', ["it's", 'it is', 'its\'']],
  ['Mr Kamau ___ us Science.', 'teaches', ['learns', 'learn', 'teach']],
]
const AFFIX: [string, string][] = [
  ['possible', 'impossible'],
  ['legal', 'illegal'],
  ['regular', 'irregular'],
  ['honest', 'dishonest'],
  ['responsible', 'irresponsible'],
  ['patient', 'impatient'],
  ['agree', 'disagree'],
  ['mature', 'immature'],
  ['literate', 'illiterate'],
  ['appear', 'disappear'],
]

export const vocabJ = (g: J): Generator =>
  blend(g, (rng, level) => {
    const form = level <= 2 ? rng.int(0, 1) : rng.int(0, 2)
    if (form === 0) {
      const rows = rowsFor(PHRASAL, g)
      const [p, m] = rng.pick(rows)
      return q(level, `What does the phrasal verb "${p}" mean?`, m, rng.sample(rows.map(([, x]) => x).filter((x) => x !== m), 3))
    }
    if (form === 1) {
      const [w, opp] = rng.pick(AFFIX)
      const pre = opp.slice(0, opp.length - w.length)
      return q(level, `Which word is the opposite of "${w}"?`, opp, ['un', 'in', 'dis', 'im', 'il', 'ir', 'non'].filter((p) => p !== pre).slice(0, 3).map((p) => p + w), `The prefix ${pre}- gives the opposite.`)
    }
    return tableQ(rng, level, CONFUSING, 'Choose the correct word:\n')
  }, vocabU(6))

export const punctJ = (g: J): Generator =>
  blend(g, (rng, level) => {
    const [right, wrong] = rng.pick<[string, string[]]>([
      ['I need three things: a pen, a ruler and an eraser.', ['I need three things, a pen; a ruler and an eraser.', 'I need three things; a pen, a ruler, and, an eraser.', 'I need: three things a pen a ruler and an eraser.']],
      ['It was late; however, we kept walking.', ['It was late however, we kept walking.', 'It was late, however we kept walking.', 'It was late; however we kept, walking.']],
      ['My sister-in-law lives in Nyeri.', ['My sister in-law lives in Nyeri.', 'My sister-in law lives in Nyeri.', 'My sister in law lives in nyeri.']],
      ["The learners' books were collected.", ["The learner's' books were collected.", 'The learners books were collected.', "The learners's books were collected."]],
      ['"Are you ready?" asked the coach.', ['"Are you ready," asked the coach.', '"Are you ready"? asked the coach.', 'Are you ready? asked the coach.']],
      ['Kenya, a country in East Africa, is famous for its athletes.', ['Kenya a country in East Africa, is famous for its athletes.', 'Kenya, a country in East Africa is famous for its athletes.', 'Kenya a country in East Africa is famous for it\'s athletes.']],
      ['Mr Otieno, our class teacher, is very kind.', ['Mr Otieno our class teacher, is very kind.', 'Mr Otieno, our class teacher is very kind.', 'Mr otieno, our class teacher, is very kind.']],
      ['"I will help you," she said, "if you ask me."', ['"I will help you, she said, if you ask me."', '"I will help you." she said "if you ask me."', '"I will help you," she said, "If you ask me."']],
    ])
    return q(level, 'Which sentence is punctuated correctly?', right, wrong)
  }, punctU(6), spellU(6))

// ── Passages ────────────────────────────────────────────────────────────────

function passage(level: Level, title: string, text: string, qs: [string, string, string[]][]): BankQuestion[] {
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
function clozeP(level: Level, title: string, text: string, sw: boolean, blanks: [string, string[]][]): BankQuestion[] {
  return blanks.map(([ans, wrong], i) => ({
    type: 'choice' as const,
    level,
    prompt: sw ? `Soma kifungu. Ni jibu lipi linalofaa pengo (${i + 1})?` : `Read the passage. Which answer best fills blank (${i + 1})?`,
    visual: { kind: 'passage' as const, title, text },
    options: opts([ans, ...wrong]),
    answer: ans,
  }))
}
/** Upper-primary passages, asked one level lower in junior school as warm-ups. */
const easier = (bank: BankQuestion[]) => bank.filter((b) => b.level >= 3).map((b) => ({ ...b, level: (b.level - 2) as Level }))

const COMP_J: BankQuestion[] = [
  ...passage(3, 'The Water Project', 'When the borehole in Kaptembwo dried up, girls in the village spent up to four hours a day fetching water from a stream on the other side of the hill. Their school attendance dropped, and many fell behind. A group of Grade 9 learners decided to act. They measured the school roofs, calculated how much rain could be collected, and presented their findings to the county officer. Impressed, the county agreed to fund gutters and two large tanks if the community provided labour. Within a term, the tanks were full, and the girls returned to class. The learners now plan to share their method with nearby schools.', [
    ['Why did school attendance drop in Kaptembwo?', 'Girls spent hours fetching water.', ['The school was closed.', 'The teachers were absent.', 'The roads were flooded.']],
    ['What did the learners do first?', 'They measured the roofs and calculated rainfall to be collected.', ['They dug a new borehole.', 'They bought tanks.', 'They wrote to the president.']],
    ['What condition did the county set?', 'The community had to provide labour.', ['The learners had to pay.', 'The school had to close.', 'The girls had to leave school.']],
    ['Which word best describes the learners?', 'resourceful', ['careless', 'boastful', 'lazy']],
    ['What is the main lesson of the passage?', 'Young people can solve real problems with knowledge and teamwork.', ['Boreholes never dry up.', 'Counties always pay for everything.', 'Fetching water is a good exercise.']],
  ]),
  ...passage(4, 'The Night Market', 'Every evening, as the sun sinks behind the hills of Kisii, the road outside the bus park transforms. Traders unfold tables, light lanterns and arrange bananas, roasted maize, sukuma wiki and second-hand books. The air fills with the smell of frying mandazi and the calls of sellers competing for attention. For many families, the night market is a lifeline: mothers who work on farms during the day earn extra income, and students buy affordable books. Yet the market faces challenges. There is no proper lighting, and when it rains the ground turns to mud. The traders\' association has asked the county to install solar lamps and build a shed, arguing that a safer market would attract more customers and more revenue.', [
    ['When does the market begin?', 'in the evening as the sun sets', ['early in the morning', 'at midday', 'on Sundays only']],
    ['Why is the market described as a "lifeline"?', 'It gives families extra income and affordable goods.', ['It saves lives in hospitals.', 'It is near a river.', 'It is open all night for travellers only.']],
    ['Which of these is NOT sold according to the passage?', 'fish', ['bananas', 'second-hand books', 'roasted maize']],
    ['What is the traders\' main argument for solar lamps and a shed?', 'A safer market would bring more customers and revenue.', ['They want to close the market.', 'They want to sell lamps.', 'They want to move to the bus park.']],
    ['What does "transforms" mean in the passage?', 'changes completely', ['closes', 'becomes quiet', 'grows bigger slowly']],
  ]),
  ...passage(5, 'Digital Footprints', 'Every photo you post, comment you write and website you visit leaves a trace known as a digital footprint. Unlike footprints in sand, these traces are not easily washed away. Employers, universities and even future friends may search online to learn about a person. A careless joke written at fourteen could be read many years later. However, a digital footprint is not only a risk; it can also be an opportunity. A learner who shares science projects, writes thoughtful blog posts or volunteers online builds a positive record. Experts advise young people to think before posting, to keep personal details such as home addresses private, and to ask: "Would I be comfortable if my teacher or grandmother saw this?"', [
    ['What is a digital footprint?', 'the trace a person leaves online', ['a footprint in the sand', 'a computer virus', 'a type of shoe']],
    ['Why does the writer compare digital footprints to footprints in sand?', 'to show that online traces are not easily removed', ['to show that the internet is like a beach', 'to explain how to walk safely', 'to describe holidays']],
    ['How can a digital footprint be an opportunity?', 'Sharing good work builds a positive record.', ['It can be deleted easily.', 'It hides personal details.', 'It makes posting faster.']],
    ['Which advice is given in the passage?', 'Keep personal details private.', ['Post your home address.', 'Never use the internet.', 'Share every photo you take.']],
    ['What is the tone of the passage?', 'advisory', ['angry', 'humorous', 'sad']],
  ]),
  ...passage(2, 'A Visit to the Bomas', 'Our class visited the Bomas of Kenya, where traditional homesteads of different communities are displayed. We saw a Maasai manyatta made of mud and cow dung, a Mijikenda house with a grass-thatched roof that almost touched the ground, and a Luo homestead with separate huts for each member of the family. In the afternoon, dancers performed songs from across the country. Our guide explained that the Bomas helps Kenyans to understand and appreciate each other\'s cultures.', [
    ['What is displayed at the Bomas of Kenya?', 'traditional homesteads of different communities', ['modern buildings', 'wild animals', 'old cars']],
    ['What was the Maasai manyatta made of?', 'mud and cow dung', ['bricks and iron', 'stones and cement', 'wood and glass']],
    ['Which community\'s house had a roof that almost touched the ground?', 'Mijikenda', ['Maasai', 'Luo', 'Kikuyu']],
    ['According to the guide, what is the purpose of the Bomas?', 'to help Kenyans appreciate each other\'s cultures', ['to sell houses', 'to train dancers only', 'to keep visitors away']],
  ]),
  ...passage(4, 'The Inventor from Kibera', 'At sixteen, Kelvin noticed that families in his neighbourhood spent a large part of their income on paraffin. Using scrap metal, an old bicycle dynamo and a small solar panel, he built a lamp that could also charge a phone. His first three designs failed: one overheated, another was too heavy and the third broke easily. Instead of giving up, he asked a technician at a nearby garage for advice and studied videos at the community library. His fourth design worked. Today, a local youth group makes and sells the lamps, and Kelvin is training other young people to repair them.', [
    ['What problem did Kelvin notice?', 'Families spent much of their income on paraffin.', ['There was no water.', 'Phones were too expensive.', 'Bicycles kept breaking.']],
    ['Which material did Kelvin NOT use?', 'plastic bottles', ['scrap metal', 'a bicycle dynamo', 'a small solar panel']],
    ['How many designs failed before one worked?', 'three', ['one', 'two', 'four']],
    ['What does Kelvin\'s story mainly show?', 'Persistence and learning from failure lead to success.', ['Inventions always work the first time.', 'Libraries are only for reading novels.', 'Garages sell lamps.']],
    ['Which word best describes Kelvin?', 'persistent', ['impatient', 'careless', 'proud']],
  ]),
]

const CLOZE_J: BankQuestion[] = [
  ...clozeP(3, 'Climate Action', 'Climate change is one of the greatest challenges (1) our generation. Rising temperatures have led (2) longer droughts in some parts of Kenya and floods in others. (3) everyone can help. Planting trees, saving electricity and reducing waste are simple steps (4) make a difference. If each learner planted one tree a year, our country (5) be much greener.', false, [
    ['facing', ['face', 'faced', 'faces']],
    ['to', ['for', 'at', 'with']],
    ['Fortunately', ['Unfortunately', 'Because', 'Although']],
    ['that', ['what', 'who', 'whom']],
    ['would', ['will be', 'shall', 'is']],
  ]),
  ...clozeP(4, 'The Debate', 'Last Friday, our school hosted a debate on whether homework should be (1). The proposers argued that learners need time to rest and (2) hobbies. The opposers, on the other hand, (3) that homework helps learners revise what they learn in class. After a lively discussion, the judges (4) the opposers the winners. Everyone agreed, however, that the quality of homework matters more than its (5).', false, [
    ['abolished', ['abolish', 'abolishing', 'abolition']],
    ['pursue', ['pursuing', 'pursued', 'pursuit']],
    ['insisted', ['insist', 'insisting', 'insistence']],
    ['declared', ['declare', 'declaring', 'declaration']],
    ['quantity', ['quality', 'quantities', 'quantify']],
  ]),
  ...clozeP(5, 'Wangari Maathai', 'Wangari Maathai was the first African woman (1) the Nobel Peace Prize. (2) up in Nyeri, she noticed that streams were drying up as forests were cleared. In 1977, she founded the Green Belt Movement, (3) has planted millions of trees. She believed that caring for the environment and promoting peace were closely (4). Her life reminds us that one person\'s determination can (5) a whole nation.', false, [
    ['to win', ['winning', 'won', 'wins']],
    ['Growing', ['Grown', 'Grow', 'Grew']],
    ['which', ['who', 'whose', 'whom']],
    ['linked', ['link', 'linking', 'links']],
    ['inspire', ['inspiration', 'inspiring', 'inspired']],
  ]),
]

// ── Kiswahili ───────────────────────────────────────────────────────────────

const NAHAU: [J, string, string][] = [
  [7, 'kuvunja moyo', 'kukatisha tamaa'],
  [7, 'kupiga moyo konde', 'kujipa moyo na kuvumilia'],
  [7, 'kutia chumvi', 'kuongeza maneno yasiyo ya kweli'],
  [7, 'kufunga safari', 'kuanza safari'],
  [8, 'kula njama', 'kupanga jambo kwa siri'],
  [8, 'kupiga chenga', 'kukwepa'],
  [8, 'kukata kauli', 'kuamua'],
  [8, 'kutoa jasho', 'kufanya kazi kwa bidii'],
  [9, 'kujipalia makaa', 'kujitafutia matatizo'],
  [9, 'kupiga marufuku', 'kukataza'],
  [9, 'kuchukua hatua', 'kuanza kutenda jambo'],
]
const VITENDAWILI: [string, string][] = [
  ['Kila nikienda ananifuata.', 'kivuli'],
  ['Nyumba yangu haina mlango.', 'yai'],
  ['Kuku wangu ametagia mibani.', 'nanasi'],
  ['Kamba yangu ndefu lakini haifungi kuni.', 'njia'],
  ['Ajenga ingawa hana mikono.', 'ndege'],
  ['Popoo mbili zavuka mto.', 'macho'],
]
const TAMATHALI: [J, string, string][] = [
  [7, 'Mtoto huyu ni mweupe kama theluji.', 'tashbihi'],
  [7, 'Ni mrefu kama twiga.', 'tashbihi'],
  [7, 'Juma ni simba vitani.', 'sitiari'],
  [7, 'Maisha ni safari ndefu.', 'sitiari'],
  [8, 'Upepo uliimba wimbo mtamu.', 'tashihisi'],
  [8, 'Jua lilitabasamu asubuhi.', 'tashihisi'],
  [8, 'Nimekuambia mara elfu!', 'chuku'],
  [8, 'Alilia machozi yakajaa mto.', 'chuku'],
  [9, 'Mlango ulifungwa paa!', 'tanakali sauti'],
  [9, 'Alianguka majini chubwi!', 'tanakali sauti'],
  [9, 'Polepole, polepole, alikaribia mlango.', 'takriri'],
]
const TAMATHALI_ALL = ['tashbihi', 'sitiari', 'tashihisi', 'chuku', 'tanakali sauti', 'takriri']

export const fasihiJ = (g: J): Generator =>
  blend(g, (rng, level) => {
    const form = level <= 2 ? rng.int(0, 1) : level === 3 ? rng.int(0, 2) : rng.int(1, 2)
    if (form === 0) {
      const [t, j] = rng.pick(VITENDAWILI)
      return q(level, `Tegua kitendawili: "${t}"`, j, rng.sample(VITENDAWILI.map(([, x]) => x).filter((x) => x !== j), 3))
    }
    if (form === 1) {
      const rows = rowsFor(NAHAU, g)
      const [n, m] = rng.pick(rows)
      return q(level, `Nahau "${n}" ina maana gani?`, m, rng.sample(rows.map(([, x]) => x).filter((x) => x !== m), 3))
    }
    const rows = rowsFor(TAMATHALI, g)
    const [s, t] = rng.pick(rows)
    return q(level, `Ni tamathali gani ya usemi imetumika?\n"${s}"`, t, rng.sample(TAMATHALI_ALL.filter((x) => x !== t && rows.some(([, y]) => y === x)), 3))
  }, methaliU(6))

const AINA: [string, string][] = [
  ['_Mwalimu_ amefika darasani.', 'nomino'],
  ['_Furaha_ yake ilionekana wazi.', 'nomino'],
  ['Watoto _wanacheza_ uwanjani.', 'kitenzi'],
  ['Mama _alipika_ chakula kitamu.', 'kitenzi'],
  ['Alinunua gari _jipya_.', 'kivumishi'],
  ['Kitabu _changu_ kimepotea.', 'kivumishi'],
  ['Alitembea _polepole_.', 'kielezi'],
  ['Watafika _kesho_.', 'kielezi'],
  ['_Yeye_ ni rafiki yangu.', 'kiwakilishi'],
  ['_Wao_ wamesafiri.', 'kiwakilishi'],
  ['Juma _na_ Amina ni wanafunzi.', 'kiunganishi'],
  ['Alikuja _lakini_ hakukaa.', 'kiunganishi'],
  ['Kitabu kiko _juu ya_ meza.', 'kihusishi'],
  ['Aliketi _karibu na_ dirisha.', 'kihusishi'],
  ['_Lo!_ Umeshinda tena!', 'kihisishi'],
  ['_Ala!_ Kumbe umefika.', 'kihisishi'],
]
const AINA_ALL = ['nomino', 'kitenzi', 'kivumishi', 'kielezi', 'kiwakilishi', 'kiunganishi', 'kihusishi', 'kihisishi']

export const ainaJ = (g: J): Generator =>
  blend(g, (rng, level) => {
    const [s, a] = rng.pick(AINA)
    return q(level, `Neno lililopigiwa mstari ni aina gani ya neno?\n${s}`, a, rng.sample(AINA_ALL.filter((x) => x !== a), 3))
  }, vivumishiU(6))

const HALI: [string, string, string[]][] = [
  ['Yeye husoma kila siku.', 'hali ya mazoea', ['wakati ujao', 'hali timilifu', 'hali ya masharti']],
  ['Mimi hufua nguo Jumamosi.', 'hali ya mazoea', ['wakati uliopita', 'hali timilifu', 'wakati ujao']],
  ['Ukisoma, utafaulu.', 'hali ya masharti', ['hali ya mazoea', 'wakati uliopo', 'hali timilifu']],
  ['Ningekuwa na pesa, ningenunua kitabu.', 'hali ya masharti yasiyowezekana', ['hali ya mazoea', 'wakati ujao', 'hali timilifu']],
  ['Mtoto amelala.', 'hali timilifu', ['wakati uliopita', 'hali ya mazoea', 'wakati ujao']],
  ['Ndege aruka angani.', 'hali isiyodhihirika (-a-)', ['hali timilifu', 'wakati ujao', 'hali ya masharti']],
  ['Walikuwa wakicheza mpira.', 'hali ya kuendelea', ['hali ya mazoea', 'hali timilifu', 'wakati ujao']],
]

export const nyakatiJ = (g: J): Generator =>
  blend(g, (rng, level) => {
    const [s, a, w] = rng.pick(HALI)
    return q(level, `Sentensi hii iko katika hali gani?\n"${s}"`, a, w)
  }, nyakatiU(6))

// [stem, kutendea, kutendwa, kutendeka, kutendesha]
const KAULI: [string, string, string, string, string][] = [
  ['soma', 'somea', 'somwa', 'someka', 'somesha'],
  ['andika', 'andikia', 'andikwa', 'andikika', 'andikisha'],
  ['pika', 'pikia', 'pikwa', 'pikika', 'pikisha'],
  ['cheza', 'chezea', 'chezwa', 'chezeka', 'chezesha'],
  ['imba', 'imbia', 'imbwa', 'imbika', 'imbisha'],
  ['lima', 'limia', 'limwa', 'limika', 'limisha'],
]
const KAULI_NAMES = ['kutendea', 'kutendwa', 'kutendeka', 'kutendesha']
const KUTENDANA: [string, string][] = [
  ['penda', 'pendana'],
  ['saidia', 'saidiana'],
  ['ona', 'onana'],
  ['salimia', 'salimiana'],
  ['piga', 'pigana'],
  ['jua', 'juana'],
]

export const kauliJ = (g: J): Generator =>
  blend(g, (rng, level) => {
    if (rng.next() < 0.2) {
      const [s, f] = rng.pick(KUTENDANA)
      return q(level, `Andika kitenzi "${s}" katika kauli ya kutendana.`, f, rng.sample(KUTENDANA.map(([, x]) => x).filter((x) => x !== f), 2).concat(`${s.slice(0, -1)}wa`), 'Kauli ya kutendana huonyesha kitendo kinachofanywa na pande mbili kwa kila mmoja.')
    }
    const row = rng.pick(KAULI)
    const i = rng.int(0, 3)
    if (level <= 2 || (level === 3 && rng.next() < 0.5)) return q(level, `Kitenzi "${row[i + 1]}" kiko katika kauli gani?`, KAULI_NAMES[i], KAULI_NAMES.filter((n) => n !== KAULI_NAMES[i]))
    return q(level, `Andika kitenzi "${row[0]}" katika kauli ya ${KAULI_NAMES[i]}.`, row[i + 1], row.slice(1).filter((x) => x !== row[i + 1]))
  }, ngeliU(6))

const USEMI: [string, string, string[]][] = [
  ['"Ninasoma kitabu," Juma alisema.', 'Juma alisema kwamba alikuwa akisoma kitabu.', ['Juma alisema kwamba ninasoma kitabu.', 'Juma alisema atasoma kitabu.', 'Juma husema kwamba alikuwa akisoma kitabu.']],
  ['"Nitakuja kesho," Amina alisema.', 'Amina alisema kwamba angekuja siku iliyofuata.', ['Amina alisema kwamba nitakuja kesho.', 'Amina alisema kwamba alikuja jana.', 'Amina atasema kwamba angekuja kesho.']],
  ['"Tumemaliza kazi," wanafunzi walisema.', 'Wanafunzi walisema kwamba walikuwa wamemaliza kazi.', ['Wanafunzi walisema kwamba tumemaliza kazi.', 'Wanafunzi walisema watamaliza kazi.', 'Wanafunzi husema kwamba wamemaliza kazi.']],
  ['"Funga mlango," mwalimu alimwambia Baraka.', 'Mwalimu alimwambia Baraka afunge mlango.', ['Mwalimu alimwambia Baraka funga mlango.', 'Mwalimu alisema Baraka alifunga mlango.', 'Mwalimu alimwambia Baraka atafunga mlango.']],
  ['"Unaishi wapi?" Neema aliniuliza.', 'Neema aliniuliza ninaishi wapi.', ['Neema aliniuliza unaishi wapi?', 'Neema alisema ninaishi wapi.', 'Neema aliniuliza nitaishi wapi.']],
  ['"Nilienda sokoni jana," mama alisema.', 'Mama alisema kwamba alikuwa ameenda sokoni siku iliyotangulia.', ['Mama alisema kwamba nilienda sokoni jana.', 'Mama alisema ataenda sokoni kesho.', 'Mama husema kwamba alienda sokoni.']],
  ['"Tafadhali nisaidie," Otieno alimwomba rafiki yake.', 'Otieno alimwomba rafiki yake amsaidie.', ['Otieno alimwomba rafiki yake nisaidie.', 'Otieno alisema rafiki yake alimsaidia.', 'Otieno alimwomba rafiki yake atamsaidia kesho.']],
]

export const usemiJ = (g: J): Generator =>
  blend(g, (rng, level) => {
    if (level === 1 && rng.next() < 0.5) {
      return q(level, 'Usemi halisi huandikwa ndani ya alama gani?', 'alama za kunukuu (" ")', ['mabano ( )', 'nukta pacha (:)', 'kistari (-)'])
    }
    const [d, r, w] = rng.pick(USEMI)
    return level >= 4 && rng.next() < 0.4
      ? q(level, `Ni ipi usemi halisi wa sentensi hii?\n"${r}"`, d, USEMI.map(([x]) => x).filter((x) => x !== d).slice(0, 3))
      : q(level, `Andika katika usemi wa taarifa:\n${d}`, r, w)
  }, uakifishajiU(6))

const UFAHAMU_J: BankQuestion[] = [
  ...passage(3, 'Mradi wa Maji', 'Kisima cha kijiji cha Kaptembwo kilipokauka, wasichana walilazimika kutembea saa nne kila siku kuchota maji mtoni. Wengi walikosa masomo. Wanafunzi wa Gredi ya Tisa waliamua kuchukua hatua. Walipima mapaa ya shule, wakakadiria kiasi cha maji ya mvua yanayoweza kuvunwa, kisha wakawasilisha matokeo yao kwa afisa wa kaunti. Kaunti ilikubali kununua mifereji na matangi mawili makubwa ikiwa wanakijiji wangetoa nguvukazi. Baada ya muhula mmoja, matangi yalijaa na wasichana wakarejea darasani.', [
    ['Kwa nini wasichana walikosa masomo?', 'Walitumia saa nyingi kuchota maji.', ['Shule ilifungwa.', 'Walimu hawakufika.', 'Barabara zilifurika.']],
    ['Wanafunzi walifanya nini kwanza?', 'Walipima mapaa na kukadiria maji ya mvua.', ['Walichimba kisima kipya.', 'Walinunua matangi.', 'Walimwandikia rais.']],
    ['Kaunti iliweka sharti gani?', 'Wanakijiji watoe nguvukazi.', ['Wanafunzi walipe pesa.', 'Shule ifungwe.', 'Wasichana waache shule.']],
    ['Methali ipi inafaa kifungu hiki?', 'Kidole kimoja hakivunji chawa', ['Haraka haraka haina baraka', 'Mwenye macho haambiwi tazama', 'Mchelea mwana kulia hulia yeye']],
    ['Neno "nguvukazi" lina maana gani?', 'watu wa kufanya kazi', ['pesa nyingi', 'vyakula', 'mashine']],
  ]),
  ...passage(5, 'Alama za Kidijitali', 'Kila picha unayoweka mtandaoni, maoni unayoandika na tovuti unayotembelea huacha alama inayoitwa alama ya kidijitali. Tofauti na nyayo mchangani, alama hizi hazifutiki kwa urahisi. Waajiri, vyuo na hata marafiki wa baadaye wanaweza kuchunguza mtandaoni ili kumjua mtu. Hata hivyo, alama ya kidijitali si hatari peke yake; inaweza pia kuwa fursa. Mwanafunzi anayeshiriki miradi ya sayansi au kuandika makala yenye busara hujijengea sifa njema. Wataalamu wanawashauri vijana wafikiri kabla ya kuweka chochote mtandaoni na wasitoe anwani zao za nyumbani.', [
    ['Alama ya kidijitali ni nini?', 'alama anayoacha mtu mtandaoni', ['nyayo mchangani', 'kirusi cha kompyuta', 'aina ya kiatu']],
    ['Kwa nini mwandishi analinganisha alama hizi na nyayo mchangani?', 'kuonyesha kwamba alama za mtandaoni hazifutiki kwa urahisi', ['kuonyesha kwamba mtandao ni ufukwe', 'kueleza jinsi ya kutembea', 'kuelezea likizo']],
    ['Alama ya kidijitali inawezaje kuwa fursa?', 'Kushiriki kazi nzuri hujenga sifa njema.', ['Inafutika kwa urahisi.', 'Inaficha anwani.', 'Inafanya kuweka picha kuwe haraka.']],
    ['Wataalamu wanashauri nini?', 'Fikiri kabla ya kuweka chochote mtandaoni.', ['Weka anwani yako ya nyumbani.', 'Usitumie mtandao kamwe.', 'Weka kila picha unayopiga.']],
  ]),
]

const CLOZE_KJ: BankQuestion[] = [
  ...clozeP(3, 'Mabadiliko ya Tabianchi', 'Mabadiliko ya tabianchi ni changamoto kubwa (1) kizazi chetu. Ongezeko la joto (2) ukame wa muda mrefu katika sehemu nyingi za nchi. (3), kila mmoja wetu anaweza kusaidia. Kupanda miti na kuokoa umeme ni hatua rahisi (4) zinaleta tofauti. Kama kila mwanafunzi angepanda mti mmoja kila mwaka, nchi yetu (5) kijani zaidi.', true, [
    ['inayokikabili', ['inayowakabili', 'kinachokikabili', 'yanayokikabili']],
    ['limesababisha', ['zimesababisha', 'kimesababisha', 'umesababisha']],
    ['Hata hivyo', ['Kwa sababu', 'Ili', 'Wala']],
    ['ambazo', ['ambayo', 'ambao', 'ambacho']],
    ['ingekuwa', ['itakuwa', 'ilikuwa', 'imekuwa']],
  ]),
  ...clozeP(5, 'Wangari Maathai', 'Wangari Maathai alikuwa mwanamke wa kwanza Mwafrika (1) Tuzo ya Amani ya Nobel. Alipokuwa (2) huko Nyeri, aliona mito ikikauka kwa sababu ya ukataji wa misitu. Mwaka 1977, alianzisha Vuguvugu la Ukanda wa Kijani (3) limepanda mamilioni ya miti. Aliamini kwamba utunzaji wa mazingira na amani (4) uhusiano wa karibu. Maisha yake (5) kwamba juhudi za mtu mmoja zinaweza kuhamasisha taifa zima.', true, [
    ['kushinda', ['alishinda', 'atashinda', 'mshindi']],
    ['akikua', ['alikua', 'atakua', 'akua']],
    ['ambalo', ['ambayo', 'ambao', 'ambaye']],
    ['vina', ['ina', 'kina', 'wana']],
    ['yanatufundisha', ['inatufundisha', 'kinatufundisha', 'wanatufundisha']],
  ]),
]

export function jssLanguageGenerators(): Record<string, Generator> {
  const out: Record<string, Generator> = {}
  for (const g of [7, 8, 9] as J[]) {
    out[`j${g}e-literature`] = literatureJ(g)
    out[`j${g}e-wordclass`] = wordclassJ(g)
    out[`j${g}e-verbs`] = verbsJ(g)
    out[`j${g}e-sentences`] = sentencesJ(g)
    out[`j${g}e-transform`] = transformJ(g)
    out[`j${g}e-vocab`] = vocabJ(g)
    out[`j${g}e-punct`] = punctJ(g)
    out[`j${g}k-fasihi`] = fasihiJ(g)
    out[`j${g}k-ngeli`] = blend(g, g6(ngeliU(6)), vivumishiU(6))
    out[`j${g}k-aina`] = ainaJ(g)
    out[`j${g}k-nyakati`] = nyakatiJ(g)
    out[`j${g}k-kauli`] = kauliJ(g)
    out[`j${g}k-usemi`] = usemiJ(g)
    out[`j${g}k-msamiati`] = g6(msamiatiU(6))
    out[`j${g}k-uakifishaji`] = g6(uakifishajiU(6))
  }
  return out
}

export function jssLanguageBanks(): Record<string, BankQuestion[]> {
  const out: Record<string, BankQuestion[]> = {}
  for (const g of [7, 8, 9]) {
    out[`j${g}e-comp`] = [...easier(COMP_U), ...COMP_J]
    out[`j${g}e-cloze`] = [...easier(CLOZE_U), ...CLOZE_J]
    out[`j${g}k-ufahamu`] = [...easier(UFAHAMU_K), ...UFAHAMU_J]
    out[`j${g}k-cloze`] = [...easier(CLOZE_K), ...CLOZE_KJ]
  }
  return out
}
