// Grade 3 Kiswahili, Creative Activities and CRE. Formats follow Grade 3 papers
// (sauti, jaza pengo, hili/haya, kukanusha, kinyume, ufahamu; fill-in with choices).
// All content is original.
import { uid } from '../helpers'
import { labelOptions as opts, passage } from '../generators/english'
import type { BankQuestion, Generator, Level } from '../types'

const t = (level: Level, prompt: string, answer: string, wrong: string[]): BankQuestion => ({ type: 'choice', level, prompt, options: opts([answer, ...wrong]), answer })

// ── Kiswahili ───────────────────────────────────────────────────────────────

const MSAMIATI3: BankQuestion[] = [
  t(1, 'Tunatumia ufagio ___.', 'kufagia', ['kufua', 'kupika']),
  t(1, 'Mtu anayefundisha shuleni ni ___.', 'mwalimu', ['daktari', 'mkulima']),
  t(1, 'Mpira una umbo la ___.', 'duara', ['pembetatu', 'mraba']),
  t(2, 'Kifyekeo hutumika ___ nyasi.', 'kufyeka', ['kufagia', 'kufua']),
  t(2, 'Kazi ya dobi ni ___.', 'kufua nguo', ['kupika chakula', 'kujenga nyumba']),
  t(2, 'Tunatupa takataka kwenye ___.', 'jaa la taka', ['darasa', 'jikoni']),
  t(3, 'Dodoki hutumika ___.', 'kupiga deki', ['kufyeka', 'kuandika']),
  t(3, 'Bendera ya Kenya ina rangi ___.', 'nne', ['tatu', 'tano']),
  t(3, 'Mtu anayetibu wagonjwa ni ___.', 'daktari', ['seremala', 'fundi']),
  t(4, 'Seremala hutengeneza ___.', 'meza na viti', ['nguo', 'viatu', 'mikate']),
  t(4, 'Mtu anayelinda shule usiku ni ___.', 'mlinzi', ['mpishi', 'dereva', 'seremala']),
  t(4, 'Taja umuhimu mmoja wa miti.', 'hutupa hewa safi', ['huleta takataka', 'huharibu udongo', 'huleta njaa']),
  t(5, 'Mwanaskauti hufanya nini?', 'husaidia watu na kutunza mazingira', ['huiba mali', 'hulala darasani', 'hupigana na wenzake']),
  t(5, 'Kifaa kipi kinatumika kukata kuni?', 'shoka', ['ufagio', 'dodoki', 'sindano']),
  t(5, 'Fundi wa viatu huitwa ___.', 'mshona viatu', ['mvuvi', 'mchungaji', 'mpishi']),
]

const SAUTI3: BankQuestion[] = [
  t(1, 'Neno lipi lina sauti "ch"?', 'chai', ['sahani', 'mama']),
  t(1, 'Neno lipi lina sauti "sh"?', 'shamba', ['chumba', 'baba']),
  t(1, 'Neno lipi lina sauti "ny"?', 'nyumba', ['mbuzi', 'kalamu']),
  t(2, 'Neno lipi lina sauti "ch"?', 'chakula', ['shati', 'nyanya']),
  t(2, 'Neno lipi lina sauti "ng\'"?', 'ng\'ombe', ['ngoma', 'nanasi']),
  t(2, 'Neno lipi lina sauti "dh"?', 'dhahabu', ['dawa', 'kuku']),
  t(3, 'Neno lipi lina sauti "th"?', 'thelathini', ['tatu', 'chui']),
  t(3, 'Sentensi ipi ina neno lenye sauti "ch"?', 'Chumba hiki ni kizuri.', ['Mama anapika.', 'Baba amelala.']),
  t(3, 'Neno lipi lina sauti "sh" mara mbili?', 'shangazi wa Shabani', ['chai ya Chausiku', 'nyama ya nyati']),
  t(4, 'Neno lipi HALINA sauti "ch"?', 'shule', ['chungwa', 'kichwa', 'mchele']),
  t(4, 'Neno lipi lina sauti "gh"?', 'ghali', ['gari', 'goti', 'gunia']),
  t(4, 'Chagua neno lenye sauti "ng" (bila kibainishi).', 'ngoma', ['ng\'ombe', 'nyota', 'nanasi']),
  t(5, 'Sentensi ipi ina maneno MAWILI yenye sauti "ch"?', 'Chai ya chumvi haipendezi.', ['Shangazi alipika chakula.', 'Nyumba yetu ni kubwa.', 'Mama ananunua sukari.']),
  t(5, 'Neno lipi lina sauti "dh" na "sh"?', 'dhoruba ya Shaban', ['chupa ya maji', 'nyota ya asubuhi', 'theluji ya mlima']),
  t(5, 'Neno lipi lina sauti "th" mwanzoni?', 'thamani', ['tatu', 'chura', 'samaki']),
]

const NGELI3: BankQuestion[] = [
  t(1, 'Yai ___ limechemka.', 'hili', ['haya', 'huyu']),
  t(1, 'Maembe ___ yameoza.', 'haya', ['hili', 'hiki']),
  t(1, 'Shavu ___ linauma.', 'hili', ['haya', 'hawa']),
  t(2, 'Mawe ___ yatatumika kujenga.', 'haya', ['hili', 'hiki']),
  t(2, 'Jani ___ ni kijani.', 'hili', ['haya', 'hii']),
  t(2, 'Matunda ___ ni matamu.', 'haya', ['hili', 'huyu']),
  t(3, 'Wingi wa "jiwe" ni ___.', 'mawe', ['majiwe', 'viwe']),
  t(3, 'Wingi wa "yai" ni ___.', 'mayai', ['maayai', 'viyai']),
  t(3, 'Umoja wa "maembe" ni ___.', 'embe', ['kiembe', 'mwembe']),
  t(4, 'Andika kwa wingi: "Jicho hili linauma."', 'Macho haya yanauma.', ['Majicho haya yanauma.', 'Macho hili linauma.', 'Jicho haya yanauma.']),
  t(4, 'Andika kwa umoja: "Majani haya yamekauka."', 'Jani hili limekauka.', ['Jani haya yamekauka.', 'Majani hili limekauka.', 'Kijani hiki kimekauka.']),
  t(4, 'Wingi wa "gari" ni ___.', 'magari', ['vigari', 'gari']),
  t(5, 'Chagua sentensi sahihi.', 'Embe hili limeiva.', ['Embe haya limeiva.', 'Embe hili yameiva.', 'Embe hiki kimeiva.']),
  t(5, 'Andika kwa wingi: "Tunda hili ni tamu."', 'Matunda haya ni matamu.', ['Matunda hili ni tamu.', 'Tunda haya ni matamu.', 'Vitunda hivi ni vitamu.']),
  t(5, 'Andika kwa umoja: "Mayai haya yamevunjika."', 'Yai hili limevunjika.', ['Yai haya yamevunjika.', 'Mayai hili limevunjika.', 'Kiyai hiki kimevunjika.']),
]

const KANUSHA3: BankQuestion[] = [
  t(1, 'Kanusha: "Ninacheza."', 'Sichezi.', ['Ninacheza sana.', 'Nilicheza.']),
  t(1, 'Kanusha: "Anasoma."', 'Hasomi.', ['Anasoma kitabu.', 'Alisoma.']),
  t(1, 'Kanusha: "Tunaimba."', 'Hatuimbi.', ['Tuliimba.', 'Tunaimba wimbo.']),
  t(2, 'Kanusha: "Wao wanacheza mpira."', 'Wao hawachezi mpira.', ['Wao walicheza mpira.', 'Wao watacheza mpira.']),
  t(2, 'Kanusha: "Mimi ninakula."', 'Mimi sili.', ['Mimi nilikula.', 'Mimi nitakula.']),
  t(2, 'Kanusha: "Wewe unalala."', 'Wewe hulali.', ['Wewe ulilala.', 'Wewe utalala.']),
  t(3, 'Kanusha: "Sisi tutaimba wimbo wa taifa."', 'Sisi hatutaimba wimbo wa taifa.', ['Sisi hatuimbi wimbo wa taifa.', 'Sisi tuliimba wimbo wa taifa.']),
  t(3, 'Kanusha: "Yeye atasafiri kesho."', 'Yeye hatasafiri kesho.', ['Yeye hasafiri kesho.', 'Yeye alisafiri kesho.']),
  t(3, 'Kanusha: "Mimi nitakunywa chai."', 'Mimi sitakunywa chai.', ['Mimi sinywi chai.', 'Mimi nilikunywa chai.']),
  t(4, 'Kanusha: "Juma alienda sokoni."', 'Juma hakuenda sokoni.', ['Juma haendi sokoni.', 'Juma hataenda sokoni.', 'Juma alienda sokoni jana.']),
  t(4, 'Kanusha: "Tulikula wali."', 'Hatukula wali.', ['Hatuli wali.', 'Hatutakula wali.', 'Tulikula wali mwingi.']),
  t(4, 'Kanusha: "Ninyi mnaandika."', 'Ninyi hamwandiki.', ['Ninyi mliandika.', 'Ninyi hamtaandika.', 'Ninyi mnaandika vizuri.']),
  t(5, 'Kanusha: "Watoto walicheza uwanjani jana."', 'Watoto hawakucheza uwanjani jana.', ['Watoto hawachezi uwanjani jana.', 'Watoto hawatacheza uwanjani jana.', 'Watoto walicheza uwanjani leo.']),
  t(5, 'Sentensi ipi ni ya kukanusha?', 'Mama hapiki leo.', ['Mama anapika leo.', 'Mama alipika jana.', 'Mama atapika kesho.']),
  t(5, 'Kanusha: "Mwalimu atatufundisha hesabu."', 'Mwalimu hatatufundisha hesabu.', ['Mwalimu hatufundishi hesabu.', 'Mwalimu hakutufundisha hesabu.', 'Mwalimu atatufundisha Kiswahili.']),
]

const KINYUME3: BankQuestion[] = [
  t(1, 'Kinyume cha "juu" ni ___.', 'chini', ['ndani', 'mbele']),
  t(1, 'Kinyume cha "kubwa" ni ___.', 'ndogo', ['refu', 'nzuri']),
  t(1, 'Kinyume cha "cheka" ni ___.', 'lia', ['imba', 'kimbia']),
  t(2, 'Kinyume cha "peleka" ni ___.', 'leta', ['tuma', 'beba']),
  t(2, 'Kinyume cha "nunua" ni ___.', 'uza', ['lipa', 'chukua']),
  t(2, 'Kinyume cha "fungua" ni ___.', 'funga', ['fagia', 'fua']),
  t(3, 'Kinyume cha "ingia" ni ___.', 'toka', ['kaa', 'simama']),
  t(3, 'Kinyume cha "safi" ni ___.', 'chafu', ['nzuri', 'ndogo']),
  t(3, 'Kinyume cha "mchana" ni ___.', 'usiku', ['asubuhi', 'jioni']),
  t(4, 'Andika kinyume: "Mariamu anacheka."', 'Mariamu analia.', ['Mariamu anaimba.', 'Mariamu hacheki.', 'Mariamu anakimbia.']),
  t(4, 'Andika kinyume: "Mama amenunua nguo."', 'Mama ameuza nguo.', ['Mama amefua nguo.', 'Mama amevaa nguo.', 'Mama hajanunua nguo.']),
  t(4, 'Kinyume cha "zito" ni ___.', 'jepesi', ['refu', 'pana', 'gumu']),
  t(5, 'Andika kinyume: "Peleka kalamu ya mwalimu."', 'Leta kalamu ya mwalimu.', ['Tuma kalamu ya mwalimu.', 'Nunua kalamu ya mwalimu.', 'Usipeleke kalamu ya mwalimu.']),
  t(5, 'Andika kinyume: "Mlango umefunguliwa."', 'Mlango umefungwa.', ['Mlango umevunjwa.', 'Mlango umepakwa rangi.', 'Mlango haujafunguliwa.']),
  t(5, 'Kinyume cha "tajiri" ni ___.', 'maskini', ['mwenye nguvu', 'mrefu', 'mgonjwa']),
]

const UFAHAMU3: BankQuestion[] = [
  t(1, 'Soma: "Aisha ana miaka tisa." Aisha ana miaka mingapi?', 'tisa', ['nane', 'kumi']),
  t(1, 'Soma: "Baba anapenda chai ya maziwa." Baba anapenda nini?', 'chai ya maziwa', ['kahawa', 'maji']),
  ...passage(2, 'Shuleni Kwetu', 'Jina langu ni Zuhura. Niko katika Gredi ya Tatu. Ninasoma katika Shule ya Msingi ya Amani. Ninapenda Hisabati na Kiswahili. Mama hunipeleka shuleni kila asubuhi.', [
    ['Mwanafunzi anaitwa nani?', 'Zuhura', ['Aisha', 'Amani']],
    ['Zuhura yuko katika gredi gani?', 'ya tatu', ['ya pili', 'ya nne']],
    ['Nani humpeleka Zuhura shuleni?', 'Mama', ['Baba', 'Mwalimu']],
  ]),
  ...passage(4, 'Kwa Bibi', 'Jumamosi, mimi na dada yangu Neema tulienda kumtembelea Bibi. Tulimkuta akivuna maharagwe shambani. Tulimsalimia, "Shikamoo Bibi." Alitujibu, "Marahaba wajukuu wangu." Alitupa maembe na maji baridi. Jioni, tulimsaidia kubeba maharagwe nyumbani.', [
    ['Ni watoto wangapi walienda kwa Bibi?', 'wawili', ['mmoja', 'watatu', 'wanne']],
    ['Walimkuta Bibi wapi?', 'shambani', ['sokoni', 'nyumbani', 'kanisani']],
    ['Bibi aliwajibu vipi?', 'Marahaba wajukuu wangu.', ['Shikamoo.', 'Asante.', 'Kwaheri.']],
    ['Bibi aliwapa nini?', 'maembe na maji baridi', ['ndizi na maziwa', 'chai na mkate', 'wali na samaki']],
  ]),
  ...passage(5, 'Mvua Kubwa', 'Usiku mmoja mvua kubwa ilinyesha kijijini Mwea. Asubuhi, Kamau aliona maji mengi barabarani. Daraja dogo lilikuwa limeharibika. Baba alisema, "Leo hatutavuka mto. Tutasubiri maji yapungue." Kamau alibaki nyumbani akasoma vitabu vyake.', [
    ['Mvua ilinyesha lini?', 'usiku', ['asubuhi', 'mchana', 'jioni']],
    ['Kwa nini hawakuvuka mto?', 'daraja liliharibika na maji yalikuwa mengi', ['Kamau alikuwa mgonjwa', 'walikuwa wamechoka', 'ilikuwa Jumapili']],
    ['Kamau alifanya nini nyumbani?', 'alisoma vitabu', ['alicheza mpira', 'alilala', 'alipika']],
    ['Neno "limeharibika" lina maana gani?', 'limevunjika', ['limejengwa', 'limepakwa rangi', 'limesafishwa']],
  ]),
]

/** Tahajia: unscramble letters into a word (generated). */
const TAHAJIA_WORDS = [
  ['paka', 'mama', 'meza', 'jani'],
  ['kalamu', 'kitabu', 'mwalimu', 'sahani'],
  ['mwalimu', 'darasa', 'ndizi', 'chupa', 'shule'],
  ['kalamu', 'mwanafunzi', 'shangazi', 'kitanda'],
  ['mwanafunzi', 'darasani', 'mchezaji', 'hospitali', 'kiongozi'],
]

export const tahajia: Generator = (rng, level) => {
  const word = rng.pick(TAHAJIA_WORDS[level - 1])
  let scrambled = rng.shuffle(word.split('')).join('')
  while (scrambled === word) scrambled = rng.shuffle(word.split('')).join('')
  if (level <= 2) {
    const all = [...new Set(TAHAJIA_WORDS.flat())]
    const others = rng.sample(all.filter((w) => w !== word && w.length === word.length), 2)
    const fallback = rng.sample(all.filter((w) => w !== word), 2)
    const wrong = others.length === 2 ? others : fallback
    return { id: uid('tah'), type: 'choice', level, prompt: `Andika neno hili vizuri: ${scrambled}`, options: rng.shuffle(opts([word, ...wrong])), answer: word, explain: `${scrambled} → ${word}` }
  }
  return {
    id: uid('tah'),
    type: 'order',
    level,
    prompt: `Panga herufi uandike neno sahihi: ${scrambled}`,
    tiles: rng.shuffle(word.split('')),
    answer: word.split(''),
    joiner: '',
    explain: `Neno ni "${word}".`,
  }
}

// ── Creative Activities ─────────────────────────────────────────────────────

const ART3: BankQuestion[] = [
  t(1, 'Which tool do we use for painting?', 'paint brush', ['spoon', 'hoe']),
  t(1, 'Which tool is used for drawing?', 'pencil', ['broom', 'cup']),
  t(1, 'We should clean the ___ after painting.', 'brush', ['pencil', 'ruler']),
  t(2, 'Paints are usually mixed in a ___.', 'palette', ['paint brush', 'bucket']),
  t(2, 'A way of making pictures using pencils is called ___.', 'drawing', ['painting', 'weaving']),
  t(2, 'Which material is used for colouring?', 'crayons', ['stones', 'water only']),
  t(3, 'A piece of art made by sticking different materials together is called a ___.', 'collage', ['drawing', 'song']),
  t(3, 'Which soil is best for modelling?', 'clay', ['sand', 'gravel']),
  t(3, 'Which item is made by twisting?', 'rope', ['hut', 'cup']),
  t(4, 'Which group has only tools for painting?', 'brush, palette, paint', ['pencil, ruler, rubber', 'hoe, panga, rake', 'brush, hoe, ruler']),
  t(4, 'Making a basket by passing strips over and under each other is called ___.', 'weaving', ['modelling', 'painting', 'drawing']),
  t(4, 'Which material can we use to make a collage?', 'seeds and coloured paper', ['water and soil', 'stones and fire', 'milk and sugar']),
  t(5, 'Why should we cover the desk with old newspaper before painting?', 'to keep the desk clean', ['to make the paint dry', 'to read the news', 'to make the picture bigger']),
  t(5, 'Mixing blue and yellow paint gives ___.', 'green', ['red', 'orange', 'purple']),
  t(5, 'Mixing red and yellow paint gives ___.', 'orange', ['green', 'blue', 'brown']),
]

const MUSIC3: BankQuestion[] = [
  t(1, 'We can create a simple rhythm by ___.', 'clapping', ['crying', 'sleeping']),
  t(1, 'Which one is a musical instrument?', 'drum', ['plate', 'spoon']),
  t(1, 'Children singing while playing feel ___.', 'happy', ['sad', 'angry']),
  t(2, 'The highness and lowness of music is called ___.', 'pitch', ['tempo', 'rhythm']),
  t(2, 'The speed of music is called ___.', 'tempo', ['pitch', 'melody']),
  t(2, 'Name a string instrument.', 'guitar', ['drum', 'whistle']),
  t(3, 'Which instrument do we blow?', 'flute', ['drum', 'guitar']),
  t(3, 'Which instrument do we beat?', 'drum', ['flute', 'violin']),
  t(3, 'The nyatiti is a ___ instrument from Kenya.', 'string', ['blown', 'beaten']),
  t(4, 'A song sung to make a baby sleep is a ___.', 'lullaby', ['hymn', 'anthem', 'chant']),
  t(4, 'Which body movement keeps a steady beat?', 'tapping your foot', ['closing your eyes', 'reading a book', 'sitting still']),
  t(4, 'Which group has only beaten instruments?', 'drum, shakers, tambourine', ['guitar, flute, drum', 'nyatiti, guitar, fiddle', 'flute, whistle, horn']),
  t(5, 'A fast song has a ___ tempo.', 'quick', ['slow', 'low', 'quiet']),
  t(5, 'The isukuti drum dance comes from which community?', 'Luhya', ['Maasai', 'Swahili', 'Kikuyu']),
  t(5, 'Which instrument is played by plucking strings?', 'nyatiti', ['drum', 'horn', 'shaker']),
]

const ANTHEM3: BankQuestion[] = [
  t(1, 'The National Anthem is a ___ to our country.', 'prayer', ['game', 'story']),
  t(1, 'We stand ___ when singing the National Anthem.', 'still and upright', ['running', 'sitting']),
  t(1, 'Songs sung in church to praise God are called ___.', 'hymns', ['lullabies', 'riddles']),
  t(2, 'In how many languages is the Kenyan National Anthem sung?', 'two', ['three', 'one']),
  t(2, 'How many verses does our National Anthem have?', 'three', ['two', 'five']),
  t(2, 'Complete: "O God of all ___"', 'creation', ['nations', 'people']),
  t(3, 'Complete: "Bless this our land and ___"', 'nation', ['people', 'country']),
  t(3, 'Complete: "Justice be our ___ and defender"', 'shield', ['sword', 'flag']),
  t(3, 'The National Anthem is sung in English and ___.', 'Kiswahili', ['French', 'Arabic']),
  t(4, 'The first line in Kiswahili is "Ee Mungu nguvu ___"', 'yetu', ['yangu', 'yao', 'zetu']),
  t(4, 'When is the National Anthem sung at school?', 'at school assembly', ['during lunch', 'during break', 'at night']),
  t(4, 'Songs we sing on national holidays to love our country are ___ songs.', 'patriotic', ['lullaby', 'work', 'game']),
  t(5, 'Which shows respect during the National Anthem?', 'standing still and singing', ['chewing gum', 'talking to friends', 'looking for your bag']),
  t(5, 'Which colour is NOT on the Kenyan flag?', 'blue', ['black', 'red', 'green']),
  t(5, 'Songs we sing while working to make work easier are ___.', 'work songs', ['lullabies', 'hymns', 'anthems']),
]

const PE3: BankQuestion[] = [
  t(1, 'Which item is used for skipping?', 'a rope', ['a ball', 'a stick']),
  t(1, 'Learners hop using their ___.', 'legs', ['hands', 'heads']),
  t(1, 'Which one is NOT safe to kick?', 'a stone', ['a ball', 'a bean bag']),
  t(2, 'Name a body part used when skipping.', 'legs', ['ears', 'nose']),
  t(2, 'When skipping, our ___ turn the rope.', 'arms', ['ears', 'eyes']),
  t(2, 'Before games we should ___.', 'warm up', ['eat a lot', 'sleep']),
  t(3, 'Hopping means jumping on ___.', 'one leg', ['both hands', 'two legs only']),
  t(3, 'Why do we warm up before games?', 'to prepare our muscles and avoid injury', ['to get tired', 'to sleep well']),
  t(3, 'Which is a safe place to play?', 'a clear, flat field', ['near broken glass', 'on the road']),
  t(4, 'After playing we should ___ to cool down.', 'walk slowly and stretch', ['sleep on the field', 'run faster', 'drink dirty water']),
  t(4, 'What should we wear for physical activities?', 'light, comfortable clothes', ['heavy jackets', 'tight shoes', 'long dresses']),
  t(4, 'Which activity makes our heart beat faster?', 'running', ['sitting', 'sleeping', 'reading']),
  t(5, 'Kiptoo fell and hurt his knee while playing. What should his friends do first?', 'call the teacher', ['laugh at him', 'continue playing', 'leave him alone']),
  t(5, 'Which group has only skills done with a rope?', 'skipping, swinging, jumping over', ['kicking, throwing, catching', 'swimming, diving, floating', 'reading, writing, drawing']),
  t(5, 'Why should we drink clean water after playing?', 'to replace the water we lose when we sweat', ['to become sleepy', 'to grow taller fast', 'to feel cold']),
]

// ── CRE ─────────────────────────────────────────────────────────────────────

const CREATION3: BankQuestion[] = [
  t(1, 'Who created the world?', 'God', ['man', 'animals']),
  t(1, 'God created me in His own ___.', 'likeness', ['picture', 'house']),
  t(1, 'The first man God created was ___.', 'Adam', ['Noah', 'Moses']),
  t(2, 'Adam and Eve lived in the garden of ___.', 'Eden', ['Egypt', 'Nineveh']),
  t(2, 'The first woman God created was ___.', 'Eve', ['Mary', 'Sarah']),
  t(2, 'God rested on the ___ day.', 'seventh', ['first', 'third']),
  t(3, 'How can we care for God\'s creation?', 'by planting trees', ['by burning forests', 'by killing animals']),
  t(3, 'God created light on the ___ day.', 'first', ['seventh', 'sixth']),
  t(3, 'Name a member of the extended family.', 'grandmother', ['teacher', 'pastor']),
  t(4, 'On which day did God create human beings?', 'the sixth day', ['the first day', 'the third day', 'the seventh day']),
  t(4, 'Which of these did God create?', 'the sun, moon and stars', ['houses and cars', 'shoes and bags', 'phones and radios']),
  t(4, 'Adam and Eve were sent out of the garden because they ___.', 'disobeyed God', ['were hungry', 'were tired', 'wanted to travel']),
  t(5, 'Why should we take care of animals?', 'God created them and gave us the duty to care for them', ['they are useless', 'they are dangerous', 'they are ours to harm']),
  t(5, 'Which shows thanking God for His creation?', 'praying and singing praises', ['wasting food', 'cutting all trees', 'polluting rivers']),
  t(5, 'God gave Adam the work of ___ the animals.', 'naming', ['selling', 'chasing', 'counting']),
]

const BIBLE3: BankQuestion[] = [
  t(1, '___ saw the burning bush.', 'Moses', ['Noah', 'Jonah']),
  t(1, 'Who built the ark?', 'Noah', ['Moses', 'David']),
  t(1, 'Who killed Goliath?', 'David', ['Saul', 'Daniel']),
  t(2, 'Jonah was sent to the city of ___.', 'Nineveh', ['Tarshish', 'Egypt']),
  t(2, 'Naaman was suffering from ___.', 'leprosy', ['measles', 'malaria']),
  t(2, 'Jonah was swallowed by a big ___.', 'fish', ['lion', 'bird']),
  t(3, 'King ___ ordered Daniel to be thrown into the den of lions.', 'Darius', ['David', 'Saul']),
  t(3, 'Jonah ___ God and went to Tarshish.', 'disobeyed', ['obeyed', 'praised']),
  t(3, 'Naaman was asked to wash in River Jordan ___ times.', 'seven', ['three', 'ten']),
  t(4, 'King ___ ordered that the three Hebrew men be thrown into the fire.', 'Nebuchadnezzar', ['Darius', 'Herod', 'David']),
  t(4, 'Who told Naaman to wash in River Jordan?', 'Elisha', ['Elijah', 'Moses', 'Samuel']),
  t(4, 'Who protected Daniel in the den of lions?', 'God\'s angel', ['the king', 'his friends', 'the soldiers']),
  t(5, 'What lesson do we learn from Jonah?', 'we should obey God', ['we should run away', 'we should fear fish', 'we should travel by ship']),
  t(5, 'Which story shows God healing a sick person?', 'Naaman washing in River Jordan', ['Noah building the ark', 'David killing Goliath', 'Jonah going to Tarshish']),
  t(5, 'The three Hebrew men were Shadrach, Meshach and ___.', 'Abednego', ['Daniel', 'Samuel', 'Elisha']),
]

const LIVING3: BankQuestion[] = [
  t(1, 'We talk to God through ___.', 'prayer', ['shouting', 'sleeping']),
  t(1, 'When I do good, God is ___.', 'happy', ['sad', 'angry']),
  t(1, 'Where do Christians go to worship?', 'church', ['market', 'hospital']),
  t(2, 'True or False? Good choices lead us to trouble.', 'False', ['True']),
  t(2, 'True or False? When I am bored, I should abuse others.', 'False', ['True']),
  t(2, 'Which is a good choice?', 'helping a classmate', ['stealing a pen', 'telling lies']),
  t(3, 'When someone wrongs us, Jesus teaches us to ___.', 'forgive them', ['fight them', 'insult them']),
  t(3, 'Which shows respect to parents?', 'obeying them', ['shouting at them', 'ignoring them']),
  t(3, 'We should share our food with ___.', 'those who are hungry', ['nobody', 'only rich people']),
  t(4, 'Which is the best way to use our free time?', 'helping at home and playing safely', ['fighting', 'stealing fruits', 'abusing others']),
  t(4, 'Jesus fed five thousand people with five loaves and two ___.', 'fish', ['goats', 'cows', 'eggs']),
  t(4, 'Which commandment teaches us about parents?', 'Honour your father and mother', ['Do not steal', 'Do not kill', 'Keep the Sabbath holy']),
  t(5, 'Wekesa found a wallet on the way to church. What should he do?', 'return it to the owner or give it to an elder', ['keep the money', 'throw it away', 'buy sweets with it']),
  t(5, 'Which group shows only good choices?', 'praying, sharing, obeying', ['lying, sharing, praying', 'stealing, obeying, praying', 'fighting, sharing, lying']),
  t(5, 'Why do Christians thank God before meals?', 'to show gratitude for the food', ['to make the food hot', 'to wait for visitors', 'to finish quickly']),
]

export const GRADE3_MORE_GENERATORS: Record<string, Generator> = {
  'tk-tahajia': tahajia,
}

export const GRADE3_MORE_BANKS: Record<string, BankQuestion[]> = {
  'tk-msamiati': MSAMIATI3,
  'tk-sauti': SAUTI3,
  'tk-ufahamu': UFAHAMU3,
  'tk-ngeli': NGELI3,
  'tk-kanusha': KANUSHA3,
  'tk-kinyume': KINYUME3,
  'tc-art': ART3,
  'tc-music': MUSIC3,
  'tc-anthem': ANTHEM3,
  'tc-pe': PE3,
  'tr-creation': CREATION3,
  'tr-bible': BIBLE3,
  'tr-living': LIVING3,
}
