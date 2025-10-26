<script setup lang="ts">
import { useDebounceFn, useEventListener } from '@vueuse/core'

const emit = defineEmits<{
  onSearch: []
}>()

const route = useRoute()
const router = useRouter()

const searchEl = useTemplateRef('searchEl')
const search = ref(route.query.search || '')
const isSearchFocused = ref(false)

const handleSearch = useDebounceFn(() => {
  emit('onSearch')
  router.push({
    query: {
      ...route.query,
      page: undefined,
      search: search.value || undefined,
    },
  })
}, 300)

function clearSearchValue() {
  search.value = ''
}

function clearSearch() {
  clearSearchValue()

  router.push({
    query: {
      ...route.query,
      search: undefined,
    },
  })
}

defineShortcuts({
  meta_k: {
    handler: () => {
      searchEl.value?.focus()
    },
  },
})

onMounted(() => {
  useEventListener(document, 'keydown', (e) => {
    if (isSearchFocused.value && e.key === 'Escape') {
      searchEl.value?.blur()
    }
  })
})

defineExpose({
  clearSearchValue,
})
</script>

<template>
  <div class="relative w-full text-base h-(--search-height)">
    <div class="pl-4 lg:pl-6 z-10 absolute inset-y-0 left-0 flex items-center text-neutral-500 pointer-events-none">
      <UIcon
        name="i-heroicons-magnifying-glass"
        class="size-5"
      />
    </div>

    <input
      ref="searchEl"
      v-model="search"
      type="text"
      class="px-12 lg:px-14 lg:pr-20 py-3 h-full w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm placeholder-neutral-500 truncate focus:outline-hidden focus:inset-ring-1 focus:inset-ring-neutral-400 dark:focus:inset-ring-neutral-700"
      placeholder="Search library by name or filters..."
      @focus="isSearchFocused = true"
      @blur="isSearchFocused = false"
      @update:model-value="handleSearch"
    >

    <div class="pr-4 lg:pr-6 absolute inset-y-0 right-0 flex items-center">
      <UButton
        v-if="search.length"
        variant="ghost"
        color="neutral"
        icon="i-heroicons-x-mark"
        @click="clearSearch"
      />
      <div
        v-else
        class="hidden lg:flex items-center gap-0.5"
      >
        <UKbd value="meta" />
        <UKbd value="K" />
      </div>
    </div>
  </div>
</template>
