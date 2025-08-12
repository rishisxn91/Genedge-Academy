import { Metadata } from 'next'

export const siteConfig = {
  name: 'GenEdge Academy',
  description: 'India\'s Premier AI Learning Platform - Master AI skills with practical courses, real projects, and expert guidance.',
  url: 'https://genedgeacademy.com',
  ogImage: '/og-image.jpg',
  twitterImage: '/twitter-image.jpg',
  contactEmail: 'support@genedgeacademy.com',
  keywords: [
    'AI learning',
    'artificial intelligence',
    'machine learning',
    'prompt engineering',
    'AI courses',
    'online education',
    'India',
    'AI skills',
    'ChatGPT',
    'AI tools'
  ]
}

export function constructMetadata({
  title,
  description,
  image,
  noIndex = false,
  noFollow = false,
}: {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
  noFollow?: boolean
} = {}): Metadata {
  return {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description: description || siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description: description || siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: image || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description: description || siteConfig.description,
      images: [image || siteConfig.twitterImage],
      creator: '@genedgeacademy',
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  }
}

export function generateCourseMetadata(course: {
  title: string
  description: string
  author: { name: string }
  _count: { enrollments: number }
}) {
  return constructMetadata({
    title: course.title,
    description: course.description,
    image: `/api/og?title=${encodeURIComponent(course.title)}&author=${encodeURIComponent(course.author.name)}&students=${course._count.enrollments}`,
  })
}

export function generateCatalogMetadata() {
  return constructMetadata({
    title: 'Course Catalog',
    description: 'Browse our comprehensive collection of AI courses designed for all skill levels. From beginners to advanced practitioners.',
    image: '/api/og?title=Course Catalog&subtitle=Master AI Skills',
  })
}
