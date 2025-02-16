import type { H3Event } from 'h3'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const schema = z.object({
  uuid: z.string().uuid(),
})

export default defineEventHandler(async (event: H3Event) => {
  const params = await getValidatedRouterParams(event, schema.parse)

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

  return await prisma.library.delete({
    where: {
      id: params.uuid,
    },
    include: {
      category: true,
      frameworks: true,
      features: true,
      components: true,
    },
  })
})
