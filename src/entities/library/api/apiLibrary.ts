import type { LibraryListPayload, LibraryListRes, LibraryListTotalCounterRes } from '../model/interfaces/library.interface'
import type { ApiError } from '@/shared/model/interfaces/error.interface'

export default function apiLibrary() {
  const { $apiGet } = useNuxtApp()

  async function getLibraryList(payload: LibraryListPayload): Promise<LibraryListRes | ApiError> {
    return await $apiGet<LibraryListRes>('/libraries', {
      params: payload,
    })
  }

  async function getLibraryListTotalCounter(): Promise<LibraryListTotalCounterRes | ApiError> {
    return await $apiGet<LibraryListTotalCounterRes>('/libraries/total')
  }

  return {
    getLibraryList,
    getLibraryListTotalCounter,
  }
}
