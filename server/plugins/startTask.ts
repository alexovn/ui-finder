export default defineNitroPlugin(async () => {
  const { result } = await runTask('library:updateLibraryListStats')
  return { result }
})
