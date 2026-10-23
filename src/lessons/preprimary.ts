// Pre-primary lessons (PP1 and PP2), one per topic. Very short, picture-led and read aloud:
// a grown-up can sit beside the child and point.
import type { Lesson } from './types'

export const PREPRIMARY_LESSONS: Record<string, Lesson> = {
  // ── Mathematical Activities ──
  'pm-sort': {
    intro: 'Things that are alike go together. Let us find the one that is different.',
    steps: [
      { title: 'The same', text: 'These mangoes are all the same.', visual: { kind: 'count', art: 'mango', n: 3 } },
      { title: 'Different', text: 'A ball is not a mango. It is different.', visual: { kind: 'art', art: ['mango', 'mango', 'ball'] } },
      { title: 'Groups', text: 'Fruits go with fruits. Animals go with animals.', visual: { kind: 'art', art: ['orange', 'banana', 'goat', 'cow'] } },
    ],
    remember: 'Look at each one. Which one is not like the others?',
  },
  'pm-match': {
    intro: 'Some things go together, like a cup and a jug.',
    steps: [
      { title: 'The same picture', text: 'A star matches a star.', visual: { kind: 'art', art: ['star', 'star'] } },
      { title: 'Things that go together', text: 'A hen gives us an egg. They go together.', visual: { kind: 'art', art: ['hen', 'egg'] } },
      { title: 'More pairs', text: 'The moon and the stars. A spoon and a plate.', visual: { kind: 'art', art: ['moon', 'star', 'spoon', 'plate'] } },
    ],
    remember: 'Ask: which one goes with this one?',
  },
  'pm-count': {
    intro: 'We count to find out how many. Touch each one and say a number.',
    steps: [
      { title: 'Touch and count', text: 'One, two, three. There are three oranges.', visual: { kind: 'count', art: 'orange', n: 3 } },
      { title: 'Count once', text: 'Count each one only once. The last number tells how many.', visual: { kind: 'count', art: 'ball', n: 5 } },
    ],
    remember: 'Touch each one, say one number, and stop at the last one.',
  },
  'pm-numerals': {
    intro: 'Numbers have names and shapes. Let us find them.',
    steps: [
      { title: 'Number names', text: 'This is one, two, three, four, five.', visual: { kind: 'sequence', items: [1, 2, 3, 4, 5] } },
      { title: 'What comes next', text: 'After four comes five. Before four comes three.', visual: { kind: 'sequence', items: [3, 4, 5] } },
    ],
    remember: 'Count out loud: the next number is one more.',
  },
  'pm-compare': {
    intro: 'Some groups have more and some have fewer.',
    steps: [
      { title: 'More', text: 'There are more mangoes than bananas.', visual: { kind: 'groups', groups: [{ art: 'mango', n: 4 }, { art: 'banana', n: 2 }], joiner: 'vs' } },
      { title: 'Fewer', text: 'There are fewer bananas.', visual: { kind: 'groups', groups: [{ art: 'banana', n: 2 }, { art: 'mango', n: 4 }], joiner: 'vs' } },
    ],
    remember: 'Count both groups. The bigger number has more.',
  },
  'pm-add': {
    intro: 'When we put things together, we get more.',
    steps: [
      { title: 'One more', text: 'Two eggs and one more egg make three eggs.', visual: { kind: 'groups', groups: [{ art: 'egg', n: 2 }, { art: 'egg', n: 1 }], joiner: '+' } },
      { title: 'Altogether', text: 'Three balls and two balls make five balls altogether.', visual: { kind: 'groups', groups: [{ art: 'ball', n: 3 }, { art: 'ball', n: 2 }], joiner: '+' } },
    ],
    remember: 'Put them together, then count them all.',
  },
  'pm-sub': {
    intro: 'When some go away, fewer are left.',
    steps: [
      { title: 'Take away', text: 'Five birds. Two fly away. Three are left.', visual: { kind: 'groups', groups: [{ art: 'bird', n: 5 }, { art: 'bird', n: 2 }], joiner: '−' } },
      { title: 'Count what is left', text: 'Cover the ones that went away, then count the rest.' },
    ],
    remember: 'Take some away, then count what is left.',
  },
  'pm-size': {
    intro: 'Things can be big or small, long or short, tall or short.',
    steps: [
      { title: 'Big and small', text: 'One ball is big. One ball is small.', visual: { kind: 'sizes', art: 'ball', scales: [1, 0.55], axis: 'both' } },
      { title: 'Long and short', text: 'One pencil is long. One pencil is short.', visual: { kind: 'sizes', art: 'pencil', scales: [1, 0.55], axis: 'x' } },
      { title: 'Tall and short', text: 'One tree is tall. One tree is short.', visual: { kind: 'sizes', art: 'tree', scales: [1, 0.55], axis: 'y' } },
    ],
    remember: 'Put them side by side and look carefully.',
  },
  'pm-mass': {
    intro: 'Some things are heavy and some are light.',
    steps: [
      { title: 'Heavy and light', text: 'A stone is heavy. A feather is light.', visual: { kind: 'art', art: ['stone', 'feather'] } },
      { title: 'The balance', text: 'On a balance, the heavier side goes down.', visual: { kind: 'balance', left: 'stone', right: 'feather', heavier: 'left' } },
    ],
    remember: 'The heavier side of the balance goes down.',
  },
  'pm-capacity': {
    intro: 'Some containers hold more water than others.',
    steps: [
      { title: 'Holds more', text: 'A jerrycan holds more water than a cup.', visual: { kind: 'art', art: ['jerrycan', 'cup'] } },
      { title: 'Full and empty', text: 'A full cup has water to the top. An empty cup has no water.' },
    ],
    remember: 'Bigger containers usually hold more.',
  },
  'pm-time': {
    intro: 'We do some things in the day and some things at night.',
    steps: [
      { title: 'Day', text: 'In the day the sun shines. We go to school and play.', visual: { kind: 'art', art: ['sun'] } },
      { title: 'Night', text: 'At night we see the moon and stars. We sleep.', visual: { kind: 'art', art: ['moon', 'star'] } },
      { title: 'Days of the week', text: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.' },
    ],
    remember: 'Sun for the day, moon and stars for the night.',
  },
  'pm-money': {
    intro: 'We use coins to buy things. Each coin has a number on it.',
    steps: [
      { title: 'Our coins', text: 'One shilling, five shillings, ten shillings and twenty shillings.', visual: { kind: 'art', art: ['coin1', 'coin5', 'coin10', 'coin20'] } },
      { title: 'Counting money', text: 'Five shillings and five shillings make ten shillings.', visual: { kind: 'money', values: [5, 5] } },
    ],
    remember: 'Read the number on each coin, then count on.',
  },
  'pm-shapes': {
    intro: 'Shapes are all around us.',
    steps: [
      { title: 'Circle', text: 'A circle is round, like a ball.', visual: { kind: 'shapes', shapes: [{ kind: 'circle', color: '#d64545' }] } },
      { title: 'Triangle and square', text: 'A triangle has three sides. A square has four equal sides.', visual: { kind: 'shapes', shapes: [{ kind: 'triangle', color: '#3f7fd1' }, { kind: 'square', color: '#3f9e5a' }] } },
      { title: 'Rectangle', text: 'A rectangle is long, like a book.', visual: { kind: 'shapes', shapes: [{ kind: 'rectangle', color: '#f2c53d' }] } },
    ],
    remember: 'Round is a circle; three sides make a triangle.',
  },
  'pm-patterns': {
    intro: 'A pattern repeats again and again.',
    steps: [
      { title: 'Say the pattern', text: 'Circle, square, circle, square. What comes next? A circle!', visual: { kind: 'pattern', items: [{ kind: 'circle', color: '#d64545' }, { kind: 'square', color: '#3f7fd1' }, { kind: 'circle', color: '#d64545' }, { kind: 'square', color: '#3f7fd1' }, null] } },
      { title: 'Keep it going', text: 'Find the part that repeats, then say it again.' },
    ],
    remember: 'Say the pattern out loud and keep it going.',
  },

  // ── Language Activities ──
  'pe-greet': {
    intro: 'Kind words make everyone happy.',
    steps: [
      { title: 'Greetings', text: 'Good morning. Good afternoon. Good evening. Goodbye.' },
      { title: 'Magic words', text: 'Say please when you ask. Say thank you when you get something. Say sorry when you make a mistake.' },
    ],
    remember: 'Please, thank you and sorry are kind words.',
  },
  'pe-listen': {
    intro: 'Good listeners hear every word.',
    steps: [
      { title: 'Listen carefully', text: 'Listen to the word. Then find its picture.', visual: { kind: 'art', art: ['cow', 'cup', 'cat'] } },
      { title: 'Ask again', text: 'If you did not hear, tap the speaker to listen again.' },
    ],
    remember: 'Listen to the whole word before you choose.',
  },
  'pe-sounds': {
    intro: 'Every word begins with a sound.',
    steps: [
      { title: 'First sounds', text: 'Ball begins with b. Cat begins with c. Sun begins with s.', visual: { kind: 'art', art: ['ball', 'cat', 'sun'] } },
      { title: 'Say it slowly', text: 'Say the word slowly. What do you hear first?' },
    ],
    remember: 'Say the word slowly and listen to the first sound.',
  },
  'pe-letters': {
    intro: 'Letters make words. Every letter has a big and a small shape.',
    steps: [
      { title: 'The alphabet', text: 'a, b, c, d, e, f, g… all the way to z.' },
      { title: 'Big and small', text: 'A and a are the same letter. B and b are the same letter.' },
    ],
    remember: 'Big letter, small letter: the same sound.',
  },
  'pe-words': {
    intro: 'Letters join together to make words we can read.',
    steps: [
      { title: 'Sound it out', text: 'c - a - t says cat.', visual: { kind: 'art', art: ['cat'] } },
      { title: 'Read and point', text: 'd - o - g says dog. s - u - n says sun.', visual: { kind: 'art', art: ['dog', 'sun'] } },
    ],
    remember: 'Say each sound, then blend them together.',
  },
  'pe-lines': {
    intro: 'Before we write letters, we draw lines.',
    steps: [
      { title: 'Straight lines', text: 'A straight line does not bend.', visual: { kind: 'lines', lines: ['straight', 'straight'] } },
      { title: 'Curved lines', text: 'A curved line bends like a rainbow.', visual: { kind: 'lines', lines: ['curved', 'curved'] } },
    ],
    remember: 'Straight lines stay straight; curved lines bend.',
  },
  'pe-spell': {
    intro: 'A word needs all its letters.',
    steps: [
      { title: 'Find what is missing', text: 'c _ t. Say cat slowly: the middle sound is a.', visual: { kind: 'art', art: ['cat'] } },
      { title: 'Check', text: 'Read the whole word again to check.' },
    ],
    remember: 'Say the word slowly; listen for the missing sound.',
  },

  // ── Environmental Activities ──
  'pv-myself': {
    intro: 'God gave me a wonderful body.',
    steps: [
      { title: 'My senses', text: 'I see with my eyes, hear with my ears, smell with my nose and taste with my tongue.' },
      { title: 'Moving', text: 'I walk with my legs and hold things with my hands.', visual: { kind: 'art', art: ['hand'] } },
    ],
    remember: 'Every part of my body has a job.',
  },
  'pv-family': {
    intro: 'My family loves and cares for me.',
    steps: [
      { title: 'My family', text: 'Mother, father, brothers, sisters, grandmothers and grandfathers.' },
      { title: 'Our home', text: 'We sleep in the bedroom, cook in the kitchen and bathe in the bathroom.', visual: { kind: 'art', art: ['house', 'bed', 'pot'] } },
    ],
    remember: 'Home is where my family cares for me.',
  },
  'pv-school': {
    intro: 'At school we learn and play together.',
    steps: [
      { title: 'People at school', text: 'Teachers teach us. The cook makes our food. Friends play with us.', visual: { kind: 'art', art: ['teacher', 'child'] } },
      { title: 'Things at school', text: 'Books, pencils and bags help us learn.', visual: { kind: 'art', art: ['book', 'pencil', 'bag'] } },
    ],
    remember: 'At school we listen, learn and share.',
  },
  'pv-weather': {
    intro: 'The weather can be sunny, rainy, windy or cloudy.',
    steps: [
      { title: 'Sunny and rainy', text: 'On a sunny day the sun shines. On a rainy day water falls from clouds.', visual: { kind: 'art', art: ['sun', 'rain'] } },
      { title: 'Windy and cloudy', text: 'Wind moves the trees. Grey clouds cover the sky.', visual: { kind: 'art', art: ['wind', 'cloud'] } },
    ],
    remember: 'Look at the sky to tell the weather.',
  },
  'pv-animals': {
    intro: 'Some animals live with us, and some live in the wild.',
    steps: [
      { title: 'At home', text: 'Cows, goats, hens and dogs live with people.', visual: { kind: 'art', art: ['cow', 'goat', 'hen', 'dog'] } },
      { title: 'In the wild', text: 'Lions, elephants, giraffes and zebras live in the wild.', visual: { kind: 'art', art: ['lion', 'elephant', 'giraffe', 'zebra'] } },
    ],
    remember: 'Home animals help us; wild animals live free.',
  },
  'pv-plants': {
    intro: 'Plants grow from seeds and give us food and shade.',
    steps: [
      { title: 'Plants grow', text: 'A seed grows into a plant. It needs water and sunlight.', visual: { kind: 'art', art: ['seed', 'tree'] } },
      { title: 'Plants give us food', text: 'We eat mangoes, bananas, maize and tomatoes.', visual: { kind: 'art', art: ['mango', 'banana', 'maize', 'tomato'] } },
    ],
    remember: 'Plants need water and sunlight to grow.',
  },
  'pv-hygiene': {
    intro: 'Keeping clean keeps us healthy.',
    steps: [
      { title: 'Wash and brush', text: 'Wash your hands with soap. Brush your teeth every day.', visual: { kind: 'art', art: ['soap', 'toothbrush'] } },
      { title: 'Comb and bathe', text: 'Comb your hair and take a bath.', visual: { kind: 'art', art: ['comb', 'towel'] } },
    ],
    remember: 'Wash your hands before eating and after the toilet.',
  },
  'pv-food': {
    intro: 'Good food helps us grow strong.',
    steps: [
      { title: 'Fruits and vegetables', text: 'Mangoes, bananas, carrots and sukuma wiki are good for us.', visual: { kind: 'art', art: ['mango', 'banana', 'tomato'] } },
      { title: 'Only a little', text: 'Sweets and soda are treats. We eat only a little.' },
    ],
    remember: 'Eat fruits and vegetables every day.',
  },
  'pv-safety': {
    intro: 'Grown-ups help us to stay safe.',
    steps: [
      { title: 'Safe play', text: 'Play with balls and blocks. Leave knives and fire to grown-ups.', visual: { kind: 'art', art: ['ball'] } },
      { title: 'The road', text: 'Hold a grown-up\'s hand. Look left and right. Cross at the zebra crossing.' },
    ],
    remember: 'Hold a grown-up\'s hand near the road.',
  },
  'pv-care': {
    intro: 'We keep our home and school clean and green.',
    steps: [
      { title: 'Litter', text: 'Put papers in the dustbin.' },
      { title: 'Water and plants', text: 'Close the tap after use. Water the plants and do not step on them.', visual: { kind: 'art', art: ['tap', 'flower'] } },
    ],
    remember: 'Litter in the bin; close the tap.',
  },

  // ── Psychomotor and Creative Activities ──
  'pc-colours': {
    intro: 'The world is full of beautiful colours.',
    steps: [
      { title: 'Colours', text: 'Red, blue, yellow and green.', visual: { kind: 'shapes', shapes: [{ kind: 'circle', color: '#d64545' }, { kind: 'circle', color: '#3f7fd1' }, { kind: 'circle', color: '#f2c53d' }, { kind: 'circle', color: '#3f9e5a' }] } },
      { title: 'Colours around us', text: 'The sun is yellow. Grass is green. The sky is blue.', visual: { kind: 'art', art: ['sun', 'tree'] } },
    ],
    remember: 'Look around: name the colours you see.',
  },
  'pc-picture': {
    intro: 'We draw and colour to share what we see and imagine.',
    steps: [
      { title: 'Tools', text: 'We use crayons, pencils and paper to draw and colour.', visual: { kind: 'art', art: ['pencil', 'book'] } },
      { title: 'Colour neatly', text: 'Colour inside the lines, using the right colours.' },
    ],
    remember: 'Draw, then colour neatly inside the lines.',
  },
  'pc-music': {
    intro: 'We make music with our voices and with instruments.',
    steps: [
      { title: 'Instruments', text: 'We beat a drum, ring a bell and blow a whistle.', visual: { kind: 'art', art: ['drum', 'bell', 'whistle'] } },
      { title: 'Singing', text: 'We sing songs together and clap to the beat.' },
    ],
    remember: 'Beat a drum, ring a bell, blow a whistle.',
  },
  'pc-movement': {
    intro: 'Moving makes our bodies strong.',
    steps: [
      { title: 'Ways to move', text: 'We walk, run, jump, hop and skip.' },
      { title: 'Land softly', text: 'Bend your knees when you land.' },
    ],
    remember: 'Bend your knees and land softly.',
  },
  'pc-games': {
    intro: 'Games are fun when we play together and take turns.',
    steps: [
      { title: 'Singing games', text: 'We sing and move in a circle together.' },
      { title: 'Taking turns', text: 'Wait for your turn and help your friends.' },
    ],
    remember: 'Take turns and play kindly.',
  },

  // ── Religious Education Activities ──
  'pr-creation': {
    intro: 'God made the whole world and everything in it.',
    steps: [
      { title: 'God made', text: 'God made the sun, the moon, the stars, the plants and the animals.', visual: { kind: 'art', art: ['sun', 'moon', 'tree', 'bird'] } },
      { title: 'God made me', text: 'God made me special and loves me.', visual: { kind: 'art', art: ['child'] } },
    ],
    remember: 'God made everything, and God made me.',
  },
  'pr-bible': {
    intro: 'The Bible is God\'s special book.',
    steps: [
      { title: 'Bible stories', text: 'Noah built a big boat. Baby Moses was kept safe in a basket. David was a brave shepherd boy.', visual: { kind: 'art', art: ['book'] } },
      { title: 'Caring for the Bible', text: 'We keep the Bible clean and read it gently.' },
    ],
    remember: 'The Bible tells us about God\'s love.',
  },
  'pr-jesus': {
    intro: 'Christmas is when we remember the birth of baby Jesus.',
    steps: [
      { title: 'Baby Jesus', text: 'Jesus was born in Bethlehem. His mother was Mary.' },
      { title: 'Visitors', text: 'Shepherds came to see Him, and a bright star shone.', visual: { kind: 'art', art: ['star'] } },
    ],
    remember: 'At Christmas we remember baby Jesus.',
  },
  'pr-prayer': {
    intro: 'Prayer is talking to God.',
    steps: [
      { title: 'When we pray', text: 'We pray when we wake up, before we eat and before we sleep.' },
      { title: 'What we say', text: 'We thank God and ask Him to keep us safe.' },
    ],
    remember: 'We can talk to God any time.',
  },
  'pr-values': {
    intro: 'God wants us to be kind to one another.',
    steps: [
      { title: 'Kind things', text: 'We share, help, say thank you and say sorry.' },
      { title: 'Obeying', text: 'We listen to our parents and teachers.' },
    ],
    remember: 'Share, help and be kind.',
  },
}
