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

- [ ] `npm i -D eslint-plugin-react`
- [ ] Add `react/jsx-uses-vars` + `react/jsx-uses-react` to `eslint.config.js`
- [ ] Add the `react` plugin to the `extends` list

**Verify:** `npm run lint` → **6 errors** (was 36) · `npm run build` ✅
**Expected remaining 6:** `Box.jsx:19` `no-undef`, `NavbarXl:16` `index`,
`Square1:6` `slideFromLeft`, `Square2:6` `slideFromRight`,
`Projects.jsx:6` `tittle2`, `store/index.jsx:146` `set`

**Note:**

---

## Task 2 — `fix(router): repair broken section links`

- [ ] `krkba/HeaderTittel.jsx:21` — `to={"/work"}` → `to={"/projects"}`
      (`/work` is not a route, every section heading 404s on click)
- [ ] `krkba/ButtonViewAll.jsx:9` — `to={tittle}` → absolute `to={`/${tittle}`}`
      (relative path only resolves by accident from `/`)

**Verify:** `npm run build` ✅ · click `#projects`, `#about-me`, `#contacts` on the
home page — each lands on a real route, no 404
**Note:**

---

## Task 3 — `fix(Box): remove undefined img reference`

- [ ] `homePage/projctsLine/Box.jsx:19` — `src={el.img || img}` → `src={el.img}`
      (`img` is never defined; survives only because every store entry sets `img`)

**Verify:** `npm run lint` → 5 errors · `npm run build` ✅ · `/projects` renders
all 12 project images · a project with no `img` must not throw
**Note:**

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
