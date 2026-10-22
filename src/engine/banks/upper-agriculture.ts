// Agriculture and Nutrition, Grades 4–6: fact tables plus written questions in the style of
// KPSEA's Integrated Science paper (scenarios on the farm, in the kitchen and at the table).
// All content is original.
import { factGenerator, type FactSet } from '../facts'
import { labelOptions as opts } from '../generators/english'
import type { BankQuestion, Generator, Level } from '../types'

const t = (level: Level, prompt: string, answer: string, wrong: string[]): BankQuestion => ({ type: 'choice', level, prompt, options: opts([answer, ...wrong]), answer })

interface Topic {
  facts: FactSet
  bank: BankQuestion[]
}

const FOOD_GROUPS: FactSet['categories'] = [
  { one: 'an energy-giving food', many: 'energy-giving foods', items: ['maize', 'rice', 'sweet potatoes', 'cassava', 'millet', 'arrowroots', 'bread'], set: 'fg' },
  { one: 'a body-building food', many: 'body-building foods', items: ['beans', 'eggs', 'fish', 'meat', 'milk', 'omena', 'green grams', 'soya beans'], set: 'fg' },
  { one: 'a protective food', many: 'protective foods', items: ['kale (sukuma wiki)', 'spinach', 'carrots', 'oranges', 'mangoes', 'pawpaw', 'tomatoes'], set: 'fg' },
]

const G4: Record<string, Topic> = {
  soil: {
    facts: {
      categories: [
        { one: 'a cause of soil erosion', many: 'causes of soil erosion', items: ['overgrazing', 'cutting down trees', 'ploughing up and down a slope', 'burning vegetation', 'leaving land bare'], set: 'e' },
        { one: 'a way of controlling soil erosion', many: 'ways of controlling soil erosion', items: ['planting trees', 'making terraces', 'planting cover crops', 'mulching', 'planting grass strips', 'ploughing across the slope'], set: 'e' },
        { one: 'an agent of soil erosion', many: 'agents of soil erosion', items: ['running water', 'wind', 'animals', 'people'], set: 'a' },
        { one: 'NOT an agent of soil erosion', many: 'things that do not carry soil away', items: ['grass cover', 'tree roots', 'mulch', 'stone lines'], set: 'a' },
      ],
      pairs: [
        {
          pairs: [
            ['mulching', 'covering the soil with dry grass or leaves'],
            ['terracing', 'making flat steps across a slope'],
            ['cover cropping', 'growing low crops that cover the ground'],
            ['afforestation', 'planting trees where there were none'],
            ['contour ploughing', 'ploughing across the slope'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `What is the practice of ${b} called?`,
        },
      ],
    },
    bank: [
      t(2, 'The carrying away of the top soil by water or wind is called ___.', 'soil erosion', ['soil conservation', 'mulching', 'irrigation']),
      t(3, 'Why is the top soil important?', 'It has most of the nutrients plants need.', ['It has no air.', 'It is made of stones.', 'It is always dry.']),
      t(3, 'Which is the best crop to plant as a cover crop?', 'sweet potatoes', ['maize', 'sugarcane', 'cassava']),
      t(4, 'A farm on a hillside has deep channels after heavy rain. Which practice would best reduce this?', 'making terraces across the slope', ['ploughing up and down the slope', 'burning the grass', 'cutting the trees']),
      t(4, 'How does mulching help to conserve soil?', 'It stops raindrops hitting the soil directly.', ['It makes the soil loose.', 'It removes grass.', 'It brings more wind.']),
      t(4, 'Why does overgrazing cause soil erosion?', 'Animals eat the grass that covers and holds the soil.', ['Animals add manure.', 'Animals make the soil wet.', 'Animals plant trees.']),
      t(5, 'Two trays of soil were tilted and watered. Tray A had grass; tray B was bare. Which lost more soil and why?', 'Tray B, because nothing held the soil.', ['Tray A, because grass is heavy.', 'Both lost the same amount.', 'Tray A, because grass pushes soil away.']),
      t(5, 'Which group has only ways of controlling soil erosion?', 'terracing, mulching, planting trees', ['overgrazing, terracing, mulching', 'burning, mulching, planting trees', 'terracing, cutting trees, mulching']),
    ],
  },
  water: {
    facts: {
      categories: [
        { one: 'a way to save water at home', many: 'ways to save water at home', items: ['closing taps after use', 'repairing leaking taps', 'reusing water to water plants', 'using a cup when brushing teeth', 'bathing with a basin instead of a shower'], set: 's' },
        { one: 'a way of wasting water', many: 'ways of wasting water', items: ['leaving taps running', 'washing a car with a running hose', 'ignoring leaking pipes', 'pouring away clean water', 'watering plants at midday'], set: 's' },
        { one: 'a way of harvesting water', many: 'ways of harvesting water', items: ['collecting roof water in tanks', 'digging water pans', 'building small dams', 'digging zai pits'], set: 'h' },
        { one: 'a way of saving water in the garden', many: 'ways of saving water in the garden', items: ['mulching', 'drip irrigation', 'watering in the evening', 'planting drought-resistant crops'], set: 'h' },
      ],
      pairs: [
        {
          pairs: [
            ['gutters', 'direct rain water from the roof to a tank'],
            ['a tank', 'store harvested water'],
            ['a water pan', 'collect run-off water on the ground'],
            ['drip irrigation', 'give water slowly to plant roots'],
          ],
          ask: (a) => `We use ${a} to ___.`,
          askBack: (b) => `What do we use to ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Using water carefully so that it is not wasted is called water ___.', 'conservation', ['pollution', 'erosion', 'evaporation']),
      t(3, 'Why is it better to water plants in the evening?', 'Less water is lost to evaporation.', ['Plants sleep in the morning.', 'Water is colder in the morning.', 'It rains in the evening.']),
      t(3, 'Water used for washing hands can be ___.', 'reused to water plants', ['poured into a river', 'used for drinking', 'thrown in a pit latrine']),
      t(4, 'A school wants to collect rain water from its roofs. What do they need?', 'gutters and a tank', ['a jembe and a rake', 'a sieve and a filter', 'a pump and a hose only']),
      t(4, 'How does mulching help to save water?', 'It reduces evaporation from the soil.', ['It makes more rain fall.', 'It adds water to the soil.', 'It removes weeds by burning.']),
      t(5, 'A tap leaks one cup of water every hour. How many cups are lost in two days?', '48 cups', ['24 cups', '12 cups', '2 cups']),
      t(5, 'Which is the best way for a family in a dry area to have water during the dry season?', 'harvesting and storing rain water during the rains', ['leaving taps open', 'cutting down trees', 'washing cars every day']),
    ],
  },
  wildlife: {
    facts: {
      categories: [
        { one: 'a reason for conserving wild animals', many: 'reasons for conserving wild animals', items: ['they attract tourists', 'they are part of our heritage', 'they are used for learning and research', 'they keep the balance of nature', 'they earn the country money'], set: 'r' },
        { one: 'a threat to wild animals', many: 'threats to wild animals', items: ['poaching', 'cutting down forests', 'drought', 'pollution', 'settling in animal habitats'], set: 'r2' },
        { one: 'a way of conserving wild animals', many: 'ways of conserving wild animals', items: ['setting up national parks', 'banning poaching', 'employing game rangers', 'educating people', 'planting trees'], set: 'r2' },
      ],
      pairs: [
        {
          pairs: [
            ['Maasai Mara', 'the great wildebeest migration'],
            ['Lake Nakuru National Park', 'flamingos and rhinos'],
            ['Amboseli National Park', 'elephants with a view of Mount Kilimanjaro'],
            ['Nairobi National Park', 'wild animals close to a capital city'],
          ],
          ask: (a) => `${a} is well known for ___.`,
          askBack: (b) => `Which park or reserve is well known for ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Illegal hunting of wild animals is called ___.', 'poaching', ['farming', 'grazing', 'fishing']),
      t(3, 'Which body protects wild animals in Kenya?', 'Kenya Wildlife Service (KWS)', ['Kenya Power', 'Kenya Ports Authority', 'Kenya Airways']),
      t(3, 'Elephants are poached mainly for their ___.', 'tusks', ['skin', 'tails', 'meat']),
      t(4, 'How do tourists who visit parks help Kenya?', 'They bring money into the country.', ['They take the animals home.', 'They cut trees.', 'They pollute the rivers.']),
      t(4, 'Which of these is a game reserve, not a national park?', 'Maasai Mara', ['Tsavo East', 'Nairobi', 'Amboseli']),
      t(5, 'Elephants keep destroying crops in a village near a park. Which is the best solution?', 'building fences or beehive fences along the park boundary', ['feeding the elephants', 'burning the park', 'moving into the park']),
      t(5, 'Why is cutting down forests a threat to wild animals?', 'Animals lose their homes and food.', ['Animals get more food.', 'It makes animals grow bigger.', 'It brings rain to animals.']),
    ],
  },
  gardening: {
    facts: {
      categories: [
        { one: 'a leafy vegetable', many: 'leafy vegetables', items: ['kale (sukuma wiki)', 'spinach', 'cabbage', 'amaranth (terere)', 'lettuce', 'cowpea leaves'], set: 'v' },
        { one: 'a fruit vegetable', many: 'fruit vegetables', items: ['tomato', 'sweet pepper', 'eggplant', 'pumpkin', 'cucumber'], set: 'v' },
        { one: 'a root vegetable', many: 'root vegetables', items: ['carrot', 'beetroot', 'radish', 'turnip'], set: 'v' },
      ],
      pairs: [
        {
          pairs: [
            ['jembe', 'digging'],
            ['panga', 'clearing bushes'],
            ['rake', 'levelling soil and removing trash'],
            ['watering can', 'watering seedlings'],
            ['wheelbarrow', 'carrying manure and soil'],
            ['garden trowel', 'transplanting seedlings'],
            ['pruning shears', 'cutting off extra branches'],
            ['fork jembe', 'breaking hard soil'],
          ],
          ask: (a) => `A ${a} is used for ___.`,
          askBack: (b) => `Which tool is used for ${b}?`,
        },
        {
          pairs: [
            ['weeding', 'removing unwanted plants'],
            ['thinning', 'removing extra seedlings so the rest have space'],
            ['staking', 'supporting tall plants like tomatoes with sticks'],
            ['watering', 'giving plants water'],
            ['manuring', 'adding animal or plant waste to the soil'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `What is ${b} called?`,
        },
      ],
    },
    bank: [
      t(2, 'A small garden near the house for growing vegetables is called a ___ garden.', 'kitchen', ['flower', 'zoo', 'forest']),
      t(3, 'Which garden is best for a family living in a town with little space?', 'a sack garden', ['a big maize farm', 'a forest', 'a tea estate']),
      t(3, 'Why should garden tools be cleaned and stored after use?', 'so they do not rust and they last long', ['so they become blunt', 'so they get lost', 'so they rust']),
      t(4, 'Tomato plants fall over when they have many fruits. What should the gardener do?', 'stake them', ['uproot them', 'stop watering them', 'burn them']),
      t(4, 'Seedlings are growing too close together. The gardener should ___.', 'thin them', ['add more seeds', 'stake them', 'pour hot water on them']),
      t(5, 'Which is the correct order of activities in a kitchen garden?', 'prepare the soil, plant, water and weed, harvest', ['harvest, plant, prepare the soil, weed', 'weed, harvest, plant, water', 'plant, harvest, prepare the soil, water']),
      t(5, 'A gardener mixed manure into the soil before planting kales. Why?', 'to add nutrients to the soil', ['to dry out the kales', 'to make the soil hard', 'to keep away rain']),
    ],
  },
  animals: {
    facts: {
      categories: [
        { one: 'a product we get from cattle', many: 'products we get from cattle', items: ['milk', 'beef', 'hides', 'ghee', 'manure'], set: 'p' },
        { one: 'a product we get from poultry', many: 'products we get from poultry', items: ['eggs', 'chicken meat', 'feathers', 'poultry manure'], set: 'p' },
        { one: 'an animal used for transport', many: 'animals used for transport', items: ['donkey', 'camel', 'horse', 'ox'], set: 'u' },
        { one: 'an animal kept mainly for food', many: 'animals kept mainly for food', items: ['chicken', 'rabbit', 'pig', 'sheep', 'goat'], set: 'u' },
      ],
      pairs: [
        {
          pairs: [
            ['sheep', 'wool'],
            ['bees', 'honey'],
            ['dog', 'security'],
            ['oxen', 'ploughing'],
            ['cat', 'controlling rats'],
            ['pig', 'pork'],
          ],
          ask: (a) => `Farmers keep ${a} mainly for ___.`,
          askBack: (b) => `Which animal is kept mainly for ${b}?`,
        },
        {
          pairs: [
            ['beef', 'cattle'],
            ['mutton', 'sheep'],
            ['chevon', 'goats'],
            ['pork', 'pigs'],
          ],
          ask: (a) => `${a[0].toUpperCase()}${a.slice(1)} is meat from ___.`,
          askBack: (b) => `What is meat from ${b} called?`,
        },
      ],
    },
    bank: [
      t(2, 'Animals kept at home or on the farm are called ___ animals.', 'domestic', ['wild', 'game', 'sea']),
      t(3, 'Hides and skins are used to make ___.', 'shoes, belts and bags', ['bread', 'paper only', 'glass']),
      t(3, 'Which animal is used to carry loads in dry areas such as Turkana and Marsabit?', 'camel', ['cow', 'rabbit', 'hen']),
      t(4, 'How does animal manure help a farmer?', 'It adds nutrients to the soil.', ['It makes crops wilt.', 'It brings pests.', 'It dries the soil.']),
      t(4, 'Which group has only products from goats?', 'milk, chevon, skins', ['wool, eggs, honey', 'milk, mutton, feathers', 'pork, milk, skins']),
      t(5, 'A family wants milk, meat and manure but has little land. Which animal is the best choice?', 'a dairy goat', ['a camel', 'a donkey', 'a horse']),
      t(5, 'Why should we treat domestic animals kindly?', 'They are living things that feel pain and serve us well.', ['They are machines.', 'They do not feel anything.', 'They are wild.']),
    ],
  },
  hygiene: {
    facts: {
      categories: [
        { one: 'a personal hygiene practice', many: 'personal hygiene practices', items: ['bathing every day', 'brushing teeth after meals', 'cutting fingernails short', 'washing hands after using the toilet', 'wearing clean clothes', 'combing hair'], set: 'h' },
        { one: 'a habit that spreads germs', many: 'habits that spread germs', items: ['sharing towels', 'not washing hands before eating', 'biting fingernails', 'coughing without covering the mouth', 'wearing dirty clothes'], set: 'h' },
        { one: 'a disease caused by poor hygiene', many: 'diseases caused by poor hygiene', items: ['scabies', 'jiggers', 'ringworm', 'cholera', 'typhoid'], set: 'd' },
      ],
      pairs: [
        {
          pairs: [
            ['nail cutter', 'cut nails'],
            ['toothbrush', 'clean teeth'],
            ['comb', 'neaten hair'],
            ['towel', 'dry the body'],
            ['handkerchief', 'wipe the nose'],
            ['soap', 'remove dirt and germs'],
          ],
          ask: (a) => `We use a ${a} to ___.`,
          askBack: (b) => `Which item do we use to ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Keeping our bodies and clothes clean is called personal ___.', 'hygiene', ['nutrition', 'erosion', 'farming']),
      t(3, 'When should we wash our hands?', 'before eating and after using the toilet', ['only once a week', 'only after eating', 'never']),
      t(3, 'Jiggers can be prevented by ___.', 'wearing shoes and keeping floors clean', ['walking barefoot', 'sleeping on dusty floors', 'sharing shoes']),
      t(4, 'Why should we not share towels?', 'Germs and skin diseases can spread.', ['Towels become dry.', 'Towels are expensive.', 'It is good manners.']),
      { type: 'order', level: 4, prompt: 'Arrange the steps of washing hands correctly.', tiles: ['wet hands', 'apply soap', 'rub all parts', 'rinse', 'dry'], answer: ['wet hands', 'apply soap', 'rub all parts', 'rinse', 'dry'], joiner: ' → ' },
      t(5, 'A pupil has an itchy rash between the fingers that spread to a sibling who shares the same bed sheets. The disease is most likely ___.', 'scabies', ['malaria', 'tooth decay', 'rickets']),
      t(5, 'Which is the best way to keep nails clean?', 'cut them short and scrub them with soap', ['bite them', 'let them grow long', 'paint them only']),
    ],
  },
  foodgroups: {
    facts: {
      categories: FOOD_GROUPS,
      pairs: [
        {
          pairs: [
            ['energy-giving foods', 'give us energy to work and play'],
            ['body-building foods', 'help the body to grow and repair itself'],
            ['protective foods', 'protect the body from diseases'],
          ],
          ask: (a) => `What do ${a} do?`,
          askBack: (b) => `Which foods ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'A meal that has all the food groups in the right amounts is called a ___ diet.', 'balanced', ['heavy', 'light', 'sweet']),
      t(3, 'Ugali and sukuma wiki lack ___ foods.', 'body-building', ['energy-giving', 'protective', 'green']),
      t(3, 'Which meal is balanced?', 'rice, beans and cabbage', ['rice, chapati and bread', 'beans, eggs and meat', 'oranges, mangoes and pawpaw']),
      t(4, 'Which food group should a child recovering from a wound eat more of?', 'body-building foods', ['energy-giving foods only', 'sweets', 'soda']),
      t(4, 'A learner always feels tired and weak. Which foods should the learner add?', 'energy-giving foods like maize and sweet potatoes', ['only water', 'only sweets', 'only salt']),
      t(5, 'Which food should be added to a lunch of githeri to make it a balanced meal?', 'a green vegetable or fruit', ['bread', 'rice', 'more maize']),
      t(5, 'Why is drinking clean water important?', 'It helps digestion and keeps the body cool.', ['It gives proteins.', 'It makes us fat.', 'It replaces food completely.']),
    ],
  },
  cooking: {
    facts: {
      categories: [
        { one: 'a safe practice when preparing food', many: 'safe practices when preparing food', items: ['washing hands before cooking', 'washing vegetables before cutting', 'covering food', 'using clean utensils', 'boiling drinking water', 'cooking meat well'], set: 's' },
        { one: 'an unsafe practice when preparing food', many: 'unsafe practices when preparing food', items: ['leaving food uncovered', 'using a dirty knife', 'cutting vegetables before washing them', 'eating raw meat', 'keeping pets on the kitchen table'], set: 's' },
      ],
      pairs: [
        {
          pairs: [
            ['knife', 'cutting food'],
            ['chopping board', 'cutting food on safely'],
            ['peeler', 'removing skin from potatoes'],
            ['sieve', 'separating flour from husks'],
            ['grater', 'shredding carrots'],
            ['cooking stick (mwiko)', 'stirring ugali'],
          ],
          ask: (a) => `A ${a} is used for ___.`,
          askBack: (b) => `Which kitchen tool is used for ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'We should wash fruits before eating them to ___.', 'remove dirt and germs', ['make them sweet', 'make them big', 'add colour']),
      t(3, 'Why should vegetables be washed before they are cut?', 'so that vitamins are not washed away', ['so they cook faster', 'to make them soft', 'to remove the colour']),
      t(3, 'Which is the safest way to light a charcoal jiko?', 'outside, away from children', ['inside a closed bedroom', 'on a bed', 'near curtains']),
      { type: 'order', level: 4, prompt: 'Arrange the steps of boiling an egg.', tiles: ['wash the egg', 'put it in water', 'boil it', 'cool it', 'peel it'], answer: ['wash the egg', 'put it in water', 'boil it', 'cool it', 'peel it'], joiner: ' → ' },
      t(4, 'Why should vegetables not be overcooked?', 'Overcooking destroys vitamins.', ['They become too green.', 'They become poisonous.', 'They get more nutrients.']),
      t(5, 'Which is the best way to keep cooked food safe until supper?', 'cover it and keep it in a cool place', ['leave it open on the table', 'keep it near the dustbin', 'leave it in the sun']),
      t(5, 'A child spilt hot water while cooking. What first aid should be given?', 'cool the burn under clean running water', ['apply butter', 'apply soil', 'burst the blisters']),
    ],
  },
}

const G5: Record<string, Topic> = {
  soil: {
    facts: {
      categories: [
        { one: 'a property of sandy soil', many: 'properties of sandy soil', items: ['large particles', 'drains water quickly', 'holds little water', 'feels rough'], set: 'p' },
        { one: 'a property of clay soil', many: 'properties of clay soil', items: ['very fine particles', 'holds a lot of water', 'is sticky when wet', 'cracks when dry'], set: 'p' },
        { one: 'a property of loam soil', many: 'properties of loam soil', items: ['is dark and rich in humus', 'is best for most crops', 'holds enough water and air', 'is a mixture of sand, silt and clay'], set: 'p' },
      ],
      pairs: [
        {
          pairs: [
            ['splash erosion', 'raindrops hitting bare soil and throwing it about'],
            ['sheet erosion', 'a thin, even layer of soil being washed away'],
            ['rill erosion', 'small channels being cut by running water'],
            ['gully erosion', 'deep, wide channels being formed'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `Which type of erosion is ${b}?`,
        },
        {
          pairs: [
            ['gabions', 'wire boxes filled with stones that slow down water in gullies'],
            ['terraces', 'level steps that slow down run-off on slopes'],
            ['cover crops', 'plants that cover the soil from raindrops'],
            ['grass strips', 'bands of grass that trap soil on slopes'],
          ],
          ask: (a) => `What are ${a}?`,
          askBack: (b) => `What are ${b} called?`,
        },
      ],
    },
    bank: [
      t(2, 'Which soil is best for growing most crops?', 'loam soil', ['sandy soil', 'clay soil', 'gravel']),
      t(3, 'Which soil is best for making pots?', 'clay soil', ['sandy soil', 'loam soil', 'humus']),
      t(3, 'The first stage of soil erosion by water is ___ erosion.', 'splash', ['gully', 'rill', 'sheet']),
      t(4, 'Equal amounts of water were poured on sand, clay and loam in funnels. Which collected the most water in the shortest time?', 'sand', ['clay', 'loam', 'all the same']),
      t(4, 'Which soil type is most likely to become waterlogged?', 'clay soil', ['sandy soil', 'loam soil', 'gravel']),
      t(5, 'A farmer sees small channels forming on a sloping farm after rains. Which type of erosion is this, and what should be done?', 'rill erosion; plant grass strips and make terraces', ['gully erosion; burn the grass', 'splash erosion; plough downhill', 'sheet erosion; cut the trees']),
      t(5, 'Why does adding humus improve sandy soil?', 'Humus helps sandy soil hold more water and nutrients.', ['Humus makes the soil drain faster.', 'Humus makes the soil sticky like clay.', 'Humus removes air from the soil.']),
    ],
  },
  fuel: {
    facts: {
      categories: [
        { one: 'a renewable source of energy', many: 'renewable sources of energy', items: ['solar energy', 'wind energy', 'biogas', 'hydroelectric power'], set: 'r' },
        { one: 'a non-renewable source of energy', many: 'non-renewable sources of energy', items: ['petrol', 'diesel', 'paraffin', 'coal', 'cooking gas (LPG)'], set: 'r' },
        { one: 'a way of saving fuel when cooking', many: 'ways of saving fuel when cooking', items: ['covering the pot with a lid', 'soaking beans before cooking', 'using dry firewood', 'using an energy-saving jiko', 'putting out the fire after cooking', 'cutting food into small pieces'], set: 's' },
        { one: 'a way of wasting fuel', many: 'ways of wasting fuel', items: ['cooking with the pot uncovered', 'using wet firewood', 'leaving the fire burning after cooking', 'using a three-stone fire in the wind', 'cooking hard grains without soaking'], set: 's' },
      ],
      pairs: [
        {
          pairs: [
            ['a fireless cooker', 'keeps food cooking in an insulated basket without fire'],
            ['a solar cooker', 'uses sunlight to cook food'],
            ['a biogas digester', 'makes gas from animal dung'],
            ['an energy-saving jiko', 'burns less charcoal because it keeps heat in'],
          ],
          ask: (a) => `How does ${a} help to save fuel?`,
          askBack: (b) => `Which device ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Firewood, charcoal and gas are examples of ___.', 'fuels', ['foods', 'fertilisers', 'pests']),
      t(3, 'Biogas is made from ___.', 'animal dung and plant waste', ['petrol', 'stones', 'plastic']),
      t(3, 'Why should beans be soaked before cooking?', 'They cook faster and use less fuel.', ['They become sweeter.', 'They become harder.', 'They lose all their proteins.']),
      t(4, 'Which energy source is best for a school in a sunny, dry area far from power lines?', 'solar panels', ['a coal power station', 'a hydroelectric dam', 'a biogas digester with no animals']),
      t(4, 'Why is cutting trees for charcoal a problem?', 'It destroys forests and causes soil erosion.', ['It makes more rain.', 'It cleans the air.', 'It saves energy.']),
      t(5, 'Two pots of beans were cooked on similar fires. Pot A had a lid; pot B did not. Which cooked first and why?', 'Pot A, because the lid kept heat in.', ['Pot B, because air cools it.', 'Both at the same time.', 'Pot B, because steam escaped.']),
      t(5, 'Which is a benefit of a biogas plant on a dairy farm?', 'It gives cooking gas and the slurry is good manure.', ['It produces petrol.', 'It uses up firewood.', 'It needs no animals.']),
    ],
  },
  seedbeds: {
    facts: {
      categories: [
        { one: 'a crop raised in a nursery bed first', many: 'crops raised in a nursery bed first', items: ['tomatoes', 'cabbages', 'kales', 'onions', 'eggplant', 'tree seedlings'], set: 'n' },
        { one: 'a crop planted directly in the field', many: 'crops planted directly in the field', items: ['maize', 'beans', 'peas', 'carrots', 'millet', 'sorghum'], set: 'n' },
      ],
      pairs: [
        {
          pairs: [
            ['shading', 'protects young seedlings from strong sunlight'],
            ['pricking out', 'removes extra seedlings so the rest have space'],
            ['hardening off', 'reduces water and shade so seedlings are ready for the field'],
            ['mulching', 'keeps the soil moist and controls weeds'],
            ['watering', 'keeps the seedbed moist for germination'],
          ],
          ask: (a) => `Why is ${a} done in a nursery bed?`,
          askBack: (b) => `Which nursery practice ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'A small, well-prepared piece of land where seeds are sown before transplanting is a ___.', 'nursery bed', ['granary', 'kraal', 'compost pit']),
      t(3, 'Seedlings are ready for transplanting when they have about ___.', 'four to six leaves', ['one leaf', 'flowers and fruits', 'no leaves']),
      t(3, 'Why is a nursery bed made with fine soil?', 'so small seeds can germinate easily', ['to keep water out', 'to stop roots growing', 'to make it hard']),
      t(4, 'Why should a nursery bed be watered before seedlings are uprooted?', 'so seedlings come out with soil around their roots', ['to wash away the seedlings', 'to kill weeds', 'to make the seedlings grow taller']),
      t(4, 'When is the best time to transplant seedlings?', 'in the evening or on a cloudy day', ['at midday', 'during a storm', 'in the hottest month']),
      { type: 'order', level: 5, prompt: 'Arrange the steps of raising tomato seedlings.', tiles: ['prepare the bed', 'sow the seeds', 'mulch and water', 'harden off', 'transplant'], answer: ['prepare the bed', 'sow the seeds', 'mulch and water', 'harden off', 'transplant'], joiner: ' → ' },
      t(5, 'Seedlings in a nursery are thin, tall and pale. What is the most likely cause?', 'too much shade', ['too much sunlight', 'too little shade', 'too much manure']),
    ],
  },
  pests: {
    facts: {
      categories: [
        { one: 'a crop pest', many: 'crop pests', items: ['aphids', 'cutworms', 'maize stalk borer', 'weevils', 'fall armyworm', 'locusts'], set: 'p' },
        { one: 'a crop disease', many: 'crop diseases', items: ['tomato blight', 'maize streak', 'rust', 'groundnut rosette', 'smut'], set: 'p' },
        { one: 'a way of controlling pests', many: 'ways of controlling pests', items: ['hand-picking', 'spraying pesticides', 'crop rotation', 'early planting', 'using traps', 'using scarecrows'], set: 'c' },
        { one: 'a way of keeping wild animals off farms', many: 'ways of keeping wild animals off farms', items: ['beehive fences', 'chilli fences', 'electric fences', 'digging trenches', 'night guarding'], set: 'c' },
      ],
      pairs: [
        {
          pairs: [
            ['weevils', 'bore holes into stored grain'],
            ['maize stalk borer', 'bores into the stem of maize'],
            ['aphids', 'suck sap from leaves'],
            ['cutworms', 'cut seedlings at ground level'],
            ['quelea birds', 'eat grains in the field'],
            ['rats', 'eat stored grain and gnaw bags'],
          ],
          ask: (a) => `How do ${a} damage crops?`,
          askBack: (b) => `Which pest ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Animals that destroy crops are called ___.', 'pests', ['pets', 'weeds', 'manure']),
      t(3, 'Stored maize can be protected from weevils by ___.', 'drying it well and using hermetic bags', ['storing it wet', 'leaving it in the open', 'mixing it with water']),
      t(3, 'Why do farmers practise crop rotation?', 'to break the life cycle of pests and diseases', ['to grow the same crop forever', 'to attract pests', 'to make soil hard']),
      t(4, 'Elephants dislike bees. Why do some farmers near parks hang beehives on fences?', 'to keep elephants away from crops gently', ['to feed the elephants', 'to attract elephants', 'to make honey for elephants']),
      t(4, 'Young cabbage seedlings are found cut at the base every morning. Which pest is most likely responsible?', 'cutworms', ['weevils', 'aphids', 'quelea birds']),
      t(5, 'Which is the safest practice when spraying pesticides?', 'wear protective clothing and spray with the wind behind you', ['spray without gloves', 'spray into the wind', 'eat while spraying']),
      t(5, 'A farmer plants maize in the same field every season and the stalk borer problem keeps getting worse. What should the farmer do?', 'rotate maize with beans or another crop', ['plant maize more closely', 'stop weeding', 'water the maize at noon']),
    ],
  },
  animals: {
    facts: {
      categories: [
        { one: 'a chicken housing system', many: 'chicken housing systems', items: ['deep litter', 'battery cage', 'free range', 'fold system'], set: 'h' },
        { one: 'a chicken disease', many: 'chicken diseases', items: ['Newcastle disease', 'coccidiosis', 'fowl typhoid', 'fowl pox'], set: 'h' },
      ],
      pairs: [
        {
          pairs: [
            ['hen', 'an adult female chicken'],
            ['cock', 'an adult male chicken'],
            ['chick', 'a young chicken'],
            ['pullet', 'a young female chicken that has not started laying'],
            ['doe', 'a female rabbit'],
            ['buck', 'a male rabbit'],
            ['kits', 'young rabbits'],
          ],
          ask: (a) => `What is a ${a}?`,
          askBack: (b) => `What is the name for ${b}?`,
        },
        {
          pairs: [
            ['chick mash', 'young chicks'],
            ['growers mash', 'growing chickens'],
            ['layers mash', 'hens that are laying eggs'],
            ['broiler finisher', 'chickens raised for meat'],
          ],
          ask: (a) => `${a[0].toUpperCase()}${a.slice(1)} is fed to ___.`,
          askBack: (b) => `Which feed is given to ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'The house for rabbits is called a ___.', 'hutch', ['kraal', 'sty', 'kennel']),
      t(3, 'Chickens kept mainly for meat are called ___.', 'broilers', ['layers', 'cocks', 'pullets']),
      t(3, 'Why should a rabbit hutch be raised above the ground?', 'to keep it dry and safe from predators', ['to make it hot', 'to keep it dirty', 'to make rabbits jump']),
      t(4, 'Chickens on a farm have twisted necks, green droppings and many are dying. What disease is this, and how is it prevented?', 'Newcastle disease; vaccination', ['coccidiosis; more feed', 'rickets; sunlight', 'scurvy; oranges']),
      t(4, 'Which feed is best for laying hens?', 'layers mash', ['chick mash', 'broiler finisher', 'grass only']),
      t(5, 'Bloody droppings are seen in chicks kept on wet, dirty litter. Which disease is likely and what should be done?', 'coccidiosis; keep litter dry and treat with a coccidiostat', ['Newcastle; give layers mash', 'fowl pox; wet the litter more', 'rabies; vaccinate dogs']),
      t(5, 'Which is an advantage of the deep litter system?', 'Many birds can be kept in a small space and manure is collected.', ['Birds find their own food.', 'Birds never get diseases.', 'No housing is needed.']),
    ],
  },
  hygiene: {
    facts: {
      categories: [
        { one: 'a good kitchen hygiene practice', many: 'good kitchen hygiene practices', items: ['washing utensils with soap and clean water', 'drying utensils on a rack', 'keeping food covered', 'putting waste in a covered bin', 'washing hands before handling food', 'cleaning surfaces after cooking'], set: 'k' },
        { one: 'a poor kitchen hygiene practice', many: 'poor kitchen hygiene practices', items: ['leaving dirty dishes overnight', 'letting pets onto the table', 'using the same board for raw meat and vegetables without washing it', 'leaving waste uncovered', 'drying dishes with a dirty cloth'], set: 'k' },
      ],
      pairs: [
        {
          pairs: [
            ['a non-stick pan', 'a soft sponge, not wire wool'],
            ['a glass', 'warm soapy water, washed first'],
            ['a sooty pot', 'scouring with sand or ash'],
            ['a wooden spoon', 'washing and drying it in the sun'],
          ],
          ask: (a) => `How should ${a} be cleaned?`,
          askBack: (b) => `Which item should be cleaned using ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Keeping the kitchen and utensils clean is called kitchen ___.', 'hygiene', ['nutrition', 'farming', 'erosion']),
      t(3, 'Which utensils should be washed first?', 'glasses and cups', ['greasy pots', 'sooty sufurias', 'cooking sticks']),
      t(3, 'Why should kitchen waste be put in a covered bin?', 'to keep away flies and bad smell', ['to make it rot faster', 'to feed pets', 'to keep it warm']),
      { type: 'order', level: 4, prompt: 'Arrange the order of washing utensils.', tiles: ['glasses', 'cups', 'plates', 'cutlery', 'pots'], answer: ['glasses', 'cups', 'plates', 'cutlery', 'pots'], joiner: ' → ' },
      t(4, 'Why should raw meat be cut on a separate board?', 'to stop germs from raw meat getting into other food', ['to make the meat sweeter', 'because meat is heavy', 'to save water']),
      t(5, 'Many flies are seen in a school kitchen. What is the most likely cause?', 'uncovered food and waste', ['clean surfaces', 'covered bins', 'washed utensils']),
      t(5, 'Why are utensils dried on a rack in the sun instead of with a dirty cloth?', 'Sunlight helps kill germs and a dirty cloth spreads them.', ['Racks make utensils heavier.', 'Cloths remove all germs.', 'Sunlight makes utensils rust.']),
    ],
  },
  preserve: {
    facts: {
      categories: [
        { one: 'a sign that food has gone bad', many: 'signs that food has gone bad', items: ['a bad smell', 'mould growing on it', 'a change in colour', 'a sour taste', 'a slimy feel'], set: 's' },
        { one: 'a way of storing food well', many: 'ways of storing food well', items: ['using airtight containers', 'drying grains before storing', 'using a raised granary', 'keeping food in a cool place', 'using hermetic bags'], set: 's' },
      ],
      pairs: [
        {
          pairs: [
            ['sun drying', 'omena'],
            ['fermenting', 'mursik (sour milk)'],
            ['smoking', 'fish over a fire'],
            ['salting', 'meat or fish rubbed with salt'],
            ['refrigerating', 'milk kept cold'],
            ['making jam', 'fruit cooked with sugar'],
          ],
          ask: (a) => `Which food is preserved by ${a}?`,
          askBack: (b) => `How is ${b} preserved?`,
        },
      ],
    },
    bank: [
      t(2, 'Keeping food for a long time without it going bad is called food ___.', 'preservation', ['digestion', 'pollution', 'germination']),
      t(3, 'Food goes bad mainly because of ___.', 'germs such as bacteria and moulds', ['too much salt', 'sunlight on dry grain', 'airtight containers']),
      t(3, 'Why must maize be well dried before storing?', 'Moist grain rots and grows moulds.', ['Dry maize is heavier.', 'Wet maize keeps weevils away.', 'Drying adds proteins.']),
      t(4, 'How does drying preserve food?', 'It removes the water germs need to grow.', ['It adds germs.', 'It makes food wet.', 'It makes food warm.']),
      t(4, 'How does salting preserve meat?', 'Salt draws water out so germs cannot grow.', ['Salt makes meat sweet.', 'Salt adds water.', 'Salt cooks the meat.']),
      t(5, 'A family has plenty of mangoes in season. Which method lets them eat mangoes months later?', 'drying slices or making jam', ['leaving them on the floor', 'putting them in water', 'storing them in a hot room']),
      t(5, 'Why is a granary built on raised poles?', 'to keep grain dry and away from rats', ['to make it easy for rats to enter', 'to keep the grain wet', 'to catch rain water']),
    ],
  },
  foodgroups: {
    facts: {
      categories: FOOD_GROUPS,
      pairs: [
        {
          pairs: [
            ['carbohydrates', 'give the body energy'],
            ['proteins', 'build and repair the body'],
            ['vitamins', 'protect the body from diseases'],
            ['fats and oils', 'give energy and keep the body warm'],
            ['roughage', 'helps the movement of food in the gut'],
            ['water', 'helps digestion and controls body temperature'],
          ],
          ask: (a) => `What do ${a} do in the body?`,
          askBack: (b) => `Which nutrient ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Rice and potatoes are rich in ___.', 'carbohydrates', ['proteins', 'vitamins', 'roughage only']),
      t(3, 'Which of these meals is balanced?', 'ugali, fish and sukuma wiki', ['ugali, rice and chapati', 'tea and bread', 'fish, eggs and meat']),
      t(3, 'Which nutrient is found in large amounts in groundnuts and avocado?', 'fats and oils', ['vitamin C', 'water', 'roughage only']),
      t(4, 'A breakfast has tea, bread and an egg. Which food group is missing?', 'protective foods', ['energy-giving foods', 'body-building foods', 'none']),
      t(4, 'Why do growing children need more body-building foods?', 'Their bodies are growing quickly.', ['They are always sleeping.', 'They do not move.', 'They need less food.']),
      t(5, 'A family meal plan for one day is: breakfast – porridge; lunch – rice and beans; supper – ugali and beef. What is lacking most?', 'fruits and vegetables', ['energy-giving foods', 'body-building foods', 'water']),
      t(5, 'Which group of foods would give a pupil the most energy for a sports day?', 'ugali, sweet potatoes and bananas', ['spinach, cabbage and carrots', 'water, tea and salt', 'eggs only']),
    ],
  },
}

const G6: Record<string, Topic> = {
  compost: {
    facts: {
      categories: [
        { one: 'a material for making compost', many: 'materials for making compost', items: ['crop remains', 'vegetable peelings', 'dry leaves', 'animal dung', 'wood ash', 'grass cuttings'], set: 'c' },
        { one: 'a material that should NOT go in compost', many: 'materials that should not go in compost', items: ['plastic bags', 'glass', 'metal cans', 'polythene', 'broken bottles'], set: 'c' },
        { one: 'a type of organic manure', many: 'types of organic manure', items: ['compost manure', 'farmyard manure', 'green manure', 'poultry manure'], set: 'm' },
        { one: 'an inorganic fertiliser', many: 'inorganic fertilisers', items: ['DAP', 'CAN', 'NPK', 'urea'], set: 'm' },
      ],
      pairs: [
        {
          pairs: [
            ['compost manure', 'rotted plant and kitchen waste'],
            ['farmyard manure', 'animal dung mixed with bedding'],
            ['green manure', 'green plants such as legumes dug into the soil'],
          ],
          ask: (a) => `What is ${a} made from?`,
          askBack: (b) => `Which manure is made from ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Manure made from decayed plant and animal waste is called ___ manure.', 'organic', ['inorganic', 'plastic', 'mineral']),
      t(3, 'How can you tell that compost is ready to use?', 'It is dark, crumbly and has no bad smell.', ['It is green and fresh.', 'It smells very bad.', 'It is still hot.']),
      t(3, 'Why is a compost heap turned regularly?', 'to let in air so materials rot well', ['to cool the farm', 'to make it wet', 'to remove all the waste']),
      t(4, 'Which is an advantage of organic manure over inorganic fertiliser?', 'It improves the soil structure.', ['It works instantly.', 'It is always bought from shops.', 'It is a chemical.']),
      t(4, 'A stick pushed into a compost heap is warm when pulled out. This shows that ___.', 'materials are decomposing', ['the heap is dry', 'nothing is happening', 'the heap is ready to use']),
      { type: 'order', level: 5, prompt: 'Arrange the layers of a compost heap from the bottom.', tiles: ['dry twigs', 'dry plant materials', 'green materials', 'animal dung', 'top soil'], answer: ['dry twigs', 'dry plant materials', 'green materials', 'animal dung', 'top soil'], joiner: ' → ' },
      t(5, 'Why are legumes like beans good for green manure?', 'Their roots add nitrogen to the soil.', ['They have no roots.', 'They poison weeds.', 'They make the soil sandy.']),
    ],
  },
  water: {
    facts: {
      categories: [
        { one: 'a way of harvesting water', many: 'ways of harvesting water', items: ['roof catchment', 'water pans', 'dams', 'rock catchment', 'zai pits', 'underground tanks'], set: 'h' },
        { one: 'a water storage container', many: 'water storage containers', items: ['plastic tank', 'jerrican', 'drum', 'pot', 'underground tank'], set: 's' },
        { one: 'a way of making stored water safe', many: 'ways of making stored water safe', items: ['covering the container', 'cleaning the tank regularly', 'boiling water before drinking', 'adding water treatment tablets'], set: 'safe' },
        { one: 'a way stored water gets contaminated', many: 'ways stored water gets contaminated', items: ['leaving the tank open', 'dipping dirty cups into it', 'never cleaning the gutters', 'animals drinking from it'], set: 'safe' },
      ],
      pairs: [
        {
          pairs: [
            ['zai pits', 'small pits that hold water and manure near crops'],
            ['rock catchment', 'collecting rain that runs off large rocks'],
            ['roof catchment', 'collecting rain from roofs with gutters'],
            ['water pans', 'shallow ponds that collect run-off'],
          ],
          ask: (a) => `What are ${a}?`,
          askBack: (b) => `What is ${b} called?`,
        },
      ],
    },
    bank: [
      t(2, 'Collecting and storing rain water for later use is called water ___.', 'harvesting', ['pollution', 'evaporation', 'erosion']),
      t(3, 'Why are gutters cleaned before the rains?', 'so that the harvested water is clean', ['to make them heavy', 'to stop the rain', 'to make them rust']),
      t(3, 'Which method of irrigation uses the least water?', 'drip irrigation', ['flood irrigation', 'overhead sprinklers at noon', 'pouring buckets everywhere']),
      t(4, 'A roof is 10 m long and 6 m wide. If each square metre collects 20 litres in a storm, how much water is collected?', '1,200 litres', ['120 litres', '600 litres', '200 litres']),
      t(4, 'Which water harvesting method suits a dry area with large bare rocks?', 'rock catchment', ['roof catchment only', 'drip irrigation', 'flood irrigation']),
      t(5, 'Why should water tanks be placed on a raised stand?', 'so water flows out by gravity and the tank stays clean', ['to make the water hot', 'so animals can drink', 'to stop rain falling in']),
      t(5, 'A farmer in a dry area digs small pits, adds manure and plants seeds in them. What is this method called?', 'zai pits', ['terracing', 'gabions', 'contour ploughing']),
    ],
  },
  crops: {
    facts: {
      categories: [
        { one: 'a cereal crop', many: 'cereal crops', items: ['maize', 'wheat', 'rice', 'sorghum', 'millet', 'barley'], set: 'c' },
        { one: 'a legume', many: 'legumes', items: ['beans', 'peas', 'cowpeas', 'green grams', 'groundnuts', 'soya beans'], set: 'c' },
        { one: 'a root or tuber crop', many: 'root and tuber crops', items: ['cassava', 'sweet potatoes', 'arrowroots', 'yams', 'Irish potatoes'], set: 'c' },
        { one: 'a cash crop grown in Kenya', many: 'cash crops grown in Kenya', items: ['tea', 'coffee', 'pyrethrum', 'sugarcane', 'cotton', 'sisal'], set: 'cash' },
        { one: 'a food crop', many: 'food crops', items: ['maize', 'beans', 'kales', 'sweet potatoes', 'sorghum'], set: 'cash' },
      ],
      pairs: [
        {
          pairs: [
            ['gapping', 'filling spaces where seeds did not germinate'],
            ['thinning', 'removing extra seedlings from a hole'],
            ['top-dressing', 'adding fertiliser around growing crops'],
            ['earthing up', 'heaping soil around the base of plants like potatoes'],
            ['pruning', 'cutting off unwanted branches'],
            ['staking', 'supporting plants with sticks'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `What is ${b} called?`,
        },
      ],
    },
    bank: [
      t(2, 'Removing weeds from a farm is called ___.', 'weeding', ['harvesting', 'gapping', 'pruning']),
      t(3, 'Why do farmers plant maize at the correct spacing?', 'so each plant gets enough light, water and nutrients', ['to use more seeds', 'to help weeds grow', 'to make harvesting harder']),
      t(3, 'Which fertiliser is commonly used for planting maize?', 'DAP', ['CAN', 'urea for top-dressing only', 'salt']),
      { type: 'order', level: 4, prompt: 'Arrange the stages of growing maize.', tiles: ['clear the land', 'plough', 'plant', 'weed', 'harvest'], answer: ['clear the land', 'plough', 'plant', 'weed', 'harvest'], joiner: ' → ' },
      t(4, 'Why are Irish potatoes earthed up?', 'to cover the tubers so they do not turn green', ['to expose the tubers to sun', 'to remove the roots', 'to stop the rain']),
      t(5, 'Maize seeds were planted two per hole. Two weeks later some holes had no seedlings and some had three. What should the farmer do?', 'gap the empty holes and thin the crowded ones', ['uproot all the maize', 'top-dress immediately', 'stake the maize']),
      t(5, 'Why do farmers rotate maize with beans?', 'Beans add nitrogen to the soil and break pest cycles.', ['Beans use up all the nitrogen.', 'Maize and beans are the same crop.', 'It increases soil erosion.']),
    ],
  },
  animals: {
    facts: {
      categories: [
        { one: 'a sign of a healthy animal', many: 'signs of a healthy animal', items: ['it is alert', 'it feeds well', 'it has a smooth, shiny coat', 'it has normal droppings', 'it moves with the herd'], set: 'h' },
        { one: 'a sign of a sick animal', many: 'signs of a sick animal', items: ['it is dull', 'it refuses food', 'it has a rough coat', 'it has discharge from the nose', 'it isolates itself'], set: 'h' },
        { one: 'a roughage feed', many: 'roughage feeds', items: ['hay', 'napier grass', 'maize stalks', 'silage'], set: 'f' },
        { one: 'a concentrate feed', many: 'concentrate feeds', items: ['dairy meal', 'layers mash', 'maize bran', 'cotton seed cake'], set: 'f' },
      ],
      pairs: [
        {
          pairs: [
            ['ticks', 'dipping or spraying'],
            ['worms', 'deworming'],
            ['fleas', 'dusting with insecticide'],
            ['Newcastle disease', 'vaccination'],
          ],
          ask: (a) => `How are ${a} controlled in animals?`,
          askBack: (b) => `Which problem is controlled by ${b}?`,
        },
        {
          pairs: [
            ['zero-grazing unit', 'dairy cattle'],
            ['kraal', 'cattle at night'],
            ['sty', 'pigs'],
            ['hutch', 'rabbits'],
            ['coop', 'chickens'],
          ],
          ask: (a) => `A ${a} is used to house ___.`,
          askBack: (b) => `Which house is used for ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Hay and napier grass are examples of ___ feeds.', 'roughage', ['concentrate', 'mineral', 'vitamin']),
      t(3, 'Why do farmers give animals mineral licks?', 'to supply minerals missing in their feed', ['to make them thirsty only', 'to remove ticks', 'to clean their teeth']),
      t(3, 'Why should a sick animal be separated from the others?', 'to stop the disease spreading', ['to give it more space to run', 'to punish it', 'to make it eat']),
      t(4, 'A cow is dull, has a high temperature and swollen lymph nodes. The farm has many ticks. What disease is likely?', 'East Coast fever', ['Newcastle disease', 'coccidiosis', 'rickets']),
      t(4, 'Which is the main advantage of zero-grazing?', 'More milk from little land and easy collection of manure', ['Cows find their own food', 'No feeding is needed', 'Cows never fall sick']),
      t(5, 'A calf has a big belly, a rough coat and is growing slowly, though it eats well. What should the farmer do first?', 'deworm the calf', ['stop feeding it', 'dip it only', 'sell the mother']),
      t(5, 'Why must a farmer keep records of vaccination and treatment?', 'to plan the next treatments and track animal health', ['to sell more feed', 'to stop feeding animals', 'to make animals grow faster']),
    ],
  },
  hygiene: {
    facts: {
      categories: [
        { one: 'a disease spread by contaminated food or water', many: 'diseases spread by contaminated food or water', items: ['cholera', 'typhoid', 'dysentery', 'diarrhoea'], set: 'd' },
        { one: 'a disease spread through the air', many: 'diseases spread through the air', items: ['tuberculosis', 'common cold', 'measles', 'influenza'], set: 'd' },
        { one: 'a disease spread by a vector', many: 'diseases spread by vectors', items: ['malaria', 'sleeping sickness', 'dengue fever', 'yellow fever'], set: 'd' },
        { one: 'a useful microorganism activity', many: 'useful microorganism activities', items: ['making yoghurt', 'making bread rise', 'rotting compost', 'fermenting mursik'], set: 'u' },
        { one: 'a harmful microorganism activity', many: 'harmful microorganism activities', items: ['causing cholera', 'spoiling food', 'causing tooth decay', 'causing ringworm'], set: 'u' },
      ],
      pairs: [
        {
          pairs: [
            ['malaria', 'sleeping under a treated mosquito net'],
            ['cholera', 'drinking boiled or treated water'],
            ['bilharzia', 'not bathing in still water with snails'],
            ['jiggers', 'wearing shoes and smearing floors'],
            ['tuberculosis', 'covering the mouth when coughing and opening windows'],
          ],
          ask: (a) => `Which is a way to prevent ${a}?`,
          askBack: (b) => `Which disease is prevented by ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Living things too small to be seen without a microscope are called ___.', 'microorganisms', ['insects', 'weeds', 'seeds']),
      t(3, 'Which is used in baking to make bread rise?', 'yeast', ['salt', 'sugar only', 'soap']),
      t(3, 'An animal such as a mosquito that carries germs from one person to another is called a ___.', 'vector', ['pest', 'host', 'predator']),
      t(4, 'Why should we not eat food sold near open drainage?', 'Flies carry germs from the dirt to the food.', ['The food is too cheap.', 'The food is too hot.', 'It has too many vitamins.']),
      t(4, 'Many people in a village have diarrhoea and vomiting after a flood. Which disease is most likely and what is the first prevention step?', 'cholera; boil or treat drinking water', ['malaria; wear shoes', 'TB; eat more meat', 'rickets; stay in the sun']),
      t(5, 'A learner left two slices of bread, one dry and one damp, in a warm place. Mould grew on the damp one first. What does this show?', 'Moulds need moisture to grow.', ['Moulds need dry places.', 'Bread cannot go bad.', 'Warmth stops moulds.']),
      t(5, 'Which practice protects a whole community from malaria?', 'clearing bushes and draining stagnant water', ['keeping water in open containers', 'sleeping without nets', 'growing tall grass near houses']),
    ],
  },
  nutrition: {
    facts: {
      categories: [
        { one: 'a food rich in vitamin A', many: 'foods rich in vitamin A', items: ['carrots', 'pumpkins', 'mangoes', 'orange-fleshed sweet potatoes', 'liver'], set: 'v' },
        { one: 'a food rich in vitamin C', many: 'foods rich in vitamin C', items: ['oranges', 'lemons', 'guavas', 'pawpaw', 'tomatoes'], set: 'v' },
        { one: 'a food rich in iron', many: 'foods rich in iron', items: ['liver', 'dark green vegetables', 'beans', 'red meat', 'omena'], set: 'v2' },
        { one: 'a food rich in calcium', many: 'foods rich in calcium', items: ['milk', 'yoghurt', 'cheese', 'small fish eaten with bones'], set: 'v2' },
      ],
      pairs: [
        {
          pairs: [
            ['kwashiorkor', 'lack of proteins'],
            ['marasmus', 'lack of energy foods and all nutrients'],
            ['rickets', 'lack of vitamin D and calcium'],
            ['scurvy', 'lack of vitamin C'],
            ['night blindness', 'lack of vitamin A'],
            ['anaemia', 'lack of iron'],
            ['goitre', 'lack of iodine'],
          ],
          ask: (a) => `${a[0].toUpperCase()}${a.slice(1)} is caused by ___.`,
          askBack: (b) => `Which deficiency disease is caused by ${b}?`,
        },
        {
          pairs: [
            ['a swollen stomach, swollen feet and brown, thin hair', 'kwashiorkor'],
            ['a very thin body and an old-looking face', 'marasmus'],
            ['bow legs and soft bones', 'rickets'],
            ['bleeding, swollen gums', 'scurvy'],
            ['a swelling at the front of the neck', 'goitre'],
            ['pale skin and tiredness', 'anaemia'],
          ],
          ask: (a) => `A child has ${a}. Which disease is this?`,
          askBack: (b) => `What are the signs of ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'A disease caused by lack of a nutrient in the diet is called a ___ disease.', 'deficiency', ['infectious', 'water-borne', 'air-borne']),
      t(3, 'Our skin makes vitamin D when it is exposed to ___.', 'sunlight', ['rain', 'darkness', 'cold air']),
      t(3, 'Goitre can be prevented by using ___.', 'iodised salt', ['sugar', 'cooking oil', 'baking powder']),
      t(4, 'A child eats only ugali and tea every day and has swollen feet and brown hair. What should be added to the diet?', 'beans, milk, eggs or fish', ['more ugali', 'more sugar', 'soda']),
      t(4, 'Why should vegetables be cooked for a short time with the lid on?', 'to keep vitamins from being destroyed', ['to make them taste bitter', 'to add fat', 'to remove water only']),
      t(5, 'A pupil cannot see well in dim light in the evening. Which foods would help most?', 'carrots and dark green vegetables', ['white bread and tea', 'sugar and sweets', 'soda and chips']),
      t(5, 'Which meal best helps a girl with anaemia?', 'liver, spinach and ugali', ['bread and tea', 'rice and potatoes', 'chips and soda']),
    ],
  },
  cooking: {
    facts: {
      categories: [
        { one: 'a moist-heat cooking method', many: 'moist-heat cooking methods', items: ['boiling', 'steaming', 'stewing', 'poaching'], set: 'm' },
        { one: 'a dry-heat cooking method', many: 'dry-heat cooking methods', items: ['roasting', 'baking', 'grilling', 'frying'], set: 'm' },
        { one: 'a safety rule in the kitchen', many: 'safety rules in the kitchen', items: ['turn pan handles inwards', 'use oven gloves for hot pots', 'never leave cooking unattended', 'keep children away from the fire', 'put out the fire after cooking'], set: 's' },
        { one: 'a dangerous kitchen habit', many: 'dangerous kitchen habits', items: ['pouring water on burning oil', 'leaving a knife in soapy water', 'wearing loose sleeves near fire', 'leaving gas on after cooking', 'playing near the cooker'], set: 's' },
      ],
      pairs: [
        {
          pairs: [
            ['chapati', 'shallow frying'],
            ['mandazi', 'deep frying'],
            ['cake', 'baking'],
            ['maize on the cob over hot charcoal', 'roasting'],
            ['eggs in hot water', 'boiling'],
            ['vegetables over boiling water in a covered sieve', 'steaming'],
          ],
          ask: (a) => `Which cooking method is used for ${a}?`,
          askBack: (b) => `Which food is usually cooked by ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Cooking food in an oven is called ___.', 'baking', ['boiling', 'frying', 'steaming']),
      t(3, 'Which cooking method keeps the most vitamins in vegetables?', 'steaming', ['deep frying', 'boiling for a long time', 'roasting until black']),
      t(3, 'What should you do if oil in a pan catches fire?', 'cover the pan with a lid or damp cloth', ['pour water on it', 'carry it outside quickly', 'blow on it']),
      t(4, 'Why should people with heart problems eat less fried food?', 'Fried food has a lot of fat.', ['Fried food has no energy.', 'Fried food has too much vitamin C.', 'Fried food is cold.']),
      t(4, 'Why are pan handles turned inwards on a cooker?', 'so that no one knocks the pan and gets burnt', ['so the food cooks faster', 'so the pan stays cold', 'to save gas']),
      t(5, 'A learner boiled cabbage for 40 minutes in an open pot. What went wrong?', 'Overcooking destroyed many vitamins.', ['The cabbage gained proteins.', 'It was cooked too fast.', 'Nothing went wrong.']),
      t(5, 'Which is the best meal for a picnic that will be eaten hours later without heating?', 'boiled eggs, roasted maize and fruit', ['soup in an open pot', 'raw meat', 'fresh milk left in the sun']),
    ],
  },
}

const ALL: Record<string, Topic> = {}
for (const [g, set] of [[4, G4], [5, G5], [6, G6]] as const) for (const [k, v] of Object.entries(set)) ALL[`u${g}a-${k}`] = v

export const UPPER_AGRICULTURE_GENERATORS: Record<string, Generator> = Object.fromEntries(Object.entries(ALL).map(([k, v]) => [k, factGenerator(v.facts)]))
export const UPPER_AGRICULTURE_BANKS: Record<string, BankQuestion[]> = Object.fromEntries(Object.entries(ALL).map(([k, v]) => [k, v.bank]))
