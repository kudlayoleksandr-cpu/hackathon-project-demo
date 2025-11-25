import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Database } from '@/lib/database.types'

/**
 * Creates a Supabase client for use in middleware
 * Handles session refresh and cookie management
 */
export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createMiddlewareClient<Database>({ req: request, res: response })
  
  // Refresh session if expired
  await supabase.auth.getSession()

  return response
}

