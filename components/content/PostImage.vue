<script setup>
defineProps({
  source: { type: String, required: true },
  alt: { type: String, required: true },
  className: { type: String, default: "w-full object-contain" },
});

const imageRef = ref(null);
const { isLoaded, isInView, triggerFadeIn } = useImageFadeIn(imageRef);
</script>

<template>
  <nuxt-img
    ref="imageRef"
    :class="[
      className,
      'transition-opacity duration-300 ease-out',
      isLoaded ? 'opacity-100' : 'opacity-0',
    ]"
    :src="source"
    :alt="alt"
    loading="lazy"
    @load="triggerFadeIn"
  />
</template>
