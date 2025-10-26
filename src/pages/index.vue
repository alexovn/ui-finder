<script setup lang="ts">
import type { Library, LibraryListPayload } from '@/entities/library'
import { useInfiniteScroll } from '@vueuse/core'
import { FilterEnum, FilterList, useFiltersStore } from '@/entities/filter'
import { apiLibrary, LibraryItem } from '@/entities/library'
import { LibrarySearch } from '@/features/library'
import { OrderDirEnum } from '@/shared/lib/enums/orderDir.enum'
import { useQuery } from '@/shared/lib/hooks/useQuery'
import removeEmptyValues from '@/shared/lib/utils/removeEmptyValues'

if (import.meta.server) {
  useSeoMeta({
    // Basic
    title: 'UI Finder: The One-Stop Solution for Finding UI Libraries',
    description: 'A powerful tool that helps developers quickly discover the best UI libraries for their framework. Save time by filtering, sorting, and finding up-to-date, high-quality UI solutions in seconds. No more endless web searches—just the right libraries at your fingertips!',

    // Open Graph
    ogTitle: 'UI Finder: The One-Stop Solution for Finding UI Libraries',
    ogDescription: 'A powerful tool that helps developers quickly discover the best UI libraries for their framework. Save time by filtering, sorting, and finding up-to-date, high-quality UI solutions in seconds. No more endless web searches—just the right libraries at your fingertips!',
    ogSiteName: 'UI Finder',
    ogType: 'website',
    ogUrl: 'https://ui-finder.dev/',
    ogImage: 'https://res.cloudinary.com/drh75w8s9/image/upload/v1760890339/ui-finder-cover_lip7wi.jpg',

    // Twitter
    twitterCard: 'summary_large_image',
    twitterSite: 'ui_finder',
    twitterImage: 'https://res.cloudinary.com/drh75w8s9/image/upload/v1760890339/ui-finder-cover_lip7wi.jpg',
  })
}

const { getLibraryList } = apiLibrary()
const { parseQuery, extractDataFromQuery } = useQuery()
const filtersStore = useFiltersStore()
const route = useRoute()
const router = useRouter()

const list = useState<Library[]>('library-list', () => [])

const isLoadingDataActive = ref(false)

const DEFAULT_PAGE = 1
const page = ref(DEFAULT_PAGE)
function setDefaultValues() {
  page.value = DEFAULT_PAGE
  isLoadingDataActive.value = false
}

const { data, status } = useAsyncData('libraries', async () => {
  const res = await getData()

  if ('error' in res)
    return null

  list.value = res.data
  return res
}, {
  watch: [route],
})

async function getData() {
  const parsedQuery = parseQuery()

  const categories = extractDataFromQuery(FilterEnum.CATEGORIES, parsedQuery)
  const frameworks = extractDataFromQuery(FilterEnum.FRAMEWORKS, parsedQuery)
  const features = extractDataFromQuery(FilterEnum.FEATURES, parsedQuery)
  const components = extractDataFromQuery(FilterEnum.COMPONENTS, parsedQuery)

  const payload = {
    [FilterEnum.SEARCH]: parsedQuery[FilterEnum.SEARCH] || undefined,
    [FilterEnum.PAGE]: page.value,
    [FilterEnum.PER_PAGE]: parsedQuery[FilterEnum.PER_PAGE] || undefined,
    [FilterEnum.ORDER_BY]: parsedQuery[FilterEnum.ORDER_BY] || undefined,
    [FilterEnum.ORDER_DIR]: parsedQuery[FilterEnum.ORDER_DIR] || undefined,
    [FilterEnum.CATEGORIES]: categories.length ? categories : undefined,
    [FilterEnum.FRAMEWORKS]: frameworks.length ? frameworks : undefined,
    [FilterEnum.FEATURES]: features.length ? features : undefined,
    [FilterEnum.COMPONENTS]: components.length ? components : undefined,
  }
  const normalizedPayload: LibraryListPayload = removeEmptyValues(payload)
  const res = await getLibraryList(normalizedPayload)

  return res
}

async function activateLoadingData() {
  isLoadingDataActive.value = true
  await loadData()
}

async function loadData() {
  page.value++

  const data = await getData()

  if ('error' in data)
    return

  list.value.push(...(data?.data || []))
}

useInfiniteScroll(window, () => {
  loadData()
}, {
  distance: 30,
  interval: 300,
  canLoadMore: () => {
    return isLoadingDataActive.value && page.value !== data.value?.meta.pagination.totalPages
  },
})

const DEFAULT_PER_PAGE = '50'
const perPage = ref(route.query.perPage as string || DEFAULT_PER_PAGE)
const perPageList = [
  {
    label: '10',
    value: '10',
  },
  {
    label: '50',
    value: '50',
  },
  {
    label: '100',
    value: '100',
  },
  {
    label: '150',
    value: '150',
  },
]
function onPerPageChange(perPage: string) {
  setDefaultValues()
  router.push({
    query: {
      ...route.query,
      page: route.query.page ? DEFAULT_PAGE : undefined,
      perPage,
    },
  })
  scrollPageToTop()
}
function setDefaultPerPage() {
  perPage.value = DEFAULT_PER_PAGE
}

const DEFAULT_ORDER_BY = 'createdAt'
const orderBy = ref(route.query.orderBy as string || DEFAULT_ORDER_BY)
const orderByList = [
  {
    label: 'Created at',
    value: 'createdAt',
  },
  {
    label: 'Github stars',
    value: 'githubStars',
  },
  {
    label: 'Npm downloads',
    value: 'npmDownloads',
  },
]
async function onUpdateOrderBy(value: string) {
  setDefaultValues()
  await router.push({
    query: {
      ...route.query,
      page: undefined,
      orderBy: value,
    },
  })
  scrollPageToTop()
}
function setDefaultOrderBy() {
  orderBy.value = DEFAULT_ORDER_BY
}

const DEFAULT_ORDER_DIR = undefined
const orderDir = ref(route.query.orderDir as string | undefined || DEFAULT_ORDER_DIR)
async function changeOrderDir() {
  if (orderDir.value === OrderDirEnum.ASC) {
    orderDir.value = OrderDirEnum.DESC
  }
  else if (orderDir.value === OrderDirEnum.DESC) {
    orderDir.value = DEFAULT_ORDER_DIR
  }
  else {
    orderDir.value = OrderDirEnum.ASC
  }

  setDefaultValues()
  await router.push({
    query: {
      ...route.query,
      page: undefined,
      orderDir: orderDir.value,
    },
  })
  scrollPageToTop()
}
const orderDirIcon = computed(() => {
  if (orderDir.value === OrderDirEnum.ASC) {
    return 'i-heroicons-bars-arrow-down'
  }
  if (orderDir.value === OrderDirEnum.DESC) {
    return 'i-heroicons-bars-arrow-up'
  }
  return 'i-heroicons-arrows-up-down'
})
const orderDirLabel = computed(() => {
  if (orderDir.value === OrderDirEnum.ASC) {
    return 'Asc'
  }
  if (orderDir.value === OrderDirEnum.DESC) {
    return 'Desc'
  }
  return 'Sort'
})
function setDefaultOrderDir() {
  orderDir.value = DEFAULT_ORDER_DIR
}

const searchComponent = useTemplateRef('searchComponent')
function handleSearch() {
  setDefaultValues()
  scrollPageToTop()
}

function handleUpdateFilter() {
  setDefaultValues()
  scrollPageToTop()
}

function removeFilters() {
  filtersStore.clearFilters()
  scrollPageToTop()
}

function scrollPageToTop() {
  window && window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}

watch(() => route.query, (newVal) => {
  if (!Object.keys(newVal).length) {
    filtersStore.clearFilterState()
    searchComponent.value?.clearSearchValue()
    setDefaultValues()
    setDefaultPerPage()
    setDefaultOrderBy()
    setDefaultOrderDir()
  }
})

watch(() => route.query, (newVal) => {
  const filteredFilters = Object.values(FilterEnum).filter(filter =>
    filter !== FilterEnum.SEARCH
    && filter !== FilterEnum.PER_PAGE
    && filter !== FilterEnum.PAGE
    && filter !== FilterEnum.ORDER_BY
    && filter !== FilterEnum.ORDER_DIR,
  )
  filtersStore.areFiltersActive = filtersStore.areFiltersExist(filteredFilters, newVal)
}, {
  immediate: true,
})
</script>

<template>
  <div class="flex grow">
    <aside class="hidden fixed z-50 w-(--aside-left-width) h-[calc(100vh-var(--header-height))] border-r border-neutral-200 dark:border-neutral-800 lg:block lg:top-(--header-height) shrink-0">
      <div class="z-50 sticky top-0 h-(--filters-header-height)">
        <div class="px-6 pr-4 py-2 h-full flex justify-between items-center gap-2.5 text-lg bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800">
          <div class="flex items-center gap-3">
            <UIcon name="i-heroicons:adjustments-horizontal" />
            <div>
              Filters
            </div>
          </div>

          <div>
            <UButton
              v-if="filtersStore.areFiltersActive"
              class="w-full"
              color="neutral"
              :ui="{
                base: 'justify-center',
              }"
              size="md"
              icon="i-heroicons-trash"
              trailing
              variant="solid"
              label="Clear filters"
              @click="removeFilters"
            />
          </div>
        </div>
      </div>

      <div class="lg:px-3.5 lg:py-3.5 h-[calc(100vh-(var(--header-height)+var(--filters-header-height)))] overflow-y-auto overflow-x-hidden overscroll-none">
        <FilterList @on-update-filter="handleUpdateFilter" />
      </div>
    </aside>

    <div class="relative lg:ml-(--aside-left-width) grow">
      <div class="sticky top-(--header-height) min-h-px z-50">
        <LibrarySearch
          ref="searchComponent"
          @on-search="handleSearch"
        />
        <div class="w-full h-px absolute bottom-0 z-100">
          <UProgress
            v-if="status === 'pending'"
            size="2xs"
            animation="carousel"
          />
        </div>
      </div>

      <div class="relative px-4 py-4 container mx-auto h-[calc(100%-(var(--header-height)+var(--search-height))+0.5rem)] lg:px-6">
        <div
          v-if="list?.length"
          class="flex items-end justify-between gap-2 md:items-start"
        >
          <div class="flex items-center justify-between gap-5">
            <div class="flex items-center gap-2">
              <div class="hidden md:block">
                Order by:
              </div>
              <USelect
                v-model="orderBy"
                :items="orderByList"
                @update:model-value="onUpdateOrderBy"
              />
            </div>
            <div class="flex items-center gap-2">
              <div class="hidden md:block">
                Items per page:
              </div>
              <USelect
                v-model="perPage"
                :items="perPageList"
                @update:model-value="onPerPageChange"
              />
            </div>
          </div>

          <UButton
            :label="orderDirLabel"
            :icon="orderDirIcon"
            color="neutral"
            @click="changeOrderDir"
          />
        </div>

        <div class="relative mt-4 flex flex-col h-full">
          <div
            v-if="!list?.length"
            class="flex flex-col items-center justify-center gap-1 h-full"
          >
            <UIcon
              name="i-bxs:component"
              class="size-32 text-neutral-300 dark:text-neutral-800"
            />

            <div class="text-dimmed">
              No results found. Try again
            </div>
          </div>
          <div
            v-else
            class="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          >
            <TransitionGroup name="list">
              <LibraryItem
                v-for="library in list"
                :key="library.name"
                :library
                @on-update-filter="handleUpdateFilter"
              />
            </TransitionGroup>
          </div>
        </div>

        <div class="sticky bottom-5 h-9 flex items-center justify-center">
          <Transition
            name="fade"
            mode="out-in"
          >
            <div v-if="!isLoadingDataActive && list.length && (page !== data?.meta.pagination.totalPages)">
              <UButton
                :ui="{
                  base: 'min-w-35 justify-center',
                }"
                color="neutral"
                size="lg"
                loading-icon="i-lucide-loader"
                label="Show more"
                @click="activateLoadingData"
              />
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  /* FADE */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.35s ease-in-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  /* LIST */
  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: transform 0.3s ease-in-out;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .list-leave-active {
    opacity: 0;
    position: absolute;
  }
</style>
