<script setup>
const props = defineProps({
  prev: { type: Object, default: null },
  next: { type: Object, default: null },
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
    class="mt-6 md:mt-12 mb-12 md:mb-16 mx-4 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0"
    :class="{
      'justify-between': prevPath && nextPath,
      'justify-start': prevPath && !nextPath,
      'justify-end': !prevPath && nextPath,
    }"
  >
    <UButton
      v-if="prevPath"
      :to="prevPath"
      color="neutral"
      variant="outline"
      size="lg"
      icon="i-lucide-chevron-left"
      class="grow max-w-full md:max-w-[45%] justify-start"
      :ui="{ leadingIcon: 'size-6' }"
    >
      <div class="overflow-hidden text-left ml-2">
        <p class="text-neutral-500 text-xs">Previous</p>
        <p class="truncate" :title="props.prev.title">{{ props.prev.title }}</p>
      </div>
    </UButton>

    <UButton
      v-if="nextPath"
      :to="nextPath"
      color="neutral"
      variant="outline"
      size="lg"
      trailing-icon="i-lucide-chevron-right"
      class="grow max-w-full md:max-w-[45%] justify-end"
      :ui="{ trailingIcon: 'size-6' }"
    >
      <div class="overflow-hidden text-right mr-2">
        <p class="text-neutral-500 text-xs">Next</p>
        <p class="truncate" :title="props.next.title">{{ props.next.title }}</p>
      </div>
    </UButton>
  </div>
</template>
