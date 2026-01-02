'use client'

import { useEffect, useState } from 'react'
import { breads } from '@/data/breads'

interface Stat {
  label: string
  value: number
  suffix?: string
  icon: React.ReactNode
  color: string
}

export default function StatsWidget() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({
    breads: 0,
    recipes: 0,
    categories: 0,
    community: 0
  })

  useEffect(() => {
    // Trigger animation when component mounts
    setIsVisible(true)

    // Calculate stats
    const totalRecipes = breads.reduce((sum, bread) => sum + bread.recipes.length, 0)
    const categories = new Set(breads.map(b => b.category)).size
    const communitySize = Math.floor(totalRecipes * 2.5) // Simulated community size

    // Animate counters
    const duration = 2000 // 2 seconds
    const steps = 60
    const interval = duration / steps

    const animate = (key: keyof typeof counts, target: number) => {
      let current = 0
      const increment = target / steps
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setCounts(prev => ({ ...prev, [key]: target }))
          clearInterval(timer)
        } else {
          setCounts(prev => ({ ...prev, [key]: Math.floor(current) }))
        }
      }, interval)
    }

    animate('breads', breads.length)
    animate('recipes', totalRecipes)
    animate('categories', categories)
    animate('community', communitySize)
  }, [])

  // Modern SVG Icons
  const BreadIcon = ({ color }: { color: string }) => (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )

  const RecipeIcon = ({ color }: { color: string }) => (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  )

  const CategoryIcon = ({ color }: { color: string }) => (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  )

  const CommunityIcon = ({ color }: { color: string }) => (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 010 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )

  const stats: Stat[] = [
    {
      label: 'Bread Types',
      value: counts.breads,
      icon: <BreadIcon color="#8B5A3C" />, // Darker terracotta
      color: 'from-bread-primary to-bread-primaryDark'
    },
    {
      label: 'Recipes Shared',
      value: counts.recipes,
      icon: <RecipeIcon color="#556B55" />, // Darker sage
      color: 'from-bread-sage to-bread-sageDark'
    },
    {
      label: 'Categories',
      value: counts.categories,
      icon: <CategoryIcon color="#B8935F" />, // Darker golden
      color: 'from-bread-warm to-bread-accent'
    },
    {
      label: 'Community Members',
      value: counts.community,
      suffix: '+',
      icon: <CommunityIcon color="#8B5A3C" />, // Darker terracotta
      color: 'from-bread-accent to-bread-primary'
    }
  ]

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="bg-bread-surfaceLight rounded-xl p-6 shadow-lg border border-bread-cool/30 hover:shadow-xl transition-all duration-300 hover:scale-105"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="text-center">
            <div className="flex justify-center mb-4 transform hover:scale-110 transition-transform duration-300">
              <div className="p-4 rounded-2xl bg-bread-warm/50 border-2 border-bread-cool/40 flex items-center justify-center shadow-sm">
                {stat.icon}
              </div>
            </div>
            <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
              {stat.value.toLocaleString()}{stat.suffix}
            </div>
            <div className="text-sm text-bread-neutralLight font-medium">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

