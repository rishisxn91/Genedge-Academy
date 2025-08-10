export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await request.json()
    
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body
    
    // In production, verify signature with Razorpay
    // For now, we'll mock the verification
    const isValidSignature = true // Mock verification
    
    if (!isValidSignature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    // Update payment status
    const payment = await prisma.payment.update({
      where: {
        razorpayOrderId: razorpay_order_id,
      },
      data: {
        status: 'captured',
      },
    })

    // Get course ID from payment notes
    let courseId: string | null = null
    if (payment.notes) {
      try {
        const notes = JSON.parse(payment.notes)
        courseId = notes.courseId
      } catch (error) {
        console.error('Error parsing payment notes:', error)
      }
    }
    
    if (courseId) {
      // Create enrollment
      await prisma.enrollment.create({
        data: {
          userId: user.id,
          courseId,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and enrollment created',
    })
  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
