import type { H3Event } from 'h3'
import type { Library } from '~~/server/interfaces/library/library.interface'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const schema = z.object({
  uuid: z.string().uuid(),
})

export default defineEventHandler(async (event: H3Event) => {
  const params = await getValidatedRouterParams(event, schema.parse)

  const library: Library | null = await prisma.library.findUnique({
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

  return library
})
