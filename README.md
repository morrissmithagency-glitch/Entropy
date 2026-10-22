# CBC Helper

Calm, nature-themed practice for Kenyan learners on the Competency-Based Curriculum (CBC/CBE).
Grades 1 to 6 are live, with KPSEA practice papers for Grade 6; PP1, PP2 and Grades 7–9
show as "Coming soon".

Learners pick a **world** (learning area) and walk a path **strand by strand**. Each
sub-strand is a stop with five levels that grow like a tree:

| Level | Name | Difficulty |
|---|---|---|
| 1 | Seed | Recognise, with pictures |
| 2 | Sprout | Fewer clues |
| 3 | Sapling | Two steps of thinking |
| 4 | Acacia | End-of-term paper standard |
| 5 | Baobab | Hardest end-term questions |

Each quiz has 8 questions and opens with two warm-ups one level lower. Passing (5/8) unlocks
the next level. When every stop in a strand reaches Acacia, the strand's **Baobab Challenge**
unlocks: 10 mixed questions at levels 4–5.

## What's in Grades 4, 5 and 6 (upper primary and KPSEA)

Eight worlds per grade, following the rationalised KICD upper-primary designs: Mathematics,
English, Kiswahili, Science and Technology, Agriculture and Nutrition, Social Studies, Creative
Arts and CRE. 223 sub-strands (74, 75 and 74). Topics grow year by year: numbers to 100,000 in
Grade 4 and to millions with percentages in Grade 6; Social Studies moves from our county
(Grade 4) to Kenya (Grade 5) to East Africa (Grade 6). Difficulty is set by JESMA papers and
the KPSEA format.

* **Questions.** Maths generators for every topic (8-digit answers, bar graphs and tables),
  English and Kiswahili grammar makers built on hand-checked tables (ngeli agreement,
  kukanusha, -nge-/-ki-, reported speech, passive voice, question tags), comprehension and
  cloze passages in KPSEA format, and fact tables plus written scenario questions for the
  sciences, Social Studies, Creative Arts and CRE.
* **Lessons.** One lesson per topic (`src/lessons/upper-*.ts`), shared by the grades that
  teach it; Kiswahili lessons are in Kiswahili.
* **KPSEA practice papers.** Five exam-style papers on the Grade 6 page (Mathematics, English,
  Kiswahili, Integrated Science, Creative Arts and Social Studies), 25 questions each, drawn
  from all of Grades 4–6 at levels 3–5. Every sitting is a new paper; missed questions go to
  the mistakes review. A plan covering Grade 6 opens them; the first paper is free.

See [`research/upper-primary-strands.md`](research/upper-primary-strands.md).

## Child-safe content

`src/engine/__tests__/safety.test.ts` scans every question, wrong answer and lesson for
cruel or frightening wording (no harming animals, violence or scary scenarios), so content
stays light and educational.

## What's in Grade 2

Six worlds: Maasai Mara (Maths), Mount Kenya Forest (English), Rift Valley Farms
(Environmental), Fukwe za Malindi (Kiswahili), Lake Bogoria (Creative Activities) and Valley
of Light (CRE): 63 sub-strands, each with a lesson and at least 15 different questions per
level (stories: 5). Environmental Activities follows the published KICD design exactly; the
other areas follow the lower-primary pattern and need checking against the KICD PDFs. See
[`research/grade2-strands.md`](research/grade2-strands.md).

## What's in Grade 3

Six worlds, each with its own painted landscape: Golden Plains (Maths), Kakamega Forest
(English), Tea Hills (Environmental), Pwani ya Lamu (Kiswahili), Flamingo Lake (Creative
Activities) and Morning Hills (CRE). Strands and sub-strands follow the Grade 3 strand guide
(the rationalised KICD designs): 14 maths, 11 English, 12 environmental, 9 Kiswahili,
11 creative and 5 CRE sub-strands. Question types and difficulty follow Grade 3 end-term
papers; see [`research/grade3-papers.md`](research/grade3-papers.md).

## What's in Grade 1

Six worlds: Number Savanna (Maths), Story Forest (English), Village & Wild (Environmental),
Bustani ya Maneno (Kiswahili), Sunbird Meadow (Creative Activities) and Garden of Grace (CRE):
52 sub-strands, each with a short picture-led lesson and at least 15 different questions per
level (stories: 5). Creative Activities follows the KICD Grade 1 design (Creating and
Exploration; Performing and Display); CRE follows the Grade 2 and 3 pattern and needs
checking against the KICD PDF.

The curriculum mapping, sources and confidence levels are in
[`research/grade1-strands.md`](research/grade1-strands.md). All questions are original:
commercial papers (JESMA etc.) were used only as a guide to format and difficulty.

## Enough to practise for a term

Every Grade 1, 2 and 3 sub-strand has at least 15 different questions at every level (comprehension:
7, because stories are written by hand), and most have hundreds. Grades 4–6 have at least 10
(passages: 8), and most have hundreds. The test
`src/engine/__tests__/depth.test.ts` keeps it that way. Quizzes mix two sources:

* **Written questions** for stories, reasoning and "what should you do" situations.
* **Question makers**: maths generators, English and Kiswahili grammar makers built on
  checked word tables (verbs, comparing words, *kukanusha*, *hili/haya*, *yeye/wao*), and
  fact tables for Environmental, Creative and CRE (`src/engine/banks/grade3-facts.ts`) that
  produce "Which one is…", "Which one is NOT…" and "Which group has only…" questions.

## Teaching, not just testing

* **Lessons.** Every sub-strand in Grades 1, 2 and 3 has a short, read-aloud lesson with worked examples
  (`src/lessons/`). A new sub-strand starts with its lesson; the lesson ends on one key
  idea to remember. Kiswahili lessons are written in Kiswahili.
* **Mistakes explained.** A wrong answer shows why, then gives one unscored question on the
  same idea straight away ("Try one like it").
* **Mistakes review.** Missed questions come back the next day, then after 3 days, then a
  week, until they stick.
* **For parents.** Behind a simple grown-ups' sum: what the child is good at, where they are
  stuck (with the lesson's key idea to go over together) and what to practise this week.

## Plans

The first strand in every world is free. Plans open the rest, paid with M-Pesa STK Push:
Weekly KSh 300, Standard KSh 950 a month (one grade, one child), Pro KSh 1,250 a month
(every grade, up to 3 children) and Super Pro KSh 3,450 a month (Pro plus parent reports and
printable papers, both coming soon). The payments server is in [`server/`](server/README.md);
without it the app runs in a clearly marked test mode.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # validates every sub-strand × level × 40 seeds
npm run build
```

Dev-only helpers: `?gallery` shows every illustration and widget, and
`?screen={"name":"quiz","area":"math","sub":"m-time","level":4,"paper":1}` opens any screen directly.

## How it's built

* **React 19 + Vite + TypeScript**, with Framer Motion for animation. There's no backend yet;
  progress is saved in `localStorage`.
* `src/curriculum/` lists the strands and sub-strands. `src/engine/` holds the seeded
  question generators, the written question banks and the quiz builder.
* **Landscapes** (`NatureScene.tsx`) are painted in SVG from seeded ridgelines, with
  atmospheric haze, mist, water reflections, and canvas stars and fireflies. Layers drift with
  the pointer. Question illustrations are hand-built SVG (`src/components/art/`); to swap in
  commissioned artwork, keep the same ids.
* **Design**: night blues with dawn and gold accents, frosted glass, Fraunces display and
  Lexend body type. Tokens are in `src/styles/global.css`.
* **Cloth transition** (`Curtain.tsx`) is a single WebGL shader: dusk-coloured silk with a
  rippling hem and a Kiswahili proverb. It falls back to CSS without WebGL and to a fade
  under reduced motion.
* **Sound** is synthesised: kalimba tones for answers and a quiet nature bed (wind and
  distant chimes) that can be switched off, and questions are **read aloud** with the
  browser's speech engine (en-KE/en-GB, sw-KE where available). Both can be toggled.
* Kobe the tortoise ("kobe" is Kiswahili for tortoise) is the mascot. His eyes follow
  the pointer and his mood follows the child's answers.

## Before launch

* Check the Kiswahili strand names and the exact Grade 1 number ranges against the KICD PDFs.
  `kicd.ac.ke` was blocked from the build environment, so these came from secondary sources.
* Have a Grade 1 teacher review the written question banks.
* Replace placeholder art with the original artwork.
* Deploy the payments server and build with `VITE_PAYMENTS_API` (see [`server/README.md`](server/README.md)).
* Add parent accounts, so a plan follows the family to another phone.
