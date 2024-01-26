<script setup>
import loadTopic from "~/utils/load-topic";

const props = defineProps({
  topics: { type: Array, default: () => [] }
});
</script>

<template>
  <div class="flex flex-wrap my-4">
    <template v-for="(item, index) in props.topics" :key="index">
      <div v-if="loadTopic(item._path)" class="p-2 lg:w-1/6 md:w-1/4 w-1/2">
        <NuxtLink :to="'/topics' + item._path">
          <div
            class="h-full flex items-center p-2 rounded-sm hover:shadow-sm slick-border dark-text"
          >
            <div class="mr-6">
              <nuxt-img
                class="mx-auto h-auto w-5 flex-shrink-0"
                :src="loadTopic(item._path).iconPath"
                :alt="loadTopic(item._path).title + ' - Logo'"
              />
            </div>
            <div class="flex-grow">
              <p class="font-medium">
                {{ loadTopic(item._path).title }}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </template>
  </div>
</template>
