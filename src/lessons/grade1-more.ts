// Grade 1 Environmental, Kiswahili, Creative and CRE lessons.
import type { Lesson } from './types'

export const ENVIRONMENTAL1_LESSONS: Record<string, Lesson> = {
  'v-body': {
    intro: 'A clean body keeps us healthy and happy.',
    steps: [
      { title: 'Washing', text: 'Wash your hands with soap and water before eating and after the toilet.', visual: { kind: 'art', art: ['soap', 'tap', 'towel'] } },
      { title: 'Teeth and hair', text: 'Brush your teeth every morning and night. Comb your hair.', visual: { kind: 'art', art: ['toothbrush', 'comb'] } },
    ],
    remember: 'Wash your hands, brush your teeth, bathe every day.',
  },
  'v-home': {
    intro: 'Home is where our family lives.',
    steps: [
      { title: 'Rooms', text: 'We cook in the kitchen, sleep in the bedroom and bathe in the bathroom.', visual: { kind: 'art', art: ['house', 'bed', 'pot'] } },
      { title: 'People at home', text: 'Father, mother, brothers, sisters and grandparents live at home.' },
    ],
    remember: 'Each room has a use: kitchen to cook, bedroom to sleep.',
  },
  'v-needs': {
    intro: 'Some things we need, and some things we just want.',
    steps: [
      { title: 'Needs', text: 'We need food, water, clothes and a house to live well.', visual: { kind: 'art', art: ['bread', 'cup', 'shirt', 'house'] } },
      { title: 'Wants', text: 'Sweets and toys are nice, but we can live without them.' },
    ],
    remember: 'Food, water, clothes and a house are needs.',
  },
  'v-school': {
    intro: 'School is where we learn and play.',
    steps: [
      { title: 'People at school', text: 'The teacher teaches us. The cook cooks our food. The watchman guards the gate.', visual: { kind: 'art', art: ['teacher', 'child'] } },
      { title: 'Keep it clean', text: 'Sweep the classroom and put litter in the dustbin.' },
    ],
    remember: 'Listen to the teacher and keep the school clean.',
  },
  'v-market': {
    intro: 'At the market people buy and sell things.',
    steps: [
      { title: 'Things at the market', text: 'Fruits, vegetables, clothes and animals are sold at the market.', visual: { kind: 'art', art: ['mango', 'tomato', 'hen'] } },
      { title: 'Buying', text: 'We pay with money. The seller gives us what we buy.', visual: { kind: 'money', values: [10, 5] } },
    ],
    remember: 'Sellers sell; buyers pay money.',
  },
  'v-weather': {
    intro: 'Weather can be sunny, rainy, windy or cloudy.',
    steps: [
      { title: 'Kinds of weather', text: 'Look at the sky to see the weather.', visual: { kind: 'art', art: ['sun', 'rain', 'cloud', 'wind'] } },
      { title: 'The sky at night', text: 'At night we see the moon and the stars.', visual: { kind: 'art', art: ['moon', 'star'] } },
    ],
    remember: 'Sun in the day; moon and stars at night.',
  },
  'v-soil': {
    intro: 'Soil is the ground where plants grow.',
    steps: [
      { title: 'Kinds of soil', text: 'Sand is rough. Clay is sticky. Loam is dark and good for plants.', visual: { kind: 'art', art: ['sand', 'clay', 'loam'] } },
      { title: 'Using clay', text: 'We can make pots and toys with clay.' },
    ],
    remember: 'Plants grow in soil. We make pots with clay.',
  },
  'v-sound': {
    intro: 'We hear sounds with our ears.',
    steps: [
      { title: 'Loud and soft', text: 'A drum is loud. A whisper is soft.', visual: { kind: 'art', art: ['drum', 'ear'] } },
      { title: 'Animal sounds', text: 'A cow says moo. A dog says woof. A cat says meow.', visual: { kind: 'art', art: ['cow', 'dog', 'cat'] } },
    ],
    remember: 'We hear with our ears. Sounds can be loud or soft.',
  },
  'v-water': {
    intro: 'We need water every day.',
    steps: [
      { title: 'Where water comes from', text: 'Rain, rivers, wells and taps give us water.', visual: { kind: 'art', art: ['rain', 'river', 'well', 'tap'] } },
      { title: 'Using water', text: 'We drink, cook, bathe and wash with water. Close the tap after use.' },
    ],
    remember: 'Use water well and close the tap.',
  },
  'v-plants': {
    intro: 'Plants grow and give us food.',
    steps: [
      { title: 'Parts of a plant', text: 'A plant has roots, a stem, leaves and flowers.', visual: { kind: 'art', art: ['root', 'stem', 'leaf', 'flower'] } },
      { title: 'Plants we eat', text: 'We eat maize, beans, bananas and mangoes.', visual: { kind: 'art', art: ['maize', 'banana', 'mango'] } },
    ],
    remember: 'Roots, stem, leaves and flowers make a plant.',
  },
  'v-animals': {
    intro: 'Some animals live at home; others live in the wild.',
    steps: [
      { title: 'At home', text: 'Cows, goats, hens and dogs live with people.', visual: { kind: 'art', art: ['cow', 'goat', 'hen', 'dog'] } },
      { title: 'In the wild', text: 'Lions, elephants, zebras and giraffes live in the wild.', visual: { kind: 'art', art: ['lion', 'elephant', 'zebra', 'giraffe'] } },
    ],
    remember: 'Domestic animals live with us; wild animals live in the wild.',
  },
}

export const KISWAHILI1_LESSONS: Record<string, Lesson> = {
  'k-salamu': {
    intro: 'Tunasalimiana kwa adabu kila siku.',
    steps: [
      { title: 'Salamu', text: 'Hujambo? Jibu: Sijambo. Shikamoo. Jibu: Marahaba.' },
      { title: 'Maneno ya adabu', text: 'Tafadhali tunapoomba. Asante tunapopewa. Pole mtu akiumia.' },
    ],
    remember: 'Hujambo → Sijambo. Asante → Karibu.',
  },
  'k-msamiati': {
    intro: 'Tujifunze majina ya vitu tunavyoviona.',
    steps: [
      { title: 'Wanyama', text: 'Mbuzi, ng\'ombe, kuku, paka na mbwa.', visual: { kind: 'art', art: ['goat', 'cow', 'hen', 'cat'] } },
      { title: 'Nambari', text: 'Moja, mbili, tatu, nne, tano.', visual: { kind: 'count', art: 'orange', n: 5 } },
    ],
    remember: 'Taja jina la kila kitu unachokiona.',
  },
  'k-silabi': {
    intro: 'Irabu ni a, e, i, o, u. Tunaziunganisha na herufi nyingine kuunda silabi.',
    steps: [
      { title: 'Irabu', text: 'a, e, i, o, u ni irabu tano za Kiswahili.' },
      { title: 'Silabi', text: 'm + a = ma. b + a = ba.', example: ['ma, me, mi, mo, mu', 'ba, be, bi, bo, bu'] },
      { title: 'Maneno', text: 'Silabi mbili huunda neno.', example: ['ma + ma = mama', 'ba + ba = baba'] },
    ],
    remember: 'Irabu ni a, e, i, o, u. Silabi huunda maneno.',
  },
  'k-ufahamu': {
    intro: 'Tunasoma hadithi fupi na kujibu maswali.',
    steps: [
      { title: 'Soma polepole', text: 'Soma kila neno kwa makini.', visual: { kind: 'passage', title: 'Paka', text: 'Nina paka. Paka ni mweusi.' } },
      { title: 'Tafuta jibu', text: 'Tafuta maneno ya swali katika hadithi.', example: ['Paka ana rangi gani? → nyeusi'] },
    ],
    remember: 'Soma polepole na utafute jibu katika hadithi.',
  },
  'k-kuandika': {
    intro: 'Tunaunganisha silabi kuunda maneno.',
    steps: [
      { title: 'Unganisha', text: 'Weka silabi pamoja kwa mpangilio sahihi.', example: ['ku + ku = kuku', 'pa + ka = paka'] },
      { title: 'Soma tena', text: 'Soma neno ulilounda. Je, lina maana?' },
    ],
    remember: 'Unganisha silabi, kisha usome neno.',
  },
}

export const CREATIVE1_LESSONS: Record<string, Lesson> = {
  'c-sounds': {
    intro: 'Sounds can be loud or soft, high or low.',
    steps: [
      { title: 'Loud and soft', text: 'A big drum is loud. A whisper is soft.', visual: { kind: 'art', art: ['drum'] } },
      { title: 'High and low', text: 'A bird sings high. A cow moos low.', visual: { kind: 'art', art: ['bird', 'cow'] } },
    ],
    remember: 'Listen: is it loud or soft? High or low?',
  },
  'c-picture': {
    intro: 'We draw and colour pictures to show what we see.',
    steps: [
      { title: 'Drawing', text: 'Draw with a pencil, crayon or charcoal on paper.', visual: { kind: 'art', art: ['pencil'] } },
      { title: 'Colouring', text: 'Colour the sun yellow, the grass green and the sky blue.', visual: { kind: 'art', art: ['sun', 'leaf'] } },
    ],
    remember: 'Draw on paper, colour carefully, and put crayons back in the box.',
  },
  'c-rhythm': {
    intro: 'Rhythm is a pattern of claps and stamps.',
    steps: [
      { title: 'Clap and stamp', text: 'Clap your hands. Stamp your feet. Keep the same speed.' },
      { title: 'Patterns', text: 'Say it, then do it.', example: ['clap, stamp, clap, stamp'] },
    ],
    remember: 'Keep the beat steady, like a heartbeat.',
  },
  'c-stretch': {
    intro: 'Stretching gets our bodies ready to move.',
    steps: [
      { title: 'Reach up', text: 'Stand tall and reach up to the sky. Then touch your toes.' },
      { title: 'Go slowly', text: 'Stretch slowly and gently. Never jerk.' },
    ],
    remember: 'Stretch slowly before you play.',
  },
  'c-jump': {
    intro: 'Jumping makes our legs strong.',
    steps: [
      { title: 'Ways to jump', text: 'Jump on two feet. Hop on one foot. Jump forward like a frog.' },
      { title: 'Land softly', text: 'Bend your knees when you land so you do not get hurt.' },
    ],
    remember: 'Bend your knees and land softly.',
  },
  'c-games': {
    intro: 'Singing games are songs we play together.',
    steps: [
      { title: 'Play together', text: 'Stand in a circle, hold hands gently and sing.' },
      { title: 'Be kind', text: 'Take turns and let everyone join the game.' },
    ],
    remember: 'Take turns and let everyone join.',
  },
  'c-catch': {
    intro: 'We throw and catch balls and bean bags.',
    steps: [
      { title: 'Throwing', text: 'Throw the ball gently to your friend.', visual: { kind: 'art', art: ['ball'] } },
      { title: 'Catching', text: 'Keep your eyes on the ball and get your hands ready.' },
    ],
    remember: 'Eyes on the ball, throw gently.',
  },
  'c-rolls': {
    intro: 'We roll and balance to control our bodies.',
    steps: [
      { title: 'Log roll', text: 'Lie on a mat with arms up straight and roll like a log.' },
      { title: 'Balance', text: 'Stand on one leg and stretch your arms out to stay steady.' },
    ],
    remember: 'Roll on a soft mat, one at a time.',
  },
  'c-water': {
    intro: 'Water is fun, but it can be dangerous.',
    steps: [
      { title: 'Stay safe', text: 'Only play near water with an adult watching.' },
      { title: 'Ask for help', text: 'If someone is in trouble in water, shout for an adult.' },
    ],
    remember: 'Never go near water without a grown-up.',
  },
  'c-instruments': {
    intro: 'Musical instruments make music in different ways.',
    steps: [
      { title: 'Beat, shake and blow', text: 'We beat a drum, shake a shaker and blow a whistle.', visual: { kind: 'art', art: ['drum', 'bell', 'whistle'] } },
      { title: 'Make your own', text: 'Put seeds in a closed tin to make a shaker.' },
    ],
    remember: 'Beat a drum, shake a shaker, blow a whistle.',
  },
}

export const CRE1_LESSONS: Record<string, Lesson> = {
  'r-self': {
    intro: 'God made me. I am special.',
    steps: [
      { title: 'My body', text: 'God gave me eyes to see, ears to hear and hands to touch.', visual: { kind: 'art', art: ['ear', 'hand'] } },
      { title: 'My name', text: 'I have a name. Everyone has a special name.' },
    ],
    remember: 'God made me special, and He made everyone special.',
  },
  'r-family': {
    intro: 'God gave me a family.',
    steps: [
      { title: 'My family', text: 'Father, mother, brothers, sisters and grandparents.' },
      { title: 'Love at home', text: 'We obey, help and share at home.' },
    ],
    remember: 'Love and obey your family.',
  },
  'r-creation': {
    intro: 'God made the world and everything in it.',
    steps: [
      { title: 'What God made', text: 'God made the sun, trees, flowers, rivers and animals.', visual: { kind: 'art', art: ['sun', 'tree', 'flower', 'fish'] } },
      { title: 'Caring for it', text: 'We care for God\'s world by watering plants and being kind to animals.' },
    ],
    remember: 'God made the world; we take care of it.',
  },
  'r-bible': {
    intro: 'The Bible is God\'s special book.',
    steps: [
      { title: 'God\'s book', text: 'The Bible tells us about God. We keep it clean and do not tear it.', visual: { kind: 'art', art: ['book'] } },
      { title: 'Bible stories', text: 'Noah built a big boat. David looked after sheep.' },
    ],
    remember: 'The Bible is God\'s book. Keep it clean.',
  },
  'r-jesus': {
    intro: 'Jesus was born in Bethlehem.',
    steps: [
      { title: 'Baby Jesus', text: 'Mary was His mother. Baby Jesus slept in a manger.' },
      { title: 'Christmas', text: 'At Christmas we remember the birth of Jesus.', visual: { kind: 'art', art: ['star'] } },
    ],
    remember: 'Jesus was born in Bethlehem; we remember it at Christmas.',
  },
  'r-living': {
    intro: 'God wants us to be kind and good.',
    steps: [
      { title: 'Praying', text: 'We pray before eating and before sleeping.' },
      { title: 'Good deeds', text: 'Share, help, say thank you and tell the truth.' },
    ],
    remember: 'Pray every day and do good deeds.',
  },
  'r-church': {
    intro: 'The church is where Christians worship God together.',
    steps: [
      { title: 'In church', text: 'We pray, sing and listen to the Bible.' },
      { title: 'Good manners', text: 'Sit quietly, listen and do not run around.' },
    ],
    remember: 'In church we pray, sing and listen quietly.',
  },
}
