import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Simplified middleware for demo mode
 * In production, this would check Supabase session
 */
export async function middleware(request: NextRequest) {
  // For demo mode, we handle auth client-side with localStorage
  // Just pass through all requests
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
