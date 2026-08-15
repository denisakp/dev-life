<script setup lang="ts">
const { locale } = useI18n();

const description =
  "What I use day-to-day: editor, hardware, dotfiles, cloud, observability, and AI tooling.";

useSeoMeta({
  title: "Uses",
  description,
  ogTitle: "Uses - Denis AKPAGNONITE",
  ogDescription: description,
  ogUrl: "https://denisakp.me/uses",
  twitterCard: "summary_large_image",
  twitterTitle: "Uses - Denis AKPAGNONITE",
  twitterDescription: description,
});

defineOgImage("Default", { title: "Uses" });
</script>

<template>
  <main class="container py-8 lg:py-12">
    <template v-if="locale === 'fr'">
      <header class="mb-10">
        <h1 class="text-3xl lg:text-4xl text-primary-600 dark:text-primary-400 font-bold mb-2">
          Ce que j'utilise
        </h1>
        <p class="text-neutral-600 dark:text-neutral-400">
          Un aperçu des outils, du matériel et des services que j'utilise le plus.
          Inspiré par <a href="https://uses.tech" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 hover:underline">uses.tech</a>.
        </p>
      </header>

      <section class="mb-10">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3">Éditeur &amp; Shell</h2>
        <ul class="list-disc ml-6 text-neutral-700 dark:text-neutral-300 space-y-1">
          <li><b>Éditeur</b> : <a href="https://zed.dev" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 hover:underline">Zed</a> au quotidien et Vim pour les édits rapides.</li>
          <li><b>Terminal</b> : <a href="https://app.warp.dev/referral/9DZR3N" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 hover:underline">Warp</a>.</li>
          <li><b>Shell</b> : zsh.</li>
        </ul>
      </section>

      <section class="mb-10">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3">Matériel</h2>
        <ul class="list-disc ml-6 text-neutral-700 dark:text-neutral-300 space-y-1">
          <li><b>Machine principale</b> : MacBook Pro M4 Pro.</li>
          <li><b>Clavier</b> : mécanique low-profile.</li>
          <li><b>Audio</b> : AirPods Pro 3 au quotidien. Sony WH-CH720N (bleu) pour les longues sessions au bureau.</li>
          <li><b>Écran externe</b> : Samsung U32R590CWU, 32" UHD 4K incurvé.</li>
        </ul>
      </section>

      <section class="mb-10">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3">Cloud &amp; Observabilité</h2>
        <ul class="list-disc ml-6 text-neutral-700 dark:text-neutral-300 space-y-1">
          <li><b>Orchestration de conteneurs</b> : Kubernetes, Helm, ArgoCD, Flux.</li>
          <li><b>Service mesh &amp; réseau</b> : Istio, Linkerd, Cilium.</li>
          <li><b>Infrastructure as Code</b> : Terraform, Ansible, Crossplane.</li>
          <li><b>CI/CD</b> : GitHub Actions, GitLab CI, Tekton.</li>
          <li><b>Télémétrie</b> : OpenTelemetry, Prometheus, Grafana, Tempo, Loki, Mimir, Jaeger, Fluent Bit.</li>
          <li><b>Politique &amp; sécurité runtime</b> : OPA, Kyverno, Falco, cert-manager.</li>
          <li><b>Chaîne d'approvisionnement &amp; scan</b> : Trivy, SonarQube, recommandations OWASP, Cosign, Sigstore.</li>
          <li><b>Identité &amp; autorisation</b> : Keycloak, OpenFGA.</li>
          <li><b>Sauvegarde &amp; DR</b> : Velero, <a href="https://github.com/denisakp/sentinel" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 hover:underline">Sentinel</a>.</li>
          <li><b>Registry &amp; fonctions</b> : Harbor, Knative.</li>
        </ul>
      </section>

      <section class="mb-10">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3">Outils d'IA</h2>
        <ul class="list-disc ml-6 text-neutral-700 dark:text-neutral-300 space-y-1">
          <li><b>Assistant de code</b> : Claude Code dans le terminal pour le pair-programming et les refactorings.</li>
          <li><b>Chat</b> : Claude pour la réflexion long format et la relecture d'écrits.</li>
          <li><b>Modèles locaux</b> : Ollama pour l'expérimentation hors ligne.</li>
        </ul>
      </section>

      <p class="text-sm text-neutral-500 italic">
        Cette liste est opinionnée et évolue lentement, voir <NuxtLink to="/fr/now" class="text-primary-600 dark:text-primary-400 hover:underline">/now</NuxtLink> pour mes priorités du moment.
      </p>
    </template>

    <template v-else>
      <header class="mb-10">
        <h1 class="text-3xl lg:text-4xl text-primary-600 dark:text-primary-400 font-bold mb-2">
          What I use
        </h1>
        <p class="text-neutral-600 dark:text-neutral-400">
          A snapshot of the tools, hardware, and services I reach for most days.
          Inspired by <a href="https://uses.tech" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 hover:underline">uses.tech</a>.
        </p>
      </header>

      <section class="mb-10">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3">Editor &amp; Shell</h2>
        <ul class="list-disc ml-6 text-neutral-700 dark:text-neutral-300 space-y-1">
          <li><b>Editor</b>: <a href="https://zed.dev" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 hover:underline">Zed</a> for day-to-day work and Vim for quick edits.</li>
          <li><b>Terminal</b>: <a href="https://app.warp.dev/referral/9DZR3N" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 hover:underline">Warp</a>.</li>
          <li><b>Shell</b>: zsh.</li>
        </ul>
      </section>

      <section class="mb-10">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3">Hardware</h2>
        <ul class="list-disc ml-6 text-neutral-700 dark:text-neutral-300 space-y-1">
          <li><b>Main machine</b>: MacBook Pro M4 Pro.</li>
          <li><b>Keyboard</b>: low-profile mechanical.</li>
          <li><b>Audio</b>: AirPods Pro 3 day to day. Sony WH-CH720N (blue) for long desk sessions.</li>
          <li><b>External display</b>: Samsung U32R590CWU 32" UHD 4K curved.</li>
        </ul>
      </section>

      <section class="mb-10">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3">Cloud &amp; Observability</h2>
        <ul class="list-disc ml-6 text-neutral-700 dark:text-neutral-300 space-y-1">
          <li><b>Container orchestration</b>: Kubernetes, Helm, ArgoCD, Flux.</li>
          <li><b>Service mesh &amp; networking</b>: Istio, Linkerd, Cilium.</li>
          <li><b>Infrastructure as code</b>: Terraform, Ansible, Crossplane.</li>
          <li><b>CI/CD</b>: GitHub Actions, GitLab CI, Tekton.</li>
          <li><b>Telemetry</b>: OpenTelemetry, Prometheus, Grafana, Tempo, Loki, Mimir, Jaeger, Fluent Bit.</li>
          <li><b>Policy &amp; runtime security</b>: OPA, Kyverno, Falco, cert-manager.</li>
          <li><b>Supply chain &amp; scanning</b>: Trivy, SonarQube, OWASP guidance, Cosign, Sigstore.</li>
          <li><b>Identity &amp; authZ</b>: Keycloak, OpenFGA.</li>
          <li><b>Backup &amp; DR</b>: Velero, <a href="https://github.com/denisakp/sentinel" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 hover:underline">Sentinel</a>.</li>
          <li><b>Registry &amp; functions</b>: Harbor, Knative.</li>
        </ul>
      </section>

      <section class="mb-10">
        <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3">AI Tooling</h2>
        <ul class="list-disc ml-6 text-neutral-700 dark:text-neutral-300 space-y-1">
          <li><b>Coding assistant</b>: Claude Code in the terminal for pair-programming and refactors.</li>
          <li><b>Chat</b>: Claude for long-form thinking and writing review.</li>
          <li><b>Local models</b>: Ollama runs for offline experimentation.</li>
        </ul>
      </section>

      <p class="text-sm text-neutral-500 italic">
        This list is opinionated and evolves slowly, see <NuxtLink to="/now" class="text-primary-600 dark:text-primary-400 hover:underline">/now</NuxtLink> for what I'm focused on this month.
      </p>
    </template>
  </main>
</template>
