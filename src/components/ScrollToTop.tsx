'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    // Scroll to top on page refresh
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0)
    }

    // Handle page refresh
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    // Also scroll to top when component mounts (handles initial page load)
    window.scrollTo(0, 0)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return null
}
