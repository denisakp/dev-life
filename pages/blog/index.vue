<script setup>
import Pagination from "~/components/shared/Pagination.vue";
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_SORT,
} from "~/utils/config";

const loadContent = async (skip, limit) =>
    queryContent()
        .skip(skip)
        .limit(limit)
        .sort({date: DEFAULT_PAGINATION_SORT})
        .find();

const perPage = DEFAULT_PAGINATION_LIMIT;
const currentPage = ref(1);

const totalArticles = ref((await queryContent("/").find()).length);
const totalPages = ref(Math.ceil(totalArticles.value / perPage));
const lastPageCount = ref(
    totalArticles.value % perPage !== 0
        ? totalArticles.value % perPage
        : totalArticles.value - perPage,
);

let skipNumber = ref(
    currentPage.value === 1
        ? 0
        : currentPage.value === totalPages.value
            ? totalArticles.value - lastPageCount.value
            : (currentPage.value - 1) * perPage,
);

let articles = ref(await loadContent(skipNumber.value, perPage));

const onPageChanged = async (page) => {
  currentPage.value = page;

  const skip =
      page === 1
          ? 0
          : page === totalPages.value
              ? totalArticles.value - lastPageCount.value
              : (page - 1) * perPage;

  articles.value = await loadContent(skip, perPage);
  window.scrollTo(0, 0);
};

onMounted(() => {
  window.scrollTo(0, 0);
});

useSeoMeta({
  title: "Blog",
  description: "Blog page Description",

  ogTitle: "Blog - Dev Life",
  ogDescription: "Your one-stop destination for all things software engineering, Cloud DevOps, AI, and cyber security",
  ogImage:
      "https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/images/hbcudyxllyjvbkjxvs7g",
  ogUrl: "https://denisakp.me",

  twitterCard: "summary_large_image",
  twitterTitle: "Blog - Dev Life",
  twitterDescription: "Your one-stop destination for all things software engineering, Cloud DevOps, AI, and cyber security",
  twitterImage:
      "https://res.cloudinary.com/dpdwhd6ka/image/upload/f_auto,q_auto/v1/Blog/images/hbcudyxllyjvbkjxvs7g",
});
</script>

<template>
  <div class="page-bg">
    <div class="container">
      <h5 class="text-2xl">
        A total of
        <span class="hightlighted"> {{ totalArticles }} </span> articles
      </h5>
      <div class="flex flex-wrap my-4">
        <div
            class="p-2 lg:w-1/2 w-full"
            v-for="(post, index) in articles"
            :key="index"
        >
          <Post :post="post"/>
        </div>
      </div>
      <div class="w-full flex justify-center items-center">
        <Pagination
            :total="totalArticles"
            :total-pages="totalPages"
            :per-page="perPage"
            :current-page="currentPage"
            @page-changed="onPageChanged"
        />
      </div>
    </div>
  </div>
</template>
