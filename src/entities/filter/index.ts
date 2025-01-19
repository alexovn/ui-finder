/* eslint-disable perfectionist/sort-imports */
/* eslint-disable perfectionist/sort-named-exports */

// INTERFACES
import type { Category, Component, Feature, Framework } from './lib/model/interfaces/filter.interface'

// STORES
import { useFiltersStore } from './lib/model/stores/filters'

// UI
import FilterItem from './ui/FilterItem.vue'
import FilterList from './ui/FilterList.vue'

// UTILS
import mapFilters from './lib/utils/mapFilters'

export {
  // STORES
  useFiltersStore,
  // UI
  FilterItem,
  FilterList,
  // UTILS
  mapFilters,
}

export type {
  Framework,
  Feature,
  Component,
  Category,
}
