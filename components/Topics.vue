<script setup>
import loadTopic from "~/utils/load-topic";

const props = defineProps({
  topics: { type: Array, default: () => [] },
});

const items = computed(() =>
  (props.topics ?? [])
    .filter((t) => t?.path && loadTopic(t.path))
    .map((t) => ({ path: t.path, topic: loadTopic(t.path) }))
);
</script>

<template>
  <div class="flex flex-wrap gap-2 my-4">
    <ULink
      v-for="(item, index) in items"
      :key="index"
      :to="'/topics' + item.path"
      class="inline-flex"
    >
      <UBadge
        color="neutral"
        variant="subtle"
        size="lg"
        class="gap-2 hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors"
      >
        <nuxt-img
          class="h-4 w-4 shrink-0"
          :src="item.topic.iconPath"
          :alt="`${item.topic.title} logo`"
        />
        {{ item.topic.title }}
      </UBadge>
    </ULink>
  </div>
</template>
