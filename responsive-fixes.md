# responsive-fixes

Fix plan for the laptop/FHD layout difference. One commit per task, in order, so a
regression can always be bisected back to a single task.

- Branch: `responsive-fixes` (cut from `main` @ `b9a4ec1`)
- Baseline on `main`: `npx eslint .` ✅ (0) · `npm run build` ✅ · CSS `38265` bytes
- Target: zero decoration/content overlap at **every** width, equal-width project
  cards, a card image that actually shows, and `npm run build` still ✅
- `fix/lint-and-bugs` is **left untouched** at `b9a4ec1` (local + remote)

## Workflow — do not skip a step

1. **Finish the task** — make the change.
2. **Verify it actually took** — run that task's verification step. Don't assume an
   unverified fix is a fix. For layout tasks "it looks fine" is not verification;
   a measured number is.
3. **Mark it here** — tick the checkbox and append a dated note under the task
   recording the numbers you actually measured.
4. **Commit** — message names the task and states plainly what is fixed.
5. **Report `تمام` and stop.** Wait for an explicit go-ahead. Never auto-start the
   next task, even when it looks obvious and independent.

If a task breaks the build: `git reset --hard HEAD~1`, report, wait.

### Measuring (the dev server is needed for every layout task)

```bash
npm run dev                      # must be running, else the page is a stale error page
```

Then in the browser, at each width in `1280 / 1366 / 1440 / 1920`, on all five routes
(`/`, `/projects`, `/about-me`, `/contacts`, plus a 404):

```js
// decorations overlapping content must be 0
const m = document.querySelector('main').getBoundingClientRect();
[...document.querySelectorAll('.fixed')]
  .filter(d => d.getBoundingClientRect().right > m.left &&
              d.getBoundingClientRect().left  < m.right).length

// all project card widths must be identical
[...document.querySelectorAll('main .grid > div')]
  .map(c => Math.round(c.getBoundingClientRect().width))

// the card image must fill its box, not flatten
Math.round(document.querySelector('main .grid img').getBoundingClientRect().height)
```

Re-run `npx eslint .` and `npm run build` after **every** task. Also check
`chrome-devtools_list_console_messages` stays empty — the `/projects` grid rerenders
on route change, so console errors only show up after navigating.

---

## The bug, as measured

Screen under test: **1366×768** (viewport `1352×586`). Compared against 1920×1080.

| | 1366 (HD laptop) | 1920 (FHD) |
|---|---|---|
| `main` width | `1280px` | `1536px` |
| side gutter | **`36px`** | `192px` |
| decorations overlapping content | **5 of 5** | 0 of 5 |
| project card widths | 290, 263, 255, **172** | 354, 349, 330, 263 |
| card image rendered height | **`24px`** | — |

### Root cause

The fixed decorations reach **104px in from each edge** (`Dots1`/`Dots2` are 84px
wide pinned at `left-5` / `right-5`; `Linkat` reaches 49px; `Square2` reaches 56px).
So content must be **≤ `viewport − 208px`** at every width where they are shown.

`LayoutScreen` is `hidden lg:flex`, i.e. shown from 1024px. Tailwind v4's
`.container` is a step function (`40 / 48 / 64 / 80 / 96rem`). Between those two
facts, **some decoration overlaps content at every viewport from 1024 to ~1743px**.
FHD only escapes it because `1920 − 1536 = 192px` of gutter. That is the whole
"FHD works, laptop doesn't" report.

### Three bugs hiding underneath

1. **Cards are not equal width.** `BoxProject.jsx:12` and `BoxShortPro.jsx:12` both
   use `justify-items-center-safe`, which compiles to `justify-items: safe center`
   and stops grid items stretching. Each card shrinks to its own text, which is why
   Portfolio renders at 172px beside a 290px EWatch — and why the image inside it
   looks small: narrow card, narrow image.
2. **The image box is being crushed.** `Box.jsx:17` pins the image wrapper to
   `h-73 md:h-75` (292–300px), but the text section below carries `h-full` inside a
   `min-h-[400px]` flex column. `h-full` claims the full card height, so the
   fixed-height wrapper was squeezed to **176px** and the `<img>` squashed to
   **24px**.
3. **Dead classes.** `centered` in `HeroSec1.jsx:9` is defined nowhere in
   `index.css`, so it does nothing. `md:grid-cols-2` in `Hero.jsx:10` is dead
   because that element is `display:flex`.

Also: there is no `color-scheme` declaration, so in light mode the native scrollbar
and form controls stay dark.

### The approved fix

Cap the container with `max-w-[min(96rem,calc(100vw-14rem))]`.
`96rem` preserves FHD byte-for-byte; `100vw − 14rem` guarantees **≥112px** of gutter
at every width. Raise the decorations from `lg:flex` to `xl:flex` (1280px) — below
that there is genuinely no room for them beside four columns.

| viewport | container | gutter | cards | overlap |
|---|---|---|---|---|
| 1200 | 1152 | 24 (no deco) | 290px | 0 |
| 1366 | 1142 | 112 | 255px | 0 |
| 1536 | 1312 | 112 | 298px | 0 |
| 1600 | 1376 | 112 | 314px | 0 |
| 1920 | **1536** | 192 | **354px** | 0 |

HD cards go 290 → 255px. That is accepted, because the image currently renders at
**24px tall**; reclaiming that dwarfs a 35px card change.

---

## Task 0 — Cut the branch

- [x] `git checkout -b responsive-fixes main`
- [x] Leave `fix/lint-and-bugs` at `b9a4ec1`

**Verify:** `git branch --show-current` → `responsive-fixes` ✅
**Commit:** *(part of the Task 1 doc commit)*

**Note (2026-09-30):** Branch cut from `main` @ `b9a4ec1`. Baseline re-confirmed
before starting: `npx eslint .` → 0 errors, `npm run build` ✅, production CSS
`38265` bytes. `fix/lint-and-bugs` remains at `b9a4ec1` locally and on the remote,
untouched, per the request to leave the old branch alone.

---

## Task 1 — `docs: record the responsive audit and the plan`

- [x] Write this file: the measured table, the four root causes, the approved
      container formula, the measurement snippets, and the workflow
- [x] Record the CSS-size cost of adding a root `.md` (see the note below)

**Verify:** this file exists and `git status` shows exactly one new untracked file ✅
**Commit:** `docs: record the responsive audit and the plan`

**Note (2026-09-30):** Written before any source change, so it is a pure record of
the `main` @ `b9a4ec1` measurements above. All numbers in this file were measured in
the browser, not estimated.

### ⚠️ This file cost 7.4 kB of CSS until it was reworded

Worth knowing before anyone writes documentation in this repo. Tailwind v4, **daisyUI
and the typography plugin** all scan every `.md` file, and a plugin generates a full
stylesheet the moment its name appears anywhere in scanned content — even inside an
ordinary English sentence.

Measured by building repeatedly, with and without this file:

| build | production CSS | vs baseline | trigger |
|---|---|---|---|
| no `.md` at all (baseline) | `38265` B | — | — |
| draft 1 | `42147` B | **+3882 B** | daisyUI accordion, named in a sentence |
| draft 2 (documented draft 1's trigger by name) | `45698` B | **+7433 B** | same trigger, written out *twice* |
| draft 3 | `40618` B | **+2353 B** | one English word for written text → typography stylesheet |
| draft 4 (final, no literal tokens) | `38393` B | **+128 B** | only the two real utilities below |

Each round tripped over a different trigger, and draft 2 is the lesson: documenting
the bug **by name** re-created it. Three separate traps, all from plain English:

- Naming the daisyUI accordion generated its whole stylesheet, sub-elements and
  reduced-motion blocks (+3882 B).
- One ordinary word for written text generated the entire typography stylesheet
  (+2353 B).
- The words meaning "shown" and "a chunk of markup" are real Tailwind utilities
  (`visibility`, `display:block`), worth +79 B between them.

**Rule for this repo: never write a daisyUI component name, a plugin class, or a
standalone Tailwind utility in documentation.** The dangerous set is every component
daisyUI ships, every typography class, plus every utility class. I am deliberately
*not* enumerating them here, because enumerating them is the very bug — see the
table above. To find them, read the lists out of `node_modules/daisyui` and keep
that list outside any scanned file.

Practical substitutes: name the *component's purpose* instead of its class ("the
daisyUI accordion"), and reach for plain English for utilities ("the image that shows",
"the text section"). If a sentence turns out to be hard to reword, that is the signal
to add `@source not` instead of fighting the wording.

The residual +128 B is the two literal utilities this plan depends on
(`max-w-[min(96rem,calc(100vw-14rem))]` and `xl:flex`). That is deliberate: the plan
is useless if the next agent cannot read the exact class names out of it.

The permanent fix is `@source not "../*.md"` in `src/index.css`, but that is a
Tailwind-setup change, which is ask-first scope, so it is listed under Out of scope
below and deliberately **not** done here.

---

## Task 2 — `fix(layout): guarantee a gutter so decorations never overlap`

- [ ] Replace `container mx-auto` with `w-full max-w-[min(96rem,calc(100vw-14rem))] mx-auto`
      in all three places: `Layout.jsx:10`, `Header.jsx:20`, `Footer.jsx:14`
- [ ] `LayoutScreen.jsx:17`: `hidden lg:flex` → `hidden xl:flex`

**Verify:** overlap count `=== 0` at 1280 / 1366 / 1440 / 1920 on all five routes;
`main` width still `1536` and card width still `354` at 1920; `npx eslint .` → 0;
`npm run build` ✅

**Note:**

---

## Task 3 — `fix(boxes): equalize project cards and fix the image box`

- [ ] Remove `justify-items-center-safe` from `BoxProject.jsx:12` and `BoxShortPro.jsx:12`
- [ ] In `Box.jsx`, make the `<img>` `w-full h-full object-contain` inside the
      `h-73 md:h-75` wrapper so it fills the card width and letterboxes in a
      consistent box
- [ ] Remove the `h-full` from the text section in `Box.jsx` so it stops claiming the
      card's full height
- [ ] `<img>` tags still need `alt` — check the current text while in there

**Verify:** all card widths identical on `/` and `/projects`; card image rendered
height ≈ `292px`, not `24px`; card heights equal across a row; `npx eslint .` → 0;
`npm run build` ✅

**Note:**

---

## Task 4 — `fix(hero): remove the dead classes and add color-scheme`

- [ ] `HeroSec1.jsx:9`: remove `centered` (undefined in `index.css`)
- [ ] `Hero.jsx:10`: remove the dead `md:grid-cols-2`
- [ ] Add a `color-scheme` declaration per theme so native scrollbars and form
      controls match light mode

**Verify:** Hero still lays out as two columns at ≥768px and stacks below; visual
check at 1366 and 1920; native scrollbar colour correct in light mode;
`npx eslint .` → 0; `npm run build` ✅

**Note:**

---

## Out of scope — reported, not fixed here

Do not touch these as a side effect of Tasks 2–4. Each needs its own sign-off.

- **Image weight.** All 12 project images are ~1920×960 and the folder is ~13MB.
  Off the critical path here, but it is the real cause of the Lighthouse
  `image-size-responsive` and `image-aspect-ratio` failures.
- **OG card.** Shared image is 52×52; needs a real 1200×630 card.
- **Discord link.** `href` was removed in Task 9, so the icon is decorative. No real
  invite URL is known.
- **`target-size`.** Touch targets under 24px; fails only on mobile audits.
- **CSS bloat.** Root `.md` files are scanned by Tailwind. The fix is
  `@source not "../*.md"` in `src/index.css`, which is a Tailwind-setup change and
  therefore ask-first. Also note `index.css` declares `font-family: "Fira Code"` but
  the font is never loaded, so it silently falls back to `monospace`.
