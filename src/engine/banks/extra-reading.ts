// Still more reading, one new story or passage per level for every grade's comprehension
// and ufahamu stop. Original texts, calm and everyday: home, school, farms, markets,
// water, weather and Kenyan places. The first question of each is a warm-up one level lower.
import { passage } from '../generators/english'
import type { BankQuestion } from '../types'

// ── Grade 1 ─────────────────────────────────────────────────────────────────

const G1_EN: BankQuestion[] = [
  ...passage(1, 'My Hat', 'I have a red hat. I wear it in the sun.', [
    ['What do I have?', 'a hat', ['a bag', 'a cup']],
    ['What colour is the hat?', 'red', ['green', 'black']],
    ['When do I wear it?', 'in the sun', ['in the bath', 'in bed']],
  ]),
  ...passage(1, 'The Hen', 'The hen is in the yard. She has six chicks. They eat maize.', [
    ['Where is the hen?', 'in the yard', ['in the tree', 'in the car']],
    ['How many chicks does she have?', 'six', ['two', 'ten']],
    ['What do they eat?', 'maize', ['grass', 'fish']],
  ]),
  ...passage(2, 'Wash Your Hands', 'Amani plays in the sand. His hands are dirty. He washes them with soap. Now he can eat his lunch.', [
    ['Where does Amani play?', 'in the sand', ['in the river', 'in the kitchen']],
    ['How are his hands?', 'dirty', ['wet', 'cold']],
    ['What does he wash with?', 'soap', ['milk', 'oil']],
    ['What can he do now?', 'eat his lunch', ['go to sleep', 'ride a bike']],
  ]),
  ...passage(3, 'A New Friend', 'A new girl came to our class. Her name was Halima. She sat next to me. At break we skipped together. Now Halima is my friend.', [
    ['Who came to the class?', 'a new girl', ['a new teacher', 'a big dog']],
    ['What was her name?', 'Halima', ['Neema', 'Akinyi']],
    ['Where did she sit?', 'next to me', ['near the door', 'at the back']],
    ['What did they do at break?', 'they skipped', ['they slept', 'they read']],
  ]),
  ...passage(4, 'The Lost Goat', 'In the evening, Kip counted the goats. There were only nine. One small goat was missing. Kip and his father walked to the river. The little goat was eating grass there. Kip carried it home on his shoulders.', [
    ['When did Kip count the goats?', 'in the evening', ['in the morning', 'at lunch']],
    ['How many goats did he count?', 'nine', ['ten', 'two']],
    ['Where was the little goat?', 'at the river', ['in the house', 'at school']],
    ['How did Kip take it home?', 'on his shoulders', ['in a bucket', 'on a bike']],
  ]),
  ...passage(5, 'The Rainy Day', 'It was raining hard on Monday morning. Wanjiru put on her gumboots and her yellow raincoat. Her little brother held the umbrella. On the way, they saw a big puddle. Wanjiru wanted to jump in it, but she remembered her clean uniform. She walked around it and reached school dry.', [
    ['When was it raining hard?', 'on Monday morning', ['on Sunday evening', 'at night']],
    ['What colour was the raincoat?', 'yellow', ['blue', 'red']],
    ['Who held the umbrella?', 'her little brother', ['her mother', 'her teacher']],
    ['Why did Wanjiru not jump in the puddle?', 'she remembered her clean uniform', ['the puddle was too small', 'her brother was crying']],
  ]),
]

const G1_SW: BankQuestion[] = [
  ...passage(1, 'Mpira Wangu', 'Nina mpira mwekundu. Ninacheza na Juma.', [
    ['Nina nini?', 'mpira', ['kikombe', 'kitabu']],
    ['Mpira una rangi gani?', 'nyekundu', ['nyeupe', 'nyeusi']],
    ['Ninacheza na nani?', 'Juma', ['Mama', 'Bibi']],
  ]),
  ...passage(2, 'Paka na Maziwa', 'Paka wetu anaitwa Pili. Anapenda maziwa. Kila asubuhi Mama humpa maziwa kidogo. Pili hulala jikoni.', [
    ['Paka anaitwa nani?', 'Pili', ['Simba', 'Tumbo']],
    ['Paka anapenda nini?', 'maziwa', ['chai', 'samaki']],
    ['Nani humpa maziwa?', 'Mama', ['Baba', 'mwalimu']],
    ['Pili hulala wapi?', 'jikoni', ['shuleni', 'mtoni']],
  ]),
  ...passage(3, 'Shambani', 'Leo ni Jumamosi. Baba na Neema wako shambani. Baba analima. Neema anapanda mbegu za maharagwe. Jua ni kali, kwa hivyo wanakunywa maji.', [
    ['Leo ni siku gani?', 'Jumamosi', ['Jumatatu', 'Ijumaa']],
    ['Baba anafanya nini?', 'analima', ['anasoma', 'anapika']],
    ['Neema anapanda mbegu za nini?', 'maharagwe', ['mahindi', 'nyanya']],
    ['Kwa nini wanakunywa maji?', 'jua ni kali', ['wana njaa', 'wanalala']],
  ]),
  ...passage(4, 'Siku ya Kuzaliwa', 'Leo ni siku ya kuzaliwa ya Baraka. Ana miaka saba. Mama alioka keki kubwa. Marafiki zake wanne walikuja. Waliimba na kucheza. Baraka aliwapa wote vipande vya keki.', [
    ['Ni siku ya kuzaliwa ya nani?', 'Baraka', ['Mama', 'Juma']],
    ['Baraka ana miaka mingapi?', 'saba', ['mitano', 'kumi']],
    ['Mama alioka nini?', 'keki', ['mkate', 'chapati']],
    ['Marafiki wangapi walikuja?', 'wanne', ['wawili', 'kumi']],
  ]),
  ...passage(5, 'Kuku wa Bibi', 'Bibi ana kuku kumi. Kila asubuhi, Akinyi huwapa kuku mahindi na maji. Siku moja, Akinyi aliona mayai matano kwenye kiota. Aliyaweka kwenye kikapu kwa uangalifu. Bibi alifurahi na akasema, "Wewe ni msaidizi mzuri."', [
    ['Bibi ana kuku wangapi?', 'kumi', ['watano', 'wawili']],
    ['Akinyi huwapa kuku nini?', 'mahindi na maji', ['mkate na chai', 'nyasi na maziwa']],
    ['Akinyi aliona mayai mangapi?', 'matano', ['mawili', 'kumi']],
    ['Bibi alisema Akinyi ni msaidizi wa aina gani?', 'mzuri', ['mvivu', 'mbaya']],
  ]),
]

// ── Grade 2 ─────────────────────────────────────────────────────────────────

const G2_EN: BankQuestion[] = [
  ...passage(1, 'The Bus', 'The school bus is green. It stops at our gate at seven. We get on and sit down.', [
    ['What colour is the school bus?', 'green', ['white', 'red']],
    ['Where does it stop?', 'at our gate', ['at the shop', 'at the river']],
    ['When does it stop?', 'at seven', ['at noon', 'at night']],
  ]),
  ...passage(2, 'Sharing Mangoes', 'Mutua picked six mangoes from the tree. He gave two to his sister and two to his friend Ali. He kept the rest. They sat in the shade and ate them together.', [
    ['How many mangoes did Mutua pick?', 'six', ['four', 'ten']],
    ['How many did his sister get?', 'two', ['one', 'six']],
    ['How many did Mutua keep?', 'two', ['four', 'none']],
    ['Where did they eat the mangoes?', 'in the shade', ['in the classroom', 'on the bus']],
  ]),
  ...passage(3, 'The Library Corner', 'Our classroom has a library corner. It has a mat, two shelves and many story books. On Friday afternoon, we may choose any book. My favourite is a book about a clever hare. I read it slowly and look at every picture.', [
    ['What does the classroom have?', 'a library corner', ['a kitchen', 'a garden']],
    ['When may the pupils choose a book?', 'on Friday afternoon', ['on Monday morning', 'every night']],
    ['What is the favourite book about?', 'a clever hare', ['a big lorry', 'a lost shoe']],
    ['How does the writer read it?', 'slowly, looking at every picture', ['quickly, without the pictures', 'only on the way home']],
  ]),
  ...passage(4, 'The Water Tank', 'Our school has a big water tank. When it rains, water flows from the roof into the tank. The head teacher reminds us to close the tap after drinking. Last term, the rains were short, but our tank still had water because nobody wasted it.', [
    ['Where does the water in the tank come from?', 'from the roof when it rains', ['from a river nearby', 'from a lorry']],
    ['What does the head teacher remind the pupils to do?', 'close the tap after drinking', ['open all the taps', 'wash the roof']],
    ['What happened last term?', 'the rains were short', ['the tank broke', 'there was a flood']],
    ['Why did the tank still have water?', 'nobody wasted it', ['it rained every day', 'the tap was broken']],
  ]),
  ...passage(5, 'The Clever Crow', 'A thirsty crow found a pot with a little water at the bottom. Its beak could not reach the water. The crow did not give up. It picked small stones and dropped them into the pot, one by one. Slowly, the water rose to the top. The crow drank and flew away happily. Thinking carefully can solve many problems.', [
    ['What was wrong with the crow?', 'it was thirsty', ['it was lost', 'it was cold']],
    ['Why could the crow not drink at first?', 'its beak could not reach the water', ['the pot had no water', 'the pot was broken']],
    ['What did the crow drop into the pot?', 'small stones', ['leaves', 'seeds']],
    ['What does the story teach?', 'thinking carefully can solve problems', ['crows do not like water', 'pots should always be full']],
  ]),
]

const G2_SW: BankQuestion[] = [
  ...passage(1, 'Ng\'ombe Wetu', 'Tuna ng\'ombe mmoja. Jina lake ni Bahati. Anatupa maziwa mengi.', [
    ['Tuna ng\'ombe wangapi?', 'mmoja', ['wawili', 'watatu']],
    ['Ng\'ombe anaitwa nani?', 'Bahati', ['Pili', 'Simba']],
    ['Ng\'ombe anatupa nini?', 'maziwa', ['mayai', 'asali']],
  ]),
  ...passage(2, 'Sokoni', 'Mama na Juma walienda sokoni. Walinunua nyanya, vitunguu na sukuma wiki. Juma alibeba kikapu. Waliporudi nyumbani, Mama alipika chakula kitamu.', [
    ['Mama na Juma walienda wapi?', 'sokoni', ['shuleni', 'kanisani']],
    ['Nani alibeba kikapu?', 'Juma', ['Mama', 'muuzaji']],
    ['Walinunua nini?', 'nyanya, vitunguu na sukuma wiki', ['mkate, sukari na chai', 'mayai, maziwa na nyama']],
    ['Mama alifanya nini nyumbani?', 'alipika chakula', ['alilala', 'alifua nguo']],
  ]),
  ...passage(3, 'Mvua', 'Asubuhi anga lilikuwa na mawingu meusi. Mwalimu alisema, "Mvua itanyesha leo." Saa nne mvua kubwa ilianza. Wanafunzi walikaa darasani na kusoma hadithi. Mchana jua lilitoka tena.', [
    ['Anga lilikuwa na nini asubuhi?', 'mawingu meusi', ['jua kali', 'nyota nyingi']],
    ['Mvua ilianza saa ngapi?', 'saa nne', ['saa moja', 'saa kumi']],
    ['Wanafunzi walifanya nini darasani?', 'walisoma hadithi', ['walilala', 'walicheza mpira']],
    ['Nini kilitokea mchana?', 'jua lilitoka', ['mvua iliongezeka', 'shule ilifungwa']],
  ]),
  ...passage(4, 'Bustani ya Shule', 'Darasa letu lina bustani ndogo. Tulipanda sukuma wiki na karoti. Kila Jumatatu tunang\'oa magugu. Kila siku wanafunzi wawili hunyunyizia mimea maji. Karoti zilipokomaa, mpishi wa shule alizipika na tukala pamoja.', [
    ['Darasa lilipanda nini?', 'sukuma wiki na karoti', ['mahindi na maharagwe', 'maua na nyasi']],
    ['Wanang\'oa magugu lini?', 'kila Jumatatu', ['kila Ijumaa', 'kila mwezi']],
    ['Wanafunzi wangapi hunyunyizia mimea maji kila siku?', 'wawili', ['watano', 'kumi']],
    ['Nani alipika karoti?', 'mpishi wa shule', ['mwalimu mkuu', 'mlinzi']],
  ]),
  ...passage(5, 'Sungura na Kobe', 'Sungura alijisifu, "Mimi ndiye mwenye mbio kuliko wote!" Kobe akasema, "Tushindane." Mbio zilipoanza, sungura alikimbia mbali. Alipoona kobe yuko nyuma sana, alilala chini ya mti. Kobe aliendelea polepole bila kusimama. Sungura alipoamka, kobe alikuwa amefika mwisho. Mwenda pole hajikwai.', [
    ['Nani alijisifu?', 'sungura', ['kobe', 'simba']],
    ['Sungura alifanya nini chini ya mti?', 'alilala', ['alikula', 'aliimba']],
    ['Kobe alitembeaje?', 'polepole bila kusimama', ['kwa haraka sana', 'kwa kurukaruka']],
    ['Hadithi inatufundisha nini?', 'kuendelea bila kukata tamaa', ['kulala mchana', 'kujisifu kila siku']],
  ]),
]

// ── Grade 3 ─────────────────────────────────────────────────────────────────

const G3_EN: BankQuestion[] = [
  ...passage(1, 'Our Flag', 'The Kenyan flag has black, red, green and white. It has a shield and two spears in the middle.', [
    ['How many colours does the flag have?', 'four', ['two', 'six']],
    ['What is in the middle of the flag?', 'a shield and two spears', ['a lion and a star', 'a tree and a sun']],
    ['Which of these colours is on the flag?', 'green', ['purple', 'orange']],
  ]),
  ...passage(2, 'The Bicycle Repair', 'Nekesa\'s bicycle had a flat tyre. Her uncle is a mechanic. He took out the tube and put it in a basin of water. Bubbles came out of a small hole. He covered the hole with a patch, and the tyre was ready.', [
    ['What was wrong with the bicycle?', 'it had a flat tyre', ['it had no seat', 'its bell was lost']],
    ['What does her uncle do?', 'he is a mechanic', ['he is a teacher', 'he is a farmer']],
    ['How did he find the hole?', 'bubbles came out in water', ['he heard a whistle', 'he used a torch']],
    ['What did he put over the hole?', 'a patch', ['some paint', 'a stone']],
  ]),
  ...passage(3, 'Market Day in Karatina', 'Every Saturday, Karatina market is full of people. Farmers bring bananas, avocados, cabbages and beans. Traders call out their prices. Wambui and her aunt bought a bunch of bananas and a bag of beans. They paid with coins and notes and counted their change carefully.', [
    ['When is Karatina market full of people?', 'every Saturday', ['every Monday', 'only at night']],
    ['Who brings food to the market?', 'farmers', ['pilots', 'doctors']],
    ['What did Wambui and her aunt buy?', 'bananas and beans', ['cabbages and eggs', 'milk and bread']],
    ['What did they do with their change?', 'they counted it carefully', ['they threw it away', 'they gave it to a trader']],
  ]),
  ...passage(4, 'The Science Corner', 'Mrs Odhiambo set up a science corner. She put soil, sand and clay in three cups and poured the same amount of water into each. Water ran through the sand very fast. It ran through the loam more slowly. The clay held most of the water. "That is why clay is good for making pots," she said.', [
    ['How many cups did Mrs Odhiambo use?', 'three', ['two', 'five']],
    ['Through which soil did water run fastest?', 'sand', ['clay', 'loam']],
    ['Which soil held most of the water?', 'clay', ['sand', 'loam']],
    ['Why is clay good for making pots?', 'it holds water well', ['it is very light', 'it dries water quickly']],
  ]),
  ...passage(5, 'A Letter to Grandfather', 'Dear Grandfather, I hope you are well in Kakamega. We closed school last Friday. I came second in my class, and my teacher gave me a dictionary. I am now helping Mother to look after the calves. Next month we will visit you, and I will bring you some honey from our hives. Your loving grandson, Wafula.', [
    ['Where does Grandfather live?', 'in Kakamega', ['in Mombasa', 'in Garissa']],
    ['What position did Wafula take in class?', 'second', ['first', 'tenth']],
    ['What did the teacher give Wafula?', 'a dictionary', ['a ball', 'a bicycle']],
    ['What will Wafula bring Grandfather?', 'honey', ['milk', 'bananas']],
  ]),
]

const G3_SW: BankQuestion[] = [
  ...passage(1, 'Kikombe', 'Nina kikombe kipya. Ni cha bluu. Ninakunywa chai kwacho kila asubuhi.', [
    ['Nina nini kipya?', 'kikombe', ['kiti', 'kitabu']],
    ['Kikombe ni cha rangi gani?', 'bluu', ['nyekundu', 'njano']],
    ['Ninakunywa nini kila asubuhi?', 'chai', ['maji ya mto', 'soda']],
  ]),
  ...passage(2, 'Kisima', 'Kijiji cha Mwanza kilikuwa na shida ya maji. Wanakijiji walichimba kisima karibu na shule. Sasa watoto hawatembei mbali kuchota maji. Wana muda zaidi wa kusoma.', [
    ['Kijiji kilikuwa na shida gani?', 'shida ya maji', ['shida ya chakula', 'shida ya barabara']],
    ['Kisima kilichimbwa wapi?', 'karibu na shule', ['mjini', 'mlimani']],
    ['Sasa watoto hawafanyi nini?', 'hawatembei mbali kuchota maji', ['hawaendi shuleni', 'hawachezi kamwe']],
    ['Watoto wana muda zaidi wa kufanya nini?', 'kusoma', ['kulala', 'kuuza']],
  ]),
  ...passage(3, 'Daktari wa Wanyama', 'Ng\'ombe wa Mzee Kiprotich aliugua. Hakula nyasi na alikuwa mnyonge. Mzee Kiprotich alimwita daktari wa wanyama. Daktari alimpima na akampa dawa. Baada ya siku tatu, ng\'ombe alianza kula tena.', [
    ['Ng\'ombe wa nani aliugua?', 'Mzee Kiprotich', ['Mama Neema', 'mwalimu']],
    ['Ng\'ombe hakula nini?', 'nyasi', ['mahindi', 'mkate']],
    ['Mzee alimwita nani?', 'daktari wa wanyama', ['fundi wa magari', 'mpishi']],
    ['Ng\'ombe alianza kula baada ya siku ngapi?', 'tatu', ['moja', 'kumi']],
  ]),
  ...passage(4, 'Safari ya Mombasa', 'Wakati wa likizo, Halima alisafiri na familia yake kwenda Mombasa kwa treni. Safari ilichukua saa tano. Mombasa walitembelea Fort Jesus na kuogelea baharini. Halima aliokota makombe mazuri ufuoni. Alisema, "Nitarudi tena mwaka ujao."', [
    ['Halima alisafiri kwa nini?', 'kwa treni', ['kwa ndege', 'kwa basi']],
    ['Safari ilichukua saa ngapi?', 'tano', ['mbili', 'kumi']],
    ['Walitembelea mahali gani?', 'Fort Jesus', ['Mlima Kenya', 'Ziwa Victoria']],
    ['Halima aliokota nini ufuoni?', 'makombe', ['mawe makubwa', 'matunda']],
  ]),
  ...passage(5, 'Mti wa Mwembe', 'Babu alipanda mti wa mwembe miaka ishirini iliyopita. Sasa mti huo ni mkubwa na unatoa kivuli kizuri. Kila mwaka unazaa maembe mengi. Babu huwagawia majirani maembe. Anasema, "Tukipanda miti leo, watoto wetu watafaidika kesho."', [
    ['Babu alipanda mti lini?', 'miaka ishirini iliyopita', ['mwaka jana', 'wiki iliyopita']],
    ['Mti unatoa nini mbali na maembe?', 'kivuli kizuri', ['maziwa', 'mbao za kuuza']],
    ['Babu huwagawia nani maembe?', 'majirani', ['wanyama', 'wageni wa mjini pekee']],
    ['Babu anatufundisha nini?', 'tupande miti kwa ajili ya kesho', ['tusile matunda', 'tukate miti yote']],
  ]),
]


// ── Grades 4 to 6 ───────────────────────────────────────────────────────────

const G4_EN: BankQuestion[] = [
  ...passage(1, 'The Class Monitor', 'Akinyi is our class monitor. She keeps the register and reminds us to clean the classroom on Fridays. Everyone likes her because she is fair.', [
    ['Who is the class monitor?', 'Akinyi', ['the teacher', 'the cook']],
    ['When is the classroom cleaned?', 'on Fridays', ['on Mondays', 'every evening']],
    ['Why does everyone like Akinyi?', 'she is fair', ['she is tall', 'she is rich']],
  ]),
  ...passage(2, 'Saving Water at Home', 'In our home, we re-use water. After washing the dishes, Mother pours the water on her kitchen garden. We collect rain water from the roof in two drums. Father fixed the dripping tap last week, so not a single drop is wasted at night.', [
    ['What does Mother do with the dish water?', 'pours it on the kitchen garden', ['drinks it later', 'throws it on the road']],
    ['Where is rain water collected?', 'in two drums', ['in a pond', 'in the bathtub']],
    ['Who fixed the dripping tap?', 'Father', ['a plumber', 'Mother']],
    ['Which word in the passage means "used again"?', 're-use', ['collect', 'wasted']],
  ]),
  ...passage(3, 'The Bee Keepers', 'Kitui is a dry county, but many farmers there keep bees. They hang log hives in acacia trees, away from homes and paths. The bees collect nectar from flowers and turn it into honey. When the hives are full, the farmers harvest the honey at night, when the bees are calm. Honey from Kitui is sold in towns across Kenya.', [
    ['Where do the farmers hang the hives?', 'in acacia trees', ['inside their houses', 'on the school roof']],
    ['What do bees collect from flowers?', 'nectar', ['seeds', 'water only']],
    ['When is honey harvested?', 'at night', ['at midday', 'in the rain']],
    ['Why are hives kept away from homes and paths?', 'so that people and bees stay safe', ['so the honey stays cold', 'so that the trees grow faster']],
  ]),
  ...passage(4, 'A Visit to the Museum', 'Our Grade 4 class visited the Nairobi National Museum. A guide showed us old tools made of stone and pots made by early communities. In another hall we saw stuffed birds from all over Kenya. The guide explained that museums keep things from the past so that we can learn from them. Before leaving, each of us drew our favourite object in our notebooks.', [
    ['Which museum did the class visit?', 'the Nairobi National Museum', ['Fort Jesus Museum', 'the Kisumu Museum']],
    ['What were the old tools made of?', 'stone', ['plastic', 'glass']],
    ['Why do we have museums, according to the guide?', 'to keep things from the past so we can learn', ['to sell old pots to visitors', 'to keep birds alive']],
    ['What did the pupils do before leaving?', 'drew their favourite object', ['bought a gift', 'wrote an exam']],
  ]),
  ...passage(5, 'The Footbridge', 'Every rainy season, River Chania flooded, and children from Kanyoni village could not reach school. The villagers met under the big fig tree to find a solution. Some offered timber, others offered their labour, and a local fundi agreed to lead the work. Within two months, a strong footbridge stood across the river. Now the children cross safely in every season, and the village celebrates the day it was opened as "Bridge Day".', [
    ['What happened to River Chania every rainy season?', 'it flooded', ['it dried up', 'it froze']],
    ['Where did the villagers meet?', 'under the big fig tree', ['in the church hall', 'at the chief\'s office']],
    ['Who led the building work?', 'a local fundi', ['the head teacher', 'a county officer']],
    ['Which value does the passage mainly show?', 'cooperation', ['competition', 'greed']],
  ]),
]

const G5_EN: BankQuestion[] = [
  ...passage(1, 'Morning Duties', 'Before school, Baraka feeds the rabbits and sweeps the compound. His sister milks the cow. Their mother prepares tea and sweet potatoes for breakfast.', [
    ['What does Baraka feed?', 'the rabbits', ['the cow', 'the chickens']],
    ['Who milks the cow?', 'his sister', ['his mother', 'Baraka']],
    ['What do they eat for breakfast?', 'sweet potatoes', ['rice', 'chapati']],
  ]),
  ...passage(2, 'Solar Lamps', 'Many homes in rural Kenya now use small solar lamps. During the day, a panel on the roof charges a battery with energy from the sun. At night, the battery lights the lamp. Families no longer need to buy as much paraffin, and the air inside the house is cleaner because there is no smoke.', [
    ['What charges the battery?', 'a solar panel on the roof', ['a paraffin lamp', 'a car engine']],
    ['When is the lamp used?', 'at night', ['at noon', 'only on Sundays']],
    ['What do families buy less of?', 'paraffin', ['food', 'water']],
    ['Why is the air in the house cleaner?', 'there is no smoke', ['the windows stay closed', 'the lamp cools the room']],
  ]),
  ...passage(3, 'Lake Turkana', 'Lake Turkana, in northern Kenya, is the largest desert lake in the world. Its water is slightly salty, and its colour sometimes looks green, so it is called the Jade Sea. Fishermen catch tilapia and Nile perch there. Near the lake, scientists have found very old fossils that help us understand how early people lived.', [
    ['Where is Lake Turkana?', 'in northern Kenya', ['in western Kenya', 'on the coast']],
    ['Why is it called the Jade Sea?', 'its water sometimes looks green', ['it is full of jewels', 'it is very deep']],
    ['Which fish are caught there?', 'tilapia and Nile perch', ['sardines and tuna', 'trout and salmon']],
    ['What have scientists found near the lake?', 'very old fossils', ['gold mines', 'a new city']],
  ]),
  ...passage(4, 'The Debate', 'Our school held a debate on the motion "Homework should be banned". Chebet spoke for the motion. She said children need time to rest and play. Kamau spoke against it. He argued that homework helps pupils practise what they learn in class. The judges said both speakers were clear and polite, but Kamau won because he gave more examples to support his points.', [
    ['What was the motion of the debate?', 'homework should be banned', ['school should start later', 'pupils should wear shoes']],
    ['What did Chebet say children need?', 'time to rest and play', ['more lessons', 'longer holidays only']],
    ['Why did Kamau win?', 'he gave more examples', ['he spoke more loudly', 'he was the youngest']],
    ['What does "against the motion" mean here?', 'disagreeing with the motion', ['agreeing with the motion', 'judging the debate']],
  ]),
  ...passage(5, 'Mama Mboga\'s Records', 'Mama Mboga sells vegetables at Gikomba market. For years she did not know whether her business made money. Then her daughter, a Grade 5 pupil, showed her how to keep records. Every evening they wrote down what she had bought, what she had sold and what remained. After a month, they discovered that tomatoes earned the most profit, while cabbages often rotted before they were sold. Mama Mboga now buys fewer cabbages and more tomatoes, and her profit has grown.', [
    ['Where does Mama Mboga sell vegetables?', 'at Gikomba market', ['at a supermarket', 'at her school']],
    ['Who taught her to keep records?', 'her daughter', ['her neighbour', 'a bank officer']],
    ['What problem did cabbages have?', 'they often rotted before being sold', ['they were too cheap to buy', 'nobody grew them']],
    ['What is the main lesson of the passage?', 'keeping records helps a business decide well', ['cabbages are better than tomatoes', 'markets should close early']],
  ]),
]

const G6_EN: BankQuestion[] = [
  ...passage(1, 'The Prefect Elections', 'Our school elects prefects every year. Candidates give short speeches, and every pupil votes in secret. The votes are counted in front of the teachers and the candidates.', [
    ['How often are prefects elected?', 'every year', ['every week', 'every five years']],
    ['How do pupils vote?', 'in secret', ['by shouting', 'by raising hands']],
    ['Where are the votes counted?', 'in front of the teachers and candidates', ['at the pupils\' homes', 'in a locked room alone']],
  ]),
  ...passage(2, 'Mangroves of Lamu', 'Along the coast near Lamu grow thick mangrove forests. Their roots stand in salty water, and some roots stick up out of the mud to take in air. Mangroves protect the shore from strong waves and give young fish a safe place to grow. In the past, many mangroves were cut for building poles, but communities now replant them every year.', [
    ['Where do the mangroves in the passage grow?', 'along the coast near Lamu', ['on Mount Kenya', 'beside Lake Naivasha']],
    ['Why do some roots stick out of the mud?', 'to take in air', ['to catch fish', 'to hold rain water']],
    ['How do mangroves help young fish?', 'they give them a safe place to grow', ['they feed them salt', 'they keep the water warm']],
    ['What do communities do now?', 'replant mangroves every year', ['cut more poles', 'fill the mud with sand']],
  ]),
  ...passage(3, 'The First Computer Lesson', 'When the new computer lab opened, Mr Kiprop began with a simple rule: "Clean hands, quiet voices, and save your work often." He showed the class how to switch on a computer, open a word processor and type a short paragraph. Kendi typed slowly at first, but by the end of the lesson she could type her name, her school and a sentence about her favourite animal. She saved the file in a folder called "Grade 6".', [
    ['What was Mr Kiprop\'s rule about saving?', 'save your work often', ['never save your work', 'save only on Fridays']],
    ['Which program did the class open?', 'a word processor', ['a game', 'a calculator']],
    ['How did Kendi type at first?', 'slowly', ['very fast', 'with her eyes closed']],
    ['What was the folder called?', 'Grade 6', ['My Animals', 'New Lab']],
  ]),
  ...passage(4, 'The Long Rains', 'In most of Kenya, the long rains fall from March to May and the short rains from October to December. Farmers prepare their land before the rains begin, so that seeds can be planted as soon as the soil is wet. When the rains come late or are too little, crops wither and pasture dries. For this reason, the Kenya Meteorological Department gives forecasts on radio and television, and farmers are encouraged to plant drought-resistant crops such as sorghum and green grams.', [
    ['When do the long rains usually fall?', 'from March to May', ['from June to August', 'from October to December']],
    ['Why do farmers prepare land before the rains?', 'so seeds can be planted once the soil is wet', ['so the rain will fall faster', 'so that weeds grow well']],
    ['Who gives weather forecasts on radio and television?', 'the Kenya Meteorological Department', ['the Kenya Wildlife Service', 'the county assembly']],
    ['Which crops are named as drought-resistant?', 'sorghum and green grams', ['rice and sugarcane', 'tea and coffee']],
  ]),
  ...passage(5, 'Wangari\'s Seedlings', 'In 1977, Wangari Maathai started the Green Belt Movement. She noticed that rivers were drying up and women were walking further to find firewood. She encouraged women to grow tree seedlings and plant them on farms, in schools and along roads. They were paid a small amount for every seedling that survived. Over the years, millions of trees were planted. In 2004, Wangari Maathai became the first African woman to receive the Nobel Peace Prize, for linking care of the environment with peace and fairness.', [
    ['What did Wangari Maathai start in 1977?', 'the Green Belt Movement', ['the Kenya Music Festival', 'a national park']],
    ['What problems did she notice?', 'drying rivers and scarce firewood', ['too many schools and roads', 'heavy floods every week']],
    ['When were the women paid?', 'for every seedling that survived', ['for every tree they cut', 'for every road they built']],
    ['Why did she receive the Nobel Peace Prize?', 'for linking care of the environment with peace', ['for winning a marathon', 'for writing a famous song']],
  ]),
]

const G4_SW: BankQuestion[] = [
  ...passage(1, 'Mlinzi wa Shule', 'Mzee Juma ni mlinzi wa shule yetu. Hufungua lango asubuhi na kulifunga jioni. Wanafunzi wote wanamheshimu.', [
    ['Mzee Juma ni nani?', 'mlinzi wa shule', ['mwalimu mkuu', 'mpishi']],
    ['Hulifunga lango lini?', 'jioni', ['asubuhi', 'mchana']],
    ['Wanafunzi wanamfanyia nini?', 'wanamheshimu', ['wanamcheka', 'wanamwogopa']],
  ]),
  ...passage(2, 'Maktaba Mpya', 'Shule yetu ilipata maktaba mpya mwezi uliopita. Ina rafu nyingi, viti na meza. Kila mwanafunzi anaruhusiwa kuazima vitabu viwili kwa wiki. Mkutubi hutukumbusha kurudisha vitabu vikiwa safi.', [
    ['Shule ilipata maktaba lini?', 'mwezi uliopita', ['mwaka jana', 'jana']],
    ['Mwanafunzi anaruhusiwa kuazima vitabu vingapi kwa wiki?', 'viwili', ['vitano', 'kimoja']],
    ['Nani hutukumbusha kurudisha vitabu?', 'mkutubi', ['mlinzi', 'mpishi']],
    ['Vitabu vinapaswa kurudishwa vikiwa vipi?', 'safi', ['vimechanika', 'vimelowa']],
  ]),
  ...passage(3, 'Ziwa Nakuru', 'Ziwa Nakuru linajulikana kwa ndege aina ya heroe. Heroe ni ndege wenye rangi ya waridi na miguu mirefu. Hula viumbe vidogo vilivyo ndani ya maji. Watalii kutoka nchi nyingi hutembelea ziwa hili kuwaona heroe pamoja na vifaru na twiga.', [
    ['Ziwa Nakuru linajulikana kwa nini?', 'ndege aina ya heroe', ['samaki wakubwa', 'mlima mrefu']],
    ['Heroe wana rangi gani?', 'waridi', ['kijani', 'nyeusi']],
    ['Heroe hula nini?', 'viumbe vidogo majini', ['nyasi kavu', 'matunda ya miti']],
    ['Watalii huona wanyama gani wengine?', 'vifaru na twiga', ['simba wa baharini', 'nyangumi']],
  ]),
  ...passage(4, 'Mashindano ya Uandishi', 'Shule ya Msingi ya Tumaini iliandaa mashindano ya uandishi wa insha. Mada ilikuwa "Kijiji Changu". Wanafunzi thelathini walishiriki. Zawadi aliandika kuhusu soko la kijiji na jinsi watu wanavyoshirikiana. Insha yake ilikuwa na mpangilio mzuri na hati safi. Alipata nafasi ya kwanza na akazawadiwa kamusi.', [
    ['Mada ya insha ilikuwa ipi?', 'Kijiji Changu', ['Siku ya Mvua', 'Rafiki Yangu']],
    ['Wanafunzi wangapi walishiriki?', 'thelathini', ['kumi', 'mia moja']],
    ['Zawadi aliandika kuhusu nini?', 'soko la kijiji', ['mlima wa kijiji', 'shule ya mjini']],
    ['Zawadi alizawadiwa nini?', 'kamusi', ['baiskeli', 'mpira']],
  ]),
  ...passage(5, 'Uchafuzi wa Mto', 'Mto Ngong ulikuwa safi zamani, na wakazi waliutumia kunywesha mifugo. Siku hizi, takataka za plastiki na maji machafu kutoka viwandani humwagwa ndani yake. Samaki wamepungua na maji yana harufu mbaya. Vijana wa eneo hilo wameanzisha kikundi cha kusafisha mto kila Jumamosi. Wanawahimiza wakazi kutupa taka mahali panapofaa. Ikiwa kila mtu atashiriki, mto utarudi kuwa safi.', [
    ['Mto Ngong ulitumiwa kufanya nini zamani?', 'kunywesha mifugo', ['kuogesha magari', 'kuzalisha umeme']],
    ['Ni nini kimesababisha uchafuzi wa mto?', 'takataka za plastiki na maji machafu', ['mvua nyingi na upepo', 'samaki wengi na miti']],
    ['Vijana husafisha mto lini?', 'kila Jumamosi', ['kila siku asubuhi', 'mara moja kwa mwaka']],
    ['Kifungu kinasisitiza nini?', 'kila mtu ashiriki kutunza mazingira', ['mto usitumiwe kamwe', 'viwanda vingi vijengwe']],
  ]),
]

const G5_SW: BankQuestion[] = [
  ...passage(1, 'Nyuki', 'Nyuki hutengeneza asali. Huishi kwenye mzinga. Ukiwakaribia ovyo wanaweza kukuuma, kwa hivyo tuwe waangalifu.', [
    ['Nyuki hutengeneza nini?', 'asali', ['maziwa', 'mafuta']],
    ['Nyuki huishi wapi?', 'kwenye mzinga', ['kwenye kiota', 'kwenye zizi']],
    ['Kwa nini tuwe waangalifu?', 'wanaweza kuuma', ['wanaweza kuimba', 'wanaweza kulala']],
  ]),
  ...passage(2, 'Daktari Ali', 'Daktari Ali hufanya kazi katika zahanati ya kijiji. Kila Jumanne huwapima watoto uzito na kuwapa chanjo. Huwafundisha akina mama umuhimu wa lishe bora na usafi. Wakazi wanampenda kwa sababu ni mpole na mwenye bidii.', [
    ['Daktari Ali hufanya kazi wapi?', 'katika zahanati ya kijiji', ['katika shule ya upili', 'katika kiwanda']],
    ['Huwapa watoto chanjo lini?', 'kila Jumanne', ['kila Jumamosi', 'kila mwezi']],
    ['Huwafundisha akina mama kuhusu nini?', 'lishe bora na usafi', ['ujenzi wa nyumba', 'uuzaji wa samaki']],
    ['Kwa nini wakazi wanampenda?', 'ni mpole na mwenye bidii', ['ni tajiri sana', 'ni mrefu kuliko wote']],
  ]),
  ...passage(3, 'Ngoma za Kitamaduni', 'Katika tamasha la utamaduni la kaunti, jamii mbalimbali zilionyesha ngoma zao. Wamaasai waliruka juu sana katika ngoma ya adumu. Wamijikenda walicheza chakacha kwa madaha. Waluhya walipiga isukuti kwa nguvu. Watazamaji walifurahi na kujifunza kwamba kila jamii ina utajiri wake.', [
    ['Wamaasai walicheza ngoma gani?', 'adumu', ['chakacha', 'isukuti']],
    ['Nani walicheza chakacha?', 'Wamijikenda', ['Waluhya', 'Wamaasai']],
    ['Waluhya walipiga nini?', 'isukuti', ['nyatiti', 'kayamba']],
    ['Watazamaji walijifunza nini?', 'kila jamii ina utajiri wake', ['ngoma zote ni sawa', 'tamasha si muhimu']],
  ]),
  ...passage(4, 'Kilimo cha Umwagiliaji', 'Eneo la Mwea lina mashamba makubwa ya mpunga. Mvua katika eneo hilo haitoshi, kwa hivyo wakulima hutumia maji kutoka mto Thiba kunyunyizia mashamba yao. Maji hupitishwa kwenye mifereji hadi mashambani. Mchele kutoka Mwea huuzwa katika maduka mengi nchini. Kilimo hiki kimewapa vijana wengi ajira.', [
    ['Eneo la Mwea lina mashamba ya nini?', 'mpunga', ['chai', 'kahawa']],
    ['Wakulima hupata maji kutoka wapi?', 'mto Thiba', ['bahari', 'mvua pekee']],
    ['Maji hufika mashambani kupitia nini?', 'mifereji', ['mabomba ya gesi', 'magari ya moshi']],
    ['Kilimo hiki kimewasaidiaje vijana?', 'kimewapa ajira', ['kimewafukuza', 'kimewachosha']],
  ]),
  ...passage(5, 'Barua kwa Rafiki', 'Mpendwa Rehema, natumaini u buheri wa afya. Hapa Kisumu sote tu salama. Wiki iliyopita tulitembelea Ziwa Victoria. Tuliona wavuvi wakirudi na mitumbwi iliyojaa samaki aina ya sato. Nilijifunza kwamba ziwa hili ni kubwa kuliko yote barani Afrika. Ninakuomba uje kunitembelea wakati wa likizo ya Desemba ili tuogelee pamoja. Wako akupendaye, Atieno.', [
    ['Barua hii iliandikwa na nani?', 'Atieno', ['Rehema', 'mvuvi']],
    ['Wavuvi walirudi na samaki aina gani?', 'sato', ['papa', 'nguru']],
    ['Atieno alijifunza nini kuhusu Ziwa Victoria?', 'ni kubwa kuliko yote barani Afrika', ['lina maji ya chumvi', 'liko Mombasa']],
    ['Atieno anamwomba Rehema afanye nini?', 'aje kumtembelea Desemba', ['amtumie samaki', 'amwandikie insha']],
  ]),
]

const G6_SW: BankQuestion[] = [
  ...passage(1, 'Siku ya Mashujaa', 'Tarehe ishirini Oktoba ni Siku ya Mashujaa. Tunawakumbuka watu waliopigania uhuru na wanaojenga taifa letu.', [
    ['Siku ya Mashujaa ni tarehe gani?', 'ishirini Oktoba', ['kumi na mbili Desemba', 'mosi Juni']],
    ['Siku hii tunawakumbuka akina nani?', 'waliopigania uhuru', ['wachezaji wa mpira pekee', 'watalii']],
    ['Mashujaa pia ni wale wanaofanya nini?', 'wanaojenga taifa', ['wanaovunja sheria', 'wanaokaa bure']],
  ]),
  ...passage(2, 'Simu ya Mkononi', 'Simu za mkononi zimebadilisha maisha ya watu vijijini. Wakulima hupata habari kuhusu bei za mazao sokoni. Watu hutuma na kupokea pesa bila kusafiri mbali. Hata hivyo, ni muhimu kutumia simu kwa uangalifu na kutoshiriki nambari ya siri na mtu yeyote.', [
    ['Wakulima hupata habari kuhusu nini?', 'bei za mazao sokoni', ['hali ya bahari', 'michezo ya kandanda']],
    ['Watu hutuma pesa vipi?', 'bila kusafiri mbali', ['kwa kubeba mifukoni hadi mjini', 'kupitia barua']],
    ['Ni nini hatupaswi kushiriki?', 'nambari ya siri', ['habari njema', 'salamu']],
    ['Neno "vijijini" lina maana gani?', 'mashambani mbali na miji', ['katikati ya jiji', 'baharini']],
  ]),
  ...passage(3, 'Mlima Kenya', 'Mlima Kenya ndio mlima mrefu zaidi nchini Kenya. Kilele chake kina theluji ingawa kiko karibu na ikweta. Mito mingi kama Tana na Ewaso Ng\'iro huanzia mlimani. Misitu yake huhifadhi maji na ni makao ya wanyama wengi. Kwa sababu hiyo, ni muhimu kuitunza misitu hiyo.', [
    ['Kwa mujibu wa kifungu, Mlima Kenya ukoje kwa urefu nchini?', 'ndio mrefu zaidi', ['ndio mfupi zaidi', 'ni wa tatu kwa urefu']],
    ['Kilele cha mlima kina nini?', 'theluji', ['jangwa', 'ziwa la chumvi']],
    ['Mito ipi imetajwa kuanzia mlimani?', 'Tana na Ewaso Ng\'iro', ['Nzoia na Yala', 'Nile na Kongo']],
    ['Kwa nini misitu ya mlima itunzwe?', 'huhifadhi maji na ni makao ya wanyama', ['huzalisha mafuta ya petroli', 'huleta watu wengi mjini']],
  ]),
  ...passage(4, 'Kongamano la Wanafunzi', 'Wanafunzi wa Gredi ya Sita kutoka shule tano walikutana katika kongamano kuhusu haki za watoto. Mwezeshaji aliwaeleza kwamba kila mtoto ana haki ya elimu, afya, kulindwa na kusikilizwa. Wanafunzi walijadili namna ya kuwasaidia wenzao wanaoacha shule. Mwishowe waliandika mapendekezo na kuyapeleka kwa afisa wa elimu wa kaunti.', [
    ['Kongamano lilihusu nini?', 'haki za watoto', ['michezo ya shule', 'ujenzi wa barabara']],
    ['Shule ngapi zilihudhuria?', 'tano', ['tatu', 'kumi']],
    ['Wanafunzi walijadili kuwasaidia akina nani?', 'wenzao wanaoacha shule', ['walimu wapya', 'wazazi wao']],
    ['Mapendekezo yalipelekwa kwa nani?', 'afisa wa elimu wa kaunti', ['mkuu wa polisi', 'mwenyekiti wa soko']],
  ]),
  ...passage(5, 'Ufugaji wa Samaki', 'Bi. Wanjiku alichimba bwawa dogo shambani mwake na kuweka vifaranga wa samaki aina ya sato. Kila siku aliwalisha chakula maalum na kuhakikisha maji ni safi. Baada ya miezi sita, samaki walikuwa wakubwa na tayari kuuzwa. Alipata faida nzuri na sasa huwafundisha majirani jinsi ya kufuga samaki. Ufugaji huu umeongeza lishe bora kijijini na kupunguza utegemezi wa samaki wa ziwani.', [
    ['Bi. Wanjiku alichimba nini?', 'bwawa dogo', ['kisima kirefu', 'mfereji wa barabara']],
    ['Alifuga samaki aina gani?', 'sato', ['papa', 'kambare wa baharini']],
    ['Samaki walikuwa tayari baada ya muda gani?', 'miezi sita', ['wiki moja', 'miaka mitano']],
    ['Ufugaji huu umeleta faida gani kijijini?', 'lishe bora na kupungua kwa utegemezi', ['mafuriko na magonjwa', 'msongamano wa magari']],
  ]),
]


// ── Grades 7 to 9 ───────────────────────────────────────────────────────────

const G7_EN: BankQuestion[] = [
  ...passage(1, 'Joining a Club', 'In Grade 7, every learner joins at least one club. Zuri chose the Wildlife Club because she wants to become a ranger. The club meets on Wednesday afternoons.', [
    ['Which club did Zuri choose?', 'the Wildlife Club', ['the Drama Club', 'the Chess Club']],
    ['Why did she choose it?', 'she wants to become a ranger', ['her friends were there', 'it meets in the morning']],
    ['When does the club meet?', 'on Wednesday afternoons', ['on Monday mornings', 'every evening']],
  ]),
  ...passage(2, 'Pathways', 'At the end of junior school, learners move to senior school and choose a pathway: STEM, Social Sciences, or Arts and Sports Science. The choice should be based on a learner\'s interests, strengths and the careers that attract them. Teachers and parents can advise, but the learner\'s own talents matter most. Choosing a pathway is not a final decision about life; it is a first step.', [
    ['How many pathways are named in the passage?', 'three', ['two', 'five']],
    ['What should the choice of pathway be based on?', 'interests, strengths and careers of interest', ['what most friends choose', 'which school is nearest']],
    ['According to the passage, what matters most?', 'the learner\'s own talents', ['the parents\' jobs', 'the cost of uniforms']],
    ['What does the writer mean by "it is a first step"?', 'the choice can grow and change later', ['the choice can never be changed', 'learners must decide on the first day']],
  ]),
  ...passage(3, 'Fort Jesus', 'Fort Jesus stands on the edge of Mombasa island, facing the Indian Ocean. The Portuguese built it between 1593 and 1596 to protect their trade route. Over the next two centuries it changed hands many times between the Portuguese and the Omani Arabs. Today it is a museum and a World Heritage Site, visited by thousands of learners who walk its thick coral walls and imagine the ships that once sailed past.', [
    ['Who built Fort Jesus?', 'the Portuguese', ['the British', 'the Omani Arabs']],
    ['Why was the fort built?', 'to protect a trade route', ['to be a school', 'to store maize']],
    ['What are the walls made of?', 'coral', ['iron', 'mud and grass']],
    ['What is Fort Jesus today?', 'a museum and World Heritage Site', ['a military base', 'a harbour for ships']],
  ]),
  ...passage(4, 'The Science Fair Project', 'For the county science fair, Imani and Tom investigated whether mulch helps soil keep water. They filled two trays with the same soil and watered them equally. One tray was covered with dry grass; the other was left bare. Every evening for a week they weighed both trays. The bare tray lost water much faster. Their conclusion was that mulching reduces evaporation, which is useful for farmers in dry areas. The judges praised them for keeping everything the same except the mulch.', [
    ['What did Imani and Tom investigate?', 'whether mulch helps soil keep water', ['which soil is the heaviest', 'how fast grass grows']],
    ['How did they measure water loss?', 'by weighing the trays', ['by tasting the soil', 'by counting the plants']],
    ['Which tray lost water faster?', 'the bare tray', ['the tray with mulch', 'both lost the same']],
    ['Why did the judges praise them?', 'they changed only one factor', ['they used expensive equipment', 'their trays were the biggest']],
  ]),
  ...passage(5, 'A Different Kind of Hero', 'When people hear the word "hero", they often think of soldiers or famous athletes. Yet some heroes work quietly. Mama Esther has run a feeding programme in her neighbourhood for fifteen years. Every school day she cooks porridge for children who would otherwise come to class hungry. She has never appeared on television, and she does not ask for thanks. Teachers say attendance and concentration have improved since she began. Her story reminds us that heroism is measured by service, not by fame.', [
    ['What do people often think of when they hear "hero"?', 'soldiers or famous athletes', ['teachers and cooks', 'farmers and traders']],
    ['What does Mama Esther cook?', 'porridge', ['ugali and beans', 'chapati and tea']],
    ['What has improved since she began?', 'attendance and concentration', ['the size of the school', 'the price of food']],
    ['What is the main idea of the passage?', 'heroism is measured by service, not fame', ['heroes must appear on television', 'cooking is the best career']],
  ]),
]

const G8_EN: BankQuestion[] = [
  ...passage(1, 'The Matatu Stage', 'The matatu stage is busy at seven in the morning. Touts call out destinations while passengers queue. A traffic marshal checks that no vehicle carries more people than its seats allow.', [
    ['When is the stage busy?', 'at seven in the morning', ['at midnight', 'at noon']],
    ['What do the touts call out?', 'destinations', ['prices of food', 'news headlines']],
    ['What does the marshal check?', 'that vehicles are not overloaded', ['that drivers are hungry', 'that passengers have bags']],
  ]),
  ...passage(2, 'Digital Footprints', 'Every photo we post, comment we write and site we visit leaves a trace online, called a digital footprint. Unlike footprints in sand, these traces are not washed away by the tide. Employers and colleges sometimes look at what applicants have posted. Before sharing anything, it is wise to ask: Would I be comfortable if my teacher, my parent or a future employer saw this?', [
    ['What is a digital footprint?', 'the trace left by what we do online', ['a picture of our feet', 'a type of password']],
    ['How are digital footprints different from footprints in sand?', 'they are not easily washed away', ['they are always invisible', 'they disappear overnight']],
    ['Who sometimes looks at applicants\' posts?', 'employers and colleges', ['only close friends', 'nobody at all']],
    ['What is the writer\'s advice?', 'think before you share', ['never use the internet', 'post as much as possible']],
  ]),
  ...passage(3, 'The Locust Swarm', 'In early 2020, desert locusts swept into northern Kenya in the largest swarms seen for seventy years. A single swarm could cover an area larger than a town and eat as much food in a day as thousands of people. The government, together with international partners, sprayed swarms from aircraft and trained young people to track them on the ground using phones. Farmers who reported sightings quickly helped teams reach swarms before they laid eggs.', [
    ['When did the swarms arrive?', 'in early 2020', ['in 1950', 'in late 2010']],
    ['How large could a single swarm be?', 'larger than a town', ['as small as a classroom', 'the size of a single farm']],
    ['How were young people involved?', 'they tracked swarms using phones', ['they caught locusts by hand', 'they built new roads']],
    ['Why was quick reporting important?', 'teams could reach swarms before they laid eggs', ['locusts like to be photographed', 'farmers were paid per locust']],
  ]),
  ...passage(4, 'The Water Kiosk', 'In Kibera, a youth group runs a water kiosk. Residents buy clean water by the jerrycan at a fair price, and the money pays for repairs and the young attendants\' wages. Before the kiosk opened, families bought water from vendors whose sources were uncertain, and cases of typhoid were common. Since then, clinic records show fewer waterborne diseases. The group has now added a toilet block, charging a small fee to keep it clean. Their motto is "Clean water, clean community".', [
    ['Who runs the water kiosk?', 'a youth group', ['the county government', 'a large company']],
    ['What does the money from the kiosk pay for?', 'repairs and wages', ['school fees', 'new cars']],
    ['What evidence shows that health improved?', 'clinic records of fewer waterborne diseases', ['more people visited the kiosk', 'the motto became popular']],
    ['Why is a small fee charged for the toilet block?', 'to keep it clean', ['to make a large profit', 'to keep children away']],
  ]),
  ...passage(5, 'The Old Man and the Baobab', 'Every evening, old Mzee Kazungu sat under the baobab at the edge of the village and told stories. The young people, busy with their phones, rarely stopped. One evening the power failed across the village. With nothing to scroll, a few teenagers drifted to the baobab. Mzee Kazungu told them how the village was founded, why the river is called "the patient one", and how their grandmothers survived the great drought. When the lights returned, nobody moved. The next evening, the crowd under the baobab was even larger.', [
    ['Where did Mzee Kazungu tell stories?', 'under the baobab', ['in the market', 'at the river']],
    ['Why did the teenagers first come to listen?', 'the power had failed', ['their teacher sent them', 'there was a festival']],
    ['What does "nobody moved" suggest?', 'the listeners were deeply interested', ['the listeners were asleep', 'the listeners were afraid']],
    ['What is the main theme of the story?', 'the value of oral tradition', ['the danger of baobab trees', 'how electricity is made']],
  ]),
]

const G9_EN: BankQuestion[] = [
  ...passage(1, 'The Notice', 'NOTICE: All Grade 9 learners will sit a mock assessment from Monday to Thursday next week. Bring two pens, a ruler and a calculator. Phones are not allowed in the hall.', [
    ['Who is the notice for?', 'Grade 9 learners', ['parents only', 'Grade 7 learners']],
    ['How many days will the assessment take?', 'four', ['two', 'five']],
    ['What is not allowed in the hall?', 'phones', ['calculators', 'rulers']],
  ]),
  ...passage(2, 'Green Energy', 'Kenya produces most of its electricity from renewable sources. Geothermal plants at Olkaria use steam from deep underground, hydroelectric dams on the Tana River use flowing water, and wind farms such as Lake Turkana use strong winds. Renewable energy reduces the burning of fuels that pollute the air. However, it depends on nature: in a long drought, the dams hold less water and produce less power.', [
    ['Where are the geothermal plants named in the passage?', 'at Olkaria', ['on the Tana River', 'at Lake Victoria']],
    ['What do hydroelectric dams use?', 'flowing water', ['steam', 'wind']],
    ['Why is renewable energy good for the air?', 'it reduces the burning of polluting fuels', ['it makes the weather cooler', 'it adds oxygen to the air']],
    ['What weakness of renewable energy does the passage mention?', 'it depends on nature, such as rainfall', ['it is never used in Kenya', 'it makes too much noise']],
  ]),
  ...passage(3, 'The Interview', 'Njoroge arrived for his apprenticeship interview fifteen minutes early. He had researched the garage, practised answers with his uncle and ironed his only shirt. When the manager asked why he wanted the job, he did not say "I need money". Instead, he described how he had repaired his neighbour\'s bicycle and wanted to learn engines properly. He was honest that he had never used a diagnostic machine. The manager later said that his honesty and preparation, not his experience, won him the place.', [
    ['When did Njoroge arrive?', 'fifteen minutes early', ['an hour late', 'exactly on time']],
    ['How had he prepared?', 'he researched the garage and practised answers', ['he bought a new car', 'he asked the manager for the questions']],
    ['What did he admit honestly?', 'he had never used a diagnostic machine', ['he did not like engines', 'he had broken a bicycle']],
    ['What won him the place?', 'his honesty and preparation', ['his long experience', 'his expensive shirt']],
  ]),
  ...passage(4, 'Plastic and the Ocean', 'Each year, millions of tonnes of plastic reach the world\'s oceans. Sunlight and waves break it into tiny pieces called microplastics, which fish and turtles mistake for food. In 2017, Kenya banned plastic carrier bags, and in 2020 single-use plastics were banned in protected areas such as national parks and beaches. Critics said the bans hurt small traders, but supporters point to cleaner towns and fewer livestock deaths from swallowed bags. The debate shows that protecting the environment often requires balancing costs and benefits.', [
    ['What are microplastics?', 'tiny pieces of broken-down plastic', ['plastics made for microscopes', 'a kind of sea animal']],
    ['When did Kenya ban plastic carrier bags?', 'in 2017', ['in 2010', 'in 2023']],
    ['What did critics say about the bans?', 'they hurt small traders', ['they made beaches dirtier', 'they were never enforced']],
    ['What does the final sentence suggest?', 'environmental decisions involve trade-offs', ['all bans are mistakes', 'the ocean cannot be saved']],
  ]),
  ...passage(5, 'The Bridge Builder', 'There is an old tale of a traveller who crossed a deep gorge by a narrow path. On the far side, instead of continuing his journey, he began to build a bridge. A passer-by laughed: "Why build a bridge you will never use again?" The traveller replied, "A young person is coming behind me. The gorge that was easy for me may be dangerous for her." The tale is often told to remind leaders that their work should serve those who come after them, not only themselves.', [
    ['What did the traveller begin to build?', 'a bridge', ['a house', 'a boat']],
    ['Why did the passer-by laugh?', 'the traveller would not use the bridge again', ['the bridge was too long', 'the traveller was lost']],
    ['Who did the traveller think of?', 'a young person coming behind him', ['his own family at home', 'the passer-by']],
    ['What lesson does the tale give leaders?', 'serve those who come after you', ['build bridges only for yourself', 'never cross deep gorges']],
  ]),
]

const G7_SW: BankQuestion[] = [
  ...passage(1, 'Klabu ya Mazingira', 'Klabu ya mazingira hupanda miti kila mwezi. Mwaka huu imepanda miche mia mbili kuzunguka uwanja wa shule.', [
    ['Klabu hupanda miti lini?', 'kila mwezi', ['kila siku', 'kila mwaka']],
    ['Mwaka huu imepanda miche mingapi?', 'mia mbili', ['mia moja', 'elfu moja']],
    ['Miche ilipandwa wapi?', 'kuzunguka uwanja wa shule', ['sokoni', 'kando ya bahari']],
  ]),
  ...passage(2, 'Lamu', 'Mji wa Lamu ni mojawapo ya miji ya zamani zaidi Afrika Mashariki. Mitaa yake ni myembamba, na watu husafiri kwa miguu au kwa punda kwa kuwa magari ni machache. Nyumba zake za mawe ya matumbawe zina milango ya mbao iliyonakshiwa kwa ustadi. Kila mwaka hufanyika tamasha la utamaduni linalovutia watalii wengi.', [
    ['Mitaa ya Lamu ikoje?', 'myembamba', ['mipana sana', 'yenye magari mengi']],
    ['Watu husafiri vipi mjini Lamu?', 'kwa miguu au kwa punda', ['kwa treni', 'kwa ndege']],
    ['Nyumba za Lamu zimejengwa kwa nini?', 'mawe ya matumbawe', ['chuma na kioo', 'nyasi na matope']],
    ['Neno "iliyonakshiwa" lina maana gani katika kifungu?', 'iliyopambwa kwa michoro', ['iliyovunjika', 'iliyopakwa matope']],
  ]),
  ...passage(3, 'Mchezaji Chipukizi', 'Faith alianza kukimbia akiwa na miaka kumi, akikimbia kwenda shuleni na kurudi nyumbani kila siku. Kocha wa kaunti alimwona katika mashindano ya shule na kumkaribisha kwenye kambi ya mazoezi mjini Iten. Licha ya kuamka alfajiri kufanya mazoezi, Faith hakuacha masomo yake. Alisema, "Riadha na elimu ni mabawa mawili ya ndege mmoja."', [
    ['Faith alianza kukimbia akiwa na miaka mingapi?', 'kumi', ['sita', 'kumi na tano']],
    ['Kocha alimwona wapi?', 'katika mashindano ya shule', ['sokoni', 'kanisani']],
    ['Kambi ya mazoezi ilikuwa mji gani?', 'Iten', ['Mombasa', 'Garissa']],
    ['Kauli ya Faith inamaanisha nini?', 'riadha na elimu ni muhimu kwa pamoja', ['ndege hukimbia haraka', 'elimu haina maana']],
  ]),
  ...passage(4, 'Ukame', 'Mwaka uliopita mvua haikunyesha katika kaunti ya Marsabit kwa miezi mingi. Mifugo ilikufa kwa kukosa malisho na maji, na familia nyingi zilikosa chakula. Serikali na mashirika ya misaada yalisambaza chakula na kuchimba visima. Wazee walisema ukame umekuwa ukitokea mara nyingi zaidi siku hizi. Wataalamu wanawashauri wafugaji kuhifadhi malisho na kuuza baadhi ya mifugo kabla ukame haujaanza.', [
    ['Ukame ulitokea katika kaunti gani?', 'Marsabit', ['Kakamega', 'Nyeri']],
    ['Mifugo ilikufa kwa sababu gani?', 'ukosefu wa malisho na maji', ['baridi kali', 'mafuriko makubwa']],
    ['Wazee walisema nini kuhusu ukame?', 'unatokea mara nyingi zaidi siku hizi', ['haujawahi kutokea kamwe', 'huleta mvua nyingi']],
    ['Wataalamu wanawashauri wafugaji kufanya nini?', 'kuhifadhi malisho na kuuza mifugo mapema', ['kuongeza mifugo wakati wa ukame', 'kuhamia mjini wote']],
  ]),
  ...passage(5, 'Methali ya Bibi', 'Bibi alikuwa na tabia ya kujibu kila swali kwa methali. Siku moja nilimlalamikia kwamba hisabati ilikuwa ngumu na kwamba nilitaka kuacha. Alinitazama kwa upole na kusema, "Haba na haba hujaza kibaba." Sikuelewa mara moja. Baadaye nilitambua kwamba juhudi ndogo hukusanyika kuwa kubwa, na kwamba nikiendelea kufanya mazoezi kidogo kila siku, ugumu ungepungua. Mwishoni mwa muhula, alama zangu za hisabati zilikuwa zimepanda.', [
    ['Bibi alikuwa na tabia gani?', 'kujibu kwa methali', ['kuimba nyimbo', 'kukaa kimya']],
    ['Msimulizi alilalamikia somo gani?', 'hisabati', ['Kiswahili', 'sayansi']],
    ['Methali ya Bibi ilimfundisha nini?', 'juhudi ndogo hukusanyika kuwa kubwa', ['kibaba hakijazwi kamwe', 'hisabati haina faida']],
    ['Nini kilitokea mwishoni mwa muhula?', 'alama zake za hisabati zilipanda', ['aliacha shule', 'Bibi alihamia mjini']],
  ]),
]

const G8_SW: BankQuestion[] = [
  ...passage(1, 'Tangazo', 'TANGAZO: Mkutano wa wazazi utafanyika Ijumaa saa nane mchana katika ukumbi wa shule. Wazazi wote wanaombwa kuhudhuria.', [
    ['Mkutano ni wa akina nani?', 'wazazi', ['wanafunzi wa darasa la kwanza', 'walimu wa kaunti']],
    ['Mkutano utafanyika siku gani?', 'Ijumaa', ['Jumatatu', 'Jumapili']],
    ['Mkutano utafanyika wapi?', 'ukumbini mwa shule', ['sokoni', 'kanisani']],
  ]),
  ...passage(2, 'Mitandao ya Kijamii', 'Mitandao ya kijamii imerahisisha mawasiliano kati ya marafiki na jamaa walio mbali. Hata hivyo, imeleta changamoto kama habari za uongo na uonevu mtandaoni. Ni muhimu kuthibitisha habari kabla ya kuisambaza, na kumweleza mtu mzima unayemwamini ukionewa mtandaoni.', [
    ['Mitandao ya kijamii imerahisisha nini?', 'mawasiliano', ['kilimo', 'ujenzi']],
    ['Changamoto mojawapo ni ipi?', 'habari za uongo', ['mvua nyingi', 'bei ya chakula']],
    ['Tunashauriwa kufanya nini kabla ya kusambaza habari?', 'kuithibitisha', ['kuiongezea chumvi', 'kuifuta']],
    ['Ukionewa mtandaoni ufanye nini?', 'umweleze mtu mzima unayemwamini', ['umjibu kwa matusi', 'unyamaze kabisa']],
  ]),
  ...passage(3, 'Reli ya SGR', 'Reli ya kisasa ya SGR ilizinduliwa mwaka 2017 ikiunganisha Mombasa na Nairobi. Treni zake husafiri kwa kasi zaidi kuliko zile za reli ya zamani, na safari huchukua takriban saa tano. Reli hii husafirisha abiria na mizigo, hivyo kupunguza msongamano wa malori barabarani. Hata hivyo, baadhi ya wafanyabiashara wa barabarani walilalamika kwamba biashara yao ilipungua.', [
    ['Reli ya SGR ilizinduliwa mwaka gani?', '2017', ['1963', '2002']],
    ['Safari kati ya Mombasa na Nairobi huchukua takriban muda gani?', 'saa tano', ['siku mbili', 'saa moja']],
    ['Reli hii imepunguza nini barabarani?', 'msongamano wa malori', ['idadi ya watoto', 'mvua']],
    ['Baadhi ya wafanyabiashara walilalamika kuhusu nini?', 'kupungua kwa biashara yao', ['kelele za treni usiku', 'bei ya tiketi']],
  ]),
  ...passage(4, 'Kijana Mbunifu', 'Brian, mwanafunzi wa Gredi ya Nane, aliona kwamba mama yake alitumia muda mwingi kupepeta nafaka. Alitumia vipande vya mbao, feni ya zamani na betri ya sola kutengeneza mashine ndogo ya kupepeta. Mashine hiyo iliokoa muda na nguvu. Majirani walipoiona, walimwomba awatengenezee pia. Sasa Brian anaweka akiba kutokana na mapato hayo ili aendeleze masomo ya uhandisi.', [
    ['Brian aliona mama yake akitumia muda mwingi kufanya nini?', 'kupepeta nafaka', ['kufua nguo', 'kupika chakula']],
    ['Brian alitumia nini kutengeneza mashine?', 'mbao, feni ya zamani na betri ya sola', ['chuma kipya na umeme wa gridi', 'karatasi na gundi']],
    ['Majirani walifanya nini walipoona mashine?', 'walimwomba awatengenezee', ['waliivunja', 'walimcheka']],
    ['Brian anaweka akiba ili afanye nini?', 'aendeleze masomo ya uhandisi', ['anunue gari', 'ahamie nchi nyingine']],
  ]),
  ...passage(5, 'Mzee na Mpwa Wake', 'Mzee Musa alimkabidhi mpwa wake shamba la ekari moja. Badala ya kulima, kijana alikaa akisubiri msaada kutoka kwa jamaa. Msimu wa mvua ulipita na shamba likamea magugu. Majirani waliovuna mahindi walimwonea huruma, lakini mzee alimwambia, "Asiyefanya kazi asile." Kijana aliona aibu. Msimu uliofuata aliamka alfajiri kulima, na mavuno yake yakawa mengi kuliko ya wengi kijijini.', [
    ['Mzee Musa alimkabidhi mpwa wake nini?', 'shamba la ekari moja', ['ng\'ombe watano', 'duka la mjini']],
    ['Kijana alifanya nini mwanzoni?', 'alisubiri msaada wa jamaa', ['alilima kwa bidii', 'alipanda miti']],
    ['Methali "Asiyefanya kazi asile" inamaanisha nini?', 'kila mtu afanye kazi ili apate riziki', ['wazee wasipewe chakula kamwe', 'kazi ni adhabu kwa vijana']],
    ['Kisa hiki kinasisitiza thamani gani?', 'bidii', ['uvivu', 'kiburi']],
  ]),
]

const G9_SW: BankQuestion[] = [
  ...passage(1, 'Ratiba', 'Mtihani wa Hisabati utaanza saa mbili asubuhi Jumatatu. Wanafunzi wanatakiwa kufika dakika thelathini kabla.', [
    ['Mtihani wa Hisabati utaanza saa ngapi?', 'saa mbili asubuhi', ['saa nane mchana', 'saa kumi jioni']],
    ['Mtihani utaanza siku gani?', 'Jumatatu', ['Ijumaa', 'Jumamosi']],
    ['Wanafunzi wafike muda gani kabla?', 'dakika thelathini', ['saa tatu', 'dakika tano']],
  ]),
  ...passage(2, 'Nishati ya Jotoardhi', 'Kenya ni miongoni mwa nchi zinazoongoza barani Afrika kwa kuzalisha umeme wa jotoardhi. Mvuke kutoka chini ya ardhi katika eneo la Olkaria huzungusha mitambo inayozalisha umeme. Nishati hii haichafui hewa kama makaa ya mawe, na haitegemei mvua kama umeme wa maji. Hata hivyo, uchimbaji wa visima vya mvuke ni ghali sana.', [
    ['Umeme wa jotoardhi huzalishwa eneo gani kwa mujibu wa kifungu?', 'Olkaria', ['Turkana', 'Mombasa']],
    ['Ni nini huzungusha mitambo?', 'mvuke kutoka chini ya ardhi', ['upepo wa baharini', 'maji ya mto']],
    ['Faida moja ya nishati hii ni ipi?', 'haitegemei mvua', ['ni rahisi sana kuchimba', 'hutoa moshi mwingi']],
    ['Changamoto iliyotajwa ni ipi?', 'uchimbaji ni ghali', ['haizalishi umeme', 'huharibu mvua']],
  ]),
  ...passage(3, 'Mahojiano ya Kazi', 'Wanjiru alihojiwa kwa nafasi ya mwanagenzi katika hoteli. Alipoulizwa udhaifu wake, alikiri kwamba alikuwa na woga wa kuzungumza mbele ya watu, lakini akaeleza kwamba alijiunga na klabu ya mdahalo ili kuushinda. Msimamizi alivutiwa na ukweli wake na juhudi zake za kujiboresha, akampa nafasi hiyo.', [
    ['Wanjiru alihojiwa kwa nafasi gani?', 'mwanagenzi hotelini', ['mwalimu wa shule', 'dereva wa basi']],
    ['Alikiri udhaifu gani?', 'woga wa kuzungumza mbele ya watu', ['kuchelewa kazini', 'kukosa adabu']],
    ['Alifanya nini kushinda udhaifu huo?', 'alijiunga na klabu ya mdahalo', ['aliacha shule', 'alinunua simu mpya']],
    ['Kwa nini msimamizi alimpa nafasi?', 'ukweli wake na juhudi za kujiboresha', ['alikuwa na ujuzi mwingi', 'alikuwa jirani yake']],
  ]),
  ...passage(4, 'Ugatuzi', 'Katiba ya mwaka 2010 ilianzisha serikali za kaunti arobaini na saba. Lengo lilikuwa kupeleka huduma na rasilimali karibu na wananchi. Serikali za kaunti hushughulikia huduma kama afya ya msingi, kilimo, barabara za kaunti na elimu ya chekechea. Wananchi wana haki ya kushiriki katika vikao vya umma kutoa maoni kuhusu bajeti na miradi ya kaunti. Ugatuzi umeleta maendeleo katika maeneo mengi, ingawa baadhi ya kaunti zimekabiliwa na changamoto za usimamizi wa fedha.', [
    ['Katiba ya mwaka 2010 ilianzisha kaunti ngapi?', 'arobaini na saba', ['thelathini', 'hamsini na mbili']],
    ['Lengo la ugatuzi lilikuwa lipi?', 'kupeleka huduma karibu na wananchi', ['kufunga hospitali', 'kupunguza idadi ya shule']],
    ['Huduma ipi inashughulikiwa na kaunti?', 'elimu ya chekechea', ['ulinzi wa taifa', 'mambo ya nje']],
    ['Changamoto iliyotajwa ni ipi?', 'usimamizi wa fedha', ['ukosefu wa mvua', 'idadi ndogo ya watu']],
  ]),
  ...passage(5, 'Ndoto ya Rehema', 'Rehema alikulia katika kijiji kisicho na umeme. Usiku alisoma kwa taa ya mafuta ya taa, na mara nyingi macho yake yaliuma. Aliahidi kwamba siku moja angeleta mwanga kijijini. Alisoma kwa bidii hadi akasomea uhandisi wa umeme. Miaka kumi baadaye, alirudi kijijini akiongoza mradi wa umeme wa jua uliowasha nyumba mia tatu. Watoto sasa husoma chini ya taa angavu. Rehema husema, "Ndoto haina gharama, ila kuitimiza kunahitaji jasho."', [
    ['Rehema alisoma vipi usiku akiwa mtoto?', 'kwa taa ya mafuta ya taa', ['kwa umeme wa gridi', 'kwa mwanga wa simu']],
    ['Alisomea taaluma gani?', 'uhandisi wa umeme', ['udaktari', 'ualimu']],
    ['Mradi wake uliwasha nyumba ngapi?', 'mia tatu', ['kumi', 'elfu tano']],
    ['Kauli ya mwisho ya Rehema inamaanisha nini?', 'kufikia ndoto kunahitaji bidii', ['ndoto ni ghali kununua', 'jasho huleta ugonjwa']],
  ]),
]

export const EXTRA_READING: Record<string, BankQuestion[]> = {
  'e-comprehension': G1_EN,
  'k-ufahamu': G1_SW,
  'se-comp': G2_EN,
  'sk-ufahamu': G2_SW,
  'te-comp': G3_EN,
  'tk-ufahamu': G3_SW,
  'u4e-comp': G4_EN,
  'u5e-comp': G5_EN,
  'u6e-comp': G6_EN,
  'u4k-ufahamu': G4_SW,
  'u5k-ufahamu': G5_SW,
  'u6k-ufahamu': G6_SW,
  'j7e-comp': G7_EN,
  'j8e-comp': G8_EN,
  'j9e-comp': G9_EN,
  'j7k-ufahamu': G7_SW,
  'j8k-ufahamu': G8_SW,
  'j9k-ufahamu': G9_SW,
}
