export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, minimum-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover',
      title: 'UI Finder',
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

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    }
  },

  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/ui', '@pinia/nuxt'],

  css: [
    '@/app/assets/styles/index.css'
  ],

  typescript: {
    typeCheck: true
  },

  eslint: {
    config: {
      standalone: false
    }
  },

  compatibilityDate: '2025-09-07',
  devtools: { enabled: true },
})