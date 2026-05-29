# Phase 1 Quickstart: Migration Steps

**Feature**: `001-nuxt4-ui-upgrade`
**Date**: 2026-05-27
**Purpose**: Ordered, copy-pasteable steps for executing the migration on
this branch. Each step ends with a verification command from
`contracts/requirements.md`.

---

## 0 — Prerequisites

```bash
git checkout 001-nuxt4-ui-upgrade
pnpm install
pnpm dev          # Confirm app boots on Nuxt 4 baseline
nuxi typecheck    # Must be clean before starting US2
```

Capture bundle baseline (NFR-003, run **on `main`**, not this branch):

```bash
git stash -u
git checkout main && pnpm install && pnpm build
du -sk .output/public/_nuxt | tee specs/001-nuxt4-ui-upgrade/baseline.md
git checkout 001-nuxt4-ui-upgrade && git stash pop
```

Verify: `C19` from contracts/requirements.md → `ok`.

---

## US1 — Framework Upgrade Verified

Already substantially landed (`package.json` shows Nuxt 4.3.x). Just
verify the gate:

```bash
pnpm install
nuxi typecheck    # 0 errors
pnpm build && pnpm preview
```

Walk every route in the browser: `/`, `/blog`, a blog post,
`/projects`, `/topics`, `/topics/<slug>`. Zero console errors.

---

## US2 — Install Nuxt UI + CSS-first Tailwind

```bash
pnpm add @nuxt/ui @iconify-json/lucide @iconify-json/simple-icons
pnpm remove \
  @nuxtjs/tailwindcss @nuxtjs/color-mode \
  @vesp/nuxt-fontawesome \
  @fortawesome/fontawesome-svg-core \
  @fortawesome/free-brands-svg-icons \
  @fortawesome/free-solid-svg-icons \
  @nuxt-themes/typography @nuxt-themes/tokens \
  @tailwindcss/typography @tailwindcss/postcss \
  tailwindcss
rm tailwind.config.js tokens.config.ts
```

Rewrite `assets/styles/main.css`:

```css
@import "tailwindcss";
@import "@nuxt/ui";

@theme static {
  --font-sans: "Inter", "IBM Plex Serif", ui-sans-serif, system-ui, sans-serif;
}
```

Edit `nuxt.config.ts` modules array per `data-model.md` §4.

Create/replace `app.config.ts`:

```ts
export default defineAppConfig({
  ui: {
    colors: { primary: 'indigo', neutral: 'zinc' },
  },
});
```

Wrap `app.vue`:

```vue
<template>
  <UApp>
    <Header />
    <NuxtPage />
    <Footer />
  </UApp>
</template>
```

Verify: `C1`, `C2`, `C3`, `C4`, `C5`, `C8`, `C11`, `C12`, `C13`, `C16`.

---

## US3 — Custom-class reconciliation

Append `@layer components` block from `data-model.md` §5 to `main.css`.
Then sweep templates:

```bash
grep -rE "dark-text|darker-text|page-bg|light-dark|dark-low-bg|bg-light-dark" components pages
```

Replace each hit with the Tailwind equivalent listed in `research.md` R5
table (bucket 2). Keep dark-mode parity in mind.

Spot-check the homepage and a blog post in both modes after each batch.

---

## US4 — Iconify migration

Replace inline SVGs and FontAwesome calls:

```bash
grep -rE "<svg[^>]*viewBox" components pages   # list targets
grep -rE "fa[A-Z]|font-awesome|@fortawesome"  components pages
```

For each: substitute `<UIcon name="i-lucide-<name>" />` (UI glyphs) or
`<UIcon name="i-simple-icons-<brand>" />` (social brands). Set
`class="size-5 text-current"` to inherit color.

Verify: `C6`, `C7`.

---

## US5 — Component substitution

Walk the substitution table (`data-model.md` §6) top-to-bottom. After
each component:

```bash
pnpm dev
# Visit the page that uses the component, exercise interactions
nuxi typecheck
```

When `BottomNav.vue` is removed:

```bash
rm components/shared/BottomNav.vue
grep -rE "BottomNav" components pages app.vue   # must return zero
```

Verify: `C9`, `C16`.

---

## US6 — Prose + Giscus

Configure prose tweaks in `app.config.ts` if defaults need adjustment:

```ts
ui: {
  prose: {
    a: { base: 'text-primary-600 dark:text-primary-400 hover:underline' },
    // ...
  },
},
```

In `pages/blog/[...slug].vue`, bind Giscus theme:

```vue
<script setup>
const colorMode = useColorMode();
</script>

<template>
  <Giscus :theme="colorMode.value === 'dark' ? 'dark' : 'light'" ... />
</template>
```

Test all three sample posts (code-heavy, image-heavy, heading-heavy) in
both modes.

Verify: `C10`, `H3`.

---

## US7 — Color-mode toggle polish

Implement `composables/useThemeTransition.ts` per `data-model.md` §3.1.
Wrap toggle button in `<ClientOnly>` inside `Header.vue`. Animate icon
swap via Vue `<Transition name="theme-toggle">` (150 ms rotation).

Add to `animations.css`:

```css
.theme-toggle-enter-active,
.theme-toggle-leave-active { transition: transform 150ms ease-in-out; }
.theme-toggle-enter-from   { transform: rotate(-90deg); }
.theme-toggle-leave-to     { transform: rotate(90deg); }

@media (prefers-reduced-motion: reduce) {
  .theme-toggle-enter-active,
  .theme-toggle-leave-active { transition: none; }
}
```

Verify: `H4`.

---

## US8 — Page transitions + image fade-in

`nuxt.config.ts`:

```ts
app: { pageTransition: { name: 'page', mode: 'out-in' } }
```

`animations.css`:

```css
.page-enter-active { transition: opacity 200ms ease-in-out; }
.page-leave-active { transition: opacity 100ms ease-in-out; }
.page-enter-from,
.page-leave-to     { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active { transition: none; }
}
```

Implement `composables/useImageFadeIn.ts`; wire into `PostImage.vue`.

Verify: `C14`, `C15`, `H5`.

---

## US9 — Mobile polish

Confirm `<UHeader>` slideover behaves on emulated iPhone 14 + Galaxy S20.
Add `active:scale-[0.98]` to primary `<UButton>` instances where useful.

Verify: `H6`.

---

## Final gate (before PR)

```bash
nuxi typecheck                                    # C16
pnpm build                                        # C17
pnpm preview                                      # H1, H2 (Lighthouse + visual)
du -sk .output/public/_nuxt                       # C20 (compare baseline)
git diff main -- '*.ts' '*.vue' | grep '^\+.*: any'   # C18 (must be empty)
```

Run all `C*` grep contracts from `contracts/requirements.md`. If green,
push and open the PR.
