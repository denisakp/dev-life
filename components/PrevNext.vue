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

const nextPath = computed(() =>
  props.next?.path ? `/blog${props.next.path}` : null
);
const prevPath = computed(() =>
  props.prev?.path ? `/blog${props.prev.path}` : null
);
</script>

<template>
  <div
    class="mt-6 md:mt-12 mx-4 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0"
    :class="{
      'justify-between': prevPath && nextPath,
      'justify-start': prevPath && !nextPath,
      'justify-end': !prevPath && nextPath,
    }"
  >
    <NuxtLink
      v-if="prevPath"
      :to="prevPath"
      class="grow max-w-full md:max-w-[45%] slick-border slick-hover px-4 py-4 cursor-pointer text-sm"
    >
      <div class="flex flex-row items-center space-x-4">
        <UIcon name="i-lucide-chevron-left" class="size-6 text-neutral-700 dark:text-neutral-300" />
        <div class="overflow-hidden">
          <p class="text-neutral-700 dark:text-neutral-300 text-xs">Previous</p>
          <p class="text-neutral-900 dark:text-neutral-100 truncate" :title="props.prev.title">
            {{ props.prev.title }}
          </p>
        </div>
      </div>
    </NuxtLink>

    <NuxtLink
      v-if="nextPath"
      :to="nextPath"
      class="grow max-w-full md:max-w-[45%] slick-border slick-hover px-4 py-4 cursor-pointer text-sm"
    >
      <div class="flex flex-row items-center justify-end space-x-4">
        <div class="overflow-hidden text-right">
          <p class="text-neutral-700 dark:text-neutral-300 text-xs">Next</p>
          <p class="text-neutral-900 dark:text-neutral-100 truncate" :title="props.next.title">
            {{ props.next.title }}
          </p>
        </div>
        <UIcon name="i-lucide-chevron-right" class="size-6 text-neutral-700 dark:text-neutral-300" />
      </div>
    </NuxtLink>
  </div>
</template>
