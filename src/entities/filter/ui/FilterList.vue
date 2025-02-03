<script setup lang="ts">
import {
  apiFilter,
  FilterItem,
  mapFilters,
  useFiltersStore,
} from '@/entities/filter'

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
</script>

<template>
  <div>
    <UAccordion
      :items="filterSections"
      multiple
      :ui="{
        wrapper: 'gap-1',
        default: {
          class: 'bg-transparent hover:bg-neutral-200/75 text-dark hover:text-dark dark:bg-transparent dark:hover:bg-neutral-700/40 dark:text-white dark:hover:text-white',
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
              v-model="filtersStore.state.categories"
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
              v-model="filtersStore.state.frameworks"
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
              v-model="filtersStore.state.features"
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
              v-model="filtersStore.state.components"
              :item
              @update:model-value="filtersStore.handleUpdateFilter('components', $event)"
            />
          </li>
        </ul>
      </template>
    </UAccordion>

    <div class="mt-5">
      <UButton
        v-if="filtersStore.areFiltersActive"
        :ui="{
          base: 'w-full justify-center',
          rounded: 'rounded-full',
        }"
        icon="i-heroicons-trash"
        trailing
        color="gray"
        variant="solid"
        label="Clear filters"
        @click="filtersStore.clearFilters"
      />
    </div>
  </div>
</template>
