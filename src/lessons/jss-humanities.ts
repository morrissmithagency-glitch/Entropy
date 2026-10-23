// Grades 7–9 Social Studies, Creative Arts and Sports, and CRE lessons.
// Social Studies topics change focus each year, so each lesson has a step per grade.
import type { Lesson } from './types'

export const JSS_SOCIAL_LESSONS: Record<string, Lesson> = {
  'jo-maps': {
    intro: 'Maps, photographs and graphs show the world in ways words cannot.',
    steps: [
      { title: 'Scale and direction (Grade 7)', text: 'Scale links map distance to real distance. Bearings are measured clockwise from north: east is 090°, south 180°.', example: ['1 : 50 000 → 4 cm = 2 km'] },
      { title: 'Contours (Grade 8)', text: 'Contours join places of equal height. Close contours show steep slopes; far apart, gentle slopes.' },
      { title: 'Photographs and statistics (Grade 9)', text: 'Ground, oblique and vertical aerial photographs give different views. Bar graphs compare, line graphs show change, pie charts show parts.' },
    ],
    remember: 'Eastings before northings; close contours mean steep.',
  },
  'jo-earth': {
    intro: 'The earth\'s movements and inner forces shape our days, seasons and landscapes.',
    steps: [
      { title: 'The solar system (Grade 7)', text: 'Rotation causes day and night; revolution around the sun takes a year. 15° of longitude = 1 hour.' },
      { title: 'Landforms (Grade 8)', text: 'Faulting made the Rift Valley, volcanoes made Mount Kenya, and weathering and erosion wear rocks down.' },
      { title: 'Mining and energy (Grade 9)', text: 'Kenya mines soda ash at Magadi and titanium in Kwale, and gets power from geothermal and hydroelectric sources.' },
    ],
    remember: 'Rotation gives days; revolution gives years.',
  },
  'jo-weather': {
    intro: 'Weather changes daily; climate is the pattern over many years.',
    steps: [
      { title: 'Weather and climate (Grade 7)', text: 'A barometer measures pressure, an anemometer wind speed and a hygrometer humidity. Temperature falls about 6 °C per 1000 m of height.' },
      { title: 'Climate change (Grade 8)', text: 'Burning fuels and cutting forests add greenhouse gases. Planting trees and using clean energy help.' },
      { title: 'World climatic regions (Grade 9)', text: 'Equatorial (hot and wet), savannah (wet and dry seasons), desert (very dry), Mediterranean (dry summers, wet winters).' },
    ],
    remember: 'Weather is today; climate is the long-term pattern.',
  },
  'jo-history': {
    intro: 'History helps us understand how our world came to be.',
    steps: [
      { title: 'Early civilisations (Grade 7)', text: 'Egypt grew along the Nile; Kush worked iron; Great Zimbabwe built stone walls; Swahili towns traded across the Indian Ocean.' },
      { title: 'Colonialism and independence (Grade 8)', text: 'European powers divided Africa at the Berlin Conference. Africans resisted, and Kenya gained independence in 1963.' },
      { title: 'International relations (Grade 9)', text: 'After two world wars, nations formed the United Nations (1945) to keep peace. The African Union followed in 2002.' },
    ],
    remember: 'Kenya became independent on 12th December 1963.',
  },
  'jo-resources': {
    intro: 'Natural resources are gifts we must use wisely and share fairly.',
    steps: [
      { title: 'Resources in Africa (Grade 7)', text: 'Renewable resources (forests, water, wildlife) can be replaced. Non-renewable ones (oil, gold) cannot.' },
      { title: 'Agriculture and industry (Grade 8)', text: 'Irrigation schemes like Mwea grow rice. Industries add value to raw materials and create jobs.' },
      { title: 'Tourism, fishing and forestry (Grade 9)', text: 'Ecotourism protects nature while earning income. Overfishing and logging must be controlled.' },
    ],
    remember: 'Use today, conserve for tomorrow.',
  },
  'jo-economy': {
    intro: 'Trade and transport connect people and help economies grow.',
    steps: [
      { title: 'Trade and transport (Grade 7)', text: 'Air is fastest; water is cheapest for bulky goods; pipelines carry oil. Mobile money speeds up trade.' },
      { title: 'Regional trade (Grade 8)', text: 'Blocs such as the EAC, COMESA and AfCFTA reduce barriers between member countries.' },
      { title: 'Globalisation (Grade 9)', text: 'The world\'s economies are linked. Kenya exports tea, flowers and coffee, and imports fuel and machinery.' },
    ],
    remember: 'Exports earn; imports cost.',
  },
  'jo-governance': {
    intro: 'Good governance means leaders serve the people under the law.',
    steps: [
      { title: 'The Constitution (Grade 7)', text: 'The Constitution of Kenya (2010) is the supreme law. Chapter Four is the Bill of Rights.' },
      { title: 'Democracy and devolution (Grade 8)', text: 'Power is shared between the national government and 47 counties. The IEBC runs elections.' },
      { title: 'International organisations (Grade 9)', text: 'The UN (New York), AU (Addis Ababa) and EAC (Arusha) help nations cooperate. UNEP is based in Nairobi.' },
    ],
    remember: 'No one is above the law.',
  },
  'jo-citizenship': {
    intro: 'Good citizens know their rights and carry out their responsibilities.',
    steps: [
      { title: 'Rights and duties (Grade 7)', text: 'Every Kenyan has rights such as education and expression, and duties such as obeying laws and paying taxes.' },
      { title: 'Peace (Grade 8)', text: 'Conflicts are solved peacefully by negotiation, mediation and arbitration.' },
      { title: 'Global citizenship (Grade 9)', text: 'Global citizens respect all cultures, protect the environment and stand for fairness.' },
    ],
    remember: 'Rights come with responsibilities.',
  },
}

export const JSS_CREATIVE_LESSONS: Record<string, Lesson> = {
  'jc-visual': {
    intro: 'Visual art uses line, shape, colour and texture to share ideas and feelings.',
    steps: [
      { title: 'Colour', text: 'Primary colours: red, yellow, blue. Complementary colours sit opposite on the colour wheel. Add white for a tint, black for a shade.' },
      { title: 'Elements and principles', text: 'Elements are line, shape, colour, texture, form and space. Principles include balance, contrast and emphasis.' },
      { title: 'Perspective', text: 'Objects look smaller further away; lines meet at a vanishing point on the horizon.' },
    ],
    remember: 'Tint adds white; shade adds black.',
  },
  'jc-crafts': {
    intro: 'Crafts turn simple materials into useful and beautiful objects.',
    steps: [
      { title: 'Fabric crafts', text: 'Batik uses wax to resist dye; tie and dye ties cloth before dyeing; weaving interlaces threads on a loom.' },
      { title: 'Clay', text: 'Clay is shaped by pinching, coiling or slabs, dried, then fired in a kiln.' },
      { title: 'Design', text: 'Logos and posters should be simple, clear and easy to remember.' },
    ],
    remember: 'Wax resists dye.',
  },
  'jc-music': {
    intro: 'Music has its own written language of notes, rhythms and keys.',
    steps: [
      { title: 'Note values', text: 'Semibreve 4 beats, minim 2, crotchet 1, quaver ½.' },
      { title: 'Scales and keys', text: 'A major scale has semitones between notes 3–4 and 7–8. G major has one sharp (F#); F major one flat (B♭).' },
      { title: 'Terms', text: 'Allegro means fast; adagio slow; forte loud; piano soft.' },
      { title: 'Kenyan instruments', text: 'Nyatiti (Luo lyre), obokano (Abagusii lyre), isukuti (Luhya drums).' },
    ],
    remember: 'Semibreve 4, minim 2, crotchet 1, quaver ½.',
  },
  'jc-performing': {
    intro: 'Dance and drama tell stories with the body and voice.',
    steps: [
      { title: 'Kenyan dances', text: 'Isukuti (Luhya), adumu (Maasai), mwomboko (Kikuyu), chakacha (coast).' },
      { title: 'Drama terms', text: 'A monologue is one person speaking; a dialogue is two or more. Props and costumes support the story.' },
      { title: 'On stage', text: 'Face the audience, speak clearly and stay in character.' },
    ],
    remember: 'Be seen, be heard, stay in character.',
  },
  'jc-athletics': {
    intro: 'Athletics tests speed, strength and endurance, and Kenya is famous for it.',
    steps: [
      { title: 'Events', text: 'Track: sprints, middle and long distance, relays, steeplechase. Field: jumps and throws.' },
      { title: 'Rules', text: 'Starting early is a false start. In relays, pass the baton inside the changeover zone.' },
      { title: 'Training', text: 'Warm up, train regularly, rest and eat well. High altitude helps endurance.' },
    ],
    remember: 'Warm up before, cool down after.',
  },
  'jc-ballgames': {
    intro: 'Ball games build teamwork, skill and fair play.',
    steps: [
      { title: 'Skills', text: 'Football: dribbling, passing, heading. Netball: passing and footwork. Volleyball: serving, setting, spiking.' },
      { title: 'Rules', text: 'Football has offside; netball allows 3 seconds with the ball; basketball forbids travelling.' },
      { title: 'Teamwork', text: 'Move into space, communicate and support teammates.' },
    ],
    remember: 'Pass, move and talk.',
  },
  'jc-gym': {
    intro: 'Gymnastics and swimming build strength, balance and confidence, safely.',
    steps: [
      { title: 'Gymnastics', text: 'Forward and backward rolls, cartwheels and handstands, always on mats with a spotter.' },
      { title: 'Swimming strokes', text: 'Front crawl, breaststroke, backstroke and butterfly.' },
      { title: 'Water safety', text: 'Never swim alone, swim where a lifeguard watches, and reach or throw to help, don\'t jump in.' },
    ],
    remember: 'Mats for gym, a buddy for swimming.',
  },
  'jc-appreciation': {
    intro: 'Appreciating art and sport helps us value creativity and talent, including our own.',
    steps: [
      { title: 'Critique', text: 'Describe what you see, analyse how it is made, interpret its meaning, then judge it.' },
      { title: 'Careers', text: 'Designers, musicians, curators, coaches and physiotherapists turn creative and sports talents into work.' },
      { title: 'Respect', text: 'Respect copyright, celebrate others\' work and show good sportsmanship.' },
    ],
    remember: 'Describe, analyse, interpret, judge.',
  },
}

export const JSS_CRE_LESSONS: Record<string, Lesson> = {
  'jr-bible': {
    intro: 'The Bible is a library of 66 books that Christians read as God\'s word.',
    steps: [
      { title: 'Two testaments', text: 'The Old Testament has 39 books, mostly in Hebrew. The New Testament has 27, written in Greek.' },
      { title: 'Divisions', text: 'Law, history, poetry and prophets in the Old Testament; gospels, Acts, letters and Revelation in the New.' },
      { title: 'Reading well', text: 'Read a passage in context and compare it with other passages.' },
    ],
    remember: '39 + 27 = 66 books.',
  },
  'jr-creation': {
    intro: 'The creation stories teach that the world is good and people are made in God\'s image.',
    steps: [
      { title: 'Creation', text: 'God created the world in six days and rested on the seventh. People were made in His image and given care of creation.' },
      { title: 'The fall', text: 'Adam and Eve disobeyed God, which broke their friendship with Him.' },
      { title: 'God\'s care', text: 'God still cared for them and promised a saviour.' },
    ],
    remember: 'Everyone is made in God\'s image and deserves respect.',
  },
  'jr-ot': {
    intro: 'Old Testament leaders and prophets showed faith, courage and a love of justice.',
    steps: [
      { title: 'Leaders', text: 'Abraham received God\'s promise; Moses led the Exodus and received the Law; David and Solomon were kings.' },
      { title: 'Prophets', text: 'Elijah stood for the true God; Amos spoke against cheating the poor; Jeremiah promised a new covenant.' },
      { title: 'Covenants', text: 'God made covenants with Noah (rainbow), Abraham and Moses (the Ten Commandments).' },
    ],
    remember: 'The prophets called for faith and fairness.',
  },
  'jr-jesus': {
    intro: 'Jesus taught about God\'s love through words, parables and kind actions.',
    steps: [
      { title: 'Teachings', text: 'The Sermon on the Mount includes the Beatitudes and the Lord\'s Prayer.' },
      { title: 'Parables', text: 'The Good Samaritan teaches love for all; the Prodigal Son, forgiveness; the Talents, using our gifts.' },
      { title: 'Miracles', text: 'Jesus calmed a storm, fed five thousand people and healed the sick.' },
    ],
    remember: 'Love God and love your neighbour.',
  },
  'jr-passion': {
    intro: 'Holy Week and Easter are the centre of the Christian year.',
    steps: [
      { title: 'Holy Week', text: 'Palm Sunday, the Last Supper, prayer in Gethsemane and Good Friday.' },
      { title: 'Easter', text: 'Jesus rose from the dead on Easter Sunday, giving Christians hope of new life.' },
      { title: 'Ascension', text: 'Forty days later Jesus was taken up into heaven.' },
    ],
    remember: 'Easter brings hope of new life.',
  },
  'jr-church': {
    intro: 'The church began at Pentecost and still serves communities today.',
    steps: [
      { title: 'Pentecost', text: 'The Holy Spirit came upon the disciples, and Peter preached to the crowds.' },
      { title: 'Gifts and fruit', text: 'Gifts of the Spirit include wisdom and teaching. The fruit includes love, joy, peace and patience.' },
      { title: 'The church today', text: 'Churches run schools and hospitals, help the needy and promote peace.' },
    ],
    remember: 'Love, joy, peace, patience, kindness.',
  },
  'jr-ethics': {
    intro: 'Christian values guide how we act at school, at home and in the community.',
    steps: [
      { title: 'Values', text: 'Integrity, diligence, responsibility, tolerance and stewardship.' },
      { title: 'Choices', text: 'Say no to cheating, bribes and drugs. Ask trusted adults for help.' },
      { title: 'Leisure', text: 'Use free time well: reading, sports, music and helping others.' },
    ],
    remember: 'Do what is right, even when no one is watching.',
  },
}
