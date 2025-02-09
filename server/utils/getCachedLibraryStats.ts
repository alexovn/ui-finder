import { fetchLibraryGithubData } from './fetchLibraryGithubData'
import { fetchLibraryNpmData } from './fetchLibraryNpmData'

export const cachedGithubStars = defineCachedFunction(async (repo: string) => {
  const res = await fetchLibraryGithubData(repo)

  if (!res)
    return null

  return res.stargazers_count as number || 0
}, {
  maxAge: 60 * 60 * 24,
  name: 'githubStars',
  getKey: (repo: string) => repo,
})

export const cachedNpmDownloads = defineCachedFunction(async (packageName: string) => {
  const res = await fetchLibraryNpmData(packageName)

  if (!res)
    return null

  return res.downloads as number || 0
}, {
  maxAge: 60 * 60 * 24,
  name: 'npmDownloads',
  getKey: (packageName: string) => packageName,
})
