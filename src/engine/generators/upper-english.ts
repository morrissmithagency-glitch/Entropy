// Upper-primary English (Grades 4–6), in the formats of JESMA papers and KPSEA: grammar items
// with four options, cloze passages and comprehension. Word tables are checked by hand; the
// grade sets which rows are used, so Grade 6 meets the harder forms.
import { KENYAN_NAMES, uid } from '../helpers'
import type { BankQuestion, ChoiceQuestion, Generator, Level, OrderQuestion, Rng } from '../types'
import { labelOptions as opts } from './english'

type G = 4 | 5 | 6

const q = (level: Level, prompt: string, answer: string, wrong: string[], explain?: string): ChoiceQuestion => ({
  id: uid('ue'),
  type: 'choice',
  level,
  prompt,
  options: [answer, ...[...new Set(wrong)].filter((w) => w !== answer)].slice(0, 4).map((l) => ({ id: l, label: l })),
  answer,
  explain,
})
const name = (rng: Rng) => rng.pick(KENYAN_NAMES)
/** Rows are [minimum grade, ...data]; only rows for this grade or below are used. */
const forGrade = <T extends unknown[]>(rows: [G, ...T][], g: G): T[] => rows.filter(([min]) => min <= g).map(([, ...rest]) => rest as unknown as T)

// ── Vocabulary ──────────────────────────────────────────────────────────────

const SYNONYMS: [G, string, string][] = [
  [4, 'angry', 'cross'],
  [4, 'tidy', 'neat'],
  [4, 'sick', 'ill'],
  [4, 'correct', 'right'],
  [4, 'quiet', 'silent'],
  [4, 'centre', 'middle'],
  [4, 'aid', 'help'],
  [4, 'enormous', 'huge'],
  [4, 'cry', 'weep'],
  [4, 'look', 'see'],
  [5, 'famous', 'well-known'],
  [5, 'damp', 'wet'],
  [5, 'error', 'mistake'],
  [5, 'reply', 'answer'],
  [6, 'commence', 'begin'],
  [6, 'feeble', 'weak'],
  [6, 'evident', 'clear'],
  [4, 'big', 'large'],
  [4, 'begin', 'start'],
  [4, 'quick', 'fast'],
  [4, 'shut', 'close'],
  [4, 'glad', 'happy'],
  [4, 'gift', 'present'],
  [4, 'end', 'finish'],
  [4, 'small', 'little'],
  [5, 'brave', 'courageous'],
  [5, 'rich', 'wealthy'],
  [5, 'tired', 'exhausted'],
  [5, 'strange', 'unusual'],
  [5, 'enough', 'sufficient'],
  [5, 'help', 'assist'],
  [5, 'shy', 'timid'],
  [5, 'ancient', 'very old'],
  [6, 'abundant', 'plentiful'],
  [6, 'humble', 'modest'],
  [6, 'vacant', 'empty'],
  [6, 'conceal', 'hide'],
  [6, 'purchase', 'buy'],
  [6, 'courteous', 'polite'],
  [6, 'obstinate', 'stubborn'],
  [6, 'diligent', 'hard-working'],
]
const ANTONYMS: [G, string, string][] = [
  [4, 'early', 'late'],
  [4, 'heavy', 'light'],
  [4, 'empty', 'full'],
  [4, 'loud', 'quiet'],
  [4, 'strong', 'weak'],
  [4, 'win', 'lose'],
  [4, 'buy', 'sell'],
  [4, 'remember', 'forget'],
  [4, 'push', 'pull'],
  [4, 'borrow', 'lend'],
  [5, 'question', 'answer'],
  [5, 'entrance', 'exit'],
  [5, 'increase', 'decrease'],
  [6, 'ancestor', 'descendant'],
  [6, 'majority', 'minority'],
  [4, 'ancient', 'modern'],
  [4, 'arrive', 'depart'],
  [4, 'cheap', 'expensive'],
  [4, 'narrow', 'wide'],
  [4, 'bitter', 'sweet'],
  [4, 'friend', 'enemy'],
  [4, 'polite', 'rude'],
  [4, 'always', 'never'],
  [5, 'victory', 'defeat'],
  [5, 'generous', 'mean'],
  [5, 'ascend', 'descend'],
  [5, 'shallow', 'deep'],
  [5, 'accept', 'reject'],
  [5, 'scarce', 'plentiful'],
  [5, 'innocent', 'guilty'],
  [6, 'humble', 'proud'],
  [6, 'temporary', 'permanent'],
  [6, 'maximum', 'minimum'],
  [6, 'include', 'exclude'],
  [6, 'external', 'internal'],
  [6, 'optimist', 'pessimist'],
  [6, 'ignorance', 'knowledge'],
]
const COLLECTIVE: [G, string, string][] = [
  [4, 'flowers', 'bunch'],
  [4, 'keys', 'bunch'],
  [4, 'goats', 'herd'],
  [4, 'birds', 'flock'],
  [5, 'books', 'pile'],
  [5, 'people', 'crowd'],
  [5, 'musicians', 'band'],
  [6, 'islands', 'group'],
  [6, 'mountains', 'range'],
  [4, 'cattle', 'herd'],
  [4, 'sheep', 'flock'],
  [4, 'bees', 'swarm'],
  [4, 'fish', 'school'],
  [4, 'players', 'team'],
  [5, 'lions', 'pride'],
  [5, 'soldiers', 'army'],
  [5, 'stairs', 'flight'],
  [5, 'thieves', 'gang'],
  [5, 'grapes', 'bunch'],
  [6, 'wolves', 'pack'],
  [6, 'ships', 'fleet'],
  [6, 'singers', 'choir'],
  [6, 'puppies', 'litter'],
  [6, 'elephants', 'herd'],
]

export const vocabU = (g: G): Generator => (rng, level) => {
  const syn = forGrade(SYNONYMS, g)
  const ant = forGrade(ANTONYMS, g)
  if (level <= 2 || (level === 4 && rng.next() < 0.5)) {
    const [w, s] = rng.pick(syn)
    const wrong = rng.sample(ant.map(([, b]) => b).concat(syn.filter(([x]) => x !== w).map(([, b]) => b)), 3)
    return q(level, `Which word means the same as "${w}"?`, s, wrong, `"${w}" and "${s}" mean the same.`)
  }
  if (level === 3 || level === 4) {
    const [w, a] = rng.pick(ant)
    const wrong = rng.sample(syn.map(([, b]) => b).concat(ant.filter(([x]) => x !== w).map(([, b]) => b)), 3)
    return q(level, `Which word is the opposite of "${w}"?`, a, wrong, `The opposite of "${w}" is "${a}".`)
  }
  if (rng.next() < 0.5) {
    const pool = forGrade(HOMOPHONES, g)
    const [s, right, wrong] = rng.pick(pool)
    if (level >= 4) {
      // Harder: one correct sentence among sentences that each use the wrong sound-alike.
      const others = rng.sample(pool.filter(([x]) => x !== s), 2)
      const fill = (t: string, w: string) => t.replace('___', w)
      return q(level, 'Which sentence is written correctly?', fill(s, right), [fill(s, wrong), ...others.map(([t, , w]) => fill(t, w))], `"${right}" and "${wrong}" sound alike but mean different things.`)
    }
    return q(level, `Choose the correct word:\n${s}`, right, [wrong], `"${right}" and "${wrong}" sound alike but mean different things.`)
  }
  const [thing, coll] = rng.pick(forGrade(COLLECTIVE, g))
  return q(level, `Choose the right word: a ___ of ${thing}`, coll, rng.sample([...new Set(forGrade(COLLECTIVE, g).map(([, c]) => c))].filter((c) => c !== coll), 3))
}

// [min grade, sentence, right word, sound-alike]
const HOMOPHONES: [G, string, string, string][] = [
  [4, 'I will ___ a letter to my aunt.', 'write', 'right'],
  [4, 'We ___ the match on Friday.', 'won', 'one'],
  [4, 'The wind ___ the papers away.', 'blew', 'blue'],
  [4, 'I can ___ the drums from here.', 'hear', 'here'],
  [4, 'The children ate ___ lunch under a tree.', 'their', 'there'],
  [4, 'Please wait for me ___.', 'here', 'hear'],
  [4, 'The ___ is shining brightly.', 'sun', 'son'],
  [4, 'My father has one ___ and two daughters.', 'son', 'sun'],
  [4, 'There are seven days in a ___.', 'week', 'weak'],
  [4, 'The old man felt ___ after his illness.', 'weak', 'week'],
  [4, 'I ___ the answer to that question.', 'know', 'no'],
  [4, 'I can ___ a bird in the tree.', 'see', 'sea'],
  [4, 'The fishermen sailed out to ___.', 'sea', 'see'],
  [5, 'May I have a ___ of cake?', 'piece', 'peace'],
  [5, 'Our country is at ___.', 'peace', 'piece'],
  [5, 'She has ___ her homework already.', 'passed', 'past'],
  [5, 'We walked ___ the school gate.', 'past', 'passed'],
  [5, 'The farmer kept the animals in a ___.', 'barn', 'born'],
  [5, 'The baby was ___ in March.', 'born', 'barn'],
  [6, 'He ___ the ball over the fence.', 'threw', 'through'],
  [6, 'We walked ___ the forest.', 'through', 'threw'],
  [6, 'The weather will ___ our plans for the trip.', 'affect', 'effect'],
  [6, 'Rain had a good ___ on the crops.', 'effect', 'affect'],
  [6, 'The ___ of the school spoke at assembly.', 'principal', 'principle'],
  [6, 'Honesty is an important ___.', 'principle', 'principal'],
  [6, 'Please be ___ in the library.', 'quiet', 'quite'],
]

// ── Nouns ───────────────────────────────────────────────────────────────────

const PLURALS: [G, string, string, string[]][] = [
  [4, 'man', 'men', ['mans', 'mens']],
  [4, 'child', 'children', ['childs', 'childrens']],
  [4, 'foot', 'feet', ['foots', 'feets']],
  [4, 'mouse', 'mice', ['mouses', 'mices']],
  [4, 'bus', 'buses', ['buss', 'busies']],
  [4, 'church', 'churches', ['churchs', 'churchies']],
  [4, 'lady', 'ladies', ['ladys', 'ladyes']],
  [4, 'wife', 'wives', ['wifes', 'wifs']],
  [4, 'potato', 'potatoes', ['potatos', 'potatose']],
  [5, 'loaf', 'loaves', ['loafs', 'loafes']],
  [5, 'radio', 'radios', ['radioes', 'radioss']],
  [5, 'key', 'keys', ['keies', 'kies']],
  [4, 'knife', 'knives', ['knifes', 'knive']],
  [4, 'leaf', 'leaves', ['leafs', 'leafes']],
  [4, 'baby', 'babies', ['babys', 'babyes']],
  [4, 'tomato', 'tomatoes', ['tomatos', 'tomatoe']],
  [4, 'box', 'boxes', ['boxs', 'boxen']],
  [4, 'tooth', 'teeth', ['tooths', 'toothes']],
  [4, 'goose', 'geese', ['gooses', 'geeses']],
  [5, 'ox', 'oxen', ['oxes', 'oxs']],
  [5, 'thief', 'thieves', ['thiefs', 'thiefes']],
  [5, 'sheep', 'sheep', ['sheeps', 'sheepes']],
  [5, 'deer', 'deer', ['deers', 'deeres']],
  [5, 'woman', 'women', ['womans', 'womens']],
  [6, 'mother-in-law', 'mothers-in-law', ['mother-in-laws', 'mothers-in-laws']],
  [6, 'passer-by', 'passers-by', ['passer-bys', 'passers-bys']],
  [6, 'crisis', 'crises', ['crisises', 'crisis']],
  [6, 'cactus', 'cacti', ['cactuss', 'cactis']],
  [6, 'belief', 'beliefs', ['believes', 'beliefes']],
  [6, 'chief', 'chiefs', ['chieves', 'chiefes']],
]
const KINDS: [G, string, string, string][] = [
  [4, 'The _River Nzoia_ flows into Lake Victoria.', 'River Nzoia', 'proper noun'],
  [4, 'My _pencil_ is on the desk.', 'pencil', 'common noun'],
  [4, 'A _flock_ of birds flew over the school.', 'flock', 'collective noun'],
  [4, 'We visited _Kisumu_ in April.', 'Kisumu', 'proper noun'],
  [4, 'The _choir_ sang beautifully.', 'choir', 'collective noun'],
  [4, 'The _doctor_ checked my teeth.', 'doctor', 'common noun'],
  [4, 'Our school is closed in _December_.', 'December', 'proper noun'],
  [4, 'A _herd_ of zebras grazed nearby.', 'herd', 'collective noun'],
  [4, 'She carried the _basket_ on her head.', 'basket', 'common noun'],
  [4, 'The _audience_ clapped loudly.', 'audience', 'collective noun'],
  [5, 'He was filled with _joy_.', 'joy', 'abstract noun'],
  [5, '_Patience_ is a virtue we all need.', 'Patience', 'abstract noun'],
  // [min grade, sentence, underlined noun, kind]
  [4, 'Wanjiku lives in _Nakuru_.', 'Nakuru', 'proper noun'],
  [4, 'The _dog_ barked at the visitor.', 'dog', 'common noun'],
  [4, 'Our _class_ won the trophy.', 'class', 'collective noun'],
  [4, 'We met at the _market_ on Friday.', 'market', 'common noun'],
  [4, 'The _team_ trained every evening.', 'team', 'collective noun'],
  [4, 'Mr _Otieno_ teaches us Maths.', 'Otieno', 'proper noun'],
  [5, 'Her _kindness_ made everyone happy.', 'kindness', 'abstract noun'],
  [5, 'The boy showed great _courage_.', 'courage', 'abstract noun'],
  [5, 'A _herd_ of cattle crossed the road.', 'herd', 'collective noun'],
  [5, '_Lake Turkana_ is in northern Kenya.', 'Lake Turkana', 'proper noun'],
  [6, '_Honesty_ is the best policy.', 'Honesty', 'abstract noun'],
  [6, 'The _jury_ listened carefully.', 'jury', 'collective noun'],
  [6, 'There is great _happiness_ in giving.', 'happiness', 'abstract noun'],
  [6, 'We crossed the _River Tana_ by boat.', 'River Tana', 'proper noun'],
]
const ABSTRACT: [G, string, string, string[]][] = [
  [5, 'angry', 'anger', ['angrily', 'angrier', 'angryness']],
  [5, 'proud', 'pride', ['proudly', 'prouder', 'proudness']],
  [6, 'long', 'length', ['longly', 'longer', 'longness']],
  [6, 'wide', 'width', ['widely', 'wider', 'wideness']],
  [6, 'curious', 'curiosity', ['curiously', 'curiouser', 'curiousness']],
  [5, 'happy', 'happiness', ['happily', 'happier', 'happyness']],
  [5, 'brave', 'bravery', ['bravely', 'braver', 'braveness']],
  [5, 'kind', 'kindness', ['kindly', 'kinder', 'kindful']],
  [5, 'honest', 'honesty', ['honestly', 'honester', 'honestness']],
  [5, 'free', 'freedom', ['freely', 'freer', 'freeness']],
  [6, 'wise', 'wisdom', ['wisely', 'wiser', 'wiseness']],
  [6, 'strong', 'strength', ['strongly', 'stronger', 'strongness']],
  [6, 'poor', 'poverty', ['poorly', 'poorer', 'poorness']],
  [6, 'true', 'truth', ['truly', 'truer', 'trueness']],
  [6, 'friend', 'friendship', ['friendly', 'friendlier', 'friendness']],
]

const GENDER: [string, string][] = [
  ['king', 'queen'],
  ['prince', 'princess'],
  ['uncle', 'aunt'],
  ['nephew', 'niece'],
  ['husband', 'wife'],
  ['son', 'daughter'],
  ['bull', 'cow'],
  ['cock', 'hen'],
  ['ram', 'ewe'],
  ['lion', 'lioness'],
  ['waiter', 'waitress'],
  ['host', 'hostess'],
  ['headmaster', 'headmistress'],
  ['grandfather', 'grandmother'],
  ['bridegroom', 'bride'],
  ['gentleman', 'lady'],
]

export const nounsU = (g: G): Generator => (rng, level) => {
  if (level <= 2) {
    const [one, many, wrong] = rng.pick(forGrade(PLURALS, g))
    return q(level, `What is the plural of "${one}"?`, many, wrong.concat(`${one}s`), `one ${one}, many ${many}`)
  }
  if (level === 3) {
    const [s, , kind] = rng.pick(forGrade(KINDS, g))
    return q(level, `What kind of noun is underlined?\n${s}`, kind, ['proper noun', 'common noun', 'collective noun', ...(g >= 5 ? ['abstract noun'] : [])].filter((k) => k !== kind))
  }
  if (level === 5 && g === 4) {
    const [m, f] = rng.pick(GENDER)
    return q(level, `What is the feminine of "${m}"?`, f, rng.sample(GENDER.map(([, b]) => b).filter((x) => x !== f), 3))
  }
  if (level === 4 && rng.next() < 0.4) {
    const [m, f] = rng.pick(GENDER)
    return q(level, `What is the masculine of "${f}"?`, m, rng.sample(GENDER.map(([a]) => a).filter((x) => x !== m), 3))
  }
  if (level === 4 || g === 4) {
    const owner = rng.pick([
      ['the boy', "the boy's", ['the boys', "the boys'"]],
      ['the girls', "the girls'", ["the girl's", "the girls's"]],
      ['the children', "the children's", ["the childrens'", 'the childrens']],
      ['James', "James's", ['Jameses', "James'es"]],
      ['the teacher', "the teacher's", ['the teachers', "the teacher'"]],
      ['the men', "the men's", ["the mens'", 'the mens']],
      ['the farmer', "the farmer's", ['the farmers', "the farmers's"]],
      ['the pupils', "the pupils'", ["the pupil's", "the pupils's"]],
      ['the women', "the women's", ["the womens'", 'the womens']],
      ['my sister', "my sister's", ['my sisters', "my sisters's"]],
      ['the nurses', "the nurses'", ["the nurse's", "the nurses's"]],
      ['Baraka', "Baraka's", ['Barakas', "Barakas'"]],
    ] as const)
    return q(level, `Choose the correct form: These are ___ books. (books belonging to ${owner[0]})`, owner[1], [...owner[2]], 'Add \'s to show who owns something; a plural ending in s takes only \'.')
  }
  if (rng.next() < 0.5) {
    const [m, f] = rng.pick(GENDER)
    const male = rng.next() < 0.5
    const [from, to] = male ? [m, f] : [f, m]
    return q(level, `What is the ${male ? 'feminine' : 'masculine'} of "${from}"?`, to, rng.sample(GENDER.flatMap(([a, b]) => [a, b]).filter((x) => x !== to && x !== from), 3))
  }
  const [adj, noun, wrong] = rng.pick(forGrade(ABSTRACT, g))
  return q(level, `Which noun is formed from the word "${adj}"?`, noun, wrong, `The noun form of "${adj}" is "${noun}".`)
}

// ── Pronouns ────────────────────────────────────────────────────────────────

const REFLEX: [string, string][] = [
  ['I', 'myself'],
  ['You', 'yourself'],
  ['He', 'himself'],
  ['She', 'herself'],
  ['We', 'ourselves'],
  ['They', 'themselves'],
]
const RELATIVE: [string, string][] = [
  ['The boy ___ sits next to me is kind.', 'who'],
  ['The cow ___ gives the most milk is brown.', 'which'],
  ['I know the woman ___ son won the race.', 'whose'],
  ['Here is the pen ___ I borrowed.', 'which'],
  ['The doctor ___ treated me is my aunt.', 'who'],
  ['That is the girl ___ bag was lost.', 'whose'],
  ['The bus ___ takes us to school is new.', 'which'],
  ['The farmer ___ grows tea lives nearby.', 'who'],
  ['He is the pupil ___ drawing won a prize.', 'whose'],
  ['The tree ___ we planted has grown tall.', 'which'],
  ['This is the girl ___ won the race.', 'who'],
  ['That is the man ___ car was stolen.', 'whose'],
  ['I found the book ___ you lost.', 'which'],
  ['The pupils ___ passed were praised.', 'who'],
  ['The dog ___ bit him has been caught.', 'which'],
  ['She is the farmer ___ cows won a prize.', 'whose'],
  ['Here is the house ___ my grandfather built.', 'which'],
  ['The nurse ___ helped me is very kind.', 'who'],
]

export const pronounsU = (g: G): Generator => (rng, level) => {
  if (level === 1) {
    const [s, ans, wrong] = rng.pick<[string, string, string[]]>([
      ['The teacher called Juma and ___ to the office.', 'me', ['I', 'mine', 'myself']],
      ['___ and my sister went to the market.', 'I', ['Me', 'Mine', 'Myself']],
      ['Give the ball to ___.', 'us', ['we', 'our', 'ours']],
      ['___ are going to the farm.', 'They', ['Them', 'Their', 'Theirs']],
      ['Mother gave ___ a new dress.', 'her', ['she', 'hers', 'herself']],
      ['Between you and ___, the test was easy.', 'me', ['I', 'mine', 'myself']],
      ['Wanjiru and ___ are in the same class.', 'I', ['me', 'my', 'mine']],
      ['The coach praised ___ for winning.', 'them', ['they', 'their', 'theirs']],
      ['Amani told ___ a funny story.', 'us', ['we', 'our', 'ours']],
      ['___ is my best friend.', 'She', ['Her', 'Hers', 'Herself']],
      ['Please help ___ to carry this box.', 'me', ['I', 'my', 'mine']],
      ['Our neighbours invited ___ for lunch.', 'us', ['we', 'our', 'ours']],
      ['___ were late because of the rain.', 'We', ['Us', 'Our', 'Ours']],
      ['The prize was given to Atieno and ___.', 'him', ['he', 'his', 'himself']],
      ['___ and his brother planted the trees.', 'He', ['Him', 'His', 'Himself']],
      ['Grandmother waved to ___ from the gate.', 'them', ['they', 'their', 'theirs']],
      ['Is this pen ___?', 'yours', ['your', "your's", 'you']],
      ['Mother cooked supper for my brother and ___.', 'me', ['I', 'my', 'myself']],
    ])
    return q(level, `Choose the correct pronoun:\n${s}`, ans, wrong)
  }
  if (level === 2) {
    const [owner, poss] = rng.pick([
      ['me', 'mine'],
      ['us', 'ours'],
      ['them', 'theirs'],
      ['her', 'hers'],
      ['you', 'yours'],
      ['him', 'his'],
    ])
    const thing = rng.pick(['bag', 'book', 'ball', 'umbrella', 'bicycle', 'cup', 'jacket'])
    return q(level, `This ${thing} belongs to ${owner}. It is ___.`, poss, ['mine', 'ours', 'theirs', 'hers', 'yours', 'his'].filter((x) => x !== poss).slice(0, 3))
  }
  if (level === 3) {
    const [subj, ref] = rng.pick(REFLEX)
    const verb = rng.pick(['washed', 'enjoyed', 'taught', 'dressed', 'helped', 'introduced'])
    return q(level, `${subj} ${verb} ___ .`, ref, REFLEX.map(([, r]) => r).filter((r) => r !== ref).slice(0, 3), `${subj} → ${ref}`)
  }
  const [s, ans] = rng.pick(RELATIVE)
  if (g === 4 && level === 5) return q(level, `Choose the correct word: ${s}`, ans, ['who', 'whose', 'which', 'whom'].filter((x) => x !== ans))
  return q(level, `Choose the correct word: ${s}`, ans, ['who', 'whose', 'which', 'what'].filter((x) => x !== ans), ans === 'who' ? '"who" for people.' : ans === 'whose' ? '"whose" shows owning.' : '"which" for things and animals.')
}

// ── Verbs and tenses ────────────────────────────────────────────────────────

// [min grade, base, past, past participle, continuation]
const IRREG: [G, string, string, string, string][] = [
  [4, 'come', 'came', 'come', 'home early'],
  [4, 'see', 'saw', 'seen', 'a giraffe'],
  [4, 'give', 'gave', 'given', 'her a gift'],
  [4, 'run', 'ran', 'run', 'to the shop'],
  [4, 'make', 'made', 'made', 'a kite'],
  [4, 'find', 'found', 'found', 'the key'],
  [4, 'sleep', 'slept', 'slept', 'early'],
  [5, 'throw', 'threw', 'thrown', 'the ball'],
  [5, 'fly', 'flew', 'flown', 'over the hills'],
  [5, 'draw', 'drew', 'drawn', 'a map'],
  [6, 'shake', 'shook', 'shaken', 'hands'],
  [6, 'hide', 'hid', 'hidden', 'the gift'],
  [4, 'go', 'went', 'gone', 'to Kisumu'],
  [4, 'eat', 'ate', 'eaten', 'all the food'],
  [4, 'write', 'wrote', 'written', 'a letter'],
  [4, 'sing', 'sang', 'sung', 'a beautiful song'],
  [4, 'take', 'took', 'taken', 'the book'],
  [4, 'buy', 'bought', 'bought', 'a new bag'],
  [4, 'drink', 'drank', 'drunk', 'the milk'],
  [5, 'teach', 'taught', 'taught', 'us English'],
  [5, 'catch', 'caught', 'caught', 'a big fish'],
  [5, 'break', 'broke', 'broken', 'the window'],
  [5, 'choose', 'chose', 'chosen', 'a leader'],
  [5, 'speak', 'spoke', 'spoken', 'to the class'],
  [5, 'swim', 'swam', 'swum', 'across the river'],
  [6, 'forgive', 'forgave', 'forgiven', 'his friend'],
  [6, 'tear', 'tore', 'torn', 'the paper'],
  [6, 'freeze', 'froze', 'frozen', 'the water'],
  [6, 'lead', 'led', 'led', 'the team'],
  [6, 'seek', 'sought', 'sought', 'help'],
  [6, 'bear', 'bore', 'borne', 'the pain'],
]

export const verbsU = (g: G): Generator => (rng, level) => {
  const rows = forGrade(IRREG, g)
  const [base, past, pp, rest] = rng.pick(rows)
  const who = name(rng)
  switch (level) {
    case 1:
      return q(level, `Yesterday ${who} ___ ${rest}.`, past, [base, pp !== past ? pp : `${base}ed`, `${base}s`], `"Yesterday" needs the past tense: ${past}.`)
    case 2:
      return q(level, `${who} has already ___ ${rest}.`, pp, [past !== pp ? past : `${base}ed`, base, `${base}ing`], `After "has" or "have" we use the past participle: ${pp}.`)
    case 3: {
      const subj = rng.pick([
        ['Neither the teacher nor the pupils', 'were'],
        ['Each of the boys', 'was'],
        ['The pupils', 'were'],
        ['My mother and father', 'were'],
        ['Everyone in the class', 'was'],
        ['The news', 'was'],
        ['A herd of cattle', 'was'],
        ['The boys and the girls', 'were'],
        ['Either Juma or Otieno', 'was'],
        ['My friends', 'were'],
        ['The teacher', 'was'],
        ['Both of my sisters', 'were'],
        ['Nobody', 'was'],
        ['The team', 'was'],
        ['The visitors from Kisumu', 'were'],
        ['One of the pupils', 'was'],
      ] as const)
      return q(level, `${subj[0]} ___ at the meeting.`, subj[1], [subj[1] === 'was' ? 'were' : 'was', 'is being', 'be'], subj[1] === 'was' ? 'The subject is singular, so "was".' : 'The subject is plural, so "were".')
    }
    case 4: {
      const time = rng.pick([
        ['Look! The children ___ in the field.', 'are playing', ['play', 'played', 'have play']],
        ['By next year, we ___ to a new school.', 'will have moved', ['moved', 'are moving', 'move']],
        ['When the rain started, we ___ football.', 'were playing', ['are playing', 'play', 'have played']],
        ['She ___ in Mombasa since 2020.', 'has lived', ['lives', 'is living', 'lived']],
        ['Tomorrow I ___ my grandmother.', 'will visit', ['visited', 'have visited', 'visiting']],
        ['Every morning, Juma ___ to school.', 'walks', ['walk', 'walking', 'is walked']],
        ['Listen! The birds ___.', 'are singing', ['sing', 'sang', 'have sing']],
        ['Yesterday at noon, I ___ my lunch.', 'was eating', ['am eating', 'eat', 'will eat']],
        ['We ___ our homework already.', 'have finished', ['finish', 'are finishing', 'will finished']],
        ['Next week, the class ___ the museum.', 'will visit', ['visited', 'visits', 'has visited']],
        ['She ___ the piano every evening.', 'plays', ['play', 'playing', 'is play']],
        ['They ___ in Kitale for five years now.', 'have lived', ['live', 'lived', 'are live']],
        ['When the bell rang, the pupils ___ out.', 'ran', ['run', 'are running', 'runs']],
        ['Right now, mother ___ supper.', 'is cooking', ['cooks', 'cooked', 'has cook']],
        ['By the time we arrived, the bus ___.', 'had left', ['leaves', 'has leave', 'is leaving']],
        ['If it rains, we ___ indoors.', 'will play', ['played', 'had played', 'plays']],
      ] as const)
      return q(level, time[0], time[1], [...time[2]])
    }
    default: {
      if (g === 6) {
        const pas = rng.pick([
          ['The cat chased the rat.', 'The rat was chased by the cat.', ['The rat chased the cat.', 'The rat is chased by the cat.', 'The cat was chased by the rat.']],
          ['Wanjiku wrote the letter.', 'The letter was written by Wanjiku.', ['The letter wrote Wanjiku.', 'The letter is written by Wanjiku.', 'Wanjiku was written by the letter.']],
          ['The farmers planted trees.', 'Trees were planted by the farmers.', ['Trees planted the farmers.', 'Trees was planted by the farmers.', 'The farmers were planted by trees.']],
          ['The teacher marks our books.', 'Our books are marked by the teacher.', ['Our books were marked by the teacher.', 'Our books is marked by the teacher.', 'The teacher is marked by our books.']],
          ['Mother cooked the food.', 'The food was cooked by mother.', ['The food cooked mother.', 'The food is cooked by mother.', 'Mother was cooked by the food.']],
          ['The pupils cleaned the classroom.', 'The classroom was cleaned by the pupils.', ['The classroom cleaned the pupils.', 'The classroom were cleaned by the pupils.', 'The pupils were cleaned by the classroom.']],
          ['A carpenter made this desk.', 'This desk was made by a carpenter.', ['This desk made a carpenter.', 'This desk is made by a carpenter.', 'A carpenter was made by this desk.']],
          ['The wind blew the papers away.', 'The papers were blown away by the wind.', ['The papers blew the wind away.', 'The papers was blown away by the wind.', 'The papers were blew away by the wind.']],
          ['Kamau painted the gate.', 'The gate was painted by Kamau.', ['The gate painted Kamau.', 'The gate is painted by Kamau.', 'Kamau was painted by the gate.']],
          ['The farmers harvest the maize.', 'The maize is harvested by the farmers.', ['The maize was harvested by the farmers.', 'The maize are harvested by the farmers.', 'The farmers are harvested by the maize.']],
        ] as const)
        return q(level, `Change to the passive: "${pas[0]}"`, pas[1], [...pas[2]], 'The object becomes the subject, and we use "was/were/is/are" + past participle.')
      }
      const [b2, p2, pp2, r2] = rng.pick(rows)
      if (rng.next() < 0.5) {
        const who = name(rng)
        return q(level, `Choose the correct sentence.`, `${who} ${p2} ${r2} and then went home.`, [`${who} ${pp2 === p2 ? `${b2}s` : pp2} ${r2} and then went home.`, `${who} ${b2} ${r2} and then went home.`, `${who} ${b2}ing ${r2} and then went home.`])
      }
      return q(level, `Choose the correct sentence.`, `We had ${pp2} ${r2} before the bell rang.`, [`We had ${p2 === pp2 ? `${b2}ed` : p2} ${r2} before the bell rang.`, `We had ${b2} ${r2} before the bell rang.`, `We have ${b2}ing ${r2} before the bell rang.`])
    }
  }
}

// ── Adjectives and adverbs ──────────────────────────────────────────────────

const COMPARE: [G, string, string, string][] = [
  [4, 'small', 'smaller', 'smallest'],
  [4, 'long', 'longer', 'longest'],
  [4, 'hot', 'hotter', 'hottest'],
  [4, 'heavy', 'heavier', 'heaviest'],
  [4, 'fast', 'faster', 'fastest'],
  [4, 'old', 'older', 'oldest'],
  [4, 'strong', 'stronger', 'strongest'],
  [4, 'clean', 'cleaner', 'cleanest'],
  [4, 'busy', 'busier', 'busiest'],
  [4, 'thin', 'thinner', 'thinnest'],
  [4, 'kind', 'kinder', 'kindest'],
  [5, 'famous', 'more famous', 'most famous'],
  [5, 'honest', 'more honest', 'most honest'],
  [4, 'tall', 'taller', 'tallest'],
  [4, 'big', 'bigger', 'biggest'],
  [4, 'happy', 'happier', 'happiest'],
  [4, 'good', 'better', 'best'],
  [4, 'bad', 'worse', 'worst'],
  [5, 'beautiful', 'more beautiful', 'most beautiful'],
  [5, 'many', 'more', 'most'],
  [5, 'little', 'less', 'least'],
  [5, 'careful', 'more careful', 'most careful'],
  [6, 'far', 'farther', 'farthest'],
  [6, 'intelligent', 'more intelligent', 'most intelligent'],
  [6, 'comfortable', 'more comfortable', 'most comfortable'],
]
const ADVERBS: [string, string, string[]][] = [
  ['neat', 'neatly', ['neat', 'neater', 'neatness']],
  ['polite', 'politely', ['polite', 'politer', 'politeness']],
  ['brave', 'bravely', ['brave', 'braver', 'bravery']],
  ['soft', 'softly', ['soft', 'softer', 'softness']],
  ['angry', 'angrily', ['angry', 'angrier', 'anger']],
  ['busy', 'busily', ['busy', 'busier', 'business']],
  ['loud', 'loudly', ['loud', 'louder', 'loudness']],
  ['sad', 'sadly', ['sad', 'sadder', 'sadness']],
  ['quick', 'quickly', ['quick', 'quicker', 'quickness']],
  ['careful', 'carefully', ['careful', 'more careful', 'carefulness']],
  ['happy', 'happily', ['happy', 'happier', 'happiness']],
  ['slow', 'slowly', ['slow', 'slower', 'slowness']],
  ['good', 'well', ['good', 'goodly', 'better']],
  ['proud', 'proudly', ['proud', 'prouder', 'pride']],
  ['gentle', 'gently', ['gentle', 'gentler', 'gentleness']],
  ['silent', 'silently', ['silent', 'silence', 'more silent']],
]
const ORDER: [string, string[], string[]][] = [
  ['Father bought ___ shirt.', ['a', 'new', 'blue', 'cotton'], ['a cotton blue new', 'a blue new cotton', 'a new cotton blue']],
  ['She wore ___ shoes.', ['beautiful', 'black', 'leather'], ['black beautiful leather', 'leather black beautiful', 'beautiful leather black']],
  ['We sat under ___ tree.', ['a', 'tall', 'old', 'mango'], ['a mango old tall', 'an old tall mango', 'a tall mango old']],
  ['He has ___ cat.', ['a', 'friendly', 'little', 'black'], ['a black little friendly', 'a little friendly black', 'a friendly black little']],
  ['They live in ___ hut.', ['a', 'small', 'round', 'grass'], ['a grass round small', 'a round small grass', 'a small grass round']],
  ['She drank from ___ cup.', ['a', 'large', 'blue', 'plastic'], ['a plastic blue large', 'a blue large plastic', 'a large plastic blue']],
  ['She bought ___ dress.', ['a', 'beautiful', 'long', 'red'], ['a red long beautiful', 'a long beautiful red', 'a beautiful red long']],
  ['We saw ___ elephants.', ['two', 'huge', 'grey'], ['grey two huge', 'huge two grey', 'two grey huge']],
  ['He has ___ car.', ['a', 'shiny', 'new', 'Japanese'], ['a Japanese new shiny', 'a new shiny Japanese', 'a shiny Japanese new']],
  ['I sat on ___ chair.', ['an', 'old', 'brown', 'wooden'], ['a brown old wooden', 'a wooden old brown', 'an old wooden brown']],
  ['They live in ___ house.', ['a', 'lovely', 'small', 'white'], ['a white small lovely', 'a small lovely white', 'a lovely white small']],
  ['Grandmother wove ___ basket.', ['a', 'pretty', 'little', 'round', 'sisal'], ['a sisal round little pretty', 'a little pretty round sisal', 'a pretty round sisal little']],
  ['We ate ___ mangoes.', ['some', 'sweet', 'ripe', 'yellow'], ['some yellow ripe sweet', 'some ripe sweet yellow', 'some sweet yellow ripe']],
  ['He found ___ box.', ['an', 'old', 'square', 'metal'], ['a square old metal', 'a metal square old', 'an old metal square']],
  ['She carried ___ jug.', ['a', 'heavy', 'brown', 'clay'], ['a clay brown heavy', 'a brown heavy clay', 'a heavy clay brown']],
]

export const adjU = (g: G): Generator => (rng, level) => {
  const rows = forGrade(COMPARE, g)
  // many, little and far do not describe a person, so they appear only in the written items.
  const [base, er, est] = rng.pick(rows.filter(([b]) => !['many', 'little', 'far'].includes(b)))
  switch (level) {
    case 1:
      return q(level, `Kamau is ___ than his brother. (${base})`, er, [base, est, er.startsWith('more ') ? `${base}er` : `more ${er}`].filter((x) => x !== er), 'Comparing two: the comparative form.')
    case 2:
      return q(level, `She is the ___ girl in our class. (${base})`, est, [base, er, est.startsWith('most ') ? `${base}est` : `most ${est}`], 'Comparing three or more: the superlative form.')
    case 3: {
      const [adj, adv, wrong] = rng.pick(ADVERBS)
      const who = rng.pick(['The old man walked', 'The pupils sang', 'Grandmother spoke', 'The girl wrote', 'The boys worked'])
      return q(level, `${who} ___ . (${adj})`, adv, wrong, `Adverbs tell how: ${adj} → ${adv}.`)
    }
    case 4: {
      if (g === 4) {
        const [s, ans, wrong] = rng.pick<[string, string, string[]]>([
          ['Of all the trees in the park, the baobab is the ___.', 'biggest', ['bigger', 'big', 'most big']],
          ['My handwriting is ___ than it was last term.', 'better', ['gooder', 'best', 'more good']],
          ['That was the ___ storm we have ever had.', 'worst', ['worse', 'baddest', 'most bad']],
          ['A cheetah runs ___ than a lion.', 'faster', ['fastest', 'more fast', 'fast']],
          ['Today is ___ than yesterday.', 'hotter', ['hottest', 'hoter', 'more hot']],
          ['Kendi is the ___ of the three sisters.', 'youngest', ['younger', 'young', 'most young']],
          ['An elephant is ___ than a rhino.', 'heavier', ['heaviest', 'heavyer', 'more heavy']],
          ['This is the ___ road in our village.', 'longest', ['longer', 'most long', 'long']],
          ['My bag is ___ than yours.', 'bigger', ['biger', 'biggest', 'more big']],
          ['Nairobi is the ___ city in Kenya.', 'busiest', ['busier', 'busyest', 'most busy']],
          ['Of the two pens, this one is ___.', 'better', ['best', 'gooder', 'more good']],
          ['Mount Kenya is ___ than Mount Elgon.', 'higher', ['highest', 'more high', 'most high']],
          ['Today the classroom is ___ than it was yesterday.', 'cleaner', ['cleanest', 'more clean', 'clean']],
          ['Grandfather is the ___ person in our family.', 'oldest', ['older', 'most old', 'old']],
          ['A leopard is ___ than a tortoise.', 'faster', ['fastest', 'more fast', 'fast']],
        ])
        return q(level, `Choose the correct word: ${s}`, ans, wrong)
      }
      const [s, words, wrong] = rng.pick(ORDER)
      return q(level, `Choose the best order: ${s}`, words.join(' '), wrong, 'Opinion, size, age, shape, colour, origin, material, then the noun.')
    }
    default: {
      const [s, ans, wrong] = rng.pick<[string, string, string[]]>([
        ['This is ___ book I have ever read.', 'the best', ['the better', 'the goodest', 'the most good']],
        ['Mount Kenya is ___ than Mount Elgon.', 'higher', ['highest', 'more high', 'most high']],
        ['Of the two sisters, Akinyi is ___.', 'the taller', ['the tallest', 'taller', 'the most tall']],
        ['He ran so ___ that he won the race.', 'fast', ['fastly', 'faster', 'fastest']],
        ['The baby slept ___ after the meal.', 'soundly', ['sound', 'sounder', 'soundness']],
        ['There is ___ water in the tank than yesterday.', 'less', ['fewer', 'little', 'least']],
        ['There are ___ pupils in class today than yesterday.', 'fewer', ['less', 'little', 'least']],
        ['She sings ___ than her sister.', 'better', ['good', 'best', 'more good']],
        ['He answered the question ___.', 'correctly', ['correct', 'correctness', 'more correct']],
        ['This is the ___ day of the year.', 'hottest', ['hotter', 'hotest', 'most hot']],
        ['The tortoise moved very ___.', 'slowly', ['slow', 'slower', 'slowness']],
        ['Of all the pupils, Amani writes the ___.', 'most neatly', ['neater', 'more neat', 'neatest']],
        ['Kiprono is ___ than his cousin.', 'taller', ['tallest', 'more tall', 'most tall']],
        ['The baby smiled ___ at her mother.', 'happily', ['happy', 'happier', 'happiness']],
        ['My sister is ___ at Maths than I am.', 'better', ['good', 'best', 'well']],
        ['That was the ___ film I have watched.', 'most interesting', ['interestingest', 'more interesting', 'interesting']],
      ])
      return q(level, `Choose the correct word: ${s}`, ans, wrong)
    }
  }
}

// ── Prepositions and conjunctions ───────────────────────────────────────────

const PREPS: [G, string, string, string[]][] = [
  [4, 'The book is ___ the table.', 'on', ['in', 'among', 'by']],
  [4, 'He jumped ___ the river.', 'across', ['among', 'into', 'at']],
  [4, 'The dog ran ___ the house.', 'around', ['among', 'between', 'at']],
  [4, 'We walked ___ the hill to the school.', 'up', ['into', 'among', 'between']],
  [4, 'Put the milk ___ the fridge.', 'in', ['on', 'at', 'among']],
  [4, 'The bird flew ___ the trees.', 'over', ['in', 'on', 'at']],
  [4, 'My birthday is ___ 5th May.', 'on', ['in', 'at', 'by']],
  [4, 'The cat hid ___ the bed.', 'under', ['over', 'among', 'at']],
  [4, 'Sit ___ Amani and Neema.', 'between', ['among', 'at', 'in']],
  [4, 'We arrived ___ Kisumu at noon.', 'in', ['on', 'at', 'to']],
  [5, 'He is afraid ___ the dark.', 'of', ['from', 'with', 'by']],
  [5, 'She was born ___ 2014.', 'in', ['on', 'at', 'by']],
  [6, 'He is proud ___ his school.', 'of', ['for', 'with', 'at']],
  [4, 'We go to church ___ Sunday.', 'on', ['in', 'at', 'by']],
  [4, 'School opens ___ January.', 'in', ['on', 'at', 'by']],
  [4, 'The bell rings ___ eight o\'clock.', 'at', ['on', 'in', 'by']],
  [4, 'The frog jumped ___ the water.', 'into', ['at', 'among', 'between']],
  [4, 'Share the sweets ___ the three children.', 'among', ['between', 'with', 'by']],
  [4, 'The ball rolled ___ the table.', 'under', ['on', 'at', 'among']],
  [5, 'Divide the mango ___ the two of you.', 'between', ['among', 'with', 'to']],
  [5, 'She has lived here ___ 2019.', 'since', ['for', 'from', 'by']],
  [5, 'We waited ___ two hours.', 'for', ['since', 'from', 'at']],
  [5, 'He is good ___ Mathematics.', 'at', ['in', 'on', 'with']],
  [5, 'The book was written ___ a Kenyan author.', 'by', ['from', 'with', 'of']],
  [6, 'She is very fond ___ music.', 'of', ['with', 'about', 'for']],
  [6, 'The thief was accused ___ stealing.', 'of', ['for', 'with', 'by']],
  [6, 'He apologised ___ coming late.', 'for', ['of', 'about', 'with']],
  [6, 'This answer is different ___ mine.', 'from', ['than', 'with', 'to']],
  [6, 'She insisted ___ paying the bill.', 'on', ['in', 'at', 'for']],
]
const CONJ: [G, string, string, string[]][] = [
  [4, 'I like mangoes ___ oranges.', 'and', ['but', 'or', 'so']],
  [4, 'She was tired, ___ she kept working.', 'but', ['so', 'or', 'because']],
  [4, 'It was raining, ___ we carried umbrellas.', 'so', ['but', 'or', 'because']],
  [4, 'He did not come ___ he was sick.', 'because', ['so', 'and', 'or']],
  [4, 'You can have rice ___ chapati.', 'or', ['and', 'but', 'so']],
  [4, 'Wash your hands ___ you eat.', 'before', ['after', 'because', 'so']],
  [4, 'We went home ___ school ended.', 'after', ['before', 'because', 'or']],
  [4, 'Wait here ___ I come back.', 'until', ['because', 'or', 'but']],
  [4, 'I will help you ___ you ask me.', 'if', ['but', 'so', 'or']],
  [4, 'He sang ___ she played the drum.', 'while', ['or', 'but', 'so']],
  [5, 'She was late ___ she missed the bus.', 'because', ['although', 'unless', 'but']],
  [6, 'He was ___ tired ___ he could not walk.', 'so … that', ['such … that', 'too … to', 'either … or']],
  [4, 'I wanted to play, ___ it was raining.', 'but', ['and', 'so', 'because']],
  [4, 'He was hungry, ___ he ate some bread.', 'so', ['but', 'or', 'although']],
  [4, 'We stayed indoors ___ it was cold.', 'because', ['but', 'or', 'so']],
  [4, 'Would you like tea ___ coffee?', 'or', ['and', 'but', 'so']],
  [5, '___ it was raining, we went to school.', 'Although', ['Because', 'So', 'Unless']],
  [5, 'You will fail ___ you work hard.', 'unless', ['if', 'because', 'and']],
  [5, 'She sings ___ she dances.', 'and', ['but', 'or', 'so']],
  [5, 'He ran fast ___ he could catch the bus.', 'so that', ['although', 'unless', 'but']],
  [6, '___ Juma ___ Atieno came to school. (both were absent)', 'Neither … nor', ['Either … or', 'Both … and', 'Not only … but also']],
  [6, '___ the boys ___ the girls passed. (all of them passed)', 'Both … and', ['Neither … nor', 'Either … or', 'Whether … or']],
  [6, 'You can ___ walk ___ take a matatu.', 'either … or', ['neither … nor', 'both … and', 'whether … nor']],
  [6, 'She is ___ clever ___ hard-working.', 'not only … but also', ['neither … or', 'either … nor', 'both … or']],
]

export const prepU = (g: G): Generator => (rng, level) => {
  const pool = level <= 2 || (level === 4 && rng.next() < 0.5) ? forGrade(PREPS, g) : forGrade(CONJ, g)
  const [s, ans, wrong] = rng.pick(pool)
  return q(level, `Choose the correct word to fill the blank:\n${s}`, ans, wrong)
}

// ── Punctuation ─────────────────────────────────────────────────────────────

const PUNCT: [G, string, string[]][] = [
  [4, 'My name is Neema.', ['my name is Neema.', 'My name is neema.', 'My name is Neema']],
  [4, 'Can you help me?', ['Can you help me.', 'can you help me?', 'Can you help me!']],
  [4, 'We will travel to Mombasa in April.', ['We will travel to mombasa in April.', 'We will travel to Mombasa in april.', 'we will travel to Mombasa in April.']],
  [4, 'Oh, what a lovely gift!', ['Oh, what a lovely gift?', 'oh, what a lovely gift!', 'Oh what a lovely gift.']],
  [4, 'I have a cat, a dog and a goat.', ['I have a cat a dog and a goat.', 'I have, a cat, a dog, and, a goat.', 'i have a cat, a dog and a goat.']],
  [4, 'Mr Kamau is our teacher.', ['mr Kamau is our teacher.', 'Mr kamau is our teacher.', 'Mr Kamau is our teacher']],
  [4, 'Lake Victoria is very large.', ['lake Victoria is very large.', 'Lake victoria is very large.', 'Lake Victoria is very large']],
  [4, 'Stop!', ['stop!', 'Stop?', 'Stop,']],
  [4, 'Is today Monday?', ['Is today monday?', 'is today Monday?', 'Is today Monday.']],
  [4, 'Juma, please sit down.', ['juma, please sit down.', 'Juma please sit down', 'Juma, please sit down?']],
  [5, "We'll meet at the market.", ['Well meet at the market.', "We'll meet at the market", "Wel'l meet at the market."]],
  [5, "The children's toys are new.", ["The childrens toys are new.", "The childrens' toys are new.", "The children's toys are new"]],
  [4, 'Where are you going?', ['Where are you going.', 'where are you going?', 'Where are you going!']],
  [4, 'Kamau, Atieno and Hassan are friends.', ['Kamau Atieno and Hassan are friends.', 'kamau, atieno and hassan are friends.', 'Kamau, Atieno, and, Hassan are friends.']],
  [4, 'We visited Nairobi on Monday.', ['We visited nairobi on monday.', 'we visited Nairobi on Monday.', 'We visited Nairobi on monday.']],
  [4, 'What a beautiful day!', ['What a beautiful day?', 'what a beautiful day!', 'What a beautiful day,']],
  [5, "It's time to go home.", ["Its time to go home.", "It's time to go home", "Its' time to go home."]],
  [5, "The boy's bag is red.", ["The boys bag is red.", "The boy's bag is red", "The boys' bag is red,"]],
  [5, 'We bought mangoes, oranges, bananas and pawpaws.', ['We bought mangoes oranges bananas and pawpaws.', 'We bought, mangoes, oranges, bananas, and, pawpaws.', 'we bought mangoes, oranges, bananas and pawpaws.']],
  [5, "I can't find my pen.", ["I cant find my pen.", "I can't find my pen", "I ca'nt find my pen."]],
  [6, '"Close the door," said the teacher.', ['"Close the door" said the teacher.', 'Close the door, said the teacher.', '"Close the door," said the teacher']],
  [6, 'Mother asked, "Have you finished your homework?"', ['Mother asked, "Have you finished your homework."', 'Mother asked "have you finished your homework?"', 'Mother asked, Have you finished your homework?']],
  [6, "The girls' dormitory is clean.", ["The girls dormitory is clean.", "The girl's' dormitory is clean.", "The girls's dormitory is clean."]],
  [6, 'Yes, I will come to the party.', ['Yes I will come to the party.', 'Yes, I will come to the party', 'yes, i will come to the party.']],
]

export const punctU = (g: G): Generator => (rng, level) => {
  const rows = forGrade(PUNCT, g)
  const [right, wrong] = rng.pick(level <= 2 ? rows.filter(([r]) => !r.includes('"')) : rows)
  if (level <= 3) return q(level, 'Which sentence is punctuated correctly?', right, wrong)
  const [mark, sentence] = rng.pick<[string, string]>([
    ['?', 'How old are you'],
    ['!', 'Oh no, the pot is burning'],
    ['.', 'The sun rises in the east'],
    ['?', 'Did you see the eclipse'],
    ['!', 'What a lovely surprise'],
    ['.', 'Please close the window'],
    ['?', 'Where is my pencil'],
    ['!', 'Hurray, we won the match'],
    ['.', 'My sister is ten years old'],
    ['?', 'Who is knocking at the door'],
    ['!', 'Look, a rainbow'],
    ['.', 'Cows give us milk'],
    ['?', 'Have you finished your work'],
    ['!', 'Wow, what a tall building'],
    ['.', 'We go to school on weekdays'],
    ['?', 'Why is the sky blue'],
    ['!', 'Ouch, that is hot'],
  ])
  return q(level, `Which punctuation mark should end this sentence?\n${sentence} ___`, mark, ['?', '!', '.', ','].filter((x) => x !== mark), mark === '?' ? 'It asks a question.' : mark === '!' ? 'It shows strong feeling.' : 'It is a statement or polite request.')
}

// ── Sentences ───────────────────────────────────────────────────────────────

const ORDERED: [G, string][] = [
  [4, 'Our teacher reads us a story every Friday.'],
  [4, 'The cows are grazing near the river.'],
  [4, 'My brother rides a bicycle to school.'],
  [4, 'Grandmother grows beans in her garden.'],
  [4, 'We wash our hands before every meal.'],
  [4, 'Kamau kicked the ball into the net.'],
  [4, 'The sun sets in the west.'],
  [4, 'Please close the door when you leave.'],
  [4, 'Birds build nests in tall trees.'],
  [4, 'Neema drew a picture of her family.'],
  [4, 'They planted trees on Saturday morning.'],
  [4, 'My father sells vegetables at the market.'],
  [5, 'When it rains, frogs come out to sing.'],
  [5, 'She smiled because she had passed the test.'],
  [6, 'Despite the heavy rain, the match went on.'],
  [4, 'The farmer planted maize in the long rains.'],
  [4, 'My sister reads a story every evening.'],
  [4, 'We clean our classroom on Friday afternoon.'],
  [4, 'The children played happily in the field.'],
  [5, 'Although it was late, the boys finished their work.'],
  [5, 'The doctor who treated me is very kind.'],
  [5, 'If you work hard, you will pass your exams.'],
  [6, 'Not only did she sing, but she also danced.'],
  [6, 'The parcel was delivered by a young messenger.'],
  [6, 'Having finished his homework, Otieno went out to play.'],
]
const TAGS: [string, string][] = [
  ['She is your sister,', "isn't she?"],
  ['They can swim,', "can't they?"],
  ['You will come,', "won't you?"],
  ['He was tired,', "wasn't he?"],
  ["We aren't late,", 'are we?'],
  ["She didn't call,", 'did she?'],
  ['You are coming,', "aren't you?"],
  ['She can swim,', "can't she?"],
  ['They were late,', "weren't they?"],
  ['He does not eat meat,', 'does he?'],
  ['We have finished,', "haven't we?"],
  ['Juma went home,', "didn't he?"],
  ["It isn't raining,", 'is it?'],
  ['Let us go,', 'shall we?'],
]
const REPORTED: [string, string, string[]][] = [
  ['"I am hungry," said Otieno.', 'Otieno said that he was hungry.', ['Otieno said that I am hungry.', 'Otieno said that he is hungry.', 'Otieno says that he was hungry.']],
  ['"We play football every day," said the boys.', 'The boys said that they played football every day.', ['The boys said that we play football every day.', 'The boys said they plays football every day.', 'The boys says that they played football every day.']],
  ['"I can swim," said Akinyi.', 'Akinyi said that she could swim.', ['Akinyi said that I can swim.', 'Akinyi said that she can swam.', 'Akinyi says that she could swim.']],
  ['"I have finished my work," said Juma.', 'Juma said that he had finished his work.', ['Juma said that I have finished my work.', 'Juma said that he has finished my work.', 'Juma says that he had finished his work.']],
  ['"It is raining," said Mother.', 'Mother said that it was raining.', ['Mother said that it is raining.', 'Mother said that it rains.', 'Mother says that it was raining.']],
  ['"We will visit Lamu," said the pupils.', 'The pupils said that they would visit Lamu.', ['The pupils said that we will visit Lamu.', 'The pupils said that they will visited Lamu.', 'The pupils say that they would visit Lamu.']],
  ['"I am tired," said Wanjiru.', 'Wanjiru said that she was tired.', ['Wanjiru said that I am tired.', 'Wanjiru said that she is tired.', 'Wanjiru says that she was tired.']],
  ['"We are going home," the boys said.', 'The boys said that they were going home.', ['The boys said that we are going home.', 'The boys said they are going home.', 'The boys said that we were going home.']],
  ['"I will help you," said Kamau.', 'Kamau said that he would help me.', ['Kamau said that I will help you.', 'Kamau said that he will help you.', 'Kamau says that he would help me.']],
  ['"I like mangoes," said Halima.', 'Halima said that she liked mangoes.', ['Halima said that I like mangoes.', 'Halima said she likes mango.', 'Halima says that she liked mangoes.']],
]

export const sentencesU = (g: G): Generator => (rng, level) => {
  if (level <= 2 || (g === 4 && level !== 5)) {
    const pool = forGrade(ORDERED, g).filter(([s]) => new Set(s.split(' ')).size === s.split(' ').length)
    const [s] = rng.pick(pool)
    const words = s.split(' ')
    const o: OrderQuestion = { id: uid('ue'), type: 'order', level, prompt: 'Arrange the words to make a correct sentence.', tiles: rng.shuffle(words), answer: words, joiner: ' ' }
    return o
  }
  if (level === 3 || g === 4) {
    const [a, joined, wrong] = rng.pick<[string, string, string[]]>([
      ['Juma was sick. He did not go to school.', 'Juma did not go to school because he was sick.', ['Juma was sick because he did not go to school.', 'Juma did not go to school but he was sick.', 'Juma was sick so he went to school.']],
      ['I met a man. The man sells fish.', 'I met a man who sells fish.', ['I met a man which sells fish.', 'I met a man whose sells fish.', 'I met a man and fish.']],
      ['It was raining. We played outside.', 'Although it was raining, we played outside.', ['Because it was raining, we played outside.', 'It was raining so we played outside.', 'Unless it was raining, we played outside.']],
      ['The girl won a prize. Her mother is a nurse.', 'The girl whose mother is a nurse won a prize.', ['The girl who mother is a nurse won a prize.', 'The girl which mother is a nurse won a prize.', 'The girl won a prize whose nurse.']],
      ['The bus was full. We waited for the next one.', 'The bus was full, so we waited for the next one.', ['The bus was full, but we waited for the next one.', 'The bus was full because we waited for the next one.', 'The bus was full or we waited for the next one.']],
      ['I bought a book. The book is about animals.', 'I bought a book which is about animals.', ['I bought a book who is about animals.', 'I bought a book whose is about animals.', 'I bought a book and animals.']],
      ['She is clever. She is hard-working.', 'She is clever and hard-working.', ['She is clever but hard-working.', 'She is clever or hard-working.', 'She is clever so hard-working.']],
      ['You may play. Finish your work first.', 'You may play after you finish your work.', ['You may play before you finish your work.', 'You may play because you finish your work.', 'You may play or you finish your work.']],
      ['The road was muddy. The car got stuck.', 'The car got stuck because the road was muddy.', ['The road was muddy because the car got stuck.', 'The car got stuck but the road was muddy.', 'The car got stuck or the road was muddy.']],
      ['He ran fast. He missed the bus.', 'Although he ran fast, he missed the bus.', ['Because he ran fast, he missed the bus.', 'He ran fast so he missed the bus.', 'Unless he ran fast, he missed the bus.']],
    ])
    return q(level, `Join the sentences correctly:\n${a}`, joined, wrong)
  }
  if (level === 4 && g === 6) {
    const [first, tag] = rng.pick(TAGS)
    return q(level, `Choose the correct question tag: ${first} ___`, tag, TAGS.map(([, t]) => t).filter((t) => t !== tag).slice(0, 3), 'A positive sentence takes a negative tag, and a negative sentence takes a positive tag.')
  }
  const [direct, reported, wrong] = rng.pick(REPORTED)
  return q(level, `Change into reported speech: ${direct}`, reported, wrong, 'Change the pronoun and move the tense back: am → was, will → would, like → liked.')
}

// ── Spelling ────────────────────────────────────────────────────────────────

const SPELL: [G, string, string[]][] = [
  [4, 'school', ['shool', 'scool', 'schol']],
  [4, 'people', ['peple', 'poeple', 'peopel']],
  [4, 'family', ['famly', 'familly', 'fammily']],
  [4, 'island', ['iland', 'islend', 'ilsand']],
  [4, 'answer', ['anser', 'answar', 'ansewr']],
  [4, 'Saturday', ['Saterday', 'Saturdy', 'Satuday']],
  [4, 'January', ['Janury', 'Januery', 'Janaury']],
  [4, 'colour', ['culour', 'colur', 'coulor']],
  [4, 'knife', ['nife', 'knif', 'kneif']],
  [4, 'chicken', ['chiken', 'chickin', 'chikken']],
  [4, 'garden', ['gardin', 'gardun', 'gaden']],
  [4, 'pencil', ['pensil', 'pencel', 'pencill']],
  [5, 'medicine', ['medcine', 'medicin', 'medecine']],
  [5, 'calendar', ['calender', 'calandar', 'calendur']],
  [5, 'restaurant', ['resturant', 'restaurent', 'restrant']],
  [5, 'business', ['bussiness', 'busness', 'buisness']],
  [6, 'rhythm', ['rythm', 'rhythem', 'rhytm']],
  [6, 'parliament', ['parliment', 'parlament', 'parlaiment']],
  [6, 'mischievous', ['mischievious', 'mischevous', 'mischiveous']],
  [6, 'occurred', ['occured', 'ocurred', 'occurrd']],
  [4, 'beautiful', ['beautifull', 'beutiful', 'beatiful']],
  [4, 'Wednesday', ['Wensday', 'Wednsday', 'Wedensday']],
  [4, 'friend', ['freind', 'frend', 'friennd']],
  [4, 'because', ['becouse', 'becuase', 'beacause']],
  [4, 'February', ['Febuary', 'Febrary', 'Februery']],
  [4, 'tomorrow', ['tommorow', 'tomorow', 'tommorrow']],
  [5, 'necessary', ['neccessary', 'necesary', 'nesessary']],
  [5, 'receive', ['recieve', 'receeve', 'resieve']],
  [5, 'believe', ['beleive', 'belive', 'beleave']],
  [5, 'separate', ['seperate', 'separete', 'saperate']],
  [5, 'government', ['goverment', 'governmant', 'govenment']],
  [5, 'library', ['libary', 'liberary', 'librery']],
  [6, 'accommodation', ['accomodation', 'acommodation', 'accommadation']],
  [6, 'embarrass', ['embarass', 'embarras', 'embbarass']],
  [6, 'occasion', ['occassion', 'ocasion', 'occation']],
  [6, 'environment', ['enviroment', 'envirnment', 'enviranment']],
  [6, 'committee', ['commitee', 'comittee', 'committe']],
  [6, 'conscience', ['concience', 'conscence', 'consience']],
  [6, 'privilege', ['priviledge', 'privelege', 'privilage']],
  [6, 'definitely', ['definately', 'definitly', 'defenitely']],
]

export const spellU = (g: G): Generator => (rng, level) => {
  const rows = forGrade(SPELL, g)
  // Short words first; the top levels lean on the grade's newest, hardest words.
  const pool = level <= 2 ? rows.filter(([w]) => w.length <= 9) : level >= 4 ? rows.slice(-20) : rows
  const [right, wrong] = rng.pick(pool)
  return q(level, 'Which word is spelt correctly?', right, wrong)
}

// ── Cloze and comprehension (shared pool; levels set difficulty) ────────────

/** A cloze passage: the text has (1), (2)… where words are missing. */
function cloze(level: Level, title: string, text: string, blanks: [string, string[]][]): BankQuestion[] {
  return blanks.map(([ans, wrong], i) => ({
    type: 'choice' as const,
    level,
    prompt: `Read the passage. Which word best fills blank (${i + 1})?`,
    say: `Which word best fills blank ${i + 1}?`,
    visual: { kind: 'passage' as const, title, text },
    options: opts([ans, ...wrong]),
    answer: ans,
  }))
}
function comp(level: Level, title: string, text: string, qs: [string, string, string[]][]): BankQuestion[] {
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

export const CLOZE_U: BankQuestion[] = [
  ...cloze(1, 'Market Day', 'Every Saturday, my mother (1) to the market. She (2) vegetables and fruit. I always go (3) her to help carry the basket. The market is very (4) on Saturdays. We (5) home before noon.', [
    ['goes', ['go', 'going', 'gone']],
    ['buys', ['buy', 'buying', 'bought it']],
    ['with', ['by', 'at', 'from']],
    ['busy', ['busily', 'business', 'busied']],
    ['return', ['returns', 'returning', 'returned it']],
  ]),
  ...cloze(1, 'My Pet', 'I have a cat (1) Simba. Simba is black (2) white. She likes to sleep (3) the sun. Every morning I give (4) some milk. Simba is my (5) friend.', [
    ['called', ['call', 'calling', 'calls']],
    ['and', ['but', 'or', 'so']],
    ['in', ['on', 'at', 'into']],
    ['her', ['she', 'hers', 'herself']],
    ['best', ['better', 'good', 'well']],
  ]),
  ...cloze(2, 'The Rainy Season', 'The long rains (1) in March. Farmers prepare (2) land early. When the rain (3), they plant maize and beans. The crops grow (4) because the soil is wet. By July, the farmers are (5) to harvest.', [
    ['begin', ['begins', 'began it', 'beginning']],
    ['their', ['there', 'they', "they're"]],
    ['falls', ['fall', 'fell down', 'falling']],
    ['quickly', ['quick', 'quicker', 'quickest']],
    ['ready', ['readily', 'readiness', 'readied']],
  ]),
  ...cloze(2, 'A Visit to the Zoo', 'Last term, our class (1) the Nairobi National Park. We (2) many animals. The lions were (3) under a tree. A giraffe stretched (4) long neck to eat leaves. It was the (5) trip I have ever had.', [
    ['visited', ['visit', 'visits', 'visiting']],
    ['saw', ['see', 'seen', 'seeing']],
    ['sleeping', ['sleep', 'slept', 'sleeps']],
    ['its', ["it's", 'it', 'their']],
    ['best', ['good', 'better', 'well']],
  ]),
  ...cloze(3, 'Clean Water', 'Water is life, (1) many people do not have clean water. Dirty water can cause diseases (2) cholera and typhoid. We should (3) water before drinking it. We must also keep our water sources (4). Everyone has a duty to (5) water.', [
    ['but', ['and', 'so', 'because']],
    ['such as', ['so as', 'like as', 'as such']],
    ['boil', ['boiling', 'boiled', 'boils']],
    ['clean', ['cleanly', 'cleaning', 'cleanness']],
    ['conserve', ['conserving', 'conserved', 'conservation']],
  ]),
  ...cloze(3, 'Sports Day', 'Sports day is (1) favourite day of the year. Learners take part (2) many races. Last year, Chebet (3) the 400 metres race. Everyone cheered (4) she crossed the line. She was given a medal (5) the head teacher.', [
    ['my', ['mine', 'me', 'I']],
    ['in', ['on', 'at', 'with']],
    ['won', ['win', 'wins', 'winning']],
    ['as', ['so', 'but', 'unless']],
    ['by', ['from', 'with', 'of']],
  ]),
  ...cloze(4, 'The Honest Boy', 'Baraka found a wallet (1) the road. (2) he opened it, he saw a lot of money and an identity card. He did not keep the money. (3), he took the wallet to the police station. The owner was (4) grateful that he gave Baraka a reward. Baraka\'s honesty was praised by (5).', [
    ['along', ['among', 'between', 'over']],
    ['When', ['Unless', 'Although', 'Because of']],
    ['Instead', ['Therefore', 'Besides', 'Moreover']],
    ['so', ['such', 'too', 'very']],
    ['everyone', ['every one of', 'each', 'anybody of']],
  ]),
  ...cloze(4, 'Planting Trees', 'Our school started a tree planting project. Each learner was asked to (1) a seedling. We dug holes, (2) the seedlings and watered them. Trees are important (3) they give us shade and clean air. They also (4) soil erosion. If we care for them, they will (5) for many years.', [
    ['bring', ['brought', 'bringing', 'brings']],
    ['planted', ['plant', 'planting', 'plants']],
    ['because', ['although', 'unless', 'but']],
    ['prevent', ['prevents', 'prevention', 'preventing']],
    ['grow', ['grew', 'grown', 'growth']],
  ]),
  ...cloze(5, 'The Drought', 'The drought that hit the north was the worst (1) years. Rivers dried (2) and many animals struggled to find water. The government, (3) with well-wishers, sent food and water. Pastoralists had to move (4) long distances in search of pasture. Experts warn that such droughts will become more (5) unless we protect the environment.', [
    ['in', ['since', 'for', 'at']],
    ['up', ['out of', 'off', 'down to']],
    ['together', ['along', 'combined', 'joined']],
    ['over', ['across to', 'by', 'upon']],
    ['frequent', ['frequently', 'frequency', 'frequents']],
  ]),
  ...cloze(5, 'Technology in School', 'Computers have changed the way we learn. Learners can (1) information on almost any topic within seconds. (2), we must use technology wisely. Spending too many hours on screens can (3) our eyes and our sleep. Teachers advise us to (4) a balance between screen time and outdoor play. Used well, technology is a (5) tool.', [
    ['access', ['excess', 'assess', 'accessed']],
    ['However', ['Therefore', 'Because', 'Unless']],
    ['harm', ['harmful', 'harmed', 'harmless']],
    ['strike', ['struck', 'striking', 'strikes']],
    ['valuable', ['value', 'valued', 'valuation']],
  ]),
  ...cloze(5, 'A Kind Neighbour', 'Mrs Njeri is the (1) person on our street. Whenever someone is sick, she is the first to visit. Last month, she (2) a meal for an old man who lived alone. She does not expect (3) in return. (4) she is not rich, she shares what she has. We all look up (5) her.', [
    ['kindest', ['kinder', 'kind', 'most kindest']],
    ['cooked', ['cook', 'cooks', 'cooking']],
    ['anything', ['nothing', 'something', 'everything']],
    ['Although', ['Because', 'Unless', 'Therefore']],
    ['to', ['at', 'on', 'for']],
  ]),
  ...cloze(3, 'Road Safety', 'Many accidents happen (1) road users are careless. Pedestrians should use zebra crossings and look both ways (2) crossing. Drivers must not (3) the speed limit. Passengers should always (4) their seat belts. If we all follow the rules, our roads will be (5).', [
    ['because', ['although', 'unless', 'so']],
    ['before', ['after', 'while', 'until']],
    ['exceed', ['excess', 'access', 'exceeded']],
    ['fasten', ['fastened', 'fastening', 'fasten up']],
    ['safer', ['safest', 'safely', 'safety']],
  ]),
  ...cloze(1, 'My Family', 'There are five people (1) my family. My father (2) a farmer. My mother is a nurse (3) Kitale. I have one brother (4) one sister. We all love (5) other.', [
    ['in', ['on', 'at', 'by']],
    ['is', ['are', 'am', 'be']],
    ['in', ['on', 'of', 'to']],
    ['and', ['but', 'or', 'so']],
    ['each', ['every', 'all', 'some']],
  ]),
  ...cloze(2, 'Saving Money', 'Neema (1) a small tin where she keeps her savings. Every time she (2) a coin, she drops it in. Last month she counted her money and found that she (3) saved two hundred shillings. She used (4) to buy a story book. Now she is saving (5) a pair of shoes.', [
    ['has', ['have', 'having', 'is']],
    ['gets', ['get', 'getting', 'got it']],
    ['had', ['has', 'have', 'having']],
    ['it', ['them', 'they', 'its']],
    ['for', ['to', 'at', 'by']],
  ]),
  ...cloze(4, 'The Football Final', 'The final match between Moi Primary and Tumaini Academy was (1) on Saturday. (2) the first half, neither team scored. Ten minutes into the second half, Otieno (3) a beautiful goal. The fans cheered (4) loudly that the referee had to wait. Moi Primary won the cup, and the players were (5) of their effort.', [
    ['played', ['play', 'playing', 'plays']],
    ['In', ['On', 'At', 'By']],
    ['scored', ['score', 'scoring', 'scores']],
    ['so', ['such', 'very', 'too']],
    ['proud', ['pride', 'proudly', 'prouder']],
  ]),
  ...cloze(5, 'Bees and Farmers', 'Bees are (1) of the most useful insects on earth. As they move from flower to flower, they carry pollen, (2) helps plants to form fruits and seeds. Without bees, many crops (3) produce less food. Farmers who keep hives also earn money from honey and wax. (4), bees are threatened by the careless use of chemicals. Farmers are therefore encouraged to spray only (5) necessary.', [
    ['one', ['once', 'only', 'won']],
    ['which', ['who', 'whose', 'whom']],
    ['would', ['will be', 'shall', 'did']],
    ['However', ['Therefore', 'Because', 'Unless']],
    ['when', ['what', 'which', 'who']],
  ]),
]

export const COMP_U: BankQuestion[] = [
  ...comp(1, 'Grandmother\'s Farm', 'During the holidays, Otieno visited his grandmother in Siaya. She has a small farm with cows, goats and hens. Every morning Otieno helped to milk the cows. In the afternoon he fed the hens and collected eggs. He was sad when the holidays ended.', [
    ['Where does Otieno\'s grandmother live?', 'in Siaya', ['in Nairobi', 'in Mombasa', 'in Nakuru']],
    ['What did Otieno do every morning?', 'He helped to milk the cows.', ['He fed the hens.', 'He went to school.', 'He collected firewood.']],
    ['When did he collect eggs?', 'in the afternoon', ['in the morning', 'at night', 'on Sunday']],
    ['How did Otieno feel when the holidays ended?', 'sad', ['happy', 'angry', 'excited']],
  ]),
  ...comp(2, 'The New Library', 'Our school opened a new library last month. It has more than two thousand books, tables and comfortable chairs. Learners can borrow two books at a time and must return them within a week. The librarian, Mrs Wairimu, is always ready to help us find books. Since the library opened, many learners have started reading during break time.', [
    ['When was the library opened?', 'last month', ['last year', 'last week', 'yesterday']],
    ['How many books can a learner borrow at a time?', 'two', ['one', 'three', 'four']],
    ['Who is Mrs Wairimu?', 'the librarian', ['the head teacher', 'a learner', 'a cook']],
    ['What change has the library brought?', 'More learners read during break.', ['Learners stopped reading.', 'Break time was cancelled.', 'Learners buy more books.']],
    ['Which word in the passage means "give back"?', 'return', ['borrow', 'help', 'open']],
  ]),
  ...comp(3, 'The Clever Hare', 'Long ago, a hare and an elephant were friends. One dry season, the river near their home dried up. The elephant, who was very strong, said he would dig a well. The hare promised to bring food while the elephant dug. But every day the hare ate the food on the way. After three days, the elephant discovered the trick. He was so angry that he ended the friendship. From that day, the hare has always run away when he sees an elephant.', [
    ['Why did the animals need a well?', 'The river had dried up.', ['They wanted to swim.', 'The elephant was bored.', 'It was raining.']],
    ['What did the hare promise to do?', 'bring food', ['dig the well', 'find water', 'build a house']],
    ['How did the hare cheat the elephant?', 'He ate the food on the way.', ['He dug a hole.', 'He hid the water.', 'He ran away from home.']],
    ['Which word best describes the hare?', 'dishonest', ['hard-working', 'generous', 'brave']],
    ['What lesson does the story teach?', 'Dishonesty can destroy friendship.', ['Strength is better than wisdom.', 'Fast animals always win races.', 'Deep wells are dangerous places.']],
  ]),
  ...comp(3, 'Saving Water', 'In many parts of Kenya, water is scarce. Families walk long distances to fetch it. At our school, we have learnt simple ways of saving water. We close taps after use and report any leaks. Water from washing hands is collected and used to water the school garden. Our head teacher says that every drop counts.', [
    ['What does "scarce" mean in the passage?', 'not enough', ['very cold', 'too much', 'dirty']],
    ['What do learners do after using taps?', 'close them', ['leave them open', 'clean them', 'break them']],
    ['How is water from washing hands used?', 'to water the school garden', ['for drinking', 'for cooking', 'it is thrown away']],
    ['What does "every drop counts" mean?', 'Even a little water is important.', ['We must count water.', 'Water drops are heavy.', 'Rain falls drop by drop.']],
  ]),
  ...comp(4, 'The Science Fair', 'Amina and her friend Kiprono spent three weeks preparing for the county science fair. Their project showed how to make a simple water filter using sand, charcoal and gravel. On the day of the fair, the judges asked many questions. Kiprono was nervous, but Amina explained each step clearly. When the results were announced, their project came second out of forty. Their teacher, Mr Mutua, was proud of them and promised to help them prepare for the national fair.', [
    ['How long did the friends prepare?', 'three weeks', ['three days', 'one month', 'two weeks']],
    ['What did their project show?', 'how to make a water filter', ['how to grow maize', 'how to make bricks', 'how to cook rice']],
    ['How did Kiprono feel in front of the judges?', 'nervous', ['angry', 'bored', 'sleepy']],
    ['In what position did their project come?', 'second', ['first', 'third', 'fortieth']],
    ['What will Mr Mutua help them do next?', 'prepare for the national fair', ['buy new sand for the project', 'judge the county science fair', 'teach the class a new subject']],
  ]),
  ...comp(4, 'Letter to a Friend', 'Dear Neema, I hope you are well. I am writing to tell you about our trip to Mombasa. We travelled by the new train and arrived in five hours. We visited Fort Jesus, which was built by the Portuguese more than four hundred years ago. In the evening we walked along the beach and ate roasted maize. I wish you had been with us. Please write back soon. Your friend, Zawadi.', [
    ['Who wrote the letter?', 'Zawadi', ['Neema', 'the Portuguese', 'a teacher']],
    ['How did they travel to Mombasa?', 'by train', ['by bus', 'by plane', 'by car']],
    ['Who built Fort Jesus?', 'the Portuguese', ['the British', 'the Arabs', 'Kenyans']],
    ['What did they eat on the beach?', 'roasted maize', ['fish', 'mangoes', 'ice cream']],
    ['What does Zawadi wish?', 'that Neema had been with them', ['that they could live in Mombasa', 'that they had travelled by plane', 'that they could build a new fort']],
  ]),
  ...comp(5, 'The Importance of Forests', 'Forests cover about seven per cent of Kenya\'s land. They are often called the "lungs of the earth" because trees take in carbon dioxide and give out oxygen. Forests such as the Mau and Mount Kenya are water towers: rain falls on them and feeds the rivers that millions of people depend on. Sadly, forests are being cleared for farming, charcoal and settlement. When forests disappear, rivers dry up, rainfall becomes unreliable and wild animals lose their homes. The government has banned logging in some forests and encourages every Kenyan to plant trees.', [
    ['Why are forests called "the lungs of the earth"?', 'Trees take in carbon dioxide and give out oxygen.', ['Forests are shaped like the lungs in our bodies.', 'Animals breathe more easily when they live in them.', 'Forests cover more land than any other plants.']],
    ['What is a "water tower" in the passage?', 'a forest that feeds rivers', ['a tank on a tower', 'a tall building', 'a type of tree']],
    ['Which of these is NOT given as a reason for clearing forests?', 'tourism', ['farming', 'charcoal', 'settlement']],
    ['What happens when forests disappear?', 'Rivers dry up and rainfall becomes unreliable.', ['More rain falls and rivers flood every day.', 'Animals find more homes in the open land.', 'The soil becomes richer and more fertile.']],
    ['What is the best title for this passage?', 'Why We Must Protect Our Forests', ['How to Make Charcoal', 'The Mau Forest Animals', 'Farming in Kenya']],
  ]),
  ...comp(5, 'A Lesson in Patience', 'Mutua wanted a bicycle more than anything. His father told him that if he saved half the money, he would pay the rest. Mutua began to sell boiled eggs at the bus stage every Saturday. Some weeks he sold everything; other weeks it rained and few people came. Twice he was tempted to spend his savings on sweets, but he remembered his goal. After eight months, he counted his money: he had saved four thousand shillings, exactly half the price. His father kept his promise. Today, Mutua rides to school, and he says the bicycle feels special because he worked for it.', [
    ['What did Mutua\'s father promise?', 'to pay the other half', ['to buy sweets', 'to sell eggs', 'to build a shop']],
    ['How did Mutua raise money?', 'by selling boiled eggs', ['by washing cars', 'by begging', 'by selling sweets']],
    ['What was the full price of the bicycle?', '8,000 shillings', ['4,000 shillings', '2,000 shillings', '6,000 shillings']],
    ['Why did he sometimes sell few eggs?', 'It rained and few people came.', ['He was at school all morning.', 'His hens laid very few eggs.', 'He sold his eggs too cheaply.']],
    ['Which word best describes Mutua?', 'determined', ['lazy', 'careless', 'greedy']],
  ]),
  ...comp(2, 'Kenya\'s Flag', 'The Kenyan flag has four colours: black, red, green and white. Black stands for the people of Kenya. Red stands for the sacrifices made in the struggle for independence. Green stands for our land and natural wealth, and white stands for peace. In the middle there is a shield and two spears, which show that we are ready to defend our freedom. The flag is raised every Monday at school assembly.', [
    ['How many colours are on the Kenyan flag?', 'four', ['three', 'five', 'two']],
    ['What does green stand for?', 'our land and natural wealth', ['peace and honesty', 'the people of Kenya', 'the sacrifices for freedom']],
    ['What do the shield and spears show?', 'readiness to defend our freedom', ['the wealth of our farms and land', 'peace and unity among all people', 'the sacrifices made for freedom']],
    ['When is the flag raised at school?', 'every Monday', ['every Friday', 'once a year', 'every evening']],
  ]),
  ...comp(1, 'A Rainy Morning', 'It rained heavily on Monday morning. Wanjiru put on her raincoat and gumboots. Her father carried her to the gate under a big umbrella. At school, the teacher asked the learners to hang their wet coats outside. By ten o\'clock, the sun was shining again.', [
    ['On which day did it rain heavily?', 'Monday', ['Sunday', 'Friday', 'Tuesday']],
    ['What did Wanjiru wear on her feet?', 'gumboots', ['sandals', 'slippers', 'socks only']],
    ['Who carried Wanjiru to the gate?', 'her father', ['her mother', 'her teacher', 'her brother']],
    ['When did the sun shine again?', 'by ten o\'clock', ['at night', 'at noon', 'in the evening']],
  ]),
  ...comp(1, 'The School Garden', 'Our class has a small garden behind the library. We grow kale, spinach and carrots. Every Tuesday, we water the plants and pull out weeds. Last week we harvested a big basket of kale. The cook used it to prepare lunch for the whole school.', [
    ['Where is the class garden?', 'behind the library', ['next to the gate', 'in the classroom', 'near the river']],
    ['Which vegetable is NOT grown in the garden?', 'cabbage', ['kale', 'spinach', 'carrots']],
    ['When do the pupils water the plants?', 'every Tuesday', ['every Friday', 'every day', 'once a month']],
    ['Who used the kale?', 'the cook', ['the head teacher', 'the pupils at home', 'a farmer']],
  ]),
  ...comp(2, 'A Trip to the Museum', 'On Friday, Grade 5 visited the Nairobi National Museum. A guide called Mr Ouma showed them old tools that early people used. The learners also saw stuffed birds and a huge elephant skeleton. Halima drew pictures of the tools in her notebook. On the bus home, everyone agreed it was the best trip of the year.', [
    ['Which museum did the learners visit?', 'Nairobi National Museum', ['Fort Jesus', 'Kisumu Museum', 'Lamu Museum']],
    ['Who was the guide?', 'Mr Ouma', ['Halima', 'the driver', 'the head teacher']],
    ['What did Halima draw?', 'the old tools', ['the bus', 'the guide', 'the birds only']],
    ['How did the learners feel about the trip?', 'They enjoyed it very much.', ['They were bored.', 'They were angry.', 'They wanted to sleep.']],
  ]),
  ...comp(3, 'Kipsang\'s Kite', 'Kipsang wanted to fly a kite like the ones he saw in a book. He collected thin sticks, an old newspaper, some glue and a long string. His first kite was too heavy and would not rise. His sister Chepkoech suggested using lighter sticks and a longer tail. The second kite rose high above the maize field. Kipsang learnt that a good friend\'s advice can turn failure into success.', [
    ['Where did Kipsang first see kites?', 'in a book', ['on television', 'at the market', 'at school']],
    ['Why did the first kite fail?', 'It was too heavy.', ['It had no string.', 'It was too small.', 'There was no wind at all.']],
    ['Who helped Kipsang?', 'his sister Chepkoech', ['his teacher', 'his father', 'a neighbour']],
    ['Which word in the passage means "go up"?', 'rise', ['collect', 'fail', 'suggest']],
    ['What lesson did Kipsang learn?', 'Good advice can turn failure into success.', ['Flying kites is a waste of good time.', 'Maize fields are the best place to play.', 'Strong sticks are too heavy for a kite.']],
  ]),
  ...comp(4, 'The Market Chairperson', 'Mama Wanjiku was elected chairperson of the Karatina market traders. The market had no proper drainage, and during the rains it became muddy. She called a meeting where traders agreed to each contribute fifty shillings a week. With the money and help from the county, they dug drains and laid gravel. Within three months, the market was clean and dry, and more customers came. The traders praised her for bringing them together.', [
    ['What problem did the market have?', 'It became muddy during the rains.', ['It had too many customers.', 'It was too dry.', 'It had no traders.']],
    ['How much did each trader contribute weekly?', 'fifty shillings', ['five hundred shillings', 'five shillings', 'one hundred shillings']],
    ['Who else helped the traders?', 'the county', ['a church', 'the police', 'a school']],
    ['What happened after the drains were dug?', 'More customers came to the market.', ['The traders moved to another town.', 'The market was closed for repairs.', 'The long rains stopped completely.']],
    ['Which quality best describes Mama Wanjiku?', 'a good leader', ['a lazy person', 'a selfish trader', 'a shy farmer']],
  ]),
  ...comp(5, 'Solar Power in Our Village', 'Two years ago, our village had no electricity. Families used paraffin lamps, which gave off smoke and were expensive to refill. Then a community group installed solar panels on the roofs of the school and the health centre. The school now has lights for evening study, and the health centre can store vaccines in a solar fridge. Some families have bought small solar kits that charge phones and light their homes. Elders say that clean energy has brought both light and hope. Still, the panels must be cleaned regularly and protected from damage to keep working well.', [
    ['What did families use before solar power?', 'paraffin lamps', ['electric bulbs', 'gas cookers', 'candles only']],
    ['Why were paraffin lamps a problem?', 'They gave off smoke and were expensive.', ['They needed bright sun to work well.', 'They were too bright for small rooms.', 'They were free but hard to find.']],
    ['How has solar power helped the health centre?', 'It can keep vaccines cold.', ['It has more doctors.', 'It closed early.', 'It sells phones.']],
    ['What does "install" mean in the passage?', 'put in place', ['take away', 'paint', 'sell']],
    ['What must be done to keep the panels working?', 'clean and protect them', ['cover them with soil', 'switch them off', 'move them indoors']],
  ]),
  ...comp(5, 'The Library Club', 'When Mr Chege started a library club, only six learners joined. He asked each member to read one book a week and share it with the club. Soon, members were acting out stories and writing their own endings. Other learners became curious and asked to join. By the end of the year, the club had forty members and had raised money to buy fifty new books. The head teacher noticed that the members\' English marks had improved greatly. Mr Chege says the secret was simple: reading should be fun.', [
    ['How many learners first joined the club?', 'six', ['forty', 'fifty', 'ten']],
    ['What did each member do every week?', 'read one book and share it', ['write an exam', 'buy a book', 'clean the library']],
    ['Why did other learners join?', 'They became curious.', ['They were forced.', 'They were paid.', 'They wanted to sleep.']],
    ['What happened to the members\' English marks?', 'They improved greatly.', ['They dropped.', 'They stayed the same.', 'They were not recorded.']],
    ['What is the main idea of the passage?', 'Making reading fun helps learners grow.', ['Libraries are always quiet.', 'Books are expensive.', 'Clubs should be small.']],
  ]),
]

export function upperEnglishGenerators(): Record<string, Generator> {
  const out: Record<string, Generator> = {}
  for (const g of [4, 5, 6] as G[]) {
    const p = `u${g}e-`
    out[`${p}vocab`] = vocabU(g)
    out[`${p}nouns`] = nounsU(g)
    out[`${p}pron`] = pronounsU(g)
    out[`${p}verbs`] = verbsU(g)
    out[`${p}adj`] = adjU(g)
    out[`${p}prep`] = prepU(g)
    out[`${p}punct`] = punctU(g)
    out[`${p}sentences`] = sentencesU(g)
    out[`${p}spell`] = spellU(g)
  }
  return out
}

export function upperEnglishBanks(): Record<string, BankQuestion[]> {
  const out: Record<string, BankQuestion[]> = {}
  for (const g of [4, 5, 6]) {
    out[`u${g}e-comp`] = COMP_U
    out[`u${g}e-cloze`] = CLOZE_U
  }
  return out
}

