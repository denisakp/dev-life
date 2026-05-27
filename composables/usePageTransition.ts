/**
 * Reactive surface around Nuxt's app.pageTransition.
 * Templates that need to gate UI on the in-flight transition can read these.
 */
export function usePageTransition() {
  const isTransitioning = ref(false);
  const phase = ref<"enter" | "leave" | "idle">("idle");

  const prefersReducedMotion = computed(() => {
    if (!import.meta.client) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  if (import.meta.client) {
    const router = useRouter();
    router.beforeEach((_to, _from, next) => {
      phase.value = "leave";
      isTransitioning.value = true;
      next();
    });
    router.afterEach(() => {
      phase.value = "enter";
      const ms = prefersReducedMotion.value ? 0 : 300;
      setTimeout(() => {
        phase.value = "idle";
        isTransitioning.value = false;
      }, ms);
    });
  }

  return {
    isTransitioning: readonly(isTransitioning),
    phase: readonly(phase),
    prefersReducedMotion,
  };
}
