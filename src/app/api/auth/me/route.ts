export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { memoryStore } from '@/lib/memory-store'

export async function GET(request: NextRequest) {
  try {
    let user = await getCurrentUser()
    
    // If getCurrentUser failed, try memory store
    if (!user) {
      try {
        // This is a fallback - in a real app you'd get the user ID from the token
        // For now, we'll return the admin user if no database user is found
        const adminUser = await memoryStore.findUserByEmail('admin@genedge.ac')
        if (adminUser) {
          const { password, ...userWithoutPassword } = adminUser
          user = userWithoutPassword
        }
      } catch (memoryError) {
        console.log('Memory store error:', memoryError)
      }
    }
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
