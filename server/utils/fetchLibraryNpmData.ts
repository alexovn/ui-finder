export async function fetchLibraryNpmData(packageName: string) {
  try {
    const res: any = await $fetch(`https://api.npmjs.org/downloads/point/last-month/${packageName}`)
    return res
  }
  catch (err) {
    console.error(err)
    return null
  }
}
