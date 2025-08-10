import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

export const locales = ['en', 'hi', 'ta', 'te', 'kn', 'bn'] as const
export const defaultLocale = 'en' as const

export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ locale }) => {
  // Validate locale
  if (!locale || !locales.includes(locale as any)) {
    console.log('Invalid locale:', locale, 'Valid locales:', locales)
    // Use default locale instead of notFound()
    locale = defaultLocale
  }

  try {
    const messages = (await import(`../../locales/${locale}/common.json`)).default
    return {
      messages,
      locale: locale as string,
      timeZone: 'Asia/Kolkata'
    }
  } catch (error) {
    console.error('Failed to load messages for locale:', locale, error)
    // Fallback to default locale
    const defaultMessages = (await import(`../../locales/${defaultLocale}/common.json`)).default
    return {
      messages: defaultMessages,
      locale: defaultLocale,
      timeZone: 'Asia/Kolkata'
    }
  }
})
