import type { H3Event } from 'h3'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import { signToken } from '~~/server/utils/jwt'

const prisma = new PrismaClient()

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export default defineEventHandler(async (event: H3Event) => {
  const payload = await readValidatedBody(event, payload => schema.parse(payload))

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  })
  if (!user) {
    return createError({
      statusCode: 400,
      statusMessage: 'Invalid credentials',
    })
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password)
  if (!isPasswordValid) {
    return createError({
      statusCode: 400,
      statusMessage: 'Invalid credentials',
    })
  }

  const token = signToken({ userId: user.id })

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      userName: user.userName,
    },
  }
})
