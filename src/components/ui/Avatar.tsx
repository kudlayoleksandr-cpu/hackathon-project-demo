'use client'

import { forwardRef, ImgHTMLAttributes } from 'react'
import { cn, getInitials, getAvatarUrl } from '@/lib/utils'

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  showBadge?: boolean
  badgeColor?: string
}

/**
 * Avatar component with fallback to initials
 */
const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      name,
      size = 'md',
      showBadge = false,
      badgeColor = 'bg-emerald-500',
      alt,
      ...props
    },
    ref
  ) => {
    const sizes = {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-14 w-14 text-lg',
      xl: 'h-20 w-20 text-2xl',
    }

    const badgeSizes = {
      xs: 'h-2 w-2',
      sm: 'h-2.5 w-2.5',
      md: 'h-3 w-3',
      lg: 'h-4 w-4',
      xl: 'h-5 w-5',
    }

    const initials = getInitials(name)
    const fallbackUrl = getAvatarUrl(name)
    const imageUrl = src || fallbackUrl

    return (
      <div ref={ref} className={cn('relative inline-block', className)}>
        <div
          className={cn(
            'rounded-full overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center font-semibold text-white',
            sizes[size]
          )}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={alt || name}
              className="h-full w-full object-cover"
              onError={(e) => {
                // Fallback to initials if image fails to load
                (e.target as HTMLImageElement).style.display = 'none'
              }}
              {...props}
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        {showBadge && (
          <span
            className={cn(
              'absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-slate-800',
              badgeSizes[size],
              badgeColor
            )}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export { Avatar }

