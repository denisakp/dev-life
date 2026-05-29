<script setup lang="ts">
const props = defineProps<{ topics?: string[] | null }>();
const { t, te, locale } = useI18n();

const items = computed(() =>
  (props.topics ?? [])
    .filter((s): s is string => typeof s === "string" && s.length > 0)
    // Only show topics that have a registered i18n label (i.e., known topics).
    // Unknown topic slugs (e.g. "docker", "mongodb") would otherwise render
    // as lowercase slugs and link to a 404 /topics/<slug> page.
    .filter((slug) => te(`topics.${slug}.label`))
    .map((slug) => ({
      slug,
      label: t(`topics.${slug}.label`),
    }))
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
