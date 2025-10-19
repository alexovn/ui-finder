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
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
        { rel: 'icon', href: '/favicon-32x32.png', sizes: '32x32' },
        { rel: 'icon', href: '/favicon-16x16.png', sizes: '16x16' },
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