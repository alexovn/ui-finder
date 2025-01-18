import { defineStore } from 'pinia'

type FilterType = 'frameworks' | 'features' | 'components' | 'categories'

export const useFiltersStore = defineStore('filters', () => {
  const route = useRoute()
  const router = useRouter()

  const state = reactive({
    selectedCategories: [] as string[],
    selectedFrameworks: [] as string[],
    selectedFeatures: [] as string[],
    selectedComponents: [] as string[],
  })

  function handleUpdateFilter(filterType: FilterType, filters: string[] | unknown) {
    if (filters && Array.isArray(filters)) {
      router.push({
        query: {
          ...route.query,
          [filterType]: filters,
        },
      })
    }
  }

  onMounted(() => {
    if (route.query.categories) {
      Array.isArray(route.query.categories)
        ? state.selectedCategories = [...route.query.categories as string[]]
        : state.selectedCategories = [route.query.categories]
    }
    if (route.query.frameworks) {
      Array.isArray(route.query.frameworks)
        ? state.selectedFrameworks = [...route.query.frameworks as string[]]
        : state.selectedFrameworks = [route.query.frameworks]
    }
    if (route.query.features) {
      Array.isArray(route.query.features)
        ? state.selectedFeatures = [...route.query.features as string[]]
        : state.selectedFeatures = [route.query.features]
    }
    if (route.query.components) {
      Array.isArray(route.query.components)
        ? state.selectedComponents = [...route.query.components as string[]]
        : state.selectedComponents = [route.query.components]
    }
  })

  return {
    state,
    handleUpdateFilter,
  }
})
