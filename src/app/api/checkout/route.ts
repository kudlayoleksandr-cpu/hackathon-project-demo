import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/checkout
 * Creates a checkout session (Demo mode - simulated)
 */
export async function POST(request: NextRequest) {
  try {
    const { offerId } = await request.json()
    
    if (!offerId) {
      return NextResponse.json({ error: 'Offer ID required' }, { status: 400 })
    }

    // Demo mode: Return a success URL directly
    // In production, this would create a real Stripe checkout session
    const successUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/success?demo=true&offer=${offerId}`
    
    return NextResponse.json({ url: successUrl })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
