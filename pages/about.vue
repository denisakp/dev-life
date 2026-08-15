<script setup lang="ts">
import { META_DESCRIPTION, META_IMAGE } from "~/utils/config";
import talks from "~/data/talks";
import { formatDate } from "~/utils/format-date";
import NewsletterForm from "~/components/shared/NewsletterForm.vue";

const { locale } = useI18n();

const certifications = [
  { name: "Kubernetes and Cloud Native Associate (KCNA)", badgeId: "41b1229b-a850-47d5-9f63-ea71843026b3" },
  { name: "FinOps Certified Practitioner", badgeId: "c1ebfa20-4f6d-474f-ac33-726ca3b70679" },
  { name: "AWS Certified Cloud Practitioner", badgeId: "1a490efa-6214-427a-964a-eca1e6898685" },
  { name: "Google Cloud Digital Leader", badgeId: "7bc1ca8f-86f9-400b-8dad-5fbfe1a7ce3f" },
  { name: "GitHub Foundations", badgeId: "8a2601c2-bce0-43f1-8456-95983959d156" },
];

useHead({
  script: [
    {
      src: "https://cdn.credly.com/assets/utilities/embed.js",
      async: true,
      tagPosition: "bodyClose",
    },
  ],
});

// email hidden in ROT47 (matches pages/index.vue convention)
const email = `2<A28?@?:E65o8>2:=]4@>`;

const latestTalks = computed(() =>
  [...talks].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
);

useSeoMeta({
  title: "About",
  description: META_DESCRIPTION,
  ogTitle: "About - Denis AKPAGNONITE",
  ogDescription: META_DESCRIPTION,
  ogImage: META_IMAGE,
  ogUrl: "https://denisakp.me/about",
  twitterCard: "summary_large_image",
  twitterTitle: "About - Denis AKPAGNONITE",
  twitterDescription: META_DESCRIPTION,
  twitterImage: META_IMAGE,
});
</script>

<template>
  <main class="container py-8 lg:py-12">
    <!-- Section 1: Header -->
    <header class="flex flex-col items-center text-center gap-4 mb-12">
      <div
        class="size-32 rounded-full bg-primary-500 text-white flex items-center justify-center text-4xl font-bold shrink-0"
        aria-label="Denis AKPAGNONITE"
      >DA</div>
      <div>
        <h1 class="text-3xl lg:text-4xl text-primary-600 dark:text-primary-400 font-bold mb-2">
          Denis AKPAGNONITE
        </h1>
        <p class="text-lg text-neutral-700 dark:text-neutral-300">
          Software Engineer 👨🏽‍💻 | Cloud Native Engineer ☁️ | Thinker ⎈
        </p>
      </div>
    </header>

    <!-- Section 2: Bio (locale-aware) -->
    <template v-if="locale === 'fr'">
      <section class="prose dark:prose-invert max-w-none mb-12 prose-p:text-justify prose-p:hyphens-auto">
        <p>
          Je suis Denis, ingénieur logiciel spécialisé dans les systèmes cloud-natifs et
          distribués. Je passe mon temps à concevoir et maintenir des services backend,
          à améliorer les chaînes de livraison et à accompagner les équipes dans
          l'adoption de pratiques DevSecOps pragmatiques.
        </p>
        <p>
          Je partage mes apprentissages via des conférences, des articles et des projets
          open source, avec une approche pragmatique, curieuse, et orientée maintenabilité
          long terme.
        </p>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
          En ce moment
        </h2>
        <p class="text-neutral-700 dark:text-neutral-300">
          Architecte DevOps chez <span class="highlighted">Digi.job</span>, je travaille
          sur des projets autour du cloud-native et des systèmes distribués. En dehors du
          travail, je développe des outils open source comme
          <NuxtLink to="/projects" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">
            Sentinel, Ogoune et Obscura
          </NuxtLink>.
        </p>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
          👨🏽‍🏫 Enseignement
        </h2>
        <p class="text-neutral-700 dark:text-neutral-300 mb-3">
          Vacataire universitaire, j'enseigne les cours suivants :
        </p>
        <ul class="list-disc ml-4 text-neutral-700 dark:text-neutral-300 space-y-1">
          <li>SIG &amp; modélisation par apprentissage automatique</li>
          <li>Programmation distribuée en Java</li>
          <li>Fondamentaux des bases de données</li>
          <li>Introduction aux SGBD</li>
        </ul>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
          🛠️ Compétences
        </h2>
        <ul class="list-disc ml-4 text-neutral-700 dark:text-neutral-300 space-y-1">
          <li><b>Langages</b> : Go, Python, TypeScript, C/C++, Zig</li>
          <li><b>CI/CD</b> : GitLab CI, GitHub Actions</li>
          <li><b>DevOps &amp; Cloud</b> : Kubernetes, Terraform, Ansible, ArgoCD, Helm</li>
          <li><b>SecOps &amp; IAM</b> : OWASP, Trivy, SonarQube, Keycloak, OpenFGA</li>
          <li><b>Observabilité</b> : OpenTelemetry, Grafana, Tempo, Loki, Mimir, Prometheus</li>
        </ul>
      </section>
    </template>

    <template v-else>
      <section class="prose dark:prose-invert max-w-none mb-12 prose-p:text-justify prose-p:hyphens-auto">
        <p>
          I'm Denis, a software engineer working mainly on cloud-native and distributed systems.
          I spend my time building and maintaining backend services, improving delivery pipelines,
          and helping teams adopt practical DevSecOps practices.
        </p>
        <p>
          I share lessons learned through talks, writing, and open-source projects, and I try to
          approach engineering with pragmatism, curiosity, and a focus on long-term maintainability.
        </p>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
          Currently
        </h2>
        <p class="text-neutral-700 dark:text-neutral-300">
          I'm a DevOps Architect at
          <span class="highlighted">Digi.job</span>, working on various projects involving
          cloud-native and distributed systems. Outside of work I build open-source tools like
          <NuxtLink to="/projects" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">
            Sentinel, Ogoune, and Obscura
          </NuxtLink>.
        </p>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
          👨🏽‍🏫 Teaching
        </h2>
        <p class="text-neutral-700 dark:text-neutral-300 mb-3">
          Adjunct lecturer - I teach the following courses at university level:
        </p>
        <ul class="list-disc ml-4 text-neutral-700 dark:text-neutral-300 space-y-1">
          <li>GIS &amp; Machine Learning Modeling</li>
          <li>Distributed Programming with Java</li>
          <li>Database Fundamentals</li>
          <li>Introduction to DBMS</li>
        </ul>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
          🛠️ Skills
        </h2>
        <ul class="list-disc ml-4 text-neutral-700 dark:text-neutral-300 space-y-1">
          <li><b>Programming languages</b>: Go, Python, TypeScript, C/C++, Zig</li>
          <li><b>CI/CD</b>: GitLab CI, GitHub Actions</li>
          <li><b>DevOps & Cloud</b>: Kubernetes, Terraform, Ansible, ArgoCD, Helm</li>
          <li><b>SecOps & IAM</b>: OWASP, Trivy, SonarQube, Keycloak, OpenFGA</li>
          <li><b>Logging & Monitoring</b>: OpenTelemetry, Grafana, Tempo, Loki, Mimir, Prometheus</li>
        </ul>
      </section>
    </template>

    <!-- Section: Certifications -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
        🏅 Certifications
      </h2>
      <ClientOnly>
        <div class="flex flex-wrap gap-4 justify-center sm:justify-start">
          <div
            v-for="cert in certifications"
            :key="cert.name"
            class="flex flex-col items-center"
          >
            <div
              data-iframe-width="150"
              data-iframe-height="270"
              :data-share-badge-id="cert.badgeId"
              data-share-badge-host="https://www.credly.com"
            ></div>
            <span class="sr-only">{{ cert.name }}</span>
          </div>
        </div>
      </ClientOnly>
    </section>

    <!-- Section 5: Talks teaser -->
    <section class="mb-12">
      <div class="flex items-baseline justify-between mb-4">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400">
          🎤 Talks
        </h2>
        <NuxtLink to="/talks" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">
          See all →
        </NuxtLink>
      </div>
      <ul class="space-y-3">
        <li
          v-for="talk in latestTalks"
          :key="`${talk.date}-${talk.title}`"
          class="text-neutral-700 dark:text-neutral-300"
        >
          <div class="font-medium text-neutral-900 dark:text-neutral-100">
            {{ talk.title }}
          </div>
          <div class="text-sm text-neutral-500">
            {{ talk.venue }} · {{ formatDate(talk.date) }}
          </div>
        </li>
      </ul>
    </section>

    <!-- Section 6: Contact CTA -->
    <section id="contact" class="mb-12">
      <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
        📞 Get in touch
      </h2>
      <div class="flex space-x-4 text-2xl mb-3">
        <NuxtLink to="https://github.com/denisakp" target="_blank" aria-label="GitHub">
          <UIcon name="i-simple-icons-github" />
        </NuxtLink>
        <NuxtLink to="https://x.com/N1BBzerLZXT" target="_blank" aria-label="X (Twitter)">
          <UIcon name="i-simple-icons-x" />
        </NuxtLink>
        <NuxtLink to="https://linkedin.com/in/denis-akpagnonite" target="_blank" aria-label="LinkedIn">
          <UIcon name="i-simple-icons-linkedin" />
        </NuxtLink>
      </div>
      <p class="text-sm text-neutral-600 dark:text-neutral-400">
        Email: <span class="font-mono">{{ email }}</span> (ROT47-encoded, decode at
        <NuxtLink to="https://rot47.net" target="_blank" class="text-primary-600 dark:text-primary-400 hover:underline">
          rot47.net
        </NuxtLink>)
      </p>
    </section>

    <NewsletterForm placement="about" />
  </main>
</template>
