<script setup>
import loadTopic from "~/utils/load-topic";
import Pagination from "~/components/shared/Pagination.vue";
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_SORT
} from "~/utils/config";

const route = useRoute();
const slug = ref(route.params.slug[0]);

let techno = loadTopic(slug.value);

const where = { topics: { $contains: slug.value } };
const only = ["title", "description", "tags", "_path", "date"];
const sort = { date: DEFAULT_PAGINATION_SORT };

const loadContent = async (skip, limit) =>
  queryContent("/")
    .where(where)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .only(only)
    .find();

const perPage = DEFAULT_PAGINATION_LIMIT;
const currentPage = ref(1);

const totalArticles = ref((await queryContent("/").where(where).find()).length);
const totalPages = ref(Math.ceil(totalArticles.value / perPage));

const lastPageCount = ref(
  totalArticles.value % perPage !== 0
    ? totalArticles.value % perPage
    : totalArticles.value - perPage
);

let skipNumber = ref(
  currentPage.value === 1
    ? 0
    : currentPage.value === totalPages.value
      ? totalArticles.value - lastPageCount.value
      : (currentPage.value - 1) * perPage
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
  title: techno.name,
  description: techno.description,
  ogTitle: techno.name + " - Denis AKPAGNONITE",
  ogDescription: techno.description,
  ogImage: techno.image,
  ogUrl: "https://denisakp.me/topics/" + techno.name,
  twitterCard: "summary_large_image",
  twitterTitle: techno.name + " - Denis AKPAGNONITE",
  twitterDescription: techno.description,
  twitterImage: techno.image
});
</script>

<template>
  <div class="page-bg">
    <template v-if="techno">
      <template v-if="totalArticles > 0">
        <div class="container">
          <section class="text-dark mb-12">
            <div class="h-full flex items-center slick-border p-2 rounded-sm">
              <div class="bg-dark-low p-4 mr-4 rounded-sm">
                <img
                  class="mx-auto h-16 w-16 lg:w-24 flex-shrink-0"
                  :src="techno.iconPath"
                  :alt="techno.title + ' logo'"
                />
              </div>
              <div class="flex-grow">
                <h4 class="darker-text">
                  {{ techno.title }}
                </h4>
                <p class="dark-text">
                  {{ techno.description }}
                </p>
              </div>
            </div>
          </section>
          <h4 class="mb-4 text-3xl">Articles ({{ totalArticles }})</h4>
          <div class="flex flex-wrap my-4">
            <div
              class="p-2 lg:w-1/2 w-full"
              v-for="(post, index) in articles"
              :key="index"
            >
              <Post :post="post" />
            </div>
          </div>
          <div class="w-full flex justify-center items-center">
            <Pagination
              :current-page="currentPage"
              :per-page="perPage"
              :total-pages="totalPages"
              :total="totalArticles"
              @page-changed="onPageChanged"
            />
          </div>
        </div>
      </template>

      <template v-else>
        <div class="container">
          <p class="text-4xl text-center">Sorry ! I'm not yet inspired for this topic 😮‍💨 </p>
        </div>
      </template>
    </template>

    <template v-else>
      <div class="container">
        <section class="space-y-4">
          <p>Error 404</p>
        </section>
      </div>
    </template>
  </div>
</template>
