export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { memoryStore } from '@/lib/memory-store'
import { createJWT } from '@/lib/auth'

const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = signinSchema.parse(body)

    let user
    let isValidPassword = false

    // Try database first, fallback to memory store
    try {
      // Find user by email in database
      const dbUser = await prisma.user.findUnique({
        where: { email }
      })

      if (dbUser) {
        // Verify password
        isValidPassword = await bcrypt.compare(password, dbUser.password)
        if (isValidPassword) {
          user = {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            role: dbUser.role,
            createdAt: dbUser.createdAt,
          }
        }
      }
    } catch (dbError) {
      console.log('Database error, trying memory store:', dbError)
    }

    // If database failed or user not found, try memory store
    if (!user) {
      try {
        const memoryUser = await memoryStore.findUserByEmail(email)
        if (memoryUser) {
          isValidPassword = await memoryStore.verifyPassword(email, password)
          if (isValidPassword) {
            const { password: _, ...userWithoutPassword } = memoryUser
            user = userWithoutPassword
          }
        }
      } catch (memoryError) {
        console.log('Memory store error:', memoryError)
      }
    }

    if (!user || !isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = await createJWT({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    // Set cookie
    const response = NextResponse.json({
      user,
      message: 'Login successful'
    })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 24 * 60 * 60, // 15 days
    })

    return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Signin error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
