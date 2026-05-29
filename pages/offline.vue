<script setup lang="ts">
useSeoMeta({
  title: "Offline",
  robots: "noindex, nofollow",
});

// SW navigateFallback hits /offline regardless of locale.
// Detect the would-be locale from referrer pathname (best-effort).
const isFr = ref(false);

onMounted(() => {
  try {
    const url = new URL(document.referrer || window.location.href);
    isFr.value = url.pathname.startsWith("/fr");
  } catch {
    // ignore
  }
});
</script>

<template>
  <div class="container py-20 flex flex-col items-center text-center">
    <p class="text-6xl mb-6" aria-hidden="true">📡</p>

    <template v-if="isFr">
      <h1 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
        Vous êtes hors ligne
      </h1>
      <p class="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
        Cette page n'est pas disponible sans connexion. Les pages déjà visitées doivent rester accessibles.
      </p>
      <UButton color="primary" to="/fr/">Aller à l'accueil</UButton>
    </template>

    <template v-else>
      <h1 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
        You're offline
      </h1>
      <p class="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
        This page isn't available without a connection. Already-visited pages should still work.
      </p>
      <UButton color="primary" to="/">Go home</UButton>
    </template>
  </div>
</template>
