# Feature Specification: Nuxt 4 + Nuxt UI Migration

**Feature Branch**: `001-nuxt4-ui-upgrade`
**Created**: 2025-01-27
**Revised**: 2026-05-27
**Status**: Draft (revised)
**Input**: "Migrate from Nuxt 3 to Nuxt 4, adopt the official Nuxt UI component library, and improve UI smoothness."

## Clarifications

### Session 2026-05-27

- Q: Is Nuxt UI Pro licensed for this repo? → A: No — free tier only; Pro-only components fall back to free primitives or DIY.
- Q: `BottomNav.vue` fate? → A: Delete; mobile nav handled entirely by `<UHeader>` + slideover.
- Q: Are bespoke utility classes referenced from `content/**/*.md`? → A: No — `grep -rE "slick-|dark-text|darker-text|page-bg|reading-area|highlighted|exact-navigation|dark-high|dark-low|codeGray|light-dark" content/` returns zero matches (audited 2026-05-27). US3 can migrate without touching content.
- Q: How to derive Nuxt UI `primary` 50–950 palette from `#4831D4`? → A: Adopt Tailwind **`indigo`** as `primary` semantic. Slight brand drift accepted; no hand-tuned scale required. `--color-primary-*` aliases the indigo palette in the `@theme` block.
- Q: Bundle baseline for NFR-003? → A: `main` HEAD at migration kickoff. `pnpm build` output sizes captured in `specs/001-nuxt4-ui-upgrade/baseline.md` before US2 starts. **Update 2026-05-27**: 115%-of-baseline ceiling abandoned; NFR-003 now fixed at ≤ 1500 KB gzip — see NFR-003 below.
- Q: Lighthouse measurement methodology? → A: Local Chrome DevTools Lighthouse, **desktop** preset, against `pnpm preview` on `localhost:3000`. Report the **median of 3 runs** per page.

## Context & Why This Revision

The original spec described a Nuxt 3 → Nuxt 4 upgrade plus hand-rolled CSS animations. It did **not** address adopting [`@nuxt/ui`](https://ui.nuxt.com), which is the actual intent signalled by the branch name. This revision keeps the framework upgrade as a prerequisite and inserts the Nuxt UI adoption work between it and the animation polish.

### Current state (baseline)

- Nuxt 4.3.x already in `package.json` (framework upgrade partially landed).
- UI is hand-rolled Tailwind + a `tailwind.config.js` (v3-style JS config) + `@tailwindcss/typography` + `@nuxt-themes/typography` + `@nuxt-themes/tokens`.
- Icons are split between `@vesp/nuxt-fontawesome` (homepage social links) and **inline SVG strings** (header nav icons, modal close, search).
- Dark mode via standalone `@nuxtjs/color-mode`; toggle currently uses custom CSS classes (`slick-hover`, `slick-border`, `dark-text`, `darker-text`, `page-bg`, `reading-area`, `highlighted`, `exact-navigation`) defined outside the Tailwind config.
- Pagination, prev/next, post card, project card, header, footer, bottom nav are all bespoke.
- Giscus theme is hard-coded to `light` in `pages/blog/[...slug].vue`.
- `tokens.config.ts` is an orphan from `@nuxt-themes`.

### What changes

1. Adopt `@nuxt/ui` v3 as the component foundation.
2. Migrate Tailwind config from JS (`tailwind.config.js`) to **CSS-first** via the `@theme` directive (required by Nuxt UI / Tailwind v4).
3. Replace `@nuxtjs/color-mode`, `@nuxtjs/tailwindcss`, `@nuxt-themes/*`, `@tailwindcss/typography`, `@tailwindcss/postcss`, FontAwesome packages — all become redundant with Nuxt UI.
4. Replace bespoke components with Nuxt UI primitives where a direct equivalent exists, keeping wrappers thin.
5. Unify the icon system on Iconify (Lucide as primary set) — both FontAwesome and inline SVGs gone.
6. Wire transitions/animations on top of Nuxt UI defaults, respecting `prefers-reduced-motion`.

## User Scenarios & Testing

### User Story 1 — Framework Upgrade Verified (Priority: P1)

A maintainer confirms that the in-progress Nuxt 4 upgrade is complete and clean: `pnpm dev`, `pnpm build`, and `nuxi typecheck` all succeed against the current `main` baseline before any UI library work begins.

**Why this priority**: Acts as the foundation gate. UI library swap on a broken framework upgrade compounds failures.

**Independent Test**:

1. `pnpm install` succeeds with no peer dependency errors.
2. `pnpm dev` boots without console errors and serves every existing route (`/`, `/blog`, `/blog/<slug>`, `/projects`, `/topics`, `/topics/<slug>`).
3. `nuxi typecheck` reports zero errors.
4. `pnpm build` completes; `pnpm preview` serves the prerendered output without 500s.

**Acceptance Scenarios**:

1. **Given** the current branch, **When** running the full quality gate, **Then** dev/build/preview/typecheck all pass.
2. **Given** every prerendered route, **When** opened in `preview`, **Then** rendered HTML matches the Nuxt 3 baseline (visual diff acceptable bar known cosmetic shifts).

---

### User Story 2 — Adopt Nuxt UI Foundation (Priority: P1)

A developer installs `@nuxt/ui`, swaps the Tailwind setup for CSS-first theming, wraps the app in `<UApp>`, and verifies that pages still render with the existing design tokens preserved as CSS variables.

**Why this priority**: This is the structural change everything else depends on. Done wrong, every downstream component refactor inherits broken theming.

**Independent Test**:

1. `pnpm add @nuxt/ui` succeeds; `tailwind.config.js`, `@tailwindcss/postcss`, `@nuxtjs/tailwindcss`, `@nuxtjs/color-mode`, `@nuxt-themes/*`, `@tailwindcss/typography`, and FontAwesome packages are removed from `package.json`.
2. `assets/styles/main.css` contains `@import "tailwindcss"; @import "@nuxt/ui";` and a single `@theme static { ... }` block aliasing `--color-primary-*` to Tailwind `indigo` and `--color-neutral-*` to a stock neutral (e.g. `zinc`), plus `--font-sans`.
3. `nuxt.config.ts` lists `@nuxt/ui` and no longer lists `@nuxtjs/tailwindcss`, `@nuxtjs/color-mode`, or `@vesp/nuxt-fontawesome`.
4. `app.vue` wraps `<NuxtPage>` with `<UApp>`.
5. `pnpm dev` and `pnpm build` still succeed; pages render with no broken Tailwind utility (custom classes may render unstyled at this stage — fixed by US3).

**Acceptance Scenarios**:

1. **Given** the install is complete, **When** running `pnpm dev`, **Then** zero "unknown utility" warnings appear in the console.
2. **Given** a `<UButton>` is dropped onto any page, **When** rendered, **Then** it picks up the configured `primary` color from `@theme`.
3. **Given** the color mode toggle, **When** clicked, **Then** the `class="dark"` flips on `<html>` (proves Nuxt UI's bundled color-mode is functional after removing the standalone module).

---

### User Story 3 — Custom Class & Token Reconciliation (Priority: P1)

All bespoke utility classes used in templates (`slick-border`, `slick-hover`, `slick-hover-blue`, `dark-text`, `darker-text`, `page-bg`, `reading-area`, `highlighted`, `exact-navigation`, `light-dark`, `dark-low-bg`, `bg-light-dark`) and bespoke color names (`dark-high`, `dark-low`, `blue` brand, `green`, `yellow`, `red`, `codeGray`) are migrated.

**Why this priority**: These classes were defined in the Tailwind v3 config or as global CSS. Removing the JS config without re-declaring them breaks every existing template before any component is rewritten.

**Independent Test**:

1. `grep -rE "slick-|dark-text|darker-text|page-bg|reading-area|highlighted|exact-navigation"` returns either zero matches or only matches resolving against new `@layer components` rules in `assets/styles/main.css`.
2. Every brand color used in templates resolves to a CSS variable defined in the `@theme` block or its semantic alias (`primary`, `neutral`, `error`, `success`, `warning`, `info`).
3. Light/dark variants render correctly for each migrated class.

**Acceptance Scenarios**:

1. **Given** the homepage, **When** rendered in light and dark mode, **Then** `<span class="highlighted">` retains the brand-blue accent in both modes.
2. **Given** the blog post page, **When** scrolled, **Then** `reading-area` width and prose styling match the Nuxt 3 baseline within ±4 px.
3. **Given** the projects page, **When** a card is hovered, **Then** `slick-border` + `slick-hover` produce equivalent visual feedback (border + subtle background change).

---

### User Story 4 — Iconify Migration (Priority: P1)

All icons — FontAwesome social icons on the homepage, inline SVG nav icons in the header, modal close glyphs — are migrated to Iconify via Nuxt UI's icon system. The `@vesp/nuxt-fontawesome` module and all `@fortawesome/*` packages are removed.

**Why this priority**: Mixed icon systems block clean dark mode, accessibility, and component substitution. Inline SVGs duplicate Tailwind utility maintenance.

**Independent Test**:

1. `grep -r "font-awesome\|@fortawesome\|fa[A-Z]" components pages` returns zero matches.
2. `grep -rE "<svg[^>]*viewBox" components pages` returns zero matches (or only inside `assets/`).
3. Every replaced icon renders at the correct size and inherits the surrounding text color.

**Acceptance Scenarios**:

1. **Given** the homepage, **When** social links render, **Then** GitHub, X, and LinkedIn icons display via `<UIcon name="i-simple-icons-github" />` (or Lucide equivalents) at parity with prior FA glyphs.
2. **Given** the header nav, **When** rendered, **Then** Blog / Topics / Projects links each show an Iconify icon (no inline `<svg>`).
3. **Given** the dark mode toggle, **When** toggled, **Then** the icon swaps between `i-lucide-sun` and `i-lucide-moon` with the rotation transition from US7.

---

### User Story 5 — Component Substitution (Priority: P1)

Each bespoke component is replaced or refactored to use Nuxt UI primitives, keeping prop interfaces stable so calling pages do not have to change beyond import paths.

**Why this priority**: This is where most of the visual benefit lands. Until done, the app looks like a Nuxt UI install with the old shell on top.

**Substitution table** (drives task generation):

| Bespoke file | Nuxt UI cible | Action |
|---|---|---|
| `components/shared/Header.vue` | `<UHeader>` + `<UNavigationMenu>` + `<UModal>` (search) + `<UInput>` | Rewrite. Mobile menu via `<USlideover>`. |
| `components/shared/BottomNav.vue` | **Delete** | Mobile nav handled by `<UHeader>` + slideover (clarified 2026-05-27). |
| `components/shared/Footer.vue` | `<UFooter>` (if free) or plain markup | Keep minimal. |
| `components/shared/Pagination.vue` | `<UPagination>` | Drop custom `lastPageCount` math; `<UPagination>` handles it. |
| `components/Post.vue` | `<UPageCard>` if available in free tier, else `<UCard>` | Image stays `<NuxtImg>`. |
| `components/PrevNext.vue` | Pair of `<UButton variant="outline" :to>` or `<UPageLinks>` | Truncate logic via Tailwind. |
| `components/Toc.vue` | Custom (Nuxt UI Pro has `<UContentToc>`, paid) | Keep DIY unless Pro is acquired. |
| `components/Topics.vue` | `<UBadge>` or `<UChip>` chips inside `<ULink>` | |
| `components/project/Project.vue` | `<UCard>` + `<UButton>` + `<UBadge>` for tags | |
| `components/content/ExternalLink.vue` | `<ULink to external target="_blank">` | |
| `components/content/PostImage.vue` | Keep `<NuxtImg>` directly — no Nuxt UI dedicated component | Optional fade-in via US8. |

**Independent Test**:

1. Each route renders with zero console errors after its component(s) are migrated.
2. The substitution table contains zero "to do" entries.
3. Screenshot diff against the post-US3 baseline shows intended design changes only (no regressions in unrelated areas).

**Acceptance Scenarios**:

1. **Given** the blog list page, **When** rendered, **Then** pagination uses `<UPagination>` and the per-page count, total, and active page match the previous behavior.
2. **Given** the projects page, **When** a project card is rendered, **Then** all metadata fields (title, description, tags, links) are visible and tags render as badges.
3. **Given** the header on a viewport < 768 px, **When** the menu icon is tapped, **Then** a Nuxt UI slideover opens, listing the same routes as the desktop header.

---

### User Story 6 — Prose & Content Integration (Priority: P1)

Markdown content rendered by `<ContentRenderer>` (Nuxt Content v3) uses Nuxt UI's prose styling. `@nuxt-themes/typography`, `@nuxt-themes/tokens`, `tokens.config.ts`, and `@tailwindcss/typography` are removed. Anchor links, copy buttons, and code blocks keep working. Giscus theme syncs with the active color mode.

**Why this priority**: The blog is the primary surface. Broken prose styling is the most visible regression risk.

**Independent Test**:

1. Three representative blog posts (one heavy on code blocks, one heavy on images, one heavy on headings) render with consistent typography, working anchor links, working "copy" buttons on code blocks, and correct dark-mode inversion.
2. `app.config.ts` `prose` settings reference Iconify names (e.g. `i-ph-anchor`) rather than the old `ph:` shorthand if a migration is required.
3. Giscus iframe loads with `theme="dark"` when color mode is `dark` and `theme="light"` otherwise.

**Acceptance Scenarios**:

1. **Given** a blog post with fenced code, **When** the copy button is clicked, **Then** the code copies and the icon swaps to a check for ~1.5 s.
2. **Given** a heading with an anchor, **When** hovered, **Then** the anchor icon appears and clicking it updates the URL hash.
3. **Given** a blog post in dark mode, **When** scrolled to the comments, **Then** Giscus renders in dark theme without a re-mount flicker on subsequent toggles (best-effort — Giscus theme prop drives an iframe message).

---

### User Story 7 — Color Mode Toggle Polish (Priority: P2)

The dark-mode toggle uses Nuxt UI's color mode composable, animates icon swap (sun ↔ moon, rotation ~150 ms), transitions theme colors over ~250 ms, and respects `prefers-reduced-motion`. Preference persists via Nuxt UI's bundled color-mode (localStorage key `nuxt-color-mode`).

**Independent Test**:

1. Toggle from light to dark and back; both directions complete within ~250 ms with no flash of the wrong theme on reload.
2. With DevTools emulating `prefers-reduced-motion`, the swap is instant.
3. The toggle button is reachable via keyboard with a visible focus ring.

---

### User Story 8 — Page Transitions & Image Fade-in (Priority: P2)

Route changes fade through `<NuxtPage>`'s `pageTransition` slot (Vue `<Transition>` under the hood) in < 300 ms. Images on blog posts fade in over ~300 ms with a placeholder, no CLS, and respect reduced motion.

**Independent Test**:

1. Performance profiler shows transitions at 60 fps on a mid-range laptop emulation.
2. Lighthouse CLS < 0.1 on a multi-image blog post.
3. With reduced motion, transitions are instant.

---

### User Story 9 — Mobile Polish (Priority: P3)

Mobile navigation slideover, touch feedback on interactive elements (`active:scale-[0.98]` or equivalent), and scroll smoothness verified on iPhone-class and Android-class viewports.

**Independent Test**: Manual emulation in DevTools (iPhone 14, Galaxy S20) — buttons confirm taps within 100–200 ms, slideover opens within 200 ms, scroll holds 60 fps on a long blog post.

---

### Edge Cases

- **Pro components**: `<UPageCard>`, `<UContentToc>`, `<UFooter>` may be Pro-only. Treat as fallback to free primitives unless the project licenses Pro.
- **Custom classes still referenced from markdown content**: search `content/**/*.md` for `slick-`, `highlighted`, etc. Migrate or document as known-orphan.
- **Giscus theme during transition**: Giscus theme is set via prop and the iframe handles it asynchronously. A small flicker on the first toggle of a session is acceptable.
- **Reduced motion**: every animation in US7/US8/US9 must be wrapped in `@media (prefers-reduced-motion: reduce)` or guarded in JS.
- **Server-side render of color mode**: Nuxt UI's color-mode requires `<ClientOnly>` around the toggle to avoid hydration mismatch — already documented in Nuxt UI v3.

## Requirements

### Functional Requirements

- **FR-001** — Application MUST build, type-check, and serve on Nuxt 4 with no critical warnings.
- **FR-002** — Application MUST include `@nuxt/ui` v3.x as the component foundation and wrap `<NuxtPage>` in `<UApp>`.
- **FR-003** — Tailwind configuration MUST live in CSS via `@theme` (no `tailwind.config.js`).
- **FR-004** — All icons MUST be served through Iconify (Nuxt UI's `<UIcon>` or icon props). No inline `<svg>` outside of `assets/`. No `@fortawesome/*` runtime imports.
- **FR-005** — `@nuxtjs/color-mode`, `@nuxtjs/tailwindcss`, `@vesp/nuxt-fontawesome`, `@nuxt-themes/typography`, `@nuxt-themes/tokens`, `@tailwindcss/typography`, `@tailwindcss/postcss` MUST be removed from `package.json`.
- **FR-006** — Every bespoke utility class still referenced from a template MUST resolve to an `@layer components` rule in `assets/styles/main.css` or be replaced by an equivalent Nuxt UI / Tailwind utility.
- **FR-007** — Each bespoke component listed in US5 MUST be migrated, deleted, or explicitly justified for retention in `docs/DEVELOPMENT.md`.
- **FR-008** — `<ContentRenderer>` MUST continue rendering all existing markdown content without frontmatter changes.
- **FR-009** — Giscus comments MUST receive a `theme` prop bound to the active color mode.
- **FR-010** — Application MUST respect `prefers-reduced-motion` for every motion enhancement.
- **FR-011** — Color mode preference MUST persist across reloads with no flash of unstyled theme.
- **FR-012** — `tokens.config.ts` MUST be deleted.

### Non-Functional Requirements

- **NFR-001** — Lighthouse desktop performance score ≥ 90 on `/`, `/blog`, and a representative blog post. Measurement: Chrome DevTools Lighthouse, desktop preset, against `pnpm preview` on `localhost:3000`; report median of 3 runs per page.
- **NFR-002** — Core Web Vitals: LCP ≤ 2.5 s, CLS < 0.1, INP < 200 ms on the same pages.
- **NFR-003** — Post-migration `.output/public/_nuxt/` MUST be **≤ 1500 KB gzip** (sum of `*.gz` sibling files emitted by Nitro with `compressPublicAssets: true`). Original 115%-of-baseline ceiling was abandoned 2026-05-27 after re-measurement showed Nuxt UI v4 + `@nuxt/content` v3 sqlite-wasm hydration runtime (≈1864 KB raw / ~750 KB gzip alone) make a 194 KB-gzip ceiling structurally unachievable. Baseline reference (`main` HEAD, Nuxt 3.12 + content v2): 169 KB gzip / 480 KB raw — retained in `specs/001-nuxt4-ui-upgrade/baseline.md` for historical context.
- **NFR-004** — Zero `any` types added during migration; existing `any` reduced opportunistically.
- **NFR-005** — Constitution (`.specify/memory/constitution.md`) principles I–V (v1.0.0) remain satisfied.

### Key Entities

- **Theme tokens**: CSS variables declared in the `@theme static` block. `--color-primary-*` aliases Tailwind `indigo`; `--color-neutral-*` aliases a stock neutral palette. Drive both Nuxt UI semantic colors and any retained bespoke utilities.
- **Color mode state**: `useColorMode()` from Nuxt UI; key `nuxt-color-mode` in `localStorage`.
- **Animation config**: `utils/animation-config.ts` (already created by prior plan) — durations and easing constants consumed by transitions.

## Success Criteria

- **SC-001** — `pnpm install`, `pnpm dev`, `pnpm build`, `pnpm preview`, `nuxi typecheck` all succeed on a clean checkout.
- **SC-002** — `@nuxt/ui` listed in dependencies; legacy modules listed in FR-005 are absent from `package.json` and `pnpm-lock.yaml`.
- **SC-003** — No `<svg>` literals in `components/` or `pages/`; no `@fortawesome/*` imports; no `font-awesome` template references.
- **SC-004** — `tailwind.config.js` and `tokens.config.ts` deleted; `assets/styles/main.css` contains `@import "tailwindcss"; @import "@nuxt/ui";` and a `@theme` block.
- **SC-005** — `app.vue` wraps `<NuxtPage>` in `<UApp>`; the color mode toggle is a Nuxt UI button using `useColorMode()`.
- **SC-006** — Every row of the US5 substitution table is resolved (migrated, deleted, or explicitly retained with rationale).
- **SC-007** — Three sample blog posts render with the new prose pipeline at parity or better than the pre-migration baseline.
- **SC-008** — Giscus theme matches color mode on first load.
- **SC-009** — Lighthouse desktop ≥ 90 on `/`, `/blog`, a representative blog post (median of 3 local Chrome DevTools runs against `pnpm preview`).
- **SC-010** — Page transitions complete < 300 ms; image fade-in < 300 ms; both honor reduced motion.
- **SC-011** — Zero console errors across all routes in `pnpm preview`.

## Assumptions

- Nuxt UI **v3.3.x** (stable) is the target. v4 alpha is **out of scope**.
- The project will use the **free** tier of Nuxt UI. Components that turn out to be Pro-only (`<UPageCard>`, `<UContentToc>`, etc.) fall back to free primitives or remain bespoke.
- Lucide is the primary icon set, Simple-Icons for brand glyphs (GitHub, X, LinkedIn). Other Iconify sets allowed when needed.
- No content-side changes required; markdown frontmatter, slugs, and routing stay identical.
- Animations stay in pure CSS / Vue `<Transition>` — no external animation library introduced.
- Pro license is **not** purchased as part of this work. If acquired later, additional task to switch from DIY to Pro components.

## Out of Scope

- Adding new content, redesigning the information architecture, or restructuring routes.
- Server-side features (Nitro routes, API handlers) beyond what currently exists.
- Upgrading Nuxt Content v3 → v4 (track separately).
- Switching the deployment target.
- Internationalization.

## Open Questions

1. ~~Nuxt UI Pro license?~~ — Resolved 2026-05-27: **No**, free tier only.
2. ~~`BottomNav.vue` fate?~~ — Resolved 2026-05-27: **Delete**; folded into `<UHeader>` slideover.
3. ~~Bespoke classes referenced from markdown content?~~ — Resolved 2026-05-27 via grep: **No matches**. US3 migration does not need to touch `content/`.
