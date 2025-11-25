'use client'

/**
 * Authentication Hook
 * Uses demo authentication for the demo version
 * Switch to real Supabase auth by uncommenting the import below
 */

// Demo Mode - Uses localStorage and mock data
export { useDemoAuth as useAuth } from './useDemoAuth'

// Production Mode - Uses Supabase (uncomment below and comment above)
// export { useSupabaseAuth as useAuth } from './useSupabaseAuth'
