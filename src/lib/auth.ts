import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { prisma } from './db'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'
const JWT_ALGORITHM = 'HS256'

export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat: number
  exp: number
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createJWT(payload: Omit<JWTPayload, 'iat' | 'exp'>): Promise<string> {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime('15d')
    .sign(new TextEncoder().encode(JWT_SECRET))
  
  return jwt
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    return payload as unknown as JWTPayload
  } catch (error) {
    return null
  }
}

export async function getCurrentUser(): Promise<any> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    
    if (!token) return null
    
    const payload = await verifyJWT(token)
    if (!payload) return null
    
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      }
    })
    
    return user
  } catch (error) {
    return null
  }
}

export async function requireAuth(): Promise<any> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Authentication required')
  }
  return user
}

export async function requireRole(requiredRole: string): Promise<any> {
  const user = await requireAuth()
  if (user.role !== requiredRole && user.role !== 'ADMIN') {
    throw new Error(`Role ${requiredRole} required`)
  }
  return user
}
