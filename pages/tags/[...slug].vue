<script setup lang="ts">
import { tagToSlug } from "~/utils/normalize-tag";
import Pagination from "~/components/shared/Pagination.vue";
import { DEFAULT_PAGINATION_LIMIT } from "~/utils/config";

const { locale, t } = useI18n();
const route = useRoute();
const slug = computed(() => {
  const param = route.params.slug;
  return Array.isArray(param) ? param.join("/") : param ?? "";
});

const isFr = computed(() => locale.value === "fr");

const perPage = DEFAULT_PAGINATION_LIMIT;
const currentPage = ref(1);

const { data: matching } = await useAsyncData(
  () => `tag-list-${locale.value}-${slug.value}`,
  async () => {
    const posts = await queryCollection("content")
      .where("path", isFr.value ? "LIKE" : "NOT LIKE", "%.fr")
      .select("title", "description", "tags", "path", "date", "img")
      .order("date", "DESC")
      .all();
    return posts.filter((p) =>
      (p.tags ?? []).some((tag: string) => tagToSlug(tag) === slug.value)
    );
  },
  { watch: [locale] }
);

if (!matching.value || matching.value.length === 0) {
  throw createError({ statusCode: 404, statusMessage: "Tag not found" });
}

// First-seen display label from the matched posts
const displayLabel = computed(() => {
  for (const post of matching.value ?? []) {
    for (const tag of post.tags ?? []) {
      if (tagToSlug(tag) === slug.value) return tag;
    }
  }
  return slug.value;
});

const totalPages = computed(() =>
  Math.ceil((matching.value?.length ?? 0) / perPage)
);

const pagedArticles = computed(() =>
  (matching.value ?? []).slice(
    (currentPage.value - 1) * perPage,
    currentPage.value * perPage
  )
);

const onPageChanged = (page: number) => {
  currentPage.value = page;
  if (import.meta.client) window.scrollTo(0, 0);
};

useSeoMeta({
  title: () => "#" + displayLabel.value,
  description: () => `Posts tagged ${displayLabel.value}`,
  ogTitle: () => "#" + displayLabel.value + " - Denis AKPAGNONITE",
  ogUrl: () =>
    (isFr.value ? "https://denisakp.me/fr/tags/" : "https://denisakp.me/tags/") +
    slug.value,
  twitterCard: "summary_large_image",
});

defineOgImage("Default", { title: "#" + slug.value });
</script>

<template>
  <div class="container py-8 lg:py-12">
    <header class="mb-6">
      <h1 class="text-2xl lg:text-3xl text-primary-600 dark:text-primary-400 font-bold mb-1">
        #{{ displayLabel }}
      </h1>
      <p class="text-sm text-neutral-500">
        {{ t('tags.posts', { count: matching?.length ?? 0 }) }}
      </p>
    </header>

    <div class="flex flex-wrap my-4">
      <div
        v-for="(post, index) in pagedArticles"
        :key="index"
        class="p-2 lg:w-1/2 w-full"
      >
        <Post :post="post" />
      </div>
    </div>

    <Pagination
      v-if="totalPages > 1"
      :total="matching?.length ?? 0"
      :total-pages="totalPages"
      :per-page="perPage"
      :current-page="currentPage"
      @page-changed="onPageChanged"
    />
  </div>
</template>
