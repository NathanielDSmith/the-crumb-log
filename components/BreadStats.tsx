'use client'

import { Bread } from '@/data/breads'
import { getAverageRating, getRatingCount } from '@/data/ratings'
import { getApprovedRecipes } from '@/data/pendingRecipes'

interface BreadStatsProps {
  bread: Bread
}

export default function BreadStats({ bread }: BreadStatsProps) {
  const averageRating = getAverageRating(bread.id)
  const ratingCount = getRatingCount(bread.id)
  
  // Get approved recipes for this bread
  const approvedRecipes = getApprovedRecipes(bread.id)
  const totalRecipes = bread.recipes.length + approvedRecipes.length
  
  const difficultyColors = {
    'Beginner': 'bg-green-100 text-green-800 border-green-300',
    'Intermediate': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'Advanced': 'bg-red-100 text-red-800 border-red-300'
  }

  const difficultyIcons = {
    'Beginner': (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'Intermediate': (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    'Advanced': (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Category Card */}
      <div className="group relative bg-gradient-to-br from-bread-primary/10 to-bread-primary/5 rounded-xl p-6 border-2 border-bread-primary/20 hover:border-bread-primary/40 transition-all duration-300 hover:shadow-lg hover:scale-105">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-bread-primary/20 rounded-lg">
            <svg className="w-6 h-6 text-bread-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-bread-neutralLight uppercase tracking-wider">Category</p>
        </div>
        <p className="text-2xl font-bold text-bread-neutral">{bread.category}</p>
      </div>

      {/* Difficulty Card */}
      <div className={`group relative rounded-xl p-6 border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 ${difficultyColors[bread.difficulty]}`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/50 rounded-lg">
            {difficultyIcons[bread.difficulty]}
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Difficulty</p>
        </div>
        <p className="text-2xl font-bold">{bread.difficulty}</p>
      </div>

      {/* Recipes Card */}
      <div className="group relative bg-gradient-to-br from-bread-sage/10 to-bread-sage/5 rounded-xl p-6 border-2 border-bread-sage/20 hover:border-bread-sage/40 transition-all duration-300 hover:shadow-lg hover:scale-105">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-bread-sage/20 rounded-lg">
            <svg className="w-6 h-6 text-bread-sageDark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-bread-neutralLight uppercase tracking-wider">Recipes</p>
        </div>
        <p className="text-2xl font-bold text-bread-neutral">
          {totalRecipes} {totalRecipes === 1 ? 'Recipe' : 'Recipes'}
        </p>
      </div>

      {/* Community Rating Card - if there are ratings */}
      {averageRating && (
        <div className="group relative bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-xl p-6 border-2 border-yellow-200 hover:border-yellow-300 transition-all duration-300 hover:shadow-lg hover:scale-105">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-200/50 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-yellow-800 uppercase tracking-wider">Community Rating</p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-yellow-900">
              {averageRating.toFixed(1)}
            </p>
            <span className="text-sm text-yellow-700">/ 5</span>
            {ratingCount > 0 && (
              <span className="text-xs text-yellow-600 ml-2">
                ({ratingCount} {ratingCount === 1 ? 'vote' : 'votes'})
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

