// Integrated Science, Grades 7–9: fact tables plus written questions on experiments,
// observations and applying ideas. All content is original.
import { factGenerator, type FactSet } from '../facts'
import { labelOptions as opts } from '../generators/english'
import type { BankQuestion, Generator, Level } from '../types'

const t = (level: Level, prompt: string, answer: string, wrong: string[]): BankQuestion => ({ type: 'choice', level, prompt, options: opts([answer, ...wrong]), answer })

interface Topic {
  facts: FactSet
  bank: BankQuestion[]
}

const G7: Record<string, Topic> = {
  investigation: {
    facts: {
      pairs: [
        {
          pairs: [
            ['a Bunsen burner', 'heating substances'],
            ['a measuring cylinder', 'measuring the volume of liquids'],
            ['a beaker', 'holding and mixing liquids'],
            ['a test tube', 'heating small amounts of substances'],
            ['a funnel', 'pouring liquids and holding filter paper'],
            ['a thermometer', 'measuring temperature'],
            ['a pipette', 'measuring an exact small volume of liquid'],
            ['tongs', 'holding hot objects'],
            ['a tripod stand', 'supporting apparatus over a flame'],
            ['a spatula', 'scooping small amounts of solids'],
          ],
          ask: (a) => `In the laboratory, ${a} is used for ___.`,
          askBack: (b) => `Which apparatus is used for ${b}?`,
        },
      ],
      categories: [
        { one: 'a laboratory safety rule', many: 'laboratory safety rules', items: ['wear protective goggles', 'tie back long hair', 'never taste chemicals', 'report all accidents', 'point test tubes away from people when heating', 'wash hands after experiments'], set: 's' },
        { one: 'an unsafe laboratory practice', many: 'unsafe laboratory practices', items: ['eating in the laboratory', 'running between benches', 'smelling gases directly', 'leaving a burner unattended', 'mixing chemicals without instructions'], set: 's' },
      ],
    },
    bank: [
      t(2, 'The first step of the scientific method is to ___.', 'identify a problem or question', ['write the conclusion', 'publish the results', 'buy apparatus']),
      t(3, 'Why should a test tube be pointed away from people when heated?', 'The contents may spurt out.', ['It makes heating faster.', 'It saves gas.', 'It cools the tube.']),
      t(3, 'Which hazard symbol warns that a substance can catch fire easily?', 'flammable', ['corrosive', 'toxic', 'radioactive']),
      t(4, 'A learner spills an acid on the hand. What should be done first?', 'wash it with plenty of clean running water', ['wipe it with a dry cloth', 'cover it with oil', 'ignore it']),
      t(4, 'When heating with a Bunsen burner, a blue (non-luminous) flame is preferred because it ___.', 'is hotter and does not produce soot', ['is brighter', 'uses less air', 'is cooler']),
      t(5, 'A learner wants to find out whether temperature affects how fast sugar dissolves. Which must be kept the same?', 'the amount of sugar and water', ['the temperature of the water', 'the time taken', 'nothing at all']),
      t(5, 'The part of an investigation that is changed on purpose is called the ___.', 'independent variable', ['dependent variable', 'control', 'conclusion']),
    ],
  },
  mixtures: {
    facts: {
      pairs: [
        {
          pairs: [
            ['distillation', 'getting pure water from salt water'],
            ['chromatography', 'separating the colours in ink'],
            ['crystallisation', 'getting copper sulphate crystals from its solution'],
            ['filtration', 'removing sand from water'],
            ['using a separating funnel', 'separating oil from water'],
            ['sublimation', 'separating iodine from sand'],
            ['magnetism', 'removing iron filings from sulphur'],
            ['fractional distillation', 'separating alcohol from water'],
          ],
          ask: (a) => `Which mixture is best separated by ${a}?`,
          askBack: (b) => `Which method is best for ${b}?`,
        },
      ],
      categories: [
        { one: 'a pure substance', many: 'pure substances', items: ['distilled water', 'oxygen', 'copper', 'sugar (sucrose)', 'table salt'], set: 'p' },
        { one: 'a mixture', many: 'mixtures', items: ['air', 'sea water', 'soil', 'milk', 'tea', 'cement and sand'], set: 'p' },
      ],
    },
    bank: [
      t(2, 'A mixture of two liquids that do not mix, like oil and water, is called ___.', 'immiscible', ['miscible', 'soluble', 'a solution']),
      t(3, 'In distillation, the vapour is cooled in the ___.', 'condenser', ['beaker', 'funnel', 'flask only']),
      t(3, 'In paper chromatography, the colours separate because they ___.', 'travel at different speeds up the paper', ['have different weights', 'evaporate', 'are magnetic']),
      t(4, 'Why is salt water heated gently near the end of crystallisation instead of boiling it dry?', 'so that good crystals form', ['to make the salt disappear', 'to save water', 'to melt the salt']),
      t(4, 'Which pair can be separated using a separating funnel?', 'kerosene and water', ['salt and water', 'sugar and water', 'alcohol and water']),
      t(5, 'A mixture contains sand, salt and iron filings. Which is the correct order of separation?', 'magnet, dissolve and filter, then evaporate', ['evaporate, magnet, filter', 'distil, sieve, magnet', 'filter, magnet, chromatography']),
      t(5, 'Why does a thermometer in distillation sit at the side arm of the flask?', 'to measure the temperature of the vapour leaving', ['to stir the mixture', 'to cool the flask', 'to hold the cork']),
    ],
  },
  acids: {
    facts: {
      categories: [
        { one: 'an acidic substance', many: 'acidic substances', items: ['lemon juice', 'vinegar', 'sour milk', 'orange juice', 'car battery acid'], set: 'a' },
        { one: 'a basic (alkaline) substance', many: 'basic substances', items: ['soap solution', 'wood ash in water', 'baking soda solution', 'toothpaste', 'milk of magnesia'], set: 'a' },
      ],
      pairs: [
        {
          pairs: [
            ['blue litmus paper in an acid', 'turns red'],
            ['red litmus paper in a base', 'turns blue'],
            ['litmus paper in a neutral solution', 'does not change colour'],
          ],
          ask: (a) => `What happens to ${a}?`,
        },
        {
          pairs: [
            ['pH 1 to 6', 'acidic'],
            ['pH 7', 'neutral'],
            ['pH 8 to 14', 'basic'],
          ],
          ask: (a) => `A solution with ${a} is ___.`,
          askBack: (b) => `What pH range is ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Substances that change colour in acids and bases are called ___.', 'indicators', ['solvents', 'catalysts', 'solutes']),
      t(3, 'Which household substance can be used to relieve a bee sting, which is acidic?', 'baking soda solution', ['vinegar', 'lemon juice', 'sour milk']),
      t(3, 'Pure water has a pH of ___.', '7', ['1', '14', '0']),
      t(4, 'When an acid reacts with a base, the reaction is called ___.', 'neutralisation', ['evaporation', 'distillation', 'condensation']),
      t(4, 'A learner makes an indicator from red cabbage. It turns pink in vinegar. What colour will it most likely turn in soap solution?', 'green or blue', ['pink', 'red', 'no colour']),
      t(5, 'Farmers add lime to acidic soils because lime ___.', 'neutralises the acidity', ['makes the soil more acidic', 'dries up all plants', 'removes water']),
      t(5, 'Why does a doctor give an antacid for indigestion?', 'to neutralise excess stomach acid', ['to make the stomach more acidic', 'to stop breathing', 'to add vitamins']),
    ],
  },
  kingdoms: {
    facts: {
      categories: [
        { one: 'an example of fungi', many: 'fungi', items: ['mushroom', 'yeast', 'bread mould', 'toadstool'], set: 'k' },
        { one: 'an example of a plant', many: 'plants', items: ['fern', 'moss', 'maize', 'cypress', 'bean'], set: 'k' },
        { one: 'an example of an animal', many: 'animals', items: ['earthworm', 'frog', 'butterfly', 'goat', 'snail'], set: 'k' },
        { one: 'an example of bacteria', many: 'bacteria', items: ['bacteria in yoghurt', 'cholera bacteria', 'bacteria in root nodules'], set: 'k' },
      ],
      pairs: [
        {
          pairs: [
            ['plants', 'make their own food by photosynthesis'],
            ['animals', 'feed on other organisms and can move from place to place'],
            ['fungi', 'feed on dead or living matter and reproduce by spores'],
            ['bacteria', 'are single-celled with no true nucleus'],
          ],
          ask: (a) => `Which describes ${a}?`,
          askBack: (b) => `Which group of living things ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Grouping living things according to their features is called ___.', 'classification', ['digestion', 'pollination', 'germination']),
      t(3, 'Why are mushrooms not classified as plants?', 'They have no chlorophyll and cannot make their own food.', ['They are too small.', 'They grow in soil.', 'They have roots.']),
      t(3, 'The scientific name of a living thing has two parts: the genus and the ___.', 'species', ['family', 'kingdom', 'class']),
      t(4, 'Which characteristic do ALL living things share?', 'They grow, respire and reproduce.', ['They all have legs.', 'They all make their own food.', 'They all live in water.']),
      t(4, 'A dichotomous key works by ___.', 'asking pairs of questions about features', ['counting living things', 'weighing animals', 'drawing pictures only']),
      t(5, 'An organism is many-celled, has no chlorophyll and reproduces by spores. In which kingdom is it?', 'Fungi', ['Plantae', 'Animalia', 'Monera']),
      t(5, 'Why is classification useful to scientists?', 'It makes living things easier to identify and study.', ['It makes animals larger.', 'It stops diseases.', 'It changes plants into animals.']),
    ],
  },
  cells: {
    facts: {
      categories: [
        { one: 'a part found in both plant and animal cells', many: 'parts found in both plant and animal cells', items: ['nucleus', 'cytoplasm', 'cell membrane', 'mitochondria'], set: 'c' },
        { one: 'a part found only in plant cells', many: 'parts found only in plant cells', items: ['cell wall', 'chloroplasts', 'large central vacuole'], set: 'c' },
      ],
      pairs: [
        {
          pairs: [
            ['nucleus', 'controls the activities of the cell'],
            ['cell membrane', 'controls what enters and leaves the cell'],
            ['cell wall', 'gives the plant cell shape and support'],
            ['chloroplast', 'is where photosynthesis takes place'],
            ['mitochondrion', 'releases energy from food'],
            ['cytoplasm', 'is where most chemical reactions happen'],
          ],
          ask: (a) => `What does the ${a} do?`,
          askBack: (b) => `Which part of the cell ${b}?`,
        },
        {
          pairs: [
            ['eyepiece lens', 'the lens you look through'],
            ['objective lens', 'the lens closest to the specimen'],
            ['stage', 'where the slide is placed'],
            ['fine adjustment knob', 'brings the image into sharp focus'],
            ['mirror', 'reflects light onto the specimen'],
          ],
          ask: (a) => `In a light microscope, what is the ${a}?`,
          askBack: (b) => `Which part of the microscope is ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'The basic unit of life is the ___.', 'cell', ['atom', 'organ', 'tissue']),
      t(3, 'A microscope has an eyepiece of ×10 and objective of ×40. What is the total magnification?', '×400', ['×50', '×30', '×4']),
      t(3, 'A group of similar cells working together forms a ___.', 'tissue', ['organ', 'system', 'organism']),
      t(4, 'Onion cells seen under a microscope have no chloroplasts. Why?', 'Onion bulbs grow underground without light.', ['Onions are animals.', 'The microscope is broken.', 'Onions have no cells.']),
      t(4, 'Which is the correct order from smallest to largest?', 'cell, tissue, organ, system', ['organ, cell, tissue, system', 'tissue, cell, system, organ', 'system, organ, tissue, cell']),
      t(5, 'Why is iodine solution added to an onion cell slide?', 'to stain the cell parts so they are easier to see', ['to kill germs', 'to make the slide wet', 'to dissolve the cells']),
      t(5, 'Red blood cells have no nucleus. What advantage does this give?', 'more space to carry oxygen', ['they live longer', 'they can divide faster', 'they make food']),
    ],
  },
  health: {
    facts: {
      pairs: [
        {
          pairs: [
            ['malaria', 'a mosquito bite'],
            ['cholera', 'contaminated food or water'],
            ['tuberculosis', 'droplets in the air from coughing'],
            ['ringworm', 'contact with infected skin or items'],
            ['typhoid', 'food or water contaminated by an infected person'],
          ],
          ask: (a) => `How is ${a} usually spread?`,
          askBack: (b) => `Which disease is spread through ${b}?`,
        },
        {
          pairs: [
            ['a minor cut', 'clean it and cover it with a clean dressing'],
            ['a nosebleed', 'sit up, lean forward and pinch the soft part of the nose'],
            ['a minor burn', 'cool it under clean running water'],
            ['fainting', 'lay the person down and raise the legs'],
            ['a sprained ankle', 'rest, ice, compress and raise it'],
          ],
          ask: (a) => `What is the correct first aid for ${a}?`,
          askBack: (b) => `In first aid, when should you ${b}?`,
        },
      ],
      categories: [
        { one: 'a healthy habit', many: 'healthy habits', items: ['exercising regularly', 'sleeping enough', 'eating a balanced diet', 'drinking clean water', 'washing hands often'], set: 'h' },
        { one: 'a harmful habit', many: 'harmful habits', items: ['smoking', 'skipping meals', 'sharing toothbrushes', 'staying up very late', 'misusing drugs'], set: 'h' },
      ],
    },
    bank: [
      t(2, 'A box containing items for treating minor injuries is a ___.', 'first aid kit', ['toolbox', 'lunch box', 'pencil case']),
      t(3, 'Why should a wound be cleaned before it is covered?', 'to remove dirt and germs that cause infection', ['to make it bleed more', 'to make it bigger', 'to warm it']),
      t(3, 'Which disease can be prevented by sleeping under a treated mosquito net?', 'malaria', ['cholera', 'tuberculosis', 'scurvy']),
      t(4, 'A classmate has a nosebleed. Why should they lean forward rather than back?', 'so that blood does not run into the throat', ['so the nose cools', 'so they can sleep', 'so the blood stops at once']),
      t(4, 'What is the main way to prevent the spread of cholera?', 'drinking boiled or treated water and good sanitation', ['wearing shoes', 'sleeping under a net', 'eating more sugar']),
      t(5, 'Why do doctors advise finishing a full course of antibiotics?', 'to clear all the bacteria so the infection does not return', ['to use up the medicine', 'to make the illness last longer', 'to get vitamins']),
      t(5, 'Which is the best way for a school to reduce the spread of flu?', 'encourage handwashing, covering coughs and good ventilation', ['close all windows', 'share cups', 'stop all sports for ever']),
    ],
  },
  energy: {
    facts: {
      pairs: [
        {
          pairs: [
            ['a radio', 'electrical energy into sound energy'],
            ['a solar panel', 'light energy into electrical energy'],
            ['a dry cell', 'chemical energy into electrical energy'],
            ['an electric iron', 'electrical energy into heat energy'],
            ['a generator', 'kinetic energy into electrical energy'],
            ['a burning candle', 'chemical energy into heat and light'],
            ['a car engine', 'chemical energy into kinetic energy'],
          ],
          ask: (a) => `${a[0].toUpperCase()}${a.slice(1)} changes ___.`,
          askBack: (b) => `Which device changes ${b}?`,
        },
      ],
      categories: [
        { one: 'a renewable energy source', many: 'renewable energy sources', items: ['solar', 'wind', 'geothermal', 'hydroelectric', 'biogas'], set: 'r' },
        { one: 'a non-renewable energy source', many: 'non-renewable energy sources', items: ['coal', 'petroleum', 'natural gas', 'diesel', 'uranium'], set: 'r' },
      ],
    },
    bank: [
      t(2, 'Energy that a moving object has is called ___ energy.', 'kinetic', ['potential', 'chemical', 'nuclear']),
      t(3, 'Water stored behind a dam has ___ energy.', 'potential', ['kinetic', 'sound', 'light']),
      t(3, 'The law of conservation of energy states that energy ___.', 'cannot be created or destroyed, only changed', ['is always lost', 'can be created from nothing', 'is the same as power']),
      t(4, 'Which Kenyan power plant uses steam from underground?', 'Olkaria', ['Turkwel', 'Masinga', 'Kipevu']),
      t(4, 'A ball held above the ground is dropped. What energy change takes place as it falls?', 'potential to kinetic', ['kinetic to potential', 'chemical to light', 'heat to sound']),
      t(5, 'Why is solar energy a good choice for homes in northern Kenya?', 'There is plenty of sunshine and it is renewable.', ['There is no sunshine there.', 'Solar needs rivers.', 'It produces smoke.']),
      t(5, 'Which shows energy being wasted?', 'heat given off by a filament bulb', ['light from a bulb', 'sound from a radio', 'motion from a fan']),
    ],
  },
  electricity: {
    facts: {
      pairs: [
        {
          pairs: [
            ['an ammeter', 'measure electric current'],
            ['a voltmeter', 'measure potential difference'],
            ['a fuse', 'break the circuit when too much current flows'],
            ['a switch', 'open and close a circuit'],
            ['a resistor', 'reduce the current in a circuit'],
          ],
          ask: (a) => `We use ${a} to ___.`,
          askBack: (b) => `Which component is used to ${b}?`,
        },
        {
          pairs: [
            ['current', 'ampere (A)'],
            ['potential difference', 'volt (V)'],
            ['resistance', 'ohm (Ω)'],
            ['power', 'watt (W)'],
          ],
          ask: (a) => `What is the SI unit of ${a}?`,
          askBack: (b) => `Which quantity is measured in ${b}s?`,
        },
      ],
    },
    bank: [
      t(2, 'A circuit with only one path for current is a ___ circuit.', 'series', ['parallel', 'short', 'open']),
      t(3, 'In a parallel circuit, if one bulb blows, the others ___.', 'stay lit', ['go off', 'become brighter at once', 'explode']),
      t(3, 'An ammeter is connected in ___ with a component.', 'series', ['parallel', 'reverse', 'any way']),
      t(4, 'Why are houses wired in parallel?', 'Each appliance can be switched on and off on its own.', ['It uses less wire.', 'Bulbs become dimmer.', 'It stops all current.']),
      t(4, 'Adding more bulbs in series makes each bulb ___.', 'dimmer', ['brighter', 'the same', 'hotter and brighter']),
      t(5, 'A current of 2 A flows through a resistor with a voltage of 12 V across it. What is the resistance? (V = IR)', '6 Ω', ['24 Ω', '10 Ω', '14 Ω']),
      t(5, 'Why does a fuse in a plug protect an appliance?', 'Its wire melts and breaks the circuit if the current is too high.', ['It makes the appliance work faster.', 'It stores electricity.', 'It increases the current.']),
    ],
  },
}

const G8: Record<string, Topic> = {
  investigation: {
    facts: {
      pairs: [
        {
          pairs: [
            ['the independent variable', 'the factor you change on purpose'],
            ['the dependent variable', 'the factor you measure'],
            ['controlled variables', 'the factors you keep the same'],
            ['a hypothesis', 'a testable prediction'],
            ['a conclusion', 'what the results show about the question'],
          ],
          ask: (a) => `In an investigation, what is ${a}?`,
          askBack: (b) => `In an investigation, what is ${b} called?`,
        },
        {
          pairs: [
            ['mass', 'electronic balance'],
            ['length', 'metre rule'],
            ['time', 'stopwatch'],
            ['volume of a liquid', 'measuring cylinder'],
            ['temperature', 'thermometer'],
          ],
          ask: (a) => `Which instrument measures ${a}?`,
          askBack: (b) => `What does a ${b} measure?`,
        },
      ],
    },
    bank: [
      t(2, 'Repeating an experiment several times makes the results more ___.', 'reliable', ['expensive', 'dangerous', 'colourful']),
      t(3, 'A learner tests how the height of a ramp affects how far a toy car rolls. What is the dependent variable?', 'the distance the car rolls', ['the height of the ramp', 'the mass of the car', 'the type of floor']),
      t(3, 'Which graph is best for showing how one measured quantity changes with another?', 'a line graph', ['a pie chart', 'a pictogram', 'a table only']),
      t(4, 'Why is a control set up in an experiment?', 'to compare results against and show the effect of the change', ['to make the experiment longer', 'to use more apparatus', 'to avoid recording results']),
      t(5, 'Two learners get different readings of the same length. What is the most likely cause?', 'reading the scale from different angles (parallax)', ['the length changed', 'the ruler melted', 'gravity']),
    ],
  },
  atoms: {
    facts: {
      pairs: [
        {
          pairs: [
            ['oxygen', 'O'],
            ['hydrogen', 'H'],
            ['sodium', 'Na'],
            ['iron', 'Fe'],
            ['copper', 'Cu'],
            ['potassium', 'K'],
            ['calcium', 'Ca'],
            ['carbon', 'C'],
            ['nitrogen', 'N'],
            ['chlorine', 'Cl'],
          ],
          ask: (a) => `What is the chemical symbol for ${a}?`,
          askBack: (b) => `Which element has the symbol ${b}?`,
        },
        {
          pairs: [
            ['water', 'H₂O'],
            ['carbon dioxide', 'CO₂'],
            ['table salt (sodium chloride)', 'NaCl'],
            ['oxygen gas', 'O₂'],
          ],
          ask: (a) => `What is the chemical formula of ${a}?`,
          askBack: (b) => `Which substance has the formula ${b}?`,
        },
      ],
      categories: [
        { one: 'an element', many: 'elements', items: ['oxygen', 'iron', 'gold', 'carbon', 'sulphur'], set: 'e' },
        { one: 'a compound', many: 'compounds', items: ['water', 'carbon dioxide', 'sodium chloride', 'sugar', 'rust (iron oxide)'], set: 'e' },
      ],
    },
    bank: [
      t(2, 'The smallest particle of an element is an ___.', 'atom', ['molecule', 'cell', 'ion']),
      t(3, 'Two or more elements chemically combined form a ___.', 'compound', ['mixture', 'solution', 'atom']),
      t(3, 'Particles in a solid ___.', 'vibrate in fixed positions', ['move freely in all directions', 'are far apart', 'do not move at all']),
      t(4, 'How many atoms are in one molecule of H₂O?', '3', ['2', '1', '4']),
      t(4, 'Why does a gas fill its container?', 'Its particles move freely and spread out.', ['Its particles are packed tightly.', 'It has a fixed shape.', 'It is heavier than air.']),
      t(5, 'A drop of ink spreads through still water without stirring. This is evidence that ___.', 'particles are always moving', ['ink is a gas', 'water is a solid', 'particles do not move']),
    ],
  },
  changes: {
    facts: {
      categories: [
        { one: 'a physical change', many: 'physical changes', items: ['melting ice', 'boiling water', 'dissolving sugar', 'breaking glass', 'cutting paper', 'freezing water'], set: 'c' },
        { one: 'a chemical change', many: 'chemical changes', items: ['burning charcoal', 'rusting iron', 'cooking an egg', 'souring milk', 'baking bread', 'digesting food'], set: 'c' },
      ],
      pairs: [
        {
          pairs: [
            ['a physical change', 'no new substance is formed and it is usually reversible'],
            ['a chemical change', 'a new substance is formed and it is usually irreversible'],
          ],
          ask: (a) => `Which describes ${a}?`,
        },
      ],
    },
    bank: [
      t(2, 'Rusting needs iron, water and ___.', 'oxygen', ['salt only', 'nitrogen', 'sunlight']),
      t(3, 'Which is a sign that a chemical change has happened?', 'a gas is given off and a new colour appears', ['the shape changes', 'the size changes', 'it becomes wet']),
      t(3, 'Why is painting an iron gate a good idea?', 'Paint keeps out air and water, preventing rust.', ['Paint makes iron heavier.', 'Paint turns iron into copper.', 'Paint makes it rust faster.']),
      t(4, 'When magnesium burns in air, a white ash forms. This is a ___ change.', 'chemical', ['physical', 'reversible', 'state']),
      t(5, 'A learner heats ice until it melts, then freezes the water again. What does this show?', 'Melting is a reversible physical change.', ['Melting is a chemical change.', 'Ice is a compound that breaks down.', 'Water cannot freeze.']),
    ],
  },
  transport: {
    facts: {
      pairs: [
        {
          pairs: [
            ['diffusion', 'movement of particles from a high to a low concentration'],
            ['osmosis', 'movement of water through a partially permeable membrane'],
            ['transpiration', 'loss of water vapour from leaves'],
            ['xylem', 'tubes that carry water in plants'],
            ['phloem', 'tubes that carry food in plants'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `What is ${b} called?`,
        },
      ],
      categories: [
        { one: 'a factor that increases transpiration', many: 'factors that increase transpiration', items: ['high temperature', 'wind', 'low humidity', 'bright light'], set: 't' },
        { one: 'a factor that reduces transpiration', many: 'factors that reduce transpiration', items: ['high humidity', 'still air', 'low temperature', 'darkness'], set: 't' },
      ],
    },
    bank: [
      t(2, 'The smell of food cooking spreads through the house by ___.', 'diffusion', ['osmosis', 'transpiration', 'evaporation only']),
      t(3, 'Raw potato strips are placed in salty water. After an hour they become soft because ___.', 'water moved out of the potato by osmosis', ['salt moved in by osmosis', 'they were cooked', 'they gained water']),
      t(3, 'Why do farmers transplant seedlings in the evening?', 'to reduce water loss by transpiration', ['to see better', 'to increase transpiration', 'because soil is warm']),
      t(4, 'A stick of celery stands in red ink. Red lines appear in the stem. Which tissue carried the ink?', 'xylem', ['phloem', 'epidermis', 'cortex']),
      t(5, 'Why are fish preserved by salting?', 'Salt draws water out of germs by osmosis, stopping them from growing.', ['Salt adds water to the fish.', 'Salt cooks the fish.', 'Salt adds oxygen.']),
    ],
  },
  bodysystems: {
    facts: {
      pairs: [
        {
          pairs: [
            ['the heart', 'pumps blood around the body'],
            ['the lungs', 'take in oxygen and remove carbon dioxide'],
            ['the kidneys', 'filter waste from the blood to make urine'],
            ['the skin', 'removes waste as sweat and controls temperature'],
            ['the liver', 'breaks down harmful substances and makes bile'],
            ['the small intestine', 'absorbs digested food into the blood'],
          ],
          ask: (a) => `What does ${a} do?`,
          askBack: (b) => `Which organ ${b}?`,
        },
      ],
      categories: [
        { one: 'an organ of excretion', many: 'organs of excretion', items: ['kidneys', 'skin', 'lungs', 'liver'], set: 'o' },
        { one: 'an organ of digestion', many: 'organs of digestion', items: ['stomach', 'small intestine', 'mouth', 'oesophagus'], set: 'o' },
      ],
    },
    bank: [
      t(2, 'Removal of waste products from the body is called ___.', 'excretion', ['digestion', 'respiration', 'circulation']),
      t(3, 'Which blood vessels carry blood away from the heart?', 'arteries', ['veins', 'capillaries', 'nerves']),
      t(3, 'Why do we sweat more when we exercise?', 'to cool the body as sweat evaporates', ['to gain water', 'to warm the body', 'to remove food']),
      t(4, 'In which part of the lungs does gas exchange take place?', 'alveoli (air sacs)', ['trachea', 'bronchi', 'diaphragm']),
      t(5, 'Why should we drink plenty of water every day?', 'to help the kidneys remove waste and keep the body cool', ['to grow taller at once', 'to stop breathing', 'to digest stones']),
    ],
  },
  ecology: {
    facts: {
      pairs: [
        {
          pairs: [
            ['a producer', 'an organism that makes its own food, like grass'],
            ['a primary consumer', 'an animal that eats plants, like a zebra'],
            ['a secondary consumer', 'an animal that eats plant-eaters, like a lion'],
            ['a decomposer', 'an organism that breaks down dead matter, like fungi'],
            ['a habitat', 'the place where an organism lives'],
            ['a population', 'all the organisms of one kind in an area'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `What is ${b} called?`,
        },
      ],
    },
    bank: [
      t(2, 'In a food chain, the arrow points to the organism that ___.', 'does the eating', ['is eaten', 'is the smallest', 'is a plant']),
      t(3, 'In the chain grass → grasshopper → frog → snake, which is the secondary consumer?', 'frog', ['grass', 'grasshopper', 'snake']),
      t(3, 'Why are decomposers important in an ecosystem?', 'They return nutrients to the soil.', ['They eat all the plants.', 'They make oxygen.', 'They are producers.']),
      t(4, 'If all the frogs in a pond disappeared, what would most likely happen to the insects they eat?', 'Their numbers would increase.', ['Their numbers would fall.', 'They would turn into frogs.', 'Nothing would change.']),
      t(5, 'Bees pollinate flowers and get nectar in return. This relationship is called ___.', 'mutualism', ['parasitism', 'predation', 'competition']),
    ],
  },
  light: {
    facts: {
      pairs: [
        {
          pairs: [
            ['a concave mirror', 'shaving and make-up mirrors'],
            ['a convex mirror', 'side mirrors of vehicles'],
            ['a plane mirror', 'a periscope'],
          ],
          ask: (a) => `Where is ${a} commonly used?`,
          askBack: (b) => `Which mirror is used in ${b}?`,
        },
        {
          pairs: [
            ['reflection', 'light bouncing off a surface'],
            ['refraction', 'light bending as it passes from one medium to another'],
            ['dispersion', 'white light splitting into colours'],
          ],
          ask: (a) => `What is ${a} of light?`,
          askBack: (b) => `What is ${b} called?`,
        },
      ],
    },
    bank: [
      t(2, 'The angle of incidence is ___ the angle of reflection.', 'equal to', ['greater than', 'less than', 'double']),
      t(3, 'A rainbow forms because sunlight is ___ by raindrops.', 'dispersed', ['absorbed only', 'reflected only', 'stopped']),
      t(3, 'Why does a pencil in a glass of water look bent?', 'Light is refracted as it leaves the water.', ['The water bends the pencil.', 'Light travels faster in water.', 'The glass is curved only.']),
      t(4, 'Why do vehicles use convex side mirrors?', 'They give a wider field of view.', ['They make objects look bigger.', 'They are cheaper.', 'They focus light.']),
      t(5, 'White light passes through a glass prism. Which colour bends the most?', 'violet', ['red', 'yellow', 'green']),
    ],
  },
  heat: {
    facts: {
      pairs: [
        {
          pairs: [
            ['conduction', 'a metal spoon in hot tea becomes hot'],
            ['convection', 'warm air rises above a jiko'],
            ['radiation', 'we feel the warmth of the sun'],
          ],
          ask: (a) => `Which is an example of ${a}?`,
          askBack: (b) => `How is heat transferred when ${b}?`,
        },
      ],
      categories: [
        { one: 'a good conductor of heat', many: 'good conductors', items: ['copper', 'aluminium', 'iron', 'silver'], set: 'c' },
        { one: 'a poor conductor of heat', many: 'poor conductors', items: ['wood', 'plastic', 'wool', 'air', 'glass'], set: 'c' },
      ],
    },
    bank: [
      t(2, 'Heat always flows from a ___ body to a colder one.', 'hotter', ['colder', 'larger', 'smaller']),
      t(3, 'Why are the bottoms of some cooking pots made of copper?', 'Copper conducts heat very well.', ['Copper is cheap.', 'Copper is light.', 'Copper stops heat.']),
      t(3, 'Dull black surfaces are good ___ of heat.', 'absorbers and emitters', ['reflectors', 'insulators only', 'conductors only']),
      t(4, 'Why are electric kettles\' heating elements placed at the bottom?', 'Hot water rises, setting up convection currents.', ['Water is heavier at the top.', 'It is easier to clean.', 'Heat sinks.']),
      t(5, 'How does a vacuum flask keep tea hot?', 'The vacuum stops conduction and convection, and silvered walls reduce radiation.', ['The vacuum heats the tea.', 'The cork produces heat.', 'The glass is a good conductor.']),
    ],
  },
  pressure: {
    facts: {
      pairs: [
        {
          pairs: [
            ['a sharp knife', 'a small area increases pressure for cutting'],
            ['wide tractor tyres', 'a large area reduces pressure on soft ground'],
            ['a camel\'s wide feet', 'a large area stops it sinking into sand'],
            ['a drinking straw', 'air pressure pushes the drink up'],
            ['a dam wall thicker at the bottom', 'water pressure increases with depth'],
          ],
          ask: (a) => `Why is ${a} useful?`,
          askBack: (b) => `Which example shows that ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Pressure is force divided by ___.', 'area', ['mass', 'volume', 'time']),
      t(3, 'The SI unit of pressure is the ___.', 'pascal', ['newton', 'joule', 'watt']),
      t(3, 'A force of 200 N acts on an area of 4 m². What is the pressure?', '50 Pa', ['800 Pa', '204 Pa', '196 Pa']),
      t(4, 'Why does a diver feel more pressure deeper in a lake?', 'Liquid pressure increases with depth.', ['Water is lighter deeper down.', 'Air pressure falls.', 'The lake is colder.']),
      t(5, 'Why is it easier to walk on sand in flat shoes than in high heels?', 'Flat shoes spread the weight over a larger area, reducing pressure.', ['Flat shoes are lighter.', 'High heels increase the area.', 'Sand is harder for flat shoes.']),
    ],
  },
}

const G9: Record<string, Topic> = {
  periodic: {
    facts: {
      pairs: [
        {
          pairs: [
            ['protons', 'positive charge, in the nucleus'],
            ['neutrons', 'no charge, in the nucleus'],
            ['electrons', 'negative charge, moving around the nucleus'],
          ],
          ask: (a) => `What are ${a}?`,
          askBack: (b) => `Which particles have ${b}?`,
        },
        {
          pairs: [
            ['Group 1 (alkali metals)', 'sodium and potassium'],
            ['Group 7 (halogens)', 'chlorine and fluorine'],
            ['Group 8 (noble gases)', 'helium and neon'],
          ],
          ask: (a) => `Which elements are in ${a}?`,
          askBack: (b) => `In which group are ${b}?`,
        },
      ],
      categories: [
        { one: 'a metal', many: 'metals', items: ['iron', 'copper', 'aluminium', 'sodium', 'magnesium'], set: 'm' },
        { one: 'a non-metal', many: 'non-metals', items: ['sulphur', 'carbon', 'oxygen', 'chlorine', 'nitrogen'], set: 'm' },
        { one: 'an alloy', many: 'alloys', items: ['brass', 'bronze', 'steel', 'solder'], set: 'a' },
        { one: 'a pure metal', many: 'pure metals', items: ['copper', 'zinc', 'tin', 'lead'], set: 'a' },
      ],
    },
    bank: [
      t(2, 'The number of protons in an atom is its ___.', 'atomic number', ['mass number', 'group', 'period']),
      t(3, 'An atom has 11 protons and 12 neutrons. What is its mass number?', '23', ['11', '12', '1']),
      t(3, 'Brass is an alloy of copper and ___.', 'zinc', ['iron', 'tin', 'lead']),
      t(4, 'Why are noble gases unreactive?', 'Their outer electron shells are full.', ['They have no electrons.', 'They are metals.', 'They are very heavy.']),
      t(4, 'Why are electric wires made of copper?', 'It is a good conductor and can be drawn into wires.', ['It is magnetic.', 'It is an insulator.', 'It rusts easily.']),
      t(5, 'Sodium has atomic number 11. How are its electrons arranged?', '2, 8, 1', ['2, 9', '8, 2, 1', '2, 8, 2']),
    ],
  },
  water: {
    facts: {
      categories: [
        { one: 'a way to soften hard water', many: 'ways to soften water', items: ['boiling (for temporary hardness)', 'adding washing soda', 'distillation', 'ion exchange'], set: 'w' },
        { one: 'a stage of water treatment at a waterworks', many: 'stages of water treatment', items: ['screening', 'sedimentation', 'filtration', 'chlorination'], set: 'w' },
      ],
      pairs: [
        {
          pairs: [
            ['screening', 'removes large objects like sticks and leaves'],
            ['sedimentation', 'lets fine particles settle at the bottom'],
            ['filtration', 'removes small particles through sand beds'],
            ['chlorination', 'kills germs'],
          ],
          ask: (a) => `In water treatment, what does ${a} do?`,
          askBack: (b) => `Which stage of water treatment ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Water that easily forms lather with soap is ___ water.', 'soft', ['hard', 'salty', 'dirty']),
      t(3, 'A white scale forms inside kettles in hard water areas. What is it?', 'calcium carbonate deposits', ['rust', 'salt crystals from the sea', 'paint']),
      t(3, 'Which is an advantage of hard water?', 'It provides calcium for teeth and bones.', ['It wastes soap.', 'It blocks pipes.', 'It forms scum.']),
      t(4, 'Temporary hardness can be removed by boiling because boiling ___.', 'turns dissolved calcium hydrogencarbonate into insoluble chalk', ['adds salt', 'kills germs', 'removes oxygen']),
      t(5, 'Why is water at a treatment works left in large tanks before filtration?', 'to let suspended particles settle', ['to warm it', 'to add colour', 'to make it hard']),
    ],
  },
  nutrition: {
    facts: {
      pairs: [
        {
          pairs: [
            ['saliva (amylase)', 'starch into sugars'],
            ['pepsin', 'proteins in the stomach'],
            ['bile', 'fats into tiny droplets'],
            ['lipase', 'fats into fatty acids and glycerol'],
          ],
          ask: (a) => `In digestion, ${a} acts on ___.`,
          askBack: (b) => `Which substance acts on ${b}?`,
        },
        {
          pairs: [
            ['light', 'is absorbed by chlorophyll'],
            ['carbon dioxide', 'enters the leaf through stomata'],
            ['water', 'is taken in by the roots'],
            ['oxygen', 'is given out as a by-product'],
            ['glucose', 'is the food made'],
          ],
          ask: (a) => `In photosynthesis, ${a} ___.`,
          askBack: (b) => `In photosynthesis, which substance ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'The process by which green plants make food is called ___.', 'photosynthesis', ['respiration', 'digestion', 'transpiration']),
      t(3, 'Iodine solution turns blue-black when a leaf contains ___.', 'starch', ['protein', 'fat', 'water']),
      t(3, 'Why is a leaf boiled in alcohol before testing for starch?', 'to remove the chlorophyll', ['to add starch', 'to kill germs', 'to make it green']),
      t(4, 'A leaf partly covered with foil is tested for starch. Only the uncovered part turns blue-black. What does this show?', 'Light is needed for photosynthesis.', ['Water is needed.', 'Foil makes starch.', 'Carbon dioxide is not needed.']),
      t(5, 'Why do the villi in the small intestine have many tiny folds?', 'to give a large surface area for absorption', ['to store food', 'to make bile', 'to slow down digestion completely']),
    ],
  },
  reproduction: {
    facts: {
      pairs: [
        {
          pairs: [
            ['the anther', 'produces pollen grains'],
            ['the stigma', 'receives pollen grains'],
            ['the ovary', 'develops into the fruit'],
            ['the ovule', 'develops into the seed'],
            ['the petals', 'attract insects'],
          ],
          ask: (a) => `In a flower, what does ${a} do?`,
          askBack: (b) => `Which part of a flower ${b}?`,
        },
        {
          pairs: [
            ['wind', 'light seeds with wings or hairs, like dandelion'],
            ['animals', 'juicy fruits or hooked seeds, like mango and blackjack'],
            ['water', 'fruits that float, like coconut'],
            ['explosion', 'pods that burst open, like beans'],
          ],
          ask: (a) => `Which seeds are dispersed by ${a}?`,
          askBack: (b) => `How are ${b} dispersed?`,
        },
      ],
    },
    bank: [
      t(2, 'The transfer of pollen from an anther to a stigma is called ___.', 'pollination', ['fertilisation', 'germination', 'dispersal']),
      t(3, 'Why do wind-pollinated flowers produce large amounts of light pollen?', 'Much of it is lost, so a lot is needed to reach stigmas.', ['to attract insects', 'to make nectar', 'to stay heavy']),
      t(3, 'Fertilisation happens when ___.', 'the male nucleus joins the egg cell in the ovule', ['pollen lands on a petal', 'seeds fall to the ground', 'the fruit ripens']),
      t(4, 'Why must seeds be dispersed away from the parent plant?', 'to reduce competition for light, water and nutrients', ['to make them grow faster at once', 'to keep them near water', 'to stop germination']),
      t(5, 'A flower has small dull petals, no scent and feathery stigmas hanging outside. How is it pollinated?', 'by wind', ['by insects', 'by birds', 'by water']),
    ],
  },
  ecosystems: {
    facts: {
      categories: [
        { one: 'a cause of land pollution', many: 'causes of land pollution', items: ['plastic waste', 'careless dumping', 'excess fertilisers', 'mining waste'], set: 'p' },
        { one: 'a way of conserving the environment', many: 'ways of conserving the environment', items: ['recycling', 'planting trees', 'using renewable energy', 'reducing plastic use', 'proper waste disposal'], set: 'p' },
      ],
      pairs: [
        {
          pairs: [
            ['the carbon cycle', 'carbon moves through photosynthesis, respiration and decay'],
            ['the water cycle', 'water moves through evaporation, condensation and rain'],
            ['the greenhouse effect', 'gases trap heat in the atmosphere'],
          ],
          ask: (a) => `What happens in ${a}?`,
          askBack: (b) => `What is it called when ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Living and non-living things interacting in an area form an ___.', 'ecosystem', ['organ', 'element', 'atom']),
      t(3, 'Which gas is mainly responsible for the enhanced greenhouse effect?', 'carbon dioxide', ['oxygen', 'nitrogen', 'helium']),
      t(3, 'How do trees help reduce global warming?', 'They absorb carbon dioxide during photosynthesis.', ['They release carbon dioxide only.', 'They make the soil hot.', 'They produce smoke.']),
      t(4, 'Why is burning plastic waste harmful?', 'It releases poisonous gases into the air.', ['It makes plastic stronger.', 'It cleans the air.', 'It adds nutrients to soil.']),
      t(5, 'Which practice best protects Kenya\'s water towers such as the Mau?', 'protecting forests and replanting cleared areas', ['clearing forests for farms', 'draining swamps', 'burning grassland']),
    ],
  },
  motion: {
    facts: {
      pairs: [
        {
          pairs: [
            ['speed', 'distance travelled per unit time'],
            ['velocity', 'speed in a stated direction'],
            ['acceleration', 'change in velocity per unit time'],
            ['displacement', 'distance in a stated direction'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `What is ${b} called?`,
        },
        {
          pairs: [
            ['speed', 'm/s'],
            ['acceleration', 'm/s²'],
            ['force', 'newton'],
          ],
          ask: (a) => `What is the SI unit of ${a}?`,
        },
      ],
    },
    bank: [
      t(2, 'A car covers 100 m in 5 s. What is its average speed?', '20 m/s', ['500 m/s', '95 m/s', '105 m/s']),
      t(3, 'A cyclist increases speed from 2 m/s to 10 m/s in 4 s. What is the acceleration?', '2 m/s²', ['8 m/s²', '3 m/s²', '12 m/s²']),
      t(3, 'On a distance–time graph, a horizontal line means the object is ___.', 'stationary', ['speeding up', 'slowing down', 'moving at constant speed']),
      t(4, 'Why do passengers lurch forward when a matatu stops suddenly?', 'Their bodies tend to keep moving (inertia).', ['The seat pushes them.', 'Gravity pulls them forward.', 'Air pushes them.']),
      t(5, 'Why are seat belts important?', 'They stop passengers continuing forward in a sudden stop.', ['They make the car faster.', 'They reduce fuel use.', 'They keep passengers warm.']),
    ],
  },
  work: {
    facts: {
      pairs: [
        {
          pairs: [
            ['work', 'force × distance moved in the direction of the force'],
            ['power', 'work done per unit time'],
            ['efficiency', 'useful work out ÷ work in × 100%'],
            ['mechanical advantage', 'load ÷ effort'],
          ],
          ask: (a) => `How is ${a} calculated?`,
          askBack: (b) => `What is ${b}?`,
        },
        {
          pairs: [
            ['work', 'joule'],
            ['power', 'watt'],
          ],
          ask: (a) => `What is the SI unit of ${a}?`,
        },
      ],
    },
    bank: [
      t(2, 'A force of 50 N moves a box 4 m. How much work is done?', '200 J', ['54 J', '12.5 J', '46 J']),
      t(3, 'A machine does 600 J of work in 20 s. What is its power?', '30 W', ['12,000 W', '620 W', '580 W']),
      t(3, 'A lever lifts a 400 N load with an effort of 100 N. What is the mechanical advantage?', '4', ['300', '500', '0.25']),
      t(4, 'Why is no machine 100% efficient?', 'Some energy is always lost, mostly as heat from friction.', ['Machines create energy.', 'Machines have no mass.', 'Efficiency is always 100%.']),
      t(5, 'A learner carries a bag 10 m along level ground at constant height. Why does the learner do little or no work on the bag against gravity?', 'The bag does not move in the direction of the lifting force.', ['The bag has no weight.', 'Walking creates energy.', 'The ground does the work.']),
    ],
  },
  electricity: {
    facts: {
      pairs: [
        {
          pairs: [
            ['an electric kettle', 'the heating effect of current'],
            ['an electric bell', 'the magnetic effect of current'],
            ['electroplating', 'the chemical effect of current'],
          ],
          ask: (a) => `${a[0].toUpperCase()}${a.slice(1)} uses ___.`,
          askBack: (b) => `Which device uses ${b}?`,
        },
      ],
      categories: [
        { one: 'a way to save electricity at home', many: 'ways to save electricity', items: ['switching off unused lights', 'using energy-saving bulbs', 'unplugging chargers', 'drying clothes in the sun'], set: 's' },
        { one: 'an electrical hazard', many: 'electrical hazards', items: ['overloaded sockets', 'frayed cables', 'wet hands on switches', 'broken plugs'], set: 's' },
      ],
    },
    bank: [
      t(2, 'Electricity is sold by Kenya Power in units called ___.', 'kilowatt-hours', ['volts', 'amperes', 'joules only']),
      t(3, 'A 2,000 W heater is used for 3 hours. How many kWh does it use?', '6 kWh', ['600 kWh', '2,003 kWh', '0.6 kWh']),
      t(3, 'If one kWh costs 25 shillings, how much does 6 kWh cost?', '150 shillings', ['31 shillings', '19 shillings', '250 shillings']),
      t(4, 'Why does a fuse wire have a low melting point?', 'so it melts quickly when the current is too high', ['so it lasts for ever', 'so it conducts less', 'so it stays cool']),
      t(5, 'Why is an LED bulb cheaper to run than a filament bulb of the same brightness?', 'It wastes less energy as heat.', ['It uses more power.', 'It is heavier.', 'It needs no electricity.']),
    ],
  },
}

const ALL: Record<string, Topic> = {}
for (const [g, set] of [[7, G7], [8, G8], [9, G9]] as const) for (const [k, v] of Object.entries(set)) ALL[`j${g}s-${k}`] = v

export const JSS_SCIENCE_GENERATORS: Record<string, Generator> = Object.fromEntries(Object.entries(ALL).map(([k, v]) => [k, factGenerator(v.facts)]))
export const JSS_SCIENCE_BANKS: Record<string, BankQuestion[]> = Object.fromEntries(Object.entries(ALL).map(([k, v]) => [k, v.bank]))
