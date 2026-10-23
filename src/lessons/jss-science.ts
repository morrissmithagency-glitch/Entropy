// Grades 7–9 Integrated Science, Pre-Technical Studies, and Agriculture and Nutrition lessons.
import type { Lesson } from './types'

export const JSS_SCIENCE_LESSONS: Record<string, Lesson> = {
  'js-investigation': {
    intro: 'Scientists work safely and follow clear steps so their results can be trusted.',
    steps: [
      { title: 'Laboratory safety', text: 'Follow instructions, wear protective clothing, never taste chemicals, and report every accident or breakage.' },
      { title: 'Apparatus', text: 'A Bunsen burner heats, a measuring cylinder measures liquid volume, a beaker holds liquids, a thermometer measures temperature.' },
      { title: 'The scientific method', text: 'Observe, ask a question, form a hypothesis, test it with a fair experiment, record results and draw a conclusion.' },
      { title: 'Fair tests', text: 'Change only one variable at a time and keep all others the same.' },
    ],
    remember: 'Change one thing, keep the rest the same.',
  },
  'js-mixtures': {
    intro: 'Mixtures can be separated by using the different properties of their parts.',
    steps: [
      { title: 'Methods', text: 'Filtration separates insoluble solids; evaporation recovers a dissolved solid; distillation separates liquids by boiling point.' },
      { title: 'Other methods', text: 'Decanting pours off a liquid; a magnet removes iron; chromatography separates dyes; sieving separates sizes.' },
      { title: 'Pure substances', text: 'Pure substances melt and boil at fixed temperatures. Pure water boils at 100 °C at sea level.' },
    ],
    remember: 'Choose the method by the property that differs.',
  },
  'js-acids': {
    intro: 'Acids and bases are found in our kitchens, our bodies and our soils.',
    steps: [
      { title: 'Acids', text: 'Acids taste sour and turn blue litmus red. Examples: lemon juice, vinegar.' },
      { title: 'Bases', text: 'Bases feel soapy and turn red litmus blue. Examples: soap, baking soda, wood ash.' },
      { title: 'The pH scale', text: 'pH below 7 is acidic, 7 is neutral, above 7 is basic.' },
      { title: 'Neutralisation', text: 'An acid and a base cancel each other. Antacids ease indigestion; lime corrects acidic soil.' },
    ],
    remember: 'Acids turn litmus red; bases turn it blue.',
  },
  'js-kingdoms': {
    intro: 'Classifying living things helps us name, study and protect them.',
    steps: [
      { title: 'Five kingdoms', text: 'Plants, animals, fungi, protoctista and bacteria (monera).' },
      { title: 'Vertebrates', text: 'Fish, amphibians, reptiles, birds and mammals all have backbones.' },
      { title: 'Naming', text: 'Scientists use two names, genus then species: Homo sapiens.' },
      { title: 'Keys', text: 'A dichotomous key asks yes/no questions to identify an organism step by step.' },
    ],
    remember: 'Genus first, species second.',
  },
  'js-cells': {
    intro: 'The cell is the smallest unit of life, and every living thing is built from cells.',
    steps: [
      { title: 'Animal and plant cells', text: 'Both have a nucleus, cytoplasm and cell membrane. Plant cells also have a cell wall, chloroplasts and a large vacuole.' },
      { title: 'Jobs of the parts', text: 'The nucleus controls the cell; mitochondria release energy; chloroplasts make food.' },
      { title: 'The microscope', text: 'Magnification = eyepiece × objective magnification.', example: ['×10 eyepiece, ×40 objective → ×400'] },
    ],
    remember: 'Only plant cells have walls and chloroplasts.',
  },
  'js-health': {
    intro: 'Knowing how diseases spread and how to give first aid keeps families safe.',
    steps: [
      { title: 'Diseases', text: 'Some spread through germs in water (cholera), air (TB) or mosquitoes (malaria). Others, like diabetes, are not passed between people.' },
      { title: 'Prevention', text: 'Wash hands, boil water, sleep under treated nets, get vaccinated and eat a balanced diet.' },
      { title: 'First aid', text: 'Stay calm, keep safe, call an adult. For a minor burn, cool it under running water for at least 10 minutes.' },
      { title: 'Drug misuse', text: 'Alcohol, tobacco and other drugs harm the body and mind. Say no and talk to a trusted adult.' },
    ],
    remember: 'Clean hands, clean water, and calm first aid.',
  },
  'js-energy': {
    intro: 'Energy cannot be made or destroyed; it only changes from one form to another.',
    steps: [
      { title: 'Forms of energy', text: 'Heat, light, sound, chemical, electrical, kinetic (movement) and potential (stored).' },
      { title: 'Changes', text: 'A torch changes chemical → electrical → light. A radio changes electrical → sound.' },
      { title: 'Renewable sources', text: 'Solar, wind, geothermal and hydroelectric energy are renewable. Coal and oil are not.' },
    ],
    remember: 'Energy changes form; it is never lost.',
  },
  'js-electricity': {
    intro: 'Electric circuits power our lights, phones and pumps.',
    steps: [
      { title: 'A circuit', text: 'Current flows only around a complete loop: a cell, wires, a switch and a bulb.' },
      { title: 'Conductors', text: 'Metals such as copper conduct electricity. Plastic, rubber and dry wood are insulators.' },
      { title: 'Series and parallel', text: 'In series, one bulb going off breaks the whole circuit. In parallel, the others stay on.' },
      { title: 'Power and cost', text: 'Ohm\'s law: V = I × R. Energy in kWh = power in kW × hours.', example: ['a 2 kW heater for 3 hours = 6 kWh'] },
    ],
    remember: 'V = I × R; a circuit must be complete.',
  },
  'js-atoms': {
    intro: 'Everything is made of tiny particles called atoms.',
    steps: [
      { title: 'Inside an atom', text: 'Protons (+) and neutrons (no charge) are in the nucleus; electrons (−) move around it.' },
      { title: 'Elements and compounds', text: 'An element has only one kind of atom (oxygen). A compound has two or more joined (water, H₂O).' },
      { title: 'Symbols', text: 'Each element has a symbol: H hydrogen, O oxygen, C carbon, Na sodium, Fe iron.' },
    ],
    remember: 'Protons +, electrons −, neutrons neutral.',
  },
  'js-changes': {
    intro: 'Some changes can be undone; others make something completely new.',
    steps: [
      { title: 'Physical changes', text: 'No new substance forms and the change can often be reversed: melting ice, dissolving sugar.' },
      { title: 'Chemical changes', text: 'A new substance forms and it is hard to reverse: burning, rusting, cooking an egg.' },
      { title: 'Signs', text: 'Colour change, gas bubbles, heat or light given out, or a new smell all suggest a chemical change.' },
    ],
    remember: 'New substance means chemical change.',
  },
  'js-transport': {
    intro: 'Living things move water, food and gases in and out of their cells.',
    steps: [
      { title: 'Diffusion', text: 'Particles spread from where there are many to where there are few, like the smell of food spreading.' },
      { title: 'Osmosis', text: 'Water moves through a membrane from a dilute solution to a concentrated one.' },
      { title: 'In plants', text: 'Xylem carries water up from the roots; phloem carries food. Water lost from leaves is transpiration.' },
      { title: 'In people', text: 'The heart pumps blood; arteries carry it away from the heart and veins bring it back.' },
    ],
    remember: 'Arteries away, veins back; xylem water, phloem food.',
  },
  'js-bodysystems': {
    intro: 'Body systems work together to keep us alive and well.',
    steps: [
      { title: 'Digestive system', text: 'Food is broken down in the mouth, stomach and small intestine, where nutrients are absorbed.' },
      { title: 'Breathing system', text: 'Air enters the lungs; oxygen passes into the blood in tiny air sacs called alveoli.' },
      { title: 'Excretory system', text: 'The kidneys filter waste from the blood to make urine. The skin removes sweat.' },
    ],
    remember: 'Absorb in the intestine, exchange in the alveoli, filter in the kidneys.',
  },
  'js-ecology': {
    intro: 'Living things depend on each other and on their surroundings.',
    steps: [
      { title: 'Food chains', text: 'Energy passes from producers (plants) to herbivores to carnivores.', example: ['grass → zebra → lion'] },
      { title: 'Relationships', text: 'Mutualism helps both partners (bees and flowers). Parasites live on a host and harm it (ticks on cattle).' },
      { title: 'Decomposers', text: 'Fungi and bacteria break down dead matter and return nutrients to the soil.' },
    ],
    remember: 'Energy flows from the sun through plants to animals.',
  },
  'js-light': {
    intro: 'Light lets us see, and mirrors and lenses bend it to our needs.',
    steps: [
      { title: 'Straight lines', text: 'Light travels in straight lines, which is why shadows form.' },
      { title: 'Reflection', text: 'The angle of incidence equals the angle of reflection.' },
      { title: 'Plane mirrors', text: 'The image is upright, the same size, laterally inverted and as far behind the mirror as the object is in front.' },
      { title: 'Curved mirrors', text: 'Concave mirrors focus light (torches, shaving mirrors). Convex mirrors give a wide view (vehicle side mirrors).' },
    ],
    remember: 'Angle in equals angle out.',
  },
  'js-heat': {
    intro: 'Heat always moves from hot to cold, in three different ways.',
    steps: [
      { title: 'Conduction', text: 'Heat passes through solids, especially metals. A metal spoon in hot tea gets warm.' },
      { title: 'Convection', text: 'Warm liquids and gases rise and cool ones sink, making currents.' },
      { title: 'Radiation', text: 'Heat travels as waves, even through space, as from the sun. Dark, dull surfaces absorb it best.' },
      { title: 'Insulation', text: 'A vacuum flask reduces all three: a vacuum stops conduction and convection; shiny walls reduce radiation.' },
    ],
    remember: 'Solids conduct, fluids convect, everything radiates.',
  },
  'js-pressure': {
    intro: 'Pressure explains why sharp knives cut and why dams are thicker at the bottom.',
    steps: [
      { title: 'Pressure in solids', text: 'Pressure = force ÷ area. A small area gives a large pressure.', example: ['600 N on 2 m² → 300 N/m²'] },
      { title: 'Pressure in liquids', text: 'Pressure increases with depth, so dams are built thicker at the base.' },
      { title: 'Air pressure', text: 'The air presses on everything. It lets us drink with a straw and makes a syringe work.' },
    ],
    remember: 'P = F ÷ A; deeper means more pressure.',
  },
  'js-periodic': {
    intro: 'The periodic table arranges all elements so their patterns are easy to see.',
    steps: [
      { title: 'Arrangement', text: 'Elements are in order of atomic number. Rows are periods; columns are groups.' },
      { title: 'Electron arrangement', text: 'Electrons fill shells of 2, then 8, then 8.', example: ['sodium (11): 2.8.1'] },
      { title: 'Groups', text: 'Group I metals are very reactive. Group VIII (noble gases) are unreactive.' },
      { title: 'Metals and non-metals', text: 'Metals are on the left, shiny and conduct well. Non-metals are on the right.' },
    ],
    remember: 'Groups share properties; outer electrons decide them.',
  },
  'js-water': {
    intro: 'Water is the most important liquid on earth, and its special properties support life.',
    steps: [
      { title: 'Properties', text: 'Pure water boils at 100 °C and freezes at 0 °C. It dissolves many substances.' },
      { title: 'Hard and soft water', text: 'Hard water does not lather easily with soap because of dissolved calcium and magnesium salts.' },
      { title: 'Treatment', text: 'Water is made safe by filtering, boiling or adding chlorine.' },
    ],
    remember: 'Boil or treat water before drinking.',
  },
  'js-nutrition': {
    intro: 'Plants make food and animals take it in: both need energy to live.',
    steps: [
      { title: 'Photosynthesis', text: 'Carbon dioxide + water → glucose + oxygen, using light trapped by chlorophyll.' },
      { title: 'Animal nutrition', text: 'Animals take in food, digest it, absorb it and use it for energy and growth.' },
      { title: 'Teeth and diet', text: 'Herbivores have flat molars for grinding; carnivores have sharp canines for tearing.' },
    ],
    remember: 'Light + CO₂ + water → food + oxygen.',
  },
  'js-reproduction': {
    intro: 'Flowers exist so plants can make seeds and new plants.',
    steps: [
      { title: 'Parts of a flower', text: 'The stamen (anther and filament) makes pollen. The pistil (stigma, style, ovary) receives it.' },
      { title: 'Pollination', text: 'Pollen moves from anther to stigma by insects, wind or birds.' },
      { title: 'Fertilisation and seeds', text: 'After fertilisation, the ovule becomes a seed and the ovary becomes the fruit.' },
      { title: 'Dispersal', text: 'Seeds spread by wind, animals, water or bursting pods.' },
    ],
    remember: 'Ovule becomes seed; ovary becomes fruit.',
  },
  'js-ecosystems': {
    intro: 'An ecosystem is a community of living things and their surroundings working together.',
    steps: [
      { title: 'Parts', text: 'Biotic factors are living (plants, animals). Abiotic factors are non-living (light, water, soil).' },
      { title: 'Food webs', text: 'Many linked food chains make a food web. Removing one species affects the rest.' },
      { title: 'Conservation', text: 'Protect habitats, plant trees, reduce pollution and manage waste.' },
    ],
    remember: 'Everything in an ecosystem is connected.',
  },
  'js-motion': {
    intro: 'Speed, velocity and acceleration describe how things move.',
    steps: [
      { title: 'Speed and velocity', text: 'Speed = distance ÷ time. Velocity is speed in a stated direction.' },
      { title: 'Acceleration', text: 'Acceleration = change in velocity ÷ time.', example: ['0 to 20 m/s in 5 s → 4 m/s²'] },
      { title: 'Graphs', text: 'On a distance–time graph, a steeper line means faster motion. A flat line means at rest.' },
    ],
    remember: 'Acceleration = change in velocity ÷ time.',
  },
  'js-work': {
    intro: 'Work is done when a force moves something, and machines make work easier.',
    steps: [
      { title: 'Work', text: 'Work = force × distance moved in the direction of the force. Unit: joule (J).', example: ['50 N over 4 m = 200 J'] },
      { title: 'Power', text: 'Power = work ÷ time. Unit: watt (W).' },
      { title: 'Simple machines', text: 'Levers, pulleys and inclined planes let a small effort move a large load.' },
    ],
    remember: 'W = F × d; P = W ÷ t.',
  },
}

export const JSS_PRETECH_LESSONS: Record<string, Lesson> = {
  'jt-safety': {
    intro: 'A safe workshop protects everyone, so safety rules come before any task.',
    steps: [
      { title: 'Rules', text: 'Wear protective clothing, keep floors clear, use the right tool and report any damage.' },
      { title: 'PPE', text: 'Goggles protect eyes, gloves protect hands, ear muffs protect ears and dust masks protect lungs.' },
      { title: 'Fire', text: 'Raise the alarm first. Never use water on electrical or oil fires.' },
      { title: 'Signs', text: 'Red circle with a line: prohibited. Blue circle: mandatory. Yellow triangle: warning. Green: safe condition.' },
    ],
    remember: 'Safety first, every time.',
  },
  'jt-careers': {
    intro: 'Knowing yourself helps you choose a career you will enjoy and do well in.',
    steps: [
      { title: 'Self-awareness', text: 'Think about your interests, talents, strengths and values.' },
      { title: 'Career fields', text: 'Technical (electrician), business (accountant), health (nurse), creative (designer) and more.' },
      { title: 'Senior school pathways', text: 'STEM, Social Sciences, and Arts and Sports Science lead to different careers.' },
    ],
    remember: 'Match careers to your interests and strengths.',
  },
  'jt-drawing': {
    intro: 'Technical drawing is a shared language for showing exactly how to make things.',
    steps: [
      { title: 'Instruments', text: 'T-square for horizontal lines, set squares for angles, compasses for circles.' },
      { title: 'Lines', text: 'Thick continuous: outlines. Dashed: hidden edges. Chain: centre lines.' },
      { title: 'Pictorial drawing', text: 'Isometric uses 30° receding lines; oblique uses 45°.' },
      { title: 'Scale', text: 'At 1 : 50, 1 cm on paper is 50 cm in real life.' },
    ],
    remember: 'Isometric 30°, oblique 45°.',
  },
  'jt-computers': {
    intro: 'Computers help us learn, create and communicate, and we must use them safely.',
    steps: [
      { title: 'Hardware', text: 'Input devices (keyboard, mouse), output devices (monitor, printer), the CPU and storage.' },
      { title: 'Software', text: 'System software runs the computer; application software does tasks like writing or calculating.' },
      { title: 'Staying safe online', text: 'Use strong passwords, never share personal details, and tell a trusted adult about anything upsetting.' },
    ],
    remember: 'Strong passwords, private details, kind words.',
  },
  'jt-materials': {
    intro: 'We choose materials by their properties, cost and effect on the environment.',
    steps: [
      { title: 'Wood', text: 'Hardwoods come from broad-leaved trees (mvule); softwoods from conifers (cypress). Wood is seasoned to dry it.' },
      { title: 'Metals', text: 'Ferrous metals contain iron and can rust. Non-ferrous metals like copper and aluminium do not.' },
      { title: 'Plastics and ceramics', text: 'Thermoplastics can be reshaped by heat; ceramics are fired clay, hard and heat-resistant.' },
    ],
    remember: 'Ferrous means iron; iron can rust.',
  },
  'jt-tools': {
    intro: 'Each tool has a job, and well-kept tools work better and more safely.',
    steps: [
      { title: 'Kinds of tools', text: 'Measuring (steel rule, try square), cutting (saws, chisels), driving (hammer, screwdriver), holding (vice, clamp).' },
      { title: 'Using tools', text: 'Use a hacksaw for metal and a tenon saw for wood; strike chisels with a mallet.' },
      { title: 'Care', text: 'Clean tools, sharpen blunt edges, oil metal parts and store them in their place.' },
    ],
    remember: 'Right tool, right job, right place.',
  },
  'jt-business': {
    intro: 'Good money habits and business skills help families and communities grow.',
    steps: [
      { title: 'Needs and wants', text: 'Needs come first (food, shelter); wants come after.' },
      { title: 'Budgets and saving', text: 'A budget plans income and spending. Saving keeps some money for later.' },
      { title: 'Business', text: 'Profit = income − costs. Good records show whether a business is doing well.' },
    ],
    remember: 'Needs first, save some, keep records.',
  },
}

export const JSS_AGRICULTURE_LESSONS: Record<string, Lesson> = {
  'ja-soil': {
    intro: 'Healthy soil feeds the crops that feed us.',
    steps: [
      { title: 'Soil types', text: 'Sand drains fast; clay holds water; loam is a balanced mix and best for most crops.' },
      { title: 'Nutrients', text: 'Nitrogen for leaves, phosphorus for roots, potassium for health and fruit.' },
      { title: 'Fertility', text: 'Add manure or compost, rotate crops with legumes, and add lime to acidic soils.' },
    ],
    remember: 'N for leaves, P for roots, K for fruit.',
  },
  'ja-conservation': {
    intro: 'Conserving water and trees keeps farms productive for future generations.',
    steps: [
      { title: 'Water harvesting', text: 'Roof catchment, water pans, zai pits and sand dams store rain for dry times.' },
      { title: 'Saving water', text: 'Drip irrigation and mulching reduce water loss.' },
      { title: 'Trees', text: 'Agroforestry grows trees with crops for fodder, firewood, shade and soil protection.' },
    ],
    remember: 'Catch the rain, cover the soil, plant trees.',
  },
  'ja-crops': {
    intro: 'Good crop practices from planting to storage give bigger, safer harvests.',
    steps: [
      { title: 'Propagation', text: 'By seed (maize, beans) or vegetatively: cuttings (cassava), vines (sweet potatoes), suckers (bananas), grafting (avocados).' },
      { title: 'Field practices', text: 'Weeding, thinning, gapping, top-dressing and pest control.' },
      { title: 'After harvest', text: 'Dry grain well, sort and grade produce, and store it clean and pest-free.' },
    ],
    remember: 'Plant well, care well, store well.',
  },
  'ja-animals': {
    intro: 'Well-cared-for animals stay healthy and give more milk, meat and eggs.',
    steps: [
      { title: 'Breeds', text: 'Dairy breeds: Friesian, Ayrshire, Jersey. Beef breeds: Boran, Sahiwal, Hereford.' },
      { title: 'Feeding', text: 'Roughages (grass, hay, silage) and concentrates (dairy meal) with clean water and minerals.' },
      { title: 'Health', text: 'Healthy animals are alert and eat well. Control ticks by dipping, worms by deworming, and diseases by vaccination.' },
    ],
    remember: 'Good feed, clean housing, regular health care.',
  },
  'ja-nutrition': {
    intro: 'A balanced diet gives the body everything it needs to grow and stay healthy.',
    steps: [
      { title: 'Nutrients', text: 'Carbohydrates give energy, proteins build the body, vitamins and minerals protect it.' },
      { title: 'Deficiencies', text: 'Lack of protein causes kwashiorkor; lack of iron, anaemia; lack of vitamin C, scurvy.' },
      { title: 'Special diets', text: 'Pregnant women need more iron; people with diabetes need less sugar; people with high blood pressure need less salt.' },
    ],
    remember: 'Go foods, grow foods and glow foods every day.',
  },
  'ja-foodprep': {
    intro: 'Cooking and preserving food safely protects health and reduces waste.',
    steps: [
      { title: 'Hygiene', text: 'Wash hands, keep raw and cooked foods apart, and cook food thoroughly.' },
      { title: 'Cooking methods', text: 'Steaming keeps vitamins best. Boiling, roasting, baking and frying suit different foods.' },
      { title: 'Preservation', text: 'Drying, salting, smoking, refrigeration and canning slow down germs.' },
    ],
    remember: 'Clean hands, separate foods, cook well.',
  },
  'ja-enterprise': {
    intro: 'Farming is a business: records and good marketing turn harvests into income.',
    steps: [
      { title: 'Records', text: 'Inventory, production, sales, health and labour records show how the farm is doing.' },
      { title: 'Profit', text: 'Profit = sales − costs.', example: ['sales 24 000 − costs 15 000 = 9 000 profit'] },
      { title: 'Marketing', text: 'Cooperatives, value addition (milk to yoghurt) and good packaging bring better prices.' },
    ],
    remember: 'Record everything; add value before you sell.',
  },
}
