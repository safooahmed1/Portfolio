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

> **Corrected in Task 2b.** This cap is now applied at `xl` and up only, because the
> `14rem` reservation is only needed where the decorations are actually drawn. Below
> 1280 the container is full width and the page's own padding is the only gutter. The
> predicted table below was also wrong: that formula yields `976` at viewport 1200, not
> the `1152` written here. The measured column is the corrected one.

| viewport | container | gutter | cards | overlap |
|---|---|---|---|---|
| 1200 | ~~1152~~ **1185** | full width (no deco) | 266px | 0 |
| 1366 | 1142 | 112 | 256px | 0 |
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

- [x] Replace `container mx-auto` with `w-full max-w-[min(96rem,calc(100vw-14rem))] mx-auto`
      in all three places: `Layout.jsx:10`, `Header.jsx:20`, `Footer.jsx:14`
- [x] `LayoutScreen.jsx:17`: `hidden lg:flex` → `hidden xl:flex`

**Verify:** overlap count `=== 0` at 1280 / 1366 / 1440 / 1920 on all five routes;
`main` width still `1536` and card width still `354` at 1920; `npx eslint .` → 0;
`npm run build` ✅

**Note (2026-09-30):** Both changes are in and measured in the browser.

Overlap of decorations with content is **0** on all five routes at all four widths —
20 measurements, all zero, against the 5-of-5 the audit recorded at 1366. `main` now
measures 1056 / 1142 / 1216 / 1536 at 1280 / 1366 / 1440 / 1920, so the narrowest
gutter is `105px`, just clear of the `104px` the decorations reach in from each edge.

FHD is untouched: `main` `1536` and project card `354` at 1920, identical to the
baseline in the audit table.

Gates: `npx eslint .` → 0 errors. `npm run build` ✅. Production CSS `38393` B, which
is baseline `38265` + the `128` B Task 1 predicted — and both new rules are confirmed
present in the built stylesheet, so this is the real cost, not a stale build. Console
empty, including after a client-side route change off the grid and back, which is the
case the measuring notes above warn about.

Two notes for whoever picks up Task 3:

- Card widths are **still** unequal at 1280 on the grid — ten at 255px and two at
  234px. Unequal cards and the crushed image box are Task 3's job, recorded here, not
  fixed here.
- The two places in `AGENTS.md` that said the decorations start at 1024 are now
  corrected, since this change made them wrong. It costs no CSS: the older rule is
  still genuinely needed by `MySkills.jsx:19`.

---

## Task 3 — `fix(boxes): equalize project cards and fix the image box`

- [x] Remove `justify-items-center-safe` from `BoxProject.jsx:12` and `BoxShortPro.jsx:12`
- [x] In `Box.jsx`, make the `<img>` `w-full h-full object-contain` inside the
      `h-73 md:h-75` wrapper so it fills the card width and letterboxes in a
      consistent box
- [x] Remove the `h-full` from the text section in `Box.jsx` so it stops claiming the
      card's full height
- [x] `<img>` tags still need `alt` — check the current text while in there

**Verify:** all card widths identical on `/` and `/projects`; card image rendered
height ≈ `292px`, not `24px`; card heights equal across a row; `npx eslint .` → 0;
`npm run build` ✅

**Note (2026-09-30):** All four done, all measured.

Card widths are now identical everywhere measured: at 1920 all 12 are `354` on
`/projects` and all 4 are `354` on `/`; at 1366 all 12 are `256` and all 4 are `256`;
at 900, where the grid drops to two columns, all 12 are `318`. Before, at 1280, ten
cards were 255 and two were 234.

The wrapped picture now measures `299px` at every width instead of being squeezed to
its natural height, and every card in a row has the same height: `504/504/504/504`,
`468/468/468/468`, `552/552/552/552` at 1366, and `468/468/468/468` at 1920. Rows are
not equal to *each other*, which is correct: the last four projects have one button
instead of two, and the description text wraps differently per card width.

`alt` needed no change. The cards already pass `alt={el.name}`, and the accessibility
tree confirms it — the images read as "EWatch", "Coffee", "Portfolio" and so on.

Gates: `npx eslint .` → 0. `npm run build` ✅. Production CSS `38373` B, down 20 B from
`38393`. That is the old automatic-height rule disappearing: it was used in `Box.jsx`
and in no other source file, and unlike the earlier traps this one is not named in any
scanned markdown, so removing it really did remove it. Console empty, including after
a client-side route change onto the grid.

### Finding — the picture itself did not get bigger

Worth a decision, and **not** acted on here. The plan expected a crushed 24px picture
to be reclaimed, and expected that to dwarf the card change. Measured, it did not.

At 4 columns the source images are about 2:1, so the 299px box holds a picture of only
`176px` at 1920 and `127px` at 1366 — roughly 60px of empty space above and below each
one. Task 2 already recorded `127` on `/projects` at 1366, so the *visible* picture is
the same size as it was before this task; what actually changed is that the box is now
a consistent 299px instead of collapsing to the picture's own height, and the cards are
equal width.

So the squash is genuinely gone and the two layout goals are met, but at four columns
this buys a taller, airier card rather than a bigger picture. Three ways to change that,
each needing its own sign-off: cover instead of contain, which fills all 299px and crops
the sides; a shorter image box closer to 2:1, which removes the empty bands; or an
explicit 2:1 aspect box, which letterboxes almost nothing but varies with card width.

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

## Task 3a — owner-requested amendment to Task 3: hug the picture, add a gap

- [x] Replace the fixed image-box height with a 2:1 box, so the box is the picture's
      own size at every screen width instead of a fixed pixel height that only
      happened to suit one breakpoint
- [x] Give the box vertical margin so the text is not tight against it, replacing the
      horizontal rule that used to do that job

**Verify:** box ratio exactly 2 at every width tested; zero vertical slack between the
box and the picture; all cards in a row still one height; `npx eslint .` → 0;
`npm run build` ✅

**Note (2026-09-30):** The owner reviewed the Task 3 result and asked for three
changes: the box should be exactly the size of the picture whatever the screen width,
there should be a visible vertical gap so the text is not tight against it, and the box
should have pleasant proportions at every width. Done as one amendment commit, so the
original Task 3 commit stays bisectable.

Measured, at 1920 / 1366 / 900 / 390:

| viewport | box | ratio | vertical slack | gap to heading |
|---|---|---|---|---|
| 1920 | `352x176` | `2.000` | `0` | `40px` |
| 1366 | `254x127` | `2.000` | `0` | `40px` |
| 900 (two columns) | `316x158` | `2.000` | `0` | `40px` |
| 390 (one column) | `132x66` | `2.000` | `0` | `40px` |

Vertical slack is zero everywhere, so the box height equals the picture height at every
width: the empty bands the previous commit introduced are gone. Horizontally, eleven of
the twelve sources fill the box to within a pixel, because eleven of them are about 2:1.
The twelfth, at `1907x1080`, is 1.77:1 and keeps `21px` of slack per side at 1920,
narrowing to `8px` at 390. Cards are still one height per row, and rows got shorter and
tidier: `400 / 400 / 419` at 1366, down from `504 / 468 / 552`.

The gap is `40px` at every width: `20px` of margin below the box plus the `20px` the
text section already had. The horizontal rule that used to sit under the box is gone,
since the gap now does its job.

Gates: `npx eslint .` → 0. `npm run build` ✅. Production CSS `38443` B, up 70 B: the
new aspect-ratio and margin rules are added, while the fixed height for the larger step
disappears. Console empty, including after a client-side route change. Task 2's zero
overlap still holds.

Worth knowing: the old fixed height rule is *still* in the built stylesheet even though
no component uses it any more, because the Task 3 checklist above names it in plain
text. That is the markdown trap from Task 1, catching the very plan that documents it.

And the trap caught me too, one paragraph lower. The first draft of this note cost
`525` B by naming a daisyUI component in an ordinary sentence while describing the rule
I had removed; rewording that one word brought it straight back to `38443`. Verified by
diffing the built selector lists with and without this note, not by trusting the total:
the diff is now empty, so the note itself is free.

### 🔴 Finding — Task 2 broke phone and tablet widths

Found while measuring the 390 row above, and **not fixed here**: the box at 390 is
`132x66`, which is technically a perfect 2:1 box in a container far too small to be
believable.

The cause is Task 2's cap, `min(96rem, 100vw - 14rem)`. It subtracts `224px` at *every*
width, including widths where the decorations are hidden. At a 390px phone that leaves
`main` at `166px`, and after the page's own `16px` padding each side the cards get
`134px`. Before Task 2 the shared container was simply full width, so those same cards
were `358px`.

So the reservation is charged at widths that do not need it. The decorations only appear
from 1280, so the reservation should only apply from 1280 too. The ready fix is to keep
the plain `96rem` cap as the default and add the `100vw - 14rem` half at `xl` and up,
which restores phones and tablets and leaves all four verified desktop widths exactly as
they are. It needs its own task and its own sign-off, because it touches Task 2.

This also means the Task 2 table in this file is wrong: it predicts a `1152` container at
viewport 1200, but that formula can never produce it — at 1200 it yields `976`.

**Closed by Task 2b below.**

---

## Task 2b — `fix(layout): reserve the gutter only where the decorations are drawn`

- [x] Move the whole cap behind `xl` in all three places: `Layout.jsx:10`,
      `Header.jsx:20`, `Footer.jsx:14`, so below 1280 the container is full width and
      the page's own padding is the only gutter
- [x] Correct the wrong predicted container width in the Task 2 table above

**Verify:** below 1280 the container is full width and the cards are as wide as the
padding allows; 1280 / 1366 / 1440 / 1920 keep exactly the widths measured in Task 2,
with overlap still 0; `npx eslint .` → 0; `npm run build` ✅

**Note (2026-09-30):** The owner asked for exactly this: below the desktop breakpoint
there should be no container, just simple padding, because the content is already large
on a phone. The `14rem` reservation now only applies from 1280, which is where the
decorations start being drawn.

Below 1280, measured: at 390 `main` is `375` and cards are `343`, against `166` and
`134` before this change — a 2.5x wider card on a phone. At 768 `main` is `753` and cards
are `357`. At 1200 `main` is `1185`, full width, with zero decorations drawn and zero
overlap. The image box is still a perfect `2.000` ratio with no vertical slack at 390,
and the 40px gap above the text is unchanged.

At and above 1280 nothing moves: `main` measures `1056` / `1142` / `1216` / `1536` at
1280 / 1366 / 1440 / 1920, identical to Task 2, with cards `234` / `256` / `274` / `354`
and overlap 0 at every one. Header row, footer row and the navigation row all sit at
`1536` from `left 185` at 1920, so the three stay aligned, and at 390 there is no
horizontal overflow on any route.

Gates: `npx eslint .` → 0. `npm run build` ✅. Production CSS `38527` B, up 84 B for the
prefixed rule inside the 80rem media query. Console empty, including after a client-side
route change on a phone viewport.

Two things found along the way, both left alone:

- The *unprefixed* version of this rule is still in the built stylesheet even though no
  component uses it any more, because Task 2's checklist above names it in plain text.
  Same markdown trap as Task 3a, costing about 48 B.
- `NavbarXl.jsx:10` puts `w-screen`, which is `100vw`, on a row *inside* the capped
  container. It happens to be harmless today only because the row is a flex item and
  shrinks to fit; at every width measured the row is exactly the container width and
  nothing overflows. It is one `w-full` away from being a real bug, but it is not part of
  this task.

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
