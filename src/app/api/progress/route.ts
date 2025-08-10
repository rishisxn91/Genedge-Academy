export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await request.json()
    
    const { lectureId, lastSecond, completed } = body
    
    const progress = await prisma.progress.upsert({
      where: {
        userId_lectureId: {
          userId: user.id,
          lectureId,
        },
      },
      update: {
        lastSecond: parseInt(lastSecond),
        completed: Boolean(completed),
      },
      create: {
        userId: user.id,
        lectureId,
        lastSecond: parseInt(lastSecond),
        completed: Boolean(completed),
      },
    })

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth()
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')
    
    let whereClause: any = {
      userId: user.id,
    }

    if (courseId) {
      whereClause.lecture = {
        module: {
          courseId,
        },
      }
    }

    const progress = await prisma.progress.findMany({
      where: whereClause,
      include: {
        lecture: {
          select: {
            id: true,
            title: true,
            durationSec: true,
            module: {
              select: {
                title: true,
                courseId: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}
