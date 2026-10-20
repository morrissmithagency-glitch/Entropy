// Grade 1 learning areas, strands and sub-strands, following the rationalised KICD
// designs (revised 2024). See research/grade1-strands.md for sources and confidence.

export type AreaId = 'math' | 'english' | 'environmental' | 'kiswahili'

export interface SubStrand {
  id: string
  code: string
  title: string
  /** One line a child (or parent) can read. */
  blurb: string
}

export interface Strand {
  id: string
  code: string
  title: string
  subStrands: SubStrand[]
}

export interface LearningArea {
  id: AreaId
  title: string
  /** Name of this area's "world" on the adventure map. */
  world: string
  tagline: string
  strands: Strand[]
}

export const LEVEL_NAMES = ['Seed', 'Sprout', 'Sapling', 'Acacia', 'Baobab'] as const

export const GRADE1: LearningArea[] = [
  {
    id: 'math',
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
]

export function findArea(id: AreaId): LearningArea {
  const area = GRADE1.find((a) => a.id === id)
  if (!area) throw new Error(`Unknown area ${id}`)
  return area
}

export function findSubStrand(id: string): { area: LearningArea; strand: Strand; sub: SubStrand } {
  for (const area of GRADE1)
    for (const strand of area.strands)
      for (const sub of strand.subStrands) if (sub.id === id) return { area, strand, sub }
  throw new Error(`Unknown sub-strand ${id}`)
}

export function findStrand(id: string): { area: LearningArea; strand: Strand } {
  for (const area of GRADE1) for (const strand of area.strands) if (strand.id === id) return { area, strand }
  throw new Error(`Unknown strand ${id}`)
}
