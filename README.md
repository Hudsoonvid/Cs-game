# 🍩 LOCKED OUT — a night guard story

A 3D story game that runs in your web browser. You're the night security guard at the City Museum of
Natural History. You're watching videos and eating donuts... and then your computer session times out.
The password has been changed. The hint just says: **SOLVE THE PUZZLES.**

The first one is in the Dino exhibit. You like the Dino exhibit. What could go wrong?

## ▶ How to play

**Just open https://hudsoonvid.github.io/Cs-game** in Chrome, Edge or Firefox (double-click it). No install needed.

Or put it online for free with GitHub Pages: repo **Settings → Pages → Deploy from a branch → `main` / root**.
Then anyone can play at `https://<your-username>.github.io/<repo-name>/`.

**Or as one file:** every [release](https://github.com/Hudsoonvid/Cs-game/releases/latest) has
`locked-out.html` attached: the whole game in a single file. Double-click it to play, share it in Google
Classroom or Drive, or drop it on any website host (rename it `index.html` first). It needs the internet
only for its fonts. To make it yourself: `npm run build && npm run single`.

**Embedding it in another page** (like Google Sites) works too, but some pages don't let a game lock the
mouse, so you drag to look instead. The game then offers to open in its own tab, where the mouse locks, at
the address in `playUrl` in `game-config.js` (the game on GitHub Pages).

**The museum's website:** the City Museum of Natural History's own website, with the game on its home page,
is one file, `museum-website.html`, attached to every release. The whole game is packed inside it, so it
doesn't load anything from anywhere else. Paste the whole thing into Google Sites (*Insert → Embed → Embed
code*, then make it fill the page), and paste the new one in again when a new version comes out. It hides
a few secrets and puzzles of its own. Its page is [`website/index.html`](website/index.html) (without the
game, so the repo doesn't fill up with copies of it), its photos were taken inside the game
([`website/photos/`](website/photos)), and its staff-only area and puzzle answers are in
[`tools/website.mjs`](tools/website.mjs). `npm run website` builds the game and puts it all together into
`museum-website.html`.

| Action | Keys |
|---|---|
| Move / look | `W A S D` + mouse |
| Use / inspect | `E` (or click) |
| Flashlight on/off | `F` |
| Sprint (burns donuts faster!) | `Shift` |
| Chase: change lanes / jump / slide | `A D` or `← →` / `W` or `Space` / `S` or `↓` |
| Pause | `Esc` |
| Skip a line / cutscene | `Space` / `Esc` |

Phones and tablets get touch controls (stick + buttons, and swipes during the chase) — play in landscape.
In the maze, press `M` to show/hide the map that fills in as you explore. During the chase, the
**BEHIND YOU** view shows how close the T-Rex is. The full list is under **CONTROLS** in the menu and pause screen.

**Settings** has volume, voices (robot text-to-speech, cute beeps, or off), subtitles, mouse sensitivity,
field of view, brightness, camera shake, and graphics quality (High adds glow effects; Fast is for older computers).

## 📖 The story (spoilers!)

| | Chapter | What happens |
|---|---|---|
| 🖥️ | **Prologue — Session Expired** | Night shift #47. MeTube, a Dozen Deluxe, and a warning from Aaron. The session times out, `donut123` doesn't work anymore, and the hint button says *solve the puzzles*. |
| 🦖 | **Chapter 1 — The King** | Flashlight on. Find the cipher panel next to the T-Rex skeleton and decode it with the bone wheel. Then turn around... *where did the T-Rex go?* |
| 🏺 | **Chapter 2 — Curse of the Pharaoh** | Giant footprints lead into the Egyptian Wing. Read the Egyptian numbers on the four painted pillars, crack the Pharaoh's Lock... and then the sarcophagus starts to open. The mummy is awake. And it's hungry. |
| 🏛️ | **Chapter 3 — All Roads** | On to the Roman Empire hall. Crack the Roman-numeral lock. Something is breathing behind you. |
| 🏃 | **Chapter 4 — RUN** | A skeleton T-Rex chase down the museum gallery, endless-runner style. Dodge, jump, slide, grab donuts. At the end: **GO RIGHT**, into the hole shaped exactly like you. |
| 🗝️ | **Chapter 5 — Behind the Walls** | The archives, the last part of the night. A fuse box, three lost keys and a torn poster guard the last password pieces... and then the archives just keep going: Spare Dinosaur Bones, the Flooded Bit, Holiday Decorations, a Power Outage... Every new gate has a new puzzle, each one a bit harder, and the donuts get smaller. You *will* run out of donuts. How far can you get? |
| ☀️ | **Chapter 6 — Morning Shift** | You fell asleep somewhere deep in the archives. Now the museum is open and full of visitors (press **E** to chat, and try not to bump into them). The T-Rex is back on its stand, wearing your hat. Aaron is there. The front doors are open, so walk out onto the plaza: the museum's 50th birthday parade is coming down the street (marching band, floats, a giant donut...). You're still locked out. |
| 🧩 | **???** | Back at the menu... the game seems a little short, doesn't it? |

The **donut meter** (top-left) drains the whole night. Solving a puzzle gives you a donut. If the meter hits
zero, you fall asleep on the job. In the endless archives that's how the night ends; anywhere else it's game over.

There are **16 hidden donuts**, and most are hard to find:
* **2** are out in the open.
* **8** are in **secret rooms** in the museum. Look for something on a wall that seems a little *off* (a crooked
  poster, a loose brick, a strange fossil, a torch holder...) and press **E** on it.
* **6** are in the first three sections of the archives. One in each section is behind a shelf with a strange
  pink box on it.

The deeper archives have more donuts and secret shelves, but they keep getting smaller (and don't count toward the 16).

## 🎬 Put yourself in the game

You can star as the security guard, the developer on the menu TV, Aaron — and the Mummy. Only photos and
videos **in this repo** are used, so only you decide who's in the game.

* **Act out the emotions (easiest):** every line has an emotion (happy, scared, angry, hungry...). Take one
  photo of yourself making each face, like `assets/clips/guard-scared.jpg`, and every scared line uses it.
  A short video works too (`guard-scared.mp4`, played silently on a loop).
* **Say the real lines:** a video named after a line, like `assets/clips/guard05.mp4` for
  *"WHAT?! Who changed my password?!"*, plays with your own voice.
* **One photo for everything:** `assets/clips/guard.jpg` (or `dev.jpg`, `aaron.jpg`, `mummy.jpg`).

**Recording lines on your phone:** the Dev Line Booth and the Guard & Aaron Booth (ask Claude for the links) show
each line like a teleprompter, record it with your phone's camera and send it to Claude, who puts it in the game.
When lines are added, they show up there marked NEW.

The full list of emotions to act, file names and lines is in [`assets/clips/README.md`](assets/clips/README.md),
with steps for uploading on GitHub.

Change the names shown in subtitles (and the game title) in [`game-config.js`](game-config.js) — no rebuild needed.

**Dev mode:** on the menu, tap the **LOCKED OUT** logo 7 times and type the dev code to unlock every chapter,
every hidden donut and the ending. The code is `devCode` in [`game-config.js`](game-config.js) (`IAMTHEDEV` until
you change it — the repo is public, so pick your own). Set it to `''` to turn dev mode off. Once it's on, press <kbd>`</kbd> in the game (or use the pause menu) for the **admin panel**: jump to
any chapter, trigger events and title cards, teleport, and cheats like endless donuts and walking through walls.

## 🔢 Versions

The game's version shows in the corner of the menu (and in the pause screen and credits). Every version has a
matching [GitHub release](https://github.com/Hudsoonvid/Cs-game/releases), and [`CHANGELOG.md`](CHANGELOG.md)
says what changed. To release an update: bump `version` in `package.json`, add a section for it to the
changelog, run `npm run build`, and merge to `main`. The release is created for you.

## 📊 See who's playing

The game can count plays, and what people play on (phone or computer, iPhone/Android/Windows/Mac, which browser,
screen size), on a free [GoatCounter](https://www.goatcounter.com) dashboard. It's anonymous: no cookies, no names,
nothing personal. It's off until you turn it on:

1. Sign up at [goatcounter.com](https://www.goatcounter.com) and pick a code, like `lockedout`. Your dashboard is
   then `lockedout.goatcounter.com`.
2. In [`game-config.js`](game-config.js), set `analytics: 'lockedout'` (your code).
3. That's it. You'll see a `play` every time someone starts the game, plus `chapter/...` for each chapter they
   reach and `finished` when someone gets to the end. The Browsers, Systems and Sizes charts show what they played on.

## 🛠 For developers

The game is written in plain JavaScript with [three.js](https://threejs.org). Everything — the museum,
the T-Rex, the music and every sound effect — is generated in code. `dist/game.js` is the built bundle
(committed, so `index.html` works with no setup).

```bash
npm install
npm run dev     # live-rebuild + local server at http://localhost:8080
npm run build   # rebuild dist/game.js after changing anything in src/
npm run clips-readme  # rewrite assets/clips/README.md after changing lines in src/game/script.js
```

| Folder | What's inside |
|---|---|
| `src/game/` | the story (`chapters.js`), every spoken line (`script.js`), game loop, player |
| `src/world/` | the museum (and its secret rooms), its exhibits (`exhibits.js`), the city outside and the parade (`city.js`), T-Rex skeleton, people, the chase level, the endless archives maze, textures (`textures.js`, and the painted walls/floors/ceilings in `surfaces.js`) |
| `src/puzzles/` | the puzzles (cipher wheel, Pharaoh's Lock, Roman dials, fuse box, sliding poster, memory lock). The endless archives reuse them with generated settings. |
| `src/ui/` | HUD, subtitles/facecam (with the cartoon emotion faces), menu, the login computer |
| `src/core/` | input, synthesized audio + music, timing |

Jump straight to a chapter while testing: `index.html?chapter=dino` (also `intro`, `egypt`, `roman`, `chase`, `maze`, `morning`).
