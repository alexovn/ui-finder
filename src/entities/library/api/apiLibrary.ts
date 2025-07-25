import type { LibraryListPayload, LibraryListRes } from '../model/interfaces/library.interface'
import type { ApiError } from '@/shared/model/interfaces/error.interface'

export default function apiLibrary() {
  const { $apiGet } = useNuxtApp()

  async function getLibraryList(payload: LibraryListPayload): Promise<LibraryListRes | ApiError> {
    return await $apiGet<LibraryListRes>('/libraries', {
      params: payload,
    })
  }

  return {
    getLibraryList,
  }
}
