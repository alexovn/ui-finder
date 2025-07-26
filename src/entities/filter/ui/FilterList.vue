<script setup lang="ts">
import type { FilterType } from '../lib/model/interfaces/filter.interface'
import { apiFilter } from '../api/apiFilter'
import { useFiltersStore } from '../lib/model/stores/filters'
import mapFilters from '../lib/utils/mapFilters'
import FilterItem from './FilterItem.vue'

const emit = defineEmits<{
  onUpdateFilter: []
}>()

const filtersStore = useFiltersStore()
const {
  getCategories,
  getFrameworks,
  getFeatures,
  getComponents,
} = apiFilter()
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
    getCategories(),
    getFrameworks(),
    getFeatures(),
    getComponents(),
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
  },
  {
    label: 'Frameworks',
    slot: 'frameworks',
  },
  {
    label: 'Features',
    slot: 'features',
  },
  {
    label: 'Components',
    slot: 'components',
  },
]

const openedFilters = computed(() => {
  return filterSections.map((_, index) => index.toString())
})

const categories = computed(() => {
  if (!filters.value || 'error' in filters.value.categories)
    return []
  return mapCategories(filters.value.categories)
})

const frameworks = computed(() => {
  if (!filters.value || 'error' in filters.value.frameworks)
    return []
  return mapFrameworks(filters.value.frameworks)
})

const features = computed(() => {
  if (!filters.value || 'error' in filters.value.features)
    return []
  return mapFeatures(filters.value.features)
})

const components = computed(() => {
  if (!filters.value || 'error' in filters.value.components)
    return []
  return mapComponents(filters.value.components)
})

function handleUpdateFilter(filterType: FilterType, filters: string | string[]) {
  emit('onUpdateFilter')
  filtersStore.handleUpdateFilter(filterType, filters)
}
</script>

<template>
  <UAccordion
    type="multiple"
    :items="filterSections"
    :default-value="openedFilters"
    :unmount-on-hide="false"
    :ui="{
      item: 'border-0',
      trigger: 'px-2.5 py-1.5 rounded-md text-md cursor-pointer bg-transparent hover:bg-neutral-200/75 text-dark hover:text-dark dark:bg-transparent dark:hover:bg-neutral-700/40 dark:text-white dark:hover:text-white',
      content: 'text-sm & [&>ul]:py-2.5',
    }"
  >
    <template #categories>
      <ul class="flex flex-col gap-1">
        <li
          v-for="item in categories"
          :key="item.label"
        >
          <FilterItem
            v-model="filtersStore.state.categories"
            :item
            @update:model-value="handleUpdateFilter('categories', $event)"
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
            v-model="filtersStore.state.frameworks"
            :item
            @update:model-value="handleUpdateFilter('frameworks', $event)"
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
            v-model="filtersStore.state.features"
            :item
            @update:model-value="handleUpdateFilter('features', $event)"
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
            v-model="filtersStore.state.components"
            :item
            @update:model-value="handleUpdateFilter('components', $event)"
          />
        </li>
      </ul>
    </template>
  </UAccordion>
</template>
