<script setup>

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  maxViewPage: {
    type: Number,
    required: true,
    default: 3
  }
});

const emit = defineEmits(['pageChanged'])

let isPageActive = (page) => {
  return props.currentPage === page
}

const isInFirstPage = computed(() => props.currentPage === 1);

const isInLastPage = computed(() => props.currentPage === props.totalPages);

const startPage = computed(() => {
  if (props.currentPage === 1) {
    return 1;
  }
  if (props.currentPage === props.totalPages) {
    return props.totalPages - props.maxViewPage
  }
  return props.currentPage - 1;
});

const endPage = computed(() => Math.min(Number(startPage) + props.maxViewPage - 1, props.totalPages));

const pages = computed(() => {
  let data = [];
  for (let i = Number(startPage); i <= Number(endPage); i++) {
    data.push({
      name: i,
      isDisabled: i === props.currentPage
    });
  }
});

let onFirstPage = () => {
  emit('pageChanged', 1);
}

let onPreviousPage = () => {
  emit('pageChanged', props.currentPage - 1);
}

let onCurrentPage = () => {
  emit('pageChanged', 1)
}

let onNextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('pageChanged', props.currentPage + 1)
  }
}

let onLastPage = () => {
  emit('pageChanged', props.totalPages)
}

const reactiveQuery = computed(() => useRoute().query.page)

watch(reactiveQuery, (x, y) => {
  console.log(x)
  emit('changed', x)
})

</script>


<template>
  <div>
    <nav aria-label="Page de navigation">
      <div class="flex">

        <nuxt-link
            class="pager-item"
            :to="{ name: 'blog', query: { page: 1 } }"
            :class="{ disabled: isInFirstPage }"
        >
          <p aria-hidden="true">First</p>
        </nuxt-link>

        <nuxt-link
            class="pager-item"
            :to="{
            name: 'blog',
            query: { page: currentPage > 1 ? currentPage - 1 : 1 }
          }"
            :class="{ disabled: isInFirstPage }"
        >
          <p aria-hidden="true">&laquo;</p>
        </nuxt-link>

        <nuxt-link
            v-for="page in pages"
            :key="page.name"
            class="pager-item"
            :class="{ active: isPageActive(page.name) }"
            :to="{ name: 'blog', query: { page: page.name } }"
        >
          <p>{{ page.name }}</p>
        </nuxt-link>

        <nuxt-link
            class="pager-item"
            :to="{
            name: 'blog',
            query: {
              page: currentPage < totalPages ? currentPage + 1 : totalPages,
            },
          }"
            aria-label="Next"
            :class="{ disabled: isInLastPage }"
        >
          <p aria-hidden="true">&raquo;</p>
        </nuxt-link>

        <nuxt-link
            class="pager-item"
            :class="{ disabled: isInLastPage }"
            :to="{ name: 'blog', query: { page: props.totalPages } }"
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
