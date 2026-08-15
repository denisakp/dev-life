<script setup lang="ts">
defineI18nRoute({ locales: ["en"] });

import { META_DESCRIPTION, META_IMAGE } from "~/utils/config";
import courses, { type CourseMaterial } from "~/data/courses";
import { formatDate } from "~/utils/format-date";
import Pagination from "~/components/shared/Pagination.vue";

const perPage = 6;
const currentPage = ref(1);

const total = computed(() => courses.length);
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / perPage)));

const pagedCourses = computed(() =>
  courses.slice(
    (currentPage.value - 1) * perPage,
    currentPage.value * perPage
  )
);

const onPageChanged = (page: number) => {
  currentPage.value = page;
  if (import.meta.client) window.scrollTo(0, 0);
};

const typeLabel: Record<CourseMaterial["type"], string> = {
  syllabus: "Syllabus",
  lecture: "Lecture",
  td: "TD",
  lab: "TP",
  project: "Project",
  exam: "Exam",
};

const typeColor: Record<
  CourseMaterial["type"],
  "primary" | "neutral" | "success" | "warning" | "error" | "info"
> = {
  syllabus: "neutral",
  lecture: "primary",
  td: "info",
  lab: "success",
  project: "warning",
  exam: "error",
};

function isGithub(url: string): boolean {
  return /github\.com|gitlab\.com|bitbucket\.org/.test(url);
}

useSeoMeta({
  title: "Teaching",
  description:
    "University courses taught by Denis AKPAGNONITE: distributed programming, GIS, machine learning, databases.",
  ogTitle: "Teaching - Denis AKPAGNONITE",
  ogDescription: "University courses, lecture notes, exercises, and labs.",
  ogImage: META_IMAGE,
  ogUrl: "https://denisakp.me/teaching",
  twitterCard: "summary_large_image",
  twitterTitle: "Teaching - Denis AKPAGNONITE",
  twitterDescription: "University courses and supporting materials.",
  twitterImage: META_IMAGE,
});
</script>

<template>
  <main class="container py-8 lg:py-12">
    <header class="mb-8">
      <h1 class="text-3xl lg:text-4xl text-primary-600 dark:text-primary-400 font-bold mb-2">
        Teaching
      </h1>
      <p class="text-neutral-700 dark:text-neutral-300">
        Adjunct lecturer, university courses, with lecture notes, exercises (TD),
        lab work (TP), and supporting materials.
      </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <article
        v-for="course in pagedCourses"
        :key="course.slug"
        class="slick-border p-6 rounded-sm"
      >
        <header class="mb-3">
          <h2 class="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            {{ course.title }}
          </h2>
          <div class="flex flex-wrap gap-2 mb-2">
            <UBadge v-if="course.level" color="neutral" variant="subtle" size="sm">
              {{ course.level }}
            </UBadge>
            <UBadge v-if="course.semester" color="neutral" variant="subtle" size="sm">
              {{ course.semester }}
            </UBadge>
            <UBadge
              v-for="school in (course.schools ?? [])"
              :key="school"
              color="neutral"
              variant="subtle"
              size="sm"
              :ui="{ leadingIcon: 'size-3' }"
            >
              <UIcon name="i-lucide-school" class="size-3" />
              {{ school }}
            </UBadge>
            <UBadge color="neutral" variant="subtle" size="sm">
              {{ course.language.toUpperCase() }}
            </UBadge>
          </div>
          <p class="text-sm text-neutral-700 dark:text-neutral-300">
            {{ course.description }}
          </p>
        </header>

        <template v-if="course.materials.length">
          <h3 class="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mt-4 mb-2 uppercase tracking-wide">
            Materials ({{ course.materials.length }})
          </h3>
          <ul class="space-y-2">
            <li
              v-for="(m, i) in course.materials"
              :key="`${course.slug}-${i}`"
              class="flex flex-wrap items-center gap-2 py-2 border-b border-neutral-100 dark:border-neutral-900 last:border-0"
            >
              <UBadge :color="typeColor[m.type]" variant="subtle" size="sm" class="shrink-0">
                {{ typeLabel[m.type] }}
              </UBadge>
              <span class="text-sm text-neutral-900 dark:text-neutral-100 grow min-w-0 truncate">
                {{ m.title }}
              </span>
              <span v-if="m.date" class="text-xs text-neutral-500 shrink-0">
                {{ formatDate(m.date) }}
              </span>
              <UButton
                :to="m.url"
                target="_blank"
                rel="noopener"
                :color="isGithub(m.url) ? 'neutral' : 'primary'"
                variant="outline"
                size="xs"
                :icon="isGithub(m.url) ? 'i-simple-icons-github' : 'i-lucide-external-link'"
                class="shrink-0"
              >
                {{ isGithub(m.url) ? "Code" : "Open" }}
              </UButton>
            </li>
          </ul>
        </template>

        <p v-else class="text-sm text-neutral-500 italic mt-2">
          Materials coming soon.
        </p>
      </article>
    </div>

    <Pagination
      v-if="totalPages > 1"
      class="mt-8"
      :total="total"
      :total-pages="totalPages"
      :per-page="perPage"
      :current-page="currentPage"
      @page-changed="onPageChanged"
    />
  </main>
</template>
