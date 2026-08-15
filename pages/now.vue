<script setup lang="ts">
const { locale } = useI18n();

const description =
  "What I'm focused on right now: current projects, work, and reading list.";

useSeoMeta({
  title: "Now",
  description,
  ogTitle: "Now - Denis AKPAGNONITE",
  ogDescription: description,
  ogUrl: "https://denisakp.me/now",
  twitterCard: "summary_large_image",
  twitterTitle: "Now - Denis AKPAGNONITE",
  twitterDescription: description,
});

defineOgImage("Default", { title: "Now" });
</script>

<template>
  <main class="container py-8 lg:py-12">
    <template v-if="locale === 'fr'">
      <header class="mb-8">
        <h1 class="text-3xl lg:text-4xl text-primary-600 dark:text-primary-400 font-bold mb-2">
          Ce qui m'occupe en ce moment
        </h1>
        <p class="text-sm text-neutral-500">Dernière mise à jour : 2026-05-28</p>
        <p class="text-neutral-600 dark:text-neutral-400 mt-3">
          C'est une <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 hover:underline">page /now</a>, un court instantané de ce qui retient mon attention ce mois-ci.
        </p>
      </header>

      <section class="mb-10">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3">Focus actuel</h2>
        <p class="text-neutral-700 dark:text-neutral-300">
          Je travaille sur l'outillage de la plateforme cloud-native chez
          <span class="highlighted">Digi.job</span> : durcissement des pipelines GitOps
          multi-clusters, réduction du toil pendant les incidents, et déploiement de
          couverture OpenTelemetry plus large dans la stack.
        </p>
      </section>

      <section class="mb-10">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3">Projets actifs</h2>
        <ul class="list-disc ml-6 text-neutral-700 dark:text-neutral-300 space-y-1">
          <li><b>Ce blog</b> : la phase 006 (analytics privacy + i18n EN/FR) vient d'arriver. Voir <NuxtLink to="/fr/blog" class="text-primary-600 dark:text-primary-400 hover:underline">/fr/blog</NuxtLink>.</li>
          <li><b>Projets open source</b> : petites contributions à mes propres outils (<NuxtLink to="/projects" class="text-primary-600 dark:text-primary-400 hover:underline">Sentinel, Ogoune, Obscura</NuxtLink>) quand le temps le permet.</li>
          <li><b>Enseignement</b> : préparation des supports pour le semestre de printemps (voir <NuxtLink to="/teaching" class="text-primary-600 dark:text-primary-400 hover:underline">/teaching</NuxtLink>).</li>
        </ul>
      </section>

      <section class="mb-10">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3">Lectures en cours</h2>
        <ul class="list-disc ml-6 text-neutral-700 dark:text-neutral-300 space-y-1">
          <li><i>Designing Data-Intensive Applications</i>, Martin Kleppmann (relecture).</li>
          <li><i>Database Internals</i>, Alex Petrov.</li>
          <li>Divers RFC et post-mortems d'incidents publics.</li>
        </ul>
      </section>

      <p class="text-sm text-neutral-500 italic">
        Inspiré par <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" class="hover:underline">nownownow.com</a>. Mis à jour environ une fois par mois.
      </p>
    </template>

    <template v-else>
      <header class="mb-8">
        <h1 class="text-3xl lg:text-4xl text-primary-600 dark:text-primary-400 font-bold mb-2">
          What I'm up to now
        </h1>
        <p class="text-sm text-neutral-500">Last updated: 2026-05-28</p>
        <p class="text-neutral-600 dark:text-neutral-400 mt-3">
          This is a <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 hover:underline">/now page</a>, a short snapshot of what has my attention this month.
        </p>
      </header>

      <section class="mb-10">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3">Current Focus</h2>
        <p class="text-neutral-700 dark:text-neutral-300">
          Working on cloud-native platform tooling at
          <span class="highlighted">Digi.job</span>: hardening multi-cluster GitOps
          pipelines, reducing toil in incident response, and pushing more
          OpenTelemetry coverage into the stack.
        </p>
      </section>

      <section class="mb-10">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3">Active Projects</h2>
        <ul class="list-disc ml-6 text-neutral-700 dark:text-neutral-300 space-y-1">
          <li><b>This blog</b>: phase 005 (engagement surfaces) just landed. See <NuxtLink to="/blog" class="text-primary-600 dark:text-primary-400 hover:underline">/blog</NuxtLink>.</li>
          <li><b>Open-source side projects</b>: small contributions to my own tools (<NuxtLink to="/projects" class="text-primary-600 dark:text-primary-400 hover:underline">Sentinel, Ogoune, Obscura</NuxtLink>) as time allows.</li>
          <li><b>Teaching</b>: preparing course material for the spring semester (see <NuxtLink to="/teaching" class="text-primary-600 dark:text-primary-400 hover:underline">/teaching</NuxtLink>).</li>
        </ul>
      </section>

      <section class="mb-10">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3">Currently Reading</h2>
        <ul class="list-disc ml-6 text-neutral-700 dark:text-neutral-300 space-y-1">
          <li><i>Designing Data-Intensive Applications</i>, Martin Kleppmann (re-read).</li>
          <li><i>Database Internals</i>, Alex Petrov.</li>
          <li>Various RFCs and incident write-ups from public post-mortems.</li>
        </ul>
      </section>

      <p class="text-sm text-neutral-500 italic">
        Inspired by <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" class="hover:underline">nownownow.com</a>. Updated roughly once a month.
      </p>
    </template>
  </main>
</template>
