export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "nuxt-og-image",
  ],

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

  compatibilityDate: "2024-07-18",

  vite: {
    optimizeDeps: {
      include: [
        '@vueuse/core',
        'zod',
      ]
    }
  }
});
