// Grade 3 Environmental Activities lessons.
import type { Lesson } from './types'

export const ENVIRONMENTAL3_LESSONS: Record<string, Lesson> = {
  'tv-living': {
    intro: 'A clean body and a clean place to sleep keep us healthy and happy.',
    steps: [
      {
        title: 'Bedding',
        text: 'A mattress to lie on, a bedsheet to cover it, a pillow for the head and a blanket for warmth.',
        visual: { kind: 'art', art: ['bed', 'towel', 'soap'] },
        example: ['Beds can be made of wood or metal.'],
      },
      {
        title: 'Keeping bedding clean',
        text: 'Wash bedsheets often. Air blankets in the sun: sunlight kills germs and removes bad smells. Make your bed every morning.',
      },
      {
        title: 'Keeping ourselves clean',
        text: 'Brush your teeth after meals, wash your hands after the toilet, and go to the toilet before sleeping so you do not wet the bed.',
        example: ['Good habit: brushing after meals', 'Bad habit: opening bottles with your teeth'],
      },
    ],
    remember: 'Clean bedding in the sun, clean hands after the toilet, clean teeth after meals.',
  },
  'tv-family': {
    intro: 'A family meets our needs and cares about our feelings.',
    steps: [
      {
        title: 'Needs and wants',
        text: 'Needs are things we cannot live without: food, water, clothes and a home. Wants are nice to have, like toys and sweets.',
        example: ['Need: shelter', 'Want: a video game'],
      },
      {
        title: 'Feelings',
        text: 'We feel happy, sad, angry, afraid or surprised. Our faces and bodies often show how we feel.',
        example: ['A big smile → joy', 'Shaking and hiding → fear'],
      },
      {
        title: 'Handling feelings well',
        text: 'Talk calmly, tell a trusted adult, and be kind to others when they are sad.',
        example: ['Broke something? Say sorry and tell the truth.'],
      },
    ],
    remember: 'Needs before wants. Name your feeling, and speak calmly to someone you trust.',
  },
  'tv-food': {
    intro: 'Food gives us energy, helps us grow and protects us from disease.',
    steps: [
      {
        title: 'Three food groups',
        text: 'Energy-giving foods: ugali, rice, potatoes. Body-building foods (proteins): beans, eggs, milk, fish. Protective foods: fruits and vegetables.',
        visual: { kind: 'art', art: ['maize', 'egg', 'orange'] },
      },
      {
        title: 'A balanced diet',
        text: 'A balanced meal has all three groups. Too little food makes us underweight; too much sugar can make us overweight.',
        example: ['Ugali + beans + sukuma wiki = balanced'],
      },
      {
        title: 'Table manners',
        text: 'Wash your hands before eating. Do not talk with food in your mouth, or you may choke. Eat at the same pace as others.',
      },
    ],
    remember: 'Energy, body-building and protective: eat from all three groups at every meal.',
  },
  'tv-community': {
    intro: 'We live with other people in a community, and we keep each other safe.',
    steps: [
      {
        title: 'Strangers',
        text: 'A stranger is someone you do not know. Never take gifts from a stranger or go with them. Tell a trusted adult.',
      },
      {
        title: 'Safe places',
        text: 'Home, school and places of worship are safe. Busy roads, deep rivers and quarries are not places to play.',
      },
      {
        title: 'Road safety',
        text: 'Look right, left, then right again before crossing. Use the zebra crossing. A red light means stop.',
        example: ['Walk facing the traffic so you can see cars coming.'],
      },
    ],
    remember: 'Say no to strangers, play in safe places, and look right, left, right before crossing.',
  },
  'tv-culture': {
    intro: 'Cultural events bring people together and teach us to care for each other and the land.',
    steps: [
      {
        title: 'Our celebrations',
        text: 'Weddings, naming ceremonies, harvest festivals and thanksgiving bring families and neighbours together.',
      },
      {
        title: 'Caring for people',
        text: 'Communities share food, help families in sad times, and welcome visitors.',
        example: ['Neighbours bring food to comfort a family that lost a loved one.'],
      },
      {
        title: 'Caring for the land',
        text: 'Some events include planting trees. Elders protect sacred forests. After a celebration we clean up and re-use what we can.',
      },
    ],
    remember: 'Celebrations help us share, comfort one another, and look after the land.',
  },
  'tv-weather': {
    intro: 'Weather is what the sky and air are like each day: sunny, rainy, windy or cloudy.',
    steps: [
      {
        title: 'Kinds of weather',
        text: 'On a rainy day we use an umbrella and gumboots. On a cold day we wear warm clothes. On a hot day we wear light clothes.',
        visual: { kind: 'art', art: ['sun', 'cloud', 'rain', 'wind'] },
      },
      {
        title: 'Too little or too much rain',
        text: 'No rain for a long time causes drought: crops dry up and animals die. Too much rain causes floods.',
      },
      {
        title: 'Measuring weather',
        text: 'A rain gauge measures rain. A wind vane shows where the wind is blowing from.',
        example: ['Thunderstorm? Stay indoors, never under a tall tree.'],
      },
    ],
    remember: 'Drought = too little rain; floods = too much. Dress for the weather.',
  },
  'tv-soil': {
    intro: 'Soil is where plants grow, so we must take care of it.',
    steps: [
      {
        title: 'Kinds of soil',
        text: 'Sand lets water run through fast. Clay holds water and is good for modelling. Loam is best for growing crops.',
        visual: { kind: 'art', art: ['sand', 'clay', 'loam'] },
      },
      {
        title: 'Making soil rich',
        text: 'Manure from animal droppings and rotting leaves makes soil fertile, so crops grow well.',
      },
      {
        title: 'Stopping soil erosion',
        text: 'Running water can carry soil away. Planting trees and grass, and digging terraces, hold the soil in place.',
        example: ['Do not burn grass: it kills small animals and makes soil poor.'],
      },
    ],
    remember: 'Loam grows crops best. Manure feeds the soil; trees and grass hold it in place.',
  },
  'tv-heat': {
    intro: 'Heat keeps us warm, cooks our food and dries our clothes, but it can also burn.',
    steps: [
      {
        title: 'Sources of heat',
        text: 'The sun, fire from firewood or charcoal, and electric cookers all give heat. Rubbing our hands together makes a little heat too.',
        visual: { kind: 'art', art: ['sun', 'pot'] },
      },
      {
        title: 'Uses of heat',
        text: 'We use heat to cook food, boil drinking water, dry clothes and keep warm at night.',
      },
      {
        title: 'Staying safe',
        text: 'Keep away from a burning jiko. Hold hot pots with a cloth. Keep candles away from curtains. A small burn goes under cool clean water.',
      },
    ],
    remember: 'Heat helps us cook, boil and dry, but never play with fire.',
  },
  'tv-water': {
    intro: 'Water is life. We need it clean, and we must not waste it.',
    steps: [
      {
        title: 'Sources of water',
        text: 'Rain, rivers, lakes, wells, springs and taps.',
        visual: { kind: 'art', art: ['rain', 'river', 'well', 'tap'] },
      },
      {
        title: 'Making water safe',
        text: 'Boil or filter water before drinking, and store it in a clean covered container. Dirty water can cause typhoid.',
        example: ['Stagnant water breeds mosquitoes.'],
      },
      {
        title: 'Saving and re-using water',
        text: 'Close taps after use. Water from washing clothes can mop floors, water plants or flush toilets.',
      },
    ],
    remember: 'Boil or filter, cover it, close the tap, and re-use water where you can.',
  },
  'tv-plants': {
    intro: 'Plants give us food, medicine, wood, shade and clean air.',
    steps: [
      {
        title: 'What plants need',
        text: 'Plants need water, air, sunlight and good soil to grow.',
        visual: { kind: 'art', art: ['seed', 'stem', 'leaf', 'fruit'] },
      },
      {
        title: 'Caring for plants',
        text: 'Water them, remove weeds, add manure, put dry leaves (mulch) around them, and fence young trees from goats.',
      },
      {
        title: 'Uses of plants',
        text: 'Food (fruits, vegetables, cassava roots), medicine (aloe vera), timber, and shade.',
        example: ['Trees also bring rain and stop soil erosion.'],
      },
    ],
    remember: 'Water, weed and protect plants; they give us food, medicine, wood and air.',
  },
  'tv-animals': {
    intro: 'Animals help us in many ways, so we must care for them well.',
    steps: [
      {
        title: 'What animals give us',
        text: 'Cows and goats give milk and meat. Hens give eggs. Sheep give wool. Bees give honey.',
        visual: { kind: 'art', art: ['cow', 'hen', 'goat'] },
      },
      {
        title: 'How animals help',
        text: 'Donkeys carry loads, oxen pull ploughs, and dogs guard our homes.',
      },
      {
        title: 'Caring for animals',
        text: 'Give them food and clean water, a clean shed, and never beat them. A veterinary doctor treats sick animals.',
      },
    ],
    remember: 'Feed them, give them water and shelter, be gentle, and call the vet when they are sick.',
  },
  'tv-waste': {
    intro: 'Waste is what we throw away. Handled well, much of it can be used again.',
    steps: [
      {
        title: 'Collecting waste',
        text: 'Put litter in a dustbin. Wear gloves when collecting it. Keep broken glass in its own safe bin.',
      },
      {
        title: 'Sorting waste',
        text: 'Waste that rots (peels, leaves, leftover food) can make compost. Waste that does not rot (plastic, tins, glass) can be re-used or recycled.',
      },
      {
        title: 'Re-using waste',
        text: 'A tin becomes a pencil holder, bottle tops make a shaker, and boxes store things.',
        example: ['Never burn plastic: the smoke pollutes the air.'],
      },
    ],
    remember: 'Collect, sort, then re-use: rotting waste to compost, tins and bottles into new things.',
  },
}
