// Grade 2 Environmental, Kiswahili, Creative and CRE lessons.
import type { Lesson } from './types'

export const ENVIRONMENTAL2_LESSONS: Record<string, Lesson> = {
  'sv-home': {
    intro: 'Our home keeps us safe, and everyone helps to keep it clean.',
    steps: [
      { title: 'Rooms at home', text: 'We cook in the kitchen, sleep in the bedroom and wash in the bathroom.', visual: { kind: 'art', art: ['house', 'bed', 'pot'] } },
      { title: 'Personal and shared items', text: 'Personal items are used by one person, like a toothbrush and comb. Shared items are used by everyone, like chairs and a table.' },
      { title: 'Keeping home clean', text: 'Sweep the floor, wash dishes, and put rubbish in the dustbin. Keep knives and medicine away from small children.' },
    ],
    remember: 'Use your own toothbrush and comb, and help keep the home clean and safe.',
  },
  'sv-needs': {
    intro: 'Needs are things we must have. Wants are things we would like.',
    steps: [
      { title: 'Needs', text: 'Food, water, clothes, a house and medicine are needs. We cannot live well without them.' },
      { title: 'Wants', text: 'Sweets, toys and a television are wants. They are nice, but we can live without them.' },
    ],
    remember: 'Needs first, then wants.',
  },
  'sv-school': {
    intro: 'Our school is where we learn, play and make friends.',
    steps: [
      { title: 'People at school', text: 'The teacher teaches us, the cook prepares food, and the watchman guards the school.' },
      { title: 'A clean school', text: 'We sweep classrooms, pick up litter and use the dustbin.' },
      { title: 'Staying safe', text: 'Do not run on wet floors or play with sharp things. Tell a teacher if someone gets hurt.' },
    ],
    remember: 'Keep the school clean, play safely, and tell a teacher when someone is hurt.',
  },
  'sv-flag': {
    intro: 'The Kenyan flag stands for our country and its people.',
    steps: [
      { title: 'Four colours', text: 'Black for the people, red for the sacrifices made for freedom, green for the land, white for peace.' },
      { title: 'The shield', text: 'In the middle is a shield with two spears. They stand for defending our freedom.' },
      { title: 'Respect', text: 'Stand still when the flag is raised. Keep it clean and never tear it.' },
    ],
    remember: 'Black, red, green, white: people, freedom, land, peace.',
  },
  'sv-rights': {
    intro: 'Every child has rights, and every child has responsibilities.',
    steps: [
      { title: 'Rights', text: 'Every child should have food, shelter, education, medical care, love and time to play.' },
      { title: 'Responsibilities', text: 'Children should obey parents, do homework, keep things clean and respect others.' },
    ],
    remember: 'Rights are what we should get; responsibilities are what we should do.',
  },
  'sv-market': {
    intro: 'At the market, people buy and sell goods.',
    steps: [
      { title: 'Buyers and sellers', text: 'Sellers sell goods. Buyers pay money for them.' },
      { title: 'Things sold', text: 'Tomatoes, onions, fruits, clothes, shoes and chickens are sold at the market.', visual: { kind: 'art', art: ['tomato', 'banana', 'hen'] } },
      { title: 'Buying wisely', text: 'Count your money, ask the price, and wash fruits before eating them.' },
    ],
    remember: 'Sellers sell, buyers pay. Wash fruits before eating.',
  },
  'sv-weather': {
    intro: 'Weather is what the air and sky are like today.',
    steps: [
      { title: 'Kinds of weather', text: 'It can be sunny, rainy, windy or cloudy.', visual: { kind: 'art', art: ['sun', 'rain', 'wind', 'cloud'] } },
      { title: 'Dressing for weather', text: 'Use an umbrella and gumboots when it rains, a sweater when it is cold, and light clothes when it is hot.' },
    ],
    remember: 'Look at the sky, then dress for the weather.',
  },
  'sv-soil': {
    intro: 'Soil is where plants grow, and we can make things from it.',
    steps: [
      { title: 'Kinds of soil', text: 'Sand is rough and loose. Clay is sticky when wet. Loam is dark and good for crops.', visual: { kind: 'art', art: ['sand', 'clay', 'loam'] } },
      { title: 'Making things', text: 'We use clay to make pots, bowls and toy animals.' },
    ],
    remember: 'Sand is loose, clay is sticky, loam grows crops.',
  },
  'sv-light': {
    intro: 'Light helps us to see.',
    steps: [
      { title: 'Sources of light', text: 'The sun, torches, lamps, candles, bulbs and fire give light.', visual: { kind: 'art', art: ['sun', 'moon', 'star'] } },
      { title: 'Caring for our eyes', text: 'Never look straight at the sun. Read where there is enough light. Do not rub your eyes with dirty hands.' },
    ],
    remember: 'The sun is our biggest light. Never look straight at it.',
  },
  'sv-water': {
    intro: 'We need water every day, so we must use it well.',
    steps: [
      { title: 'Where water comes from', text: 'Rain, rivers, lakes, wells, springs and taps.', visual: { kind: 'art', art: ['rain', 'river', 'well', 'tap'] } },
      { title: 'Uses of water', text: 'We drink, cook, bathe, wash clothes and water plants.' },
      { title: 'Saving water', text: 'Close the tap, fix leaks, and use a cup when brushing your teeth.' },
    ],
    remember: 'Drink clean water and never waste it.',
  },
  'sv-plants': {
    intro: 'Plants give us food, shade and fresh air.',
    steps: [
      { title: 'Parts of a plant', text: 'Roots hold the plant in the soil. The stem holds it up. Leaves make food. Flowers become fruits.', visual: { kind: 'art', art: ['root', 'stem', 'leaf', 'flower'] } },
      { title: 'Caring for plants', text: 'Water them, remove weeds and put a fence around young trees.' },
    ],
    remember: 'Roots, stem, leaves, flowers: each part has a job.',
  },
  'sv-animals': {
    intro: 'Some animals live with us at home; others live in the wild.',
    steps: [
      { title: 'Domestic and wild', text: 'Cows, goats, dogs and hens live with people. Lions, elephants and zebras live in the wild.', visual: { kind: 'art', art: ['cow', 'lion', 'zebra'] } },
      { title: 'Young ones', text: 'A cow has a calf, a hen has a chick, a dog has a puppy and a cat has a kitten.' },
      { title: 'Keeping safe', text: 'Never go near wild animals. Be gentle with animals at home.' },
    ],
    remember: 'Domestic animals live with us; wild animals live in the wild.',
  },
}

export const KISWAHILI2_LESSONS: Record<string, Lesson> = {
  'sk-salamu': {
    intro: 'Tunasalimiana kwa adabu. Kila salamu ina jibu lake.',
    steps: [
      { title: 'Salamu na majibu', text: 'Hujambo? Jibu: Sijambo. Shikamoo? Jibu: Marahaba.', example: ['Hamjambo? → Hatujambo'] },
      { title: 'Salamu za nyakati', text: 'Asubuhi: Habari za asubuhi? Mchana: Habari za mchana? Jioni: Habari za jioni? Usiku: Usiku mwema.' },
      { title: 'Maneno ya adabu', text: 'Asante tukipewa kitu. Samahani tukimkosea mtu. Pole mtu akiumia.' },
    ],
    remember: 'Hujambo → Sijambo. Shikamoo → Marahaba. Asante → Karibu.',
  },
  'sk-msamiati': {
    intro: 'Tujifunze maneno ya familia, mwili, wanyama, rangi na nambari.',
    steps: [
      { title: 'Familia', text: 'Baba, mama, kaka, dada, bibi na babu ni watu wa familia.' },
      { title: 'Sehemu za mwili', text: 'Tunaona kwa macho, tunasikia kwa masikio, na tunatembea kwa miguu.' },
      { title: 'Nambari', text: 'Moja, mbili, tatu, nne, tano, sita, saba, nane, tisa, kumi.' },
    ],
    remember: 'Jifunze maneno kwa makundi: familia, mwili, wanyama, rangi.',
  },
  'sk-silabi': {
    intro: 'Maneno ya Kiswahili hujengwa kwa silabi.',
    steps: [
      { title: 'Silabi', text: 'Silabi ni sehemu ndogo ya neno tunayoitamka kwa pamoja.', example: ['ba - ba → baba', 'ka - la - mu → kalamu'] },
      { title: 'Kuhesabu silabi', text: 'Piga makofi kwa kila silabi.', example: ['ki - ta - bu: silabi tatu'] },
    ],
    remember: 'Tamka neno polepole, silabi moja moja.',
  },
  'sk-ufahamu': {
    intro: 'Tunasoma hadithi ili tuelewe inasema nini.',
    steps: [
      { title: 'Soma polepole', text: 'Soma kila sentensi kwa makini.' },
      { title: 'Tafuta jibu', text: 'Tafuta maneno ya swali katika hadithi.', visual: { kind: 'passage', title: 'Mbwa', text: 'Juma ana mbwa mweupe. Anaitwa Bobi.' }, example: ['Mbwa ana rangi gani? → nyeupe'] },
    ],
    remember: 'Tafuta maneno ya swali katika hadithi.',
  },
  'sk-tahajia': {
    intro: 'Tahajia ni kuandika neno kwa herufi sahihi.',
    steps: [
      { title: 'Tamka polepole', text: 'Sema neno polepole, kisha andika kila sauti.', example: ['ki - ti → kiti'] },
      { title: 'Soma tena', text: 'Soma neno uliloandika. Je, limeandikwa sawa?' },
    ],
    remember: 'Tamka, andika, soma tena.',
  },
  'sk-umoja': {
    intro: 'Umoja ni kitu kimoja; wingi ni vitu vingi.',
    steps: [
      { title: 'KI na VI', text: 'Maneno yanayoanza na ki- huwa vi- kwa wingi.', example: ['kiti → viti', 'kitabu → vitabu'] },
      { title: 'M na WA', text: 'Watu: m- huwa wa- kwa wingi.', example: ['mtoto → watoto', 'mwalimu → walimu'] },
      { title: 'Hiki, hivi, huyu, hawa', text: 'Kiti hiki → viti hivi. Mtoto huyu → watoto hawa.' },
    ],
    remember: 'ki → vi; m → wa. hiki → hivi; huyu → hawa.',
  },
  'sk-viulizi': {
    intro: 'Tunatumia maneno maalum kuuliza maswali.',
    steps: [
      { title: 'Maneno ya kuuliza', text: 'Nani huuliza mtu. Nini huuliza kitu. Wapi huuliza mahali. Lini huuliza wakati. Ngapi huuliza idadi.' },
      { title: 'Mifano', text: 'Jaza neno sahihi katika swali.', example: ['Unaishi wapi?', 'Una miaka mingapi?'] },
    ],
    remember: 'Nani: mtu. Nini: kitu. Wapi: mahali. Lini: wakati. Ngapi: idadi.',
  },
  'sk-kinyume': {
    intro: 'Kinyume ni neno lenye maana tofauti kabisa.',
    steps: [
      { title: 'Mifano', text: 'Kila neno lina kinyume chake.', example: ['juu → chini', 'kubwa → ndogo', 'cheka → lia'] },
      { title: 'Vitendo', text: 'Vitenzi pia vina vinyume.', example: ['fungua → funga', 'ingia → toka'] },
    ],
    remember: 'Kinyume: maana iliyo tofauti kabisa.',
  },
}

export const CREATIVE2_LESSONS: Record<string, Lesson> = {
  'sc-picture': {
    intro: 'We make pictures by drawing, colouring and printing.',
    steps: [
      { title: 'Tools', text: 'We draw with pencils and charcoal, colour with crayons, and paint with brushes.' },
      { title: 'Printing', text: 'Press a painted leaf, thumb or cut potato on paper to make a print.' },
      { title: 'Mixing colours', text: 'Blue and yellow make green. Red and yellow make orange.' },
    ],
    remember: 'Draw, colour, print, and clean your brush after painting.',
  },
  'sc-rhythm': {
    intro: 'Rhythm is a pattern of sounds that repeats.',
    steps: [
      { title: 'The beat', text: 'The beat is steady, like a heartbeat. Clap or stamp it.' },
      { title: 'Patterns', text: 'Say the pattern, then clap it.', example: ['clap, clap, stamp, clap, clap, stamp'] },
    ],
    remember: 'Keep the beat steady and repeat the pattern.',
  },
  'sc-melody': {
    intro: 'A melody is a tune with high and low sounds.',
    steps: [
      { title: 'High and low', text: 'A bird or whistle sounds high. A big drum or thunder sounds low.' },
      { title: 'Singing well', text: 'Stand tall, breathe in, and sing with a clear, gentle voice.' },
    ],
    remember: 'Sounds can be high or low. Sing clearly, not shouting.',
  },
  'sc-games': {
    intro: 'Singing games let us sing, move and play together.',
    steps: [
      { title: 'How to play', text: 'Stand in a circle, follow the leader, sing together and take turns.' },
      { title: 'Playing kindly', text: 'Let everyone join, play gently, and never push others.' },
    ],
    remember: 'Take turns, follow the leader, and let everyone join.',
  },
  'sc-movement': {
    intro: 'We can move our bodies in many ways.',
    steps: [
      { title: 'Moving from place to place', text: 'Walk, run, jump, hop, skip and crawl.' },
      { title: 'Moving on the spot', text: 'Turn, bend, stretch and twist without moving your feet away.' },
      { title: 'Safety', text: 'Warm up first and look around so you do not bump into others.' },
    ],
    remember: 'Warm up, look around, then move.',
  },
  'sc-ball': {
    intro: 'Ball games help us become strong and work as a team.',
    steps: [
      { title: 'Ball skills', text: 'We throw and catch with our hands, and kick with our feet.' },
      { title: 'Catching', text: 'Keep your eyes on the ball and hold your hands ready.' },
      { title: 'Playing safely', text: 'Use a soft ball, play on clear ground and never throw at faces.' },
    ],
    remember: 'Eyes on the ball, and play safely.',
  },
  'sc-water': {
    intro: 'Water can be fun, but it can also be dangerous.',
    steps: [
      { title: 'Stay safe', text: 'Only play in water when an adult is watching. Keep away from deep rivers and wells.' },
      { title: 'If someone needs help', text: 'Shout for an adult. Do not jump in yourself.' },
    ],
    remember: 'Never go near water without an adult.',
  },
  'sc-songs': {
    intro: 'Patriotic songs and the National Anthem show our love for Kenya.',
    steps: [
      { title: 'The National Anthem', text: 'It is a prayer asking God to bless Kenya. We sing it at assembly.' },
      { title: 'Showing respect', text: 'Stand still and upright, and sing clearly. Do not talk or laugh.' },
    ],
    remember: 'Stand still and sing clearly during the National Anthem.',
  },
}

export const CRE2_LESSONS: Record<string, Lesson> = {
  'sr-self': {
    intro: 'God made each of us special.',
    steps: [
      { title: 'My body', text: 'God gave me eyes to see, ears to hear, and hands and legs to work and play.' },
      { title: 'Caring for my body', text: 'I bathe, brush my teeth, eat good food and sleep well.' },
      { title: 'Everyone is special', text: 'God made everyone, so we treat all people with love.' },
    ],
    remember: 'God made me special, so I care for my body and love others.',
  },
  'sr-family': {
    intro: 'God gave us families to love and care for us.',
    steps: [
      { title: 'Family members', text: 'Father, mother, brothers, sisters, grandparents.' },
      { title: 'Showing love', text: 'We help with chores, share, obey our parents and pray together.' },
    ],
    remember: 'Love your family: help, share and obey.',
  },
  'sr-creation': {
    intro: 'God made the sky and everything in it.',
    steps: [
      { title: 'Things in the sky', text: 'God made the sun, the moon, the stars and the clouds.', visual: { kind: 'art', art: ['sun', 'moon', 'star', 'cloud'] } },
      { title: 'What they do', text: 'The sun gives light and heat by day. The moon and stars shine at night. Clouds bring rain.' },
    ],
    remember: 'God made the sun for the day and the moon and stars for the night.',
  },
  'sr-bible': {
    intro: 'The Bible is God\'s word. It guides us.',
    steps: [
      { title: 'Caring for the Bible', text: 'Keep it clean, cover it, never tear it, and keep it in a safe place.' },
      { title: 'Bible stories', text: 'Noah built the ark. Brave David defeated the giant Goliath. Samuel heard God call him at night.' },
    ],
    remember: 'The Bible is God\'s word; care for it and learn from its stories.',
  },
  'sr-jesus': {
    intro: 'Jesus was born in Bethlehem and grew up in Nazareth.',
    steps: [
      { title: 'His birth', text: 'Jesus was born to Mary in a stable in Bethlehem and laid in a manger. Angels told the shepherds.' },
      { title: 'Growing up', text: 'Jesus grew up in Nazareth with Mary and Joseph. He obeyed His parents.' },
    ],
    remember: 'Born in Bethlehem, grew up in Nazareth, obeyed His parents.',
  },
  'sr-living': {
    intro: 'God wants us to live kindly every day.',
    steps: [
      { title: 'Prayer', text: 'We talk to God when we wake up, before meals and before sleeping.' },
      { title: 'Good deeds', text: 'Share, help others, tell the truth and say thank you.' },
    ],
    remember: 'Pray every day and choose good deeds.',
  },
}
