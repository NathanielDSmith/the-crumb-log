'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface BreadRatingProps {
  breadId: string
  breadName: string
  currentRating?: number | null
  ratingCount?: number
}

export default function BreadRating({ 
  breadId, 
  breadName, 
  currentRating = null,
  ratingCount = 0 
}: BreadRatingProps) {
  const { user, submitRating, getUserRating } = useAuth()
  const router = useRouter()
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const userRating = user ? getUserRating(breadId) : null
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRatingClick = async (rating: number) => {
    if (isSubmitting) return
    
    if (!user) {
      router.push('/login')
      return
    }
    
    setIsSubmitting(true)
    try {
      // Save rating to user's profile
      submitRating(breadId, rating)
      // TODO: Submit rating to API
      // await submitRating(breadId, user.id, rating)
    } catch (error) {
      console.error('Failed to submit rating:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const displayRating = userRating || currentRating
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-0.5">
          {stars.map((star) => {
            const isFilled = star <= (hoveredStar || displayRating || 0)
            return (
              <button
                key={star}
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(null)}
                disabled={isSubmitting}
                className="transition-all duration-200 hover:scale-125 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={`Rate ${star} out of 5 stars`}
              >
                <svg
                  className={`w-6 h-6 ${
                    isFilled
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300 fill-gray-300 hover:text-yellow-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            )
          })}
        </div>
        
        {displayRating && (
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-bread-neutral">
              {displayRating.toFixed(1)}
            </span>
            {ratingCount > 0 && (
              <span className="text-sm text-bread-neutralLight">
                ({ratingCount} {ratingCount === 1 ? 'rating' : 'ratings'})
              </span>
            )}
          </div>
        )}
      </div>
      
      {!displayRating && ratingCount === 0 && (
        <span className="text-sm text-bread-neutralLight italic">
          No ratings yet - be the first to rate!
        </span>
      )}
    </div>
  )
}

