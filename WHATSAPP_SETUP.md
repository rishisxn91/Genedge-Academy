# WhatsApp Business API Integration Guide

## Overview

GenEdge Academy now includes a comprehensive WhatsApp Business API integration that allows you to:

- Send automated notifications to students
- Provide customer support via WhatsApp
- Send course enrollment confirmations
- Send payment confirmations
- Send promotional messages
- Handle incoming messages with auto-replies

## Features

### 🚀 **Outgoing Messages**
- **Text Messages**: Simple text notifications
- **Template Messages**: Pre-approved message templates
- **Interactive Messages**: Messages with buttons and quick replies
- **Automated Notifications**: Course enrollments, completions, payments

### 📥 **Incoming Messages**
- **Auto-replies**: Based on keywords (help, course, price, etc.)
- **Webhook Processing**: Real-time message handling
- **Support Integration**: Direct routing to support team

### 🎯 **Use Cases**
- Course enrollment confirmations
- Payment confirmations
- Course completion notifications
- Support requests
- Promotional campaigns
- Student engagement

## Setup Instructions

### 1. WhatsApp Business API Setup

#### Step 1: Create Meta Developer Account
1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Create a new app or use existing app
3. Add WhatsApp product to your app

#### Step 2: Configure WhatsApp Business API
1. In your Meta app, go to WhatsApp > Getting Started
2. Add your phone number
3. Note down your **Phone Number ID** and **Access Token**

#### Step 3: Set Up Webhook
1. Go to WhatsApp > Configuration
2. Set Webhook URL: `https://yourdomain.com/api/whatsapp/webhook`
3. Set Verify Token: Create a secure random string
4. Subscribe to events: `messages`, `message_deliveries`

### 2. Environment Variables

Add these to your `.env` file:

```env
# WhatsApp Business API
WHATSAPP_API_URL="https://graph.facebook.com/v18.0"
WHATSAPP_PHONE_NUMBER_ID="your-phone-number-id"
WHATSAPP_ACCESS_TOKEN="your-access-token"
WHATSAPP_VERIFY_TOKEN="your-webhook-verify-token"
```

### 3. Message Templates (Optional)

For template messages, create approved templates in your WhatsApp Business Manager:

#### Recommended Templates:
1. **Welcome Template**
   - Name: `welcome_message`
   - Language: English
   - Content: "Welcome to GenEdge Academy! Start your AI learning journey today."

2. **Course Enrollment**
   - Name: `course_enrollment`
   - Language: English
   - Content: "You have successfully enrolled in {{course_name}}. Start learning now!"

3. **Payment Confirmation**
   - Name: `payment_confirmation`
   - Language: English
   - Content: "Payment of ₹{{amount}} confirmed for {{course_name}}. Your course is now unlocked!"

## API Endpoints

### 1. Send Message
```
POST /api/whatsapp/send
```

**Request Body:**
```json
{
  "to": "911234567890",
  "message": "Hello from GenEdge Academy!",
  "type": "text"
}
```

**Response:**
```json
{
  "success": true,
  "messageId": "wamid.xxx",
  "response": { ... }
}
```

### 2. Webhook
```
GET /api/whatsapp/webhook
POST /api/whatsapp/webhook
```

## Admin Panel Usage

### Accessing WhatsApp Manager
1. Go to Admin Dashboard
2. Click "WhatsApp" button
3. Use the WhatsApp Manager interface

### Features Available:
- **Send Individual Messages**: Send to specific phone numbers
- **Quick Templates**: Pre-built message templates
- **Message Types**: Text, Template, Interactive
- **Webhook Configuration**: Display webhook settings

## Integration with Existing Features

### Automatic Notifications

The WhatsApp integration automatically sends notifications for:

1. **Course Enrollment**
   ```typescript
   await whatsappAPI.sendEnrollmentConfirmation(
     userPhone, 
     courseName, 
     userName
   )
   ```

2. **Payment Confirmation**
   ```typescript
   await whatsappAPI.sendPaymentConfirmation(
     userPhone, 
     amount, 
     courseName
   )
   ```

3. **Course Completion**
   ```typescript
   await whatsappAPI.sendCourseCompletion(
     userPhone, 
     courseName, 
     userName
   )
   ```

### Auto-Reply System

Incoming messages are automatically handled based on keywords:

- **"help"** or **"support"** → Support message
- **"course"** or **"enroll"** → Course catalog link
- **"price"** or **"cost"** → Pricing page link
- **Other messages** → Generic response with contact info

## Security Considerations

### 1. Access Control
- Only admin users can send WhatsApp messages
- All API calls require authentication
- Webhook verification prevents unauthorized access

### 2. Rate Limiting
- WhatsApp has rate limits (250 messages/second)
- Implement proper error handling
- Monitor message delivery status

### 3. Data Privacy
- Phone numbers are stored securely
- Messages are not logged for privacy
- GDPR compliant message handling

## Testing

### 1. Test Phone Numbers
- Use test phone numbers during development
- Add your number to the allowed list in Meta
- Test all message types before going live

### 2. Webhook Testing
- Use ngrok for local testing
- Verify webhook signature
- Test all incoming message scenarios

### 3. Production Testing
- Test with real phone numbers
- Verify message delivery
- Monitor webhook reliability

## Troubleshooting

### Common Issues:

1. **"Access Token Invalid"**
   - Check your WHATSAPP_ACCESS_TOKEN
   - Ensure token hasn't expired
   - Verify app permissions

2. **"Phone Number Not Found"**
   - Verify phone number format (with country code)
   - Ensure number is registered on WhatsApp
   - Check if number is in allowed list

3. **"Webhook Verification Failed"**
   - Check WHATSAPP_VERIFY_TOKEN
   - Ensure webhook URL is accessible
   - Verify HTTPS is enabled

4. **"Message Template Not Found"**
   - Create template in WhatsApp Business Manager
   - Wait for template approval
   - Use correct template name

### Debug Mode:
Enable debug logging by setting:
```env
DEBUG_WHATSAPP=true
```

## Best Practices

### 1. Message Content
- Keep messages concise and clear
- Use emojis sparingly
- Include clear call-to-actions
- Personalize when possible

### 2. Timing
- Respect user time zones
- Avoid sending messages late at night
- Use appropriate frequency

### 3. Compliance
- Follow WhatsApp Business Policy
- Respect user opt-outs
- Maintain message quality standards

## Support

For technical support:
- Email: contact@genedge.ac
- Documentation: This guide
- WhatsApp: Use the support number

## Updates

This integration will be updated regularly with:
- New message templates
- Enhanced auto-reply system
- Better analytics
- More automation features

---

**Note**: This WhatsApp integration requires a WhatsApp Business API account and approval from Meta. Ensure compliance with WhatsApp's Business Policy and local regulations.
