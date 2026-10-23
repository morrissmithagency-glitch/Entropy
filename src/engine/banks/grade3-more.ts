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
  t(5, 'Mwanaskauti hufanya nini?', 'husaidia watu na kutunza mazingira', ['hulala darasani wakati wa somo', 'hucheza tu wakati wa mapumziko', 'huuza bidhaa sokoni kila siku']),
  t(5, 'Kifaa kipi kinatumika kukata kuni?', 'shoka', ['ufagio', 'dodoki', 'sindano']),
  t(5, 'Fundi wa viatu huitwa ___.', 'mshona viatu', ['mvuvi', 'mchungaji', 'mpishi']),
  // Uzalendo na miezi ya mwaka
  t(1, 'Mwezi wa kwanza wa mwaka ni ___.', 'Januari', ['Machi', 'Desemba']),
  t(2, 'Mwezi unaofuata Machi ni ___.', 'Aprili', ['Februari', 'Mei']),
  t(2, 'Tunaipenda nchi yetu ya ___.', 'Kenya', ['Uingereza', 'Marekani']),
  t(3, 'Mwaka una miezi ___.', 'kumi na miwili', ['kumi', 'saba']),
  t(3, 'Rangi nyeusi kwenye bendera ya Kenya inawakilisha ___.', 'watu wa Kenya', ['damu', 'amani']),
  t(4, 'Mwezi wa mwisho wa mwaka ni ___.', 'Desemba', ['Novemba', 'Januari', 'Oktoba']),
  t(4, 'Tunaonyesha uzalendo kwa ___.', 'kuimba wimbo wa taifa kwa heshima', ['kuchana bendera', 'kuharibu mali ya umma', 'kutupa takataka barabarani']),
  t(5, 'Mwezi unaokuja kabla ya Julai ni ___.', 'Juni', ['Agosti', 'Mei', 'Septemba']),
  t(5, 'Rangi ya kijani kwenye bendera yetu inawakilisha ___.', 'mimea na ardhi yenye rutuba', ['amani na umoja wa nchi', 'watu weusi wa Kenya', 'maji ya bahari na maziwa']),
]

const MAAMKUZI3: BankQuestion[] = [
  t(1, 'Mtoto akimsalimia mzee husema ___.', 'Shikamoo', ['Kwaheri', 'Pole']),
  t(1, 'Ukiambiwa "Hujambo?" unajibu ___.', 'Sijambo', ['Hatujambo', 'Marahaba']),
  t(1, 'Tunapoachana na rafiki tunasema ___.', 'Kwaheri', ['Shikamoo', 'Karibu']),
  t(1, 'Mtu akikupa zawadi unasema ___.', 'Asante', ['Pole', 'Kwaheri']),
  t(2, 'Mzee akiambiwa "Shikamoo" hujibu ___.', 'Marahaba', ['Sijambo', 'Asante']),
  t(2, 'Ukiambiwa "Hamjambo?" mnajibu ___.', 'Hatujambo', ['Sijambo', 'Hajambo']),
  t(2, 'Asubuhi tunasalimiana kwa kusema "Habari za ___?"', 'asubuhi', ['usiku', 'jioni']),
  t(2, 'Mtu akisema "Asante" unajibu ___.', 'Karibu', ['Pole', 'Kwaheri']),
  t(3, 'Tunapoenda kulala tunaambiana ___.', 'Lala salama', ['Habari za asubuhi', 'Shikamoo']),
  t(3, 'Rafiki yako ameanguka. Unamwambia ___.', 'Pole', ['Hongera', 'Karibu']),
  t(3, 'Ukimkanyaga mtu kwa bahati mbaya unasema ___.', 'Samahani', ['Hongera', 'Marahaba']),
  t(3, 'Mtu akikwambia "Pole" unajibu ___.', 'Asante', ['Sijambo', 'Shikamoo']),
  t(4, 'Ukiambiwa "Habari za jioni?" unajibu ___.', 'Nzuri', ['Hatujambo', 'Marahaba', 'Pole']),
  t(4, 'Rafiki yako amepita mtihani. Unamwambia ___.', 'Hongera', ['Pole', 'Samahani', 'Kwaheri']),
  t(4, 'Tunapotarajia kuonana tena tunasema ___.', 'Kwaheri ya kuonana', ['Lala salama', 'Shikamoo', 'Pole sana']),
  t(5, 'Mwalimu akiingia darasani asubuhi, wanafunzi husema ___.', 'Shikamoo mwalimu / Habari za asubuhi mwalimu', ['Kwaheri mwalimu / Tutaonana kesho mwalimu', 'Lala salama mwalimu / Usiku mwema mwalimu', 'Pole mwalimu / Pole na kazi ya jana']),
  t(5, 'Wanafunzi wawili wakiambiwa "Hamjambo?" wanajibu ___.', 'Hatujambo', ['Sijambo', 'Hawajambo', 'Hajambo']),
  t(5, 'Ni lipi jibu la heshima kwa "Karibu nyumbani"?', 'Asante, nimekaribia', ['Kwaheri', 'Sijambo', 'Pole']),
]

const VIWAKILISHI3: BankQuestion[] = [
  t(1, 'Wingi wa "yeye" ni ___.', 'wao', ['sisi', 'wewe']),
  t(1, 'Wingi wa "yule" ni ___.', 'wale', ['hawa', 'yeye']),
  t(1, '___ ni mwalimu wetu. (mtu mmoja)', 'Yeye', ['Wao', 'Wale']),
  t(2, 'Umoja wa "wao" ni ___.', 'yeye', ['mimi', 'yule']),
  t(2, 'Umoja wa "wale" ni ___.', 'yule', ['yeye', 'huyu']),
  t(2, 'Mtoto ___ anacheza mpira.', 'yule', ['wale', 'wao']),
  t(3, 'Watoto ___ wanaimba.', 'wale', ['yule', 'yeye']),
  t(3, 'Andika kwa wingi: Yeye anasoma.', 'Wao wanasoma.', ['Wao anasoma.', 'Yeye wanasoma.']),
  t(3, 'Andika kwa umoja: Wao wanakula.', 'Yeye anakula.', ['Yeye wanakula.', 'Wao anakula.']),
  t(4, 'Andika kwa wingi: Mwalimu yule anafundisha.', 'Walimu wale wanafundisha.', ['Walimu yule wanafundisha.', 'Mwalimu wale anafundisha.', 'Walimu wale anafundisha.']),
  t(4, 'Andika kwa umoja: Wakulima wale wanalima.', 'Mkulima yule analima.', ['Mkulima wale analima.', 'Wakulima yule wanalima.', 'Mkulima yule wanalima.']),
  t(4, 'Chagua sentensi sahihi.', 'Wale ni wanafunzi.', ['Wale ni mwanafunzi.', 'Yule ni wanafunzi.', 'Yeye ni wanafunzi.']),
  t(5, 'Andika kwa wingi: Yeye ni daktari yule.', 'Wao ni madaktari wale.', ['Wao ni daktari yule.', 'Yeye ni madaktari wale.', 'Wao ni madaktari yule.']),
  t(5, 'Andika kwa umoja: Wao ni wapishi wale.', 'Yeye ni mpishi yule.', ['Yeye ni wapishi wale.', 'Wao ni mpishi yule.', 'Yeye ni mpishi wale.']),
  t(5, 'Kamilisha: Mtoto ___ ni mwerevu; ___ hupita mitihani.', 'yule / yeye', ['wale / wao', 'yule / wao', 'wale / yeye']),
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
  t(1, 'Soma: "Juma ana kuku watano." Juma ana kuku wangapi?', 'watano', ['wanne', 'sita']),
  t(1, 'Soma: "Leo ni Jumatatu. Tunaenda shuleni." Leo ni siku gani?', 'Jumatatu', ['Jumapili', 'Ijumaa']),
  t(1, 'Soma: "Paka wetu ni mweupe." Paka ana rangi gani?', 'nyeupe', ['nyeusi', 'kahawia']),
  ...passage(1, 'Mbuzi wa Saida', 'Saida ana mbuzi mweusi. Mbuzi huyo anapenda kula majani. Saida humpa maji kila jioni.', [
    ['Saida ana mnyama gani?', 'mbuzi', ['ng\'ombe', 'kuku']],
    ['Mbuzi anapenda kula nini?', 'majani', ['mahindi', 'nyama']],
    ['Saida humpa mbuzi maji lini?', 'kila jioni', ['kila asubuhi', 'Jumapili']],
  ]),
  ...passage(2, 'Sokoni', 'Jumamosi, Mama na Wanjiru walienda sokoni. Walinunua nyanya, vitunguu na sukuma wiki. Mama alilipa shilingi mia moja. Walirudi nyumbani kwa matatu.', [
    ['Walienda sokoni siku gani?', 'Jumamosi', ['Jumapili', 'Jumatatu']],
    ['Walinunua nini?', 'nyanya, vitunguu na sukuma wiki', ['mchele, sukari na chumvi', 'mkate, maziwa na mayai', 'unga, mafuta na majani ya chai']],
    ['Mama alilipa shilingi ngapi?', 'mia moja', ['hamsini', 'mia mbili']],
    ['Walirudi nyumbani kwa nini?', 'matatu', ['baiskeli', 'miguu']],
  ]),
  ...passage(2, 'Mwalimu Mpya', 'Leo tumepata mwalimu mpya. Jina lake ni Bi. Atieno. Anafundisha Kiswahili na Muziki. Alitufundisha wimbo mzuri wa Kenya. Sote tulifurahi sana.', [
    ['Mwalimu mpya anaitwa nani?', 'Bi. Atieno', ['Bw. Kamau', 'Bi. Neema']],
    ['Anafundisha masomo gani?', 'Kiswahili na Muziki', ['Hisabati na Sayansi', 'Kiingereza na Michezo']],
    ['Aliwafundisha nini?', 'wimbo', ['hadithi', 'mchezo']],
    ['Wanafunzi walijisikiaje?', 'walifurahi', ['walihuzunika', 'walikasirika']],
  ]),
  ...passage(3, 'Shamba la Babu', 'Babu ana shamba kubwa karibu na mto. Analima mahindi, maharagwe na viazi. Wakati wa likizo, mimi na kaka yangu Otieno tunamsaidia kupalilia. Babu hutupa miwa tunapomaliza kazi.', [
    ['Shamba la Babu liko wapi?', 'karibu na mto', ['karibu na shule', 'mjini', 'mlimani']],
    ['Babu analima mimea mingapi?', 'mitatu', ['miwili', 'minne', 'mmoja']],
    ['Watoto humsaidia Babu lini?', 'wakati wa likizo', ['kila Jumatatu', 'usiku', 'kila asubuhi']],
    ['Babu huwapa nini?', 'miwa', ['pesa', 'maziwa', 'mayai']],
  ]),
  ...passage(3, 'Siku ya Michezo', 'Shuleni kwetu tulikuwa na siku ya michezo. Baraka alishinda mbio za mita mia moja. Neema alishinda kuruka kamba. Mwalimu Mkuu aliwapa washindi vitabu na kalamu. Wazazi wengi walikuja kutazama.', [
    ['Nani alishinda mbio?', 'Baraka', ['Neema', 'Mwalimu Mkuu', 'Juma']],
    ['Neema alishinda mchezo gani?', 'kuruka kamba', ['mbio', 'mpira', 'kuogelea']],
    ['Washindi walipewa nini?', 'vitabu na kalamu', ['pesa', 'viatu', 'mipira']],
    ['Nani walikuja kutazama?', 'wazazi wengi', ['wanyama', 'madaktari', 'wageni wawili']],
  ]),
  ...passage(4, 'Kuku wa Mama', 'Mama ana kuku kumi. Kila siku, kuku sita hutaga yai moja kila mmoja. Mama huuza mayai sokoni siku ya Ijumaa. Jana, mwewe alimchukua kifaranga kimoja. Sasa Mama amejenga banda imara.', [
    ['Mama ana kuku wangapi?', 'kumi', ['sita', 'kumi na sita', 'tano']],
    ['Kuku hutaga mayai mangapi kwa siku?', 'sita', ['kumi', 'moja', 'kumi na mbili']],
    ['Mama huuza mayai lini?', 'Ijumaa', ['Jumamosi', 'Jumapili', 'kila siku']],
    ['Kwa nini Mama amejenga banda imara?', 'ili kuwalinda kuku dhidi ya mwewe', ['ili watoto wacheze ndani yake', 'ili apande mboga ndani yake', 'ili auze kuku sokoni haraka']],
  ]),
  ...passage(5, 'Kisima Kipya', 'Kijiji cha Kalawa kilikuwa na shida ya maji. Wanawake na watoto walitembea kilomita tano kuchota maji mtoni. Mwaka jana, wanakijiji walichanga pesa na kuchimba kisima. Sasa maji safi yako karibu, na watoto hufika shuleni mapema. Wanakijiji hutunza kisima kwa kukifunika kila jioni.', [
    ['Kijiji kilikuwa na shida gani?', 'ukosefu wa maji', ['ukosefu wa chakula', 'mafuriko', 'magonjwa']],
    ['Watu walitembea umbali gani kuchota maji?', 'kilomita tano', ['kilomita moja', 'mita tano', 'kilomita kumi']],
    ['Kisima kilichimbwa vipi?', 'wanakijiji walichanga pesa', ['serikali ilileta pesa', 'mvua ilikichimba', 'watoto walikichimba peke yao']],
    ['Kisima kimewasaidiaje watoto?', 'hufika shuleni mapema', ['hawaendi shuleni', 'hucheza mtoni', 'hulala sana']],
    ['Wanakijiji hutunzaje kisima?', 'kwa kukifunika kila jioni', ['kwa kukijaza takataka', 'kwa kuogelea ndani yake', 'kwa kukiacha wazi']],
  ]),
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
    ['Kwa nini hawakuvuka mto?', 'daraja liliharibika na maji yalikuwa mengi', ['Kamau alikuwa mgonjwa siku hiyo', 'walikuwa wamechoka baada ya safari', 'ilikuwa Jumapili na walienda kanisani']],
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

// ── Creative Activities ─────────────────────────────────────────────────────

const PAINTING3: BankQuestion[] = [
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
  t(4, 'Mixing blue and yellow paint gives ___.', 'green', ['red', 'orange', 'purple']),
  t(5, 'Why should we cover the desk with old newspaper before painting?', 'to keep the desk clean', ['to make the paint dry', 'to read the news', 'to make the picture bigger']),
  t(5, 'Mixing red and yellow paint gives ___.', 'orange', ['green', 'blue', 'brown']),
  t(5, 'Which group has only colours we cannot get by mixing other paints?', 'red, yellow, blue', ['green, orange, purple', 'red, green, blue', 'yellow, orange, brown']),
]

const RHYTHM3: BankQuestion[] = [
  t(1, 'We can create a simple rhythm by ___.', 'clapping', ['crying', 'sleeping']),
  t(1, 'Which one can we use to keep a beat?', 'drum', ['plate of food', 'pillow']),
  t(1, 'Stamping our feet in time to music keeps the ___.', 'beat', ['colour', 'smell']),
  t(2, 'The speed of music is called ___.', 'tempo', ['pitch', 'melody']),
  t(2, 'Which instrument do we beat?', 'drum', ['flute', 'violin']),
  t(2, 'Clap, clap, rest, clap, clap, rest. What comes next?', 'clap', ['rest', 'stamp']),
  t(3, 'Which body movement keeps a steady beat?', 'tapping your foot', ['closing your eyes', 'sitting still']),
  t(3, 'A song played very quickly has a ___ tempo.', 'fast', ['slow', 'low']),
  t(3, 'Which instrument do we shake?', 'shakers (kayamba)', ['guitar', 'flute']),
  t(4, 'Which group has only beaten instruments?', 'drum, shakers, tambourine', ['guitar, flute, drum', 'nyatiti, guitar, fiddle', 'flute, whistle, horn']),
  t(4, 'Clap, stamp, stamp, clap, stamp, stamp, clap, ___', 'stamp', ['clap', 'rest', 'snap']),
  t(4, 'A lullaby is usually sung with a ___ tempo.', 'slow', ['fast', 'running', 'loud']),
  t(5, 'The isukuti drum dance comes from which community?', 'Luhya', ['Maasai', 'Swahili', 'Kikuyu']),
  t(5, 'Why do dancers listen to the drum?', 'to move together with the beat', ['to know when to stop and rest', 'to learn the words of the song', 'to tune their voices to the drum']),
  t(5, 'Which word means music getting faster and faster?', 'speeding up the tempo', ['raising the pitch', 'singing in a round', 'humming']),
]

const MELODY3: BankQuestion[] = [
  t(1, 'A bird sings with a ___ sound.', 'high', ['low', 'heavy']),
  t(1, 'A big drum makes a ___ sound.', 'low', ['high', 'thin']),
  t(1, 'Children singing while playing feel ___.', 'happy', ['sad', 'angry']),
  t(2, 'The highness and lowness of music is called ___.', 'pitch', ['tempo', 'rhythm']),
  t(2, 'Which animal makes a low sound?', 'a lion roaring', ['a chick cheeping', 'a bird whistling']),
  t(2, 'Which instrument do we blow?', 'flute', ['drum', 'guitar']),
  t(3, 'A tune made by notes going up and down is a ___.', 'melody', ['beat', 'collage']),
  t(3, 'A song sung to make a baby sleep is a ___.', 'lullaby', ['hymn', 'anthem']),
  t(3, 'We should sing with a ___ voice, not shouting.', 'clear, pleasant', ['rough, loud', 'angry']),
  t(4, 'Which sound has the highest pitch?', 'a whistle', ['a big drum', 'a cow mooing', 'thunder']),
  t(4, 'Singing "do, re, mi, fa, so" goes ___ in pitch.', 'up', ['down', 'nowhere', 'faster']),
  t(4, 'Before singing we warm up our ___.', 'voices', ['shoes', 'books', 'desks']),
  t(5, 'Which group goes from the lowest to the highest sound?', 'big drum, man\'s voice, whistle', ['whistle, man\'s voice, big drum', 'man\'s voice, whistle, big drum', 'whistle, big drum, man\'s voice']),
  t(5, 'Songs we sing while working to make work easier are ___.', 'work songs', ['lullabies', 'hymns', 'anthems']),
  t(5, 'Humming a song means singing it with the ___.', 'mouth closed', ['mouth wide open', 'eyes closed only', 'hands']),
]

const PUSHPULL3: BankQuestion[] = [
  t(1, 'We ___ a wheelbarrow to move it forward.', 'push', ['pull', 'kick']),
  t(1, 'We ___ a door handle to open the door towards us.', 'pull', ['push', 'throw']),
  t(1, 'In tug of war, teams ___ the rope.', 'pull', ['push', 'roll']),
  t(2, 'Which one do we push?', 'a stuck car', ['a rope in tug of war', 'water from a well with a rope']),
  t(2, 'Which one do we pull?', 'a bucket from a well', ['a wheelbarrow', 'a swing from behind']),
  t(2, 'We should push and pull objects that are ___ for us.', 'not too heavy', ['very heavy', 'sharp']),
  t(3, 'When pulling a rope we should bend our ___ a little.', 'knees', ['ears', 'fingers']),
  t(3, 'Why should we not let go of the rope suddenly in tug of war?', 'the other team can fall and get hurt', ['the game will end too quickly', 'the rope will become too short', 'the teacher will choose new teams']),
  t(3, 'Which game uses pulling?', 'tug of war', ['skipping', 'hopscotch']),
  t(4, 'Two learners push each other gently, palm to palm. This builds ___.', 'strength', ['pitch', 'colour', 'tempo']),
  t(4, 'Which is a safe way to push a friend on a swing?', 'push gently from behind when they are ready', ['push very hard', 'push from the front', 'push while they are standing']),
  t(4, 'A team of 6 pulls against a team of 4. How many learners are pulling in all?', '10', ['2', '8', '24']),
  t(5, 'Which group has only pushing activities?', 'pushing a wheelbarrow, closing a door, pushing a swing', ['pulling a cart, tug of war, opening a drawer', 'pushing a wheelbarrow, tug of war, drawing water', 'pulling a rope, closing a door, pushing a swing']),
  t(5, 'Why should we warm up before pushing and pulling games?', 'to prepare our muscles and avoid injury', ['to get tired before the game begins', 'to make the rope longer and stronger', 'to show the other team how strong we are']),
  t(5, 'Which surface is safest for tug of war?', 'a flat grassy field', ['a rocky path', 'a muddy slope', 'a tarmac road']),
]

const ROUNDS3: BankQuestion[] = [
  t(1, 'In a round, we sing the ___ song.', 'same', ['different', 'silent']),
  t(1, 'In a round, groups start singing at ___ times.', 'different', ['the same', 'no']),
  t(1, 'We listen to the ___ to know when to start.', 'leader', ['wind', 'bell only']),
  t(2, 'In a two-part round, how many groups sing?', '2', ['1', '4']),
  t(2, 'Group B starts singing when Group A finishes the ___ line.', 'first', ['last', 'tenth']),
  t(2, 'Singing a round helps us to ___.', 'listen and work together', ['shout louder', 'sleep']),
  t(3, 'In a three-part round, how many groups sing?', '3', ['2', '6']),
  t(3, 'What must each group do to sing a round well?', 'keep its own part and not follow the others', ['copy the loudest group so it sounds strong', 'stop singing when the other groups start', 'sing faster than the group before it']),
  t(3, 'A round ends when ___.', 'each group finishes in turn', ['everyone stops at once', 'the leader sleeps']),
  t(4, 'A round has 4 lines. Group A sings all 4 lines once. Group B starts after line 1. How many lines has Group A sung when Group B starts?', '1', ['2', '3', '4']),
  t(4, 'Which song type is best for singing in rounds?', 'a short song with a simple tune', ['a very long story', 'a song with no tune', 'a poem we do not know']),
  t(4, 'Why must singers in a round keep the same tempo?', 'so the parts fit together', ['so they finish first', 'to be louder', 'to change the words']),
  t(5, 'Group A starts a round. Group B starts one line later. Group C starts one line after B. Which group finishes last?', 'Group C', ['Group A', 'Group B', 'all at once']),
  t(5, 'In a round of 4 lines with 2 groups starting one line apart, how many lines are sung in all?', '8', ['4', '6', '5']),
  t(5, 'Which shows good manners when singing in a round?', 'singing softly enough to hear the other groups', ['singing louder than every other group', 'laughing when another group makes a mistake', 'leaving the group before the song ends']),
]

const SKIPPING3: BankQuestion[] = [
  t(1, 'Which item is used for skipping?', 'a rope', ['a ball', 'a stick']),
  t(1, 'Learners hop using their ___.', 'legs', ['hands', 'heads']),
  t(1, 'When skipping, our ___ turn the rope.', 'arms', ['ears', 'eyes']),
  t(2, 'Hopping means jumping on ___.', 'one leg', ['both hands', 'two legs only']),
  t(2, 'Before skipping we should ___.', 'warm up', ['eat a lot', 'sleep']),
  t(2, 'We land on the ___ of our feet when skipping.', 'balls', ['heels only', 'sides']),
  t(3, 'Skipping with two friends turning a long rope is called ___ skipping.', 'group', ['single', 'water']),
  t(3, 'Which is a safe place to skip?', 'a clear, flat field', ['near broken glass', 'on the road']),
  t(3, 'Why should the rope not be too long?', 'we can trip over it', ['it becomes too light', 'it changes colour']),
  t(4, 'Jabali skipped 25 times and then 18 times. How many skips altogether?', '43', ['33', '7', '42']),
  t(4, 'Which activity makes our heart beat faster?', 'skipping', ['sitting', 'sleeping', 'reading']),
  t(4, 'After skipping we should ___ to cool down.', 'walk slowly and stretch', ['sleep on the field', 'run faster', 'drink dirty water']),
  t(5, 'Which group has only skills done with a rope?', 'skipping, swinging, jumping over', ['kicking, throwing, catching', 'swimming, diving, floating', 'reading, writing, drawing']),
  t(5, 'Kiptoo fell and hurt his knee while skipping. What should his friends do first?', 'call the teacher', ['laugh at him', 'continue playing', 'leave him alone']),
  t(5, 'What should we wear for skipping?', 'light clothes and shoes that fit', ['a long dress and slippers', 'a heavy coat', 'tight shoes']),
]

const DRIBBLING3: BankQuestion[] = [
  t(1, 'Dribbling means moving with a ___.', 'ball', ['rope', 'chair']),
  t(1, 'In football we dribble with our ___.', 'feet', ['heads', 'hands']),
  t(1, 'In basketball we dribble by bouncing the ball with our ___.', 'hand', ['knee', 'foot']),
  t(2, 'When dribbling, we keep our eyes ___.', 'up, looking where we go', ['closed', 'on the sky']),
  t(2, 'We should dribble the ball ___ to keep control.', 'close to us', ['very far away', 'into the bush']),
  t(2, 'Which ball game uses dribbling with the feet?', 'football', ['netball', 'skipping']),
  t(3, 'Dribbling around cones in and out is called ___.', 'zig-zag dribbling', ['hopping', 'rolling']),
  t(3, 'Which part of the hand is best for bouncing the ball?', 'the fingertips', ['the elbow', 'the fist']),
  t(3, 'Why should we not dribble on a rocky ground?', 'we can fall and get hurt', ['the ball will sing', 'it is too easy']),
  t(4, 'Six cones are in a line. A learner dribbles in and out of all of them. How many cones does she pass?', '6', ['5', '3', '12']),
  t(4, 'Which shows good teamwork in a dribbling game?', 'passing the ball to a free friend', ['keeping the ball always', 'kicking friends', 'hiding the ball']),
  t(4, 'Dribbling helps us to improve our ___.', 'control of the ball', ['handwriting', 'singing voice', 'painting']),
  t(5, 'Which group has only skills used in ball games?', 'dribbling, passing, shooting', ['dribbling, skipping, painting', 'passing, weaving, singing', 'shooting, rolling, hopping on a rope']),
  t(5, 'Why do we use both feet when dribbling?', 'to move the ball in any direction', ['to kick the ball as high as we can', 'to run more slowly with the ball', 'to stop other players from playing']),
  t(5, 'A ball made from waste paper and strings is a ___.', 'home-made ball', ['basketball', 'rope', 'drum']),
]

const STRINGS3: BankQuestion[] = [
  t(1, 'Name a string instrument.', 'guitar', ['drum', 'whistle']),
  t(1, 'We play a string instrument by ___ the strings.', 'plucking or bowing', ['eating', 'blowing']),
  t(1, 'Which one has strings?', 'orutu (fiddle)', ['kayamba', 'horn']),
  t(2, 'The nyatiti is a ___ instrument from Kenya.', 'string', ['blown', 'beaten']),
  t(2, 'A single-string fiddle played with a bow is the ___.', 'orutu', ['isukuti', 'kayamba']),
  t(2, 'The nyatiti comes from the ___ community.', 'Luo', ['Maasai', 'Kamba']),
  t(3, 'Which material can be used to make a simple string instrument?', 'a tin, a stick and a string', ['water and soil', 'paper and glue only']),
  t(3, 'A tight string makes a ___ sound.', 'higher', ['lower', 'silent']),
  t(3, 'The box on a string instrument that makes the sound louder is the ___.', 'sound box (resonator)', ['bow', 'handle']),
  t(4, 'Which group has only string instruments?', 'nyatiti, orutu, guitar', ['nyatiti, drum, flute', 'orutu, kayamba, horn', 'guitar, isukuti, whistle']),
  t(4, 'A bow for a fiddle is made with a stick and ___.', 'hair or strings', ['leaves', 'stones', 'feathers']),
  t(4, 'How should we care for a string instrument?', 'keep it dry and store it safely', ['leave it in the rain', 'sit on it', 'cut the strings']),
  t(5, 'Which string gives the lowest sound?', 'a thick, loose string', ['a thin, tight string', 'a short, tight string', 'a thin, short string']),
  t(5, 'Which instrument is played by plucking strings?', 'nyatiti', ['drum', 'horn', 'shaker']),
  t(5, 'Akinyi\'s home-made instrument makes no sound. What is the likely problem?', 'the string is too loose', ['the tin is shiny', 'it is too new', 'the colour is wrong']),
]

const GYM3: BankQuestion[] = [
  t(1, 'A forward roll is done on a ___.', 'soft mat or grass', ['tarmac road', 'rocky ground']),
  t(1, 'Standing on one leg without falling is called ___.', 'balancing', ['skipping', 'dribbling']),
  t(1, 'Before a forward roll we tuck our ___ in.', 'chin', ['toes', 'elbows']),
  t(2, 'In a forward roll we roll on our ___.', 'back', ['face', 'knees only']),
  t(2, 'When balancing, we stretch our arms out to ___.', 'stay steady', ['fly', 'catch a ball']),
  t(2, 'A forward roll starts from a ___ position.', 'squatting', ['lying', 'running']),
  t(3, 'Why should we tuck our chin when rolling?', 'to protect our neck', ['to see the sky', 'to roll faster']),
  t(3, 'Which surface is safest for rolling?', 'a mat', ['a cement floor', 'a gravel path']),
  t(3, 'Balancing on a log helps us to have good ___.', 'control of our body', ['handwriting', 'singing']),
  t(4, 'Which body part should NOT touch the ground first in a forward roll?', 'the top of the head', ['the hands', 'the back', 'the feet']),
  t(4, 'Halima balanced on one leg for 15 seconds, then 20 seconds. How many seconds altogether?', '35', ['5', '25', '30']),
  t(4, 'Why should one learner roll at a time?', 'to avoid bumping into each other', ['so the others can laugh and clap', 'to finish the lesson more quickly', 'so the mat stays clean and dry']),
  t(5, 'Put in order: squat, place hands, tuck chin, roll. What comes right after "place hands"?', 'tuck chin', ['squat', 'roll', 'stand up']),
  t(5, 'Which group has only balancing activities?', 'standing on one leg, walking on a line, holding a still pose', ['rolling, skipping, dribbling', 'hopping, running, swimming', 'standing on one leg, kicking, painting']),
  t(5, 'Which shows safety during forward rolls?', 'clearing the mat of objects before rolling', ['rolling with a pencil in your pocket', 'rolling on stones', 'pushing a friend who is rolling']),
]

const WATER3: BankQuestion[] = [
  t(1, 'Children should swim only when an ___ is watching.', 'adult', ['animal', 'stranger']),
  t(1, 'Which is a safe place to learn swimming?', 'a swimming pool with a trainer', ['a deep river near the farm', 'a dam where cattle drink', 'the sea when no one is near']),
  t(1, 'We should not play near ___ water.', 'deep', ['drinking', 'warm']),
  t(2, 'Before entering a pool we should ___.', 'take a shower', ['eat a lot', 'run and jump']),
  t(2, 'A float helps us to ___ in water.', 'stay up', ['sink', 'run']),
  t(2, 'Which is NOT safe near water?', 'pushing others into water', ['walking slowly', 'listening to the trainer']),
  t(3, 'What should you do if you see someone drowning?', 'shout for an adult to help', ['jump into the water yourself', 'run home without telling anyone', 'throw stones into the water']),
  t(3, 'Why should we not run around a swimming pool?', 'the floor is slippery and we can fall', ['running makes the pool water dirty', 'the pool water will splash out', 'the trainer cannot see us running']),
  t(3, 'Which item can be thrown to help someone in water?', 'a float or rope', ['a stone', 'a book']),
  t(4, 'Why should we not swim soon after a big meal?', 'we may get stomach cramps', ['the water becomes cold', 'we grow taller', 'the pool closes']),
  t(4, 'Which group has only water safety rules?', 'swim with an adult, do not run, obey the trainer', ['swim alone, run, dive anywhere', 'swim at night, push friends, obey the trainer', 'do not run, swim alone, dive in shallow water']),
  t(4, 'Blowing bubbles in water helps us learn to ___.', 'breathe out under water', ['drink water', 'float on our back', 'sink']),
  t(5, 'Mutua\'s friends want to swim in a flooded river after the rains. What should he say?', '"No, the water is fast and deep. It is not safe."', ['"Let us race across."', '"Let us dive in first."', '"Let us go without telling anyone."']),
  t(5, 'Which is the safest way to help a friend who is struggling in water?', 'throw a float and call an adult', ['jump in and hold them', 'throw a stone near them', 'walk away']),
  t(5, 'Why is swimming in a pool safer than in a river?', 'the depth is known and a trainer watches', ['pool water is warmer than river water', 'pools are always deeper than rivers', 'rivers have no fish to help swimmers']),
]

const ANTHEM3: BankQuestion[] = [
  t(1, 'The National Anthem is a ___ to our country.', 'prayer', ['game', 'story']),
  t(1, 'We stand ___ when singing the National Anthem.', 'still and upright', ['running', 'sitting']),
  t(1, 'Our National Anthem asks God to bless ___.', 'Kenya', ['our toys', 'the market']),
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
  t(5, 'The anthem asks that we live in unity, peace and ___.', 'liberty', ['hunger', 'fear', 'anger']),
]

// ── CRE ─────────────────────────────────────────────────────────────────────

const CREATION3: BankQuestion[] = [
  t(1, 'Who created the world?', 'God', ['man', 'animals']),
  t(1, 'God created me in His own ___.', 'likeness', ['picture', 'house']),
  t(1, 'The first man God created was ___.', 'Adam', ['Noah', 'Moses']),
  t(2, 'Adam and Eve lived in the garden of ___.', 'Eden', ['Egypt', 'Nineveh']),
  t(2, 'The first woman God created was ___.', 'Eve', ['Mary', 'Sarah']),
  t(2, 'God rested on the ___ day.', 'seventh', ['first', 'third']),
  t(3, 'How can we care for God\'s creation?', 'by planting trees', ['by burning forests', 'by littering']),
  t(3, 'God created light on the ___ day.', 'first', ['seventh', 'sixth']),
  t(3, 'God made man from the ___ of the ground.', 'dust', ['water', 'trees']),
  t(4, 'On which day did God create human beings?', 'the sixth day', ['the first day', 'the third day', 'the seventh day']),
  t(4, 'Which of these did God create?', 'the sun, moon and stars', ['houses and cars', 'shoes and bags', 'phones and radios']),
  t(4, 'Adam and Eve were sent out of the garden because they ___.', 'disobeyed God', ['were hungry', 'were tired', 'wanted to travel']),
  t(5, 'Why should we take care of animals?', 'God created them and gave us the duty to care for them', ['they will work harder for us if they are fed well', 'they are dangerous if they are not kept happy', 'they belong to the government and must be guarded']),
  t(5, 'Which shows thanking God for His creation?', 'praying and singing praises', ['wasting food', 'cutting all trees', 'polluting rivers']),
  t(5, 'God gave Adam the work of ___ the animals.', 'naming', ['selling', 'chasing', 'counting']),
]

const FAMILY3: BankQuestion[] = [
  t(1, 'God gave us a ___ to love and care for us.', 'family', ['market', 'forest']),
  t(1, 'My father\'s mother is my ___.', 'grandmother', ['aunt', 'sister']),
  t(1, 'We should ___ our parents.', 'obey', ['insult', 'ignore']),
  t(2, 'Name a member of the extended family.', 'grandmother', ['teacher', 'pastor']),
  t(2, 'My mother\'s brother is my ___.', 'uncle', ['cousin', 'nephew']),
  t(2, 'A family made of father, mother and children is a ___ family.', 'nuclear', ['extended', 'church']),
  t(3, 'My uncle\'s children are my ___.', 'cousins', ['grandparents', 'aunts']),
  t(3, 'Which shows love in a family?', 'helping with house chores', ['fighting with siblings', 'hiding food']),
  t(3, 'Christian families pray together to ___.', 'thank God and ask for His help', ['finish their food quickly', 'show neighbours they are rich', 'make the house quiet at night']),
  t(4, 'Which commandment teaches us about parents?', 'Honour your father and mother', ['Do not steal', 'Do not tell lies', 'Keep the Sabbath holy']),
  t(4, 'Grandparents, uncles, aunts and cousins form the ___ family.', 'extended', ['nuclear', 'school', 'small']),
  t(4, 'Jesus obeyed His parents Mary and ___.', 'Joseph', ['Moses', 'David', 'Peter']),
  t(5, 'Your little sister is sick and Mother is busy. What should you do?', 'take care of her and call Mother', ['go out to play with your friends', 'give her some of your sweets only', 'wait until Mother finishes her work']),
  t(5, 'Which group has only members of the extended family?', 'grandfather, aunt, cousin', ['father, mother, brother', 'teacher, pastor, doctor', 'aunt, neighbour, friend']),
  t(5, 'Why should children respect the elderly in the family?', 'God wants us to honour them for their care and wisdom', ['they will give us sweets and money if we obey', 'they are stronger than everyone else at home', 'they will punish us if we do not obey them']),
]

const BIBLE3: BankQuestion[] = [
  t(1, '___ saw the burning bush.', 'Moses', ['Noah', 'Jonah']),
  t(1, 'Who built the ark?', 'Noah', ['Moses', 'David']),
  t(1, 'Which shepherd boy bravely defeated the giant Goliath?', 'David', ['Saul', 'Daniel']),
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
  t(5, 'Which story shows God healing a sick person?', 'Naaman washing in River Jordan', ['Noah building the ark', 'David and Goliath', 'Jonah going to Tarshish']),
  t(5, 'The three Hebrew men were Shadrach, Meshach and ___.', 'Abednego', ['Daniel', 'Samuel', 'Elisha']),
]

const JESUS3: BankQuestion[] = [
  t(1, 'Jesus was born in ___.', 'Bethlehem', ['Nineveh', 'Egypt']),
  t(1, 'The mother of Jesus was ___.', 'Mary', ['Eve', 'Sarah']),
  t(1, 'We celebrate the birth of Jesus on ___.', 'Christmas Day', ['Labour Day', 'Madaraka Day']),
  t(2, 'Baby Jesus was laid in a ___.', 'manger', ['boat', 'basket']),
  t(2, 'Jesus grew up in the town of ___.', 'Nazareth', ['Nineveh', 'Babylon']),
  t(2, 'The wise men followed a ___ to find baby Jesus.', 'star', ['river', 'lion']),
  t(3, 'Jesus turned water into ___ at a wedding in Cana.', 'wine', ['milk', 'oil']),
  t(3, 'Jesus fed five thousand people with five loaves and two ___.', 'fish', ['goats', 'eggs']),
  t(3, 'The shepherds heard about the birth of Jesus from ___.', 'angels', ['kings', 'soldiers']),
  t(4, 'Jesus calmed a storm on the ___.', 'lake', ['mountain', 'desert', 'road']),
  t(4, 'Who gave Jesus the five loaves and two fish?', 'a young boy', ['a king', 'a soldier', 'a shepherd']),
  t(4, 'At the age of twelve Jesus was found in the ___ in Jerusalem.', 'Temple', ['market', 'river', 'field']),
  t(5, 'Jesus said, "Let the little children come to me." This shows that Jesus ___.', 'loves children', ['was tired', 'wanted to play', 'was angry']),
  t(5, 'Which shows a miracle of Jesus?', 'healing the blind man', ['building the ark', 'David and Goliath', 'washing in River Jordan']),
  t(5, 'Five loaves and two fish fed many people, with ___ baskets left over.', 'twelve', ['two', 'five', 'seven']),
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
  t(4, 'Which is the best way to use our free time?', 'helping at home and playing safely', ['sleeping all day long', 'watching TV until night', 'walking alone on the road']),
  t(4, 'The prayer Jesus taught His disciples is called ___.', 'the Lord\'s Prayer', ['the National Anthem', 'a lullaby', 'a riddle']),
  t(4, 'Which is a way of caring for the sick?', 'visiting and praying for them', ['keeping away until they are well', 'making noise near their bed', 'eating their food for them']),
  t(5, 'Wekesa found a wallet on the way to church. What should he do?', 'return it to the owner or give it to an elder', ['keep the money and throw the wallet away', 'buy sweets for his friends with the money', 'hide it at home until someone asks']),
  t(5, 'Which group shows only good choices?', 'praying, sharing, obeying', ['lying, sharing, praying', 'stealing, obeying, praying', 'fighting, sharing, lying']),
  t(5, 'Why do Christians thank God before meals?', 'to show gratitude for the food', ['to make the food hot', 'to wait for visitors', 'to finish quickly']),
]

export const GRADE3_MORE_GENERATORS: Record<string, Generator> = {
  'tk-tahajia': tahajia,
}

export const GRADE3_MORE_BANKS: Record<string, BankQuestion[]> = {
  'tk-maamkuzi': MAAMKUZI3,
  'tk-msamiati': MSAMIATI3,
  'tk-sauti': SAUTI3,
  'tk-ufahamu': UFAHAMU3,
  'tk-viwakilishi': VIWAKILISHI3,
  'tk-ngeli': NGELI3,
  'tk-kanusha': KANUSHA3,
  'tk-kinyume': KINYUME3,
  'tc-painting': PAINTING3,
  'tc-rhythm': RHYTHM3,
  'tc-melody': MELODY3,
  'tc-pushpull': PUSHPULL3,
  'tc-rounds': ROUNDS3,
  'tc-skipping': SKIPPING3,
  'tc-dribbling': DRIBBLING3,
  'tc-strings': STRINGS3,
  'tc-gym': GYM3,
  'tc-water': WATER3,
  'tc-anthem': ANTHEM3,
  'tr-creation': CREATION3,
  'tr-family': FAMILY3,
  'tr-bible': BIBLE3,
  'tr-jesus': JESUS3,
  'tr-living': LIVING3,
}
