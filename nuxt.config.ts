// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',

  dir: {
    app: 'src/app',
    middleware: 'src/app',
    layouts: 'src/app',
    plugins: 'src/app',
    assets: 'src/app'
  },

  typescript: {
    typeCheck: true
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: ['@nuxt/eslint'],
})