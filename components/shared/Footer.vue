<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <footer
    class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 bg-white dark:bg-neutral-950 py-3 px-4 border-t border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
  >
    <span class="text-sm text-center">
      © {{ new Date().getUTCFullYear() }} &lt; Denis AKPAGNONITE /&gt; | N1BBzerLZXT
    </span>
    <nav class="flex items-center gap-3 text-sm" aria-label="Secondary">
      <NuxtLink to="/uses" class="hover:text-neutral-900 text-primary-600 dark:text-primary-400 dark:hover:text-neutral-100 transition-colors">
        {{ t('footer.uses') }}
      </NuxtLink>
      <NuxtLink to="/now" class="hover:text-neutral-900 text-primary-600 dark:text-primary-400 dark:hover:text-neutral-100 transition-colors">
        {{ t('footer.now') }}
      </NuxtLink>
      <a
        href="/rss.xml"
        :aria-label="t('footer.rss')"
        class="inline-flex items-center text-orange-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
      >
        <UIcon name="i-lucide-rss" class="size-4" />
      </a>
    </nav>
  </footer>
</template>
