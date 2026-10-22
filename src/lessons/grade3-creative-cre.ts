// Grade 3 Creative Activities and CRE lessons.
import type { Lesson } from './types'

export const CREATIVE3_LESSONS: Record<string, Lesson> = {
  'tc-painting': {
    intro: 'Painting and craft let us show our ideas with colour, shapes and materials.',
    steps: [
      {
        title: 'Tools',
        text: 'We paint with a brush and mix paints on a palette. We draw with a pencil and colour with crayons.',
      },
      {
        title: 'Mixing colours',
        text: 'Red, yellow and blue are the colours we start with. Mixing two of them makes a new colour.',
        example: ['blue + yellow = green', 'red + yellow = orange', 'red + blue = purple'],
      },
      {
        title: 'Craft',
        text: 'A collage is made by sticking materials like seeds and paper together. Clay is used for modelling. Twisting fibres makes rope; weaving makes baskets.',
        example: ['Cover the desk with old newspaper and wash brushes after painting.'],
      },
    ],
    remember: 'Brush and palette for painting. Blue + yellow = green, red + yellow = orange.',
  },
  'tc-rhythm': {
    intro: 'Rhythm is the pattern of beats in music. We can make it with our bodies and with drums.',
    steps: [
      {
        title: 'The beat',
        text: 'The beat is the steady pulse of music, like a heartbeat. We can clap it, stamp it or tap it.',
      },
      {
        title: 'Rhythm patterns',
        text: 'A rhythm pattern repeats. Say it, then clap it.',
        example: ['clap, clap, rest, clap, clap, rest …', 'clap, stamp, stamp, clap, stamp, stamp …'],
      },
      {
        title: 'Tempo',
        text: 'Tempo is how fast or slow the music goes. A lullaby is slow; a dance song is often fast.',
        example: ['Isukuti drums from the Luhya play a fast, exciting beat.'],
      },
    ],
    remember: 'Beat: the steady pulse. Rhythm: the pattern. Tempo: how fast or slow.',
  },
  'tc-melody': {
    intro: 'A melody is a tune: sounds that go higher and lower.',
    steps: [
      {
        title: 'High and low',
        text: 'Pitch is how high or low a sound is. A bird or whistle is high; a big drum or a lion\'s roar is low.',
      },
      {
        title: 'Singing well',
        text: 'Warm up your voice, stand tall, and sing with a clear, pleasant voice, not shouting.',
        example: ['do, re, mi, fa, so goes up in pitch.'],
      },
      {
        title: 'Kinds of songs',
        text: 'Lullabies help babies sleep. Work songs make work easier. Patriotic songs show love for our country.',
      },
    ],
    remember: 'Pitch is high or low. A melody is a tune that moves up and down.',
  },
  'tc-pushpull': {
    intro: 'Pushing moves things away from us; pulling brings them towards us.',
    steps: [
      {
        title: 'Push or pull?',
        text: 'We push a wheelbarrow and a swing. We pull a rope in tug of war and a bucket up from a well.',
      },
      {
        title: 'Doing it safely',
        text: 'Warm up first. Bend your knees a little and keep your back straight. Only push or pull things that are not too heavy.',
      },
      {
        title: 'Playing fair',
        text: 'In tug of war, never let go of the rope suddenly: the other team could fall and get hurt. Play on flat, grassy ground.',
      },
    ],
    remember: 'Push = away, pull = towards. Warm up, bend your knees, and never let go suddenly.',
  },
  'tc-rounds': {
    intro: 'A round is one song sung by groups who start at different times.',
    steps: [
      {
        title: 'How a round works',
        text: 'Group A starts the song. When Group A finishes the first line, Group B starts from the beginning.',
        example: ['A: line 1, line 2, line 3, line 4', 'B:          line 1, line 2, line 3, line 4'],
      },
      {
        title: 'Keep your own part',
        text: 'Listen to the leader to know when to start, keep the same tempo, and do not follow the other group.',
      },
      {
        title: 'Ending a round',
        text: 'Each group finishes in turn. The group that started last finishes last.',
        example: ['4 lines, 2 groups → 4 + 4 = 8 lines sung in all'],
      },
    ],
    remember: 'Same song, different start times. Keep your part and keep the tempo.',
  },
  'tc-skipping': {
    intro: 'Skipping makes our hearts and legs strong, and it is fun to do with friends.',
    steps: [
      {
        title: 'Skipping and hopping',
        text: 'Our arms turn the rope and our legs jump over it. Hopping is jumping on one leg.',
      },
      {
        title: 'Landing softly',
        text: 'Land on the balls of your feet, with knees a little bent. Use a rope that is not too long, or you may trip.',
      },
      {
        title: 'Before and after',
        text: 'Warm up before skipping, wear light clothes and shoes that fit, and cool down after by walking slowly and stretching.',
      },
    ],
    remember: 'Arms turn, legs jump, land softly. Warm up before and cool down after.',
  },
  'tc-dribbling': {
    intro: 'Dribbling means moving with a ball while keeping it under control.',
    steps: [
      {
        title: 'With the feet',
        text: 'In football we dribble by tapping the ball gently with the inside and outside of both feet.',
      },
      {
        title: 'With the hand',
        text: 'In basketball we bounce the ball with our fingertips, not the palm.',
      },
      {
        title: 'Keep control',
        text: 'Keep the ball close, look up to see where you are going, and practise going in and out of cones (zig-zag).',
      },
    ],
    remember: 'Keep the ball close, use both feet (or your fingertips), and keep your eyes up.',
  },
  'tc-strings': {
    intro: 'String instruments make sound when their strings shake.',
    steps: [
      {
        title: 'Kenyan string instruments',
        text: 'The nyatiti from the Luo is plucked. The orutu is a single-string fiddle played with a bow.',
      },
      {
        title: 'High and low strings',
        text: 'A tight, thin or short string gives a high sound. A loose, thick or long string gives a low sound.',
      },
      {
        title: 'Make your own',
        text: 'A tin, a stick and a string can make a simple instrument. The tin is the sound box that makes it louder.',
        example: ['No sound? The string may be too loose.'],
      },
    ],
    remember: 'Pluck or bow the string. Tight and thin = high; loose and thick = low.',
  },
  'tc-gym': {
    intro: 'Rolling and balancing teach us to control our bodies.',
    steps: [
      {
        title: 'The forward roll',
        text: 'Squat, place your hands on the mat, tuck your chin to your chest, then roll on your back.',
        example: ['squat → hands down → chin in → roll'],
      },
      {
        title: 'Staying safe',
        text: 'Roll on a soft mat or grass. Never land on the top of your head. One learner rolls at a time.',
      },
      {
        title: 'Balancing',
        text: 'Stand on one leg, walk along a line, or hold a still pose. Stretch your arms out to stay steady.',
      },
    ],
    remember: 'Tuck your chin to protect your neck. Arms out to balance.',
  },
  'tc-water': {
    intro: 'Water is fun, but it can be dangerous. Safety comes first.',
    steps: [
      {
        title: 'Where and with whom',
        text: 'Only swim in a pool with a trainer or adult watching. Never swim in rivers, dams or flooded water.',
      },
      {
        title: 'Pool rules',
        text: 'Shower before swimming. Walk, do not run: the floor is slippery. Do not push others in.',
      },
      {
        title: 'Helping someone in trouble',
        text: 'Shout for an adult, and throw a float or rope. Do not jump in yourself.',
      },
    ],
    remember: 'Swim only where an adult watches. If someone is in trouble: shout, and throw, do not go.',
  },
  'tc-anthem': {
    intro: 'The Kenya National Anthem is a prayer for our country.',
    steps: [
      {
        title: 'About the anthem',
        text: 'It has three verses and is sung in Kiswahili and English. It asks God to bless Kenya.',
        example: ['"O God of all creation, bless this our land and nation."', '"Ee Mungu nguvu yetu, ilete baraka kwetu."'],
      },
      {
        title: 'Showing respect',
        text: 'Stand still and upright, do not talk or chew, and sing clearly.',
      },
      {
        title: 'Our flag',
        text: 'Black for the people, red for the blood of those who fought for freedom, green for the land, white for peace.',
      },
    ],
    remember: 'A prayer in three verses and two languages. Stand still and sing with respect.',
  },
}

export const CRE3_LESSONS: Record<string, Lesson> = {
  'tr-creation': {
    intro: 'God created the world and everything in it, and He made people in His likeness.',
    steps: [
      {
        title: 'Six days of creation',
        text: 'God made light on the first day, and people on the sixth day. On the seventh day He rested.',
      },
      {
        title: 'Adam and Eve',
        text: 'God made Adam from the dust of the ground and made Eve. They lived in the Garden of Eden. Adam named the animals.',
        example: ['They disobeyed God and had to leave the garden.'],
      },
      {
        title: 'Caring for creation',
        text: 'God gave us the work of caring for His creation: we plant trees, care for animals and keep rivers clean.',
      },
    ],
    remember: 'God made everything; people on the sixth day, in His likeness. We care for what He made.',
  },
  'tr-family': {
    intro: 'God gives us a family to love and care for us.',
    steps: [
      {
        title: 'Our families',
        text: 'A nuclear family is father, mother and children. The extended family adds grandparents, uncles, aunts and cousins.',
        example: ["My mother's brother is my uncle.", "My uncle's children are my cousins."],
      },
      {
        title: 'Honour your parents',
        text: 'God\'s commandment says "Honour your father and your mother." Jesus obeyed His parents, Mary and Joseph.',
      },
      {
        title: 'Love at home',
        text: 'We help with chores, pray together, care for the sick and respect the elderly.',
      },
    ],
    remember: 'Honour your father and mother, and show love by helping at home.',
  },
  'tr-bible': {
    intro: 'The Old Testament tells how God spoke to and protected His people.',
    steps: [
      {
        title: 'Moses and Jonah',
        text: 'God called Moses from a burning bush. God sent Jonah to Nineveh, but Jonah ran away to Tarshish and was swallowed by a big fish.',
        example: ['Lesson: obey God.'],
      },
      {
        title: 'Naaman',
        text: 'Naaman had leprosy. Elisha told him to wash seven times in River Jordan, and he was healed.',
      },
      {
        title: 'Faithful in danger',
        text: 'King Darius threw Daniel into the lions\' den, and God\'s angel shut the lions\' mouths. King Nebuchadnezzar threw Shadrach, Meshach and Abednego into the fire, and God kept them safe.',
      },
    ],
    remember: 'Moses: burning bush. Jonah: Nineveh. Naaman: seven times in Jordan. Daniel: lions. Three men: fire.',
  },
  'tr-jesus': {
    intro: 'Jesus was born in Bethlehem, grew up in Nazareth and showed God\'s love.',
    steps: [
      {
        title: 'His birth',
        text: 'Jesus was born to Mary in Bethlehem and laid in a manger. Angels told shepherds, and wise men followed a star. We remember it at Christmas.',
      },
      {
        title: 'Growing up',
        text: 'Jesus grew up in Nazareth. At twelve He was found in the Temple in Jerusalem, listening and asking questions.',
      },
      {
        title: 'Miracles and teaching',
        text: 'He turned water into wine at Cana, fed five thousand people with five loaves and two fish, calmed a storm, and healed the blind.',
        example: ['"Let the little children come to me."'],
      },
    ],
    remember: 'Born in Bethlehem, raised in Nazareth; His miracles showed God\'s love and power.',
  },
  'tr-living': {
    intro: 'Christians show God\'s love in the choices they make every day.',
    steps: [
      {
        title: 'Prayer',
        text: 'We talk to God through prayer. Jesus taught His disciples the Lord\'s Prayer. We thank God before meals.',
      },
      {
        title: 'Good choices',
        text: 'Telling the truth, sharing, obeying parents and helping others make God happy.',
        example: ['Found a wallet? Return it to the owner or an elder.'],
      },
      {
        title: 'Forgiving and caring',
        text: 'Jesus teaches us to forgive those who wrong us, and to care for the sick and the hungry.',
      },
    ],
    remember: 'Pray, choose what is good, forgive, and care for others.',
  },
}
