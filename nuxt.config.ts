export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxtjs/mdc",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@nuxtjs/color-mode"
  ],

  css: ["@/assets/styles/main.css", "@/assets/styles/typography.css"],

  extends: ["@nuxt-themes/typography"],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },

  content: {
    highlight: {
      theme: 'github-light'
    },
  },

  ssr: true,

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