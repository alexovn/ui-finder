import type { H3Event } from 'h3'
import { PrismaClient } from '@prisma/client'

type Query = Record<string, string | string[]>

const prisma = new PrismaClient()

function extractDataFromQuery(key: string, query: Query) {
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

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event)

  const categories = extractDataFromQuery('categories', query as Query)
  const frameworks = extractDataFromQuery('frameworks', query as Query)
  const features = extractDataFromQuery('features', query as Query)
  const components = extractDataFromQuery('components', query as Query)

  const whereClause: any = {
    AND: [],
  }

  if (categories.length) {
    whereClause.AND.push({
      category: {
        value: {
          in: categories,
        },
      },
    })
  }
  if (frameworks.length) {
    whereClause.AND.push({
      frameworks: {
        some: {
          value: {
            in: frameworks,
          },
        },
      },
    })
  }
  if (features.length) {
    whereClause.AND.push({
      features: {
        some: {
          value: {
            in: features,
          },
        },
      },
    })
  }
  if (components.length) {
    whereClause.AND.push({
      components: {
        some: {
          value: {
            in: components,
          },
        },
      },
    })
  }

  return await prisma.library.findMany({
    where: whereClause,
    include: {
      category: true,
      frameworks: true,
      features: true,
      components: true,
    },
  })
})
