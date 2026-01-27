# Phase 1 Design: Data Models & Animation Configuration

**Feature**: `001-nuxt4-ui-upgrade`  
**Date**: 2025-01-27  
**Purpose**: Define animation configuration data models and composable contracts

---

## Data Models

### 1. PageTransitionConfig

Defines timing and behavior for page-to-page navigation animations.

```typescript
export interface PageTransitionConfig {
  // Duration in milliseconds
  enterDuration: number;    // Time for new page to fade in (200ms)
  exitDuration: number;     // Time for old page to fade out (100ms)
  
  // Easing functions for natural feel
  enterEasing: string;      // CSS easing: 'ease-in-out', 'cubic-bezier(...)'
  exitEasing: string;
  
  // Accessibility
  respectReducedMotion: boolean;  // Instant if prefers-reduced-motion enabled
  
  // Animation type
  animationType: 'fade' | 'slide' | 'fade-slide';  // 'fade' by default
}

// Default configuration
export const DEFAULT_PAGE_TRANSITION: PageTransitionConfig = {
  enterDuration: 200,
  exitDuration: 100,
  enterEasing: 'ease-in-out',
  exitEasing: 'ease-in-out',
  respectReducedMotion: true,
  animationType: 'fade',
};
```

**Usage**: Determines how pages animate during navigation. Configured once, applied globally to all route changes.

---

### 2. ThemeTransitionConfig

Defines dark mode toggle animation behavior and timing.

```typescript
export interface ThemeTransitionConfig {
  // Color transition timing
  colorTransitionDuration: number;  // 250ms for color changes
  
  // Button animation timing
  buttonAnimationDuration: number;   // 150ms for toggle button
  
  // Button animation type
  buttonAnimationType: 'rotate' | 'scale' | 'fade' | 'combined';  // 'rotate' by default
  
  // Easing
  easing: string;  // 'ease-in-out' standard
  
  // Accessibility
  respectReducedMotion: boolean;  // Instant if prefers-reduced-motion enabled
  
  // Theme preference storage
  storageKey: string;  // localStorage key: 'nuxt-color-mode'
  useSystemPreference: boolean;  // Respect system dark/light preference
}

// Default configuration
export const DEFAULT_THEME_TRANSITION: ThemeTransitionConfig = {
  colorTransitionDuration: 250,
  buttonAnimationDuration: 150,
  buttonAnimationType: 'rotate',
  easing: 'ease-in-out',
  respectReducedMotion: true,
  storageKey: 'nuxt-color-mode',
  useSystemPreference: true,
};
```

**Usage**: Controls how color scheme changes are animated. Applied to Header.vue dark mode toggle and all theme-sensitive elements.

---

### 3. ImageFadeConfig

Defines lazy image loading and fade-in animation behavior.

```typescript
export interface ImageFadeConfig {
  // Fade-in timing
  fadeInDuration: number;  // 300ms fade-in duration
  
  // Easing for natural feel
  easing: string;  // 'ease-out' for images (starts fast, slows down)
  
  // Placeholder behavior
  showPlaceholder: boolean;  // Show blur placeholder while loading
  placeholderBlur: number;   // Blur intensity: 10 (pixels)
  
  // Lazy loading
  lazyLoadThreshold: string;  // Intersection Observer threshold: '0px'
  
  // Accessibility
  respectReducedMotion: boolean;  // Instant display if prefers-reduced-motion
}

// Default configuration
export const DEFAULT_IMAGE_FADE: ImageFadeConfig = {
  fadeInDuration: 300,
  easing: 'ease-out',
  showPlaceholder: true,
  placeholderBlur: 10,
  lazyLoadThreshold: '0px',
  respectReducedMotion: true,
};
```

**Usage**: Applied to all NuxtImg components in blog posts via PostImage.vue wrapper. Ensures consistent image loading experience.

---

### 4. AnimationState

Represents the current animation state for a page or element.

```typescript
export interface AnimationState {
  // Page animation state
  isTransitioning: boolean;  // True during page transition
  transitionType: 'enter' | 'exit' | 'idle';  // Current animation phase
  
  // Theme animation state
  themeTransitionActive: boolean;  // True during theme toggle
  currentTheme: 'light' | 'dark' | 'system';  // Current theme
  
  // Motion preference
  prefersReducedMotion: boolean;  // User's system preference
  respectMotionPreference: boolean;  // Whether to honor it
  
  // Image animation state
  imagesLoading: Map<string, boolean>;  // Track which images are loading
}

// Initial state
export const INITIAL_ANIMATION_STATE: AnimationState = {
  isTransitioning: false,
  transitionType: 'idle',
  themeTransitionActive: false,
  currentTheme: 'system',
  prefersReducedMotion: false,
  respectMotionPreference: true,
  imagesLoading: new Map(),
};
```

**Usage**: Provides reactive state for composables to determine current animation context. Used in templates for conditional rendering.

---

### 5. PerformanceTargets

Measurable performance goals for animations.

```typescript
export interface PerformanceTargets {
  // Timing targets
  pageTransitionMaxDuration: number;  // 300ms max
  imageLoadMaxDuration: number;  // 300ms max
  buttonAnimationMaxDuration: number;  // 150ms max
  
  // Visual targets
  targetFPS: number;  // 60 fps required
  maxCLS: number;  // Cumulative Layout Shift < 0.1
  maxLCP: number;  // Largest Contentful Paint < 2500ms
  minLighthouse: number;  // Lighthouse score >= 90
  
  // Testing environments
  testDevices: string[];  // ['iPhone 14', 'Galaxy S20', 'Desktop']
  networkProfiles: string[];  // ['Fast 4G', 'Slow 4G', 'Offline']
}

// Performance targets
export const PERFORMANCE_TARGETS: PerformanceTargets = {
  pageTransitionMaxDuration: 300,
  imageLoadMaxDuration: 300,
  buttonAnimationMaxDuration: 150,
  targetFPS: 60,
  maxCLS: 0.1,
  maxLCP: 2500,
  minLighthouse: 90,
  testDevices: ['iPhone 14', 'Galaxy S20', 'Desktop'],
  networkProfiles: ['Fast 4G', 'Slow 4G'],
};
```

**Usage**: Reference during performance testing and validation. All animations must meet these targets.

---

## Configuration File Structure

### `utils/animation-config.ts`

```typescript
// Export all configs and defaults
export * from './animation-config/page-transition';
export * from './animation-config/theme-transition';
export * from './animation-config/image-fade';
export * from './animation-config/animation-state';
export * from './animation-config/performance-targets';

// Merged configuration object
export interface AnimationConfigs {
  page: PageTransitionConfig;
  theme: ThemeTransitionConfig;
  image: ImageFadeConfig;
  state: AnimationState;
  performance: PerformanceTargets;
}

export const ANIMATION_CONFIGS: AnimationConfigs = {
  page: DEFAULT_PAGE_TRANSITION,
  theme: DEFAULT_THEME_TRANSITION,
  image: DEFAULT_IMAGE_FADE,
  state: INITIAL_ANIMATION_STATE,
  performance: PERFORMANCE_TARGETS,
};
```

---

## Composable Contracts

### `composables/usePageTransition.ts`

```typescript
export function usePageTransition() {
  // State
  const isTransitioning = ref(false);
  const transitionType = ref<'enter' | 'exit' | 'idle'>('idle');
  
  // Methods
  const enterTransition = async () => { ... };  // Start page enter animation
  const exitTransition = async () => { ... };   // Start page exit animation
  const resetTransition = () => { ... };         // Reset to idle
  
  // Computed
  const shouldShowAnimation = computed(() => {
    return !useMediaQuery('(prefers-reduced-motion: reduce)').value;
  });
  
  return {
    isTransitioning: readonly(isTransitioning),
    transitionType: readonly(transitionType),
    shouldShowAnimation,
    enterTransition,
    exitTransition,
    resetTransition,
  };
}

// Type signature
export interface UsePageTransition {
  isTransitioning: Readonly<Ref<boolean>>;
  transitionType: Readonly<Ref<'enter' | 'exit' | 'idle'>>;
  shouldShowAnimation: ComputedRef<boolean>;
  enterTransition(): Promise<void>;
  exitTransition(): Promise<void>;
  resetTransition(): void;
}
```

**Usage in `app.vue`**:
```vue
<template>
  <div class="app-container">
    <NuxtPage 
      :key="$route.path"
      :class="{ 'animate-fade-in': isTransitioning && transitionType === 'enter' }"
    />
  </div>
</template>

<script setup lang="ts">
const { isTransitioning, transitionType, enterTransition, shouldShowAnimation } = usePageTransition();
</script>
```

---

### `composables/useThemeTransition.ts`

```typescript
export function useThemeTransition() {
  // State
  const colorMode = useColorMode();
  const isTransitioning = ref(false);
  
  // Methods
  const toggleTheme = async () => {
    // Trigger color transition
    // Trigger button animation
    // Update localStorage via @nuxtjs/color-mode
  };
  
  const hasReducedMotionPreference = computed(() => {
    return useMediaQuery('(prefers-reduced-motion: reduce)').value;
  });
  
  return {
    currentTheme: computed(() => colorMode.value),
    isTransitioning: readonly(isTransitioning),
    hasReducedMotionPreference,
    toggleTheme,
  };
}

// Type signature
export interface UseThemeTransition {
  currentTheme: ComputedRef<string>;
  isTransitioning: Readonly<Ref<boolean>>;
  hasReducedMotionPreference: ComputedRef<boolean>;
  toggleTheme(): Promise<void>;
}
```

**Usage in `components/shared/Header.vue`**:
```vue
<template>
  <button 
    @click="toggleTheme"
    :class="{ 'animate-rotate': isTransitioning && !hasReducedMotionPreference }"
    aria-label="Toggle dark mode"
  >
    <Icon :icon="currentTheme === 'dark' ? 'sun' : 'moon'" />
  </button>
</template>

<script setup lang="ts">
const { currentTheme, isTransitioning, toggleTheme, hasReducedMotionPreference } = useThemeTransition();
</script>
```

---

### `composables/useImageFadeIn.ts`

```typescript
export function useImageFadeIn(imageRef: Ref<HTMLImageElement | null>) {
  // State
  const isLoaded = ref(false);
  const isInView = ref(false);
  
  // Methods
  const triggerFadeIn = () => {
    // Mark as loaded, apply fade-in CSS class
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
  
  return {
    isLoaded: readonly(isLoaded),
    isInView: readonly(isInView),
    triggerFadeIn,
    stopObserver,
  };
}

// Type signature
export interface UseImageFadeIn {
  isLoaded: Readonly<Ref<boolean>>;
  isInView: Readonly<Ref<boolean>>;
  triggerFadeIn(): void;
  stopObserver(): void;
}
```

**Usage in `components/content/PostImage.vue`**:
```vue
<template>
  <figure>
    <NuxtImg 
      ref="imageRef"
      :src="src"
      :alt="alt"
      :class="{ 'animate-fade-in': isLoaded }"
      @load="triggerFadeIn"
    />
    <figcaption v-if="alt">{{ alt }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
const props = defineProps<{ src: string; alt: string }>();
const imageRef = ref<HTMLImageElement | null>(null);
const { isLoaded, triggerFadeIn } = useImageFadeIn(imageRef);
</script>
```

---

## CSS Animation Classes (Tailwind)

To be added to `tailwind.config.js` or global CSS:

```css
/* Page transitions */
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

/* Theme transition */
@keyframes rotateCw {
  from { transform: rotate(0deg); }
  to { transform: rotate(90deg); }
}

.animate-rotate {
  animation: rotateCw 0.15s ease-in-out forwards;
}

/* Image fade-in */
.animate-image-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

/* Reduced motion respect */
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
```

---

## Summary

| Data Model | Purpose | Used By | Default Timing |
|------------|---------|---------|-----------------|
| PageTransitionConfig | Page navigation animations | app.vue, router | 300ms total (200ms enter, 100ms exit) |
| ThemeTransitionConfig | Dark mode toggle animations | Header.vue | 250ms colors, 150ms button |
| ImageFadeConfig | Lazy image fade-in | PostImage.vue | 300ms fade-in |
| AnimationState | Current animation state | All composables | Reactive state |
| PerformanceTargets | Validation metrics | Testing/CI | 60 fps, CLS <0.1, LCP <2.5s |

All configurations follow Constitution Principle II (Performance & Accessibility) by:
- ✅ Respecting `prefers-reduced-motion`
- ✅ Using GPU-accelerated properties only (transform, opacity)
- ✅ Keeping animations under 300ms
- ✅ Targeting 60 fps constant
- ✅ Supporting accessibility first

