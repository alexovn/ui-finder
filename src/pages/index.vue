<script setup lang="ts">
import { FilterList } from '@/entities/filter'
import { LibraryList } from '@/entities/library'
import { LibrarySearch } from '@/features/library'

const { data: libraries } = useAsyncData('libraries', async () => {
  const res = await $fetch('/api/libraries')

  return res.map((item: any) => ({
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }))
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
