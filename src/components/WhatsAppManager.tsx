'use client'

import { useState } from 'react'
import { Send, MessageSquare, Users, Phone, Loader2 } from 'lucide-react'

interface WhatsAppMessage {
  to: string
  message: string
  type: 'text' | 'template' | 'interactive'
  templateName?: string
  languageCode?: string
  buttons?: Array<{ id: string; title: string }>
}

export default function WhatsAppManager() {
  const [formData, setFormData] = useState<WhatsAppMessage>({
    to: '',
    message: '',
    type: 'text'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setResponse(null)

    try {
      const res = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setResponse(data)
      setFormData({ to: '', message: '', type: 'text' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const quickTemplates = [
    {
      name: 'Welcome Message',
      message: '🎉 Welcome to GenEdge Academy!\n\nStart your AI learning journey today. Browse our courses at https://genedgeacademy.com/catalog'
    },
    {
      name: 'Course Reminder',
      message: '📚 Don\'t forget to continue your learning!\n\nYour course is waiting for you at https://genedgeacademy.com/dashboard'
    },
    {
      name: 'Support Message',
      message: '👋 Need help? We\'re here for you!\n\nContact us at contact@genedge.ac or visit https://genedgeacademy.com'
    },
    {
      name: 'Special Offer',
      message: '🎯 Special Offer Alert!\n\nGet 20% off on all courses this week!\n\nVisit: https://genedgeacademy.com/pricing'
    }
  ]

  const handleUseTemplate = (template: { name: string; message: string }) => {
    setFormData(prev => ({
      ...prev,
      message: template.message
    }))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">WhatsApp Manager</h3>
            <p className="text-sm text-gray-600">Send messages to your students and customers</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="to" className="form-label">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <input
                type="text"
                id="to"
                name="to"
                value={formData.to}
                onChange={handleChange}
                placeholder="911234567890 (with country code)"
                className="input-field"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Include country code without + or spaces</p>
            </div>

            <div>
              <label htmlFor="type" className="form-label">
                Message Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="input-field"
              >
                <option value="text">Text Message</option>
                <option value="template">Template Message</option>
                <option value="interactive">Interactive Message</option>
              </select>
            </div>
          </div>

          {formData.type === 'template' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="templateName" className="form-label">Template Name</label>
                <input
                  type="text"
                  id="templateName"
                  name="templateName"
                  value={formData.templateName || ''}
                  onChange={handleChange}
                  placeholder="welcome_message"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="languageCode" className="form-label">Language Code</label>
                <input
                  type="text"
                  id="languageCode"
                  name="languageCode"
                  value={formData.languageCode || ''}
                  onChange={handleChange}
                  placeholder="en"
                  className="input-field"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="message" className="form-label">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              placeholder="Enter your message here..."
              className="input-field"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.message.length}/4096 characters
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {response && (
          <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
            Message sent successfully! Message ID: {response.messageId}
          </div>
        )}
      </div>

      {/* Quick Templates */}
      <div className="bg-white rounded-2xl shadow-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Quick Templates
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickTemplates.map((template, index) => (
            <button
              key={index}
              onClick={() => handleUseTemplate(template)}
              className="text-left p-4 border border-gray-200 rounded-lg hover:border-ge-500 hover:bg-ge-50 transition-colors"
            >
              <h5 className="font-medium text-gray-900 mb-2">{template.name}</h5>
              <p className="text-sm text-gray-600 line-clamp-3">{template.message}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Webhook Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-blue-900 mb-4">Webhook Configuration</h4>
        <div className="space-y-2 text-sm text-blue-800">
          <p><strong>Webhook URL:</strong> https://genedgeacademy.com/api/whatsapp/webhook</p>
          <p><strong>Verify Token:</strong> Set this in your WhatsApp Business API settings</p>
          <p><strong>Events:</strong> messages, message_deliveries</p>
        </div>
      </div>
    </div>
  )
}
