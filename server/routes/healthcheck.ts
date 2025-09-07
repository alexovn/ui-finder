import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  try {
    return {
      status: 'ok',
    }
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (error: any) {
    return {
      status: 'error',
    }
  }
})
