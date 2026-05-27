<script setup>
const props = defineProps(["totalPages", "perPage", "currentPage", "total"]);
const emit = defineEmits(["pageChanged"]);

const page = computed({
  get: () => props.currentPage,
  set: (v) => emit("pageChanged", v),
});
</script>

<template>
  <div class="w-full flex justify-center items-center py-4">
    <UPagination
      v-model:page="page"
      :total="total"
      :items-per-page="perPage"
      :sibling-count="1"
      show-edges
    />
  </div>
</template>
