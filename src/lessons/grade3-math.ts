// Grade 3 Mathematical Activities lessons. Short, worked, and in the order papers ask.
import type { Lesson } from './types'

export const MATH3_LESSONS: Record<string, Lesson> = {
  't-concept': {
    intro: 'We compare numbers to know which is bigger, and we use words like first and tenth to say where things are in a line.',
    steps: [
      {
        title: 'Bigger, smaller or the same',
        text: 'The sign opens its mouth towards the bigger number, like a hungry crocodile. > means greater than, < means less than, = means the same.',
        example: ['64 > 46', '38 < 83', '50 = 50'],
      },
      {
        title: 'Compare from the left',
        text: 'Look at the hundreds first. If they are the same, look at the tens. If those are the same too, look at the ones.',
        example: ['527 and 572', 'Hundreds: 5 and 5, the same', 'Tens: 2 and 7, so 527 < 572'],
      },
      {
        title: 'First, second, third…',
        text: 'Count from the side the question says. "Third from the left" means start counting at the left end.',
        visual: { kind: 'art', art: ['goat', 'cow', 'hen', 'fish', 'bird'] },
        example: ['From the left: goat 1st, cow 2nd, hen 3rd', 'From the right: bird 1st, fish 2nd, hen 3rd'],
      },
      {
        title: 'Position from the back',
        text: 'In a line of children, your place from the back is: total − your place from the front + 1.',
        example: ['15 children. Amina is 4th from the front.', '15 − 4 + 1 = 12', 'Amina is 12th from the back.'],
      },
    ],
    remember: 'Compare hundreds, then tens, then ones. To count from the other end: total − place + 1.',
  },
  't-whole': {
    intro: 'Every digit in a number has a value. Knowing it lets us read, write and build numbers up to 1,000.',
    steps: [
      {
        title: 'Hundreds, tens and ones',
        text: 'In 647 the 6 means 6 hundreds, the 4 means 4 tens and the 7 means 7 ones.',
        example: ['647 = 600 + 40 + 7', '    = 6 hundreds, 4 tens, 7 ones'],
      },
      {
        title: 'The zero keeps a place',
        text: 'When there are no tens, we still write 0 so the hundreds stay in their place.',
        example: ['Three hundred and five = 305', 'not 35'],
      },
      {
        title: 'Number names',
        text: 'We say "hundred and" before the tens and ones, the way Kenyan papers write them.',
        example: ['179 = one hundred and seventy-nine', '800 = eight hundred'],
      },
      {
        title: 'Number patterns',
        text: 'Find what is added each time, then keep adding it.',
        visual: { kind: 'sequence', items: [230, 240, 250, null, 270] },
        example: ['230, 240, 250 … the jump is +10', 'The missing number is 260'],
      },
    ],
    remember: 'Read each digit by its place: hundreds, tens, ones. A zero holds an empty place.',
  },
  't-add': {
    intro: 'Adding means putting together. With big numbers we add one column at a time.',
    steps: [
      {
        title: 'Line up the columns',
        text: 'Write ones under ones, tens under tens and hundreds under hundreds. Always start adding from the ones.',
        visual: { kind: 'sum', a: 243, b: 125, op: '+', result: 368, vertical: true },
      },
      {
        title: 'Carrying a ten',
        text: 'If a column adds up to 10 or more, write the ones and carry the ten to the next column.',
        visual: { kind: 'sum', a: 368, b: 257, op: '+', result: 625, vertical: true },
        example: ['Ones: 8 + 7 = 15. Write 5, carry 1.', 'Tens: 6 + 5 + 1 = 12. Write 2, carry 1.', 'Hundreds: 3 + 2 + 1 = 6.'],
      },
      {
        title: 'Three numbers at once',
        text: 'Add two of them first, then add the third.',
        example: ['24 + 14 + 13', '24 + 14 = 38', '38 + 13 = 51'],
      },
    ],
    remember: 'Start from the ones. When a column makes ten or more, carry the ten.',
  },
  't-sub': {
    intro: 'Subtracting means taking away, or finding how many are left.',
    steps: [
      {
        title: 'Start from the ones',
        text: 'Line up the columns and subtract the ones first, then the tens, then the hundreds.',
        visual: { kind: 'sum', a: 586, b: 243, op: '−', result: 343, vertical: true },
      },
      {
        title: 'Borrowing',
        text: 'If the top digit is smaller, borrow one ten from the next column. The top digit gets 10 more.',
        visual: { kind: 'sum', a: 539, b: 252, op: '−', result: 287, vertical: true },
        example: ['Ones: 9 − 2 = 7', 'Tens: 3 is less than 5. Borrow: 13 − 5 = 8', 'Hundreds: 4 − 2 = 2'],
      },
      {
        title: 'Borrowing across a zero',
        text: 'When the tens digit is 0, first borrow from the hundreds into the tens, then from the tens into the ones.',
        example: ['604 − 287', 'Hundreds to tens: 5 H, 10 T', 'Tens to ones: 9 T, 14 ones', '14 − 7 = 7', '9 − 8 = 1', '5 − 2 = 3', 'Answer: 317'],
      },
      {
        title: 'Check with adding',
        text: 'Add your answer to the number you took away. You should get the number you started with.',
        example: ['317 + 287 = 604 ✓'],
      },
    ],
    remember: 'Top digit too small? Borrow a ten from the next column. Check by adding back.',
  },
  't-mul': {
    intro: 'Multiplying is a quick way of adding equal groups.',
    steps: [
      {
        title: 'Equal groups',
        text: '3 groups of 4 is 4 + 4 + 4. We write it 3 × 4.',
        visual: { kind: 'groups', groups: [{ art: 'egg', n: 4 }, { art: 'egg', n: 4 }, { art: 'egg', n: 4 }] },
        example: ['4 + 4 + 4 = 12', '3 × 4 = 12'],
      },
      {
        title: 'Legs, wheels and fingers',
        text: 'Each goat has 4 legs. For 8 goats, multiply the number of goats by the legs on one goat.',
        example: ['8 goats × 4 legs = 32 legs'],
      },
      {
        title: 'Every day for many days',
        text: 'If something happens the same way each day, multiply by the number of days.',
        example: ['10 oranges a day for 5 days', '10 × 5 = 50 oranges'],
      },
    ],
    remember: 'Groups × how many in each group = total. Order does not matter: 3 × 4 = 4 × 3.',
  },
  't-div': {
    intro: 'Dividing means sharing equally, or making equal groups.',
    steps: [
      {
        title: 'Sharing equally',
        text: '12 mangoes shared by 3 children: each child gets the same number.',
        visual: { kind: 'groups', groups: [{ art: 'mango', n: 4 }, { art: 'mango', n: 4 }, { art: 'mango', n: 4 }] },
        example: ['12 ÷ 3 = 4 mangoes each'],
      },
      {
        title: 'Making groups',
        text: 'A car carries 5 people. How many cars for 20 people? Count how many fives make 20.',
        example: ['20 ÷ 5 = 4 cars'],
      },
      {
        title: 'Use your times tables',
        text: 'Division is multiplication backwards. To find 50 ÷ 10, ask: 10 times what makes 50?',
        example: ['10 × 5 = 50, so 50 ÷ 10 = 5'],
      },
    ],
    remember: 'To divide, ask: what times the divisor makes the total?',
  },
  't-frac': {
    intro: 'A fraction is a part of a whole that has been cut into equal parts.',
    steps: [
      {
        title: 'Equal parts',
        text: 'The bottom number says how many equal parts. The top number says how many we take.',
        visual: { kind: 'fraction', parts: 4, shaded: 1, shape: 'circle' },
        example: ['1 part shaded out of 4 = 1/4 (one quarter)'],
      },
      {
        title: 'Halves, quarters, eighths',
        text: 'Cut into 2 is halves, into 4 is quarters, into 8 is eighths. More parts means smaller pieces.',
        visual: { kind: 'fraction', parts: 8, shaded: 3, shape: 'bar' },
        example: ['3 of 8 parts shaded = 3/8'],
      },
      {
        title: 'A fraction of a number',
        text: 'To find a half, share into 2. To find a quarter, share into 4.',
        example: ['½ of 16 = 16 ÷ 2 = 8', '¼ of 20 = 20 ÷ 4 = 5'],
      },
    ],
    remember: 'Bottom number: how many equal parts. Top number: how many we take.',
  },
  't-length': {
    intro: 'Length tells us how long something is. Long things are measured in metres.',
    steps: [
      {
        title: 'The metre',
        text: 'A metre is about one big step of an adult. We write metres as m.',
        example: ['A classroom door is about 2 m tall.'],
      },
      {
        title: 'Adding and subtracting metres',
        text: 'Work with the numbers as usual, then write m after the answer.',
        example: ['27 m + 15 m = 42 m', '60 m − 25 m = 35 m'],
      },
      {
        title: 'How many pieces?',
        text: 'To cut a long rope into equal pieces, divide the length by the size of one piece.',
        example: ['A 20 m rope cut into 5 m pieces', '20 ÷ 5 = 4 pieces'],
      },
    ],
    remember: 'Measure long things in metres (m), and always write the unit in your answer.',
  },
  't-mass': {
    intro: 'Mass tells us how heavy something is. We measure it in kilograms.',
    steps: [
      {
        title: 'The kilogram',
        text: 'A packet of sugar is about 1 kilogram. We write kilograms as kg.',
        visual: { kind: 'balance', left: 'pumpkin', right: 'feather', heavier: 'left' },
        example: ['The heavier side of a beam balance goes down.'],
      },
      {
        title: 'Adding and taking away',
        text: 'Add or subtract the kilograms, then write kg.',
        example: ['A bag has 45 kg of maize. 18 kg is sold.', '45 − 18 = 27 kg left'],
      },
      {
        title: 'Filling a box',
        text: 'How many 2 kg packets fill a 30 kg box? Divide.',
        example: ['30 ÷ 2 = 15 packets'],
      },
    ],
    remember: 'Heavy things are measured in kilograms (kg). The heavier side of a balance goes down.',
  },
  't-capacity': {
    intro: 'Capacity tells us how much a container can hold. We measure it in litres.',
    steps: [
      {
        title: 'The litre',
        text: 'A big bottle of water holds about 1 litre. We write litres as l.',
        example: ['A jerrycan holds 20 l.'],
      },
      {
        title: 'Full and empty',
        text: 'If water is used, subtract. If water is added, add.',
        example: ['A tank had 500 l. 120 l were used.', '500 − 120 = 380 l left'],
      },
      {
        title: 'How many times to fill?',
        text: 'To fill a 20 l jerrycan with a 5 l jug, divide.',
        example: ['20 ÷ 5 = 4 jugs'],
      },
    ],
    remember: 'Liquids are measured in litres (l). Divide to find how many small containers fill a big one.',
  },
  't-time': {
    intro: 'We read clocks, and use days and months, to plan our lives.',
    steps: [
      {
        title: 'The two hands',
        text: 'The short hand shows the hour. The long hand shows the minutes. When the long hand is on 12, it is o\'clock.',
        visual: { kind: 'clock', hour: 3, minute: 0 },
        example: ['Short hand on 3, long hand on 12: 3 o\'clock'],
      },
      {
        title: 'Half past and quarter past',
        text: 'Long hand on 6 is half past. On 3 it is quarter past. On 9 it is quarter to the next hour.',
        visual: { kind: 'clock', hour: 7, minute: 30 },
        example: ['Long hand on 6, short hand between 7 and 8: half past 7'],
      },
      {
        title: 'Days and months',
        text: 'A week has 7 days and a year has 12 months. Some months have 30 days, others 31, and February 28 or 29.',
        example: ['30 days: April, June, September, November', '31 days: all the others except February'],
      },
    ],
    remember: 'Short hand: hours. Long hand: minutes. 7 days in a week, 12 months in a year.',
  },
  't-money': {
    intro: 'Kenyan money is in shillings and cents. 100 cents make 1 shilling.',
    steps: [
      {
        title: 'Shillings and cents columns',
        text: 'Write shillings under shillings and cents under cents, just like a bill.',
        visual: { kind: 'ledger', rows: [[25, 50], [14, 30]], op: '+' },
        example: ['Cents: 50 + 30 = 80', 'Shillings: 25 + 14 = 39', 'Total: Sh 39.80'],
      },
      {
        title: 'When cents make a shilling',
        text: 'If the cents add up to 100 or more, change 100 cents into 1 shilling and carry it.',
        example: ['Sh 12.70 + Sh 5.50', 'Cents: 70 + 50 = 120 = 1 shilling and 20 cents', 'Shillings: 12 + 5 + 1 = 18', 'Total: Sh 18.20'],
      },
      {
        title: 'Change',
        text: 'Change is what you get back. Take the price away from the money you gave.',
        example: ['You give Sh 100 for a book of Sh 65.', '100 − 65 = Sh 35 change'],
      },
    ],
    remember: '100 cents = 1 shilling. Change = money given − price.',
  },
  't-position': {
    intro: 'Position words tell us where things are, and turns tell us which way we face.',
    steps: [
      {
        title: 'Left and right',
        text: 'Hold up both hands, palms away from you. The thumb and first finger of your left hand make an L, for left. In a row, the left end is where we start reading.',
        visual: { kind: 'art', art: ['drum', 'cup', 'tree'] },
        example: ['The cup is between the drum and the tree.', 'The drum is on the left of the cup.'],
      },
      {
        title: 'Quarter turns',
        text: 'Face the blackboard. A quarter turn to the right makes you face the door. Another quarter turn faces the back wall.',
        example: ['Turn right: blackboard → door → back wall → window'],
      },
      {
        title: 'Half and full turns',
        text: 'Two quarter turns make a half turn: you face the opposite way. Four quarter turns make a full turn: you are back where you started.',
        example: ['Three right turns = one left turn'],
      },
    ],
    remember: 'Quarter turn: one side. Half turn: the opposite side. Full turn: back to the start.',
  },
  't-shapes': {
    intro: 'Shapes are all around us. We know them by their sides and corners.',
    steps: [
      {
        title: 'Sides and corners',
        text: 'A triangle has 3 sides and 3 corners. A square and a rectangle have 4 sides and 4 corners. A circle has no corners.',
        visual: { kind: 'shapes', shapes: [{ kind: 'triangle' }, { kind: 'square' }, { kind: 'rectangle' }, { kind: 'circle' }] },
      },
      {
        title: 'Hidden triangles',
        text: 'A line inside a shape can make new triangles. Count the small ones, then look for big ones made of two or more.',
        visual: { kind: 'figure', figure: 'tri2' },
        example: ['2 small triangles + 1 big one = 3'],
      },
      {
        title: 'Shape patterns',
        text: 'Find the part that repeats, then say what comes next.',
        visual: { kind: 'pattern', items: [{ kind: 'circle' }, { kind: 'triangle' }, { kind: 'circle' }, { kind: 'triangle' }, null] },
        example: ['circle, triangle, circle, triangle … circle'],
      },
    ],
    remember: 'Count sides and corners. When counting triangles, count small ones first, then the big ones.',
  },
}
