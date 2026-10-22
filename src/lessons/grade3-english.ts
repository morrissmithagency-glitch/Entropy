// Grade 3 English lessons.
import type { Lesson } from './types'

export const ENGLISH3_LESSONS: Record<string, Lesson> = {
  'te-respond': {
    intro: 'Good speakers listen carefully, answer politely and know the names of the people who help us.',
    steps: [
      {
        title: 'Polite words',
        text: 'We say please when we ask, thank you when we are given something, and sorry when we hurt someone.',
        example: ['"May I borrow your ruler, please?"', '"Thank you for helping me."'],
      },
      {
        title: 'Answer the question asked',
        text: 'Listen for the question word. Who asks for a person, where asks for a place, when asks for a time.',
        example: ['Where do you live? → I live in Kisumu.', 'When do we go home? → At four o\'clock.'],
      },
      {
        title: 'People and their jobs',
        text: 'A job name often tells what the person does.',
        example: ['A farmer grows crops.', 'A tailor sews clothes.', 'A mason builds with stones.'],
      },
    ],
    remember: 'Listen to the question word, answer in a full sentence, and use please, thank you and sorry.',
  },
  'te-comp': {
    intro: 'Reading a story well means finding the answers in it, and thinking about what it means.',
    steps: [
      {
        title: 'Read the questions first',
        text: 'Read the questions before the story. Then you know what to look for as you read.',
      },
      {
        title: 'Find the words',
        text: 'Most answers are in the story. Look for the same words as the question, then read the sentence around them.',
        visual: { kind: 'passage', title: 'The Well', text: 'Every morning Zawadi carried a yellow jerrycan to the well. It took her ten minutes to walk there.' },
        example: ['What colour was the jerrycan? → yellow'],
      },
      {
        title: 'Think about why',
        text: 'Some answers are not written. Use clues in the story to work them out.',
        example: ['Why did Zawadi go to the well? → to fetch water', 'The jerrycan and the well are the clues.'],
      },
    ],
    remember: 'Read the questions first, then find the same words in the story. For "why", use the clues.',
  },
  'te-vocab': {
    intro: 'The more words you know, the better you read, speak and write.',
    steps: [
      {
        title: 'Opposites',
        text: 'Opposites mean the very different thing.',
        example: ['wide → narrow', 'sweet → bitter', 'early → late'],
      },
      {
        title: 'Words that mean the same',
        text: 'Some words mean almost the same thing. We can use them to make our writing more interesting.',
        example: ['big → large, huge', 'happy → glad, joyful'],
      },
      {
        title: 'Use the sentence to help you',
        text: 'If you do not know a word, read the whole sentence. The other words give a clue.',
        example: ['The tea was so _bitter_ that she added sugar.', 'Sugar is added to things that are not sweet, so bitter means not sweet.'],
      },
    ],
    remember: 'Read the whole sentence: the words around a new word tell you what it means.',
  },
  'te-plural': {
    intro: 'A noun names a person, animal, place or thing. Plural means more than one.',
    steps: [
      {
        title: 'Add s or es',
        text: 'Most nouns add s. Nouns ending in s, sh, ch, x or o often add es.',
        example: ['book → books', 'box → boxes', 'tomato → tomatoes'],
      },
      {
        title: 'y becomes ies',
        text: 'If a word ends in a consonant and y, change the y to i and add es.',
        example: ['lady → ladies', 'baby → babies', 'but: boy → boys'],
      },
      {
        title: 'Special plurals',
        text: 'Some words change inside, or do not change at all. These must be learnt by heart.',
        example: ['child → children', 'man → men', 'mouse → mice', 'tooth → teeth', 'sheep → sheep'],
      },
    ],
    remember: 'Most add s or es; consonant + y becomes ies; child, man, mouse and tooth have special plurals.',
  },
  'te-pron': {
    intro: 'Pronouns stand in for names, so we do not repeat them. Question words help us ask.',
    steps: [
      {
        title: 'Words that show who owns',
        text: 'Mine, yours, his, hers, ours and theirs tell who something belongs to.',
        example: ['This pen belongs to me. It is _mine_.', 'The bag belongs to Akinyi. It is _hers_.', 'The ball belongs to us. It is _ours_.'],
      },
      {
        title: 'Question words',
        text: 'Who asks about a person. What asks about a thing. Whose asks who owns it. Where asks about a place.',
        example: ['_Who_ is your teacher?', '_Whose_ book is this?', '_What_ is in the box?'],
      },
    ],
    remember: 'Mine, yours, his, hers, ours, theirs show owning. Who = person, what = thing, whose = owner.',
  },
  'te-verbs': {
    intro: 'Verbs are doing words. Their form tells us when something happens.',
    steps: [
      {
        title: 'Do and does',
        text: 'Use does with he, she, it or one name. Use do with I, you, we and they.',
        example: ['She _does_ her homework.', 'They _do_ their homework.'],
      },
      {
        title: 'Did and done',
        text: 'Did is for the past on its own. Done needs a helper like has or have.',
        example: ['Yesterday I _did_ my work.', 'I _have done_ my work.'],
      },
      {
        title: 'Yesterday and now',
        text: 'Words like yesterday and last week tell us to use the past form.',
        example: ['Today I walk. Yesterday I walked.', 'Today I eat. Yesterday I ate.', 'Today I go. Yesterday I went.'],
      },
    ],
    remember: 'He, she, it → does. Did stands alone; done needs has or have. Yesterday → past form.',
  },
  'te-adj': {
    intro: 'Describing words tell us more about nouns, and joining words link ideas together.',
    steps: [
      {
        title: 'Describing words',
        text: 'Adjectives tell us what something is like: its size, colour, taste or feel.',
        example: ['a _red_ ball', 'a _sweet_ mango', 'a _soft_ pillow'],
      },
      {
        title: 'Bigger and biggest',
        text: 'Add er to compare two things. Add est when comparing three or more. Short words with one vowel double the last letter.',
        example: ['tall → taller → tallest', 'big → bigger → biggest', 'hot → hotter → hottest'],
      },
      {
        title: 'And, but, because',
        text: 'And adds more. But shows something different. Because gives the reason.',
        example: ['I have a pen _and_ a ruler.', 'I ran fast _but_ I did not win.', 'I wore a sweater _because_ it was cold.'],
      },
    ],
    remember: 'Two things: er. Three or more: est. And adds, but turns, because gives the reason.',
  },
  'te-prep': {
    intro: 'Prepositions are small words that tell us where something is.',
    steps: [
      {
        title: 'In, on and under',
        text: 'In means inside. On means on top of and touching. Under means below.',
        visual: { kind: 'position', art: 'ball', where: 'under' },
        example: ['The ball is _under_ the table.'],
      },
      {
        title: 'Between and behind',
        text: 'Between means in the middle of two things. Behind means at the back.',
        example: ['Juma sits _between_ Ali and Wanjiru.', 'The goat is _behind_ the house.'],
      },
      {
        title: 'Of',
        text: 'Of joins words to show what something is made of or what it belongs to.',
        example: ['a cup _of_ tea', 'the colour _of_ the sky'],
      },
    ],
    remember: 'In = inside, on = on top, under = below, between = in the middle of two, behind = at the back.',
  },
  'te-abc': {
    intro: 'Alphabetical order is the order of the letters a to z. Dictionaries use it.',
    steps: [
      {
        title: 'Look at the first letter',
        text: 'Put the words in the order their first letters come in the alphabet.',
        example: ['cat, goat, lion, zebra', 'c comes before g, g before l, l before z'],
      },
      {
        title: 'Same first letter? Look at the second',
        text: 'If two words start with the same letter, look at the second letter to decide.',
        example: ['banana, bean, bread', 'a, e, r: banana comes first'],
      },
    ],
    remember: 'Compare the first letters. If they match, compare the second letters.',
  },
  'te-mech': {
    intro: 'Capital letters and full stops help readers know where sentences start and end.',
    steps: [
      {
        title: 'Capital letters',
        text: 'Use a capital letter to start a sentence, for names of people and places, for days and months, and for the word I.',
        example: ['On Monday Otieno and I went to Kisumu.'],
      },
      {
        title: 'Ending a sentence',
        text: 'A telling sentence ends with a full stop. A question ends with a question mark.',
        example: ['I like mangoes.', 'Do you like mangoes?'],
      },
      {
        title: 'Check your spelling',
        text: 'Say the word slowly, sound by sound, and check each letter.',
        example: ['b - r - e - a - d → bread'],
      },
    ],
    remember: 'Capital letter at the start and for names; full stop or question mark at the end.',
  },
  'te-build': {
    intro: 'A sentence is a group of words that makes complete sense.',
    steps: [
      {
        title: 'Who, then what they do',
        text: 'Most sentences start with who or what the sentence is about, then say what they do.',
        example: ['The goat (who) is eating grass (what it does).'],
      },
      {
        title: 'Words in order',
        text: 'Find the word with a capital letter: it goes first. Find the word with a full stop: it goes last. Then fill in the middle so it makes sense.',
        example: ['playing / The / are / football. / children', 'The children are playing football.'],
      },
      {
        title: 'Joining two sentences',
        text: 'Use and, but, so or because to join two short sentences into one.',
        example: ['Juma was hungry. He ate ugali.', 'Juma was hungry _so_ he ate ugali.'],
      },
    ],
    remember: 'Capital-letter word first, full-stop word last, and the middle must make sense.',
  },
}
