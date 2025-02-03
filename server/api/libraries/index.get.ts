import type { H3Event } from 'h3'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const schema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().refine(val => [10, 50, 150].includes(val)).default(10),
  orderBy: z.string()
    .refine(val => ['createdAt', 'githubStars', 'npmDownloads'].includes(val))
    .default('createdAt'),
  orderDir: z.string().refine(val => ['asc', 'desc'].includes(val)).default('desc'),
  categories: z.union([z.string(), z.array(z.string())])
    .optional()
    .transform(val => (Array.isArray(val) ? val : val ? val.split(',') : [])),
  frameworks: z.union([z.string(), z.array(z.string())])
    .optional()
    .transform(val => (Array.isArray(val) ? val : val ? val.split(',') : [])),
  features: z.union([z.string(), z.array(z.string())])
    .optional()
    .transform(val => (Array.isArray(val) ? val : val ? val.split(',') : [])),
  components: z.union([z.string(), z.array(z.string())])
    .optional()
    .transform(val => (Array.isArray(val) ? val : val ? val.split(',') : [])),
})

export default defineEventHandler(async (event: H3Event) => {
  const {
    page,
    perPage,
    orderBy,
    orderDir,
    categories,
    frameworks,
    features,
    components,
  } = await getValidatedQuery(event, schema.parse)

  const skip = (page - 1) * perPage
  const whereClause: any = {
    AND: [],
  }

  if (categories?.length) {
    whereClause.AND.push({
      category: {
        value: {
          in: categories,
        },
      },
    })
  }
  if (frameworks?.length) {
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
  if (features?.length) {
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
  if (components?.length) {
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
