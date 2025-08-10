import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { whatsappAPI } from '@/lib/whatsapp'
import { getCurrentUser } from '@/lib/auth'

const sendMessageSchema = z.object({
  to: z.string().regex(/^\d+$/, 'Phone number must contain only digits'),
  message: z.string().min(1, 'Message cannot be empty').max(4096, 'Message too long'),
  type: z.enum(['text', 'template', 'interactive']).default('text'),
  templateName: z.string().optional(),
  languageCode: z.string().optional(),
  buttons: z.array(z.object({
    id: z.string(),
    title: z.string()
  })).optional()
})

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const user = await getCurrentUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { to, message, type, templateName, languageCode, buttons } = sendMessageSchema.parse(body)

    let response

    switch (type) {
      case 'text':
        response = await whatsappAPI.sendTextMessage(to, message)
        break
      
      case 'template':
        if (!templateName) {
          return NextResponse.json({ error: 'Template name is required' }, { status: 400 })
        }
        response = await whatsappAPI.sendTemplateMessage(to, templateName, languageCode || 'en')
        break
      
      case 'interactive':
        if (!buttons || buttons.length === 0) {
          return NextResponse.json({ error: 'Buttons are required for interactive messages' }, { status: 400 })
        }
        response = await whatsappAPI.sendInteractiveMessage(to, message, buttons)
        break
      
      default:
        return NextResponse.json({ error: 'Invalid message type' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      messageId: response.messages?.[0]?.id,
      response
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }

    console.error('WhatsApp send error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
