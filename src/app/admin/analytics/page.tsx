'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  DollarSign, 
  BookOpen,
  Calendar,
  BarChart3,
  PieChart,
  Shield,
  AlertTriangle
} from 'lucide-react'
import { formatPrice, formatDate } from '@/lib/utils'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface Analytics {
  totalUsers: number
  totalCourses: number
  totalEnrollments: number
  totalRevenue: number
  monthlyEnrollments: { month: string; count: number }[]
  topCourses: { title: string; enrollments: number }[]
  userGrowth: { month: string; count: number }[]
  revenueByMonth: { month: string; amount: number }[]
}

export default function AnalyticsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [analytics, setAnalytics] = useState<Analytics>({
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    totalRevenue: 0,
    monthlyEnrollments: [],
    topCourses: [],
    userGrowth: [],
    revenueByMonth: []
  })
  const router = useRouter()

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
        await fetchAnalytics()
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

  const fetchAnalytics = async () => {
    try {
      // Fetch courses for analytics
      const coursesResponse = await fetch('/api/courses')
      const courses = await coursesResponse.ok ? await coursesResponse.json() : []
      
      // Fetch enrollments for analytics
      const enrollmentsResponse = await fetch('/api/enrollments')
      const enrollments = await enrollmentsResponse.ok ? await enrollmentsResponse.json() : []
      
      // Calculate analytics
      const totalEnrollments = enrollments.length
      const totalRevenue = enrollments.reduce((total: number, enrollment: any) => {
        const course = courses.find((c: any) => c.id === enrollment.courseId)
        return total + (course?.pricePaise || 0)
      }, 0)
      
      // Mock data for charts (in real app, this would come from database queries)
      const monthlyEnrollments = [
        { month: 'Jan', count: 12 },
        { month: 'Feb', count: 19 },
        { month: 'Mar', count: 15 },
        { month: 'Apr', count: 25 },
        { month: 'May', count: 30 },
        { month: 'Jun', count: 35 },
      ]
      
      const topCourses = courses
        .map((course: any) => ({
          title: course.title,
          enrollments: course._count?.enrollments || 0
        }))
        .sort((a: any, b: any) => b.enrollments - a.enrollments)
        .slice(0, 5)
      
      const userGrowth = [
        { month: 'Jan', count: 50 },
        { month: 'Feb', count: 75 },
        { month: 'Mar', count: 100 },
        { month: 'Apr', count: 125 },
        { month: 'May', count: 150 },
        { month: 'Jun', count: 175 },
      ]
      
      const revenueByMonth = [
        { month: 'Jan', amount: 1500000 },
        { month: 'Feb', amount: 2200000 },
        { month: 'Mar', amount: 1800000 },
        { month: 'Apr', amount: 3000000 },
        { month: 'May', amount: 3500000 },
        { month: 'Jun', amount: 4000000 },
      ]
      
      setAnalytics({
        totalUsers: 175, // Mock data
        totalCourses: courses.length,
        totalEnrollments,
        totalRevenue,
        monthlyEnrollments,
        topCourses,
        userGrowth,
        revenueByMonth
      })
    } catch (error) {
      setError('Failed to load analytics')
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
          <p className="text-gray-600 mb-6">You don't have permission to view analytics. Admin privileges are required.</p>
          <Link href="/admin" className="btn-primary">
            Back to Admin
          </Link>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Platform insights and performance metrics</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-8 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalUsers}</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalCourses}</p>
                <p className="text-sm text-green-600">+2 new this month</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalEnrollments}</p>
                <p className="text-sm text-green-600">+8% from last month</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatPrice(analytics.totalRevenue)}</p>
                <p className="text-sm text-green-600">+15% from last month</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Enrollments */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Enrollments</h3>
            <div className="space-y-3">
              {analytics.monthlyEnrollments.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.month}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-ge-600 h-2 rounded-full" 
                        style={{ width: `${(item.count / 40) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Courses */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Courses</h3>
            <div className="space-y-4">
              {analytics.topCourses.map((course, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-ge-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-ge-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{course.title}</p>
                      <p className="text-xs text-gray-500">{course.enrollments} enrollments</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <div className="grid grid-cols-6 gap-4">
            {analytics.userGrowth.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-ge-600">{item.count}</div>
                <div className="text-sm text-gray-500">{item.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
          <div className="grid grid-cols-6 gap-4">
            {analytics.revenueByMonth.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-bold text-green-600">{formatPrice(item.amount)}</div>
                <div className="text-sm text-gray-500">{item.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
