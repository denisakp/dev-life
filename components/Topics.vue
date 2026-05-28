<script setup>
import loadTopic from "~/utils/load-topic";

const props = defineProps({
  topics: { type: Array, default: () => [] },
});

const { t, te } = useI18n();

const items = computed(() =>
  (props.topics ?? [])
    .filter((tp) => tp?.path && loadTopic(tp.path))
    .map((tp) => {
      const topic = loadTopic(tp.path);
      const key = `topics.${topic.slug}.label`;
      const label = te(key) ? t(key) : topic.title;
      return { path: tp.path, topic, label };
    })
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
          :alt="`${item.label} logo`"
        />
        {{ item.label }}
      </UBadge>
    </ULink>
  </div>
</template>
