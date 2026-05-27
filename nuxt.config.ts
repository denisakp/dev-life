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
      // Force-include icons referenced via dynamic :name bindings
      // (Header navLinks, etc.) that the static scanner can't detect.
      icons: [
        'lucide:book-open',
        'lucide:tag',
        'lucide:folder-git-2',
        'lucide:user',
        'lucide:sun',
        'lucide:moon',
        'lucide:search',
        'lucide:menu',
        'lucide:x',
        'lucide:chevron-left',
        'lucide:chevron-right',
        'lucide:presentation',
        'lucide:video',
        'lucide:external-link',
        'lucide:graduation-cap',
        'lucide:school',
        'simple-icons:github',
        'simple-icons:x',
        'simple-icons:linkedin',
      ],
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
