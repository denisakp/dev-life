<script setup>
import loadTopic from "~/utils/load-topic";
import Pagination from "~/components/shared/Pagination.vue";
import { DEFAULT_PAGINATION_LIMIT } from "~/utils/config";

const route = useRoute();
const slug = ref(route.params.slug[0]);

const techno = loadTopic(slug.value);

const perPage = DEFAULT_PAGINATION_LIMIT;
const currentPage = ref(1);

const baseQuery = () =>
  queryCollection("content").where("topics", "LIKE", `%${slug.value}%`);

const { data: totalArticles } = await useAsyncData(
  `topic-count-${slug.value}`,
  () => baseQuery().count()
);

const totalPages = computed(() =>
  Math.ceil((totalArticles.value ?? 0) / perPage)
);

const { data: articles } = await useAsyncData(
  () => `topic-list-${slug.value}-${currentPage.value}`,
  () =>
    baseQuery()
      .select("title", "description", "tags", "path", "date")
      .order("date", "DESC")
      .skip((currentPage.value - 1) * perPage)
      .limit(perPage)
      .all(),
  { watch: [currentPage] }
);

const onPageChanged = (page) => {
  currentPage.value = page;
  if (import.meta.client) window.scrollTo(0, 0);
};

onMounted(() => {
  window.scrollTo(0, 0);
});

useSeoMeta({
  title: techno?.title,
  description: techno?.description,

  ogTitle: (techno?.title ?? "") + " - Denis AKPAGNONITE",
  ogDescription: techno?.description,
  ogImage: techno?.image,
  ogUrl: "https://denisakp.me/topics/" + (techno?.title ?? ""),

  twitterCard: "summary_large_image",
  twitterTitle: (techno?.title ?? "") + " - Denis AKPAGNONITE",
  twitterDescription: techno?.description,
  twitterImage: techno?.image,
});
</script>

<template>
  <div class="container">
    <template v-if="techno">
      <template v-if="(totalArticles ?? 0) > 0">
        <div class="container">
          <section class="text-neutral-700 dark:text-neutral-300 mb-12">
            <div class="h-full flex items-center slick-border p-2 rounded-sm">
              <div class="bg-neutral-100 dark:bg-neutral-900 p-4 mr-4 rounded-sm">
                <img
                  class="mx-auto h-16 w-16 lg:w-24 shrink-0"
                  :src="techno.iconPath"
                  :alt="techno.title + ' logo'"
                />
              </div>
              <div class="grow">
                <h4 class="text-neutral-900 dark:text-neutral-100">
                  {{ techno.title }}
                </h4>
                <p class="text-neutral-700 dark:text-neutral-300">
                  {{ techno.description }}
                </p>
              </div>
            </div>
          </section>
          <h4 class="mb-4 text-3xl">Articles ({{ totalArticles }})</h4>
          <div class="flex flex-wrap my-4">
            <div
              class="p-2 lg:w-1/2 w-full"
              v-for="(post, index) in articles ?? []"
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
              :total="totalArticles ?? 0"
              @page-changed="onPageChanged"
            />
          </div>
        </div>
      </template>

      <template v-else>
        <div class="container">
          <p class="text-4xl text-center">Sorry! I'm not yet inspired for this topic 😮‍💨</p>
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
