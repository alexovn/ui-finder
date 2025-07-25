<script setup lang="ts">
import { FilterList, useFiltersStore } from '@/entities/filter'

const filtersStore = useFiltersStore()

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

function clearFilters() {
  filtersStore.clearFilters()
  closeFilterPanel()
}
</script>

<template>
  <header class="z-50 px-4 lg:px-6 min-h-(--header-height) sticky top-0 flex justify-between items-center gap-5 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800">
    <div class="flex items-center gap-6">
      <div class="lg:hidden relative after:w-0.5 after:h-6 after:rounded-lg after:bg-neutral-500 after:absolute after:block after:top-1 after:-right-3 after:translate-x-1/2">
        <UChip
          color="error"
          size="lg"
          :show="filtersStore.areFiltersActive"
        >
          <UButton
            icon="i-heroicons:adjustments-horizontal"
            color="neutral"
            variant="outline"
            aria-label="Open filter panel"
            @click="openFilterPanel"
          />
        </UChip>
      </div>

      <USlideover
        v-model:open="isFilterPanelOpened"
        side="left"
        :ui="{
          overlay: 'bg-neutral-200/75 dark:bg-neutral-800/75',
          content: 'dark:bg-neutral-900',
        }"
      >
        <template #content>
          <div class="flex flex-col h-full">
            <div class="px-4 py-2 min-h-(--header-height) flex justify-between items-center sticky top-0 z-10 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800">
              <div class="flex items-center gap-3">
                <div>
                  Filters
                </div>

                <UButton
                  v-if="filtersStore.areFiltersActive"
                  icon="i-heroicons-trash"
                  trailing
                  color="neutral"
                  variant="solid"
                  label="Clear"
                  @click="clearFilters"
                />
              </div>

              <UButton
                variant="ghost"
                color="neutral"
                icon="i-heroicons-x-mark"
                aria-label="Close panel"
                @click="closeFilterPanel"
              />
            </div>

            <div class="p-4 h-full overflow-y-auto overflow-x-hidden">
              <FilterList />
            </div>
          </div>
        </template>
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
        color="neutral"
        external
      />

      <ClientOnly>
        <UButton
          class="w-8 h-8"
          :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
          variant="ghost"
          aria-label="Toggle color mode"
          color="neutral"
          @click="toggleColorMode"
        />
        <template #fallback>
          <div class="w-8 h-8" />
        </template>
      </ClientOnly>
    </div>
  </header>
</template>
