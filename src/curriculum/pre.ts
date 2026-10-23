// Pre-primary (PP1 and PP2): the five activity areas of the KICD pre-primary design —
// Language, Mathematical, Environmental, Psychomotor and Creative, and Religious Education
// Activities. See research/pre-primary-strands.md for sources and confidence.
//
// Sub-strand ids are `p{year}{area}-{topic}` (p2m-count); `p{area}-{topic}` names the topic
// shared by both years, and each topic has one lesson.
import type { AreaKind, LearningArea, SubStrand } from './types'

type Sub = [topic: string, title: string, blurb: string]
type StrandSpec = [title: string, subs: Sub[]]
type Year = 1 | 2

const LETTER: Partial<Record<AreaKind, string>> = { math: 'm', english: 'e', environmental: 'v', creative: 'c', cre: 'r' }

function area(year: Year, kind: AreaKind, title: string, world: string, tagline: string, strands: StrandSpec[]): LearningArea {
  const l = LETTER[kind]!
  return {
    id: `pp${year}-${kind}`,
    kind,
    title,
    world,
    tagline,
    strands: strands.map(([stitle, subs], i) => ({
      id: `pp${year}-${kind}-${i + 1}`,
      code: `${i + 1}.0`,
      title: stitle,
      subStrands: subs.map(([topic, t, blurb], j): SubStrand => ({ id: `p${year}${l}-${topic}`, code: `${i + 1}.${j + 1}`, title: t, blurb })),
    })),
  }
}

const MATH: Record<Year, StrandSpec[]> = {
  1: [
    ['Classification', [
      ['sort', 'Sorting', 'Find the one that is different'],
      ['match', 'Matching and Pairing', 'Things that go together'],
    ]],
    ['Numbers', [
      ['count', 'Counting', 'Count things up to 10'],
      ['numerals', 'Number Recognition', 'Find the numbers 1 to 10'],
      ['compare', 'More and Fewer', 'Which group has more?'],
      ['add', 'One More', 'Add one and count again'],
    ]],
    ['Measurement', [
      ['size', 'Big and Small', 'Big, small, long, short and tall'],
      ['mass', 'Heavy and Light', 'Which one is heavier?'],
      ['capacity', 'Full and Empty', 'Which holds more water?'],
      ['time', 'Day and Night', 'What we do in the day and at night'],
    ]],
    ['Geometry', [
      ['shapes', 'Shapes', 'Circles, triangles and squares'],
      ['patterns', 'Patterns', 'What comes next?'],
    ]],
  ],
  2: [
    ['Classification', [
      ['sort', 'Sorting and Grouping', 'Groups of fruits, animals and things'],
      ['match', 'Matching and Pairing', 'Things that go together'],
    ]],
    ['Numbers', [
      ['count', 'Counting', 'Count things up to 15'],
      ['numerals', 'Number Recognition', 'Numbers before, after and between'],
      ['compare', 'More and Fewer', 'Bigger and smaller numbers'],
      ['add', 'Putting Together', 'Adding up to 10'],
      ['sub', 'Taking Away', 'How many are left?'],
    ]],
    ['Measurement', [
      ['size', 'Big and Small', 'Biggest, smallest, longest, tallest'],
      ['mass', 'Heavy and Light', 'Heavier, lighter and heaviest'],
      ['capacity', 'Capacity', 'Full, empty and holds more'],
      ['time', 'Time', 'Day, night and the days of the week'],
      ['money', 'Kenyan Coins', 'Know our coins and count shillings'],
    ]],
    ['Geometry', [
      ['shapes', 'Shapes', 'Circles, triangles, squares and rectangles'],
      ['patterns', 'Patterns', 'Shape and colour patterns'],
    ]],
  ],
}

const LANGUAGE: Record<Year, StrandSpec[]> = {
  1: [
    ['Listening and Speaking', [
      ['greet', 'Greetings and Polite Words', 'Good morning, please and thank you'],
      ['listen', 'Listen and Choose', 'Hear a word, find the picture'],
    ]],
    ['Reading Readiness', [
      ['sounds', 'First Sounds', 'What sound does it start with?'],
      ['letters', 'Letters', 'Find the letter'],
    ]],
    ['Writing Readiness', [['lines', 'Lines and Strokes', 'Straight and curved lines']]],
  ],
  2: [
    ['Listening and Speaking', [
      ['greet', 'Greetings and Polite Words', 'Speaking kindly'],
      ['listen', 'Listen and Choose', 'Hear a word, find the picture'],
    ]],
    ['Reading Readiness', [
      ['sounds', 'Letter Sounds', 'Sounds at the start of words'],
      ['letters', 'Big and Small Letters', 'A to Z, big and small'],
      ['words', 'My First Words', 'Read short words'],
    ]],
    ['Writing Readiness', [
      ['lines', 'Lines and Strokes', 'Straight and curved lines'],
      ['spell', 'Missing Letters', 'Finish the word'],
    ]],
  ],
}

const ENVIRONMENTAL: StrandSpec[] = [
  ['Social Environment', [
    ['myself', 'Myself', 'My body and what it can do'],
    ['family', 'My Family and Home', 'People and things at home'],
    ['school', 'My School', 'People and places at school'],
  ]],
  ['Natural Environment', [
    ['weather', 'Weather', 'Sunny, rainy and windy days'],
    ['animals', 'Animals', 'Animals at home and in the wild'],
    ['plants', 'Plants', 'Trees, flowers and the food we grow'],
  ]],
  ['Health Practices', [
    ['hygiene', 'Keeping Clean', 'Washing, brushing and combing'],
    ['food', 'Healthy Food', 'Fruits, vegetables and good snacks'],
    ['safety', 'Staying Safe', 'Safe play and crossing the road'],
  ]],
  ['Caring for Our Surroundings', [['care', 'Caring for Our Surroundings', 'Litter in the bin, close the tap']]],
]

const CREATIVE: StrandSpec[] = [
  ['Creative Activities', [
    ['colours', 'Colours', 'Red, blue, yellow and more'],
    ['picture', 'Picture Making', 'Drawing and colouring'],
    ['music', 'Music and Instruments', 'Drums, shakers and songs'],
  ]],
  ['Psychomotor Activities', [
    ['movement', 'Moving My Body', 'Jump, hop and land softly'],
    ['games', 'Play and Games', 'Singing games we play together'],
  ]],
]

const RELIGIOUS: StrandSpec[] = [
  ['Creation', [['creation', 'God\'s Creation', 'God made the world and me']]],
  ['The Bible', [
    ['bible', 'The Bible', 'God\'s special book'],
    ['jesus', 'Baby Jesus', 'The story of Christmas'],
  ]],
  ['Christian Living', [
    ['prayer', 'Prayer', 'Talking to God'],
    ['values', 'Being Kind', 'Sharing, helping and obeying'],
  ]],
]

const WORLDS: Record<Year, Record<string, [string, string]>> = {
  1: {
    math: ['Counting Meadow', 'Count, sort and match with friends'],
    english: ['Story Hut', 'Sounds, letters and kind words'],
    environmental: ['Little Shamba', 'Me, my home and the world outside'],
    creative: ['Rainbow Garden', 'Colours, music and play'],
    cre: ['Sunrise Hill', 'God\'s world and loving others'],
  },
  2: {
    math: ['Number Hills', 'Count, add and measure'],
    english: ['Reading Tree', 'Letters, sounds and first words'],
    environmental: ['Village Trail', 'Home, school, plants and animals'],
    creative: ['Music Meadow', 'Colours, songs and games'],
    cre: ['Shepherd\'s Valley', 'Bible stories and kindness'],
  },
}

function yearAreas(y: Year): LearningArea[] {
  const w = WORLDS[y]
  return [
    area(y, 'math', 'Mathematical Activities', w.math[0], w.math[1], MATH[y]),
    area(y, 'english', 'Language Activities', w.english[0], w.english[1], LANGUAGE[y]),
    area(y, 'environmental', 'Environmental Activities', w.environmental[0], w.environmental[1], ENVIRONMENTAL),
    area(y, 'creative', 'Psychomotor and Creative Activities', w.creative[0], w.creative[1], CREATIVE),
    area(y, 'cre', 'Religious Education Activities', w.cre[0], w.cre[1], RELIGIOUS),
  ]
}

export const PP1 = yearAreas(1)
export const PP2 = yearAreas(2)
