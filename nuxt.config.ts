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

  runtimeConfig: {
    public: {
      githubToken: process.env.NUXT_PUBLIC_GITHUB_TOKEN
    }
  },

  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/ui', '@pinia/nuxt', '@prisma/nuxt'],

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

  nitro: {
    experimental: {
      tasks: true
    },
    scheduledTasks: {
      '0 0 * * * *': ['library:updateLibraryListStats']
    }
  },

  compatibilityDate: '2025-02-27',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },
})