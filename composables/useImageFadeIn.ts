import { useIntersectionObserver } from "@vueuse/core";

/**
 * Fade-in image on visible + load. Opacity-only → zero CLS.
 * Honors prefers-reduced-motion: immediate visible.
 */
export function useImageFadeIn(imageRef: Ref<HTMLImageElement | null>) {
  const isLoaded = ref(false);
  const isInView = ref(false);

  const prefersReducedMotion =
    import.meta.client &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    isLoaded.value = true;
    isInView.value = true;
  }

  const { stop } = useIntersectionObserver(
    imageRef,
    ([entry]) => {
      if (entry?.isIntersecting) {
        isInView.value = true;
        stop();
      }
    },
    { threshold: 0 }
  );

  function triggerFadeIn() {
    isLoaded.value = true;
  }

  return {
    isLoaded: readonly(isLoaded),
    isInView: readonly(isInView),
    triggerFadeIn,
    stop,
  };
}
