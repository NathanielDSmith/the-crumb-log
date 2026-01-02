'use client'

import Link from 'next/link'
import { breads } from '@/data/breads'
import type { Bread } from '@/data/breads'
import BreadImage from './BreadImage'

interface RelatedBreadsProps {
  currentBread: Bread
}

export default function RelatedBreads({ currentBread }: RelatedBreadsProps) {
  // Find related breads: same category, different bread, limit to 3
  const related = breads
    .filter(b => 
      b.id !== currentBread.id && 
      (b.category === currentBread.category || 
       b.difficulty === currentBread.difficulty)
    )
    .slice(0, 3)

  if (related.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-bread-neutral mb-6 pb-3 border-b-2 border-bread-sage/40 flex items-center gap-3">
        <svg className="w-8 h-8 text-bread-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((bread) => (
          <Link
            key={bread.id}
            href={`/bread/${bread.id}`}
            className="group bread-card transform transition-all duration-300 hover:scale-105"
          >
            <div className="bread-card-image aspect-[4/3] relative overflow-hidden">
              <BreadImage
                src={bread.imageUrl}
                alt={bread.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                objectFit="cover"
                objectPosition="center center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-bread-neutral group-hover:text-bread-primary transition-colors mb-2">
                {bread.name}
              </h3>
              <p className="text-sm text-bread-neutralLight line-clamp-2 mb-3">
                {bread.description}
              </p>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-1 bg-bread-warm text-bread-neutral rounded">
                  {bread.category}
                </span>
                <span className="px-2 py-1 bg-bread-sage/20 text-bread-sageDark rounded">
                  {bread.difficulty}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

