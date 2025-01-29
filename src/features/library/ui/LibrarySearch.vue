<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const searchEl = useTemplateRef('searchEl')
const search = ref(route.query.search || '')
function handleSearch() {
  router.push({
    query: {
      ...route.query,
      search: search.value || undefined,
    },
  })
}
function clearSearch() {
  search.value = ''

  router.push({
    query: {
      ...route.query,
      search: undefined,
    },
  })
}

const { metaSymbol } = useShortcuts()
defineShortcuts({
  meta_k: {
    handler: () => {
      searchEl.value?.focus()
    },
  },
})
</script>

<template>
  <div class="relative w-full text-base h-[--search-height]">
    <div class="pl-3 absolute inset-y-0 left-0 flex items-center text-neutral-500 pointer-events-none">
      <UIcon
        name="i-heroicons-magnifying-glass"
        class="size-5"
      />
    </div>
    <input
      ref="searchEl"
      v-model="search"
      type="text"
      class="p-3 px-16 w-full border-b border-neutral-200 bg-white placeholder-neutral-500 truncate focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:ring-neutral-700"
      placeholder="Search library by name, framework or feature..."
      @update:model-value="handleSearch"
    >
    <div class="pr-3 absolute inset-y-0 right-0 flex items-center">
      <UButton
        v-if="search.length"
        variant="ghost"
        color="white"
        icon="i-heroicons-x-mark"
        @click="clearSearch"
      />
      <div
        v-else
        class="flex items-center gap-0.5"
      >
        <UKbd>{{ metaSymbol }}</UKbd>
        <UKbd>K</UKbd>
      </div>
    </div>
  </div>
</template>
