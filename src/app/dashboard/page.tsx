'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Play, 
  TrendingUp, 
  Award,
  Calendar,
  Target
} from 'lucide-react'
import { formatPrice, formatDuration, calculateProgress } from '@/lib/utils'

interface Course {
  id: string
  title: string
  description: string
  imageUrl?: string
  modules: Array<{
    id: string
    title: string
    lectures: Array<{
      id: string
      title: string
      durationSec: number
    }>
  }>
}

interface Enrollment {
  id: string
  enrolledAt: string
  course: Course
}

interface Progress {
  id: string
  lastSecond: number
  completed: boolean
  lecture: {
    id: string
    title: string
    durationSec: number
    module: {
      title: string
    }
  }
}

export default function DashboardPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [progress, setProgress] = useState<Progress[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch enrollments
      const enrollmentsResponse = await fetch('/api/enrollments')
      if (enrollmentsResponse.ok) {
        const enrollmentsData = await enrollmentsResponse.json()
        setEnrollments(enrollmentsData)
      }

      // Fetch progress for all courses
      const progressResponse = await fetch('/api/progress')
      if (progressResponse.ok) {
        const progressData = await progressResponse.json()
        setProgress(progressData)
      }
    } catch (error) {
      setError('Failed to load dashboard data')
    } finally {
      setIsLoading(false)
    }
  }

  const getCourseProgress = (courseId: string) => {
    // For now, return mock progress since we need to restructure the API
    return { completed: 0, total: 0, percentage: 0 }
  }

  const getTotalDuration = (course: Course) => {
    return course.modules.reduce((total, module) => 
      total + module.lectures.reduce((moduleTotal, lecture) => 
        moduleTotal + lecture.durationSec, 0
      ), 0
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Learning Dashboard
          </h1>
          <p className="text-gray-600">
            Track your progress and continue your AI learning journey
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-8">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                <p className="text-2xl font-bold text-gray-900">{enrollments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Lectures</p>
                <p className="text-2xl font-bold text-gray-900">
                  {progress.filter(p => p.completed).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatDuration(progress.reduce((total, p) => total + p.lastSecond, 0))}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {enrollments.length > 0 
                    ? Math.round(enrollments.reduce((total, enrollment) => {
                        const progress = getCourseProgress(enrollment.course.id)
                        return total + progress.percentage
                      }, 0) / enrollments.length)
                    : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            My Courses
          </h2>

          {enrollments.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No courses enrolled yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start your AI learning journey by enrolling in a course
              </p>
              <Link
                href="/catalog"
                className="btn-primary px-6 py-3"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => {
                const courseProgress = getCourseProgress(enrollment.course.id)
                const totalDuration = getTotalDuration(enrollment.course)
                
                return (
                  <div key={enrollment.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-video bg-gradient-to-br from-ge-500 to-ge-600 flex items-center justify-center">
                      {enrollment.course.imageUrl ? (
                        <img
                          src={enrollment.course.imageUrl}
                          alt={enrollment.course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Play className="w-12 h-12 text-white" />
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                        {enrollment.course.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {enrollment.course.description}
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{courseProgress.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-ge-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${courseProgress.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDuration(totalDuration)}
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          {courseProgress.completed}/{courseProgress.total} completed
                        </div>
                      </div>
                      
                      <Link
                        href={`/course/${enrollment.course.id}`}
                        className="w-full btn-primary text-center py-2"
                      >
                        Continue Learning
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recent Activity
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            {progress.length === 0 ? (
              <div className="text-center py-8">
                <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No recent activity</p>
              </div>
            ) : (
              <div className="space-y-4">
                {progress.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full ${item.completed ? 'bg-green-100' : 'bg-blue-100'}`}>
                      {item.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Play className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.lecture.title}</p>
                      <p className="text-sm text-gray-600">{item.lecture.module.title}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.completed ? 'Completed' : `${Math.round((item.lastSecond / item.lecture.durationSec) * 100)}%`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/catalog"
                className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <BookOpen className="w-5 h-5 mr-3" />
                Browse New Courses
              </Link>
              <Link
                href="/pricing"
                className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Award className="w-5 h-5 mr-3" />
                View Pricing Plans
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Goals</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Complete 5 courses</span>
                <span className="text-sm text-gray-500">
                  {enrollments.length}/5
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Watch 50 hours</span>
                <span className="text-sm text-gray-500">
                  {Math.round(progress.reduce((total, p) => total + p.lastSecond, 0) / 3600)}/50h
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
