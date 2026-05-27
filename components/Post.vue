<script setup>
import formatDate from "../utils/date-formating";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const destination = computed(() => "/blog" + (props.post?.path ?? ""));
</script>

<template>
  <div class="h-full border border-neutral-200 dark:border-neutral-800 rounded-sm hover:shadow-sm">
    <NuxtLink :to="destination" class="w-full" style="text-decoration: none">
      <div class="p-4 flex flex-col h-full">
        <p class="text-neutral-900 dark:text-neutral-100 font-medium">
          {{ props.post.title }}
        </p>
        <p class="flex-1 mt-2 text-sm leading-5 text-neutral-700 dark:text-neutral-300">
          {{ props.post.description }}
        </p>

        <div class="flex flex-wrap items-center mt-2">
          <div class="flex flex-grow mr-2 flex-wrap">
            <p
              v-for="(tag, index) in props.post.tags"
              :key="index"
              class="ml-2 mt-1 text-xs py-1 px-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-sm text-neutral-600 dark:text-neutral-400"
            >
              #{{ tag }}
            </p>
          </div>

          <p
            v-if="props.post.date !== 'Invalid date'"
            class="text-sm text-neutral-500 mt-3 ml-2"
          >
            {{ formatDate(props.post.date) }}
          </p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
