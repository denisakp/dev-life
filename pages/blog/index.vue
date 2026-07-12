<script setup>
import Pagination from "~/components/shared/Pagination.vue";
import {
  DEFAULT_PAGINATION_LIMIT,
  META_DESCRIPTION,
  META_IMAGE,
} from "~/utils/config";

const { locale, t } = useI18n();

const perPage = DEFAULT_PAGINATION_LIMIT;
const currentPage = ref(1);

const isFr = computed(() => locale.value === "fr");
const pathFilter = computed(() =>
  isFr.value ? ["LIKE", "%.fr"] : ["NOT LIKE", "%.fr"]
);

const { data: totalArticles } = await useAsyncData(
  () => `blog-count-${locale.value}`,
  () =>
    publishedOnly(
      queryCollection("content").where(
        "path",
        pathFilter.value[0],
        pathFilter.value[1]
      )
    ).count(),
  { watch: [locale] }
);

const totalPages = computed(() =>
  Math.ceil((totalArticles.value ?? 0) / perPage)
);

const loadContent = (skip, limit) =>
  publishedOnly(
    queryCollection("content").where(
      "path",
      pathFilter.value[0],
      pathFilter.value[1]
    )
  )
    .order("date", "DESC")
    .skip(skip)
    .limit(limit)
    .all();

const skipFor = (page) => (page - 1) * perPage;

const { data: articles } = await useAsyncData(
  () => `blog-list-${locale.value}-${currentPage.value}`,
  () => loadContent(skipFor(currentPage.value), perPage),
  { watch: [currentPage, locale] }
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
  twitterCard: "summary_large_image",
  twitterTitle: "Blog - Denis AKPAGNONITE",
  twitterDescription: META_DESCRIPTION,
  twitterImage: META_IMAGE,
});
</script>

<template>
  <div class="container" data-pagefind-ignore="all">
    <template v-if="isFr && (totalArticles ?? 0) === 0">
      <p class="text-neutral-600 dark:text-neutral-400 italic my-8">
        {{ t('blog.emptyFr') }}
        <NuxtLink to="/blog" class="text-primary-600 dark:text-primary-400 hover:underline ml-1">
          /blog
        </NuxtLink>
      </p>
    </template>
    <template v-else>
      <h5 class="text-2xl">
        <template v-if="isFr">{{ totalArticles ?? 0 }} articles</template>
        <template v-else>A total of <span class="highlighted">{{ totalArticles ?? 0 }}</span> posts</template>
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
    </template>
  </div>
</template>
