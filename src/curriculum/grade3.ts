// Grade 3 learning areas, strands and sub-strands (rationalised KICD designs). The
// question styles and difficulty follow Grade 3 end-term papers; see
// research/grade3-papers.md for the analysis. All questions are original.
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
          { id: 't-whole', code: '1.1', title: 'Whole Numbers', blurb: 'Place value, number names and patterns to 1000' },
          { id: 't-add', code: '1.2', title: 'Addition', blurb: 'Adding with carrying, and three numbers at once' },
          { id: 't-sub', code: '1.3', title: 'Subtraction', blurb: 'Subtracting with borrowing' },
          { id: 't-mul', code: '1.4', title: 'Multiplication', blurb: 'Equal groups and times tables' },
          { id: 't-div', code: '1.5', title: 'Division', blurb: 'Sharing equally and grouping' },
          { id: 't-frac', code: '1.6', title: 'Fractions', blurb: 'Halves, quarters and eighths' },
        ],
      },
      {
        id: 'g3-math-measurement',
        code: '2.0',
        title: 'Measurement',
        subStrands: [
          { id: 't-length', code: '2.1', title: 'Length', blurb: 'Metres and centimetres' },
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
        subStrands: [{ id: 't-shapes', code: '3.1', title: 'Shapes and Patterns', blurb: 'Hidden triangles, sides, corners and patterns' }],
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
          { id: 'te-verbs', code: '3.1', title: 'Do, Does, Did, Done', blurb: 'Using action words in the right time' },
          { id: 'te-prep', code: '3.2', title: 'Prepositions', blurb: 'in, on, under, of, between, behind' },
          { id: 'te-pron', code: '3.3', title: 'Pronouns', blurb: 'mine, hers, ours, theirs, who and what' },
          { id: 'te-plural', code: '3.4', title: 'Plurals', blurb: 'One child, many children' },
          { id: 'te-abc', code: '3.5', title: 'Alphabetical Order', blurb: 'Arrange words from a to z' },
        ],
      },
      {
        id: 'g3-eng-writing',
        code: '4.0',
        title: 'Writing',
        subStrands: [{ id: 'te-mech', code: '4.1', title: 'Writing Correctly', blurb: 'Capital letters, small letters and punctuation' }],
      },
    ],
  },
  {
    id: 'g3-environmental',
    kind: 'environmental',
    title: 'Environmental Activities',
    world: 'Tea Hills',
    tagline: 'Health, safety, food and caring for our land',
    strands: [
      {
        id: 'g3-env-social',
        code: '1.0',
        title: 'Social Environment',
        subStrands: [
          { id: 'tv-hygiene', code: '1.1', title: 'Hygiene and Oral Care', blurb: 'Clean bodies, teeth and toilets' },
          { id: 'tv-home', code: '1.2', title: 'Bedding and Sleep', blurb: 'Beds, bedding and a clean sleeping area' },
          { id: 'tv-safety', code: '1.3', title: 'Safety', blurb: 'Strangers, safe places and road signs' },
          { id: 'tv-feelings', code: '1.4', title: 'Feelings and Manners', blurb: 'Emotions, table manners and sharing' },
        ],
      },
      {
        id: 'g3-env-natural',
        code: '2.0',
        title: 'Natural Environment',
        subStrands: [
          { id: 'tv-weather', code: '2.1', title: 'Weather', blurb: 'Rain, drought, floods and what we wear' },
          { id: 'tv-soil', code: '2.2', title: 'Soil', blurb: 'Mud, manure and caring for soil' },
        ],
      },
      {
        id: 'g3-env-resources',
        code: '3.0',
        title: 'Resources in Our Environment',
        subStrands: [
          { id: 'tv-food', code: '3.1', title: 'Food and Nutrition', blurb: 'Food groups and a balanced diet' },
          { id: 'tv-water', code: '3.2', title: 'Water', blurb: 'Safe water and using it again' },
          { id: 'tv-care', code: '3.3', title: 'Caring for Our Environment', blurb: 'Waste, trees and plants' },
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
        subStrands: [{ id: 'tk-msamiati', code: '1.1', title: 'Msamiati', blurb: 'Vifaa, kazi na watu' }],
      },
      {
        id: 'g3-ksw-kusoma',
        code: '2.0',
        title: 'Kusoma',
        subStrands: [
          { id: 'tk-sauti', code: '2.1', title: 'Sauti', blurb: 'ch, sh, ny, ng\', dh, th' },
          { id: 'tk-ufahamu', code: '2.2', title: 'Ufahamu', blurb: 'Soma hadithi ujibu maswali' },
        ],
      },
      {
        id: 'g3-ksw-sarufi',
        code: '3.0',
        title: 'Sarufi',
        subStrands: [
          { id: 'tk-ngeli', code: '3.1', title: 'Hili na Haya', blurb: 'Umoja na wingi wa ngeli ya LI-YA' },
          { id: 'tk-kanusha', code: '3.2', title: 'Kukanusha', blurb: 'Badilisha sentensi iwe ya kukataa' },
          { id: 'tk-kinyume', code: '3.3', title: 'Kinyume', blurb: 'Maneno yenye maana tofauti' },
        ],
      },
      {
        id: 'g3-ksw-kuandika',
        code: '4.0',
        title: 'Kuandika',
        subStrands: [{ id: 'tk-tahajia', code: '4.1', title: 'Tahajia', blurb: 'Panga herufi uandike neno sahihi' }],
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
        id: 'g3-art-craft',
        code: '1.0',
        title: 'Art and Craft',
        subStrands: [{ id: 'tc-art', code: '1.1', title: 'Drawing, Painting and Craft', blurb: 'Tools, collage, modelling and weaving' }],
      },
      {
        id: 'g3-art-music',
        code: '2.0',
        title: 'Music',
        subStrands: [
          { id: 'tc-music', code: '2.1', title: 'Rhythm and Sound', blurb: 'Pitch, tempo, rhythm and instruments' },
          { id: 'tc-anthem', code: '2.2', title: 'Songs and the Anthem', blurb: 'Our National Anthem and kinds of songs' },
        ],
      },
      {
        id: 'g3-art-pe',
        code: '3.0',
        title: 'Movement',
        subStrands: [{ id: 'tc-pe', code: '3.1', title: 'Skipping, Hopping and Safety', blurb: 'Moving well and playing safely' }],
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
        subStrands: [{ id: 'tr-creation', code: '1.1', title: 'God\'s Creation', blurb: 'God made us and the world' }],
      },
      {
        id: 'g3-cre-bible',
        code: '2.0',
        title: 'The Bible',
        subStrands: [{ id: 'tr-bible', code: '2.1', title: 'Bible Stories', blurb: 'Moses, Jonah, Naaman, Daniel and more' }],
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
