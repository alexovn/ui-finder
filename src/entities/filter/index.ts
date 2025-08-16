/* eslint-disable perfectionist/sort-imports */
/* eslint-disable perfectionist/sort-named-exports */

// INTERFACES
import type { Category, Component, Feature, FilterType, Framework } from './lib/model/interfaces/filter.interface'

// ENUMS
import { FilterEnum } from './lib/enums/filter.enum'

// STORES
import { useFiltersStore } from './lib/model/stores/filters'

// UI
import FilterItem from './ui/FilterItem.vue'
import FilterList from './ui/FilterList.vue'
import FilterListMobile from './ui/FilterListMobile.vue'

// UTILS
import mapFilters from './lib/utils/mapFilters'

// API
import { apiFilter } from './api/apiFilter'

export {
  // ENUMS
  FilterEnum,
  // STORES
  useFiltersStore,
  // UI
  FilterItem,
  FilterList,
  FilterListMobile,
  // UTILS
  mapFilters,
  // API
  apiFilter,
}

export type {
  Framework,
  Feature,
  Component,
  Category,
  FilterType,
}
