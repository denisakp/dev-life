<script setup lang="ts">
const props = defineProps<{ topics?: string[] | null }>();
const { t, te, locale } = useI18n();

const items = computed(() =>
  (props.topics ?? [])
    .filter((s): s is string => typeof s === "string" && s.length > 0)
    .map((slug) => {
      const key = `topics.${slug}.label`;
      const label = te(key) ? t(key) : slug;
      return { slug, label };
    })
);
</script>

<template>
  <div v-if="items.length" class="flex flex-wrap gap-2">
    <ULink
      v-for="item in items"
      :key="item.slug"
      :to="`/topics/${item.slug}`"
      class="inline-flex"
    >
      <UBadge
        color="neutral"
        variant="subtle"
        size="md"
        class="hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors"
      >
        {{ item.label }}
      </UBadge>
    </ULink>
  </div>
</template>
