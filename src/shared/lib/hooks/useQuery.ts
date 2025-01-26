import queryString from 'query-string'

export function useQuery() {
  const route = useRoute()

  function parseQuery() {
    const regex = new RegExp(`^${route.path}`, 'g')
    const formattedPath = route.fullPath.replace(regex, '')
    const parsedQuery = queryString.parse(formattedPath, { arrayFormat: 'comma' }) as Record<string, string | string[]>

    return parsedQuery
  }

  function extractDataFromQuery(key: string, query: Record<string, string | string[]>) {
    if (!query)
      return []

    if (key in query) {
      if (Array.isArray(query[key])) {
        return query[key]
      }
      return query[key] ? [query[key]] : []
    }

    return []
  }

  return {
    parseQuery,
    extractDataFromQuery,
  }
}
