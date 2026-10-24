# Launch film

A 37-second 1920×1080 film: a sealed map scroll opens, unfurls to the right with burnt, torn
edges while Kobe walks along it leaving footprints, and six stops show real app screens.

1. `npx vite --port 5173` in the repo root, then `node capture.mjs` (art and phone screens into `assets/`).
2. `node render.mjs` renders every frame, synthesises the soundtrack (`music.py`) and writes
   `out/cbc-helper-promo.mp4`. `node render.mjs --stills 3,10,32` writes single frames for checking.
3. Open `promo.html?play` through any static server at the repo root to watch it live.

Set `URL_TEXT` in `promo.html` to put the launch address on the end card's button.
All art, music and type come from the app itself or are generated here, so the film is free to post anywhere.
