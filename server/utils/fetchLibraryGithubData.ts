export async function fetchLibraryGithubData(repo: string) {
  try {
    const res: any = await $fetch(`https://api.github.com/repos/${repo}`)
    return res
  }
  catch (err) {
    console.error(err)
    return null
  }
}
