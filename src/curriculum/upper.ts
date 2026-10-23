// Grades 4 to 6 (upper primary): eight learning areas each, following the rationalised
// KICD designs (2024) and what KPSEA tests at the end of Grade 6. See
// research/upper-primary-strands.md for sources and confidence.
//
// Sub-strand ids are `u{grade}{area}-{topic}`, e.g. u5m-frac. The part without the grade,
// `u{area}-{topic}`, names the topic: lessons are written once per topic and shared by every
// grade that teaches it.
import type { AreaKind, LearningArea, SubStrand } from './types'

type Sub = [topic: string, title: string, blurb: string]
type StrandSpec = [title: string, subs: Sub[]]

const LETTER: Partial<Record<AreaKind, string>> = { math: 'm', english: 'e', kiswahili: 'k', science: 's', agriculture: 'a', social: 'o', creative: 'c', cre: 'r', environmental: 'v' }

function area(grade: 4 | 5 | 6, kind: AreaKind, title: string, world: string, tagline: string, strands: StrandSpec[]): LearningArea {
  const l = LETTER[kind]!
  return {
    id: `g${grade}-${kind}`,
    kind,
    title,
    world,
    tagline,
    strands: strands.map(([stitle, subs], i) => ({
      id: `g${grade}-${kind}-${i + 1}`,
      code: `${i + 1}.0`,
      title: stitle,
      subStrands: subs.map(([topic, t, blurb], j): SubStrand => ({ id: `u${grade}${l}-${topic}`, code: `${i + 1}.${j + 1}`, title: t, blurb })),
    })),
  }
}

/** The topic a sub-strand belongs to, shared across grades: u5m-frac → um-frac. */
export const topicOf = (subId: string) => subId.replace(/^u[456]/, 'u')
/** The grade of an upper-primary sub-strand, or null. */
export const upperGrade = (subId: string): 4 | 5 | 6 | null => {
  const m = /^u([456])/.exec(subId)
  return m ? (Number(m[1]) as 4 | 5 | 6) : null
}

// ── Languages (same strands every year, harder each year) ───────────────────

const ENGLISH: StrandSpec[] = [
  ['Reading', [
    ['comp', 'Reading Comprehension', 'Passages with KPSEA-style questions'],
    ['cloze', 'Cloze Passages', 'Choose the word that fills each gap'],
    ['vocab', 'Vocabulary', 'Synonyms, antonyms and word meanings'],
  ]],
  ['Grammar in Use', [
    ['nouns', 'Nouns', 'Kinds of nouns, plurals and possessives'],
    ['pron', 'Pronouns', 'Personal, possessive, reflexive and relative'],
    ['verbs', 'Verbs and Tenses', 'Regular, irregular and continuous forms'],
    ['adj', 'Adjectives and Adverbs', 'Order, comparison and how things are done'],
    ['prep', 'Prepositions and Conjunctions', 'Where, when, and joining ideas'],
  ]],
  ['Writing', [
    ['punct', 'Punctuation', 'Capitals, commas, apostrophes and speech marks'],
    ['sentences', 'Sentences', 'Order, joining, reported speech and question tags'],
    ['spell', 'Spelling', 'Tricky words spelt correctly'],
  ]],
]

const KISWAHILI: StrandSpec[] = [
  ['Kusoma', [
    ['ufahamu', 'Ufahamu', 'Soma kifungu ujibu maswali'],
    ['cloze', 'Kujaza Mapengo', 'Chagua neno linalofaa kila pengo'],
    ['msamiati', 'Msamiati', 'Visawe, vinyume na maana za maneno'],
    ['methali', 'Methali, Nahau na Vitendawili', 'Lugha ya hekima'],
  ]],
  ['Sarufi', [
    ['ngeli', 'Ngeli za Nomino', 'A-WA, KI-VI, LI-YA, U-I, I-ZI na nyinginezo'],
    ['nyakati', 'Nyakati na Ukanushaji', 'Uliopo, uliopita, ujao na kukanusha'],
    ['vivumishi', 'Vivumishi na Viwakilishi', 'Sifa, viashiria na vimilikishi'],
    ['viunganishi', 'Viunganishi na Vihusishi', 'Kuunganisha mawazo'],
  ]],
  ['Kuandika', [['uakifishaji', 'Uakifishaji na Tahajia', 'Alama za uakifishaji na maendelezo']]],
]

// ── Mathematics ─────────────────────────────────────────────────────────────

const MATH: Record<4 | 5 | 6, StrandSpec[]> = {
  4: [
    ['Numbers', [
      ['whole', 'Whole Numbers', 'Place value to 100,000, rounding and number words'],
      ['add', 'Addition', 'Adding up to five digits'],
      ['sub', 'Subtraction', 'Subtracting up to five digits'],
      ['mul', 'Multiplication', 'Multiplying by 1- and 2-digit numbers'],
      ['div', 'Division', 'Dividing with and without remainders'],
      ['frac', 'Fractions', 'Equivalent fractions, comparing and adding'],
      ['dec', 'Decimals', 'Tenths and hundredths'],
    ]],
    ['Measurement', [
      ['length', 'Length', 'Metres and centimetres'],
      ['area', 'Area', 'Counting squares, squares and rectangles'],
      ['capacity', 'Capacity', 'Litres and millilitres'],
      ['mass', 'Mass', 'Kilograms and grams'],
      ['time', 'Time', 'a.m., p.m., minutes and the calendar'],
      ['money', 'Money', 'Shopping, change and price lists'],
    ]],
    ['Geometry', [
      ['angles', 'Lines and Angles', 'Right angles, turns and kinds of lines'],
      ['shapes', 'Shapes', 'Sides, corners and lines of symmetry'],
    ]],
    ['Data Handling', [['data', 'Pictographs and Tables', 'Reading and making simple data']]],
  ],
  5: [
    ['Numbers', [
      ['whole', 'Whole Numbers', 'Place value to a million, rounding and patterns'],
      ['add', 'Addition', 'Large numbers and word problems'],
      ['sub', 'Subtraction', 'Large numbers and word problems'],
      ['mul', 'Multiplication', 'By 2- and 3-digit numbers'],
      ['div', 'Division', 'By 2-digit numbers; divisibility'],
      ['frac', 'Fractions', 'Mixed numbers; adding and subtracting'],
      ['dec', 'Decimals', 'Place value, adding and subtracting'],
    ]],
    ['Measurement', [
      ['length', 'Length', 'Kilometres, metres and perimeter'],
      ['area', 'Area', 'Rectangles, squares and combined shapes'],
      ['volume', 'Volume', 'Cubes and cuboids in cubic centimetres'],
      ['capacity', 'Capacity', 'Litres, millilitres and conversions'],
      ['mass', 'Mass', 'Kilograms, grams and tonnes'],
      ['time', 'Time', 'The 24-hour clock and durations'],
      ['money', 'Money', 'Bills, profit and loss'],
    ]],
    ['Geometry', [['angles', 'Angles', 'Measuring and naming angles']]],
    ['Data Handling', [['data', 'Bar Graphs', 'Reading and interpreting bar graphs']]],
  ],
  6: [
    ['Numbers', [
      ['whole', 'Whole Numbers', 'Millions, rounding, squares and square roots'],
      ['mul', 'Multiplication', 'Large numbers and order of operations'],
      ['div', 'Division and Factors', 'Long division, factors, LCM and GCD'],
      ['frac', 'Fractions', 'All four operations with fractions'],
      ['dec', 'Decimals', 'All four operations with decimals'],
      ['percent', 'Percentages', 'Fractions, decimals and percentages'],
    ]],
    ['Measurement', [
      ['length', 'Length', 'Perimeter and the circumference of a circle'],
      ['area', 'Area', 'Triangles, rectangles and combined shapes'],
      ['volume', 'Volume', 'Cuboids and capacity in litres'],
      ['mass', 'Mass', 'Grams, kilograms and tonnes in problems'],
      ['time', 'Time', 'Timetables, distance, speed and time'],
      ['money', 'Money', 'Profit, loss, discount and hire purchase'],
    ]],
    ['Geometry', [['angles', 'Angles and Shapes', 'Angles on a line, in a triangle, and around a point']]],
    ['Data Handling', [['data', 'Data and Averages', 'Bar graphs, tables and the mean']]],
  ],
}

// ── Science and Technology ──────────────────────────────────────────────────

const SCIENCE: Record<4 | 5 | 6, StrandSpec[]> = {
  4: [
    ['Living Things and Their Environment', [
      ['plants', 'Plants', 'Parts of a plant and what they do'],
      ['animals', 'Animals', 'Groups of animals and where they live'],
      ['teeth', 'Human Teeth', 'Kinds of teeth and caring for them'],
    ]],
    ['Matter', [
      ['states', 'States of Matter', 'Solids, liquids and gases'],
      ['materials', 'Properties of Materials', 'Hard, soft, float, sink, magnetic'],
    ]],
    ['Force and Energy', [
      ['force', 'Force and Its Effects', 'Push, pull and what forces do'],
      ['energy', 'Sources of Energy', 'Light, heat and sound'],
    ]],
  ],
  5: [
    ['Living Things and Their Environment', [
      ['plantgroups', 'Classifying Plants', 'Flowering and non-flowering plants'],
      ['vertebrates', 'Vertebrates', 'Fish, amphibians, reptiles, birds and mammals'],
      ['digestion', 'The Digestive System', 'How food is broken down'],
    ]],
    ['Matter', [
      ['mixtures', 'Mixtures', 'Mixing and separating'],
      ['pollution', 'Water Pollution', 'Causes, effects and prevention'],
    ]],
    ['Force and Energy', [
      ['heat', 'Heat Transfer', 'Conductors, insulators and how heat moves'],
      ['light', 'Light', 'Sources, shadows and reflection'],
    ]],
  ],
  6: [
    ['Living Things and Their Environment', [
      ['roots', 'Roots and Leaves', 'Types of roots and their uses'],
      ['invertebrates', 'Invertebrates', 'Insects, spiders, snails and worms'],
      ['circulation', 'The Circulatory System', 'The heart, blood and blood vessels'],
      ['breathing', 'The Breathing System', 'Lungs and breathing'],
    ]],
    ['Matter', [['water', 'Water and Its Properties', 'States, the water cycle and safe water']]],
    ['Force and Energy', [
      ['magnets', 'Magnetism', 'Poles, attraction and uses of magnets'],
      ['electricity', 'Electricity', 'Circuits, conductors and safety'],
      ['sound', 'Sound', 'How sound is made and travels'],
      ['machines', 'Simple Machines', 'Levers, pulleys and inclined planes'],
    ]],
  ],
}

// ── Agriculture and Nutrition ───────────────────────────────────────────────

const AGRICULTURE: Record<4 | 5 | 6, StrandSpec[]> = {
  4: [
    ['Conservation of Resources', [
      ['soil', 'Soil Conservation', 'Stopping soil erosion'],
      ['water', 'Water Conservation', 'Harvesting and saving water'],
      ['wildlife', 'Conserving Wild Animals', 'Why and how we protect wildlife'],
    ]],
    ['Food Production Processes', [
      ['gardening', 'Gardening', 'Growing vegetables at home and school'],
      ['animals', 'Uses of Domestic Animals', 'What animals give us'],
    ]],
    ['Hygiene Practices', [['hygiene', 'Personal Hygiene', 'Clean body, clothes and hands']]],
    ['Human Nutrition', [
      ['foodgroups', 'Food Groups', 'Energy, body-building and protective foods'],
      ['cooking', 'Preparing Food', 'Washing, peeling and boiling safely'],
    ]],
  ],
  5: [
    ['Conservation of Resources', [
      ['soil', 'Soil Conservation', 'Terraces, cover crops and mulching'],
      ['fuel', 'Fuel Conservation', 'Saving firewood, charcoal and gas'],
    ]],
    ['Food Production Processes', [
      ['seedbeds', 'Seedbeds and Nurseries', 'Raising seedlings'],
      ['pests', 'Crop Protection', 'Pests, diseases and wildlife deterrents'],
      ['animals', 'Rearing Small Animals', 'Poultry and rabbits'],
    ]],
    ['Hygiene Practices', [['hygiene', 'Kitchen Hygiene', 'Clean surfaces, utensils and food']]],
    ['Human Nutrition', [
      ['preserve', 'Food Preservation', 'Drying, salting, smoking and storage'],
      ['foodgroups', 'A Balanced Diet', 'Food groups and planning meals'],
    ]],
  ],
  6: [
    ['Conservation of Resources', [
      ['compost', 'Organic Manure', 'Compost, farmyard manure and mulch'],
      ['water', 'Water Harvesting', 'Collecting and storing water'],
    ]],
    ['Food Production Processes', [
      ['crops', 'Crop Production', 'Planting, tending and harvesting'],
      ['animals', 'Animal Care', 'Feeding, housing and health'],
    ]],
    ['Hygiene Practices', [['hygiene', 'Hygiene and Health', 'Germs, diseases and prevention']]],
    ['Human Nutrition', [
      ['nutrition', 'Nutrients and Deficiency', 'What happens when food lacks nutrients'],
      ['cooking', 'Cooking Methods', 'Boiling, frying, roasting, steaming and baking'],
    ]],
  ],
}

// ── Social Studies ──────────────────────────────────────────────────────────

const SOCIAL: Record<4 | 5 | 6, StrandSpec[]> = {
  4: [
    ['Natural and Built Environments', [
      ['maps', 'Maps and Directions', 'Compass points, symbols and keys'],
      ['features', 'Physical Features in Our County', 'Hills, rivers, lakes and plains'],
      ['weather', 'Weather and Climate', 'Measuring and recording weather'],
    ]],
    ['People and Population', [['people', 'Communities in Our County', 'Culture, language and ways of life']]],
    ['Resources and Economic Activities', [
      ['resources', 'Resources and Work', 'Farming, trade and other activities'],
      ['transport', 'Transport and Communication', 'Moving people, goods and messages'],
    ]],
    ['Political Systems and Governance', [
      ['governance', 'County Government', 'Leaders and services in the county'],
      ['citizenship', 'Rights and Responsibilities', 'Child rights, symbols and good citizenship'],
    ]],
  ],
  5: [
    ['Natural and Built Environments', [
      ['maps', 'Maps of Kenya', 'Location, neighbours and directions'],
      ['features', 'Physical Features of Kenya', 'Mountains, lakes, rivers and the Rift Valley'],
      ['weather', 'Climate of Kenya', 'Climate regions and their effects'],
    ]],
    ['People and Population', [
      ['people', 'Peoples of Kenya', 'Language groups and culture'],
      ['history', 'Early History', 'Early people and how they lived'],
    ]],
    ['Resources and Economic Activities', [
      ['resources', 'Resources of Kenya', 'Farming, fishing, mining and tourism'],
      ['transport', 'Transport and Communication', 'Roads, railways and media'],
    ]],
    ['Political Systems and Governance', [
      ['governance', 'National Government', 'The arms of government'],
      ['citizenship', 'Citizenship', 'The Constitution, rights and duties'],
    ]],
  ],
  6: [
    ['Natural and Built Environments', [
      ['maps', 'Maps of East Africa', 'Countries, capitals and map reading'],
      ['features', 'Physical Features of East Africa', 'Lakes, mountains and rivers'],
      ['weather', 'Climate and Vegetation', 'Climate zones and natural vegetation'],
    ]],
    ['People and Population', [
      ['people', 'Population and Migration', 'Population, movement and settlement'],
      ['history', 'History of Kenya', 'Colonial rule and the struggle for independence'],
    ]],
    ['Resources and Economic Activities', [
      ['resources', 'Economic Activities', 'Agriculture, mining, fishing, trade and industry'],
      ['transport', 'Transport and Trade', 'East African links and trade'],
    ]],
    ['Political Systems and Governance', [
      ['governance', 'Government and Leadership', 'Elections, leaders and the East African Community'],
      ['citizenship', 'Citizenship and Peace', 'Human rights, national unity and resolving conflict'],
    ]],
  ],
}

// ── Creative Arts and CRE (same topics each year, harder each year) ─────────

const CREATIVE: StrandSpec[] = [
  ['Art and Craft', [
    ['drawing', 'Drawing and Painting', 'Colour, shading and composition'],
    ['craft', 'Craft', 'Weaving, modelling, collage and patterns'],
  ]],
  ['Music', [
    ['notation', 'Music Notation', 'Note values, rhythm and sol-fa'],
    ['instruments', 'Musical Instruments', 'Kenyan and Western instruments'],
    ['songs', 'Songs and the Anthem', 'Patriotic, folk and sacred songs'],
  ]],
  ['Physical Education', [
    ['athletics', 'Athletics', 'Running, relays, jumps and throws'],
    ['ballgames', 'Ball Games', 'Football, netball, volleyball and handball'],
    ['gym', 'Gymnastics and Swimming', 'Rolls, balances and water safety'],
  ]],
]

const CRE: StrandSpec[] = [
  ['Creation', [['creation', 'God\'s Creation', 'Creation and caring for the environment']]],
  ['The Holy Bible', [
    ['bible', 'The Bible', 'Books of the Bible and how it guides us'],
    ['ot', 'Old Testament Leaders', 'Abraham, Joseph, Moses, Samuel, David and more'],
  ]],
  ['The Life of Jesus', [
    ['jesus', 'The Life of Jesus', 'Birth, childhood, baptism and temptation'],
    ['miracles', 'Miracles and Parables', 'What Jesus did and taught'],
  ]],
  ['The Church', [
    ['church', 'The Church', 'The early church, the Holy Spirit and worship'],
    ['living', 'Christian Living', 'Values for everyday life'],
  ]],
]

const WORLDS: Record<4 | 5 | 6, Record<string, [string, string]>> = {
  4: {
    math: ['Amboseli Heights', 'Five-digit numbers, fractions and angles'],
    english: ['Kakamega Canopy', 'Stories, grammar and cloze'],
    kiswahili: ['Kisiwa cha Lamu', 'Ufahamu, sarufi na methali'],
    science: ['Lake Naivasha Lab', 'Plants, animals, matter and force'],
    agriculture: ['Kericho Gardens', 'Soil, water, food and hygiene'],
    social: ['My County Hills', 'Maps, people and our county'],
    creative: ['Rhythm Valley', 'Art, music and sport'],
    cre: ['Valley of Hope', 'Creation, the Bible and Jesus'],
  },
  5: {
    math: ['Tsavo Plains', 'Big numbers, decimals and volume'],
    english: ['Arabuko Forest', 'Reading, grammar and writing'],
    kiswahili: ['Pwani ya Malindi', 'Lugha, hadithi na sarufi'],
    science: ['Mount Kenya Station', 'Vertebrates, digestion, mixtures and heat'],
    agriculture: ['Rift Valley Fields', 'Seedbeds, pests and preserving food'],
    social: ['Kenya Highlands', 'Maps, peoples and government of Kenya'],
    creative: ['Bomas Stage', 'Art, music and sport'],
    cre: ['Hills of Galilee', 'Leaders, miracles and the church'],
  },
  6: {
    math: ['Kilimanjaro Summit', 'KPSEA-level numbers, measures and data'],
    english: ['Aberdare Heights', 'KPSEA reading and grammar'],
    kiswahili: ['Bahari ya Hindi', 'Ufahamu na sarufi ya KPSEA'],
    science: ['Lake Victoria Labs', 'Body systems, electricity and machines'],
    agriculture: ['Mwea Plains', 'Crops, animals and nutrition'],
    social: ['East Africa Trails', 'East Africa, history and government'],
    creative: ['Kasarani Arena', 'Art, music and sport'],
    cre: ['Mount of Olives', 'The Bible and Christian living'],
  },
}

function gradeAreas(g: 4 | 5 | 6): LearningArea[] {
  const w = WORLDS[g]
  return [
    area(g, 'math', 'Mathematics', w.math[0], w.math[1], MATH[g]),
    area(g, 'english', 'English', w.english[0], w.english[1], ENGLISH),
    area(g, 'kiswahili', 'Kiswahili', w.kiswahili[0], w.kiswahili[1], KISWAHILI),
    area(g, 'science', 'Science and Technology', w.science[0], w.science[1], SCIENCE[g]),
    area(g, 'agriculture', 'Agriculture and Nutrition', w.agriculture[0], w.agriculture[1], AGRICULTURE[g]),
    area(g, 'social', 'Social Studies', w.social[0], w.social[1], SOCIAL[g]),
    area(g, 'creative', 'Creative Arts', w.creative[0], w.creative[1], CREATIVE),
    area(g, 'cre', 'Christian Religious Education', w.cre[0], w.cre[1], CRE),
  ]
}

export const GRADE4 = gradeAreas(4)
export const GRADE5 = gradeAreas(5)
export const GRADE6 = gradeAreas(6)
