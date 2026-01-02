'use client'

import Image from 'next/image'
import { useState } from 'react'

interface BreadImageProps {
  src?: string
  alt: string
  className?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
  objectFit?: 'cover' | 'contain' | 'fill'
  objectPosition?: string
}

export default function BreadImage({ 
  src, 
  alt, 
  className = '', 
  fill = false,
  sizes,
  priority = false,
  objectFit = 'cover',
  objectPosition = 'center center'
}: BreadImageProps) {
  const [imageError, setImageError] = useState(false)

  // Placeholder component
  const Placeholder = ({ containerClass = '' }: { containerClass?: string }) => (
    <div 
      className={`bg-gradient-warm flex items-center justify-center ${containerClass || className}`} 
      style={fill ? { position: 'absolute', inset: 0 } : {}}
    >
      <div className="text-center p-8">
        <div className="text-6xl mb-2">🍞</div>
        <p className="text-sm text-bread-neutralLight">Image coming soon</p>
      </div>
    </div>
  )

  // If no src or image failed to load, show placeholder
  if (!src || imageError) {
    return <Placeholder />
  }

  if (fill) {
    return (
      <div className="relative" style={{ position: 'absolute', inset: 0 }}>
        {imageError ? (
          <Placeholder containerClass={className} />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            className={className}
            sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
            priority={priority}
            style={{ objectFit, objectPosition }}
            onError={() => setImageError(true)}
            unoptimized
          />
        )}
      </div>
    )
  }

  return (
    <div className={`relative w-full ${className}`}>
      {imageError ? (
        <Placeholder />
      ) : (
        <div className="relative w-full">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="w-full h-auto rounded-2xl"
            sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
            priority={priority}
            onError={() => setImageError(true)}
            unoptimized
          />
        </div>
      )}
    </div>
  )
}

