'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, Clock, Users, BookOpen, Play, CheckCircle, Lock, Download, Share2, Heart } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

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

export default function CourseContent({ course, user }: { course: Course; user: any }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews' | 'instructor'>('overview')
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'instructor', label: 'Instructor' }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  const handleEnroll = async () => {
    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId: course.id }),
      })
      
      if (response.ok) {
        setIsEnrolled(true)
        window.location.href = '/dashboard'
      } else {
        const error = await response.json()
        if (response.status === 401) {
          alert('Please sign in to enroll in this course')
          window.location.href = '/auth/signin'
        } else if (response.status === 400 && error.error === 'Already enrolled in this course') {
          setIsEnrolled(true)
          alert('You are already enrolled in this course!')
          window.location.href = '/dashboard'
        } else {
          alert(error.error || error.message || 'Failed to enroll')
        }
      }
    } catch (error) {
      alert('Failed to enroll in course')
    }
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const getTotalLectures = () => {
    return course.modules.reduce((total, module) => total + module.lectures.length, 0)
  }

  const getTotalDuration = () => {
    return course.modules.reduce((total, module) => 
      total + module.lectures.reduce((moduleTotal, lecture) => moduleTotal + lecture.durationSec, 0), 0
    )
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-medium text-ge-600 uppercase tracking-wide bg-ge-50 px-2 py-1 rounded-full">
                  AI Learning
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-xs sm:text-sm text-gray-500 bg-green-50 px-2 py-1 rounded-full">Beginner</span>
                <span className="text-gray-400">•</span>
                <span className="text-xs sm:text-sm text-gray-500">Hindi</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                {course.title}
              </h1>
              
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                {course.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="flex items-center space-x-1">
                  {renderStars(4.8)}
                  <span className="text-xs sm:text-sm text-gray-600 ml-1">(4.8)</span>
                </div>
                <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{course._count.enrollments.toLocaleString()} students enrolled</span>
                </div>
                <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{formatDuration(getTotalDuration())} total</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                {!user ? (
                  <Link
                    href="/auth/signin"
                    className="btn-primary flex items-center space-x-2 text-sm sm:text-base"
                  >
                    <Play className="w-4 h-4" />
                    <span>Sign In to Enroll</span>
                  </Link>
                ) : (
                  <button
                    onClick={handleEnroll}
                    disabled={isEnrolled}
                    className={`btn-primary flex items-center space-x-2 text-sm sm:text-base ${
                      isEnrolled ? 'bg-green-600 hover:bg-green-700' : ''
                    }`}
                  >
                    {isEnrolled ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Enrolled</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Enroll Now</span>
                      </>
                    )}
                  </button>
                )}
                
                <button
                  onClick={handleWishlist}
                  className={`btn-outline flex items-center space-x-2 text-sm sm:text-base ${
                    isWishlisted ? 'text-red-600 border-red-600' : ''
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span className="hidden sm:inline">{isWishlisted ? 'Wishlisted' : 'Wishlist'}</span>
                </button>
                
                <button className="btn-outline flex items-center space-x-2 text-sm sm:text-base">
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>
            </div>
            
            {/* Course Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 sticky top-6">
                <div className="w-full h-32 sm:h-48 bg-gradient-to-br from-ge-500 to-ge-600 rounded-lg sm:rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                  {course.imageUrl ? (
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                    />
                  ) : (
                    <Play className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                  )}
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-ge-600 ml-1" />
                    </div>
                  </div>
                </div>
                
                <div className="text-center mb-4 sm:mb-6">
                  <div className="text-2xl sm:text-3xl font-bold text-ge-600 mb-1 sm:mb-2">
                    {formatPrice(course.pricePaise)}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500">One-time payment</p>
                </div>
                
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Course includes:</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-xs sm:text-sm">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                      <span>{formatDuration(getTotalDuration())} of content</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                      <span>{getTotalLectures()} lectures</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                      <span>Access on mobile and TV</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                      <span>Certificate of completion</span>
                    </div>
                  </div>
                </div>
                
                {!user ? (
                  <Link
                    href="/auth/signin"
                    className="w-full btn-primary text-center text-sm sm:text-base"
                  >
                    Sign In to Enroll
                  </Link>
                ) : (
                  <button
                    onClick={handleEnroll}
                    disabled={isEnrolled}
                    className={`w-full btn-primary text-sm sm:text-base ${
                      isEnrolled ? 'bg-green-600 hover:bg-green-700' : ''
                    }`}
                  >
                    {isEnrolled ? 'Go to Course' : 'Enroll Now'}
                  </button>
                )}
                
                <p className="text-xs text-center text-gray-500 mt-2 sm:mt-3">
                  30-Day Money-Back Guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-ge-500 text-ge-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* What you'll learn */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">What you'll learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">Master the fundamentals of AI and prompt engineering</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">Learn to create effective prompts for AI tools</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">Understand advanced prompting techniques</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">Apply AI skills in real-world scenarios</span>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Requirements</h2>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Basic computer knowledge</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">No prior AI experience required</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">A computer with internet connection</span>
                  </li>
                </ul>
              </div>

              {/* Course description */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Description</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {course.description}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-4">
                    This comprehensive course is designed to take you from complete beginner to AI practitioner. You'll learn modern AI technologies and build practical skills that you can apply immediately.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-4 sm:space-y-6">
              {/* Course stats */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Course Statistics</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-gray-600">Total Students</span>
                    <span className="text-sm sm:text-base font-semibold">{course._count.enrollments.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-gray-600">Total Lectures</span>
                    <span className="text-sm sm:text-base font-semibold">{getTotalLectures()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-gray-600">Course Duration</span>
                    <span className="text-sm sm:text-base font-semibold">{formatDuration(getTotalDuration())}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-gray-600">Language</span>
                    <span className="text-sm sm:text-base font-semibold">Hindi</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Features</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">HD Video Lessons</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">Downloadable Resources</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">Certificate of Completion</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">Lifetime Access</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">Mobile & TV Access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Course Curriculum</h2>
              <div className="text-sm text-gray-500">
                {course.modules.length} sections • {getTotalLectures()} lessons • {formatDuration(getTotalDuration())}
              </div>
            </div>
            
            <div className="space-y-4">
              {course.modules.map((module) => (
                <div key={module.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">{module.title}</h3>
                    {module.description && (
                      <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                    )}
                  </div>
                  <div className="divide-y divide-gray-200">
                    {module.lectures.map((lecture) => (
                      <div key={lecture.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {lecture.freePreview ? (
                              <Play className="w-5 h-5 text-ge-500" />
                            ) : (
                              <Lock className="w-5 h-5 text-gray-400" />
                            )}
                            <div>
                              <h4 className="font-medium text-gray-900">{lecture.title}</h4>
                              <p className="text-sm text-gray-500">
                                {formatDuration(lecture.durationSec)} • Video
                                {lecture.freePreview && (
                                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    Preview
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {!lecture.freePreview && (
                              <Lock className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Student Reviews</h2>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">4.8</div>
                  <div className="flex items-center justify-center mb-1">
                    {renderStars(4.8)}
                  </div>
                  <div className="text-sm text-gray-500">Course Rating</div>
                </div>
              </div>
            </div>
            
            <div className="text-center py-12">
              <p className="text-gray-600">No reviews yet. Be the first to review this course!</p>
            </div>
          </div>
        )}

        {activeTab === 'instructor' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">About the Instructor</h2>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 bg-gradient-to-br from-ge-500 to-ge-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-white">
                    {course.author.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.author.name}</h3>
                  <p className="text-gray-600 mb-4">
                    AI expert and instructor with years of experience in artificial intelligence and prompt engineering. 
                    Passionate about teaching and helping students master AI technologies.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">4.8</div>
                      <div className="text-gray-500">Instructor Rating</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">1</div>
                      <div className="text-gray-500">Courses</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{course._count.enrollments}</div>
                      <div className="text-gray-500">Students</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">5+</div>
                      <div className="text-gray-500">Years Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
