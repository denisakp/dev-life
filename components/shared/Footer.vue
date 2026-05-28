<template>
  <footer
    class="flex items-center justify-center gap-3 bg-white dark:bg-neutral-950 py-2 md:py-3 px-4 border-t border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
  >
    <span class="text-sm text-center">
      © {{ new Date().getUTCFullYear() }} &lt; Denis AKPAGNONITE /&gt; | N1BBzerLZXT
    </span>
    <a
      href="/rss.xml"
      aria-label="RSS feed"
      class="inline-flex items-center text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
    >
      <UIcon name="i-lucide-rss" class="size-4" />
    </a>
  </footer>
</template>
