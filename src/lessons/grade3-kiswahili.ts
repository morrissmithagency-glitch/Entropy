// Masomo ya Kiswahili, Gredi ya 3. Yameandikwa kwa Kiswahili rahisi ili mwanafunzi ajifunze
// lugha anaposoma somo.
import type { Lesson } from './types'

export const KISWAHILI3_LESSONS: Record<string, Lesson> = {
  'tk-maamkuzi': {
    intro: 'Tunasalimiana na kuagana kwa adabu. Kila salamu ina jibu lake.',
    steps: [
      {
        title: 'Kusalimia wakubwa',
        text: 'Mtoto humsalimia mzee kwa kusema "Shikamoo". Mzee hujibu "Marahaba".',
        example: ['Shikamoo, bibi! → Marahaba, mjukuu wangu.'],
      },
      {
        title: 'Hujambo na hamjambo',
        text: 'Mtu mmoja: "Hujambo?" Jibu: "Sijambo." Watu wengi: "Hamjambo?" Jibu: "Hatujambo."',
        example: ['Hujambo? → Sijambo.', 'Hamjambo? → Hatujambo.'],
      },
      {
        title: 'Maneno ya adabu',
        text: 'Asante tunapopewa kitu, nalo hujibiwa "Karibu". Pole mtu akiumia. Samahani tukimkosea mtu. Hongera mtu akifanikiwa.',
      },
      {
        title: 'Kuagana',
        text: 'Tunaagana kwa "Kwaheri" au "Kwaheri ya kuonana". Usiku tunasema "Lala salama" au "Usiku mwema".',
      },
    ],
    remember: 'Shikamoo → Marahaba. Hujambo → Sijambo. Hamjambo → Hatujambo. Asante → Karibu.',
  },
  'tk-msamiati': {
    intro: 'Msamiati ni maneno tunayojua. Tukijua maneno mengi, tunazungumza vizuri.',
    steps: [
      {
        title: 'Vifaa na kazi zake',
        text: 'Ufagio hutumika kufagia. Kifyekeo hutumika kufyeka nyasi. Dodoki hutumika kujisugua mwili tunapooga. Shoka hukata kuni.',
      },
      {
        title: 'Watu na kazi zao',
        text: 'Mwalimu hufundisha. Daktari hutibu wagonjwa. Dobi hufua nguo. Seremala hutengeneza meza na viti.',
      },
      {
        title: 'Uzalendo',
        text: 'Tunaipenda Kenya. Bendera yetu ina rangi nne: nyeusi kwa watu, nyekundu kwa damu ya mashujaa, kijani kwa ardhi yenye rutuba, na nyeupe kwa amani.',
      },
      {
        title: 'Miezi ya mwaka',
        text: 'Mwaka una miezi kumi na miwili, kuanzia Januari hadi Desemba.',
        example: ['Januari, Februari, Machi, Aprili, Mei, Juni,', 'Julai, Agosti, Septemba, Oktoba, Novemba, Desemba'],
      },
    ],
    remember: 'Jifunze kifaa pamoja na kazi yake, na mtu pamoja na kazi yake.',
  },
  'tk-sauti': {
    intro: 'Herufi mbili zikikaa pamoja hutoa sauti moja mpya.',
    steps: [
      {
        title: 'ch, sh na ny',
        text: 'Sikiliza sauti mwanzoni mwa neno.',
        example: ['ch: chai, chakula, chumba', 'sh: shamba, shule, shati', 'ny: nyumba, nyanya, nyota'],
      },
      {
        title: "ng' na ng",
        text: "ng' (yenye ritifaa) ni sauti ya puani, kama katika ng'ombe. ng bila ritifaa ni kama katika ngoma.",
        example: ["ng': ng'ombe, ng'ambo", 'ng: ngoma, nguo'],
      },
      {
        title: 'dh, th na gh',
        text: 'Sauti hizi zinapatikana katika maneno mengi ya Kiswahili, hasa yaliyotoka Kiarabu.',
        example: ['dh: dhahabu, dhoruba', 'th: thelathini, thamani', 'gh: ghali, ghorofa'],
      },
    ],
    remember: "Herufi mbili, sauti moja: ch, sh, ny, ng', dh, th, gh.",
  },
  'tk-ufahamu': {
    intro: 'Kusoma kwa ufahamu ni kusoma hadithi na kuelewa inachosema.',
    steps: [
      {
        title: 'Soma maswali kwanza',
        text: 'Ukisoma maswali kwanza, unajua utafute nini katika hadithi.',
      },
      {
        title: 'Tafuta maneno yale yale',
        text: 'Majibu mengi yamo katika hadithi. Tafuta maneno ya swali katika hadithi, kisha soma sentensi hiyo yote.',
        visual: { kind: 'passage', title: 'Shambani', text: 'Asubuhi, Baraka alienda shambani na baba yake. Walipanda mahindi na maharagwe.' },
        example: ['Walipanda nini? → mahindi na maharagwe'],
      },
      {
        title: 'Fikiri kwa nini',
        text: 'Majibu mengine hayajaandikwa. Tumia dalili za hadithi kujua jibu.',
      },
    ],
    remember: 'Soma maswali kwanza, kisha tafuta maneno yale yale katika hadithi.',
  },
  'tk-tahajia': {
    intro: 'Tahajia ni kuandika neno kwa herufi sahihi, kwa mpangilio sahihi.',
    steps: [
      {
        title: 'Silabi',
        text: 'Maneno ya Kiswahili hujengwa kwa silabi. Tamka neno polepole, silabi moja moja.',
        example: ['ka - la - mu → kalamu', 'shu - le → shule'],
      },
      {
        title: 'Panga herufi',
        text: 'Ukipewa herufi zilizochanganyika, tafuta silabi unazozijua kwanza, kisha ziunganishe.',
        example: ['u - k - u - k → kuku'],
      },
    ],
    remember: 'Tamka neno polepole, silabi moja moja, kisha liandike.',
  },
  'tk-viwakilishi': {
    intro: 'Yeye na yule ni kwa mtu mmoja. Wao na wale ni kwa watu wengi.',
    steps: [
      {
        title: 'Yeye na wao',
        text: 'Yeye ni mtu mmoja. Wao ni watu wengi. Kitenzi pia hubadilika.',
        example: ['Yeye anasoma. → Wao wanasoma.', 'Yeye analala. → Wao wanalala.'],
      },
      {
        title: 'Yule na wale',
        text: 'Yule humwonyesha mtu mmoja aliye mbali. Wale huwaonyesha watu wengi walio mbali.',
        example: ['Mtoto yule anacheza. → Watoto wale wanacheza.'],
      },
      {
        title: 'Badilisha kila neno',
        text: 'Ukibadilisha kwenda wingi, badilisha nomino, kionyeshi na kitenzi vyote.',
        example: ['Mwalimu yule anafundisha.', '→ Walimu wale wanafundisha.'],
      },
    ],
    remember: 'Mmoja: yeye, yule, a-. Wengi: wao, wale, wa-.',
  },
  'tk-ngeli': {
    intro: 'Maneno ya ngeli ya LI-YA hutumia "hili" kwa kimoja na "haya" kwa vingi.',
    steps: [
      {
        title: 'Hili kwa umoja',
        text: 'Kitu kimoja cha ngeli hii huchukua hili, na kitenzi huanza na li-.',
        example: ['Yai hili limechemka.', 'Jani hili ni kijani.'],
      },
      {
        title: 'Haya kwa wingi',
        text: 'Wingi huongeza ma- mwanzoni. Hutumia haya, na kitenzi huanza na ya-.',
        example: ['Mayai haya yamechemka.', 'Majani haya ni kijani.'],
      },
      {
        title: 'Maneno yanayobadilika zaidi',
        text: 'Maneno machache hubadilika zaidi ya kuongeza ma-.',
        example: ['jiwe → mawe', 'jicho → macho'],
      },
    ],
    remember: 'Umoja: hili, li-. Wingi: ma-, haya, ya-.',
  },
  'tk-kanusha': {
    intro: 'Kukanusha ni kubadilisha sentensi iwe ya kukataa.',
    steps: [
      {
        title: 'Wakati uliopo',
        text: 'Ondoa -na-, ongeza ha- (au si- kwa mimi), na mwisho -a huwa -i.',
        example: ['Ninacheza → Sichezi.', 'Anasoma → Hasomi.', 'Tunaimba → Hatuimbi.'],
      },
      {
        title: 'Wakati ujao',
        text: 'Weka ha- au si- mwanzoni; -ta- inabaki.',
        example: ['Nitakunywa → Sitakunywa.', 'Atasafiri → Hatasafiri.'],
      },
      {
        title: 'Wakati uliopita',
        text: '-li- huwa -ku-, na ha- au si- huwekwa mwanzoni.',
        example: ['Alienda → Hakuenda.', 'Tulikula → Hatukula.', 'Walicheza → Hawakucheza.'],
      },
    ],
    remember: 'Uliopo: -na- huondoka, -a huwa -i. Ujao: -ta- inabaki. Uliopita: -li- huwa -ku-.',
  },
  'tk-kinyume': {
    intro: 'Kinyume cha neno ni neno lenye maana iliyo tofauti kabisa.',
    steps: [
      {
        title: 'Vinyume vya maneno',
        text: 'Kila neno lina kinyume chake.',
        example: ['juu → chini', 'kubwa → ndogo', 'cheka → lia', 'safi → chafu'],
      },
      {
        title: 'Vitendo vinavyorudi',
        text: 'Vitenzi vingi vina kinyume chake.',
        example: ['nunua → uza', 'peleka → leta', 'ingia → toka', 'fungua → funga'],
      },
      {
        title: 'Kinyume katika sentensi',
        text: 'Badilisha neno moja tu, na sentensi nyingine ibaki vile vile.',
        example: ['Mama amenunua nguo. → Mama ameuza nguo.'],
      },
    ],
    remember: 'Badilisha neno moja kuwa kinyume chake; sentensi nyingine ibaki vile vile.',
  },
}
