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
File-based: `pages/index.vue` (home), `pages/projects.vue`, `pages/blog/{index,[...slug]}.vue`, `pages/topics/{index,[...slug]}.vue`. `app.vue` wraps with shared `Header` / `BottomNav` / `Footer`.

### Styling
- Tailwind via `@nuxtjs/tailwindcss` + `@tailwindcss/postcss` (Tailwind v4 PostCSS pipeline) + `@tailwindcss/typography`.
- Custom theme colors (`dark-high`, `blue`, `green`, `yellow`, `red`, `codeGray`) and prose styles in `tailwind.config.js`. Dark mode: `class` strategy via `@nuxtjs/color-mode` (`classSuffix: ''`, preference `system`).
- Global CSS entry: `assets/styles/main.css` (set in `nuxt.config.ts`). Animations live in `assets/styles/animations.css`.
- Fonts: IBM Plex Serif + Inter loaded from Google Fonts in `app.vue`.

### Icons
Fontawesome via `@vesp/nuxt-fontawesome`. Import the specific icon (e.g. `faGithub` from `@fortawesome/free-brands-svg-icons`) and pass via `<font-awesome :icon="..." />`. Prose anchors/copy buttons use Phosphor icons configured in `app.config.ts`.

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
Current plan: [specs/001-nuxt4-ui-upgrade/plan.md](specs/001-nuxt4-ui-upgrade/plan.md)
(spec → research → data-model → contracts → quickstart in the same folder).
<!-- SPECKIT END -->
