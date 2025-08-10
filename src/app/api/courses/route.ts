import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireRole } from '@/lib/auth'
import { z } from 'zod'

const lectureSchema = z.object({
  title: z.string().min(1, 'Lecture title is required'),
  description: z.string().optional(),
  videoUrl: z.string().min(1, 'Video URL is required'),
  durationSec: z.number().min(1, 'Duration must be greater than 0'),
  order: z.number().min(1, 'Order must be greater than 0'),
  freePreview: z.boolean().default(false),
})

const moduleSchema = z.object({
  title: z.string().min(1, 'Module title is required'),
  description: z.string().optional(),
  order: z.number().min(1, 'Order must be greater than 0'),
  lectures: z.array(lectureSchema).min(1, 'At least one lecture is required'),
})

const courseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  pricePaise: z.number().min(0, 'Price must be non-negative'),
  imageUrl: z.string().optional(),
  published: z.boolean().default(false),
  modules: z.array(moduleSchema).min(1, 'At least one module is required'),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    
    const where = published === 'true' ? { published: true } : {}
    
    const courses = await prisma.course.findMany({
      where,
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
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(courses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Require ADMIN role for creating courses
    const user = await requireRole('ADMIN')
    
    const body = await request.json()
    const validatedData = courseSchema.parse(body)
    
    const { modules, ...courseData } = validatedData
    
    const course = await prisma.course.create({
      data: {
        ...courseData,
        authorId: user.id,
        modules: {
          create: modules.map(module => ({
            title: module.title,
            description: module.description,
            order: module.order,
            lectures: {
              create: module.lectures.map(lecture => ({
                title: lecture.title,
                description: lecture.description,
                videoUrl: lecture.videoUrl,
                durationSec: lecture.durationSec,
                order: lecture.order,
                freePreview: lecture.freePreview,
              }))
            }
          }))
        }
      },
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
      },
    })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    console.error('Error creating course:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    
    if (error instanceof Error && error.message.includes('Role ADMIN required')) {
      return NextResponse.json(
        { error: 'Admin privileges required to create courses' },
        { status: 403 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
}
