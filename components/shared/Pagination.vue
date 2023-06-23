<script setup>
const route = useRoute()

const props = defineProps(['total', 'perPage']);

const totalPages = computed(() => Math.ceil(props.total / props.perPage));

const currentPage = computed(() => parseInt(route.query.page));

const nextPage = computed(() => (currentPage.value < totalPages.value) ? currentPage.value + 1 : totalPages.value);

const prevPage = computed(() => currentPage.value > 1 ? currentPage.value - 1 : 1);

const startPage = computed(() => (currentPage.value === 1) ? 1 : (currentPage.value === totalPages.value) ? totalPages.value - totalPages.value + 1 : currentPage.value - 1);

const endPage = computed(() => Math.min(startPage.value + totalPages.value - 1, totalPages.value));

const pages = computed(() => {
  const data = [];
  for (let i = startPage.value; i <= endPage.value; i++) {
    data.push({
      name: i,
      isDisabled: i === currentPage.value
    })
  }
  return data;
});

const isPageActive = (page) => {
  return currentPage.value === page
}

</script>

<template>
  <div>
    <nav aria-label="Page de navigation">
      <div class="flex">
        <nuxt-link
            class="pager-item"
            :to="{ name: 'blog', query: { page: 1 } }"
            :class="{ disabled: currentPage === 1 }"
        >
          <p aria-hidden="true">First</p>
        </nuxt-link>

        <nuxt-link
            class="pager-item"
            :to="{ name: 'blog', query: { page: prevPage }}"
            :class="{ disabled: currentPage === 1 }"
        >
          <p aria-hidden="true">&laquo;</p>
        </nuxt-link>

        <nuxt-link
            v-for="page in pages"
            :key="page.name"
            class="pager-item"
            :class="{ active: isPageActive(page.name) }"
            :to="{ name: 'blog', query: { page: page.name} }"
        >
          <p>{{ page.name }}</p>
        </nuxt-link>

        <nuxt-link
            class="pager-item"
            :to="{ name: 'blog', query: { page: nextPage } }"
            aria-label="Next"
            :class="{ disabled: currentPage === totalPages }"
        >
          <p aria-hidden="true">&raquo;</p>
        </nuxt-link>

        <nuxt-link
            class="pager-item"
            :class="{ disabled: currentPage === totalPages }"
            :to="{ name: 'blog', query: { page: totalPages } }"
        >
          <p aria-hidden="true">Last</p>
        </nuxt-link>

      </div>
    </nav>
  </div>
</template>

<style scoped>
.pager-item {
  @apply border border-dark-low dark:border-white dark:border-opacity-20 text-dark dark:text-white px-3 py-1 md:px-5 md:py-3 cursor-pointer;
}

.pager-item:hover {
  @apply bg-dark-low dark:bg-dark;
}

.pager-item.active {
  @apply bg-blue font-bold text-white;
}

.pager-item.disabled {
  @apply opacity-70 cursor-not-allowed;
}

.pager-item.disabled:hover {
  @apply bg-transparent dark:bg-transparent;
}
</style>
