<script setup lang="ts">
import { aggregateTags } from "~/utils/normalize-tag";

const { locale, t } = useI18n();
const isFr = computed(() => locale.value === "fr");
const tagPathPrefix = computed(() => (isFr.value ? "/fr/tags/" : "/tags/"));

const { data: tags } = await useAsyncData(
  () => `tags-index-${locale.value}`,
  async () => {
    const posts = await queryCollection("content")
      .where("path", isFr.value ? "LIKE" : "NOT LIKE", "%.fr")
      .select("tags")
      .all();
    return aggregateTags(posts);
  },
  { watch: [locale] }
);

useSeoMeta({
  title: () => t("tags.indexTitle"),
  description: () => t("tags.browse"),
  ogTitle: () => t("tags.indexTitle") + " — Denis AKPAGNONITE",
  ogDescription: () => t("tags.browse"),
  ogUrl: () => (isFr.value ? "https://denisakp.me/fr/tags" : "https://denisakp.me/tags"),
  twitterCard: "summary_large_image",
});

defineOgImage("Default", { title: "Tags" });
</script>

<template>
  <div class="container py-8 lg:py-12">
    <header class="mb-8">
      <h1 class="text-3xl lg:text-4xl text-primary-600 dark:text-primary-400 font-bold mb-2">
        {{ t('tags.indexTitle') }}
      </h1>
      <p class="text-neutral-600 dark:text-neutral-400">
        {{ t('tags.browse') }}
      </p>
    </header>

    <template v-if="(tags ?? []).length === 0">
      <p class="text-neutral-600 dark:text-neutral-400 italic">
        {{ isFr ? t('tags.emptyFr') : 'No tags yet.' }}
      </p>
    </template>
    <template v-else>
      <div class="flex flex-wrap gap-3">
        <ULink
          v-for="tag in tags ?? []"
          :key="tag.slug"
          :to="tagPathPrefix + tag.slug"
          class="inline-flex"
        >
          <UBadge
            color="neutral"
            variant="subtle"
            size="lg"
            class="gap-2 hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors"
          >
            <span>{{ tag.label }}</span>
            <span class="text-xs opacity-60">{{ tag.count }}</span>
          </UBadge>
        </ULink>
      </div>
    </template>
  </div>
</template>
