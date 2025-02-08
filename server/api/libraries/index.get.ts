import type { H3Event } from 'h3'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const schema = z.object({
  search: z.string().optional(),
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
    search,
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

  const searchQuery = search?.trim() || ''
  const searchCondition = searchQuery
    ? `("Library"."name" % $1 
      OR EXISTS (SELECT 1 FROM "_FrameworkToLibrary" JOIN "Framework" ON "_FrameworkToLibrary"."A" = "Framework"."id" WHERE "_FrameworkToLibrary"."B" = "Library"."id" AND "Framework"."value" % $1)
      OR EXISTS (SELECT 1 FROM "_FeatureToLibrary" JOIN "Feature" ON "_FeatureToLibrary"."A" = "Feature"."id" WHERE "_FeatureToLibrary"."B" = "Library"."id" AND "Feature"."value" % $1)
      OR EXISTS (SELECT 1 FROM "_ComponentToLibrary" JOIN "Component" ON "_ComponentToLibrary"."A" = "Component"."id" WHERE "_ComponentToLibrary"."B" = "Library"."id" AND "Component"."value" % $1))`
    : 'TRUE'

  const whereClause = `
    WHERE ${searchCondition}
    ${categories?.length ? `AND "Library"."categoryId" IN (SELECT "id" FROM "Category" WHERE "value" IN (${categories.map(c => `'${c}'`).join(',')}))` : ''}
    ${frameworks?.length ? `AND EXISTS (SELECT 1 FROM "_FrameworkToLibrary" JOIN "Framework" ON "_FrameworkToLibrary"."A" = "Framework"."id" WHERE "_FrameworkToLibrary"."B" = "Library"."id" AND "Framework"."value" IN (${frameworks.map(f => `'${f}'`).join(',')}))` : ''}
    ${features?.length ? `AND EXISTS (SELECT 1 FROM "_FeatureToLibrary" JOIN "Feature" ON "_FeatureToLibrary"."A" = "Feature"."id" WHERE "_FeatureToLibrary"."B" = "Library"."id" AND "Feature"."value" IN (${features.map(f => `'${f}'`).join(',')}))` : ''}
    ${components?.length ? `AND EXISTS (SELECT 1 FROM "_ComponentToLibrary" JOIN "Component" ON "_ComponentToLibrary"."A" = "Component"."id" WHERE "_ComponentToLibrary"."B" = "Library"."id" AND "Component"."value" IN (${components.map(c => `'${c}'`).join(',')}))` : ''}
  `

  const libraries = await prisma.$queryRawUnsafe(
    `
      SELECT "Library".*,
            similarity("Library"."name", COALESCE($1, '')) AS name_similarity,
            jsonb_build_object('id', "Category"."id", 'name', "Category"."name", 'value', "Category"."value") AS "category",
            COALESCE(jsonb_agg(DISTINCT jsonb_build_object('id', "Framework"."id", 'name', "Framework"."name", 'value', "Framework"."value")) 
            FILTER (WHERE "Framework"."id" IS NOT NULL), '[]') AS "frameworks",
            COALESCE(jsonb_agg(DISTINCT jsonb_build_object('id', "Feature"."id", 'name', "Feature"."name", 'value', "Feature"."value")) 
            FILTER (WHERE "Feature"."id" IS NOT NULL), '[]') AS "features",
            COALESCE(jsonb_agg(DISTINCT jsonb_build_object('id', "Component"."id", 'name', "Component"."name", 'value', "Component"."value")) 
            FILTER (WHERE "Component"."id" IS NOT NULL), '[]') AS "components"
      FROM "Library"
      LEFT JOIN "Category" ON "Library"."categoryId" = "Category"."id"
      LEFT JOIN "_FrameworkToLibrary" ON "Library"."id" = "_FrameworkToLibrary"."B"
      LEFT JOIN "Framework" ON "_FrameworkToLibrary"."A" = "Framework"."id"
      LEFT JOIN "_FeatureToLibrary" ON "Library"."id" = "_FeatureToLibrary"."B"
      LEFT JOIN "Feature" ON "_FeatureToLibrary"."A" = "Feature"."id"
      LEFT JOIN "_ComponentToLibrary" ON "Library"."id" = "_ComponentToLibrary"."B"
      LEFT JOIN "Component" ON "_ComponentToLibrary"."A" = "Component"."id"
      ${whereClause}
      GROUP BY "Library"."id", "Category"."id"
      ORDER BY name_similarity DESC, "Library"."${orderBy}" ${orderDir.toUpperCase()}
      LIMIT ${perPage} OFFSET ${skip};
      `,
    searchQuery,
  )

  const totalResult: any = await prisma.$queryRawUnsafe(
    `
    SELECT COUNT(*) AS total FROM "Library"
    ${whereClause};
    `,
    searchQuery,
  )

  const total = Number(totalResult[0]?.total || 0)
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
