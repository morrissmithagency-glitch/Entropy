// More reading: original stories, passages and cloze texts for the comprehension, ufahamu
// and cloze stops that had the fewest different questions. Each set is pitched at its
// grade; the first question of a story is asked one level lower as a warm-up.
import { labelOptions as opts, passage } from '../generators/english'
import type { BankQuestion, Level } from '../types'

function cloze(level: Level, title: string, text: string, sw: boolean, blanks: [string, string[]][]): BankQuestion[] {
  return blanks.map(([ans, wrong], i) => ({
    type: 'choice' as const,
    level,
    prompt: sw ? `Soma kifungu. Ni jibu lipi linalofaa pengo (${i + 1})?` : `Read the passage. Which answer best fills blank (${i + 1})?`,
    visual: { kind: 'passage' as const, title, text },
    options: opts([ans, ...wrong]),
    answer: ans,
  }))
}

// ── Grade 1 English ─────────────────────────────────────────────────────────

const G1_EN: BankQuestion[] = [
  ...passage(1, 'My Cat', 'I have a cat. Her name is Tama. She drinks milk.', [
    ['What do I have?', 'a cat', ['a dog', 'a hen']],
    ['What is her name?', 'Tama', ['Juma', 'Neema']],
    ['What does she drink?', 'milk', ['tea', 'juice']],
  ]),
  ...passage(2, "Kendi's Kite", 'Kendi has a yellow kite. The wind is strong. The kite flies up high. Kendi runs and laughs.', [
    ['What does Kendi have?', 'a kite', ['a ball', 'a drum']],
    ['What colour is the kite?', 'yellow', ['red', 'blue']],
    ['Where does the kite fly?', 'up high', ['under a bed', 'into a cup']],
    ['What does Kendi do?', 'runs and laughs', ['sleeps and cries', 'sits and eats']],
  ]),
  ...passage(2, 'Bath Time', 'Baraka has a puppy called Spot. Spot is dirty. Baraka washes Spot with soap and water. Now Spot is clean.', [
    ['Who has a puppy?', 'Baraka', ['Mama', 'the teacher']],
    ['What is the puppy called?', 'Spot', ['Tama', 'Kiki']],
    ['What does Baraka use?', 'soap and water', ['milk and bread', 'sand and sticks']],
    ['How is Spot at the end?', 'clean', ['dirty', 'hungry']],
  ]),
  ...passage(3, 'At the Market', 'Mama and Zawadi go to the market. They buy tomatoes, onions and two big mangoes. Zawadi carries the basket. It is heavy, but she is strong.', [
    ['Where do Mama and Zawadi go?', 'to the market', ['to school', 'to the river']],
    ['How many mangoes do they buy?', 'two', ['one', 'five']],
    ['Who carries the basket?', 'Zawadi', ['Mama', 'the seller']],
    ['How is the basket?', 'heavy', ['empty', 'small']],
  ]),
  ...passage(3, 'Rain and Frogs', 'It rained all night. In the morning there was a pool of water near the gate. Three little frogs sat in the pool. They sang, "Kwaa, kwaa!"', [
    ['When did it rain?', 'all night', ['all morning', 'last week']],
    ['Where was the pool of water?', 'near the gate', ['in the kitchen', 'on the roof']],
    ['How many frogs sat in the pool?', 'three', ['two', 'ten']],
    ['What did the frogs do?', 'they sang', ['they slept', 'they ate']],
  ]),
  ...passage(4, 'Helping Grandmother', 'On Saturday, Otieno visited his grandmother. She was feeding her chickens. Otieno helped her to fetch water and sweep the yard. Grandmother gave him a sweet potato for lunch. "Thank you for helping me," she said.', [
    ['When did Otieno visit his grandmother?', 'on Saturday', ['on Monday', 'at night']],
    ['What was Grandmother doing?', 'feeding her chickens', ['cooking ugali', 'washing clothes']],
    ['How did Otieno help?', 'he fetched water and swept', ['he played and slept', 'he sang and danced']],
    ['What did Grandmother give him?', 'a sweet potato', ['a new ball', 'some money']],
  ]),
  ...passage(5, 'The School Garden', 'Our class has a small garden behind the classroom. We planted sukuma wiki and carrots. Every morning, two pupils water the plants. After many weeks, the carrots were ready. Our teacher cooked them, and we ate them at lunch. They were sweet!', [
    ['Where is the garden?', 'behind the classroom', ['near the road', 'at the church']],
    ['What did the class plant?', 'sukuma wiki and carrots', ['maize and beans', 'roses and grass']],
    ['Who waters the plants every morning?', 'two pupils', ['the teacher', 'the cook']],
    ['How did the carrots taste?', 'sweet', ['bitter', 'salty']],
  ]),
]

// ── Grade 1 Kiswahili ───────────────────────────────────────────────────────

const G1_SW: BankQuestion[] = [
  ...passage(1, 'Mbuzi Wangu', 'Nina mbuzi. Mbuzi wangu ni mweupe. Anakula majani.', [
    ['Nina nini?', 'mbuzi', ['paka', 'kuku']],
    ['Mbuzi ana rangi gani?', 'nyeupe', ['nyeusi', 'nyekundu']],
    ['Mbuzi anakula nini?', 'majani', ['mkate', 'samaki']],
  ]),
  ...passage(2, 'Shuleni', 'Amina anaenda shuleni. Ana kitabu na kalamu. Mwalimu wake ni mpole.', [
    ['Amina anaenda wapi?', 'shuleni', ['sokoni', 'mtoni']],
    ['Amina ana nini?', 'kitabu na kalamu', ['kikombe na sahani', 'mpira na ngoma']],
    ['Mwalimu wake yukoje?', 'mpole', ['mkali', 'mvivu']],
    ['Nani anaenda shuleni?', 'Amina', ['Baba', 'Juma']],
  ]),
  ...passage(2, 'Kuku wa Mama', 'Mama ana kuku watano. Kuku hutaga mayai kila siku. Juma huokota mayai asubuhi.', [
    ['Mama ana kuku wangapi?', 'watano', ['wawili', 'kumi']],
    ['Kuku hutaga nini?', 'mayai', ['maziwa', 'unga']],
    ['Nani huokota mayai?', 'Juma', ['Mama', 'mwalimu']],
    ['Juma huokota mayai lini?', 'asubuhi', ['usiku', 'jioni']],
  ]),
  ...passage(3, 'Mvua', 'Mvua ilinyesha usiku. Asubuhi, Wanjiku alivaa buti zake. Alitembea kwenye matope hadi shuleni. Hakuchafuka kwa sababu alivaa buti.', [
    ['Mvua ilinyesha lini?', 'usiku', ['mchana', 'jioni']],
    ['Wanjiku alivaa nini?', 'buti', ['kofia', 'koti']],
    ['Wanjiku alienda wapi?', 'shuleni', ['sokoni', 'kanisani']],
    ['Kwa nini hakuchafuka?', 'alivaa buti', ['alibebwa', 'hakutoka nje']],
  ]),
  ...passage(3, 'Paka na Panya', 'Paka wetu anaitwa Kiki. Usiku, Kiki alimwona panya jikoni. Panya alikimbia nje haraka. Kiki alirudi kulala karibu na jiko.', [
    ['Paka anaitwa nani?', 'Kiki', ['Tama', 'Simba']],
    ['Kiki alimwona nani?', 'panya', ['ndege', 'mbwa']],
    ['Panya alikuwa wapi?', 'jikoni', ['shambani', 'darasani']],
    ['Kiki alilala wapi?', 'karibu na jiko', ['juu ya mti', 'ndani ya sanduku']],
  ]),
  ...passage(4, 'Siku ya Soko', 'Siku ya Jumamosi, Baba na Hamisi walienda sokoni. Walinunua ndizi, nyanya na samaki. Hamisi alibeba kikapu. Waliporudi nyumbani, Mama alipika samaki kwa chakula cha jioni.', [
    ['Walienda sokoni lini?', 'Jumamosi', ['Jumatatu', 'Ijumaa']],
    ['Walinunua nini?', 'ndizi, nyanya na samaki', ['mkate, maziwa na chai', 'mchele, unga na sukari']],
    ['Nani alibeba kikapu?', 'Hamisi', ['Baba', 'Mama']],
    ['Mama alipika nini?', 'samaki', ['nyama', 'maharagwe']],
  ]),
  ...passage(5, 'Bustani ya Shule', 'Darasa letu lina bustani ndogo. Tulipanda sukuma wiki na karoti. Kila asubuhi, wanafunzi wawili humwagilia mimea maji. Karoti zilipokomaa, mwalimu alizipika. Tulikula karoti tamu wakati wa chakula cha mchana.', [
    ['Darasa lina nini?', 'bustani ndogo', ['shamba kubwa', 'kisima kirefu']],
    ['Walipanda nini?', 'sukuma wiki na karoti', ['mahindi na maharagwe', 'maua na nyasi']],
    ['Nani humwagilia mimea?', 'wanafunzi wawili', ['mwalimu mkuu', 'mpishi wa shule']],
    ['Karoti zilikuwaje?', 'tamu', ['chungu', 'chachu']],
  ]),
  ...passage(5, 'Mbwa Mwaminifu', 'Baba ana mbwa anayeitwa Simba. Kila usiku, Simba hulinda nyumba. Usiku mmoja, Simba alibweka kwa sauti kubwa. Baba aliamka na kuona kwamba mbuzi walikuwa wametoka zizini. Aliwarudisha ndani na kumpa Simba mfupa kama zawadi.', [
    ['Mbwa anaitwa nani?', 'Simba', ['Kiki', 'Tama']],
    ['Simba hufanya nini kila usiku?', 'hulinda nyumba', ['hulala jikoni', 'hucheza nje']],
    ['Kwa nini Baba aliamka?', 'Simba alibweka', ['mvua ilinyesha', 'mtoto alilia']],
    ['Simba alipewa nini?', 'mfupa', ['mkate', 'maziwa']],
  ]),
]

// ── Grade 2 English ─────────────────────────────────────────────────────────

const G2_EN: BankQuestion[] = [
  ...passage(1, 'The Red Bus', 'A red bus stops at our gate. Children climb in. The driver smiles and waves.', [
    ['What colour is the bus?', 'red', ['blue', 'green']],
    ['Who climbs in?', 'children', ['goats', 'teachers']],
    ['What does the driver do?', 'smiles and waves', ['shouts and runs', 'sleeps and snores']],
  ]),
  ...passage(2, 'The New Shoes', 'Grandfather bought Akinyi new black shoes for school. She polished them every evening. On Monday, her teacher said, "Your shoes are very shiny, Akinyi!"', [
    ['Who bought the shoes?', 'Grandfather', ['Mother', 'the teacher']],
    ['What colour are the shoes?', 'black', ['brown', 'white']],
    ['When did Akinyi polish them?', 'every evening', ['every morning', 'once a month']],
    ['What did the teacher say about the shoes?', 'they were very shiny', ['they were too big', 'they were dirty']],
  ]),
  ...passage(3, 'The Football Match', 'Our school played a football match against Kilimani School. Wekesa kicked the ball hard and scored a goal. Everyone clapped and cheered. At the end, our team won by one goal to nil.', [
    ['Which school did they play against?', 'Kilimani School', ['Mwangaza School', 'Baraka School']],
    ['Who scored a goal?', 'Wekesa', ['the coach', 'the referee']],
    ['What did everyone do?', 'clapped and cheered', ['cried and left', 'sat and slept']],
    ['What was the score?', 'one goal to nil', ['two goals to one', 'nil to nil']],
  ]),
  ...passage(3, 'The Thirsty Calf', 'One hot afternoon, a little calf could not find water. It walked slowly to the river, but the river was dry. Chebet saw the calf and brought a bucket of water from the tank. The calf drank and drank until it was full.', [
    ['When did this happen?', 'one hot afternoon', ['one cold morning', 'late at night']],
    ['Why could the calf not drink at the river?', 'the river was dry', ['the river was too deep', 'a lion was there']],
    ['Where did Chebet get the water?', 'from the tank', ['from the river', 'from the shop']],
    ['How much did the calf drink?', 'until it was full', ['only one sip', 'nothing at all']],
  ]),
  ...passage(4, 'The Library Corner', 'Our teacher made a library corner in the classroom. She put a mat on the floor and shelves full of storybooks. Every Friday, we sit on the mat and read quietly. Nekesa likes books about animals, and Baraka likes books about space. When we finish a book, we tell the class about it.', [
    ['Who made the library corner?', 'the teacher', ['the head teacher', 'the parents']],
    ['When do the pupils read in the corner?', 'every Friday', ['every Monday', 'only in holidays']],
    ['What kind of books does Baraka like?', 'books about space', ['books about animals', 'books about cooking']],
    ['What do pupils do after finishing a book?', 'tell the class about it', ['take it home for ever', 'draw on its pages']],
  ]),
]

// ── Grade 2 Kiswahili ───────────────────────────────────────────────────────

const G2_SW: BankQuestion[] = [
  ...passage(1, 'Ng\'ombe wa Babu', 'Babu ana ng\'ombe mmoja. Ng\'ombe hutoa maziwa mengi. Tunakunywa maziwa kila asubuhi.', [
    ['Babu ana nini?', 'ng\'ombe', ['mbuzi', 'kondoo']],
    ['Ng\'ombe hutoa nini?', 'maziwa', ['mayai', 'asali']],
    ['Tunakunywa maziwa lini?', 'kila asubuhi', ['kila usiku', 'mara moja kwa mwezi']],
  ]),
  ...passage(2, 'Mpira Mpya', 'Mwalimu alileta mpira mpya shuleni. Wanafunzi walifurahi sana. Walicheza uwanjani wakati wa mapumziko.', [
    ['Nani alileta mpira?', 'mwalimu', ['mzazi', 'mlinzi']],
    ['Wanafunzi walijisikiaje?', 'walifurahi sana', ['walihuzunika', 'walikasirika']],
    ['Walicheza wapi?', 'uwanjani', ['darasani', 'jikoni']],
    ['Walicheza lini?', 'wakati wa mapumziko', ['wakati wa somo', 'usiku wa manane']],
  ]),
  ...passage(2, 'Dada Yangu', 'Dada yangu anaitwa Neema. Ana miaka sita. Anapenda kuchora maua na ndege. Picha zake ni nzuri sana.', [
    ['Dada anaitwa nani?', 'Neema', ['Zawadi', 'Amina']],
    ['Neema ana miaka mingapi?', 'sita', ['minne', 'kumi']],
    ['Neema anapenda kufanya nini?', 'kuchora', ['kupika', 'kuogelea']],
    ['Picha zake zikoje?', 'nzuri sana', ['mbaya sana', 'ndogo sana']],
  ]),
  ...passage(3, 'Safari ya Mombasa', 'Wakati wa likizo, familia ya Hassani ilisafiri kwa gari moshi hadi Mombasa. Waliona bahari kubwa na mchanga mweupe. Hassani aliokota makombe mazuri ufuoni. Alimpa bibi yake makombe hayo kama zawadi.', [
    ['Familia ilisafiri kwa nini?', 'gari moshi', ['ndege', 'basi']],
    ['Walienda wapi?', 'Mombasa', ['Kisumu', 'Nakuru']],
    ['Hassani aliokota nini?', 'makombe', ['mawe', 'majani']],
    ['Alimpa nani makombe?', 'bibi yake', ['mwalimu wake', 'rafiki yake']],
  ]),
  ...passage(4, 'Mti wa Mwembe', 'Nyuma ya nyumba yetu kuna mti mkubwa wa mwembe. Babu aliupanda miaka mingi iliyopita. Wakati wa joto, tunakaa chini ya kivuli chake. Mwezi Desemba, mti huzaa maembe mengi matamu. Mama huuza baadhi ya maembe sokoni.', [
    ['Mti uko wapi?', 'nyuma ya nyumba', ['mbele ya shule', 'kando ya barabara']],
    ['Nani aliupanda mti?', 'Babu', ['Baba', 'Mama']],
    ['Mti huzaa maembe lini?', 'mwezi Desemba', ['mwezi Aprili', 'kila wiki']],
    ['Mama hufanya nini na baadhi ya maembe?', 'huyauza sokoni', ['huyatupa nje', 'huyapika chai']],
  ]),
  ...passage(5, 'Sungura Mwerevu', 'Sungura alikuwa na kiu sana. Aliona kisima kirefu, lakini maji yalikuwa chini mno. Alikusanya mawe madogo na kuyatupa kisimani moja baada ya jingine. Maji yalipanda juu polepole. Mwishowe, sungura alikunywa maji na kuondoka akiwa na furaha.', [
    ['Sungura alikuwa na nini?', 'kiu', ['njaa', 'baridi']],
    ['Kwa nini hakuweza kunywa mwanzoni?', 'maji yalikuwa chini mno', ['kisima kilikuwa kimefungwa', 'maji yalikuwa machafu']],
    ['Alitupa nini kisimani?', 'mawe madogo', ['majani makavu', 'matunda mabichi']],
    ['Somo la hadithi hii ni lipi?', 'akili hutatua shida', ['haraka haraka haina baraka', 'usimwamini mgeni']],
  ]),
  ...passage(5, 'Siku ya Michezo', 'Shule yetu iliandaa siku ya michezo. Wanafunzi walikimbia, waliruka kamba na kuvuta kamba. Rehema alishinda mbio za mita mia moja. Mwalimu mkuu alimpa medali ya dhahabu. Wazazi walishangilia kwa sauti kubwa.', [
    ['Shule iliandaa nini?', 'siku ya michezo', ['siku ya usafi', 'sherehe ya harusi']],
    ['Nani alishinda mbio?', 'Rehema', ['mwalimu mkuu', 'mzazi mmoja']],
    ['Rehema alipewa nini?', 'medali ya dhahabu', ['kitabu kipya', 'kikombe cha chai']],
    ['Wazazi walifanya nini?', 'walishangilia', ['walilala', 'waliondoka']],
  ]),
]

// ── Grade 3 English ─────────────────────────────────────────────────────────

const G3_EN: BankQuestion[] = [
  ...passage(2, 'The Clever Crow', 'A crow found a piece of bread near the market. A cat wanted the bread too. The crow flew up into a tall tree and ate the bread slowly. The cat waited below, but the crow did not come down.', [
    ['What did the crow find?', 'a piece of bread', ['a ripe mango', 'a small fish']],
    ['Where did the crow find it?', 'near the market', ['in the classroom', 'under a bed']],
    ['Where did the crow go?', 'into a tall tree', ['into a dark hole', 'onto the roof']],
    ['What did the cat do?', 'waited below', ['climbed the tree', 'went to sleep']],
  ]),
]

// ── Grade 3 Kiswahili ───────────────────────────────────────────────────────

const G3_SW: BankQuestion[] = [
  ...passage(2, 'Kalamu Iliyopotea', 'Juma alipoteza kalamu yake darasani. Aliitafuta chini ya madawati na ndani ya mkoba wake. Halima aliiona karibu na dirisha. Alimrudishia Juma, naye akasema, "Asante sana, Halima."', [
    ['Juma alipoteza nini?', 'kalamu', ['kitabu', 'mkoba']],
    ['Juma aliitafuta wapi kwanza?', 'chini ya madawati', ['nje ya darasa', 'juu ya paa']],
    ['Nani aliiona kalamu?', 'Halima', ['mwalimu', 'Baba']],
    ['Juma alisema nini?', 'Asante sana, Halima.', ['Kwaheri, Halima.', 'Pole sana, Halima.']],
  ]),
  ...passage(3, 'Kisima cha Kijiji', 'Kijiji chetu kilikuwa na shida ya maji. Wanakijiji walikutana na kuamua kuchimba kisima. Kila mtu alileta jembe au ndoo. Baada ya wiki mbili, kisima kilikamilika. Sasa watoto hawatembei mbali kuchota maji.', [
    ['Kijiji kilikuwa na shida gani?', 'ukosefu wa maji', ['ukosefu wa chakula', 'ukosefu wa shule']],
    ['Wanakijiji waliamua kufanya nini?', 'kuchimba kisima', ['kujenga soko', 'kupanda miti']],
    ['Kisima kilikamilika baada ya muda gani?', 'wiki mbili', ['siku mbili', 'miaka miwili']],
    ['Funzo la hadithi ni lipi?', 'umoja ni nguvu', ['haraka haina baraka', 'usipoziba ufa utajenga ukuta']],
  ]),
  ...passage(4, 'Daktari wa Mifugo', 'Ng\'ombe wa Mzee Kiprotich aliugua ghafla. Hakula majani na alikuwa mnyonge. Mzee Kiprotich alimpigia simu daktari wa mifugo. Daktari alifika haraka, akampima ng\'ombe na kumpa dawa. Baada ya siku tatu, ng\'ombe alipona na kuanza kula tena.', [
    ['Ng\'ombe alikuwa wa nani?', 'Mzee Kiprotich', ['Mama Atieno', 'mwalimu mkuu']],
    ['Ng\'ombe alionyesha dalili gani?', 'hakula na alikuwa mnyonge', ['alikimbia na kuruka', 'alilia usiku kucha']],
    ['Mzee Kiprotich alifanya nini?', 'alimpigia simu daktari', ['alimuuza sokoni', 'alimwacha peke yake']],
    ['Ng\'ombe alipona baada ya muda gani?', 'siku tatu', ['wiki tatu', 'saa tatu']],
  ]),
  ...passage(5, 'Mashindano ya Kuimba', 'Shule ya Msingi Tumaini ilishiriki mashindano ya kuimba ya kaunti. Wanafunzi walifanya mazoezi kila jioni kwa mwezi mzima. Siku ya mashindano, walivaa sare safi na kuimba wimbo kuhusu kutunza mazingira. Waamuzi walifurahishwa na sauti zao tamu. Shule hiyo ilishinda nafasi ya kwanza.', [
    ['Shule ilishiriki mashindano gani?', 'ya kuimba', ['ya kukimbia', 'ya kuchora']],
    ['Wanafunzi walifanya mazoezi lini?', 'kila jioni', ['kila Jumapili', 'mara moja tu']],
    ['Wimbo wao ulihusu nini?', 'kutunza mazingira', ['kupika chakula', 'kucheza mpira']],
    ['Shule ilishinda nafasi gani?', 'ya kwanza', ['ya pili', 'ya mwisho']],
  ]),
  ...passage(5, 'Zawadi ya Bibi', 'Bibi alimtumia Wambui zawadi kutoka kijijini. Ilikuwa kikapu kilichofumwa kwa mkono, kilichojaa machungwa na ndizi. Wambui alifurahi sana. Aliwagawia wenzake darasani matunda hayo. Kisha alimwandikia bibi barua ya kumshukuru.', [
    ['Nani alituma zawadi?', 'Bibi', ['mwalimu', 'jirani']],
    ['Zawadi ilikuwa nini?', 'kikapu cha matunda', ['mfuko wa nguo', 'sanduku la vitabu']],
    ['Wambui alifanya nini na matunda?', 'aliwagawia wenzake', ['aliyauza sokoni', 'aliyaficha chumbani']],
    ['Wambui alimwandikia bibi barua ya nini?', 'ya kumshukuru', ['ya kumwomba pesa', 'ya kumwalika harusini']],
  ]),
]

// ── Upper primary Kiswahili ─────────────────────────────────────────────────

const UPPER_SW_UFAHAMU: BankQuestion[] = [
  ...passage(2, 'Siku ya Kupanda Miti', 'Mwezi Aprili, shule yetu iliadhimisha siku ya kupanda miti. Kila mwanafunzi alipanda mche mmoja kando ya uwanja. Mwalimu wa kilimo alituonyesha jinsi ya kuchimba shimo na kuweka mbolea. Tuliahidi kumwagilia miche yetu kila wiki hadi ikue.', [
    ['Siku ya kupanda miti iliadhimishwa lini?', 'mwezi Aprili', ['mwezi Desemba', 'mwezi Julai']],
    ['Kila mwanafunzi alipanda miche mingapi?', 'mmoja', ['miwili', 'mitano']],
    ['Nani aliwaonyesha jinsi ya kupanda?', 'mwalimu wa kilimo', ['mwalimu mkuu', 'mzazi mmoja']],
    ['Wanafunzi waliahidi kufanya nini?', 'kumwagilia miche kila wiki', ['kukata miti ya zamani', 'kuuza miche sokoni']],
  ]),
]

const UPPER_SW_CLOZE: BankQuestion[] = [
  ...cloze(3, 'Usafi wa Mazingira', 'Usafi wa mazingira ni jukumu (1) kila mmoja wetu. Tunapaswa kutupa taka (2) mapipa yaliyotengwa. Taka za plastiki (3) kuchomwa kwa sababu moshi wake ni hatari. Tukiweka mazingira safi, magonjwa (4). Kwa hivyo, tushirikiane (5) kutunza mazingira yetu.', true, [
    ['la', ['wa', 'ya', 'cha']],
    ['katika', ['kutoka', 'bila', 'kama']],
    ['hazifai', ['haifai', 'hakifai', 'halifai']],
    ['yatapungua', ['itapungua', 'litapungua', 'kitapungua']],
    ['ili', ['lakini', 'wala', 'ingawa']],
  ]),
]

// ── Junior school ───────────────────────────────────────────────────────────

const JSS_EN_COMP: BankQuestion[] = [
  ...passage(5, 'The Seed Bank', 'In a village near Machakos, a group of women noticed that the maize seeds sold in shops often failed when the rains came late. Their grandmothers had grown sorghum, millet and cowpeas that survived long dry spells, but few families still kept those seeds. The women decided to start a community seed bank. Each farmer who borrowed a kilogram of seed promised to return two kilograms after harvest. Within three seasons, the bank held more than twenty local varieties, and neighbouring villages began asking to join. Agricultural officers now visit to learn from them, noting that the seed bank has made the community less dependent on a single crop.', [
    ['What problem did the women notice?', 'Shop maize seeds often failed when the rains came late.', ['Their grandmothers refused to share any of their seeds.', 'Sorghum and millet grew too fast for the market.', 'The shops in Machakos stopped selling maize seed.']],
    ['How did the seed bank grow its stock?', 'Each borrower returned twice the seed after harvest.', ['Each family paid money to join the bank every season.', 'The county bought new seed for the bank every year.', 'Neighbouring villages gave their seed away for free.']],
    ['What does "dependent on a single crop" mean in the passage?', 'relying on only one kind of crop', ['refusing to grow any crops at all', 'growing many crops in one field', 'selling crops to a single buyer']],
    ['Why do agricultural officers visit the community?', 'to learn from the community\'s seed bank', ['to sell new maize seed to the farmers', 'to close the seed bank for safety', 'to teach the women how to plant maize']],
    ['Which title best sums up the passage?', 'Old Seeds, New Security', ['The Shops of Machakos', 'Why Maize Is the Best Crop', 'A Long Journey to Market']],
  ]),
]

const JSS_EN_CLOZE: BankQuestion[] = [
  ...cloze(4, 'Kenya\'s Water Towers', 'Kenya\'s forests on Mount Kenya, the Aberdares and the Mau are often called water towers (1) they store rain and release it slowly into rivers. When these forests (2) cut down, rivers carry less water during the dry season. Farmers downstream then struggle (3) irrigate their crops. To protect the water towers, communities are planting indigenous trees and (4) charcoal burning. If these efforts continue, the rivers (5) flow throughout the year.', false, [
    ['because', ['although', 'unless', 'despite']],
    ['are', ['is', 'was', 'be']],
    ['to', ['for', 'with', 'at']],
    ['discouraging', ['encouraging', 'discouraged', 'discourage']],
    ['will', ['would have', 'had', 'were']],
  ]),
  ...cloze(5, 'A Letter of Thanks', 'Dear Mr Omondi, On behalf of the Grade 9 class, I am writing to thank you (1) the science equipment you donated to our school. Before your gift, we (2) share one microscope among forty learners. Now, each group has its own, and we are able (3) carry out experiments properly. Our results in the last test improved (4), and several of us now hope to study medicine. We would be honoured if you could visit us (5) our science fair next term. Yours faithfully, Amina Yusuf (Class Prefect)', false, [
    ['for', ['about', 'with', 'of']],
    ['had to', ['must', 'have to', 'should']],
    ['to', ['for', 'of', 'at']],
    ['greatly', ['great', 'greater', 'greatest']],
    ['during', ['while', 'since', 'until']],
  ]),
]

const JSS_SW_UFAHAMU: BankQuestion[] = [
  ...passage(4, 'Kliniki ya Simu', 'Katika kijiji cha mbali cha Kerio, wagonjwa walilazimika kusafiri kilomita hamsini ili kumwona daktari. Shirika moja la afya lilianzisha huduma ya kliniki ya simu. Mgonjwa hupiga simu, na muuguzi humwuliza maswali kuhusu dalili zake. Ikiwa ugonjwa ni mdogo, muuguzi humshauri jinsi ya kujitunza. Ikiwa ni mkubwa, gari la wagonjwa hutumwa kumchukua.', [
    ['Kwa nini wagonjwa wa Kerio walikuwa na shida?', 'walisafiri mbali kumwona daktari', ['hawakuwa na simu za mkononi', 'hospitali ilikuwa ghali mno']],
    ['Nani huwauliza wagonjwa maswali?', 'muuguzi', ['dereva', 'mwalimu']],
    ['Muuguzi hufanya nini ugonjwa ukiwa mdogo?', 'humshauri mgonjwa jinsi ya kujitunza', ['humtuma kwa gari la wagonjwa mara moja', 'humwambia asubiri mwaka mzima']],
    ['Neno "dalili" lina maana gani katika kifungu?', 'ishara za ugonjwa', ['aina ya dawa', 'jina la kliniki']],
  ]),
  ...passage(5, 'Wavuvi wa Ziwa Turkana', 'Wavuvi wa Ziwa Turkana walikuwa wakipata hasara kwa sababu samaki wengi waliharibika kabla ya kufika sokoni. Kikundi cha vijana kiliunda vibanda vya kukausha samaki kwa kutumia nishati ya jua. Samaki waliokaushwa vizuri hudumu kwa miezi kadhaa bila kuharibika. Sasa wavuvi huuza samaki wao hadi miji ya mbali, na mapato yao yameongezeka maradufu.', [
    ['Wavuvi walikuwa wakipata hasara kwa nini?', 'samaki waliharibika kabla ya kuuzwa', ['ziwa lilikauka kabisa', 'hakukuwa na samaki ziwani']],
    ['Vijana waliunda nini?', 'vibanda vya kukausha samaki', ['boti kubwa za uvuvi', 'masoko mapya ya mjini']],
    ['Vibanda hivyo hutumia nishati gani?', 'ya jua', ['ya umeme wa maji', 'ya mafuta ya taa']],
    ['Maneno "yameongezeka maradufu" yanamaanisha nini?', 'yamekuwa mara mbili zaidi', ['yamepungua kwa nusu', 'hayajabadilika kamwe']],
  ]),
]

const JSS_SW_CLOZE: BankQuestion[] = [
  ...cloze(1, 'Rafiki Yangu', 'Rafiki yangu (1) Baraka. Yeye ni mrefu (2) mimi. Sisi (3) katika darasa moja. Kila asubuhi, tunatembea pamoja (4) shuleni. Baraka ni rafiki (5) sana.', true, [
    ['anaitwa', ['wanaitwa', 'kinaitwa', 'yanaitwa']],
    ['kuliko', ['kama', 'na', 'ila']],
    ['tuko', ['wako', 'yuko', 'kiko']],
    ['hadi', ['kutoka', 'bila', 'ndani']],
    ['mwema', ['wema', 'chema', 'jema']],
  ]),
  ...cloze(4, 'Teknolojia na Elimu', 'Teknolojia imeleta mabadiliko makubwa (1) elimu. Wanafunzi wengi sasa (2) kutumia vipakatalishi kufanya utafiti. Hata hivyo, ni muhimu kutumia mtandao kwa uangalifu (3) kuepuka habari zisizo za kweli. Walimu (4) kuwaongoza wanafunzi jinsi ya kutambua vyanzo vya kuaminika. Teknolojia ikitumiwa vyema, (5) kuboresha matokeo ya masomo.', true, [
    ['katika', ['kutoka', 'bila', 'kwa ajili']],
    ['wanaweza', ['anaweza', 'kinaweza', 'yanaweza']],
    ['ili', ['lakini', 'wala', 'ingawa']],
    ['wanapaswa', ['anapaswa', 'kinapaswa', 'yanapaswa']],
    ['inaweza', ['wanaweza', 'kinaweza', 'yanaweza']],
  ]),
  ...cloze(5, 'Barua kwa Mhariri', 'Mhariri, Ningependa kutumia safu hii (1) kuzungumzia tatizo la taka mjini kwetu. Mapipa ya taka hayatoshi, na (2) yaliyopo hujaa kabla ya kuondolewa. Matokeo yake ni kwamba taka hutupwa (3) kando ya barabara. Ninapendekeza serikali ya kaunti iongeze mapipa na (4) ratiba ya kuyaondoa. Wakazi nao (5) kushirikiana kwa kutupa taka ipasavyo. Wako, Mkazi Mwenye Wasiwasi.', true, [
    ['ili', ['ingawa', 'wala', 'lakini']],
    ['yale', ['ile', 'zile', 'kile']],
    ['ovyo', ['vizuri', 'kwa makini', 'kwa haraka']],
    ['iimarishe', ['waimarishe', 'kiimarishe', 'liimarishe']],
    ['wanapaswa', ['anapaswa', 'inapaswa', 'kinapaswa']],
  ]),
]

const each = (ids: string[], qs: BankQuestion[]) => Object.fromEntries(ids.map((id) => [id, qs]))

/** Extra reading for each stop, added to whatever it already has. */
export const MORE_PASSAGES: Record<string, BankQuestion[]> = {
  'e-comprehension': G1_EN,
  'k-ufahamu': G1_SW,
  'se-comp': G2_EN,
  'sk-ufahamu': G2_SW,
  'te-comp': G3_EN,
  'tk-ufahamu': G3_SW,
  ...each(['u4k-ufahamu', 'u5k-ufahamu', 'u6k-ufahamu'], UPPER_SW_UFAHAMU),
  ...each(['u4k-cloze', 'u5k-cloze', 'u6k-cloze'], UPPER_SW_CLOZE),
  ...each(['j7e-comp', 'j8e-comp', 'j9e-comp'], JSS_EN_COMP),
  ...each(['j7e-cloze', 'j8e-cloze', 'j9e-cloze'], JSS_EN_CLOZE),
  ...each(['j7k-ufahamu', 'j8k-ufahamu', 'j9k-ufahamu'], JSS_SW_UFAHAMU),
  ...each(['j7k-cloze', 'j8k-cloze', 'j9k-cloze'], JSS_SW_CLOZE),
}
