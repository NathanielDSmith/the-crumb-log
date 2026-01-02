'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bread } from '@/data/breads'
import BreadImage from '@/components/BreadImage'

interface CarouselProps {
  items: Bread[]
}

export default function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 5000) // Auto-advance every 5 seconds

    return () => clearInterval(interval)
  }, [items.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((bread) => (
            <div key={bread.id} className="min-w-full">
              <Link href={`/bread/${bread.id}`}>
                <div className="relative bg-gradient-primary text-white overflow-hidden">
                  {/* Subtle texture overlay */}
                  <div className="absolute inset-0 opacity-5 texture-overlay"></div>
                  <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 relative z-10">
                    {/* Image Area */}
                    <div className="flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl relative bg-transparent">
                        <BreadImage
                          src={bread.imageUrl}
                          alt={bread.name}
                          fill
                          className="rounded-full"
                          sizes="192px"
                          objectFit="cover"
                          objectPosition="center center"
                        />
                      </div>
                    </div>
                    
                    {/* Content Area */}
                    <div className="flex flex-col justify-center space-y-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="bg-gradient-accent backdrop-blur-sm text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                          NEW
                        </span>
                        <h3 className="text-4xl md:text-5xl font-bold">{bread.name}</h3>
                      </div>
                      <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                        {bread.description}
                      </p>
                      <div className="pt-2">
                        <span className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-2 rounded-lg transition-all cursor-pointer font-medium">
                          Explore →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-bread-neutral p-3 rounded-full shadow-xl transition-all hover:scale-110 z-10 border border-bread-cool/20"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-bread-neutral p-3 rounded-full shadow-xl transition-all hover:scale-110 z-10 border border-bread-cool/20"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-bread-primary w-8 shadow-md'
                : 'bg-bread-warm w-3 hover:bg-bread-cool'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

