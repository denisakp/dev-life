<script setup>
import { formatDate } from "~/utils/format-date";
import { pathLang, stripLangSuffix } from "~/utils/content-lang";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

// post.path is the CONTENT path ("/ai/foo" en, "/ai/foo.fr" fr), not a URL.
// The language suffix must be stripped and replaced by the i18n route prefix.
const destination = computed(() => {
  const contentPath = props.post?.path ?? "";
  const base = stripLangSuffix(contentPath);
  return pathLang(contentPath) === "fr" ? `/fr/blog${base}` : `/blog${base}`;
});
</script>

<template>
  <NuxtLink :to="destination" class="block h-full" style="text-decoration: none">
    <UCard
      :ui="{
        root: 'h-full hover:ring-2 hover:ring-primary-500 active:scale-[0.99] transition cursor-pointer',
        body: 'p-4 flex flex-col h-full',
      }"
    >
      <p class="text-neutral-900 dark:text-neutral-100 font-medium">
        {{ props.post.title }}
      </p>
      <p class="flex-1 mt-2 text-sm leading-5 text-neutral-700 dark:text-neutral-300">
        {{ props.post.description }}
      </p>

      <div class="flex flex-wrap items-center mt-3 gap-2">
        <div class="flex grow flex-wrap gap-1.5">
          <UBadge
            v-for="(tag, index) in props.post.tags"
            :key="index"
            color="neutral"
            variant="subtle"
            size="sm"
          >
            #{{ tag }}
          </UBadge>
        </div>

        <p
          v-if="props.post.date !== 'Invalid date'"
          class="text-sm text-neutral-500"
        >
          {{ formatDate(props.post.date) }}
        </p>
      </div>
    </UCard>
  </NuxtLink>
</template>
