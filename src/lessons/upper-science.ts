// Grades 4–6 Science and Technology, and Agriculture and Nutrition lessons, one per topic.
import type { Lesson } from './types'

export const UPPER_SCIENCE_LESSONS: Record<string, Lesson> = {
  'us-plants': {
    intro: 'Plants make their own food and give us food, air and shade. Each part has a job.',
    steps: [
      { title: 'Parts and their work', text: 'Roots hold the plant and take in water. The stem holds it up and carries water. Leaves make food. Flowers make seeds; fruits protect them.' },
      { title: 'What plants need', text: 'Plants need sunlight, water and air to make food in their leaves. Green chlorophyll traps the sunlight.' },
      { title: 'Plants we eat', text: 'We eat roots (carrots), leaves (kale), stems (sugarcane, Irish potatoes), seeds (beans) and fruits (mangoes).' },
    ],
    remember: 'Roots take in water, leaves make food, flowers make seeds.',
  },
  'us-animals': {
    intro: 'Animals can be grouped by where they live, what they eat and whether they are kept by people.',
    steps: [
      { title: 'Domestic and wild', text: 'Domestic animals are kept by people (cows, goats). Wild animals live on their own (lions, zebras).' },
      { title: 'What they eat', text: 'Herbivores eat plants, carnivores eat flesh, omnivores eat both.', example: ['cow – herbivore', 'lion – carnivore', 'baboon – omnivore'] },
      { title: 'Homes', text: 'Bees live in a hive, birds in a nest, dogs in a kennel, pigs in a sty, rabbits in a hutch.' },
    ],
    remember: 'Herbivores eat plants, carnivores eat flesh, omnivores eat both.',
  },
  'us-teeth': {
    intro: 'Our teeth cut, tear and grind food. Caring for them keeps them strong for life.',
    steps: [
      { title: 'Kinds of teeth', text: 'Incisors cut, canines tear, premolars crush and molars grind.' },
      { title: 'Two sets', text: 'Children have 20 milk teeth. Adults have 32 permanent teeth.' },
      { title: 'Parts of a tooth', text: 'The crown is above the gum; the root is inside it. Hard enamel covers the crown; the pulp inside has nerves.' },
      { title: 'Care', text: 'Brush twice a day, eat fewer sweets, never open bottles with your teeth, and visit a dentist.' },
    ],
    remember: 'Incisors cut, canines tear, molars grind; brush twice a day.',
  },
  'us-states': {
    intro: 'Everything around us is matter. Matter can be a solid, a liquid or a gas.',
    steps: [
      { title: 'Three states', text: 'Solids have a fixed shape. Liquids take the shape of their container. Gases spread out to fill any space.', example: ['stone – solid, milk – liquid, air – gas'] },
      { title: 'Changing state', text: 'Melting: solid → liquid. Freezing: liquid → solid. Evaporation: liquid → gas. Condensation: gas → liquid.' },
      { title: 'Air', text: 'Air takes up space, has weight and expands when heated.' },
    ],
    remember: 'Heat melts and evaporates; cooling freezes and condenses.',
  },
  'us-materials': {
    intro: 'We choose materials for a job by their properties.',
    steps: [
      { title: 'Floating and sinking', text: 'Cork, feathers and dry wood float. Stones, nails and coins sink.' },
      { title: 'Magnetic materials', text: 'Magnets attract iron and steel objects, like nails and paper clips, but not plastic, wood or paper.' },
      { title: 'Light through materials', text: 'Transparent materials let light through clearly (glass). Translucent ones let some through (tracing paper). Opaque ones let none through (wood).' },
    ],
    remember: 'Choose a material by what it can do: float, bend, conduct, or let light through.',
  },
  'us-force': {
    intro: 'A force is a push or a pull. Forces make things start, stop, speed up, slow down or change shape.',
    steps: [
      { title: 'Push and pull', text: 'Kicking a ball is a push; opening a drawer is a pull.' },
      { title: 'Effects of force', text: 'A force can move a still object, stop a moving one, change its direction or change its shape.' },
      { title: 'Gravity and friction', text: 'Gravity pulls things down. Friction slows moving things: it helps us walk and brake, but wears out tyres.' },
    ],
    remember: 'Forces push or pull; friction slows things down and gravity pulls them down.',
  },
  'us-energy': {
    intro: 'Energy makes things work. Light, heat and sound are forms of energy.',
    steps: [
      { title: 'Sources', text: 'Light: the sun, candles, torches. Heat: fire, jiko, heaters. Sound: drums, bells, radios.' },
      { title: 'The moon', text: 'The moon is not a source of light; it reflects light from the sun.' },
      { title: 'Changing energy', text: 'A solar panel changes sunlight into electricity; a radio changes electricity into sound.' },
    ],
    remember: 'The sun is our main source of light and heat; the moon only reflects light.',
  },
  'us-plantgroups': {
    intro: 'Plants can be grouped as flowering or non-flowering, and as trees, shrubs or herbs.',
    steps: [
      { title: 'Flowering plants', text: 'They make flowers, fruits and seeds (maize, beans, mango trees).' },
      { title: 'Non-flowering plants', text: 'Ferns and mosses make spores; cypress and pine carry seeds in cones.' },
      { title: 'Parts of a flower', text: 'Petals attract insects. The stamen (male) makes pollen. The pistil (female) has a stigma that receives pollen. Moving pollen is called pollination.' },
    ],
    remember: 'Flowering plants make seeds in fruits; ferns and mosses make spores.',
  },
  'us-vertebrates': {
    intro: 'Vertebrates are animals with a backbone. There are five groups.',
    steps: [
      { title: 'Fish and amphibians', text: 'Fish have scales and gills. Amphibians, like frogs, have moist skin and live in water and on land.' },
      { title: 'Reptiles and birds', text: 'Reptiles have dry scaly skin and lay eggs on land. Birds have feathers, beaks and wings.' },
      { title: 'Mammals', text: 'Mammals have hair or fur and feed their young on milk. Bats and whales are mammals.' },
    ],
    remember: 'Fish, amphibians, reptiles, birds, mammals: only mammals feed their young on milk.',
  },
  'us-digestion': {
    intro: 'Digestion breaks food into tiny pieces the body can use.',
    steps: [
      { title: 'The journey of food', text: 'Mouth → oesophagus → stomach → small intestine → large intestine → rectum → anus.' },
      { title: 'What each part does', text: 'Teeth and saliva start digestion. The stomach churns food. The small intestine absorbs food into the blood. The large intestine absorbs water.' },
      { title: 'Healthy digestion', text: 'Chew well, eat roughage (fruits and vegetables), drink clean water and wash your hands.' },
    ],
    remember: 'Digested food is absorbed in the small intestine; water in the large intestine.',
  },
  'us-mixtures': {
    intro: 'A mixture is two or more things mixed together. Mixtures can be separated.',
    steps: [
      { title: 'Dissolving', text: 'Salt and sugar dissolve in water to form a solution. Sand and oil do not dissolve.' },
      { title: 'Separating', text: 'Sieving, filtering, evaporation, picking, winnowing, decanting, or using a magnet.', example: ['muddy water → filter', 'salt water → evaporate', 'iron filings in sand → magnet'] },
      { title: 'Words to know', text: 'In filtering, what passes through is the filtrate; what stays is the residue.' },
    ],
    remember: 'Choose the method that fits: filter what will not dissolve, evaporate to get dissolved salt back.',
  },
  'us-pollution': {
    intro: 'Clean water keeps us healthy. Polluted water spreads disease and harms living things.',
    steps: [
      { title: 'Causes', text: 'Dumping rubbish, washing in rivers, factory waste, oil spills and fertilisers washed into water.' },
      { title: 'Effects', text: 'Diseases such as cholera, typhoid and bilharzia, and water life struggling to survive.' },
      { title: 'Prevention and safe water', text: 'Dispose of waste properly, use toilets, plant trees along rivers. Make water safe by boiling, chlorination and filtering.' },
    ],
    remember: 'Keep rubbish out of water, and boil drinking water to kill germs.',
  },
  'us-heat': {
    intro: 'Heat moves from hotter things to cooler things in three ways.',
    steps: [
      { title: 'Conduction', text: 'Through solids. A metal spoon in hot tea gets hot. Metals are good conductors; wood and plastic are insulators.' },
      { title: 'Convection', text: 'Through liquids and gases. Warm water rises and cool water sinks.' },
      { title: 'Radiation', text: 'Without touching, like heat from the sun or a fire.' },
    ],
    remember: 'Conduction in solids, convection in liquids and gases, radiation from the sun.',
  },
  'us-light': {
    intro: 'Light lets us see. It travels in straight lines and bounces off surfaces.',
    steps: [
      { title: 'Luminous objects', text: 'They give out their own light: the sun, a candle flame, a torch. The moon is non-luminous.' },
      { title: 'Shadows', text: 'Light travels in straight lines, so opaque objects block it and make shadows. Shadows are shortest at noon.' },
      { title: 'Reflection', text: 'Mirrors reflect light. Writing looks reversed in a mirror. A periscope uses two mirrors.' },
    ],
    remember: 'Light travels in straight lines; blocking it makes a shadow, bouncing it is reflection.',
  },
  'us-roots': {
    intro: 'Roots and leaves have different shapes for different jobs.',
    steps: [
      { title: 'Tap and fibrous roots', text: 'A tap root has one main root (bean, carrot). Fibrous roots are many thin roots (grass, maize).' },
      { title: 'Special roots', text: 'Prop roots support maize; storage roots store food (sweet potato); breathing roots help mangroves.' },
      { title: 'Leaves', text: 'Leaves make food (photosynthesis), lose water (transpiration) and exchange gases through stomata.' },
    ],
    remember: 'Tap roots go deep, fibrous roots hold soil; leaves make food and transpire.',
  },
  'us-invertebrates': {
    intro: 'Invertebrates are animals without a backbone, like insects, spiders and worms.',
    steps: [
      { title: 'Insects and arachnids', text: 'Insects have three body parts and six legs. Spiders and ticks have two body parts and eight legs.' },
      { title: 'Useful invertebrates', text: 'Bees pollinate and make honey; earthworms loosen and aerate soil.' },
      { title: 'Harmful invertebrates', text: 'Mosquitoes spread malaria, houseflies spread cholera, ticks spread East Coast fever.' },
    ],
    remember: 'Insects: 3 parts, 6 legs. Spiders: 2 parts, 8 legs.',
  },
  'us-circulation': {
    intro: 'The heart pumps blood around the body, carrying food and oxygen to every cell.',
    steps: [
      { title: 'The heart', text: 'A strong muscle with four chambers that pumps blood all the time.' },
      { title: 'Blood vessels', text: 'Arteries carry blood away from the heart; veins bring it back; capillaries link them.' },
      { title: 'Parts of blood', text: 'Red cells carry oxygen, white cells fight germs, platelets help blood clot, plasma carries food.' },
    ],
    remember: 'Arteries away, veins back; red cells carry oxygen, white cells fight germs.',
  },
  'us-breathing': {
    intro: 'We breathe in oxygen and breathe out carbon dioxide.',
    steps: [
      { title: 'The path of air', text: 'Nose → trachea (windpipe) → bronchi → lungs → air sacs, where oxygen passes into the blood.' },
      { title: 'Breathing in and out', text: 'Breathing in: ribs move up and out, the diaphragm flattens. Breathing out: the opposite.' },
      { title: 'Healthy lungs', text: 'Breathe through the nose, exercise, avoid smoke, and cover your mouth when coughing.' },
    ],
    remember: 'Oxygen in, carbon dioxide out; the diaphragm and ribs move the air.',
  },
  'us-water': {
    intro: 'Water is needed by all living things. It moves round and round in the water cycle.',
    steps: [
      { title: 'Properties', text: 'Pure water has no colour, smell or taste. It boils at 100 °C and freezes at 0 °C.' },
      { title: 'The water cycle', text: 'Evaporation → condensation (clouds) → precipitation (rain) → collection (rivers, lakes).' },
      { title: 'Safe water', text: 'Make water safe by boiling, chlorination and filtering; keep containers covered.' },
    ],
    remember: 'Evaporation, condensation, precipitation, collection: the water cycle goes round.',
  },
  'us-magnets': {
    intro: 'Magnets attract iron and steel, and push or pull other magnets.',
    steps: [
      { title: 'Poles', text: 'A magnet is strongest at its poles. Like poles repel; unlike poles attract.' },
      { title: 'Magnetic materials', text: 'Iron, steel, nickel and cobalt are magnetic. Copper, aluminium, plastic and wood are not.' },
      { title: 'Uses', text: 'Compasses, fridge doors, loudspeakers, and separating iron from waste.' },
    ],
    remember: 'Like poles repel, unlike poles attract; iron and steel are magnetic.',
  },
  'us-electricity': {
    intro: 'Electricity flows round a complete circuit to light bulbs and run machines.',
    steps: [
      { title: 'A circuit', text: 'A cell, wires, a switch and a bulb. If there is a gap, the bulb goes off.' },
      { title: 'Conductors and insulators', text: 'Metals and graphite conduct electricity. Rubber, plastic, glass and dry wood are insulators.' },
      { title: 'Safety', text: 'Never touch switches with wet hands, never put objects in sockets, and keep away from power lines.' },
    ],
    remember: 'A circuit must be complete; plastic covers wires because it is an insulator.',
  },
  'us-sound': {
    intro: 'Sound is made when things vibrate. It travels to our ears.',
    steps: [
      { title: 'Vibrations', text: 'A plucked string, a beaten drum and our voice box all vibrate.' },
      { title: 'How sound travels', text: 'Through solids (fastest), liquids and gases, but not through a vacuum. An echo is reflected sound.' },
      { title: 'Pitch and loudness', text: 'Shorter or tighter strings give a higher pitch; hitting harder gives a louder sound.' },
    ],
    remember: 'No vibration, no sound; sound cannot travel through a vacuum.',
  },
  'us-machines': {
    intro: 'Simple machines make work easier.',
    steps: [
      { title: 'Kinds', text: 'Levers (see-saw), pulleys (flagpole), inclined planes (ramp), wedges (axe), wheel and axle (steering wheel).' },
      { title: 'Levers', text: 'A lever turns on a fulcrum. Effort moves the load.', example: ['1st class: fulcrum in the middle (see-saw)', '2nd class: load in the middle (wheelbarrow)', '3rd class: effort in the middle (tweezers)'] },
      { title: 'Less effort', text: 'Putting the fulcrum closer to the load means less effort is needed. Oil reduces friction.' },
    ],
    remember: 'Fulcrum near the load means less effort.',
  },
}

export const UPPER_AGRICULTURE_LESSONS: Record<string, Lesson> = {
  'ua-soil': {
    intro: 'Soil feeds our crops. We must stop it from being washed or blown away.',
    steps: [
      { title: 'Soil types', text: 'Sandy soil drains fast; clay soil holds water and is sticky; loam is a mixture and best for crops.' },
      { title: 'Soil erosion', text: 'Water and wind carry away top soil. Splash, sheet, rill and gully erosion get worse step by step.' },
      { title: 'Conservation', text: 'Terraces, cover crops, mulching, grass strips, planting trees and ploughing across the slope.' },
    ],
    remember: 'Keep soil covered and slow down running water to stop erosion.',
  },
  'ua-water': {
    intro: 'Water is precious. We harvest it when it rains and use it wisely.',
    steps: [
      { title: 'Harvesting', text: 'Collect roof water with gutters and tanks; dig water pans, dams and zai pits.' },
      { title: 'Saving water', text: 'Close taps, fix leaks, reuse water, mulch, use drip irrigation and water in the evening.' },
      { title: 'Safe storage', text: 'Cover tanks, clean gutters and boil drinking water.' },
    ],
    remember: 'Harvest rain, store it covered, and never let water run to waste.',
  },
  'ua-wildlife': {
    intro: 'Wild animals are part of our heritage and bring visitors to Kenya.',
    steps: [
      { title: 'Why conserve', text: 'Tourism, learning, beauty and the balance of nature.' },
      { title: 'Threats', text: 'Poaching, cutting forests, drought and settling in animal homes.' },
      { title: 'Conservation', text: 'National parks and reserves, game rangers (KWS), beehive fences and educating people.' },
    ],
    remember: 'Protect wildlife homes; parks and rangers keep animals safe.',
  },
  'ua-gardening': {
    intro: 'A kitchen garden gives fresh vegetables for the family.',
    steps: [
      { title: 'Tools', text: 'Jembe for digging, rake for levelling, watering can for watering, trowel for transplanting.' },
      { title: 'Vegetables', text: 'Leafy (kale, spinach), fruit (tomato, pepper) and root (carrot, beetroot) vegetables.' },
      { title: 'Care', text: 'Water, weed, thin, mulch, add manure, and stake tall plants such as tomatoes.' },
    ],
    remember: 'Prepare the soil, plant, care daily, then harvest.',
  },
  'ua-animals': {
    intro: 'Domestic animals give us food, money and help on the farm. They need good care.',
    steps: [
      { title: 'Uses', text: 'Cattle give milk, beef and hides; sheep give wool; donkeys and camels carry loads; bees give honey.' },
      { title: 'Small animals', text: 'Chickens need clean, dry houses, the right feed (chick mash, layers mash) and vaccination. Rabbits live in raised hutches.' },
      { title: 'Health', text: 'A healthy animal is alert and eats well. Control ticks by dipping, worms by deworming, and separate sick animals.' },
    ],
    remember: 'Good food, clean housing and disease control keep animals healthy.',
  },
  'ua-hygiene': {
    intro: 'Clean habits keep germs away from our bodies, kitchens and food.',
    steps: [
      { title: 'Personal hygiene', text: 'Bathe daily, brush teeth, cut nails, wash hands after the toilet and before eating.' },
      { title: 'Kitchen hygiene', text: 'Wash utensils with soap, dry them on a rack, cover food and use a covered bin.' },
      { title: 'Preventing disease', text: 'Boil water against cholera, sleep under a net against malaria, wear shoes against jiggers.' },
    ],
    remember: 'Wash hands with soap: before eating and after the toilet.',
  },
  'ua-foodgroups': {
    intro: 'A balanced diet has energy-giving, body-building and protective foods, plus water.',
    steps: [
      { title: 'Energy-giving foods', text: 'Carbohydrates and fats: maize, rice, potatoes, cassava.' },
      { title: 'Body-building foods', text: 'Proteins: beans, eggs, fish, meat, milk.' },
      { title: 'Protective foods', text: 'Vitamins and minerals: fruits and vegetables like kale, carrots and oranges.' },
    ],
    remember: 'A balanced meal has energy, body-building and protective foods together.',
  },
  'ua-cooking': {
    intro: 'Food must be prepared safely and cooked in ways that keep its goodness.',
    steps: [
      { title: 'Safe preparation', text: 'Wash hands and utensils. Wash vegetables before cutting them to keep vitamins.' },
      { title: 'Cooking methods', text: 'Boiling and steaming use water; roasting, baking and frying use dry heat or oil.', example: ['chapati – shallow frying', 'mandazi – deep frying', 'cake – baking'] },
      { title: 'Kitchen safety', text: 'Turn pan handles inwards, use oven gloves, and cover an oil fire with a lid — never pour water on it.' },
    ],
    remember: 'Wash before you cut, steam to keep vitamins, and cook safely.',
  },
  'ua-fuel': {
    intro: 'Fuel cooks our food. Saving it protects forests and money.',
    steps: [
      { title: 'Kinds of energy', text: 'Renewable: solar, wind, biogas, hydro. Non-renewable: petrol, paraffin, coal, gas.' },
      { title: 'Saving fuel', text: 'Cover pots, soak beans, use dry firewood, use an energy-saving jiko, and put out the fire after cooking.' },
      { title: 'Clean energy', text: 'Biogas from dung and solar cookers save trees.' },
    ],
    remember: 'Cover the pot and soak the beans: less fuel, same food.',
  },
  'ua-seedbeds': {
    intro: 'Small seeds are raised in a nursery bed before going to the field.',
    steps: [
      { title: 'Nursery crops', text: 'Tomatoes, cabbages, kales and onions start in a nursery. Maize and beans are planted directly.' },
      { title: 'Care in the nursery', text: 'Shade, water, mulch, prick out extra seedlings, then harden off.' },
      { title: 'Transplanting', text: 'Water the bed first, lift seedlings with soil, and transplant in the evening or on a cloudy day.' },
    ],
    remember: 'Shade, water and harden off; transplant in the cool evening.',
  },
  'ua-pests': {
    intro: 'Pests and diseases reduce harvests. Farmers protect crops in many ways.',
    steps: [
      { title: 'Common pests', text: 'Aphids suck sap, cutworms cut seedlings, stalk borers bore into maize, weevils damage stored grain.' },
      { title: 'Control', text: 'Hand-picking, crop rotation, early planting, traps, and careful spraying.' },
      { title: 'Wild animals', text: 'Beehive fences, chilli fences and trenches keep wild animals off farms gently.' },
    ],
    remember: 'Rotate crops and store grain dry to keep pests away.',
  },
  'ua-preserve': {
    intro: 'Preserving food stops it going bad, so nothing is wasted.',
    steps: [
      { title: 'Why food goes bad', text: 'Germs and moulds grow where there is water and warmth.' },
      { title: 'Methods', text: 'Drying (omena, maize), salting, smoking (fish), fermenting (mursik), cooling and making jam.' },
      { title: 'Storage', text: 'Dry grain well, use airtight containers or hermetic bags, and raise granaries off the ground.' },
    ],
    remember: 'Take away water, warmth or air, and food lasts longer.',
  },
  'ua-compost': {
    intro: 'Organic manure feeds the soil and improves its structure.',
    steps: [
      { title: 'Kinds of manure', text: 'Compost (rotted waste), farmyard manure (dung and bedding), green manure (legumes dug in).' },
      { title: 'Making compost', text: 'Layer dry plant matter, green matter, dung and soil. Keep it moist and turn it.' },
      { title: 'Ready to use', text: 'Ready compost is dark, crumbly, cool and does not smell.' },
    ],
    remember: 'No plastic or glass in compost; turn it and keep it moist.',
  },
  'ua-crops': {
    intro: 'Growing crops well means doing the right thing at the right time.',
    steps: [
      { title: 'Kinds of crops', text: 'Cereals (maize, wheat), legumes (beans, peas), roots and tubers (cassava, potatoes), cash crops (tea, coffee).' },
      { title: 'Field practices', text: 'Gapping fills empty holes, thinning removes extras, top-dressing adds fertiliser, earthing up covers potatoes.' },
      { title: 'Rotation', text: 'Rotating maize with beans adds nitrogen and breaks pest cycles.' },
    ],
    remember: 'Prepare, plant, gap and thin, weed, top-dress, harvest.',
  },
  'ua-nutrition': {
    intro: 'When food lacks a nutrient for a long time, the body shows signs of a deficiency disease.',
    steps: [
      { title: 'Protein and energy', text: 'Kwashiorkor comes from lack of protein; marasmus from lack of all foods.' },
      { title: 'Vitamins', text: 'Lack of vitamin A: night blindness. Vitamin C: scurvy. Vitamin D: rickets.' },
      { title: 'Minerals', text: 'Lack of iron: anaemia. Lack of iodine: goitre. Use iodised salt and eat dark green vegetables.' },
    ],
    remember: 'Eat a variety of foods; each nutrient protects the body in its own way.',
  },
}
