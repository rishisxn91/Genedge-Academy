import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'GenEdge Academy - India\'s Premier AI Learning Platform',
  description: 'Master AI skills at your own pace with GenEdge Academy. Learn prompting, AI tools, and earn from AI with our comprehensive self-paced courses.',
  keywords: 'AI learning, prompt engineering, artificial intelligence, self-paced courses, India, GenEdge Academy',
  authors: [{ name: 'GenEdge Academy' }],
  creator: 'GenEdge Academy',
  publisher: 'GenEdge Academy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.genedgeacademy.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GenEdge Academy - India\'s Premier AI Learning Platform',
    description: 'Master AI skills at your own pace with GenEdge Academy. Learn prompting, AI tools, and earn from AI with our comprehensive self-paced courses.',
    url: '/',
    siteName: 'GenEdge Academy',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'GenEdge Academy - AI Learning Platform',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GenEdge Academy - India\'s Premier AI Learning Platform',
    description: 'Master AI skills at your own pace with GenEdge Academy. Learn prompting, AI tools, and earn from AI with our comprehensive self-paced courses.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
