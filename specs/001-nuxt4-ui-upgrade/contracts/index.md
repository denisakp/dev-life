# usePageTransition Composable Contract

**File**: `composables/usePageTransition.ts`  
**Purpose**: Manages page-to-page transition animations  
**Used By**: `app.vue` (root layout wrapper)

## API Signature

```typescript
export function usePageTransition(): UsePageTransition;

export interface UsePageTransition {
  // State (read-only)
  isTransitioning: Readonly<Ref<boolean>>;
  transitionType: Readonly<Ref<'enter' | 'exit' | 'idle'>>;
  
  // Computed properties
  shouldShowAnimation: ComputedRef<boolean>;
  
  // Methods
  enterTransition(): Promise<void>;
  exitTransition(): Promise<void>;
  resetTransition(): void;
}
```

## Behavior

### State Variables

- **isTransitioning** (boolean): `true` during active transition, `false` when idle
- **transitionType** ('enter' | 'exit' | 'idle'): Current animation phase
  - `'idle'`: No transition in progress
  - `'exit'`: Old page fading out
  - `'enter'`: New page fading in
- **shouldShowAnimation** (computed): `false` if user has `prefers-reduced-motion` enabled, `true` otherwise

### Methods

#### `enterTransition(): Promise<void>`

Called when navigating to a new page (NuxtPage mounted).

**Behavior**:
1. Set `isTransitioning = true`
2. Set `transitionType = 'enter'`
3. Apply CSS class for fade-in animation (200ms)
4. Wait for animation to complete
5. Set `transitionType = 'idle'`
6. Set `isTransitioning = false`
7. Resolve promise

**Duration**: 200ms (respects `prefers-reduced-motion` → instant)

**Accessibility**: Skips animation if `prefers-reduced-motion: reduce` detected

#### `exitTransition(): Promise<void>`

Called when leaving current page (NuxtPage destroyed).

**Behavior**:
1. Set `isTransitioning = true`
2. Set `transitionType = 'exit'`
3. Apply CSS class for fade-out animation (100ms)
4. Wait for animation to complete
5. Set `transitionType = 'idle'`
6. Set `isTransitioning = false`
7. Resolve promise

**Duration**: 100ms (respects `prefers-reduced-motion` → instant)

#### `resetTransition(): void`

Synchronously resets animation state to idle (no animation).

**Use Case**: Route changed too quickly, or error occurred during transition.

---

## Implementation Details

### Rendered as CSS Classes

```vue
<!-- In app.vue -->
<Transition
  name="page-fade"
  mode="out-in"
>
  <NuxtPage
    :key="$route.path"
    :class="{ 
      'animate-fade-in': isTransitioning && transitionType === 'enter',
      'animate-fade-out': isTransitioning && transitionType === 'exit'
    }"
  />
</Transition>
```

### CSS Classes Provided

- **`.animate-fade-in`**: Fade in over 200ms (opacity 0→1)
- **`.animate-fade-out`**: Fade out over 100ms (opacity 1→0)

### Lifecycle Integration

```typescript
// Auto-trigger on route change
const route = useRoute();

watch(() => route.path, async () => {
  await exitTransition();
  // Route change happens here (NuxtRouter handles)
  await enterTransition();
});
```

---

# useThemeTransition Composable Contract

**File**: `composables/useThemeTransition.ts`  
**Purpose**: Manages dark mode toggle animations  
**Used By**: `components/shared/Header.vue` (dark mode toggle button)

## API Signature

```typescript
export function useThemeTransition(): UseThemeTransition;

export interface UseThemeTransition {
  // State (read-only)
  currentTheme: ComputedRef<'light' | 'dark' | 'system'>;
  isTransitioning: Readonly<Ref<boolean>>;
  
  // Computed properties
  hasReducedMotionPreference: ComputedRef<boolean>;
  
  // Methods
  toggleTheme(): Promise<void>;
}
```

## Behavior

### State Variables

- **currentTheme** (computed): Current theme value from `useColorMode().value`
  - Values: 'light', 'dark', 'system'
  - Persisted via @nuxtjs/color-mode localStorage
- **isTransitioning** (boolean): `true` during theme toggle animation, `false` otherwise
- **hasReducedMotionPreference** (computed): `true` if user has `prefers-reduced-motion: reduce`

### Methods

#### `toggleTheme(): Promise<void>`

Toggles between light and dark modes with animation.

**Behavior**:
1. Set `isTransitioning = true`
2. If `hasReducedMotionPreference` is false:
   - Apply color transition CSS classes (250ms fade on colors)
   - Apply button animation CSS class (150ms rotate on button)
3. Call `useColorMode().preference = newTheme` (updates localStorage)
4. Wait for longest animation to complete (250ms colors)
5. Set `isTransitioning = false`
6. Resolve promise

**Duration**: 250ms for colors, 150ms for button (respects `prefers-reduced-motion` → instant)

**Side Effects**:
- Updates localStorage via @nuxtjs/color-mode
- Applies `:root` CSS variables for color scheme
- Updates all theme-aware components reactively

**Accessibility**: Instant if user has `prefers-reduced-motion: reduce`

---

## Implementation Details

### Rendered as CSS Classes

```vue
<!-- In components/shared/Header.vue -->
<button
  @click="toggleTheme"
  :class="{ 
    'animate-theme-colors': isTransitioning,
    'animate-button-rotate': isTransitioning && !hasReducedMotionPreference
  }"
  aria-label="Toggle dark mode"
>
  <Icon :icon="currentTheme === 'dark' ? 'sun' : 'moon'" />
</button>
```

### CSS Classes Provided

- **`.animate-theme-colors`**: Fade theme colors over 250ms
  - Applies to `:root` CSS variables (--bg-color, --text-color, etc.)
- **`.animate-button-rotate`**: Rotate toggle button 90° over 150ms

### Integration with @nuxtjs/color-mode

```typescript
const colorMode = useColorMode();  // Injected by @nuxtjs/color-mode

// Reading current theme
const currentTheme = computed(() => colorMode.value);

// Writing/persisting theme
const toggleTheme = async () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  // Storage handled automatically by @nuxtjs/color-mode
};
```

---

# useImageFadeIn Composable Contract

**File**: `composables/useImageFadeIn.ts`  
**Purpose**: Manages lazy image loading and fade-in animations  
**Used By**: `components/content/PostImage.vue` (blog post images)

## API Signature

```typescript
export function useImageFadeIn(imageRef: Ref<HTMLImageElement | null>): UseImageFadeIn;

export interface UseImageFadeIn {
  // State (read-only)
  isLoaded: Readonly<Ref<boolean>>;
  isInView: Readonly<Ref<boolean>>;
  
  // Methods
  triggerFadeIn(): void;
  stopObserver(): void;
}
```

## Behavior

### State Variables

- **isLoaded** (boolean): `true` when image has finished loading, `false` initially
- **isInView** (boolean): `true` when image element is visible in viewport, `false` otherwise

### Methods

#### `triggerFadeIn(): void`

Called when image `@load` event fires. Marks image as loaded and applies fade-in animation.

**Behavior**:
1. Set `isLoaded = true`
2. Apply fade-in CSS class to image element (300ms fade)
3. Optional: Log performance metric (image load time)

**Duration**: 300ms (respects `prefers-reduced-motion` → instant)

#### `stopObserver(): void`

Stops Intersection Observer and cleans up resources.

**Called**: On component unmount to prevent memory leaks.

---

## Implementation Details

### Lazy Loading with Intersection Observer

```typescript
const { stop: stopObserver } = useIntersectionObserver(
  imageRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isInView.value = true;
      // Trigger image load on @load event
    }
  },
  { threshold: 0 }  // Fire when any part enters viewport
);
```

### Rendered as CSS Classes

```vue
<!-- In components/content/PostImage.vue -->
<NuxtImg
  ref="imageRef"
  :src="src"
  :alt="alt"
  :placeholder="src"  <!-- Low-res blur placeholder -->
  :class="{ 
    'animate-image-fade-in': isLoaded && !prefersReducedMotion,
    'opacity-0': !isLoaded  <!-- Hidden until loaded -->
  }"
  @load="triggerFadeIn"
  @error="handleError"
  loading="lazy"
  sizes="sm:100vw md:50vw lg:400px"
/>
```

### CSS Classes Provided

- **`.animate-image-fade-in`**: Fade in over 300ms (opacity 0→1)
- **`.opacity-0`**: Start hidden, prevents FOUC

### No Layout Shift Guarantee

- Image dimensions specified via `sizes` attribute (Nuxt Image calculates width)
- Placeholder maintains aspect ratio
- No layout shift during load (CLS < 0.1)

---

## Integration Patterns

### Pattern 1: Page Transition Hook (app.vue)

```typescript
const router = useRouter();
const { enterTransition, exitTransition } = usePageTransition();

router.beforeEach(async () => {
  await exitTransition();
});

router.afterEach(async () => {
  await enterTransition();
});
```

### Pattern 2: Theme Toggle (Header.vue)

```typescript
const { currentTheme, toggleTheme } = useThemeTransition();

const handleThemeClick = async () => {
  await toggleTheme();
  // Theme persists automatically
};
```

### Pattern 3: Image in Content (PostImage.vue)

```typescript
const imageRef = ref<HTMLImageElement | null>(null);
const { isLoaded, triggerFadeIn, stopObserver } = useImageFadeIn(imageRef);

onMounted(() => {
  // Observer starts automatically
});

onUnmounted(() => {
  stopObserver();  // Clean up on destroy
});
```

---

## Error Handling

### Page Transitions

**If animation fails/cancels**: Call `resetTransition()` to reset state immediately.

### Theme Toggle

**If theme doesn't persist**: Check localStorage and @nuxtjs/color-mode initialization.

### Image Loading

**If image fails to load**: `isLoaded` stays `false`, image doesn't fade in. Fallback: display alt text.

---

## Performance Expectations

| Operation | Expected Duration | Target FPS |
|-----------|------------------|-----------|
| Page fade-out | 100ms | 60 fps |
| Page fade-in | 200ms | 60 fps |
| Theme colors | 250ms | 60 fps |
| Button rotate | 150ms | 60 fps |
| Image fade-in | 300ms | 60 fps |

All use GPU-accelerated properties (`transform`, `opacity`) only.

