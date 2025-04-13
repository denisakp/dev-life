<script setup>
defineProps({
  href: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});
</script>

<template>
  <a :href="href" target="_blank">{{ text }}</a>
</template>
