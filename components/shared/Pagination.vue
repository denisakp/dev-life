<script setup>
import { DEFAULT_MAX_PAGINATION_PAGES } from "~/utils/config";

const props = defineProps(["totalPages", "perPage", "currentPage", "total"]);

const emit = defineEmits(["pageChanged"]);

const maxVisiblePages = ref(DEFAULT_MAX_PAGINATION_PAGES);

const inFirstPage = computed(() => props.currentPage === 1);
const inLastPage = computed(() => props.currentPage === props.totalPages);

const startPage = computed(() => {
  if (props.currentPage === 1) return 1;

  if (props.currentPage === props.totalPages) {
    const start = props.totalPages - (maxVisiblePages.value - 1);
    return start === 0 ? 1 : start;
  }

  return props.currentPage - 1;
});

const pages = computed(() => {
  const range = [];
  for (let i = startPage.value; i <= props.totalPages; i += 1) {
    range.push({ name: i, isDisabled: i === props.currentPage });
  }
  return range;
});

const isPageActive = (page) => props.currentPage === page;
const onFirstPage = () => emit("pageChanged", 1);
const onPreviousPage = () => {
  if (props.currentPage > 1) {
    emit("pageChanged", props.currentPage - 1);
  }
};
const onPage = (page) => emit("pageChanged", page);
const onNextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit("pageChanged", props.currentPage + 1);
  }
};
const onLastPage = () => emit("pageChanged", props.totalPages);
</script>

<template>
  <nav class="py-4">
    <div class="flex">
      <button
        type="button"
        class="pagination-item"
        :disabled="inFirstPage"
        @click.prevent="onFirstPage"
      >
        <p aria-hidden="true">First</p>
      </button>

      <button
        type="button"
        class="pagination-item"
        :disabled="inFirstPage"
        @click.prevent="onPreviousPage"
      >
        <p aria-hidden="true">&laquo;</p>
      </button>

      <template v-for="(page, index) in pages" :key="index">
        <button
          type="button"
          class="pagination-item"
          :class="{ active: isPageActive(page.name) }"
          :disabled="page.isDisabled"
          @click.prevent="onPage(page.name)"
        >
          {{ page.name }}
        </button>
      </template>

      <button
        type="button"
        class="pagination-item"
        :disabled="inLastPage"
        @click.prevent="onNextPage"
      >
        <p aria-hidden="true">&raquo;</p>
      </button>

      <button
        type="button"
        class="pagination-item"
        :disabled="inLastPage"
        @click.prevent="onLastPage"
      >
        <p aria-hidden="true">Last</p>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.pagination-item {
  @apply border border-dark-low dark:border-white dark:border-opacity-20 text-dark dark:text-white px-3 py-1 md:px-5 md:py-3 cursor-pointer;
}

.pagination-item:hover {
  @apply bg-dark-low dark:bg-dark;
}

.pagination-item.active {
  @apply bg-blue font-bold text-white;
}

.pagination-item[diabled] {
  @apply opacity-70 cursor-not-allowed;
}
</style>
