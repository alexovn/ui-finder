import process from 'node:process'
import { createSigner, createVerifier } from 'fast-jwt'

const SECRET_KEY = process.env.JWT_SECRET

const signToken = createSigner({ key: SECRET_KEY, expiresIn: '7d' })
const verifyToken = createVerifier({ key: SECRET_KEY })

export {
  signToken,
  verifyToken,
}
