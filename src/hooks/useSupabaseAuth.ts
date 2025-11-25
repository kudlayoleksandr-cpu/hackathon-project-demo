'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User, UserRole } from '@/lib/database.types'
import { useRouter } from 'next/navigation'
import type { Session, AuthChangeEvent } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
}

/**
 * Supabase Authentication Hook
 * Use this for production with real Supabase backend
 */
export function useSupabaseAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  })
  const router = useRouter()
  const supabase = createClient()

  const fetchUser = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) {
      console.error('Error fetching user:', error)
      return null
    }
    return data
  }, [supabase])

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        const user = await fetchUser(session.user.id)
        setState({ session, user, loading: false })
      } else {
        setState({ session: null, user: null, loading: false })
      }
    }

    initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          const user = await fetchUser(session.user.id)
          setState({ session, user, loading: false })
        } else {
          setState({ session: null, user: null, loading: false })
        }
        
        if (event === 'SIGNED_OUT') {
          router.push('/')
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router, fetchUser])

  const signUp = async (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      setState({ session: null, user: null, loading: false })
      router.push('/')
    }
    return { error }
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!state.user) return { error: new Error('Not authenticated') }
    
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', state.user.id)
      .select()
      .single()
    
    if (!error && data) {
      setState(prev => ({ ...prev, user: data }))
    }
    
    return { data, error }
  }

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    return { data, error }
  }

  return {
    user: state.user,
    session: state.session,
    loading: state.loading,
    isAuthenticated: !!state.session,
    isStudent: state.user?.role === 'student',
    isApplicant: state.user?.role === 'applicant',
    isAdmin: state.user?.role === 'admin',
    signUp,
    signIn,
    signOut,
    updateProfile,
    resetPassword,
  }
}

