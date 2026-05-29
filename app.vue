<script setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
import { useLocaleHead } from "#i18n";

import Header from "~/components/shared/Header.vue";
import Footer from "~/components/shared/Footer.vue";
import SkipToContent from "~/components/shared/SkipToContent.vue";

const { locale } = useI18n();
const localeHead = useLocaleHead({ addSeoAttributes: true });
const config = useRuntimeConfig();
const umamiWebsiteId = config.public.umamiWebsiteId;

const rssHref = computed(() =>
  locale.value === "fr" ? "https://denisakp.me/fr/rss.xml" : "https://denisakp.me/rss.xml"
);

const scriptTags = computed(() => {
  const tags = [];
  if (umamiWebsiteId) {
    tags.push({
      src: "https://cloud.umami.is/script.js",
      defer: true,
      "data-website-id": umamiWebsiteId,
      tagPosition: "bodyClose",
    });
  }
  return tags;
});

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Denis AKPAGNONITE` : "Denis AKPAGNONITE";
  },
  htmlAttrs: {
    lang: () => locale.value
  },
  link: () => [
    ...(localeHead.value?.link ?? []),
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
      rel: "alternate",
      type: "application/rss+xml",
      title: "Denis AKPAGNONITE",
      href: () => rssHref.value,
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;500;700&family=Inter:wght@400;600;700&display=swap"
    }
  ],
  meta: () => [
    ...(localeHead.value?.meta ?? []),
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "charset", content: "utf-8" },
    { name: "author", content: "Denis AKPAGNONITE" },
    { name: "robots", content: "index, follow" },
    { name: "format-detection", content: "telephone=no" },
    { name: "og:type", content: "website" },
    { name: "og:site_name", content: "Denis AKPAGNONITE"}
  ],
  script: () => scriptTags.value
});
</script>

<template>
  <UApp>
    <SkipToContent />
    <div class="w-full bg-white dark:bg-neutral-950 flex flex-col min-h-screen text-neutral-900 dark:text-neutral-100">
      <SpeedInsights />
      <Header />
      <main id="main" tabindex="-1" class="pt-16 md:pt-24 grow">
        <NuxtPage />
      </main>
      <Footer />
    </div>
  </UApp>
</template>
