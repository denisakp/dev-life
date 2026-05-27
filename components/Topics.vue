<script setup>
import loadTopic from "~/utils/load-topic";

const props = defineProps({
  topics: { type: Array, default: () => [] },
});
</script>

<template>
  <div class="flex flex-wrap my-4">
    <template v-for="(item, index) in props.topics" :key="index">
      <div v-if="item.path && loadTopic(item.path)" class="p-2 lg:w-1/6 md:w-1/4 w-1/2">
        <NuxtLink :to="'/topics' + item.path">
          <div
            class="h-full flex items-center p-2 rounded-sm hover:shadow-sm slick-border text-neutral-700 dark:text-neutral-300"
          >
            <div class="mr-6">
              <nuxt-img
                class="mx-auto h-auto w-5 shrink-0"
                :src="loadTopic(item.path).iconPath"
                :alt="loadTopic(item.path).title + ' - Logo'"
              />
            </div>
            <div class="grow">
              <p class="font-medium">
                {{ loadTopic(item.path).title }}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </template>
  </div>
</template>
