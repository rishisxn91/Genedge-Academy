export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { whatsappAPI } from '@/lib/whatsapp'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (!mode || !token || !challenge) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  const verificationResponse = whatsappAPI.verifyWebhook(mode, token, challenge)
  
  if (verificationResponse) {
    return new NextResponse(verificationResponse, { status: 200 })
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Process the webhook
    await whatsappAPI.processWebhook(body)
    
    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
