'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Upload,
  AlertTriangle,
  Shield
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface Module {
  id?: string
  title: string
  description: string
  order: number
  lectures: Lecture[]
}

interface Lecture {
  id?: string
  title: string
  description: string
  videoUrl: string
  durationSec: number
  order: number
  freePreview: boolean
}

export default function CreateCoursePage() {
  const [user, setUser] = useState<User | null>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pricePaise: 0,
    imageUrl: '',
    published: false,
  })

  const [modules, setModules] = useState<Module[]>([
    {
      title: '',
      description: '',
      order: 1,
      lectures: [
        {
          title: '',
          description: '',
          videoUrl: '',
          durationSec: 0,
          order: 1,
          freePreview: true,
        }
      ]
    }
  ])

  useEffect(() => {
    checkAuthAndAccess()
  }, [])

  const checkAuthAndAccess = async () => {
    try {
      const response = await fetch('/api/auth/me')
      
      if (response.ok) {
        const userData = await response.json()
        
        if (userData.role !== 'ADMIN') {
          setError('Access denied. Admin privileges required.')
          router.push('/dashboard')
          return
        }
        
        setUser(userData)
      } else {
        router.push('/auth/signin')
        return
      }
    } catch (error) {
      setError('Authentication failed')
      router.push('/auth/signin')
    } finally {
      setIsCheckingAuth(false)
    }
  }

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addModule = () => {
    setModules(prev => [
      ...prev,
      {
        title: '',
        description: '',
        order: prev.length + 1,
        lectures: [
          {
            title: '',
            description: '',
            videoUrl: '',
            durationSec: 0,
            order: 1,
            freePreview: true,
          }
        ]
      }
    ])
  }

  const removeModule = (moduleIndex: number) => {
    if (modules.length > 1) {
      setModules(prev => prev.filter((_, index) => index !== moduleIndex))
    }
  }

  const updateModule = (moduleIndex: number, field: string, value: any) => {
    setModules(prev => prev.map((moduleItem, index) => 
      index === moduleIndex 
        ? { ...moduleItem, [field]: value }
        : moduleItem
    ))
  }

  const addLecture = (moduleIndex: number) => {
    setModules(prev => prev.map((moduleItem, index) => 
      index === moduleIndex 
        ? {
            ...moduleItem,
            lectures: [
              ...moduleItem.lectures,
              {
                title: '',
                description: '',
                videoUrl: '',
                durationSec: 0,
                order: moduleItem.lectures.length + 1,
                freePreview: false,
              }
            ]
          }
        : moduleItem
    ))
  }

  const removeLecture = (moduleIndex: number, lectureIndex: number) => {
    setModules(prev => prev.map((moduleItem, index) => 
      index === moduleIndex 
        ? {
            ...moduleItem,
            lectures: moduleItem.lectures.filter((_, lIndex) => lIndex !== lectureIndex)
          }
        : moduleItem
    ))
  }

  const updateLecture = (moduleIndex: number, lectureIndex: number, field: string, value: any) => {
    setModules(prev => prev.map((moduleItem, mIndex) => 
      mIndex === moduleIndex 
        ? {
            ...moduleItem,
            lectures: moduleItem.lectures.map((lecture, lIndex) => 
              lIndex === lectureIndex 
                ? { ...lecture, [field]: value }
                : lecture
            )
          }
        : moduleItem
    ))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      // Validate form data
      if (!formData.title.trim()) {
        throw new Error('Course title is required')
      }
      if (!formData.description.trim()) {
        throw new Error('Course description is required')
      }
      if (formData.pricePaise < 0) {
        throw new Error('Price must be non-negative')
      }

      // Validate modules
      for (let i = 0; i < modules.length; i++) {
        const module = modules[i]
        if (!module.title.trim()) {
          throw new Error(`Module ${i + 1} title is required`)
        }
        
        // Validate lectures
        for (let j = 0; j < module.lectures.length; j++) {
          const lecture = module.lectures[j]
          if (!lecture.title.trim()) {
            throw new Error(`Lecture ${j + 1} in Module ${i + 1} title is required`)
          }
          if (!lecture.videoUrl.trim()) {
            throw new Error(`Lecture ${j + 1} in Module ${i + 1} video URL is required`)
          }
          if (lecture.durationSec <= 0) {
            throw new Error(`Lecture ${j + 1} in Module ${i + 1} duration must be greater than 0`)
          }
        }
      }

      // Create course with modules and lectures
      const courseData = {
        ...formData,
        modules: modules.map(module => ({
          title: module.title,
          description: module.description,
          order: module.order,
          lectures: module.lectures.map(lecture => ({
            title: lecture.title,
            description: lecture.description,
            videoUrl: lecture.videoUrl,
            durationSec: lecture.durationSec,
            order: lecture.order,
            freePreview: lecture.freePreview,
          }))
        }))
      }

      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create course')
      }

      setSuccess('Course created successfully!')
      setTimeout(() => {
        router.push('/admin')
      }, 2000)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create course')
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ge-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking permissions...</p>
        </div>
      </div>
    )
  }

  // Show access denied message
  if (error && error.includes('Access denied')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You don't have permission to create courses. Admin privileges are required.</p>
          <Link href="/admin" className="btn-primary">
            Back to Admin
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
              <p className="text-gray-600">Add a new course to your platform</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-8 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-8">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Course Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Course Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ge-500 focus:border-transparent"
                  placeholder="Enter course title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (in paise) *
                </label>
                <input
                  type="number"
                  value={formData.pricePaise}
                  onChange={(e) => handleFormChange('pricePaise', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ge-500 focus:border-transparent"
                  placeholder="299900 (₹2,999)"
                  min="0"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Amount in paise (₹1 = 100 paise)
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ge-500 focus:border-transparent"
                  placeholder="Enter course description"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => handleFormChange('imageUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ge-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => handleFormChange('published', e.target.checked)}
                  className="h-4 w-4 text-ge-600 focus:ring-ge-500 border-gray-300 rounded"
                />
                <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                  Publish course immediately
                </label>
              </div>
            </div>
          </div>

          {/* Modules */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Course Modules</h2>
              <button
                type="button"
                onClick={addModule}
                className="btn-outline flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Module</span>
              </button>
            </div>

            {modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Module {moduleIndex + 1}
                  </h3>
                  {modules.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeModule(moduleIndex)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Module Title *
                    </label>
                    <input
                      type="text"
                      value={module.title}
                      onChange={(e) => updateModule(moduleIndex, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ge-500 focus:border-transparent"
                      placeholder="Enter module title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Module Description
                    </label>
                    <input
                      type="text"
                      value={module.description}
                      onChange={(e) => updateModule(moduleIndex, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ge-500 focus:border-transparent"
                      placeholder="Enter module description"
                    />
                  </div>
                </div>

                {/* Lectures */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-md font-medium text-gray-900">Lectures</h4>
                    <button
                      type="button"
                      onClick={() => addLecture(moduleIndex)}
                      className="btn-outline text-sm flex items-center space-x-2"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Lecture</span>
                    </button>
                  </div>

                  {module.lectures.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="text-sm font-medium text-gray-900">
                          Lecture {lectureIndex + 1}
                        </h5>
                        {module.lectures.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLecture(moduleIndex, lectureIndex)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lecture Title *
                          </label>
                          <input
                            type="text"
                            value={lecture.title}
                            onChange={(e) => updateLecture(moduleIndex, lectureIndex, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ge-500 focus:border-transparent"
                            placeholder="Enter lecture title"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Duration (seconds) *
                          </label>
                          <input
                            type="number"
                            value={lecture.durationSec}
                            onChange={(e) => updateLecture(moduleIndex, lectureIndex, 'durationSec', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ge-500 focus:border-transparent"
                            placeholder="300"
                            min="1"
                            required
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Video URL *
                          </label>
                          <input
                            type="url"
                            value={lecture.videoUrl}
                            onChange={(e) => updateLecture(moduleIndex, lectureIndex, 'videoUrl', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ge-500 focus:border-transparent"
                            placeholder="https://example.com/video.mp4"
                            required
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            value={lecture.description}
                            onChange={(e) => updateLecture(moduleIndex, lectureIndex, 'description', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ge-500 focus:border-transparent"
                            placeholder="Enter lecture description"
                          />
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`freePreview-${moduleIndex}-${lectureIndex}`}
                            checked={lecture.freePreview}
                            onChange={(e) => updateLecture(moduleIndex, lectureIndex, 'freePreview', e.target.checked)}
                            className="h-4 w-4 text-ge-600 focus:ring-ge-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`freePreview-${moduleIndex}-${lectureIndex}`} className="ml-2 block text-sm text-gray-900">
                            Free preview
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end space-x-4">
            <Link href="/admin" className="btn-outline">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Create Course</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
