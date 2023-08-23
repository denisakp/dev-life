<script setup>
defineProps({
  source: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  }
})
</script>

<template>
  <nuxt-img class="w-full object-contain" :src="source" :alt="alt"/>
</template>
