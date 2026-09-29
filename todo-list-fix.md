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

- [ ] `layout/headre/NavbarXl.jsx:24` — `"font-medium text-whit"` → `"font-medium text-white"`
      (not a real Tailwind class, so the active nav link never turns white)
- [ ] `layout/headre/NavbarXl.jsx:16` — drop the unused `index` map param

**Verify:** `npm run lint` → 3 errors · `npm run build` ✅ · the active top-nav
link is white on `/`, `/projects`, `/about-me`, `/contacts`
**Note:**

---

## Task 5 — `refactor: remove dead code`

Masked from lint by `varsIgnorePattern: '^[A-Z_]'` — the imports are never used.

- [ ] `src/main.jsx:3` — drop `BrowserRouter`, `Router` (the whole `react-router-dom` import)
- [ ] `src/pages/AboutmePage.jsx:3` — drop the unused `MySkills` import
- [ ] `layout/headre/Header.jsx:2` — drop the unused `Swap` import
- [ ] `store/index.jsx:146-149` — delete the dead `usdLoader` store
- [ ] `workPage/Projects.jsx:6` — delete the unused `tittle2`
- [ ] `LayoutScreen/Square1.jsx:6` — drop the unused `slideFromLeft`
- [ ] `LayoutScreen/Square2.jsx:6` — drop the unused `slideFromRight`

**Verify:** `npm run lint` → **0 errors** ✅ · `npm run build` ✅ · home, projects,
about-me, contacts, and a bad URL all still render
**Note:**

---

## Task 6 — `a11y: add alt text to 12 images`

- [ ] `homePage/contacts/ContactsContant.jsx:33,37` — discord, mail
- [ ] `homePage/projctsLine/Box.jsx:18` — project image → `alt={el.name}`
- [ ] `homePage/hero/Quote.jsx:17,21` — the two avatar images
- [ ] `homePage/skills/MySkills.jsx:20` — skills illustration
- [ ] `layout/headre/NavbarXl.jsx:12` — logo → `alt="SAFOO"`
- [ ] `layout/footer/TopFooter.jsx:37,38,39` — discord, linkedin, github
- [ ] `LayoutScreen/Linkat.jsx:23,26,29` — github, discord, linkedin

Decorative images get `alt=""`, meaningful ones get real text.

**Verify:** `npm run lint` → 0 ✅ · `npm run build` ✅ · images still render
**Note:**

---

## Task 7 — `chore: drop unused dependencies and assets`

- [ ] Remove `react-intersection-observer` (never imported)
- [ ] Remove `styled-components` (only used by the dead `krkba/Loader.jsx`)
- [ ] Remove `autoprefixer` and `postcss` (Tailwind v4 is CSS-first via the Vite plugin)
- [ ] Delete `krkba/Loader.jsx` (never imported)
- [ ] Delete `src/assets/logo/logo.png` and `src/assets/projcts/pro11.png` (unreferenced)

**Verify:** `npm run lint` → 0 ✅ · `npm run build` ✅ (this is the one that proves
Tailwind still compiles without `postcss.config.js`) · `npm run dev`, load the site,
confirm `bg-[#282C33]` and the `dock` bottom nav still render
**Note:**

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

## Not in scope — needs a separate go-ahead

- [ ] Compressing the project images (~13 MB total; `pro2.png` alone is 2.7 MB).
      Big change, separate branch.
- [ ] Loading the Fira Code font or removing it from `index.css`.
- [ ] Moving `Error404` inside `Layout` so 404s get a header/footer (routing change).
- [ ] Renaming the misspelled folders/files (`projcts`, `Contant`, `headre`, `Componant`).
- [ ] Tailwind/daisyUI config, CSS variables, TypeScript, any backend.
