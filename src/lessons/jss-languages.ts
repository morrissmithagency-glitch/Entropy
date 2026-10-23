// Grades 7–9 English and Kiswahili lessons, one per topic.
import type { Lesson } from './types'

export const JSS_ENGLISH_LESSONS: Record<string, Lesson> = {
  'je-comp': {
    intro: 'Good readers do not just read words; they find meaning, reasons and the writer\'s purpose.',
    steps: [
      { title: 'Read the questions first', text: 'Skim the questions, then read the passage once fully. You will notice the answers as you go.' },
      { title: 'Direct and inferred answers', text: 'Some answers are stated in the text. Others must be worked out from clues, such as how a character feels.' },
      { title: 'Word meaning in context', text: 'For a hard word, read the sentences around it and test each option in its place.' },
      { title: 'Main idea and title', text: 'The best title covers the whole passage, not just one paragraph.' },
    ],
    remember: 'Prove every answer with a line from the passage.',
  },
  'je-cloze': {
    intro: 'A cloze passage tests grammar and meaning together: the right word must fit both.',
    steps: [
      { title: 'Read it all first', text: 'Read the whole passage before choosing, so you know the story and its tense.' },
      { title: 'Check the grammar', text: 'Look at the words before and after the gap: does it need a noun, a verb, a preposition or a connector?' },
      { title: 'Read it back', text: 'Read the sentence with your choice in it. It should sound natural and make sense.' },
    ],
    remember: 'The word must fit the grammar and the meaning.',
  },
  'je-literature': {
    intro: 'Poems and oral literature use sound and images to make words memorable and powerful.',
    steps: [
      { title: 'Figures of speech', text: 'A simile compares using "like" or "as". A metaphor says one thing is another. Personification gives human qualities to things.', example: ['as brave as a lion – simile', 'Time is a thief – metaphor'] },
      { title: 'Sound devices', text: 'Alliteration repeats first sounds; rhyme repeats end sounds; onomatopoeia imitates sounds (buzz, splash).' },
      { title: 'Oral literature', text: 'Riddles, proverbs, tongue twisters, songs and narratives are passed on by word of mouth.' },
      { title: 'Theme and tone', text: 'The theme is the main message. The tone is the poet\'s attitude: joyful, sad, angry or hopeful.' },
    ],
    remember: 'Like or as makes a simile; without them it is a metaphor.',
  },
  'je-wordclass': {
    intro: 'Every word in a sentence has a job. Knowing the job helps you use the word correctly.',
    steps: [
      { title: 'The main classes', text: 'Nouns name, pronouns replace nouns, verbs show action or being, adjectives describe nouns, adverbs describe verbs.' },
      { title: 'Linking words', text: 'Prepositions show position or time (on, during). Conjunctions join (and, but, although). Determiners point (this, every, a).' },
      { title: 'One word, many jobs', text: 'A word\'s class depends on its use: "a fast runner" (adjective), "she runs fast" (adverb), "a long fast" (noun).' },
    ],
    remember: 'Ask what job the word is doing in this sentence.',
  },
  'je-verbs': {
    intro: 'Tenses tell us when things happen, and correct verb forms make writing clear.',
    steps: [
      { title: 'Simple, continuous and perfect', text: 'Simple: I write. Continuous: I am writing. Perfect: I have written. Perfect continuous: I have been writing.' },
      { title: 'Irregular verbs', text: 'Learn their forms: go – went – gone; write – wrote – written; begin – began – begun.' },
      { title: 'Subject–verb agreement', text: 'Singular subjects take singular verbs. "Each of the boys has a book." "Neither Ali nor his friends were late."' },
      { title: 'Phrasal verbs', text: 'Verb + particle with a new meaning: give up (stop), look after (care for), put off (postpone).' },
    ],
    remember: 'Agree with the real subject, not the nearest noun.',
  },
  'je-sentences': {
    intro: 'Mixing simple, compound and complex sentences makes writing clear and interesting.',
    steps: [
      { title: 'Types by structure', text: 'Simple: one main clause. Compound: two main clauses joined by and, but or so. Complex: a main clause and a dependent clause.' },
      { title: 'Types by purpose', text: 'Statements tell, questions ask, commands instruct, exclamations show strong feeling.' },
      { title: 'Phrases and clauses', text: 'A clause has a subject and a verb; a phrase does not.', example: ['"after the rain" – phrase', '"after it rained" – clause'] },
    ],
    remember: 'A clause has a subject and a verb; a phrase does not.',
  },
  'je-transform': {
    intro: 'Rewriting a sentence without changing its meaning shows true command of grammar.',
    steps: [
      { title: 'Active and passive', text: 'Active: The cat chased the rat. Passive: The rat was chased by the cat. Keep the tense the same.' },
      { title: 'Direct and reported speech', text: 'Move the tense back and change pronouns and time words.', example: ['"I am tired," she said.', 'She said that she was tired.'] },
      { title: 'Joining sentences', text: 'Use although, unless, as soon as, not only… but also, too… to, so… that.', example: ['He was too weak to walk.'] },
      { title: 'Question tags', text: 'A positive statement takes a negative tag, and the reverse: "You are coming, aren\'t you?"' },
    ],
    remember: 'Change the form, never the meaning.',
  },
  'je-vocab': {
    intro: 'A rich vocabulary lets you say exactly what you mean.',
    steps: [
      { title: 'Synonyms and antonyms', text: 'Synonyms mean the same (brave – courageous). Antonyms mean the opposite (generous – mean).' },
      { title: 'Idioms', text: 'Their meaning is not literal: "a piece of cake" means very easy; "let the cat out of the bag" means reveal a secret.' },
      { title: 'Prefixes and suffixes', text: 'un-, dis- and im- often mean not; -ful means full of; -less means without.' },
      { title: 'Easily confused words', text: 'affect (verb) / effect (noun); principal (head) / principle (rule); stationary (still) / stationery (paper).' },
    ],
    remember: 'Learn words in sentences, not alone.',
  },
  'je-punct': {
    intro: 'Punctuation and spelling guide the reader, so the meaning comes through clearly.',
    steps: [
      { title: 'Commas and full stops', text: 'Use commas in lists and after introductory phrases. End statements with a full stop.' },
      { title: 'Apostrophes', text: 'Show ownership (the girl\'s book, the girls\' books) or a missing letter (don\'t). "Its" without an apostrophe means belonging to it.' },
      { title: 'Colons and semicolons', text: 'A colon introduces a list or explanation. A semicolon joins two closely linked sentences.' },
      { title: 'Spelling rules', text: 'i before e except after c (receive). Double the final consonant in short words: run → running.' },
    ],
    remember: 'It\'s = it is; its = belonging to it.',
  },
}

export const JSS_KISWAHILI_LESSONS: Record<string, Lesson> = {
  'jk-ufahamu': {
    intro: 'Ufahamu ni kuelewa kifungu kwa kina: mawazo makuu, wahusika na funzo lake.',
    steps: [
      { title: 'Soma maswali kwanza', text: 'Pitia maswali, kisha soma kifungu chote kwa makini.' },
      { title: 'Majibu ya moja kwa moja', text: 'Baadhi ya majibu yameandikwa wazi. Mengine yanahitaji kufikiri kutokana na vidokezo.' },
      { title: 'Msamiati', text: 'Neno gumu hufahamika kutokana na sentensi zilizolizunguka.' },
      { title: 'Kichwa na funzo', text: 'Kichwa bora hujumuisha kifungu kizima. Funzo ni ujumbe tunaojifunza.' },
    ],
    remember: 'Thibitisha kila jibu kwa sentensi kutoka kifunguni.',
  },
  'jk-cloze': {
    intro: 'Kujaza mapengo hupima sarufi na maana kwa pamoja.',
    steps: [
      { title: 'Soma kifungu chote', text: 'Kwanza fahamu hadithi na wakati uliotumika.' },
      { title: 'Angalia upatanisho', text: 'Neno lijalo lazima lipatane na ngeli ya nomino: kitabu kizuri, vitabu vizuri.' },
      { title: 'Soma tena', text: 'Soma sentensi ukiwa umeweka jibu lako. Inapaswa kuwa na maana kamili.' },
    ],
    remember: 'Jibu sahihi hupatana kisarufi na kimaana.',
  },
  'jk-fasihi': {
    intro: 'Fasihi simulizi ni sanaa ya lugha inayopitishwa kwa mdomo kutoka kizazi hadi kizazi.',
    steps: [
      { title: 'Tanzu zake', text: 'Hadithi, methali, vitendawili, nahau, nyimbo, ngonjera na vitanza ndimi.' },
      { title: 'Methali', text: 'Ni kauli fupi yenye hekima. "Haba na haba hujaza kibaba": vitu vidogo vikikusanywa huwa vingi.' },
      { title: 'Tamathali za usemi', text: 'Tashbihi hulinganisha kwa "kama" au "mithili ya". Sitiari hulinganisha moja kwa moja. Tashihisi hupa kitu sifa za binadamu.' },
      { title: 'Nahau', text: 'Ni maneno yenye maana tofauti na ya kawaida: "kupiga moyo konde" ni kujipa ujasiri.' },
    ],
    remember: 'Tashbihi hutumia "kama"; sitiari haitumii.',
  },
  'jk-ngeli': {
    intro: 'Ngeli hupanga nomino katika makundi, na kila kundi lina upatanisho wake.',
    steps: [
      { title: 'Ngeli kuu', text: 'A-WA (mtu – watu), KI-VI (kiti – viti), LI-YA (jicho – macho), U-I (mti – miti), I-ZI (nyumba – nyumba), U-ZI (ukuta – kuta), U-YA (ugonjwa – magonjwa), KU (kusoma), PA-KU-MU (mahali).' },
      { title: 'Upatanisho', text: 'Kivumishi na kitenzi hufuata ngeli ya nomino.', example: ['Kiti kikubwa kimevunjika.', 'Viti vikubwa vimevunjika.'] },
      { title: 'Wingi', text: 'Badilisha kiambishi cha nomino na vya maneno yote yanayoifuata.' },
    ],
    remember: 'Nomino huongoza; maneno mengine hufuata ngeli yake.',
  },
  'jk-aina': {
    intro: 'Kila neno lina kazi yake katika sentensi.',
    steps: [
      { title: 'Aina kuu', text: 'Nomino, kiwakilishi, kitenzi, kivumishi, kielezi, kihusishi, kiunganishi na kihisishi.' },
      { title: 'Vielezi', text: 'Hueleza namna (polepole), mahali (nyumbani), wakati (jana) au idadi (mara mbili).' },
      { title: 'Viunganishi', text: 'Huunganisha maneno au sentensi: na, lakini, ingawa, kwa sababu, ili.' },
    ],
    remember: 'Uliza: neno hili linafanya kazi gani hapa?',
  },
  'jk-nyakati': {
    intro: 'Nyakati na hali huonyesha lini kitendo kilitendeka na kwa namna gani.',
    steps: [
      { title: 'Nyakati', text: '-li- wakati uliopita, -na- wakati uliopo, -ta- wakati ujao, -me- hali timilifu.', example: ['alisoma, anasoma, atasoma, amesoma'] },
      { title: 'Hali ya masharti', text: '-ki- (ukisoma utafaulu), -nge- (ningekuwa na pesa ningenunua), -ngali- (ningalijua ningalikuja).' },
      { title: 'Ukanushaji', text: 'Alisoma → hakusoma. Anasoma → hasomi. Atasoma → hatasoma. Amesoma → hajasoma.' },
    ],
    remember: '-li- jana, -na- leo, -ta- kesho, -me- tayari.',
  },
  'jk-kauli': {
    intro: 'Mnyambuliko hubadilisha kitenzi kupata maana mpya.',
    steps: [
      { title: 'Kauli kuu', text: 'Kutenda (pika), kutendea (pikia), kutendwa (pikwa), kutendeka (pikika), kutendesha (pikisha), kutendana (pikiana).' },
      { title: 'Mfano', text: 'Andika → andikia barua, andikwa na mwalimu, andikika vizuri, andikisha wanafunzi.' },
      { title: 'Kutendana', text: 'Huonyesha kitendo cha pande mbili: pendana, saidiana, salimiana.' },
    ],
    remember: '-i-/-e- kutendea, -w- kutendwa, -ana kutendana.',
  },
  'jk-usemi': {
    intro: 'Usemi halisi ni maneno kama yalivyosemwa; usemi wa taarifa huyaripoti.',
    steps: [
      { title: 'Usemi halisi', text: 'Hutumia alama za kunukuu: Mama alisema, "Ninapika chakula."' },
      { title: 'Usemi wa taarifa', text: 'Huondoa alama za kunukuu na kubadilisha nafsi na wakati: Mama alisema kwamba alikuwa akipika chakula.' },
      { title: 'Mabadiliko', text: 'leo → siku hiyo; kesho → siku iliyofuata; hapa → pale; mimi → yeye.' },
    ],
    remember: 'Taarifa: ondoa alama za kunukuu, badilisha nafsi na wakati.',
  },
  'jk-msamiati': {
    intro: 'Msamiati mpana hukusaidia kujieleza kwa usahihi na kwa uzuri.',
    steps: [
      { title: 'Visawe na vinyume', text: 'Visawe: hodari – shujaa. Vinyume: shibe – njaa, panda – shuka.' },
      { title: 'Msamiati wa nyanja', text: 'Hospitalini: daktari, muuguzi, wodi. Shambani: jembe, mbegu, mavuno. Benki: akaunti, riba, mkopo.' },
      { title: 'Vitate', text: 'Maneno yanayokaribiana kimatamshi lakini yana maana tofauti: bata / pata, vua / fua, baba / papa.' },
    ],
    remember: 'Jifunze maneno ndani ya sentensi.',
  },
  'jk-uakifishaji': {
    intro: 'Alama za uakifishaji huongoza msomaji kuelewa maana.',
    steps: [
      { title: 'Alama kuu', text: 'Nukta (.) humaliza sentensi. Koma (,) hutenganisha orodha. Kiulizi (?) huuliza. Hisi (!) huonyesha hisia.' },
      { title: 'Herufi kubwa', text: 'Mwanzo wa sentensi na majina ya pekee: Nairobi, Juma, Jumatatu.' },
      { title: 'Alama za kunukuu', text: 'Hutumiwa kwa maneno halisi ya msemaji: "Karibu," alisema.' },
    ],
    remember: 'Sentensi huanza kwa herufi kubwa na kuishia kwa alama.',
  },
}
