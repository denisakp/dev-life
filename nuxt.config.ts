export default defineNuxtConfig({
    devtools: {enabled: false},
    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxt/image-edge",
        "@nuxt/content",
        "@nuxtjs/color-mode",
        "nuxt-simple-sitemap",
        "@nuxtjs/robots",
        "nuxt-gtag"

    ],
    // @ts-ignore
    css: ["@/assets/styles/main.css", "@/assets/styles/typography.css"],
    // @ts-ignore
    extends: ["@nuxt-themes/typography"],
    colorMode: {
        classSuffix: "",
    },
    content: {
        highlight: {
            theme: {
                default: "github-light",
                dark: "github-dark",
            },
        },
    },
    // @ts-ignore
    ssr: true,
    nitro: {
        compressPublicAssets: true,
        prerender: {
            crawlLinks: true,
            routes: ["/", "/sitemap.xml"],
        },
    },
    sitemap: {
        siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://denisakp.me",
        // @ts-ignore
        changefreq: "weekly",
    },
    runtimeConfig: {
        public: {
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://denisakp.me",
        },
    },
    gtag: {id: "GTM-5756M8X"}
});
