'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface FavoriteButtonProps {
  breadId: string
  breadName: string
  className?: string
}

export default function FavoriteButton({ breadId, breadName, className = '' }: FavoriteButtonProps) {
  const { user, isFavorite, addFavorite, removeFavorite } = useAuth()
  const router = useRouter()
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    if (!user) {
      router.push('/login')
      return
    }

    setIsAnimating(true)
    if (isFavorite(breadId)) {
      removeFavorite(breadId)
    } else {
      addFavorite(breadId)
    }
    setTimeout(() => setIsAnimating(false), 300)
  }

  const favorited = user ? isFavorite(breadId) : false

  return (
    <button
      onClick={handleClick}
      className={`transition-all duration-300 ${className} ${
        isAnimating ? 'scale-125' : ''
      }`}
      aria-label={favorited ? `Remove ${breadName} from favorites` : `Add ${breadName} to favorites`}
    >
      <svg
        className={`w-6 h-6 transition-all duration-300 ${
          favorited
            ? 'text-red-500 fill-red-500'
            : 'text-gray-400 fill-gray-300 hover:text-red-400 hover:fill-red-200'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  )
}

