# Launch film

A 37-second 1920×1080 film: a sealed map scroll opens, unfurls to the right with burnt, torn
edges while Kobe walks along it leaving footprints, and six stops show real app screens.

1. `npx vite --port 5173` in the repo root, then `node capture.mjs` (art and phone screens into `assets/`).
2. `node render.mjs` renders every frame, synthesises the soundtrack (`music.py`) and writes
   `out/cbc-helper-promo.mp4`. `node render.mjs --stills 3,10,32` writes single frames for checking.
3. Open `promo.html?play` through any static server at the repo root to watch it live.

Set `URL_TEXT` in `promo.html` to put the launch address on the end card's button.
All art, music and type come from the app itself or are generated here, so the film is free to post anywhere.

## The second film: The Cartography of Learning

A 48-second film rendered in WebGL2 (`promo2.html`): footprints of light walk across an
obsidian floor to a sealed scroll inside a turning astrolabe; the rings lock, the seal shatters
into glass, and the map unrolls while glass monoliths holding real app screens rise through
it. The camera flies like a drone, with depth of field, bloom, god rays and anamorphic flares.
It trembles on the same cues the soundtrack (`music2.py`) hits, which the page publishes as
`window.CUES`.

```bash
node render.mjs --page promo2.html --out ethereal --music music2.py --workers 3
```

About two seconds a frame per worker, so roughly 15 minutes for the whole film on 4 cores.
