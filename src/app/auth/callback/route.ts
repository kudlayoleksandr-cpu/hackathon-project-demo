import { NextResponse } from 'next/server'

// Force dynamic rendering for auth routes
export const dynamic = 'force-dynamic'

/**
 * Auth callback handler (Demo mode)
 * In demo mode, just redirect to dashboard
 */
export async function GET(request: Request) {
  const { origin } = new URL(request.url)
  
  // Demo mode: redirect to dashboard
  return NextResponse.redirect(`${origin}/dashboard`)
}
