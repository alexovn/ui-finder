import { fileURLToPath } from 'node:url'


function getModulePath(moduleName: string) {
  try {
    const moduleUrl = import.meta.resolve(moduleName);
    const modulePath = fileURLToPath(moduleUrl);
    return (
      modulePath
        .substring(0, modulePath.lastIndexOf("node_modules"))
        .replace(/\/+$/, "") || ""
    );
  } catch (error) {
    console.error(
      `Module ${moduleName} resolution failed:`,
      (error as Error).message,
    );
    return "";
  }
}

const prismaNodeModulesPath = `${getModulePath("@prisma/client")}/node_modules`;

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

  vite: {
    resolve: {
      alias: {
        ".prisma/client/index-browser": `${prismaNodeModulesPath}/.prisma/client/index-browser.js`,
      },
    },
  },

  future: {
    compatibilityVersion: 4,
  },
})