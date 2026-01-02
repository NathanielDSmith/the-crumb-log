'use client'

import { useState } from 'react'
import { breads } from '@/data/breads'
import Link from 'next/link'
import BreadImage from './BreadImage'

export default function BreadFinder() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('')
  const [selectedBestFor, setSelectedBestFor] = useState<string>('')

  const categories = Array.from(new Set(breads.map(b => b.category))).sort()
  const difficulties = Array.from(new Set(breads.map(b => b.difficulty)))
  const bestForOptions = Array.from(new Set(breads.flatMap(b => b.bestFor))).sort()

  const filteredBreads = breads.filter(bread => {
    if (selectedCategory && bread.category !== selectedCategory) return false
    if (selectedDifficulty && bread.difficulty !== selectedDifficulty) return false
    if (selectedBestFor && !bread.bestFor.includes(selectedBestFor)) return false
    return true
  })

  const resetFilters = () => {
    setSelectedCategory('')
    setSelectedDifficulty('')
    setSelectedBestFor('')
  }

  const hasActiveFilters = selectedCategory || selectedDifficulty || selectedBestFor

  return (
    <div className="bg-bread-surfaceLight rounded-2xl shadow-xl p-8 border border-bread-cool/30">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-bread-neutral mb-2 flex items-center gap-3">
          <span className="text-4xl">🔍</span>
          Find Your Perfect Bread
        </h2>
        <p className="text-bread-neutralLight">
          Filter by category, difficulty, or what you're looking for
        </p>
      </div>

      {/* Compact Filter Bar */}
      <div className="bg-bread-surface rounded-xl p-4 mb-6 border border-bread-cool/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-bread-neutralLight mb-2 uppercase tracking-wide">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-bread-cool rounded-lg text-bread-neutral focus:ring-2 focus:ring-bread-primary focus:border-transparent transition-all"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-bread-neutralLight mb-2 uppercase tracking-wide">
              Difficulty
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-bread-cool rounded-lg text-bread-neutral focus:ring-2 focus:ring-bread-primary focus:border-transparent transition-all"
            >
              <option value="">All Levels</option>
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>

          {/* Best For Dropdown */}
          <div className="relative">
            <label className="block text-xs font-semibold text-bread-neutralLight mb-2 uppercase tracking-wide">
              Best For
            </label>
            <select
              value={selectedBestFor}
              onChange={(e) => setSelectedBestFor(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-bread-cool rounded-lg text-bread-neutral focus:ring-2 focus:ring-bread-primary focus:border-transparent transition-all"
            >
              <option value="">All Uses</option>
              {bestForOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters & Reset */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-bread-cool/30 flex items-center justify-between flex-wrap gap-2">
            <div className="flex flex-wrap gap-2">
              {selectedCategory && (
                <span className="px-3 py-1 bg-bread-primary/10 text-bread-primary rounded-full text-sm font-medium flex items-center gap-2">
                  Category: {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="hover:text-bread-primaryDark"
                    aria-label="Remove filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedDifficulty && (
                <span className="px-3 py-1 bg-bread-sage/10 text-bread-sageDark rounded-full text-sm font-medium flex items-center gap-2">
                  Difficulty: {selectedDifficulty}
                  <button
                    onClick={() => setSelectedDifficulty('')}
                    className="hover:text-bread-sageDark"
                    aria-label="Remove filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedBestFor && (
                <span className="px-3 py-1 bg-bread-accent/10 text-bread-accentDark rounded-full text-sm font-medium flex items-center gap-2">
                  Best For: {selectedBestFor}
                  <button
                    onClick={() => setSelectedBestFor('')}
                    className="hover:text-bread-accentDark"
                    aria-label="Remove filter"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
            <button
              onClick={resetFilters}
              className="text-sm text-bread-neutralLight hover:text-bread-primary font-medium underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-bread-neutral">
            {filteredBreads.length} {filteredBreads.length === 1 ? 'bread found' : 'breads found'}
          </h3>
        </div>

        {filteredBreads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBreads.map(bread => (
              <Link
                key={bread.id}
                href={`/bread/${bread.id}`}
                className="bread-card group transform transition-all duration-300 hover:scale-105"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-bread-neutral group-hover:text-bread-primary transition-colors mb-1">
                    {bread.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-bread-neutralLight">
                    <span>{bread.category}</span>
                    <span>•</span>
                    <span>{bread.difficulty}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-bread-surface rounded-xl border-2 border-dashed border-bread-warm">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-bread-neutralLight">No breads match your filters. Try adjusting your selection!</p>
          </div>
        )}
      </div>
    </div>
  )
}

