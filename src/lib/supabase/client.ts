/**
 * Supabase client (Demo mode - not used)
 * In demo mode, we use mock data instead
 */

// Demo mode placeholder
export function createClient() {
  // Return null in demo mode - we use mock data instead
  console.warn('Demo mode: Supabase client not initialized')
  return null as any
}

// Production mode (uncomment when using real Supabase):
// import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
// import { Database } from '@/lib/database.types'
// 
// export function createClient() {
//   return createBrowserClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   )
// }
