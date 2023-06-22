export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxtjs/color-mode'
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
  ssr: false,
  // @ts-ignore
  nitro: {
    compressPublicAssets: true
  },
  // @ts-ignore'
})
