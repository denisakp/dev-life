<script setup lang="ts">
import Header from "~/components/shared/Header.vue";
import Footer from "~/components/shared/Footer.vue";

const props = defineProps<{
  error: { statusCode: number; statusMessage?: string; message?: string };
}>();

const is404 = computed(() => props.error.statusCode === 404);

const handleError = () => clearError({ redirect: "/" });

useSeoMeta({
  title: () =>
    is404.value ? "404 — Page not found" : "Something went wrong",
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
          {{ is404 ? "Page not found" : "Something went wrong" }}
        </h1>
        <p class="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
          {{
            is404
              ? "The page you're looking for doesn't exist or has moved."
              : "An unexpected error occurred. Please try again or head back home."
          }}
        </p>
        <div class="flex gap-3">
          <UButton color="primary" @click="handleError">Go home</UButton>
          <UButton color="neutral" variant="outline" to="/blog">Latest posts</UButton>
        </div>
      </main>
      <Footer />
    </div>
  </UApp>
</template>
