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
  ssr: true,
  // @ts-ignore
  nitro: {
    compressPublicAssets: true,
    preset: 'node-server'
  },
  // @ts-ignore'
})
