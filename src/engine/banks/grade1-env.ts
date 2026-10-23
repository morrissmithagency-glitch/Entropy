import { an } from '../helpers'
// Fact tables for Grade 1 Environmental Activities. Read aloud, so items are short words a
// six-year-old knows. Mixed with the written questions in banks/environmental.ts.
import { factGenerator, type FactSet } from '../facts'
import type { Generator } from '../types'

const FACTS: Record<string, FactSet> = {
  'v-body': {
    categories: [
      { one: 'a thing we use to keep clean', many: 'things we use to keep clean', items: ['soap', 'water', 'towel', 'toothbrush', 'comb', 'nail cutter'] },
      { one: 'a thing we use to eat', many: 'things we use to eat', items: ['plate', 'spoon', 'cup', 'fork', 'bowl'] },
      { one: 'a good habit', many: 'good habits', items: ['washing hands', 'brushing teeth', 'bathing', 'cutting nails', 'combing hair'], set: 'b' },
      { one: 'a bad habit', many: 'bad habits', items: ['biting nails', 'eating with dirty hands', 'picking the nose', 'not bathing', 'spitting on the floor'], set: 'b' },
    ],
    pairs: [
      {
        pairs: [
          ['a toothbrush', 'brush our teeth'],
          ['soap', 'wash our hands'],
          ['a towel', 'dry our body'],
          ['a comb', 'comb our hair'],
          ['a nail cutter', 'cut our nails'],
        ],
        ask: (a) => `We use ${a} to ___.`,
        askBack: (b) => `What do we use to ${b}?`,
      },
    ],
  },
  'v-home': {
    categories: [
      { one: 'a room in a house', many: 'rooms in a house', items: ['kitchen', 'bedroom', 'bathroom', 'sitting room', 'store'], set: 'r' },
      { one: 'a thing we use at home', many: 'things we use at home', items: ['chair', 'cup', 'bed', 'spoon', 'table'], set: 'r' },
      { one: 'a person at home', many: 'people at home', items: ['father', 'mother', 'brother', 'sister', 'grandmother', 'baby'] },
      { one: 'a person at school', many: 'people at school', items: ['teacher', 'head teacher', 'cook', 'watchman', 'classmate'] },
    ],
    pairs: [
      {
        pairs: [
          ['the kitchen', 'cook'],
          ['the bedroom', 'sleep'],
          ['the bathroom', 'bathe'],
          ['the sitting room', 'sit with visitors'],
        ],
        ask: (a) => `We use ${a} to ___.`,
        askBack: (b) => `Which room do we use to ${b}?`,
      },
    ],
  },
  'v-needs': {
    categories: [
      { one: 'something we need', many: 'things we need', items: ['food', 'water', 'clothes', 'a house', 'love', 'medicine'] },
      { one: 'something we want', many: 'things we want', items: ['sweets', 'a toy', 'a big car', 'soda', 'a video game', 'a phone'] },
      { one: 'a thing we wear', many: 'things we wear', items: ['shirt', 'dress', 'shoes', 'socks', 'sweater', 'hat'], set: 'w' },
      { one: 'a thing we eat', many: 'things we eat', items: ['ugali', 'rice', 'beans', 'bread', 'mango', 'egg'], set: 'w' },
    ],
  },
  'v-school': {
    categories: [
      { one: 'a thing in a classroom', many: 'things in a classroom', items: ['desk', 'chair', 'chalkboard', 'chalk', 'books', 'pencils'] },
      { one: 'a thing in a kitchen', many: 'things in a kitchen', items: ['sufuria', 'jiko', 'plates', 'cooking stick', 'knife', 'kettle'] },
      { one: 'a way to keep school clean', many: 'ways to keep school clean', items: ['sweeping', 'picking litter', 'using the dustbin', 'wiping desks'], set: 'b' },
      { one: 'a way to make school dirty', many: 'ways to make school dirty', items: ['throwing litter', 'writing on walls', 'spitting', 'muddy shoes in class'], set: 'b' },
    ],
    pairs: [
      {
        pairs: [
          ['the teacher', 'teaches us'],
          ['the cook', 'cooks our food'],
          ['the watchman', 'guards the gate'],
          ['the head teacher', 'leads the school'],
        ],
        ask: (a) => `At school, ${a} ___.`,
        askBack: (b) => `Who ${b}?`,
      },
    ],
  },
  'v-market': {
    categories: [
      { one: 'a fruit sold at the market', many: 'fruits sold at the market', items: ['mangoes', 'oranges', 'bananas', 'pawpaws', 'pineapples', 'avocados'] },
      { one: 'a vegetable sold at the market', many: 'vegetables sold at the market', items: ['tomatoes', 'onions', 'cabbages', 'sukuma wiki', 'carrots', 'spinach'] },
      { one: 'an animal sold at the market', many: 'animals sold at the market', items: ['hens', 'goats', 'cows', 'sheep', 'ducks'] },
    ],
    pairs: [
      {
        pairs: [
          ['a seller', 'sells things'],
          ['a buyer', 'buys things'],
          ['a butcher', 'sells meat'],
          ['a tailor', 'sews clothes'],
        ],
        ask: (a) => `At the market, ${a} ___.`,
        askBack: (b) => `Who ${b}?`,
      },
    ],
  },
  'v-weather': {
    categories: [
      { one: 'a thing we see in the sky in the day', many: 'things we see in the sky in the day', items: ['the sun', 'a rainbow', 'white clouds', 'a blue sky'], set: 'sky' },
      { one: 'a thing we see in the sky at night', many: 'things we see in the sky at night', items: ['the moon', 'stars', 'a dark sky', 'a crescent moon'], set: 'sky' },
      { one: 'a thing we use when it rains', many: 'things we use when it rains', items: ['umbrella', 'raincoat', 'gumboots'], set: 'r' },
      { one: 'a thing we use when it is hot', many: 'things we use when it is hot', items: ['sunhat', 'sunglasses', 'light clothes', 'cold water'], set: 'r' },
    ],
    pairs: [
      {
        pairs: [
          ['the sun is shining', 'sunny'],
          ['water is falling from the clouds', 'rainy'],
          ['leaves are blowing about', 'windy'],
          ['the sky is grey with clouds', 'cloudy'],
        ],
        ask: (a) => `When ${a}, the weather is ___.`,
      },
    ],
  },
  'v-soil': {
    categories: [
      { one: 'a kind of soil', many: 'kinds of soil', items: ['sand', 'clay', 'loam'], set: 's' },
      { one: 'a thing that is not soil', many: 'things that are not soil', items: ['water', 'glass', 'plastic', 'air'], set: 's' },
      { one: 'a thing we make with clay', many: 'things we make with clay', items: ['a cooking pot', 'a water pot', 'a clay cup', 'a brick'], set: 'm' },
      { one: 'a thing made from wood', many: 'things made from wood', items: ['a chair', 'a door', 'a table', 'a stool', 'a cooking stick'], set: 'm' },
    ],
  },
  'v-sound': {
    categories: [
      { one: 'a loud sound', many: 'loud sounds', items: ['thunder', 'a drum', 'a lorry hooting', 'a lion roaring', 'a school bell'] },
      { one: 'a soft sound', many: 'soft sounds', items: ['a whisper', 'leaves rustling', 'a cat purring', 'rain drizzling', 'a clock ticking'] },
    ],
    pairs: [
      {
        pairs: [
          ['a cow', 'moo'],
          ['a dog', 'woof'],
          ['a cat', 'meow'],
          ['a hen', 'cluck'],
          ['a duck', 'quack'],
          ['a bee', 'buzz'],
          ['a lion', 'roar'],
        ],
        ask: (a) => `What sound does ${a} make?`,
        askBack: (b) => `Which animal says "${b}"?`,
      },
      {
        pairs: [
          ['ears', 'hear'],
          ['eyes', 'see'],
          ['nose', 'smell'],
        ],
        ask: (a) => `We use our ${a} to ___.`,
      },
    ],
  },
  'v-water': {
    categories: [
      { one: 'a place we get water from', many: 'places we get water from', items: ['a river', 'a tap', 'a well', 'a lake', 'rain', 'a spring'], set: 'u' },
      { one: 'a use of water', many: 'uses of water', items: ['drinking', 'cooking', 'bathing', 'washing clothes', 'watering plants'], set: 'u' },
      { one: 'a way of saving water', many: 'ways of saving water', items: ['closing the tap', 'using a cup to brush teeth', 're-using water', 'fixing a leaking tap'], set: 'b' },
      { one: 'a way of wasting water', many: 'ways of wasting water', items: ['leaving the tap open', 'pouring away clean water', 'playing with a hosepipe'], set: 'b' },
    ],
  },
  'v-plants': {
    categories: [
      { one: 'a part of a plant', many: 'parts of a plant', items: ['root', 'stem', 'leaf', 'flower', 'fruit', 'seed'], set: 'p' },
      { one: 'a thing that is not part of a plant', many: 'things that are not parts of a plant', items: ['stone', 'cup', 'soil', 'water'], set: 'p' },
      { one: 'a plant we eat', many: 'plants we eat', items: ['maize', 'beans', 'cabbage', 'sukuma wiki', 'carrot', 'banana'] },
      { one: 'a tree that gives us fruit', many: 'trees that give us fruit', items: ['mango tree', 'orange tree', 'avocado tree', 'pawpaw tree', 'lemon tree'] },
    ],
    pairs: [
      {
        pairs: [
          ['mangoes', 'mango trees'],
          ['oranges', 'orange trees'],
          ['maize', 'maize plants'],
          ['beans', 'bean plants'],
        ],
        ask: (a) => `We get ${a} from ___.`,
      },
    ],
  },
  'v-animals': {
    categories: [
      { one: 'a domestic animal', many: 'domestic animals', items: ['cow', 'goat', 'sheep', 'dog', 'cat', 'hen', 'donkey'] },
      { one: 'a wild animal', many: 'wild animals', items: ['lion', 'elephant', 'zebra', 'giraffe', 'leopard', 'hyena', 'monkey'] },
    ],
    pairs: [
      {
        pairs: [
          ['cow', 'milk'],
          ['hen', 'eggs'],
          ['sheep', 'wool'],
          ['bee', 'honey'],
        ],
        ask: (a) => `We get ___ from ${an(a)}.`,
        askBack: (b) => `Which animal gives us ${b}?`,
      },
      {
        pairs: [
          ['cow', 'calf'],
          ['hen', 'chick'],
          ['dog', 'puppy'],
          ['cat', 'kitten'],
          ['goat', 'kid'],
        ],
        ask: (a) => `The young one of ${an(a)} is a ___.`,
      },
    ],
  },
}

export const GRADE1_ENV_GENERATORS: Record<string, Generator> = Object.fromEntries(Object.entries(FACTS).map(([id, set]) => [id, factGenerator(set)]))
