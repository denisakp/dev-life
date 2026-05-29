<script setup lang="ts">
import Header from "~/components/shared/Header.vue";
import Footer from "~/components/shared/Footer.vue";

const props = defineProps<{
  error: { statusCode: number; statusMessage?: string; message?: string };
}>();

const route = useRoute();
const isFr = computed(() => (route?.path ?? "").startsWith("/fr"));

// Try useI18n; fall back to manual dictionaries if plugin not yet initialized.
let tFn: ((key: string) => string) | null = null;
try {
  const i18n = useI18n();
  tFn = (k: string) => i18n.t(k);
} catch {
  tFn = null;
}

const fallback = {
  en: {
    "error.404.title": "Page not found",
    "error.404.description": "The page you are looking for does not exist.",
    "error.404.back": "Go home",
    "error.404.latest": "Latest posts",
    "error.500.title": "Something went wrong",
    "error.500.description": "An unexpected error occurred.",
    "error.500.back": "Go home",
  },
  fr: {
    "error.404.title": "Page introuvable",
    "error.404.description": "La page que vous cherchez n'existe pas.",
    "error.404.back": "Aller à l'accueil",
    "error.404.latest": "Derniers articles",
    "error.500.title": "Une erreur est survenue",
    "error.500.description": "Une erreur inattendue s'est produite.",
    "error.500.back": "Aller à l'accueil",
  },
} as const;

function t(key: string): string {
  if (tFn) return tFn(key);
  const dict = isFr.value ? fallback.fr : fallback.en;
  return (dict as Record<string, string>)[key] ?? key;
}

const is404 = computed(() => props.error.statusCode === 404);
const homePath = computed(() => (isFr.value ? "/fr/" : "/"));
const blogPath = computed(() => (isFr.value ? "/fr/blog" : "/blog"));

const handleError = () => clearError({ redirect: homePath.value });

useSeoMeta({
  title: () =>
    is404.value ? t("error.404.title") : t("error.500.title"),
});
</script>

<template>
  <UApp>
    <div class="w-full bg-white dark:bg-neutral-950 flex flex-col min-h-screen text-neutral-900 dark:text-neutral-100">
      <Header />
      <main class="pt-16 md:pt-24 grow container flex flex-col items-center justify-center text-center py-20">
        <p class="text-7xl font-bold text-primary-600 dark:text-primary-400 mb-4">
          {{ error.statusCode }}
        </p>
        <h1 class="text-2xl font-bold mb-2">
          {{ is404 ? t("error.404.title") : t("error.500.title") }}
        </h1>
        <p class="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
          {{ is404 ? t("error.404.description") : t("error.500.description") }}
        </p>
        <div class="flex gap-3">
          <UButton color="primary" @click="handleError">
            {{ is404 ? t("error.404.back") : t("error.500.back") }}
          </UButton>
          <UButton v-if="is404" color="neutral" variant="outline" :to="blogPath">
            {{ t("error.404.latest") }}
          </UButton>
        </div>
      </main>
      <Footer />
    </div>
  </UApp>
</template>
