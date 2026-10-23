// Grade 1 Creative Activities and CRE: short, simple fact tables (read aloud to the
// child) plus written "what should you do" questions. All content is original.
import type { ArtId } from '../../components/art/objects'
import { labelOptions as opts } from '../generators/english'
import { factGenerator, type FactSet } from '../facts'
import type { BankQuestion, Generator, Level } from '../types'

const t = (level: Level, prompt: string, answer: string, wrong: string[]): BankQuestion => ({ type: 'choice', level, prompt, options: opts([answer, ...wrong]), answer })
const a = (level: Level, prompt: string, answer: ArtId, wrong: ArtId[]): BankQuestion => ({ type: 'choice', level, prompt, options: [answer, ...wrong].map((x) => ({ id: x, art: x })), answer })
const tf = (level: Level, statement: string, truth: boolean): BankQuestion => t(level, `True or False?\n${statement}`, truth ? 'True' : 'False', [truth ? 'False' : 'True'])

const FACTS: Record<string, FactSet> = {
  'c-sounds': {
    categories: [
      { one: 'a loud sound', many: 'loud sounds', items: ['a big drum', 'thunder', 'a lorry hooting', 'a lion roaring', 'a school bell', 'people cheering'] },
      { one: 'a soft sound', many: 'soft sounds', items: ['a whisper', 'leaves rustling', 'a cat purring', 'rain drizzling', 'a baby breathing', 'a clock ticking'] },
      { one: 'a high sound', many: 'high sounds', items: ['a bird singing', 'a whistle', 'a chick cheeping', 'a small bell', 'a mouse squeaking'], set: 'h' },
      { one: 'a low sound', many: 'low sounds', items: ['a cow mooing', 'a frog croaking', 'a lorry engine', 'a donkey braying', "a man's deep voice"], set: 'h' },
    ],
    pairs: [
      {
        pairs: [
          ['a cow', 'moo'],
          ['a dog', 'woof'],
          ['a cat', 'meow'],
          ['a hen', 'cluck'],
          ['a goat', 'meh'],
          ['a duck', 'quack'],
          ['a bee', 'buzz'],
          ['a snake', 'hiss'],
        ],
        ask: (x) => `What sound does ${x} make?`,
        askBack: (y) => `Which animal says "${y}"?`,
      },
    ],
  },
  'c-picture': {
    categories: [
      { one: 'a thing we draw with', many: 'things we draw with', items: ['pencil', 'crayon', 'charcoal', 'chalk', 'coloured pencil'] },
      { one: 'a thing we eat or drink with', many: 'things we eat or drink with', items: ['spoon', 'cup', 'plate', 'bowl', 'fork'] },
    ],
    pairs: [
      {
        pairs: [
          ['the sun', 'yellow'],
          ['grass', 'green'],
          ['milk', 'white'],
          ['a ripe tomato', 'red'],
          ['the clear sky', 'blue'],
          ['charcoal', 'black'],
          ['soil', 'brown'],
          ['a ripe orange', 'orange'],
        ],
        ask: (x) => `Which colour should we use to colour ${x}?`,
      },
    ],
  },
  'c-rhythm': {
    categories: [
      { one: 'a way to make a beat with our body', many: 'ways to make a beat with our body', items: ['clapping', 'stamping', 'tapping our knees', 'snapping our fingers', 'patting our tummy', 'tapping our feet'] },
      { one: 'a quiet action', many: 'quiet actions', items: ['sleeping', 'reading silently', 'sitting still', 'closing our eyes', 'drawing'] },
    ],
    pairs: [
      {
        pairs: [
          ['clap, stamp, clap, stamp,', 'clap'],
          ['clap, clap, stamp, clap, clap,', 'stamp'],
          ['stamp, clap, stamp, clap,', 'stamp'],
          ['tap, tap, clap, tap, tap,', 'clap'],
          ['clap, tap, clap, tap,', 'clap'],
        ],
        ask: (x) => `What comes next? ${x} ___`,
      },
    ],
  },
  'c-stretch': {
    categories: [
      { one: 'a stretching movement', many: 'stretching movements', items: ['reaching up high', 'touching our toes', 'bending to the side', 'stretching our arms wide', 'rolling our shoulders', 'stretching our legs', 'turning our neck slowly', 'reaching to the front'] },
      { one: 'a resting position', many: 'resting positions', items: ['sitting down', 'lying still', 'standing still', 'sleeping', 'resting our head', 'sitting cross-legged', 'kneeling quietly'] },
    ],
  },
  'c-jump': {
    categories: [
      { one: 'a way of jumping', many: 'ways of jumping', items: ['jumping on two feet', 'hopping on one foot', 'jumping forward', 'jumping up high', 'jumping over a rope', 'jumping like a frog', 'jumping sideways', 'star jumps'] },
      { one: 'a way of moving without jumping', many: 'ways of moving without jumping', items: ['walking', 'crawling', 'rolling', 'tiptoeing', 'marching', 'sliding', 'swaying'] },
    ],
  },
  'c-games': {
    categories: [
      { one: 'a good way to play a singing game', many: 'good ways to play a singing game', items: ['take turns', 'hold hands gently', 'sing together', 'listen to the song', 'follow the leader', 'let everyone join', 'smile and have fun', 'clap along'] },
      { one: 'a bad way to play a game', many: 'bad ways to play a game', items: ['pushing others', 'shouting', 'refusing to share', 'leaving others out', 'grabbing roughly', 'cheating', 'laughing at mistakes'] },
    ],
  },
  'c-catch': {
    categories: [
      { one: 'a thing we can throw and catch', many: 'things we can throw and catch', items: ['a ball', 'a bean bag', 'a paper ball', 'a soft toy', 'a rubber ring', 'a sock ball', 'a sponge ball'] },
      { one: 'a hard or sharp thing', many: 'hard or sharp things', items: ['a stone', 'a glass', 'a stick', 'a knife', 'a plate', 'a bottle', 'a brick'] },
    ],
    pairs: [
      {
        pairs: [
          ['catch', 'hands'],
          ['kick', 'feet'],
          ['watch the ball', 'eyes'],
        ],
        ask: (x) => `We ${x} with our ___.`,
      },
    ],
  },
  'c-rolls': {
    categories: [
      { one: 'a rolling movement', many: 'rolling movements', items: ['log roll', 'egg roll', 'side roll', 'pencil roll', 'rocking like a boat', 'rolling down a soft slope', 'teddy bear roll'] },
      { one: 'a balancing movement', many: 'balancing movements', items: ['standing on one leg', 'walking on a line', 'standing on tiptoe', 'holding a statue pose', 'balancing a bean bag on the head', 'standing like a stork', 'walking on a bench'] },
    ],
  },
  'c-water': {
    categories: [
      { one: 'a safe thing to do near water', many: 'safe things to do near water', items: ['stay with an adult', 'walk slowly', 'keep away from deep water', 'listen to grown-ups', 'wear a float', 'play only in shallow water', 'tell a grown-up where you are'], set: 'b' },
      { one: 'a dangerous thing to do near water', many: 'dangerous things to do near water', items: ['playing alone near a river', 'pushing friends in', 'running on wet floors', 'going into deep water', 'playing near an open well', 'swimming in a flooded river', 'leaning over a water tank'], set: 'b' },
    ],
  },
  'c-instruments': {
    categories: [
      { one: 'an instrument we beat', many: 'instruments we beat', items: ['drum', 'tambourine', 'xylophone', 'tin drum', 'isukuti', 'small hand drum'] },
      { one: 'an instrument we shake', many: 'instruments we shake', items: ['shaker', 'kayamba', 'leg rattles', 'bottle-top shaker', 'gourd rattle'] },
      { one: 'an instrument we blow', many: 'instruments we blow', items: ['whistle', 'flute', 'horn', 'trumpet', 'panpipe'] },
    ],
  },
  'r-self': {
    categories: [
      { one: 'a part of my body', many: 'parts of my body', items: ['eyes', 'ears', 'nose', 'mouth', 'hands', 'legs'], set: 'p' },
      { one: 'a thing that is not part of my body', many: 'things that are not parts of my body', items: ['a shoe', 'a cup', 'a book', 'a hat'], set: 'p' },
    ],
    pairs: [
      {
        pairs: [
          ['eyes', 'see'],
          ['ears', 'hear'],
          ['nose', 'smell'],
          ['tongue', 'taste'],
          ['hands', 'touch'],
          ['legs', 'walk'],
        ],
        ask: (x) => `God gave me ${x} to ___.`,
        askBack: (y) => `Which part of my body helps me to ${y}?`,
      },
    ],
  },
  'r-family': {
    categories: [
      { one: 'a family member', many: 'family members', items: ['father', 'mother', 'brother', 'sister', 'baby', 'grandmother', 'grandfather', 'uncle', 'aunt'] },
      { one: 'a person outside the family', many: 'people outside the family', items: ['the teacher', 'the shopkeeper', 'the doctor', 'the driver', 'the pastor', 'the postman', 'the watchman'] },
    ],
  },
  'r-creation': {
    categories: [
      { one: 'a thing God made', many: 'things God made', items: ['trees', 'flowers', 'rivers', 'animals', 'birds', 'fish', 'the sun'] },
      { one: 'a thing people made', many: 'things people made', items: ['a chair', 'a car', 'a house', 'a cup', 'a radio', 'a bag'] },
    ],
    pairs: [
      {
        pairs: [
          ['fish', 'in water'],
          ['birds', 'in the sky and trees'],
          ['cows', 'on land'],
          ['frogs', 'in water and on land'],
        ],
        ask: (x) => `God made ${x} to live ___.`,
      },
    ],
  },
  'r-bible': {
    categories: [
      { one: 'a way of caring for the Bible', many: 'ways of caring for the Bible', items: ['keeping it clean', 'not tearing it', 'covering it', 'reading it gently'], set: 'b' },
      { one: 'a way of spoiling the Bible', many: 'ways of spoiling the Bible', items: ['tearing pages', 'drawing in it', 'leaving it in the rain', 'throwing it'], set: 'b' },
    ],
    pairs: [
      {
        pairs: [
          ['Noah', 'built a big boat'],
          ['David', 'looked after sheep'],
          ['Jonah', 'was swallowed by a big fish'],
          ['Adam', 'was the first man'],
          ['Eve', 'was the first woman'],
        ],
        ask: (x) => `In the Bible, ${x} ___.`,
        askBack: (y) => `Who ${y}?`,
      },
    ],
  },
  'r-jesus': {
    categories: [
      { one: 'a person in the story of baby Jesus', many: 'people in the story of baby Jesus', items: ['Mary', 'Joseph', 'the shepherds', 'the angels', 'the wise men'] },
      { one: 'a person from another Bible story', many: 'people from other Bible stories', items: ['Noah', 'Jonah', 'David', 'Adam', 'Moses'] },
    ],
    pairs: [
      {
        pairs: [
          ['Mary', 'the mother of Jesus'],
          ['Bethlehem', 'the town where Jesus was born'],
          ['a manger', 'the bed of baby Jesus'],
          ['Christmas', 'the day we remember the birth of Jesus'],
        ],
        ask: (x) => `What or who is ${x}?`,
      },
    ],
  },
  'r-living': {
    categories: [
      { one: 'a good deed', many: 'good deeds', items: ['sharing', 'helping', 'saying thank you', 'telling the truth', 'obeying parents', 'praying', 'saying sorry', 'being kind'], set: 'b' },
      { one: 'a bad deed', many: 'bad deeds', items: ['stealing', 'lying', 'fighting', 'shouting at others', 'being rude', 'refusing to share', 'calling names', 'cheating'], set: 'b' },
    ],
  },
  'r-church': {
    categories: [
      { one: 'a thing we do in church', many: 'things we do in church', items: ['praying', 'singing', 'listening to the Bible', 'giving an offering', 'greeting others', 'clapping in praise', 'learning in Sunday school', 'thanking God'], set: 'b' },
      { one: 'a thing that disturbs others in church', many: 'things that disturb others in church', items: ['shouting', 'running around', 'fighting', 'sleeping during prayer', 'eating sweets', 'playing with toys during prayer', 'talking loudly'], set: 'b' },
    ],
  },
}

export const GRADE1_MORE_GENERATORS: Record<string, Generator> = Object.fromEntries(Object.entries(FACTS).map(([id, set]) => [id, factGenerator(set)]))

export const GRADE1_MORE_BANKS: Record<string, BankQuestion[]> = {
  'c-sounds': [
    a(1, 'Which one makes a loud sound?', 'drum', ['leaf', 'feather']),
    a(2, 'Which one rings?', 'bell', ['cup', 'shoe']),
    t(3, 'We cover our ears when a sound is too ___.', 'loud', ['soft', 'sweet']),
    t(4, 'Which sound tells us it is time for break at school?', 'the school bell', ['a cow mooing', 'a bird singing']),
    t(5, 'Why should we talk softly in the library?', 'so others can read', ['so the books sleep', 'so the teacher sings']),
  ],
  'c-picture': [
    a(1, 'Which one do we use to draw?', 'pencil', ['spoon', 'cup']),
    t(2, 'We put our drawing on ___.', 'paper', ['water', 'the floor']),
    t(3, 'After colouring, we put crayons back in the ___.', 'box', ['river', 'pot']),
    t(4, 'Which is the best place to draw?', 'on a clean desk', ['on the wall', 'on a friend\'s book']),
    t(5, 'Your friend drew a beautiful tree. What should you say?', '"Your tree is lovely!"', ['"That is ugly."', 'nothing at all']),
  ],
  'c-rhythm': [
    t(1, 'We can make a beat by ___.', 'clapping', ['sleeping', 'reading']),
    a(2, 'Which one can we beat to make rhythm?', 'drum', ['leaf', 'cup']),
    t(3, 'A beat that goes on and on at the same speed is ___.', 'steady', ['broken', 'silent']),
    t(4, 'When the drum goes fast, we clap ___.', 'fast', ['slow', 'never']),
    t(5, 'Clap, clap, stamp. Clap, clap, stamp. How many claps come before each stamp?', '2', ['1', '3']),
  ],
  'c-stretch': [
    t(1, 'We stretch our arms up towards the ___.', 'sky', ['floor', 'river']),
    t(2, 'Before we run and play, we should ___.', 'stretch', ['sleep', 'eat a lot']),
    t(3, 'Stretching helps our muscles to be ___.', 'ready to move', ['sleepy', 'cold']),
    t(4, 'When we touch our toes, we bend our ___.', 'body forward', ['ears', 'eyes']),
    t(5, 'Which is a safe way to stretch?', 'slowly and gently', ['very fast and jerky', 'while running on the road']),
  ],
  'c-jump': [
    t(1, 'Jumping on one foot is called ___.', 'hopping', ['crawling', 'walking']),
    t(2, 'When we land, we bend our ___.', 'knees', ['ears', 'fingers']),
    t(3, 'Where is the safest place to jump?', 'on soft grass', ['on stones', 'on the road']),
    t(4, 'Why do we land softly?', 'so we do not get hurt', ['so we can sleep', 'so the ground cries']),
    t(5, 'Kamau jumped 3 times and then 2 more times. How many jumps altogether?', '5', ['4', '6']),
  ],
  'c-games': [
    t(1, 'In a singing game we sing and ___.', 'play together', ['sleep', 'eat']),
    t(2, 'When playing in a circle, we hold hands ___.', 'gently', ['roughly', 'never']),
    t(3, 'A new friend wants to join the game. What should we do?', 'welcome them', ['send them away', 'laugh at them']),
    t(4, 'Why do we take turns in a game?', 'so everyone can play', ['so the game ends', 'so others cry']),
    tf(5, 'It is kind to let everyone join our game.', true),
  ],
  'c-catch': [
    a(1, 'Which one is safe to throw and catch?', 'ball', ['stone', 'cup']),
    t(2, 'To catch a ball, we keep our eyes on the ___.', 'ball', ['sky', 'shoes']),
    t(3, 'We should throw the ball ___ to a friend.', 'gently', ['at their face', 'very hard']),
    t(4, 'Your friend drops the ball. What should you say?', '"Good try!"', ['"You are bad!"', '"Go away!"']),
    t(5, 'Why should we not throw stones?', 'they can hurt people', ['they are too light', 'they are soft']),
  ],
  'c-rolls': [
    t(1, 'We roll on a soft ___.', 'mat', ['road', 'table']),
    t(2, 'Standing on one leg without falling is called ___.', 'balancing', ['sleeping', 'singing']),
    t(3, 'When balancing, we stretch our arms out to ___.', 'stay steady', ['fly', 'wave']),
    t(4, 'Before rolling, we check that the mat is ___.', 'clear', ['wet', 'broken']),
    t(5, 'Why do we roll one at a time?', 'so we do not bump into each other', ['so the game takes a long time', 'so we all get very tired', 'so the mat does not move']),
  ],
  'c-water': [
    t(1, 'We play near water only with an ___.', 'adult', ['animal', 'empty bucket']),
    t(2, 'Is it safe to play near a deep river alone?', 'No', ['Yes']),
    t(3, 'Why should we not run near a swimming pool?', 'the floor is slippery', ['the water is blue', 'it is too sunny']),
    t(4, 'You see a child in deep water. What should you do?', 'shout for an adult', ['jump in alone', 'walk away']),
    tf(5, 'We should always tell a grown-up before going near water.', true),
  ],
  'c-instruments': [
    a(1, 'Which one is a musical instrument?', 'drum', ['cup', 'shoe']),
    a(2, 'Which one do we ring?', 'bell', ['drum', 'ball']),
    t(3, 'We can make a shaker by putting stones or seeds in a ___.', 'closed tin', ['plate', 'bag of water']),
    t(4, 'We play a drum by ___ it.', 'beating', ['blowing', 'reading']),
    t(5, 'Why should we keep instruments in a safe place after playing?', 'so they do not break', ['so they sing alone', 'so they get wet']),
  ],
  'r-self': [
    t(1, 'Who made me?', 'God', ['my friend', 'my teacher']),
    t(2, 'I have a name. My name makes me ___.', 'special', ['sad', 'sleepy']),
    t(3, 'We take care of our bodies by ___.', 'bathing', ['eating soil', 'never sleeping']),
    t(4, 'Everyone is special because ___.', 'God made each of us', ['some are tall', 'some are rich']),
    t(5, 'A friend cannot hear well. How should we treat them?', 'with love and kindness', ['laugh at them', 'leave them alone']),
  ],
  'r-family': [
    t(1, 'Who gave us our family?', 'God', ['the market', 'the shop']),
    t(2, 'My mother\'s mother is my ___.', 'grandmother', ['sister', 'aunt']),
    t(3, 'Which shows love at home?', 'helping Mama', ['fighting', 'hiding food']),
    t(4, 'We should ___ our parents.', 'obey', ['shout at', 'ignore']),
    t(5, 'Your baby brother is crying. What can you do?', 'call Mama and be kind to him', ['shout at him to stop crying', 'take his toy and go away', 'close the door and go out']),
  ],
  'r-creation': [
    t(1, 'Who made the trees?', 'God', ['people', 'cars']),
    a(2, 'Which one did God make?', 'tree', ['cup', 'chair']),
    t(3, 'How can we care for God\'s plants?', 'by watering them', ['by burning them', 'by stepping on them']),
    t(4, 'How should we treat animals?', 'kindly', ['roughly', 'carelessly']),
    t(5, 'Why should we not throw rubbish in rivers?', 'God made rivers and fish live there', ['rivers like to carry rubbish away', 'fish like to play with plastic', 'rubbish makes the river bigger']),
  ],
  'r-bible': [
    t(1, 'The Bible is God\'s ___.', 'book', ['shoe', 'cup']),
    t(2, 'We read the Bible to learn about ___.', 'God', ['football', 'cars']),
    t(3, 'Noah took animals into the ___.', 'ark', ['house', 'school']),
    t(4, 'David looked after ___.', 'sheep', ['cars', 'fish']),
    t(5, 'Why should we keep the Bible clean?', 'it is God\'s special book', ['it is very heavy', 'it is a toy']),
  ],
  'r-jesus': [
    t(1, 'Jesus was born in ___.', 'Bethlehem', ['Nairobi', 'Mombasa']),
    t(2, 'The mother of Jesus is ___.', 'Mary', ['Eve', 'Sarah']),
    t(3, 'Baby Jesus slept in a ___.', 'manger', ['bed of gold', 'boat']),
    t(4, 'Who told the shepherds that Jesus was born?', 'angels', ['soldiers', 'fishermen']),
    t(5, 'We celebrate the birth of Jesus on ___.', 'Christmas Day', ['Madaraka Day', 'Labour Day']),
  ],
  'r-living': [
    t(1, 'We talk to God through ___.', 'prayer', ['shouting', 'sleeping']),
    t(2, 'We pray before we ___.', 'eat', ['fight', 'shout']),
    t(3, 'When someone gives us something, we say ___.', 'thank you', ['go away', 'no']),
    t(4, 'Your friend has no pencil. What should you do?', 'share yours', ['laugh', 'hide yours']),
    t(5, 'You broke a cup by mistake. What should you do?', 'say sorry and tell the truth', ['hide it and say nothing', 'say your sister broke it', 'throw it out of the window']),
  ],
  'r-church': [
    t(1, 'Christians go to ___ to worship God.', 'church', ['the market', 'the river']),
    t(2, 'In church we ___ songs to praise God.', 'sing', ['shout', 'cry']),
    t(3, 'The person who leads prayers in church is the ___.', 'pastor', ['driver', 'butcher']),
    t(4, 'How should we behave in church?', 'sit quietly and listen', ['run around', 'fight']),
    t(5, 'Why do Christians go to church?', 'to worship God together', ['to play football', 'to buy food']),
  ],
}
