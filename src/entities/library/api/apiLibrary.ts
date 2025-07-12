import type { ApiError } from '@/shared/model/interfaces/error.interface'
import type { LibraryListPayload, LibraryListRes } from '../model/interfaces/library.interface'

export default function apiLibrary() {
  const { $apiGet } = useNuxtApp()
  const runtimeConfig = useRuntimeConfig()

  async function getLibraryList(payload: LibraryListPayload) {
    return await $apiGet<LibraryListRes>('/libraries', {
      params: payload,
    })
  }

  async function getLibraryGithubData(repoName: string) {
    return await $apiGet<any | ApiError>(`https://api.github.com/repos/${repoName}`, {
      headers: {
        Authorization: `token ${runtimeConfig.public.githubToken}`,
      },
    })
  }

  async function getLibraryNpmData(packageName: string) {
    return await $apiGet<any | ApiError>(`https://api.npmjs.org/downloads/point/last-month/${packageName}`)
  }

  return {
    getLibraryList,
    getLibraryGithubData,
    getLibraryNpmData,
  }
}
