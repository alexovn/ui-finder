export const cachedGithubStars = defineCachedFunction(async (repo: string) => {
  try {
    const res: any = await $fetch(`https://api.github.com/repos/${repo}`)
    return res.stargazers_count as number || 0
  }
  catch (err) {
    console.error(err)
  }
}, {
  maxAge: 60 * 60 * 24,
  name: 'githubStars',
  getKey: (repo: string) => repo,
})

export const cachedNpmDownloads = defineCachedFunction(async (packageName: string) => {
  try {
    const res: any = await $fetch(`https://api.npmjs.org/downloads/point/last-month/${packageName}`)
    return res.downloads as number || 0
  }
  catch (err) {
    console.error(err)
  }
}, {
  maxAge: 60 * 60 * 24,
  name: 'npmDownloads',
  getKey: (packageName: string) => packageName,
})
