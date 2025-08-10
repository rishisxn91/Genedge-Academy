import crypto from 'crypto'

interface RazorpayOrder {
  id: string
  amount: number
  currency: string
  receipt: string
  notes?: Record<string, string>
}

interface RazorpayPayment {
  id: string
  order_id: string
  status: string
  notes?: Record<string, string>
}

export async function createRazorpayOrder(
  amount: number,
  currency: string = 'INR',
  receipt: string,
  notes?: Record<string, string>
): Promise<RazorpayOrder> {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    // Fallback for development
    return {
      id: `order_dev_${Date.now()}`,
      amount,
      currency,
      receipt,
      notes
    }
  }

  // In production, this would call Razorpay API
  // For now, return a stub order
  return {
    id: `order_${Date.now()}`,
    amount,
    currency,
    receipt,
    notes
  }
}

export function verifyWebhookSignature(
  body: string,
  signature: string,
  webhookSecret: string
): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex')
    
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(signature, 'hex')
    )
  } catch (error) {
    return false
  }
}

export function parseWebhookBody(body: string): RazorpayPayment {
  try {
    return JSON.parse(body)
  } catch (error) {
    throw new Error('Invalid webhook body')
  }
}

export function isPaymentCaptured(payment: RazorpayPayment): boolean {
  return payment.status === 'captured'
}

export function extractNotes(payment: RazorpayPayment): Record<string, string> {
  return payment.notes || {}
}
