<script setup lang="ts">
import { FilterItem, useFiltersStore } from '@/entities/filter'

const filtersStore = useFiltersStore()

const filters = [
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
]

const frameworks = [
  {
    label: 'Vue',
    value: 'vue',
    icon: 'i-lineicons:vuejs',
  },
  {
    label: 'Nuxt',
    value: 'nuxt',
    icon: 'i-lineicons:nuxt',
  },
  {
    label: 'React',
    value: 'react',
    icon: 'i-lineicons:react',
  },
  {
    label: 'Angular',
    value: 'angular',
    icon: 'i-lineicons:angular',
  },
  {
    label: 'Svelte',
    value: 'svelte',
    icon: 'i-lineicons:svelte',
  },
]

const features = [
  {
    label: 'Tailwind CSS',
    value: 'tailwind',
    icon: 'i-lineicons:tailwindcss',
  },
  {
    label: 'TypeScript',
    value: 'typescript',
    icon: 'i-lineicons:typescript',
  },
  {
    label: 'Styled',
    value: 'styled',
    icon: 'i-tabler:palette',
  },
  {
    label: 'Unstyled',
    value: 'unstyled',
    icon: 'i-tabler:palette-off',
  },
  {
    label: 'Paid',
    value: 'paid',
    icon: 'i-tabler:currency-dollar',
  },
  {
    label: 'Free',
    value: 'free',
    icon: 'i-tabler:currency-dollar-off',
  },
]
</script>

<template>
  <UAccordion
    :items="filters"
    multiple
    :ui="{
      wrapper: 'gap-1',
      default: {
        class: 'text-lg bg-transparent hover:bg-neutral-200/75 text-dark hover:text-dark dark:bg-transparent dark:hover:bg-neutral-700/40 dark:text-white dark:hover:text-white',
      },
    }"
  >
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
  </UAccordion>
</template>
