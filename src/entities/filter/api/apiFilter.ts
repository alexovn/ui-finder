import type { ApiError } from '@/shared/model/interfaces/error.interface'
import type { Category, Component, Feature, Framework } from '../lib/model/interfaces/filter.interface'

export function apiFilter() {
  const { $apiGet } = useNuxtApp()

  async function getCategories(): Promise<Category[] | ApiError> {
    return await $apiGet('/categories')
  }

  async function getFrameworks(): Promise<Framework[] | ApiError> {
    return await $apiGet('/frameworks')
  }

  async function getFeatures(): Promise<Feature[] | ApiError> {
    return await $apiGet('/features')
  }

  async function getComponents(): Promise<Component[] | ApiError> {
    return await $apiGet('/components')
  }

  return {
    getCategories,
    getFrameworks,
    getFeatures,
    getComponents,
  }
}
