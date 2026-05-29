# Implementation Plan: Nuxt 4 + Nuxt UI Migration

**Branch**: `001-nuxt4-ui-upgrade` | **Date**: 2026-05-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-nuxt4-ui-upgrade/spec.md`

## Summary

Complete the in-progress Nuxt 3 → Nuxt 4 framework upgrade, then adopt
`@nuxt/ui` v3 as the component foundation: migrate Tailwind to CSS-first
theming (no `tailwind.config.js`), unify all icons on Iconify (Lucide +
Simple-Icons), replace bespoke components (`Header`, `Pagination`, `Post`,
`PrevNext`, `Topics`, `Project`, `ExternalLink`) with Nuxt UI primitives,
delete `BottomNav`, sync Giscus theme with color mode, and layer motion
polish (page transitions, image fade-in) respecting `prefers-reduced-motion`.
Free tier only — Pro-only components fall back to free primitives. Primary
palette = Tailwind `indigo`. Lighthouse desktop ≥ 90 (median of 3 local
`pnpm preview` runs).

## Technical Context

**Language/Version**: TypeScript 5.x, Vue 3.5+, Node ≥ 20 (Nuxt 4 requirement)
**Primary Dependencies**: Nuxt 4.3.x, `@nuxt/ui` v3.3.x, Tailwind v4 (CSS-first via `@theme`), `@nuxt/content` v3.11.x, `@nuxt/image`, `@iconify-json/lucide`, `@iconify-json/simple-icons`
**Storage**: Markdown content under `content/` (no DB). `localStorage` for color mode (key `nuxt-color-mode`).
**Testing**: Manual verification (no test runner). `nuxi typecheck` is the only automated gate. Lighthouse: Chrome DevTools desktop preset against `pnpm preview`, median of 3 runs per page.
**Target Platform**: Modern evergreen browsers (Chromium, Firefox, Safari, mobile Safari/Chrome). SSR + prerender output served as static assets (Vercel).
**Project Type**: Web application (Nuxt single-app, no separate backend).
**Performance Goals**: Lighthouse desktop ≥ 90 on `/`, `/blog`, representative blog post. LCP ≤ 2.5 s, CLS < 0.1, INP < 200 ms. Page transitions < 300 ms at 60 fps.
**Constraints**: Bundle size ≤ 115 % of `main`-HEAD baseline (per NFR-003). No `any` types added. All animations honor `prefers-reduced-motion`. No content migrations (markdown untouched).
**Scale/Scope**: ~40 markdown posts across 5 category folders, ~15 components, 6 top-level routes. Single maintainer; no concurrent contributors.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Reference: [`.specify/memory/constitution.md`](../../.specify/memory/constitution.md) v1.0.0.

| Principle | Status | Notes |
|---|---|---|
| **I. Type Safety & Validated Boundaries** | ✅ PASS | TS preserved; `@nuxt/content` schema (Zod) untouched; no new `any` introduced. |
| **II. Optimized Images Only** | ✅ PASS | `<NuxtImg>` retained in `PostImage.vue`; substitution table explicitly keeps it. No raw `<img>` added. |
| **III. Accessible, Semantic, Dark-Mode-Complete UI** | ✅ PASS | Nuxt UI primitives are WCAG-conformant by default; dark mode handled by Nuxt UI's bundled color-mode. US3/US7 explicitly verify dark parity. |
| **IV. Context-Grouped Components** | ✅ PASS | `components/shared/`, `components/content/`, `components/project/` directories retained. No new top-level group. `BottomNav.vue` deletion stays within `shared/`. |
| **V. Content & Performance Discipline** | ✅ PASS | Frontmatter format unchanged (`YYYY-MM-DD`); `content.config.ts` schema preserved (FR-008); Lighthouse ≥ 90 gate explicit in NFR-001 / SC-009. |

**Gate Status**: ✅ PASS — Proceed to Phase 0. No `Complexity Tracking` entries required.

Re-check post Phase 1: ✅ PASS (no design decision introduces a violation).

## Project Structure

### Documentation (this feature)

```text
specs/001-nuxt4-ui-upgrade/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (component + module contracts)
│   ├── index.md
│   └── requirements.md
├── checklists/          # Quality checklists
└── tasks.md             # Phase 2 output (regenerate via /speckit-tasks)
```

### Source Code (repository root)

```text
assets/
├── styles/
│   ├── main.css                 # @import "tailwindcss"; @import "@nuxt/ui"; + @theme block
│   └── animations.css           # @keyframes + prefers-reduced-motion guards

components/
├── shared/
│   ├── Header.vue               # → <UHeader> + <UNavigationMenu> + <UModal> (search) + <USlideover> (mobile)
│   ├── Footer.vue               # Plain markup or <UFooter> if free
│   └── Pagination.vue           # → <UPagination> wrapper
├── Post.vue                     # (top-level) → <UCard> (NuxtImg preserved)
├── PrevNext.vue                 # (top-level) → pair of <UButton variant="outline">
├── Toc.vue                      # (top-level) Bespoke (Pro-only <UContentToc> not licensed)
├── Topics.vue                   # (top-level) → <UBadge> chips inside <ULink>
├── content/
│   ├── PostImage.vue            # NuxtImg + optional fade-in
│   └── ExternalLink.vue         # → <ULink to external target="_blank">
└── project/
    └── Project.vue              # → <UCard> + <UButton> + <UBadge>
# components/shared/BottomNav.vue DELETED — clarified 2026-05-27

# Note: Post.vue, PrevNext.vue, Toc.vue, Topics.vue are pre-existing
# top-level files. Constitution Principle IV applies to new components only;
# moving these is out of scope for this migration.

composables/
├── usePageTransition.ts         # Page fade in/out + reduced-motion guard
├── useThemeTransition.ts        # Wraps useColorMode() + animated toggle
└── useImageFadeIn.ts            # IntersectionObserver fade-in

utils/
└── animation-config.ts          # Timing/easing constants

pages/
├── index.vue
├── projects.vue
├── blog/{index,[...slug]}.vue   # Giscus theme bound to useColorMode()
└── topics/{index,[...slug]}.vue

app.vue                          # <UApp> wrapper around <NuxtPage>
app.config.ts                    # ui: { colors: { primary: 'indigo', neutral: 'zinc' } }
nuxt.config.ts                   # modules: ['@nuxt/ui', '@nuxt/content', '@nuxt/image', '@nuxtjs/sitemap', '@nuxtjs/robots']

# DELETED:
# - tailwind.config.js
# - tokens.config.ts
# - any inline <svg> in components/pages
```

**Structure Decision**: Web application (single Nuxt project). Existing
context-grouped component layout (`shared/`, `content/`, `project/`)
preserved per Constitution Principle IV. `BottomNav.vue` deleted (clarified
2026-05-27). All Tailwind/theme config moves from `tailwind.config.js` into
`assets/styles/main.css` via Tailwind v4's `@theme` directive.

## Complexity Tracking

> No Constitution violations — section intentionally empty.
