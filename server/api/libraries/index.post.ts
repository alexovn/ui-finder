import type { H3Event } from 'h3'
import type { Library } from '~~/server/interfaces/library/library.interface'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { fetchLibraryGithubData } from '~~/server/utils/fetchLibraryGithubData'
import { fetchLibraryNpmData } from '~~/server/utils/fetchLibraryNpmData'

const prisma = new PrismaClient()

const schema = z.object({
  name: z.string(),
  value: z.string(),
  img: z.string().optional(),
  link: z.string().optional(),
  category: z.string(),
  frameworks: z.string().array(),
  features: z.string().array(),
  components: z.string().array(),
  githubRepo: z.string().optional(),
  npmPackage: z.string().optional(),
})

export default defineEventHandler(async (event: H3Event) => {
  const payload = await readValidatedBody(event, payload => schema.parse(payload))

  const existingLibrary = await prisma.library.findFirst({
    where: {
      value: payload.value,
    },
  })

  if (existingLibrary) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: `Library with value ${payload.value} already exists.`,
    })
  }

  const categoryExists = await prisma.category.findUnique({
    where: { value: payload.category },
  })

  if (!categoryExists) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: `Category with ID ${payload.category} does not exist`,
    })
  }

  const [
    existingFrameworks,
    existingFeatures,
    existingComponents,
  ] = await Promise.all([
    prisma.framework.findMany({
      where: { value: { in: payload.frameworks || [] } },
    }),
    prisma.feature.findMany({
      where: { value: { in: payload.features || [] } },
    }),
    prisma.component.findMany({
      where: { value: { in: payload.components || [] } },
    }),
  ])

  if (!existingFrameworks.some(framework => payload.frameworks.includes(framework.value))) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: `Wrong frameworks array: ${payload.frameworks}.`,
    })
  }
  if (!existingFeatures.some(feature => payload.features.includes(feature.value))) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: `Wrong features array: ${payload.features}.`,
    })
  }
  if (!existingComponents.some(component => payload.components.includes(component.value))) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: `Wrong components array: ${payload.components}.`,
    })
  }

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

  const library: Library = await prisma.library.create({
    data: {
      name: payload.name,
      value: payload.value,
      img: payload.img || null,
      link: payload.link || null,
      githubRepo: payload.githubRepo || null,
      npmPackage: payload.npmPackage || null,
      category: {
        connect: {
          id: categoryExists.id,
        },
      },
      frameworks: {
        connect: existingFrameworks.map(framework => ({ id: framework.id })),
      },
      features: {
        connect: existingFeatures.map(feature => ({ id: feature.id })),
      },
      components: {
        connect: existingComponents.map(component => ({ id: component.id })),
      },
      githubStars: githubData?.stargazers_count as number || 0,
      npmDownloads: npmData?.downloads as number || 0,
    },
    include: {
      category: true,
      frameworks: true,
      features: true,
      components: true,
    },
  })

  return library
})
