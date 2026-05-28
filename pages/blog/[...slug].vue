<script setup>
import Giscus from "@giscus/vue";

import PrevNext from "~/components/PrevNext.vue";
import Toc from "~/components/Toc.vue";
import MobileToc from "~/components/content/MobileToc.vue";
import RelatedPosts from "~/components/RelatedPosts.vue";
import NewsletterForm from "~/components/shared/NewsletterForm.vue";
import { formatDate, dateLocaleFor } from "~/utils/format-date";

const { locale, t } = useI18n();
const { path } = useRoute();
// path looks like "/blog/foo" (en) or "/fr/blog/foo" (fr)
const basePath = computed(() =>
  path.replace(/^\/fr\/blog/, "").replace(/^\/blog/, "")
);
const isFr = computed(() => locale.value === "fr");
const contentPath = computed(() =>
  isFr.value ? `${basePath.value}.fr` : basePath.value
);

const { data: article } = await useAsyncData(
  () => `article-${locale.value}-${basePath.value}`,
  () => queryCollection("content").path(contentPath.value).first(),
  { watch: [locale] }
);

// Sibling lookup — the OTHER locale variant
const { data: sibling } = await useAsyncData(
  () => `article-sibling-${locale.value}-${basePath.value}`,
  () =>
    queryCollection("content")
      .path(isFr.value ? basePath.value : `${basePath.value}.fr`)
      .first(),
  { watch: [locale] }
);

const siblingHref = computed(() => {
  if (!sibling.value) return null;
  return isFr.value ? `/blog${basePath.value}` : `/fr/blog${basePath.value}`;
});
const siblingLabel = computed(() =>
  isFr.value ? t("site.switchToEnglish") : t("site.switchToFrench")
);

const pathFilter = computed(() =>
  isFr.value ? ["LIKE", "%.fr"] : ["NOT LIKE", "%.fr"]
);

const { data: surround } = await useAsyncData(
  () => `surround-${locale.value}-${basePath.value}`,
  () =>
    queryCollectionItemSurroundings("content", contentPath.value, {
      fields: ["title", "path"],
    }),
  { watch: [locale] }
);

const prev = computed(() => surround.value?.[0] ?? null);
const next = computed(() => surround.value?.[1] ?? null);

const tocLinks = computed(() => article.value?.body?.toc?.links ?? []);

const displayDate = computed(() =>
  formatDate(article.value?.date, dateLocaleFor(locale.value))
);
const reading = computed(() => useReadingTime(article.value?.body ?? {}));

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

defineOgImage("Post", {
  title: article.value?.title ?? "",
  date: article.value?.date ?? "",
});

const { data: related } = await useAsyncData(
  () => `related-${locale.value}-${basePath.value}`,
  async () => {
    if (!article.value) return [];
    const all = await queryCollection("content")
      .where("path", pathFilter.value[0], pathFilter.value[1])
      .select("path", "title", "description", "date", "tags", "topics")
      .all();
    const currentTags = new Set(article.value.tags ?? []);
    const currentTopics = new Set(article.value.topics ?? []);
    return all
      .filter((p) => p.path !== contentPath.value)
      .map((p) => ({
        post: p,
        score:
          (p.tags ?? []).filter((t) => currentTags.has(t)).length +
          (p.topics ?? []).filter((t) => currentTopics.has(t)).length,
      }))
      .filter((x) => x.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        const dCmp =
          new Date(b.post.date ?? 0).getTime() -
          new Date(a.post.date ?? 0).getTime();
        if (dCmp !== 0) return dCmp;
        return (a.post.path ?? "").localeCompare(b.post.path ?? "");
      })
      .slice(0, 3)
      .map((x) => x.post);
  },
  { watch: [article] }
);
</script>

<template>
  <div v-if="article" class="container">
    <div class="lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12 xl:gap-16">
      <article class="min-w-0" data-pagefind-body>
        <h1 class="text-2xl sm:text-3xl lg:text-4xl text-primary-600 dark:text-primary-400 font-bold mt-0 mb-2 leading-tight wrap-break-words">
          {{ article.title }}
        </h1>
        <p class="text-sm text-neutral-500 mb-6">
          <span v-if="displayDate">{{ displayDate }} · </span>{{ reading.label }}
          <NuxtLink
            v-if="siblingHref"
            :to="siblingHref"
            class="ml-2 text-primary-600 dark:text-primary-400 hover:underline"
          >· {{ siblingLabel }}</NuxtLink>
        </p>

        <MobileToc :links="tocLinks" />

        <div class="max-w-none lg:prose-lg prose dark:prose-invert">
          <ContentRenderer :value="article">
            <template #empty>
              <p>No content found.</p>
            </template>
          </ContentRenderer>
        </div>

        <div data-pagefind-ignore="all">
          <NewsletterForm placement="blog" />

          <RelatedPosts :posts="related ?? []" />

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
            :lang="locale"
            loading="lazy"
            crossorigin="anonymous"
          />

          <PrevNext :prev="prev" :next="next" />
        </div>
      </article>

      <aside v-if="tocLinks.length" class="hidden lg:block">
        <div class="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
          <Toc :links="tocLinks" />
        </div>
      </aside>
    </div>
  </div>
</template>
