<script setup>
import Header from "~/components/shared/Header.vue";
import Bottom from "~/components/shared/Bottom.vue";
import Footer from "~/components/shared/Footer.vue";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Dev Life` : "Dev Life";
  },
  htmlAttrs: {
    lang: "fr",
  },
  link: [
    { rel: "canonical", href: "https://denisakp.me" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "180x180",
      href: "/favicon/apple-touch-icon.png",
    },
    { rel: "icon", type: "image/x-icon", href: "/favicon/favicon.ico" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon/favicon-16x16.png",
    },
    {
      color: "#5bbad5",
      rel: "mask-icon",
      href: "/favicon/safari-pinned-tab.svg",
    },
    { rel: "manifest", href: "/favicon/site.webmanifest" },
  ],
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "charset", content: "utf-8" },
    { name: "author", content: "Denis AKPAGNONITE" },
    { name: "robots", content: "index, follow" },
    { name: "format-detection", content: "telephone=no" },
    { name: "og:type", content: "website" },
    { "http-equiv": "Permissions-Policy", content: "interest-cohort=()" },
  ],
});
</script>

<template>
  <div
    class="w-full bg-white dark:bg-dark-high text-dark-high dark:text-white"
    :class="$colorMode.preference === 'dark' ? 'dark' : ''"
  >
    <Header />
    <main class="pt-20 md:pt-24 min-h-screen">
      <NuxtPage />
    </main>
    <Bottom />
    <Footer />
  </div>
</template>
