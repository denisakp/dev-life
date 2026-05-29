# Phase 0 Research: Nuxt 4 + Nuxt UI Migration

**Feature**: `001-nuxt4-ui-upgrade`
**Date**: 2026-05-27
**Purpose**: Resolve open technical decisions before Phase 1 design. Inputs
from spec.md (revised) + Clarifications session 2026-05-27.

## R1 — Nuxt UI v3 install + bundled module surface

**Decision**: Install `@nuxt/ui` v3.3.x. Register as a Nuxt module in
`nuxt.config.ts`; do **not** also register `@nuxtjs/tailwindcss` or
`@nuxtjs/color-mode` — Nuxt UI bundles both.

**Rationale**: `@nuxt/ui` v3 bundles Tailwind v4 + `@nuxtjs/color-mode` +
`@iconify-json/lucide` (default icon set) + reka-ui primitives. Adding the
standalone modules causes double-registration warnings and theme conflicts.

**Alternatives considered**:
- Keep `@nuxtjs/color-mode` separate: rejected (duplicate registration, no
  benefit since Nuxt UI re-exports `useColorMode()`).
- Stay on bespoke Tailwind without `@nuxt/ui`: rejected (defeats the purpose
  of this feature; substitution table assumes Nuxt UI primitives).

## R2 — Tailwind v4 CSS-first config via `@theme`

**Decision**: Delete `tailwind.config.js`. Put all theme config in
`assets/styles/main.css`:

```css
@import "tailwindcss";
@import "@nuxt/ui";

@theme static {
  --font-sans: "Inter", "IBM Plex Serif", ui-sans-serif, system-ui, sans-serif;
  /* No --color-primary-* / --color-neutral-* declared here.
     Palettes are selected by name in app.config.ts (see R3). */
}
```

**Rationale**: Tailwind v4 reads config from CSS via `@theme`. JS config is
deprecated. Nuxt UI v3 explicitly requires this layout. Per Clarification
2026-05-27, `primary` = stock `indigo`, `neutral` = `zinc`; selecting by
name in `app.config.ts` avoids redeclaring 11 shades per palette.

**Alternatives considered**:
- Define `--color-primary-50..950` manually with custom hex values: rejected
  (clarification chose stock `indigo` to avoid hand-tuning + WCAG drift).
- Keep `tailwind.config.js` alongside CSS-first: rejected (Tailwind v4 only
  reads one source; mixing causes silent overrides).

## R3 — Nuxt UI palette selection in `app.config.ts`

**Decision**: Configure semantic palettes by name:

```ts
// app.config.ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'zinc',
      // 'error', 'success', 'warning', 'info' keep Nuxt UI defaults
    },
  },
});
```

**Rationale**: Nuxt UI resolves these names against its bundled Tailwind
palettes at build time. No CSS declarations needed for the scales — they
ship with `@nuxt/ui`.

**Alternatives considered**: Per-component theme overrides via `ui` prop —
deferred unless a specific component fails the dark-mode parity check (US3).

## R4 — Iconify migration (FontAwesome + inline SVG → `<UIcon>`)

**Decision**:
- Install `@iconify-json/lucide` (Nuxt UI default) and
  `@iconify-json/simple-icons` (brand glyphs: GitHub, X, LinkedIn).
- Replace `<font-awesome :icon="faGithub" />` → `<UIcon name="i-simple-icons-github" />`.
- Replace inline `<svg viewBox=...>` in header nav / modal close →
  `<UIcon name="i-lucide-<glyph>" />` (menu, x, search, sun, moon, chevron-*).
- Remove `@vesp/nuxt-fontawesome` + all `@fortawesome/*` packages from
  `package.json`.

**Rationale**: Iconify ships JSON collections bundled at build time
(tree-shaken to the icons actually referenced). Nuxt UI resolves
`i-<collection>-<name>` automatically. Unifies maintenance and inherits
text color via CSS `currentColor`.

**Alternatives considered**:
- Keep FontAwesome for brand icons only: rejected (mixed icon systems
  duplicate bundle weight and break Tailwind sizing utilities).
- Use `<NuxtIcon>` from `@nuxt/icon`: rejected (Nuxt UI already provides
  `<UIcon>` with the same backend; avoid two icon modules).

## R5 — Custom utility class reconciliation

**Decision**: Migrate via three buckets:

| Class | Action |
|---|---|
| `highlighted`, `slick-border`, `slick-hover`, `slick-hover-blue` | Re-declare under `@layer components` in `main.css`, referencing `--color-primary-*` and `--color-neutral-*`. |
| `dark-text`, `darker-text`, `page-bg`, `reading-area`, `light-dark`, `dark-low-bg`, `bg-light-dark` | Replace inline with Tailwind utility classes + `dark:` variants (`text-(neutral-700)` / `dark:text-(neutral-200)` etc.). Remove originals. |
| `exact-navigation` | Re-declare under `@layer components` (used by `Header.vue`; survives until US5 rewrites header). |

Content audit (clarified 2026-05-27): no markdown files reference any of
these classes, so the migration is template-only.

**Rationale**: Splitting by reuse vs one-off keeps `main.css` small and
favors Tailwind utilities for one-shot styling.

**Alternatives considered**: Keep all classes in CSS — rejected (most are
one-off; pure utility classes are easier to dark-mode-tune).

## R6 — Color-mode handoff (`@nuxtjs/color-mode` → Nuxt UI bundled)

**Decision**: Remove the standalone `@nuxtjs/color-mode` module entry from
`nuxt.config.ts`. Keep `useColorMode()` call sites unchanged — Nuxt UI
re-exports the identical composable. Toggle stays in `Header.vue`; wrap in
`<ClientOnly>` to avoid hydration mismatch.

**Rationale**: Identical API surface; only registration changes. Avoids
flash-of-wrong-theme by relying on Nuxt UI's SSR-aware color script
injected into `<head>`.

**Alternatives considered**: Roll a custom composable — rejected (zero
benefit vs Nuxt UI's bundled one).

## R7 — Prose styling without `@nuxt-themes/typography`

**Decision**: Rely on Nuxt UI's built-in prose styles (it bundles
`@tailwindcss/typography` equivalents). Remove `@nuxt-themes/typography`,
`@nuxt-themes/tokens`, `tokens.config.ts`, `@tailwindcss/typography` from
`package.json`. Customize prose via the `ui.prose.*` slots in
`app.config.ts` if defaults diverge from the current look.

**Rationale**: One less dependency; consistent with the rest of the Nuxt UI
theme system; `@nuxt-themes/*` is unmaintained.

**Alternatives considered**: Keep `@tailwindcss/typography` standalone —
rejected (Nuxt UI bundles it; double-registration risks).

## R8 — Giscus theme reactivity

**Decision**: Bind Giscus `theme` prop to `useColorMode().value`:

```vue
<Giscus
  :theme="colorMode.value === 'dark' ? 'dark' : 'light'"
  ...
/>
```

Giscus re-posts the theme to its iframe via `postMessage` when the prop
changes; iframe handles the swap asynchronously. First-toggle flicker is
acceptable per spec Edge Cases.

**Rationale**: Simplest reactive binding; Giscus prop is officially
supported.

**Alternatives considered**: Manual `window.postMessage` from a watcher —
rejected (the Giscus Vue component already does it).

## R9 — Page transition pattern

**Decision**: Enable Nuxt's built-in route transitions in `nuxt.config.ts`:

```ts
app: {
  pageTransition: { name: 'page', mode: 'out-in' },
}
```

Define the `.page-enter-*` / `.page-leave-*` classes in
`assets/styles/animations.css` (opacity fade, 200 ms in / 100 ms out,
`ease-in-out`). Wrap in `@media (prefers-reduced-motion: reduce)` for
instant swap.

**Rationale**: Native Vue `<Transition>` with no JS overhead. Constants
(durations, easing) live in `utils/animation-config.ts` per data-model.

**Alternatives considered**: GSAP / @vueuse/motion — rejected (Assumption:
no external animation library).

## R10 — Image fade-in pattern for `<NuxtImg>`

**Decision**: Wrap `<NuxtImg>` in `PostImage.vue` with an
IntersectionObserver via `useImageFadeIn(imageRef)` composable. Apply
`opacity-0` initial, `transition-opacity duration-300 ease-out`, flip to
`opacity-100` on the `load` event. Skip the transition when
`prefers-reduced-motion: reduce`.

**Rationale**: `<NuxtImg>` already does lazy loading; the composable just
adds the fade and reduced-motion guard. No layout-shifting — opacity-only
keeps CLS = 0.

**Alternatives considered**: Use `placeholder` prop with blur-data — kept
as future enhancement; not required for spec acceptance.

## R11 — Bundle baseline (NFR-003)

**Decision**: Before any US2 work, check out `main`, run `pnpm install &&
pnpm build`, and record:
- Total `.output/public/_nuxt/` size (`du -sk`).
- Per-route HTML+JS+CSS size from Nitro's build summary.

Write into `specs/001-nuxt4-ui-upgrade/baseline.md` (committed). Post-
migration compare against the same numbers; flag any route > 115 % delta.

**Rationale**: Reproducible; uses tools already in the project; cheap.

**Alternatives considered**: Vercel deployment analytics — rejected
(requires deploy, slower iteration).

## R12 — Pro vs free component fallback (clarification confirmed)

**Decision**: Free tier only.

| Component | Free fallback |
|---|---|
| `<UPageCard>` (Pro) | `<UCard>` |
| `<UContentToc>` (Pro) | Keep bespoke `Toc.vue` |
| `<UFooter>` (Pro) | Plain semantic `<footer>` markup |
| `<UPageLinks>` (Pro) | Pair of `<UButton variant="outline" :to>` |

**Rationale**: Clarification 2026-05-27 — no Pro license.

## Constitution Re-Check (Post-Research)

| Principle | Status |
|---|---|
| I. Type Safety & Validated Boundaries | ✅ — No `any` introduced by any decision. |
| II. Optimized Images Only | ✅ — `<NuxtImg>` retained in `PostImage.vue`. |
| III. Accessible, Semantic, Dark-Mode-Complete UI | ✅ — Nuxt UI primitives WCAG-conformant; dark parity via R3+R6; reduced-motion in R9+R10. |
| IV. Context-Grouped Components | ✅ — Component layout unchanged. |
| V. Content & Performance Discipline | ✅ — Lighthouse method codified in spec; bundle baseline in R11. |

**Gate Status**: ✅ PASS — Proceed to Phase 1 Design.

## Outcomes

All 12 research items resolved. Phase 1 artifacts (data-model.md,
contracts/, quickstart.md) reflect these decisions.
