<script setup>
defineProps({
  href: { type: String, required: true },
  text: { type: String, required: true },
});
</script>

<template>
  <ULink :to="href" external target="_blank" rel="noopener">
    {{ text }}
  </ULink>
</template>
