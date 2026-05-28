<script setup lang="ts">
const description =
  "What I'm focused on right now — current projects, work, and reading list.";

useSeoMeta({
  title: "Now",
  description,
  ogTitle: "Now — Denis AKPAGNONITE",
  ogDescription: description,
  ogUrl: "https://denisakp.me/now",
  twitterCard: "summary_large_image",
  twitterTitle: "Now — Denis AKPAGNONITE",
  twitterDescription: description,
});

defineOgImage("Default", { title: "Now" });
</script>

<template>
  <main class="container py-8 lg:py-12">
    <header class="mb-8">
      <h1 class="text-3xl lg:text-4xl text-primary-600 dark:text-primary-400 font-bold mb-2">
        What I'm up to now
      </h1>
      <p class="text-sm text-neutral-500">
        Last updated: 2026-05-28
      </p>
      <p class="text-neutral-600 dark:text-neutral-400 mt-3">
        This is a <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary-600 dark:text-primary-400 hover:underline"
        >/now page</a> — a short snapshot of what has my attention this month.
      </p>
    </header>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3">
        Current Focus
      </h2>
      <p class="text-neutral-700 dark:text-neutral-300">
        Working on cloud-native platform tooling at
        <span class="highlighted">Digi.job</span>: hardening multi-cluster GitOps
        pipelines, reducing toil in incident response, and pushing more
        OpenTelemetry coverage into the stack.
      </p>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3">
        Active Projects
      </h2>
      <ul class="list-disc ml-6 text-neutral-700 dark:text-neutral-300 space-y-1">
        <li>
          <b>This blog</b> — phase 005 (engagement surfaces) just landed. See
          <NuxtLink to="/blog" class="text-primary-600 dark:text-primary-400 hover:underline">/blog</NuxtLink>.
        </li>
        <li>
          <b>Open-source side projects</b> — small contributions to my own tools
          (<NuxtLink to="/projects" class="text-primary-600 dark:text-primary-400 hover:underline">Sentinel, Ogoune, Obscura</NuxtLink>)
          as time allows.
        </li>
        <li>
          <b>Teaching</b> — preparing course material for the spring semester
          (see <NuxtLink to="/teaching" class="text-primary-600 dark:text-primary-400 hover:underline">/teaching</NuxtLink>).
        </li>
      </ul>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3">
        Currently Reading
      </h2>
      <ul class="list-disc ml-6 text-neutral-700 dark:text-neutral-300 space-y-1">
        <li><i>Designing Data-Intensive Applications</i> — Martin Kleppmann (re-read).</li>
        <li><i>Database Internals</i> — Alex Petrov.</li>
        <li>Various RFCs and incident write-ups from public post-mortems.</li>
      </ul>
    </section>

    <p class="text-sm text-neutral-500 italic">
      Inspired by <a
        href="https://nownownow.com"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:underline"
      >nownownow.com</a>. Updated roughly once a month.
    </p>
  </main>
</template>
