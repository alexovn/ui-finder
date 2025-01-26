<script setup lang="ts">
import { FilterEnum, FilterList } from '@/entities/filter'
import { apiLibrary, LibraryList } from '@/entities/library'
import { LibrarySearch } from '@/features/library'
import { useQuery } from '@/shared/lib/hooks/useQuery'

const { getLibraryList } = apiLibrary()
const { parseQuery, extractDataFromQuery } = useQuery()
const route = useRoute()

const { data: libraries } = useAsyncData('libraries', async () => {
  const parsedQuery = parseQuery()

  const categories = extractDataFromQuery(FilterEnum.CATEGORIES, parsedQuery)
  const frameworks = extractDataFromQuery(FilterEnum.FRAMEWORKS, parsedQuery)
  const features = extractDataFromQuery(FilterEnum.FEATURES, parsedQuery)
  const components = extractDataFromQuery(FilterEnum.COMPONENTS, parsedQuery)

  const payload = {
    [FilterEnum.CATEGORIES]: categories.length ? categories : undefined,
    [FilterEnum.FRAMEWORKS]: frameworks.length ? frameworks : undefined,
    [FilterEnum.FEATURES]: features.length ? features : undefined,
    [FilterEnum.COMPONENTS]: components.length ? components : undefined,
  }
  const normalizedPayload = Object.fromEntries(Object.entries(payload).filter(filter => filter[1]))
  const res = await getLibraryList(normalizedPayload)

  if ('error' in res)
    return null

  return res.map((item: any) => ({
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }))
}, {
  watch: [route],
})
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
        <div
          v-if="!libraries || !libraries.length"
          class="flex flex-col items-center justify-center gap-1 h-full"
        >
          <UIcon
            name="i-bxs:component"
            class="size-32 text-neutral-300 dark:text-neutral-800"
          />
        </div>
        <LibraryList :libraries />
      </div>
    </div>
  </div>
</template>
