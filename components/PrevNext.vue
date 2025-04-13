<script setup>

const props = defineProps({
  prev: {
    type: Object,
    default: null,
  },
  next: {
    type: Object,
    default: null,
  },
});

const nextPath = ref(`/blog${props.next?._path}`);
const prevPath = ref(`/blog${props.prev?._path}`);

</script>

<template>
  <div
    class="mt-6 md:mt-12 mx-4 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0"
    :class="{
      'justify-between': props.prev !== null && props.next !== null,
      'justify-start': props.prev !== null && props.next === null,
      'justify-end': props.prev === null && props.next !== null,
    }"
  >
    <!-- Button Previous -->
    <NuxtLink
      v-if="props.prev"
      :to="prevPath"
      class="flex-grow max-w-full md:max-w-[45%] slick-border slick-hover px-4 py-4 cursor-pointer text-sm"
    >
      <div class="flex flex-row items-center space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="w-6 h-6 dark-text"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            fill="currentColor"
            d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"
          />
        </svg>
        <div class="overflow-hidden">
          <p class="dark-text text-xs">Previous</p>
          <p class="darker-text truncate" :title="props.prev.title">{{ props.prev.title }}</p>
        </div>
      </div>
    </NuxtLink>

    <!-- Button Next -->
    <NuxtLink
      v-if="next"
      :to="nextPath"
      class="flex-grow max-w-full md:max-w-[45%] slick-border slick-hover px-4 py-4 cursor-pointer text-sm"
    >
      <div class="flex flex-row items-center justify-end space-x-4">
        <div class="overflow-hidden text-right">
          <p class="dark-text text-xs">Next</p>
          <p class="darker-text truncate" :title="props.next.title">{{ props.next.title }}</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="w-6 h-6 dark-text"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            fill="currentColor"
            d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"
          />
        </svg>
      </div>
    </NuxtLink>
  </div>
</template>
