// @ts-ignore
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
})
