'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Avatar } from '@/components/ui/Avatar'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FileText,
  ShoppingBag,
  User,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  GraduationCap,
  Search,
  Heart,
} from 'lucide-react'

// Navigation items for students
const studentNavItems = [
  { href: '/dashboard/student', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/student/offers', label: 'My Offers', icon: FileText },
  { href: '/dashboard/student/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/dashboard/student/earnings', label: 'Earnings', icon: CreditCard },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
]

// Navigation items for applicants
const applicantNavItems = [
  { href: '/dashboard/applicant', label: 'Overview', icon: LayoutDashboard },
  { href: '/explore', label: 'Explore', icon: Search },
  { href: '/dashboard/applicant/purchases', label: 'My Purchases', icon: ShoppingBag },
  { href: '/dashboard/applicant/favorites', label: 'Favorites', icon: Heart },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user, signOut, isStudent, isApplicant } = useAuth()

  const navItems = isStudent ? studentNavItems : applicantNavItems

  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-bold"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 text-white">
            <GraduationCap className="h-4 w-4" />
          </div>
          <span className="gradient-text">StudentInsights</span>
        </Link>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Avatar
              src={user.avatar_url}
              name={user.name}
              size="md"
              showBadge={user.is_verified}
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{user.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate capitalize">
                {user.role}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
        <Link
          href="/help"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <HelpCircle className="h-5 w-5" />
          Help & Support
        </Link>
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}

