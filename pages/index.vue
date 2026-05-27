<script setup>
import { META_DESCRIPTION, META_IMAGE } from "~/utils/config";
import topics from "~/data/topics";
import projects from "~/data/projects";

const { data: latestPosts } = await useAsyncData("latest-posts", () =>
  queryCollection("content")
    .select("path", "title", "description", "date", "tags")
    .order("date", "DESC")
    .limit(3)
    .all()
);

const featuredProjects = computed(() => projects.filter((p) => p.featured));

const { data: topicCounts } = await useAsyncData("topic-counts", async () => {
  const posts = await queryCollection("content").select("topics").all();
  const counts = {};
  for (const p of posts) {
    for (const t of (p.topics ?? [])) {
      counts[t] = (counts[t] ?? 0) + 1;
    }
  }
  return counts;
});

const popularTopics = computed(() => {
  const counts = topicCounts.value ?? {};
  return topics
    .filter((t) => (counts[t.slug] ?? 0) > 0)
    .sort((a, b) => (counts[b.slug] ?? 0) - (counts[a.slug] ?? 0))
    .slice(0, 6);
});

useSeoMeta({
  title: "Welcome",
  description: META_DESCRIPTION,
  ogTitle: "Welcome - Denis AKPAGNONITE",
  ogDescription: META_DESCRIPTION,
  ogImage: META_IMAGE,
  ogUrl: "https://denisakp.me",
  twitterCard: "summary_large_image",
  twitterTitle: "Welcome - Denis AKPAGNONITE",
  twitterDescription: META_DESCRIPTION,
  twitterImage: META_IMAGE,
});
</script>

<template>
  <div>
    <!-- Hero (compact) -->
    <section class="container pt-4 pb-2 lg:pt-6 lg:pb-2 text-center">
      <h1 class="text-2xl lg:text-3xl text-primary-600 dark:text-primary-400 font-bold mb-1">
        &lt; Denis AKPAGNONITE /&gt;
      </h1>
      <p class="text-sm text-neutral-700 dark:text-neutral-300 mb-1">
        Software Engineer · Cloud Native · DevOps/SRE
      </p>
      <p class="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-3">
        I build and write about distributed systems, observability,
        and supply-chain security.
      </p>
      <div class="flex flex-wrap justify-center items-center gap-2 mb-2">
        <UButton to="/blog" color="primary" size="sm" icon="i-lucide-book-open">
          Read the blog
        </UButton>
        <UButton to="/about" color="neutral" variant="outline" size="sm" icon="i-lucide-user">
          About me
        </UButton>
      </div>
    </section>

    <!-- Latest writing -->
    <section v-if="(latestPosts ?? []).length" class="container mt-2 mb-6 lg:mt-3 lg:mb-8">
      <div class="flex items-baseline justify-between mb-3">
        <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400">
          Latest writing
        </h2>
        <NuxtLink to="/blog"
          class="text-sm text-primary-600 dark:text-primary-400 hover:underline">
          See all →
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Post v-for="post in (latestPosts ?? [])" :key="post.path" :post="post" />
      </div>
    </section>

    <!-- Explore by topic (single line, scroll horizontally on overflow) -->
    <section v-if="popularTopics.length" class="container my-6 lg:my-8">
      <div class="flex items-baseline justify-between mb-3">
        <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400">
          Explore by topic
        </h2>
        <NuxtLink to="/topics"
          class="text-sm text-primary-600 dark:text-primary-400 hover:underline">
          See all →
        </NuxtLink>
      </div>
      <div class="flex flex-nowrap gap-2 overflow-x-auto -mx-4 px-4 pb-1">
        <ULink
          v-for="topic in popularTopics"
          :key="topic.slug"
          :to="`/topics/${topic.slug}`"
          class="inline-flex shrink-0"
        >
          <UBadge
            color="neutral"
            variant="subtle"
            size="lg"
            class="gap-2 hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors"
          >
            <nuxt-img
              v-if="topic.iconPath"
              class="h-4 w-4 shrink-0"
              :src="topic.iconPath"
              :alt="`${topic.title} logo`"
            />
            {{ topic.title }}
            <span class="ml-1 text-xs opacity-60">
              {{ topicCounts?.[topic.slug] }}
            </span>
          </UBadge>
        </ULink>
      </div>
    </section>

    <!-- Featured projects -->
    <section v-if="featuredProjects.length" class="container my-6 lg:my-8">
      <div class="flex items-baseline justify-between mb-3">
        <h2 class="text-xl font-bold text-primary-600 dark:text-primary-400">
          Featured projects
        </h2>
        <NuxtLink to="/projects"
          class="text-sm text-primary-600 dark:text-primary-400 hover:underline">
          See all →
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Project v-for="project in featuredProjects" :key="project.title" :project="project" />
      </div>
    </section>
  </div>
</template>
