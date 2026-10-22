// Grades 4–6 English and Kiswahili lessons, one per topic, shared by the three grades.
import type { Lesson } from './types'

export const UPPER_ENGLISH_LESSONS: Record<string, Lesson> = {
  'ue-comp': {
    intro: 'Good readers read the passage first, then go back to find each answer in the text.',
    steps: [
      { title: 'Read it all first', text: 'Read the whole passage once to know what it is about. Notice who, where, when and what happened.' },
      { title: 'Find the line', text: 'For each question, find the sentence that holds the answer. Most answers are written in the passage.' },
      { title: 'Meaning of words', text: 'For "what does this word mean", read the sentence around it and try each choice in its place.', example: ['"Water is scarce" → there is not enough water.'] },
      { title: 'Main idea and lesson', text: 'The best title or lesson fits the whole passage, not just one sentence.' },
    ],
    remember: 'Read the whole passage, then find the exact sentence that answers each question.',
  },
  'ue-cloze': {
    intro: 'A cloze passage has gaps. The right word must fit both the grammar and the meaning.',
    steps: [
      { title: 'Read around the gap', text: 'Read the whole sentence, and the ones before and after it.' },
      { title: 'Check the grammar', text: 'Does the gap need a verb, a noun, a pronoun or a joining word? Is it past or present?', example: ['Yesterday she (1) to the market. → went'] },
      { title: 'Try each choice', text: 'Read the sentence with each option. Only one sounds right and makes sense.' },
    ],
    remember: 'The right word fits the grammar of the sentence and the meaning of the story.',
  },
  'ue-vocab': {
    intro: 'Knowing many words helps you read, write and speak well.',
    steps: [
      { title: 'Synonyms', text: 'Words with the same meaning.', example: ['big – large', 'begin – start', 'brave – courageous'] },
      { title: 'Antonyms', text: 'Words with opposite meanings.', example: ['arrive – depart', 'cheap – expensive', 'temporary – permanent'] },
      { title: 'Collective nouns', text: 'Names for groups.', example: ['a herd of cattle', 'a flock of sheep', 'a swarm of bees', 'a pride of lions'] },
      { title: 'Homophones', text: 'Words that sound the same but mean different things.', example: ['I write a letter. / Your answer is right.', 'The children ate their lunch. / Put it there.'] },
    ],
    remember: 'Synonyms mean the same, antonyms mean the opposite, homophones only sound the same.',
  },
  'ue-nouns': {
    intro: 'Nouns name people, places, things and ideas.',
    steps: [
      { title: 'Kinds of nouns', text: 'Proper nouns name a particular person or place and begin with a capital. Common nouns are general. Collective nouns name groups. Abstract nouns name ideas and feelings.', example: ['Kisumu (proper), market (common), team (collective), kindness (abstract)'] },
      { title: 'Plurals', text: 'Most add -s or -es. Some change: -y after a consonant → -ies; -f → -ves. Some are irregular.', example: ['baby → babies, knife → knives', 'child → children, tooth → teeth, sheep → sheep'] },
      { title: 'Possessives', text: "Add 's to show ownership. A plural ending in s takes only '.", example: ["the boy's bag (one boy)", "the boys' bags (many boys)", "the children's toys"] },
      { title: 'Gender', text: 'Some nouns change for male and female.', example: ['king – queen, nephew – niece, lion – lioness'] },
    ],
    remember: "Capitals for proper nouns; 's for one owner, s' for many owners ending in s.",
  },
  'ue-pron': {
    intro: 'Pronouns stand in place of nouns so we do not repeat names.',
    steps: [
      { title: 'Subject or object', text: 'Use I, he, she, we, they before the verb; me, him, her, us, them after it.', example: ['Juma and I went home.', 'The teacher called Juma and me.'] },
      { title: 'Possessive pronouns', text: 'mine, yours, his, hers, ours, theirs — no apostrophe.', example: ['This bag is hers.'] },
      { title: 'Reflexive pronouns', text: 'myself, yourself, himself, herself, ourselves, themselves.', example: ['They enjoyed themselves.'] },
      { title: 'Relative pronouns', text: 'who for people, which for things and animals, whose for owning.', example: ['the girl who won', 'the book which I lost', 'the man whose car is red'] },
    ],
    remember: 'I before the verb, me after it; who for people, which for things, whose for owning.',
  },
  'ue-verbs': {
    intro: 'Verbs show actions. Their form tells us when the action happens.',
    steps: [
      { title: 'Past tense', text: 'Regular verbs add -ed. Irregular verbs change.', example: ['walk → walked', 'go → went, eat → ate, write → wrote'] },
      { title: 'Has and have', text: 'After has, have and had, use the past participle.', example: ['She has gone. They have eaten. We had written.'] },
      { title: 'Agreement', text: 'A singular subject takes is/was; a plural one takes are/were.', example: ['Each of the boys was present.', 'My friends were late.'] },
      { title: 'Passive voice', text: 'The object becomes the subject: was/were/is/are + past participle + by.', example: ['The cat chased the rat. → The rat was chased by the cat.'] },
    ],
    remember: 'Past participle after has, have and had; singular subjects take singular verbs.',
  },
  'ue-adj': {
    intro: 'Adjectives describe nouns; adverbs describe how actions are done.',
    steps: [
      { title: 'Comparing', text: 'Two things: -er or more. Three or more: -est or most.', example: ['tall, taller, tallest', 'beautiful, more beautiful, most beautiful', 'good, better, best'] },
      { title: 'Adverbs', text: 'Many adverbs add -ly to an adjective.', example: ['quick → quickly, happy → happily, good → well'] },
      { title: 'Order of adjectives', text: 'Opinion, size, age, shape, colour, origin, material, then the noun.', example: ['a lovely small old round red Kenyan wooden bowl'] },
      { title: 'Fewer or less', text: 'Fewer for things we count, less for things we cannot count.', example: ['fewer pupils, less water'] },
    ],
    remember: '-er for two, -est for three or more; fewer for counted things, less for others.',
  },
  'ue-prep': {
    intro: 'Prepositions show place and time; conjunctions join ideas.',
    steps: [
      { title: 'Time', text: 'at a time, on a day or date, in a month or year.', example: ['at 8 o\'clock, on Monday, in January'] },
      { title: 'Place', text: 'in, on, under, between (two), among (many), into (movement inside).', example: ['Divide it between the two. Share it among the class.'] },
      { title: 'Joining words', text: 'and adds, but contrasts, so shows a result, because gives a reason, although shows a surprise.', example: ['It rained, so we stayed in.', 'Although it rained, we played.'] },
      { title: 'Pairs', text: 'Some joining words come in pairs.', example: ['either … or, neither … nor, both … and, not only … but also'] },
    ],
    remember: 'at a time, on a day, in a month; between two, among many.',
  },
  'ue-punct': {
    intro: 'Punctuation marks show readers where to pause, stop, ask or feel.',
    steps: [
      { title: 'Capitals and full stops', text: 'Begin sentences and proper nouns with capitals; end statements with a full stop.' },
      { title: 'Question and exclamation marks', text: 'A question ends with ?; strong feeling ends with !', example: ['Where are you going?', 'What a lovely day!'] },
      { title: 'Commas', text: 'Separate items in a list, but not before the last "and".', example: ['mangoes, oranges and pawpaws'] },
      { title: 'Apostrophes and speech marks', text: "Apostrophes show missing letters and owners. Speech marks hold the exact words spoken.", example: ["it's = it is; the girl's book", '"Close the door," said the teacher.'] },
    ],
    remember: 'Capital to start, mark to end; speech marks go around the exact words.',
  },
  'ue-sentences': {
    intro: 'Good sentences put words in the right order and join ideas clearly.',
    steps: [
      { title: 'Word order', text: 'Usually: who, does what, to what, where, when.', example: ['The farmer planted maize in the long rains.'] },
      { title: 'Joining sentences', text: 'Use because, although, who, which or whose to make one smooth sentence.', example: ['I met a man. He sells fish. → I met a man who sells fish.'] },
      { title: 'Reported speech', text: 'Remove the speech marks, add "that", change the pronoun and move the tense back.', example: ['"I am tired," said Wanjiru. → Wanjiru said that she was tired.'] },
      { title: 'Question tags', text: 'A positive sentence takes a negative tag, and a negative sentence a positive one.', example: ["You are coming, aren't you?", "He does not eat meat, does he?"] },
    ],
    remember: 'In reported speech, change the pronoun and move the tense back: am → was, will → would.',
  },
  'ue-spell': {
    intro: 'Correct spelling makes writing easy to read. Patterns and tricks help.',
    steps: [
      { title: 'i before e', text: 'i before e, except after c.', example: ['believe, friend, receive'] },
      { title: 'Double letters', text: 'Some words have double letters that are easy to miss.', example: ['tomorrow, necessary, accommodation, committee'] },
      { title: 'Silent letters', text: 'Some letters are written but not heard.', example: ['knife, island, Wednesday, rhythm'] },
    ],
    remember: 'Say tricky words slowly in parts and learn their patterns: nec-es-sa-ry.',
  },
}

export const UPPER_KISWAHILI_LESSONS: Record<string, Lesson> = {
  'uk-ufahamu': {
    intro: 'Soma kifungu chote kwanza, kisha urudi kutafuta jibu la kila swali.',
    steps: [
      { title: 'Soma kwanza', text: 'Soma kifungu kizima ili ujue kinahusu nini: nani, wapi, lini na nini kilitokea.' },
      { title: 'Tafuta sentensi', text: 'Kwa kila swali, tafuta sentensi yenye jibu. Majibu mengi yamo kifunguni.' },
      { title: 'Maana ya maneno', text: 'Soma sentensi inayozunguka neno, kisha jaribu kila jibu mahali pake.', example: ['"Maji ni haba" → maji ni kidogo.'] },
    ],
    remember: 'Soma kifungu chote, kisha utafute sentensi yenye jibu la kila swali.',
  },
  'uk-cloze': {
    intro: 'Katika kujaza mapengo, neno sahihi lazima lilingane na sarufi na maana.',
    steps: [
      { title: 'Soma sentensi nzima', text: 'Soma sentensi yote na zile zilizo kabla na baada ya pengo.' },
      { title: 'Angalia ngeli', text: 'Neno lazima likubaliane na ngeli ya nomino.', example: ['Kitabu (changu) kimepotea.', 'Miti (ambayo) ilikatwa.'] },
      { title: 'Jaribu kila jibu', text: 'Soma sentensi ukitumia kila jibu. Jibu moja tu litakuwa sahihi.' },
    ],
    remember: 'Jibu sahihi hukubaliana na ngeli ya nomino na maana ya kifungu.',
  },
  'uk-msamiati': {
    intro: 'Msamiati mpana hutusaidia kusoma, kuandika na kuzungumza vizuri.',
    steps: [
      { title: 'Visawe', text: 'Maneno yenye maana moja.', example: ['furaha – shangwe', 'tabibu – daktari', 'bahili – mchoyo'] },
      { title: 'Vinyume', text: 'Maneno yenye maana kinyume.', example: ['kununua – kuuza', 'kujenga – kubomoa', 'mgeni – mwenyeji'] },
      { title: 'Majina ya makundi', text: 'Maneno yanayotaja kundi la vitu.', example: ['shada la maua', 'tita la kuni', 'umati wa watu', 'kicha cha funguo'] },
      { title: 'Watoto na makazi ya wanyama', text: 'Kila mnyama ana jina la mtoto wake na makazi yake.', example: ['ng\'ombe – ndama, kuku – kifaranga', 'nyuki – mzinga, ndege – kiota'] },
    ],
    remember: 'Visawe ni maneno yenye maana moja; vinyume ni maneno yenye maana kinyume.',
  },
  'uk-methali': {
    intro: 'Methali ni misemo ya hekima inayotufunza jinsi ya kuishi vizuri.',
    steps: [
      { title: 'Sehemu mbili', text: 'Methali nyingi zina sehemu mbili zinazokamilishana.', example: ['Haba na haba / hujaza kibaba', 'Penye nia / pana njia'] },
      { title: 'Maana', text: 'Fikiria funzo lililo ndani ya methali.', example: ['Haraka haraka haina baraka: tusifanye mambo kwa pupa.'] },
      { title: 'Kutumia methali', text: 'Chagua methali inayolingana na hali au hadithi.', example: ['Aliyesoma kwa bidii akafaulu → Mvumilivu hula mbivu.'] },
    ],
    remember: 'Jifunze methali pamoja na maana yake ili uweze kuitumia mahali panapofaa.',
  },
  'uk-ngeli': {
    intro: 'Nomino za Kiswahili zimepangwa katika ngeli. Ngeli huamua viambishi vya maneno mengine.',
    steps: [
      { title: 'Ngeli kuu', text: 'A-WA (mtoto–watoto), KI-VI (kiti–viti), LI-YA (tunda–matunda), U-I (mti–miti), I-ZI (nyumba–nyumba), U-ZI (ukuta–kuta).' },
      { title: 'Upatanisho', text: 'Kiambishi cha kitenzi hufuata ngeli.', example: ['Mtoto amefika. Watoto wamefika.', 'Kiti kimevunjika. Viti vimevunjika.'] },
      { title: 'Vimilikishi', text: 'Vimilikishi pia hufuata ngeli.', example: ['kitabu changu, vitabu vyangu', 'mti wangu, miti yangu', 'nyumba yangu, nyumba zangu'] },
    ],
    remember: 'Tambua ngeli ya nomino kwanza; kila neno katika sentensi litafuata ngeli hiyo.',
  },
  'uk-nyakati': {
    intro: 'Viambishi vya nyakati hutuonyesha kitendo kilifanyika lini.',
    steps: [
      { title: 'Nyakati', text: '-na- wakati uliopo, -li- wakati uliopita, -ta- wakati ujao, -me- hali timilifu.', example: ['anasoma, alisoma, atasoma, amesoma'] },
      { title: 'Kukanusha', text: 'Uliopo: -na- huondoka na -a huwa -i. Uliopita: -li- huwa -ku-. Ujao: -ta- hubaki. Timilifu: -me- huwa -ja-.', example: ['anasoma → hasomi', 'alisoma → hakusoma', 'atasoma → hatasoma', 'amesoma → hajasoma'] },
      { title: 'Masharti', text: '-ki- kwa sharti linalowezekana; -nge- na -ngali- kwa sharti lisilowezekana.', example: ['Ukisoma, utafaulu.', 'Kama ningekuwa na pesa, ningenunua baiskeli.'] },
    ],
    remember: '-na-, -li-, -ta-, -me-; katika kukanusha -li- huwa -ku- na -me- huwa -ja-.',
  },
  'uk-vivumishi': {
    intro: 'Vivumishi hueleza zaidi kuhusu nomino.',
    steps: [
      { title: 'Aina za vivumishi', text: 'Sifa (mzuri), idadi (watatu), kimilikishi (changu), kionyeshi (huyu), kiulizi (gani, -pi, -ngapi).' },
      { title: 'Upatanisho', text: 'Kivumishi hufuata ngeli ya nomino.', example: ['mtoto mzuri, kiti kizuri, tunda zuri, nyumba nzuri', 'watoto wengi, viti vingi, maembe mengi'] },
      { title: '-enye na -ingine', text: 'Hivi pia hubadilika kulingana na ngeli.', example: ['mtoto mwenye bidii, kitabu chenye picha', 'mti mwingine, miti mingine'] },
    ],
    remember: 'Kivumishi hubeba kiambishi cha ngeli ya nomino kinachoieleza.',
  },
  'uk-viunganishi': {
    intro: 'Viunganishi huunganisha maneno na sentensi ili mawazo yaeleweke.',
    steps: [
      { title: 'Viunganishi vya kawaida', text: 'na (kuongeza), lakini (kinyume), au (kuchagua), kwa sababu (sababu), ili (lengo).', example: ['Alisoma kwa bidii ili apite mtihani.'] },
      { title: 'Viunganishi vya hali ya kinyume', text: 'ingawa, ijapokuwa, licha ya, hata hivyo.', example: ['Ingawa alikuwa mgonjwa, alienda shuleni.'] },
      { title: 'Matokeo na muda', text: 'kwa hivyo, basi, kisha, baada ya, kabla ya, hadi.', example: ['Mvua ilinyesha sana, kwa hivyo mto ulifurika.'] },
    ],
    remember: 'Chagua kiunganishi kinacholingana na uhusiano wa mawazo: sababu, lengo, kinyume au matokeo.',
  },
  'uk-uakifishaji': {
    intro: 'Alama za uakifishaji humsaidia msomaji kusoma na kuelewa maandishi.',
    steps: [
      { title: 'Alama za kumaliza', text: 'Kitone (.) kwa sentensi ya kawaida, alama ya kuuliza (?) kwa swali, alama ya hisi (!) kwa hisia.', example: ['Unaenda wapi?', 'Lo! Umevunja kikombe!'] },
      { title: 'Kipumuo na nukta pacha', text: 'Kipumuo (,) hutenganisha orodha; nukta pacha (:) hutanguliza orodha.', example: ['Alinunua vitu vifuatavyo: sukari, chumvi na unga.'] },
      { title: 'Ritifaa na alama za kunukuu', text: "Ritifaa (') huonyesha sauti ya ng'; alama za kunukuu huzingira maneno halisi ya msemaji.", example: ["ng'ombe", 'Mwalimu alisema, "Fungueni vitabu vyenu."'] },
    ],
    remember: 'Herufi kubwa mwanzoni; alama sahihi mwishoni; maneno halisi ndani ya alama za kunukuu.',
  },
}
