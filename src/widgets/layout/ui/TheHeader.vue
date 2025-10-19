<script setup lang="ts">
import { isEqual } from 'lodash-es'
import { FilterEnum, FilterListMobile, useFiltersStore } from '@/entities/filter'
import { apiLibrary } from '@/entities/library'
import { useQuery } from '@/shared/lib/hooks/useQuery'
import MainLogo from '@/shared/ui/MainLogo.vue'

interface QueryState {
  categories: string[]
  frameworks: string[]
  features: string[]
  components: string[]
}

const { parseQuery, extractDataFromQuery } = useQuery()
const { getLibraryListTotalCounter } = apiLibrary()
const filtersStore = useFiltersStore()

const { data } = await useAsyncData('libraries-total', async () => {
  const res = await getLibraryListTotalCounter()

  if ('error' in res)
    return null

  return res
})

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
async function handleCloseFilterPanel() {
  const queryState = getQueryState()

  const isChanged = !isEqual(filtersStore.state, queryState)
  if (isChanged) {
    await openFilterChangedModal(queryState)
    return
  }

  closeFilterPanel()
}

function getQueryState() {
  const query = parseQuery()
  return {
    categories: extractDataFromQuery(FilterEnum.CATEGORIES, query),
    frameworks: extractDataFromQuery(FilterEnum.FRAMEWORKS, query),
    features: extractDataFromQuery(FilterEnum.FEATURES, query),
    components: extractDataFromQuery(FilterEnum.COMPONENTS, query),
  }
}

async function openFilterChangedModal(queryState: QueryState) {
  // eslint-disable-next-line no-alert
  const isNext = window.confirm('Filters have been changed. Do you want to continue?')
  if (isNext) {
    filtersStore.state.categories = queryState.categories
    filtersStore.state.frameworks = queryState.frameworks
    filtersStore.state.features = queryState.features
    filtersStore.state.components = queryState.components
    closeFilterPanel()
  }
}

function handleUpdateFilters() {
  closeFilterPanel()
}

function handleRemoveFilters() {
  closeFilterPanel()
}
</script>

<template>
  <header class="z-50 px-4 lg:px-6 min-h-(--header-height) sticky top-0 flex justify-between items-center gap-5 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800">
    <div class="lg:hidden flex items-center gap-6">
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

      <USlideover
        v-model:open="isFilterPanelOpened"
        :dismissible="false"
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
                <UIcon
                  size="lg"
                  name="i-heroicons:adjustments-horizontal"
                />
                <div class="text-lg">
                  Filters
                </div>
              </div>

              <UButton
                variant="ghost"
                color="neutral"
                icon="i-heroicons-x-mark"
                aria-label="Close panel"
                @click="handleCloseFilterPanel"
              />
            </div>

            <div class="p-4 pb-5 h-full overflow-y-auto overflow-x-hidden">
              <FilterListMobile
                @on-update-filters="handleUpdateFilters"
                @on-remove-filters="handleRemoveFilters"
              />
            </div>
          </div>
        </template>
      </USlideover>
    </div>

    <div class="flex items-center gap-4">
      <NuxtLink
        class="mr-8 ml-[4.5rem] lg:mx-0 flex items-center gap-2"
        to="/"
      >
        <div class="w-8 h-8 flex items-center justify-center shrink-0 rounded-lg text-lg font-semibold text-white dark:text-black">
          <MainLogo class="main-logo" />
        </div>
        <div class="hidden lg:block font-medium lg:text-xl">
          UI Finder
        </div>
      </NuxtLink>

      <UBadge
        v-if="data?.data"
        class="hidden lg:block font-bold rounded-full"
        color="neutral"
        variant="subtle"
        size="lg"
      >
        Total libraries: {{ data.data.total }}
      </UBadge>
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
