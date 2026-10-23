import { an } from '../helpers'
// Science and Technology, Grades 4–6. Each sub-strand has a table of checked facts (the
// question maker turns it into many questions) and written questions in the style of
// KPSEA's Integrated Science paper: experiments, observations and applying an idea.
// All content is original.
import { factGenerator, type FactSet } from '../facts'
import { labelOptions as opts } from '../generators/english'
import type { BankQuestion, Generator, Level } from '../types'

const t = (level: Level, prompt: string, answer: string, wrong: string[]): BankQuestion => ({ type: 'choice', level, prompt, options: opts([answer, ...wrong]), answer })

interface Topic {
  facts: FactSet
  bank: BankQuestion[]
}

// ── Grade 4 ─────────────────────────────────────────────────────────────────

const G4: Record<string, Topic> = {
  plants: {
    facts: {
      categories: [
        { one: 'a plant whose roots we eat', many: 'plants whose roots we eat', items: ['carrot', 'cassava', 'sweet potato', 'beetroot', 'radish'], set: 'eat' },
        { one: 'a plant whose leaves we eat', many: 'plants whose leaves we eat', items: ['kale (sukuma wiki)', 'spinach', 'cabbage', 'amaranth (terere)', 'lettuce'], set: 'eat' },
        { one: 'a plant whose seeds we eat', many: 'plants whose seeds we eat', items: ['maize', 'beans', 'rice', 'wheat', 'green grams', 'peas'], set: 'eat' },
        { one: 'a fruit we eat', many: 'fruits we eat', items: ['mango', 'orange', 'avocado', 'pawpaw', 'passion fruit', 'pineapple'], set: 'eat' },
      ],
      pairs: [
        {
          pairs: [
            ['roots', 'hold the plant firmly in the soil'],
            ['stem', 'hold the plant up and carry water'],
            ['leaves', 'make food for the plant'],
            ['flower', 'produce seeds'],
            ['fruit', 'protect the seeds'],
            ['seed', 'grow into a new plant'],
          ],
          ask: (a) => `What is the main work of the ${a} of a plant?`,
          askBack: (b) => `Which part of a plant does this work: "${b}"?`,
        },
        {
          pairs: [
            ['sunlight', 'leaves turn yellow and the plant grows thin and pale'],
            ['water', 'the leaves droop and the plant wilts'],
            ['air', 'the plant cannot make food or breathe'],
          ],
          ask: (a) => `A plant is kept without ${a}. What will happen?`,
          askBack: (b) => `A plant's ${b}. Which need is missing?`,
        },
      ],
    },
    bank: [
      t(2, 'Plants make their own food in the ___.', 'leaves', ['roots', 'flowers', 'seeds']),
      t(2, 'Which of these do plants need to make food?', 'sunlight, water and air', ['soil, stones and sand', 'darkness and cold', 'salt and sugar']),
      t(3, 'Which of these is a stem that we eat?', 'Irish potato', ['sweet potato', 'carrot', 'cassava']),
      t(3, 'Which gas do green plants give out when they make food?', 'oxygen', ['carbon dioxide', 'smoke', 'steam']),
      t(3, 'Why do farmers remove weeds from a garden?', 'Weeds compete with crops for water, nutrients and light.', ['Weeds give crops extra food and keep them healthy.', 'Weeds stop the rain from reaching the crops.', 'Weeds make the soil too wet for the crops.']),
      t(4, 'Wanjiru put a bean seedling in a dark box with a small hole on one side. After a week, the shoot had bent towards the hole. This shows that plants grow towards ___.', 'light', ['water', 'darkness', 'the soil']),
      t(4, 'A learner covered one leaf of a potted plant with black paper for three days. The covered leaf turned pale. What was the leaf lacking?', 'sunlight', ['water', 'soil', 'roots']),
      t(4, 'The green colouring in leaves that traps sunlight is called ___.', 'chlorophyll', ['pollen', 'nectar', 'sap']),
      t(4, 'Which part of a plant takes in water from the soil?', 'roots', ['leaves', 'flowers', 'fruits']),
      t(5, 'Two similar seedlings were planted. One was watered daily; the other was not watered. After a week, the unwatered one had drooping leaves. What was the experiment testing?', 'whether plants need water', ['whether plants need light', 'whether plants need air', 'whether plants need soil']),
      t(5, 'Why are plants important to animals?', 'They give animals food and oxygen.', ['They make the air dirty.', 'They eat animals.', 'They give out carbon dioxide only.']),
      t(5, 'A learner dipped a white flower stem in water with red ink. Later, the petals had red lines. This shows that the stem ___.', 'carries water up the plant', ['makes food for the plant', 'stores the plant\'s seeds', 'holds the roots in place']),
    ],
  },
  animals: {
    facts: {
      categories: [
        { one: 'a domestic animal', many: 'domestic animals', items: ['cow', 'goat', 'sheep', 'donkey', 'camel', 'dog', 'pig'], set: 'kind' },
        { one: 'a wild animal', many: 'wild animals', items: ['lion', 'zebra', 'giraffe', 'elephant', 'leopard', 'hippopotamus', 'cheetah'], set: 'kind' },
        { one: 'a plant-eating animal (herbivore)', many: 'plant-eating animals', items: ['cow', 'rabbit', 'zebra', 'giraffe', 'goat', 'antelope'], set: 'diet' },
        { one: 'a flesh-eating animal (carnivore)', many: 'flesh-eating animals', items: ['lion', 'leopard', 'cheetah', 'hyena', 'eagle', 'crocodile'], set: 'diet' },
        { one: 'an animal that eats both plants and animals (omnivore)', many: 'animals that eat both plants and animals', items: ['pig', 'baboon', 'human being', 'hen', 'rat'], set: 'diet' },
        { one: 'an animal that lives only in water', many: 'animals that live only in water', items: ['tilapia', 'octopus', 'whale', 'shark', 'Nile perch'], set: 'home' },
        { one: 'an animal that lives in water and on land', many: 'animals that live in water and on land', items: ['frog', 'crocodile', 'hippopotamus', 'toad', 'newt'], set: 'home' },
        { one: 'an animal that lives only on land', many: 'animals that live only on land', items: ['camel', 'goat', 'lion', 'rabbit', 'giraffe'], set: 'home' },
      ],
      pairs: [
        {
          pairs: [
            ['bee', 'hive'],
            ['bird', 'nest'],
            ['dog', 'kennel'],
            ['pig', 'sty'],
            ['horse', 'stable'],
            ['lion', 'den'],
            ['spider', 'web'],
            ['rabbit', 'hutch'],
          ],
          ask: (a) => `The home of ${an(a)} is called a ___.`,
          askBack: (b) => `Which animal lives in ${an(b)}?`,
        },
      ],
    },
    bank: [
      t(2, 'Animals that are kept at home are called ___ animals.', 'domestic', ['wild', 'nocturnal', 'water']),
      t(3, 'Which animal is active at night and sleeps during the day?', 'owl', ['hen', 'cow', 'goat']),
      t(3, 'Animals that are active at night are called ___ animals.', 'nocturnal', ['domestic', 'herbivorous', 'aquatic']),
      t(4, 'A chameleon changes its colour to match its surroundings. This helps it to ___.', 'hide from enemies and catch prey', ['keep its body warm at night', 'breathe more easily in the trees', 'grow faster during the rains']),
      t(4, 'Which group has only animals that feed on grass?', 'cow, zebra, sheep', ['cow, lion, goat', 'dog, sheep, zebra', 'hyena, cow, zebra']),
      t(4, 'Why do lions have sharp claws and teeth?', 'to catch and tear their prey', ['to dig for roots', 'to climb trees for fruit', 'to chew grass']),
      t(5, 'In the food chain grass → zebra → lion, which animal is the carnivore?', 'lion', ['zebra', 'grass', 'all of them']),
      t(5, 'Fish breathe in water using ___.', 'gills', ['lungs', 'their skin only', 'their fins']),
      t(5, 'Which of these animals helps farmers by eating pests such as rats?', 'cat', ['goat', 'cow', 'donkey']),
      t(5, 'A farmer noticed fewer bees on her farm. Which would most likely be affected?', 'pollination of her crops', ['the colour of the soil', 'the amount of rain', 'the height of her fence']),
    ],
  },
  teeth: {
    facts: {
      categories: [
        { one: 'a good habit for healthy teeth', many: 'good habits for healthy teeth', items: ['brushing teeth twice a day', 'visiting a dentist regularly', 'eating crunchy fruits and vegetables', 'rinsing the mouth after meals', 'using a clean toothbrush', 'cleaning teeth with a chewing stick (mswaki)'], set: 'care' },
        { one: 'a habit that damages teeth', many: 'habits that damage teeth', items: ['eating many sweets', 'opening bottles with teeth', 'drinking many sugary drinks', 'chewing hard objects like pens', 'going to bed without brushing', 'sharing a toothbrush'], set: 'care' },
      ],
      pairs: [
        {
          pairs: [
            ['incisors', 'cutting and biting food'],
            ['canines', 'tearing food such as meat'],
            ['premolars', 'crushing food'],
            ['molars', 'grinding food'],
          ],
          ask: (a) => `What is the work of the ${a}?`,
          askBack: (b) => `Which teeth are used for ${b}?`,
        },
        {
          pairs: [
            ['incisors', '8'],
            ['canines', '4'],
            ['molars', '12'],
            ['teeth in a full adult set', '32'],
            ['milk teeth', '20'],
          ],
          ask: (a) => `How many ${a} does a person have?`,
        },
      ],
    },
    bank: [
      t(2, 'The first set of teeth a child has is called ___.', 'milk teeth', ['permanent teeth', 'molars', 'wisdom teeth']),
      t(2, 'The doctor who treats teeth is called a ___.', 'dentist', ['nurse', 'vet', 'pharmacist']),
      t(3, 'The hard white covering of a tooth is called ___.', 'enamel', ['gum', 'root', 'pulp']),
      t(3, 'Which teeth are at the very front of the mouth?', 'incisors', ['molars', 'premolars', 'canines']),
      t(4, 'Tooth decay happens when germs act on ___ left on the teeth.', 'sugar', ['water', 'salt', 'fluoride']),
      t(4, 'Which part of a tooth is hidden inside the gum?', 'root', ['crown', 'enamel', 'cusp']),
      t(4, 'Why should we not open bottle tops with our teeth?', 'It can crack or break the teeth.', ['It makes teeth whiter.', 'It makes teeth grow.', 'It removes germs.']),
      t(5, 'A child has holes in the molars and pain when eating sweets. The child most likely has ___.', 'tooth decay', ['strong teeth', 'milk teeth only', 'clean teeth']),
      t(5, 'Which part of the tooth has nerves and blood vessels?', 'pulp', ['enamel', 'crown', 'dentine']),
      t(5, 'A learner drew teeth with flat, wide tops at the back of the mouth. Which teeth are these?', 'molars', ['incisors', 'canines', 'milk teeth']),
    ],
  },
  states: {
    facts: {
      categories: [
        { one: 'a solid', many: 'solids', items: ['stone', 'ice', 'wood', 'iron nail', 'salt', 'book'], set: 'state' },
        { one: 'a liquid', many: 'liquids', items: ['water', 'milk', 'cooking oil', 'paraffin', 'juice', 'honey'], set: 'state' },
        { one: 'a gas', many: 'gases', items: ['air', 'oxygen', 'steam', 'carbon dioxide', 'cooking gas', 'water vapour'], set: 'state' },
      ],
      pairs: [
        {
          pairs: [
            ['melting', 'solid to liquid'],
            ['freezing', 'liquid to solid'],
            ['evaporation', 'liquid to gas'],
            ['condensation', 'gas to liquid'],
          ],
          ask: (a) => `In ${a}, matter changes from ___.`,
          askBack: (b) => `What is the change from ${b} called?`,
        },
        {
          pairs: [
            ['a solid', 'has a fixed shape and a fixed volume'],
            ['a liquid', 'takes the shape of its container but has a fixed volume'],
            ['a gas', 'spreads out to fill any container'],
          ],
          ask: (a) => `Which describes ${a}?`,
          askBack: (b) => `Which state of matter ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'When ice is left in the sun, it ___.', 'melts', ['freezes', 'condenses', 'grows']),
      t(3, 'Wet clothes on a line dry because the water ___.', 'evaporates', ['freezes', 'condenses', 'melts']),
      t(3, 'Water put in a freezer turns into ice. This is called ___.', 'freezing', ['melting', 'evaporation', 'condensation']),
      t(4, 'Water droplets form on the outside of a glass of cold water. This happens because water vapour in the air ___.', 'condenses', ['evaporates', 'melts', 'freezes']),
      t(4, 'A balloon was fixed on the mouth of an empty bottle. When the bottle was put in hot water, the balloon swelled. This shows that air ___.', 'expands when heated', ['contracts when heated', 'has no weight', 'is a liquid']),
      t(4, 'Which state of matter can be poured but cannot be squeezed into a smaller space easily?', 'liquid', ['solid', 'gas', 'none']),
      t(5, 'An empty bottle pushed upside down into water does not fill with water. This shows that air ___.', 'occupies space', ['has colour', 'is a solid', 'dissolves in water']),
      t(5, 'Why do puddles disappear on a hot afternoon?', 'The water evaporates in the heat.', ['The water freezes.', 'The water condenses.', 'The water turns into stones.']),
      t(5, 'Which shows matter changing from a gas to a liquid?', 'steam from a pot forming drops on the lid', ['butter melting slowly in a hot pan', 'ice cubes melting in a glass of juice', 'water boiling and bubbling in a kettle']),
    ],
  },
  materials: {
    facts: {
      categories: [
        { one: 'an object that floats on water', many: 'objects that float on water', items: ['cork', 'dry stick', 'feather', 'plastic bottle with its lid on', 'leaf', 'table tennis ball'], set: 'float' },
        { one: 'an object that sinks in water', many: 'objects that sink in water', items: ['stone', 'iron nail', 'coin', 'key', 'glass marble', 'spoon'], set: 'float' },
        { one: 'an object a magnet attracts', many: 'objects a magnet attracts', items: ['iron nail', 'paper clip', 'iron filings', 'sewing needle', 'steel pin', 'iron key ring'], set: 'magnet' },
        { one: 'an object a magnet does not attract', many: 'objects a magnet does not attract', items: ['plastic ruler', 'rubber', 'wooden spoon', 'paper', 'glass', 'piece of cloth'], set: 'magnet' },
        { one: 'a transparent material', many: 'transparent materials', items: ['clear glass', 'clean water', 'clear plastic', 'air'], set: 'light' },
        { one: 'an opaque material', many: 'opaque materials', items: ['wood', 'stone', 'iron sheet', 'cardboard', 'brick'], set: 'light' },
        { one: 'a translucent material', many: 'translucent materials', items: ['tracing paper', 'frosted glass', 'oiled paper', 'thin cloth'], set: 'light' },
      ],
      pairs: [
        {
          pairs: [
            ['rubber', 'it bends easily and is waterproof'],
            ['glass', 'it lets light pass through it'],
            ['iron', 'it is strong, hard and lasts long'],
            ['cotton', 'it is soft and absorbs sweat'],
            ['clay', 'it is soft when wet and hard when dry'],
          ],
          ask: (a) => `Why is ${a} a good material for its use?`,
          askBack: (b) => `Which material is chosen because ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Materials that let light pass through clearly are called ___.', 'transparent', ['opaque', 'translucent', 'magnetic']),
      t(3, 'Why are windows made of glass?', 'Glass lets light into the room.', ['Glass keeps all the light out.', 'Glass is soft and easy to bend.', 'Glass is opaque and hides the room.']),
      t(3, 'Which material would be best for making a raincoat?', 'plastic', ['paper', 'cotton', 'wool']),
      t(4, 'Kamau tested objects with a magnet. Which would stick to the magnet?', 'a paper clip', ['a rubber band', 'a plastic pen', 'a wooden peg']),
      t(4, 'A learner placed a stone, a cork, a coin and a feather in water. Which two floated?', 'cork and feather', ['stone and coin', 'stone and cork', 'coin and feather']),
      t(4, 'Why are cooking pots made of metal?', 'Metal lets heat pass through easily.', ['Metal is light like paper.', 'Metal is transparent.', 'Metal floats on water.']),
      t(5, 'A learner wants to separate iron nails from a heap of sawdust. Which object would help most?', 'a magnet', ['a sieve', 'a cup of water', 'a torch']),
      t(5, 'Light cannot pass through a wooden door. Wood is therefore ___.', 'opaque', ['transparent', 'translucent', 'magnetic']),
      t(5, 'Why do we use rubber to cover electric wires?', 'Rubber does not let electricity pass through.', ['Rubber is magnetic.', 'Rubber is transparent.', 'Rubber conducts electricity well.']),
    ],
  },
  force: {
    facts: {
      categories: [
        { one: 'a push', many: 'pushes', items: ['kicking a ball', 'pushing a wheelbarrow', 'closing a door', 'pressing a light switch', 'pushing a cart'], set: 'pp' },
        { one: 'a pull', many: 'pulls', items: ['opening a drawer', 'drawing water from a well', 'pulling a rope in tug of war', 'uprooting a weed', 'lifting a bucket'], set: 'pp' },
        { one: 'a use of friction', many: 'uses of friction', items: ['walking without slipping', 'stopping a bicycle with brakes', 'lighting a match', 'writing with a pencil', 'holding a cup'], set: 'fric' },
        { one: 'a problem caused by friction', many: 'problems caused by friction', items: ['tyres wearing out', 'shoe soles wearing out', 'machines getting hot', 'pushing a heavy box being hard', 'grinding sounds in machines'], set: 'fric' },
      ],
      pairs: [
        {
          pairs: [
            ['kicking a ball that is not moving', 'makes a still object move'],
            ['catching a ball', 'stops a moving object'],
            ['squeezing a ball of plasticine', 'changes the shape of an object'],
            ['pressing the brakes of a moving bicycle', 'slows down a moving object'],
            ['hitting a moving ball with a bat', 'changes the direction of a moving object'],
            ['pedalling a bicycle harder', 'makes a moving object go faster'],
          ],
          ask: (a) => `What effect of force is shown by ${a}?`,
          askBack: (b) => `Which activity shows that force ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'A push or a pull is called a ___.', 'force', ['shadow', 'sound', 'mass']),
      t(3, 'The force that pulls objects towards the ground is called ___.', 'gravity', ['friction', 'magnetism', 'wind']),
      t(3, 'Why does a ball thrown up come back down?', 'Gravity pulls it down.', ['Friction pushes it down.', 'The air is heavy.', 'Wind blows it down.']),
      t(4, 'It is easier to slide a box on a smooth floor than on a rough floor. Why?', 'There is less friction on a smooth floor.', ['There is more gravity on a rough floor.', 'The box is lighter on a smooth floor.', 'Smooth floors push boxes.']),
      t(4, 'Why do football boots have studs?', 'to increase friction so players do not slip', ['to reduce friction', 'to make the boots heavy', 'to make the ball move faster']),
      t(4, 'Oil is put on the moving parts of a bicycle to ___.', 'reduce friction', ['increase friction', 'add gravity', 'make it heavier']),
      t(5, 'A learner pulled a toy car with a spring balance on sand, grass and a cemented floor. Which surface needed the smallest force?', 'the cemented floor', ['sand', 'grass', 'all needed the same']),
      t(5, 'Which of these shows force changing the shape of an object?', 'moulding a pot from clay', ['a ball rolling down a slope', 'a car stopping', 'a stone falling']),
      t(5, 'When you rub your palms together quickly, they get warm. This is because friction produces ___.', 'heat', ['light', 'sound only', 'magnetism']),
    ],
  },
  energy: {
    facts: {
      categories: [
        { one: 'a source of light', many: 'sources of light', items: ['candle', 'torch', 'electric bulb', 'firefly', 'lantern', 'the sun'], set: 'src' },
        { one: 'a source of sound', many: 'sources of sound', items: ['drum', 'whistle', 'bell', 'guitar', 'car horn', 'radio'], set: 'src' },
        { one: 'a source of heat', many: 'sources of heat', items: ['burning charcoal', 'electric heater', 'cooking fire', 'hot plate', 'electric iron'], set: 'src' },
      ],
      pairs: [
        {
          pairs: [
            ['a solar panel', 'sunlight into electricity'],
            ['a radio', 'electricity into sound'],
            ['an electric bulb', 'electricity into light'],
            ['a jiko', 'the energy in charcoal into heat'],
            ['an electric kettle', 'electricity into heat'],
          ],
          ask: (a) => `${a[0].toUpperCase()}${a.slice(1)} changes ___.`,
          askBack: (b) => `Which device changes ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Our main natural source of light and heat is the ___.', 'sun', ['moon', 'mirror', 'river']),
      t(3, 'The moon is NOT a source of light because it ___.', 'only reflects light from the sun', ['is too far away from the earth', 'is smaller than the stars', 'gives out light only at night']),
      t(3, 'Which of these is a natural source of light?', 'the sun', ['a torch', 'a candle', 'an electric bulb']),
      t(4, 'Sound is produced when objects ___.', 'vibrate', ['melt', 'float', 'freeze']),
      t(4, 'A learner hit a drum lightly and then hard. What changed?', 'The sound became louder.', ['The drum changed colour.', 'The sound stopped.', 'The drum became lighter.']),
      t(4, 'Which energy source will never run out?', 'sunlight', ['charcoal', 'paraffin', 'firewood']),
      t(5, 'Why should we switch off lights when leaving a room?', 'to save electricity', ['to make the bulb brighter', 'to make the room warm', 'to make sound']),
      t(5, 'A girl placed her hand near a burning candle and felt warmth. This shows that a candle gives out ___.', 'heat and light', ['sound only', 'light only', 'water']),
      t(5, 'Which is the safest way to use a charcoal jiko indoors?', 'use it where there is good air flow', ['close all windows and doors', 'cover it with a blanket', 'sleep with it burning']),
    ],
  },
}

// ── Grade 5 ─────────────────────────────────────────────────────────────────

const G5: Record<string, Topic> = {
  plantgroups: {
    facts: {
      categories: [
        { one: 'a flowering plant', many: 'flowering plants', items: ['maize', 'bean', 'mango tree', 'sunflower', 'hibiscus', 'grass'], set: 'fl' },
        { one: 'a non-flowering plant', many: 'non-flowering plants', items: ['fern', 'moss', 'cypress', 'pine', 'liverwort', 'horsetail'], set: 'fl' },
        { one: 'a tree', many: 'trees', items: ['mvule', 'eucalyptus', 'baobab', 'acacia', 'jacaranda', 'cypress'], set: 'size' },
        { one: 'a shrub', many: 'shrubs', items: ['hibiscus', 'rose bush', 'tea bush', 'coffee bush', 'bougainvillea'], set: 'size' },
        { one: 'a herb', many: 'herbs', items: ['coriander (dhania)', 'spinach', 'mint', 'bean plant', 'amaranth'], set: 'size' },
      ],
      pairs: [
        {
          pairs: [
            ['petals', 'attract insects with their bright colours'],
            ['sepals', 'protect the flower when it is a bud'],
            ['anther', 'produce pollen grains'],
            ['stigma', 'receive pollen grains'],
            ['ovary', 'grow into the fruit'],
          ],
          ask: (a) => `What is the work of the ${a} in a flower?`,
          askBack: (b) => `Which part of a flower does this: ${b}?`,
        },
        {
          pairs: [
            ['ferns and mosses', 'reproduce by spores'],
            ['cypress and pine', 'carry their seeds in cones'],
            ['maize and beans', 'produce flowers, fruits and seeds'],
          ],
          ask: (a) => `How do ${a} reproduce?`,
          askBack: (b) => `Which plants ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Plants that produce flowers are called ___ plants.', 'flowering', ['non-flowering', 'spore', 'cone']),
      t(3, 'Mosses grow best in places that are ___.', 'damp and shady', ['hot and dry', 'sandy and sunny', 'windy and cold']),
      t(3, 'Which of these plants produces cones?', 'cypress', ['mango tree', 'bean', 'maize']),
      t(4, 'The male part of a flower is the ___.', 'stamen', ['pistil', 'sepal', 'petal']),
      t(4, 'The female part of a flower is the ___.', 'pistil', ['stamen', 'anther', 'filament']),
      t(4, 'Moving pollen from an anther to a stigma is called ___.', 'pollination', ['germination', 'transpiration', 'evaporation']),
      t(5, 'A plant has leaves with parallel veins and seeds with one seed leaf. It is most likely ___.', 'maize', ['a bean plant', 'a mango tree', 'a sunflower']),
      t(5, 'Which of these helps flowers to be pollinated by insects?', 'bright petals and sweet nectar', ['small, dull, green petals', 'very long and deep roots', 'smooth leaves with no smell']),
      t(5, 'Why do ferns not produce seeds?', 'They are non-flowering plants that reproduce by spores.', ['They are flowering plants that reproduce by bulbs.', 'They grow only in water, where seeds cannot form.', 'They have no leaves, so they cannot make seeds.']),
    ],
  },
  vertebrates: {
    facts: {
      categories: [
        { one: 'a fish', many: 'fish', items: ['tilapia', 'shark', 'Nile perch', 'catfish', 'omena', 'lungfish'], set: 'v' },
        { one: 'an amphibian', many: 'amphibians', items: ['frog', 'toad', 'salamander', 'newt'], set: 'v' },
        { one: 'a reptile', many: 'reptiles', items: ['snake', 'lizard', 'crocodile', 'tortoise', 'chameleon', 'turtle'], set: 'v' },
        { one: 'a bird', many: 'birds', items: ['eagle', 'ostrich', 'hen', 'duck', 'penguin', 'weaver bird'], set: 'v' },
        { one: 'a mammal', many: 'mammals', items: ['cow', 'bat', 'whale', 'dolphin', 'human being', 'rabbit'], set: 'v' },
      ],
      pairs: [
        {
          pairs: [
            ['fish', 'have scales and breathe using gills'],
            ['amphibians', 'have a moist skin and live both in water and on land'],
            ['reptiles', 'have a dry, scaly skin and lay eggs with leathery shells'],
            ['birds', 'have feathers, beaks and wings'],
            ['mammals', 'have hair or fur and feed their young on milk'],
          ],
          ask: (a) => `Which feature belongs to ${a}?`,
          askBack: (b) => `Which group of vertebrates ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Animals with a backbone are called ___.', 'vertebrates', ['invertebrates', 'insects', 'plants']),
      t(3, 'A bat flies, but it is a mammal because it ___.', 'feeds its young on milk', ['has wings', 'flies at night', 'eats insects']),
      t(3, 'A whale lives in water, but it is NOT a fish because it ___.', 'breathes using lungs and feeds its young on milk', ['swims faster than most fish in the ocean', 'eats small sea animals instead of plants', 'is much bigger than any fish in the sea']),
      t(4, 'Young frogs that live in water and breathe using gills are called ___.', 'tadpoles', ['chicks', 'calves', 'larvae']),
      t(4, 'Which vertebrates are warm-blooded?', 'birds and mammals', ['fish and reptiles', 'amphibians and fish', 'reptiles and amphibians']),
      t(4, 'An ostrich cannot fly, but it is a bird because it ___.', 'has feathers and a beak', ['runs fast', 'lays eggs on land', 'is very tall']),
      t(5, 'An animal has a dry scaly skin, lays eggs on land and its body temperature changes with the surroundings. It is a ___.', 'reptile', ['mammal', 'bird', 'amphibian']),
      t(5, 'Which of these is the odd one out?', 'snake', ['cow', 'bat', 'whale']),
      t(5, 'Why do fish have streamlined bodies?', 'to move easily through water', ['to breathe air at the surface', 'to keep warm in cold water', 'to walk on the river bed']),
    ],
  },
  digestion: {
    facts: {
      categories: [
        { one: 'a part of the alimentary canal', many: 'parts of the alimentary canal', items: ['mouth', 'oesophagus', 'stomach', 'small intestine', 'large intestine', 'rectum'], set: 'd' },
        { one: 'an organ that helps digestion but food does not pass through it', many: 'organs that help digestion without food passing through them', items: ['liver', 'pancreas', 'gall bladder', 'salivary glands'], set: 'd' },
      ],
      pairs: [
        {
          pairs: [
            ['mouth', 'chewing food and mixing it with saliva'],
            ['oesophagus (gullet)', 'carrying food from the mouth to the stomach'],
            ['stomach', 'churning food and mixing it with digestive juices'],
            ['small intestine', 'completing digestion and absorbing food into the blood'],
            ['large intestine', 'absorbing water from undigested food'],
            ['rectum', 'storing waste before it is passed out'],
            ['liver', 'producing bile'],
          ],
          ask: (a) => `What is the work of the ${a}?`,
          askBack: (b) => `Which part is responsible for ${b}?`,
        },
        {
          pairs: [
            ['constipation', 'eating food with too little roughage and drinking little water'],
            ['diarrhoea', 'eating contaminated food or drinking dirty water'],
            ['indigestion', 'eating too fast or overeating'],
          ],
          ask: (a) => `What can cause ${a}?`,
          askBack: (b) => `Which disorder can be caused by ${b}?`,
        },
      ],
    },
    bank: [
      { type: 'order', level: 3, prompt: 'Arrange the parts in the order that food passes through them.', tiles: ['mouth', 'oesophagus', 'stomach', 'small intestine'], answer: ['mouth', 'oesophagus', 'stomach', 'small intestine'], joiner: ' → ' },
      { type: 'order', level: 4, prompt: 'Arrange the parts in the order that food passes through them.', tiles: ['stomach', 'small intestine', 'large intestine', 'rectum', 'anus'], answer: ['stomach', 'small intestine', 'large intestine', 'rectum', 'anus'], joiner: ' → ' },
      t(2, 'The breaking down of food into small particles the body can use is called ___.', 'digestion', ['breathing', 'excretion', 'circulation']),
      t(3, 'Saliva is produced in the ___.', 'mouth', ['stomach', 'liver', 'rectum']),
      t(3, 'Digested food is absorbed into the blood in the ___.', 'small intestine', ['mouth', 'oesophagus', 'rectum']),
      t(4, 'Why should we chew food well before swallowing?', 'to break it into small pieces that are easy to digest', ['to make the food cold before it reaches the stomach', 'to remove the vitamins so the food is lighter', 'to make the food heavier so it moves down faster']),
      t(4, 'Which food helps to prevent constipation?', 'vegetables and fruits rich in roughage', ['white bread and sweet buns', 'fried chips and sausages', 'sweets, cakes and soda']),
      t(5, 'A learner chewed a piece of bread for a long time and it began to taste sweet. This shows that digestion of starch begins in the ___.', 'mouth', ['stomach', 'small intestine', 'large intestine']),
      t(5, 'Which organ produces bile that helps to digest fats?', 'liver', ['pancreas', 'stomach', 'rectum']),
      t(5, 'After a long illness with diarrhoea, a child should be given ___ to replace lost water and salts.', 'oral rehydration solution (ORS)', ['sweet soda and biscuits', 'only dry food and no water', 'strong tea with lots of sugar']),
    ],
  },
  mixtures: {
    facts: {
      categories: [
        { one: 'a substance that dissolves in water', many: 'substances that dissolve in water', items: ['salt', 'sugar', 'glucose', 'instant coffee', 'washing soda'], set: 'sol' },
        { one: 'a substance that does not dissolve in water', many: 'substances that do not dissolve in water', items: ['sand', 'stones', 'sawdust', 'iron filings', 'cooking oil', 'chalk dust'], set: 'sol' },
      ],
      pairs: [
        {
          pairs: [
            ['sieving', 'flour mixed with weevils'],
            ['filtering', 'muddy water'],
            ['evaporation', 'salt dissolved in water'],
            ['picking', 'small stones in beans'],
            ['winnowing', 'chaff mixed with grain'],
            ['using a magnet', 'iron filings mixed with sand'],
            ['decanting', 'water above sand that has settled'],
          ],
          ask: (a) => `Which mixture is best separated by ${a}?`,
          askBack: (b) => `Which method is best for separating ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'A mixture of salt and water is called a ___.', 'solution', ['suspension', 'solid', 'gas']),
      t(3, 'In a salt solution, the salt is the ___.', 'solute', ['solvent', 'filter', 'residue']),
      t(3, 'In a sugar solution, the water is the ___.', 'solvent', ['solute', 'residue', 'filtrate']),
      t(4, 'Which of these makes sugar dissolve faster?', 'stirring and using warm water', ['using cold water and not stirring', 'adding sand', 'covering the cup']),
      t(4, 'Muddy water was poured through filter paper. The clear water that passed through is called the ___.', 'filtrate', ['residue', 'solute', 'solvent']),
      t(4, 'In filtering muddy water, the mud left on the filter paper is called the ___.', 'residue', ['filtrate', 'solution', 'solvent']),
      t(5, 'A learner wants to get salt back from salty water. Which method should be used?', 'evaporation', ['filtering', 'sieving', 'using a magnet']),
      t(5, 'A mixture has sand, salt and iron filings. Which is the correct order to separate them?', 'magnet, then add water and filter, then evaporate', ['evaporate, then magnet, then sieve', 'filter, then magnet, then winnow', 'winnow, then sieve, then pick']),
      t(5, 'Why does cooking oil form a layer on top of water?', 'Oil does not dissolve in water and is lighter.', ['Oil dissolves in water and rises to the top.', 'Oil is heavier than water, so it pushes up.', 'Oil turns into a gas when it touches water.']),
    ],
  },
  pollution: {
    facts: {
      categories: [
        { one: 'a cause of water pollution', many: 'causes of water pollution', items: ['washing clothes in rivers', 'dumping rubbish into rivers', 'oil spills', 'waste from factories', 'fertilisers washed into rivers', 'open defecation near water'], set: 'p' },
        { one: 'a way to prevent water pollution', many: 'ways to prevent water pollution', items: ['treating factory waste', 'using toilets', 'disposing of rubbish properly', 'planting trees along river banks', 'using organic manure', 'washing clothes away from rivers'], set: 'p' },
        { one: 'a disease spread by dirty water', many: 'diseases spread by dirty water', items: ['cholera', 'typhoid', 'bilharzia', 'dysentery'], set: 'd' },
        { one: 'a disease NOT spread by dirty water', many: 'diseases not spread by dirty water', items: ['tuberculosis', 'common cold', 'chickenpox', 'measles'], set: 'd' },
      ],
      pairs: [
        {
          pairs: [
            ['boiling', 'heating the water kills germs'],
            ['chlorination', 'adding a chemical kills germs'],
            ['filtering', 'dirt particles are removed'],
            ['decanting', 'water is poured off after dirt settles'],
          ],
          ask: (a) => `How does ${a} make water safe?`,
          askBack: (b) => `Which method of making water safe works because ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Water that is safe for drinking is called ___ water.', 'clean', ['polluted', 'salty', 'stagnant']),
      t(3, 'Which is the safest way to make river water fit for drinking at home?', 'boiling it', ['adding sugar', 'cooling it', 'stirring it']),
      t(3, 'Bilharzia is spread by snails that live in ___.', 'slow-moving or still fresh water', ['salty water in the open sea', 'dry sand along river banks', 'the bark of trees near rivers']),
      t(4, 'Fertilisers washed into a lake make water plants grow too much. What happens to the fish?', 'They struggle to breathe because there is less oxygen in the water.', ['They grow bigger because there is more plant food in the water.', 'They multiply faster because the water becomes warmer.', 'They change colour to hide among the extra water plants.']),
      t(4, 'Why should factories treat waste before releasing it?', 'to stop poisonous chemicals polluting water', ['to make the river water warmer for fish', 'to add extra food for the river plants', 'to make the waste heavier so it sinks']),
      t(5, 'A community downstream from a factory reports many cases of stomach illness. What is the most likely cause?', 'chemical waste in the river', ['too many trees', 'clean boreholes', 'heavy rain upstream only']),
      t(5, 'Which practice protects a spring that a village uses for drinking water?', 'fencing it and keeping animals away', ['washing cars at the spring', 'dumping waste nearby', 'letting cattle drink from it']),
      t(5, 'A learner set up a filter using sand, gravel and charcoal in a bottle. The water came out clearer. Why should it still be boiled before drinking?', 'Filtering does not kill all germs.', ['Boiling adds vitamins.', 'Boiling makes water heavier.', 'Filtered water is salty.']),
    ],
  },
  heat: {
    facts: {
      categories: [
        { one: 'a good conductor of heat', many: 'good conductors of heat', items: ['iron', 'copper', 'aluminium', 'steel', 'silver'], set: 'c' },
        { one: 'a poor conductor of heat (insulator)', many: 'poor conductors of heat', items: ['wood', 'plastic', 'rubber', 'wool', 'cork', 'paper'], set: 'c' },
      ],
      pairs: [
        {
          pairs: [
            ['conduction', 'a metal spoon in hot tea becomes hot at the handle'],
            ['convection', 'warm water rises and cool water sinks in a pot being heated'],
            ['radiation', 'we feel warm sitting in the sun'],
          ],
          ask: (a) => `Which is an example of heat transfer by ${a}?`,
          askBack: (b) => `How is heat transferred when ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Heat moves from a ___ object to a cooler one.', 'hotter', ['colder', 'heavier', 'lighter']),
      t(3, 'Why do cooking pots have wooden or plastic handles?', 'Wood and plastic are poor conductors of heat.', ['Wood and plastic conduct heat very well.', 'Wood and plastic make the pot cook faster.', 'Wood and plastic are heavier than metal.']),
      t(3, 'Heat from the sun reaches the earth by ___.', 'radiation', ['conduction', 'convection', 'boiling']),
      t(4, 'Why do people in cold places wear woollen clothes?', 'Wool is a poor conductor and keeps body heat in.', ['Wool conducts heat well.', 'Wool is shiny.', 'Wool lets air flow through easily.']),
      t(4, 'In which state of matter does heat move mainly by conduction?', 'solids', ['liquids', 'gases', 'a vacuum']),
      t(4, 'Why are wires of electric heaters made of metal?', 'Metals conduct heat and electricity well.', ['Metals are insulators.', 'Metals are cheap like paper.', 'Metals do not get hot.']),
      t(5, 'A learner placed wax beads along a metal rod and heated one end. The beads fell one after the other starting nearest the flame. This shows ___.', 'heat travels along a solid by conduction', ['heat travels by convection only', 'metals do not conduct heat', 'wax is a conductor']),
      t(5, 'Water in a pot is heated at the bottom, but the top also gets hot. This is because of ___.', 'convection currents', ['radiation from the lid', 'conduction through the air', 'the pot being shiny']),
      t(5, 'Why are thermos flasks double-walled with a vacuum in between?', 'to stop heat moving in or out', ['to make them heavy', 'to cool drinks faster', 'to let air in']),
    ],
  },
  light: {
    facts: {
      categories: [
        { one: 'a luminous object', many: 'luminous objects', items: ['the sun', 'a candle flame', 'a burning torch', 'a firefly', 'a star', 'a lit lamp'], set: 'l' },
        { one: 'a non-luminous object', many: 'non-luminous objects', items: ['the moon', 'a mirror', 'a book', 'a chair', 'a wall', 'a spoon'], set: 'l' },
      ],
      pairs: [
        {
          pairs: [
            ['light travels in straight lines', 'shadows form behind objects'],
            ['light is reflected', 'we see ourselves in a mirror'],
            ['light is refracted', 'a pencil in a glass of water looks bent'],
          ],
          ask: (a) => `Because ${a}, ___.`,
          askBack: (b) => `Which property of light explains why ${b}?`,
        },
        {
          pairs: [
            ['a periscope', 'plane mirrors'],
            ['the side mirror of a car', 'a convex mirror'],
            ['a dentist\'s mirror', 'a concave mirror'],
          ],
          ask: (a) => `What kind of mirror is used in ${a}?`,
        },
      ],
    },
    bank: [
      t(2, 'Objects that give out their own light are called ___.', 'luminous', ['non-luminous', 'opaque', 'transparent']),
      t(3, 'A shadow forms when an ___ object blocks light.', 'opaque', ['transparent', 'luminous', 'shiny']),
      t(3, 'At what time of the day is your shadow shortest?', 'at noon', ['early morning', 'late evening', 'at sunrise']),
      t(4, 'In the morning, the sun is in the east. On which side of a tree will its shadow be?', 'west', ['east', 'north', 'south']),
      t(4, 'Three cards with holes were lined up so a candle flame could be seen through them. When one card was moved, the flame could not be seen. This shows that light ___.', 'travels in straight lines', ['bends around corners', 'is a liquid', 'travels through wood']),
      t(4, 'Why can we see the moon at night?', 'It reflects light from the sun.', ['It produces its own light.', 'It is made of fire.', 'Stars light it up.']),
      t(5, 'Writing on a paper looks reversed when seen in a mirror. This is called ___.', 'lateral inversion', ['refraction', 'a shadow', 'radiation']),
      t(5, 'Which instrument lets a soldier in a trench see above the ground?', 'periscope', ['microscope', 'thermometer', 'compass']),
      t(5, 'A learner moved a torch closer to a ball. What happened to the ball\'s shadow on the wall?', 'It became bigger.', ['It became smaller.', 'It disappeared.', 'It stayed the same.']),
    ],
  },
}

// ── Grade 6 ─────────────────────────────────────────────────────────────────

const G6: Record<string, Topic> = {
  roots: {
    facts: {
      categories: [
        { one: 'a plant with a tap root', many: 'plants with tap roots', items: ['bean', 'pea', 'sunflower', 'mango tree', 'avocado tree', 'carrot'], set: 'r' },
        { one: 'a plant with fibrous roots', many: 'plants with fibrous roots', items: ['grass', 'wheat', 'rice', 'onion', 'millet', 'sorghum'], set: 'r' },
        { one: 'a plant with parallel leaf veins', many: 'plants with parallel leaf veins', items: ['maize', 'grass', 'sugarcane', 'wheat', 'rice'], set: 'v' },
        { one: 'a plant with network leaf veins', many: 'plants with network leaf veins', items: ['bean', 'mango tree', 'hibiscus', 'avocado tree', 'sunflower'], set: 'v' },
      ],
      pairs: [
        {
          pairs: [
            ['prop roots', 'maize'],
            ['storage roots', 'sweet potato'],
            ['breathing roots', 'mangrove'],
            ['fibrous roots', 'grass'],
            ['a tap root', 'bean'],
          ],
          ask: (a) => `Which plant has ${a}?`,
          askBack: (b) => `What kind of roots does ${an(b)} plant have?`,
        },
        {
          pairs: [
            ['photosynthesis', 'making food using sunlight'],
            ['transpiration', 'losing water through the leaves'],
            ['gaseous exchange', 'taking in and giving out gases through leaf pores'],
          ],
          ask: (a) => `In leaves, what is ${a}?`,
          askBack: (b) => `What is the process of ${b} called?`,
        },
      ],
    },
    bank: [
      t(2, 'A main root with smaller side roots is called a ___ root.', 'tap', ['fibrous', 'prop', 'breathing']),
      t(3, 'Maize plants grow extra roots from the stem above the ground. These are called ___ roots.', 'prop', ['tap', 'storage', 'breathing']),
      t(3, 'The tiny openings on leaves through which gases pass are called ___.', 'stomata', ['veins', 'petioles', 'midribs']),
      t(4, 'Which is a function of roots?', 'absorbing water and mineral salts', ['making food for the plant', 'attracting insects to flowers', 'producing pollen for seeds']),
      t(4, 'A bean leaf is made up of three leaflets on one stalk. It is a ___ leaf.', 'compound', ['simple', 'needle', 'scale']),
      t(4, 'Mangrove trees grow in swampy, salty water. Why do they have breathing roots?', 'The waterlogged mud has little air.', ['The roots catch small fish for food.', 'The roots store salt for the leaves.', 'The roots help the trees climb rocks.']),
      t(5, 'A learner covered a potted plant with a clear polythene bag. After some hours, drops of water formed inside the bag. This shows ___.', 'transpiration', ['photosynthesis', 'germination', 'pollination']),
      t(5, 'Why do farmers plant grass on slopes to control soil erosion?', 'Fibrous roots hold the soil firmly together.', ['Grass has a tap root that goes deep.', 'Grass makes the soil wet.', 'Grass attracts rain.']),
      t(5, 'Cassava and sweet potato roots are swollen because they ___.', 'store food', ['hold water only', 'carry out photosynthesis', 'help the plant breathe']),
    ],
  },
  invertebrates: {
    facts: {
      categories: [
        { one: 'an insect', many: 'insects', items: ['housefly', 'butterfly', 'bee', 'mosquito', 'grasshopper', 'ant'], set: 'i' },
        { one: 'an arachnid', many: 'arachnids', items: ['spider', 'tick', 'scorpion', 'mite'], set: 'i' },
        { one: 'a myriapod', many: 'myriapods', items: ['millipede', 'centipede'], set: 'i' },
        { one: 'a useful invertebrate', many: 'useful invertebrates', items: ['bee', 'earthworm', 'silkworm', 'ladybird beetle', 'butterfly'], set: 'u' },
        { one: 'a harmful invertebrate', many: 'harmful invertebrates', items: ['mosquito', 'tsetse fly', 'tick', 'locust', 'housefly', 'termite'], set: 'u' },
      ],
      pairs: [
        {
          pairs: [
            ['mosquito', 'malaria'],
            ['tsetse fly', 'sleeping sickness'],
            ['tick', 'East Coast fever in cattle'],
            ['housefly', 'cholera and typhoid'],
          ],
          ask: (a) => `Which disease is spread by the ${a}?`,
          askBack: (b) => `Which invertebrate spreads ${b}?`,
        },
        {
          pairs: [
            ['insects', 'three body parts and six legs'],
            ['arachnids', 'two body parts and eight legs'],
            ['millipedes', 'many body segments with two pairs of legs on each'],
            ['snails', 'a soft body protected by a shell'],
          ],
          ask: (a) => `Which feature describes ${a}?`,
          askBack: (b) => `Which group of invertebrates has ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Animals without a backbone are called ___.', 'invertebrates', ['vertebrates', 'mammals', 'reptiles']),
      t(3, 'How many legs does an insect have?', 'six', ['eight', 'four', 'ten']),
      t(3, 'A spider is NOT an insect because it has ___.', 'eight legs and two body parts', ['six legs and three body parts', 'wings and a pair of antennae', 'a hard shell and no legs at all']),
      t(4, 'How do earthworms help farmers?', 'They make tunnels that let air and water into the soil.', ['They eat the roots of weeds so crops grow better.', 'They carry seeds from one part of the farm to another.', 'They keep birds away from newly planted crops.']),
      t(4, 'Which stage in the life cycle of a butterfly comes after the egg?', 'caterpillar (larva)', ['pupa', 'adult', 'nymph']),
      t(4, 'Why should stagnant water around homes be drained?', 'Mosquitoes breed in it.', ['Bees drink from it.', 'It attracts butterflies.', 'It makes the soil fertile.']),
      { type: 'order', level: 5, prompt: 'Arrange the stages in the life cycle of a mosquito.', tiles: ['egg', 'larva', 'pupa', 'adult'], answer: ['egg', 'larva', 'pupa', 'adult'], joiner: ' → ' },
      t(5, 'A farmer dips cattle every week. Which invertebrate is the farmer controlling?', 'ticks', ['bees', 'earthworms', 'butterflies']),
      t(5, 'Which invertebrate helps to pollinate crops?', 'bee', ['tick', 'tsetse fly', 'locust']),
    ],
  },
  circulation: {
    facts: {
      categories: [
        { one: 'a part of blood', many: 'parts of blood', items: ['plasma', 'red blood cells', 'white blood cells', 'platelets'], set: 'c' },
        { one: 'a blood vessel', many: 'blood vessels', items: ['artery', 'vein', 'capillary', 'aorta'], set: 'c' },
      ],
      pairs: [
        {
          pairs: [
            ['heart', 'pumps blood around the body'],
            ['arteries', 'carry blood away from the heart'],
            ['veins', 'carry blood back to the heart'],
            ['capillaries', 'link arteries to veins and reach body cells'],
            ['red blood cells', 'carry oxygen'],
            ['white blood cells', 'fight germs'],
            ['platelets', 'help blood to clot'],
            ['plasma', 'carries digested food and waste'],
          ],
          ask: (a) => `What do the ${a} do?`,
          askBack: (b) => `Which part ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'The organ that pumps blood is the ___.', 'heart', ['lung', 'liver', 'stomach']),
      t(3, 'How many chambers does the human heart have?', 'four', ['two', 'three', 'six']),
      t(3, 'A cut stops bleeding after a while because ___ help blood to clot.', 'platelets', ['red blood cells', 'veins', 'plasma']),
      t(4, 'A learner counted her pulse while resting and after running. After running the pulse was ___.', 'faster', ['slower', 'the same', 'stopped']),
      t(4, 'Lack of iron in the diet can cause ___, where the blood has too few red blood cells.', 'anaemia', ['malaria', 'scurvy', 'rickets']),
      t(4, 'Which blood vessel carries blood from the heart to the rest of the body?', 'aorta', ['vein', 'capillary', 'vena cava']),
      t(5, 'Why does the heart beat faster during exercise?', 'to supply more oxygen and food to the muscles', ['to cool the body down by pumping less blood', 'to reduce the amount of blood in the muscles', 'to stop the body from sweating during exercise']),
      t(5, 'Which habit helps to keep the heart healthy?', 'regular exercise and a diet low in fat', ['smoking', 'eating a lot of fried food', 'sitting all day']),
      t(5, 'Arteries have thick, muscular walls because ___.', 'they carry blood at high pressure from the heart', ['they carry blood slowly back towards the heart', 'they store extra blood for the body to use later', 'they have valves that stop blood moving backwards']),
    ],
  },
  breathing: {
    facts: {
      categories: [
        { one: 'a part of the breathing system', many: 'parts of the breathing system', items: ['nose', 'trachea (windpipe)', 'bronchi', 'lungs', 'air sacs (alveoli)', 'diaphragm'], set: 'b' },
        { one: 'a disease of the breathing system', many: 'diseases of the breathing system', items: ['pneumonia', 'tuberculosis', 'asthma', 'common cold', 'bronchitis'], set: 'b2' },
        { one: 'a disease that is not of the breathing system', many: 'diseases that are not of the breathing system', items: ['cholera', 'scurvy', 'malaria', 'rickets', 'typhoid'], set: 'b2' },
      ],
      pairs: [
        {
          pairs: [
            ['nose', 'filters, warms and moistens the air'],
            ['trachea (windpipe)', 'carries air to the lungs'],
            ['air sacs (alveoli)', 'are where oxygen passes into the blood'],
            ['diaphragm', 'is a muscle that helps to move air in and out'],
            ['ribs', 'protect the lungs'],
          ],
          ask: (a) => `What does the ${a} do?`,
          askBack: (b) => `Which part ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Breathing in is also called ___.', 'inhaling', ['exhaling', 'sneezing', 'digesting']),
      t(3, 'Which gas does the body take in when we breathe in?', 'oxygen', ['carbon dioxide', 'nitrogen only', 'smoke']),
      t(3, 'Air that we breathe out has more ___ than air we breathe in.', 'carbon dioxide', ['oxygen', 'dust', 'nitrogen']),
      t(4, 'When we breathe in, the ribs move ___ and the diaphragm ___.', 'up and out; flattens', ['down and in; arches up', 'up and out; arches up', 'down and in; flattens']),
      t(4, 'Why is it better to breathe through the nose than the mouth?', 'The nose filters and warms the air.', ['The mouth has teeth.', 'The nose stores air.', 'The mouth is too small.']),
      t(4, 'Which habit damages the lungs?', 'smoking', ['exercising', 'eating fruits', 'sleeping under a net']),
      t(5, 'A learner blew air through a straw into clear lime water. The lime water turned milky. This shows that exhaled air contains ___.', 'carbon dioxide', ['oxygen', 'water only', 'nitrogen']),
      t(5, 'Why should we cover our mouths when coughing?', 'to stop spreading germs such as tuberculosis', ['to make the cough louder and clearer', 'to warm the air before it leaves the lungs', 'to keep dust from getting into the mouth']),
      t(5, 'Why do we breathe faster after running?', 'The body needs more oxygen and must remove more carbon dioxide.', ['The lungs become smaller and hold less air after running.', 'The body needs less air because the muscles are resting.', 'The heart slows down, so the lungs must work harder.']),
    ],
  },
  water: {
    facts: {
      categories: [
        { one: 'a natural source of water', many: 'natural sources of water', items: ['rain', 'river', 'lake', 'spring', 'sea', 'ocean'], set: 's' },
        { one: 'a man-made source of water', many: 'man-made sources of water', items: ['borehole', 'well', 'dam', 'water pan', 'tap'], set: 's' },
      ],
      pairs: [
        {
          pairs: [
            ['evaporation', 'water from lakes and seas turns into water vapour'],
            ['condensation', 'water vapour cools to form clouds'],
            ['precipitation', 'water falls from clouds as rain'],
            ['collection', 'rain water flows into rivers, lakes and the ground'],
          ],
          ask: (a) => `In the water cycle, what happens during ${a}?`,
          askBack: (b) => `Which stage of the water cycle is this: ${b}?`,
        },
        {
          pairs: [
            ['100 °C', 'the boiling point of pure water'],
            ['0 °C', 'the freezing point of pure water'],
            ['37 °C', 'the normal temperature of the human body'],
          ],
          ask: (a) => `${a} is ___.`,
          askBack: (b) => `What is ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Pure water has ___.', 'no colour, no smell and no taste', ['a light blue colour and no smell', 'a sweet taste and no colour', 'a strong smell and a salty taste']),
      t(3, 'Water from the sea is not good for drinking because it is ___.', 'salty', ['too cold', 'too clean', 'sweet']),
      t(3, 'Which use of water is for farming?', 'irrigating crops', ['bathing', 'cooking', 'washing clothes']),
      t(4, 'Water pipes sometimes burst in very cold places because water ___ when it freezes.', 'expands', ['contracts', 'evaporates', 'boils']),
      t(4, 'A ship made of steel floats because it ___.', 'pushes aside a lot of water for its weight', ['has no weight once it is in the water', 'is lighter than the air around it', 'has a layer of wood hidden inside']),
      t(4, 'Which method makes water safe to drink by killing germs with a chemical?', 'chlorination', ['decanting', 'sieving', 'filtering']),
      t(5, 'A learner left a glass of water in the sun and a similar glass in the shade. After a day, which had less water and why?', 'the one in the sun, because heat made more water evaporate', ['the one in the shade, because it was cold', 'both the same', 'the one in the sun, because water condensed']),
      t(5, 'Which part of the water cycle is happening when dew forms on grass in the morning?', 'condensation', ['evaporation', 'collection', 'boiling']),
      t(5, 'Why should a water tank be covered?', 'to keep out dirt, mosquitoes and other animals', ['to make water evaporate faster', 'to warm the water', 'to add salt']),
    ],
  },
  magnets: {
    facts: {
      categories: [
        { one: 'a magnetic material', many: 'magnetic materials', items: ['iron', 'steel', 'nickel', 'cobalt'], set: 'm' },
        { one: 'a non-magnetic material', many: 'non-magnetic materials', items: ['copper', 'aluminium', 'brass', 'plastic', 'wood', 'glass'], set: 'm' },
        { one: 'a use of magnets', many: 'uses of magnets', items: ['a compass', 'fridge door seals', 'separating iron from waste', 'loudspeakers', 'lifting scrap metal with a crane'], set: 'u' },
        { one: 'a way a magnet loses its magnetism', many: 'ways a magnet loses its magnetism', items: ['heating it strongly', 'hammering it', 'dropping it many times', 'storing it without keepers'], set: 'u' },
      ],
      pairs: [
        {
          pairs: [
            ['a north pole near a north pole', 'they repel'],
            ['a north pole near a south pole', 'they attract'],
            ['a magnet near a copper coin', 'nothing happens'],
            ['a magnet near an iron nail', 'the nail is pulled towards it'],
          ],
          ask: (a) => `What happens when ${a}?`,
        },
      ],
    },
    bank: [
      t(2, 'The ends of a magnet are called ___.', 'poles', ['sides', 'corners', 'tips']),
      t(3, 'Where is a bar magnet strongest?', 'at the poles', ['in the middle', 'on one side only', 'it is the same everywhere']),
      t(3, 'Like poles ___ each other.', 'repel', ['attract', 'touch', 'heat']),
      t(4, 'A bar magnet hung freely by a thread always comes to rest pointing ___.', 'north and south', ['east and west', 'up and down', 'in any direction']),
      t(4, 'Which instrument uses a magnet to show direction?', 'compass', ['thermometer', 'rain gauge', 'periscope']),
      t(4, 'Can a magnet attract an iron nail through a sheet of paper?', 'Yes, magnetic force passes through paper.', ['No, paper stops magnetism.', 'Only if the paper is wet.', 'Only if the nail is copper.']),
      t(5, 'A learner stroked an iron nail many times in one direction with one pole of a magnet. The nail then picked up pins. This is called making a magnet by the ___ method.', 'stroking', ['heating', 'hammering', 'dropping']),
      t(5, 'Two magnets push each other apart. Which poles are facing each other?', 'two north poles or two south poles', ['a north and a south pole', 'the middles of the magnets', 'any poles']),
      t(5, 'A scrap-yard crane lifts cars using a magnet that can be switched off. What kind of magnet is it?', 'an electromagnet', ['a bar magnet', 'a horseshoe magnet', 'a compass needle']),
    ],
  },
  electricity: {
    facts: {
      categories: [
        { one: 'a conductor of electricity', many: 'conductors of electricity', items: ['copper wire', 'iron nail', 'aluminium foil', 'pencil lead (graphite)', 'steel spoon', 'coin'], set: 'c' },
        { one: 'an insulator', many: 'insulators', items: ['rubber', 'plastic', 'dry wood', 'glass', 'paper', 'cloth'], set: 'c' },
        { one: 'a safe practice with electricity', many: 'safe practices with electricity', items: ['switching off before cleaning appliances', 'keeping water away from sockets', 'reporting broken wires', 'pulling the plug, not the cable', 'covering unused sockets'], set: 's' },
        { one: 'a dangerous practice with electricity', many: 'dangerous practices with electricity', items: ['touching switches with wet hands', 'flying kites near power lines', 'pushing objects into sockets', 'overloading one socket', 'climbing electricity poles'], set: 's' },
      ],
      pairs: [
        {
          pairs: [
            ['a dry cell', 'provide electricity in a circuit'],
            ['a switch', 'open and close a circuit'],
            ['connecting wires', 'carry current around the circuit'],
            ['a bulb', 'change electricity into light'],
          ],
          ask: (a) => `In a circuit, what is the work of ${a}?`,
          askBack: (b) => `Which part of a circuit is used to ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'A complete path for electricity to flow is called a ___.', 'circuit', ['switch', 'cell', 'wire']),
      t(3, 'Materials that allow electricity to pass through them are called ___.', 'conductors', ['insulators', 'magnets', 'cells']),
      t(3, 'Which is a source of electricity?', 'solar panel', ['bulb', 'switch', 'plastic']),
      t(4, 'In a circuit with a cell, a bulb and a switch, the bulb does not light. The switch is closed and the cell is new. What is the most likely cause?', 'a loose wire or a broken bulb', ['too much light', 'the switch is closed', 'the cell is new']),
      t(4, 'A learner placed a plastic ruler in a gap in a working circuit. The bulb did not light. This shows that plastic is ___.', 'an insulator', ['a conductor', 'magnetic', 'a cell']),
      t(4, 'Electricity produced from flowing water at a dam is called ___ power.', 'hydroelectric', ['solar', 'wind', 'nuclear']),
      t(5, 'What happens to a bulb when a second cell is added correctly to a simple circuit?', 'It shines brighter.', ['It becomes dimmer.', 'It goes off.', 'It changes colour.']),
      t(5, 'Why are electric cables covered with plastic?', 'Plastic is an insulator and prevents electric shocks.', ['Plastic conducts electricity better than copper.', 'Plastic makes the current flow faster to the bulb.', 'Plastic makes the cable heavier so it stays down.']),
      t(5, 'Which source of electricity is renewable?', 'wind', ['diesel generator', 'coal', 'petrol']),
    ],
  },
  sound: {
    facts: {
      categories: [
        { one: 'a string instrument', many: 'string instruments', items: ['guitar', 'nyatiti', 'orutu', 'violin', 'obokano'], set: 'i' },
        { one: 'a wind instrument', many: 'wind instruments', items: ['flute', 'trumpet', 'horn', 'whistle', 'recorder'], set: 'i' },
        { one: 'a percussion instrument', many: 'percussion instruments', items: ['drum', 'kayamba', 'marimba', 'jingles', 'shakers'], set: 'i' },
      ],
      pairs: [
        {
          pairs: [
            ['an echo', 'sound bouncing back from a hard surface'],
            ['vibration', 'the quick back-and-forth movement that makes sound'],
            ['pitch', 'how high or low a sound is'],
            ['loudness', 'how strong or soft a sound is'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `What do we call ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Sound is made when objects ___.', 'vibrate', ['melt', 'stop', 'float']),
      t(3, 'Sound travels fastest through ___.', 'solids', ['liquids', 'gases', 'a vacuum']),
      t(3, 'Which part of the ear vibrates when sound reaches it?', 'eardrum', ['ear lobe', 'nose', 'tongue']),
      t(4, 'Two learners made a string telephone using tins and a tight string. Sound travelled along the ___.', 'string', ['air only', 'water', 'light']),
      t(4, 'Why can astronauts on the moon not hear each other without radios?', 'Sound cannot travel through a vacuum.', ['Sound travels too fast on the moon.', 'The cold on the moon freezes sound.', 'Their helmets cover their ears fully.']),
      t(4, 'A shorter guitar string, when plucked, gives a ___ sound.', 'higher', ['lower', 'louder only', 'softer only']),
      t(5, 'You shout near a high rocky cliff and hear your voice again. This is ___.', 'an echo', ['a vibration', 'pitch', 'radiation']),
      t(5, 'Why do people working with loud machines wear ear muffs?', 'to protect their ears from damage', ['to hear better', 'to keep warm only', 'to make the machine quieter']),
      t(5, 'A learner placed rice grains on a drum and beat it. The grains jumped. This shows that ___.', 'a sounding drum vibrates', ['rice makes sound', 'sound is a liquid', 'drums are magnetic']),
    ],
  },
  machines: {
    facts: {
      categories: [
        { one: 'a lever', many: 'levers', items: ['see-saw', 'crowbar', 'wheelbarrow', 'bottle opener', 'pair of scissors', 'pair of pliers'], set: 'm' },
        { one: 'a pulley', many: 'pulleys', items: ['flagpole rope system', 'well with a rope and wheel', 'crane lifting loads', 'window blind cord'], set: 'm' },
        { one: 'an inclined plane', many: 'inclined planes', items: ['ramp', 'sloping road up a hill', 'loading plank', 'staircase'], set: 'm' },
        { one: 'a wedge', many: 'wedges', items: ['axe', 'knife', 'panga', 'nail', 'chisel'], set: 'm' },
        { one: 'a wheel and axle', many: 'wheels and axles', items: ['steering wheel', 'door knob', 'bicycle pedal', 'water tap handle'], set: 'm' },
      ],
      pairs: [
        {
          pairs: [
            ['fulcrum', 'the point on which a lever turns'],
            ['effort', 'the force applied to a lever'],
            ['load', 'the weight that a lever moves'],
          ],
          ask: (a) => `What is the ${a} of a lever?`,
          askBack: (b) => `What do we call ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Simple machines help us to ___.', 'do work more easily', ['make work harder', 'stop work', 'use more effort']),
      t(3, 'A loading ramp helps to move heavy loads onto a lorry. It is an example of ___.', 'an inclined plane', ['a pulley', 'a wedge', 'a screw']),
      t(3, 'A pulley at the top of a flagpole helps us to ___.', 'raise the flag by pulling down', ['make the flag heavier', 'stop the wind', 'paint the pole']),
      t(4, 'In a wheelbarrow, the load is between the fulcrum and the effort. Which class of lever is it?', 'second class', ['first class', 'third class', 'not a lever']),
      t(4, 'In a see-saw, the fulcrum is between the load and the effort. Which class of lever is it?', 'first class', ['second class', 'third class', 'a pulley']),
      t(4, 'Why is it easier to cut with a sharp knife than a blunt one?', 'A sharp edge puts the force on a small area.', ['A sharp knife is heavier.', 'A blunt knife has more friction only.', 'A sharp knife is longer.']),
      t(5, 'A learner wants to lift a heavy stone with a crowbar using the least effort. Where should the fulcrum be?', 'close to the stone', ['far from the stone', 'at the learner\'s hand', 'in the middle always']),
      t(5, 'Which tool is a third-class lever, with the effort between the fulcrum and the load?', 'a pair of tweezers', ['a wheelbarrow', 'a see-saw', 'a bottle opener']),
      t(5, 'Oiling the moving parts of a machine makes it work better because oil ___.', 'reduces friction', ['increases friction', 'adds weight', 'makes it magnetic']),
    ],
  },
}

const ALL: Record<string, Topic> = {}
for (const [g, set] of [[4, G4], [5, G5], [6, G6]] as const) for (const [k, v] of Object.entries(set)) ALL[`u${g}s-${k}`] = v

export const UPPER_SCIENCE_GENERATORS: Record<string, Generator> = Object.fromEntries(Object.entries(ALL).map(([k, v]) => [k, factGenerator(v.facts)]))
export const UPPER_SCIENCE_BANKS: Record<string, BankQuestion[]> = Object.fromEntries(Object.entries(ALL).map(([k, v]) => [k, v.bank]))
