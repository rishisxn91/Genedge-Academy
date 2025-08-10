'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, Play, Clock, Users, Star } from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  pricePaise: number
  imageUrl?: string
  published: boolean
  author: {
    name: string
  }
  modules: Array<{
    lectures: Array<{
      id: string
    }>
  }>
  _count: {
    enrollments: number
  }
}

export default function CatalogPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    filterCourses()
  }, [courses, searchTerm])

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses?published=true')
      if (response.ok) {
        const data = await response.json()
        setCourses(data)
      } else {
        setError('Failed to fetch courses')
      }
    } catch (error) {
      setError('Failed to fetch courses')
    } finally {
      setIsLoading(false)
    }
  }

  const filterCourses = () => {
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCourses(filtered)
  }

  const formatPrice = (pricePaise: number) => {
    return `₹${(pricePaise / 100).toLocaleString()}`
  }

  const getTotalLectures = (course: Course) => {
    return course.modules.reduce((total, module) => total + module.lectures.length, 0)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Course Catalog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive collection of AI courses designed to help you master artificial intelligence at your own pace.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ge-500 focus:border-transparent"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-8">
            {error}
          </div>
        )}

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or browse all courses.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video bg-gradient-to-br from-ge-500 to-ge-600 flex items-center justify-center">
                  {course.imageUrl ? (
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Play className="w-12 h-12 text-white" />
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {getTotalLectures(course)} lectures
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course._count.enrollments} students
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">4.8</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-ge-600">
                      {formatPrice(course.pricePaise)}
                    </div>
                    <Link
                      href={`/course/${course.id}`}
                      className="btn-primary text-sm py-2 px-4"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-ge-600 mb-2">
                {courses.length}
              </div>
              <div className="text-gray-600">Courses Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-ge-600 mb-2">
                {courses.reduce((total, course) => total + getTotalLectures(course), 0)}
              </div>
              <div className="text-gray-600">Total Lectures</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-ge-600 mb-2">
                {courses.reduce((total, course) => total + course._count.enrollments, 0)}
              </div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-ge-600 mb-2">100%</div>
              <div className="text-gray-600">Self-Paced</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
