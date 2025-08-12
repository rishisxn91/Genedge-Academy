import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/metadata'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/dashboard/',
        '/auth/',
        '/_next/',
        '/favicon.ico',
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
