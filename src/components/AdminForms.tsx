'use client'

import { useState } from 'react'
import { X, Upload, Plus, Minus } from 'lucide-react'

interface AdminFormsProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminForms({ isOpen, onClose }: AdminFormsProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    level: 'beginner',
    duration: '',
    instructor: '',
    thumbnail: null as File | null
  })

  const [sections, setSections] = useState([
    { id: 1, title: '', lessons: [{ id: 1, title: '', duration: '', type: 'video' }] }
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const addSection = () => {
    const newSection = {
      id: sections.length + 1,
      title: '',
      lessons: [{ id: 1, title: '', duration: '', type: 'video' }]
    }
    setSections([...sections, newSection])
  }

  const removeSection = (sectionId: number) => {
    if (sections.length > 1) {
      setSections(sections.filter(section => section.id !== sectionId))
    }
  }

  const addLesson = (sectionId: number) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        const newLesson = {
          id: section.lessons.length + 1,
          title: '',
          duration: '',
          type: 'video'
        }
        return { ...section, lessons: [...section.lessons, newLesson] }
      }
      return section
    }))
  }

  const removeLesson = (sectionId: number, lessonId: number) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        if (section.lessons.length > 1) {
          return { ...section, lessons: section.lessons.filter(lesson => lesson.id !== lessonId) }
        }
      }
      return section
    }))
  }

  const updateSection = (sectionId: number, field: string, value: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return { ...section, [field]: value }
      }
      return section
    }))
  }

  const updateLesson = (sectionId: number, lessonId: number, field: string, value: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: section.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return { ...lesson, [field]: value }
            }
            return lesson
          })
        }
      }
      return section
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form data:', { ...formData, sections })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="heading-2">Add New Course</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ge-500 focus:border-transparent"
                placeholder="Enter course title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ge-500 focus:border-transparent"
                required
              >
                <option value="">Select category</option>
                <option value="web-development">Web Development</option>
                <option value="data-science">Data Science</option>
                <option value="digital-marketing">Digital Marketing</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ge-500 focus:border-transparent"
                placeholder="0"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level *
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ge-500 focus:border-transparent"
                required
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (hours) *
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ge-500 focus:border-transparent"
                placeholder="0"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructor *
              </label>
              <input
                type="text"
                name="instructor"
                value={formData.instructor}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ge-500 focus:border-transparent"
                placeholder="Enter instructor name"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ge-500 focus:border-transparent"
              placeholder="Describe what students will learn in this course"
              required
            />
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Thumbnail
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setFormData(prev => ({ ...prev, thumbnail: file }))
                  }
                }}
              />
            </div>
          </div>

          {/* Course Sections */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="heading-3">Course Content</h3>
              <button
                type="button"
                onClick={addSection}
                className="btn-secondary flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Section</span>
              </button>
            </div>

            <div className="space-y-4">
              {sections.map((section, sectionIndex) => (
                <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ge-500 focus:border-transparent mr-4"
                      placeholder="Section title"
                    />
                    <button
                      type="button"
                      onClick={() => removeSection(section.id)}
                      className="text-red-600 hover:text-red-800"
                      disabled={sections.length === 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <div key={lesson.id} className="flex items-center space-x-3">
                        <input
                          type="text"
                          value={lesson.title}
                          onChange={(e) => updateLesson(section.id, lesson.id, 'title', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ge-500 focus:border-transparent"
                          placeholder="Lesson title"
                        />
                        <input
                          type="text"
                          value={lesson.duration}
                          onChange={(e) => updateLesson(section.id, lesson.id, 'duration', e.target.value)}
                          className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ge-500 focus:border-transparent"
                          placeholder="5 min"
                        />
                        <select
                          value={lesson.type}
                          onChange={(e) => updateLesson(section.id, lesson.id, 'type', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ge-500 focus:border-transparent"
                        >
                          <option value="video">Video</option>
                          <option value="text">Text</option>
                          <option value="quiz">Quiz</option>
                          <option value="assignment">Assignment</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => removeLesson(section.id, lesson.id)}
                          className="text-red-600 hover:text-red-800"
                          disabled={section.lessons.length === 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addLesson(section.id)}
                      className="text-ge-600 hover:text-ge-800 text-sm flex items-center space-x-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Lesson</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
