import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

// Can be imported from a shared config
export const locales = ['en', 'hi', 'ta', 'te', 'kn', 'bn'] as const
export const defaultLocale = 'en' as const

export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`./locales/${locale}/common.json`)).default,
    locale: locale as string,
    timeZone: 'Asia/Kolkata'
  }
})
