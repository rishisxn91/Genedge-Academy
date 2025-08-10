import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './src/i18n/request'

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  
  // Used when no locale matches
  defaultLocale: defaultLocale,
  
  // Always show the locale prefix
  localePrefix: 'always'
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(hi|ta|te|kn|bn|en)/:path*']
}
