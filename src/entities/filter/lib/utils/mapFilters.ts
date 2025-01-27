import type { Category, Component, Feature, Framework } from '../model/interfaces/filter.interface'

export default function mapFilters() {
  function mapFrameworks(frameworks: Framework[]) {
    return frameworks.map((framework) => {
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
  }

  function mapFeatures(features: Feature[]) {
    return features.map((feature) => {
      let icon = null

      switch (feature.value) {
        case 'tailwind':
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
  }

  function mapComponents(components: Component[]) {
    return components.map(component => ({
      ...component,
      label: component.name,
      value: component.value,
      icon: null,
    }))
  }

  function mapCategories(categories: Category[]) {
    return categories.map((category) => {
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
  }

  return {
    mapCategories,
    mapFrameworks,
    mapFeatures,
    mapComponents,
  }
}
