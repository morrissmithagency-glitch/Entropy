// Grade 2 Mathematics and English lessons.
import type { Lesson } from './types'

export const MATH2_LESSONS: Record<string, Lesson> = {
  's-concept': {
    intro: 'We compare groups and numbers to see which is more, and we use words like first and second to say where things are.',
    steps: [
      { title: 'More and less', text: 'Count each group. The group with the bigger number has more.', visual: { kind: 'groups', groups: [{ art: 'mango', n: 5 }, { art: 'orange', n: 3 }], joiner: 'vs' }, example: ['5 mangoes, 3 oranges', '5 is more than 3'] },
      { title: 'The signs > and <', text: 'The open mouth of the sign always faces the bigger number.', example: ['45 > 28', '19 < 30'] },
      { title: 'First, second, third', text: 'Count from the side the question says, starting with first.', visual: { kind: 'art', art: ['goat', 'hen', 'cow'] }, example: ['From the left: goat first, hen second, cow third'] },
    ],
    remember: 'The bigger number has more. The sign opens towards the bigger number.',
  },
  's-whole': {
    intro: 'Numbers up to 100 are made of tens and ones.',
    steps: [
      { title: 'Tens and ones', text: 'A bundle of ten sticks is one ten. Count the bundles, then the loose sticks.', visual: { kind: 'tens', tens: 4, ones: 6 }, example: ['4 tens and 6 ones = 46'] },
      { title: 'Number names', text: 'Say the tens, then the ones.', example: ['46 = forty-six', '70 = seventy', '15 = fifteen'] },
      { title: 'Counting in steps', text: 'Count on by 2s, 5s or 10s by adding the same number each time.', visual: { kind: 'sequence', items: [10, 20, 30, null, 50] }, example: ['+10 each time: 40 is missing'] },
      { title: 'Odd and even', text: 'Even numbers end in 0, 2, 4, 6 or 8. Odd numbers end in 1, 3, 5, 7 or 9.', example: ['24 is even', '37 is odd'] },
    ],
    remember: 'Tens first, then ones. Even numbers end in 0, 2, 4, 6, 8.',
  },
  's-add': {
    intro: 'Adding means putting groups together to find how many altogether.',
    steps: [
      { title: 'Count on', text: 'Start from the bigger number and count on.', example: ['8 + 3: start at 8, count 9, 10, 11'] },
      { title: 'Ones, then tens', text: 'Write the numbers one under the other. Add the ones first, then the tens.', visual: { kind: 'sum', a: 34, b: 25, op: '+', result: 59, vertical: true } },
      { title: 'Carrying', text: 'If the ones make 10 or more, write the ones and carry the ten to the tens column.', visual: { kind: 'sum', a: 38, b: 27, op: '+', result: 65, vertical: true }, example: ['8 + 7 = 15: write 5, carry 1', '3 + 2 + 1 = 6', 'Answer: 65'] },
    ],
    remember: 'Add the ones first. Ten or more? Carry the ten.',
  },
  's-sub': {
    intro: 'Subtracting means taking away to find how many are left.',
    steps: [
      { title: 'Take away', text: 'Start with all of them, take some away, and count what is left.', visual: { kind: 'count', art: 'egg', n: 9 }, example: ['9 eggs, 3 break: 9 − 3 = 6'] },
      { title: 'Ones, then tens', text: 'Subtract the ones first, then the tens.', visual: { kind: 'sum', a: 58, b: 23, op: '−', result: 35, vertical: true } },
      { title: 'Borrowing a ten', text: 'If the top ones digit is smaller, borrow one ten. The ones get 10 more.', visual: { kind: 'sum', a: 52, b: 27, op: '−', result: 25, vertical: true }, example: ['2 is less than 7: borrow, 12 − 7 = 5', '4 − 2 = 2', 'Answer: 25'] },
    ],
    remember: 'Take away the ones first. Too small? Borrow a ten.',
  },
  's-mul': {
    intro: 'Multiplying is a quick way to add equal groups.',
    steps: [
      { title: 'Equal groups', text: '3 groups of 2 is 2 + 2 + 2.', visual: { kind: 'groups', groups: [{ art: 'egg', n: 2 }, { art: 'egg', n: 2 }, { art: 'egg', n: 2 }] }, example: ['2 + 2 + 2 = 6', '3 × 2 = 6'] },
      { title: 'Counting in 2s, 5s and 10s', text: 'Count in steps to multiply quickly.', example: ['4 × 5: 5, 10, 15, 20', '3 × 10: 10, 20, 30'] },
    ],
    remember: 'Groups × how many in each group = total.',
  },
  's-div': {
    intro: 'Dividing means sharing equally so everyone gets the same.',
    steps: [
      { title: 'Share one by one', text: 'Give one to each person, again and again, until none are left.', visual: { kind: 'count', art: 'orange', n: 8 }, example: ['8 oranges for 2 children: 4 each'] },
      { title: 'Make equal groups', text: 'How many groups of 5 are in 15? Count in fives.', example: ['5, 10, 15: 3 groups'] },
    ],
    remember: 'Sharing equally means everyone gets the same number.',
  },
  's-frac': {
    intro: 'A fraction is a part of a whole that has been cut into equal parts.',
    steps: [
      { title: 'A half', text: 'Cut a whole into 2 equal parts. Each part is a half, written 1/2.', visual: { kind: 'fraction', parts: 2, shaded: 1, shape: 'circle' } },
      { title: 'A quarter', text: 'Cut a whole into 4 equal parts. Each part is a quarter, written 1/4.', visual: { kind: 'fraction', parts: 4, shaded: 1, shape: 'circle' } },
      { title: 'Half of a group', text: 'To find half of a group, share it into 2 equal groups.', example: ['Half of 10 = 5', 'A quarter of 8 = 2'] },
    ],
    remember: 'Half: 2 equal parts. Quarter: 4 equal parts.',
  },
  's-length': {
    intro: 'Length tells us how long or tall something is.',
    steps: [
      { title: 'Longer and shorter', text: 'Line things up at one end, then look at the other end.', visual: { kind: 'sizes', art: 'pencil', scales: [0.6, 1, 0.8], axis: 'x', labels: ['A', 'B', 'C'] }, example: ['B is the longest'] },
      { title: 'Measuring', text: 'We can measure with clips, hand spans or steps. Long things are measured in metres (m).' },
      { title: 'Adding metres', text: 'Add the numbers, then write m.', example: ['12 m + 7 m = 19 m'] },
    ],
    remember: 'Line up the ends to compare. Long things are measured in metres.',
  },
  's-mass': {
    intro: 'Mass tells us how heavy something is.',
    steps: [
      { title: 'Heavier and lighter', text: 'On a beam balance, the heavier side goes down.', visual: { kind: 'balance', left: 'pumpkin', right: 'feather', heavier: 'left' } },
      { title: 'Kilograms', text: 'We measure mass in kilograms (kg). A packet of sugar is about 1 kg.', example: ['5 kg + 3 kg = 8 kg'] },
    ],
    remember: 'The heavier side goes down. We measure mass in kilograms.',
  },
  's-capacity': {
    intro: 'Capacity tells us how much a container can hold.',
    steps: [
      { title: 'Holds more, holds less', text: 'A bigger container usually holds more water.', visual: { kind: 'units', art: 'jug', unit: 'cup', n: 4 }, example: ['4 cups fill the jug'] },
      { title: 'Litres', text: 'We measure liquids in litres. A big water bottle holds about 1 litre.', example: ['20 litres − 5 litres = 15 litres'] },
    ],
    remember: 'Count how many small containers fill a big one. Liquids are measured in litres.',
  },
  's-time': {
    intro: 'Clocks, days and months help us know when things happen.',
    steps: [
      { title: "O'clock", text: "When the long hand points to 12, it is o'clock. The short hand shows the hour.", visual: { kind: 'clock', hour: 8, minute: 0 }, example: ["8 o'clock"] },
      { title: 'Half past', text: 'When the long hand points to 6, it is half past.', visual: { kind: 'clock', hour: 2, minute: 30 }, example: ['half past 2'] },
      { title: 'Days of the week', text: 'There are 7 days: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.' },
    ],
    remember: "Long hand on 12: o'clock. Long hand on 6: half past. 7 days in a week.",
  },
  's-money': {
    intro: 'We use Kenyan shillings to buy things.',
    steps: [
      { title: 'Coins and notes', text: 'We have 1, 5, 10 and 20 shilling coins, and 50 and 100 shilling notes.', visual: { kind: 'money', values: [20, 10, 5, 1] } },
      { title: 'Counting money', text: 'Start with the biggest coin or note, then add the rest.', example: ['20 + 10 + 5 = 35 shillings'] },
      { title: 'Balance', text: 'Balance is the money you get back. Take the price away from the money you paid.', example: ['Pay 50 for a ruler of 20: 50 − 20 = 30'] },
    ],
    remember: 'Count from the biggest coin. Balance = money paid − price.',
  },
  's-position': {
    intro: 'Position words tell us where things are.',
    steps: [
      { title: 'Left, right and middle', text: 'The left end is where we start reading. The middle is in the centre.', visual: { kind: 'art', art: ['dog', 'cat', 'hen'] }, example: ['The cat is in the middle.'] },
      { title: 'Before, after and between', text: 'Between means in the middle of two things.', example: ['The cat is between the dog and the hen.'] },
    ],
    remember: 'Left end, right end, middle; between means in the middle of two.',
  },
  's-shapes': {
    intro: 'Lines can be straight or curved, and shapes are made from lines.',
    steps: [
      { title: 'Straight and curved lines', text: 'A straight line does not bend. A curved line bends like a smile.', visual: { kind: 'lines', lines: ['straight', 'curved'] } },
      { title: 'Shapes', text: 'A triangle has 3 sides. A square and a rectangle have 4. A circle is round with no corners.', visual: { kind: 'shapes', shapes: [{ kind: 'triangle' }, { kind: 'square' }, { kind: 'rectangle' }, { kind: 'circle' }] } },
      { title: 'Patterns', text: 'Find what repeats, then say what comes next.', visual: { kind: 'pattern', items: [{ kind: 'circle' }, { kind: 'square' }, { kind: 'circle' }, { kind: 'square' }, null] } },
    ],
    remember: 'Count the sides: triangle 3, square and rectangle 4, circle none.',
  },
}

export const ENGLISH2_LESSONS: Record<string, Lesson> = {
  'se-listen': {
    intro: 'Kind words make people happy and help us get along.',
    steps: [
      { title: 'Magic words', text: 'Say please when you ask, thank you when you get something, and sorry when you hurt someone.' },
      { title: 'Greetings', text: 'We say good morning, good afternoon and good evening, and good night before bed.' },
      { title: 'Answering', text: 'Listen to the question, then answer in a full sentence.', example: ['What is your name? → My name is Amani.'] },
    ],
    remember: 'Please, thank you and sorry. Answer in a full sentence.',
  },
  'se-phonics': {
    intro: 'Some letters work together to make one new sound.',
    steps: [
      { title: 'sh, ch and th', text: 'Two letters, one sound.', example: ['sh: ship, fish', 'ch: chair, lunch', 'th: three, bath'] },
      { title: 'ee, oo and ai', text: 'Two vowels can make one long sound.', example: ['ee: tree, bee', 'oo: moon, spoon', 'ai: rain, train'] },
      { title: 'Rhyming words', text: 'Rhyming words end with the same sound.', example: ['cat, hat, mat', 'ring, king, sing'] },
    ],
    remember: 'sh, ch, th, ee, oo, ai: two letters, one sound.',
  },
  'se-comp': {
    intro: 'When we read a story, we find out who, what, where and why.',
    steps: [
      { title: 'Read slowly', text: 'Read each sentence carefully. Point to the words as you read.' },
      { title: 'Find the answer', text: 'Look for the same words as the question in the story.', visual: { kind: 'passage', title: 'My Hen', text: 'I have a brown hen. She lays an egg every day.' }, example: ['What colour is the hen? → brown'] },
    ],
    remember: 'Find the question words in the story, then read that sentence again.',
  },
  'se-vocab': {
    intro: 'Knowing many words helps us read and talk well.',
    steps: [
      { title: 'Opposites', text: 'Opposites mean very different things.', example: ['big → small', 'hot → cold', 'full → empty'] },
      { title: 'Groups of words', text: 'Words can go together in groups.', example: ['Fruits: mango, orange, banana', 'Body: head, hand, leg'] },
    ],
    remember: 'Learn words in pairs of opposites and in groups.',
  },
  'se-nouns': {
    intro: 'Naming words name people, animals, places and things.',
    steps: [
      { title: 'Naming words', text: 'Dog, Mama, school and ball are naming words.', example: ['The _dog_ barks.'] },
      { title: 'One and many', text: 'Add s to most words. Add es to words ending in s, x, sh or ch.', example: ['cat → cats', 'box → boxes', 'dish → dishes'] },
      { title: 'Special words', text: 'Some words change in a special way.', example: ['man → men', 'child → children', 'tooth → teeth'] },
    ],
    remember: 'Most words add s; s, x, sh, ch add es; some are special.',
  },
  'se-pron': {
    intro: 'He, she, it, we and they stand in for names.',
    steps: [
      { title: 'He and she', text: 'Use he for a boy or man. Use she for a girl or woman.', example: ['My father is tall. _He_ is a farmer.'] },
      { title: 'It, we and they', text: 'It is for one thing or animal. We includes me. They is for many.', example: ['The goats are hungry. _They_ want grass.'] },
      { title: 'This, these, that, those', text: 'This and these are near. That and those are far. These and those are for many.' },
    ],
    remember: 'He, she, it for one; we and they for many.',
  },
  'se-verbs': {
    intro: 'Action words tell us what someone is doing.',
    steps: [
      { title: 'Doing it now', text: 'Use is or are with the -ing word.', example: ['The boy _is running_.', 'The girls _are singing_.'] },
      { title: 'Done before', text: 'Many action words add -ed when it already happened.', example: ['Yesterday I _walked_ to school.'] },
      { title: 'Spelling -ing', text: 'Some words double the last letter, or drop the e.', example: ['run → running', 'write → writing'] },
    ],
    remember: 'Now: is or are + -ing. Before: add -ed.',
  },
  'se-prep': {
    intro: 'Small words tell us where something is.',
    steps: [
      { title: 'In, on, under', text: 'In means inside. On means on top. Under means below.', visual: { kind: 'position', art: 'cat', where: 'on' }, example: ['The cat is _on_ the box.'] },
      { title: 'Beside and behind', text: 'Beside means next to. Behind means at the back.' },
    ],
    remember: 'In = inside, on = on top, under = below.',
  },
  'se-adj': {
    intro: 'Describing words tell us what things are like.',
    steps: [
      { title: 'Colours', text: 'A ripe tomato is red. Grass is green. Milk is white.' },
      { title: 'Size and feel', text: 'Big, small and tall tell size. Soft, hard, hot and cold tell how things feel.', example: ['a _soft_ pillow', 'a _big_ elephant'] },
    ],
    remember: 'Describing words tell colour, size and how things feel.',
  },
  'se-mech': {
    intro: 'Capital letters and full stops help others read our writing.',
    steps: [
      { title: 'Capital letters', text: 'Start every sentence with a capital letter. Names and places start with capitals. I is always a capital.', example: ['Amina and I live in Nakuru.'] },
      { title: 'End marks', text: 'A telling sentence ends with a full stop. A question ends with a question mark.', example: ['I like tea.', 'Do you like tea?'] },
    ],
    remember: 'Capital letter at the start; full stop or question mark at the end.',
  },
  'se-spell': {
    intro: 'To spell a word, say it slowly and write each sound.',
    steps: [
      { title: 'Sound it out', text: 'Say the word slowly. Write a letter for each sound.', visual: { kind: 'art', art: ['cat'] }, example: ['c - a - t → cat'] },
      { title: 'Check it', text: 'Read your word back. Does it look right?' },
    ],
    remember: 'Say it slowly, write each sound, read it back.',
  },
}
