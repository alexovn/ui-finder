<script setup lang="ts">
import type { LibraryListPayload } from '@/entities/library'
import { FilterEnum, FilterList, useFiltersStore } from '@/entities/filter'
import { apiLibrary, LibraryItem } from '@/entities/library'
import { LibrarySearch } from '@/features/library'
import { OrderDirEnum } from '@/shared/lib/enums/orderDir.enum'
import { useQuery } from '@/shared/lib/hooks/useQuery'
import removeEmptyValues from '@/shared/lib/utils/removeEmptyValues'

const { getLibraryList } = apiLibrary()
const { parseQuery, extractDataFromQuery } = useQuery()
const filtersStore = useFiltersStore()
const route = useRoute()
const router = useRouter()

const { data, status } = useAsyncData('libraries', async () => {
  const parsedQuery = parseQuery()

  const categories = extractDataFromQuery(FilterEnum.CATEGORIES, parsedQuery)
  const frameworks = extractDataFromQuery(FilterEnum.FRAMEWORKS, parsedQuery)
  const features = extractDataFromQuery(FilterEnum.FEATURES, parsedQuery)
  const components = extractDataFromQuery(FilterEnum.COMPONENTS, parsedQuery)

  const payload = {
    [FilterEnum.SEARCH]: parsedQuery[FilterEnum.SEARCH] || undefined,
    [FilterEnum.PAGE]: parsedQuery[FilterEnum.PAGE] || undefined,
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

  if ('error' in res)
    return null

  return res
}, {
  watch: [route],
})

const orderBy = ref(route.query.orderBy as string || 'createdAt')
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
function onUpdateOrderBy(value: string) {
  router.push({
    query: {
      ...route.query,
      orderBy: value,
    },
  })
}

const orderDir = ref(route.query.orderDir as string | undefined)
function changeOrderDir() {
  if (orderDir.value === OrderDirEnum.ASC) {
    orderDir.value = OrderDirEnum.DESC
  }
  else if (orderDir.value === OrderDirEnum.DESC) {
    orderDir.value = undefined
  }
  else {
    orderDir.value = OrderDirEnum.ASC
  }

  router.push({
    query: {
      ...route.query,
      orderDir: orderDir.value,
    },
  })
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

const page = ref(route.query.page ? Number(route.query.page) : 1)
function onPageChange(page: number) {
  router.push({
    query: {
      ...route.query,
      page,
    },
  })
}

const perPage = ref(route.query.perPage || '10')
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
    label: '150',
    value: '150',
  },
]
function onPerPageChange(perPage: string) {
  page.value = 1
  router.push({
    query: {
      ...route.query,
      page: route.query.page ? 1 : undefined,
      perPage,
    },
  })
}

function handleSearch() {
  page.value = 1
}

watch(() => route.query, (newVal) => {
  if (window) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
  filtersStore.areFiltersActive = filtersStore.areFiltersExist(FilterEnum, newVal)
}, {
  immediate: true,
})
</script>

<template>
  <div class="flex grow">
    <aside class="hidden fixed z-50 w-[--aside-left-width] h-[calc(100vh-var(--header-height))] border-r border-neutral-200 dark:border-neutral-800 overflow-y-auto overflow-x-hidden lg:px-6 lg:py-5 lg:block lg:top-[--header-height] shrink-0">
      <FilterList />
    </aside>
    <div class="lg:ml-[--aside-left-width] grow">
      <div class="sticky top-[--header-height] min-h-px z-50">
        <LibrarySearch @on-search="handleSearch" />
        <div class="w-full h-px absolute bottom-0 z-[100]">
          <UProgress
            v-if="status === 'pending'"
            size="2xs"
            animation="carousel"
          />
        </div>
      </div>

      <div class="px-4 py-4 container mx-auto h-[calc(100%-(var(--header-height)+var(--search-height)))] lg:px-6">
        <div
          v-if="data?.data.length"
          class="flex items-end justify-between gap-2 md:items-start"
        >
          <div class="flex items-center justify-between gap-2">
            <div class="hidden md:block">
              Order by:
            </div>
            <USelect
              v-model="orderBy"
              :options="orderByList"
              @update:model-value="onUpdateOrderBy"
            />
          </div>
          <UButton
            :label="orderDirLabel"
            :icon="orderDirIcon"
            color="gray"
            @click="changeOrderDir"
          />
        </div>

        <div class="mt-4 flex flex-col h-full">
          <div
            v-if="!data || !data.data.length"
            class="flex flex-col items-center justify-center gap-1 h-full"
          >
            <UIcon
              name="i-bxs:component"
              class="size-32 text-neutral-300 dark:text-neutral-800"
            />
          </div>
          <div
            v-else
            class="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          >
            <LibraryItem
              v-for="library in data.data"
              :key="library.name"
              :library
            />
          </div>
        </div>
      </div>

      <div
        v-if="data?.data.length"
        class="px-4 py-3 flex items-start justify-between gap-3 sticky bottom-0 backdrop-blur border-t border-neutral-200 bg-white/90 dark:bg-neutral-900/90 dark:border-neutral-800 md:px-6 md:flex-row md:gap-5 md:items-center"
      >
        <div class="flex items-center gap-2">
          <div class="hidden md:block">
            Items per page:
          </div>
          <USelect
            v-model="perPage"
            :options="perPageList"
            @update:model-value="onPerPageChange"
          />
        </div>
        <UPagination
          v-model="page"
          :page-count="Number(perPage)"
          :total="Number(data?.meta.pagination.total)"
          @update:model-value="onPageChange"
        />
      </div>
    </div>
  </div>
</template>
