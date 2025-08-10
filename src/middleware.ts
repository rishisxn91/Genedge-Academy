import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware({
  locales: ['en', 'hi', 'ta', 'te', 'kn', 'bn'],
  defaultLocale: 'en',
  localePrefix: 'always'
})

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  const { pathname } = request.nextUrl

  // First, handle internationalization
  const intlResponse = intlMiddleware(request)
  if (intlResponse) return intlResponse

  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/admin']
  const authRoutes = ['/auth/signin', '/auth/signup']

  // Check if user is trying to access protected routes without authentication
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/en/auth/signin', request.url))
  }

  // Check if user is trying to access auth routes while already authenticated
  if (authRoutes.some(route => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL('/en/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/dashboard/:path*',
    '/admin/:path*',
    '/auth/:path*',
  ],
}
