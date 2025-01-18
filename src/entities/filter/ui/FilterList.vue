<script setup lang="ts">
import { FilterItem, useFiltersStore } from '@/entities/filter'

const filtersStore = useFiltersStore()

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

const frameworks = computed(() => {
  return filters.value?.frameworks.map((framework) => {
    let icon = null

    switch (framework.value) {
      case 'vue':
        icon = 'i-lineicons:vuejs'
        break
      case 'nuxt':
        icon = 'i-lineicons:nuxt'
        break
      case 'react':
        icon = 'i-lineicons:react'
        break
      case 'angular':
        icon = 'i-lineicons:angular'
        break
      case 'svelte':
        icon = 'i-lineicons:svelte'
        break
    }

    return {
      ...framework,
      label: framework.name,
      value: framework.value,
      icon,
    }
  })
})

const features = computed(() => {
  return filters.value?.features.map((feature) => {
    let icon = null

    switch (feature.value) {
      case 'tailwindCSS':
        icon = 'i-lineicons:tailwindcss'
        break
      case 'typescript':
        icon = 'i-lineicons:typescript'
        break
      case 'styled':
        icon = 'i-tabler:palette'
        break
      case 'unstyled':
        icon = 'i-tabler:palette-off'
        break
      case 'paid':
        icon = 'i-tabler:currency-dollar'
        break
      case 'free':
        icon = 'i-tabler:currency-dollar-off'
        break
      case 'figmaAssets':
        icon = 'i-lineicons:figma'
        break
    }

    return {
      ...feature,
      label: feature.name,
      value: feature.value,
      icon,
    }
  })
})

const components = computed(() => {
  return filters.value?.components.map(component => ({
    ...component,
    label: component.name,
    value: component.value,
    icon: null,
  }))
})

const categories = computed(() => {
  return filters.value?.categories.map((category) => {
    let icon = null

    switch (category.value) {
      case 'component':
        icon = 'i-tabler:square'
        break
      case 'library':
        icon = 'i-tabler:circle-square'
        break
    }

    return {
      ...category,
      label: category.name,
      value: category.value,
      icon,
    }
  })
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
