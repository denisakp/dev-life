<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <a
    href="#main"
    class="skip-to-content sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
  >
    {{ t('a11y.skipToContent') }}
  </a>
</template>
