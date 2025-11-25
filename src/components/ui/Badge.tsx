'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'danger'
}

/**
 * Badge component for labels and status indicators
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
      primary: 'badge-primary',
      accent: 'badge-accent',
      success: 'badge-success',
      warning: 'badge-warning',
      danger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    }

    return (
      <span
        ref={ref}
        className={cn('badge', variants[variant], className)}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }

