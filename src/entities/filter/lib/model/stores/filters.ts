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

    state.categories = extractDataFromQuery('categories', query)
    state.frameworks = extractDataFromQuery('frameworks', query)
    state.features = extractDataFromQuery('features', query)
    state.components = extractDataFromQuery('components', query)
  })

  function handleUpdateFilter(filterType: FilterType, filters: string | string[]) {
    const filterQuery = queryString.stringify({ [filterType]: filters }, { arrayFormat: 'comma' })
    const parsedFilterQuery = queryString.parse(filterQuery)

    router.push({
      query: {
        ...route.query,
        page: undefined,
        [filterType]: parsedFilterQuery[filterType],
      },
    })
  }

  const areFiltersActive = ref(false)
  function areFiltersExist(filters: string[], query: LocationQuery) {
    return filters.some(filter => filter in query)
  }

  function clearFilters() {
    state.categories = []
    state.frameworks = []
    state.features = []
    state.components = []

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
    handleUpdateFilter,
    areFiltersActive,
    areFiltersExist,
    clearFilters,
  }
})
