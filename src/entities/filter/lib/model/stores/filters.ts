import type { LocationQuery } from 'vue-router'
import type { FilterType } from '../interfaces/filter.interface'
import { defineStore } from 'pinia'
import queryString from 'query-string'
import { useQuery } from '@/shared/lib/hooks/useQuery'
import { FilterEnum } from '../../enums/filter.enum'

export const useFiltersStore = defineStore('filters', () => {
  const route = useRoute()
  const router = useRouter()
  const { parseQuery, extractDataFromQuery } = useQuery()

  const state = reactive({
    categories: [] as string[],
    frameworks: [] as string[],
    features: [] as string[],
    components: [] as string[],
  })

  onMounted(() => {
    const query = parseQuery()
    state.categories = extractDataFromQuery(FilterEnum.CATEGORIES, query)
    state.frameworks = extractDataFromQuery(FilterEnum.FRAMEWORKS, query)
    state.features = extractDataFromQuery(FilterEnum.FEATURES, query)
    state.components = extractDataFromQuery(FilterEnum.COMPONENTS, query)
  })

  function updateFilter(filterType: FilterType, filters: string | string[]) {
    const filterQuery = queryString.stringify({ [filterType]: filters }, { arrayFormat: 'comma' })
    const parsedFilterQuery = queryString.parse(filterQuery)

    router.push({
      query: {
        ...route.query,
        [filterType]: parsedFilterQuery[filterType],
        page: undefined,
      },
    })
  }

  function updateFilters() {
    const query: Record<FilterEnum, string[]> = {} as Record<FilterEnum, string[]>

    (Object.keys(state) as Array<keyof typeof state>).forEach((filter) => {
      const filterQuery = queryString.stringify({ [filter]: state[filter] }, { arrayFormat: 'comma' })
      const parsedFilterQuery = queryString.parse(filterQuery)

      // @ts-expect-error Type 'undefined' is not assignable to type 'string'
      query[filter] = parsedFilterQuery[filter]
    })

    router.push({
      query: {
        ...route.query,
        ...query,
        page: undefined,
      },
    })
  }

  function updateFilterState(filterType: FilterType, filters: string[]) {
    switch (filterType) {
      case FilterEnum.CATEGORIES:
        state.categories = filters
        break
      case FilterEnum.FRAMEWORKS:
        state.frameworks = filters
        break
      case FilterEnum.FEATURES:
        state.features = filters
        break
      case FilterEnum.COMPONENTS:
        state.components = filters
        break
    }
  }

  const areFiltersActive = ref(false)
  function areFiltersExist(filters: string[], query: LocationQuery) {
    return filters.some(filter => filter in query)
  }

  function clearFilterState() {
    state.categories = []
    state.frameworks = []
    state.features = []
    state.components = []
  }

  function clearFilters() {
    clearFilterState()

    router.push({
      query: {
        ...route.query,
        [FilterEnum.CATEGORIES]: undefined,
        [FilterEnum.FRAMEWORKS]: undefined,
        [FilterEnum.FEATURES]: undefined,
        [FilterEnum.COMPONENTS]: undefined,
      },
    })
  }

  return {
    state,
    updateFilterState,
    updateFilter,
    updateFilters,
    areFiltersActive,
    areFiltersExist,
    clearFilterState,
    clearFilters,
  }
})
