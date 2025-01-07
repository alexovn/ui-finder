<script setup lang="ts">
import { FilterList } from '@/entities/filter'
</script>

<template>
  <div class="max-lg:grow flex">
    <aside class="hidden sticky z-20 w-[19rem] h-[calc(100vh-var(--header-height))] border-r border-neutral-200 dark:border-neutral-800 overflow-y-auto lg:px-6 lg:py-5 lg:block lg:top-[--header-height] shrink-0">
      <FilterList />
    </aside>
    <div class="px-4 lg:px-6 max-w-screen-xl mx-auto grow">
      <div class="flex flex-col items-center justify-center gap-1 h-full">
        <UIcon
          name="i-bxs:component"
          class="size-32 text-neutral-300 dark:text-neutral-800"
        />
      </div>
    </div>
  </div>
</template>
