// Fact tables for Grade 3 Environmental Activities, Creative Activities and CRE. Each table
// is a small set of true, checked facts; factGenerator turns it into many questions.
// Items in different categories of one table must never overlap in meaning.
import { factGenerator, type FactSet } from '../facts'
import type { Generator } from '../types'

const ENV: Record<string, FactSet> = {
  'tv-living': {
    categories: [
      { one: 'a bedding material', many: 'bedding materials', items: ['blanket', 'pillow', 'mattress', 'bedsheet', 'pillowcase', 'duvet'] },
      { one: 'a thing for cleaning the body', many: 'things for cleaning the body', items: ['soap', 'towel', 'toothbrush', 'toothpaste', 'sponge', 'nail cutter'] },
      { one: 'a kitchen item', many: 'kitchen items', items: ['sufuria', 'cooking stick', 'plate', 'cup', 'jiko', 'spoon'] },
    ],
    pairs: [
      {
        pairs: [
          ['pillow', 'rest our head on'],
          ['blanket', 'keep us warm at night'],
          ['mattress', 'make the bed soft'],
          ['toothbrush', 'clean our teeth'],
          ['towel', 'dry our body'],
          ['comb', 'neaten our hair'],
          ['nail cutter', 'cut our nails'],
          ['soap', 'remove dirt and germs'],
        ],
        ask: (a) => `We use a ${a} to ___.`,
        askBack: (b) => `Which item do we use to ${b}?`,
      },
    ],
  },
  'tv-family': {
    categories: [
      { one: 'a basic need', many: 'basic needs', items: ['food', 'water', 'clothes', 'shelter', 'medical care', 'clean air'] },
      { one: 'a want', many: 'wants', items: ['sweets', 'a toy car', 'a video game', 'a big television', 'soda', 'a bicycle'] },
    ],
    pairs: [
      {
        pairs: [
          ['you get a gift', 'happy'],
          ['you lose your pet', 'sad'],
          ['someone pushes you on purpose', 'angry'],
          ['you hear a loud noise in the dark', 'afraid'],
          ['visitors arrive without telling you', 'surprised'],
          ['you win a race', 'proud'],
        ],
        ask: (a) => `How might you feel when ${a}?`,
        explain: (a, b) => `Most people feel ${b} when ${a}.`,
      },
    ],
  },
  'tv-food': {
    categories: [
      { one: 'an energy-giving food', many: 'energy-giving foods', items: ['ugali', 'rice', 'sweet potatoes', 'cassava', 'bread', 'chapati', 'arrowroots', 'bananas (matoke)'] },
      { one: 'a body-building food', many: 'body-building foods', items: ['beans', 'eggs', 'milk', 'fish', 'meat', 'green grams', 'groundnuts', 'omena'] },
      { one: 'a protective food', many: 'protective foods', items: ['carrots', 'oranges', 'spinach', 'sukuma wiki', 'pawpaw', 'mangoes', 'cabbage', 'tomatoes'] },
    ],
    pairs: [
      {
        pairs: [
          ['energy-giving foods', 'give us strength to work and play'],
          ['body-building foods', 'help our bodies to grow'],
          ['protective foods', 'protect us from diseases'],
        ],
        ask: (a) => `What do ${a} do for our bodies?`,
        askBack: (b) => `Which foods ${b}?`,
      },
    ],
  },
  'tv-community': {
    categories: [
      { one: 'a safe place for children', many: 'safe places for children', items: ['home', 'school', 'church', 'mosque', 'the playground', 'the library'] },
      { one: 'a dangerous place to play', many: 'dangerous places to play', items: ['a busy road', 'a deep river', 'a quarry', 'a railway line', 'a dumpsite', 'an open pit'] },
    ],
    pairs: [
      {
        pairs: [
          ['a nurse', 'cares for sick people'],
          ['a police officer', 'keeps law and order'],
          ['a farmer', 'grows food'],
          ['a teacher', 'teaches learners'],
          ['a carpenter', 'makes furniture'],
          ['a tailor', 'sews clothes'],
          ['a mason', 'builds houses with stones'],
          ['a fisherman', 'catches fish'],
        ],
        ask: (a) => `In our community, ${a} ___.`,
        askBack: (b) => `Who ${b}?`,
      },
      {
        pairs: [
          ['red', 'stop'],
          ['amber', 'get ready'],
          ['green', 'go'],
        ],
        ask: (a) => `A ${a} traffic light tells drivers to ___.`,
        askBack: (b) => `Which traffic light colour means "${b}"?`,
      },
    ],
  },
  'tv-culture': {
    categories: [
      { one: 'a cultural event', many: 'cultural events', items: ['a wedding', 'a naming ceremony', 'a harvest festival', 'a thanksgiving', 'a dowry ceremony', 'a traditional dance festival'] },
      { one: 'an everyday activity', many: 'everyday activities', items: ['brushing teeth', 'sweeping the house', 'doing homework', 'fetching water', 'washing plates', 'feeding chickens'] },
    ],
    pairs: [
      {
        pairs: [
          ['a naming ceremony', 'a new baby gets a name'],
          ['a harvest festival', 'people thank God for good crops'],
          ['a wedding', 'two people get married'],
          ['a tree-planting day', 'people plant trees together'],
        ],
        ask: (a) => `What happens at ${a}?`,
        askBack: (b) => `At which event does this happen: ${b}?`,
      },
    ],
  },
  'tv-weather': {
    categories: [
      { one: 'a thing we use when it rains', many: 'things we use when it rains', items: ['umbrella', 'raincoat', 'gumboots', 'rain hat'] },
      { one: 'a thing we use when it is hot', many: 'things we use when it is hot', items: ['sunhat', 'sunglasses', 'light cotton clothes', 'sandals'] },
      { one: 'a thing we use when it is cold', many: 'things we use when it is cold', items: ['sweater', 'jacket', 'scarf', 'woollen socks'] },
    ],
    pairs: [
      {
        pairs: [
          ['a rain gauge', 'measures the amount of rain'],
          ['a wind vane', 'shows the direction of the wind'],
          ['a windsock', 'shows how strong the wind is'],
          ['a thermometer', 'measures how hot or cold it is'],
        ],
        ask: (a) => `What does ${a} do?`,
        askBack: (b) => `Which instrument ${b}?`,
      },
      {
        pairs: [
          ['no rain for a long time', 'drought'],
          ['too much rain', 'floods'],
          ['strong moving air', 'wind'],
          ['water drops falling from clouds', 'rain'],
        ],
        ask: (a) => `What do we call ${a}?`,
      },
    ],
  },
  'tv-soil': {
    categories: [
      { one: 'a way of caring for soil', many: 'ways of caring for soil', items: ['planting trees', 'adding manure', 'digging terraces', 'planting grass', 'mulching', 'planting cover crops'] },
      { one: 'a way of harming soil', many: 'ways of harming soil', items: ['burning grass', 'cutting down all trees', 'throwing plastic bags', 'overgrazing', 'pouring oil on the ground', 'digging up slopes carelessly'] },
    ],
    pairs: [
      {
        pairs: [
          ['clay', 'holds water well and is good for modelling'],
          ['sand', 'lets water drain away very fast'],
          ['loam', 'is best for growing crops'],
        ],
        ask: (a) => `Which is true about ${a} soil? It ___.`,
        askBack: (b) => `Which soil ${b}?`,
      },
    ],
  },
  'tv-heat': {
    categories: [
      { one: 'a source of heat', many: 'sources of heat', items: ['the sun', 'burning firewood', 'burning charcoal', 'an electric cooker', 'a gas cooker', 'a burning candle'] },
      { one: 'a use of heat', many: 'uses of heat', items: ['cooking food', 'boiling water', 'drying clothes', 'keeping warm', 'ironing clothes', 'baking bread'] },
      { one: 'a heat safety rule', many: 'heat safety rules', items: ['keep away from a burning jiko', 'hold hot pots with a cloth', 'keep candles away from curtains', 'never play with matches'], set: 'b' },
      { one: 'an unsafe thing to do near heat', many: 'unsafe things to do near heat', items: ['playing with matches', 'touching a hot sufuria', 'leaving a candle near curtains', 'running near a jiko'], set: 'b' },
    ],
  },
  'tv-water': {
    categories: [
      { one: 'a source of water', many: 'sources of water', items: ['rain', 'a river', 'a lake', 'a well', 'a borehole', 'a spring', 'a tap'] },
      { one: 'a way of making water safe', many: 'ways of making water safe', items: ['boiling', 'filtering', 'adding water treatment tablets', 'covering the container'], set: 'b' },
      { one: 'a way of saving water', many: 'ways of saving water', items: ['closing taps after use', 'repairing leaking pipes', 're-using washing water', 'harvesting rain water'], set: 'b' },
      { one: 'a use of water', many: 'uses of water', items: ['drinking', 'cooking', 'bathing', 'watering crops', 'washing clothes'] },
    ],
    pairs: [
      {
        pairs: [
          ['water from washing clothes', 'mopping the floor'],
          ['water from rinsing plates', 'watering plants'],
          ['water from bathing', 'flushing the toilet'],
        ],
        ask: (a) => `How can we re-use ${a}?`,
      },
    ],
  },
  'tv-plants': {
    categories: [
      { one: 'a way of caring for plants', many: 'ways of caring for plants', items: ['watering', 'weeding', 'adding manure', 'mulching', 'fencing young trees', 'pruning'], set: 'b' },
      { one: 'a way of harming plants', many: 'ways of harming plants', items: ['stepping on seedlings', 'pulling off leaves', 'letting goats eat them', 'pouring soapy water on them'], set: 'b' },
      { one: 'a plant we eat', many: 'plants we eat', items: ['maize', 'beans', 'cassava', 'sukuma wiki', 'mango', 'banana'] },
      { one: 'a plant used as medicine', many: 'plants used as medicine', items: ['aloe vera', 'neem (mwarubaini)', 'lemon grass', 'moringa'] },
    ],
    pairs: [
      {
        pairs: [
          ['cassava', 'root'],
          ['sukuma wiki', 'leaves'],
          ['sugarcane', 'stem'],
          ['mango', 'fruit'],
          ['beans', 'seeds'],
          ['carrot', 'root'],
          ['cabbage', 'leaves'],
        ],
        ask: (a) => `Which part of ${a} do we eat?`,
      },
    ],
  },
  'tv-animals': {
    categories: [
      { one: 'an animal product', many: 'animal products', items: ['milk', 'eggs', 'honey', 'meat', 'wool', 'hides and skins'] },
      { one: 'a plant product', many: 'plant products', items: ['maize', 'cotton', 'tea leaves', 'timber', 'sugarcane', 'beans'] },
      { one: 'a way of caring for animals', many: 'ways of caring for animals', items: ['giving them clean water', 'feeding them well', 'cleaning their shed', 'taking them to the vet', 'spraying them against ticks'], set: 'b' },
      { one: 'a way of neglecting animals', many: 'ways of neglecting animals', items: ['forgetting to feed them', 'leaving them without water', 'overloading a donkey', 'keeping them in a dirty shed'], set: 'b' },
    ],
    pairs: [
      {
        pairs: [
          ['cow', 'milk'],
          ['hen', 'eggs'],
          ['bee', 'honey'],
          ['sheep', 'wool'],
        ],
        ask: (a) => `We get ___ from a ${a}.`,
        askBack: (b) => `Which animal gives us ${b}?`,
      },
      {
        pairs: [
          ['donkey', 'carrying loads'],
          ['dog', 'guarding the home'],
          ['ox', 'pulling a plough'],
          ['cat', 'catching rats'],
        ],
        ask: (a) => `A ${a} helps us by ___.`,
        askBack: (b) => `Which animal helps us by ${b}?`,
      },
      {
        pairs: [
          ['cow', 'calf'],
          ['goat', 'kid'],
          ['hen', 'chick'],
          ['sheep', 'lamb'],
          ['dog', 'puppy'],
          ['cat', 'kitten'],
        ],
        ask: (a) => `The young one of a ${a} is called a ___.`,
        askBack: (b) => `A ${b} is the young one of a ___.`,
      },
    ],
  },
  'tv-waste': {
    categories: [
      { one: 'waste that rots', many: 'wastes that rot', items: ['banana peels', 'dry leaves', 'leftover food', 'maize stalks', 'paper', 'animal droppings'] },
      { one: 'waste that does not rot', many: 'wastes that do not rot', items: ['plastic bottles', 'tins', 'glass', 'plastic bags', 'old wire', 'bottle tops'] },
    ],
    pairs: [
      {
        pairs: [
          ['an empty tin', 'a pencil holder'],
          ['bottle tops', 'a shaker'],
          ['a plastic bottle', 'a plant pot'],
          ['old cloth', 'a door mat'],
          ['banana peels', 'compost manure'],
          ['a cardboard box', 'a storage box'],
        ],
        ask: (a) => `We can re-use ${a} to make ___.`,
        askBack: (b) => `What can we re-use to make ${b}?`,
      },
    ],
  },
}

const CREATIVE: Record<string, FactSet> = {
  'tc-painting': {
    categories: [
      { one: 'a painting tool', many: 'painting tools', items: ['paint brush', 'palette', 'paint', 'water pot', 'sponge'] },
      { one: 'a drawing tool', many: 'drawing tools', items: ['pencil', 'crayon', 'charcoal stick', 'rubber', 'ruler'] },
      { one: 'a craft material', many: 'craft materials', items: ['clay', 'sisal fibres', 'banana fibres', 'seeds', 'coloured paper', 'glue'] },
    ],
    pairs: [
      {
        pairs: [
          ['blue and yellow', 'green'],
          ['red and yellow', 'orange'],
          ['red and blue', 'purple'],
          ['red and white', 'pink'],
          ['black and white', 'grey'],
        ],
        ask: (a) => `Mixing ${a} paint gives ___.`,
        askBack: (b) => `Which two colours mix to make ${b}?`,
      },
      {
        pairs: [
          ['collage', 'sticking materials together'],
          ['modelling', 'shaping clay'],
          ['weaving', 'passing strips over and under each other'],
          ['twisting', 'turning fibres round to make rope'],
          ['painting', 'using a brush and colours'],
        ],
        ask: (a) => `In art, ${a} means ___.`,
        askBack: (b) => `What do we call ${b}?`,
      },
    ],
  },
  'tc-rhythm': {
    categories: [
      { one: 'an instrument we beat', many: 'instruments we beat', items: ['drum', 'isukuti', 'tambourine', 'xylophone', 'bell'] },
      { one: 'an instrument we shake', many: 'instruments we shake', items: ['kayamba', 'shaker', 'leg rattles (kigamba)', 'maracas'] },
      { one: 'an instrument we blow', many: 'instruments we blow', items: ['flute', 'horn', 'whistle', 'trumpet'] },
    ],
    pairs: [
      {
        pairs: [
          ['tempo', 'how fast or slow music is'],
          ['beat', 'the steady pulse in music'],
          ['rhythm', 'the pattern of long and short sounds'],
          ['pitch', 'how high or low a sound is'],
        ],
        ask: (a) => `In music, ${a} means ___.`,
        askBack: (b) => `What do we call ${b}?`,
      },
    ],
  },
  'tc-melody': {
    categories: [
      { one: 'a high sound', many: 'high sounds', items: ['a bird singing', 'a whistle', 'a chick cheeping', 'a small bell'] },
      { one: 'a low sound', many: 'low sounds', items: ['a big drum', 'a lion roaring', 'thunder', 'a cow mooing'] },
    ],
    pairs: [
      {
        pairs: [
          ['a lullaby', 'helps a baby to sleep'],
          ['a work song', 'makes work easier'],
          ['a patriotic song', 'shows love for our country'],
          ['a hymn', 'praises God'],
          ['a game song', 'is sung while playing'],
        ],
        ask: (a) => `Why do we sing ${a}? It ___.`,
        askBack: (b) => `Which song ${b}?`,
      },
    ],
  },
  'tc-pushpull': {
    categories: [
      { one: 'a pushing activity', many: 'pushing activities', items: ['pushing a wheelbarrow', 'closing a door', 'pushing a swing', 'pushing a stuck car', 'pushing a cart'] },
      { one: 'a pulling activity', many: 'pulling activities', items: ['tug of war', 'drawing water from a well', 'opening a drawer', 'pulling a cart', 'pulling up weeds'] },
    ],
    pairs: [
      {
        pairs: [
          ['bend your knees a little', 'to use your leg muscles and protect your back'],
          ['warm up first', 'to prepare your muscles'],
          ['hold the rope firmly', 'so it does not slip'],
          ['play on flat grassy ground', 'so nobody falls on stones'],
        ],
        ask: (a) => `Why should we ${a} when pushing or pulling?`,
      },
    ],
  },
  'tc-rounds': {
    categories: [
      { one: 'a good habit when singing a round', many: 'good habits when singing a round', items: ['listening to the leader', 'keeping the same tempo', 'keeping your own part', 'singing softly enough to hear others'] },
      { one: 'a bad habit when singing a round', many: 'bad habits when singing a round', items: ['shouting over others', 'copying the other group', 'starting before your turn', 'laughing at mistakes'] },
    ],
    pairs: [
      {
        pairs: [
          ['a two-part round', '2'],
          ['a three-part round', '3'],
          ['a four-part round', '4'],
        ],
        ask: (a) => `How many groups sing in ${a}?`,
      },
      {
        pairs: [
          ['the leader', 'tells each group when to start'],
          ['Group A', 'starts the song first'],
          ['the last group to start', 'finishes last'],
        ],
        ask: (a) => `In a round, ${a} ___.`,
        askBack: (b) => `In a round, who ${b}?`,
      },
    ],
  },
  'tc-skipping': {
    categories: [
      { one: 'a skipping skill', many: 'skipping skills', items: ['single skipping', 'group skipping', 'skipping on one leg', 'skipping backwards', 'double bounce'] },
      { one: 'a ball skill', many: 'ball skills', items: ['dribbling', 'passing', 'catching', 'shooting', 'kicking'] },
      { one: 'a safety rule for skipping', many: 'safety rules for skipping', items: ['warm up first', 'land softly', 'skip on flat ground', 'use a rope that is not too long'], set: 'b' },
      { one: 'an unsafe thing when skipping', many: 'unsafe things when skipping', items: ['skipping on stones', 'using a very long rope', 'skipping near a road', 'skipping in slippery shoes'], set: 'b' },
    ],
  },
  'tc-dribbling': {
    categories: [
      { one: 'a game with dribbling', many: 'games with dribbling', items: ['football', 'basketball', 'hockey', 'handball'] },
      { one: 'a game without a ball', many: 'games without a ball', items: ['skipping', 'hide and seek', 'tug of war', 'hopscotch'] },
    ],
    pairs: [
      {
        pairs: [
          ['football', 'feet'],
          ['basketball', 'one hand'],
          ['hockey', 'a stick'],
          ['handball', 'one hand'],
        ],
        ask: (a) => `In ${a}, we dribble the ball with ___.`,
      },
    ],
  },
  'tc-strings': {
    categories: [
      { one: 'a string instrument', many: 'string instruments', items: ['nyatiti', 'orutu', 'guitar', 'obokano', 'litungu', 'violin'] },
      { one: 'a percussion instrument', many: 'percussion instruments', items: ['drum', 'kayamba', 'isukuti', 'tambourine', 'shaker'] },
    ],
    pairs: [
      {
        pairs: [
          ['nyatiti', 'plucking'],
          ['orutu', 'bowing'],
          ['guitar', 'plucking'],
          ['drum', 'beating'],
          ['flute', 'blowing'],
          ['kayamba', 'shaking'],
        ],
        ask: (a) => `How do we play the ${a}? By ___.`,
      },
    ],
  },
  'tc-gym': {
    categories: [
      { one: 'a balancing activity', many: 'balancing activities', items: ['standing on one leg', 'walking on a line', 'balancing a bean bag on your head', 'holding a still pose'] },
      { one: 'a rolling activity', many: 'rolling activities', items: ['forward roll', 'log roll', 'side roll', 'egg roll'] },
      { one: 'a safety rule for rolling', many: 'safety rules for rolling', items: ['roll on a soft mat', 'tuck your chin in', 'one learner at a time', 'clear the mat first'], set: 'b' },
      { one: 'an unsafe thing when rolling', many: 'unsafe things when rolling', items: ['rolling on stones', 'landing on your head', 'rolling while others roll', 'rolling with a pencil in your pocket'], set: 'b' },
    ],
  },
  'tc-water': {
    categories: [
      { one: 'a water safety rule', many: 'water safety rules', items: ['swim only when an adult is watching', 'walk, do not run, near the pool', 'shower before swimming', 'never push others into water'] },
      { one: 'a dangerous thing to do near water', many: 'dangerous things to do near water', items: ['swimming in a flooded river', 'diving into shallow water', 'swimming alone', 'running on a wet floor'] },
    ],
    pairs: [
      {
        pairs: [
          ['a float', 'helps us stay up in water'],
          ['goggles', 'protect our eyes in water'],
          ['a swimming costume', 'is worn for swimming'],
          ['a rope', 'can be thrown to someone in trouble'],
        ],
        ask: (a) => `What is ${a} for? It ___.`,
        askBack: (b) => `Which item ${b}?`,
      },
    ],
  },
  'tc-anthem': {
    categories: [
      { one: 'a way of showing respect for the anthem', many: 'ways of showing respect for the anthem', items: ['standing still', 'standing upright', 'singing clearly', 'removing your hat'] },
      { one: 'a sign of disrespect during the anthem', many: 'signs of disrespect during the anthem', items: ['chewing gum', 'talking to friends', 'walking around', 'laughing'] },
    ],
    pairs: [
      {
        pairs: [
          ['black', 'the people of Kenya'],
          ['red', 'the sacrifices made to win our freedom'],
          ['green', 'our land and its plants'],
          ['white', 'peace'],
        ],
        ask: (a) => `On the Kenyan flag, ${a} stands for ___.`,
        askBack: (b) => `Which colour on the flag stands for ${b}?`,
      },
    ],
  },
}

const CRE: Record<string, FactSet> = {
  'tr-creation': {
    categories: [
      { one: 'a thing God created', many: 'things God created', items: ['the sun', 'the moon', 'the stars', 'animals', 'plants', 'the sea', 'people'] },
      { one: 'a thing people made', many: 'things people made', items: ['a car', 'a house', 'a chair', 'a phone', 'a bicycle', 'a radio'] },
      { one: 'a way of caring for creation', many: 'ways of caring for creation', items: ['planting trees', 'feeding animals', 'keeping rivers clean', 'not wasting water'], set: 'b' },
      { one: 'a way of harming creation', many: 'ways of harming creation', items: ['cutting all the trees', 'wasting food', 'throwing litter in rivers', 'wasting water'], set: 'b' },
    ],
    pairs: [
      {
        pairs: [
          ['first', 'light'],
          ['second', 'the sky'],
          ['third', 'land, seas and plants'],
          ['fourth', 'the sun, moon and stars'],
          ['fifth', 'fish and birds'],
          ['sixth', 'animals and people'],
        ],
        ask: (a) => `What did God create on the ${a} day?`,
        askBack: (b) => `On which day did God create ${b}?`,
      },
    ],
  },
  'tr-family': {
    categories: [
      { one: 'a member of the nuclear family', many: 'members of the nuclear family', items: ['father', 'mother', 'brother', 'sister'] },
      { one: 'a member of the extended family', many: 'members of the extended family', items: ['grandmother', 'grandfather', 'uncle', 'aunt', 'cousin'] },
      { one: 'a way of showing love at home', many: 'ways of showing love at home', items: ['helping with chores', 'praying together', 'sharing food', 'caring for the sick'], set: 'b' },
      { one: 'a way of hurting the family', many: 'ways of hurting the family', items: ['fighting with siblings', 'lying to parents', 'refusing to help', 'shouting at grandparents'], set: 'b' },
    ],
    pairs: [
      {
        pairs: [
          ["my father's mother", 'grandmother'],
          ["my mother's brother", 'uncle'],
          ["my father's sister", 'aunt'],
          ["my uncle's son", 'cousin'],
          ["my mother's father", 'grandfather'],
        ],
        ask: (a) => `${a[0].toUpperCase()}${a.slice(1)} is my ___.`,
      },
    ],
  },
  'tr-bible': {
    categories: [
      { one: 'an Old Testament person', many: 'Old Testament people', items: ['Moses', 'Noah', 'Jonah', 'Daniel', 'David', 'Elisha', 'Naaman'] },
      { one: 'a New Testament person', many: 'New Testament people', items: ['Mary', 'Peter', 'Zacchaeus', 'John the Baptist', 'Joseph of Nazareth', 'Bartimaeus'] },
    ],
    pairs: [
      {
        pairs: [
          ['Moses', 'saw the burning bush'],
          ['Noah', 'built the ark'],
          ['Jonah', 'was swallowed by a big fish'],
          ['Daniel', 'was thrown into the den of lions'],
          ['David', 'defeated the giant Goliath with a sling'],
          ['Naaman', 'was healed of leprosy in River Jordan'],
          ['Elisha', 'told Naaman to wash seven times'],
        ],
        ask: (a) => `In the Bible, ${a} ___.`,
        askBack: (b) => `Who ${b}?`,
      },
    ],
  },
  'tr-jesus': {
    categories: [
      { one: 'a miracle of Jesus', many: 'miracles of Jesus', items: ['turning water into wine', 'feeding five thousand people', 'calming the storm', 'healing the blind man', 'walking on water'] },
      { one: 'an Old Testament story', many: 'Old Testament stories', items: ['Noah building the ark', 'David and Goliath', 'Jonah and the big fish', 'Daniel in the lions\' den'] },
    ],
    pairs: [
      {
        pairs: [
          ['was Jesus born', 'Bethlehem'],
          ['did Jesus grow up', 'Nazareth'],
          ['was the boy Jesus found in the Temple', 'Jerusalem'],
          ['did Jesus turn water into wine', 'Cana'],
        ],
        ask: (a) => `Where ${a}?`,
      },
    ],
  },
  'tr-living': {
    categories: [
      { one: 'a good choice', many: 'good choices', items: ['telling the truth', 'sharing food', 'obeying parents', 'helping a classmate', 'forgiving others', 'praying'] },
      { one: 'a bad choice', many: 'bad choices', items: ['stealing', 'telling lies', 'fighting', 'abusing others', 'cheating in exams', 'disobeying parents'] },
    ],
    pairs: [
      {
        pairs: [
          ['someone wrongs you', 'forgive them'],
          ['you find a lost wallet', 'return it'],
          ['a classmate is sick', 'visit and pray for them'],
          ['a friend is hungry', 'share your food'],
          ['you break something', 'say sorry and tell the truth'],
        ],
        ask: (a) => `What should a Christian do when ${a}?`,
      },
    ],
  },
}

export const GRADE3_FACT_GENERATORS: Record<string, Generator> = Object.fromEntries(
  Object.entries({ ...ENV, ...CREATIVE, ...CRE }).map(([id, set]) => [id, factGenerator(set)]),
)
