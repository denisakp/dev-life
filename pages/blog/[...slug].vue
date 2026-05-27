<script setup>
import Giscus from "@giscus/vue";

import PrevNext from "~/components/PrevNext.vue";
import Toc from "~/components/Toc.vue";

const { path } = useRoute();
const reviewedPath = path.replace("/blog", "");

const { data: article } = await useAsyncData(`article-${reviewedPath}`, () =>
  queryCollection("content").path(reviewedPath).first()
);

const { data: surround } = await useAsyncData(`surround-${reviewedPath}`, () =>
  queryCollectionItemSurroundings("content", reviewedPath, {
    fields: ["title", "path"],
  })
);

const prev = computed(() => surround.value?.[0] ?? null);
const next = computed(() => surround.value?.[1] ?? null);

const tocLinks = computed(() => article.value?.body?.toc?.links ?? []);

const colorMode = useColorMode();
const giscusTheme = computed(() =>
  colorMode.value === "dark" ? "dark" : "light"
);

useSeoMeta({
  title: () => article.value?.title,
  description: () => article.value?.description,
  keywords: () => article.value?.tags?.toString(),

  ogTitle: () => (article.value?.title ?? "") + " - Denis AKPAGNONITE",
  ogDescription: () => article.value?.description,
  ogImage: () => article.value?.img,
  ogUrl: "https://denisakp.me" + path,

  twitterCard: "summary_large_image",
  twitterTitle: () => (article.value?.title ?? "") + " - Denis AKPAGNONITE",
  twitterDescription: () => article.value?.description,
  twitterImage: () => article.value?.img,
});
</script>

<template>
  <div v-if="article" class="container">
    <div class="lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12 xl:gap-16">
      <article class="min-w-0">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl text-primary-600 dark:text-primary-400 font-bold mt-0 mb-4 leading-tight break-words">
          {{ article.title }}
        </h1>

        <div class="max-w-none lg:prose-lg prose dark:prose-invert">
          <ContentRenderer :value="article">
            <template #empty>
              <p>No content found.</p>
            </template>
          </ContentRenderer>
        </div>

        <Giscus
          id="comments"
          repo="denisakp/dev-life"
          repoid="R_kgDOJyrfLg"
          category="Comments"
          categoryid="DIC_kwDOJyrfLs4CkWjU"
          mapping="title"
          reactionsenabled="1"
          emitmetadata="0"
          inputposition="bottom"
          :theme="giscusTheme"
          lang="en"
          loading="lazy"
          crossorigin="anonymous"
        />

        <PrevNext :prev="prev" :next="next" />
      </article>

      <aside v-if="tocLinks.length" class="hidden lg:block">
        <div class="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
          <Toc :links="tocLinks" />
        </div>
      </aside>
    </div>
  </div>
</template>
