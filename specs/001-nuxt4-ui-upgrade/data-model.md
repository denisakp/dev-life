# Phase 1 Design: Data Models & Module Configuration

**Feature**: `001-nuxt4-ui-upgrade`
**Date**: 2026-05-27
**Purpose**: Define the static configuration objects, theme tokens, and
composable signatures that the migration introduces. No runtime entities
(no DB) — these models are TypeScript constants / config shapes only.

---

## 1. Theme Token Set

CSS variables exposed in `assets/styles/main.css` under `@theme static`.

```css
@theme static {
  --font-sans: "Inter", "IBM Plex Serif", ui-sans-serif, system-ui, sans-serif;
}
```

Semantic palettes are selected by name in `app.config.ts`:

```ts
// app.config.ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'indigo',   // Maps to Tailwind `indigo` 50–950
      neutral: 'zinc',     // Maps to Tailwind `zinc` 50–950
    },
  },
});
```

| Token | Value | Consumers |
|---|---|---|
| `primary` semantic | Tailwind `indigo` (50–950) | `<UButton>`, `<UBadge>`, prose links, `highlighted` class |
| `neutral` semantic | Tailwind `zinc` (50–950) | Backgrounds, borders, body text, `reading-area` |
| `error`, `success`, `warning`, `info` | Nuxt UI defaults (red, green, amber, blue) | Status surfaces (unused on site today; available for future) |
| `--font-sans` | Inter + IBM Plex Serif stack | `body`, all components |

---

## 2. Animation Configuration

`utils/animation-config.ts` — single source for durations + easing.
File already exists on this branch; data model below documents the
canonical shape to align with. All durations are milliseconds.

```ts
export const PAGE_TRANSITION = {
  enterDuration: 200,
  exitDuration: 100,
  totalDuration: 300,
  easing: 'ease-in-out',
  animationType: 'fade',
} as const;

export const THEME_TRANSITION = {
  colorDuration: 250,
  buttonDuration: 150,
  buttonRotation: 90,
  easing: 'ease-in-out',
  buttonAnimation: 'rotate',
  storageKey: 'nuxt-color-mode',
} as const;

export const IMAGE_TRANSITION = {
  duration: 300,
  easing: 'ease-out',
  blurIntensity: 10,
  lazyLoadThreshold: '0px',
} as const;

export type AnimationConfig =
  | typeof PAGE_TRANSITION
  | typeof THEME_TRANSITION
  | typeof IMAGE_TRANSITION;
```

Consumed by `assets/styles/animations.css` (mirrored as CSS custom
properties) and the three composables below.

---

## 3. Composable Contracts

### 3.1 `useThemeTransition()`

Wraps Nuxt UI's `useColorMode()` and adds an animated toggle.

```ts
export interface UseThemeTransition {
  /** Current resolved mode: 'light' | 'dark'. */
  current: ComputedRef<'light' | 'dark'>;
  /** True while the cross-fade is in flight. */
  isAnimating: Readonly<Ref<boolean>>;
  /** True if user requested reduced motion. */
  prefersReducedMotion: ComputedRef<boolean>;
  /** Toggle and animate (instant if reduced motion). */
  toggle(): Promise<void>;
}
```

Persistence key: `nuxt-color-mode` (Nuxt UI default).

### 3.2 `usePageTransition()`

Surface for the page-level fade. Backed by Nuxt's `app.pageTransition` —
this composable just exposes reactive state for templates that want to
gate UI on the in-flight transition.

```ts
export interface UsePageTransition {
  isTransitioning: Readonly<Ref<boolean>>;
  phase: Readonly<Ref<'enter' | 'leave' | 'idle'>>;
  prefersReducedMotion: ComputedRef<boolean>;
}
```

### 3.3 `useImageFadeIn(imageRef)`

```ts
export interface UseImageFadeIn {
  isLoaded: Readonly<Ref<boolean>>;
  isInView: Readonly<Ref<boolean>>;
  /** Set isLoaded=true; idempotent. */
  triggerFadeIn(): void;
  /** Tear down the IntersectionObserver. */
  stop(): void;
}

export function useImageFadeIn(
  imageRef: Ref<HTMLImageElement | null>
): UseImageFadeIn;
```

---

## 4. Module Configuration Shape

`nuxt.config.ts` modules array post-migration:

```ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',          // bundles Tailwind v4 + color-mode + Iconify
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@vercel/speed-insights/nuxt',
  ],
  css: ['~/assets/styles/main.css', '~/assets/styles/animations.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  // REMOVED: '@nuxtjs/tailwindcss', '@nuxtjs/color-mode',
  //          '@vesp/nuxt-fontawesome', '@nuxt-themes/typography',
  //          '@nuxt-themes/tokens'
});
```

`package.json` deltas:

| Added | Removed |
|---|---|
| `@nuxt/ui` ^3.3.0 | `@nuxtjs/tailwindcss` |
| `@iconify-json/lucide` ^1.x | `@nuxtjs/color-mode` |
| `@iconify-json/simple-icons` ^1.x | `@vesp/nuxt-fontawesome` |
|  | `@fortawesome/fontawesome-svg-core` |
|  | `@fortawesome/free-brands-svg-icons` |
|  | `@fortawesome/free-solid-svg-icons` |
|  | `@nuxt-themes/typography` |
|  | `@nuxt-themes/tokens` |
|  | `@tailwindcss/typography` |
|  | `@tailwindcss/postcss` |
|  | `tailwindcss` (direct dep — now transitive via `@nuxt/ui`) |

---

## 5. Custom Component-Layer Utilities

Declared in `assets/styles/main.css`:

```css
@layer components {
  .highlighted {
    @apply text-primary-600 dark:text-primary-400 font-medium;
  }
  .slick-border {
    @apply border border-neutral-200 dark:border-neutral-800;
  }
  .slick-hover {
    @apply hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors;
  }
  .slick-hover-blue {
    @apply hover:text-primary-600 dark:hover:text-primary-400 transition-colors;
  }
  .exact-navigation {
    @apply text-primary-600 dark:text-primary-400;
  }
  .reading-area {
    @apply max-w-3xl mx-auto px-4 sm:px-6;
  }
}
```

(The `dark-text`, `darker-text`, `page-bg`, `light-dark`, `dark-low-bg`,
`bg-light-dark` classes are inlined as Tailwind utilities at their call
sites — no `@layer` entry.)

---

## 6. Substitution Mapping (drives task generation)

| Bespoke file | Replacement | Status |
|---|---|---|
| `components/shared/Header.vue` | `<UHeader>` + `<UNavigationMenu>` + `<UModal>` + `<USlideover>` | Rewrite |
| `components/shared/BottomNav.vue` | — | **Delete** |
| `components/shared/Footer.vue` | Plain markup | Restyle |
| `components/shared/Pagination.vue` | `<UPagination>` wrapper | Rewrite |
| `components/Post.vue` | `<UCard>` + `<NuxtImg>` | Rewrite |
| `components/PrevNext.vue` | Pair `<UButton variant="outline" :to>` | Rewrite |
| `components/Toc.vue` | — | Keep bespoke (Pro-only fallback) |
| `components/Topics.vue` | `<UBadge>` inside `<ULink>` | Rewrite |
| `components/project/Project.vue` | `<UCard>` + `<UButton>` + `<UBadge>` | Rewrite |
| `components/content/ExternalLink.vue` | `<ULink to external target="_blank">` | Rewrite |
| `components/content/PostImage.vue` | `<NuxtImg>` + `useImageFadeIn` | Keep + extend |

---

## 7. Validation Rules

- `assets/styles/main.css` MUST contain exactly two `@import` lines
  (`tailwindcss` then `@nuxt/ui`) before any `@theme` or `@layer` block.
- `app.config.ts` `ui.colors.primary` MUST equal `'indigo'`.
- `app.vue` template MUST wrap `<NuxtPage>` in `<UApp>`.
- Zero `<svg viewBox=` literals in `components/` or `pages/` (Iconify
  enforcement).
- Zero `@fortawesome/*` imports anywhere.
- `tailwind.config.js` and `tokens.config.ts` MUST NOT exist.

These rules are checkable via grep + `ls` — codified in
`contracts/requirements.md`.
