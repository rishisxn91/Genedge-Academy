import { Suspense } from 'react'
import Link from 'next/link'
import { Star, Clock, Users, BookOpen, Play, CheckCircle, Lock, Download, Share2, Heart } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import CourseContent from './CourseContent'
import { generateCourseMetadata } from '@/lib/metadata'
import { generateCourseStructuredData } from '@/lib/structured-data'
import Script from 'next/script'

export const dynamic = 'force-dynamic'

interface Course {
  id: string
  title: string
  description: string
  pricePaise: number
  imageUrl: string | null
  published: boolean
  author: {
    name: string
  }
  modules: Array<{
    id: string
    title: string
    description: string | null
    order: number
    lectures: Array<{
      id: string
      title: string
      description: string | null
      videoUrl: string
      durationSec: number
      order: number
      freePreview: boolean
    }>
  }>
  _count: {
    enrollments: number
  }
}

async function getCourse(id: string): Promise<Course | null> {
  try {
    const course = await prisma.course.findUnique({
      where: { id },
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
    return course
  } catch (error) {
    console.error('Error fetching course:', error)
    return null
  }
}

function CourseSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-full mb-6"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="animate-pulse">
              <div className="h-96 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CourseNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
          <BookOpen className="w-12 h-12 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
        <p className="text-gray-600 mb-6">
          This course may have been moved or removed. Please check the course catalog for available courses.
        </p>
        <Link href="/catalog" className="btn-primary">
          Browse Courses
        </Link>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id)
  if (!course) {
    return {
      title: 'Course Not Found',
      description: 'The requested course could not be found.'
    }
  }
  return generateCourseMetadata(course)
}

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id)
  const user = await getCurrentUser()

  if (!course) {
    return <CourseNotFound />
  }

  const structuredData = generateCourseStructuredData(course)

  return (
    <>
      <Script
        id="course-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Suspense fallback={<CourseSkeleton />}>
        <CourseContent course={course} user={user} />
      </Suspense>
    </>
  )
}
