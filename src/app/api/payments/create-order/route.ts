import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await request.json()
    
    const { courseId } = body
    
    // Get course details
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    })

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
    })

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'Already enrolled in this course' },
        { status: 400 }
      )
    }

    // Create mock order ID (in production, this would be from Razorpay)
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        razorpayOrderId: orderId,
        amount: course.pricePaise,
        currency: 'INR',
        status: 'pending',
        notes: JSON.stringify({
          userId: user.id,
          courseId: course.id,
        }),
        userId: user.id,
      },
    })

    // Mock Razorpay order response
    const orderResponse = {
      id: orderId,
      entity: 'order',
      amount: course.pricePaise,
      amount_paid: 0,
      amount_due: course.pricePaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      status: 'created',
      attempts: 0,
      notes: {
        userId: user.id,
        courseId: course.id,
      },
      created_at: Date.now(),
    }

    return NextResponse.json(orderResponse)
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
