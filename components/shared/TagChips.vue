<script setup lang="ts">
import { tagToSlug } from "~/utils/normalize-tag";

const props = defineProps<{ tags?: string[] | null }>();
const { locale } = useI18n();

const items = computed(() => {
  return (props.tags ?? [])
    .filter((t): t is string => typeof t === "string" && t.length > 0)
    .map((t) => ({ label: t, slug: tagToSlug(t) }))
    .filter((t) => t.slug.length > 0);
});

const prefix = computed(() => (locale.value === "fr" ? "/fr/tags/" : "/tags/"));
</script>

<template>
  <div v-if="items.length" class="flex flex-wrap gap-2">
    <ULink
      v-for="item in items"
      :key="item.slug"
      :to="prefix + item.slug"
      class="inline-flex"
    >
      <UBadge
        color="neutral"
        variant="outline"
        size="md"
        class="hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors"
      >
        {{ item.label }}
      </UBadge>
    </ULink>
  </div>
</template>
