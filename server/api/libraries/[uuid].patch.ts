import type { H3Event } from 'h3'
import type { Library } from '~~/server/interfaces/library/library.interface'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { fetchLibraryGithubData } from '~~/server/utils/fetchLibraryGithubData'
import { fetchLibraryNpmData } from '~~/server/utils/fetchLibraryNpmData'

const prisma = new PrismaClient()

const paramsSchema = z.object({
  uuid: z.string().uuid(),
})

const payloadSchema = z.object({
  name: z.string().optional(),
  value: z.string().optional(),
  img: z.string().optional(),
  link: z.string().optional(),
  category: z.string().optional(),
  frameworks: z.string().array().optional(),
  features: z.string().array().optional(),
  components: z.string().array().optional(),
  githubRepo: z.string().optional(),
  npmPackage: z.string().optional(),
})

export default defineEventHandler(async (event: H3Event) => {
  const params = await getValidatedRouterParams(event, paramsSchema.parse)
  const payload = await readValidatedBody(event, payload => payloadSchema.parse(payload))

  const existingLibrary = await prisma.library.findUnique({
    where: {
      id: params.uuid,
    },
  })

  if (!existingLibrary) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: `Library with ID ${params.uuid} does not exist.`,
    })
  }

  let categoryExists
  if (payload.category) {
    categoryExists = await prisma.category.findUnique({
      where: { value: payload.category },
    })

    if (!categoryExists) {
      return createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: `Category with ID ${payload.category} does not exist.`,
      })
    }
  }

  const existingFrameworks = payload.frameworks
    ? await prisma.framework.findMany({ where: { value: { in: payload.frameworks } } })
    : []

  const existingFeatures = payload.features
    ? await prisma.feature.findMany({ where: { value: { in: payload.features } } })
    : []

  const existingComponents = payload.components
    ? await prisma.component.findMany({ where: { value: { in: payload.components } } })
    : []

  let githubData
  let npmData
  if (payload.githubRepo && payload.npmPackage) {
    const repo = payload.githubRepo.replace('https://github.com/', '')
    const packageName = payload.npmPackage.replace('https://www.npmjs.com/package/', '')

    const [githubRepoData, npmPackageData] = await Promise.all([
      fetchLibraryGithubData(repo),
      fetchLibraryNpmData(packageName),
    ])

    if (githubRepoData) {
      githubData = githubRepoData
    }
    if (npmPackageData) {
      npmData = npmPackageData
    }
  }

  const updateData = {
    name: payload.name || undefined,
    value: payload.value || undefined,
    img: payload.img || undefined,
    link: payload.link || undefined,
    category: categoryExists ? { connect: { id: categoryExists.id } } : undefined,
    frameworks: existingFrameworks.length
      ? { set: existingFrameworks.map(f => ({ id: f.id })) }
      : undefined,
    features: existingFeatures.length
      ? { set: existingFeatures.map(f => ({ id: f.id })) }
      : undefined,
    components: existingComponents.length
      ? { set: existingComponents.map(c => ({ id: c.id })) }
      : undefined,
    githubRepo: payload.githubRepo || undefined,
    npmPackage: payload.npmPackage || undefined,
    githubStars: githubData ? githubData.stargazers_count as number : undefined,
    npmDownloads: npmData ? npmData.downloads as number : undefined,
  }

  const library: Library = await prisma.library.update({
    where: {
      id: params.uuid,
    },
    data: updateData,
    include: {
      category: true,
      frameworks: true,
      features: true,
      components: true,
    },
  })

  return library
})
