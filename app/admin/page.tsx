'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { getPendingRecipes, approveRecipe, rejectRecipe, PendingRecipe } from '@/data/pendingRecipes'
import { breads } from '@/data/breads'
import Link from 'next/link'

export default function AdminPage() {
  const { user, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [pendingRecipes, setPendingRecipes] = useState<PendingRecipe[]>([])
  const [rejectionReason, setRejectionReason] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push('/')
    }
  }, [isAdmin, isLoading, router])

  useEffect(() => {
    if (isAdmin) {
      loadPendingRecipes()
    }
  }, [isAdmin])

  const loadPendingRecipes = () => {
    const recipes = getPendingRecipes()
    setPendingRecipes(recipes)
  }

  const handleApprove = async (recipeId: string) => {
    if (!user) return
    
    setIsProcessing(prev => ({ ...prev, [recipeId]: true }))
    
    try {
      approveRecipe(recipeId, user.id)
      loadPendingRecipes() // Reload list
    } catch (error) {
      console.error('Failed to approve recipe:', error)
    } finally {
      setIsProcessing(prev => ({ ...prev, [recipeId]: false }))
    }
  }

  const handleReject = async (recipeId: string) => {
    if (!user) return
    
    setIsProcessing(prev => ({ ...prev, [recipeId]: true }))
    
    try {
      const reason = rejectionReason[recipeId] || undefined
      rejectRecipe(recipeId, user.id, reason)
      setRejectionReason(prev => ({ ...prev, [recipeId]: '' }))
      loadPendingRecipes() // Reload list
    } catch (error) {
      console.error('Failed to reject recipe:', error)
    } finally {
      setIsProcessing(prev => ({ ...prev, [recipeId]: false }))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <p className="text-bread-neutralLight">Loading...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  const bread = (breadId: string) => breads.find(b => b.id === breadId)

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-bread-neutral mb-2">Admin Dashboard</h1>
            <p className="text-bread-neutralLight">Review and manage submitted recipes</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-bread-surfaceLight rounded-xl p-6 border border-bread-cool/30">
              <div className="text-3xl font-bold text-bread-primary">{pendingRecipes.length}</div>
              <div className="text-sm text-bread-neutralLight">Pending Reviews</div>
            </div>
            <div className="bg-bread-surfaceLight rounded-xl p-6 border border-bread-cool/30">
              <div className="text-3xl font-bold text-bread-sageDark">
                {breads.reduce((sum, b) => sum + b.recipes.length, 0)}
              </div>
              <div className="text-sm text-bread-neutralLight">Approved Recipes</div>
            </div>
            <div className="bg-bread-surfaceLight rounded-xl p-6 border border-bread-cool/30">
              <div className="text-3xl font-bold text-bread-accentDark">{breads.length}</div>
              <div className="text-sm text-bread-neutralLight">Total Bread Types</div>
            </div>
          </div>

          {/* Pending Recipes */}
          {pendingRecipes.length === 0 ? (
            <div className="bg-bread-surfaceLight rounded-xl p-12 border border-bread-cool/30 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-bread-neutral mb-2">All Caught Up!</h2>
              <p className="text-bread-neutralLight">No recipes pending review.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {pendingRecipes.map((recipe) => {
                const breadData = bread(recipe.breadId)
                return (
                  <div
                    key={recipe.id}
                    className="bg-bread-surfaceLight rounded-xl p-6 border-2 border-bread-warm/50 shadow-lg"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-bread-neutral">{recipe.title}</h3>
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                            Pending
                          </span>
                        </div>
                        <p className="text-bread-neutralLight">
                          For: <Link href={`/bread/${recipe.breadId}`} className="text-bread-primary hover:underline font-semibold">
                            {breadData?.name || 'Unknown Bread'}
                          </Link>
                        </p>
                        <p className="text-sm text-bread-neutralLight mt-1">
                          Submitted by: <span className="font-medium">{recipe.author}</span> • {new Date(recipe.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Recipe Details */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-bread-neutral mb-2">Details</h4>
                        <div className="space-y-1 text-sm text-bread-neutralLight">
                          <p><span className="font-medium">Difficulty:</span> {recipe.difficulty}</p>
                          <p><span className="font-medium">Prep:</span> {recipe.time.prep} min</p>
                          <p><span className="font-medium">Rise:</span> {recipe.time.rise} min</p>
                          <p><span className="font-medium">Bake:</span> {recipe.time.bake} min</p>
                          <p><span className="font-medium">Total:</span> {recipe.time.total} min</p>
                          <p><span className="font-medium">Yield:</span> {recipe.yield}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-bread-neutral mb-2">Ingredients</h4>
                        <ul className="space-y-1 text-sm text-bread-neutralLight">
                          {recipe.ingredients.map((ing, idx) => (
                            <li key={idx}>• {ing.amount} {ing.name}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-bread-neutral mb-2">Instructions</h4>
                      <ol className="space-y-2 text-sm text-bread-neutralLight">
                        {recipe.instructions.map((inst, idx) => (
                          <li key={idx} className="flex gap-3">
                            <span className="font-bold text-bread-primary">{idx + 1}.</span>
                            <span>{inst}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {recipe.tips && recipe.tips.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-bread-neutral mb-2">Tips</h4>
                        <ul className="space-y-1 text-sm text-bread-neutralLight">
                          {recipe.tips.map((tip, idx) => (
                            <li key={idx}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Rejection Reason Input */}
                    <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
                      <label className="block text-sm font-semibold text-red-800 mb-2">
                        Rejection Reason (optional)
                      </label>
                      <textarea
                        value={rejectionReason[recipe.id] || ''}
                        onChange={(e) => setRejectionReason(prev => ({ ...prev, [recipe.id]: e.target.value }))}
                        placeholder="Provide feedback if rejecting..."
                        className="w-full px-3 py-2 border border-red-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        rows={2}
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleApprove(recipe.id)}
                        disabled={isProcessing[recipe.id]}
                        className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing[recipe.id] ? 'Processing...' : '✓ Approve Recipe'}
                      </button>
                      <button
                        onClick={() => handleReject(recipe.id)}
                        disabled={isProcessing[recipe.id]}
                        className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing[recipe.id] ? 'Processing...' : '✗ Reject Recipe'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

