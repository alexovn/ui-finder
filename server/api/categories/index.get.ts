import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  return await prisma.category.findMany({
    include: {
      _count: {
        select: {
          libraries: true,
        },
      },
    },
  })
})
