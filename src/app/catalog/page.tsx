'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, Play, Clock, Users, Star, BookOpen, Zap, Target, TrendingUp } from 'lucide-react'

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

// Sample course data for demonstration
const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'AI in 1 Hour — Beginner Kickstart',
    description: 'Understand key concepts and ship your first AI mini‑project. Perfect for complete beginners who want to get started with AI quickly.',
    pricePaise: 0,
    published: true,
    author: { name: 'GenEdge Academy' },
    modules: [{ lectures: [{ id: '1' }, { id: '2' }, { id: '3' }] }],
    _count: { enrollments: 1250 }
  },
  {
    id: '2',
    title: 'AI Tools to Save 10 Hours/Week',
    description: 'Email, docs, sheets, and research — streamlined with AI. Learn practical tools that immediately boost your productivity.',
    pricePaise: 0,
    published: true,
    author: { name: 'GenEdge Academy' },
    modules: [{ lectures: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }] }],
    _count: { enrollments: 2100 }
  },
  {
    id: '3',
    title: 'Prompt Engineering Essentials',
    description: 'Reliable prompts for ChatGPT, Claude, and Gemini. Master the art of communicating effectively with AI models.',
    pricePaise: 0,
    published: true,
    author: { name: 'GenEdge Academy' },
    modules: [{ lectures: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }] }],
    _count: { enrollments: 1800 }
  },
  {
    id: '4',
    title: 'AI for Business Automation',
    description: 'Automate your business processes with AI. Learn to build workflows that save time and increase efficiency.',
    pricePaise: 249900,
    published: true,
    author: { name: 'GenEdge Academy' },
    modules: [{ lectures: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }] }],
    _count: { enrollments: 950 }
  },
  {
    id: '5',
    title: 'AI Content Creation Mastery',
    description: 'Create engaging content with AI tools. From blog posts to social media, learn to generate high-quality content efficiently.',
    pricePaise: 199900,
    published: true,
    author: { name: 'GenEdge Academy' },
    modules: [{ lectures: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }] }],
    _count: { enrollments: 1600 }
  },
  {
    id: '6',
    title: 'Advanced AI Agents Development',
    description: 'Build intelligent AI agents that can handle complex tasks. Learn advanced techniques for creating sophisticated AI systems.',
    pricePaise: 399900,
    published: true,
    author: { name: 'GenEdge Academy' },
    modules: [{ lectures: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }, { id: '7' }] }],
    _count: { enrollments: 750 }
  }
]

export default function CatalogPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const categories = [
    { id: 'all', name: 'All Courses', icon: BookOpen },
    { id: 'free', name: 'Free Courses', icon: Zap },
    { id: 'beginner', name: 'Beginner', icon: Target },
    { id: 'advanced', name: 'Advanced', icon: TrendingUp }
  ]

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    filterCourses()
  }, [courses, searchTerm, selectedCategory])

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses?published=true')
      if (response.ok) {
        const data = await response.json()
        setCourses(data.length > 0 ? data : sampleCourses) // Use sample data if API returns empty
      } else {
        setCourses(sampleCourses) // Fallback to sample data
      }
    } catch (error) {
      setCourses(sampleCourses) // Fallback to sample data
    } finally {
      setIsLoading(false)
    }
  }

  const filterCourses = () => {
    let filtered = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Apply category filter
    if (selectedCategory === 'free') {
      filtered = filtered.filter(course => course.pricePaise === 0)
    } else if (selectedCategory === 'beginner') {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes('beginner') || 
        course.title.toLowerCase().includes('essentials') ||
        course.title.toLowerCase().includes('kickstart')
      )
    } else if (selectedCategory === 'advanced') {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes('advanced') || 
        course.title.toLowerCase().includes('mastery') ||
        course.title.toLowerCase().includes('development')
      )
    }

    setFilteredCourses(filtered)
  }

  const formatPrice = (pricePaise: number) => {
    if (pricePaise === 0) return 'Free'
    return `₹${(pricePaise / 100).toLocaleString()}`
  }

  const getTotalLectures = (course: Course) => {
    return course.modules.reduce((total, module) => total + module.lectures.length, 0)
  }

  const getCourseLevel = (course: Course) => {
    if (course.title.toLowerCase().includes('beginner') || course.title.toLowerCase().includes('essentials')) {
      return 'Beginner'
    } else if (course.title.toLowerCase().includes('advanced') || course.title.toLowerCase().includes('mastery')) {
      return 'Advanced'
    }
    return 'Intermediate'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
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
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Course Catalog
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive collection of AI courses designed to help you master artificial intelligence at your own pace.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-ge-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 sm:mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-ge-500 focus:border-transparent text-base"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 sm:mb-8">
            {error}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6 sm:mb-8">
          <p className="text-sm sm:text-base text-gray-600 text-center">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Try adjusting your search terms or browse all courses.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100">
                {/* Course Image */}
                <div className="aspect-video bg-gradient-to-br from-ge-500 to-ge-600 flex items-center justify-center relative">
                  {course.imageUrl ? (
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Play className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                  )}
                  
                  {/* Level Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getCourseLevel(course) === 'Beginner' 
                        ? 'bg-green-100 text-green-800' 
                        : getCourseLevel(course) === 'Advanced'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {getCourseLevel(course)}
                    </span>
                  </div>
                  
                  {/* Price Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.pricePaise === 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {formatPrice(course.pricePaise)}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {getTotalLectures(course)} lectures
                      </div>
                      <div className="flex items-center">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {course._count.enrollments.toLocaleString()} students
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                      <span className="text-xs sm:text-sm text-gray-600 ml-1">4.8</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg sm:text-2xl font-bold text-ge-600">
                      {formatPrice(course.pricePaise)}
                    </div>
                    <Link
                      href={`/course/${course.id}`}
                      className="btn-primary text-sm py-2 px-3 sm:px-4"
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
        <div className="mt-12 sm:mt-16 bg-white rounded-xl sm:rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-ge-600 mb-1 sm:mb-2">
                {courses.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Courses Available</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-ge-600 mb-1 sm:mb-2">
                {courses.reduce((total, course) => total + getTotalLectures(course), 0)}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Total Lectures</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-ge-600 mb-1 sm:mb-2">
                {courses.reduce((total, course) => total + course._count.enrollments, 0).toLocaleString()}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Students Enrolled</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-ge-600 mb-1 sm:mb-2">100%</div>
              <div className="text-xs sm:text-sm text-gray-600">Self-Paced</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-gradient-to-r from-ge-600 to-ge-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Ready to Start Your AI Journey?
            </h2>
            <p className="text-sm sm:text-base text-ge-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already mastering AI skills with GenEdge Academy. Start with our free courses and unlock your potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="btn-primary bg-white text-ge-600 hover:bg-gray-100"
              >
                Get Started Free
              </Link>
              <Link
                href="/pricing"
                className="btn-outline border-white text-white hover:bg-white hover:text-ge-600"
              >
                View All Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
