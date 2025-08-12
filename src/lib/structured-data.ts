export function generateCourseStructuredData(course: {
  id: string
  title: string
  description: string
  pricePaise: number
  author: { name: string }
  _count: { enrollments: number }
  modules: Array<{
    title: string
    lectures: Array<{
      title: string
      durationSec: number
    }>
  }>
}) {
  const totalDuration = course.modules.reduce((total, module) => 
    total + module.lectures.reduce((moduleTotal, lecture) => moduleTotal + lecture.durationSec, 0), 0
  )

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: 'GenEdge Academy',
      sameAs: 'https://genedgeacademy.com'
    },
    instructor: {
      '@type': 'Person',
      name: course.author.name
    },
    coursePrerequisites: 'Basic computer knowledge',
    educationalLevel: 'Beginner to Advanced',
    inLanguage: 'en',
    isAccessibleForFree: course.pricePaise === 0,
    offers: {
      '@type': 'Offer',
      price: course.pricePaise / 100,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
      url: `https://genedgeacademy.com/course/${course.id}`
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Students, Professionals, Entrepreneurs'
    },
    timeRequired: `PT${Math.floor(totalDuration / 60)}M`,
    numberOfStudents: course._count.enrollments,
    courseMode: 'online',
    url: `https://genedgeacademy.com/course/${course.id}`,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      offers: {
        '@type': 'Offer',
        price: course.pricePaise / 100,
        priceCurrency: 'INR'
      }
    }
  }
}

export function generateCatalogStructuredData(courses: Array<{
  id: string
  title: string
  description: string
  pricePaise: number
  author: { name: string }
  _count: { enrollments: number }
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI Courses Catalog',
    description: 'Comprehensive collection of AI courses for all skill levels',
    numberOfItems: courses.length,
    itemListElement: courses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: course.title,
        description: course.description,
        provider: {
          '@type': 'Organization',
          name: 'GenEdge Academy'
        },
        instructor: {
          '@type': 'Person',
          name: course.author.name
        },
        isAccessibleForFree: course.pricePaise === 0,
        offers: {
          '@type': 'Offer',
          price: course.pricePaise / 100,
          priceCurrency: 'INR'
        },
        url: `https://genedgeacademy.com/course/${course.id}`
      }
    }))
  }
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'GenEdge Academy',
    description: 'India\'s Premier AI Learning Platform',
    url: 'https://genedgeacademy.com',
    logo: 'https://genedgeacademy.com/logo.png',
    sameAs: [
      'https://twitter.com/genedgeacademy',
      'https://linkedin.com/company/genedgeacademy'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'support@genedgeacademy.com',
      availableLanguage: ['English', 'Hindi']
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN'
    },
    founder: {
      '@type': 'Person',
      name: 'GenEdge Academy Team'
    },
    foundingDate: '2024',
    areaServed: 'Worldwide',
    serviceType: 'Online Education',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Courses',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'AI in 1 Hour — Beginner Kickstart'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Prompt Engineering Mastery'
          }
        }
      ]
    }
  }
}
