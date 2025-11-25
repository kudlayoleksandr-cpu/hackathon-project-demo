import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'

/**
 * Creates a Supabase client for use in browser/client components
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

