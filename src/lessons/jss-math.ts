// Grades 7–9 Mathematics lessons, one per topic, shared by every grade that has it.
import type { Lesson } from './types'

export const JSS_MATH_LESSONS: Record<string, Lesson> = {
  'jm-whole': {
    intro: 'Whole numbers up to hundreds of millions are read in groups of three digits, and they obey simple rules we can rely on.',
    steps: [
      { title: 'Place value', text: 'From the right: ones, tens, hundreds, then thousands, then millions. Read each group of three and say its name.', example: ['45 207 390', 'forty-five million, two hundred and seven thousand, three hundred and ninety'] },
      { title: 'Rounding', text: 'Look at the digit just after the place you round to. 5 or more rounds up; 4 or less rounds down.', example: ['36 482 to the nearest thousand → 36 000'] },
      { title: 'Order of operations', text: 'Work brackets first, then division and multiplication from left to right, then addition and subtraction.', example: ['8 + 6 × (5 − 2) = 8 + 18 = 26'] },
    ],
    remember: 'Brackets, then × and ÷, then + and −, always left to right.',
  },
  'jm-factors': {
    intro: 'Factors and multiples help us share things equally and find when events line up again.',
    steps: [
      { title: 'Prime factors', text: 'Keep dividing by prime numbers (2, 3, 5, 7, …) until you reach 1.', example: ['60 = 2 × 2 × 3 × 5'] },
      { title: 'GCD', text: 'The greatest common divisor is the biggest number that divides both. Multiply the prime factors they share.', example: ['24 = 2³ × 3, 36 = 2² × 3² → GCD = 2² × 3 = 12'] },
      { title: 'LCM', text: 'The least common multiple is the smallest number both divide into. Take every prime factor at its highest power.', example: ['LCM of 24 and 36 = 2³ × 3² = 72'] },
      { title: 'Divisibility tests', text: 'A number divides by 3 if its digits add to a multiple of 3; by 4 if its last two digits do; by 9 if its digits add to a multiple of 9.' },
    ],
    remember: 'GCD shares the most; LCM is when they meet again.',
  },
  'jm-frac': {
    intro: 'Fractions and decimals describe parts of a whole, and we use them for sharing, recipes and money.',
    steps: [
      { title: 'Adding and subtracting', text: 'Change to a common denominator first, then add or subtract the numerators.', example: ['2/3 + 1/4 = 8/12 + 3/12 = 11/12'] },
      { title: 'Multiplying', text: 'Multiply the tops and the bottoms. Cancel first to keep numbers small.', example: ['3/4 × 2/9 = 6/36 = 1/6'] },
      { title: 'Dividing', text: 'Keep the first fraction, change ÷ to ×, and flip the second.', example: ['3/5 ÷ 9/10 = 3/5 × 10/9 = 2/3'] },
      { title: 'Fractions to decimals', text: 'Divide the numerator by the denominator. Some decimals recur, like 1/3 = 0.333…' },
    ],
    remember: 'Common denominators to add; flip the second fraction to divide.',
  },
  'jm-dec': {
    intro: 'Decimals let us measure and pay exactly, from shillings and cents to kilograms and grams.',
    steps: [
      { title: 'Place value', text: 'After the point come tenths, hundredths and thousandths.', example: ['3.472 = 3 + 4/10 + 7/100 + 2/1000'] },
      { title: 'Multiplying', text: 'Multiply as whole numbers, then count all the decimal places in the question and put that many in the answer.', example: ['0.4 × 0.03 = 0.012'] },
      { title: 'Dividing', text: 'Move the point in both numbers until you divide by a whole number.', example: ['2.4 ÷ 0.6 = 24 ÷ 6 = 4'] },
      { title: 'Rounding', text: 'To round to 2 decimal places, look at the third decimal digit.', example: ['5.367 → 5.37'] },
    ],
    remember: 'Count decimal places when multiplying; make the divisor whole when dividing.',
  },
  'jm-squares': {
    intro: 'Squares, cubes and their roots appear in area, volume and the Pythagorean rule.',
    steps: [
      { title: 'Squares and square roots', text: 'A square is a number times itself. The square root undoes it.', example: ['15² = 225, so √225 = 15'] },
      { title: 'Roots by factors', text: 'Pair up the prime factors; take one from each pair.', example: ['√144 = √(2·2·2·2·3·3) = 2 × 2 × 3 = 12'] },
      { title: 'Cubes and cube roots', text: 'A cube is a number used three times. The cube root undoes it.', example: ['4³ = 64, so ∛64 = 4'] },
      { title: 'Roots of fractions', text: 'Take the root of the top and the bottom separately.', example: ['√(9/49) = 3/7'] },
    ],
    remember: 'Pairs of factors give square roots; triples give cube roots.',
  },
  'jm-expr': {
    intro: 'Algebra uses letters for unknown numbers so we can write rules that always work.',
    steps: [
      { title: 'Like terms', text: 'Only terms with exactly the same letters and powers can be added.', example: ['3a + 5b − a + 2b = 2a + 7b'] },
      { title: 'Expanding brackets', text: 'Multiply every term inside by the term outside.', example: ['3(2x − 4) = 6x − 12', '(x + 2)(x + 3) = x² + 5x + 6'] },
      { title: 'Factorising', text: 'Take out the largest common factor, the reverse of expanding.', example: ['8y + 12 = 4(2y + 3)'] },
      { title: 'Substitution', text: 'Replace each letter with its value, then follow the order of operations.', example: ['If a = 3, b = −2: 2a − b = 6 + 2 = 8'] },
    ],
    remember: 'Only like terms combine; expanding and factorising undo each other.',
  },
  'jm-equations': {
    intro: 'An equation is a balance. Whatever you do to one side, do to the other, and the unknown appears.',
    steps: [
      { title: 'One-step and two-step', text: 'Undo adding or subtracting first, then undo multiplying or dividing.', example: ['3x + 5 = 20', '3x = 15', 'x = 5'] },
      { title: 'Inequalities', text: 'Solve them like equations, but flip the sign if you multiply or divide by a negative number.', example: ['−2x < 8 → x > −4'] },
      { title: 'Simultaneous equations', text: 'With two unknowns, add or subtract the equations to remove one letter, then substitute back.', example: ['x + y = 10, x − y = 4', 'adding: 2x = 14 → x = 7, y = 3'] },
      { title: 'Check', text: 'Put your answer back into the original equation to be sure it balances.' },
    ],
    remember: 'Keep the balance: same step on both sides, then check.',
  },
  'jm-pythag': {
    intro: 'In every right-angled triangle, the sides follow one beautiful rule found by Pythagoras.',
    steps: [
      { title: 'The rule', text: 'The square on the longest side (the hypotenuse) equals the sum of the squares on the other two.', example: ['a² + b² = c²'] },
      { title: 'Finding the hypotenuse', text: 'Square the two shorter sides, add, then take the square root.', example: ['6² + 8² = 36 + 64 = 100 → c = 10'] },
      { title: 'Finding a shorter side', text: 'Square the hypotenuse and subtract the square of the known side.', example: ['13² − 5² = 169 − 25 = 144 → 12'] },
      { title: 'Pythagorean triples', text: 'Whole-number sets such as 3, 4, 5 and 5, 12, 13 and 8, 15, 17 fit the rule exactly.' },
    ],
    remember: 'Hypotenuse² = one side² + other side².',
  },
  'jm-measure': {
    intro: 'We measure length, area and volume to build, plant and pack things well.',
    steps: [
      { title: 'Areas', text: 'Rectangle: l × w. Triangle: ½ × b × h. Parallelogram: b × h. Trapezium: ½(a + b) × h. Circle: πr².' },
      { title: 'Volume of prisms', text: 'Volume = area of cross-section × length. A cuboid is l × w × h; a cylinder is πr²h.', example: ['cylinder r = 7, h = 10: 22/7 × 49 × 10 = 1540 cm³'] },
      { title: 'Surface area', text: 'Add the areas of all the faces. For a closed cylinder: 2πr² + 2πrh.' },
      { title: 'Capacity', text: '1 litre = 1000 cm³, and 1 m³ = 1000 litres.' },
    ],
    remember: 'Volume = cross-section area × length; 1000 cm³ = 1 litre.',
  },
  'jm-time': {
    intro: 'Timetables, travel and the weather all need us to work with time and temperature.',
    steps: [
      { title: '24-hour clock', text: 'After noon, add 12 to the hour. 3:45 p.m. is 1545 h; midnight is 0000 h.' },
      { title: 'Durations', text: 'Count up to the next full hour, then add the rest.', example: ['0845 h to 1320 h = 15 min + 4 h 20 min = 4 h 35 min'] },
      { title: 'Temperature', text: 'Temperatures below 0 °C are negative. A rise from −3 °C to 5 °C is 8 degrees.' },
    ],
    remember: 'Add 12 to afternoon hours; count up through the full hour.',
  },
  'jm-money': {
    intro: 'Understanding money keeps families and businesses safe from losses and debt.',
    steps: [
      { title: 'Profit and loss', text: 'Profit = selling price − cost price. Profit % = profit ÷ cost × 100.', example: ['bought at 800, sold at 1000: profit 200, which is 25%'] },
      { title: 'Discount and commission', text: 'A discount is taken off the marked price. Commission is a percentage of sales paid to the seller.' },
      { title: 'Simple interest', text: 'I = P × R × T ÷ 100, where P is the principal, R the rate per year and T the years.', example: ['P = 20 000, R = 5, T = 3 → I = 3000'] },
      { title: 'Hire purchase and VAT', text: 'Hire purchase costs more than cash because of interest. VAT in Kenya is 16% added to the price.' },
    ],
    remember: 'Percentages of money are always worked out of the original amount.',
  },
  'jm-angles': {
    intro: 'Angles are everywhere: in roofs, roads, maps and the shapes of polygons.',
    steps: [
      { title: 'Angle facts', text: 'Angles on a straight line add to 180°; around a point to 360°. Vertically opposite angles are equal.' },
      { title: 'Parallel lines', text: 'Corresponding angles are equal, alternate angles are equal, and co-interior angles add to 180°.' },
      { title: 'Polygons', text: 'Interior angles of an n-sided polygon add to (n − 2) × 180°. Exterior angles always add to 360°.', example: ['hexagon: 4 × 180 = 720°'] },
      { title: 'Scale drawing and bearings', text: 'Bearings are measured clockwise from north in three figures, such as 045°.' },
    ],
    remember: '(n − 2) × 180° inside; 360° outside.',
  },
  'jm-data': {
    intro: 'Data turns many numbers into a clear picture we can understand and use.',
    steps: [
      { title: 'Averages', text: 'Mean = total ÷ count. Median = middle value when in order. Mode = most common value.', example: ['3, 5, 5, 7, 10: mean 6, median 5, mode 5'] },
      { title: 'Range', text: 'Range = largest − smallest. It shows how spread out the data is.' },
      { title: 'Graphs', text: 'Bar graphs compare groups; line graphs show change over time; pie charts show parts of a whole (360°).' },
      { title: 'Pie chart angles', text: 'Angle = part ÷ total × 360°.', example: ['15 of 60 learners → 15/60 × 360 = 90°'] },
    ],
    remember: 'Mean adds and divides; median is the middle; mode is the most.',
  },
  'jm-integers': {
    intro: 'Integers include negative numbers, which describe temperatures below zero, debts and heights below sea level.',
    steps: [
      { title: 'Adding and subtracting', text: 'Subtracting a negative is the same as adding.', example: ['5 − (−3) = 8', '−4 + (−6) = −10'] },
      { title: 'Multiplying and dividing', text: 'Same signs give a positive answer; different signs give a negative answer.', example: ['−6 × −4 = 24', '18 ÷ −3 = −6'] },
      { title: 'On the number line', text: 'Numbers further left are smaller: −7 < −2.' },
    ],
    remember: 'Same signs, positive; different signs, negative.',
  },
  'jm-ratio': {
    intro: 'Ratios, rates and proportions help us share fairly and compare prices.',
    steps: [
      { title: 'Sharing in a ratio', text: 'Add the parts, find one part, then multiply.', example: ['Share 600 in 2 : 3 → 5 parts, 1 part = 120 → 240 and 360'] },
      { title: 'Rates', text: 'A rate compares two different quantities, such as shillings per kilogram or km per hour.' },
      { title: 'Percentage change', text: 'Change ÷ original × 100.', example: ['price rises from 50 to 60: 10/50 × 100 = 20%'] },
      { title: 'Proportion and work', text: 'If more workers do a job, it takes less time (inverse proportion).', example: ['6 workers take 10 days → 12 workers take 5 days'] },
    ],
    remember: 'Find one part first, then scale up.',
  },
  'jm-circles': {
    intro: 'Circles are in wheels, water tanks and roundabouts, and π links their size together.',
    steps: [
      { title: 'Parts', text: 'Radius: centre to edge. Diameter: twice the radius. Circumference: the distance around.' },
      { title: 'Circumference', text: 'C = πd = 2πr. Use π = 22/7 or 3.14.', example: ['d = 14 cm → C = 22/7 × 14 = 44 cm'] },
      { title: 'Area', text: 'The area inside a circle is A = πr².', example: ['r = 7 cm → 22/7 × 49 = 154 cm²'] },
      { title: 'Arcs and sectors', text: 'An arc or sector is a fraction of the circle: angle ÷ 360.' },
    ],
    remember: 'C = 2πr and A = πr².',
  },
  'jm-coords': {
    intro: 'Coordinates fix a point exactly, and straight-line graphs show how one quantity changes with another.',
    steps: [
      { title: 'Plotting', text: 'Write (x, y): go across first, then up or down.' },
      { title: 'Gradient', text: 'Gradient = change in y ÷ change in x.', example: ['(1, 2) to (3, 8): (8 − 2) ÷ (3 − 1) = 3'] },
      { title: 'Equation of a line', text: 'y = mx + c, where m is the gradient and c is where the line crosses the y-axis.', example: ['y = 2x + 1 has gradient 2 and crosses at (0, 1)'] },
    ],
    remember: 'Across then up; gradient is rise over run.',
  },
  'jm-prob': {
    intro: 'Probability measures how likely something is, from impossible (0) to certain (1).',
    steps: [
      { title: 'The formula', text: 'Probability = number of favourable outcomes ÷ total number of outcomes.', example: ['a die showing an even number: 3/6 = 1/2'] },
      { title: 'The scale', text: 'Impossible is 0, even chance is ½, certain is 1. No probability is more than 1.' },
      { title: 'Complement', text: 'The chance that something does NOT happen is 1 − the chance that it does.' },
      { title: 'Experiments', text: 'Relative frequency = times it happened ÷ number of trials. More trials give a better estimate.' },
    ],
    remember: 'Favourable ÷ total, always between 0 and 1.',
  },
  'jm-indices': {
    intro: 'Indices are a short way of writing repeated multiplication, and standard form writes huge or tiny numbers neatly.',
    steps: [
      { title: 'Laws of indices', text: 'Multiply: add the powers. Divide: subtract the powers. Power of a power: multiply.', example: ['2³ × 2⁴ = 2⁷', '5⁶ ÷ 5² = 5⁴', '(3²)³ = 3⁶'] },
      { title: 'Zero and negative powers', text: 'Anything to the power 0 is 1. A negative power means one over.', example: ['7⁰ = 1', '2⁻³ = 1/8'] },
      { title: 'Standard form', text: 'Write a number as A × 10ⁿ where 1 ≤ A < 10.', example: ['45 000 = 4.5 × 10⁴', '0.0036 = 3.6 × 10⁻³'] },
    ],
    remember: 'Multiply: add powers. Divide: subtract powers.',
  },
  'jm-density': {
    intro: 'Density tells us how tightly matter is packed, which is why a stone sinks and a log floats.',
    steps: [
      { title: 'The formula', text: 'Density = mass ÷ volume. Units are g/cm³ or kg/m³.', example: ['200 g in 25 cm³ → 8 g/cm³'] },
      { title: 'Rearranging', text: 'Mass = density × volume; volume = mass ÷ density.' },
      { title: 'Floating', text: 'Water has a density of 1 g/cm³. Objects with lower density float; higher density sink.' },
    ],
    remember: 'D = M ÷ V; less dense than water floats.',
  },
  'jm-speed': {
    intro: 'Speed, distance and time are linked by one rule used by every driver, pilot and runner.',
    steps: [
      { title: 'The rule', text: 'Speed = distance ÷ time. Distance = speed × time. Time = distance ÷ speed.' },
      { title: 'Units', text: 'To change km/h to m/s, multiply by 1000 and divide by 3600 (or by 5/18).', example: ['72 km/h = 72 × 5/18 = 20 m/s'] },
      { title: 'Average speed', text: 'Total distance ÷ total time, including stops.', example: ['120 km in 2 h, then 60 km in 1 h → 180 ÷ 3 = 60 km/h'] },
    ],
    remember: 'Average speed = total distance ÷ total time.',
  },
  'jm-similarity': {
    intro: 'Similar shapes have the same shape but different sizes, like a photo and its enlargement.',
    steps: [
      { title: 'Similar shapes', text: 'Matching angles are equal and matching sides are in the same ratio.' },
      { title: 'Scale factor', text: 'Scale factor = new length ÷ old length.', example: ['4 cm becomes 12 cm → scale factor 3'] },
      { title: 'Area and volume', text: 'If lengths are multiplied by k, areas are multiplied by k² and volumes by k³.', example: ['k = 2 → area × 4, volume × 8'] },
      { title: 'Enlargement', text: 'An enlargement has a centre and a scale factor; each image point is k times as far from the centre.' },
    ],
    remember: 'Lengths × k, areas × k², volumes × k³.',
  },
  'jm-trig': {
    intro: 'Trigonometry finds heights and distances we cannot measure directly, like the height of a tree.',
    steps: [
      { title: 'Naming sides', text: 'In a right-angled triangle: the hypotenuse is opposite the right angle; the opposite side faces the angle; the adjacent side is next to it.' },
      { title: 'SOH CAH TOA', text: 'sin = opposite ÷ hypotenuse; cos = adjacent ÷ hypotenuse; tan = opposite ÷ adjacent.' },
      { title: 'Using tan', text: 'Height = distance × tan(angle of elevation).', example: ['20 m from a tree, angle 45° → height = 20 × 1 = 20 m'] },
      { title: 'Special angles', text: 'sin 30° = ½, cos 60° = ½, tan 45° = 1.' },
    ],
    remember: 'SOH CAH TOA: sin = O/H, cos = A/H, tan = O/A.',
  },
}
