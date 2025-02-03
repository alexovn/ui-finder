import type { H3Event } from 'h3'
import type { Query } from '~~/server/utils/extractDataFromQuery'
import { PrismaClient } from '@prisma/client'
import { extractDataFromQuery } from '~~/server/utils/extractDataFromQuery'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event) as Query

  const page = Number(query.page as string) || 1
  const perPage = Number(query.perPage as string) || 10
  const orderBy = query.orderBy as string || 'createdAt'
  const orderDir = query.orderDir as string || 'desc'
  const categories = extractDataFromQuery('categories', query as Query)
  const frameworks = extractDataFromQuery('frameworks', query as Query)
  const features = extractDataFromQuery('features', query as Query)
  const components = extractDataFromQuery('components', query as Query)

  const skip = (page - 1) * perPage

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

  const libraries = await prisma.library.findMany({
    where: whereClause,
    skip,
    take: perPage,
    orderBy: {
      [orderBy]: orderDir,
    },
    include: {
      category: true,
      frameworks: true,
      features: true,
      components: true,
    },
  })

  const total = await prisma.library.count()
  const totalPages = Math.ceil(total / perPage)

  return {
    data: libraries,
    meta: {
      pagination: {
        page,
        total,
        totalPages,
      },
    },
  }
})
