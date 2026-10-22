// Grade 2 learning areas, strands and sub-strands (rationalised KICD designs, 2024).
// Environmental Activities follows the published design exactly. The other areas follow
// the lower-primary pattern seen in Grade 2 schemes of work and end-term papers; see
// research/grade2-strands.md for sources and what still needs checking. All questions are
// original.
import type { LearningArea } from './types'

export const GRADE2: LearningArea[] = [
  {
    id: 'g2-math',
    kind: 'math',
    title: 'Mathematical Activities',
    world: 'Maasai Mara',
    tagline: 'Tens and ones, shillings and the clock',
    strands: [
      {
        id: 'g2-math-numbers',
        code: '1.0',
        title: 'Numbers',
        subStrands: [
          { id: 's-concept', code: '1.1', title: 'Number Concept', blurb: 'Sort, match, compare and put things in order' },
          { id: 's-whole', code: '1.2', title: 'Whole Numbers', blurb: 'Tens and ones, number names and patterns to 100' },
          { id: 's-add', code: '1.3', title: 'Addition', blurb: 'Adding within 100, with and without carrying' },
          { id: 's-sub', code: '1.4', title: 'Subtraction', blurb: 'Taking away within 100' },
          { id: 's-mul', code: '1.5', title: 'Multiplication', blurb: 'Equal groups of 2, 5 and 10' },
          { id: 's-div', code: '1.6', title: 'Division', blurb: 'Sharing equally' },
          { id: 's-frac', code: '1.7', title: 'Fractions', blurb: 'Halves and quarters' },
        ],
      },
      {
        id: 'g2-math-measurement',
        code: '2.0',
        title: 'Measurement',
        subStrands: [
          { id: 's-length', code: '2.1', title: 'Length', blurb: 'Longer, shorter and metres' },
          { id: 's-mass', code: '2.2', title: 'Mass', blurb: 'Heavier, lighter and kilograms' },
          { id: 's-capacity', code: '2.3', title: 'Capacity', blurb: 'Holds more, holds less and litres' },
          { id: 's-time', code: '2.4', title: 'Time', blurb: "O'clock, half past, days and months" },
          { id: 's-money', code: '2.5', title: 'Money', blurb: 'Kenyan coins and notes to 100 shillings' },
        ],
      },
      {
        id: 'g2-math-geometry',
        code: '3.0',
        title: 'Geometry',
        subStrands: [
          { id: 's-position', code: '3.1', title: 'Position', blurb: 'Left, right, before, after and between' },
          { id: 's-shapes', code: '3.2', title: 'Lines and Shapes', blurb: 'Straight and curved lines, shapes and patterns' },
        ],
      },
    ],
  },
  {
    id: 'g2-english',
    kind: 'english',
    title: 'English Language Activities',
    world: 'Mount Kenya Forest',
    tagline: 'Sounds, words and stories under the cedars',
    strands: [
      {
        id: 'g2-eng-listening',
        code: '1.0',
        title: 'Listening and Speaking',
        subStrands: [{ id: 'se-listen', code: '1.1', title: 'Polite Talk', blurb: 'Greetings, thanks, sorry and simple answers' }],
      },
      {
        id: 'g2-eng-reading',
        code: '2.0',
        title: 'Reading',
        subStrands: [
          { id: 'se-phonics', code: '2.1', title: 'Sounds and Blends', blurb: 'sh, ch, th, ee, oo and blending sounds' },
          { id: 'se-comp', code: '2.2', title: 'Reading a Story', blurb: 'Read short stories and answer questions' },
          { id: 'se-vocab', code: '2.3', title: 'Word Meanings', blurb: 'Opposites and words for things around us' },
        ],
      },
      {
        id: 'g2-eng-language',
        code: '3.0',
        title: 'Language Use',
        subStrands: [
          { id: 'se-nouns', code: '3.1', title: 'Naming Words', blurb: 'One and many: cat, cats; box, boxes' },
          { id: 'se-pron', code: '3.2', title: 'I, You, He, She', blurb: 'Words that stand for names; this and these' },
          { id: 'se-verbs', code: '3.3', title: 'Action Words', blurb: 'is running, are playing; walked, jumped' },
          { id: 'se-prep', code: '3.4', title: 'In, On, Under', blurb: 'Where things are' },
          { id: 'se-adj', code: '3.5', title: 'Describing Words', blurb: 'Colours, sizes and how things feel' },
        ],
      },
      {
        id: 'g2-eng-writing',
        code: '4.0',
        title: 'Writing',
        subStrands: [
          { id: 'se-mech', code: '4.1', title: 'Capital Letters and Full Stops', blurb: 'Start right, end right' },
          { id: 'se-spell', code: '4.2', title: 'Spelling', blurb: 'Build words letter by letter' },
        ],
      },
    ],
  },
  {
    id: 'g2-environmental',
    kind: 'environmental',
    title: 'Environmental Activities',
    world: 'Rift Valley Farms',
    tagline: 'Home, school, the flag, the market and the land',
    strands: [
      {
        id: 'g2-env-social',
        code: '1.0',
        title: 'Social Environment',
        subStrands: [
          { id: 'sv-home', code: '1.1', title: 'Our Home', blurb: 'Rooms, personal and shared items, keeping clean' },
          { id: 'sv-needs', code: '1.2', title: 'Family Needs and Wants', blurb: 'What we need and what we would like' },
          { id: 'sv-school', code: '1.3', title: 'Our School', blurb: 'People, places, a clean school and accidents' },
          { id: 'sv-flag', code: '1.4', title: 'Our National Flag', blurb: 'Its colours, their meaning and respect' },
          { id: 'sv-rights', code: '1.5', title: 'Rights and Responsibilities', blurb: 'What every child should have and do' },
          { id: 'sv-market', code: '1.6', title: 'Our Market', blurb: 'Buying, selling and things sold' },
        ],
      },
      {
        id: 'g2-env-natural',
        code: '2.0',
        title: 'Natural Environment',
        subStrands: [
          { id: 'sv-weather', code: '2.1', title: 'Weather', blurb: 'Sunny, rainy, windy, cloudy' },
          { id: 'sv-soil', code: '2.2', title: 'Soil', blurb: 'Kinds of soil and what we make with them' },
          { id: 'sv-light', code: '2.3', title: 'Light', blurb: 'Sources of light and caring for our eyes' },
        ],
      },
      {
        id: 'g2-env-resources',
        code: '3.0',
        title: 'Resources in Our Environment',
        subStrands: [
          { id: 'sv-water', code: '3.1', title: 'Water', blurb: 'Where water comes from and using it well' },
          { id: 'sv-plants', code: '3.2', title: 'Plants', blurb: 'Parts of plants and caring for them' },
          { id: 'sv-animals', code: '3.3', title: 'Animals', blurb: 'Domestic and wild animals and their young' },
        ],
      },
    ],
  },
  {
    id: 'g2-kiswahili',
    kind: 'kiswahili',
    title: 'Shughuli za Kiswahili',
    world: 'Fukwe za Malindi',
    tagline: 'Silabi, maneno na hadithi ufukweni',
    strands: [
      {
        id: 'g2-ksw-kusikiliza',
        code: '1.0',
        title: 'Kusikiliza na Kuzungumza',
        subStrands: [
          { id: 'sk-salamu', code: '1.1', title: 'Salamu', blurb: 'Kusalimia, kuaga na kushukuru' },
          { id: 'sk-msamiati', code: '1.2', title: 'Msamiati', blurb: 'Familia, mwili, wanyama, rangi na nambari' },
        ],
      },
      {
        id: 'g2-ksw-kusoma',
        code: '2.0',
        title: 'Kusoma',
        subStrands: [
          { id: 'sk-silabi', code: '2.1', title: 'Silabi', blurb: 'Soma silabi na uunde maneno' },
          { id: 'sk-ufahamu', code: '2.2', title: 'Kusoma kwa Ufahamu', blurb: 'Soma hadithi fupi ujibu maswali' },
        ],
      },
      {
        id: 'g2-ksw-kuandika',
        code: '3.0',
        title: 'Kuandika',
        subStrands: [{ id: 'sk-tahajia', code: '3.1', title: 'Tahajia', blurb: 'Andika maneno kwa usahihi' }],
      },
      {
        id: 'g2-ksw-sarufi',
        code: '4.0',
        title: 'Sarufi',
        subStrands: [
          { id: 'sk-umoja', code: '4.1', title: 'Umoja na Wingi', blurb: 'Kiti na viti, mtoto na watoto' },
          { id: 'sk-viulizi', code: '4.2', title: 'Maswali', blurb: 'Nani, nini, wapi, lini, ngapi' },
          { id: 'sk-kinyume', code: '4.3', title: 'Kinyume', blurb: 'Maneno yenye maana tofauti' },
        ],
      },
    ],
  },
  {
    id: 'g2-creative',
    kind: 'creative',
    title: 'Creative Activities',
    world: 'Lake Bogoria',
    tagline: 'Pictures, songs, games and movement',
    strands: [
      {
        id: 'g2-art-creating',
        code: '1.0',
        title: 'Creating and Exploration',
        subStrands: [
          { id: 'sc-picture', code: '1.1', title: 'Picture Making', blurb: 'Drawing, colouring and printing' },
          { id: 'sc-rhythm', code: '1.2', title: 'Rhythm', blurb: 'Clapping and keeping the beat' },
          { id: 'sc-melody', code: '1.3', title: 'Melody', blurb: 'Singing high and low' },
        ],
      },
      {
        id: 'g2-art-performing',
        code: '2.0',
        title: 'Performing and Display',
        subStrands: [
          { id: 'sc-games', code: '2.1', title: 'Singing Games', blurb: 'African-style singing games' },
          { id: 'sc-movement', code: '2.2', title: 'Movement', blurb: 'Walking, running, jumping and turning' },
          { id: 'sc-ball', code: '2.3', title: 'Ball Skills', blurb: 'Throwing, catching and kicking' },
          { id: 'sc-water', code: '2.4', title: 'Water Safety', blurb: 'Staying safe near water' },
        ],
      },
      {
        id: 'g2-art-appreciation',
        code: '3.0',
        title: 'Appreciation',
        subStrands: [{ id: 'sc-songs', code: '3.1', title: 'Patriotic Songs', blurb: 'Songs about Kenya and the National Anthem' }],
      },
    ],
  },
  {
    id: 'g2-cre',
    kind: 'cre',
    title: 'Christian Religious Education',
    world: 'Valley of Light',
    tagline: 'Who I am, my family and Bible stories',
    strands: [
      {
        id: 'g2-cre-creation',
        code: '1.0',
        title: 'Creation',
        subStrands: [
          { id: 'sr-self', code: '1.1', title: 'Self-Awareness', blurb: 'God made me special' },
          { id: 'sr-family', code: '1.2', title: 'My Family', blurb: 'Family members and loving each other' },
          { id: 'sr-creation', code: '1.3', title: 'The Sky, Sun, Moon and Stars', blurb: 'What God made in the sky' },
        ],
      },
      {
        id: 'g2-cre-bible',
        code: '2.0',
        title: 'The Holy Bible',
        subStrands: [
          { id: 'sr-bible', code: '2.1', title: 'The Bible as a Guide', blurb: 'Caring for the Bible and Bible stories' },
          { id: 'sr-jesus', code: '2.2', title: 'Jesus as a Child', blurb: 'His birth and growing up' },
        ],
      },
      {
        id: 'g2-cre-living',
        code: '3.0',
        title: 'Christian Living',
        subStrands: [{ id: 'sr-living', code: '3.1', title: 'Living Well', blurb: 'Prayer, kindness and obedience' }],
      },
    ],
  },
]
