# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio + blog of Denis AKPAGNONITE (denisakp.me). Nuxt 4 SSR site with markdown-driven content via `@nuxt/content`. Topics: DevOps, cloud, security, backend, DSA. Deployed prerendered (Nitro `prerender.crawlLinks`); Vercel Speed Insights wired in `app.vue`.

## Commands

Package manager is **pnpm** (pnpm-workspace.yaml present). Do not use `npm`/`yarn`.

```bash
pnpm install        # install deps (runs nuxt prepare via postinstall)
pnpm dev            # dev server at http://localhost:3000
pnpm build          # production build → .output/
pnpm preview        # preview production build locally
pnpm generate       # static generation (nuxi generate)
nuxi typecheck      # TypeScript check — must pass before merge
```

No test runner configured. No lint script — `prettier` is installed but not wired to a script.

Troubleshooting: stale type errors → `rm -rf .nuxt && nuxi typecheck`.

## Architecture

### Content pipeline (`@nuxt/content` v3)
- Markdown source: `content/<N>.<category>/<num>.<slug>.md` (DSA, backend, security, cloud, devops). Numeric prefixes drive default ordering.
- Schema is enforced in `content.config.ts`: every post requires `title`, `description`, `tags[]`, `topics[]`, `date`, `slug`, `img` (URL). Adding a post with missing/invalid frontmatter will fail validation.
- Listing pages (`pages/blog/index.vue`, `pages/topics/[...slug].vue`) query via `queryContent()` with manual pagination using constants in `utils/config.ts` (`DEFAULT_PAGINATION_LIMIT`, `DEFAULT_PAGINATION_SORT`).
- Post page `pages/blog/[...slug].vue` strips the `/blog` prefix from the route path before querying — content paths do not include `/blog`.
- Giscus comments in `pages/blog/[...slug].vue` are hard-wired to repo `denisakp/dev-life` (repoid + categoryid embedded). Update if forked.

### Topics vs categories
Two independent taxonomies:
- **Folder categories** under `content/` drive numeric ordering and navigation surface.
- **`topics[]` frontmatter** drives `/topics/<slug>` filtering. The slug must exist in `data/topics.ts` — `utils/load-topic.ts` looks it up; an unknown slug renders the 404 branch.

### Data layer
Static TS arrays in `data/`: `projects.ts`, `topics.ts`, `talks.ts`. Not markdown-backed. Edit these files to change the projects page or topic chips.

### Routing
File-based: `pages/index.vue` (home), `pages/about.vue`, `pages/talks.vue`, `pages/teaching.vue`, `pages/projects.vue`, `pages/blog/{index,[...slug]}.vue`, `pages/topics/{index,[...slug]}.vue`. `error.vue` at repo root handles 404/500. `app.vue` wraps with shared `Header` / `Footer`. `server/routes/rss.xml.ts` emits the RSS 2.0 feed (prerendered to `.output/public/rss.xml`).

### SEO / sharing (phase 003)
- `nuxt-og-image` module + `@takumi-rs/core` renderer generate per-post Open Graph PNGs at build time. Templates: `components/OgImage/Post.takumi.vue` (blog posts, takes `title` + `date` props) and `components/OgImage/Default.takumi.vue` (non-blog fallback, takes `title`). `defineOgImage("Post", { title, date })` called inside `pages/blog/[...slug].vue` setup. Default component referenced via `ogImage.defaults.component = "Default"` in `nuxt.config.ts`. Both templates use **inline styles** (takumi doesn't process Tailwind classes).
- RSS auto-discovery `<link rel="alternate" type="application/rss+xml" href="https://denisakp.me/rss.xml">` injected in `app.vue` `useHead`.
- Footer has a visible RSS icon link (`i-lucide-rss`).

### Helpers
- `utils/format-date.ts` — `formatDate(input)` via `Intl.DateTimeFormat('en-US', { dateStyle: 'long' })`. Null-safe; returns `""` on falsy/invalid.
- `composables/useReadingTime.ts` — `useReadingTime(body)` walks MDC AST, skips `code`/`pre` nodes, returns `{ words, minutes, label }`. 200 wpm; min 1 minute.

### Styling
- Tailwind v4 + color-mode + prose bundled via `@nuxt/ui` (single module). No `tailwind.config.js`, no `@nuxtjs/tailwindcss`, no `@nuxtjs/color-mode`.
- Theme config lives in CSS via `@theme static {...}` in `assets/styles/main.css` (imports `tailwindcss` + `@nuxt/ui` first). Semantic palettes selected by name in `app.config.ts` — `primary: 'indigo'`, `neutral: 'zinc'`. Bespoke utility classes (`highlighted`, `slick-*`, `reading-area`, `container*`, `exact-navigation`) declared under `@layer components` in `main.css`.
- Dark mode: `class` strategy bundled by Nuxt UI; toggle composable = `useColorMode()` (re-exported by Nuxt UI). Wrap toggle button in `<ClientOnly>` to avoid hydration mismatch.
- Animations: `assets/styles/animations.css` holds `@keyframes` + Vue `<Transition>` classes (`.page-*`, `.theme-toggle-*`) + `prefers-reduced-motion` guard. Timing constants in `utils/animation-config.ts`.
- Fonts: IBM Plex Serif + Inter loaded from Google Fonts in `app.vue`.

### Icons
All icons via `@nuxt/icon` (bundled by Nuxt UI). Collections: `@iconify-json/lucide` (UI glyphs) + `@iconify-json/simple-icons` (brand glyphs). Reference as `<UIcon name="i-lucide-<name>" />` or `i-simple-icons-<brand>`. `nuxt.config.ts` `icon` block sets `mode: 'css'`, `serverBundle.collections: ['lucide', 'simple-icons']`, `clientBundle.scan: true` — client ships only icons referenced in templates. Code-block language hints overridden in `app.config.ts` `ui.prose.codeIcon` (maps `typescript`/`yaml`/`bash`/etc. to lucide). No FontAwesome, no inline `<svg>`.

### SEO / prerender
- Canonical host `https://denisakp.me` set in `runtimeConfig.public.siteUrl` and `site.url`.
- Nitro prerenders `/`, `/sitemap.xml`, `/robots.txt` with `crawlLinks: true` — every blog post must be reachable via link from a crawled page or it will not be rendered.
- `@nuxtjs/sitemap` + `@nuxtjs/robots` auto-generate. Sitemap cache: 1h.

## Conventions (from `.specify/memory/constitution.md`)

These are enforced for this repo:
- TypeScript everywhere; no `any` without justification. Validate external data with Zod.
- Images: always `<NuxtImg>` (from `@nuxt/image`), never raw `<img>`.
- Semantic HTML + WCAG 2.1 AA. Dark mode must work on every page.
- Components grouped by context: `components/shared/` (cross-page), `components/content/` (markdown renderers like `PostImage`, `ExternalLink`), `components/project/` (projects page).
- Markdown frontmatter `date` must be `YYYY-MM-DD`.
- Lighthouse ≥ 90 desktop for content-heavy pages before merge.

## Active work

Branch `001-nuxt4-ui-upgrade` (current) is mid Nuxt 3 → Nuxt 4 migration + UI animation work. Plan + tasks live in `specs/001-nuxt4-ui-upgrade/`. The `pnpm-lock.yaml` is the source of truth; `package-lock.json` was deleted in this branch.

## Spec Kit

`.specify/` and `.github/agents/speckit.*.agent.md` are the [Spec Kit](https://github.com/github/spec-kit) workflow (specify → plan → tasks → implement). When a user invokes a `/speckit.*` slash command, follow the corresponding agent prompt file rather than improvising.

<!-- SPECKIT START -->
Current plan: [specs/006-privacy-i18n/plan.md](specs/006-privacy-i18n/plan.md)
(spec → research → data-model → contracts → quickstart in the same folder).
Roadmap: [phases.md](phases.md). Prior phases: specs/001-nuxt4-ui-upgrade/, specs/002-content-surfaces/, specs/003-social-discovery/, specs/004-search-v2/, specs/005-engagement/.
<!-- SPECKIT END -->
