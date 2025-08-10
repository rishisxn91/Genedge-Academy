'use client'

import { CheckCircle, PlayCircle, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CourseProgress {
  courseId: string
  courseTitle: string
  totalLessons: number
  completedLessons: number
  currentLesson: number
  progress: number
  lastAccessed: string
}

interface ProgressBarProps {
  progress: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function ProgressBar({ 
  progress, 
  size = 'md', 
  showLabel = true, 
  className = '' 
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100)
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }
  
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className={`font-medium text-gray-700 ${textSizes[size]}`}>
            Progress
          </span>
          <span className={`font-semibold text-ge-600 ${textSizes[size]}`}>
            {Math.round(clampedProgress)}%
          </span>
        </div>
      )}
      
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <div
          className="bg-ge-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${clampedProgress}%` }}
        >
          <div className="h-full bg-gradient-to-r from-ge-500 to-ge-600 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

interface LessonProgressProps {
  lesson: {
    id: string
    title: string
    duration: string
    type: 'video' | 'text' | 'quiz' | 'assignment'
    status: 'completed' | 'in-progress' | 'locked' | 'available'
    isPreview?: boolean
  }
  onClick?: () => void
}

export function LessonProgress({ lesson, onClick }: LessonProgressProps) {
  const getStatusIcon = () => {
    switch (lesson.status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'in-progress':
        return <PlayCircle className="w-5 h-5 text-ge-500" />
      case 'locked':
        return <Lock className="w-5 h-5 text-gray-400" />
      default:
        return <PlayCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = () => {
    switch (lesson.status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'in-progress':
        return 'text-ge-600 bg-ge-50 border-ge-200'
      case 'locked':
        return 'text-gray-500 bg-gray-50 border-gray-200'
      default:
        return 'text-gray-600 bg-white border-gray-200'
    }
  }

  const getTypeIcon = () => {
    switch (lesson.type) {
      case 'video':
        return '🎥'
      case 'text':
        return '📖'
      case 'quiz':
        return '❓'
      case 'assignment':
        return '📝'
      default:
        return '📚'
    }
  }

  return (
    <div
      className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-sm ${
        lesson.status === 'locked' ? 'cursor-not-allowed opacity-60' : 'hover:bg-gray-50'
      } ${getStatusColor()}`}
      onClick={lesson.status !== 'locked' ? onClick : undefined}
    >
      <div className="flex-shrink-0">
        {getStatusIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getTypeIcon()}</span>
          <h4 className="font-medium text-gray-900 truncate">
            {lesson.title}
          </h4>
          {lesson.isPreview && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              Preview
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500">{lesson.duration}</p>
      </div>
      
      <div className="flex-shrink-0">
        <span className="text-xs font-medium text-gray-500">
          {lesson.type}
        </span>
      </div>
    </div>
  )
}

interface CourseProgressCardProps {
  course: CourseProgress
  onContinue?: () => void
}

export function CourseProgressCard({ course, onContinue }: CourseProgressCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate mb-1">
            {course.courseTitle}
          </h3>
          <p className="text-sm text-gray-500">
            {course.completedLessons} of {course.totalLessons} lessons completed
          </p>
        </div>
        <span className="text-xs text-gray-400 ml-2">
          {course.lastAccessed}
        </span>
      </div>
      
      <ProgressBar progress={course.progress} size="sm" showLabel={false} className="mb-3" />
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Lesson {course.currentLesson} of {course.totalLessons}
        </span>
        {onContinue && (
          <button
            onClick={onContinue}
            className="btn-primary text-xs px-3 py-1"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  )
}

interface LearningStatsProps {
  stats: {
    totalCourses: number
    completedCourses: number
    totalHours: number
    certificates: number
    streak: number
  }
}

export function LearningStats({ stats }: LearningStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-ge-600">{stats.totalCourses}</div>
        <div className="text-xs text-gray-500">Total Courses</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600">{stats.completedCourses}</div>
        <div className="text-xs text-gray-500">Completed</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">{stats.totalHours}</div>
        <div className="text-xs text-gray-500">Hours</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-purple-600">{stats.certificates}</div>
        <div className="text-xs text-gray-500">Certificates</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-orange-600">{stats.streak}</div>
        <div className="text-xs text-gray-500">Day Streak</div>
      </div>
    </div>
  )
}
