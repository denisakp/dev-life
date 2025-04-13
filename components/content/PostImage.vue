<script setup>
defineProps({
  source: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: 'w-full object-contain'
  }
})
</script>

<template>
  <nuxt-img :class="className" :src="source" :alt="alt"/>
</template>
