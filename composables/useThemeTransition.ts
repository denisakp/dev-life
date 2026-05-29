import { THEME_TRANSITION } from "~/utils/animation-config";

/**
 * Wraps Nuxt UI's bundled useColorMode() with an animated toggle.
 * Honors prefers-reduced-motion: instant swap when set.
 */
export function useThemeTransition() {
  const colorMode = useColorMode();
  const isAnimating = ref(false);

  const prefersReducedMotion = computed(() => {
    if (!import.meta.client) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const current = computed<"light" | "dark">(() =>
    colorMode.value === "dark" ? "dark" : "light"
  );

  async function toggle() {
    const next = current.value === "dark" ? "light" : "dark";
    if (prefersReducedMotion.value) {
      colorMode.preference = next;
      return;
    }
    isAnimating.value = true;
    colorMode.preference = next;
    await new Promise((r) =>
      setTimeout(r, THEME_TRANSITION.buttonDuration)
    );
    isAnimating.value = false;
  }

  return {
    current,
    isAnimating: readonly(isAnimating),
    prefersReducedMotion,
    toggle,
  };
}
