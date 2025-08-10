'use client'

import { Star, Clock, Users, BookOpen, Play } from 'lucide-react'
import Link from 'next/link'

interface CourseCardProps {
  course: {
    id: string
    title: string
    description: string
    instructor: string
    rating: number
    students: number
    duration: string
    price: number
    originalPrice?: number
    image: string
    category: string
    level: string
    lessons: number
  }
  variant?: 'default' | 'compact' | 'featured'
}

export function CourseCard({ course, variant = 'default' }: CourseCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price)
  }

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

  if (variant === 'compact') {
    return (
      <Link href={`/course/${course.id}`} className="block">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <div className="flex">
            <div className="w-24 h-24 bg-gray-200 rounded-l-lg flex-shrink-0">
              {course.image && (
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover rounded-l-lg"
                />
              )}
            </div>
            <div className="flex-1 p-3">
              <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                {course.title}
              </h3>
              <p className="text-gray-600 text-xs mb-2">{course.instructor}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {renderStars(course.rating)}
                  <span className="text-xs text-gray-600 ml-1">({course.rating})</span>
                </div>
                <span className="font-semibold text-ge-600 text-sm">
                  {course.originalPrice ? (
                    <span className="line-through text-gray-400 mr-2">
                      {formatPrice(course.originalPrice)}
                    </span>
                  ) : null}
                  {formatPrice(course.price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link href={`/course/${course.id}`} className="block">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
          <div className="relative">
            <div className="w-full h-48 bg-gray-200 rounded-t-2xl">
              {course.image && (
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
              )}
            </div>
            <div className="absolute top-3 left-3">
              <span className="bg-ge-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Featured
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <span className="bg-white text-gray-700 text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                {course.level}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs font-medium text-ge-600 uppercase tracking-wide">
                {course.category}
              </span>
            </div>
            
            <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">
              {course.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {course.description}
            </p>
            
            <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>{course.lessons} lessons</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{course.students.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1">
                {renderStars(course.rating)}
                <span className="text-sm text-gray-600 ml-1">({course.rating})</span>
              </div>
              <span className="text-xs text-gray-500">by {course.instructor}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-right">
                {course.originalPrice ? (
                  <span className="line-through text-gray-400 text-sm block">
                    {formatPrice(course.originalPrice)}
                  </span>
                ) : null}
                <span className="font-bold text-2xl text-ge-600">
                  {formatPrice(course.price)}
                </span>
              </div>
              <button className="btn-primary flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Enroll Now</span>
              </button>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link href={`/course/${course.id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
        <div className="relative">
          <div className="w-full h-40 bg-gray-200 rounded-t-xl">
            {course.image && (
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover rounded-t-xl"
              />
            )}
          </div>
          <div className="absolute top-2 right-2">
            <span className="bg-white text-gray-700 text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
              {course.level}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs font-medium text-ge-600 uppercase tracking-wide">
              {course.category}
            </span>
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {course.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {course.description}
          </p>
          
          <div className="flex items-center space-x-3 mb-3 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen className="w-3 h-3" />
              <span>{course.lessons} lessons</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{course.students.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              {renderStars(course.rating)}
              <span className="text-xs text-gray-600 ml-1">({course.rating})</span>
            </div>
            <span className="text-xs text-gray-500">by {course.instructor}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-right">
              {course.originalPrice ? (
                <span className="line-through text-gray-400 text-sm block">
                  {formatPrice(course.originalPrice)}
                </span>
              ) : null}
              <span className="font-bold text-lg text-ge-600">
                {formatPrice(course.price)}
              </span>
            </div>
            <button className="btn-primary text-sm px-4 py-2">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
