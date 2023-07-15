<script setup>
import loadTopic from "~/utils/load-topic";

const props = defineProps({
  topics: { type: Array, default: () => [] },
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
            <div class="bg-white mr-4 rounded-sm">
              <nuxt-img
                class="mx-auto h-5 w-5 flex-shrink-0"
                :src="loadTopic(item._path).image"
                :alt="loadTopic(item._path).name + ' - Logo'"
              />
            </div>
            <div class="flex-grow">
              <p class="font-medium">
                {{ loadTopic(item._path).name }}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </template>
  </div>
</template>
