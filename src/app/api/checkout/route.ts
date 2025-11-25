import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { stripe, calculateApplicationFee } from '@/lib/stripe'
import { calculateFees } from '@/lib/utils'

/**
 * POST /api/checkout
 * Creates a Stripe Checkout session for purchasing an offer
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    
    // Check authentication
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { offerId } = await request.json()
    if (!offerId) {
      return NextResponse.json({ error: 'Offer ID required' }, { status: 400 })
    }

    // Get offer details
    const { data: offer, error: offerError } = await supabase
      .from('offers')
      .select('*, users(*)')
      .eq('id', offerId)
      .single()

    if (offerError || !offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 })
    }

    // Check if offer is active
    if (!offer.is_active) {
      return NextResponse.json({ error: 'Offer is no longer available' }, { status: 400 })
    }

    // Can't purchase own offer
    if (offer.user_id === session.user.id) {
      return NextResponse.json({ error: 'Cannot purchase your own offer' }, { status: 400 })
    }

    // Get or create Stripe customer
    const { data: buyer } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', session.user.id)
      .single()

    let customerId = buyer?.stripe_customer_id

    if (!customerId) {
      // Create Stripe customer
      const customer = await stripe.customers.create({
        email: session.user.email,
        metadata: {
          supabase_user_id: session.user.id,
        },
      })
      customerId = customer.id

      // Save customer ID to database
      await supabase
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', session.user.id)
    }

    // Calculate fees
    const { platformFee, sellerAmount } = calculateFees(offer.price)

    // Create Stripe Checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: offer.title,
              description: `Consultation with ${offer.users.name} - ${offer.users.university || 'Student'}`,
              metadata: {
                offer_id: offer.id,
                seller_id: offer.user_id,
              },
            },
            unit_amount: offer.price, // Price is already in cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        offer_id: offer.id,
        buyer_id: session.user.id,
        seller_id: offer.user_id,
        platform_fee: platformFee.toString(),
        seller_amount: sellerAmount.toString(),
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/offers/${offerId}`,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

