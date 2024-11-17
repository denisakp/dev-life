<script setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt";

import Header from "~/components/shared/Header.vue";
import Bottom from "~/components/shared/BottomNav.vue";
import Footer from "~/components/shared/Footer.vue";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Denis AKPAGNONITE` : "Denis AKPAGNONITE";
  },
  htmlAttrs: {
    lang: "en"
  },
  link: [
    { rel: "canonical", href: "https://denisakp.me" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "180x180",
      href: "/favicon/apple-touch-icon.png"
    },
    { rel: "icon", type: "image/x-icon", href: "/favicon/favicon.ico" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon/favicon-32x32.png"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon/favicon-16x16.png"
    },
    {
      color: "#5bbad5",
      rel: "mask-icon",
      href: "/favicon/safari-pinned-tab.svg"
    },
    { rel: "manifest", href: "/favicon/site.webmanifest" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;500;700&family=Inter:wght@400;600;700&display=swap"
    }
  ],
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "charset", content: "utf-8" },
    { name: "author", content: "Denis AKPAGNONITE" },
    { name: "robots", content: "index, follow" },
    { name: "format-detection", content: "telephone=no" },
    { name: "og:type", content: "website" }
  ],
  script: [
    { src: "https://www.googletagmanager.com/gtag/js?id=G-D4WS1344ML", async: true },
    {
      children: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-D4WS1344ML');
    `
    }
  ]
});
</script>

<template>
  <div
    class="w-full bg-white flex flex-col min-h-screen text-dark-high"
  >
    <SpeedInsights />
    <Header />
    <main class="md:pt-24 page-bg flex-grow">
      <NuxtPage />
    </main>
    <Bottom />
    <Footer />
  </div>
</template>
