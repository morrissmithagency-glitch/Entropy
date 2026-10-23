// More written questions for the topics with the fewest different questions at a level,
// found by the depth audit. Each is pinned to the level where that topic ran thin.
// Grade 1 topics that pre-primary reuses (games, Jesus, values…) feed PP1 and PP2 too.
import { labelOptions as opts } from '../generators/english'
import type { BankQuestion, Level } from '../types'

function c(level: Level, prompt: string, answer: string, wrong: string[]): BankQuestion {
  return { type: 'choice', level, prompt, options: opts([answer, ...wrong]), answer }
}

/** The same question list at several levels: easy facts that every early level may ask. */
const at = (levels: Level[], qs: [string, string, string[]][]): BankQuestion[] => levels.flatMap((l) => qs.map(([p, a, w]) => c(l, p, a, l <= 2 ? w.slice(0, 2) : w)))

// ── Pre-primary ─────────────────────────────────────────────────────────────

const PP_TIME: [string, string, string[]][] = [
  ['When do we eat breakfast?', 'in the morning', ['at night', 'at midday']],
  ['When do we go to sleep?', 'at night', ['in the morning', 'at break time']],
  ['When does the sun rise?', 'in the morning', ['at night', 'in the evening']],
  ['When do we see the moon and stars?', 'at night', ['at midday', 'in the morning']],
  ['Which day comes after Monday?', 'Tuesday', ['Sunday', 'Friday']],
  ['Which day comes after Saturday?', 'Sunday', ['Monday', 'Friday']],
  ['Which do we do first in the morning?', 'wake up', ['go to school', 'eat supper']],
  ['Which do we do last at night?', 'sleep', ['wake up', 'eat breakfast']],
  ['When do we go home from school?', 'in the afternoon', ['at midnight', 'before breakfast']],
  ['Which is longer?', 'a week', ['a day', 'an hour']],
]

const PP_CAPACITY: [string, string, string[]][] = [
  ['Which holds more water?', 'a bucket', ['a cup', 'a spoon']],
  ['Which holds more water?', 'a jerrycan', ['a cup', 'a bottle top']],
  ['Which holds less water?', 'a spoon', ['a basin', 'a bucket']],
  ['Which holds less water?', 'a cup', ['a drum', 'a tank']],
  ['Which holds the most water?', 'a water tank', ['a cup', 'a jug']],
  ['The cup is full. What happens if we pour in more water?', 'it spills', ['it grows', 'it sings']],
  ['Which is empty?', 'a cup with nothing in it', ['a cup full of milk', 'a cup full of tea']],
  ['We fill a bucket with cups of water. Which needs more cups?', 'a big bucket', ['a small bucket', 'a tiny cup']],
]

const PP_MASS: [string, string, string[]][] = [
  ['Which is heavier?', 'a bag of maize', ['a feather', 'a leaf']],
  ['Which is lighter?', 'a pencil', ['a chair', 'a stone']],
  ['Which is the heaviest?', 'a cow', ['a cat', 'a hen']],
  ['Which is the lightest?', 'a feather', ['a book', 'a brick']],
  ['Which is heavier?', 'a full bucket of water', ['an empty bucket', 'a cup']],
  ['Which can a child lift easily?', 'a ball', ['a car', 'a tree']],
  ['Which is heavier?', 'a pumpkin', ['a grape', 'a bean']],
  ['Which is the heaviest?', 'an elephant', ['a goat', 'a rabbit']],
]

const PP_COLOURS: [string, string, string[]][] = [
  ['What colour is the sky on a sunny day?', 'blue', ['brown', 'pink', 'black']],
  ['What colour are most leaves?', 'green', ['blue', 'purple', 'white']],
  ['What colour is snow on Mount Kenya?', 'white', ['red', 'green', 'orange']],
  ['What colour is a ripe tomato?', 'red', ['blue', 'black', 'white']],
  ['What colour is the sun in a picture?', 'yellow', ['black', 'blue', 'green']],
  ['Which two colours make orange?', 'red and yellow', ['blue and green', 'black and white', 'blue and yellow']],
  ['Which two colours make purple?', 'red and blue', ['yellow and green', 'white and yellow', 'red and white']],
  ['Which colour is on the Kenyan flag?', 'green', ['purple', 'pink', 'orange']],
  ['What colour is charcoal?', 'black', ['white', 'yellow', 'pink']],
  ['What colour is a ripe banana?', 'yellow', ['blue', 'red', 'black']],
]

const PP_SAFETY: [string, string, string[]][] = [
  ['A stranger offers you sweets. What should you do?', 'say no and tell a grown-up', ['take them and go', 'follow the stranger', 'hide the sweets']],
  ['Where should we cross the road?', 'at the zebra crossing', ['between parked cars', 'at a bend', 'anywhere we like']],
  ['What should we do before crossing the road?', 'look left and right', ['run fast', 'close our eyes', 'play a game']],
  ['Who should give us medicine?', 'a parent or nurse', ['a friend', 'a stranger', 'nobody at all']],
  ['What should you do if you see a fire?', 'call a grown-up quickly', ['touch it', 'play near it', 'hide under a bed']],
  ['Which is safe to put in your mouth?', 'clean food', ['a coin', 'a button', 'a small stone']],
  ['Where should we play?', 'in the playground', ['on the road', 'near the river', 'by the fire']],
  ['If you get lost at the market, who can you ask for help?', 'a police officer', ['a stranger in a car', 'nobody', 'a stray dog']],
]

const PP_CARE: [string, string, string[]][] = [
  ['Where should we throw litter?', 'in the dustbin', ['on the floor', 'in the river', 'on the road']],
  ['How can we save water?', 'close the tap', ['leave the tap open', 'pour water away', 'play with the tap']],
  ['Which helps our school look nice?', 'planting flowers', ['breaking branches', 'writing on walls', 'throwing papers']],
  ['What do plants need to grow?', 'water and sunlight', ['sweets and soda', 'shoes and socks', 'toys and paper']],
  ['Which is a good way to care for animals?', 'giving them water', ['throwing stones at them', 'pulling their tails', 'chasing them']],
  ['Which keeps our classroom clean?', 'sweeping the floor', ['dropping papers', 'spilling water', 'writing on desks']],
  ['What should we do with a young tree?', 'water it', ['step on it', 'pull it out', 'burn it']],
  ['Which is good for our surroundings?', 'picking up litter', ['cutting all trees', 'burning plastic', 'breaking flowers']],
]

const PP_PRAYER: [string, string, string[]][] = [
  ['When do we thank God for food?', 'before we eat', ['when we are fighting', 'when we are shouting', 'never']],
  ['How should we sit when we pray?', 'quietly', ['noisily', 'jumping up and down', 'running about']],
  ['What do we say at the end of a prayer?', 'Amen', ['Goodbye', 'Hello', 'Thank you, teacher']],
  ['Who do we talk to when we pray?', 'God', ['a tree', 'the radio', 'a cat']],
  ['Why do we pray before sleeping?', 'to thank God for the day', ['to make the night longer', 'to wake the baby', 'to switch off the light']],
  ['What can we ask God for when someone is sick?', 'to help them get well', ['to make them sad', 'to give us their toys', 'to make it rain']],
  ['Which is a kind way to talk to God?', 'thank you, God', ['give me everything now', 'go away', 'I do not care']],
  ['Where can we pray?', 'anywhere', ['only on the road', 'only in the river', 'only at the market']],
]

const PP_GREET: [string, string, string[]][] = [
  ['What do you say to your teacher in the morning?', '"Good morning, teacher."', ['"Good night, teacher."', '"Goodbye, teacher."']],
  ['What do you say when you step on someone\'s foot?', '"Sorry."', ['"Thank you."', '"Good morning."']],
  ['What do you say when someone gives you a gift?', '"Thank you."', ['"Sorry."', '"Go away."']],
  ['What do you say when you want to pass?', '"Excuse me, please."', ['"Move, now!"', '"Good night."']],
  ['What do you say when you leave school?', '"Goodbye."', ['"Good morning."', '"Welcome."']],
  ['What do you say when a visitor comes?', '"Welcome."', ['"Goodbye."', '"Sorry."']],
  ['What do you say before you go to sleep?', '"Good night."', ['"Good morning."', '"Excuse me."']],
  ['What do you say when you ask for water?', '"May I have some water, please?"', ['"Water! Now!"', '"Goodbye, water."']],
]

const PP_LETTERS: [string, string, string[]][] = [
  ['Which letter does "apple" start with?', 'a', ['m', 't']],
  ['Which letter does "ball" start with?', 'b', ['d', 'p']],
  ['Which letter does "cat" start with?', 'c', ['k', 's']],
  ['Which letter does "dog" start with?', 'd', ['b', 'g']],
  ['Which letter does "egg" start with?', 'e', ['a', 'i']],
  ['Which letter does "fish" start with?', 'f', ['s', 'h']],
  ['Which letter does "goat" start with?', 'g', ['j', 'q']],
  ['Which letter does "hen" start with?', 'h', ['n', 'm']],
  ['Which letter does "jug" start with?', 'j', ['g', 'y']],
  ['Which letter does "moon" start with?', 'm', ['n', 'w']],
  ['Which letter does "sun" start with?', 's', ['c', 'z']],
  ['Which letter does "tree" start with?', 't', ['f', 'l']],
]

// ── Grade 1 topics that pre-primary also uses ───────────────────────────────

const G1_GAMES: [string, string, string[]][] = [
  ['Your friend falls during a game. What should you do?', 'help them up', ['laugh at them', 'keep running', 'take their turn']],
  ['How should we start a singing game?', 'stand in a circle', ['lie down', 'go home', 'close our eyes']],
  ['What do we do when the song ends?', 'stop and listen', ['push others', 'shout loudly', 'run away']],
  ['Which shows good sharing in a game?', 'everyone gets a turn', ['one child plays alone', 'the ball is hidden', 'others must watch']],
  ['Why do we follow the rules of a game?', 'so the game is fair', ['so we can cheat', 'so the game ends', 'so we can fight']],
  ['What should you say when you lose a game?', '"Well played!"', ['"I hate this game!"', '"You cheated!"', 'nothing at all']],
]

const G1_JESUS: [string, string, string[]][] = [
  ['Where was Jesus born?', 'in Bethlehem', ['in Nairobi', 'in Egypt', 'in Nazareth']],
  ['Where was baby Jesus laid?', 'in a manger', ['in a boat', 'in a tree', 'in a basket']],
  ['Who visited baby Jesus first?', 'shepherds', ['soldiers', 'fishermen', 'kings of Egypt']],
  ['What did the wise men follow?', 'a star', ['a river', 'a road sign', 'a bird']],
  ['What is the name of Jesus\' mother?', 'Mary', ['Sarah', 'Ruth', 'Esther']],
  ['When do Christians celebrate the birth of Jesus?', 'at Christmas', ['at Easter', 'on Madaraka Day', 'on Labour Day']],
  ['Who loved little children and blessed them?', 'Jesus', ['Goliath', 'Pharaoh', 'King Herod']],
  ['Jesus helped people who were ___.', 'sick', ['rich only', 'singing', 'sleeping']],
]

const G1_VALUES: [string, string, string[]][] = [
  ['Your friend has no pencil. What can you do?', 'share yours', ['laugh', 'hide yours', 'tell him to go home']],
  ['You found a coin in class. What should you do?', 'give it to the teacher', ['keep it', 'throw it away', 'buy sweets with it']],
  ['Which word shows respect to an elder?', '"Shikamoo."', ['"Hey you!"', '"Move!"', '"Go away."']],
  ['What should you do when you make a mistake?', 'say sorry', ['blame others', 'run away', 'shout']],
  ['Which is a kind act?', 'helping a friend carry a bag', ['pushing in the line', 'calling names', 'taking a toy']],
  ['How should we speak to our parents?', 'politely', ['rudely', 'with shouting', 'not at all']],
]

const G1_MOVEMENT: [string, string, string[]][] = [
  ['Which part of the body do we hop on?', 'one foot', ['our hands', 'our head', 'our back']],
  ['How do we land after a jump?', 'softly, bending our knees', ['stiff, on our heels', 'on our hands', 'on our back']],
  ['Which movement uses both feet together?', 'jumping', ['hopping', 'crawling', 'clapping']],
  ['What should we do before jumping?', 'warm up', ['eat a big meal', 'sleep', 'sit still']],
  ['Which is a safe place to jump?', 'on soft grass', ['on broken glass', 'on the road', 'on stones']],
  ['Which animal jumps a lot?', 'a frog', ['a snail', 'a fish', 'a tortoise']],
]

const G1_MUSIC: [string, string, string[]][] = [
  ['Which instrument do we shake?', 'a shaker', ['a drum', 'a flute', 'a whistle']],
  ['Which instrument do we beat?', 'a drum', ['a shaker', 'a flute', 'a horn']],
  ['Which instrument do we blow?', 'a whistle', ['a drum', 'a shaker', 'a bell']],
  ['Which instrument do we ring?', 'a bell', ['a drum', 'a flute', 'a shaker']],
  ['Which can we make from bottle tops?', 'a shaker', ['a flute', 'a guitar', 'a piano']],
  ['How should we play a drum near a sleeping baby?', 'softly', ['very loudly', 'with a stone', 'on the baby\'s bed']],
]

// ── Grades 1 to 3 ───────────────────────────────────────────────────────────

const G1_SOIL: [string, string, string[]][] = [
  ['Which soil is best for growing crops?', 'loam', ['sand', 'stones', 'glass']],
  ['Which soil feels rough and gritty?', 'sand', ['clay', 'loam', 'water']],
  ['Which soil can we model into a pot?', 'clay', ['sand', 'gravel', 'dry leaves']],
  ['Which living thing lives in the soil?', 'an earthworm', ['a fish', 'a bird', 'a cow']],
  ['What do plants take from the soil?', 'water', ['light', 'sound', 'air only']],
  ['Which harms the soil?', 'throwing plastic bags', ['planting trees', 'adding manure', 'planting grass']],
]

const G1_WATER_SAFE: [string, string, string[]][] = [
  ['Who should be with you near a river?', 'a grown-up', ['nobody', 'a baby', 'a stray dog']],
  ['Where is it safe to swim?', 'in a pool with a grown-up watching', ['in a flooded river', 'in a deep dam alone', 'in a water tank']],
  ['What should you do if a friend falls into water?', 'shout for a grown-up', ['jump in after them', 'run home and hide', 'laugh']],
  ['Why should we not run beside a pool?', 'the floor is slippery', ['the water is cold', 'the pool is blue', 'running is too slow']],
  ['What can help a learner float?', 'a float', ['a stone', 'a heavy bag', 'gumboots']],
  ['What should we do with an open well?', 'stay away from it', ['look down into it', 'play around it', 'throw toys in it']],
]

const G1_ROLLS: [string, string, string[]][] = [
  ['Where should we practise rolling?', 'on a soft mat', ['on concrete', 'on stones', 'on the road']],
  ['In a log roll, the body is ___.', 'straight like a log', ['curled like a ball', 'standing up', 'sitting down']],
  ['In a forward roll, we tuck our ___.', 'chin to our chest', ['hands behind our back', 'feet over our head', 'head backwards']],
  ['Why do we take turns on the mat?', 'so nobody gets hurt', ['so we can rest all day', 'so the mat gets dirty', 'so the teacher leaves']],
  ['Which animal can roll into a ball?', 'a hedgehog', ['a giraffe', 'a cow', 'a hen']],
  ['What should we clear from the mat before rolling?', 'stones and sticks', ['the teacher', 'our shoes on our feet', 'the floor']],
]

const G1_CHURCH: [string, string, string[]][] = [
  ['What do Christians read in church?', 'the Bible', ['a comic', 'a menu', 'a newspaper only']],
  ['Who leads the service in many churches?', 'a pastor or priest', ['a pilot', 'a farmer', 'a driver']],
  ['On which day do many Christians go to church?', 'Sunday', ['Monday', 'Wednesday', 'Thursday']],
  ['What do we give in church to help God\'s work?', 'an offering', ['a fight', 'a test', 'a bill']],
  ['How should we behave in church?', 'quietly and respectfully', ['noisily', 'by running', 'by sleeping']],
  ['What do children learn in Sunday school?', 'Bible stories', ['how to drive', 'how to cook meat', 'how to fish']],
]

const G1_SHAPES: [string, string, string[]][] = [
  ['How many sides does a triangle have?', 'three', ['four', 'five', 'none']],
  ['Which shape has no corners?', 'a circle', ['a square', 'a triangle', 'a rectangle']],
  ['Which shape is a ball?', 'a sphere', ['a cube', 'a cone', 'a cylinder']],
  ['Which shape has four equal sides?', 'a square', ['a triangle', 'a circle', 'an oval']],
  ['Which object is shaped like a circle?', 'a coin', ['a book', 'a door', 'a ruler']],
  ['Which object is shaped like a rectangle?', 'a door', ['a ball', 'a coin', 'an egg']],
]

const G1_MONEY: [string, string, string[]][] = [
  ['Which coin is worth the most?', '20 shillings', ['1 shilling', '5 shillings', '10 shillings']],
  ['Which coin is worth the least?', '1 shilling', ['5 shillings', '10 shillings', '20 shillings']],
  ['Two 5 shilling coins make ___.', '10 shillings', ['5 shillings', '15 shillings', '20 shillings']],
  ['Two 10 shilling coins make ___.', '20 shillings', ['10 shillings', '12 shillings', '30 shillings']],
  ['Where do we keep money safely?', 'in a purse or a bank', ['under a stone', 'on the road', 'in the dustbin']],
  ['What do we use money for?', 'to buy things', ['to plant trees', 'to cook food in', 'to drink']],
]

const G1_POSITION: [string, string, string[]][] = [
  ['The roof is ___ the house.', 'on top of', ['under', 'inside', 'behind']],
  ['The roots of a tree are ___ the ground.', 'under', ['on top of', 'above', 'beside']],
  ['When you sit at your desk, the desk is ___ you.', 'in front of', ['on top of', 'under', 'inside']],
  ['Water in a cup is ___ the cup.', 'inside', ['under', 'behind', 'on top of']],
  ['Your shadow on a sunny morning is ___ you on the ground.', 'next to', ['inside', 'on top of', 'above']],
  ['A bird flying high is ___ the trees.', 'above', ['under', 'inside', 'below']],
]

const G1_TIME: [string, string, string[]][] = [
  ['How many days are in a week?', 'seven', ['five', 'ten', 'twelve']],
  ['Which day comes before Wednesday?', 'Tuesday', ['Thursday', 'Friday', 'Sunday']],
  ['Which day comes after Thursday?', 'Friday', ['Wednesday', 'Monday', 'Sunday']],
  ['On which days do we not go to school?', 'Saturday and Sunday', ['Monday and Tuesday', 'Wednesday and Friday', 'Thursday and Friday']],
  ['What do we use to tell the time?', 'a clock', ['a ruler', 'a cup', 'a spoon']],
  ['Which takes longer?', 'a school term', ['a lesson', 'a break', 'a song']],
]

const G2_WEATHER: [string, string, string[]][] = [
  ['What do we use to keep dry in the rain?', 'an umbrella', ['a sunhat', 'sunglasses', 'a fan']],
  ['Which weather is good for drying clothes?', 'sunny', ['rainy', 'foggy', 'misty']],
  ['What do we wear when it is cold?', 'a sweater', ['a vest only', 'sunglasses', 'sandals only']],
  ['What do dark clouds tell us?', 'it may rain', ['it will snow at the coast', 'it is night', 'the sun is hot']],
  ['Which instrument shows the direction of the wind?', 'a wind vane', ['a thermometer', 'a rain gauge', 'a ruler']],
  ['Which instrument measures how much rain fell?', 'a rain gauge', ['a wind vane', 'a windsock', 'a clock']],
]

const G2_LIGHT: [string, string, string[]][] = [
  ['Which gives us light during the day?', 'the sun', ['the moon', 'a candle', 'the stars']],
  ['Which is a natural source of light?', 'the sun', ['a torch', 'a lamp', 'a bulb']],
  ['Which is a man-made source of light?', 'a torch', ['the sun', 'a star', 'lightning']],
  ['What forms when an object blocks light?', 'a shadow', ['a rainbow', 'a cloud', 'a puddle']],
  ['Why should we not look straight at the sun?', 'it can hurt our eyes', ['it makes us hungry', 'it turns off the light', 'it is too far']],
  ['Which needs light to grow?', 'plants', ['stones', 'chairs', 'cups']],
]

const G2_BALL: [string, string, string[]][] = [
  ['Which body part do we use to dribble a football?', 'our feet', ['our head only', 'our hands', 'our back']],
  ['How should we pass a ball to a friend?', 'gently, to their hands', ['hard, at their face', 'over the fence', 'into the bush']],
  ['What do we say when a friend scores?', '"Well done!"', ['"You cheated!"', '"Go away!"', 'nothing']],
  ['Where should we play ball games?', 'on the field', ['on the road', 'in the classroom', 'near the windows']],
  ['Which game uses a net and a ball thrown over it?', 'volleyball', ['football', 'athletics', 'skipping']],
  ['What should we do when the whistle blows?', 'stop playing', ['run faster', 'kick the ball away', 'shout']],
]

const G2_UMOJA: [string, string, string[]][] = [
  ['Wingi wa "mtoto" ni ___.', 'watoto', ['mitoto', 'vitoto', 'matoto']],
  ['Wingi wa "kiti" ni ___.', 'viti', ['miti', 'wati', 'kiti']],
  ['Wingi wa "mti" ni ___.', 'miti', ['viti', 'wati', 'mati']],
  ['Wingi wa "jicho" ni ___.', 'macho', ['vicho', 'micho', 'jicho']],
  ['Umoja wa "vitabu" ni ___.', 'kitabu', ['mtabu', 'jitabu', 'vitabu']],
  ['Umoja wa "walimu" ni ___.', 'mwalimu', ['kilimu', 'jilimu', 'walimu']],
  ['Wingi wa "kalamu" ni ___.', 'kalamu', ['vikalamu', 'makalamu', 'mikalamu']],
  ['Umoja wa "meza" ni ___.', 'meza', ['kimeza', 'mmeza', 'jimeza']],
  ['Wingi wa "yai" ni ___.', 'mayai', ['viyai', 'miyai', 'wayai']],
  ['Umoja wa "miguu" ni ___.', 'mguu', ['kiguu', 'jiguu', 'miguu']],
]

const G2_NEEDS: [string, string, string[]][] = [
  ['Which is a basic need?', 'food', ['a toy car', 'a television', 'sweets']],
  ['Which is a want, not a need?', 'a video game', ['water', 'shelter', 'clothes']],
  ['Why do we need a house?', 'to shelter us from rain and cold', ['to keep cars in', 'to play football in', 'to sell things']],
  ['Who works to meet the family\'s needs?', 'parents and guardians', ['the neighbours\' cows', 'only the baby', 'nobody']],
  ['How can a child help meet family needs?', 'by not wasting food', ['by breaking cups', 'by asking for toys daily', 'by leaving taps open']],
  ['Why do we need clean water?', 'to drink and stay healthy', ['to paint the walls', 'to play only', 'to sell to friends']],
]

const G2_RIGHTS: [string, string, string[]][] = [
  ['Every child has a right to ___.', 'education', ['a car', 'a phone', 'sweets every day']],
  ['Which is a right of a child?', 'to be loved and cared for', ['to stay home from school', 'to be given money', 'to stay up all night']],
  ['Which is a responsibility of a child?', 'obeying parents', ['beating others', 'missing school', 'wasting food']],
  ['Who should protect children?', 'parents, teachers and the government', ['nobody', 'only friends', 'strangers']],
  ['A child is being hurt at home. Who can the child tell?', 'a teacher or trusted adult', ['nobody', 'a stranger online', 'a goat']],
  ['Which shows a child\'s right to good health?', 'getting treatment when sick', ['eating only sweets', 'never bathing', 'skipping meals']],
]

const G2_SONGS: [string, string, string[]][] = [
  ['What do we do when the National Anthem is sung?', 'stand still', ['dance', 'run', 'sit down']],
  ['In which language is the first stanza of our anthem often sung?', 'Kiswahili', ['French', 'Chinese', 'Spanish']],
  ['A song sung to make a baby sleep is a ___.', 'lullaby', ['work song', 'war song', 'hymn']],
  ['A song sung in church to praise God is a ___.', 'hymn', ['lullaby', 'work song', 'game song']],
  ['A song sung while working together is a ___.', 'work song', ['lullaby', 'hymn', 'anthem']],
  ['Songs that show love for our country are ___.', 'patriotic songs', ['lullabies', 'game songs', 'work songs']],
]

const G3_DRIBBLE: [string, string, string[]][] = [
  ['When dribbling, we keep the ball ___.', 'close to our feet', ['far ahead', 'in our hands', 'up in the air']],
  ['Which part of the foot gives the best control when dribbling?', 'the inside of the foot', ['the heel only', 'the knee', 'the toes only']],
  ['Where should our eyes look while dribbling?', 'up, to see the space', ['at the sky only', 'closed', 'behind us']],
  ['In basketball, we dribble the ball with ___.', 'our hands', ['our feet', 'our head', 'a stick']],
  ['Dribbling around cones helps us practise ___.', 'changing direction', ['sleeping', 'singing', 'painting']],
  ['Why should we not dribble into other players on purpose?', 'it is unsafe and unfair', ['it is too slow', 'the ball will melt', 'it scores a goal']],
]

const G3_JESUS: [string, string, string[]][] = [
  ['At what age was Jesus found in the temple asking questions?', 'twelve', ['two', 'thirty', 'forty']],
  ['What work did Joseph do?', 'he was a carpenter', ['he was a fisherman', 'he was a soldier', 'he was a king']],
  ['Who baptised Jesus?', 'John the Baptist', ['Peter', 'Moses', 'Paul']],
  ['In which river was Jesus baptised?', 'River Jordan', ['River Nile', 'River Tana', 'River Euphrates']],
  ['How many disciples did Jesus choose?', 'twelve', ['seven', 'three', 'forty']],
  ['Jesus fed a big crowd with five loaves and two ___.', 'fish', ['eggs', 'mangoes', 'cups of milk']],
]

const G3_PLURAL: [string, string, string[]][] = [
  ['What is the plural of "box"?', 'boxes', ['boxs', 'boxies', 'boxen']],
  ['What is the plural of "baby"?', 'babies', ['babys', 'babyes', 'babyies']],
  ['What is the plural of "knife"?', 'knives', ['knifes', 'knivs', 'knifs']],
  ['What is the plural of "tooth"?', 'teeth', ['tooths', 'toothes', 'teeths']],
  ['What is the plural of "mouse"?', 'mice', ['mouses', 'mices', 'mouse']],
  ['What is the plural of "sheep"?', 'sheep', ['sheeps', 'shoop', 'sheepes']],
  ['What is the plural of "potato"?', 'potatoes', ['potatos', 'potatoies', 'potato']],
  ['What is the plural of "church"?', 'churches', ['churchs', 'churchies', 'church']],
]

// ── Upper primary and junior secondary ─────────────────────────────────────

const UAKIFISHAJI: [string, string, string[]][] = [
  ['Alama ipi hutumika mwishoni mwa swali?', 'alama ya kuuliza (?)', ['kitone (.)', 'kipumuo (,)', 'nukta pacha (:)']],
  ['Alama ipi hutumika kuonyesha mshangao?', 'alama ya hisi (!)', ['kitone (.)', 'alama ya kuuliza (?)', 'kistari (-)']],
  ['Alama ipi hutenganisha vitu katika orodha?', 'kipumuo (,)', ['alama ya hisi (!)', 'kitone (.)', 'alama za kunukuu (" ")']],
  ['Alama za kunukuu hutumika kuonyesha nini?', 'maneno halisi ya msemaji', ['mwisho wa aya', 'swali la mwalimu', 'idadi ya vitu']],
  ['Ni sentensi ipi iliyoakifishwa ipasavyo?', 'Je, umemaliza kazi yako?', ['je umemaliza kazi yako.', 'Je, umemaliza kazi yako!', 'Je umemaliza, kazi yako?']],
  ['Ni sentensi ipi iliyoakifishwa ipasavyo?', 'Tulinunua maembe, machungwa na ndizi.', ['Tulinunua maembe machungwa, na ndizi.', 'tulinunua maembe, machungwa na ndizi.', 'Tulinunua maembe, machungwa na ndizi?']],
  ['Herufi kubwa hutumika wapi?', 'mwanzoni mwa sentensi', ['katikati ya kila neno', 'mwishoni mwa kila neno', 'kwa vitenzi vyote']],
  ['Ni neno lipi limeandikwa ipasavyo?', 'Nairobi', ['nairobi', 'NAIrobi', 'nairoBi']],
  ['Alama ya nukta pacha (:) hutumika kabla ya nini?', 'orodha au maelezo', ['mwisho wa swali', 'jina la mtu', 'kila kitenzi']],
  ['Ni sentensi ipi iliyoakifishwa ipasavyo?', 'Mwalimu alisema, "Kaeni chini."', ['Mwalimu alisema "kaeni chini".', 'mwalimu alisema, "Kaeni chini."', 'Mwalimu alisema, Kaeni chini.']],
]

const CITIZENSHIP_JSS: [string, string, string[]][] = [
  ['Which document is the supreme law of Kenya?', 'the Constitution', ['the national anthem', 'a county budget', 'a school rule book']],
  ['At what age can a Kenyan citizen register as a voter?', '18 years', ['12 years', '15 years', '25 years']],
  ['Which shows active citizenship?', 'taking part in a community clean-up', ['refusing to vote ever', 'damaging public property', 'avoiding tax']],
  ['Which is a responsibility of a citizen?', 'paying taxes', ['breaking traffic rules', 'ignoring the law', 'insulting leaders']],
  ['Which national value is shown by treating all communities fairly?', 'equity', ['tribalism', 'corruption', 'greed']],
  ['What does patriotism mean?', 'love for one\'s country', ['love for one\'s tribe only', 'fear of leaders', 'dislike of other nations']],
  ['Which document proves that a person is a Kenyan citizen?', 'a national identity card', ['a school report', 'a library card', 'a bus ticket']],
  ['How can young people help keep peace?', 'resolving disagreements through dialogue', ['spreading rumours', 'joining violent groups', 'insulting others online']],
]

const CREATION_JSS: [string, string, string[]][] = [
  ['According to Genesis 1, on which day did God create human beings?', 'the sixth day', ['the first day', 'the third day', 'the seventh day']],
  ['What did God do on the seventh day?', 'He rested', ['He created light', 'He made the sea', 'He made the animals']],
  ['God created human beings in His own ___.', 'image', ['house', 'garden only', 'temple']],
  ['What work did God give Adam in the garden?', 'to look after it', ['to build a city', 'to cut down all the trees', 'to sell the fruit']],
  ['Which teaching from creation encourages care for the environment?', 'people are stewards of God\'s creation', ['the earth belongs to whoever is strongest', 'animals were made to be wasted', 'trees grow without care']],
  ['Who was created from Adam\'s rib, according to Genesis 2?', 'Eve', ['Sarah', 'Ruth', 'Miriam']],
  ['What did God say about everything He made?', 'it was very good', ['it was unfinished', 'it was useless', 'it was too small']],
  ['Which is a modern way to care for God\'s creation?', 'reducing plastic waste', ['burning forests', 'polluting rivers', 'wasting water']],
]

const HEAT_J8: [string, string, string[]][] = [
  ['How does heat travel through a metal spoon in hot tea?', 'conduction', ['convection', 'radiation', 'evaporation']],
  ['How does the sun\'s heat reach the earth?', 'radiation', ['conduction', 'convection', 'condensation']],
  ['Why are cooking pot handles often made of wood or plastic?', 'they are poor conductors of heat', ['they are good conductors of heat', 'they are heavier than metal', 'they melt easily']],
  ['Which colour absorbs the most heat from the sun?', 'black', ['white', 'silver', 'light yellow']],
  ['Why do people in hot places often wear light-coloured clothes?', 'light colours reflect heat', ['light colours absorb more heat', 'light colours are heavier', 'dark clothes are banned']],
  ['How is heat mainly transferred in boiling water?', 'convection currents', ['radiation only', 'conduction through air', 'reflection']],
  ['Which is a good insulator?', 'wool', ['copper', 'aluminium', 'iron']],
  ['Why do metal railway lines have small gaps between them?', 'to allow for expansion when hot', ['to let rain drain away', 'to save metal', 'to make noise']],
]

const GOVERNANCE_U6: [string, string, string[]][] = [
  ['Which arm of government makes laws?', 'the legislature (Parliament)', ['the judiciary', 'the executive', 'the police']],
  ['Which arm of government interprets the law?', 'the judiciary', ['the legislature', 'the executive', 'the county assembly']],
  ['Who heads the executive arm of the national government?', 'the President', ['the Chief Justice', 'the Speaker', 'a governor']],
  ['Who heads a county government?', 'the governor', ['the President', 'the Chief Justice', 'the county commissioner']],
  ['How often are general elections held in Kenya?', 'every five years', ['every year', 'every ten years', 'every two years']],
  ['Which body runs elections in Kenya?', 'IEBC', ['KRA', 'KWS', 'KEBS']],
  ['Who represents a ward in the county assembly?', 'an MCA', ['a senator', 'the President', 'a judge']],
  ['What is a way citizens take part in governance?', 'voting in elections', ['ignoring laws', 'damaging offices', 'refusing all meetings']],
]

const METHALI_U4: [string, string, string[]][] = [
  ['Kamilisha methali: "Haraka haraka ___"', 'haina baraka', ['hujaza kibaba', 'huvunja guu', 'ni mwanzo wa safari']],
  ['Kamilisha methali: "Mtaka cha mvunguni ___"', 'sharti ainame', ['hajikwai', 'hula na kulala', 'huwa mchirizi']],
  ['Kamilisha methali: "Usipoziba ufa ___"', 'utajenga ukuta', ['utapata kibaba', 'utaona mvua', 'utakula ugali']],
  ['Kamilisha methali: "Kidole kimoja ___"', 'hakivunji chawa', ['hujaza kibaba', 'hakijikwai', 'huwa mchirizi']],
  ['Kamilisha methali: "Mwenda pole ___"', 'hajikwai', ['haina baraka', 'hujaza kibaba', 'sharti ainame']],
  ['Kamilisha methali: "Bandu bandu ___"', 'huisha gogo', ['huvunja chungu', 'hujaza bahari', 'humaliza njia']],
  ['Methali "Haraka haraka haina baraka" inatufundisha nini?', 'tufanye mambo kwa utulivu', ['tukimbie kila wakati', 'tusifanye kazi', 'tule haraka']],
  ['Methali ipi inahimiza ushirikiano?', 'Kidole kimoja hakivunji chawa', ['Haraka haraka haina baraka', 'Mwenda pole hajikwai', 'Damu nzito kuliko maji']],
]

const NOUNS_U4: [string, string, string[]][] = [
  ['Which is a proper noun?', 'Nairobi', ['city', 'river', 'teacher']],
  ['Which is a collective noun?', 'herd', ['cow', 'grass', 'farmer']],
  ['Which is an abstract noun?', 'happiness', ['table', 'Juma', 'mango']],
  ['What is the plural of "child"?', 'children', ['childs', 'childrens', 'childes']],
  ['What is the feminine of "uncle"?', 'aunt', ['niece', 'mother', 'sister']],
  ['Choose the collective noun: a ___ of bees.', 'swarm', ['herd', 'flock', 'school']],
  ['Choose the collective noun: a ___ of sheep.', 'flock', ['swarm', 'pride', 'pod']],
  ['Which word is a noun in "The girl sang a song"?', 'song', ['sang', 'the', 'a']],
]

const LITERATURE_J7: [string, string, string[]][] = [
  ['Which figure of speech compares using "like" or "as"?', 'simile', ['metaphor', 'personification', 'alliteration']],
  ['"The classroom was a zoo." Which figure of speech is this?', 'metaphor', ['simile', 'onomatopoeia', 'hyperbole']],
  ['"The bees buzzed." The word "buzzed" is an example of ___.', 'onomatopoeia', ['simile', 'metaphor', 'personification']],
  ['A short story with animals that teaches a lesson is a ___.', 'fable', ['riddle', 'tongue twister', 'proverb']],
  ['A short, wise saying passed down by elders is a ___.', 'proverb', ['riddle', 'novel', 'poem']],
  ['"Peter Piper picked a peck of pickled peppers" is a ___.', 'tongue twister', ['proverb', 'fable', 'myth']],
  ['In a story, the place and time it happens is called the ___.', 'setting', ['plot', 'theme', 'character']],
  ['The main lesson or idea of a story is its ___.', 'theme', ['setting', 'title', 'narrator']],
]

const SENTENCES_U4: [string, string, string[]][] = [
  ['Which is a complete sentence?', 'The dog barked loudly.', ['The dog loudly.', 'Barked the loudly.', 'Loudly dog the.']],
  ['Which sentence is a question?', 'Where do you live?', ['I live in Thika.', 'Live in Thika!', 'Thika is far.']],
  ['Which sentence is a command?', 'Close the door.', ['The door is closed.', 'Is the door closed?', 'What a big door!']],
  ['Join the sentences: "It rained. We stayed indoors."', 'It rained, so we stayed indoors.', ['It rained but we stayed indoors so.', 'It rained because we stayed indoors.', 'We stayed indoors, so it rained.']],
  ['Which word joins two ideas?', 'and', ['quickly', 'blue', 'table']],
  ['Which sentence is written correctly?', 'My brother and I play football.', ['Me and my brother plays football.', 'My brother and me plays football.', 'I and my brother playing football.']],
]

export const EXTRA_FACTS: Record<string, BankQuestion[]> = {
  // Pre-primary topics of their own.
  ...Object.fromEntries(
    [1, 2].flatMap((y) => [
      [`p${y}m-time`, at([1, 2, 3, 4, 5], PP_TIME)],
      [`p${y}m-capacity`, at([1, 2, 3], PP_CAPACITY)],
      [`p${y}m-mass`, at([3, 4, 5], PP_MASS)],
      [`p${y}c-colours`, at([3, 4, 5], PP_COLOURS)],
      [`p${y}v-safety`, at([1, 2, 3], PP_SAFETY)],
      [`p${y}v-care`, at([1, 2, 3], PP_CARE)],
      [`p${y}r-prayer`, at([1, 2, 3], PP_PRAYER)],
      [`p${y}e-letters`, at([1, 2, 3, 4, 5], PP_LETTERS)],
      [`p${y}e-greet`, at([2, 3, 5], PP_GREET)],
      [`p${y}r-jesus`, at([2, 3, 5], G1_JESUS)],
    ]),
  ),
  // Grade 1 topics (pre-primary reuses these at its own levels).
  'e-polite': at([1, 2, 3], PP_GREET),
  'c-games': at([1, 2, 3], G1_GAMES),
  'r-jesus': at([1, 2, 3], G1_JESUS),
  'r-living': at([1, 2, 3], G1_VALUES),
  'c-jump': at([1, 2, 3], G1_MOVEMENT),
  'c-instruments': at([1, 2, 3], G1_MUSIC),
  'v-soil': at([1, 2, 3], G1_SOIL),
  'c-water': at([1, 2, 3], G1_WATER_SAFE),
  'c-rolls': at([1, 2, 3], G1_ROLLS),
  'r-church': at([1, 2, 3], G1_CHURCH),
  'm-shapes': at([2], G1_SHAPES),
  'm-money': at([2], G1_MONEY),
  'e-position': at([1, 2], G1_POSITION),
  'm-time': at([3], G1_TIME),
  // Grades 2 and 3.
  'sv-weather': at([1, 2], G2_WEATHER),
  'sv-light': at([3], G2_LIGHT),
  'sc-ball': at([1, 2, 3], G2_BALL),
  'sk-umoja': at([1, 2, 3, 4, 5], G2_UMOJA),
  'sv-needs': at([1, 2], G2_NEEDS),
  'sv-rights': at([1, 2], G2_RIGHTS),
  'sc-songs': at([1, 2, 3], G2_SONGS),
  'tc-dribbling': at([1, 2, 3], G3_DRIBBLE),
  'tr-jesus': at([1, 2, 3], G3_JESUS),
  'te-plural': at([2, 3, 4], G3_PLURAL),
  // Grades 4 to 9.
  'u4k-uakifishaji': at([2, 3, 4], UAKIFISHAJI),
  'u5k-uakifishaji': at([3], UAKIFISHAJI),
  'u6k-uakifishaji': at([3], UAKIFISHAJI),
  'j7k-uakifishaji': at([2], UAKIFISHAJI),
  'j8k-uakifishaji': at([2], UAKIFISHAJI),
  'j9k-uakifishaji': at([2], UAKIFISHAJI),
  'u6o-governance': at([3], GOVERNANCE_U6),
  'u6o-citizenship': at([1, 2], CITIZENSHIP_JSS.slice(1)),
  'j7o-citizenship': at([1, 2, 3], CITIZENSHIP_JSS),
  'j9o-citizenship': at([1, 2, 3], CITIZENSHIP_JSS),
  'j7r-creation': at([1, 2, 3], CREATION_JSS),
  'j8r-creation': at([1, 2, 3], CREATION_JSS),
  'j9r-creation': at([1, 2, 3], CREATION_JSS),
  'j8s-heat': at([1, 2, 3], HEAT_J8),
  'u4k-methali': at([1, 2, 3, 4, 5], METHALI_U4),
  'u4e-nouns': at([1, 2, 3, 5], NOUNS_U4),
  'j7e-literature': at([1, 2], LITERATURE_J7),
  'u4e-sentences': at([1, 2, 3, 4], SENTENCES_U4),
}
