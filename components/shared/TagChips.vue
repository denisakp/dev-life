<script setup lang="ts">
import { tagToSlug } from "~/utils/normalize-tag";

const props = defineProps<{
  tags?: string[] | null;
  excludeSlugs?: string[] | null;
}>();
const { locale } = useI18n();

const excluded = computed(() => {
  return new Set((props.excludeSlugs ?? []).map((s) => s.toLowerCase()));
});

const items = computed(() => {
  const seen = new Set<string>();
  return (props.tags ?? [])
    .filter((t): t is string => typeof t === "string" && t.length > 0)
    .map((t) => ({ label: t, slug: tagToSlug(t) }))
    .filter((t) => {
      if (t.slug.length === 0) return false;
      if (excluded.value.has(t.slug)) return false;
      if (seen.has(t.slug)) return false;
      seen.add(t.slug);
      return true;
    });
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
