# AGENTS.md

## What this is
Personal portfolio SPA for Saif Ahmed (front-end developer + Mechanical Engineer,
Alexandria, Egypt). **Front-end only today.** The site's *positioning* is moving
toward "full-stack developer", but the tech stack is not changing — that update
happens at the content/copy level.

## Commands
- `npm install`
- `npm run dev`      # Vite dev server
- `npm run build`    # -> dist/ (gitignored)
- `npm run preview`  # serve the production build
- `npm run lint`     # eslint .
- No tests, no typecheck, no formatter, no CI, no pre-commit hooks.
- `npm run lint` already fails on `main` with 36 errors (35 `no-unused-vars`,
  1 `no-undef` at `src/components/homePage/projctsLine/Box.jsx:19`). Compare
  before/after; don't treat existing errors as yours, and don't fix them uninvited.
  Thirty of those are false positives: core `no-unused-vars` cannot see JSX
  references without `eslint-plugin-react`, so `motion` is reported unused in files
  that clearly use it. Fix the rule, never delete those imports.

## Fix workflow (mandatory)

The tracked fix list lives in `todo-list-fix.md` at the repo root. Work it in
order, one task per commit, on the `fix/lint-and-bugs` branch.

Every task follows the same five steps. **Do not skip or reorder them:**

1. **Finish the task** — make the change.
2. **Verify it actually took** — run that task's verification step. Don't assume
   it worked; confirm it. An unverified fix is not a fix.
3. **Mark it** — tick the checkbox in `todo-list-fix.md` and append a dated note
   under the task recording what was verified.
4. **Commit** — one commit per task, message naming the task and stating plainly
   that the error is gone.
5. **Say `تمام` and stop.** Wait for an explicit go-ahead before the next task.

Never auto-start the next task, no matter how obvious or independent it looks.
One task, one confirmation, one wait. If a task breaks the build, run
`git reset --hard HEAD~1`, report what broke, and wait.

## Scope of changes
- **Freely changeable (content only):** text and copy, project entries in
  `src/store/index.jsx`, the skills list, SEO strings, images in `src/assets/`.
- **Ask first:** routing/layout changes, the animation store, Tailwind/daisyUI
  setup, new dependencies, TypeScript conversion, adding a backend/API/DB, or
  restructuring components into new folders/patterns.
- Do not reorganize the existing architecture. It is component-based and
  intentional: component -> structure -> layout, all wired and working.

## Architecture
- Entry: `index.html` -> `src/main.jsx` -> `src/App.jsx`.
- `App.jsx`: `BrowserRouter` + `<Seo/>` + `<LayoutScreen/>` (fixed desktop-only
  decorations, `hidden lg:flex`), then routes. All pages nest under `Layout` at
  `/`: index -> `HomePage`, `projects` -> `WorkPage`, `about-me` -> `AboutmePage`,
  `contacts` -> `ContactPage`. `*` -> `Error404`, which sits *outside* `Layout`
  and therefore has no header/footer.
- `Layout` = `Header` + `<Outlet/>` + `Footer`.
- `src/store/index.jsx` — content store: `useProjcts` (`shortProjcts`, `projcts`),
  `useSkills`. `usdLoader` is dead code, don't use it.
- `src/store/indexAnimation.jsx` — every `motion` variant used in the app
  (`containerVariants`, `slideFromLeft/Right/Bottom/Top`, `zoomIn`).
- `src/components/krkba/` — shared UI: `Btn`, `TitlePage`, `TitleComponent`,
  `HeaderTittel`, `ButtonViewAll`, `Loader`.
- Components are grouped per page: `homePage/`, `workPage/`, `aboutMePage/`, plus
  `layout/` and `LayoutScreen/`.
- Images are always imported through Vite (`import x from "../../assets/..."`),
  never referenced as path strings.

## Conventions
- Animation: a section root is
  `<motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>`
  and its children use `variants={slideFromX}`. Pull variants from
  `useAnimationStore()`. Import from `motion/react`, never `framer-motion`.
- Tailwind v4 is CSS-first: **no** `tailwind.config.js` and **no**
  `postcss.config.js`. New theme values/utilities go in `src/index.css`.
  daisyUI loads via `@plugin "daisyui"`; only `dock`/`dock-active`/`swap` are used.
- Design tokens are hardcoded, not CSS variables: bg `#282C33`, accent `#C778DD`,
  muted text `#ABB2BF`. Borders are `border border-[#ABB2BF]`.
- `index.css` declares `Fira Code, monospace` but the font is never loaded, so it
  silently falls back to monospace. Don't "fix" this as a side effect of a
  content change.
- Responsive: `md` switches top nav (`NavbarXl`) <-> bottom dock (`NavbarSm`);
  `lg` turns on the side decorations.
- Keep the existing (misspelled) names when adding files in those folders:
  `headre/`, `Componant`, `Contant`, `projcts`, `useProjcts`. Match the codebase,
  don't "correct" it.

## SEO / deploy gotchas
- `src/components/seo/Seo.jsx` writes meta tags at runtime from a hardcoded
  `pages` map keyed by pathname. **Every new route needs an entry there** or it
  inherits the 404 title/description.
- The production URL `https://portfolio-gilt-eta-34.vercel.app` is duplicated in
  `index.html`, `Seo.jsx`, `public/sitemap.xml`, and `public/robots.txt`.
  Change all four together.
- `public/sitemap.xml` is hand-maintained; add new routes to it.
- Deploy is Vercel; `vercel.json` rewrites `/(.*)` -> `/` for SPA deep links.
  Don't remove it.

## Known pre-existing issues (report, don't silently fix)
Tracked with per-task verification in `todo-list-fix.md` — that's where these get
fixed, not ad hoc.
- `HeaderTittel` links section headings to `/work`, which is not a route -> 404.
  `ButtonViewAll` passes the title string itself as a relative `to`.
- `Box.jsx:19` references an undefined `img` in `el.img || img`.
- Unused deps: `react-intersection-observer`, `styled-components` (only in the
  unused `krkba/Loader.jsx`), `autoprefixer`, `postcss`.
- Most `<img>` tags have no `alt`.
- `dist/` is gitignored; do not commit build output.

## Roadmap note
"The owner is front-end and wants the portfolio to read as full-stack" means
positioning, not a stack migration. Treat such requests as copy/data changes, and
confirm before any architecture, dependency, or backend work.
