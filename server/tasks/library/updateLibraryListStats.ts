import { PrismaClient } from '@prisma/client'
import { updateLibraryStats } from '~~/server/utils/updateLibraryStats'

const prisma = new PrismaClient()
const BATCH_SIZE = 100

export default defineTask({
  meta: {
    name: 'library:updateLibraryListStats',
    description: 'Run library stats updating',
  },
  async run() {
    let page = 0

    while (true) {
      const libraries = await prisma.library.findMany({
        skip: page * BATCH_SIZE,
        take: BATCH_SIZE,
        select: {
          id: true,
          githubRepo: true,
          npmPackage: true,
        },
      })

      if (libraries.length === 0)
        break

      const requests = libraries.map(async (library) => {
        return await updateLibraryStats(library.id, library.githubRepo, library.npmPackage)
      })

      await Promise.all(requests)
      page++
    }

    return { result: 'success' }
  },
})
