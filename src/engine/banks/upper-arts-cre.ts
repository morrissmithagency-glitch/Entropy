// Creative Arts and CRE, Grades 4–6. The topics are the same each year; written questions
// carry the first grade they suit, so Grade 6 meets everything and Grade 4 the gentler
// half. Content is warm and encouraging throughout. All content is original.
import { factGenerator, type FactSet } from '../facts'
import { labelOptions as opts } from '../generators/english'
import type { BankQuestion, Generator, Level } from '../types'

type G = 4 | 5 | 6
type Row = [G, BankQuestion]
const t = (g: G, level: Level, prompt: string, answer: string, wrong: string[]): Row => [g, { type: 'choice', level, prompt, options: opts([answer, ...wrong]), answer }]

interface Topic {
  facts: FactSet
  bank: Row[]
}

// ── Creative Arts ───────────────────────────────────────────────────────────

const CREATIVE: Record<string, Topic> = {
  drawing: {
    facts: {
      categories: [
        { one: 'a primary colour', many: 'primary colours', items: ['red', 'yellow', 'blue'], set: 'c' },
        { one: 'a secondary colour', many: 'secondary colours', items: ['green', 'orange', 'purple'], set: 'c' },
        { one: 'a warm colour', many: 'warm colours', items: ['red', 'orange', 'yellow'], set: 'w' },
        { one: 'a cool colour', many: 'cool colours', items: ['blue', 'green', 'purple'], set: 'w' },
        { one: 'a shading technique', many: 'shading techniques', items: ['hatching', 'cross-hatching', 'stippling', 'smudging'], set: 's' },
        { one: 'a drawing or painting tool', many: 'drawing and painting tools', items: ['pencil', 'brush', 'palette', 'crayon', 'charcoal', 'eraser'], set: 's' },
      ],
      pairs: [
        {
          pairs: [
            ['red and yellow', 'orange'],
            ['blue and yellow', 'green'],
            ['red and blue', 'purple'],
            ['red and white', 'pink'],
            ['black and white', 'grey'],
          ],
          ask: (a) => `Mixing ${a} gives ___.`,
          askBack: (b) => `Which two colours mix to make ${b}?`,
        },
        {
          pairs: [
            ['hatching', 'drawing many parallel lines close together'],
            ['cross-hatching', 'drawing lines that cross each other'],
            ['stippling', 'making many small dots'],
            ['smudging', 'rubbing pencil or charcoal to blend it'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `Which shading technique is ${b}?`,
        },
      ],
    },
    bank: [
      t(4, 2, 'Colours that cannot be made by mixing other colours are called ___ colours.', 'primary', ['secondary', 'tertiary', 'warm']),
      t(4, 3, 'A picture of fruits and pots arranged on a table is called a ___.', 'still life', ['landscape', 'portrait', 'cartoon']),
      t(4, 3, 'A drawing of a person\'s face is called a ___.', 'portrait', ['landscape', 'still life', 'mosaic']),
      t(4, 4, 'Adding white to a colour makes a ___.', 'tint', ['shade', 'tone of black', 'primary colour']),
      t(5, 4, 'Adding black to a colour makes a ___.', 'shade', ['tint', 'primary colour', 'secondary colour']),
      t(5, 4, 'In a picture, objects that are far away are drawn ___.', 'smaller', ['bigger', 'brighter always', 'upside down']),
      t(5, 5, 'Which pencil gives the darkest, softest lines?', '2B', ['HB', '2H', '4H']),
      t(6, 5, 'Mixing a primary colour with a secondary colour next to it, such as yellow and green, gives a ___ colour.', 'tertiary', ['primary', 'warm only', 'neutral']),
      t(6, 5, 'In a landscape painting, the part nearest to the viewer is the ___.', 'foreground', ['background', 'horizon', 'sky']),
      t(4, 2, 'Which colours are warm colours?', 'red, orange and yellow', ['blue, green and purple', 'black and white', 'grey and brown']),
    ],
  },
  craft: {
    facts: {
      categories: [
        { one: 'a material used for weaving', many: 'materials used for weaving', items: ['sisal', 'raffia', 'palm leaves', 'papyrus', 'banana fibres', 'wool'], set: 'm' },
        { one: 'a material used for modelling', many: 'materials used for modelling', items: ['clay', 'plasticine', 'papier-mâché', 'soapstone', 'dough'], set: 'm' },
      ],
      pairs: [
        {
          pairs: [
            ['the pinch method', 'pressing a ball of clay with the thumb and fingers'],
            ['the coil method', 'building up rolls of clay one on top of another'],
            ['the slab method', 'joining flat pieces of clay'],
          ],
          ask: (a) => `In modelling, what is ${a}?`,
          askBack: (b) => `Which modelling method involves ${b}?`,
        },
        {
          pairs: [
            ['collage', 'pasting pieces of different materials on a surface'],
            ['mosaic', 'arranging small pieces to make a picture'],
            ['block printing', 'pressing a carved block with ink onto paper or cloth'],
            ['stencilling', 'dabbing colour through a cut-out shape'],
            ['beadwork', 'threading beads to make ornaments'],
          ],
          ask: (a) => `What is ${a}?`,
          askBack: (b) => `Which craft involves ${b}?`,
        },
        {
          pairs: [
            ['the kiondo', 'a woven sisal basket'],
            ['Kisii soapstone', 'carved ornaments and figures'],
            ['Maasai beadwork', 'colourful necklaces and collars'],
            ['Akamba carving', 'animals and figures carved from wood'],
          ],
          ask: (a) => `What is ${a} known for?`,
          askBack: (b) => `Which Kenyan craft is known for ${b}?`,
        },
      ],
    },
    bank: [
      t(4, 2, 'In weaving, the threads that run up and down are the ___.', 'warp', ['weft', 'knots', 'beads']),
      t(4, 3, 'In weaving, the threads that go across over and under are the ___.', 'weft', ['warp', 'coil', 'slab']),
      t(4, 3, 'Why should clay be wedged (kneaded) before modelling?', 'to remove air bubbles', ['to make it wet only', 'to add colour', 'to make it sticky']),
      t(5, 4, 'A repeated design in a pattern is called a ___.', 'motif', ['palette', 'warp', 'kiln']),
      t(5, 4, 'Clay objects are hardened by heating them in a ___.', 'kiln', ['fridge', 'basket', 'sieve']),
      t(6, 5, 'Which is the best way to make a strong, smooth clay pot with tall walls?', 'the coil method, smoothing the coils together', ['the pinch method only', 'using dry crumbly clay', 'adding sand and water only']),
      t(6, 5, 'Why are crafts like the kiondo important to Kenya?', 'They earn income and keep our culture alive.', ['They pollute rivers.', 'They are only for museums.', 'They are imported.']),
    ],
  },
  notation: {
    facts: {
      pairs: [
        {
          pairs: [
            ['a semibreve', '4 beats'],
            ['a minim', '2 beats'],
            ['a crotchet', '1 beat'],
            ['a quaver', 'half a beat'],
            ['a semiquaver', 'a quarter of a beat'],
          ],
          ask: (a) => `In 4/4 time, how long is ${a}?`,
          askBack: (b) => `Which note lasts ${b} in 4/4 time?`,
        },
        {
          pairs: [
            ['forte (f)', 'loud'],
            ['piano (p)', 'soft'],
            ['crescendo', 'gradually getting louder'],
            ['diminuendo', 'gradually getting softer'],
            ['allegro', 'fast and lively'],
            ['adagio', 'slow'],
          ],
          ask: (a) => `In music, ${a} means ___.`,
          askBack: (b) => `Which music term means "${b}"?`,
        },
      ],
    },
    bank: [
      t(4, 2, 'The sol-fa notes in order going up are ___.', 'd r m f s l t d\'', ['d m r f s t l d\'', 'd r f m s l t d\'', 'd r m s f l t d\'']),
      t(4, 3, 'How many crotchets make one minim?', 'two', ['one', 'three', 'four']),
      t(4, 3, 'In 3/4 time, each bar has ___ crotchet beats.', 'three', ['two', 'four', 'six']),
      t(5, 4, 'A bar in 4/4 time has a minim and one crotchet. What note completes the bar?', 'a crotchet', ['a minim', 'a semibreve', 'a quaver']),
      t(5, 4, 'How many quavers are equal to one minim?', 'four', ['two', 'three', 'eight']),
      t(5, 4, 'The music staff has ___ lines.', 'five', ['four', 'six', 'seven']),
      t(6, 5, 'On the treble staff, the notes in the spaces from bottom to top spell ___.', 'F A C E', ['E G B D', 'A C E G', 'G B D F']),
      t(6, 5, 'The lines of the treble staff from bottom to top are ___.', 'E G B D F', ['F A C E G', 'A C E G B', 'C E G B D']),
      t(6, 5, 'A song is marked "p" at the start and has a crescendo near the end. How should it be sung?', 'softly at first, then gradually louder', ['loudly all through', 'loudly, then suddenly stop', 'fast, then slow']),
    ],
  },
  instruments: {
    facts: {
      categories: [
        { one: 'a string instrument', many: 'string instruments', items: ['nyatiti', 'obokano', 'orutu', 'litungu', 'guitar', 'violin'], set: 'i' },
        { one: 'a wind instrument', many: 'wind instruments', items: ['chivoti', 'nzumari', 'trumpet', 'flute', 'recorder', 'horn'], set: 'i' },
        { one: 'a percussion instrument', many: 'percussion instruments', items: ['isukuti', 'kayamba', 'ohangla drums', 'jingles', 'marimba', 'shakers'], set: 'i' },
      ],
      pairs: [
        {
          pairs: [
            ['nyatiti', 'the Luo'],
            ['obokano', 'the Abagusii'],
            ['isukuti', 'the Luhya'],
            ['kayamba', 'the Mijikenda'],
            ['litungu', 'the Bukusu'],
          ],
          ask: (a) => `The ${a} is a traditional instrument of ___.`,
          askBack: (b) => `Which traditional instrument comes from ${b}?`,
        },
        {
          pairs: [
            ['plucking', 'nyatiti'],
            ['bowing', 'orutu'],
            ['blowing', 'chivoti'],
            ['shaking', 'kayamba'],
            ['beating', 'isukuti'],
          ],
          ask: (a) => `Which instrument is played by ${a}?`,
          askBack: (b) => `How is the ${b} played?`,
        },
      ],
    },
    bank: [
      t(4, 2, 'Instruments that make sound when hit or shaken are ___ instruments.', 'percussion', ['string', 'wind', 'electric']),
      t(4, 3, 'The orutu is played with a ___.', 'bow', ['drum stick', 'mouthpiece', 'pedal']),
      t(5, 3, 'Why should drum skins be kept away from water?', 'Water loosens and spoils the skin.', ['Water makes them louder.', 'Water tunes them.', 'Drums need water.']),
      t(5, 4, 'Tightening the string of a nyatiti makes its sound ___.', 'higher', ['lower', 'softer only', 'stop']),
      t(6, 4, 'Which material is commonly used to make the resonator of a traditional lyre?', 'a wooden bowl covered with skin', ['a plastic bag', 'a glass bottle', 'a metal pipe only']),
      t(6, 5, 'A group wants instruments from three different families. Which set works?', 'nyatiti, chivoti, isukuti', ['nyatiti, orutu, obokano', 'kayamba, isukuti, jingles', 'flute, trumpet, recorder']),
    ],
  },
  songs: {
    facts: {
      pairs: [
        {
          pairs: [
            ['a lullaby', 'to help a baby sleep'],
            ['a work song', 'while people work together'],
            ['a patriotic song', 'to show love for our country'],
            ['a sacred song', 'to praise and worship God'],
            ['a wedding song', 'to celebrate a marriage'],
            ['an action song', 'with movements that match the words'],
          ],
          ask: (a) => `When or why is ${a} sung?`,
          askBack: (b) => `Which type of song is sung ${b}?`,
        },
        {
          pairs: [
            ['tempo', 'how fast or slow the music is'],
            ['dynamics', 'how loud or soft the music is'],
            ['melody', 'the tune of a song'],
            ['rhythm', 'the pattern of long and short sounds'],
            ['pitch', 'how high or low a sound is'],
          ],
          ask: (a) => `In music, what is ${a}?`,
          askBack: (b) => `What musical element is ${b}?`,
        },
      ],
    },
    bank: [
      t(4, 2, 'The Kenya National Anthem begins with the words ___.', 'Ee Mungu nguvu yetu', ['Jambo bwana', 'Kenya nchi yangu', 'Tufurahi sote']),
      t(4, 3, 'How many stanzas does the Kenya National Anthem have?', 'three', ['two', 'four', 'five']),
      t(4, 3, 'How should we stand when the national anthem is sung?', 'upright and still, with hands at our sides', ['sitting down', 'dancing', 'chatting quietly']),
      t(5, 4, 'The national anthem was first sung in the year Kenya became independent, ___.', '1963', ['1920', '1978', '2010']),
      t(5, 4, 'The anthem of the East African Community is called ___.', 'Jumuiya Yetu', ['Ee Mungu Nguvu Yetu', 'Jambo Bwana', 'Malaika']),
      t(6, 5, 'A choir sings softly at the start and gradually louder towards the end. Which element of music is changing?', 'dynamics', ['tempo', 'pitch', 'melody']),
      t(6, 5, 'Which is the main message of the first stanza of the Kenya National Anthem?', 'a prayer asking God to bless Kenya', ['a story about hunting', 'instructions for farming', 'a lullaby for babies']),
    ],
  },
  athletics: {
    facts: {
      categories: [
        { one: 'a track event', many: 'track events', items: ['100 metres', '400 metres', '1500 metres', 'relay', 'hurdles', 'steeplechase'], set: 'e' },
        { one: 'a field event', many: 'field events', items: ['long jump', 'high jump', 'triple jump', 'shot put', 'javelin', 'discus'], set: 'e' },
        { one: 'a throwing event', many: 'throwing events', items: ['shot put', 'javelin', 'discus'], set: 'f' },
        { one: 'a jumping event', many: 'jumping events', items: ['long jump', 'high jump', 'triple jump'], set: 'f' },
      ],
      pairs: [
        {
          pairs: [
            ['Eliud Kipchoge', 'the marathon'],
            ['David Rudisha', 'the 800 metres'],
            ['Faith Kipyegon', 'the 1500 metres'],
            ['Kipchoge Keino', 'middle-distance running in the 1960s and 1970s'],
          ],
          ask: (a) => `${a} is a famous Kenyan athlete in ___.`,
          askBack: (b) => `Which Kenyan athlete is famous for ${b}?`,
        },
        {
          pairs: [
            ['the crouch start', 'sprint races'],
            ['the standing start', 'long-distance races'],
            ['a baton', 'relay races'],
            ['a sandpit', 'long jump and triple jump'],
          ],
          ask: (a) => `In athletics, ${a} is used in ___.`,
          askBack: (b) => `What is used in ${b}?`,
        },
      ],
    },
    bank: [
      t(4, 2, 'Running races on a track are called ___ events.', 'track', ['field', 'water', 'ball']),
      t(4, 3, 'Why should athletes warm up before a race?', 'to prepare the muscles and prevent injury', ['to get tired', 'to win easily', 'to cool down']),
      t(5, 3, 'In a relay race, the runner passes the ___ to the next runner.', 'baton', ['ball', 'javelin', 'hoop']),
      t(5, 4, 'The triple jump is made up of a hop, a step and a ___.', 'jump', ['run', 'throw', 'roll']),
      t(6, 4, 'Which race has barriers and a water jump, and is a Kenyan speciality?', 'the 3000 metres steeplechase', ['the 100 metres', 'the relay', 'the marathon']),
      t(6, 5, 'Which is the correct order of the parts of a long jump?', 'run-up, take-off, flight, landing', ['take-off, run-up, landing, flight', 'flight, landing, run-up, take-off', 'landing, flight, take-off, run-up']),
      t(6, 5, 'In 2019, Eliud Kipchoge became the first person to run a marathon in under ___.', 'two hours', ['one hour', 'three hours', 'ten minutes']),
    ],
  },
  ballgames: {
    facts: {
      pairs: [
        {
          pairs: [
            ['football', '11'],
            ['netball', '7'],
            ['volleyball', '6'],
            ['basketball', '5'],
            ['rugby union', '15'],
          ],
          ask: (a) => `How many players are on the court or field for one ${a} team?`,
          askBack: (b) => `Which game has ${b} players on the court or field for each team?`,
        },
        {
          pairs: [
            ['dribbling', 'moving with the ball while keeping control of it'],
            ['passing', 'sending the ball to a teammate'],
            ['shooting', 'trying to score a goal'],
            ['serving', 'starting play in volleyball'],
            ['heading', 'hitting the ball with the forehead in football'],
            ['pivoting', 'turning on one foot while holding the ball in netball'],
          ],
          ask: (a) => `In ball games, what is ${a}?`,
          askBack: (b) => `Which skill is ${b}?`,
        },
      ],
      categories: [
        { one: 'a skill used in volleyball', many: 'volleyball skills', items: ['serving', 'setting', 'spiking', 'digging', 'blocking'], set: 's' },
        { one: 'a skill used in football', many: 'football skills', items: ['dribbling', 'heading', 'trapping', 'shooting', 'tackling'], set: 's' },
      ],
    },
    bank: [
      t(4, 2, 'In football, the only player who may touch the ball with the hands inside the penalty area is the ___.', 'goalkeeper', ['defender', 'striker', 'referee']),
      t(4, 3, 'Why is fair play important in games?', 'It keeps games safe and friendly.', ['It helps you cheat.', 'It makes games longer.', 'It stops scoring.']),
      t(5, 3, 'In netball, a player holding the ball may not ___.', 'run with it', ['pass it', 'pivot', 'shoot from the circle']),
      t(5, 4, 'In volleyball, how many touches may a team use before sending the ball over the net?', 'three', ['two', 'four', 'five']),
      t(6, 4, 'Which skill should a volleyball player use to send a high ball hard down into the other court?', 'spiking', ['serving underarm', 'digging', 'dribbling']),
      t(6, 5, 'A netball player catches the ball and turns on one foot to face the goal. Which rule is she following correctly?', 'the footwork rule (pivoting)', ['the offside rule', 'the free kick rule', 'the corner rule']),
    ],
  },
  gym: {
    facts: {
      categories: [
        { one: 'a gymnastics skill', many: 'gymnastics skills', items: ['forward roll', 'backward roll', 'cartwheel', 'handstand', 'headstand', 'star jump'], set: 'g' },
        { one: 'a swimming stroke', many: 'swimming strokes', items: ['front crawl (freestyle)', 'breaststroke', 'backstroke', 'butterfly'], set: 'g' },
        { one: 'a water safety rule', many: 'water safety rules', items: ['never swim alone', 'swim where a lifeguard can see you', 'do not dive into shallow water', 'wait a while after a big meal', 'walk, do not run, near the pool'], set: 'w' },
        { one: 'a gymnastics safety rule', many: 'gymnastics safety rules', items: ['use mats', 'warm up first', 'remove jewellery', 'have a teacher or partner spot you'], set: 'w' },
      ],
      pairs: [
        {
          pairs: [
            ['backstroke', 'is swum lying on the back'],
            ['breaststroke', 'uses a frog-like kick'],
            ['front crawl', 'is the fastest stroke, with arms moving one after the other'],
            ['butterfly', 'moves both arms over the water together with a dolphin kick'],
          ],
          ask: (a) => `Which describes ${a}?`,
          askBack: (b) => `Which swimming stroke ${b}?`,
        },
      ],
    },
    bank: [
      t(4, 2, 'Gymnastics should be done on ___.', 'mats', ['rocks', 'tables', 'a rough road']),
      t(4, 3, 'In a forward roll, you should tuck your ___.', 'chin to your chest', ['head backwards', 'hands behind your back', 'legs straight up']),
      t(5, 3, 'What should you do if you see someone struggling in deep water?', 'shout for an adult or lifeguard and throw something that floats', ['jump in yourself', 'walk away', 'laugh']),
      t(5, 4, 'Floating on your back in water helps you to ___.', 'rest and breathe easily', ['sink faster', 'swim very fast', 'stop breathing']),
      t(6, 4, 'A cartwheel moves the body ___.', 'sideways, hand-hand-foot-foot', ['backwards on the head', 'forwards on the knees', 'straight up']),
      t(6, 5, 'Why should a learner never dive into the shallow end of a pool?', 'The head could hit the bottom.', ['The water is too warm.', 'It is too easy.', 'Diving is only for fish.']),
    ],
  },
}

// ── CRE ─────────────────────────────────────────────────────────────────────

const CRE: Record<string, Topic> = {
  creation: {
    facts: {
      pairs: [
        {
          pairs: [
            ['the first day', 'light'],
            ['the second day', 'the sky'],
            ['the third day', 'dry land, seas and plants'],
            ['the fourth day', 'the sun, moon and stars'],
            ['the fifth day', 'fish and birds'],
            ['the sixth day', 'land animals and human beings'],
          ],
          ask: (a) => `In the creation story in Genesis 1, what did God create on ${a}?`,
          askBack: (b) => `On which day did God create ${b}?`,
        },
      ],
      categories: [
        { one: 'a way of caring for God\'s creation', many: 'ways of caring for creation', items: ['planting trees', 'feeding pets', 'saving water', 'keeping rivers clean', 'recycling waste', 'giving animals shelter'], set: 'c' },
        { one: 'a way of harming God\'s creation', many: 'ways of harming creation', items: ['cutting trees carelessly', 'dropping litter', 'wasting water', 'burning plastics', 'polluting rivers'], set: 'c' },
      ],
    },
    bank: [
      t(4, 2, 'On the seventh day, God ___.', 'rested', ['made the sun', 'made fish', 'made plants']),
      t(4, 2, 'The first man God created was ___.', 'Adam', ['Abraham', 'Moses', 'Noah']),
      t(4, 3, 'God placed Adam and Eve in the Garden of ___.', 'Eden', ['Gethsemane', 'Galilee', 'Bethlehem']),
      t(5, 3, 'God gave Adam the work of ___ the animals.', 'naming', ['counting', 'selling', 'painting']),
      t(5, 4, 'God made human beings in His own image. This teaches us that every person is ___.', 'special and must be respected', ['the same as animals', 'not important', 'a stranger']),
      t(6, 4, 'Caring for creation on God\'s behalf is called ___.', 'stewardship', ['ownership', 'leadership', 'friendship']),
      t(6, 5, 'Which school project best shows good stewardship of creation?', 'a tree nursery and a clean-up of the stream', ['painting the walls with slogans', 'a party with plastic plates', 'cutting the school hedge to the ground']),
    ],
  },
  bible: {
    facts: {
      categories: [
        { one: 'a book of the Law (Pentateuch)', many: 'books of the Law', items: ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'], set: 'b' },
        { one: 'a Gospel', many: 'Gospels', items: ['Matthew', 'Mark', 'Luke', 'John'], set: 'b' },
        { one: 'a book of the prophets', many: 'books of the prophets', items: ['Isaiah', 'Jeremiah', 'Ezekiel', 'Daniel', 'Amos', 'Hosea'], set: 'b' },
        { one: 'a letter (epistle)', many: 'letters', items: ['Romans', 'Galatians', 'Ephesians', 'Philippians', 'James', 'Hebrews'], set: 'b' },
      ],
      pairs: [
        {
          pairs: [
            ['the Old Testament', '39'],
            ['the New Testament', '27'],
            ['the whole Bible', '66'],
            ['the Gospels', '4'],
          ],
          ask: (a) => `How many books are in ${a}?`,
        },
        {
          pairs: [
            ['Genesis', 'the first book of the Bible'],
            ['Revelation', 'the last book of the Bible'],
            ['Psalms', 'a book of songs and prayers'],
            ['Proverbs', 'a book of wise sayings'],
            ['Acts of the Apostles', 'the story of the early church'],
          ],
          ask: (a) => `Which describes ${a}?`,
          askBack: (b) => `Which book is ${b}?`,
        },
      ],
    },
    bank: [
      t(4, 2, 'The Bible is divided into two parts: the Old Testament and the ___.', 'New Testament', ['Gospels', 'Psalms', 'Law']),
      t(4, 3, 'The first four books of the New Testament are called the ___.', 'Gospels', ['Letters', 'Prophets', 'Psalms']),
      t(5, 3, 'Why has the Bible been translated into many Kenyan languages?', 'so that everyone can read God\'s word in their own language', ['to make it longer', 'to hide it', 'so only teachers can read it']),
      t(5, 4, 'Which Gospel was written by a doctor?', 'Luke', ['Mark', 'John', 'Matthew']),
      t(6, 4, 'A Christian wants to read about the birth and teachings of Jesus. In which part of the Bible should they look?', 'the Gospels', ['the books of the Law', 'the Psalms', 'the books of the prophets']),
      t(6, 5, 'Which shows the best use of the Bible in a Christian family?', 'reading it together and following its teaching', ['keeping it unopened on a shelf', 'using it to press flowers', 'reading it only on holidays']),
    ],
  },
  ot: {
    facts: {
      pairs: [
        {
          pairs: [
            ['Abraham', 'obeyed God\'s call to leave his home for a new land'],
            ['Joseph', 'forgave his brothers and saved his family from famine'],
            ['Moses', 'led the Israelites out of Egypt and received the Ten Commandments'],
            ['Joshua', 'led the Israelites into the Promised Land'],
            ['Samuel', 'heard God calling him as a boy'],
            ['Solomon', 'asked God for wisdom'],
            ['Nehemiah', 'led the rebuilding of the walls of Jerusalem'],
            ['Esther', 'bravely spoke to the king to save her people'],
          ],
          ask: (a) => `What is ${a} remembered for?`,
          askBack: (b) => `Which Old Testament leader ${b}?`,
        },
        {
          pairs: [
            ['Abraham', 'faith in God'],
            ['Joseph', 'forgiveness'],
            ['Samuel', 'listening to God'],
            ['Solomon', 'wisdom'],
            ['Esther', 'courage'],
            ['Nehemiah', 'hard work and teamwork'],
          ],
          ask: (a) => `Which value do we learn from ${a}?`,
          askBack: (b) => `Which leader teaches us ${b}?`,
        },
      ],
    },
    bank: [
      t(4, 2, 'Moses received the Ten Commandments on Mount ___.', 'Sinai', ['Carmel', 'Zion', 'Olives']),
      t(4, 3, 'Joseph\'s father gave him a special ___.', 'coat of many colours', ['golden crown', 'silver cup', 'white horse']),
      t(4, 3, 'When God called Samuel at night, Samuel answered, "Speak, Lord, for your servant is ___."', 'listening', ['sleeping', 'leaving', 'busy']),
      t(5, 4, 'The son God promised to Abraham and Sarah was ___.', 'Isaac', ['Jacob', 'Joseph', 'Esau']),
      t(5, 4, 'King Solomon built the ___ in Jerusalem.', 'temple', ['ark', 'tower of Babel', 'city walls of Jericho']),
      t(6, 5, 'Joseph\'s brothers had treated him badly, but later he welcomed and fed them. Which value does this teach?', 'forgiveness', ['revenge', 'pride', 'greed']),
      t(6, 5, 'A class prefect asks God for wisdom to lead fairly. Which Old Testament leader made a similar request?', 'Solomon', ['Joshua', 'Esther', 'Abraham']),
    ],
  },
  jesus: {
    facts: {
      pairs: [
        {
          pairs: [
            ['Bethlehem', 'the town where Jesus was born'],
            ['Nazareth', 'the town where Jesus grew up'],
            ['River Jordan', 'where Jesus was baptised'],
            ['the wilderness', 'where Jesus fasted for forty days'],
            ['Jerusalem', 'where Jesus was found in the temple at age twelve'],
          ],
          ask: (a) => `What happened at ${a}?`,
          askBack: (b) => `Which place is ${b}?`,
        },
        {
          pairs: [
            ['gold', 'a gift fit for a king'],
            ['frankincense', 'a sweet-smelling gift used in worship'],
            ['myrrh', 'a precious ointment'],
          ],
          ask: (a) => `The wise men gave baby Jesus ${a}. What was it?`,
          askBack: (b) => `Which gift of the wise men was ${b}?`,
        },
      ],
      categories: [
        { one: 'a disciple of Jesus who was a fisherman', many: 'disciples who were fishermen', items: ['Peter', 'Andrew', 'James', 'John'], set: 'd' },
        { one: 'a person in the story of Jesus\' birth', many: 'people in the story of Jesus\' birth', items: ['Mary', 'Joseph', 'the shepherds', 'the wise men', 'the angel Gabriel'], set: 'd' },
      ],
    },
    bank: [
      t(4, 2, 'Jesus was baptised by ___.', 'John the Baptist', ['Peter', 'Paul', 'Moses']),
      t(4, 2, 'Jesus chose ___ disciples.', 'twelve', ['seven', 'ten', 'forty']),
      t(4, 3, 'The angel who told Mary she would have a son was ___.', 'Gabriel', ['Michael', 'Raphael', 'Simeon']),
      t(5, 3, 'When Jesus was twelve, his parents found him in the temple ___.', 'listening to the teachers and asking questions', ['playing games', 'sleeping', 'selling doves']),
      t(5, 4, 'Matthew worked as a ___ before he followed Jesus.', 'tax collector', ['fisherman', 'carpenter', 'shepherd']),
      t(6, 4, 'In the wilderness, Jesus answered each temptation by ___.', 'quoting the word of God', ['running away', 'arguing angrily', 'keeping quiet']),
      t(6, 5, 'Which lesson do young people learn from Jesus\' visit to the temple at twelve?', 'to love learning about God and respect teachers', ['to stay away from home', 'to ignore parents', 'to stop going to school']),
    ],
  },
  miracles: {
    facts: {
      categories: [
        { one: 'a nature miracle of Jesus', many: 'nature miracles', items: ['calming the storm', 'walking on water', 'turning water into wine', 'feeding the five thousand'], set: 'm' },
        { one: 'a healing miracle of Jesus', many: 'healing miracles', items: ['healing blind Bartimaeus', 'healing ten lepers', 'healing the paralysed man', 'healing Peter\'s mother-in-law'], set: 'm' },
      ],
      pairs: [
        {
          pairs: [
            ['the Good Samaritan', 'love your neighbour, whoever they are'],
            ['the Lost Sheep', 'God cares about every single person'],
            ['the Lost Son', 'God gladly forgives those who come back to Him'],
            ['the Sower', 'we should hear God\'s word and live by it'],
            ['the Mustard Seed', 'God\'s kingdom grows from small beginnings'],
            ['the Talents', 'we should use our gifts well'],
          ],
          ask: (a) => `What does the parable of ${a} teach?`,
          askBack: (b) => `Which parable teaches that ${b}?`,
        },
      ],
    },
    bank: [
      t(4, 2, 'Jesus\' first miracle was turning water into wine at a wedding in ___.', 'Cana', ['Bethlehem', 'Jericho', 'Nazareth']),
      t(4, 3, 'Jesus fed five thousand people with five loaves and ___.', 'two fish', ['five fish', 'ten cakes', 'one fish']),
      t(4, 3, 'A story with a lesson that Jesus told is called a ___.', 'parable', ['psalm', 'proverb', 'prophecy']),
      t(5, 4, 'Of the ten lepers Jesus healed, how many came back to say thank you?', 'one', ['ten', 'five', 'none']),
      t(5, 4, 'In the parable of the Good Samaritan, who helped the injured traveller?', 'the Samaritan', ['the priest', 'the Levite', 'the innkeeper only']),
      t(6, 5, 'A learner shares lunch with a new pupil from another community. Which parable is the learner living out?', 'the Good Samaritan', ['the Talents', 'the Mustard Seed', 'the Sower']),
      t(6, 5, 'What does the healing of the ten lepers teach us?', 'to always be thankful', ['to stay away from others', 'to be proud', 'to keep secrets']),
    ],
  },
  church: {
    facts: {
      categories: [
        { one: 'a fruit of the Holy Spirit', many: 'fruits of the Holy Spirit', items: ['love', 'joy', 'peace', 'patience', 'kindness', 'self-control', 'gentleness'], set: 'f' },
        { one: 'a gift of the Holy Spirit', many: 'gifts of the Holy Spirit', items: ['wisdom', 'knowledge', 'faith', 'healing', 'speaking in tongues', 'prophecy'], set: 'f' },
      ],
      pairs: [
        {
          pairs: [
            ['Christmas', 'the birth of Jesus'],
            ['Easter', 'the resurrection of Jesus'],
            ['Pentecost', 'the coming of the Holy Spirit'],
            ['Palm Sunday', 'Jesus\' joyful entry into Jerusalem'],
            ['Ascension Day', 'Jesus going up to heaven'],
          ],
          ask: (a) => `What do Christians celebrate at ${a}?`,
          askBack: (b) => `Which Christian festival celebrates ${b}?`,
        },
      ],
    },
    bank: [
      t(4, 2, 'The Holy Spirit came upon the disciples on the day of ___.', 'Pentecost', ['Christmas', 'Easter', 'Palm Sunday']),
      t(4, 3, 'The early Christians met to pray, learn and ___.', 'share what they had', ['argue', 'hide food', 'stay alone']),
      t(5, 3, 'The book that tells the story of the early church is ___.', 'Acts of the Apostles', ['Genesis', 'Psalms', 'Revelation']),
      t(5, 4, 'Which apostle travelled on missionary journeys and wrote many letters?', 'Paul', ['Thomas', 'Andrew', 'Matthew']),
      t(6, 4, 'Two sacraments practised by most churches are baptism and ___.', 'Holy Communion', ['Christmas', 'Pentecost', 'fasting']),
      t(6, 5, 'A learner stays calm and kind when teased. Which fruit of the Spirit is shown?', 'self-control', ['prophecy', 'speaking in tongues', 'knowledge']),
    ],
  },
  living: {
    facts: {
      categories: [
        { one: 'a Christian value', many: 'Christian values', items: ['honesty', 'kindness', 'respect', 'forgiveness', 'humility', 'generosity', 'responsibility'], set: 'v' },
        { one: 'a habit Christians avoid', many: 'habits Christians avoid', items: ['telling lies', 'cheating', 'gossiping', 'being greedy', 'being boastful'], set: 'v' },
      ],
      pairs: [
        {
          pairs: [
            ['returning a lost wallet to its owner', 'honesty'],
            ['sharing your snack with a hungry friend', 'generosity'],
            ['saying sorry and making up after a quarrel', 'forgiveness'],
            ['helping an elderly neighbour carry water', 'kindness'],
            ['finishing your duties without being reminded', 'responsibility'],
            ['letting others go first in the line', 'humility'],
          ],
          ask: (a) => `Which value is shown by ${a}?`,
          askBack: (b) => `Which action shows ${b}?`,
        },
      ],
    },
    bank: [
      t(4, 2, 'Jesus taught us to love God and to love our ___.', 'neighbours', ['money', 'toys', 'enemies only']),
      t(4, 3, 'Which is the best way to use free time?', 'helping at home, reading and playing safely', ['idling in the streets', 'gossiping', 'watching TV all day']),
      t(5, 3, 'A learner finds the answers to a test on the teacher\'s desk. What should the learner do?', 'leave them and tell the teacher', ['copy them', 'share them', 'hide them']),
      t(5, 4, 'Why should Christians care for the sick and needy?', 'Jesus taught us to love and help others.', ['to get rewards', 'to be famous', 'because it is a game']),
      t(6, 4, 'A friend offers you a harmful substance at a party. What is the best response?', 'say no firmly and tell a trusted adult', ['try a little', 'keep it secret', 'give it to others']),
      t(6, 5, 'Which Bible verse best guides a pupil who is tempted to take revenge?', '"Do to others as you would have them do to you."', ['"An eye for an eye."', '"Let the strong win."', '"Keep what you find."']),
    ],
  },
}

const ALL_FACTS: Record<string, FactSet> = {}
const ALL_BANKS: Record<string, BankQuestion[]> = {}
for (const [letter, set] of [['c', CREATIVE], ['r', CRE]] as const)
  for (const [k, v] of Object.entries(set))
    for (const g of [4, 5, 6] as G[]) {
      ALL_FACTS[`u${g}${letter}-${k}`] = v.facts
      // Each grade meets its own questions and those of the grades below it; a question a
      // grade has outgrown moves down one level so the climb stays gradual.
      ALL_BANKS[`u${g}${letter}-${k}`] = v.bank.filter(([min]) => min <= g).map(([min, q]) => (min < g && q.level > 1 ? { ...q, level: (q.level - (g - min)) as Level } : q)).filter((q) => q.level >= 1)
    }

export const UPPER_ARTS_CRE_GENERATORS: Record<string, Generator> = Object.fromEntries(Object.entries(ALL_FACTS).map(([k, v]) => [k, factGenerator(v)]))
export const UPPER_ARTS_CRE_BANKS: Record<string, BankQuestion[]> = ALL_BANKS
