import { PrismaClient } from '@prisma/client'
import { cachedGithubStars, cachedNpmDownloads } from './fetchLibraryStats'

const prisma = new PrismaClient()

export async function updateLibararyStats(libraryId: string, githubRepo: string | null, npmPackage: string | null) {
  const repo = githubRepo ? githubRepo.replace('https://github.com/', '') : null
  const packageName = npmPackage ? npmPackage.replace('https://www.npmjs.com/package/', '') : null

  const [githubStars, npmDownloads] = await Promise.all([
    repo ? cachedGithubStars(repo) : null,
    packageName ? cachedNpmDownloads(packageName) : null,
  ])

  await prisma.library.update({
    where: { id: libraryId },
    data: {
      githubStars: githubStars || 0,
      npmDownloads: npmDownloads || 0,
    },
  })

  return { githubStars, npmDownloads }
}
