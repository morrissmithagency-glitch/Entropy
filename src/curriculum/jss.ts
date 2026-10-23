// Junior school, Grades 7 to 9: nine learning areas each, following the rationalised KICD
// junior school designs (revised 2024). See research/junior-school-strands.md for sources and
// confidence.
//
// Sub-strand ids are `j{grade}{area}-{topic}` (j8m-ratio); `j{area}-{topic}` names the topic
// shared by the grades that teach it, with one lesson.
import type { AreaKind, LearningArea, SubStrand } from './types'

type Sub = [topic: string, title: string, blurb: string]
type StrandSpec = [title: string, subs: Sub[]]
export type JGrade = 7 | 8 | 9

const LETTER: Partial<Record<AreaKind, string>> = { math: 'm', english: 'e', kiswahili: 'k', science: 's', pretech: 't', social: 'o', agriculture: 'a', creative: 'c', cre: 'r' }

function area(grade: JGrade, kind: AreaKind, title: string, world: string, tagline: string, strands: StrandSpec[]): LearningArea {
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
      subStrands: subs.map(([topic, t, blurb], j): SubStrand => ({ id: `j${grade}${l}-${topic}`, code: `${i + 1}.${j + 1}`, title: t, blurb })),
    })),
  }
}

const MATH: Record<JGrade, StrandSpec[]> = {
  7: [
    ['Numbers', [
      ['whole', 'Whole Numbers', 'Place value, rounding and operations'],
      ['factors', 'Factors and Multiples', 'Divisibility, HCF and LCM'],
      ['frac', 'Fractions', 'All four operations and word problems'],
      ['dec', 'Decimals', 'Operations, rounding and standard form'],
      ['squares', 'Squares and Square Roots', 'Perfect squares and roots'],
    ]],
    ['Algebra', [
      ['expr', 'Algebraic Expressions', 'Forming and simplifying expressions'],
      ['equations', 'Linear Equations', 'Solving equations in one unknown'],
    ]],
    ['Measurements', [
      ['pythag', 'Pythagorean Relationship', 'Right-angled triangles'],
      ['measure', 'Length, Area and Volume', 'Perimeter, area, volume and capacity'],
      ['time', 'Time, Date and Temperature', 'The 24-hour clock, calendars and °C'],
      ['money', 'Money', 'Profit, loss and discount'],
    ]],
    ['Geometry', [['angles', 'Angles and Polygons', 'Angles on lines, in triangles and polygons']]],
    ['Data Handling and Probability', [['data', 'Data Handling', 'Tables, bar graphs and the mean']]],
  ],
  8: [
    ['Numbers', [
      ['integers', 'Integers', 'Positive and negative numbers'],
      ['frac', 'Fractions and Decimals', 'Operations and recurring decimals'],
      ['squares', 'Squares, Cubes and Roots', 'Squares, cubes and their roots'],
      ['ratio', 'Rates, Ratio and Percentage', 'Sharing, rates and percentage change'],
    ]],
    ['Algebra', [
      ['expr', 'Algebraic Expressions', 'Expanding, factorising and substituting'],
      ['equations', 'Equations and Inequalities', 'Linear equations and inequalities'],
    ]],
    ['Measurements', [
      ['circles', 'Circles', 'Circumference and area of circles'],
      ['measure', 'Area and Volume', 'Surface area and volume of prisms'],
      ['money', 'Money', 'Commission, simple interest and hire purchase'],
    ]],
    ['Geometry', [
      ['coords', 'Coordinates and Graphs', 'Plotting points and straight lines'],
      ['angles', 'Angles and Scale Drawing', 'Angle properties, bearings and scale'],
    ]],
    ['Data Handling and Probability', [
      ['data', 'Data Handling', 'Mean, median, mode and range'],
      ['prob', 'Probability', 'Chance and simple probability'],
    ]],
  ],
  9: [
    ['Numbers', [
      ['integers', 'Integers', 'All four operations with integers'],
      ['indices', 'Indices and Standard Form', 'Laws of indices and very big or small numbers'],
      ['ratio', 'Proportion and Rates of Work', 'Direct, inverse and compound proportion'],
    ]],
    ['Algebra', [
      ['expr', 'Algebraic Expressions', 'Quadratic expansion and factorisation'],
      ['equations', 'Simultaneous Equations', 'Two equations, two unknowns'],
    ]],
    ['Measurements', [
      ['measure', 'Surface Area and Volume', 'Prisms, cylinders, cones and pyramids'],
      ['density', 'Mass, Volume and Density', 'Density and its units'],
      ['speed', 'Time, Distance and Speed', 'Speed, velocity and timetables'],
      ['money', 'Money', 'Exchange rates, tax and compound interest'],
    ]],
    ['Geometry', [
      ['coords', 'Straight-Line Graphs', 'Gradient and equations of lines'],
      ['similarity', 'Similarity and Enlargement', 'Scale factors and similar shapes'],
      ['trig', 'Trigonometry', 'Sine, cosine and tangent'],
    ]],
    ['Data Handling and Probability', [
      ['data', 'Data Interpretation', 'Grouped data, mean and median'],
      ['prob', 'Probability', 'Outcomes and probability'],
    ]],
  ],
}

const ENGLISH: StrandSpec[] = [
  ['Reading', [
    ['comp', 'Reading Comprehension', 'Longer passages, inference and vocabulary'],
    ['cloze', 'Cloze Passages', 'Grammar and meaning in context'],
    ['literature', 'Poetry and Oral Literature', 'Figures of speech, proverbs and idioms'],
  ]],
  ['Grammar in Use', [
    ['wordclass', 'Word Classes', 'Nouns, pronouns, adjectives, adverbs, prepositions'],
    ['verbs', 'Verbs and Tenses', 'Tenses, aspect, modals and conditionals'],
    ['sentences', 'Sentence Structure', 'Phrases, clauses and sentence types'],
    ['transform', 'Transformations', 'Passive voice, reported speech and tags'],
  ]],
  ['Writing', [
    ['vocab', 'Vocabulary', 'Synonyms, antonyms, phrasal verbs and confusing words'],
    ['punct', 'Punctuation and Spelling', 'Punctuation marks and tricky spellings'],
  ]],
]

const KISWAHILI: StrandSpec[] = [
  ['Kusoma', [
    ['ufahamu', 'Ufahamu', 'Vifungu virefu na maswali ya kina'],
    ['cloze', 'Kujaza Mapengo', 'Sarufi na maana katika kifungu'],
    ['fasihi', 'Fasihi Simulizi', 'Methali, nahau, vitendawili na tamathali'],
  ]],
  ['Sarufi', [
    ['ngeli', 'Ngeli na Upatanisho', 'Upatanisho wa kisarufi katika sentensi'],
    ['aina', 'Aina za Maneno', 'Nomino, vitenzi, vivumishi, vielezi na zaidi'],
    ['nyakati', 'Nyakati na Hali', 'Nyakati, hali na ukanushaji'],
    ['kauli', 'Mnyambuliko wa Vitenzi', 'Kutendea, kutendwa, kutendana na kutendesha'],
    ['usemi', 'Usemi Halisi na wa Taarifa', 'Kubadilisha usemi'],
  ]],
  ['Kuandika', [
    ['msamiati', 'Msamiati', 'Visawe, vinyume na maneno ya kipekee'],
    ['uakifishaji', 'Uakifishaji', 'Alama za uakifishaji'],
  ]],
]

const SCIENCE: Record<JGrade, StrandSpec[]> = {
  7: [
    ['Scientific Investigation', [['investigation', 'Laboratory Safety and Apparatus', 'Safety, apparatus and the scientific method']]],
    ['Mixtures, Elements and Compounds', [
      ['mixtures', 'Separating Mixtures', 'Filtration, evaporation, distillation and more'],
      ['acids', 'Acids, Bases and Indicators', 'Litmus, pH and everyday acids'],
    ]],
    ['Living Things and Their Environment', [
      ['kingdoms', 'Classification of Living Things', 'Kingdoms and simple keys'],
      ['cells', 'The Cell', 'Plant and animal cells and the microscope'],
      ['health', 'Health and First Aid', 'Diseases, first aid and healthy habits'],
    ]],
    ['Force and Energy', [
      ['energy', 'Forms of Energy', 'Energy forms and changes'],
      ['electricity', 'Electrical Circuits', 'Series and parallel circuits'],
    ]],
  ],
  8: [
    ['Scientific Investigation', [['investigation', 'Scientific Method', 'Variables, fair tests and measurement']]],
    ['Mixtures, Elements and Compounds', [
      ['atoms', 'Atoms, Elements and Compounds', 'Particles, symbols and formulae'],
      ['changes', 'Physical and Chemical Changes', 'Reversible and irreversible changes'],
    ]],
    ['Living Things and Their Environment', [
      ['transport', 'Movement of Materials', 'Diffusion, osmosis and transport in plants'],
      ['bodysystems', 'Human Body Systems', 'Circulation, breathing and excretion'],
      ['ecology', 'Interdependence', 'Food chains, food webs and ecosystems'],
    ]],
    ['Force and Energy', [
      ['light', 'Light and Mirrors', 'Reflection, refraction and curved mirrors'],
      ['heat', 'Heat Transfer', 'Conduction, convection and radiation'],
      ['pressure', 'Pressure', 'Pressure in solids, liquids and gases'],
    ]],
  ],
  9: [
    ['Mixtures, Elements and Compounds', [
      ['periodic', 'Elements and the Periodic Table', 'Atomic structure, groups and metals'],
      ['water', 'Water and Its Properties', 'Hard and soft water, treatment'],
    ]],
    ['Living Things and Their Environment', [
      ['nutrition', 'Nutrition in Plants and Animals', 'Photosynthesis and digestion'],
      ['reproduction', 'Reproduction in Plants', 'Pollination, fertilisation, seeds and fruits'],
      ['ecosystems', 'Ecosystems and Conservation', 'Cycles, pollution and conservation'],
    ]],
    ['Force and Energy', [
      ['motion', 'Speed, Velocity and Acceleration', 'Describing motion'],
      ['work', 'Work, Energy and Power', 'Work done, power and machines'],
      ['electricity', 'Electrical Energy', 'Heating effect, power and cost'],
    ]],
  ],
}

const PRETECH: StrandSpec[] = [
  ['Foundations of Pre-Technical Studies', [
    ['safety', 'Safety at Work', 'Workshop and fire safety, first aid'],
    ['careers', 'Careers and Self-Exploration', 'Talents, interests and careers'],
  ]],
  ['Communication', [
    ['drawing', 'Technical Drawing', 'Instruments, lines and projections'],
    ['computers', 'Computer Studies', 'Hardware, software and digital safety'],
  ]],
  ['Materials and Production', [
    ['materials', 'Materials for Production', 'Wood, metals, plastics and ceramics'],
    ['tools', 'Tools and Production', 'Measuring, marking, cutting and driving tools'],
  ]],
  ['Entrepreneurship', [['business', 'Business and Money', 'Needs, budgets, savings and enterprise']]],
]

const SOCIAL: Record<JGrade, StrandSpec[]> = {
  7: [
    ['Natural and Built Environments', [
      ['maps', 'Map Reading', 'Scale, direction and grid references'],
      ['earth', 'The Earth and the Solar System', 'Earth movements, latitude and longitude'],
      ['weather', 'Weather and Climate', 'Elements of weather and climate of Africa'],
    ]],
    ['People and Population', [['history', 'Early Civilisations', 'Human origins and early African kingdoms']]],
    ['Resources and Economic Activities', [
      ['resources', 'Natural Resources in Africa', 'Forests, wildlife, water and minerals'],
      ['economy', 'Trade and Transport in Africa', 'Trade, transport and communication'],
    ]],
    ['Political Developments and Governance', [
      ['governance', 'The Constitution of Kenya', 'Structure, values and the Bill of Rights'],
      ['citizenship', 'Citizenship and Human Rights', 'Rights, duties and social cohesion'],
    ]],
  ],
  8: [
    ['Natural and Built Environments', [
      ['maps', 'Topographical Maps', 'Contours, relief and map interpretation'],
      ['earth', 'Landforms', 'Internal and external land-forming processes'],
      ['weather', 'Climate Change', 'Causes, effects and mitigation'],
    ]],
    ['People and Population', [['history', 'Colonialism and Independence in Africa', 'Partition, colonial rule and freedom']]],
    ['Resources and Economic Activities', [
      ['resources', 'Agriculture and Industry in Africa', 'Farming systems and industries'],
      ['economy', 'Regional Trade', 'Trade blocs and trade in Africa'],
    ]],
    ['Political Developments and Governance', [
      ['governance', 'Democracy and Devolution', 'Elections, devolution and public participation'],
      ['citizenship', 'Peace and Conflict Resolution', 'Causes of conflict and peaceful solutions'],
    ]],
  ],
  9: [
    ['Natural and Built Environments', [
      ['maps', 'Maps, Photographs and Statistics', 'Interpreting maps, photos and graphs'],
      ['earth', 'Mining, Energy and the Environment', 'Minerals, energy and environmental care'],
      ['weather', 'World Climatic Regions', 'Climate zones and vegetation of the world'],
    ]],
    ['People and Population', [['history', 'The World Wars and International Relations', 'World wars, the UN and global cooperation']]],
    ['Resources and Economic Activities', [
      ['resources', 'Tourism, Fishing and Forestry', 'Economic activities and their challenges'],
      ['economy', 'World Trade and Globalisation', 'Imports, exports and globalisation'],
    ]],
    ['Political Developments and Governance', [
      ['governance', 'International Organisations', 'UN, AU, EAC, Commonwealth and more'],
      ['citizenship', 'Global Citizenship', 'Human rights, ethics and responsible citizenship'],
    ]],
  ],
}

const AGRICULTURE: StrandSpec[] = [
  ['Conservation of Resources', [
    ['soil', 'Soil and Its Management', 'Soil properties, fertility and conservation'],
    ['conservation', 'Conserving Water and Forests', 'Water harvesting and agroforestry'],
  ]],
  ['Food Production Processes', [
    ['crops', 'Crop Production', 'Propagation, management and harvesting'],
    ['animals', 'Animal Production', 'Breeds, feeding, housing and health'],
  ]],
  ['Human Nutrition', [
    ['nutrition', 'Food and Nutrition', 'Nutrients, meal planning and special diets'],
    ['foodprep', 'Food Preparation and Preservation', 'Cooking methods, hygiene and storage'],
  ]],
  ['Agricultural Enterprise', [['enterprise', 'Farm Records and Marketing', 'Records, costs, profit and marketing']]],
]

const CREATIVE: StrandSpec[] = [
  ['Creating and Execution', [
    ['visual', 'Visual Arts', 'Drawing, painting, colour and design'],
    ['crafts', 'Crafts and Design', 'Weaving, ceramics, printing and graphic design'],
    ['music', 'Music', 'Notation, scales, intervals and composition'],
  ]],
  ['Performance and Display', [
    ['performing', 'Dance, Drama and Performance', 'Elements of performance'],
    ['athletics', 'Athletics', 'Track and field events and rules'],
    ['ballgames', 'Ball Games', 'Skills, rules and tactics'],
    ['gym', 'Gymnastics and Swimming', 'Skills and water safety'],
  ]],
  ['Appreciation', [['appreciation', 'Appreciation and Careers', 'Kenyan heritage and creative careers']]],
]

const CRE: StrandSpec[] = [
  ['The Bible', [
    ['bible', 'The Bible', 'Books, translations and interpretation'],
    ['creation', 'Creation and the Fall', 'Creation, sin and God\'s care'],
  ]],
  ['God\'s Promises and His People', [
    ['ot', 'Old Testament Leaders and Prophets', 'Covenants, kings and prophets'],
  ]],
  ['The Life and Ministry of Jesus', [
    ['jesus', 'The Ministry of Jesus', 'Teachings, miracles and parables'],
    ['passion', 'Death, Resurrection and Ascension', 'The events of Holy Week'],
  ]],
  ['The Church and Christian Living', [
    ['church', 'The Church', 'The Holy Spirit and the early church'],
    ['ethics', 'Christian Ethics', 'Work, leisure, family and integrity'],
  ]],
]

const WORLDS: Record<JGrade, Record<string, [string, string]>> = {
  7: {
    math: ['Mount Longonot', 'Numbers, algebra and measurement'],
    english: ['Kakamega Library', 'Reading, grammar and literature'],
    kiswahili: ['Pwani ya Watamu', 'Ufahamu, fasihi na sarufi'],
    science: ['Lake Elementaita Lab', 'Mixtures, cells and circuits'],
    pretech: ['Thika Workshop', 'Tools, materials, drawing and computers'],
    social: ['Rift Valley Lookout', 'Maps, Africa and the Constitution'],
    agriculture: ['Kirinyaga Farms', 'Soil, crops, animals and nutrition'],
    creative: ['Bomas Studio', 'Art, music and sport'],
    cre: ['Mount Sinai Trail', 'The Bible and Christian living'],
  },
  8: {
    math: ['Ngong Hills', 'Ratios, equations, circles and probability'],
    english: ['Lamu Archive', 'Comprehension, structure and style'],
    kiswahili: ['Bandari ya Kilifi', 'Fasihi, sarufi na uandishi'],
    science: ['Hell\'s Gate Station', 'Atoms, body systems and light'],
    pretech: ['Kisumu Innovation Hub', 'Design, production and enterprise'],
    social: ['Great Rift Escarpment', 'Landforms, history and democracy'],
    agriculture: ['Mwea Irrigation Fields', 'Soil fertility, crops and livestock'],
    creative: ['Moi Sports Arena', 'Art, music and sport'],
    cre: ['Jordan Valley', 'Prophets, Jesus and the church'],
  },
  9: {
    math: ['Mount Elgon Peaks', 'Indices, trigonometry and data'],
    english: ['Nairobi Book Fair', 'KJSEA reading and writing'],
    kiswahili: ['Kisiwa cha Pemba', 'Lugha na fasihi ya kina'],
    science: ['Olkaria Research Centre', 'Elements, ecosystems and motion'],
    pretech: ['Konza Tech City', 'Technology, careers and business'],
    social: ['Pan-African Highway', 'The world, trade and global citizenship'],
    agriculture: ['Rift Valley Agribusiness', 'Production, nutrition and records'],
    creative: ['Kenya National Theatre', 'Art, music and sport'],
    cre: ['Mount of Beatitudes', 'Ethics, the church and Christian living'],
  },
}

function gradeAreas(g: JGrade): LearningArea[] {
  const w = WORLDS[g]
  return [
    area(g, 'math', 'Mathematics', w.math[0], w.math[1], MATH[g]),
    area(g, 'english', 'English', w.english[0], w.english[1], ENGLISH),
    area(g, 'kiswahili', 'Kiswahili', w.kiswahili[0], w.kiswahili[1], KISWAHILI),
    area(g, 'science', 'Integrated Science', w.science[0], w.science[1], SCIENCE[g]),
    area(g, 'pretech', 'Pre-Technical Studies', w.pretech[0], w.pretech[1], PRETECH),
    area(g, 'social', 'Social Studies', w.social[0], w.social[1], SOCIAL[g]),
    area(g, 'agriculture', 'Agriculture and Nutrition', w.agriculture[0], w.agriculture[1], AGRICULTURE),
    area(g, 'creative', 'Creative Arts and Sports', w.creative[0], w.creative[1], CREATIVE),
    area(g, 'cre', 'Christian Religious Education', w.cre[0], w.cre[1], CRE),
  ]
}

export const GRADE7 = gradeAreas(7)
export const GRADE8 = gradeAreas(8)
export const GRADE9 = gradeAreas(9)
