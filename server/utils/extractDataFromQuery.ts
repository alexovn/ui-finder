export type Query = Record<string, string | string[]>

export function extractDataFromQuery(key: string, query: Query) {
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
