/**
 * Supabase middleware (Demo mode - not used)
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Demo mode: just pass through
  return NextResponse.next()
}
