// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, minimum-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
      ],
    },
  },

  srcDir: 'src/',

  dir: {
    middleware: 'app/middleware',
    layouts: 'app/layouts',
    plugins: 'app/plugins',
    assets: 'app/assets'
  },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts'
  ],

  css: [
    '@/app/assets/styles/index.css'
  ],

  typescript: {
    typeCheck: true
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },
})