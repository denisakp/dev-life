export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@nuxtjs/i18n",
    "@vite-pwa/nuxt",
    "nuxt-og-image",
  ],

  pwa: {
    registerType: "autoUpdate",
    injectRegister: "script",
    manifest: {
      name: "Denis AKPAGNONITE",
      short_name: "denisakp.me",
      description: "Cloud-native, DevOps, SRE, distributed systems.",
      theme_color: "#4F46E5",
      background_color: "#ffffff",
      display: "standalone",
      start_url: "/",
      scope: "/",
      lang: "en",
      icons: [
        { src: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { src: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
        { src: "/favicon/maskable-icon.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      ],
    },
    workbox: {
      navigateFallback: "/offline",
      cleanupOutdatedCaches: true,
      globPatterns: ["**/*.{js,css,html,woff2}"],
      runtimeCaching: [
        {
          urlPattern: ({ request }: { request: Request }) => request.mode === "navigate",
          handler: "NetworkFirst",
          options: {
            networkTimeoutSeconds: 3,
            cacheName: "html",
            expiration: { maxEntries: 50 },
          },
        },
        {
          urlPattern: /\.(?:js|css|woff2)$/,
          handler: "StaleWhileRevalidate",
          options: { cacheName: "static-assets" },
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|webp|avif)$/,
          handler: "CacheFirst",
          options: {
            cacheName: "images",
            expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 },
          },
        },
      ],
    },
    client: { installPrompt: false },
    devOptions: { enabled: false },
  },

  i18n: {
    defaultLocale: "en",
    strategy: "prefix_except_default",
    locales: [
      { code: "en", language: "en-US", file: "en.json", name: "English" },
      { code: "fr", language: "fr-FR", file: "fr.json", name: "Français" },
    ],
    langDir: "locales/",
    baseUrl: "https://denisakp.me",
    detectBrowserLanguage: false,
    customRoutes: "page",
  },

  css: ["~/assets/styles/main.css", "~/assets/styles/animations.css"],

  ogImage: {
    defaults: { component: "Default" },
    // Zero-runtime mode: all OG images generated at build time only,
    // served as static .png from .output/public/_og/. No runtime endpoint,
    // no signing secret needed, no spoofable image requests.
    zeroRuntime: true,
  },

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
        'lucide:rss',
        'lucide:loader-2',
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
      routes: ["/", "/sitemap.xml", "/robots.txt", "/rss.xml"],
    },
  },

  hooks: {
    "nitro:init"(nitro) {
      nitro.hooks.hook("prerender:done", async () => {
        const { spawnSync } = await import("node:child_process");
        const { existsSync } = await import("node:fs");
        const bin = "node_modules/.bin/pagefind";
        if (!existsSync(bin)) {
          throw new Error(
            "[pagefind] binary not found at " + bin + " — run `pnpm install`."
          );
        }
        // eslint-disable-next-line no-console
        console.log("[pagefind] indexing .output/public/blog/**/*.html ...");
        const result = spawnSync(
          bin,
          ["--site", ".output/public", "--glob", "blog/**/*.html"],
          { stdio: "inherit" }
        );
        if (result.status !== 0) {
          throw new Error(
            "[pagefind] indexing failed with exit code " + result.status
          );
        }
      });
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: "https://denisakp.me",
      buttondownUsername: process.env.BUTTONDOWN_USERNAME || "",
      umamiWebsiteId: process.env.UMAMI_WEBSITE_ID || "660709e9-04d6-4bb3-ae75-dc0937220012"
    }
  },

  site: {
    url: "https://denisakp.me",
    name: 'Denis AKPAGNONITE'
  },

  sitemap: {
    cacheMaxAgeSeconds: 3600,
    exclude: ["/offline"]
  },

  compatibilityDate: "2024-07-18",

  vite: {
    optimizeDeps: {
      include: [
        '@giscus/vue',
        '@vueuse/core',
        'zod',
      ]
    }
  }
});
