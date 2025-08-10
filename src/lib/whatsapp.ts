import { z } from 'zod'

// WhatsApp API Configuration
const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL || 'https://graph.facebook.com/v18.0'
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN

// Message schemas
const messageSchema = z.object({
  messaging_product: z.literal('whatsapp'),
  to: z.string().regex(/^\d+$/),
  type: z.enum(['text', 'template', 'interactive', 'document', 'image']),
  text: z.object({
    body: z.string().max(4096)
  }).optional(),
  template: z.object({
    name: z.string(),
    language: z.object({
      code: z.string()
    }),
    components: z.array(z.any()).optional()
  }).optional(),
  interactive: z.object({
    type: z.enum(['button', 'list']),
    body: z.object({
      text: z.string()
    }),
    action: z.object({
      buttons: z.array(z.object({
        type: z.literal('reply'),
        reply: z.object({
          id: z.string(),
          title: z.string()
        })
      })).optional(),
      sections: z.array(z.any()).optional()
    })
  }).optional()
})

export type WhatsAppMessage = z.infer<typeof messageSchema>

// WhatsApp API Client
export class WhatsAppAPI {
  private accessToken: string
  private phoneNumberId: string
  private apiUrl: string

  constructor() {
    if (!WHATSAPP_ACCESS_TOKEN) {
      throw new Error('WHATSAPP_ACCESS_TOKEN is required')
    }
    if (!WHATSAPP_PHONE_NUMBER_ID) {
      throw new Error('WHATSAPP_PHONE_NUMBER_ID is required')
    }

    this.accessToken = WHATSAPP_ACCESS_TOKEN
    this.phoneNumberId = WHATSAPP_PHONE_NUMBER_ID
    this.apiUrl = WHATSAPP_API_URL
  }

  // Send a text message
  async sendTextMessage(to: string, message: string): Promise<any> {
    const payload: WhatsAppMessage = {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: {
        body: message
      }
    }

    return this.sendMessage(payload)
  }

  // Send a template message
  async sendTemplateMessage(to: string, templateName: string, languageCode: string = 'en', components?: any[]): Promise<any> {
    const payload: WhatsAppMessage = {
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: templateName,
        language: {
          code: languageCode
        },
        ...(components && { components })
      }
    }

    return this.sendMessage(payload)
  }

  // Send interactive message with buttons
  async sendInteractiveMessage(to: string, body: string, buttons: Array<{ id: string; title: string }>): Promise<any> {
    const payload: WhatsAppMessage = {
      messaging_product: 'whatsapp',
      to,
      type: 'interactive',
      interactive: {
        type: 'button',
        body: {
          text: body
        },
        action: {
          buttons: buttons.map(button => ({
            type: 'reply',
            reply: button
          }))
        }
      }
    }

    return this.sendMessage(payload)
  }

  // Send course enrollment confirmation
  async sendEnrollmentConfirmation(to: string, courseName: string, userName: string): Promise<any> {
    const message = `🎉 Welcome to GenEdge Academy!

Hi ${userName},

You have successfully enrolled in "${courseName}".

📚 Start your learning journey:
• Access your course anytime
• Learn at your own pace
• Get lifetime access

Need help? Reply with "HELP" or contact us at contact@genedge.ac

Happy learning! 🚀`

    return this.sendTextMessage(to, message)
  }

  // Send course completion notification
  async sendCourseCompletion(to: string, courseName: string, userName: string): Promise<any> {
    const message = `🏆 Congratulations!

Hi ${userName},

You have successfully completed "${courseName}"!

Your certificate is ready for download in your dashboard.

What's next?
• Explore more courses
• Apply your new skills
• Share your achievement

Keep learning and growing! 🌟`

    return this.sendTextMessage(to, message)
  }

  // Send payment confirmation
  async sendPaymentConfirmation(to: string, amount: number, courseName: string): Promise<any> {
    const message = `💳 Payment Confirmed!

Thank you for your payment of ₹${amount} for "${courseName}".

Your course is now unlocked and ready for you to start learning.

📱 Access your course at: https://genedgeacademy.com/dashboard

Happy learning! 📚`

    return this.sendTextMessage(to, message)
  }

  // Send support message
  async sendSupportMessage(to: string, userName: string): Promise<any> {
    const message = `👋 Hi ${userName},

How can we help you today?

Quick Support Options:
• Course Access Issues
• Payment Problems
• Technical Support
• General Questions

Reply with your query or contact us at:
📧 contact@genedge.ac
🌐 https://genedgeacademy.com

We're here to help! 🚀`

    return this.sendTextMessage(to, message)
  }

  // Send promotional message
  async sendPromotionalMessage(to: string, offer: string, validUntil: string): Promise<any> {
    const message = `🎯 Special Offer Alert!

${offer}

⏰ Valid until: ${validUntil}

Don't miss this opportunity to upgrade your AI skills!

Click here to claim: https://genedgeacademy.com/pricing

Reply "YES" to get started! 🚀`

    return this.sendTextMessage(to, message)
  }

  // Generic message sender
  private async sendMessage(payload: WhatsAppMessage): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`WhatsApp API Error: ${error.error?.message || 'Unknown error'}`)
      }

      return await response.json()
    } catch (error) {
      console.error('WhatsApp API Error:', error)
      throw error
    }
  }

  // Verify webhook
  verifyWebhook(mode: string, token: string, challenge: string): string | null {
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN
    
    if (mode === 'subscribe' && token === verifyToken) {
      return challenge
    }
    
    return null
  }

  // Process incoming webhook
  async processWebhook(body: any): Promise<void> {
    try {
      const { object, entry } = body

      if (object !== 'whatsapp_business_account') {
        return
      }

      for (const entryItem of entry) {
        const { changes } = entryItem
        
        for (const change of changes) {
          if (change.value?.messages) {
            for (const message of change.value.messages) {
              await this.handleIncomingMessage(message)
            }
          }
        }
      }
    } catch (error) {
      console.error('Error processing webhook:', error)
    }
  }

  // Handle incoming messages
  private async handleIncomingMessage(message: any): Promise<void> {
    const { from, text, type } = message

    if (type === 'text' && text?.body) {
      const userMessage = text.body.toLowerCase()

      // Auto-reply based on keywords
      if (userMessage.includes('help') || userMessage.includes('support')) {
        await this.sendSupportMessage(from, 'there')
      } else if (userMessage.includes('course') || userMessage.includes('enroll')) {
        await this.sendTextMessage(from, 'Browse our courses at: https://genedgeacademy.com/catalog')
      } else if (userMessage.includes('price') || userMessage.includes('cost')) {
        await this.sendTextMessage(from, 'Check our pricing at: https://genedgeacademy.com/pricing')
      } else {
        await this.sendTextMessage(from, 'Thanks for your message! Our team will get back to you soon. For immediate help, visit: https://genedgeacademy.com')
      }
    }
  }
}

// Export singleton instance with lazy initialization
let whatsappAPIInstance: WhatsAppAPI | null = null

export function getWhatsAppAPI(): WhatsAppAPI {
  if (!whatsappAPIInstance) {
    whatsappAPIInstance = new WhatsAppAPI()
  }
  return whatsappAPIInstance
}

export const whatsappAPI = {
  sendTextMessage: (to: string, message: string) => getWhatsAppAPI().sendTextMessage(to, message),
  sendTemplateMessage: (to: string, templateName: string, languageCode?: string, components?: any[]) => getWhatsAppAPI().sendTemplateMessage(to, templateName, languageCode, components),
  sendInteractiveMessage: (to: string, body: string, buttons: Array<{ id: string; title: string }>) => getWhatsAppAPI().sendInteractiveMessage(to, body, buttons),
  sendEnrollmentConfirmation: (to: string, courseName: string, userName: string) => getWhatsAppAPI().sendEnrollmentConfirmation(to, courseName, userName),
  sendCourseCompletion: (to: string, courseName: string, userName: string) => getWhatsAppAPI().sendCourseCompletion(to, courseName, userName),
  sendPaymentConfirmation: (to: string, amount: number, courseName: string) => getWhatsAppAPI().sendPaymentConfirmation(to, amount, courseName),
  sendSupportMessage: (to: string, userName: string) => getWhatsAppAPI().sendSupportMessage(to, userName),
  sendPromotionalMessage: (to: string, offer: string, validUntil: string) => getWhatsAppAPI().sendPromotionalMessage(to, offer, validUntil),
  verifyWebhook: (mode: string, token: string, challenge: string) => getWhatsAppAPI().verifyWebhook(mode, token, challenge),
  processWebhook: (body: any) => getWhatsAppAPI().processWebhook(body)
}
