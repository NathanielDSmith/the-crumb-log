'use client'

import { useState, useEffect } from 'react'
import { breads } from '@/data/breads'
import Link from 'next/link'
import BreadImage from './BreadImage'

export default function BreadOfTheDay() {
  const [featuredBread, setFeaturedBread] = useState(breads[0])

  useEffect(() => {
    // Rotate featured bread daily (based on day of year)
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    const index = dayOfYear % breads.length
    setFeaturedBread(breads[index])
  }, [])

  return (
    <Link href={`/bread/${featuredBread.id}`}>
      <div className="bg-gradient-to-br from-bread-primary/10 via-bread-sage/10 to-bread-accent/10 rounded-2xl shadow-xl overflow-hidden border-2 border-bread-primary/20 hover:border-bread-primary/40 transition-all duration-300 hover:shadow-2xl group">
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl animate-pulse">⭐</span>
            <span className="text-sm font-bold text-bread-primary uppercase tracking-wider">
              Bread of the Day
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                <BreadImage
                  src={featuredBread.imageUrl}
                  alt={featuredBread.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  objectFit="contain"
                  objectPosition="center center"
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-bread-neutral mb-3 group-hover:text-bread-primary transition-colors">
                {featuredBread.name}
              </h3>
              <p className="text-bread-neutralLight mb-4 leading-relaxed">
                {featuredBread.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-bread-warm text-bread-neutral rounded-full text-sm font-medium">
                  {featuredBread.category}
                </span>
                <span className="px-3 py-1 bg-bread-sage/20 text-bread-sageDark rounded-full text-sm font-medium">
                  {featuredBread.difficulty}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-bread-primary font-semibold group-hover:gap-4 transition-all">
                <span>Explore this bread</span>
                <span className="text-xl">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

