import { An, an } from '../helpers'
// Grade 2 Environmental Activities, Creative Activities and CRE: checked fact tables (turned
// into many questions by factGenerator) plus written "what should you do" questions.
import { labelOptions as opts } from '../generators/english'
import { factGenerator, type FactSet } from '../facts'
import type { BankQuestion, Generator, Level } from '../types'

const t = (level: Level, prompt: string, answer: string, wrong: string[]): BankQuestion => ({ type: 'choice', level, prompt, options: opts([answer, ...wrong]), answer })
const tf = (level: Level, statement: string, truth: boolean): BankQuestion => t(level, `True or False?\n${statement}`, truth ? 'True' : 'False', [truth ? 'False' : 'True'])

const FACTS: Record<string, FactSet> = {
  // ── Environmental ─────────────────────────────────────────────────────────
  'sv-home': {
    categories: [
      { one: 'a personal item', many: 'personal items', items: ['toothbrush', 'comb', 'towel', 'school uniform', 'handkerchief', 'underwear'] },
      { one: 'a shared item at home', many: 'shared items at home', items: ['chair', 'table', 'television', 'cooking pot', 'radio', 'broom'] },
    ],
    pairs: [
      {
        pairs: [
          ['the kitchen', 'cook food'],
          ['the bedroom', 'sleep'],
          ['the bathroom', 'wash our bodies'],
          ['the sitting room', 'sit and welcome visitors'],
          ['the store', 'keep food and tools'],
        ],
        ask: (a) => `At home we use ${a} to ___.`,
        askBack: (b) => `Which room do we use to ${b}?`,
      },
      {
        pairs: [
          ['a broom', 'sweep the floor'],
          ['a duster', 'wipe tables'],
          ['a mop', 'clean the floor with water'],
          ['a dustbin', 'keep rubbish'],
          ['soap and water', 'wash dishes'],
        ],
        ask: (a) => `We use ${a} to ___.`,
        askBack: (b) => `What do we use to ${b}?`,
      },
    ],
  },
  'sv-needs': {
    categories: [
      { one: 'a family need', many: 'family needs', items: ['food', 'water', 'clothes', 'a house', 'medicine', 'clean air', 'love and care', 'sleep and rest'] },
      { one: 'a family want', many: 'family wants', items: ['sweets', 'a toy', 'a television', 'a big car', 'soda', 'a video game', 'a phone', 'a new bicycle'] },
    ],
  },
  'sv-school': {
    categories: [
      { one: 'a person who works in a school', many: 'people who work in a school', items: ['teacher', 'head teacher', 'cook', 'watchman', 'cleaner', 'librarian'] },
      { one: 'a place in a school', many: 'places in a school', items: ['classroom', 'library', 'playground', 'staffroom', 'kitchen', 'toilet'] },
      { one: 'a way of keeping the school clean', many: 'ways of keeping the school clean', items: ['sweeping classrooms', 'picking litter', 'cleaning toilets', 'watering flowers', 'using the dustbin'], set: 'b' },
      { one: 'a way of making the school dirty', many: 'ways of making the school dirty', items: ['throwing litter', 'writing on walls', 'spitting on the floor', 'leaving taps open'], set: 'b' },
    ],
    pairs: [
      {
        pairs: [
          ['the teacher', 'teaches us'],
          ['the cook', 'prepares our meals'],
          ['the watchman', 'guards the school'],
          ['the head teacher', 'leads the school'],
          ['the librarian', 'looks after the books'],
        ],
        ask: (a) => `In school, ${a} ___.`,
        askBack: (b) => `Who ${b} at school?`,
      },
    ],
  },
  'sv-flag': {
    pairs: [
      {
        pairs: [
          ['black', 'the people of Kenya'],
          ['red', 'the sacrifices for our freedom'],
          ['green', 'our land and its plants'],
          ['white', 'peace and honesty'],
        ],
        ask: (a) => `On our flag, the colour ${a} stands for ___.`,
        askBack: (b) => `Which colour on the flag stands for ${b}?`,
      },
    ],
    categories: [
      { one: 'a colour on the Kenyan flag', many: 'colours on the Kenyan flag', items: ['black', 'red', 'green', 'white'] },
      { one: 'a colour NOT on the Kenyan flag', many: 'colours not on the Kenyan flag', items: ['blue', 'yellow', 'orange', 'purple', 'pink'] },
      { one: 'a way to respect the flag', many: 'ways to respect the flag', items: ['stand still when it is raised', 'keep it clean', 'never tear it', 'sing the anthem when it is raised'], set: 'b' },
      { one: 'a way of disrespecting the flag', many: 'ways of disrespecting the flag', items: ['tearing it', 'stepping on it', 'drawing on it', 'using it as a rag'], set: 'b' },
    ],
  },
  'sv-rights': {
    categories: [
      { one: 'a right of a child', many: 'rights of a child', items: ['education', 'food', 'shelter', 'medical care', 'play', 'love and care', 'a name', 'clean water'] },
      { one: 'a responsibility of a child', many: 'responsibilities of a child', items: ['doing homework', 'obeying parents', 'keeping the home clean', 'respecting others', 'helping with small chores', 'going to school on time', 'caring for my books', 'being kind to others'] },
    ],
  },
  'sv-market': {
    categories: [
      { one: 'a thing sold at the market', many: 'things sold at the market', items: ['tomatoes', 'onions', 'bananas', 'cabbages', 'clothes', 'shoes', 'chickens'] },
      { one: 'a thing we do NOT buy at the market', many: 'things we do not buy at the market', items: ['the sun', 'rain', 'air', 'our friends', 'the moon'] },
    ],
    pairs: [
      {
        pairs: [
          ['a seller', 'sells goods'],
          ['a buyer', 'pays money for goods'],
          ['a butcher', 'sells meat'],
          ['a fishmonger', 'sells fish'],
          ['a tailor', 'sews clothes'],
        ],
        ask: (a) => `At the market, ${a} ___.`,
        askBack: (b) => `Who ${b} at the market?`,
      },
    ],
  },
  'sv-weather': {
    categories: [
      { one: 'a thing we use when it rains', many: 'things we use when it rains', items: ['umbrella', 'raincoat', 'gumboots'] },
      { one: 'a thing we wear when it is cold', many: 'things we wear when it is cold', items: ['sweater', 'jacket', 'scarf', 'warm socks'] },
      { one: 'a thing we use when it is sunny', many: 'things we use when it is sunny', items: ['sunhat', 'light clothes', 'sandals', 'sunglasses'] },
    ],
    pairs: [
      {
        pairs: [
          ['the sky is grey and water falls', 'rainy'],
          ['the sun shines brightly', 'sunny'],
          ['trees are moving and leaves are blowing', 'windy'],
          ['the sky is covered with clouds', 'cloudy'],
        ],
        ask: (a) => `When ${a}, the weather is ___.`,
      },
    ],
  },
  'sv-soil': {
    categories: [
      { one: 'a kind of soil', many: 'kinds of soil', items: ['sand', 'clay', 'loam'], set: 'a' },
      { one: 'a thing that is not soil', many: 'things that are not soil', items: ['water', 'air', 'glass', 'plastic'], set: 'a' },
      { one: 'a thing made from clay', many: 'things made from clay', items: ['a pot', 'a bowl', 'a cup', 'a toy animal', 'a brick'] },
      { one: 'a thing made from wood', many: 'things made from wood', items: ['a chair', 'a door', 'a table', 'a cooking stick', 'a stool'] },
      { one: 'a way of caring for soil', many: 'ways of caring for soil', items: ['planting trees', 'adding manure', 'not throwing plastics', 'planting grass'], set: 'b' },
      { one: 'a way of harming soil', many: 'ways of harming soil', items: ['burning grass', 'throwing plastic bags', 'cutting all the trees', 'pouring oil on the ground'], set: 'b' },
    ],
    pairs: [
      {
        pairs: [
          ['clay', 'sticky when wet'],
          ['sand', 'rough and loose'],
          ['loam', 'dark and good for crops'],
        ],
        ask: (a) => `What is ${a} soil like?`,
        askBack: (b) => `Which soil is ${b}?`,
      },
    ],
  },
  'sv-light': {
    categories: [
      { one: 'a source of light', many: 'sources of light', items: ['the sun', 'a torch', 'a lamp', 'a candle', 'an electric bulb', 'a fire'] },
      { one: 'a thing that does NOT give light', many: 'things that do not give light', items: ['a chair', 'a book', 'a stone', 'a cup', 'a mirror', 'a window'] },
      { one: 'a way of caring for our eyes', many: 'ways of caring for our eyes', items: ['not looking straight at the sun', 'reading in good light', 'not rubbing them with dirty hands', 'washing our face'], set: 'b' },
      { one: 'a habit that can harm our eyes', many: 'habits that can harm our eyes', items: ['looking straight at the sun', 'reading in the dark', 'rubbing eyes with dirty hands', 'sitting too close to the TV'], set: 'b' },
    ],
  },
  'sv-water': {
    categories: [
      { one: 'a source of water', many: 'sources of water', items: ['rain', 'a river', 'a lake', 'a well', 'a tap', 'a spring'] },
      { one: 'a use of water', many: 'uses of water', items: ['drinking', 'cooking', 'bathing', 'washing clothes', 'watering plants'] },
      { one: 'a way of saving water', many: 'ways of saving water', items: ['closing the tap', 'fixing leaking taps', 'using a cup when brushing teeth', 're-using water'], set: 'b' },
      { one: 'a way of wasting water', many: 'ways of wasting water', items: ['leaving the tap open', 'pouring away clean water', 'playing with a hosepipe', 'washing a car every day'], set: 'b' },
    ],
  },
  'sv-plants': {
    categories: [
      { one: 'a part of a plant', many: 'parts of a plant', items: ['root', 'stem', 'leaf', 'flower', 'fruit', 'seed'], set: 'p' },
      { one: 'a thing that is not part of a plant', many: 'things that are not parts of a plant', items: ['stone', 'soil', 'water', 'plastic'], set: 'p' },
      { one: 'a plant we eat', many: 'plants we eat', items: ['maize', 'beans', 'sukuma wiki', 'cabbage', 'carrot', 'banana'] },
      { one: 'a way of caring for plants', many: 'ways of caring for plants', items: ['watering', 'weeding', 'adding manure', 'fencing'], set: 'b' },
      { one: 'a way of harming plants', many: 'ways of harming plants', items: ['stepping on them', 'pulling off leaves', 'letting goats eat them', 'breaking branches'], set: 'b' },
      { one: 'a tree we grow for shade or timber', many: 'trees we grow for shade or timber', items: ['cypress', 'eucalyptus', 'grevillea', 'jacaranda'] },
    ],
    pairs: [
      {
        pairs: [
          ['roots', 'hold the plant in the soil'],
          ['leaves', 'make food for the plant'],
          ['flowers', 'turn into fruits'],
          ['stems', 'hold the plant up'],
        ],
        ask: (a) => `What do ${a} do? They ___.`,
        askBack: (b) => `Which part of a plant helps to ${b}?`,
      },
    ],
  },
  'sv-animals': {
    categories: [
      { one: 'a domestic animal', many: 'domestic animals', items: ['cow', 'goat', 'sheep', 'dog', 'cat', 'hen', 'donkey'] },
      { one: 'a wild animal', many: 'wild animals', items: ['lion', 'elephant', 'zebra', 'giraffe', 'leopard', 'hyena', 'buffalo'] },
    ],
    pairs: [
      {
        pairs: [
          ['cow', 'calf'],
          ['goat', 'kid'],
          ['hen', 'chick'],
          ['dog', 'puppy'],
          ['cat', 'kitten'],
          ['sheep', 'lamb'],
        ],
        ask: (a) => `The young one of ${an(a)} is a ___.`,
        askBack: (b) => `${An(b)} is the young one of a ___.`,
      },
      {
        pairs: [
          ['cow', 'moos'],
          ['dog', 'barks'],
          ['cat', 'mews'],
          ['lion', 'roars'],
          ['donkey', 'brays'],
          ['hen', 'clucks'],
        ],
        ask: (a) => `${An(a)} ___.`,
        askBack: (b) => `Which animal ${b}?`,
      },
    ],
  },

  // ── Creative ──────────────────────────────────────────────────────────────
  'sc-picture': {
    categories: [
      { one: 'a tool for picture making', many: 'tools for picture making', items: ['pencil', 'crayon', 'paint brush', 'charcoal', 'paper'] },
      { one: 'a thing we can print with', many: 'things we can print with', items: ['a leaf', 'our thumb', 'a cut potato', 'a bottle top'] },
    ],
    pairs: [
      {
        pairs: [
          ['blue and yellow', 'green'],
          ['red and yellow', 'orange'],
          ['red and blue', 'purple'],
          ['red and white', 'pink'],
        ],
        ask: (a) => `Mixing ${a} gives ___.`,
        askBack: (b) => `Which two colours make ${b}?`,
      },
    ],
  },
  'sc-rhythm': {
    categories: [
      { one: 'a way to make a beat with our body', many: 'ways to make a beat with our body', items: ['clapping', 'stamping', 'tapping our knees', 'snapping our fingers', 'patting our chest', 'clicking our tongue', 'tapping our feet'] },
      { one: 'an instrument we beat or shake', many: 'instruments we beat or shake', items: ['drum', 'shaker', 'tambourine', 'kayamba', 'leg rattles', 'bottle-top shaker', 'isukuti'] },
    ],
    pairs: [
      {
        pairs: [
          ['clap, clap, stamp, clap, clap,', 'stamp'],
          ['clap, stamp, clap, stamp,', 'clap'],
          ['stamp, stamp, clap, stamp, stamp,', 'clap'],
          ['tap, clap, tap, clap,', 'tap'],
        ],
        ask: (a) => `What comes next? ${a} ___`,
      },
    ],
  },
  'sc-melody': {
    categories: [
      { one: 'a high sound', many: 'high sounds', items: ['a bird singing', 'a whistle', 'a chick', 'a small bell', 'a baby crying', 'a mouse squeaking', 'a flute'] },
      { one: 'a low sound', many: 'low sounds', items: ['a big drum', 'a lion roaring', 'thunder', 'a cow mooing', 'a lorry engine', 'a man\'s deep voice', 'a frog croaking'] },
    ],
    pairs: [
      {
        pairs: [
          ['a lullaby', 'helps a baby sleep'],
          ['a hymn', 'praises God'],
          ['a game song', 'is sung while playing'],
          ['a work song', 'makes work easier'],
        ],
        ask: (a) => `Why do we sing ${a}? It ___.`,
        askBack: (b) => `Which song ${b}?`,
      },
    ],
  },
  'sc-games': {
    categories: [
      { one: 'a good rule in a singing game', many: 'good rules in a singing game', items: ['take turns', 'sing together', 'follow the leader', 'play gently', 'hold hands in the circle', 'let everyone join', 'listen to the song', 'smile and have fun'] },
      { one: 'a bad thing to do in a game', many: 'bad things to do in a game', items: ['pushing others', 'shouting over others', 'refusing to share', 'cheating', 'laughing at mistakes', 'leaving others out', 'grabbing hands roughly', 'running off with the ball'] },
    ],
  },
  'sc-movement': {
    categories: [
      { one: 'a way of moving from place to place', many: 'ways of moving from place to place', items: ['walking', 'running', 'jumping', 'hopping', 'skipping', 'crawling', 'galloping', 'marching', 'tiptoeing'] },
      { one: 'a way of moving on the spot', many: 'ways of moving on the spot', items: ['turning', 'bending', 'stretching', 'twisting', 'arm swinging', 'nodding', 'hand shaking', 'shoulder rolling'] },
    ],
  },
  'sc-ball': {
    categories: [
      { one: 'a ball skill', many: 'ball skills', items: ['throwing', 'catching', 'kicking', 'rolling', 'bouncing', 'dribbling', 'passing', 'heading'] },
      { one: 'a safety rule for ball games', many: 'safety rules for ball games', items: ['play on clear ground', 'do not throw at faces', 'warm up first', 'wait for your turn', 'use a soft ball', 'keep away from roads', 'stop at the whistle'], set: 'b' },
      { one: 'an unsafe thing in ball games', many: 'unsafe things in ball games', items: ['throwing at faces', 'playing near the road', 'kicking stones', 'pushing during the game'], set: 'b' },
    ],
    pairs: [
      {
        pairs: [
          ['kick', 'feet'],
          ['catch', 'hands'],
          ['head', 'head'],
          ['bounce', 'hands'],
        ],
        ask: (a) => `We ${a} a ball with our ___.`,
      },
    ],
  },
  'sc-water': {
    categories: [
      { one: 'a safe thing to do near water', many: 'safe things to do near water', items: ['stay with an adult', 'walk, do not run', 'keep away from deep water', 'listen to the teacher', 'wear a float when learning', 'swim only in a pool', 'stay where your feet touch the floor', 'shower before swimming'] },
      { one: 'a dangerous thing to do near water', many: 'dangerous things to do near water', items: ['swimming alone', 'playing near a deep river', 'pushing friends in', 'running on wet floors', 'swimming in a flooded river', 'diving into shallow water', 'playing near an open well', 'swimming after a big meal'] },
    ],
  },
  'sc-songs': {
    categories: [
      { one: 'a way of showing respect for the anthem', many: 'ways of showing respect for the anthem', items: ['standing still', 'standing upright', 'singing clearly', 'keeping quiet before it starts'] },
      { one: 'a sign of disrespect during the anthem', many: 'signs of disrespect during the anthem', items: ['talking', 'laughing', 'walking around', 'eating'] },
    ],
    pairs: [
      {
        pairs: [
          ['a patriotic song', 'shows love for Kenya'],
          ['a lullaby', 'helps a baby sleep'],
          ['a hymn', 'praises God'],
          ['a game song', 'is sung while playing'],
        ],
        ask: (a) => `Why do we sing ${a}? It ___.`,
        askBack: (b) => `Which song ${b}?`,
      },
    ],
  },

  // ── CRE ───────────────────────────────────────────────────────────────────
  'sr-self': {
    categories: [
      { one: 'a part of my body God gave me', many: 'parts of my body God gave me', items: ['eyes', 'ears', 'hands', 'legs', 'mouth', 'nose'], set: 'p' },
      { one: 'a thing that is not part of my body', many: 'things that are not parts of my body', items: ['a shoe', 'a hat', 'a book', 'a cup'], set: 'p' },
      { one: 'a way of caring for my body', many: 'ways of caring for my body', items: ['bathing', 'brushing my teeth', 'eating good food', 'sleeping well', 'washing my hands'], set: 'b' },
      { one: 'a way of harming my body', many: 'ways of harming my body', items: ['eating too many sweets', 'not bathing', 'sleeping very late', 'playing with sharp knives'], set: 'b' },
    ],
    pairs: [
      {
        pairs: [
          ['eyes', 'see'],
          ['ears', 'hear'],
          ['nose', 'smell'],
          ['mouth', 'eat and talk'],
          ['legs', 'walk'],
          ['hands', 'hold things'],
        ],
        ask: (a) => `God gave me ${a} to ___.`,
        askBack: (b) => `God gave me which part of the body to ${b}?`,
      },
    ],
  },
  'sr-family': {
    categories: [
      { one: 'a family member', many: 'family members', items: ['father', 'mother', 'brother', 'sister', 'grandmother', 'grandfather'] },
      { one: 'a person outside the family', many: 'people outside the family', items: ['the teacher', 'the shopkeeper', 'the doctor', 'the bus driver', 'the policeman'] },
      { one: 'a way to show love at home', many: 'ways to show love at home', items: ['helping with chores', 'sharing', 'saying sorry', 'obeying parents', 'praying together'], set: 'b' },
      { one: 'a way of hurting the family', many: 'ways of hurting the family', items: ['fighting with siblings', 'lying to parents', 'refusing to help', 'shouting at grandparents'], set: 'b' },
    ],
    pairs: [
      {
        pairs: [
          ["my father's father", 'grandfather'],
          ["my mother's mother", 'grandmother'],
          ["my mother's son", 'brother'],
          ["my father's daughter", 'sister'],
        ],
        ask: (a) => `${a[0].toUpperCase()}${a.slice(1)} is my ___.`,
      },
    ],
  },
  'sr-creation': {
    categories: [
      { one: 'a thing God made in the sky', many: 'things God made in the sky', items: ['the sun', 'the moon', 'the stars', 'the clouds'] },
      { one: 'a thing people made', many: 'things people made', items: ['a house', 'a car', 'a chair', 'a book', 'a radio'] },
    ],
    pairs: [
      {
        pairs: [
          ['the sun', 'gives us light and heat'],
          ['the moon', 'shines at night'],
          ['the stars', 'twinkle in the night sky'],
          ['the clouds', 'bring us rain'],
        ],
        ask: (a) => `God made ${a}. It ___.`,
        askBack: (b) => `Which one ${b}?`,
      },
    ],
  },
  'sr-bible': {
    categories: [
      { one: 'a way of caring for the Bible', many: 'ways of caring for the Bible', items: ['keeping it clean', 'not tearing it', 'covering it', 'keeping it in a safe place'], set: 'b' },
      { one: 'a way of mistreating the Bible', many: 'ways of mistreating the Bible', items: ['tearing pages', 'drawing in it', 'leaving it in the rain', 'throwing it on the floor'], set: 'b' },
      { one: 'a thing in a Bible story', many: 'things in Bible stories', items: ['the ark', 'a big fish', 'a sling and a stone', 'a burning bush'] },
      { one: 'a person in a Bible story', many: 'people in Bible stories', items: ['Noah', 'Abraham', 'Moses', 'David', 'Samuel', 'Jonah'] },
    ],
    pairs: [
      {
        pairs: [
          ['Noah', 'built a big boat called the ark'],
          ['David', 'was a brave shepherd boy who defeated Goliath'],
          ['Samuel', 'heard God calling him at night'],
          ['Jonah', 'was swallowed by a big fish'],
          ['Moses', 'led God\'s people out of Egypt'],
        ],
        ask: (a) => `In the Bible, ${a} ___.`,
        askBack: (b) => `Who ${b}?`,
      },
    ],
  },
  'sr-jesus': {
    categories: [
      { one: 'a person in the story of Jesus\' birth', many: 'people in the story of Jesus\' birth', items: ['Mary', 'Joseph', 'the shepherds', 'the angels', 'the wise men', 'baby Jesus'] },
      { one: 'a person from another Bible story', many: 'people from other Bible stories', items: ['Noah', 'Moses', 'David', 'Jonah', 'Daniel', 'Samuel'] },
    ],
    pairs: [
      {
        pairs: [
          ['Bethlehem', 'the town where Jesus was born'],
          ['Nazareth', 'the town where Jesus grew up'],
          ['Mary', 'the mother of Jesus'],
          ['Joseph', 'the carpenter who cared for Jesus'],
          ['a manger', "the animals' feeding box where baby Jesus was laid"],
          ['shepherds', 'the people who first heard about baby Jesus from angels'],
        ],
        ask: (a) => `Who or what is ${a}?`,
        askBack: (b) => `What is the name of ${b}?`,
      },
    ],
  },
  'sr-living': {
    categories: [
      { one: 'a good deed', many: 'good deeds', items: ['sharing food', 'helping a friend', 'saying thank you', 'telling the truth', 'obeying parents', 'praying', 'forgiving others'] },
      { one: 'a bad deed', many: 'bad deeds', items: ['stealing', 'lying', 'fighting', 'calling others bad names', 'disobeying', 'cheating', 'being rude'] },
    ],
    pairs: [
      {
        pairs: [
          ['before meals', 'thank God for the food'],
          ['before sleeping', 'thank God for the day'],
          ['when someone is sick', 'pray for them'],
          ['when we wake up', 'thank God for a new day'],
        ],
        ask: (a) => `We pray ${a} to ___.`,
      },
    ],
  },
}

export const GRADE2_FACT_GENERATORS: Record<string, Generator> = Object.fromEntries(Object.entries(FACTS).map(([id, set]) => [id, factGenerator(set)]))

// Written questions: situations and reasoning that tables cannot make.
export const GRADE2_BANKS: Record<string, BankQuestion[]> = {
  'sv-home': [
    t(3, 'Why should each person have their own toothbrush?', 'to stop germs spreading', ['to make the bathroom full', 'because toothbrushes are cheap']),
    t(4, 'Mama has finished cooking. Where should the knives be kept?', 'in a safe place away from children', ['on the floor near the door', 'under the pillow on the bed', 'on the table where we eat']),
    tf(5, 'Medicine should be kept where small children can reach it.', false),
  ],
  'sv-needs': [
    t(3, 'Which one do we need to live?', 'water', ['sweets', 'a toy']),
    t(4, 'How does a family get food?', 'by farming or buying it', ['by waiting', 'by sleeping', 'by watching TV']),
    t(5, 'Baba has only enough money for one thing. What should he buy?', 'food for the family', ['a new radio', 'sweets', 'a toy car']),
  ],
  'sv-school': [
    t(3, 'Achieng fell and cut her knee in the playground. What should she do first?', 'tell the teacher', ['keep playing', 'hide']),
    t(4, 'Which can cause an accident at school?', 'running on a wet floor', ['walking slowly', 'sitting down', 'reading a book']),
    t(5, 'You see broken glass in the playground. What should you do?', 'tell a teacher so it is removed safely', ['pick it up with bare hands', 'kick it away', 'ignore it']),
  ],
  'sv-flag': [
    t(3, 'How many colours are on the Kenyan flag?', '4', ['3', '5']),
    t(4, 'What is in the middle of the Kenyan flag?', 'a shield and two spears', ['a lion', 'a star', 'a tree']),
    tf(5, 'We should stand still when the flag is being raised.', true),
  ],
  'sv-rights': [
    t(3, 'Every child has a right to go to ___.', 'school', ['work', 'the bar']),
    t(4, 'Who should take care of children?', 'parents and guardians', ['strangers', 'nobody', 'other children only']),
    t(5, 'Kendi is kept at home to sell vegetables instead of going to school. Which right is she missing?', 'the right to education', ['the right to play', 'the right to a name', 'the right to food']),
  ],
  'sv-market': [
    t(3, 'What do we use to buy things at the market?', 'money', ['stones', 'leaves']),
    t(4, 'A tomato costs 10 shillings. How much do 3 tomatoes cost?', '30 shillings', ['13 shillings', '20 shillings', '10 shillings']),
    t(5, 'Why should we wash fruits bought from the market before eating?', 'to remove dirt and germs', ['to make them sweeter', 'to make them bigger', 'to change their colour']),
  ],
  'sv-weather': [
    t(3, 'We should not stand under a tree when there is ___.', 'lightning', ['sunshine', 'a breeze']),
    t(4, 'Which weather is best for drying clothes?', 'sunny and windy', ['rainy', 'cloudy and still', 'foggy']),
    t(5, 'The sky is dark and grey in the morning. What should Amani take to school?', 'an umbrella', ['sunglasses', 'a sunhat', 'a fan']),
  ],
  'sv-soil': [
    t(3, 'Which soil is best for making pots?', 'clay', ['sand', 'loam']),
    t(4, 'When we mix soil and water we get ___.', 'mud', ['milk', 'dust', 'sand']),
    t(5, 'Water passes through which soil fastest?', 'sand', ['clay', 'loam', 'mud']),
  ],
  'sv-light': [
    t(3, 'The biggest source of light during the day is the ___.', 'sun', ['moon', 'candle']),
    t(4, 'Why should we not read in the dark?', 'it hurts our eyes', ['the book will tear', 'it is too noisy', 'it makes us hungry']),
    t(5, 'The power went off at night. Which is the safest light to use?', 'a torch', ['a burning paper', 'a match stick', 'a fire in the house']),
  ],
  'sv-water': [
    t(3, 'Which water is safe to drink?', 'boiled water', ['water from a puddle', 'dirty river water']),
    t(4, 'Where should we keep drinking water?', 'in a clean covered container', ['in an open bucket outside', 'in an old paint tin', 'in a used plastic bag']),
    t(5, 'A tap is leaking at school. What should you do?', 'tell the teacher so it is repaired', ['leave it because it is not yours', 'open it more to see the water', 'play with the water at break time']),
  ],
  'sv-plants': [
    t(3, 'Plants need water, air and ___ to grow.', 'sunlight', ['plastic', 'darkness']),
    t(4, 'Which part of a cassava plant do we eat?', 'the root', ['the flower', 'the leaf', 'the seed']),
    t(5, 'Why do farmers put a fence around young trees?', 'to stop animals eating them', ['to make them grow faster', 'to keep the rain away', 'to hide them']),
  ],
  'sv-animals': [
    t(3, 'Where do wild animals live?', 'in the forest and parks', ['in our houses', 'in classrooms']),
    t(4, 'Which animal gives us eggs?', 'hen', ['cow', 'dog', 'goat']),
    t(5, 'Why should we not go near wild animals?', 'they can hurt us', ['they are sleepy', 'they are small', 'they like children']),
  ],
  'sc-picture': [
    t(3, 'What do we clean after painting?', 'the brush', ['the ruler', 'the chair']),
    t(4, 'Pressing a leaf with paint on paper to make a picture is called ___.', 'printing', ['singing', 'weaving', 'cooking']),
    t(5, 'Why do we put old newspaper on the desk before painting?', 'to keep the desk clean', ['to read it', 'to make the paint dry', 'to make the picture bigger']),
  ],
  'sc-rhythm': [
    t(3, 'The steady pulse in music, like a heartbeat, is the ___.', 'beat', ['colour', 'shape']),
    t(4, 'A song played very fast has a fast ___.', 'tempo', ['colour', 'height', 'shape']),
    t(5, 'Which keeps a steady beat best?', 'clapping at the same speed', ['clapping faster and faster', 'clapping only once', 'shouting']),
  ],
  'sc-melody': [
    t(3, 'A song sung to make a baby sleep is a ___.', 'lullaby', ['march', 'race']),
    t(4, 'Before singing we should ___.', 'warm up our voices', ['shout loudly', 'eat sweets', 'run around']),
    t(5, 'Which is the best way to sing in class?', 'with a clear, gentle voice', ['shouting as loud as possible', 'whispering so nobody hears', 'singing a different song']),
  ],
  'sc-games': [
    t(3, 'In a singing game, we sing and ___.', 'move together', ['sleep', 'read']),
    t(4, 'Why do we take turns in a game?', 'so everyone can play', ['to finish quickly', 'to make others sad', 'to stop the game']),
    t(5, 'A new child wants to join your game. What should you do?', 'welcome them and teach them the song', ['tell them to wait until tomorrow', 'stop the game and go home', 'let them watch but not play']),
  ],
  'sc-movement': [
    t(3, 'Jumping on one leg is called ___.', 'hopping', ['crawling', 'walking']),
    t(4, 'Before running we should ___.', 'warm up', ['eat a big meal', 'sleep', 'sit still']),
    t(5, 'Why should we look around before we start running?', 'so we do not bump into others', ['so we can count the trees', 'so we can find our books', 'so we can see the clouds']),
  ],
  'sc-ball': [
    t(3, 'To catch a ball, keep your eyes on the ___.', 'ball', ['sky', 'ground']),
    t(4, 'Which is safest to play with?', 'a soft ball', ['a stone', 'a glass bottle', 'a stick with nails']),
    t(5, 'Your friend drops the ball. What should you do?', 'say "Good try!" and keep playing', ['laugh at them', 'take the ball and go home', 'shout at them']),
  ],
  'sc-water': [
    t(3, 'Children should swim only when an ___ is watching.', 'adult', ['animal', 'stranger']),
    t(4, 'Why should we not run near a swimming pool?', 'the floor is slippery', ['it is too sunny', 'the water will get hot', 'the pool will break']),
    t(5, 'You see a child struggling in water. What should you do?', 'shout for an adult to help', ['jump into the water yourself', 'throw stones into the water', 'walk away and say nothing']),
  ],
  'sc-songs': [
    t(3, 'The National Anthem is a prayer for ___.', 'Kenya', ['our toys', 'the market']),
    t(4, 'When do we sing the National Anthem at school?', 'at assembly', ['during lunch', 'at night', 'in the toilet']),
    t(5, 'Which shows respect during the National Anthem?', 'standing still and singing', ['talking to friends', 'sitting on the ground', 'running around']),
  ],
  'sr-self': [
    t(3, 'Who made me?', 'God', ['my friend', 'my teacher']),
    t(4, 'Everyone is special because ___.', 'God made each of us', ['some people are rich', 'some people are tall', 'some people are loud']),
    t(5, 'A classmate cannot walk well. How should we treat them?', 'with love, because God made them special too', ['kindly, but leave them out of running games', 'politely, but only when the teacher is near', 'the same as others, but without talking to them']),
  ],
  'sr-family': [
    t(3, 'Who gave us our families?', 'God', ['the teacher', 'the shopkeeper']),
    t(4, 'Which shows love in a family?', 'helping Mama to fetch water', ['fighting with your brother', 'hiding food', 'shouting at Baba']),
    t(5, 'Your little sister is crying because she is hungry. What should you do?', 'share your food and tell Mama', ['eat your food quickly first', 'go out to play with friends', 'tell her to stop crying now']),
  ],
  'sr-creation': [
    t(3, 'Who made the sun, moon and stars?', 'God', ['people', 'animals']),
    t(4, 'Which one shines during the day?', 'the sun', ['the moon', 'the stars', 'a torch']),
    t(5, 'How can we thank God for the things He made?', 'by praying and caring for them', ['by throwing litter', 'by cutting all trees', 'by wasting water']),
  ],
  'sr-bible': [
    t(3, 'The Bible is the word of ___.', 'God', ['a teacher', 'a king']),
    t(4, 'Who built the ark?', 'Noah', ['Moses', 'David', 'Jonah']),
    t(5, 'What does the story of Samuel teach us?', 'to listen when God calls', ['to sleep a lot', 'to run away', 'to be afraid of the dark']),
  ],
  'sr-jesus': [
    t(3, 'Jesus was born in a ___.', 'stable', ['palace', 'school']),
    t(4, 'Who told the shepherds that Jesus was born?', 'angels', ['soldiers', 'kings', 'fishermen']),
    t(5, 'As a boy, Jesus obeyed His parents. What does this teach us?', 'to obey our parents', ['to run away from home', 'to stay alone', 'to fight']),
  ],
  'sr-living': [
    t(3, 'We talk to God through ___.', 'prayer', ['shouting', 'sleeping']),
    t(4, 'Which is a good choice?', 'telling the truth', ['telling lies', 'stealing a pencil', 'fighting']),
    t(5, 'You find a lost pencil in class. What should you do?', 'give it to the teacher or the owner', ['keep it in your bag for later', 'use it and then throw it away', 'give it to your best friend']),
  ],
}
