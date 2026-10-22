// Grades 4–6 mathematics lessons, one per topic (um-frac covers u4m-frac, u5m-frac and
// u6m-frac). Steps start where Grade 4 starts and finish where Grade 6 finishes.
import type { Lesson } from './types'

export const UPPER_MATH_LESSONS: Record<string, Lesson> = {
  'um-whole': {
    intro: 'Big numbers are just small numbers in the right places. Know the places and you can read any number.',
    steps: [
      { title: 'Place value', text: 'From the right: ones, tens, hundreds, thousands, ten thousands, hundred thousands, millions. Each place is ten times the one before it.', example: ['4,572,068', '4 millions, 5 hundred thousands, 7 ten thousands,', '2 thousands, 0 hundreds, 6 tens, 8 ones'] },
      { title: 'Value of a digit', text: 'The value of a digit is the digit times its place.', example: ['In 36,415 the 6 is in the thousands place.', 'Its value is 6 × 1,000 = 6,000'] },
      { title: 'Rounding', text: 'Look at the digit to the right of the place you are rounding to. 5 or more: round up. Less than 5: round down.', example: ['Round 47,628 to the nearest thousand:', 'the hundreds digit is 6, so round up → 48,000'] },
      { title: 'Squares and roots', text: 'A square number is a number times itself. The square root goes back the other way.', example: ['9² = 9 × 9 = 81', '√81 = 9'] },
    ],
    remember: 'Name the place first, then the value. Round by looking one place to the right.',
  },
  'um-add': {
    intro: 'Adding big numbers is the same as adding small ones: line up the places and carry when a column passes 9.',
    steps: [
      { title: 'Line up', text: 'Write ones under ones, tens under tens, and so on.', example: ['  34,568', '+ 27,945', '--------', '  62,513'] },
      { title: 'Carry', text: 'When a column adds to 10 or more, write the ones and carry the tens to the next column.', example: ['8 + 5 = 13: write 3, carry 1'] },
      { title: 'Word problems', text: 'Words like "altogether", "total" and "in all" tell you to add. Estimate first so you can check your answer.', example: ['A school has 1,245 girls and 1,318 boys.', 'Total: 1,245 + 1,318 = 2,563 learners'] },
    ],
    remember: 'Line up the places, start from the ones, and carry tens to the left.',
  },
  'um-sub': {
    intro: 'Subtraction finds the difference or what is left. Borrow when the top digit is too small.',
    steps: [
      { title: 'Line up', text: 'Write the bigger number on top and line up the places.', example: ['  52,304', '− 18,527', '--------', '  33,777'] },
      { title: 'Borrow', text: 'If the top digit is smaller, take one from the next place to the left. It becomes ten more in this column.', example: ['4 − 7: borrow, 14 − 7 = 7'] },
      { title: 'Check by adding', text: 'Add your answer to the number you took away. You should get the top number.', example: ['33,777 + 18,527 = 52,304 ✓'] },
    ],
    remember: 'Borrow from the left when the top digit is too small, then check by adding back.',
  },
  'um-mul': {
    intro: 'Multiplication is quick adding of equal groups. Big multiplications are many small ones put together.',
    steps: [
      { title: 'By one digit', text: 'Multiply each place from the right and carry.', example: ['  4,316', '×     7', '-------', ' 30,212'] },
      { title: 'By two digits', text: 'Multiply by the ones, then by the tens (write a 0 first), then add.', example: ['  346 × 24', '  346 × 4  = 1,384', '  346 × 20 = 6,920', '  Total     = 8,304'] },
      { title: 'Order of operations', text: 'Brackets first, then division and multiplication, then addition and subtraction.', example: ['8 + 6 × 5 = 8 + 30 = 38', '(8 + 6) × 5 = 14 × 5 = 70'] },
    ],
    remember: 'Multiply place by place, add the parts, and do brackets, then × ÷, then + −.',
  },
  'um-div': {
    intro: 'Division shares equally. It also tells us about factors and multiples.',
    steps: [
      { title: 'Long division', text: 'Divide, multiply, subtract, bring down. Repeat.', example: ['864 ÷ 4', '8 ÷ 4 = 2, 6 ÷ 4 = 1 r 2, 24 ÷ 4 = 6', 'Answer: 216'] },
      { title: 'Remainders', text: 'What is left over is the remainder. In word problems, decide whether to round up or down.', example: ['50 pupils, 8 per bench: 50 ÷ 8 = 6 r 2', '7 benches are needed so no one stands.'] },
      { title: 'Divisibility', text: 'Even → by 2. Ends in 0 or 5 → by 5. Digits add to a multiple of 3 → by 3 (of 9 → by 9).', example: ['4,371: 4 + 3 + 7 + 1 = 15 → divisible by 3'] },
      { title: 'LCM and GCD', text: 'The LCM is the smallest number both divide into. The GCD (HCF) is the biggest number that divides both.', example: ['12 and 18: LCM = 36, GCD = 6'] },
    ],
    remember: 'Divide, multiply, subtract, bring down. Use digit tests to check divisibility.',
  },
  'um-frac': {
    intro: 'A fraction is part of a whole. The bottom number says how many equal parts; the top says how many we take.',
    steps: [
      { title: 'Equivalent fractions', text: 'Multiply or divide top and bottom by the same number.', example: ['2/3 = 4/6 = 8/12', '15/20 ÷ 5 → 3/4 (simplest form)'] },
      { title: 'Adding and subtracting', text: 'Make the bottoms the same first, then add or subtract the tops.', example: ['1/2 + 1/3 = 3/6 + 2/6 = 5/6'] },
      { title: 'Mixed numbers', text: 'A whole number and a fraction. Change to an improper fraction to work with it.', example: ['2 1/4 = 9/4'] },
      { title: 'Multiplying and dividing', text: 'Multiply tops and bottoms. To divide, turn the second fraction upside down and multiply.', example: ['2/3 × 3/5 = 6/15 = 2/5', '3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 1 1/2'] },
    ],
    remember: 'Same bottoms to add or subtract; flip the second fraction to divide.',
  },
  'um-dec': {
    intro: 'Decimals are fractions with bottoms of 10, 100 and 1,000, written with a point.',
    steps: [
      { title: 'Places after the point', text: 'Tenths, hundredths, thousandths.', example: ['0.7 = 7/10', '0.25 = 25/100 = 1/4', '3.125: 1 tenth, 2 hundredths, 5 thousandths'] },
      { title: 'Adding and subtracting', text: 'Line up the decimal points, fill gaps with zeros, then work as usual.', example: ['  4.50', '+ 2.75', '------', '  7.25'] },
      { title: 'Multiplying', text: 'Multiply as whole numbers, then count the decimal places in both numbers.', example: ['1.2 × 0.3: 12 × 3 = 36 → 2 places → 0.36', '4.7 × 100 = 470 (point moves 2 places right)'] },
    ],
    remember: 'Line up the points to add or subtract; count decimal places to multiply.',
  },
  'um-percent': {
    intro: 'Per cent means "out of 100". Percentages help us compare marks, prices and discounts.',
    steps: [
      { title: 'Fraction to per cent', text: 'Multiply the fraction by 100.', example: ['3/4 × 100 = 75%', '0.4 = 40%'] },
      { title: 'Per cent of a number', text: 'Write the per cent as a fraction of 100 and multiply.', example: ['25% of 800 = 25/100 × 800 = 200'] },
      { title: 'Discounts', text: 'Find the discount, then take it away from the price.', example: ['Price 2,000, discount 10%', '10% of 2,000 = 200', 'Pay 2,000 − 200 = 1,800'] },
    ],
    remember: 'Per cent is out of 100: divide by 100, then multiply.',
  },
  'um-length': {
    intro: 'We measure length in millimetres, centimetres, metres and kilometres.',
    steps: [
      { title: 'Units', text: '10 mm = 1 cm, 100 cm = 1 m, 1,000 m = 1 km.', example: ['3 m 45 cm = 345 cm', '2 km 300 m = 2,300 m'] },
      { title: 'Perimeter', text: 'The distance all the way round a shape. For a rectangle: 2 × (length + width).', example: ['12 m by 7 m: 2 × (12 + 7) = 38 m'] },
      { title: 'Circumference', text: 'The distance round a circle: C = πd or C = 2πr. Use π = 22/7.', example: ['d = 14 cm: C = 22/7 × 14 = 44 cm'] },
    ],
    remember: 'Change to the same unit first. Perimeter goes round; for a circle use π × d.',
  },
  'um-area': {
    intro: 'Area is the space a flat shape covers, measured in square units like cm² and m².',
    steps: [
      { title: 'Rectangles and squares', text: 'Area = length × width. A square is length × length.', example: ['8 cm by 5 cm = 40 cm²', 'square of side 6 m = 36 m²'] },
      { title: 'Triangles', text: 'Area = ½ × base × height.', example: ['base 10 cm, height 6 cm: ½ × 10 × 6 = 30 cm²'] },
      { title: 'Combined shapes', text: 'Split the shape into rectangles, or find the big rectangle and take away the missing part.', example: ['12 m × 10 m room minus a 3 m × 4 m store:', '120 − 12 = 108 m²'] },
    ],
    remember: 'Area = length × width for rectangles, ½ × base × height for triangles.',
  },
  'um-volume': {
    intro: 'Volume is the space a solid takes up, measured in cubic units like cm³.',
    steps: [
      { title: 'Cubes and cuboids', text: 'Volume = length × width × height.', example: ['cuboid 10 cm × 4 cm × 3 cm = 120 cm³', 'cube of side 5 cm = 125 cm³'] },
      { title: 'Finding a missing side', text: 'Divide the volume by the other two sides multiplied.', example: ['V = 240 cm³, l = 10, w = 6: h = 240 ÷ 60 = 4 cm'] },
      { title: 'Volume and capacity', text: '1,000 cm³ holds 1 litre.', example: ['A tank 100 cm × 50 cm × 40 cm = 200,000 cm³ = 200 litres'] },
    ],
    remember: 'Volume = length × width × height, and 1,000 cm³ = 1 litre.',
  },
  'um-capacity': {
    intro: 'Capacity tells us how much a container holds, in litres and millilitres.',
    steps: [
      { title: 'Units', text: '1 litre = 1,000 millilitres.', example: ['3 l 250 ml = 3,250 ml', '4,500 ml = 4 l 500 ml'] },
      { title: 'Adding and subtracting', text: 'Add the millilitres; every 1,000 ml makes another litre.', example: ['2 l 700 ml + 1 l 600 ml = 3 l 1,300 ml = 4 l 300 ml'] },
      { title: 'Sharing', text: 'Change litres to millilitres, then divide.', example: ['5 litres into 250 ml cups: 5,000 ÷ 250 = 20 cups'] },
    ],
    remember: '1 litre = 1,000 ml. Change to millilitres before you divide.',
  },
  'um-mass': {
    intro: 'Mass is how heavy something is, in grams, kilograms and tonnes.',
    steps: [
      { title: 'Units', text: '1 kg = 1,000 g and 1 tonne = 1,000 kg.', example: ['2 kg 400 g = 2,400 g', '3 tonnes 50 kg = 3,050 kg'] },
      { title: 'Subtracting', text: 'Borrow 1 kg = 1,000 g when the grams are too few.', example: ['5 kg 200 g − 2 kg 700 g', '= 4 kg 1,200 g − 2 kg 700 g = 2 kg 500 g'] },
      { title: 'Problems', text: 'Multiply to find the mass of many equal items, then compare with what is allowed.', example: ['40 bags of 90 kg = 3,600 kg = 3.6 tonnes'] },
    ],
    remember: '1,000 g = 1 kg and 1,000 kg = 1 tonne; borrow 1,000 when you subtract.',
  },
  'um-time': {
    intro: 'We read time on clocks and calendars, and use it to plan journeys.',
    steps: [
      { title: 'a.m. and p.m.', text: 'a.m. is from midnight to noon; p.m. is from noon to midnight.', example: ['7:30 in the morning = 7:30 a.m.', '4:15 in the afternoon = 4:15 p.m.'] },
      { title: 'The 24-hour clock', text: 'After noon, add 12 to the hours.', example: ['3:20 p.m. = 1520 h', '0845 h = 8:45 a.m.'] },
      { title: 'How long', text: 'Count on to the next hour, then whole hours, then the minutes.', example: ['9:40 a.m. to 1:15 p.m.:', '20 min + 3 h + 15 min = 3 h 35 min'] },
      { title: 'Speed', text: 'Speed = distance ÷ time; distance = speed × time.', example: ['240 km in 4 hours = 60 km per hour'] },
    ],
    remember: 'Add 12 to p.m. hours for the 24-hour clock; speed = distance ÷ time.',
  },
  'um-money': {
    intro: 'Money sums help us shop wisely, give change, and see profit or loss.',
    steps: [
      { title: 'Change', text: 'Change = money given − cost.', example: ['Cost 735, paid 1,000: change = 265'] },
      { title: 'Profit and loss', text: 'Profit = selling price − buying price. If selling is less, it is a loss.', example: ['Bought at 800, sold at 950: profit 150'] },
      { title: 'Per cent profit and discount', text: 'Profit % = profit ÷ buying price × 100.', example: ['Profit 150 on 600: 150/600 × 100 = 25%'] },
      { title: 'Hire purchase', text: 'Deposit + all instalments. Compare with the cash price.', example: ['Deposit 2,000 + 6 × 1,500 = 11,000', 'Cash price 10,000: hire purchase costs 1,000 more'] },
    ],
    remember: 'Profit is selling minus buying; per cent profit is out of the buying price.',
  },
  'um-angles': {
    intro: 'Angles measure turning. A full turn is 360°.',
    steps: [
      { title: 'Kinds of angles', text: 'Acute: less than 90°. Right: 90°. Obtuse: between 90° and 180°. Straight: 180°. Reflex: more than 180°.' },
      { title: 'Turns and directions', text: 'A quarter turn is 90°, a half turn 180°. Between N and NE is 45°.', example: ['Facing north, turn 90° clockwise → east'] },
      { title: 'Angle facts', text: 'Angles on a straight line add to 180°, in a triangle to 180°, and round a point to 360°.', example: ['Triangle with 50° and 70°: third = 180 − 120 = 60°'] },
    ],
    remember: 'Straight line 180°, triangle 180°, full turn 360°.',
  },
  'um-shapes': {
    intro: 'Shapes are named by their sides and corners, and solids by their faces, edges and vertices.',
    steps: [
      { title: 'Polygons', text: 'Triangle 3, quadrilateral 4, pentagon 5, hexagon 6, heptagon 7, octagon 8 sides.' },
      { title: 'Quadrilaterals', text: 'Square: 4 equal sides, 4 right angles. Rectangle: opposite sides equal. Rhombus: 4 equal sides. Trapezium: one pair of parallel sides.' },
      { title: 'Symmetry', text: 'A line of symmetry folds a shape into two matching halves. A square has 4; a rectangle has 2.' },
      { title: 'Solids', text: 'A cube has 6 faces, 12 edges and 8 vertices.', example: ['triangular prism: 5 faces, 9 edges, 6 vertices'] },
    ],
    remember: 'Count sides for polygons, faces–edges–vertices for solids.',
  },
  'um-data': {
    intro: 'Tables, pictographs and bar graphs show information so we can compare it at a glance.',
    steps: [
      { title: 'Read the key or scale', text: 'In a pictograph, one picture may stand for 2, 5 or 10 items. On a bar graph, read the height against the scale.' },
      { title: 'Compare', text: 'Find the highest and lowest; the difference tells how many more.', example: ['Most 45, least 15: 45 − 15 = 30 more'] },
      { title: 'The mean (average)', text: 'Add all the values and divide by how many there are.', example: ['60, 70, 80, 90: total 300 ÷ 4 = 75'] },
    ],
    remember: 'Read the scale first. Mean = total ÷ number of values.',
  },
}
