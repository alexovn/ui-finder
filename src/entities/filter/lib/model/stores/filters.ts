import { defineStore } from 'pinia'

export const useFiltersStore = defineStore('filters', () => {
  const route = useRoute()
  const router = useRouter()

  const state = reactive({
    selectedFrameworks: [] as string[],
    selectedFeatures: [] as string[],
  })

  function handleUpdateFilter(filterType: 'frameworks' | 'features', filters: string[] | unknown) {
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
  })

  return {
    state,
    handleUpdateFilter,
  }
})
