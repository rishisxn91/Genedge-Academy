export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireRole } from '@/lib/auth'
import { z } from 'zod'

const courseUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  pricePaise: z.number().min(0, 'Price must be non-negative').optional(),
  imageUrl: z.string().optional(),
  published: z.boolean().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        modules: {
          include: {
            lectures: true,
          },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    })

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(course)
  } catch (error) {
    console.error('Error fetching course:', error)
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Require ADMIN role for updating courses
    const user = await requireRole('ADMIN')
    
    const body = await request.json()
    const validatedData = courseUpdateSchema.parse(body)
    
    // Check if course exists and user is the author or admin
    const existingCourse = await prisma.course.findUnique({
      where: { id: params.id },
      select: { authorId: true },
    })
    
    if (!existingCourse) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }
    
    if (existingCourse.authorId !== user.id && user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'You can only edit your own courses' },
        { status: 403 }
      )
    }
    
    const course = await prisma.course.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    console.error('Error updating course:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    
    if (error instanceof Error && error.message.includes('Role ADMIN required')) {
      return NextResponse.json(
        { error: 'Admin privileges required to update courses' },
        { status: 403 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Require ADMIN role for deleting courses
    const user = await requireRole('ADMIN')
    
    // Check if course exists and user is the author or admin
    const existingCourse = await prisma.course.findUnique({
      where: { id: params.id },
      select: { authorId: true },
    })
    
    if (!existingCourse) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }
    
    if (existingCourse.authorId !== user.id && user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'You can only delete your own courses' },
        { status: 403 }
      )
    }
    
    await prisma.course.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Course deleted successfully' })
  } catch (error) {
    console.error('Error deleting course:', error)
    
    if (error instanceof Error && error.message.includes('Role ADMIN required')) {
      return NextResponse.json(
        { error: 'Admin privileges required to delete courses' },
        { status: 403 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    )
  }
}
