// Grades 4–6 Social Studies, Creative Arts and CRE lessons, one per topic. Social Studies
// steps move outward with the grades: county, Kenya, then East Africa.
import type { Lesson } from './types'

export const UPPER_SOCIAL_LESSONS: Record<string, Lesson> = {
  'uo-maps': {
    intro: 'Maps show places from above. Directions, symbols and scale help us read them.',
    steps: [
      { title: 'Directions', text: 'North, south, east and west are the main points. North-east is halfway between north and east. The sun rises in the east.' },
      { title: 'Parts of a map', text: 'The title says what the map shows; the key explains symbols; the compass shows direction; the scale compares map and real distance.' },
      { title: 'Kenya and its neighbours', text: 'Tanzania (south), Uganda (west), South Sudan (north-west), Ethiopia (north), Somalia (east), and the Indian Ocean to the south-east.' },
      { title: 'Using scale', text: 'Real distance = map distance × scale.', example: ['Scale 1 cm to 20 km; map distance 6 cm', '6 × 20 = 120 km'] },
    ],
    remember: 'Read the key, check the compass, then use the scale.',
  },
  'uo-features': {
    intro: 'Physical features are natural shapes of the land and water; built features are made by people.',
    steps: [
      { title: 'Kinds of features', text: 'Mountains, hills, valleys, plains, plateaus, rivers, lakes and swamps are physical. Roads, bridges and dams are built.' },
      { title: 'Kenya\'s features', text: 'Mount Kenya is our highest mountain; River Tana is our longest river; the Great Rift Valley crosses the country.' },
      { title: 'East Africa', text: 'Mount Kilimanjaro is the highest in Africa; Lake Victoria is the largest lake in Africa; the Nile flows out of it at Jinja.' },
    ],
    remember: 'Mount Kenya – highest in Kenya; Kilimanjaro – highest in Africa; Lake Victoria – largest in Africa.',
  },
  'uo-weather': {
    intro: 'Weather is the condition of the air today; climate is the usual weather over many years.',
    steps: [
      { title: 'Measuring weather', text: 'Rain gauge (rainfall), thermometer (temperature), wind vane (wind direction), windsock (direction and strength).' },
      { title: 'Climate of Kenya', text: 'The highlands are cool and wet, the coast hot and humid, and the north hot and dry. Long rains: March–May; short rains: October–December.' },
      { title: 'Vegetation', text: 'Rainforest (Kakamega), savannah (Maasai Mara), semi-desert (northern Kenya), mangroves (the coast).' },
    ],
    remember: 'Higher places are cooler; rain gauges belong in open places.',
  },
  'uo-people': {
    intro: 'Kenya is home to many communities with rich cultures. Respecting each other keeps us united.',
    steps: [
      { title: 'Culture', text: 'Language, food, dress, songs, dances and ceremonies are parts of culture.' },
      { title: 'Language groups', text: 'Bantu (Agikuyu, Luhya, Akamba…), Nilotes (Luo, Kalenjin, Maasai…), Cushites (Somali, Borana, Rendille…).' },
      { title: 'Population', text: 'A census counts the people every ten years. Fertile, wet areas are densely populated; dry areas are sparsely populated.' },
    ],
    remember: 'Many communities, one Kenya: respect every culture.',
  },
  'uo-history': {
    intro: 'History tells the story of the past so we understand the present.',
    steps: [
      { title: 'Sources', text: 'Oral traditions, archaeology, written records and museums.' },
      { title: 'Early people', text: 'They gathered fruits, hunted with stone tools and discovered fire. Sites include Olorgesailie, Koobi Fora and Hyrax Hill.' },
      { title: 'Towards independence', text: 'Kenya was ruled by Britain. Heroes and heroines worked for freedom, and Kenya became independent on 12th December 1963, with Jomo Kenyatta as the first President.' },
    ],
    remember: 'Kenya became independent on 12th December 1963 and a republic in 1964.',
  },
  'uo-resources': {
    intro: 'Resources are things we use to meet our needs and earn a living.',
    steps: [
      { title: 'Natural and man-made', text: 'Soil, water, forests, minerals and wildlife are natural. Roads, schools and dams are man-made.' },
      { title: 'Economic activities', text: 'Farming (tea in Kericho), fishing (Lake Victoria), mining (soda ash at Magadi), tourism and trade.' },
      { title: 'Using resources wisely', text: 'Conserve forests, avoid waste, and add value by processing goods before selling them.' },
    ],
    remember: 'Use resources wisely so they last for the future.',
  },
  'uo-transport': {
    intro: 'Transport moves people and goods; communication moves messages.',
    steps: [
      { title: 'Means of transport', text: 'Road, railway (the SGR), water (ships, ferries), air (aeroplanes) and pipelines.' },
      { title: 'Communication', text: 'Radio, television, newspapers, phones and the internet. Mass media reach many people at once.' },
      { title: 'Trade links', text: 'The Port of Mombasa serves Kenya and its landlocked neighbours through the Northern Corridor.' },
    ],
    remember: 'Air is fastest, water is cheapest for heavy goods, pipelines carry oil.',
  },
  'uo-governance': {
    intro: 'Government makes and carries out laws and provides services.',
    steps: [
      { title: 'County government', text: 'Kenya has 47 counties. The governor leads; MCAs make county laws. Counties run health centres, county roads and ECDE.' },
      { title: 'National government', text: 'Three arms: the executive (President) carries out laws, Parliament makes laws, and the judiciary interprets them.' },
      { title: 'Elections', text: 'Every five years Kenyans aged 18 and above elect six leaders by secret ballot. IEBC runs elections.' },
    ],
    remember: 'Parliament makes laws, the executive carries them out, the courts interpret them.',
  },
  'uo-citizenship': {
    intro: 'Good citizens know their rights and carry out their responsibilities.',
    steps: [
      { title: 'Rights and responsibilities', text: 'Children have rights to education, food, health and protection. They also obey parents, respect others and care for property.' },
      { title: 'National symbols and holidays', text: 'Flag, anthem, coat of arms, public seal. Madaraka Day (1 June), Mashujaa Day (20 October), Jamhuri Day (12 December).' },
      { title: 'Peace', text: 'Solve conflicts by talking (negotiation), with a neutral helper (mediation) or a neutral judge (arbitration).' },
    ],
    remember: 'Every right comes with a responsibility; talk to solve conflicts.',
  },
}

export const UPPER_CREATIVE_LESSONS: Record<string, Lesson> = {
  'uc-drawing': {
    intro: 'Artists use colour, shading and arrangement to make pictures come alive.',
    steps: [
      { title: 'Colours', text: 'Primary: red, yellow, blue. Mixing two makes secondary colours: orange, green, purple.' },
      { title: 'Warm and cool', text: 'Red, orange and yellow are warm; blue, green and purple are cool. Add white for a tint, black for a shade.' },
      { title: 'Shading', text: 'Hatching, cross-hatching, stippling and smudging make objects look solid.' },
    ],
    remember: 'Red + yellow = orange, blue + yellow = green, red + blue = purple.',
  },
  'uc-craft': {
    intro: 'Crafts turn simple materials into useful and beautiful things.',
    steps: [
      { title: 'Weaving', text: 'Warp threads run up and down; weft threads go over and under across them. Sisal, raffia and palm leaves are used.' },
      { title: 'Modelling', text: 'Pinch, coil and slab methods shape clay. Wedge clay first to remove air.' },
      { title: 'Kenyan crafts', text: 'The kiondo basket, Kisii soapstone, Maasai beadwork and Akamba carvings.' },
    ],
    remember: 'Warp up and down, weft across; wedge clay before modelling.',
  },
  'uc-notation': {
    intro: 'Music notation writes down sounds so anyone can read and play them.',
    steps: [
      { title: 'Note values', text: 'Semibreve 4 beats, minim 2, crotchet 1, quaver ½, semiquaver ¼.' },
      { title: 'Time signatures', text: '2/4, 3/4 and 4/4 tell how many crotchet beats are in each bar.' },
      { title: 'Sol-fa and the staff', text: 'd r m f s l t d\'. The treble staff has five lines (E G B D F) and four spaces (F A C E).' },
    ],
    remember: 'Semibreve 4, minim 2, crotchet 1 — and the spaces spell FACE.',
  },
  'uc-instruments': {
    intro: 'Instruments are grouped by how they make sound.',
    steps: [
      { title: 'String', text: 'Plucked or bowed: nyatiti (Luo), obokano (Abagusii), orutu, guitar.' },
      { title: 'Wind', text: 'Blown: chivoti, nzumari, flute, trumpet.' },
      { title: 'Percussion', text: 'Beaten or shaken: isukuti (Luhya), kayamba (Mijikenda), drums, marimba.' },
    ],
    remember: 'Pluck or bow strings, blow wind instruments, beat or shake percussion.',
  },
  'uc-songs': {
    intro: 'Songs celebrate, teach, comfort and unite us.',
    steps: [
      { title: 'Kinds of songs', text: 'Lullabies, work songs, patriotic songs, sacred songs, wedding songs and action songs.' },
      { title: 'The National Anthem', text: 'Three stanzas, beginning "Ee Mungu nguvu yetu". Stand upright and still when it is sung.' },
      { title: 'Elements of music', text: 'Melody (tune), rhythm (pattern), tempo (speed), dynamics (loud or soft), pitch (high or low).' },
    ],
    remember: 'Stand still and upright for the anthem; tempo is speed, dynamics is loudness.',
  },
  'uc-athletics': {
    intro: 'Athletics builds strength and speed. Kenya is famous for its runners.',
    steps: [
      { title: 'Track and field', text: 'Track: sprints, relays, hurdles, steeplechase. Field: long jump, high jump, triple jump, shot put, javelin, discus.' },
      { title: 'Starts', text: 'A crouch start for sprints; a standing start for long races. Relay runners pass a baton.' },
      { title: 'Kenyan stars', text: 'Eliud Kipchoge (marathon), David Rudisha (800 m), Faith Kipyegon (1500 m).' },
    ],
    remember: 'Warm up first; crouch start for sprints, standing start for long races.',
  },
  'uc-ballgames': {
    intro: 'Ball games build teamwork, skill and fair play.',
    steps: [
      { title: 'Team sizes', text: 'Football 11, rugby 15, netball 7, handball 7, volleyball 6, basketball 5.' },
      { title: 'Skills', text: 'Dribbling, passing, shooting and heading in football; serving, setting and spiking in volleyball; pivoting in netball.' },
      { title: 'Fair play', text: 'Follow the rules, respect the referee and shake hands at the end.' },
    ],
    remember: 'Football 11, netball 7, volleyball 6 — and always play fair.',
  },
  'uc-gym': {
    intro: 'Gymnastics and swimming build balance, strength and confidence — safely.',
    steps: [
      { title: 'Gymnastics', text: 'Forward and backward rolls, cartwheels, handstands and balances, always on mats after warming up.' },
      { title: 'Swimming strokes', text: 'Front crawl, breaststroke, backstroke and butterfly.' },
      { title: 'Water safety', text: 'Never swim alone, swim where a lifeguard can see you, and never dive into shallow water.' },
    ],
    remember: 'Mats for gymnastics; never swim alone.',
  },
}

export const UPPER_CRE_LESSONS: Record<string, Lesson> = {
  'ur-creation': {
    intro: 'God created the world and everything in it, and asked people to care for it.',
    steps: [
      { title: 'Six days', text: 'Light; sky; land, seas and plants; sun, moon and stars; fish and birds; animals and people. On the seventh day God rested.' },
      { title: 'In God\'s image', text: 'God made people in His own image, so every person is special and deserves respect.' },
      { title: 'Stewardship', text: 'We care for creation by planting trees, saving water, keeping rivers clean and caring for animals.' },
    ],
    remember: 'God made everything good; we are stewards who care for it.',
  },
  'ur-bible': {
    intro: 'The Bible is God\'s word. It guides how Christians live.',
    steps: [
      { title: 'Two parts', text: 'The Old Testament has 39 books and the New Testament 27, making 66 books.' },
      { title: 'Groups of books', text: 'Law (Genesis to Deuteronomy), history, poetry (Psalms, Proverbs), prophets, Gospels (Matthew, Mark, Luke, John), letters.' },
      { title: 'Using the Bible', text: 'Christians read it to learn about God, to pray, and to guide their choices.' },
    ],
    remember: '66 books: 39 in the Old Testament, 27 in the New Testament.',
  },
  'ur-ot': {
    intro: 'Old Testament leaders show us faith, courage and wisdom.',
    steps: [
      { title: 'Abraham and Joseph', text: 'Abraham obeyed God and left his home in faith. Joseph forgave his brothers and saved his family.' },
      { title: 'Moses and Joshua', text: 'Moses led the Israelites out of Egypt and received the Ten Commandments on Mount Sinai. Joshua led them into the Promised Land.' },
      { title: 'Samuel, Solomon, Esther', text: 'Samuel listened to God as a boy; Solomon asked for wisdom; Esther bravely spoke up for her people.' },
    ],
    remember: 'Faith like Abraham, forgiveness like Joseph, wisdom like Solomon.',
  },
  'ur-jesus': {
    intro: 'The life of Jesus shows God\'s love for all people.',
    steps: [
      { title: 'Birth', text: 'Jesus was born in Bethlehem to Mary. Shepherds and wise men came; the wise men brought gold, frankincense and myrrh.' },
      { title: 'Childhood', text: 'Jesus grew up in Nazareth. At twelve he was found in the temple, listening and asking questions.' },
      { title: 'Baptism and temptation', text: 'John baptised Jesus in the River Jordan. In the wilderness, Jesus answered each temptation with the word of God.' },
    ],
    remember: 'Born in Bethlehem, raised in Nazareth, baptised in the Jordan.',
  },
  'ur-miracles': {
    intro: 'Jesus\' miracles showed God\'s power; His parables taught lessons through stories.',
    steps: [
      { title: 'Miracles', text: 'Water into wine at Cana, feeding the five thousand, calming the storm, healing blind Bartimaeus and the ten lepers.' },
      { title: 'Parables', text: 'The Good Samaritan (love your neighbour), the Lost Sheep (God cares for everyone), the Lost Son (God forgives).' },
      { title: 'Living the lesson', text: 'Be thankful like the one leper who returned, and kind like the Good Samaritan.' },
    ],
    remember: 'Miracles show God\'s power; parables teach how to live.',
  },
  'ur-church': {
    intro: 'The church is the family of believers, led by the Holy Spirit.',
    steps: [
      { title: 'Pentecost', text: 'The Holy Spirit came upon the disciples at Pentecost. The early Christians prayed, learnt and shared what they had.' },
      { title: 'Fruits of the Spirit', text: 'Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness and self-control.' },
      { title: 'Festivals', text: 'Christmas (birth of Jesus), Palm Sunday, Easter (resurrection), Ascension and Pentecost.' },
    ],
    remember: 'The fruits of the Spirit show in how we treat others.',
  },
  'ur-living': {
    intro: 'Christian values guide our choices at home, at school and everywhere.',
    steps: [
      { title: 'Values', text: 'Honesty, kindness, respect, forgiveness, humility, generosity and responsibility.' },
      { title: 'Good choices', text: 'Tell the truth, help the needy, use free time well, and say no to harmful things.' },
      { title: 'The golden rule', text: 'Do to others as you would have them do to you.' },
    ],
    remember: 'Do to others as you would have them do to you.',
  },
}
