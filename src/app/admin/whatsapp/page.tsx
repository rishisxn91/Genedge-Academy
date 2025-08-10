'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import WhatsAppManager from '@/components/WhatsAppManager'
import { Shield, AlertTriangle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface User {
  id: string
  name: string
  email: string
  role: string
}

export default function WhatsAppAdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  const checkAuthAndAccess = useCallback(async () => {
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
      console.error('Auth check failed:', error)
      setError('Authentication failed')
      router.push('/auth/signin')
    } finally {
      setIsCheckingAuth(false)
    }
  }, [router])

  useEffect(() => {
    checkAuthAndAccess()
  }, [checkAuthAndAccess])

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-ge-600"></div>
      </div>
    )
  }

  if (error && error.includes('Access denied')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You don't have permission to access the WhatsApp admin panel.</p>
          <Link href="/dashboard" className="btn-primary">
            Go to Dashboard
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
            <Link
              href="/admin"
              className="btn-outline flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Admin</span>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">WhatsApp Manager</h1>
              <p className="text-gray-600">Send messages and manage WhatsApp communications</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-8 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {/* WhatsApp Manager Component */}
        <WhatsAppManager />
      </div>
    </div>
  )
}
