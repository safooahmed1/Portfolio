# todo-list-fix

Fix plan for the portfolio app. One commit per task, in order, so a regression can
always be bisected back to a single task.

- Branch: `fix/lint-and-bugs` (cut from `main` @ `d6b5de8`)
- Baseline on `main`: `npm run build` ✅ (5.13s) · `npm run lint` ❌ **36 errors**
- Target: `npm run lint` = **0 errors**, `npm run build` ✅

## Workflow — do not skip a step

1. **Finish the task** — make the change.
2. **Verify it actually took** — run the task's verification step. Don't assume.
3. **Mark it here** — tick the checkbox and append a dated note under the task.
4. **Commit** — message names the task and states the error is gone.
5. **Report `تمام` and stop.** Wait for an explicit go-ahead. Never auto-start the
   next task, even when it looks obvious and independent.

If a task breaks the build: `git reset --hard HEAD~1`, report, wait.

---

## Task 0 — Cut the branch

- [x] `git switch -c fix/lint-and-bugs`
- [x] Commit the two planning docs that were untracked on `main`

**Verify:** `git branch --show-current` → `fix/lint-and-bugs` ✅
**Commit:** `chore: add AGENTS.md and todo-list-fix.md planning docs`

**Note (2026-09-29):** Branch cut from `main` @ `d6b5de8`. `git branch --show-current`
returns `fix/lint-and-bugs`. Baseline re-confirmed on the branch before starting:
`npx eslint .` → 36 errors, unchanged. `AGENTS.md` and `todo-list-fix.md` were
untracked, so they are committed here to keep every later commit source-only.

---

## Task 1 — `chore(eslint): add eslint-plugin-react and jsx-uses-vars`

The 30 `motion` errors are **false positives**: every one of those files does use
`motion` in JSX, but core `no-unused-vars` cannot see JSX references without
`eslint-plugin-react`. Deleting the imports would break every page. Fix the
*rule*, never the imports.

- [x] `npm i -D eslint-plugin-react` → installed `7.37.5`
- [x] `eslint.config.js` — import the plugin, register it in `plugins: { react }`,
      enable `react/jsx-uses-vars`
- [x] No `motion` import was deleted anywhere in this task

**Verify:** `npx eslint .` → **6 errors** (was 36) ✅ · `npm run build` ✅ 4.95s
**Remaining 6, all real:** `Box.jsx:19` `no-undef`, `NavbarXl:16` `index`,
`Square1:6` `slideFromLeft`, `Square2:6` `slideFromRight`,
`Projects.jsx:6` `tittle2`, `store/index.jsx:146` `set`

**Note (2026-09-29):** Lint went 36 → 6, exactly as predicted, and the 6 left are
the genuine ones. Build still passes (4.95s). Confirmed the fix is the rule and
not the imports: the 30 previously-flagged files still contain `<motion.div>` etc.
and no `motion` import was touched.

Note on the config: `react/jsx-uses-react` was intentionally **not** added. It only
marks a bare `React` identifier as used, and this codebase uses the automatic JSX
runtime, so the rule has nothing to do and would be dead config. `jsx-uses-vars`
is the rule that actually fixed the 30 errors.

---

## Task 2 — `fix(router): repair broken section links`

- [x] `krkba/HeaderTittel.jsx` — `to={"/work"}` → `/${tittle}`
- [x] `krkba/ButtonViewAll.jsx:9` — `to={tittle}` → absolute `to={`/${tittle}`}`

**Verify:** `npx eslint .` → 6 problems (unchanged, none of them here) ✅ ·
`npm run build` ✅ 5.60s ✅ · live browser check on the dev server, all below ✅
**Note (2026-09-29):** Verified in a real browser against `npm run dev`, not just
by reading the diff.

- Heading links now render as `/projects`, `/about-me`, `/contacts` — three real
  routes. Before, all three pointed at `/work`, which falls through to `*` and
  renders `Error404`. No 404 occurs.
- "View all" links render as the same three absolute paths, so they work from any
  route, not only from `/`.
- `#skills` has no page of its own, so its heading is now rendered as plain markup
  rather than a link that would 404. The existing `tittle == "skills"` guard on
  `ButtonViewAll` already did the same job for the button; the heading had no such
  guard and was the one still pointing at `/work`.
- Zero console errors or warnings on the home page after the change.
- Checked the route table in `App.jsx` against the four `tittle` values actually
  passed in (`projects`, `skills`, `about-me`, `contacts`) — no other value exists,
  so no case was left unhandled.

Dev server stopped afterwards; no stray process left running.

---

## Task 3 — `fix(Box): remove undefined img reference`

- [x] `homePage/projctsLine/Box.jsx:19` — `src={el.img || img}` → `src={el.img}`
      (`img` is never defined; survives only because every store entry sets `img`)

**Verify:** `npx eslint .` → 5 problems ✅ · `npm run build` ✅ 6.79s ✅ ·
live browser check on `/projects` ✅
**Note (2026-09-29):** Verified in a real browser against `npm run dev`.

- `img` was never declared in `Box.jsx`, so `el.img || img` only avoided a
  `ReferenceError` because every one of the 16 store entries sets `img`. The
  right operand was dead code, not a fallback.
- After the change `/projects` still renders all 12 project cards, all 12 images
  report `complete && naturalWidth > 0` (no broken image icons), and the 12 other
  images on the page (logo, social icons, decorations) are untouched.
- The "no `img` must not throw" case was tested for real: I temporarily added a
  `{ name: "TEMP_NO_IMG" }` entry with no `img` to `projcts` in the store, reloaded,
  and confirmed the card renders with a plain `<img>` carrying no `src`, the rest of
  the page stays alive, and the console stays clean. The temp entry was then
  reverted — `git diff` shows `Box.jsx` as the only modified file.
- Note the scope: `Box` is shared, and `BoxProject.jsx` imports it from
  `workPage/`, so this single edit fixes both `/projects` (12 cards) and the home
  page short list (4 cards).
- Lint went 6 → 5, which is this task's `no-undef` and nothing else.

Dev server stopped afterwards; no stray process left running.

---

## Task 4 — `fix(navbar): text-whit typo and drop unused index param`

- [x] `layout/headre/NavbarXl.jsx:24` — `"font-medium text-whit"` → `"font-medium text-white"`
      (not a real Tailwind class, so the active nav link never turns white)
- [x] `layout/headre/NavbarXl.jsx:16` — drop the unused `index` map param

**Verify:** `npx eslint .` → 4 problems ✅ · `npm run build` ✅ 5.90s ✅ ·
live browser check of the top nav on all four routes ✅
**Note (2026-09-29):** Verified in a real browser against `npm run dev` at a
1280px viewport, since `NavbarXl` is `hidden md:flex` and never renders below `md`.

- The typo was a real no-op, not a subtle colour mismatch: the built CSS contains
  zero rules for `text-whit`, and grepping `dist/assets/*.css` confirms it. Before
  the fix the active link inherited the parent's white and only differed from its
  inactive siblings by `font-medium` vs `font-normal` — the weight change was
  carrying the whole active state. `.text-white{color:var(--color-white)}` is now
  in the bundle.
- Computed styles, measured per route via `getComputedStyle`, after the fix:
  - `/`        → `#Home` white, the other three `#ABB2BF`
  - `/projects` → `#Works` white, the other three `#ABB2BF`
  - `/about-me` → `#About-Me` white, the other three `#ABB2BF`
  - `/contacts` → `#contacts` white, the other three `#ABB2BF`
  - Exactly one active link on each route, so the `isActive` logic is intact.
- The mobile dock (`NavbarSm`) was left alone; it already uses daisyUI's
  `dock-active` and was never part of this bug.
- Dropping `index` is safe: the only key in that loop is `key={el.path}`, which
  never referenced it, so React keys are unchanged and the re-render behaviour
  is identical.
- Lint went 5 → 4, which is this task's `index` and nothing else.

**Correction to this task's own plan:** it predicted "lint → 3 errors", but the
real number is 4. The prediction was off because the remaining four are
`Square1.jsx` (`slideFromLeft`), `Square2.jsx` (`slideFromRight`),
`Projects.jsx` (`tittle2`) and `store/index.jsx` (`set`, the unused `set` param
of the dead `usdLoader`), all of which Task 5 removes together. Task 5's own
"lint → 0" target was right.

Dev server stopped afterwards; no stray process left running.

---

## Task 5 — `refactor: remove dead code`

Masked from lint by `varsIgnorePattern: '^[A-Z_]'` — the imports are never used.

- [x] `src/main.jsx:3` — drop `BrowserRouter`, `Router` (the whole `react-router-dom` import)
- [x] `src/pages/AboutmePage.jsx:3` — drop the unused `MySkills` import
- [x] `layout/headre/Header.jsx:2` — drop the unused `Swap` import
- [x] `store/index.jsx:146-149` — delete the dead `usdLoader` store
- [x] `workPage/Projects.jsx:6` — delete the unused `tittle2`
- [x] `LayoutScreen/Square1.jsx:6` — drop the unused `slideFromLeft`
- [x] `LayoutScreen/Square2.jsx:6` — drop the unused `slideFromRight`

**Verify:** `npx eslint .` → **0 errors**, exit code 0 ✅ · `npm run build` ✅ 9.00s ✅ ·
live browser check of all four routes plus a bad URL ✅
**Note (2026-09-29):** Verified in a real browser against `npm run dev`.
**Lint is now completely clean for the first time on this repo.**

- Every removal was confirmed dead by grepping `src/` for each symbol before
  deleting it, not by trusting the lint message alone:
  - `usdLoader` appeared in exactly one place, its own definition. Nothing imports it.
  - `MySkills` is still imported and rendered twice, by `SkillsComponant.jsx` and
    by the home page's `Skills.jsx` — only `AboutmePage.jsx`'s copy was dead, so
    `/about-me` still shows the skills list (verified: `#skills` heading,
    Languages/Tools/Frameworks, and `JavaScript` all still on the page).
  - `Swap` is still imported and rendered by `NavbarXl.jsx`; only `Header.jsx`'s
    import was dead. The theme toggle still works.
  - `BrowserRouter` is still imported and used in `App.jsx`, where the router
    actually belongs. `main.jsx` only renders `<App />`.
  - `tittle2` had no consumer at all; `TitleComponent` only accepts `tittle1`,
    so `"small-projects"` was never displayed.
- Per-route render check, with broken-image counts:
  | route | title | h2 | images | broken | header+footer | nav links |
  |---|---|---|---|---|---|---|
  | `/` | Front-End Developer | 9 | 27 | 0 | yes | 8 |
  | `/projects` | Projects | 13 | 24 | 0 | yes | 8 |
  | `/about-me` | About Me | 2 | 16 | 0 | yes | 8 |
  | `/contacts` | Contact | 1 | 14 | 0 | yes | 8 |
  | `/nope-does-not-exist` | Page Not Found | 0 | 7 | 0 | no (by design) | 0 |
  The 404 still correctly sits outside `Layout`, so it has no header or footer.
- The `Square1`/`Square2` change was the only one with real animation risk, since
  it touches a motion store destructuring. Rather than just eyeballing the settled
  state (which is `transform: none` whether or not the animation runs), I sampled
  `getComputedStyle` every 60ms from page load. Measured, in order:
  - `Square1` (right side) starts at `translateX(50px)` and eases to 0 —
    that is `slideFromRight`, the one it actually uses.
  - `Square2` (left side) starts at `translateX(-50px)` and eases to 0 —
    that is `slideFromLeft`, the one it actually uses.
  - Opacity goes 0 → 1 on both, over the 0.6s the store defines.
  So each square kept its own animation and the dropped key really was unused.
  Note the two files were cross-wired relative to their names: `Square1` (the
  one on the right) is the one that slides from the right.
- No console errors or warnings on any route.
- Diff is 13 deletions and 2 insertions (the two shortened destructuring lines),
  7 files, no behaviour change intended anywhere.

Dev server stopped afterwards; no stray process left running.

---

## Task 6 — `a11y: add alt text to 12 images`

- [x] `homePage/contacts/ContactsContant.jsx:33,37` — discord, mail
- [x] `homePage/projctsLine/Box.jsx:18` — project image → `alt={el.name}`
- [x] `homePage/hero/Quote.jsx:17,21` — the two quotation-mark images → `alt=""`
- [x] `homePage/skills/MySkills.jsx:20` — skills illustration → `alt=""`
- [x] `layout/headre/NavbarXl.jsx:12` — logo → `alt="SAFOO"`
- [x] `layout/footer/TopFooter.jsx:37,38,39` — discord, linkedin, github

**Scope correction — this list was incomplete.** The plan only covered `<img>`
tags and said "12 images". Two problems with that:

- `grep "<img"` does not match `<motion.img`, so it missed **10** animation-driven
  images. These are now fixed too:
  - `homePage/hero/HeroSec2.jsx:15,20,25` — `logoB`, the portrait, `dots`
  - `homePage/aboutMe/AboutMeContant2.jsx:14,19,24` — two `dots`, the portrait
  - `LayoutScreen/Square1.jsx`, `Square2.jsx`, `Dots1.jsx`, `Dots2.jsx`
- `layout/footer/TopFooter.jsx:24` was listed nowhere and already had a correct
  `alt=""`; left as is.

Real total: **24 image elements**, not 12.

**Alt text decisions** — decorative means `alt=""` (announced as nothing), not a
filename and not a description:

- `alt=""` (11): both `coma.png` quotation marks in `Quote.jsx`, the `Group 36.png`
  skills illustration, all five `dots.png`, both `square.png`, and the footer logo
  which already had it. All of these are pure decoration beside real text.
- Real text (13): `alt={el.name}` for project images so the alt matches the `h2`
  right below it; `"Discord"`, `"Email"`, `"LinkedIn"`, `"GitHub"` for the icons,
  which are the only thing identifying those links; `"SAFOO"` for both logos; and
  `"Saif Ahmed, mechanical engineer and front-end developer"` for the two
  portraits in `HeroSec2` and `AboutMeContant2`, which are photos of a person and
  the closest thing on the page to a bio.

**Verify:** `npx eslint .` → 0, exit 0 ✅ · `npm run build` ✅ 7.92s ✅ ·
live browser check on all routes ✅ · Lighthouse `image-alt` → **score 1** ✅
**Note (2026-09-29):** Verified in a real browser and with a Lighthouse audit.

Per-route `alt` attribute coverage, measured on the live DOM:

| route | images | missing `alt` | `alt=""` | named `alt` | broken images |
|---|---|---|---|---|---|
| `/` | 27 | **0** | 11 | 16 | 0 |
| `/projects` | 24 | **0** | 5 | 19 | 0 |
| `/about-me` | 16 | **0** | 8 | 8 | 0 |
| `/contacts` | 14 | **0** | 5 | 9 | 0 |
| `/nope` | 7 | **0** | 4 | 3 | 0 |

- Zero images are missing `alt` on any route now, up from 10 on `/` alone.
- Source count cross-check: 14 `<img>` + 10 `<motion.img>` = 24 elements, and
  exactly 24 `alt=` attributes in `src/`.
- Nothing shifted: no image has zero width or height, and the measured boxes still
  match the old ones (`dots` 84/120/118.77px, `Square1` 80x140, `Square2` 86x86,
  hero portrait 471.58px, about portrait 316.73px).
- Lighthouse `image-alt` now scores **1** with no failing elements. Overall
  accessibility is 81, and the remaining 7 audit failures are all outside this
  task and pre-existing: `image-aspect-ratio`, `image-size-responsive`,
  `heading-order`, `label` (the unlabelled theme-toggle checkbox in `Swap.jsx`),
  `target-size`, `agent-accessibility-tree` (a wrapper for the `label` failure),
  and `llms-txt`. I did not touch any of them — they belong in their own tasks.

**New a11y issues found, not fixed here** (outside Task 6's scope, worth their own
task later):
- `Swap.jsx:7` — the theme-toggle `<input type="checkbox" />` has no `<label>`
  text and no `aria-label`. This is the `label` Lighthouse failure. The `<label>`
  element wrapping it has no text content either.
- `Linkat.jsx:25` — the Discord link has `href=""`, so clicking it reloads the
  current page instead of going anywhere. Pre-existing, unrelated to `alt`.
- `heading-order` — the page jumps heading levels (an `h1` followed by `h3`).

Dev server stopped afterwards; no stray process left running.

---

## Task 7 — `chore: drop unused dependencies and assets`

- [x] Remove `react-intersection-observer` (never imported)
- [x] Remove `styled-components` (only used by the dead `krkba/Loader.jsx`)
- [x] Remove `autoprefixer` and `postcss` (Tailwind v4 is CSS-first via the Vite plugin)
- [x] Delete `krkba/Loader.jsx` (never imported)
- [x] Delete `src/assets/logo/logo.png` and `src/assets/projcts/pro11.png` (unreferenced)

**Verify:** `npx eslint .` → 0, exit 0 ✅ · `npm run build` ✅ 6.04s ✅ ·
live browser check that Tailwind still compiles and daisyUI still works ✅
**Note (2026-09-29):** This is the task that actually proves Tailwind is
CSS-first, so it got checked harder than the others.

- All four packages were removed with a single `npm uninstall`, so
  `package.json` and `package-lock.json` move together and cannot drift.
  `package.json` drops exactly 4 entries; the lock loses 209 lines.
- `styled-components` was the only reason `Loader.jsx` existed, and `Loader` was
  imported by nothing, so the two deletions are one change: the 249-line file was
  the sole consumer of the dependency. Nothing was lost by deleting it.
- **`postcss` is still in `node_modules` and that is correct, not a miss.** Vite
  declares `postcss: ^8.5.6` as a runtime dependency of its own, so npm keeps it
  installed transitively. What this task removed is the *direct* `devDependencies`
  entry, which is the part that was misleading — it implied the project configured
  PostCSS when no `postcss.config.js` has ever existed. Verified in the lock:
  `node_modules/postcss` has no `dev` flag and is required by `node_modules/vite`.
- `autoprefixer` is now fully gone from disk. It was dead weight for the same
  reason: with no `postcss.config.js` and Tailwind v4 going through the Vite
  plugin, there was nothing for it to hook into.
- Confirmed there is no `postcss.config.js` or `tailwind.config.js` anywhere, and
  `index.css` still only does `@import "tailwindcss"; @plugin "daisyui";`.

**Tailwind/daisyUI still work — measured on the built CSS and the live DOM:**

- Built CSS still contains the arbitrary-value utilities the design system is
  built on: `.bg-\[\#282C33\]{background-color:#282c33}`,
  `.text-\[\#C778DD\]`, `.text-\[\#ABB2BF\]`, `.border-\[\#ABB2BF\]`, plus
  `.text-white`, `.object-contain` and the daisyUI `.dock` / `.swap` rules.
- Computed styles on the live site: `html` background `rgb(40, 44, 51)` (#282C33),
  the hardcoded `bg-[#282C33]` navbar the same colour, accent `#C778DD` =
  `rgb(199, 120, 221)`, muted `#ABB2BF` = `rgb(171, 178, 191)` on both the card
  borders and the footer rule. `--color-white` still resolves to `#fff`, so the
  Tailwind theme loaded rather than silently degrading.
- daisyUI checked at a 390px viewport, where the bottom dock replaces the top nav:
  `.dock` is `display: flex`, visible, background `rgb(40, 44, 51)`, with all four
  links present and `dock-active` correctly on Home. The top nav is `display: none`
  at that width, so the responsive switch still works.
- The theme toggle still renders: `.swap` present with its checkbox input.

**Nothing broke on the way:**

- All five routes still render with their own titles, the header/footer are intact
  on the four real pages, and there are **0 broken images** everywhere.
- The dev-server request log was checked for the deleted files: 114 requests, and
  none for `logo.png`, `pro11.png`, `Loader.jsx` or any `styled-components` chunk.
  This is the real proof the deletions were safe, rather than assuming no import
  means no use.
- `node_modules` confirms `react-intersection-observer`, `styled-components` and
  `autoprefixer` are actually gone from disk, not just from `package.json`.
- No console errors or warnings.

Net: 456 deletions against 6 insertions, 5 files. The build output is unchanged in
size (383.11 kB JS / 125.59 kB gzip, identical to the Task 6 build).

Dev server stopped afterwards; no stray process left running.

---

## Task 8 — `content: fix copy typos and stale SEO dates`

- [ ] `store/index.jsx:155` — `"Arbic"` → `"Arabic"`
- [ ] `store/index.jsx:140` — `"This websit"` → `"This website"`
- [ ] `pages/ContactPage.jsx:6` — `paragraph = "Who am i?"` is copy-pasted from AboutmePage, should describe contact
- [ ] `store/index.jsx:151-163` — skills list: drop `"React"` duplicated in both
      Frameworks and Other, drop the stray `🖒` emoji
- [ ] `public/sitemap.xml` — `lastmod` is `2026-05-06`, update it
- [ ] `index.html` — `og:image` / `twitter:image` point at `/logoF.png`; confirm that
      file actually exists in `public/`

**Verify:** `npm run lint` → 0 ✅ · `npm run build` ✅ · read the changed copy on
screen
**Note:**

---

## Task 9 — `a11y: fix the three pre-existing failures found by Lighthouse`

All three are old bugs, not regressions from this branch. They surfaced in the
Task 6 audit and are recorded here rather than fixed on the spot, because each one
touches markup the task-6 diff had no business changing.

- [ ] `layout/headre/Swap.jsx:5-7` — the theme-toggle checkbox has no accessible
      name. The wrapping `<label className="swap swap-rotate">` has no text
      content, and the `<input type="checkbox" />` has no `aria-label`. This is
      the Lighthouse `label` failure and the cause of `agent-accessibility-tree`.
      Fix: `aria-label="Toggle dark mode"` (or a visually hidden `<span>`).
- [ ] `LayoutScreen/Linkat.jsx:25` — the Discord link is `<a href="">`, so
      clicking it reloads the current page instead of navigating. Either give it
      the real Discord URL or drop the anchor and render the image on its own.
      Unrelated to `alt`; do not fix it inside an a11y-attributes commit.
- [ ] Heading order — the pages skip levels (an `h1` followed by `h3`). Lighthouse
      `heading-order`. Fixing it properly means deciding the outline for
      `HeroSec2`, `ContactsContant` (`h2` → `h3` inside a card), and
      `NavbarXl`/`TopFooter`, which both use `h1` for the wordmark. This is the
      one to look at first, because a real fix touches several components and the
      wordmark `h1` may need to become a `p` or a `div`.

**Verify:** `npx eslint .` → 0 ✅ · `npm run build` ✅ · Lighthouse snapshot
re-run: `label`, `agent-accessibility-tree` and `heading-order` all pass, and
accessibility is no longer capped by them · the theme toggle still flips, and the
left-hand social links still work
**Note:**

---

## Not in scope — needs a separate go-ahead

- [ ] Compressing the project images (~13 MB total; `pro2.png` alone is 2.7 MB).
      Big change, separate branch.
- [ ] Loading the Fira Code font or removing it from `index.css`.
- [ ] Also still unaddressed, found during the Task 6 audit and folded into Task 9
      above rather than left off the list: the unlabelled theme-toggle checkbox
      (`Swap.jsx:7`), the empty `href=""` Discord link (`Linkat.jsx:25`), and the
      skipped heading levels. The two remaining Lighthouse image findings,
      `image-aspect-ratio` and `image-size-responsive`, are the same underlying
      cause as the image-compression item above, so they stay there.
- [ ] Moving `Error404` inside `Layout` so 404s get a header/footer (routing change).
- [ ] Renaming the misspelled folders/files (`projcts`, `Contant`, `headre`, `Componant`).
- [ ] Tailwind/daisyUI config, CSS variables, TypeScript, any backend.
