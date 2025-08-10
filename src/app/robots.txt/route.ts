import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${process.env.NEXT_PUBLIC_APP_URL || 'https://genedge-academy.com'}/sitemap.xml

# Disallow admin and API routes
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/
Disallow: /auth/

# Allow public pages
Allow: /
Allow: /catalog
Allow: /pricing
Allow: /terms
Allow: /privacy
Allow: /refund
Allow: /course/*

# Crawl delay
Crawl-delay: 1`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
