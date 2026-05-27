<script setup>
import Pagination from "~/components/shared/Pagination.vue";
import {
  DEFAULT_PAGINATION_LIMIT,
  META_DESCRIPTION,
  META_IMAGE,
} from "~/utils/config";

const perPage = DEFAULT_PAGINATION_LIMIT;
const currentPage = ref(1);

const { data: totalArticles } = await useAsyncData("blog-count", () =>
  queryCollection("content").count()
);

const totalPages = computed(() =>
  Math.ceil((totalArticles.value ?? 0) / perPage)
);

const loadContent = (skip, limit) =>
  queryCollection("content")
    .order("date", "DESC")
    .skip(skip)
    .limit(limit)
    .all();

const skipFor = (page) => (page - 1) * perPage;

const { data: articles } = await useAsyncData(
  () => `blog-list-${currentPage.value}`,
  () => loadContent(skipFor(currentPage.value), perPage),
  { watch: [currentPage] }
);

const onPageChanged = async (page) => {
  currentPage.value = page;
  if (import.meta.client) window.scrollTo(0, 0);
};

onMounted(() => {
  window.scrollTo(0, 0);
});

useSeoMeta({
  title: "Blog",
  description: META_DESCRIPTION,

  ogTitle: "Blog - Denis AKPAGNONITE",
  ogDescription: META_DESCRIPTION,
  ogImage: META_IMAGE,
  ogUrl: "https://denisakp.me",

  twitterCard: "summary_large_image",
  twitterTitle: "Blog - Denis AKPAGNONITE",
  twitterDescription: META_DESCRIPTION,
  twitterImage: META_IMAGE,
});
</script>

<template>
  <div class="container">
    <h5 class="text-2xl">
      A total of
      <span class="highlighted"> {{ totalArticles ?? 0 }} </span> posts
    </h5>
    <div class="flex flex-wrap my-4">
      <div
        class="p-2 lg:w-1/2 w-full"
        v-for="(post, index) in articles ?? []"
        :key="index"
      >
        <Post :post="post" />
      </div>
    </div>

    <Pagination
      :total="totalArticles ?? 0"
      :total-pages="totalPages"
      :per-page="perPage"
      :current-page="currentPage"
      @page-changed="onPageChanged"
    />
  </div>
</template>
