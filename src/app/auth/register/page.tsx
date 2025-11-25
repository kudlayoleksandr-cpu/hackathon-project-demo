'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { UserRole } from '@/lib/database.types'
import { Mail, Lock, User, AlertCircle, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'

const roleOptions = [
  { value: 'applicant', label: 'I\'m an Applicant - Looking for insights' },
  { value: 'student', label: 'I\'m a Student - Want to share & earn' },
]

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const defaultRole = (searchParams.get('role') as UserRole) || 'applicant'
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>(defaultRole)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const router = useRouter()
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Basic validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const { error } = await signUp(email, password, name, role)
      
      if (error) {
        setError(error.message)
        return
      }

      setSuccess(true)
      toast.success('Account created! Please check your email to verify.')
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-accent-600 dark:text-accent-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Check your email
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          We sent a verification link to <strong>{email}</strong>. Click the
          link to verify your account and get started.
        </p>
        <Link href="/auth/login">
          <Button variant="outline" className="w-full">
            Back to sign in
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        Create your account
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{' '}
        <Link
          href="/auth/login"
          className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
        >
          Sign in
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {error && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Input
          label="Full name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          leftIcon={<User className="h-5 w-5" />}
          required
          autoComplete="name"
        />

        <Input
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          leftIcon={<Mail className="h-5 w-5" />}
          required
          autoComplete="email"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          leftIcon={<Lock className="h-5 w-5" />}
          hint="Must be at least 6 characters"
          required
          autoComplete="new-password"
        />

        <Select
          label="I am a..."
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
          options={roleOptions}
        />

        <div className="text-sm text-slate-600 dark:text-slate-400">
          By creating an account, you agree to our{' '}
          <Link
            href="/terms"
            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            Privacy Policy
          </Link>
          .
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          loading={loading}
        >
          Create account
        </Button>
      </form>
    </div>
  )
}

