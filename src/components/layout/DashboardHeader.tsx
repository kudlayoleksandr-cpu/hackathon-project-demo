'use client'

import { useTheme } from 'next-themes'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { Bell, Sun, Moon, Search, Menu } from 'lucide-react'

interface DashboardHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export function DashboardHeader({ title, subtitle, action }: DashboardHeaderProps) {
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-20 h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {action}

          {/* Search */}
          <button className="h-10 w-10 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Search className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <button className="relative h-10 w-10 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary-500" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-10 w-10 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

