<script setup>
import formatDate from "../utils/date-formating";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const destination = ref("/blog" + props.post?._path);
</script>

<template>
  <div
    class="h-full border-dark-low border rounded-sm hover:shadow-sm"
  >
    <NuxtLink
      :to="destination"
      class="w-full"
      style="text-decoration: none"
    >
      <div class="p-4 flex flex-col h-full">
        <p class="text-dark-high font-medium">
          {{ props.post.title }}
        </p>
        <p
          class="flex-1 mt-2 text-sm leading-5 text-dark"
        >
          {{ props.post.description }}
        </p>

        <div class="flex flex-wrap items-center mt-2">
          <div class="flex flex-grow mr-2 flex-wrap">
            <p
              v-for="(tag, index) in props.post.tags"
              :key="index"
              class="ml-2 mt-1 text-xs py-1 px-2 bg-dark-low border border-dark-low rounded-sm text-gray-600"
            >
              #{{ tag }}
            </p>
          </div>

          <p
            v-if="props.post.date !== 'Invalid date'"
            class="text-sm text-gray-400 mt-3 ml-2"
          >
            {{ formatDate(props.post.date) }}
          </p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
