'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, User, BookOpen, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations, useLocale } from 'next-intl'
import LanguageSelector from './LanguageSelector'

interface User {
  id: string
  name: string
  email: string
  role: string
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  
  // Get locale with error handling
  let locale = 'en'
  try {
    locale = useLocale()
  } catch (error) {
    // Fallback to default locale
    locale = 'en'
  }
  
  // Use translations with error handling
  let t: any
  try {
    t = useTranslations('navigation')
  } catch (error) {
    // Fallback translations if context is not available
    t = (key: string) => {
      const fallbacks: { [key: string]: string } = {
        home: 'Home',
        catalog: 'Catalog',
        pricing: 'Pricing',
        faq: 'FAQ',
        signIn: 'Sign In',
        getStarted: 'Get Started'
      }
      return fallbacks[key] || key
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('catalog'), href: `/${locale}/catalog` },
    { name: t('pricing'), href: `/${locale}/pricing` },
    { name: t('faq'), href: `/${locale}/#faq` },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-ge-600 to-ge-700 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">GenEdge Academy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  isActive(item.href)
                    ? 'text-ge-600'
                    : 'text-gray-600 hover:text-ge-600'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            {isLoading ? (
              <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
            ) : user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'ADMIN' && (
                  <Link
                    href={`/${locale}/admin`}
                    className="btn-outline text-sm py-2 px-4"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href={`/${locale}/dashboard`}
                  className="btn-primary text-sm py-2 px-4"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href={`/${locale}/auth/signin`} className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                  {t('signIn')}
                </Link>
                <Link href={`/${locale}/auth/signup`} className="btn-primary text-sm py-2 px-4">
                  {t('getStarted')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-base font-medium px-2 py-1 rounded-md transition-colors duration-200',
                    isActive(item.href)
                      ? 'text-ge-600 bg-ge-50'
                      : 'text-gray-600 hover:text-ge-600 hover:bg-gray-50'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="pt-4 border-t border-gray-200">
              {user ? (
                <div className="flex flex-col space-y-3">
                  {user.role === 'ADMIN' && (
                    <Link
                      href={`/${locale}/admin`}
                      className="btn-outline text-sm py-2 px-4 text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    href={`/${locale}/dashboard`}
                    className="btn-primary text-sm py-2 px-4 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-900 text-sm font-medium text-center py-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link
                    href={`/${locale}/auth/signin`}
                    className="text-gray-600 hover:text-gray-900 text-sm font-medium text-center py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('signIn')}
                  </Link>
                  <Link
                    href={`/${locale}/auth/signup`}
                    className="btn-primary text-sm py-2 px-4 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('getStarted')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
