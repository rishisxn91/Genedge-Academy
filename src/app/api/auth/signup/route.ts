export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { memoryStore } from '@/lib/memory-store'
import { createJWT } from '@/lib/auth'

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = signupSchema.parse(body)

    let user

    // Try database first, fallback to memory store
    try {
      // Check if user already exists in database
      const existingUser = await prisma.user.findUnique({
        where: { email }
      })

      if (existingUser) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 400 }
        )
      }

      // Create user in database
      const hashedPassword = await bcrypt.hash(password, 12)
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        }
      })
    } catch (dbError) {
      console.log('Database error, using memory store:', dbError)
      
      // Fallback to memory store
      try {
        user = await memoryStore.createUser({ name, email, password })
      } catch (memoryError) {
        return NextResponse.json(
          { error: memoryError instanceof Error ? memoryError.message : 'User creation failed' },
          { status: 400 }
        )
      }
    }

    // Create JWT token
    const token = await createJWT({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    // Set cookie
    const response = NextResponse.json(
      { user, message: 'User created successfully' },
      { status: 201 }
    )

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 24 * 60 * 60, // 15 days
    })

    return response
  } catch (error) {
    console.error('Signup error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    // Check for database connection errors
    if (error instanceof Error) {
      if (error.message.includes('connect') || error.message.includes('database')) {
        return NextResponse.json(
          { error: 'Database connection failed. Please try again.' },
          { status: 503 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}
