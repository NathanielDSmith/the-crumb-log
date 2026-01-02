'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { breads } from '@/data/breads'
import { useAuth } from '@/contexts/AuthContext'
import RecipeSubmissionForm from '@/components/RecipeSubmissionForm'

interface SubmitRecipePageProps {
  searchParams: { bread?: string }
}

export default function SubmitRecipePage({ searchParams }: SubmitRecipePageProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const breadId = searchParams?.bread
  const bread = breadId ? breads.find(b => b.id === breadId) : null

  useEffect(() => {
    if (!isLoading && !user) {
      const redirectPath = '/submit-recipe' + (breadId ? `?bread=${breadId}` : '')
      router.push(`/login?redirect=${encodeURIComponent(redirectPath)}`)
    }
  }, [user, isLoading, router, breadId])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <p className="text-bread-neutralLight">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render form if not authenticated (redirect will happen)
  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-gradient-primary text-white py-8 shadow-xl relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-10 texture-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-3 tracking-tight">Share Your Recipe</h1>
          <p className="text-xl md:text-2xl text-white/90 font-light">Contribute to our community recipe collection</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <p className="text-lg text-bread-neutralLight leading-relaxed">
              Help build our community recipe collection! Share your favorite bread recipe, tips, and techniques 
              with fellow bakers. Your contribution helps others discover new ways to bake.
            </p>
          </div>

          <RecipeSubmissionForm breadName={bread?.name} breadId={breadId} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-primary text-white/90 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">The Crumb Log</h3>
              <p className="text-white/80 text-sm">
                A community-driven platform for bread lovers to share recipes, techniques, and celebrate the art of baking.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/submit-recipe" className="hover:text-white transition-colors">Submit Recipe</Link></li>
                <li><Link href="/#popular" className="hover:text-white transition-colors">Popular Breads</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><Link href="/?category=sourdough" className="hover:text-white transition-colors">Sourdough</Link></li>
                <li><Link href="/?category=artisan" className="hover:text-white transition-colors">Artisan</Link></li>
                <li><Link href="/?category=classic" className="hover:text-white transition-colors">Classic</Link></li>
                <li><Link href="/?category=whole-grain" className="hover:text-white transition-colors">Whole Grain</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-sm text-white/70">© 2025 The Crumb Log. A place for bread enthusiasts to connect and share.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

