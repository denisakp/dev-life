export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/image-edge',
        '@nuxt/content',
        '@nuxtjs/color-mode',
        'nuxt-simple-sitemap',
    ],
    colorMode: {
        classSuffix: ''
    },
    content: {
        highlight: {
            theme: {
                default: 'material-default',
                dark: 'material-darker',
            }
        },
    },
    // @ts-ignore
    ssr: true,
    nitro: {
        compressPublicAssets: true,
    },
    sitemap: {
        siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://denisakp.me'
    }
})
