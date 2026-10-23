// Junior school Pre-Technical Studies, Social Studies, Agriculture and Nutrition, Creative
// Arts and Sports, and CRE (Grades 7–9). Shared topics carry the first grade each written
// question suits; Social Studies has its own topics each year. All content is original.
import { factGenerator, type FactSet } from '../facts'
import { labelOptions as opts } from '../generators/english'
import { uid } from '../helpers'
import type { BankQuestion, ChoiceQuestion, Generator, Level, Rng } from '../types'

type J = 7 | 8 | 9
type Row = [J, BankQuestion]
const t = (g: J, level: Level, prompt: string, answer: string, wrong: string[]): Row => [g, { type: 'choice', level, prompt, options: opts([answer, ...wrong]), answer }]

interface Topic {
  facts: FactSet
  bank: Row[]
}

// ── Pre-Technical Studies ───────────────────────────────────────────────────

const PRETECH: Record<string, Topic> = {
  safety: {
    facts: {
      categories: [
        { one: 'a workshop safety rule', many: 'workshop safety rules', items: ['wear an overall and safety boots', 'keep the floor clear and dry', 'use the right tool for the job', 'report damaged tools', 'never run in the workshop'], set: 's' },
        { one: 'an unsafe workshop practice', many: 'unsafe workshop practices', items: ['wearing loose clothes near machines', 'leaving tools on the floor', 'using blunt tools', 'playing with power switches'], set: 's' },
        { one: 'personal protective equipment (PPE)', many: 'items of PPE', items: ['goggles', 'gloves', 'helmet', 'ear muffs', 'dust mask'], set: 'p' },
        { one: 'a workshop tool', many: 'workshop tools', items: ['hammer', 'saw', 'chisel', 'spanner', 'pliers'], set: 'p' },
      ],
      pairs: [
        {
          pairs: [
            ['a wood or paper fire (Class A)', 'water or a water extinguisher'],
            ['a burning oil or petrol fire (Class B)', 'foam or a dry powder extinguisher'],
            ['an electrical fire', 'a carbon dioxide extinguisher, after switching off the power'],
          ],
          ask: (a) => `What should be used to put out ${a}?`,
          askBack: (b) => `Which kind of fire is put out with ${b}?`,
        },
        {
          pairs: [
            ['goggles', 'protect the eyes from flying particles'],
            ['ear muffs', 'protect the ears from loud noise'],
            ['a dust mask', 'stop dust from being breathed in'],
            ['gloves', 'protect the hands from cuts and chemicals'],
          ],
          ask: (a) => `Why do we wear ${a}?`,
          askBack: (b) => `Which item of PPE do we wear to ${b}?`,
        },
      ],
    },
    bank: [
      t(7, 2, 'The first thing to do if a fire starts in the workshop is to ___.', 'raise the alarm', ['hide under a bench', 'continue working', 'open all windows wide']),
      t(7, 3, 'Why should water never be used on an electrical fire?', 'Water conducts electricity and can cause electric shock.', ['Water is too expensive to waste on small fires.', 'Water makes electrical fires burn more slowly.', 'Water evaporates before it reaches the flames.']),
      t(7, 3, 'A safety sign with a red circle and a diagonal line means ___.', 'something is prohibited', ['first aid is available', 'wear protective equipment', 'a fire exit']),
      t(8, 4, 'A safety sign that is a blue circle tells you ___.', 'what you must do, such as wear goggles', ['what is forbidden', 'where the fire exit is', 'that there is danger ahead']),
      t(8, 4, 'Why should waste materials be sorted before disposal?', 'so that they can be recycled and disposed of safely', ['so that the workshop looks full and busy', 'so that all of it can be burned at once', 'so that it can be hidden from inspectors']),
      t(9, 5, 'Working on a raised platform, a learner should first ___.', 'check that the platform is stable and use a safety harness', ['carry all the heavy tools up in one trip to save time', 'remove the side railings so there is more space to work', 'stand on a chair on the platform to reach higher']),
    ],
  },
  careers: {
    facts: {
      pairs: [
        {
          pairs: [
            ['an architect', 'designs buildings'],
            ['an electrician', 'installs and repairs electrical wiring'],
            ['an accountant', 'keeps and checks financial records'],
            ['a software developer', 'writes computer programs'],
            ['a carpenter', 'makes and repairs wooden items'],
            ['an agricultural officer', 'advises farmers on crops and livestock'],
            ['a graphic designer', 'creates images for adverts and books'],
            ['a mechanic', 'repairs vehicles and machines'],
          ],
          ask: (a) => `What does ${a} do?`,
          askBack: (b) => `Which career involves a person who ${b}?`,
        },
      ],
      categories: [
        { one: 'a career in the technical field', many: 'technical careers', items: ['plumber', 'welder', 'electrician', 'mechanic', 'civil engineer'], set: 'c' },
        { one: 'a career in business', many: 'business careers', items: ['accountant', 'banker', 'sales manager', 'auditor', 'entrepreneur'], set: 'c' },
      ],
    },
    bank: [
      t(7, 2, 'Natural abilities that a person is born with are called ___.', 'talents', ['careers', 'tools', 'hobbies']),
      t(7, 3, 'Which is the best first step in choosing a career?', 'knowing your interests, strengths and values', ['copying a friend', 'choosing the highest paying job only', 'waiting to be told']),
      t(8, 4, 'A learner enjoys drawing and using computers. Which career fits best?', 'graphic designer', ['plumber', 'farmer', 'nurse']),
      t(9, 4, 'In senior school, the pathway for those who want to become engineers is ___.', 'STEM', ['Arts and Sports Science', 'Social Sciences', 'none']),
      t(9, 5, 'Why is it useful to talk to people working in a career you like?', 'to learn what the job involves and what training is needed', ['to ask them to give you a job before you finish school', 'to find out which career pays the most money quickly', 'to avoid having to choose subjects in senior school']),
    ],
  },
  drawing: {
    facts: {
      pairs: [
        {
          pairs: [
            ['a T-square', 'draw horizontal lines'],
            ['set squares', 'draw lines at 30°, 45°, 60° and 90°'],
            ['a pair of compasses', 'draw circles and arcs'],
            ['a protractor', 'measure and draw angles'],
            ['a drawing board', 'hold the paper firmly while drawing'],
            ['a French curve', 'draw irregular curves'],
          ],
          ask: (a) => `We use ${a} to ___.`,
          askBack: (b) => `Which drawing instrument is used to ${b}?`,
        },
        {
          pairs: [
            ['a thick continuous line', 'visible outlines and edges'],
            ['a short dashed line', 'hidden edges'],
            ['a chain line (long dash, short dash)', 'centre lines'],
            ['a thin continuous line', 'dimension and projection lines'],
          ],
          ask: (a) => `In technical drawing, ${a} shows ___.`,
          askBack: (b) => `Which type of line shows ${b}?`,
        },
      ],
      categories: [
        { one: 'a pictorial drawing', many: 'pictorial drawings', items: ['isometric drawing', 'oblique drawing', 'perspective drawing'], set: 'd' },
        { one: 'a view in orthographic projection', many: 'orthographic views', items: ['front view (elevation)', 'top view (plan)', 'side view (end elevation)'], set: 'd' },
      ],
    },
    bank: [
      t(7, 2, 'Which pencil grade is best for light construction lines?', '2H', ['2B', 'HB', '6B']),
      t(7, 3, 'In isometric drawing, the receding lines are drawn at ___ to the horizontal.', '30°', ['45°', '60°', '90°']),
      t(8, 3, 'In oblique drawing, the receding lines are usually drawn at ___.', '45°', ['30°', '90°', '15°']),
      t(8, 4, 'A drawing at a scale of 1 : 10 shows an object ___.', 'ten times smaller than its real size', ['ten times bigger than its real size', 'exactly the same size as the object', 'one tenth bigger than its real size']),
      t(9, 4, 'In first-angle orthographic projection, the plan is drawn ___ the front elevation.', 'below', ['above', 'to the left of', 'on top of']),
      t(9, 5, 'A line 6 cm long on a drawing at scale 1 : 50 represents what real length?', '3 m', ['30 cm', '300 m', '6 m']),
    ],
  },
  computers: {
    facts: {
      categories: [
        { one: 'an input device', many: 'input devices', items: ['keyboard', 'mouse', 'scanner', 'microphone', 'webcam'], set: 'd' },
        { one: 'an output device', many: 'output devices', items: ['monitor', 'printer', 'speakers', 'projector', 'headphones'], set: 'd' },
        { one: 'a storage device', many: 'storage devices', items: ['flash disk', 'hard disk', 'memory card', 'solid-state drive'], set: 'd' },
        { one: 'a safe online practice', many: 'safe online practices', items: ['using strong passwords', 'not sharing personal details', 'logging out of shared computers', 'reporting cyberbullying', 'thinking before clicking links'], set: 's' },
        { one: 'a risky online practice', many: 'risky online practices', items: ['sharing your password', 'meeting online strangers alone', 'clicking unknown links', 'posting your home address'], set: 's' },
      ],
      pairs: [
        {
          pairs: [
            ['the CPU', 'processes data and instructions'],
            ['RAM', 'holds data temporarily while the computer is on'],
            ['the operating system', 'manages the computer\'s hardware and software'],
            ['a word processor', 'creates and edits documents'],
            ['a spreadsheet', 'organises numbers and does calculations'],
            ['antivirus software', 'protects against malicious programs'],
          ],
          ask: (a) => `What does ${a} do?`,
          askBack: (b) => `Which part or program ${b}?`,
        },
      ],
    },
    bank: [
      t(7, 2, 'The physical parts of a computer are called ___.', 'hardware', ['software', 'data', 'networks']),
      t(7, 3, 'Which is an example of application software?', 'a word processor', ['the monitor', 'the CPU', 'the keyboard']),
      t(8, 3, 'Which password is the strongest?', 'K3ny@_Rain#29', ['12345', 'password', 'myname']),
      t(8, 4, 'Someone you do not know messages you online and asks for your school name. What should you do?', 'refuse to share and tell a trusted adult', ['send it, since a school name is harmless', 'arrange to meet them to find out who they are', 'share it only if they say they are a learner']),
      t(9, 4, 'In a spreadsheet, the formula =A1+A2 ___.', 'adds the values in cells A1 and A2', ['types the letters A1 and A2', 'deletes the cells', 'prints the sheet']),
      t(9, 5, 'A step-by-step set of instructions for solving a problem is called an ___.', 'algorithm', ['application', 'antivirus', 'address']),
    ],
  },
  materials: {
    facts: {
      categories: [
        { one: 'a hardwood', many: 'hardwoods', items: ['mvule', 'mahogany', 'teak', 'meru oak', 'camphor'], set: 'w' },
        { one: 'a softwood', many: 'softwoods', items: ['cypress', 'pine', 'cedar', 'podo'], set: 'w' },
        { one: 'a ferrous metal', many: 'ferrous metals', items: ['mild steel', 'cast iron', 'stainless steel', 'wrought iron'], set: 'm' },
        { one: 'a non-ferrous metal', many: 'non-ferrous metals', items: ['copper', 'aluminium', 'brass', 'zinc', 'tin'], set: 'm' },
        { one: 'a ceramic material', many: 'ceramic materials', items: ['clay brick', 'porcelain', 'tile', 'earthenware pot'], set: 'c' },
        { one: 'a plastic material', many: 'plastic materials', items: ['polythene', 'PVC', 'nylon', 'acrylic'], set: 'c' },
      ],
      pairs: [
        {
          pairs: [
            ['aluminium', 'light, does not rust, used for cooking pans'],
            ['copper', 'conducts electricity well, used for wires'],
            ['PVC', 'waterproof and light, used for pipes'],
            ['clay', 'can be moulded and fired, used for bricks and pots'],
            ['mild steel', 'strong and cheap, used for gates and frames'],
          ],
          ask: (a) => `Which properties and use match ${a}?`,
          askBack: (b) => `Which material is ${b}?`,
        },
      ],
    },
    bank: [
      t(7, 2, 'Wood from coniferous trees is usually called ___.', 'softwood', ['hardwood', 'plywood', 'metal']),
      t(7, 3, 'Why is timber seasoned before use?', 'to remove moisture so it does not warp or crack', ['to make it heavier and harder to cut', 'to add colour to the surface of the wood', 'to soften it so that nails go in easily']),
      t(8, 3, 'Ferrous metals contain ___.', 'iron', ['copper', 'aluminium', 'plastic']),
      t(8, 4, 'Which material would you choose for an outdoor water pipe?', 'PVC', ['paper', 'untreated softwood', 'glass']),
      t(9, 4, 'Plastics that can be reheated and reshaped are called ___.', 'thermoplastics', ['thermosets', 'ceramics', 'composites']),
      t(9, 5, 'Why are plastics a problem for the environment?', 'Most do not decompose and can pollute land and water.', ['They rot too quickly and make the soil acidic.', 'They are too heavy to collect and carry away.', 'They are made from water and dry out rivers.']),
    ],
  },
  tools: {
    facts: {
      categories: [
        { one: 'a measuring or marking tool', many: 'measuring and marking tools', items: ['steel rule', 'try square', 'marking gauge', 'tape measure', 'scriber'], set: 't' },
        { one: 'a cutting tool', many: 'cutting tools', items: ['tenon saw', 'hacksaw', 'chisel', 'tin snips', 'plane'], set: 't' },
        { one: 'a driving tool', many: 'driving tools', items: ['claw hammer', 'mallet', 'screwdriver', 'spanner'], set: 't' },
        { one: 'a holding tool', many: 'holding tools', items: ['bench vice', 'G-clamp', 'pliers', 'sash clamp'], set: 't' },
      ],
      pairs: [
        {
          pairs: [
            ['a try square', 'checking that corners are at 90°'],
            ['a hacksaw', 'cutting metal'],
            ['a tenon saw', 'making straight cuts in wood'],
            ['a mallet', 'striking a chisel'],
            ['a bench vice', 'holding work firmly while you work on it'],
            ['a plane', 'smoothing the surface of wood'],
            ['a screwdriver', 'driving screws'],
          ],
          ask: (a) => `What is ${a} used for?`,
          askBack: (b) => `Which tool is used for ${b}?`,
        },
      ],
    },
    bank: [
      t(7, 2, 'Tools should be kept ___ after use.', 'clean and in their proper place', ['on the bench, ready for next time', 'in a bucket of water to stay cool', 'outside so that they dry in the sun']),
      t(7, 3, 'Why is a mallet, not a hammer, used to strike a wooden chisel handle?', 'A mallet does not damage the handle.', ['A mallet is heavier and cuts deeper.', 'A hammer is too light for a chisel.', 'A mallet keeps the blade sharper.']),
      t(8, 4, 'How should a blunt chisel be maintained?', 'sharpen it on an oilstone', ['heat it in a fire first', 'paint its blade with oil paint', 'hammer its edge on a stone']),
      t(9, 4, 'Which tool would you use to cut a thin sheet of metal into a curve?', 'tin snips', ['tenon saw', 'try square', 'mallet']),
      t(9, 5, 'Why should oil be applied to metal tools before storing them?', 'to prevent rusting', ['to make them sharper', 'to make them heavier', 'to clean the floor']),
    ],
  },
  business: {
    facts: {
      categories: [
        { one: 'a basic need', many: 'basic needs', items: ['food', 'shelter', 'clothing', 'clean water', 'health care'], set: 'n' },
        { one: 'a want', many: 'wants', items: ['a smartphone', 'designer shoes', 'a video game', 'a holiday trip', 'jewellery'], set: 'n' },
        { one: 'a financial service', many: 'financial services', items: ['saving', 'borrowing (loans)', 'mobile money transfer', 'insurance', 'investment'], set: 'f' },
        { one: 'a financial institution', many: 'financial institutions', items: ['commercial bank', 'SACCO', 'microfinance institution', 'insurance company'], set: 'f' },
      ],
      pairs: [
        {
          pairs: [
            ['an entrepreneur', 'a person who starts and runs a business'],
            ['a budget', 'a plan of expected income and spending'],
            ['profit', 'the money left when income is greater than costs'],
            ['capital', 'money or assets used to start a business'],
            ['an invoice', 'a document asking a customer to pay'],
            ['a receipt', 'a document showing that payment was made'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `What is ${b} called?`,
        },
      ],
    },
    bank: [
      t(7, 2, 'Keeping some money for future use is called ___.', 'saving', ['spending', 'borrowing', 'wasting']),
      t(7, 3, 'Which comes first when planning spending?', 'needs before wants', ['wants before needs', 'gifts before food', 'games before rent']),
      t(8, 3, 'A learner gets 500 shillings pocket money and spends 320. How much is saved?', '180 shillings', ['820 shillings', '320 shillings', '200 shillings']),
      t(8, 4, 'Which is a quality of a good entrepreneur?', 'creativity and willingness to take calculated risks', ['avoiding customers who ask difficult questions', 'refusing to change plans when things go wrong', 'spending all profits as soon as they come in']),
      t(9, 4, 'A business buys goods for 12,000 shillings and sells them for 15,000. What is the profit?', '3,000 shillings', ['27,000 shillings', '12,000 shillings', '15,000 shillings']),
      t(9, 5, 'Why is it important to keep business records?', 'to track income and spending and know if the business is making a profit', ['to show customers how many goods are in the shop each day', 'to make the shop look busy and attract more buyers', 'to pay more tax than the business really needs to']),
    ],
  },
}

// ── Agriculture and Nutrition ───────────────────────────────────────────────

const AGRICULTURE: Record<string, Topic> = {
  soil: {
    facts: {
      categories: [
        { one: 'a factor in soil formation', many: 'factors in soil formation', items: ['parent rock', 'climate', 'living organisms', 'topography', 'time'], set: 'o' },
        { one: 'a component of soil', many: 'components of soil', items: ['mineral particles', 'organic matter (humus)', 'soil water', 'soil air', 'living organisms'], set: 'c' },
        { one: 'an organic fertiliser', many: 'organic fertilisers', items: ['compost', 'farmyard manure', 'green manure', 'poultry manure'], set: 'o' },
        { one: 'an inorganic fertiliser', many: 'inorganic fertilisers', items: ['DAP', 'CAN', 'NPK', 'urea'], set: 'o' },
      ],
      pairs: [
        {
          pairs: [
            ['nitrogen', 'healthy green leaves and growth'],
            ['phosphorus', 'strong root development'],
            ['potassium', 'disease resistance and good fruit'],
          ],
          ask: (a) => `In plants, ${a} mainly helps with ___.`,
          askBack: (b) => `Which nutrient mainly helps with ${b}?`,
        },
      ],
    },
    bank: [
      t(7, 2, 'The loose top layer of the earth\'s surface where plants grow is called ___.', 'soil', ['rock', 'sand only', 'clay only']),
      t(7, 3, 'Which soil type holds the most water?', 'clay', ['sand', 'gravel', 'loam']),
      t(8, 3, 'Yellowing of older maize leaves is most likely caused by a lack of ___.', 'nitrogen', ['phosphorus', 'potassium', 'water only']),
      t(8, 4, 'Why is DAP applied at planting time?', 'It supplies phosphorus for root development.', ['It kills weeds.', 'It makes the soil acidic only.', 'It waters the plants.']),
      t(9, 4, 'Why do farmers add lime to soil?', 'to reduce soil acidity', ['to increase acidity', 'to add nitrogen', 'to harden the soil']),
      t(9, 5, 'Which practice best maintains soil fertility over many seasons?', 'crop rotation with legumes and adding organic manure', ['planting maize every season without manure', 'burning crop remains', 'overgrazing']),
    ],
  },
  conservation: {
    facts: {
      categories: [
        { one: 'a water harvesting method', many: 'water harvesting methods', items: ['roof catchment', 'water pans', 'zai pits', 'sand dams', 'rock catchment'], set: 'w' },
        { one: 'a water-saving irrigation method', many: 'water-saving irrigation methods', items: ['drip irrigation', 'bottle irrigation', 'mulching', 'night watering'], set: 'w' },
        { one: 'a tree for agroforestry', many: 'agroforestry trees', items: ['grevillea', 'calliandra', 'leucaena', 'sesbania'], set: 'w' },
      ],
      pairs: [
        {
          pairs: [
            ['agroforestry', 'growing trees together with crops or animals'],
            ['afforestation', 'planting trees where there was no forest'],
            ['reafforestation', 'replanting trees where forest was cleared'],
            ['a sand dam', 'a wall across a seasonal river that stores water in sand'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `What is ${b} called?`,
        },
      ],
    },
    bank: [
      t(7, 2, 'Collecting and storing rain water for later use is ___.', 'water harvesting', ['irrigation', 'drainage', 'flooding']),
      t(7, 3, 'Why is drip irrigation good in dry areas?', 'It delivers water directly to roots with little waste.', ['It floods the whole field so the soil stays wet.', 'It works without any pipes or water source.', 'It uses more water so crops grow faster.']),
      t(8, 4, 'Which is a benefit of agroforestry?', 'Trees provide fodder, firewood and protect the soil.', ['Trees take all the nutrients that crops need.', 'Trees replace the need to grow food crops.', 'Trees stop rain from reaching the crops.']),
      t(9, 4, 'Why are sand dams useful in semi-arid areas like Makueni?', 'They store water in the sand, reducing evaporation.', ['They make the river flow faster during the rains.', 'They stop sand from being carried by the wind.', 'They raise the river bed so that floods are rare.']),
      t(9, 5, 'A farmer on a slope loses topsoil and water every rainy season. Which combination helps most?', 'terraces, cover crops and planting trees', ['burning grass and ploughing downhill', 'removing all trees', 'overgrazing']),
    ],
  },
  crops: {
    facts: {
      categories: [
        { one: 'a crop propagated by seeds', many: 'crops propagated by seeds', items: ['maize', 'beans', 'sorghum', 'kales', 'tomatoes'], set: 'p' },
        { one: 'a crop propagated vegetatively', many: 'crops propagated vegetatively', items: ['cassava (stem cuttings)', 'sweet potatoes (vines)', 'sugarcane (setts)', 'Irish potatoes (tubers)', 'bananas (suckers)'], set: 'p' },
        { one: 'a field management practice', many: 'field management practices', items: ['weeding', 'thinning', 'gapping', 'top-dressing', 'pruning', 'earthing up'], set: 'f' },
        { one: 'a post-harvest practice', many: 'post-harvest practices', items: ['drying', 'threshing', 'sorting and grading', 'storage', 'packaging'], set: 'f' },
      ],
      pairs: [
        {
          pairs: [
            ['budding', 'joining a bud from one plant to another plant'],
            ['grafting', 'joining a shoot (scion) to a rooted plant (rootstock)'],
            ['layering', 'rooting a branch while still attached to the parent'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `Which method of propagation involves ${b}?`,
        },
      ],
    },
    bank: [
      t(7, 2, 'Removing extra seedlings so that the rest have space is called ___.', 'thinning', ['gapping', 'pruning', 'weeding']),
      t(7, 3, 'Why are seeds dressed with a chemical before planting?', 'to protect them from pests and diseases in the soil', ['to make the seeds heavier so they sink deeper', 'to give the young plants a brighter green colour', 'to make the seeds germinate without any water']),
      t(8, 3, 'Avocado and mango seedlings are often grafted so that they ___.', 'fruit earlier and keep the quality of the parent', ['grow much taller before they ever produce fruit', 'need no water or manure for the first five years', 'produce seeds that are bigger than the fruit itself']),
      t(8, 4, 'Why should maize be dried to about 13% moisture before storage?', 'to prevent moulds and pests', ['to make it heavier', 'to make it germinate', 'to add flavour']),
      t(9, 4, 'Which practice helps control weeds, pests and diseases without chemicals?', 'crop rotation', ['monocropping', 'late planting', 'burning the field']),
      t(9, 5, 'A farmer harvests tomatoes but many bruise and rot before reaching the market. What should be done?', 'harvest carefully, grade them and pack in ventilated crates', ['harvest them all wet and pack them in sacks', 'leave them on the plants until they are very soft', 'pile them in the sun until the buyer arrives']),
    ],
  },
  animals: {
    facts: {
      categories: [
        { one: 'a dairy cattle breed', many: 'dairy breeds', items: ['Friesian', 'Ayrshire', 'Jersey', 'Guernsey'], set: 'b' },
        { one: 'a beef cattle breed', many: 'beef breeds', items: ['Boran', 'Sahiwal', 'Hereford', 'Aberdeen Angus'], set: 'b' },
        { one: 'a sign of a healthy animal', many: 'signs of a healthy animal', items: ['alert and active', 'good appetite', 'smooth shiny coat', 'normal droppings'], set: 'h' },
        { one: 'a sign of a sick animal', many: 'signs of a sick animal', items: ['dull and isolated', 'loss of appetite', 'rough coat', 'discharge from the nose'], set: 'h' },
      ],
      pairs: [
        {
          pairs: [
            ['East Coast fever', 'ticks'],
            ['Newcastle disease', 'contact with infected birds'],
            ['foot and mouth disease', 'a virus spread by contact'],
            ['worms', 'contaminated pasture and water'],
          ],
          ask: (a) => `What causes or spreads ${a}?`,
          askBack: (b) => `Which disease or problem is linked to ${b}?`,
        },
        {
          pairs: [
            ['dipping or spraying', 'ticks'],
            ['deworming', 'internal worms'],
            ['vaccination', 'diseases like Newcastle disease'],
          ],
          ask: (a) => `What does ${a} control?`,
          askBack: (b) => `How are ${b} controlled?`,
        },
      ],
    },
    bank: [
      t(7, 2, 'A young cow is called a ___.', 'calf', ['kid', 'lamb', 'chick']),
      t(7, 3, 'Which breed is known for producing large amounts of milk?', 'Friesian', ['Boran', 'Hereford', 'Aberdeen Angus']),
      t(8, 3, 'Silage and hay are examples of ___ feeds.', 'roughage', ['concentrate', 'mineral', 'vitamin']),
      t(8, 4, 'Why should a zero-grazing unit have a sloping concrete floor?', 'for easy drainage and cleaning', ['to keep the floor wet and cool', 'to help cows walk downhill to eat', 'to save feed by spreading it out']),
      t(9, 4, 'Why are animals vaccinated?', 'to prevent diseases before they occur', ['to cure diseases already present', 'to make them grow faster at once', 'to remove ticks']),
      t(9, 5, 'A farmer keeps records of milk yield for each cow. How does this help?', 'to identify the best and least productive cows for breeding and culling decisions', ['to make the milk from every cow taste the same', 'to prove to buyers that all cows give equal milk', 'to decide which cows should be sold for meat at random']),
    ],
  },
  nutrition: {
    facts: {
      pairs: [
        {
          pairs: [
            ['carbohydrates', 'provide energy'],
            ['proteins', 'build and repair tissues'],
            ['fats and oils', 'provide concentrated energy and warmth'],
            ['vitamins', 'regulate body processes and protect against disease'],
            ['minerals', 'build bones and blood, such as calcium and iron'],
            ['fibre (roughage)', 'helps food move through the gut'],
          ],
          ask: (a) => `What is the main job of ${a}?`,
          askBack: (b) => `Which nutrient ${b}?`,
        },
        {
          pairs: [
            ['kwashiorkor', 'lack of protein'],
            ['rickets', 'lack of vitamin D and calcium'],
            ['scurvy', 'lack of vitamin C'],
            ['anaemia', 'lack of iron'],
            ['goitre', 'lack of iodine'],
            ['night blindness', 'lack of vitamin A'],
          ],
          ask: (a) => `${a[0].toUpperCase()}${a.slice(1)} is caused by ___.`,
          askBack: (b) => `Which condition is caused by ${b}?`,
        },
      ],
    },
    bank: [
      t(7, 2, 'A diet containing all nutrients in the right amounts is a ___ diet.', 'balanced', ['special', 'fast', 'light']),
      t(7, 3, 'Which meal is the most balanced?', 'ugali, beans and sukuma wiki', ['white bread and sweet tea', 'chips, sausages and soda', 'rice, potatoes and chapati']),
      t(8, 4, 'Why do pregnant women need foods rich in iron?', 'to make more blood for themselves and the baby', ['to help them sleep better at night', 'to make the baby\'s bones grow strong', 'to give them energy for hard work']),
      t(8, 4, 'Which diet is best for a person with diabetes?', 'low in sugar and high in fibre', ['high in sugar and low in fibre', 'mostly fried and fatty foods', 'mainly soda and white bread']),
      t(9, 5, 'A school wants to plan lunch for growing learners on a small budget. Which plan is best?', 'githeri with vegetables, plus a fruit', ['white bread with tea and sugar', 'plain rice with a little soup', 'chips with a sweet soda drink']),
      t(9, 5, 'Why should people with high blood pressure reduce salt?', 'Too much salt raises blood pressure.', ['Salt lowers blood pressure.', 'Salt has no effect.', 'Salt adds protein.']),
    ],
  },
  foodprep: {
    facts: {
      pairs: [
        {
          pairs: [
            ['steaming', 'cooking food in the steam above boiling water'],
            ['baking', 'cooking food with dry heat in an oven'],
            ['stewing', 'cooking food slowly in a little liquid'],
            ['deep frying', 'cooking food fully immersed in hot oil'],
            ['roasting', 'cooking food in dry heat over a fire or in an oven'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `Which cooking method is ${b}?`,
        },
        {
          pairs: [
            ['canning', 'heating food in sealed cans to kill germs'],
            ['drying', 'removing water so germs cannot grow'],
            ['salting', 'drawing water out with salt'],
            ['refrigeration', 'slowing germ growth with low temperatures'],
            ['smoking', 'drying and flavouring food with smoke'],
          ],
          ask: (a) => `How does ${a} preserve food?`,
          askBack: (b) => `Which preservation method works by ${b}?`,
        },
      ],
    },
    bank: [
      t(7, 2, 'Washing hands before handling food prevents the spread of ___.', 'germs', ['vitamins', 'flavour', 'colour']),
      t(7, 3, 'Why should raw meat and cooked food be kept apart?', 'to prevent cross-contamination', ['to keep the meat warm', 'to save space', 'to make food sweeter']),
      t(8, 3, 'Which cooking method keeps the most vitamins in vegetables?', 'steaming', ['deep frying', 'long boiling', 'burning']),
      t(8, 4, 'Why is food stored in airtight containers?', 'to keep out moisture, air and pests', ['to make the food cook faster later', 'to keep the food warm for many days', 'to add flavour to the stored food']),
      t(9, 4, 'Why should cooked food not be left at room temperature for many hours?', 'germs multiply quickly at warm temperatures', ['the food loses all its colour and smell', 'the food gains extra vitamins and becomes heavy', 'the food dries out and turns into powder']),
      t(9, 5, 'Which method would best preserve fresh fish in a village with no electricity?', 'smoking or sun drying', ['refrigeration', 'freezing', 'canning in a factory only']),
    ],
  },
  enterprise: {
    facts: {
      pairs: [
        {
          pairs: [
            ['an inventory record', 'everything owned on the farm'],
            ['a production record', 'yields such as milk or eggs'],
            ['a sales record', 'what was sold, to whom and for how much'],
            ['a health record', 'treatments and vaccinations of animals'],
            ['a labour record', 'workers and hours worked'],
          ],
          ask: (a) => `What does ${a} show?`,
          askBack: (b) => `Which farm record shows ${b}?`,
        },
      ],
      categories: [
        { one: 'a way to market farm produce', many: 'ways to market produce', items: ['selling through a cooperative', 'selling at the local market', 'contract farming', 'online and mobile platforms'], set: 'm' },
        { one: 'a challenge in marketing farm produce', many: 'marketing challenges', items: ['poor roads', 'perishability of produce', 'middlemen taking large profits', 'price changes'], set: 'm' },
      ],
    },
    bank: [
      t(7, 2, 'Why should a farmer keep records?', 'to know whether the farm is making a profit', ['to show neighbours how big the farm is', 'to avoid having to plan the next season', 'to keep buyers from knowing the prices']),
      t(8, 3, 'A farmer spends 15,000 shillings on a crop and sells it for 24,000. What is the profit?', '9,000 shillings', ['39,000 shillings', '15,000 shillings', '24,000 shillings']),
      t(8, 4, 'How do cooperatives help small-scale farmers?', 'They help market produce together and get better prices.', ['They buy all the land and employ the farmers.', 'They stop farmers from selling to anyone else.', 'They grow all the crops on behalf of farmers.']),
      t(9, 4, 'Which product adds value to milk?', 'yoghurt', ['water', 'raw milk', 'grass']),
      t(9, 5, 'A poultry farmer earns 60,000 shillings from eggs, but spends 38,000 on feed and 7,000 on vaccines. What is the profit?', '15,000 shillings', ['22,000 shillings', '45,000 shillings', '105,000 shillings']),
    ],
  },
}

// ── Creative Arts and Sports ────────────────────────────────────────────────

const CREATIVE: Record<string, Topic> = {
  visual: {
    facts: {
      pairs: [
        {
          pairs: [
            ['complementary colours', 'colours opposite each other on the colour wheel'],
            ['analogous colours', 'colours next to each other on the colour wheel'],
            ['a tint', 'a colour mixed with white'],
            ['a shade', 'a colour mixed with black'],
            ['tone', 'how light or dark a colour is'],
          ],
          ask: (a) => `In art, what does "${a}" mean?`,
          askBack: (b) => `In art, what do we call ${b}?`,
        },
        {
          pairs: [
            ['line', 'a mark that shows direction and outline'],
            ['texture', 'how a surface feels or looks like it feels'],
            ['form', 'a three-dimensional shape'],
            ['space', 'the area around and between objects'],
          ],
          ask: (a) => `Which describes the element of art called ${a}?`,
          askBack: (b) => `Which element of art is ${b}?`,
        },
      ],
      categories: [
        { one: 'a principle of design', many: 'principles of design', items: ['balance', 'contrast', 'emphasis', 'rhythm', 'unity', 'proportion'], set: 'd' },
        { one: 'an element of art', many: 'elements of art', items: ['line', 'shape', 'colour', 'texture', 'form', 'space'], set: 'd' },
      ],
    },
    bank: [
      t(7, 2, 'The three primary colours of pigment are ___.', 'red, yellow and blue', ['red, green and blue', 'orange, green and purple', 'black, white and grey']),
      t(7, 3, 'Drawing objects smaller as they get further away shows ___.', 'perspective', ['texture', 'contrast', 'tint']),
      t(8, 4, 'A poster uses bright red text on a dark green background so the words stand out. Which principle is used?', 'contrast', ['unity', 'rhythm', 'proportion']),
      t(9, 4, 'In one-point perspective, all receding lines meet at the ___.', 'vanishing point', ['horizon line only', 'foreground', 'frame']),
      t(9, 5, 'Why do artists make preliminary sketches before a final painting?', 'to plan composition, proportion and tone', ['to finish the work faster without paint', 'to copy another artist\'s finished work', 'to test which frame suits the painting']),
    ],
  },
  crafts: {
    facts: {
      pairs: [
        {
          pairs: [
            ['batik', 'decorating cloth using wax and dye'],
            ['tie and dye', 'tying cloth tightly before dyeing to create patterns'],
            ['block printing', 'printing a carved design onto cloth or paper'],
            ['papier-mâché', 'modelling with paper and paste'],
            ['mosaic', 'making a picture from small pieces'],
            ['weaving', 'interlacing warp and weft threads'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `Which craft involves ${b}?`,
        },
        {
          pairs: [
            ['a logo', 'a symbol that identifies a business or organisation'],
            ['a poster', 'a large printed notice that advertises or informs'],
            ['a book cover', 'a design that attracts readers to a book'],
          ],
          ask: (a) => `In graphic design, what is ${a}?`,
          askBack: (b) => `In graphic design, what is ${b} called?`,
        },
      ],
    },
    bank: [
      t(7, 2, 'Clay items are hardened by heating them in a ___.', 'kiln', ['fridge', 'basket', 'loom']),
      t(7, 3, 'In batik, the wax ___.', 'resists the dye so that waxed areas stay their original colour', ['mixes with the dye to make the colours darker and brighter', 'glues the different pieces of cloth together into one', 'is melted into the dye so that it spreads evenly']),
      t(8, 4, 'Which tool is used for weaving cloth?', 'loom', ['kiln', 'chisel', 'easel']),
      t(9, 4, 'Why should a good logo be simple?', 'so it is easy to recognise and remember', ['so it can use as many colours as possible', 'so it can be changed every few months', 'so it looks the same as other brands']),
      t(9, 5, 'A youth group wants to earn money from crafts. Which is the best first step?', 'find out what customers want and price items to cover costs', ['make as many items as possible before finding buyers', 'sell every item below its cost to attract buyers', 'copy the designs and brand name of another group']),
    ],
  },
  music: {
    facts: {
      pairs: [
        {
          pairs: [
            ['a semibreve', '4 beats'],
            ['a dotted minim', '3 beats'],
            ['a minim', '2 beats'],
            ['a dotted crotchet', '1½ beats'],
            ['a crotchet', '1 beat'],
            ['a quaver', '½ beat'],
          ],
          ask: (a) => `In 4/4 time, how many beats does ${a} last?`,
          askBack: (b) => `Which note lasts ${b} in 4/4 time?`,
        },
        {
          pairs: [
            ['C major', 'no sharps or flats'],
            ['G major', 'one sharp (F#)'],
            ['F major', 'one flat (B♭)'],
            ['D major', 'two sharps (F# and C#)'],
          ],
          ask: (a) => `What is the key signature of ${a}?`,
          askBack: (b) => `Which major key has ${b}?`,
        },
      ],
      categories: [
        { one: 'an Italian term for tempo', many: 'tempo terms', items: ['allegro', 'andante', 'adagio', 'presto', 'largo'], set: 'i' },
        { one: 'an Italian term for dynamics', many: 'dynamics terms', items: ['forte', 'piano', 'crescendo', 'diminuendo', 'mezzo forte'], set: 'i' },
      ],
    },
    bank: [
      t(7, 2, 'The distance in pitch between two notes is called an ___.', 'interval', ['octave only', 'accent', 'echo']),
      t(7, 3, 'How many crotchet beats are in a bar of 3/4 time?', '3', ['4', '2', '6']),
      t(8, 4, 'In a major scale, semitones fall between notes ___.', '3–4 and 7–8', ['1–2 and 5–6', '2–3 and 6–7', '4–5 and 1–2']),
      t(9, 4, 'Which Kenyan instrument is a large eight-stringed lyre of the Abagusii?', 'obokano', ['nyatiti', 'isukuti', 'chivoti']),
      t(9, 5, 'A melody moves from C up to the next C. What is this interval called?', 'an octave', ['a third', 'a fifth', 'a unison']),
    ],
  },
  performing: {
    facts: {
      pairs: [
        {
          pairs: [
            ['a monologue', 'a long speech by one character'],
            ['a dialogue', 'a conversation between characters'],
            ['a narrator', 'a person who tells the story to the audience'],
            ['props', 'objects used by actors on stage'],
            ['a costume', 'clothing worn by an actor to show a character'],
            ['choreography', 'the planned steps and movements of a dance'],
          ],
          ask: (a) => `In performance, what does "${a}" mean?`,
          askBack: (b) => `In performance, what is ${b} called?`,
        },
      ],
      categories: [
        { one: 'a Kenyan traditional dance', many: 'Kenyan traditional dances', items: ['isukuti', 'mwomboko', 'adumu', 'chakacha', 'kilumi'], set: 'e' },
        { one: 'an element of dance', many: 'elements of dance', items: ['body', 'space', 'time', 'energy'], set: 'e' },
        { one: 'an element of drama', many: 'elements of drama', items: ['plot', 'character', 'setting', 'theme', 'conflict'], set: 'e' },
      ],
    },
    bank: [
      t(7, 2, 'The adumu "jumping dance" is performed by the ___.', 'Maasai', ['Mijikenda', 'Luhya', 'Kikuyu']),
      t(7, 3, 'Isukuti dance comes from the ___ community.', 'Luhya', ['Maasai', 'Luo', 'Somali']),
      t(8, 4, 'Why do actors face the audience when speaking on stage?', 'so they can be seen and heard clearly', ['so they can read the script on the floor', 'so the other actors can rest their voices', 'so the lights do not shine on their faces']),
      t(9, 4, 'The central idea or message of a play is its ___.', 'theme', ['setting', 'costume', 'prop']),
      t(9, 5, 'A dance group wants to show joy at a harvest festival. Which choice fits best?', 'lively rhythms, bright costumes and energetic movements', ['slow, heavy steps with dull costumes', 'standing still', 'no music']),
    ],
  },
  athletics: {
    facts: {
      categories: [
        { one: 'a sprint event', many: 'sprints', items: ['100 m', '200 m', '400 m', '4 × 100 m relay'], set: 'r' },
        { one: 'a distance event', many: 'distance events', items: ['1500 m', '5000 m', '10000 m', 'marathon', '3000 m steeplechase'], set: 'r' },
        { one: 'a jumping event', many: 'jumping events', items: ['long jump', 'high jump', 'triple jump', 'pole vault'], set: 'f' },
        { one: 'a throwing event', many: 'throwing events', items: ['shot put', 'discus', 'javelin', 'hammer throw'], set: 'f' },
      ],
      pairs: [
        {
          pairs: [
            ['a false start', 'starting before the starter\'s signal'],
            ['a no-jump in long jump', 'stepping over the take-off board'],
            ['a foul throw in shot put', 'stepping out of the front of the circle before the shot lands'],
            ['disqualification in a relay', 'passing the baton outside the changeover zone'],
          ],
          ask: (a) => `What causes ${a}?`,
          askBack: (b) => `What is the result of ${b}?`,
        },
      ],
    },
    bank: [
      t(7, 2, 'The marathon distance is about ___ km.', '42', ['21', '10', '100']),
      t(7, 3, 'Why do sprinters use starting blocks?', 'to push off powerfully at the start', ['to measure their time at the start', 'to mark the lane they must run in', 'to rest their feet before the start']),
      t(8, 4, 'In the high jump, a modern style where the athlete goes over backwards is the ___.', 'Fosbury flop', ['scissors', 'straddle', 'hitch kick']),
      t(9, 4, 'Which Kenyan athlete holds a famous 800 m world record set in 2012?', 'David Rudisha', ['Eliud Kipchoge', 'Faith Kipyegon', 'Paul Tergat']),
      t(9, 5, 'Why do distance runners train at high altitude, as in Iten?', 'The body adapts by making more red blood cells, improving endurance.', ['The air is thicker, so the runners can breathe more deeply.', 'It is warmer there, so the muscles do not get stiff.', 'The ground is softer, so the runners never get injured.']),
    ],
  },
  ballgames: {
    facts: {
      pairs: [
        {
          pairs: [
            ['football', 'offside'],
            ['netball', 'footwork (no running with the ball)'],
            ['basketball', 'travelling'],
            ['volleyball', 'touching the net'],
            ['handball', 'stepping into the goal area'],
          ],
          ask: (a) => `Which is a common rule offence in ${a}?`,
          askBack: (b) => `In which game is ${b} an offence?`,
        },
      ],
      categories: [
        { one: 'a football skill', many: 'football skills', items: ['dribbling', 'heading', 'trapping', 'tackling', 'shooting'], set: 's' },
        { one: 'a volleyball skill', many: 'volleyball skills', items: ['serving', 'setting', 'spiking', 'digging', 'blocking'], set: 's' },
        { one: 'a basketball skill', many: 'basketball skills', items: ['lay-up', 'free throw', 'bounce pass', 'rebounding', 'chest pass'], set: 's' },
      ],
    },
    bank: [
      t(7, 2, 'A football match lasts ___ minutes of normal time.', '90', ['60', '80', '120']),
      t(7, 3, 'In netball, how long may a player hold the ball before passing?', '3 seconds', ['10 seconds', '1 minute', 'as long as they like']),
      t(8, 4, 'Why do teams use set plays at corners in football?', 'to create organised scoring chances', ['to waste time', 'to confuse the referee', 'to avoid scoring']),
      t(9, 4, 'In volleyball, a team rotates clockwise when it ___.', 'wins the serve back from the other team', ['loses a point on its own serve', 'calls a time-out', 'scores any point']),
      t(9, 5, 'A basketball team keeps losing the ball under pressure. Which practice helps most?', 'passing drills and moving into space', ['shooting from far only', 'standing still', 'holding the ball longer']),
    ],
  },
  gym: {
    facts: {
      categories: [
        { one: 'a gymnastics skill', many: 'gymnastics skills', items: ['forward roll', 'backward roll', 'cartwheel', 'handstand', 'headstand', 'round-off'], set: 'g' },
        { one: 'a swimming stroke', many: 'swimming strokes', items: ['front crawl', 'breaststroke', 'backstroke', 'butterfly'], set: 'g' },
        { one: 'a water safety rule', many: 'water safety rules', items: ['never swim alone', 'swim where a lifeguard can see you', 'do not dive into shallow water', 'learn to float'], set: 'w' },
        { one: 'an unsafe water practice', many: 'unsafe water practices', items: ['swimming alone', 'diving into shallow water', 'swimming straight after a big meal', 'pushing friends into the pool'], set: 'w' },
      ],
      pairs: [
        {
          pairs: [
            ['a spotter', 'supports a gymnast to prevent falls'],
            ['a mat', 'cushions landings'],
            ['a warm-up', 'prepares muscles and reduces injury'],
            ['a cool-down', 'helps the body recover after exercise'],
          ],
          ask: (a) => `In gymnastics, what is the purpose of ${a}?`,
          askBack: (b) => `In gymnastics, what ${b}?`,
        },
      ],
    },
    bank: [
      t(7, 2, 'Gymnastics should always be done on ___.', 'mats', ['concrete', 'tables', 'rocky ground']),
      t(7, 3, 'Which swimming stroke is done lying on the back?', 'backstroke', ['breaststroke', 'butterfly', 'front crawl']),
      t(8, 4, 'Why should a swimmer not swim right after a heavy meal?', 'They may get cramps and tire quickly.', ['The food makes the water colder.', 'They will float too high in the water.', 'Swimming makes the food go bad.']),
      t(9, 4, 'In a handstand, the body should be ___.', 'straight and balanced over the hands', ['bent at the knees', 'leaning on a wall always', 'moving quickly']),
      t(9, 5, 'A friend is struggling in deep water. What is the safest way to help?', 'shout for help and reach or throw something that floats', ['jump in quickly and pull them out on your own', 'swim out and let them hold on to your neck', 'wait on the shore until they swim back alone']),
    ],
  },
  appreciation: {
    facts: {
      pairs: [
        {
          pairs: [
            ['a curator', 'looks after museum collections'],
            ['a choreographer', 'designs dances'],
            ['a sound engineer', 'records and mixes music'],
            ['a coach', 'trains athletes and teams'],
            ['a fashion designer', 'designs clothes'],
            ['a sports physiotherapist', 'treats and prevents sports injuries'],
          ],
          ask: (a) => `What does ${a} do?`,
          askBack: (b) => `Which creative or sports career involves someone who ${b}?`,
        },
      ],
      categories: [
        { one: 'a Kenyan cultural heritage site', many: 'heritage sites', items: ['Lamu Old Town', 'Fort Jesus', 'Thimlich Ohinga', 'the Bomas of Kenya'], set: 'h' },
        { one: 'a Kenyan national sports venue', many: 'sports venues', items: ['Kasarani Stadium', 'Nyayo Stadium', 'Kipchoge Keino Stadium', 'Bukhungu Stadium'], set: 'h' },
      ],
    },
    bank: [
      t(7, 2, 'The Kenya Music Festival gives learners a chance to ___.', 'perform music, dance and poetry', ['sell farm produce and crafts', 'sit national exams early', 'compete in athletics and ball games']),
      t(8, 3, 'Why is copying another person\'s artwork without permission wrong?', 'It breaks copyright and is unfair to the creator.', ['It is allowed if the copy is better than the original.', 'It is only wrong if the copy is sold at a market.', 'It is the same as practising, so it is never wrong.']),
      t(8, 4, 'When giving a critique of a painting, you should ___.', 'describe, analyse, interpret and then judge it', ['say at once whether you like it and stop there', 'compare it with a photograph of the same scene', 'talk only about the frame and the price']),
      t(9, 5, 'Which shows good sportsmanship?', 'shaking hands with opponents after losing', ['arguing with the referee after every call', 'celebrating loudly in front of the losers', 'leaving the field before the final whistle']),
    ],
  },
}

// ── CRE ─────────────────────────────────────────────────────────────────────

const CRE: Record<string, Topic> = {
  bible: {
    facts: {
      categories: [
        { one: 'a book of the Pentateuch', many: 'books of the Pentateuch', items: ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'], set: 'b' },
        { one: 'a book of the major prophets', many: 'books of the major prophets', items: ['Isaiah', 'Jeremiah', 'Ezekiel', 'Lamentations'], set: 'b' },
        { one: 'a Pauline letter', many: 'Pauline letters', items: ['Romans', 'Galatians', 'Ephesians', 'Philippians', 'Colossians'], set: 'b' },
        { one: 'a synoptic gospel', many: 'synoptic gospels', items: ['Matthew', 'Mark', 'Luke'], set: 'b' },
      ],
      pairs: [
        {
          pairs: [
            ['the Gospels', 'the life and teaching of Jesus'],
            ['Acts of the Apostles', 'the growth of the early church'],
            ['Psalms', 'songs and prayers of praise'],
            ['Proverbs', 'wise sayings for daily life'],
            ['Revelation', 'visions of the end times'],
          ],
          ask: (a) => `What are ${a} mainly about?`,
          askBack: (b) => `Which part of the Bible is mainly about ${b}?`,
        },
      ],
    },
    bank: [
      t(7, 3, 'In which language was most of the Old Testament first written?', 'Hebrew', ['Greek', 'Latin', 'Arabic']),
      t(7, 3, 'In which language was most of the New Testament first written?', 'Greek', ['Hebrew', 'Latin', 'Arabic']),
      t(7, 2, 'The Bible has ___ books.', '66', ['39', '27', '72']),
      t(7, 3, 'Why is the Bible translated into languages like Kiswahili and Dholuo?', 'so that people can read God\'s word in their own language', ['so that the original Hebrew and Greek texts are no longer needed', 'so that each community can change the meaning to suit itself', 'so that the Bible becomes longer and has more chapters']),
      t(8, 4, 'The first four books of the New Testament are called the ___.', 'Gospels', ['Epistles', 'Prophets', 'Writings']),
      t(9, 4, 'Matthew, Mark and Luke are called synoptic gospels because they ___.', 'tell the story of Jesus in a similar way', ['were written by the same person', 'are the shortest books', 'contain only parables']),
      t(9, 5, 'Which is a responsible way to interpret a Bible passage?', 'read it in context and compare it with other passages', ['pick one verse and ignore the rest', 'change words to suit yourself', 'read only titles']),
    ],
  },
  creation: {
    facts: {
      pairs: [
        {
          pairs: [
            ['God created human beings in His image', 'every person has dignity and worth'],
            ['God gave people work in the Garden of Eden', 'work is good and part of God\'s plan'],
            ['God rested on the seventh day', 'people need rest'],
            ['God placed people in charge of creation', 'people should care for the environment'],
          ],
          ask: (a) => `What does the teaching that ${a} show?`,
          askBack: (b) => `Which creation teaching shows that ${b}?`,
        },
      ],
      categories: [
        { one: 'a result of the fall (Genesis 3)', many: 'results of the fall', items: ['broken friendship with God', 'hard work to grow food', 'shame', 'being sent out of Eden'], set: 'f' },
        { one: 'a sign of God\'s care after the fall', many: 'signs of God\'s care', items: ['God made clothes for Adam and Eve', 'God promised a saviour', 'God continued to provide for them'], set: 'f' },
      ],
    },
    bank: [
      t(7, 2, 'The first book of the Bible, which tells the story of creation, is ___.', 'Genesis', ['Exodus', 'Psalms', 'Revelation']),
      t(7, 3, 'In Genesis 3, Adam and Eve disobeyed God by ___.', 'eating fruit from the tree God had forbidden', ['refusing to name the animals God had made', 'leaving the garden without God\'s permission', 'refusing to work and care for the garden']),
      t(8, 4, 'Which Christian practice shows responsibility for creation?', 'planting trees and avoiding waste', ['burning rubbish near the river', 'using more water than is needed', 'clearing bush land for firewood']),
      t(9, 5, 'How does the creation story teach Christians to treat people of other communities?', 'with respect, because all are made in God\'s image', ['with caution, because they may have other beliefs', 'kindly, but only if they share the same language', 'fairly, but less warmly than one\'s own community']),
    ],
  },
  ot: {
    facts: {
      pairs: [
        {
          pairs: [
            ['Abraham', 'received God\'s covenant promising many descendants'],
            ['Moses', 'led the Israelites out of Egypt and received the Law'],
            ['David', 'became king and wrote many psalms'],
            ['Solomon', 'built the temple in Jerusalem'],
            ['Elijah', 'challenged the prophets of Baal on Mount Carmel'],
            ['Amos', 'spoke against injustice and cheating the poor'],
            ['Jeremiah', 'spoke of a new covenant written on people\'s hearts'],
            ['Nehemiah', 'led the rebuilding of Jerusalem\'s walls'],
          ],
          ask: (a) => `What did ${a} do?`,
          askBack: (b) => `Which Old Testament figure ${b}?`,
        },
      ],
      categories: [
        { one: 'a sign of a covenant in the Old Testament', many: 'covenant signs', items: ['the rainbow (Noah)', 'circumcision (Abraham)', 'the Sabbath (Moses)'], set: 'c' },
        { one: 'a teaching of the prophet Amos', many: 'teachings of Amos', items: ['let justice roll down like waters', 'do not cheat the poor', 'worship must match how we live'], set: 'c' },
      ],
    },
    bank: [
      t(7, 2, 'The Ten Commandments were given to Moses on Mount ___.', 'Sinai', ['Carmel', 'Zion', 'Hermon']),
      t(7, 3, 'God made a covenant with Noah, sealed by the sign of ___.', 'a rainbow', ['a star', 'a dove only', 'a burning bush']),
      t(8, 4, 'The prophet Amos would most strongly criticise ___.', 'traders who cheat customers with false scales', ['farmers who share harvests', 'families who pray', 'people who rest on the Sabbath']),
      t(9, 4, 'Why did Elijah challenge the prophets of Baal on Mount Carmel?', 'to show the people that the Lord is the true God', ['to win the king\'s favour and become a royal adviser', 'to prove he could build a bigger altar than theirs', 'to decide who would rule Israel after King Ahab']),
      t(9, 5, 'Which modern situation shows a lesson from Nehemiah?', 'a community working together to rebuild a school after floods', ['a leader who keeps the money raised for a new classroom', 'a village that starts a project but stops halfway', 'neighbours who refuse to help each other after floods']),
    ],
  },
  jesus: {
    facts: {
      pairs: [
        {
          pairs: [
            ['the Sermon on the Mount', 'the Beatitudes and teaching on love and prayer'],
            ['the Good Samaritan', 'loving our neighbour, whoever they are'],
            ['the Prodigal Son', 'God\'s forgiveness for those who repent'],
            ['the Sower', 'how people receive God\'s word differently'],
            ['the Talents', 'using our God-given abilities well'],
          ],
          ask: (a) => `What does ${a} teach?`,
          askBack: (b) => `Which teaching of Jesus is about ${b}?`,
        },
      ],
      categories: [
        { one: 'a nature miracle', many: 'nature miracles', items: ['calming the storm', 'walking on water', 'feeding the five thousand', 'turning water into wine'], set: 'm' },
        { one: 'a healing miracle', many: 'healing miracles', items: ['healing blind Bartimaeus', 'healing the ten lepers', 'healing the paralysed man', 'healing the centurion\'s servant'], set: 'm' },
      ],
    },
    bank: [
      t(7, 2, '"Blessed are the peacemakers" is one of the ___.', 'Beatitudes', ['Ten Commandments', 'Psalms', 'Proverbs']),
      t(7, 3, 'In the Lord\'s Prayer, Christians ask God to ___.', 'forgive them as they forgive others', ['give them wealth and success', 'punish those who wrong them', 'make them famous among people']),
      t(8, 4, 'What does the parable of the Talents teach young people?', 'to develop and use their abilities', ['to keep their gifts safe and hidden', 'to compete to be richer than others', 'to rest and let others do the work']),
      t(9, 4, 'Why did Jesus eat with tax collectors and sinners?', 'to show God\'s love and call them to change', ['because they offered Him the best meals', 'to collect tax money for the temple', 'to keep away from the Pharisees\' rules']),
      t(9, 5, 'A classmate is left out because of their background. Which teaching of Jesus guides you?', 'the Good Samaritan', ['the Talents', 'the Sower', 'the Mustard Seed']),
    ],
  },
  passion: {
    facts: {
      pairs: [
        {
          pairs: [
            ['Palm Sunday', 'Jesus entered Jerusalem on a donkey'],
            ['the Last Supper', 'Jesus shared bread and wine with His disciples'],
            ['Gethsemane', 'Jesus prayed before His arrest'],
            ['Good Friday', 'Jesus gave His life on the cross'],
            ['Easter Sunday', 'Jesus rose from the dead'],
            ['the Ascension', 'Jesus was taken up into heaven'],
          ],
          ask: (a) => `What happened at or on ${a}?`,
          askBack: (b) => `Which event or place is linked to this: ${b}?`,
        },
      ],
      categories: [
        { one: 'an event of Holy Week', many: 'events of Holy Week', items: ['the entry into Jerusalem', 'the cleansing of the temple', 'the Last Supper', 'the prayer in Gethsemane', 'the trial before Pilate'], set: 'h' },
        { one: 'an event after the resurrection', many: 'events after the resurrection', items: ['Jesus appeared to Mary Magdalene', 'the walk to Emmaus', 'Thomas saw Jesus\' hands', 'breakfast by the Sea of Galilee', 'the Ascension'], set: 'h' },
      ],
    },
    bank: [
      t(7, 2, 'Christians celebrate the resurrection of Jesus at ___.', 'Easter', ['Christmas', 'Pentecost', 'Palm Sunday']),
      t(7, 3, 'At the Last Supper, Jesus washed His disciples\' feet to teach ___.', 'humble service', ['cleanliness only', 'pride', 'fasting']),
      t(8, 4, 'Holy Communion reminds Christians of ___.', 'the Last Supper and Jesus\' sacrifice', ['the birth of Jesus in Bethlehem', 'God\'s creation of the world', 'the escape from Egypt in the Exodus']),
      t(9, 5, 'Why is the resurrection central to Christian faith?', 'It shows Jesus\' victory over death and gives hope of new life.', ['It marks the day Jesus was born in Bethlehem of Judea.', 'It is when the disciples first received the Holy Spirit.', 'It is when Jesus gave the Ten Commandments to the people.']),
    ],
  },
  church: {
    facts: {
      categories: [
        { one: 'a gift of the Holy Spirit', many: 'gifts of the Holy Spirit', items: ['wisdom', 'knowledge', 'faith', 'healing', 'prophecy', 'teaching'], set: 'g' },
        { one: 'a fruit of the Holy Spirit', many: 'fruits of the Holy Spirit', items: ['love', 'joy', 'peace', 'patience', 'kindness', 'self-control'], set: 'g' },
      ],
      pairs: [
        {
          pairs: [
            ['Pentecost', 'the coming of the Holy Spirit upon the disciples'],
            ['Peter', 'bold preaching and leading the early church in Jerusalem'],
            ['Paul', 'missionary journeys and letters to the churches'],
            ['Stephen', 'being the first Christian martyr, strong in faith'],
          ],
          ask: (a) => `What is ${a} known for?`,
          askBack: (b) => `Who or what is known for ${b}?`,
        },
      ],
    },
    bank: [
      t(7, 2, 'The early Christians shared their possessions and met to ___.', 'pray, learn and break bread together', ['choose a king to rule over them', 'plan how to leave Jerusalem', 'trade goods and make a profit']),
      t(8, 3, 'Which is a role of the church in Kenya today?', 'running schools and hospitals and helping the needy', ['collecting taxes for the national government', 'making laws in Parliament for the country', 'running elections and counting the votes']),
      t(8, 4, 'Paul\'s letters to churches were written mainly to ___.', 'teach, encourage and correct believers', ['record the history of Rome', 'list kings', 'tell parables']),
      t(9, 5, 'A youth group wants to show the fruit of the Spirit. Which activity fits best?', 'visiting and helping elderly people in the community', ['holding a contest to find the best singer in church', 'collecting money only for the group\'s own trip', 'debating which members are the most important']),
    ],
  },
  ethics: {
    facts: {
      pairs: [
        {
          pairs: [
            ['integrity', 'being honest and having strong moral principles'],
            ['diligence', 'working hard and carefully'],
            ['stewardship', 'caring responsibly for what God has given'],
            ['chastity', 'keeping oneself pure'],
            ['tolerance', 'respecting people who are different'],
            ['responsibility', 'being accountable for one\'s actions'],
          ],
          ask: (a) => `What does ${a} mean?`,
          askBack: (b) => `Which Christian value means ${b}?`,
        },
      ],
      categories: [
        { one: 'a good use of leisure time', many: 'good uses of leisure', items: ['reading', 'sports', 'community service', 'music and art', 'visiting relatives'], set: 'l' },
        { one: 'a misuse of leisure time', many: 'misuses of leisure', items: ['idling in the streets', 'gossiping', 'excessive gaming', 'gambling'], set: 'l' },
      ],
    },
    bank: [
      t(7, 2, 'Christians believe work is good because ___.', 'God gave people work to do from creation', ['work was a punishment for the fall only', 'only adults are expected to work at all', 'money is the most important thing in life']),
      t(7, 3, 'A learner finds a phone in class. What does Christian integrity require?', 'hand it to the teacher so it is returned', ['keep it until someone asks for it', 'use it quietly and put it back later', 'give it to a friend who needs a phone']),
      t(8, 4, 'Which is a Christian response to corruption?', 'refusing bribes and reporting wrongdoing', ['accepting small gifts to keep peace', 'staying silent to avoid trouble', 'offering bribes only when it is urgent']),
      t(9, 4, 'Why should Christians avoid drug and substance abuse?', 'The body is a temple of the Holy Spirit and should be cared for.', ['Drugs are expensive, so they waste money that could be saved.', 'Using drugs makes it hard to make friends at school.', 'It is only harmful when it is done in public places.']),
      t(9, 5, 'A friend is pressured by peers to cheat in an exam. What is the best Christian advice?', 'stay honest, revise, and ask a teacher for help', ['cheat only this once so friends stay happy', 'copy quietly but never tell anyone about it', 'stay home on exam day to avoid the pressure']),
    ],
  },
}

// ── Social Studies (its own topics each grade) ──────────────────────────────

const ts = (level: Level, prompt: string, answer: string, wrong: string[]): BankQuestion => ({ type: 'choice', level, prompt, options: opts([answer, ...wrong]), answer })
interface STopic {
  facts: FactSet
  bank: BankQuestion[]
}

const SOCIAL7: Record<string, STopic> = {
  maps: {
    facts: {
      pairs: [
        {
          pairs: [
            ['a statement scale', 'written in words, e.g. 1 cm represents 1 km'],
            ['a ratio scale', 'written as a ratio, e.g. 1 : 100,000'],
            ['a linear scale', 'drawn as a divided line'],
          ],
          ask: (a) => `Which describes ${a}?`,
          askBack: (b) => `Which kind of scale is ${b}?`,
        },
        {
          pairs: [
            ['north-east', '045°'],
            ['east', '090°'],
            ['south', '180°'],
            ['south-west', '225°'],
            ['west', '270°'],
            ['north-west', '315°'],
          ],
          ask: (a) => `What is the bearing of ${a}?`,
          askBack: (b) => `Which compass direction has the bearing ${b}?`,
        },
      ],
    },
    bank: [
      ts(2, 'A grid reference gives the eastings first and then the ___.', 'northings', ['scale', 'title', 'key']),
      ts(3, 'On a map with scale 1 : 50,000, 4 cm represents ___ km.', '2', ['20', '200', '0.2']),
      ts(4, 'A map shows a river flowing from north-west to south-east. In which direction is it flowing?', 'south-east', ['north-west', 'north', 'west']),
      ts(5, 'Why do map makers use a key?', 'to explain the symbols used on the map', ['to show only the scale of the map', 'to name the person who drew the map', 'to show the date the map was made']),
    ],
  },
  earth: {
    facts: {
      pairs: [
        {
          pairs: [
            ['rotation of the earth', 'day and night'],
            ['revolution of the earth around the sun', 'the seasons and the year'],
            ['the tilt of the earth\'s axis', 'different seasons in different places'],
          ],
          ask: (a) => `What does ${a} cause?`,
          askBack: (b) => `What causes ${b}?`,
        },
        {
          pairs: [
            ['the equator', '0° latitude'],
            ['the prime meridian', '0° longitude'],
            ['the Tropic of Cancer', '23½° N'],
            ['the Tropic of Capricorn', '23½° S'],
          ],
          ask: (a) => `Where is ${a}?`,
          askBack: (b) => `Which line is at ${b}?`,
        },
      ],
      categories: [
        { one: 'an inner planet', many: 'inner planets', items: ['Mercury', 'Venus', 'Earth', 'Mars'], set: 'p' },
        { one: 'an outer planet', many: 'outer planets', items: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'], set: 'p' },
      ],
    },
    bank: [
      ts(2, 'The earth takes about ___ hours to rotate once on its axis.', '24', ['12', '365', '30']),
      ts(3, 'The earth rotates 360° in 24 hours, so 15° of longitude equals ___ of time.', '1 hour', ['15 minutes', '4 hours', '1 day']),
      ts(4, 'When it is noon in Nairobi (about 37° E), what time is it at the prime meridian (0°) roughly?', 'about 9:30 a.m.', ['about 2:30 p.m.', 'noon', 'midnight']),
      ts(5, 'Why do places near the equator have about 12 hours of daylight all year?', 'The sun is overhead near the equator and day length changes little.', ['The equator is closer to the moon, which lights it at night.', 'The earth spins more slowly at the equator than at the poles.', 'There are no clouds at the equator, so the sun shines longer.']),
    ],
  },
  weather: {
    facts: {
      pairs: [
        {
          pairs: [
            ['a barometer', 'atmospheric pressure'],
            ['a hygrometer', 'humidity'],
            ['an anemometer', 'wind speed'],
            ['a Stevenson screen', 'houses thermometers in the shade'],
            ['a Campbell–Stokes recorder', 'hours of sunshine'],
          ],
          ask: (a) => `What does ${a} measure or do?`,
          askBack: (b) => `Which weather instrument is used for ${b}?`,
        },
      ],
      categories: [
        { one: 'a factor that influences climate', many: 'factors influencing climate', items: ['latitude', 'altitude', 'distance from the sea', 'ocean currents', 'prevailing winds'], set: 'r' },
        { one: 'a climatic region of Africa', many: 'climatic regions of Africa', items: ['equatorial', 'tropical savannah', 'desert', 'Mediterranean', 'mountain climate'], set: 'r' },
      ],
    },
    bank: [
      ts(2, 'The average weather of a place over about 30 years is its ___.', 'climate', ['weather', 'season', 'relief']),
      ts(3, 'Temperature falls by about 6°C for every ___ m rise in altitude.', '1,000', ['100', '10', '5,000']),
      ts(4, 'Which climatic region has hot, dry summers and warm, wet winters?', 'Mediterranean', ['equatorial', 'desert', 'tropical savannah']),
      ts(5, 'Why is the Congo Basin hot and wet all year?', 'It lies on the equator with high sun and rising moist air.', ['It lies near the coast and gets cold ocean currents.', 'It is a high plateau far from any large rivers.', 'It is in the tropics but has a long dry season.']),
    ],
  },
  history: {
    facts: {
      pairs: [
        {
          pairs: [
            ['Ancient Egypt', 'pyramids and the River Nile'],
            ['the Kingdom of Kush (Meroe)', 'iron working on the Nile'],
            ['the Kingdom of Aksum', 'trade across the Red Sea and early coins'],
            ['Great Zimbabwe', 'massive stone walls built without mortar'],
            ['the Swahili city-states', 'Indian Ocean trade at Kilwa and Lamu'],
          ],
          ask: (a) => `What made ${a} famous?`,
          askBack: (b) => `Which early African civilisation is known for ${b}?`,
        },
      ],
      categories: [
        { one: 'a source of history', many: 'sources of history', items: ['oral tradition', 'archaeology', 'written records', 'linguistics', 'museums'], set: 's' },
        { one: 'a period of early human development', many: 'periods of early human development', items: ['Old Stone Age', 'Middle Stone Age', 'New Stone Age', 'Iron Age'], set: 's' },
      ],
    },
    bank: [
      ts(2, 'The study of the past through remains such as tools and bones is ___.', 'archaeology', ['geography', 'astronomy', 'botany']),
      ts(3, 'Early people\'s discovery of fire helped them to ___.', 'cook food, keep warm and scare away wild animals', ['make iron tools and build stone houses at once', 'write records and send messages to other groups', 'grow crops all year without any rainfall']),
      ts(4, 'Why did early civilisations develop along rivers such as the Nile?', 'Rivers provided water for farming and transport.', ['Rivers were cold.', 'There were no people elsewhere.', 'Rivers had gold only.']),
      ts(5, 'Which development allowed early people to settle in one place?', 'farming (the agrarian revolution)', ['hunting large wild animals', 'gathering wild fruits only', 'moving with their herds']),
    ],
  },
  resources: {
    facts: {
      pairs: [
        {
          pairs: [
            ['South Africa', 'gold and diamonds'],
            ['Nigeria', 'petroleum'],
            ['the Democratic Republic of Congo', 'copper and cobalt'],
            ['Ghana', 'cocoa and gold'],
            ['Kenya', 'tea and soda ash'],
            ['Zambia', 'copper'],
          ],
          ask: (a) => `${a} is well known for ___.`,
          askBack: (b) => `Which African country is well known for ${b}?`,
        },
      ],
      categories: [
        { one: 'a renewable resource', many: 'renewable resources', items: ['forests', 'water', 'wildlife', 'solar energy', 'soil (if conserved)'], set: 'r' },
        { one: 'a non-renewable resource', many: 'non-renewable resources', items: ['petroleum', 'coal', 'gold', 'copper', 'natural gas'], set: 'r' },
      ],
    },
    bank: [
      ts(2, 'Resources that can be replaced naturally are called ___ resources.', 'renewable', ['non-renewable', 'artificial', 'human']),
      ts(3, 'Which is a threat to forests in Africa?', 'clearing land for farming and charcoal', ['planting trees on bare hillsides', 'employing more forest guards', 'steady rainfall through the year']),
      ts(4, 'Why are wildlife parks important to Kenya\'s economy?', 'They attract tourists who bring foreign exchange.', ['They are used to grow tea and coffee for export.', 'They supply most of the timber used in Kenya.', 'They hold the country\'s largest gold mines.']),
      ts(5, 'Which is the best way to make mineral wealth benefit a country?', 'process minerals locally and invest the earnings', ['export all minerals raw and spend the money', 'allow mining anywhere without any rules', 'stop all mining to protect the land']),
    ],
  },
  economy: {
    facts: {
      categories: [
        { one: 'a mode of transport', many: 'modes of transport', items: ['road', 'railway', 'water', 'air', 'pipeline'], set: 't' },
        { one: 'a means of communication', many: 'means of communication', items: ['mobile phones', 'internet', 'radio', 'television', 'newspapers'], set: 't' },
      ],
      pairs: [
        {
          pairs: [
            ['imports', 'goods bought from other countries'],
            ['exports', 'goods sold to other countries'],
            ['balance of trade', 'the difference between exports and imports'],
            ['barter trade', 'exchanging goods for goods'],
          ],
          ask: (a) => `What are or is ${a}?`,
          askBack: (b) => `What is the term for ${b}?`,
        },
      ],
    },
    bank: [
      ts(2, 'The fastest mode of transport over long distances is ___.', 'air', ['road', 'water', 'pipeline']),
      ts(3, 'Which is the cheapest way to move large amounts of oil inland?', 'pipeline', ['air', 'road tankers only', 'bicycles']),
      ts(4, 'Why did trans-Saharan trade grow in early Africa?', 'Camels made it possible to cross the desert with goods like gold and salt.', ['Railways were built across the desert to carry goods to the coast.', 'The Sahara was a forest with many rivers that boats could follow.', 'Ships sailed up the Nile and crossed the desert on canals.']),
      ts(5, 'How has mobile money changed trade in Kenya?', 'It allows fast, safe payments even in rural areas.', ['It stopped all trade.', 'It needs banks in every village.', 'It works only abroad.']),
    ],
  },
  governance: {
    facts: {
      pairs: [
        {
          pairs: [
            ['the Bill of Rights', 'Chapter Four of the Constitution'],
            ['the national values', 'Article 10 of the Constitution'],
            ['citizenship', 'Chapter Three of the Constitution'],
          ],
          ask: (a) => `Where in the Constitution of Kenya is ${a} found?`,
          askBack: (b) => `What does ${b} deal with?`,
        },
      ],
      categories: [
        { one: 'a national value in Article 10', many: 'national values', items: ['patriotism', 'national unity', 'rule of law', 'democracy', 'social justice', 'integrity'], set: 'v' },
        { one: 'a human right', many: 'human rights', items: ['right to life', 'right to education', 'freedom of expression', 'right to a fair trial', 'freedom of worship'], set: 'v' },
      ],
    },
    bank: [
      ts(2, 'The supreme law of Kenya is the ___.', 'Constitution', ['Bible', 'county budget', 'school rules']),
      ts(3, 'The current Constitution of Kenya was promulgated on 27th August ___.', '2010', ['1963', '2002', '2013']),
      ts(4, 'Why is the Constitution called the supreme law?', 'Any law that goes against it is invalid.', ['It was written by the president only.', 'It is the longest book.', 'It can never be changed.']),
      ts(5, 'Which shows the rule of law?', 'everyone, including leaders, obeying the law', ['leaders being above the law', 'punishing people without trial', 'ignoring court orders']),
    ],
  },
  citizenship: {
    facts: {
      categories: [
        { one: 'a duty of a citizen', many: 'duties of citizens', items: ['paying taxes', 'obeying laws', 'voting', 'protecting the environment', 'taking care of public property'], set: 'c' },
        { one: 'a way to promote social cohesion', many: 'ways to promote social cohesion', items: ['inter-community sports', 'cultural festivals', 'learning other languages', 'joint community projects'], set: 'c' },
      ],
      pairs: [
        {
          pairs: [
            ['citizenship by birth', 'a parent is a Kenyan citizen'],
            ['citizenship by registration', 'meeting conditions such as lawful residence for years'],
            ['dual citizenship', 'being a citizen of two countries at once'],
          ],
          ask: (a) => `How is ${a} gained?`,
          askBack: (b) => `Which kind of citizenship applies when ${b}?`,
        },
      ],
    },
    bank: [
      ts(2, 'A person who belongs to a country by law is a ___.', 'citizen', ['tourist', 'visitor', 'refugee only']),
      ts(3, 'Kenyans get a national identity card at the age of ___.', '18', ['12', '16', '21']),
      ts(4, 'Which action shows patriotism?', 'taking part in a community clean-up', ['damaging public property', 'avoiding tax', 'spreading hate speech']),
      ts(5, 'How can young people promote national unity?', 'making friends across communities and rejecting tribalism', ['joining only clubs made up of their own community', 'avoiding all talk about other communities\' cultures', 'supporting leaders because they come from their area']),
    ],
  },
}

const SOCIAL8: Record<string, STopic> = {
  maps: {
    facts: {
      pairs: [
        {
          pairs: [
            ['contours close together', 'a steep slope'],
            ['contours far apart', 'a gentle slope'],
            ['contours forming a V pointing uphill', 'a river valley'],
            ['closed contours rising to the centre', 'a hill'],
            ['a spot height', 'the exact height of a point'],
          ],
          ask: (a) => `On a topographical map, what do ${a} show?`,
          askBack: (b) => `How is ${b} shown on a topographical map?`,
        },
      ],
    },
    bank: [
      ts(2, 'Lines joining places of equal height on a map are ___.', 'contours', ['isobars', 'isotherms', 'gridlines']),
      ts(3, 'The difference in height between two neighbouring contours is the ___.', 'contour interval', ['scale', 'gradient', 'bearing']),
      ts(4, 'Two points are 200 m apart in height and 2 km apart on the ground. What is the gradient?', '1 in 10', ['1 in 100', '1 in 2', '10 in 1']),
      ts(5, 'Why do settlements on topographical maps often cluster along valleys?', 'Valleys have water, flatter land and easier transport.', ['Valleys are colder, so food stays fresh for longer.', 'Hilltops have more water and better roads.', 'Valleys have fewer roads, so they are quieter.']),
    ],
  },
  earth: {
    facts: {
      pairs: [
        {
          pairs: [
            ['faulting', 'the Great Rift Valley'],
            ['volcanicity', 'Mount Kilimanjaro and Mount Kenya'],
            ['folding', 'the Atlas Mountains'],
            ['wind erosion', 'mushroom rocks in deserts'],
            ['river deposition', 'deltas such as the Nile Delta'],
            ['glaciation', 'the U-shaped valleys on Mount Kenya'],
          ],
          ask: (a) => `Which landform resulted from ${a}?`,
          askBack: (b) => `Which process formed ${b}?`,
        },
      ],
      categories: [
        { one: 'an internal land-forming process', many: 'internal processes', items: ['faulting', 'folding', 'volcanicity', 'earthquakes'], set: 'p' },
        { one: 'an external land-forming process', many: 'external processes', items: ['weathering', 'erosion', 'deposition', 'mass wasting'], set: 'p' },
      ],
    },
    bank: [
      ts(2, 'The breaking down of rocks in their original place is called ___.', 'weathering', ['erosion', 'deposition', 'faulting']),
      ts(3, 'Hot springs and geysers at Lake Bogoria are linked to ___.', 'volcanic activity', ['glaciation', 'folding', 'wind deposition']),
      ts(4, 'Why are earthquakes more common along the Rift Valley?', 'It lies along a zone where the earth\'s crust is splitting.', ['It has more rivers and lakes than other regions.', 'It is the lowest and hottest part of the country.', 'Its rocks are softer because of the heavy rains.']),
      ts(5, 'How do volcanic landscapes benefit people?', 'Fertile soils, geothermal energy and tourism.', ['Cold weather, snow and frequent heavy rain.', 'Flat land, deep rivers and many lakes.', 'Sandy soils, oil wells and desert plants.']),
    ],
  },
  weather: {
    facts: {
      categories: [
        { one: 'a cause of climate change', many: 'causes of climate change', items: ['burning fossil fuels', 'deforestation', 'industrial emissions', 'livestock methane'], set: 'c' },
        { one: 'a way to mitigate climate change', many: 'ways to mitigate climate change', items: ['planting trees', 'using renewable energy', 'reducing waste', 'using public transport'], set: 'c' },
        { one: 'an effect of climate change in Kenya', many: 'effects of climate change', items: ['longer droughts', 'unpredictable rainfall', 'melting glaciers on Mount Kenya', 'floods'], set: 'c' },
      ],
    },
    bank: [
      ts(2, 'The gradual warming of the earth\'s average temperature is called ___.', 'global warming', ['weathering', 'erosion', 'condensation']),
      ts(3, 'Which gas released by burning charcoal adds to global warming?', 'carbon dioxide', ['oxygen', 'nitrogen', 'helium']),
      ts(4, 'Why are the glaciers on Mount Kenya shrinking?', 'Rising temperatures are melting the ice.', ['More snow is falling.', 'The mountain is growing.', 'Tourists carry the ice away.']),
      ts(5, 'Which farming practice helps farmers adapt to unpredictable rains?', 'planting drought-tolerant crops and harvesting water', ['planting the same crop on all land every season', 'burning crop remains to clear fields quickly', 'clearing all trees to make room for more crops']),
    ],
  },
  history: {
    facts: {
      pairs: [
        {
          pairs: [
            ['the Berlin Conference (1884–85)', 'the meeting where European powers divided Africa among themselves'],
            ['Nandi resistance', 'opposition to the railway, led by Koitalel arap Samoei'],
            ['Giriama resistance', 'opposition to colonial rule, led by Mekatilili wa Menza'],
            ['the Mau Mau movement', 'a struggle for land and freedom in Kenya'],
            ['the Lancaster House conferences', 'talks in London that prepared Kenya for independence'],
          ],
          ask: (a) => `What is ${a} known for?`,
          askBack: (b) => `Which event or movement was ${b}?`,
        },
        {
          pairs: [
            ['Ghana', '1957'],
            ['Tanganyika', '1961'],
            ['Uganda', '1962'],
            ['Kenya', '1963'],
          ],
          ask: (a) => `In which year did ${a} gain independence?`,
          askBack: (b) => `Which country gained independence in ${b}?`,
        },
      ],
    },
    bank: [
      ts(2, 'The division of Africa by European powers in the late 1800s is called the ___.', 'Scramble for Africa', ['Great Trek', 'Industrial Revolution', 'Cold War']),
      ts(3, 'Britain ruled Kenya mainly through a system called ___.', 'direct rule with appointed chiefs', ['indirect rule through kings', 'assimilation into French culture', 'self-rule by elected councils']),
      ts(4, 'Why did many Africans resist colonial rule?', 'They lost land and freedom and were forced to pay taxes.', ['They wanted the colonial rulers to build more roads.', 'They preferred to work on settler farms for wages.', 'They wanted to join the colonial government quickly.']),
      ts(5, 'Which leader became Ghana\'s first president and inspired African independence movements?', 'Kwame Nkrumah', ['Julius Nyerere', 'Jomo Kenyatta', 'Nelson Mandela']),
    ],
  },
  resources: {
    facts: {
      categories: [
        { one: 'a type of farming in Africa', many: 'types of farming', items: ['subsistence farming', 'plantation farming', 'nomadic pastoralism', 'mixed farming', 'irrigation farming'], set: 'i' },
        { one: 'a manufacturing industry in Kenya', many: 'manufacturing industries', items: ['tea processing', 'cement making', 'sugar milling', 'textile making', 'food canning'], set: 'i' },
      ],
      pairs: [
        {
          pairs: [
            ['the Mwea scheme', 'irrigated rice farming'],
            ['the Gezira scheme in Sudan', 'irrigated cotton farming'],
            ['Kericho', 'plantation tea farming'],
            ['Bamburi', 'cement manufacturing'],
          ],
          ask: (a) => `What is ${a} known for?`,
          askBack: (b) => `Which place is known for ${b}?`,
        },
      ],
    },
    bank: [
      ts(2, 'Farming mainly to feed one\'s own family is ___ farming.', 'subsistence', ['commercial', 'plantation', 'industrial']),
      ts(3, 'Why do cement factories locate near limestone deposits?', 'Limestone is the main raw material and is heavy to transport.', ['Limestone is light, so it is cheap to move it far away.', 'Cement is made mainly from water, and limestone holds water.', 'Workers prefer to live in areas with limestone rocks.']),
      ts(4, 'Which is a benefit of industries to Kenya?', 'They create jobs and add value to raw materials.', ['They reduce the amount of goods Kenya exports.', 'They use up raw materials without producing goods.', 'They stop farmers from selling their produce.']),
      ts(5, 'Which challenge most limits irrigation farming in arid areas?', 'high cost of water and equipment', ['too much rain during the year', 'cold weather and frost at night', 'too many permanent rivers']),
    ],
  },
  economy: {
    facts: {
      pairs: [
        {
          pairs: [
            ['EAC', 'the East African Community'],
            ['COMESA', 'the Common Market for Eastern and Southern Africa'],
            ['ECOWAS', 'the Economic Community of West African States'],
            ['SADC', 'the Southern African Development Community'],
            ['AfCFTA', 'the African Continental Free Trade Area'],
          ],
          ask: (a) => `What does ${a} stand for?`,
          askBack: (b) => `What is the short name of ${b}?`,
        },
      ],
    },
    bank: [
      ts(2, 'Trade between countries in the same region is called ___ trade.', 'regional', ['local', 'barter', 'retail']),
      ts(3, 'The headquarters of the East African Community are in ___.', 'Arusha', ['Nairobi', 'Kampala', 'Addis Ababa']),
      ts(4, 'How does a customs union help member countries?', 'Goods move between members without import duties.', ['Each member sets its own taxes on the others.', 'Members must close their borders to trade.', 'Only raw materials may cross the borders.']),
      ts(5, 'Which is a challenge facing regional trade in Africa?', 'poor transport links and border delays', ['too many good roads and railways', 'too much cooperation between states', 'no goods for countries to trade']),
    ],
  },
  governance: {
    facts: {
      pairs: [
        {
          pairs: [
            ['devolution', 'sharing power between national and county governments'],
            ['public participation', 'citizens taking part in decisions that affect them'],
            ['a referendum', 'a vote by citizens on a specific question'],
            ['separation of powers', 'dividing government among the executive, legislature and judiciary'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `What is ${b} called?`,
        },
      ],
      categories: [
        { one: 'a function of county governments', many: 'county functions', items: ['county roads', 'county health services', 'pre-primary education', 'agriculture', 'markets'], set: 'f' },
        { one: 'a function of the national government', many: 'national functions', items: ['defence', 'foreign affairs', 'immigration', 'national police', 'university education'], set: 'f' },
      ],
    },
    bank: [
      ts(2, 'Kenya has ___ county governments.', '47', ['8', '42', '290']),
      ts(3, 'Elections in Kenya are conducted by the ___.', 'IEBC', ['KRA', 'KWS', 'KEMSA']),
      ts(4, 'Why is devolution important?', 'It brings services and decision-making closer to the people.', ['It allows each county to make its own national laws.', 'It removes the need for a national government.', 'It stops elections from being held in the counties.']),
      ts(5, 'A county plans a new market. Which shows public participation?', 'holding meetings where residents give their views', ['letting officials choose the site on their own', 'announcing the plan after building has started', 'asking only the contractor what is best']),
    ],
  },
  citizenship: {
    facts: {
      categories: [
        { one: 'a cause of conflict', many: 'causes of conflict', items: ['competition for land and water', 'hate speech', 'unfair sharing of resources', 'cattle rustling', 'misunderstandings'], set: 'c' },
        { one: 'a peaceful way to resolve conflict', many: 'peaceful ways to resolve conflict', items: ['dialogue', 'negotiation', 'mediation', 'arbitration', 'reconciliation'], set: 'c' },
      ],
      pairs: [
        {
          pairs: [
            ['negotiation', 'the parties talk directly to reach agreement'],
            ['mediation', 'a neutral person helps the parties agree'],
            ['arbitration', 'a neutral person hears both sides and makes a binding decision'],
            ['litigation', 'settling a dispute in a court of law'],
          ],
          ask: (a) => `What happens in ${a}?`,
          askBack: (b) => `Which method of resolving conflict is it when ${b}?`,
        },
      ],
    },
    bank: [
      ts(2, 'A state of harmony without war or violence is called ___.', 'peace', ['conflict', 'trade', 'devolution']),
      ts(3, 'Which is the first step in resolving a conflict peacefully?', 'listening to both sides', ['shouting', 'ignoring the problem', 'taking sides']),
      ts(4, 'Why is hate speech dangerous?', 'It can spread hatred and lead to violence.', ['It is only a problem when it is written down.', 'It makes people speak more than one language.', 'It helps communities settle their differences.']),
      ts(5, 'Two communities dispute a watering point. Which solution is most lasting?', 'agree on fair sharing and build more water points together', ['let the larger community use the point and the other move away', 'close the watering point until the next rainy season', 'let each community guard the point on alternate days']),
    ],
  },
}

const SOCIAL9: Record<string, STopic> = {
  maps: {
    facts: {
      pairs: [
        {
          pairs: [
            ['a bar graph', 'comparing amounts in different categories'],
            ['a line graph', 'showing change over time'],
            ['a pie chart', 'showing parts of a whole'],
            ['a population pyramid', 'showing a population by age and sex'],
          ],
          ask: (a) => `What is ${a} best used for?`,
          askBack: (b) => `Which graph is best for ${b}?`,
        },
        {
          pairs: [
            ['a ground photograph', 'from ground level'],
            ['an oblique aerial photograph', 'from the air at an angle'],
            ['a vertical aerial photograph', 'from directly above'],
          ],
          ask: (a) => `How is ${a} taken?`,
          askBack: (b) => `Which kind of photograph is taken ${b}?`,
        },
      ],
    },
    bank: [
      ts(2, 'In a photograph, the part nearest the camera is the ___.', 'foreground', ['background', 'middle ground', 'horizon']),
      ts(3, 'A pie chart sector of 90° shows what percentage?', '25%', ['90%', '50%', '10%']),
      ts(4, 'A population pyramid with a wide base shows ___.', 'many young people and a high birth rate', ['mostly old people', 'equal numbers at all ages', 'a falling population']),
      ts(5, 'Which is a limitation of a vertical aerial photograph?', 'heights of features are hard to judge', ['it shows no features', 'it cannot be scaled', 'it is taken from the ground']),
    ],
  },
  earth: {
    facts: {
      pairs: [
        {
          pairs: [
            ['Magadi', 'soda ash'],
            ['Kwale', 'titanium'],
            ['the Kerio Valley', 'fluorspar'],
            ['Turkana', 'petroleum'],
            ['Olkaria', 'geothermal energy'],
            ['the Seven Forks dams', 'hydroelectric power'],
          ],
          ask: (a) => `What resource is ${a} known for?`,
          askBack: (b) => `Which place in Kenya is known for ${b}?`,
        },
      ],
      categories: [
        { one: 'an effect of mining on the environment', many: 'effects of mining', items: ['open pits and scarred land', 'water pollution', 'dust and noise', 'loss of vegetation'], set: 'e' },
        { one: 'a way of reducing mining damage', many: 'ways to reduce mining damage', items: ['filling and replanting old pits', 'treating mine waste', 'environmental impact assessments', 'planting trees'], set: 'e' },
      ],
    },
    bank: [
      ts(2, 'Mining by digging a large open hole in the ground is ___ mining.', 'open-cast', ['shaft', 'placer', 'drift']),
      ts(3, 'Which energy source does Kenya get most of its electricity from today?', 'geothermal and hydroelectric power', ['coal and diesel generators', 'nuclear power stations', 'imported natural gas']),
      ts(4, 'Why is soda ash from Lake Magadi valuable?', 'It is used to make glass, soaps and detergents.', ['It is burned as fuel in power stations.', 'It is a kind of gold sold to other countries.', 'It is used to make roofs and iron sheets.']),
      ts(5, 'Why must a mining company carry out an environmental impact assessment?', 'to identify and reduce harm to the environment before work starts', ['to find out how much gold the company will earn in a year', 'to decide how many workers to employ at the mine', 'to get permission to mine without any further checks']),
    ],
  },
  weather: {
    facts: {
      pairs: [
        {
          pairs: [
            ['equatorial rainforest', 'the Amazon and Congo basins'],
            ['tropical savannah', 'the Serengeti and much of East Africa'],
            ['hot desert', 'the Sahara and Kalahari'],
            ['Mediterranean', 'the southern tip of South Africa and southern Europe'],
            ['temperate grassland', 'the prairies of North America'],
            ['tundra', 'northern Canada and Siberia'],
          ],
          ask: (a) => `Where is ${a} vegetation found?`,
          askBack: (b) => `Which climatic region covers ${b}?`,
        },
      ],
    },
    bank: [
      ts(2, 'The largest hot desert in the world is the ___.', 'Sahara', ['Kalahari', 'Chalbi', 'Namib']),
      ts(3, 'Trees in tropical rainforests are ___.', 'tall and evergreen with buttress roots', ['short and thorny with very small leaves', 'needle-leaved conifers that shed snow', 'leafless for most of the dry season']),
      ts(4, 'Why do coniferous trees have needle-shaped leaves?', 'to reduce water loss and shed snow', ['to catch more rain', 'to attract insects', 'to grow faster in deserts']),
      ts(5, 'Which human activity most threatens the world\'s rainforests?', 'clearing land for logging and farming', ['research by scientists and students', 'bird watching and nature walks', 'planting new trees in cleared areas']),
    ],
  },
  history: {
    facts: {
      pairs: [
        {
          pairs: [
            ['the First World War', '1914–1918'],
            ['the Second World War', '1939–1945'],
            ['the founding of the United Nations', '1945'],
            ['the founding of the OAU', '1963'],
            ['the launch of the African Union', '2002'],
          ],
          ask: (a) => `When did ${a} take place?`,
          askBack: (b) => `What took place in ${b}?`,
        },
      ],
      categories: [
        { one: 'an effect of the world wars on Africa', many: 'effects of the world wars on Africa', items: ['Africans served as soldiers', 'growth of nationalism', 'economic hardship', 'new ideas about freedom'], set: 'e' },
        { one: 'an organisation formed after the Second World War', many: 'organisations formed after the Second World War', items: ['the United Nations', 'the World Bank', 'the IMF', 'UNICEF'], set: 'e' },
      ],
    },
    bank: [
      ts(2, 'The international organisation formed after the Second World War to keep peace is the ___.', 'United Nations', ['League of Nations', 'Commonwealth', 'EAC']),
      ts(3, 'The United Nations headquarters is in ___.', 'New York', ['Nairobi', 'Geneva', 'London']),
      ts(4, 'Why did African soldiers who returned from the Second World War support independence movements?', 'They had seen that colonial powers could be challenged and wanted freedom.', ['They were rewarded with large farms by the colonial government.', 'They wanted Britain to take over more colonies in Africa.', 'They had been promised top jobs in the colonial army.']),
      ts(5, 'Which UN agency based in Nairobi deals with the environment?', 'UNEP', ['UNICEF', 'WHO', 'UNESCO']),
    ],
  },
  resources: {
    facts: {
      categories: [
        { one: 'a tourist attraction in Kenya', many: 'tourist attractions', items: ['Maasai Mara', 'Diani beach', 'Mount Kenya', 'Lamu Old Town', 'Hell\'s Gate'], set: 'm' },
        { one: 'a method of fishing', many: 'fishing methods', items: ['trawling', 'gill netting', 'long lining', 'purse seining', 'fish farming'], set: 'm' },
        { one: 'a way of conserving forests', many: 'ways of conserving forests', items: ['replanting cleared areas', 'using energy-saving jikos', 'licensing timber harvesting', 'agroforestry on farms', 'community forest scouts'], set: 'f' },
        { one: 'a threat to forests', many: 'threats to forests', items: ['charcoal burning', 'illegal logging', 'clearing land for farms', 'uncontrolled fires', 'overgrazing in forests'], set: 'f' },
      ],
      pairs: [
        {
          pairs: [
            ['Lake Nakuru National Park', 'flamingos and rhinos'],
            ['Tsavo National Park', 'large herds of red elephants'],
            ['Kakamega Forest', 'rainforest birds and monkeys'],
            ['Watamu Marine Park', 'coral reefs and sea turtles'],
            ['Hell\'s Gate National Park', 'gorges and geothermal steam'],
            ['Amboseli National Park', 'elephants below Kilimanjaro'],
          ],
          ask: (a) => `What is ${a} best known for?`,
          askBack: (b) => `Which place is best known for ${b}?`,
        },
      ],
    },
    bank: [
      ts(2, 'Keeping fish in ponds is called ___.', 'fish farming (aquaculture)', ['trawling in open water', 'horticulture on small farms', 'forestry along river banks']),
      ts(3, 'Which is a challenge facing fishing in Lake Victoria?', 'overfishing and water hyacinth', ['too few kinds of fish to catch', 'the lake drying up every year', 'ice covering the lake in July']),
      ts(4, 'Why is ecotourism encouraged?', 'It earns income while conserving nature and benefiting local people.', ['It brings as many tourists as possible into the parks every day.', 'It allows visitors to hunt animals in a controlled way.', 'It replaces farming as the main activity in rural areas.']),
      ts(5, 'Which policy would best protect Kenya\'s forests while meeting timber needs?', 'licensed harvesting with replanting', ['clearing forests for farms', 'banning all trees', 'unregulated logging']),
    ],
  },
  economy: {
    facts: {
      pairs: [
        {
          pairs: [
            ['globalisation', 'the growing connection of the world\'s economies and cultures'],
            ['a multinational company', 'a company operating in many countries'],
            ['e-commerce', 'buying and selling over the internet'],
            ['a tariff', 'a tax on imported goods'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `What is ${b} called?`,
        },
      ],
      categories: [
        { one: 'a major Kenyan export', many: 'major exports', items: ['tea', 'cut flowers', 'coffee', 'avocados', 'horticultural produce'], set: 'x' },
        { one: 'a major Kenyan import', many: 'major imports', items: ['petroleum products', 'machinery', 'vehicles', 'iron and steel'], set: 'x' },
      ],
    },
    bank: [
      ts(2, 'When a country buys more than it sells abroad, it has a trade ___.', 'deficit', ['surplus', 'balance', 'profit']),
      ts(3, 'Which is a benefit of globalisation to Kenya?', 'access to bigger markets and new technology', ['fewer foreign goods in local shops', 'less contact with other countries', 'lower demand for Kenyan exports']),
      ts(4, 'Why do countries impose tariffs?', 'to protect local industries and raise revenue', ['to make imported goods cheaper for buyers', 'to reduce the taxes that citizens pay', 'to stop all trade with other countries']),
      ts(5, 'How can Kenya reduce its trade deficit?', 'add value to exports and produce more goods locally', ['import more fuel and machinery from other countries', 'stop exporting tea, coffee and cut flowers', 'close local factories and buy finished goods instead']),
    ],
  },
  governance: {
    facts: {
      pairs: [
        {
          pairs: [
            ['the United Nations', 'New York'],
            ['the African Union', 'Addis Ababa'],
            ['the East African Community', 'Arusha'],
            ['the Commonwealth Secretariat', 'London'],
            ['UNEP', 'Nairobi'],
          ],
          ask: (a) => `Where are the headquarters of ${a}?`,
          askBack: (b) => `Which organisation has its headquarters in ${b}?`,
        },
      ],
      categories: [
        { one: 'an organ of the United Nations', many: 'UN organs', items: ['the General Assembly', 'the Security Council', 'the International Court of Justice', 'the Secretariat'], set: 'o' },
        { one: 'an organ of the African Union', many: 'AU organs', items: ['the Assembly of Heads of State', 'the Pan-African Parliament', 'the Peace and Security Council', 'the AU Commission'], set: 'o' },
      ],
    },
    bank: [
      ts(2, 'The organisation of African countries formed in 2002 is the ___.', 'African Union', ['OAU', 'EAC', 'Commonwealth']),
      ts(3, 'Which UN organ has five permanent members with veto power?', 'the Security Council', ['the General Assembly', 'the Secretariat', 'the Trusteeship Council']),
      ts(4, 'Why do countries join international organisations?', 'to cooperate on peace, trade and development', ['to avoid working with neighbouring countries', 'to give up control of their own laws', 'to stop trade with countries outside it']),
      ts(5, 'Which shows Kenya playing a role in international peace?', 'sending peacekeepers on UN and AU missions', ['closing its embassies in neighbouring states', 'leaving the UN to focus on local matters', 'refusing to sign any regional agreements']),
    ],
  },
  citizenship: {
    facts: {
      categories: [
        { one: 'a universal human right', many: 'universal human rights', items: ['right to life', 'freedom from torture', 'right to education', 'freedom of thought', 'right to equality'], set: 'g' },
        { one: 'a responsibility of a global citizen', many: 'responsibilities of global citizens', items: ['respecting other cultures', 'protecting the environment', 'standing against injustice', 'using resources wisely'], set: 'g' },
      ],
      pairs: [
        {
          pairs: [
            ['the Universal Declaration of Human Rights', 'was adopted by the UN in 1948'],
            ['the Kenya National Commission on Human Rights', 'works to promote and protect human rights in Kenya'],
            ['the Ethics and Anti-Corruption Commission', 'works to fight corruption in Kenya'],
          ],
          ask: (a) => `Which statement about ${a} is true? It ___.`,
          askBack: (b) => `Which body or document ${b}?`,
        },
      ],
    },
    bank: [
      ts(2, 'Rights that every person has simply because they are human are ___ rights.', 'human', ['county', 'school', 'family']),
      ts(3, 'Which body in Kenya fights corruption?', 'the Ethics and Anti-Corruption Commission', ['the Independent Electoral Commission', 'the Kenya Bureau of Standards', 'the Kenya Wildlife Service']),
      ts(4, 'Why is integrity important for leaders?', 'It builds public trust and ensures resources are used well.', ['It helps leaders stay in power for as long as they like.', 'It allows leaders to make decisions without consulting anyone.', 'It makes sure leaders become richer than other citizens.']),
      ts(5, 'Which is the best way for learners to act as global citizens?', 'joining environmental and community service projects', ['learning only about their own country\'s problems', 'buying as many imported goods as they can', 'avoiding news about events in other countries']),
    ],
  },
}

// ── Build ───────────────────────────────────────────────────────────────────

const FACTS: Record<string, FactSet> = {}
const BANKS: Record<string, BankQuestion[]> = {}
for (const [letter, set] of [['t', PRETECH], ['a', AGRICULTURE], ['c', CREATIVE], ['r', CRE]] as const)
  for (const [k, v] of Object.entries(set))
    for (const g of [7, 8, 9] as J[]) {
      FACTS[`j${g}${letter}-${k}`] = v.facts
      BANKS[`j${g}${letter}-${k}`] = v.bank.filter(([min]) => min <= g).map(([min, q]) => (min < g && q.level > 1 ? { ...q, level: Math.max(1, q.level - (g - min)) as Level } : q))
    }
for (const [g, set] of [[7, SOCIAL7], [8, SOCIAL8], [9, SOCIAL9]] as const)
  for (const [k, v] of Object.entries(set)) {
    FACTS[`j${g}o-${k}`] = v.facts
    BANKS[`j${g}o-${k}`] = v.bank
  }

// ── Map, graph and data skills ──────────────────────────────────────────────
// Social Studies map work and weather records are calculations; these makers mix with
// the facts so every paper has some.

const n0 = (n: number) => n.toLocaleString('en-US')
function choiceOf(level: Level, prompt: string, answer: string, wrong: string[], explain: string): ChoiceQuestion {
  const labels = [answer, ...[...new Set(wrong)].filter((w) => w !== answer)].slice(0, 4)
  return { id: uid('jo'), type: 'choice', level, prompt, options: labels.map((l) => ({ id: l, label: l })), answer, explain }
}

const scaleMaker = (rng: Rng, level: Level): ChoiceQuestion => {
  const scale = rng.pick([25000, 50000, 100000, 250000, 500000])
  const cm = rng.int(2, 14)
  const km = (cm * scale) / 100000
  if (level <= 3) return choiceOf(level, `On a map of scale 1 : ${n0(scale)}, two schools are ${cm} cm apart. What is the real distance?`, `${n0(km)} km`, [`${n0(km * 10)} km`, `${n0(cm * scale)} km`, `${n0(km / 10)} km`, `${n0(km + cm)} km`], `${cm} × ${n0(scale)} cm = ${n0(cm * scale)} cm = ${n0(km)} km`)
  return choiceOf(level, `Two towns ${n0(km)} km apart are ${cm} cm apart on a map. What is the scale of the map?`, `1 : ${n0(scale)}`, [`1 : ${n0(scale * 10)}`, `1 : ${n0(scale / 10)}`, `1 : ${n0(km)}`], `${n0(km)} km = ${n0(km * 100000)} cm; ÷ ${cm} = ${n0(scale)}`)
}

const contourMaker = (rng: Rng, level: Level): ChoiceQuestion => {
  const ci = rng.pick([10, 20, 25, 50])
  if (level <= 3) {
    const base = rng.pick([1000, 1200, 1500, 1800, 2000])
    const k = rng.int(2, 6)
    return choiceOf(level, `On a topographical map the contour interval is ${ci} m. A hilltop is ${k} contours above the ${n0(base)} m contour. About how high is it?`, `${n0(base + k * ci)} m`, [`${n0(base + ci)} m`, `${n0(base + k)} m`, `${n0(base + k * ci * 10)} m`], `${n0(base)} + ${k} × ${ci} = ${n0(base + k * ci)} m`)
  }
  const rise = rng.pick([20, 40, 50, 100, 200])
  const ratio = rng.pick([5, 10, 20, 25, 50])
  const dist = rise * ratio
  return choiceOf(level, `Two points differ in height by ${rise} m and are ${n0(dist)} m apart on the ground. What is the gradient?`, `1 in ${ratio}`, [`1 in ${ratio * 10}`, `${ratio} in 1`, `1 in ${rise}`], `Gradient = vertical interval ÷ horizontal distance = ${rise} ÷ ${n0(dist)} = 1 in ${ratio}`)
}

const pieMaker = (rng: Rng, level: Level): ChoiceQuestion => {
  const pct = rng.pick([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 75])
  const what = rng.pick(['farming', 'trade', 'tourism', 'fishing', 'manufacturing', 'transport'])
  if (level <= 3) return choiceOf(level, `In a pie chart of a county's income, ${what} makes up ${pct}%. What angle is its sector?`, `${(pct * 360) / 100}°`, [`${pct}°`, `${pct * 3}°`, `${(pct * 360) / 100 + 10}°`], `${pct}% of 360° = ${(pct * 360) / 100}°`)
  const total = rng.pick([200, 400, 600, 1000, 1200])
  return choiceOf(level, `A pie chart shows how ${n0(total)} learners travel to school. The sector for walking is ${(pct * 360) / 100}°. How many learners walk?`, n0((pct * total) / 100), [n0(pct), n0((pct * 360) / 100), n0(total - (pct * total) / 100)], `${(pct * 360) / 100} ÷ 360 × ${n0(total)} = ${n0((pct * total) / 100)}`)
}

const tradeMaker = (rng: Rng, level: Level): ChoiceQuestion => {
  const ex = rng.int(20, 90) * 10
  const im = ex + rng.pick([-150, -100, -60, -40, 40, 80, 120, 200])
  const diff = Math.abs(ex - im)
  const kind = ex > im ? 'surplus' : 'deficit'
  return choiceOf(level, `A country exported goods worth ${n0(ex)} billion shillings and imported goods worth ${n0(im)} billion shillings. What was its balance of trade?`, `a ${kind} of ${n0(diff)} billion shillings`, [`a ${kind === 'surplus' ? 'deficit' : 'surplus'} of ${n0(diff)} billion shillings`, `a ${kind} of ${n0(ex + im)} billion shillings`, `a ${kind === 'surplus' ? 'deficit' : 'surplus'} of ${n0(ex + im)} billion shillings`], `Exports − imports = ${n0(ex)} − ${n0(im)}: ${ex > im ? 'more exports, a surplus' : 'more imports, a deficit'}.`)
}

const weatherMaker = (rng: Rng, level: Level): ChoiceQuestion => {
  if (level <= 3) {
    const base = rng.int(18, 30)
    const up = rng.pick([1000, 1500, 2000, 2500, 3000])
    const drop = (up / 1000) * 6
    return choiceOf(level, `It is ${base}°C at the foot of a mountain. Temperature falls by about 6°C for every 1,000 m. What is the temperature ${n0(up)} m higher up?`, `${base - drop}°C`, [`${base + drop}°C`, `${base - 6}°C`, `${base - up / 100}°C`], `${n0(up)} m = ${up / 1000} × 6°C = ${drop}°C cooler: ${base} − ${drop} = ${base - drop}°C`)
  }
  const months = rng.int(3, 5)
  const vals = Array.from({ length: months }, () => rng.int(2, 25) * 10)
  const sum = vals.reduce((a, b) => a + b, 0)
  const fix = sum % months
  vals[0] -= fix
  const mean = (sum - fix) / months
  return choiceOf(level, `A rain gauge recorded ${vals.join(' mm, ')} mm in ${months} months. What was the mean monthly rainfall?`, `${mean} mm`, [`${sum - fix} mm`, `${Math.max(...vals) - Math.min(...vals)} mm`, `${mean + 10} mm`], `Total ${sum - fix} mm ÷ ${months} = ${mean} mm`)
}

const SOC_CALC: Record<string, Generator> = {
  'j7o-maps': scaleMaker,
  'j8o-maps': contourMaker,
  'j9o-maps': pieMaker,
  'j7o-economy': tradeMaker,
  'j8o-economy': tradeMaker,
  'j9o-economy': tradeMaker,
  'j7o-weather': weatherMaker,
  'j8o-weather': weatherMaker,
  'j9o-weather': weatherMaker,
}

export const JSS_MORE_GENERATORS: Record<string, Generator> = Object.fromEntries(
  Object.entries(FACTS).map(([k, v]) => {
    const facts = factGenerator(v)
    const calc = SOC_CALC[k]
    return [k, calc ? (rng: Rng, level: Level) => (rng.next() < 0.45 ? calc(rng, level) : facts(rng, level)) : facts]
  }),
)
export const JSS_MORE_BANKS: Record<string, BankQuestion[]> = BANKS
