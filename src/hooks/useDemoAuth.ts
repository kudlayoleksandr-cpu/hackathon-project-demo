'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { User, UserRole } from '@/lib/database.types'
import { mockUsers } from '@/lib/mock-data'

const STORAGE_KEY = 'demo_auth_user'

interface DemoAuthState {
  user: User | null
  loading: boolean
}

/**
 * Demo Authentication Hook
 * Simulates authentication using localStorage for demo purposes
 */
export function useDemoAuth() {
  const [state, setState] = useState<DemoAuthState>({
    user: null,
    loading: true,
  })
  const router = useRouter()

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const user = JSON.parse(stored)
        setState({ user, loading: false })
      } catch {
        setState({ user: null, loading: false })
      }
    } else {
      setState({ user: null, loading: false })
    }
  }, [])

  // Sign up (demo mode)
  const signUp = useCallback(async (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Check if email already exists
    const existing = mockUsers.find(u => u.email === email)
    if (existing) {
      return { data: null, error: { message: 'Email already registered' } }
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role,
      bio: null,
      university: null,
      study_program: null,
      country: null,
      avatar_url: null,
      stripe_customer_id: null,
      stripe_account_id: null,
      is_verified: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Add to mock users
    mockUsers.push(newUser)

    // Auto-login
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    setState({ user: newUser, loading: false })

    return { data: { user: newUser }, error: null }
  }, [])

  // Sign in (demo mode)
  const signIn = useCallback(async (email: string, password: string) => {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Demo accounts for quick login
    const demoAccounts: Record<string, string> = {
      'demo@example.com': 'demo-applicant',
      'student@example.com': 'demo-student',
      'admin@example.com': 'demo-admin',
    }

    // Check demo accounts first
    if (demoAccounts[email]) {
      const user = mockUsers.find(u => u.id === demoAccounts[email])
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        setState({ user, loading: false })
        return { data: { user }, error: null }
      }
    }

    // Check existing users
    const user = mockUsers.find(u => u.email === email)
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      setState({ user, loading: false })
      return { data: { user }, error: null }
    }

    return { data: null, error: { message: 'Invalid email or password' } }
  }, [])

  // Sign out
  const signOut = useCallback(async () => {
    localStorage.removeItem(STORAGE_KEY)
    setState({ user: null, loading: false })
    router.push('/')
    return { error: null }
  }, [router])

  // Update profile
  const updateProfile = useCallback(async (updates: Partial<User>) => {
    if (!state.user) {
      return { data: null, error: new Error('Not authenticated') }
    }

    const updatedUser = { ...state.user, ...updates, updated_at: new Date().toISOString() }
    
    // Update in mock data
    const index = mockUsers.findIndex(u => u.id === state.user!.id)
    if (index !== -1) {
      mockUsers[index] = updatedUser
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser))
    setState({ user: updatedUser, loading: false })

    return { data: updatedUser, error: null }
  }, [state.user])

  // Reset password (demo - just shows success)
  const resetPassword = useCallback(async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { data: {}, error: null }
  }, [])

  return {
    user: state.user,
    session: state.user ? { user: state.user } : null,
    loading: state.loading,
    isAuthenticated: !!state.user,
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

