import type { H3Event } from 'h3'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { z } from 'zod'

const prisma = new PrismaClient()

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  userName: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

export default defineEventHandler(async (event: H3Event) => {
  const existingUserOne = await prisma.user.count()
  if (existingUserOne > 0) {
    return createError({
      statusCode: 403,
      statusMessage: 'Registration is disabled',
    })
  }

  const payload = await readValidatedBody(event, payload => schema.parse(payload))

  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  })

  if (existingUser) {
    return createError({
      statusCode: 400,
      statusMessage: 'Email already exists',
    })
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10)

  const user = await prisma.user.create({
    data: {
      email: payload.email,
      password: hashedPassword,
      userName: payload.userName,
    },
  })

  return {
    id: user.id,
    email: user.email,
    userName: user.userName,
  }
})
