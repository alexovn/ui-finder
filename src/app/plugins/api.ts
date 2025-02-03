import type { ApiError } from '@/shared/model/interfaces/error.interface'
import { FetchError } from 'ofetch'

export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    baseURL: '',
  })

  function setResponseError(err: any) {
    console.error(err)
    if (err instanceof FetchError) {
      return {
        error: true,
        data: err.data,
        status: err.status,
        message: err.message,
      }
    }
    return {
      error: true,
      message: 'Unknown error',
    }
  }

  const apiGet = async <T>(url: string, options?: any): Promise<T | ApiError> => {
    try {
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-ignore
      return await api(url, { method: 'GET', ...options })
    }
    catch (err) {
      return setResponseError(err)
    }
  }

  const apiPost = async <T>(url: string, body: any, options?: any): Promise<T | ApiError> => {
    try {
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-ignore
      return await api(url, { method: 'POST', body, ...options })
    }
    catch (err) {
      return setResponseError(err)
    }
  }

  const apiPatch = async <T>(url: string, body: any, options?: any): Promise<T | ApiError> => {
    try {
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-ignore
      return await api(url, { method: 'PATCH', body, ...options })
    }
    catch (err) {
      return setResponseError(err)
    }
  }

  const apiDelete = async <T>(url: string, options?: any): Promise<T | ApiError> => {
    try {
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-ignore
      return await api(url, { method: 'DELETE', ...options })
    }
    catch (err) {
      return setResponseError(err)
    }
  }

  return {
    provide: {
      api,
      apiGet,
      apiPost,
      apiPatch,
      apiDelete,
    },
  }
})
