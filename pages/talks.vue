<script setup lang="ts">
defineI18nRoute({ locales: ["en"] });

import { META_DESCRIPTION, META_IMAGE } from "~/utils/config";
import talks from "~/data/talks";
import { formatDate } from "~/utils/format-date";
import Pagination from "~/components/shared/Pagination.vue";

const perPage = 5;
const currentPage = ref(1);

const sortedTalks = computed(() =>
  [...talks].sort((a, b) => b.date.localeCompare(a.date))
);

const total = computed(() => sortedTalks.value.length);
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / perPage)));

const pagedTalks = computed(() =>
  sortedTalks.value.slice(
    (currentPage.value - 1) * perPage,
    currentPage.value * perPage
  )
);

const byYear = computed(() => {
  const groups: Record<string, typeof pagedTalks.value> = {};
  for (const talk of pagedTalks.value) {
    const year = talk.date.slice(0, 4);
    if (!groups[year]) groups[year] = [];
    groups[year].push(talk);
  }
  return groups;
});

const years = computed(() =>
  Object.keys(byYear.value).sort((a, b) => b.localeCompare(a))
);

const onPageChanged = (page: number) => {
  currentPage.value = page;
  if (import.meta.client) window.scrollTo(0, 0);
};

useSeoMeta({
  title: "Talks & Workshops",
  description:
    "Speaking engagements, workshops, conference talks, and meetup presentations by Denis AKPAGNONITE.",
  ogTitle: "Talks & Workshops - Denis AKPAGNONITE",
  ogDescription: "Speaking engagements, workshops, conference talks, and meetup presentations.",
  ogImage: META_IMAGE,
  ogUrl: "https://denisakp.me/talks",
  twitterCard: "summary_large_image",
  twitterTitle: "Talks & Workshops - Denis AKPAGNONITE",
  twitterDescription: "Speaking engagements, workshops, conference talks, and meetup presentations.",
  twitterImage: META_IMAGE,
});
</script>

<template>
  <main class="container py-8 lg:py-12">
    <header class="mb-8">
      <h1 class="text-3xl lg:text-4xl text-primary-600 dark:text-primary-400 font-bold mb-2">
        Talks &amp; Workshops
      </h1>
      <p class="text-neutral-700 dark:text-neutral-300">
        Conference talks, workshops, meetup presentations, and podcast appearances.
      </p>
    </header>

    <template v-if="total > 0">
      <section v-for="year in years" :key="year" class="mb-10">
        <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400 mb-4">
          {{ year }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article
            v-for="talk in byYear[year]"
            :key="`${talk.date}-${talk.title}`"
            class="slick-border p-4 rounded-sm"
          >
            <UBadge
              :color="talk.type === 'workshop' ? 'primary' : 'neutral'"
              variant="subtle"
              size="sm"
              :icon="talk.type === 'workshop' ? 'i-lucide-wrench' : 'i-lucide-mic'"
              class="mb-2"
            >
              {{ talk.type === 'workshop' ? 'Workshop' : 'Talk' }}
            </UBadge>
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
              {{ talk.title }}
            </h3>
            <div class="text-sm text-neutral-500 mb-2">
              {{ talk.venue }} · {{ formatDate(talk.date) }}
            </div>
            <p
              v-if="talk.description"
              class="text-neutral-700 dark:text-neutral-300 mb-3"
            >
              {{ talk.description }}
            </p>
            <div
              v-if="talk.slidesUrl || talk.recordingUrl || talk.repoUrl"
              class="flex flex-wrap gap-2"
            >
              <UButton
                v-if="talk.slidesUrl"
                :to="talk.slidesUrl"
                target="_blank"
                rel="noopener"
                color="neutral"
                variant="outline"
                size="sm"
                icon="i-lucide-presentation"
              >
                Slides
              </UButton>
              <UButton
                v-if="talk.recordingUrl"
                :to="talk.recordingUrl"
                target="_blank"
                rel="noopener"
                color="neutral"
                variant="outline"
                size="sm"
                icon="i-lucide-video"
              >
                Recording
              </UButton>
              <UButton
                v-if="talk.repoUrl"
                :to="talk.repoUrl"
                target="_blank"
                rel="noopener"
                color="neutral"
                variant="outline"
                size="sm"
                icon="i-lucide-code"
              >
                Code
              </UButton>
            </div>
          </article>
        </div>
      </section>

      <Pagination
        v-if="totalPages > 1"
        :total="total"
        :total-pages="totalPages"
        :per-page="perPage"
        :current-page="currentPage"
        @page-changed="onPageChanged"
      />
    </template>

    <template v-else>
      <div class="text-center py-16">
        <p class="text-lg text-neutral-700 dark:text-neutral-300 mb-4">
          No talks yet, but I'd love to.
        </p>
        <UButton to="/about#contact" color="primary">Get in touch</UButton>
      </div>
    </template>
  </main>
</template>
