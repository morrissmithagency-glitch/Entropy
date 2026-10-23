# Pre-primary (PP1 and PP2): curriculum notes

## Activity areas (KICD pre-primary design)

Five activity areas: Language Activities, Mathematical Activities, Environmental Activities,
Psychomotor and Creative Activities, and Religious Education Activities (the app follows the
CRE strand). Confidence: **high** for the areas; **medium** for strand names (Classification,
Numbers, Measurement, Geometry; Listening and Speaking, Reading and Writing Readiness;
Social and Natural Environment, Health Practices, Care for the Environment); **lower** for the
exact sub-strand split, which follows pre-primary course books. The KICD PDFs could not be
fetched here and should be checked.

## How the app maps them

* Area ids `pp1-math`…; sub-strand ids `p{year}{area}-{topic}` (e.g. `p2m-count`); topics
  shared by both years share one lesson (`pm-count`).
* PP1 counts to 5 at first and 10 at most; PP2 to 15, adds and takes away within 10, and meets
  coins and the days of the week.
* Every question is read aloud and answered by tapping a picture, shape, colour or number.
  Number choices are close neighbours only (never a jump of ten).
* Some topics reuse the gentlest Grade 1 questions (greetings, listening, first sounds,
  weather, animals, plants, hygiene, music, Bible), re-levelled so each year climbs slowly;
  the rest have their own question makers (`src/engine/generators/preprimary.ts`).
* Each topic has a short, picture-led lesson (`src/lessons/preprimary.ts`).
