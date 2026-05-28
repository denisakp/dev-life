<script setup lang="ts">
interface TocLink {
  id: string;
  text: string;
  depth: number;
  children?: TocLink[];
}

const props = defineProps<{ links: TocLink[] }>();

function flatten(items: TocLink[]): TocLink[] {
  return items.flatMap((item) => [
    item,
    ...(item.children?.length ? flatten(item.children) : []),
  ]);
}

const flat = computed(() => flatten(props.links ?? []));
</script>

<template>
  <details
    v-if="flat.length >= 2"
    class="mobile-toc lg:hidden mb-8 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
  >
    <summary
      class="cursor-pointer px-4 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-200 select-none"
    >
      Contents
    </summary>
    <nav class="px-4 pb-4" aria-label="Table of contents (mobile)">
      <ul class="space-y-1 text-sm border-l border-neutral-200 dark:border-neutral-800">
        <li v-for="link in flat" :key="link.id">
          <a
            :href="`#${link.id}`"
            class="block py-1 -ml-px border-l-2 border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            :style="{ paddingLeft: `${(link.depth - 1) * 12 + 12}px` }"
          >
            {{ link.text }}
          </a>
        </li>
      </ul>
    </nav>
  </details>
</template>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .mobile-toc[open] summary {
    margin-bottom: 0.25rem;
  }
}
</style>
