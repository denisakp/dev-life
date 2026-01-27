# Phase 1 Quickstart: Implementation Guide

**Feature**: `001-nuxt4-ui-upgrade`  
**Date**: 2025-01-27  
**Purpose**: Quick reference for implementing each animation feature

---

## Before You Start

**Prerequisites**:
- ✅ Nuxt 4 migration complete (see Phase 0 research)
- ✅ All dependencies updated and verified
- ✅ `pnpm dev` and `pnpm build` running without errors
- ✅ `nuxi typecheck` passing

**Check**:
```bash
pnpm dev              # Should start without errors
nuxi typecheck        # Should report zero errors
pnpm build           # Should complete without critical warnings
```

---

## Quick Setup Steps

### 1. Create Animation Configuration

Create `utils/animation-config.ts`:

```typescript
// Page transition timing
export const PAGE_TRANSITION = {
  enterDuration: 200,
  exitDuration: 100,
  easing: 'ease-in-out',
} as const;

// Theme transition timing
export const THEME_TRANSITION = {
  colorDuration: 250,
  buttonDuration: 150,
  easing: 'ease-in-out',
} as const;

// Image fade-in timing
export const IMAGE_TRANSITION = {
  duration: 300,
  easing: 'ease-out',
} as const;

// CSS animation utilities
export const ANIMATION_CSS = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  @keyframes rotateCw {
    from { transform: rotate(0deg); }
    to { transform: rotate(90deg); }
  }
  
  .animate-fade-in {
    animation: fadeIn ${PAGE_TRANSITION.enterDuration}ms ${PAGE_TRANSITION.easing} forwards;
  }
  
  .animate-fade-out {
    animation: fadeOut ${PAGE_TRANSITION.exitDuration}ms ${PAGE_TRANSITION.easing} forwards;
  }
  
  .animate-rotate {
    animation: rotateCw ${THEME_TRANSITION.buttonDuration}ms ${THEME_TRANSITION.easing} forwards;
  }
  
  .animate-image-fade-in {
    animation: fadeIn ${IMAGE_TRANSITION.duration}ms ${IMAGE_TRANSITION.easing} forwards;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in,
    .animate-fade-out,
    .animate-rotate,
    .animate-image-fade-in {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;
```

**Test**:
```bash
# Verify TypeScript compiles
nuxi typecheck

# Check file is readable
cat utils/animation-config.ts
```

---

### 2. Create usePageTransition Composable

Create `composables/usePageTransition.ts`:

```typescript
import { ref, computed, readonly, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useMediaQuery } from '@vueuse/core';
import { PAGE_TRANSITION } from '~/utils/animation-config';

export function usePageTransition() {
  const isTransitioning = ref(false);
  const transitionType = ref<'enter' | 'exit' | 'idle'>('idle');
  const route = useRoute();
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  const shouldShowAnimation = computed(() => {
    return !prefersReducedMotion.value;
  });
  
  // Page exit animation
  const exitTransition = async () => {
    if (!shouldShowAnimation.value) {
      isTransitioning.value = false;
      return;
    }
    
    isTransitioning.value = true;
    transitionType.value = 'exit';
    
    // Wait for fade-out animation
    await new Promise(resolve => 
      setTimeout(resolve, PAGE_TRANSITION.exitDuration)
    );
    
    transitionType.value = 'idle';
    isTransitioning.value = false;
  };
  
  // Page enter animation
  const enterTransition = async () => {
    if (!shouldShowAnimation.value) {
      isTransitioning.value = false;
      return;
    }
    
    isTransitioning.value = true;
    transitionType.value = 'enter';
    
    // Wait for fade-in animation
    await new Promise(resolve => 
      setTimeout(resolve, PAGE_TRANSITION.enterDuration)
    );
    
    transitionType.value = 'idle';
    isTransitioning.value = false;
  };
  
  const resetTransition = () => {
    isTransitioning.value = false;
    transitionType.value = 'idle';
  };
  
  // Auto-trigger on route change (optional, can be done in app.vue instead)
  const lastRoute = ref(route.path);
  watch(() => route.path, async (newPath) => {
    if (newPath !== lastRoute.value) {
      await exitTransition();
      await enterTransition();
      lastRoute.value = newPath;
    }
  });
  
  return {
    isTransitioning: readonly(isTransitioning),
    transitionType: readonly(transitionType),
    shouldShowAnimation,
    exitTransition,
    enterTransition,
    resetTransition,
  };
}
```

**Test**:
```bash
# Verify composable exports correctly
grep -n "export function usePageTransition" composables/usePageTransition.ts

# Type check
nuxi typecheck
```

---

### 3. Update app.vue with Page Transitions

Edit `app.vue`:

```vue
<template>
  <div class="app-wrapper">
    <Header />
    
    <!-- Page transition wrapper -->
    <Transition name="page-fade" mode="out-in">
      <NuxtPage
        :key="$route.path"
        :class="{ 
          'animate-fade-out': isTransitioning && transitionType === 'exit',
          'animate-fade-in': isTransitioning && transitionType === 'enter'
        }"
      />
    </Transition>
    
    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import { usePageTransition } from '~/composables/usePageTransition';

const { isTransitioning, transitionType } = usePageTransition();
</script>

<style scoped>
.app-wrapper {
  position: relative;
}

/* CSS animations from utils/animation-config.ts */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-in-out forwards;
}

.animate-fade-out {
  animation: fadeOut 0.1s ease-in-out forwards;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .animate-fade-out {
    animation: none !important;
    opacity: 1 !important;
  }
}
</style>
```

**Test**:
```bash
pnpm dev

# Navigate between pages and observe fade transitions
# Check DevTools > Performance > Rendering to verify 60 fps
```

---

### 4. Create useThemeTransition Composable

Create `composables/useThemeTransition.ts`:

```typescript
import { ref, computed, readonly } from 'vue';
import { useColorMode } from '@nuxtjs/color-mode';
import { useMediaQuery } from '@vueuse/core';
import { THEME_TRANSITION } from '~/utils/animation-config';

export function useThemeTransition() {
  const colorMode = useColorMode();
  const isTransitioning = ref(false);
  
  const currentTheme = computed(() => colorMode.value);
  
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  const hasReducedMotionPreference = computed(() => {
    return prefersReducedMotion.value;
  });
  
  const toggleTheme = async () => {
    if (!hasReducedMotionPreference.value) {
      isTransitioning.value = true;
    }
    
    // Toggle theme (stored in localStorage by @nuxtjs/color-mode)
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
    
    // Wait for color transition
    if (!hasReducedMotionPreference.value) {
      await new Promise(resolve => 
        setTimeout(resolve, THEME_TRANSITION.colorDuration)
      );
      isTransitioning.value = false;
    }
  };
  
  return {
    currentTheme,
    isTransitioning: readonly(isTransitioning),
    hasReducedMotionPreference,
    toggleTheme,
  };
}
```

**Test**:
```bash
nuxi typecheck
```

---

### 5. Update Header.vue with Dark Mode Animation

Edit `components/shared/Header.vue` (update the dark mode toggle button):

```vue
<template>
  <header class="header">
    <!-- Existing header content -->
    <nav class="nav-items">
      <!-- ... -->
      
      <!-- Dark mode toggle button -->
      <button
        @click="toggleTheme"
        :class="{ 
          'animate-rotate': isTransitioning && !hasReducedMotionPreference 
        }"
        :aria-label="`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`"
        class="theme-toggle"
      >
        <Icon 
          :icon="currentTheme === 'dark' ? 'sun' : 'moon'"
        />
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useThemeTransition } from '~/composables/useThemeTransition';

const { 
  currentTheme, 
  isTransitioning, 
  hasReducedMotionPreference, 
  toggleTheme 
} = useThemeTransition();
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: color 0.25s ease-in-out;
}

.theme-toggle:hover {
  opacity: 0.8;
}

@keyframes rotateCw {
  from { transform: rotate(0deg); }
  to { transform: rotate(90deg); }
}

.animate-rotate {
  animation: rotateCw 0.15s ease-in-out forwards;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .theme-toggle {
    transition: none;
  }
  
  .animate-rotate {
    animation: none !important;
  }
}
</style>
```

**Test**:
```bash
pnpm dev

# Click dark mode toggle and observe smooth color transition
# Toggle DevTools > Rendering > Emulate CSS media feature prefers-reduced-motion to test accessibility
```

---

### 6. Create useImageFadeIn Composable

Create `composables/useImageFadeIn.ts`:

```typescript
import { ref, readonly, onUnmounted } from 'vue';
import { useIntersectionObserver, useMediaQuery } from '@vueuse/core';
import type { Ref } from 'vue';
import { IMAGE_TRANSITION } from '~/utils/animation-config';

export function useImageFadeIn(imageRef: Ref<HTMLImageElement | null>) {
  const isLoaded = ref(false);
  const isInView = ref(false);
  
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  const triggerFadeIn = () => {
    isLoaded.value = true;
  };
  
  // Intersection Observer for lazy loading
  const { stop: stopObserver } = useIntersectionObserver(
    imageRef,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        isInView.value = true;
      }
    },
    { threshold: 0 }
  );
  
  onUnmounted(() => {
    stopObserver();
  });
  
  return {
    isLoaded: readonly(isLoaded),
    isInView: readonly(isInView),
    triggerFadeIn,
    stopObserver,
  };
}
```

**Test**:
```bash
nuxi typecheck
```

---

### 7. Update PostImage.vue with Fade-in Animation

Edit `components/content/PostImage.vue`:

```vue
<template>
  <figure class="post-image-container">
    <NuxtImg
      ref="imageRef"
      :src="src"
      :alt="alt"
      :placeholder="placeholder || src"
      :class="{ 
        'animate-image-fade-in': isLoaded && !prefersReducedMotion,
        'opacity-0': !isLoaded
      }"
      @load="triggerFadeIn"
      loading="lazy"
      sizes="sm:100vw md:50vw lg:600px"
      class="post-image"
    />
    <figcaption v-if="alt" class="post-image-caption">
      {{ alt }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { useImageFadeIn } from '~/composables/useImageFadeIn';

interface Props {
  src: string;
  alt?: string;
  placeholder?: string;
}

const props = defineProps<Props>();

const imageRef = ref<HTMLImageElement | null>(null);
const { isLoaded, triggerFadeIn } = useImageFadeIn(imageRef);

const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
</script>

<style scoped>
.post-image-container {
  margin: 2rem 0;
}

.post-image {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  transition: opacity 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-image-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

.opacity-0 {
  opacity: 0;
}

.post-image-caption {
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-gray-600);
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .post-image {
    transition: none;
  }
  
  .animate-image-fade-in {
    animation: none !important;
    opacity: 1 !important;
  }
}
</style>
```

**Test**:
```bash
pnpm dev

# Open a blog post with images
# Clear cache (DevTools > Network > Disable cache) and reload
# Observe images fade in as they load
```

---

## Validation Checklist

After implementing all animations:

### Page Transitions
- [ ] Navigate between pages (home → blog → projects)
- [ ] Observe 300ms fade transition (200ms fade-in, 100ms fade-out)
- [ ] Check DevTools Performance: 60 fps (no drops below 55 fps)
- [ ] Check DevTools: Cumulative Layout Shift < 0.1
- [ ] Test with `prefers-reduced-motion: reduce` — pages load instantly (no animation)

### Dark Mode Toggle
- [ ] Click dark mode toggle button
- [ ] Observe 150ms button rotation animation
- [ ] Observe 250ms color transition (smooth fade to dark/light)
- [ ] Reload page — theme preference persists (check localStorage)
- [ ] Test with reduced motion — colors change instantly, no rotation

### Image Loading
- [ ] Open blog post with multiple images
- [ ] Clear cache (DevTools > Network > Disable cache)
- [ ] Reload page with slow network (DevTools > Network > Slow 4G)
- [ ] Observe low-res blur placeholder appears immediately
- [ ] Observe each image fades in over 300ms as it loads
- [ ] Check Cumulative Layout Shift < 0.1 (no layout shifts)

### Performance Metrics
- [ ] Run Lighthouse: Desktop score ≥ 90
- [ ] Check Core Web Vitals:
  - [ ] LCP < 2.5s
  - [ ] CLS < 0.1
  - [ ] FID < 100ms (or INP < 200ms for new metric)
- [ ] Run `pnpm build` without errors or critical warnings
- [ ] Run `nuxi typecheck` — zero errors

### Accessibility
- [ ] Test with axe DevTools (should find no violations related to animations)
- [ ] Keyboard navigate all buttons (dark mode toggle, navigation)
- [ ] Screen reader test (aria-labels on toggle button)
- [ ] Test on mobile emulation (iPhone 14, Galaxy S20)

---

## Troubleshooting

### Page Transitions Not Showing

**Check**:
1. Is `isTransitioning` state being set? Add `console.log()` in composable
2. Is CSS class being applied? Check DevTools Elements tab for `.animate-fade-in` class
3. Are animations disabled in DevTools? Check Settings > Preferences > "Disable animations"
4. Does user have `prefers-reduced-motion: reduce`? Test in DevTools > Rendering > Emulate CSS media feature

**Fix**:
```typescript
// In usePageTransition.ts, add logging
const enterTransition = async () => {
  console.log('Enter transition started');
  // ...
  console.log('Enter transition complete');
};
```

### Dark Mode Not Persisting

**Check**:
1. Is localStorage accessible? Check DevTools > Application > Local Storage
2. Is @nuxtjs/color-mode initialized? Check nuxt.config.ts integration
3. Is toggleTheme() being called? Add `console.log()` in composable

**Fix**:
```typescript
// Verify localStorage key
const stored = localStorage.getItem('nuxt-color-mode');
console.log('Stored theme:', stored);
```

### Image Fade-in Not Triggering

**Check**:
1. Is image `@load` event firing? Add `console.log()` to `triggerFadeIn()`
2. Is CSS animation applied? Check DevTools Elements for `.animate-image-fade-in` class
3. Is image lazy-loaded? Check DevTools Network tab for image request timing

**Fix**:
```typescript
const triggerFadeIn = () => {
  console.log('Image loaded, triggering fade-in');
  isLoaded.value = true;
};
```

### Animation Janking (FPS Dropping Below 60)

**Check DevTools Performance**:
1. Open DevTools > Performance
2. Start recording
3. Navigate page or toggle theme
4. Stop recording
5. Look at FPS graph — should stay above 55 fps

**Common Causes**:
- Using `width`, `height`, `left`, `right` in animations (causes layout reflow)
- Too many elements animating simultaneously
- JavaScript blocking main thread

**Fix**:
- Use `transform` and `opacity` only (GPU-accelerated)
- Simplify animations (remove unnecessary properties)
- Check for JS blocking (no long-running scripts during animation)

---

## Performance Targets (Must Meet Before Merge)

| Metric | Target | How to Verify |
|--------|--------|---------------|
| Page transition duration | <300ms | DevTools Performance > Timeline |
| Animation FPS | 60 fps constant | DevTools Performance > Rendering |
| Cumulative Layout Shift | <0.1 | Lighthouse / DevTools > Rendering |
| Lighthouse score | ≥90 desktop | Run Lighthouse audit |
| LCP (Largest Contentful Paint) | <2.5s | Lighthouse metrics |
| TypeScript type checking | 0 errors | `nuxi typecheck` |
| Build | Success | `pnpm build` |

