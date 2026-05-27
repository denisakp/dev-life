export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
  ],

  css: ["~/assets/styles/main.css", "~/assets/styles/animations.css"],

  icon: {
    mode: 'css',
    serverBundle: {
      collections: ['lucide', 'simple-icons'],
    },
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
      sizeLimitKb: 256,
    },
  },

  ssr: true,

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: ["/", "/sitemap.xml", "/robots.txt"],
    }
  },

  runtimeConfig: {
    public: {
      siteUrl: "https://denisakp.me"
    }
  },

  site: {
    url: "https://denisakp.me",
    name: 'Denis AKPAGNONITE'
  },

  sitemap: {
    cacheMaxAgeSeconds: 3600
  },

  compatibilityDate: "2024-07-18"
});
