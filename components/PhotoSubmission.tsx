'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

interface PhotoSubmissionProps {
  breadId: string
  breadName: string
}

export default function PhotoSubmission({ breadId, breadName }: PhotoSubmissionProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      router.push('/login')
      return
    }

    const file = e.target.files?.[0]
    if (file) {
      // TODO: Upload to server/cloud storage
      // For now, just show success message
      setIsSubmitting(true)
      setTimeout(() => {
        setIsSubmitting(false)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
      }, 1000)
    }
  }

  if (!user) {
    return (
      <div className="bg-bread-surfaceLight rounded-xl p-6 border border-bread-cool/30">
        <h3 className="text-lg font-bold text-bread-neutral mb-2 flex items-center gap-2">
          <span>📸</span>
          Submit a Photo
        </h3>
        <p className="text-sm text-bread-neutralLight mb-4">
          Please <Link href="/login" className="text-bread-primary hover:underline font-semibold">sign in</Link> to submit photos of your {breadName}!
        </p>
        <Link href="/login" className="btn-primary inline-block">
          Sign In
        </Link>
      </div>
    )
  }

  if (showSuccess) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
        <div className="text-3xl mb-2">📸</div>
        <h3 className="text-lg font-bold text-green-800 mb-1">Photo Submitted!</h3>
        <p className="text-green-700 text-sm">
          Your photo will be reviewed and added to the community gallery. 
          Community members can vote for their favorite photos!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-bread-surfaceLight rounded-xl p-6 border border-bread-cool/30">
      <h3 className="text-lg font-bold text-bread-neutral mb-2 flex items-center gap-2">
        <span>📸</span>
        Submit a Photo
      </h3>
      <p className="text-sm text-bread-neutralLight mb-4">
        Share a photo of your {breadName}! The highest-voted community photo becomes the main image.
      </p>
      <div className="space-y-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isSubmitting}
          className="block w-full text-sm text-bread-neutralLight
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-bread-primary file:text-white
            hover:file:bg-bread-primaryDark
            file:cursor-pointer
            disabled:opacity-50"
        />
        <p className="text-xs text-bread-neutralLight/70">
          JPG, PNG, or WebP. Max 5MB. Your photo will be reviewed before being added.
        </p>
      </div>
    </div>
  )
}

