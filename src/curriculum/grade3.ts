// Grade 3 learning areas, strands and sub-strands, following the Grade 3 CBC Strand
// Guide (rationalised KICD designs, 2024). Question styles and difficulty follow
// Grade 3 end-term papers; see research/grade3-papers.md. All questions are original.
import type { LearningArea } from './types'

export const GRADE3: LearningArea[] = [
  {
    id: 'g3-math',
    kind: 'math',
    title: 'Mathematical Activities',
    world: 'Golden Plains',
    tagline: 'Hundreds, fractions, shillings and cents',
    strands: [
      {
        id: 'g3-math-numbers',
        code: '1.0',
        title: 'Numbers',
        subStrands: [
          { id: 't-concept', code: '1.1', title: 'Number Concept', blurb: 'Sort, compare and order; first to twentieth' },
          { id: 't-whole', code: '1.2', title: 'Whole Numbers', blurb: 'Place value, number names and patterns to 1000' },
          { id: 't-add', code: '1.3', title: 'Addition', blurb: 'Adding with carrying, and three numbers at once' },
          { id: 't-sub', code: '1.4', title: 'Subtraction', blurb: 'Subtracting with borrowing' },
          { id: 't-mul', code: '1.5', title: 'Multiplication', blurb: 'Equal groups and times tables' },
          { id: 't-div', code: '1.6', title: 'Division', blurb: 'Sharing equally and grouping' },
          { id: 't-frac', code: '1.7', title: 'Fractions', blurb: 'Halves, quarters and eighths' },
        ],
      },
      {
        id: 'g3-math-measurement',
        code: '2.0',
        title: 'Measurement',
        subStrands: [
          { id: 't-length', code: '2.1', title: 'Length', blurb: 'Metres' },
          { id: 't-mass', code: '2.2', title: 'Mass', blurb: 'Kilograms' },
          { id: 't-capacity', code: '2.3', title: 'Capacity', blurb: 'Litres' },
          { id: 't-time', code: '2.4', title: 'Time', blurb: 'Clock, days, months and the calendar' },
          { id: 't-money', code: '2.5', title: 'Money', blurb: 'Shillings and cents, buying and balance' },
        ],
      },
      {
        id: 'g3-math-geometry',
        code: '3.0',
        title: 'Geometry',
        subStrands: [
          { id: 't-position', code: '3.1', title: 'Position and Direction', blurb: 'Left, right, turning and positions' },
          { id: 't-shapes', code: '3.2', title: 'Shapes', blurb: 'Hidden triangles, sides, corners and patterns' },
        ],
      },
    ],
  },
  {
    id: 'g3-english',
    kind: 'english',
    title: 'English Language Activities',
    world: 'Kakamega Forest',
    tagline: 'Stories, grammar and words in the rainforest',
    strands: [
      {
        id: 'g3-eng-listening',
        code: '1.0',
        title: 'Listening and Speaking',
        subStrands: [{ id: 'te-respond', code: '1.1', title: 'Responding and Jobs', blurb: 'Answer politely, and name who does what' }],
      },
      {
        id: 'g3-eng-reading',
        code: '2.0',
        title: 'Reading',
        subStrands: [
          { id: 'te-comp', code: '2.1', title: 'Comprehension', blurb: 'Read a story and answer questions' },
          { id: 'te-vocab', code: '2.2', title: 'Vocabulary', blurb: 'Opposites and word meanings' },
        ],
      },
      {
        id: 'g3-eng-language',
        code: '3.0',
        title: 'Language Use',
        subStrands: [
          { id: 'te-plural', code: '3.1', title: 'Nouns and Plurals', blurb: 'One child, many children' },
          { id: 'te-pron', code: '3.2', title: 'Pronouns and Question Words', blurb: 'mine, hers, ours, who, what, whose' },
          { id: 'te-verbs', code: '3.3', title: 'Verbs and Tenses', blurb: 'do, does, did, done; yesterday and now' },
          { id: 'te-adj', code: '3.4', title: 'Describing and Joining Words', blurb: 'Adjectives, bigger and biggest, and, but, because' },
          { id: 'te-prep', code: '3.5', title: 'Prepositions', blurb: 'in, on, under, of, between, behind' },
          { id: 'te-abc', code: '3.6', title: 'Alphabetical Order', blurb: 'Arrange words from a to z' },
        ],
      },
      {
        id: 'g3-eng-writing',
        code: '4.0',
        title: 'Writing',
        subStrands: [
          { id: 'te-mech', code: '4.1', title: 'Capitals and Punctuation', blurb: 'Capital letters, small letters, full stops and spelling' },
          { id: 'te-build', code: '4.2', title: 'Building Sentences', blurb: 'Put words in order and write clear sentences' },
        ],
      },
    ],
  },
  {
    id: 'g3-environmental',
    kind: 'environmental',
    title: 'Environmental Activities',
    world: 'Tea Hills',
    tagline: 'Home, food, community, weather and resources',
    strands: [
      {
        id: 'g3-env-social',
        code: '1.0',
        title: 'Social Environment',
        subStrands: [
          { id: 'tv-living', code: '1.1', title: 'Our Living Environment', blurb: 'Bedding, a clean sleeping area and hygiene' },
          { id: 'tv-family', code: '1.2', title: 'Family Needs', blurb: 'Feelings and how we meet them' },
          { id: 'tv-food', code: '1.3', title: 'Food in Our Environment', blurb: 'Food groups, a balanced diet and table manners' },
          { id: 'tv-community', code: '1.4', title: 'Our Community', blurb: 'Living together, strangers, safe places and road signs' },
          { id: 'tv-culture', code: '1.5', title: 'Cultural Events', blurb: 'Celebrations that care for people and the land' },
        ],
      },
      {
        id: 'g3-env-natural',
        code: '2.0',
        title: 'Natural Environment',
        subStrands: [
          { id: 'tv-weather', code: '2.1', title: 'Weather', blurb: 'Rain, drought, floods and what we wear' },
          { id: 'tv-soil', code: '2.2', title: 'Soil', blurb: 'Kinds of soil, mud, manure and caring for soil' },
          { id: 'tv-heat', code: '2.3', title: 'Heat', blurb: 'Sources and uses of heat, and keeping safe' },
        ],
      },
      {
        id: 'g3-env-resources',
        code: '3.0',
        title: 'Resources in Our Environment',
        subStrands: [
          { id: 'tv-water', code: '3.1', title: 'Water', blurb: 'Safe water and using it again' },
          { id: 'tv-plants', code: '3.2', title: 'Plants', blurb: 'Caring for plants and their uses' },
          { id: 'tv-animals', code: '3.3', title: 'Animals', blurb: 'Caring for animals and what they give us' },
          { id: 'tv-waste', code: '3.4', title: 'Waste Materials', blurb: 'Collecting, sorting and re-using waste' },
        ],
      },
    ],
  },
  {
    id: 'g3-kiswahili',
    kind: 'kiswahili',
    title: 'Shughuli za Kiswahili',
    world: 'Pwani ya Lamu',
    tagline: 'Sauti, sarufi na hadithi kando ya bahari',
    strands: [
      {
        id: 'g3-ksw-kusikiliza',
        code: '1.0',
        title: 'Kusikiliza na Kuzungumza',
        subStrands: [
          { id: 'tk-maamkuzi', code: '1.1', title: 'Maamkuzi na Maagano', blurb: 'Kusalimia, kuaga na kujibu kwa adabu' },
          { id: 'tk-msamiati', code: '1.2', title: 'Msamiati', blurb: 'Vifaa, kazi, uzalendo na miezi ya mwaka' },
        ],
      },
      {
        id: 'g3-ksw-kusoma',
        code: '2.0',
        title: 'Kusoma',
        subStrands: [
          { id: 'tk-sauti', code: '2.1', title: 'Sauti', blurb: 'ch, sh, ny, ng\', dh, th, gh' },
          { id: 'tk-ufahamu', code: '2.2', title: 'Kusoma kwa Ufahamu', blurb: 'Soma hadithi ujibu maswali' },
        ],
      },
      {
        id: 'g3-ksw-kuandika',
        code: '3.0',
        title: 'Kuandika',
        subStrands: [{ id: 'tk-tahajia', code: '3.1', title: 'Tahajia', blurb: 'Panga herufi uandike neno sahihi' }],
      },
      {
        id: 'g3-ksw-sarufi',
        code: '4.0',
        title: 'Sarufi',
        subStrands: [
          { id: 'tk-viwakilishi', code: '4.1', title: 'Yeye na Wao, Yule na Wale', blurb: 'Umoja na wingi wa watu' },
          { id: 'tk-ngeli', code: '4.2', title: 'Hili na Haya', blurb: 'Umoja na wingi wa ngeli ya LI-YA' },
          { id: 'tk-kanusha', code: '4.3', title: 'Kukanusha', blurb: 'Badilisha sentensi iwe ya kukataa' },
          { id: 'tk-kinyume', code: '4.4', title: 'Kinyume', blurb: 'Maneno yenye maana tofauti' },
        ],
      },
    ],
  },
  {
    id: 'g3-creative',
    kind: 'creative',
    title: 'Creative Activities',
    world: 'Flamingo Lake',
    tagline: 'Art, music and movement',
    strands: [
      {
        id: 'g3-art-creating',
        code: '1.0',
        title: 'Creating and Exploration',
        subStrands: [
          { id: 'tc-painting', code: '1.1', title: 'Painting', blurb: 'Brushes, palettes, colours and craft' },
          { id: 'tc-rhythm', code: '1.2', title: 'Rhythm', blurb: 'Beats, clapping and tempo' },
          { id: 'tc-melody', code: '1.3', title: 'Melody', blurb: 'High and low sounds and singing' },
        ],
      },
      {
        id: 'g3-art-performing',
        code: '2.0',
        title: 'Performing and Display',
        subStrands: [
          { id: 'tc-pushpull', code: '2.1', title: 'Pushing and Pulling', blurb: 'Using our strength safely' },
          { id: 'tc-rounds', code: '2.2', title: 'Rounds', blurb: 'Singing a song in turns' },
          { id: 'tc-skipping', code: '2.3', title: 'Skipping', blurb: 'Ropes, hopping and jumping' },
          { id: 'tc-dribbling', code: '2.4', title: 'Dribbling', blurb: 'Moving a ball with hands and feet' },
          { id: 'tc-strings', code: '2.5', title: 'String Instruments', blurb: 'Kenyan single-string instruments' },
          { id: 'tc-gym', code: '2.6', title: 'Forward Roll and Balance', blurb: 'Rolling and balancing safely' },
          { id: 'tc-water', code: '2.7', title: 'Water Safety', blurb: 'Staying safe in and near water' },
        ],
      },
      {
        id: 'g3-art-appreciation',
        code: '3.0',
        title: 'Appreciation',
        subStrands: [{ id: 'tc-anthem', code: '3.1', title: 'Kenya National Anthem', blurb: 'Its words, meaning and respect' }],
      },
    ],
  },
  {
    id: 'g3-cre',
    kind: 'cre',
    title: 'Christian Religious Education',
    world: 'Morning Hills',
    tagline: 'Creation, Bible stories and Christian living',
    strands: [
      {
        id: 'g3-cre-creation',
        code: '1.0',
        title: 'Creation',
        subStrands: [
          { id: 'tr-creation', code: '1.1', title: 'God\'s Creation', blurb: 'God made the world and made us in His likeness' },
          { id: 'tr-family', code: '1.2', title: 'My Family', blurb: 'The family God gives us' },
        ],
      },
      {
        id: 'g3-cre-bible',
        code: '2.0',
        title: 'The Holy Bible',
        subStrands: [
          { id: 'tr-bible', code: '2.1', title: 'Old Testament Stories', blurb: 'Moses, Jonah, Naaman, Daniel and more' },
          { id: 'tr-jesus', code: '2.2', title: 'The Life of Jesus', blurb: 'His birth, miracles and teaching' },
        ],
      },
      {
        id: 'g3-cre-living',
        code: '3.0',
        title: 'Christian Living',
        subStrands: [{ id: 'tr-living', code: '3.1', title: 'Living Well', blurb: 'Prayer, good choices and caring for others' }],
      },
    ],
  },
]
