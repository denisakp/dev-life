/**
 * Animation Configuration
 * 
 * Central configuration for all animations in the application.
 * Timing values are in milliseconds.
 * All animations respect user's prefers-reduced-motion preference.
 */

// ============================================================================
// PAGE TRANSITION CONFIGURATION
// ============================================================================

export const PAGE_TRANSITION = {
  enterDuration: 200,      // Time for new page to fade in
  exitDuration: 100,       // Time for old page to fade out
  totalDuration: 300,      // Total transition time (exit + enter)
  easing: 'ease-in-out',   // CSS easing function
  animationType: 'fade',   // Type: 'fade', 'slide', or 'fade-slide'
} as const;

// ============================================================================
// THEME TRANSITION CONFIGURATION (Dark Mode)
// ============================================================================

export const THEME_TRANSITION = {
  colorDuration: 250,      // Time for color variables to transition
  buttonDuration: 150,     // Time for toggle button animation
  buttonRotation: 90,      // Degrees to rotate button (90 degrees)
  easing: 'ease-in-out',   // CSS easing function
  buttonAnimation: 'rotate', // Type: 'rotate', 'scale', or 'fade'
  storageKey: 'nuxt-color-mode', // localStorage key for persistence
} as const;

// ============================================================================
// IMAGE FADE-IN CONFIGURATION
// ============================================================================

export const IMAGE_TRANSITION = {
  duration: 300,           // Time for image to fade in
  easing: 'ease-out',      // CSS easing: ease-out for snappy feel
  blurIntensity: 10,       // Blur pixels for placeholder
  lazyLoadThreshold: '0px', // Intersection Observer threshold
} as const;

// ============================================================================
// PERFORMANCE TARGETS
// ============================================================================

export const PERFORMANCE_TARGETS = {
  pageTransitionMaxDuration: 300,    // Max time for page transition (ms)
  imageLoadMaxDuration: 300,         // Max time for image fade-in (ms)
  buttonAnimationMaxDuration: 150,   // Max time for button animation (ms)
  
  targetFPS: 60,                     // Required animation frame rate
  maxCLS: 0.1,                       // Cumulative Layout Shift threshold
  maxLCP: 2500,                      // Largest Contentful Paint (ms)
  minLighthouse: 90,                 // Minimum Lighthouse score
} as const;

// ============================================================================
// CSS ANIMATION CLASSES
// 
// These are applied dynamically and respect prefers-reduced-motion
// ============================================================================

export const ANIMATION_CLASSES = {
  pageEnter: 'animate-fade-in',
  pageExit: 'animate-fade-out',
  buttonRotate: 'animate-rotate',
  themeColor: 'animate-theme-colors',
  imageFadeIn: 'animate-image-fade-in',
} as const;

// ============================================================================
// EXPORTED TYPES for TypeScript
// ============================================================================

export type AnimationType = 'fade' | 'slide' | 'fade-slide';
export type ButtonAnimationType = 'rotate' | 'scale' | 'fade';
export type AnimationClass = typeof ANIMATION_CLASSES[keyof typeof ANIMATION_CLASSES];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if user prefers reduced motion
 * @returns true if user has prefers-reduced-motion enabled
 */
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get effective animation duration (0ms if reduced motion preferred)
 * @param duration - Base duration in milliseconds
 * @returns Duration or 0 if reduced motion is preferred
 */
export function getEffectiveDuration(duration: number): number {
  return shouldReduceMotion() ? 0 : duration;
}

/**
 * Create a delay promise for animation timing
 * @param duration - Duration in milliseconds
 * @returns Promise that resolves after duration
 */
export function delay(duration: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, duration));
}
