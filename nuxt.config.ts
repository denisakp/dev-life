export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@nuxtjs/mdc",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots"
  ],

  css: ["@/assets/styles/main.css", "@/assets/styles/typography.css"],
  extends: ["@nuxt-themes/typography"],

  colorMode: {
    classSuffix: ""
  },

  content: {
    highlight: {
      theme: 'github-light'
    },
    documentDriven: true,
  },

  ssr: true,

  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: ["/", "/sitemap.xml"]
    }
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://denisakp.me"
    }
  },

  site: {
    url: "https://denisakp.me",
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
    }
  },

  compatibilityDate: "2024-07-18"
});