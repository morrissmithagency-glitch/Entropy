// Grade 1 Mathematics and English lessons: very short sentences, a picture on most pages.
import type { Lesson } from './types'

export const MATH1_LESSONS: Record<string, Lesson> = {
  'm-concept': {
    intro: 'We sort things into groups and see which group has more.',
    steps: [
      { title: 'Sorting', text: 'Things that are the same go together in one group.', visual: { kind: 'groups', groups: [{ art: 'mango', n: 3 }, { art: 'ball', n: 2 }], joiner: 'vs' } },
      { title: 'More and fewer', text: 'Count each group. The bigger number has more.', visual: { kind: 'groups', groups: [{ art: 'hen', n: 4 }, { art: 'goat', n: 2 }], joiner: 'vs' }, example: ['4 hens, 2 goats', 'There are more hens.'] },
    ],
    remember: 'Count each group. The bigger number has more.',
  },
  'm-whole': {
    intro: 'We count, read and write numbers.',
    steps: [
      { title: 'Counting', text: 'Touch each thing once and say the next number.', visual: { kind: 'count', art: 'orange', n: 6 }, example: ['1, 2, 3, 4, 5, 6'] },
      { title: 'Tens and ones', text: 'Ten sticks make one bundle. Count bundles, then single sticks.', visual: { kind: 'tens', tens: 2, ones: 3 }, example: ['2 tens and 3 ones = 23'] },
      { title: 'What comes next?', text: 'Counting goes up by one each time.', visual: { kind: 'sequence', items: [5, 6, 7, null, 9] }, example: ['8 is missing'] },
    ],
    remember: 'Touch and count each thing once.',
  },
  'm-add': {
    intro: 'Adding means putting things together.',
    steps: [
      { title: 'Put together', text: 'Count all of them together.', visual: { kind: 'groups', groups: [{ art: 'egg', n: 3 }, { art: 'egg', n: 2 }], joiner: '+' }, example: ['3 + 2 = 5'] },
      { title: 'Count on', text: 'Start at the bigger number and count on.', example: ['6 + 3: 6… 7, 8, 9', '6 + 3 = 9'] },
    ],
    remember: 'Start with the bigger number and count on.',
  },
  'm-sub': {
    intro: 'Subtracting means taking away.',
    steps: [
      { title: 'Take away', text: 'Start with all of them. Take some away. Count what is left.', visual: { kind: 'count', art: 'mango', n: 5 }, example: ['5 mangoes, eat 2', '5 − 2 = 3'] },
      { title: 'Count back', text: 'Start at the big number and count back.', example: ['8 − 3: 8… 7, 6, 5', '8 − 3 = 5'] },
    ],
    remember: 'Take away, then count what is left.',
  },
  'm-length': {
    intro: 'Some things are long and some are short.',
    steps: [
      { title: 'Long and short', text: 'Put the ends together. The one that sticks out is longer.', visual: { kind: 'sizes', art: 'pencil', scales: [0.6, 1, 0.8], axis: 'x', labels: ['A', 'B', 'C'] }, example: ['B is the longest'] },
      { title: 'Measuring', text: 'We can measure with clips, hands or steps.', visual: { kind: 'units', art: 'stick', unit: 'clip', n: 5 }, example: ['The stick is 5 clips long'] },
    ],
    remember: 'Line up the ends, then compare.',
  },
  'm-mass': {
    intro: 'Some things are heavy and some are light.',
    steps: [
      { title: 'Heavy and light', text: 'A pumpkin is heavy. A feather is light.', visual: { kind: 'balance', left: 'pumpkin', right: 'feather', heavier: 'left' } },
      { title: 'The balance', text: 'The heavier side of the balance goes down.' },
    ],
    remember: 'The heavier side goes down.',
  },
  'm-capacity': {
    intro: 'Some containers hold more water than others.',
    steps: [
      { title: 'Full and empty', text: 'A full cup has no space left. An empty cup has nothing inside.' },
      { title: 'Holds more', text: 'Count how many cups fill the jug.', visual: { kind: 'units', art: 'jug', unit: 'cup', n: 4 }, example: ['4 cups fill the jug'] },
    ],
    remember: 'A bigger container holds more.',
  },
  'm-time': {
    intro: 'We do different things at different times of the day.',
    steps: [
      { title: 'Morning and night', text: 'We wake up and go to school in the morning. We sleep at night.', visual: { kind: 'art', art: ['sun', 'moon'] } },
      { title: 'Days of the week', text: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.' },
      { title: "O'clock", text: "When the long hand points to 12, it is o'clock.", visual: { kind: 'clock', hour: 7, minute: 0 }, example: ["7 o'clock"] },
    ],
    remember: '7 days in a week. Long hand on 12 means o\'clock.',
  },
  'm-money': {
    intro: 'We use shillings to buy things.',
    steps: [
      { title: 'Coins', text: 'We have 1, 5, 10 and 20 shilling coins.', visual: { kind: 'money', values: [1, 5, 10, 20] } },
      { title: 'Adding coins', text: 'Add the numbers on the coins.', visual: { kind: 'money', values: [10, 5] }, example: ['10 + 5 = 15 shillings'] },
    ],
    remember: 'Read the number on each coin, then add.',
  },
  'm-lines': {
    intro: 'Lines can be straight or curved.',
    steps: [
      { title: 'Straight lines', text: 'A straight line does not bend, like the edge of a ruler.', visual: { kind: 'lines', lines: ['straight', 'straight'] } },
      { title: 'Curved lines', text: 'A curved line bends, like a smile.', visual: { kind: 'lines', lines: ['curved', 'curved'] } },
    ],
    remember: 'Straight lines do not bend. Curved lines bend.',
  },
  'm-shapes': {
    intro: 'Shapes are all around us.',
    steps: [
      { title: 'Four shapes', text: 'A circle is round. A triangle has 3 sides. A square and a rectangle have 4 sides.', visual: { kind: 'shapes', shapes: [{ kind: 'circle' }, { kind: 'triangle' }, { kind: 'square' }, { kind: 'rectangle' }] } },
      { title: 'Shapes around us', text: 'A coin is a circle. A door is a rectangle. A samosa is a triangle.' },
      { title: 'Patterns', text: 'Say the shapes. What comes next?', visual: { kind: 'pattern', items: [{ kind: 'circle' }, { kind: 'triangle' }, { kind: 'circle' }, { kind: 'triangle' }, null] } },
    ],
    remember: 'Circle: round. Triangle: 3 sides. Square and rectangle: 4 sides.',
  },
}

export const ENGLISH1_LESSONS: Record<string, Lesson> = {
  'e-sounds': {
    intro: 'Every letter makes a sound.',
    steps: [
      { title: 'Letter sounds', text: 'a is for apple. b is for ball. c is for cat.', visual: { kind: 'art', art: ['ball', 'cup', 'drum'] } },
      { title: 'Listen carefully', text: 'Say the word slowly. What sound do you hear first?', example: ['ball: b…', 'mango: m…'] },
    ],
    remember: 'Say the word slowly and listen for the first sound.',
  },
  'e-words': {
    intro: 'Listen to a word, then find its picture.',
    steps: [
      { title: 'Listen', text: 'Press the speaker. Listen to the word.' },
      { title: 'Look', text: 'Look at all the pictures. Choose the one that matches the word.', visual: { kind: 'art', art: ['goat', 'cow', 'hen'] } },
    ],
    remember: 'Listen first, then look at every picture.',
  },
  'e-polite': {
    intro: 'Kind words make people happy.',
    steps: [
      { title: 'Magic words', text: 'Say please when you ask. Say thank you when you get something. Say sorry when you hurt someone.' },
      { title: 'Greetings', text: 'Good morning, good afternoon, good evening and good night.' },
    ],
    remember: 'Please, thank you and sorry.',
  },
  'e-letters': {
    intro: 'Letters join together to make words.',
    steps: [
      { title: 'The alphabet', text: 'a b c d e f g h i j k l m n o p q r s t u v w x y z' },
      { title: 'Rhyming words', text: 'Rhyming words sound the same at the end.', example: ['cat, hat, mat', 'pen, hen, ten'] },
    ],
    remember: 'Words that rhyme end with the same sound.',
  },
  'e-sight': {
    intro: 'Some words we see so often that we can read them in a blink.',
    steps: [
      { title: 'Little words', text: 'the, is, a, I, and, we, my, see, can, go', example: ['I can see a cat.'] },
      { title: 'Read them fast', text: 'Practise these words every day until you know them by heart.' },
    ],
    remember: 'Little words like "the", "is" and "can" are everywhere. Learn them by heart.',
  },
  'e-comprehension': {
    intro: 'We read a little story and answer questions.',
    steps: [
      { title: 'Read slowly', text: 'Point to each word as you read.', visual: { kind: 'passage', title: 'My Cat', text: 'I have a cat. It is black.' } },
      { title: 'Find the answer', text: 'Look for the same words as the question.', example: ['What colour is the cat? → black'] },
    ],
    remember: 'Find the question words in the story.',
  },
  'e-naming': {
    intro: 'Naming words name things. Action words tell what someone does.',
    steps: [
      { title: 'Naming words', text: 'dog, Mama, ball, tree are naming words.', visual: { kind: 'art', art: ['dog', 'ball', 'tree'] } },
      { title: 'Action words', text: 'run, eat, jump, sing are action words.', example: ['The dog _runs_.'] },
    ],
    remember: 'Naming words name; action words do.',
  },
  'e-grammar': {
    intro: 'Small words help us talk about one thing or many.',
    steps: [
      { title: 'a and an', text: 'Use an before a, e, i, o, u sounds. Use a before the others.', example: ['an egg, an orange', 'a ball, a cup'] },
      { title: 'One and many', text: 'Add s for more than one.', example: ['one cat, two cats'] },
      { title: 'This and these', text: 'This is for one. These is for many.', example: ['This cup. These cups.'] },
    ],
    remember: 'an egg, a ball; one cat, two cats.',
  },
  'e-position': {
    intro: 'Little words tell us where things are.',
    steps: [
      { title: 'In and on', text: 'In means inside. On means on top.', visual: { kind: 'position', art: 'ball', where: 'in' } },
      { title: 'Under', text: 'Under means below.', visual: { kind: 'position', art: 'cat', where: 'under' } },
    ],
    remember: 'In = inside. On = on top. Under = below.',
  },
  'e-spelling': {
    intro: 'We spell a word by saying each sound and writing its letter.',
    steps: [
      { title: 'Sound it out', text: 'Say the word slowly: c - a - t.', visual: { kind: 'art', art: ['cat'] } },
      { title: 'Write it', text: 'Write one letter for each sound: cat.' },
    ],
    remember: 'Say each sound, write each letter.',
  },
  'e-sentences': {
    intro: 'A sentence is a group of words that makes sense.',
    steps: [
      { title: 'Start and end', text: 'A sentence starts with a capital letter and ends with a full stop.', example: ['I see a cat.'] },
      { title: 'Word order', text: 'Put the words in an order that makes sense.', example: ['cat / I / a / see. → I see a cat.'] },
    ],
    remember: 'Capital letter first, full stop at the end.',
  },
}
