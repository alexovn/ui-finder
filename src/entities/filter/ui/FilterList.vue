<script setup lang="ts">
import { FilterItem, mapFilters, useFiltersStore } from '@/entities/filter'

const filtersStore = useFiltersStore()
const {
  mapCategories,
  mapFrameworks,
  mapFeatures,
  mapComponents,
} = mapFilters()

const { data: filters } = useAsyncData('filters', async () => {
  const [
    categories,
    frameworks,
    features,
    components,
  ] = await Promise.all([
    $fetch('/api/categories'),
    $fetch('/api/frameworks'),
    $fetch('/api/features'),
    $fetch('/api/components'),
  ])

  return {
    categories,
    frameworks,
    features,
    components,
  }
})

const filterSections = [
  {
    label: 'Categories',
    slot: 'categories',
    defaultOpen: true,
  },
  {
    label: 'Frameworks',
    slot: 'frameworks',
    defaultOpen: true,
  },
  {
    label: 'Features',
    slot: 'features',
    defaultOpen: true,
  },
  {
    label: 'Components',
    slot: 'components',
    defaultOpen: true,
  },
]

const categories = computed(() => {
  if (!filters.value)
    return []
  return mapCategories(filters.value.categories)
})

const frameworks = computed(() => {
  if (!filters.value)
    return []
  return mapFrameworks(filters.value.frameworks)
})

const features = computed(() => {
  if (!filters.value)
    return []
  return mapFeatures(filters.value.features)
})

const components = computed(() => {
  if (!filters.value)
    return []
  return mapComponents(filters.value.components)
})
</script>

<template>
  <UAccordion
    :items="filterSections"
    multiple
    :ui="{
      wrapper: 'gap-1',
      default: {
        class: 'text-lg bg-transparent hover:bg-neutral-200/75 text-dark hover:text-dark dark:bg-transparent dark:hover:bg-neutral-700/40 dark:text-white dark:hover:text-white',
      },
    }"
  >
    <template #categories>
      <ul class="flex flex-col gap-1">
        <li
          v-for="item in categories"
          :key="item.label"
        >
          <FilterItem
            v-model="filtersStore.state.selectedCategories"
            :item
            @update:model-value="filtersStore.handleUpdateFilter('categories', $event)"
          />
        </li>
      </ul>
    </template>
    <template #frameworks>
      <ul class="flex flex-col gap-1">
        <li
          v-for="item in frameworks"
          :key="item.label"
        >
          <FilterItem
            v-model="filtersStore.state.selectedFrameworks"
            :item
            @update:model-value="filtersStore.handleUpdateFilter('frameworks', $event)"
          />
        </li>
      </ul>
    </template>
    <template #features>
      <ul class="flex flex-col gap-1">
        <li
          v-for="item in features"
          :key="item.label"
        >
          <FilterItem
            v-model="filtersStore.state.selectedFeatures"
            :item
            @update:model-value="filtersStore.handleUpdateFilter('features', $event)"
          />
        </li>
      </ul>
    </template>
    <template #components>
      <ul class="flex flex-col gap-1">
        <li
          v-for="item in components"
          :key="item.label"
        >
          <FilterItem
            v-model="filtersStore.state.selectedComponents"
            :item
            @update:model-value="filtersStore.handleUpdateFilter('components', $event)"
          />
        </li>
      </ul>
    </template>
  </UAccordion>
</template>
