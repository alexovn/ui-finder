<script setup lang="ts">
import { FilterList } from '@/entities/filter'
import { LibraryList } from '@/entities/library'
import { LibrarySearch } from '@/features/library'

import nuxtLogo from '@/shared/icons/nuxt.svg'
import primevueLogo from '@/shared/icons/primevue.svg'
import vuetifyLogo from '@/shared/icons/vuetify.svg'

const libraries = ref([
  {
    name: 'Nuxt UI',
    img: nuxtLogo,
    link: 'https://ui.nuxt.com/',
    badges: [
      {
        label: 'Nuxt',
        value: 'nuxt',
        icon: 'i-lineicons:nuxt',
      },
      {
        label: 'Tailwind CSS',
        value: 'tailwind',
        icon: 'i-lineicons:tailwindcss',
      },
      {
        label: 'TypeScript',
        value: 'typescript',
        icon: 'i-lineicons:typescript',
      },
      {
        label: 'Styled',
        value: 'styled',
        icon: 'i-tabler:palette',
      },
    ],
    github: {
      starCount: '4.3k',
      link: 'https://github.com/nuxt/ui',
    },
    npm: {
      downloadCount: '32.8k',
      link: 'https://www.npmjs.com/package/@nuxt/ui',
    },
  },
  {
    name: 'Vuetify',
    img: vuetifyLogo,
    link: 'https://vuetifyjs.com/',
    badges: [
      {
        label: 'Vue',
        value: 'vue',
        icon: 'i-lineicons:vuejs',
      },
      {
        label: 'Nuxt',
        value: 'nuxt',
        icon: 'i-lineicons:nuxt',
      },
      {
        label: 'Styled',
        value: 'styled',
        icon: 'i-tabler:palette',
      },
    ],
    github: {
      starCount: '40.1k',
      link: 'https://github.com/vuetifyjs/vuetify',
    },
    npm: {
      downloadCount: '370.6k',
      link: 'https://www.npmjs.com/package/vuetify',
    },
  },
  {
    name: 'PrimeVue',
    img: primevueLogo,
    link: 'https://primevue.org/',
    badges: [
      {
        label: 'Vue',
        value: 'vue',
        icon: 'i-lineicons:vuejs',
      },
      {
        label: 'Nuxt',
        value: 'nuxt',
        icon: 'i-lineicons:nuxt',
      },
      {
        label: 'Tailwind CSS',
        value: 'tailwind',
        icon: 'i-lineicons:tailwindcss',
      },
      {
        label: 'TypeScript',
        value: 'typescript',
        icon: 'i-lineicons:typescript',
      },
      {
        label: 'Styled',
        value: 'styled',
        icon: 'i-tabler:palette',
      },
      {
        label: 'Unstyled',
        value: 'unstyled',
        icon: 'i-tabler:palette-off',
      },
    ],
    github: {
      starCount: '11.3k',
      link: 'https://github.com/primefaces/primevue',
    },
    npm: {
      downloadCount: '165.2k',
      link: 'https://www.npmjs.com/package/primevue',
    },
  },
])
</script>

<template>
  <div class="flex grow">
    <aside class="hidden fixed z-50 w-[--aside-left-width] h-[calc(100vh-var(--header-height))] border-r border-neutral-200 dark:border-neutral-800 overflow-y-auto overflow-x-hidden lg:px-6 lg:py-5 lg:block lg:top-[--header-height] shrink-0">
      <FilterList />
    </aside>
    <div class="lg:ml-[--aside-left-width] grow">
      <div class="sticky top-[--header-height] z-50">
        <LibrarySearch />
      </div>

      <div class="px-4 py-4 container mx-auto h-full lg:px-6">
        <LibraryList :libraries />
        <!-- <div class="flex flex-col items-center justify-center gap-1 h-full">
          <UIcon
            name="i-bxs:component"
            class="size-32 text-neutral-300 dark:text-neutral-800"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>
