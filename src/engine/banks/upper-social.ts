import { An, an } from '../helpers'
// Social Studies, Grades 4–6: our county (Grade 4), Kenya (Grade 5) and East Africa
// (Grade 6). Fact tables plus written questions in the style of KPSEA's Creative Arts and
// Social Studies paper. History is told gently, for young readers. All content is original.
import { factGenerator, type FactSet } from '../facts'
import { labelOptions as opts } from '../generators/english'
import type { BankQuestion, Generator, Level } from '../types'

const t = (level: Level, prompt: string, answer: string, wrong: string[]): BankQuestion => ({ type: 'choice', level, prompt, options: opts([answer, ...wrong]), answer })

interface Topic {
  facts: FactSet
  bank: BankQuestion[]
}

const G4: Record<string, Topic> = {
  maps: {
    facts: {
      pairs: [
        {
          pairs: [
            ['the key', 'explains what the symbols on a map mean'],
            ['the compass', 'shows directions on a map'],
            ['the title', 'tells what the map is about'],
            ['the scale', 'shows how map distance compares with real distance'],
            ['the frame', 'is the border drawn around a map'],
          ],
          ask: (a) => `On a map, ${a} ___.`,
          askBack: (b) => `Which part of a map ${b}?`,
        },
        {
          pairs: [
            ['north', 'south'],
            ['east', 'west'],
            ['north-east', 'south-west'],
            ['north-west', 'south-east'],
          ],
          ask: (a) => `Which direction is opposite ${a}?`,
          askBack: (b) => `Which direction is opposite ${b}?`,
        },
        {
          pairs: [
            ['a wavy blue line', 'a river'],
            ['a cross on a building', 'a church'],
            ['a flag', 'a school'],
            ['a red cross', 'a hospital'],
            ['a line with short cross lines', 'a railway'],
            ['tufts of grass on blue lines', 'a swamp'],
          ],
          ask: (a) => `On a map, ${a} usually stands for ___.`,
          askBack: (b) => `Which symbol usually shows ${b} on a map?`,
        },
      ],
    },
    bank: [
      t(2, 'The sun rises in the ___.', 'east', ['west', 'north', 'south']),
      t(2, 'There are ___ main (cardinal) points of the compass.', 'four', ['two', 'six', 'eight']),
      t(3, 'Wanjiru faces north. Her right hand points ___.', 'east', ['west', 'south', 'north']),
      t(3, 'In the evening, a pupil faces the setting sun. The pupil is facing ___.', 'west', ['east', 'north', 'south']),
      t(4, 'A pupil faces east and turns half a turn. Which direction is the pupil now facing?', 'west', ['north', 'south', 'east']),
      t(4, 'The direction halfway between north and east is ___.', 'north-east', ['south-east', 'north-west', 'south-west']),
      t(5, 'Kibet faces south and makes a quarter turn clockwise. Which direction does he face?', 'west', ['east', 'north', 'south']),
      t(5, 'On a map, the school is north of the church and the market is east of the school. In which direction is the market from the church?', 'north-east', ['south-west', 'north-west', 'south-east']),
    ],
  },
  features: {
    facts: {
      categories: [
        { one: 'a physical (natural) feature', many: 'physical features', items: ['hill', 'river', 'lake', 'valley', 'plain', 'swamp', 'mountain'], set: 'f' },
        { one: 'a built (man-made) feature', many: 'built features', items: ['road', 'bridge', 'dam', 'railway', 'building', 'borehole'], set: 'f' },
      ],
      pairs: [
        {
          pairs: [
            ['mountain', 'very high land that rises steeply'],
            ['hill', 'raised land that is lower than a mountain'],
            ['valley', 'low land between hills or mountains'],
            ['plain', 'a large area of flat, low land'],
            ['plateau', 'a large area of high, flat land'],
            ['swamp', 'land that is soaked with water most of the time'],
            ['lake', 'a large body of water surrounded by land'],
          ],
          ask: (a) => `What is ${an(a)}?`,
          askBack: (b) => `What do we call ${b}?`,
        },
        {
          pairs: [
            ['lakes', 'fishing'],
            ['rivers', 'irrigation of crops'],
            ['mountains', 'attracting tourists'],
            ['plains', 'large-scale farming'],
            ['forests', 'timber'],
          ],
          ask: (a) => `How are ${a} useful to people?`,
          askBack: (b) => `Which feature is mainly useful for ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Water that flows in a channel from high land to low land is a ___.', 'river', ['lake', 'swamp', 'pond']),
      t(3, 'Which feature is made by people?', 'bridge', ['hill', 'valley', 'lake']),
      t(3, 'The place where a river starts is called its ___.', 'source', ['mouth', 'bank', 'bed']),
      t(4, 'The place where a river enters a lake or sea is called its ___.', 'mouth', ['source', 'valley', 'tributary']),
      t(4, 'Why do many people settle near rivers?', 'They get water for use and farming.', ['Rivers are always cold.', 'Rivers stop the rain.', 'Rivers have no fish.']),
      t(5, 'A county has a large swamp. Which is the best way to use it without harming it?', 'harvesting papyrus for crafts carefully', ['draining it to make room for houses', 'burning the plants to clear the land', 'using it as a dumping site for waste']),
      t(5, 'Which group has only physical features?', 'hill, valley, lake', ['hill, road, lake', 'bridge, dam, river', 'valley, railway, swamp']),
    ],
  },
  weather: {
    facts: {
      categories: [
        { one: 'an element of weather', many: 'elements of weather', items: ['rainfall', 'temperature', 'wind', 'sunshine', 'cloud cover'], set: 'w' },
        { one: 'a weather instrument', many: 'weather instruments', items: ['rain gauge', 'thermometer', 'wind vane', 'windsock', 'anemometer'], set: 'w2' },
        { one: 'an item that is NOT a weather instrument', many: 'items that are not weather instruments', items: ['ruler', 'compass', 'spring balance', 'clock'], set: 'w2' },
      ],
      pairs: [
        {
          pairs: [
            ['rain gauge', 'the amount of rainfall'],
            ['thermometer', 'temperature'],
            ['wind vane', 'the direction of the wind'],
            ['windsock', 'the direction and strength of the wind'],
            ['anemometer', 'the speed of the wind'],
          ],
          ask: (a) => `${An(a)} measures ___.`,
          askBack: (b) => `Which instrument measures ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'The condition of the air in a place at a particular time is called ___.', 'weather', ['climate', 'soil', 'season']),
      t(3, 'Rainfall is measured in ___.', 'millimetres', ['kilograms', 'litres per day', 'degrees']),
      t(3, 'Temperature is measured in degrees ___.', 'Celsius', ['metres', 'litres', 'grams']),
      t(4, 'Where should a rain gauge be placed?', 'in an open place away from trees and buildings', ['under a tall tree where it is shaded', 'on a roof close to the gutter', 'inside a classroom near a window']),
      t(4, 'The usual weather of a place over a long time is called ___.', 'climate', ['weather', 'temperature', 'a season']),
      t(5, 'A windsock is hanging straight out and pointing west. From which direction is the wind blowing?', 'east', ['west', 'north', 'south']),
      t(5, 'A class recorded rainfall of 12 mm, 0 mm, 8 mm and 20 mm on four days. What was the total rainfall?', '40 mm', ['20 mm', '32 mm', '28 mm']),
    ],
  },
  people: {
    facts: {
      categories: [
        { one: 'an aspect of culture', many: 'aspects of culture', items: ['language', 'food', 'dress', 'songs and dances', 'ceremonies', 'crafts'], set: 'c' },
        { one: 'a way of living in harmony in our county', many: 'ways of living in harmony', items: ['respecting other cultures', 'sharing during festivals', 'playing sports together', 'helping neighbours', 'learning other languages'], set: 'h' },
        { one: 'something that spoils harmony', many: 'things that spoil harmony', items: ['calling others bad names', 'refusing to share', 'laughing at other cultures', 'spreading rumours'], set: 'h' },
      ],
      pairs: [
        {
          pairs: [
            ['a nuclear family', 'parents and their children'],
            ['an extended family', 'parents, children and other relatives'],
            ['a single-parent family', 'one parent and the children'],
          ],
          ask: (a) => `Who makes up ${a}?`,
          askBack: (b) => `What type of family is made up of ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'A group of people living together in one area and sharing a way of life is a ___.', 'community', ['county', 'country', 'continent']),
      t(3, 'Why do communities hold cultural festivals?', 'to celebrate and pass on their culture', ['to collect taxes from the visitors', 'to choose new county leaders', 'to sell land to people from far']),
      t(3, 'Which of these is a traditional way of passing on knowledge?', 'story-telling by grandparents', ['reading emails', 'watching television', 'using a computer']),
      t(4, 'Achieng moves to a new school where most pupils speak another language. What is the best thing her classmates can do?', 'welcome her and help her learn', ['ignore her', 'laugh at her', 'refuse to play with her']),
      t(4, 'Which of these is a good cultural practice?', 'respecting elders', ['wasting food', 'mocking visitors', 'dropping litter']),
      t(5, 'Pupils from different communities cooked their traditional foods for a school culture day. What value did this teach most?', 'respect for diversity', ['greed', 'pride in fighting', 'laziness']),
    ],
  },
  resources: {
    facts: {
      categories: [
        { one: 'a natural resource', many: 'natural resources', items: ['soil', 'water', 'forests', 'minerals', 'wildlife', 'fish'], set: 'r' },
        { one: 'a man-made resource', many: 'man-made resources', items: ['roads', 'schools', 'hospitals', 'markets', 'bridges', 'dams'], set: 'r' },
      ],
      pairs: [
        {
          pairs: [
            ['farming', 'growing crops and keeping animals'],
            ['fishing', 'catching fish from lakes, rivers and the sea'],
            ['trading', 'buying and selling goods'],
            ['quarrying', 'getting building stones from the ground'],
            ['tourism', 'visitors coming to see attractions'],
            ['bee-keeping', 'keeping bees for honey'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `Which economic activity involves ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Exchanging goods for other goods without using money is called ___.', 'barter trade', ['banking', 'saving', 'borrowing']),
      t(3, 'Which is the main economic activity near a big lake?', 'fishing', ['mining', 'quarrying', 'tea growing']),
      t(3, 'Why should we use resources wisely?', 'so that they last for the future', ['so that they finish fast', 'to waste them', 'so others cannot use them']),
      t(4, 'Which problem might traders face in a market with no shade or toilets?', 'poor hygiene and spoilt goods', ['too many customers to serve', 'goods that stay fresh too long', 'prices that are always too low']),
      t(4, 'A farmer sells milk to buy school uniforms. This shows that farming provides ___.', 'income', ['soil', 'rain', 'transport']),
      t(5, 'Which group has only natural resources?', 'forests, water, minerals', ['roads, water, forests', 'schools, soil, fish', 'dams, wildlife, markets']),
    ],
  },
  transport: {
    facts: {
      categories: [
        { one: 'a means of road transport', many: 'means of road transport', items: ['matatu', 'bus', 'motorbike (boda boda)', 'lorry', 'bicycle', 'car'], set: 't' },
        { one: 'a means of water transport', many: 'means of water transport', items: ['boat', 'ship', 'ferry', 'canoe', 'dhow'], set: 't' },
        { one: 'a means of air transport', many: 'means of air transport', items: ['aeroplane', 'helicopter', 'hot-air balloon'], set: 't' },
        { one: 'a modern means of communication', many: 'modern means of communication', items: ['mobile phone', 'radio', 'television', 'internet', 'newspaper'], set: 'c' },
        { one: 'a traditional means of communication', many: 'traditional means of communication', items: ['drum beats', 'smoke signals', 'horn blowing', 'messengers', 'whistling'], set: 'c' },
      ],
      pairs: [
        {
          pairs: [
            ['red', 'stop'],
            ['amber', 'get ready'],
            ['green', 'go'],
          ],
          ask: (a) => `At a traffic light, ${a} means ___.`,
          askBack: (b) => `Which traffic light colour means "${b}"?`,
        },
      ],
    },
    bank: [
      t(2, 'People should cross the road at a ___.', 'zebra crossing', ['bend', 'roundabout', 'bus stop']),
      t(3, 'Which is the fastest means of transport?', 'air transport', ['road transport', 'water transport', 'walking']),
      t(3, 'Which means of transport is best for carrying heavy goods across the ocean?', 'ship', ['bicycle', 'aeroplane', 'matatu']),
      t(4, 'Why should a boda boda passenger wear a helmet?', 'to protect the head in case of an accident', ['to keep the sun and rain off the hair', 'to hear the rider more clearly', 'to look smart in front of others']),
      t(4, 'Which means of communication lets many people get news at the same time?', 'radio', ['letter', 'messenger', 'whisper']),
      t(5, 'A farmer in a village wants to sell fresh milk quickly in town 10 km away. Which is the best means of transport?', 'a motorbike', ['a ship', 'an aeroplane', 'walking slowly']),
    ],
  },
  governance: {
    facts: {
      categories: [
        { one: 'a service of the county government', many: 'services of the county government', items: ['county roads', 'health centres', 'early childhood education (ECDE)', 'markets', 'water supply', 'garbage collection'], set: 's' },
        { one: 'a service of the national government', many: 'services of the national government', items: ['defence', 'foreign affairs', 'national police', 'immigration', 'universities'], set: 's' },
      ],
      pairs: [
        {
          pairs: [
            ['the governor', 'is the head of the county government'],
            ['the deputy governor', 'helps the governor and acts when the governor is away'],
            ['members of the county assembly (MCAs)', 'make laws for the county'],
            ['the speaker of the county assembly', 'chairs meetings of the county assembly'],
            ['the county commissioner', 'represents the national government in the county'],
          ],
          ask: (a) => `In a county, ${a} ___.`,
          askBack: (b) => `Who ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Kenya has ___ counties.', '47', ['8', '42', '52']),
      t(3, 'The head of a county government is the ___.', 'governor', ['president', 'chief', 'speaker']),
      t(3, 'The person elected to represent a ward in the county assembly is the ___.', 'MCA', ['governor', 'senator', 'chief']),
      t(4, 'A ward has no health centre. Which government should build one?', 'the county government', ['a neighbouring country', 'the school', 'a private bank']),
      t(4, 'Why do counties collect fees from market traders?', 'to pay for county services', ['to stop trade', 'to punish traders', 'to close markets']),
      t(5, 'Which leader is elected by the people of the whole county?', 'the governor', ['the MCA', 'the chief', 'the head teacher']),
    ],
  },
  citizenship: {
    facts: {
      categories: [
        { one: 'a right of a child', many: 'rights of a child', items: ['education', 'food', 'shelter', 'health care', 'play', 'a name and nationality', 'protection'], set: 'r' },
        { one: 'a responsibility of a child', many: 'responsibilities of a child', items: ['obeying parents', 'doing homework', 'keeping clean', 'respecting others', 'helping at home'], set: 'r' },
        { one: 'a national symbol of Kenya', many: 'national symbols of Kenya', items: ['the national flag', 'the national anthem', 'the coat of arms', 'the public seal'], set: 's' },
      ],
      pairs: [
        {
          pairs: [
            ['black', 'the people of Kenya'],
            ['red', 'the sacrifices made for freedom'],
            ['green', 'the land and its natural wealth'],
            ['white', 'peace and honesty'],
          ],
          ask: (a) => `On the Kenyan flag, ${a} stands for ___.`,
          askBack: (b) => `Which colour on the Kenyan flag stands for ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'The national anthem is sung while standing ___.', 'upright and still', ['sitting down', 'running', 'dancing']),
      t(3, 'If a child is being mistreated, they can get help by calling the free child helpline ___.', '116', ['999', '100', '911']),
      t(3, 'Which shows good citizenship?', 'taking care of public property', ['writing on school walls', 'breaking desks', 'littering']),
      t(4, 'A child is not allowed to go to school and is made to work all day. Which right is being denied?', 'the right to education', ['the right to a name', 'the right to food', 'the right to play only']),
      t(4, 'Every right comes with a ___.', 'responsibility', ['prize', 'holiday', 'punishment']),
      t(5, 'Which national symbol is used to stamp important government documents?', 'the public seal', ['the national flag', 'the national anthem', 'the coat of arms only on coins']),
    ],
  },
}

const G5: Record<string, Topic> = {
  maps: {
    facts: {
      pairs: [
        {
          pairs: [
            ['Tanzania', 'south'],
            ['Uganda', 'west'],
            ['South Sudan', 'north-west'],
            ['Ethiopia', 'north'],
            ['Somalia', 'east'],
          ],
          ask: (a) => `In which direction is ${a} from Kenya?`,
          askBack: (b) => `Which neighbouring country is to the ${b} of Kenya?`,
        },
        {
          pairs: [
            ['Mombasa', 'on the coast of the Indian Ocean'],
            ['Kisumu', 'on the shores of Lake Victoria'],
            ['Nairobi', 'the capital city of Kenya'],
            ['Nakuru', 'next to Lake Nakuru in the Rift Valley'],
            ['Garissa', 'on the banks of River Tana in the north-east'],
            ['Nanyuki', 'close to where the equator crosses Mount Kenya\'s foothills'],
          ],
          ask: (a) => `Which describes the location of ${a}?`,
          askBack: (b) => `Which town is ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Kenya is found in ___ Africa.', 'East', ['West', 'North', 'Southern']),
      t(2, 'The imaginary line that divides Kenya into two almost equal parts is the ___.', 'equator', ['Tropic of Cancer', 'prime meridian', 'border']),
      t(3, 'Which ocean borders Kenya?', 'the Indian Ocean', ['the Atlantic Ocean', 'the Pacific Ocean', 'the Arctic Ocean']),
      t(3, 'How many countries share a border with Kenya?', 'five', ['three', 'four', 'seven']),
      t(4, 'Lines drawn on a map from east to west are called lines of ___.', 'latitude', ['longitude', 'contour', 'boundary']),
      t(4, 'The equator is at latitude ___.', '0°', ['90°N', '45°S', '180°']),
      t(5, 'On a map with a scale of 1 cm to 20 km, two towns are 6 cm apart. What is the real distance?', '120 km', ['26 km', '60 km', '200 km']),
      t(5, 'Kenya lies roughly between latitudes ___.', '5°N and 5°S', ['20°N and 20°S', '0° and 30°N', '10°S and 30°S']),
    ],
  },
  features: {
    facts: {
      categories: [
        { one: 'a freshwater lake in Kenya', many: 'freshwater lakes in Kenya', items: ['Lake Naivasha', 'Lake Baringo', 'Lake Victoria'], set: 'l' },
        { one: 'a salty (alkaline) lake in Kenya', many: 'salty lakes in Kenya', items: ['Lake Nakuru', 'Lake Magadi', 'Lake Bogoria', 'Lake Elmenteita'], set: 'l' },
        { one: 'a mountain in Kenya', many: 'mountains in Kenya', items: ['Mount Kenya', 'Mount Elgon', 'Mount Longonot', 'Mount Marsabit'], set: 'f' },
        { one: 'a river in Kenya', many: 'rivers in Kenya', items: ['River Tana', 'River Athi', 'River Nzoia', 'River Yala', 'River Ewaso Ng\'iro'], set: 'f' },
      ],
      pairs: [
        {
          pairs: [
            ['Mount Kenya', 'the highest mountain in Kenya'],
            ['River Tana', 'the longest river in Kenya'],
            ['Lake Victoria', 'the largest lake shared by Kenya, Uganda and Tanzania'],
            ['Lake Turkana', 'the largest lake found wholly in Kenya'],
            ['Lake Bogoria', 'a lake famous for its hot springs and geysers'],
            ['Lake Magadi', 'a lake where soda ash is mined'],
          ],
          ask: (a) => `${a} is known as ___.`,
          askBack: (b) => `Which is ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'The long, deep valley that runs across Kenya from north to south is the ___.', 'Great Rift Valley', ['Kerio Valley', 'Nile Valley', 'Yatta Plateau']),
      t(3, 'Which lake is famous for flamingos?', 'Lake Nakuru', ['Lake Victoria', 'Lake Naivasha', 'Lake Jipe']),
      t(3, 'Mount Kenya is about ___ metres high.', '5,199', ['1,199', '2,500', '8,848']),
      t(4, 'Why is Lake Naivasha used for irrigating flower farms but Lake Magadi is not?', 'Naivasha has fresh water; Magadi is salty.', ['Magadi has no water during any season.', 'Naivasha is salty; Magadi has fresh water.', 'Magadi is too deep for pumps to reach.']),
      t(4, 'River Tana flows into the ___.', 'Indian Ocean', ['Lake Victoria', 'Lake Turkana', 'Mediterranean Sea']),
      t(5, 'Which feature helps Kenya produce hydroelectric power?', 'River Tana and its dams', ['Lake Magadi', 'the Chalbi Desert', 'the Indian Ocean beaches']),
      t(5, 'Why are the slopes of Mount Kenya densely settled?', 'They have fertile soils and reliable rainfall.', ['They are covered in snow all year round.', 'They are hot and dry with sandy soils.', 'They have no forests, so land is cheap.']),
    ],
  },
  weather: {
    facts: {
      categories: [
        { one: 'a factor that affects climate', many: 'factors that affect climate', items: ['altitude (height above sea level)', 'distance from the sea', 'winds', 'relief (shape of the land)', 'forests'], set: 'f' },
        { one: 'an effect of drought', many: 'effects of drought', items: ['crops dry up', 'shortage of water', 'animals lack pasture', 'food shortage'], set: 'e' },
        { one: 'an effect of floods', many: 'effects of floods', items: ['homes are washed away', 'roads are cut off', 'crops are swept away', 'water-borne diseases spread'], set: 'e' },
      ],
      pairs: [
        {
          pairs: [
            ['the Kenya highlands', 'cool and wet'],
            ['the coastal strip', 'hot and humid'],
            ['northern and north-eastern Kenya', 'hot and dry'],
            ['the Lake Victoria basin', 'hot and wet'],
          ],
          ask: (a) => `What is the climate of ${a} like?`,
          askBack: (b) => `Which region of Kenya has ${an(b)} climate?`,
        },
        {
          pairs: [
            ['the long rains', 'March to May'],
            ['the short rains', 'October to December'],
          ],
          ask: (a) => `In most of Kenya, ${a} fall from ___.`,
          askBack: (b) => `Which rains fall from ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'The higher you go up a mountain, the ___ it becomes.', 'colder', ['hotter', 'drier always', 'flatter']),
      t(3, 'Which economic activity suits the hot, dry north of Kenya?', 'nomadic pastoralism', ['tea growing', 'rice growing', 'dairy farming']),
      t(3, 'Rain that forms when moist air rises over mountains is called ___ rainfall.', 'relief', ['convectional', 'cyclonic', 'acid']),
      t(4, 'Why does the windward side of a mountain get more rain than the leeward side?', 'Moist air rises and cools on the windward side.', ['The leeward side has more trees.', 'The windward side is lower.', 'The sun shines more on the windward side.']),
      t(4, 'Why is Nairobi cooler than Mombasa even though both are near the equator?', 'Nairobi is at a higher altitude.', ['Nairobi is near the sea.', 'Mombasa is in the highlands.', 'Nairobi has no sun.']),
      t(5, 'Which is the best way for farmers in a semi-arid area to cope with unreliable rain?', 'plant drought-resistant crops and harvest water', ['plant rice in the dry season', 'cut down trees for charcoal', 'keep more animals than the land can feed']),
    ],
  },
  people: {
    facts: {
      categories: [
        { one: 'a Bantu community', many: 'Bantu communities', items: ['Agikuyu', 'Luhya', 'Akamba', 'Abagusii', 'Ameru', 'Mijikenda', 'Aembu'], set: 'g' },
        { one: 'a Nilotic community', many: 'Nilotic communities', items: ['Luo', 'Kalenjin', 'Maasai', 'Turkana', 'Samburu', 'Iteso'], set: 'g' },
        { one: 'a Cushitic community', many: 'Cushitic communities', items: ['Somali', 'Borana', 'Rendille', 'Gabra', 'Orma'], set: 'g' },
      ],
      pairs: [
        {
          pairs: [
            ['the Bantu', 'the Congo basin in Central Africa'],
            ['the River-Lake Nilotes', 'the Nile valley in South Sudan'],
            ['the Cushites', 'Ethiopia and the Horn of Africa'],
          ],
          ask: (a) => `Where did ${a} migrate from?`,
          askBack: (b) => `Which group migrated into Kenya from ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Communities that speak related languages form a ___.', 'language group', ['county', 'family', 'school']),
      t(3, 'The largest language group in Kenya is the ___.', 'Bantu', ['Cushites', 'Nilotes', 'Arabs']),
      t(3, 'Which community is mainly found along the Kenyan coast?', 'Mijikenda', ['Turkana', 'Kalenjin', 'Borana']),
      t(4, 'Why did many Cushitic communities keep camels?', 'Camels survive long without water in dry areas.', ['Camels give more wool than sheep and goats.', 'Camels can live in cold and wet highlands.', 'Camels can be used to catch fish in lakes.']),
      t(4, 'Which is a reason communities migrated long ago?', 'looking for land and pasture', ['to visit shopping malls', 'to board trains', 'to attend universities']),
      t(5, 'Which practice best promotes unity among the many communities of Kenya?', 'national celebrations and sports that bring people together', ['each community keeping its own schools and markets apart', 'using only the local language in all public places', 'choosing leaders only from one\'s own community']),
    ],
  },
  history: {
    facts: {
      categories: [
        { one: 'a source of historical information', many: 'sources of historical information', items: ['oral traditions', 'archaeology', 'written records', 'artefacts in museums', 'old photographs'], set: 'h' },
        { one: 'a way early people lived', many: 'ways early people lived', items: ['gathering wild fruits', 'hunting with stone tools', 'living in caves', 'making fire by rubbing sticks', 'wearing animal skins'], set: 'h' },
      ],
      pairs: [
        {
          pairs: [
            ['Olorgesailie', 'Kajiado'],
            ['Koobi Fora', 'the eastern shore of Lake Turkana'],
            ['Hyrax Hill', 'Nakuru'],
            ['Gede ruins', 'Kilifi'],
            ['Thimlich Ohinga', 'Migori'],
            ['Fort Jesus', 'Mombasa'],
          ],
          ask: (a) => `Where is the historical site of ${a}?`,
          askBack: (b) => `Which historical site is found in ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'The study of past events is called ___.', 'history', ['geography', 'science', 'music']),
      t(3, 'The study of remains and tools left by early people is called ___.', 'archaeology', ['astronomy', 'biology', 'geology']),
      t(3, 'Thimlich Ohinga is famous for its ___.', 'stone walls built without mortar', ['tall glass towers', 'railway station', 'cave paintings of cars']),
      t(4, 'Why was the discovery of fire important to early people?', 'They could cook food, keep warm and scare wild animals away.', ['They could melt iron and build large stone cities at once.', 'They could send messages to people in far places.', 'They could grow crops without any rainfall.']),
      t(4, 'Fort Jesus in Mombasa was built by the ___.', 'Portuguese', ['British', 'Chinese', 'Egyptians']),
      t(5, 'A historian listens to elders telling stories of their community\'s past. Which source is the historian using?', 'oral traditions', ['archaeology', 'written records', 'the internet']),
      t(5, 'Why are sites like Olorgesailie protected by the National Museums of Kenya?', 'They hold tools and remains that teach us about early people.', ['They are large farms that grow food for the whole county.', 'They are busy markets where traders sell old tools.', 'They are new towns built for workers at the museums.']),
    ],
  },
  resources: {
    facts: {
      categories: [
        { one: 'a mineral mined in Kenya', many: 'minerals mined in Kenya', items: ['soda ash', 'fluorspar', 'limestone', 'titanium', 'diatomite', 'salt'], set: 'r' },
        { one: 'a cash crop grown in Kenya', many: 'cash crops grown in Kenya', items: ['tea', 'coffee', 'sugarcane', 'pyrethrum', 'cut flowers', 'avocado'], set: 'r' },
      ],
      pairs: [
        {
          pairs: [
            ['soda ash', 'Lake Magadi'],
            ['fluorspar', 'Kerio Valley'],
            ['titanium', 'Kwale'],
            ['limestone for cement', 'Bamburi near Mombasa'],
            ['diatomite', 'Kariandusi'],
            ['salt', 'the coast near Malindi'],
          ],
          ask: (a) => `Where in Kenya is ${a} mined?`,
          askBack: (b) => `Which mineral is mined at ${b}?`,
        },
        {
          pairs: [
            ['tea', 'Kericho'],
            ['sugarcane', 'Kakamega and Kisumu'],
            ['wheat', 'Narok and Uasin Gishu'],
            ['cut flowers', 'around Lake Naivasha'],
          ],
          ask: (a) => `Which area of Kenya is well known for growing ${a}?`,
          askBack: (b) => `Which crop is well known in ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Kenya\'s leading export crop is ___.', 'tea', ['maize', 'beans', 'rice']),
      t(3, 'Which fish is caught in large numbers in Lake Victoria?', 'Nile perch', ['salmon', 'tuna', 'cod']),
      t(3, 'Why do tourists visit Kenya?', 'to see wildlife, beaches and culture', ['to mine gold and other minerals', 'to build dams across the rivers', 'to grow tea on the highlands']),
      t(4, 'Why does tea grow well in Kericho?', 'It has high rainfall, cool temperatures and deep soils.', ['It is hot and dry with sandy soils and little rain.', 'It is near the sea, so the air is warm and salty.', 'It has flat land that floods every rainy season.']),
      t(4, 'Soda ash from Lake Magadi is mainly used to make ___.', 'glass', ['bread', 'clothes', 'paper']),
      t(5, 'Which is a problem facing fishing in Lake Victoria?', 'water hyacinth blocking boats and landing beaches', ['the lake freezing over during the cold season', 'the lake drying up completely every few years', 'too many fish for the fishermen to catch']),
    ],
  },
  transport: {
    facts: {
      categories: [
        { one: 'a means of mass communication', many: 'means of mass communication', items: ['radio', 'television', 'newspapers', 'social media', 'billboards'], set: 'c' },
        { one: 'a means of personal communication', many: 'means of personal communication', items: ['phone call', 'letter', 'text message', 'email'], set: 'c' },
      ],
      pairs: [
        {
          pairs: [
            ['the Standard Gauge Railway (SGR)', 'a railway linking Mombasa and Nairobi'],
            ['Jomo Kenyatta International Airport', 'the main international airport, in Nairobi'],
            ['the Port of Mombasa', 'the main sea port of Kenya'],
            ['Kisumu Port', 'a port on Lake Victoria'],
            ['the oil pipeline', 'carries petroleum from Mombasa inland'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `What is ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Sending money through a mobile phone is called mobile ___.', 'money transfer', ['farming', 'mining', 'printing']),
      t(3, 'Which is the cheapest way to move large amounts of oil inland?', 'pipeline', ['aeroplane', 'motorbike', 'bicycle']),
      t(3, 'Which is an advantage of air transport?', 'It is the fastest over long distances.', ['It is the cheapest.', 'It can carry the heaviest loads.', 'It needs no airports.']),
      t(4, 'Why was the SGR built?', 'to move goods and people faster and reduce traffic on roads', ['to carry only tourists between the national parks', 'to replace every road between Mombasa and Nairobi', 'to stop trucks from carrying goods to Uganda']),
      t(4, 'Which is a disadvantage of water transport?', 'It is slow.', ['It carries heavy goods.', 'It is cheap.', 'It does not need roads.']),
      t(5, 'Which development has most improved communication in rural Kenya?', 'mobile phones and network coverage', ['letters sent through the post office', 'drums and smoke signals', 'public notice boards in markets']),
    ],
  },
  governance: {
    facts: {
      categories: [
        { one: 'a part of the executive', many: 'parts of the executive', items: ['the President', 'the Deputy President', 'Cabinet Secretaries', 'the Attorney General'], set: 'a' },
        { one: 'a part of Parliament', many: 'parts of Parliament', items: ['the National Assembly', 'the Senate', 'the Speaker', 'Members of Parliament'], set: 'a' },
        { one: 'a part of the judiciary', many: 'parts of the judiciary', items: ['the Supreme Court', 'the Court of Appeal', 'the High Court', 'the Chief Justice', 'magistrates\' courts'], set: 'a' },
      ],
      pairs: [
        {
          pairs: [
            ['the executive', 'carries out laws and runs the government'],
            ['Parliament (the legislature)', 'makes laws'],
            ['the judiciary', 'interprets laws and settles disputes in courts'],
          ],
          ask: (a) => `What does ${a} do?`,
          askBack: (b) => `Which arm of government ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'The national government has ___ arms.', 'three', ['two', 'four', 'five']),
      t(3, 'The head of state in Kenya is the ___.', 'President', ['Chief Justice', 'Speaker', 'Governor']),
      t(3, 'The highest court in Kenya is the ___.', 'Supreme Court', ['High Court', 'Court of Appeal', 'magistrate\'s court']),
      t(4, 'The head of the judiciary in Kenya is the ___.', 'Chief Justice', ['President', 'Attorney General', 'Speaker']),
      t(4, 'The current Constitution of Kenya was promulgated in ___.', '2010', ['1963', '1992', '2002']),
      t(5, 'A new law on school safety is proposed. Which arm of government debates and passes it?', 'Parliament', ['the judiciary', 'the police', 'the county assembly only']),
    ],
  },
  citizenship: {
    facts: {
      categories: [
        { one: 'a national value', many: 'national values', items: ['patriotism', 'national unity', 'integrity', 'human dignity', 'social justice', 'transparency'], set: 'v' },
        { one: 'a duty of a good citizen', many: 'duties of a good citizen', items: ['paying taxes', 'voting in elections', 'obeying the law', 'protecting the environment', 'taking part in community work'], set: 'v' },
      ],
      pairs: [
        {
          pairs: [
            ['Madaraka Day', '1st June'],
            ['Mashujaa Day', '20th October'],
            ['Jamhuri Day', '12th December'],
            ['Labour Day', '1st May'],
          ],
          ask: (a) => `${a} is celebrated on ___.`,
          askBack: (b) => `Which national holiday is celebrated on ${b}?`,
        },
        {
          pairs: [
            ['Madaraka Day', 'Kenya getting self-government in 1963'],
            ['Mashujaa Day', 'honouring Kenya\'s heroes and heroines'],
            ['Jamhuri Day', 'Kenya\'s independence and becoming a republic'],
          ],
          ask: (a) => `What does ${a} celebrate?`,
          askBack: (b) => `Which holiday celebrates ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Loving and being loyal to your country is called ___.', 'patriotism', ['corruption', 'tribalism', 'greed']),
      t(3, 'Which document has the supreme law of Kenya?', 'the Constitution', ['a newspaper', 'a school timetable', 'a storybook']),
      t(3, 'Which identity card is given to Kenyans aged 18 and above?', 'the national identity card', ['a library card', 'a birth certificate', 'a school badge']),
      t(4, 'Which is a responsibility of every citizen?', 'paying taxes and obeying the law', ['damaging public property', 'avoiding voting forever', 'refusing to help others']),
      t(4, 'Which shows integrity?', 'returning extra change given by mistake', ['keeping extra change if no one notices', 'copying a friend\'s work in an exam', 'telling a small lie to win a game']),
      t(5, 'A learner sees classmates excluding a pupil from another community. Which national value should guide the learner?', 'national unity', ['transparency', 'devolution', 'sustainable development']),
    ],
  },
}

const G6: Record<string, Topic> = {
  maps: {
    facts: {
      pairs: [
        {
          pairs: [
            ['Kenya', 'Nairobi'],
            ['Uganda', 'Kampala'],
            ['Tanzania', 'Dodoma'],
            ['Rwanda', 'Kigali'],
            ['Burundi', 'Gitega'],
            ['South Sudan', 'Juba'],
            ['Somalia', 'Mogadishu'],
            ['the Democratic Republic of Congo', 'Kinshasa'],
          ],
          ask: (a) => `What is the capital city of ${a}?`,
          askBack: (b) => `${b} is the capital city of ___.`,
        },
      ],
      categories: [
        { one: 'a landlocked country in East Africa', many: 'landlocked countries in East Africa', items: ['Uganda', 'Rwanda', 'Burundi', 'South Sudan'], set: 'l' },
        { one: 'an East African country with a coastline', many: 'East African countries with a coastline', items: ['Kenya', 'Tanzania', 'Somalia'], set: 'l' },
      ],
    },
    bank: [
      t(2, 'A country with no coastline is called a ___ country.', 'landlocked', ['island', 'coastal', 'desert']),
      t(3, 'Which country lies to the south of Kenya?', 'Tanzania', ['Uganda', 'Ethiopia', 'South Sudan']),
      t(3, 'Zanzibar is an island that is part of ___.', 'Tanzania', ['Kenya', 'Somalia', 'Uganda']),
      t(4, 'Why do landlocked countries like Uganda depend on Kenya\'s ports?', 'They have no sea ports of their own.', ['They have too many ports.', 'Their ports are frozen.', 'They do not trade.']),
      t(4, 'On a map, a scale of 1 cm to 50 km is used. Two capitals are 8 cm apart. What is the real distance?', '400 km', ['58 km', '80 km', '4,000 km']),
      t(5, 'The real distance between two towns is 250 km. On a map they are 5 cm apart. What is the scale?', '1 cm to 50 km', ['1 cm to 5 km', '1 cm to 25 km', '1 cm to 500 km']),
      t(5, 'The headquarters of the East African Community is in ___.', 'Arusha', ['Nairobi', 'Kampala', 'Kigali']),
    ],
  },
  features: {
    facts: {
      pairs: [
        {
          pairs: [
            ['Mount Kilimanjaro', 'the highest mountain in Africa, in Tanzania'],
            ['Lake Victoria', 'the largest lake in Africa'],
            ['Lake Tanganyika', 'the deepest lake in Africa'],
            ['the Rwenzori Mountains', 'snow-capped mountains on the Uganda–DRC border'],
            ['River Nile', 'the longest river in the world, flowing out of Lake Victoria at Jinja'],
            ['Mount Elgon', 'an old volcano on the Kenya–Uganda border'],
          ],
          ask: (a) => `Which describes ${a}?`,
          askBack: (b) => `Which feature is ${b}?`,
        },
      ],
      categories: [
        { one: 'a lake in the Rift Valley', many: 'Rift Valley lakes', items: ['Lake Tanganyika', 'Lake Turkana', 'Lake Naivasha', 'Lake Albert', 'Lake Kivu'], set: 'l' },
        { one: 'a lake NOT in the Rift Valley', many: 'lakes outside the Rift Valley', items: ['Lake Victoria', 'Lake Kyoga', 'Lake Jipe'], set: 'l' },
      ],
    },
    bank: [
      t(2, 'The highest mountain in East Africa is ___.', 'Mount Kilimanjaro', ['Mount Kenya', 'Mount Elgon', 'Mount Meru']),
      t(3, 'Lake Victoria is shared by Kenya, Uganda and ___.', 'Tanzania', ['Rwanda', 'Somalia', 'Ethiopia']),
      t(3, 'The River Nile flows northwards into the ___.', 'Mediterranean Sea', ['Indian Ocean', 'Lake Turkana', 'Red Sea']),
      t(4, 'Why does Mount Kilimanjaro have snow even though it is near the equator?', 'Its peak is very high, where it is very cold.', ['It is near the sea.', 'It is a desert.', 'Snow falls everywhere in Tanzania.']),
      t(4, 'Which feature was formed by faulting and is the home of many lakes in East Africa?', 'the Great Rift Valley', ['the Serengeti plains', 'the coastal plain', 'the Lake Victoria basin']),
      t(5, 'How does Lake Victoria benefit the countries around it?', 'fishing, transport and water for irrigation and power', ['salt mining, tea growing and snow for tourists', 'desert tourism, camel trade and oil drilling', 'timber logging, coal mining and gold panning']),
    ],
  },
  weather: {
    facts: {
      pairs: [
        {
          pairs: [
            ['tropical rainforest', 'Kakamega Forest'],
            ['savannah grassland', 'the Serengeti and Maasai Mara'],
            ['desert and semi-desert', 'the Chalbi Desert in northern Kenya'],
            ['mangrove forest', 'the coast near Lamu'],
            ['mountain (montane) forest', 'the slopes of Mount Kenya'],
          ],
          ask: (a) => `Where in East Africa is ${a} found?`,
          askBack: (b) => `What kind of natural vegetation is found in ${b}?`,
        },
        {
          pairs: [
            ['tropical rainforest', 'tall evergreen trees and thick undergrowth'],
            ['savannah grassland', 'tall grass with scattered trees such as acacia'],
            ['desert and semi-desert', 'thorny bushes and plants that store water'],
            ['mangrove forest', 'trees with breathing roots growing in salty swamps'],
          ],
          ask: (a) => `What does ${a} look like?`,
          askBack: (b) => `Which vegetation has ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Plants that grow on their own without being planted by people are called ___ vegetation.', 'natural', ['planted', 'artificial', 'cultivated']),
      t(3, 'Which vegetation covers the largest part of East Africa?', 'savannah grassland', ['tropical rainforest', 'mangrove forest', 'snow fields']),
      t(3, 'Why do desert plants have small, thorny leaves?', 'to reduce water loss', ['to attract rain', 'to grow faster', 'to make shade']),
      t(4, 'Why is the savannah good for wildlife tourism?', 'Large herds of grazing animals live there.', ['It has no animals.', 'It is covered by thick forest.', 'It is always flooded.']),
      t(4, 'Mangrove trees are useful because they ___.', 'protect the coastline and provide breeding places for fish', ['grow well in deserts and provide shade for camels', 'produce tea and coffee for export from the coast', 'cause floods that bring fertile soil to the coast']),
      t(5, 'Which human activity is the biggest threat to rainforests like Kakamega?', 'clearing trees for farming and timber', ['research by students and scientists', 'bird watching and nature walks', 'planting new trees in cleared areas']),
    ],
  },
  people: {
    facts: {
      categories: [
        { one: 'a densely populated area of Kenya', many: 'densely populated areas', items: ['Nairobi', 'the central highlands', 'the Lake Victoria basin', 'Mombasa'], set: 'd' },
        { one: 'a sparsely populated area of Kenya', many: 'sparsely populated areas', items: ['Turkana', 'Marsabit', 'Wajir', 'Mandera'], set: 'd' },
        { one: 'a cause of rural–urban migration', many: 'causes of rural–urban migration', items: ['looking for jobs', 'better schools', 'better hospitals', 'electricity and water', 'business chances'], set: 'm' },
        { one: 'an effect of rural–urban migration on towns', many: 'effects on towns', items: ['traffic jams', 'growth of informal settlements', 'shortage of housing', 'pressure on water and sewer services'], set: 'm' },
      ],
      pairs: [
        {
          pairs: [
            ['a census', 'counting all the people in a country'],
            ['population density', 'the number of people living in one square kilometre'],
            ['migration', 'the movement of people from one place to another'],
            ['a refugee', 'a person who leaves their country to seek safety'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `What is ${b} called?`,
        },
      ],
    },
    bank: [
      t(2, 'In Kenya, a national census is carried out every ___ years.', '10', ['2', '5', '20']),
      t(3, 'Why are the central highlands densely populated?', 'They have fertile soils and reliable rainfall.', ['They are hot, dry and covered with sand.', 'They have deserts that attract many tourists.', 'They have no hills, so building is easy.']),
      t(3, 'Why do few people live in northern Kenya?', 'It is hot and dry with little rainfall.', ['It is too cold and snowy.', 'It has too many cities.', 'It is under water.']),
      t(4, 'A county has 600,000 people and an area of 3,000 km². What is its population density?', '200 people per km²', ['2,000 people per km²', '20 people per km²', '600 people per km²']),
      t(4, 'Why does a government carry out a census?', 'to plan for schools, hospitals and other services', ['to count the animals in every national park', 'to collect taxes from each household at once', 'to decide which schools should be closed']),
      t(5, 'Which would best reduce rural–urban migration?', 'creating jobs and services in rural areas', ['building more houses in town slums', 'closing schools in the rural areas', 'raising bus fares to the big towns']),
    ],
  },
  history: {
    facts: {
      pairs: [
        {
          pairs: [
            ['Mekatilili wa Menza', 'led the Giriama in resisting colonial rule'],
            ['Koitalel arap Samoei', 'led the Nandi in resisting the building of the railway'],
            ['Dedan Kimathi', 'was a leader in the Mau Mau freedom struggle'],
            ['Jomo Kenyatta', 'became the first President of Kenya'],
            ['Wangari Maathai', 'won the Nobel Peace Prize for planting trees and caring for the environment'],
            ['Tom Mboya', 'was a trade union leader who helped many students study abroad'],
          ],
          ask: (a) => `What is ${a} remembered for?`,
          askBack: (b) => `Which Kenyan hero or heroine ${b}?`,
        },
        {
          pairs: [
            ['1895', 'Kenya became a British protectorate'],
            ['1901', 'the Uganda Railway reached Kisumu'],
            ['1963', 'Kenya became independent'],
            ['1964', 'Kenya became a republic'],
            ['2010', 'Kenya got a new constitution'],
          ],
          ask: (a) => `What happened in ${a}?`,
          askBack: (b) => `In which year ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Kenya got its independence on 12th December ___.', '1963', ['1945', '1973', '2010']),
      t(3, 'The railway built from Mombasa towards Uganda was called the ___.', 'Uganda Railway', ['SGR', 'Tanzam Railway', 'Nile Railway']),
      t(3, 'Kenya was ruled as a colony by ___.', 'Britain', ['France', 'Portugal', 'Germany']),
      t(4, 'Why did the British build the Uganda Railway?', 'to transport goods and people to and from the interior', ['to carry only tourists to the game parks on the coast', 'to link Kenya directly by land with Britain in Europe', 'to replace all the ships at the port of Mombasa']),
      t(4, 'The talks in London that prepared Kenya for independence were the ___ conferences.', 'Lancaster House', ['Berlin', 'Arusha', 'Geneva']),
      t(5, 'Why do Kenyans celebrate Mashujaa Day?', 'to honour people who helped Kenya gain freedom and build the nation', ['to celebrate the end of the harvest season in every county', 'to mark the start of the long rains in March each year', 'to remember the day the new constitution was written']),
      t(5, 'What is Wangari Maathai\'s Green Belt Movement best known for?', 'planting millions of trees', ['building railways', 'mining gold', 'making films']),
    ],
  },
  resources: {
    facts: {
      pairs: [
        {
          pairs: [
            ['tanzanite', 'Tanzania'],
            ['coffee as the main export', 'Uganda'],
            ['mountain gorilla tourism', 'Rwanda'],
            ['cobalt and copper', 'the Democratic Republic of Congo'],
            ['tea and cut flowers as top exports', 'Kenya'],
          ],
          ask: (a) => `Which country is well known for ${a}?`,
          askBack: (b) => `${b} is well known for ___.`,
        },
        {
          pairs: [
            ['Olkaria', 'geothermal power'],
            ['Owen Falls (Nalubaale) at Jinja', 'hydroelectric power'],
            ['Lake Turkana wind farm', 'wind power'],
            ['Garissa solar plant', 'solar power'],
          ],
          ask: (a) => `What kind of power is produced at ${a}?`,
          askBack: (b) => `Which place produces ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Selling goods to other countries is called ___.', 'exporting', ['importing', 'saving', 'mining']),
      t(3, 'Geothermal power is produced using ___.', 'steam from hot rocks underground', ['water falling over a high dam', 'wind turning large blades', 'sunlight falling on panels']),
      t(3, 'Which economic activity earns Kenya money from visitors?', 'tourism', ['mining', 'fishing', 'forestry']),
      t(4, 'Why is geothermal power good for the environment?', 'It is renewable and does not burn fuel.', ['It burns coal.', 'It causes floods.', 'It uses a lot of firewood.']),
      t(4, 'Which industry depends most on Lake Victoria?', 'fish processing', ['tea processing', 'cement making', 'sisal processing']),
      t(5, 'Which is the best way for East African countries to earn more from their crops?', 'processing them into finished goods before export', ['exporting all crops raw as soon as they are harvested', 'growing only one crop on all the farms in the region', 'storing crops for many years before selling them']),
    ],
  },
  transport: {
    facts: {
      categories: [
        { one: 'an East African sea port', many: 'East African sea ports', items: ['Mombasa', 'Dar es Salaam', 'Lamu', 'Tanga', 'Mogadishu'], set: 'p' },
        { one: 'a port on Lake Victoria', many: 'ports on Lake Victoria', items: ['Kisumu', 'Mwanza', 'Port Bell', 'Musoma', 'Bukoba'], set: 'p' },
        { one: 'a benefit of the East African Community', many: 'benefits of the East African Community', items: ['wider markets for goods', 'easier travel across borders', 'shared roads and railways', 'peace and cooperation', 'a common customs union'], set: 'b' },
      ],
      pairs: [
        {
          pairs: [
            ['the Northern Corridor', 'links Mombasa to Uganda, Rwanda and beyond'],
            ['the Central Corridor', 'links Dar es Salaam to Rwanda, Burundi and beyond'],
            ['LAPSSET', 'a project linking Lamu to South Sudan and Ethiopia'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `Which transport route ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'Buying goods from other countries is called ___.', 'importing', ['exporting', 'farming', 'saving']),
      t(3, 'The busiest sea port in East Africa is ___.', 'Mombasa', ['Lamu', 'Tanga', 'Kisumu']),
      t(3, 'Trade between countries is called ___ trade.', 'international', ['local', 'barter', 'retail']),
      t(4, 'Why do East African countries trade with each other?', 'Each country produces goods the others need.', ['They produce exactly the same things.', 'To stop development.', 'To close borders.']),
      t(4, 'Which is a problem facing trade in East Africa?', 'poor roads in some areas and delays at borders', ['too many good roads and railways in every area', 'too few goods produced in the whole region', 'too much cooperation between the countries']),
      t(5, 'A trader in Kampala imports cars through the Northern Corridor. Through which sea port do the cars first arrive?', 'Mombasa', ['Dar es Salaam', 'Lamu', 'Kisumu']),
    ],
  },
  governance: {
    facts: {
      categories: [
        { one: 'a leader elected in a Kenyan general election', many: 'leaders elected in a general election', items: ['the President', 'the Governor', 'the Senator', 'the Member of Parliament', 'the Woman Representative', 'the MCA'], set: 'e' },
        { one: 'a leader who is appointed, not elected', many: 'appointed leaders', items: ['a Cabinet Secretary', 'the Chief Justice', 'a county commissioner', 'a chief'], set: 'e' },
      ],
      pairs: [
        {
          pairs: [
            ['IEBC', 'conducts elections in Kenya'],
            ['a ballot paper', 'is marked by a voter to choose a leader'],
            ['a secret ballot', 'means no one sees whom you vote for'],
            ['a polling station', 'is a place where people go to vote'],
          ],
          ask: (a) => `In an election, ${a} ___.`,
          askBack: (b) => `What ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'In Kenya, a person can vote from the age of ___.', '18', ['12', '16', '21']),
      t(3, 'General elections in Kenya are held every ___ years.', 'five', ['two', 'three', 'ten']),
      t(3, 'How many leaders does each voter elect in a Kenyan general election?', 'six', ['two', 'four', 'eight']),
      t(4, 'Why is voting by secret ballot important?', 'People can choose freely without fear.', ['It makes voting slower.', 'It lets others see your vote.', 'It stops people from voting.']),
      t(4, 'The East African Community was revived in the year ___.', '2000', ['1963', '1977', '2020']),
      t(5, 'Pupils are electing class prefects. Which is the fairest way?', 'a secret vote counted openly', ['the teacher picks friends', 'the loudest pupil wins', 'pupils who pay win']),
    ],
  },
  citizenship: {
    facts: {
      categories: [
        { one: 'a peaceful way of solving conflicts', many: 'peaceful ways of solving conflicts', items: ['dialogue', 'negotiation', 'mediation', 'arbitration', 'saying sorry and forgiving'], set: 'c' },
        { one: 'a cause of conflict', many: 'causes of conflict', items: ['competition for land and water', 'rumours and gossip', 'unfair sharing of resources', 'disrespect'], set: 'c2' },
        { one: 'a way of promoting peace', many: 'ways of promoting peace', items: ['sharing resources fairly', 'respecting differences', 'joint sports and cultural events', 'listening to each other'], set: 'c2' },
      ],
      pairs: [
        {
          pairs: [
            ['negotiation', 'the two sides talk directly to agree'],
            ['mediation', 'a neutral person helps both sides to agree'],
            ['arbitration', 'a neutral person listens and makes a decision'],
          ],
          ask: (a) => `What happens in ${a}?`,
          askBack: (b) => `Which method of solving conflicts is it when ${b}?`,
        },
      ],
    },
    bank: [
      t(2, 'A disagreement between people is called a ___.', 'conflict', ['contract', 'census', 'climate']),
      t(3, 'Which is the first step in solving a conflict peacefully?', 'listening to both sides', ['shouting', 'walking away forever', 'spreading rumours']),
      t(3, 'Rights that every person has because they are human are called ___ rights.', 'human', ['school', 'county', 'family']),
      t(4, 'Two pupils disagree over a seat. Their class prefect listens and helps them agree to take turns. This is ___.', 'mediation', ['arbitration', 'negotiation only', 'voting']),
      t(4, 'Which shows respect for human dignity?', 'treating everyone with respect, whatever their background', ['laughing at people with disabilities', 'excluding newcomers', 'name-calling']),
      t(5, 'Two communities disagree over a watering point during a drought. Which is the best long-term solution?', 'agree on a fair timetable and build more water points together', ['let the larger community use the point and the other move away', 'close the watering point until the drought is over', 'let each community guard the point on different days']),
    ],
  },
}

const ALL: Record<string, Topic> = {}
for (const [g, set] of [[4, G4], [5, G5], [6, G6]] as const) for (const [k, v] of Object.entries(set)) ALL[`u${g}o-${k}`] = v

export const UPPER_SOCIAL_GENERATORS: Record<string, Generator> = Object.fromEntries(Object.entries(ALL).map(([k, v]) => [k, factGenerator(v.facts)]))
export const UPPER_SOCIAL_BANKS: Record<string, BankQuestion[]> = Object.fromEntries(Object.entries(ALL).map(([k, v]) => [k, v.bank]))
