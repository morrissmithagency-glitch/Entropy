// Grade 1 learning areas, strands and sub-strands, following the rationalised KICD
// designs (revised 2024). See research/grade1-strands.md for sources and confidence.

import type { LearningArea } from './types'

export const GRADE1: LearningArea[] = [
  {
    id: 'math',
    kind: 'math',
    title: 'Mathematical Activities',
    world: 'Number Savanna',
    tagline: 'Count, add and measure your way across the plains',
    strands: [
      {
        id: 'math-numbers',
        code: '1.0',
        title: 'Numbers',
        subStrands: [
          { id: 'm-concept', code: '1.1', title: 'Number Concept', blurb: 'Sort, match, pair and order things' },
          { id: 'm-whole', code: '1.2', title: 'Whole Numbers', blurb: 'Count, read and write numbers up to 100' },
          { id: 'm-add', code: '1.3', title: 'Addition', blurb: 'Put numbers together' },
          { id: 'm-sub', code: '1.4', title: 'Subtraction', blurb: 'Take away and find what is left' },
        ],
      },
      {
        id: 'math-measurement',
        code: '2.0',
        title: 'Measurement',
        subStrands: [
          { id: 'm-length', code: '2.1', title: 'Length', blurb: 'Long, short, tall and how many steps' },
          { id: 'm-mass', code: '2.2', title: 'Mass', blurb: 'Heavy and light' },
          { id: 'm-capacity', code: '2.3', title: 'Capacity', blurb: 'Which holds more?' },
          { id: 'm-time', code: '2.4', title: 'Time', blurb: 'Days, mornings and the clock' },
          { id: 'm-money', code: '2.5', title: 'Money', blurb: 'Kenyan coins, notes and balance' },
        ],
      },
      {
        id: 'math-geometry',
        code: '3.0',
        title: 'Geometry',
        subStrands: [
          { id: 'm-lines', code: '3.1', title: 'Lines', blurb: 'Straight and curved lines' },
          { id: 'm-shapes', code: '3.2', title: 'Shapes', blurb: 'Circles, triangles, rectangles and patterns' },
        ],
      },
    ],
  },
  {
    id: 'english',
    kind: 'english',
    title: 'English Language Activities',
    world: 'Story Forest',
    tagline: 'Listen, read and write with the forest friends',
    strands: [
      {
        id: 'eng-listening',
        code: '1.0',
        title: 'Listening and Speaking',
        subStrands: [
          { id: 'e-sounds', code: '1.1', title: 'Letter Sounds', blurb: 'Hear a sound, find the letter' },
          { id: 'e-words', code: '1.2', title: 'Listen and Choose', blurb: 'Hear a word, find the picture' },
          { id: 'e-polite', code: '1.3', title: 'Polite Words', blurb: 'Greetings, please and thank you' },
        ],
      },
      {
        id: 'eng-reading',
        code: '2.0',
        title: 'Reading',
        subStrands: [
          { id: 'e-letters', code: '2.1', title: 'Letters and Phonics', blurb: 'First sounds and rhymes' },
          { id: 'e-sight', code: '2.2', title: 'Sight Words', blurb: 'Words we read in a blink' },
          { id: 'e-comprehension', code: '2.3', title: 'Read and Answer', blurb: 'Short stories with questions' },
        ],
      },
      {
        id: 'eng-language',
        code: '3.0',
        title: 'Language Use',
        subStrands: [
          { id: 'e-naming', code: '3.1', title: 'Naming and Action Words', blurb: 'Nouns and verbs' },
          { id: 'e-grammar', code: '3.2', title: 'A, An, One and Many', blurb: 'a/an, plurals, this/that' },
          { id: 'e-position', code: '3.3', title: 'In, On, Under', blurb: 'Where is it?' },
        ],
      },
      {
        id: 'eng-writing',
        code: '4.0',
        title: 'Writing',
        subStrands: [
          { id: 'e-spelling', code: '4.1', title: 'Spelling', blurb: 'Missing letters and building words' },
          { id: 'e-sentences', code: '4.2', title: 'Sentences', blurb: 'Capital letters, full stops, word order' },
        ],
      },
    ],
  },
  {
    id: 'environmental',
    kind: 'environmental',
    title: 'Environmental Activities',
    world: 'Village & Wild',
    tagline: 'Explore home, school, the sky and the shamba',
    strands: [
      {
        id: 'env-social',
        code: '1.0',
        title: 'Social Environment',
        subStrands: [
          { id: 'v-body', code: '1.1', title: 'Cleaning My Body', blurb: 'Washing, brushing and staying healthy' },
          { id: 'v-home', code: '1.2', title: 'Our Home', blurb: 'Rooms, things and people at home' },
          { id: 'v-needs', code: '1.3', title: 'Family Needs', blurb: 'Food, clothes and shelter' },
          { id: 'v-school', code: '1.4', title: 'Our School', blurb: 'People and places at school' },
          { id: 'v-market', code: '1.5', title: 'Our Market', blurb: 'Buying and selling' },
        ],
      },
      {
        id: 'env-natural',
        code: '2.0',
        title: 'Natural Environment',
        subStrands: [
          { id: 'v-weather', code: '2.1', title: 'Weather and the Sky', blurb: 'Sunny, rainy, windy and the night sky' },
          { id: 'v-soil', code: '2.2', title: 'Soil', blurb: 'Types of soil and their uses' },
          { id: 'v-sound', code: '2.3', title: 'Sound', blurb: 'Loud, soft and where sounds come from' },
        ],
      },
      {
        id: 'env-resources',
        code: '3.0',
        title: 'Resources in Our Environment',
        subStrands: [
          { id: 'v-water', code: '3.1', title: 'Water', blurb: 'Sources and uses of water' },
          { id: 'v-plants', code: '3.2', title: 'Plants', blurb: 'Parts and uses of plants' },
          { id: 'v-animals', code: '3.3', title: 'Animals', blurb: 'Domestic and wild animals' },
        ],
      },
    ],
  },
  {
    id: 'kiswahili',
    kind: 'kiswahili',
    title: 'Kiswahili Language Activities',
    world: 'Bustani ya Maneno',
    tagline: 'Sikiliza, soma na andika kwa Kiswahili',
    strands: [
      {
        id: 'ksw-kusikiliza',
        code: '1.0',
        title: 'Kusikiliza na Kuzungumza',
        subStrands: [
          { id: 'k-salamu', code: '1.1', title: 'Salamu na Adabu', blurb: 'Kusalimia na maneno ya adabu' },
          { id: 'k-msamiati', code: '1.2', title: 'Msamiati', blurb: 'Wanyama, rangi, mwili na nambari' },
        ],
      },
      {
        id: 'ksw-kusoma',
        code: '2.0',
        title: 'Kusoma',
        subStrands: [
          { id: 'k-silabi', code: '2.1', title: 'Herufi na Silabi', blurb: 'a, e, i, o, u na ma, me, mi…' },
          { id: 'k-ufahamu', code: '2.2', title: 'Kusoma na Kuelewa', blurb: 'Hadithi fupi na maswali' },
        ],
      },
      {
        id: 'ksw-kuandika',
        code: '3.0',
        title: 'Kuandika',
        subStrands: [{ id: 'k-kuandika', code: '3.1', title: 'Kuunda Maneno', blurb: 'Unganisha silabi uunde neno' }],
      },
    ],
  },
  {
    // Strands from the rationalised KICD Grade 1 Creative Activities design (2024).
    id: 'creative',
    kind: 'creative',
    title: 'Creative Activities',
    world: 'Sunbird Meadow',
    tagline: 'Sounds, pictures, songs and play',
    strands: [
      {
        id: 'art-creating',
        code: '1.0',
        title: 'Creating and Exploration',
        subStrands: [
          { id: 'c-sounds', code: '1.1', title: 'Musical Sounds', blurb: 'Loud, soft, high and low sounds' },
          { id: 'c-picture', code: '1.2', title: 'Picture Making', blurb: 'Drawing and colouring' },
          { id: 'c-rhythm', code: '1.3', title: 'Rhythm', blurb: 'Clapping and stamping patterns' },
        ],
      },
      {
        id: 'art-performing',
        code: '2.0',
        title: 'Performing and Display',
        subStrands: [
          { id: 'c-stretch', code: '2.1', title: 'Stretching', blurb: 'Reaching, bending and warming up' },
          { id: 'c-jump', code: '2.2', title: 'Jumping', blurb: 'Jumping, hopping and landing softly' },
          { id: 'c-games', code: '2.3', title: 'Singing Games', blurb: 'Songs we play together' },
          { id: 'c-catch', code: '2.4', title: 'Throwing and Catching', blurb: 'Bean bags and balls' },
          { id: 'c-rolls', code: '2.5', title: 'Rolls and Balances', blurb: 'Log rolls and standing still' },
          { id: 'c-water', code: '2.6', title: 'Water Safety', blurb: 'Staying safe near water' },
          { id: 'c-instruments', code: '2.7', title: 'Musical Instruments', blurb: 'Drums, shakers and bells' },
        ],
      },
    ],
  },
  {
    // CRE follows the Creation / Holy Bible / Christian Living pattern of Grades 2 and 3.
    id: 'cre',
    kind: 'cre',
    title: 'Christian Religious Education',
    world: 'Garden of Grace',
    tagline: 'God made me, my family and the world',
    strands: [
      {
        id: 'cre-creation',
        code: '1.0',
        title: 'Creation',
        subStrands: [
          { id: 'r-self', code: '1.1', title: 'God Made Me', blurb: 'My name, my body and my senses' },
          { id: 'r-family', code: '1.2', title: 'My Family', blurb: 'The people God gave me' },
          { id: 'r-creation', code: '1.3', title: 'God\'s Creation', blurb: 'Plants, animals, land and water' },
        ],
      },
      {
        id: 'cre-bible',
        code: '2.0',
        title: 'The Holy Bible',
        subStrands: [
          { id: 'r-bible', code: '2.1', title: 'The Bible', blurb: 'God\'s special book and its stories' },
          { id: 'r-jesus', code: '2.2', title: 'Baby Jesus', blurb: 'The birth of Jesus' },
        ],
      },
      {
        id: 'cre-living',
        code: '3.0',
        title: 'Christian Living',
        subStrands: [
          { id: 'r-living', code: '3.1', title: 'Being Good', blurb: 'Prayer, sharing and obeying' },
          { id: 'r-church', code: '3.2', title: 'The Church', blurb: 'Where we worship together' },
        ],
      },
    ],
  },
]
