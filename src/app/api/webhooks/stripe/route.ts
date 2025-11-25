import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering and use edge runtime for webhooks
export const dynamic = 'force-dynamic'

/**
 * POST /api/webhooks/stripe
 * Handles Stripe webhook events (Demo mode - simulated)
 */
export async function POST(request: NextRequest) {
  // In demo mode, we just acknowledge the webhook
  // In production, this would verify and process Stripe events
  
  try {
    const body = await request.text()
    
    // Demo: Log that we received a webhook
    console.log('Stripe webhook received (demo mode)')
    
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
