import type { H3Event } from 'h3'
import { verifyToken } from '../utils/jwt'

export async function checkAuth(event: H3Event) {
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: 'No authorization token provided',
    })
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid authorization format',
    })
  }

  try {
    const decodedToken = await verifyToken(token)
    event.context.auth = decodedToken
  }
  catch (err) {
    console.error(err)
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }
}
