<script setup lang="ts">
import { FilterList } from '@/entities/filter'

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
function toggleColorMode() {
  isDark.value = !isDark.value
}

const isFilterPanelOpened = ref(false)
function openFilterPanel() {
  isFilterPanelOpened.value = true
}
function closeFilterPanel() {
  isFilterPanelOpened.value = false
}
</script>

<template>
  <header class="z-50 px-4 lg:px-6 min-h-[--header-height] sticky top-0 flex justify-between items-center gap-5 bg-white/90 dark:bg-neutral-900/90 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
    <div class="flex items-center gap-4">
      <div class="lg:hidden relative after:w-0.5 after:h-6 after:rounded-lg after:bg-neutral-500 after:absolute after:block after:top-1 after:-right-2 after:translate-x-1/2">
        <UButton
          icon="i-heroicons:adjustments-horizontal"
          color="white"
          variant="outline"
          aria-label="Open filter panel"
          @click="openFilterPanel"
        />
      </div>

      <USlideover
        v-model="isFilterPanelOpened"
        side="left"
        :ui="{
          padding: 'overflow-y-auto',
          overlay: {
            background: 'bg-neutral-200/75 dark:bg-neutral-800/75',
          },
          background: 'dark:bg-neutral-900',
        }"
      >
        <div class="flex flex-col gap-2">
          <div class="px-4 py-2 flex justify-end sticky top-0 z-10 bg-white/90 dark:bg-neutral-900/90 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
            <UButton
              variant="ghost"
              color="white"
              icon="i-heroicons-x-mark"
              aria-label="Close panel"
              @click="closeFilterPanel"
            />
          </div>
          <FilterList class="p-4" />
        </div>
      </USlideover>

      <NuxtLink
        class="flex items-center gap-2"
        to="/"
      >
        <div class="w-8 h-8 flex items-center justify-center shrink-0 rounded-lg text-lg font-semibold text-white bg-black dark:text-black dark:bg-white">
          <UIcon
            class="w-6 h-6 bg-white dark:bg-black"
            name="i-bxs:component"
          />
        </div>
        <div class="font-medium md:text-lg lg:text-xl">
          UI Finder
        </div>
      </NuxtLink>
    </div>

    <div class="flex items-center gap-2">
      <UButton
        to="https://github.com/alexovn/ui-finder"
        target="_blank"
        icon="i-mdi:github"
        variant="ghost"
        color="white"
        external
      />

      <ClientOnly>
        <UButton
          class="w-8 h-8"
          :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
          variant="ghost"
          aria-label="Toggle color mode"
          color="white"
          @click="toggleColorMode"
        />
        <template #fallback>
          <div class="w-8 h-8" />
        </template>
      </ClientOnly>
    </div>
  </header>
</template>
