/**
 * Supabase server client (Demo mode - not used)
 * In demo mode, we use mock data instead
 */

// Demo mode placeholders
export function createServerSupabaseClient() {
  console.warn('Demo mode: Supabase server client not initialized')
  return null as any
}

export function createAdminClient() {
  console.warn('Demo mode: Supabase admin client not initialized')
  return null as any
}

// Production mode (uncomment when using real Supabase):
// import { createServerClient, type CookieOptions } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
// import { Database } from '@/lib/database.types'
// 
// export function createServerSupabaseClient() {
//   const cookieStore = cookies()
//   return createServerClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     { cookies: { ... } }
//   )
// }
