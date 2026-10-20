# CBC Helper

Adventure-style practice for Kenyan learners on the Competency-Based Curriculum (CBC/CBE).
Grade 1 is live; the other grades show as "Soon".

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

## What's in Grade 1

| World | Learning area | Strands | Questions |
|---|---|---|---|
| Number Savanna | Mathematical Activities | Numbers · Measurement · Geometry | Generated, so every paper is new |
| Story Forest | English Language Activities | Listening & Speaking · Reading · Language Use · Writing | Generated phonics/spelling/grammar + written passages |
| Village & Wild | Environmental Activities | Social · Natural · Resources | 165 written questions |
| Bustani ya Maneno | Kiswahili Language Activities | Kusikiliza na Kuzungumza · Kusoma · Kuandika | Generated vocabulary/syllables + written passages |

The curriculum mapping, sources and confidence levels are in
[`research/grade1-strands.md`](research/grade1-strands.md). All questions are original:
commercial papers (JESMA etc.) were used only as a guide to format and difficulty.

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
* **Art** is hand-built SVG in one ink-outline style (`src/components/art/`). To swap in
  commissioned artwork, keep the same ids.
* **Cloth transition** (`Curtain.tsx`) is a single WebGL shader: a kanga cloth with a
  rippling hem and a Kiswahili proverb. It falls back to CSS without WebGL and to a fade
  under reduced motion.
* **Sound** is synthesised kalimba tones, and questions are **read aloud** with the
  browser's speech engine (en-KE/en-GB, sw-KE where available). Both can be toggled.
* Kobe the tortoise ("kobe" is Kiswahili for tortoise) is the mascot. His eyes follow
  the pointer and his mood follows the child's answers.

## Before launch

* Check the Kiswahili strand names and the exact Grade 1 number ranges against the KICD PDFs.
  `kicd.ac.ke` was blocked from the build environment, so these came from secondary sources.
* Have a Grade 1 teacher review the written question banks.
* Replace placeholder art with the original artwork.
* Add the paywall (M-Pesa) and parent accounts (see the plan).
