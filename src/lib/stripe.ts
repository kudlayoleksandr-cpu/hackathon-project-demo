/**
 * Stripe utilities (Demo mode - no actual Stripe connection)
 */

/**
 * Calculate application fee (platform commission)
 */
export function calculateApplicationFee(amount: number): number {
  const commissionPercent = parseInt(process.env.PLATFORM_COMMISSION || '15')
  return Math.round(amount * (commissionPercent / 100))
}

/**
 * Format amount for Stripe (convert dollars to cents)
 */
export function toStripeAmount(dollars: number): number {
  return Math.round(dollars * 100)
}

/**
 * Format Stripe amount to dollars
 */
export function fromStripeAmount(cents: number): number {
  return cents / 100
}

// Demo mode: Stripe client is not initialized
// In production, uncomment below:
// import Stripe from 'stripe'
// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2023-10-16',
//   typescript: true,
// })
