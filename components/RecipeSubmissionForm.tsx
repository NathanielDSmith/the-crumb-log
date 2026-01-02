'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Recipe, breads } from '@/data/breads'
import { useAuth } from '@/contexts/AuthContext'
import { submitRecipeForReview } from '@/data/pendingRecipes'
import Link from 'next/link'

interface RecipeSubmissionFormProps {
  breadName?: string
  breadId?: string
}

export default function RecipeSubmissionForm({ breadName, breadId: initialBreadId }: RecipeSubmissionFormProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedBreadId, setSelectedBreadId] = useState(initialBreadId || '')

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      const redirectUrl = '/submit-recipe' + (initialBreadId ? `?bread=${initialBreadId}` : '')
      router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`)
    }
  }, [user, isLoading, router, initialBreadId])
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    difficulty: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    prepTime: '',
    riseTime: '',
    bakeTime: '',
    yield: '',
    ingredients: [{ name: '', amount: '' }],
    instructions: [''],
    tips: [''],
  })

  const selectedBread = breads.find(b => b.id === selectedBreadId)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleIngredientChange = (index: number, field: 'name' | 'amount', value: string) => {
    const newIngredients = [...formData.ingredients]
    newIngredients[index][field] = value
    setFormData(prev => ({ ...prev, ingredients: newIngredients }))
  }

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', amount: '' }]
    }))
  }

  const removeIngredient = (index: number) => {
    if (formData.ingredients.length > 1) {
      setFormData(prev => ({
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index)
      }))
    }
  }

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...formData.instructions]
    newInstructions[index] = value
    setFormData(prev => ({ ...prev, instructions: newInstructions }))
  }

  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }))
  }

  const removeInstruction = (index: number) => {
    if (formData.instructions.length > 1) {
      setFormData(prev => ({
        ...prev,
        instructions: prev.instructions.filter((_, i) => i !== index)
      }))
    }
  }

  const handleTipChange = (index: number, value: string) => {
    const newTips = [...formData.tips]
    newTips[index] = value
    setFormData(prev => ({ ...prev, tips: newTips }))
  }

  const addTip = () => {
    setFormData(prev => ({
      ...prev,
      tips: [...prev.tips, '']
    }))
  }

  const removeTip = (index: number) => {
    if (formData.tips.length > 1) {
      setFormData(prev => ({
        ...prev,
        tips: prev.tips.filter((_, i) => i !== index)
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      router.push('/login')
      return
    }

    // Validate required fields
    if (!selectedBreadId) {
      alert('Please select a bread type')
      return
    }

    if (!formData.title.trim()) {
      alert('Please enter a recipe title')
      return
    }

    if (!formData.author.trim()) {
      alert('Please enter your name as the author')
      return
    }

    // Validate ingredients
    const filteredIngredients = formData.ingredients.filter(ing => ing.name.trim() && ing.amount.trim())
    if (filteredIngredients.length === 0) {
      alert('Please add at least one ingredient')
      return
    }

    // Validate instructions
    const filteredInstructions = formData.instructions.filter(inst => inst.trim())
    if (filteredInstructions.length === 0) {
      alert('Please add at least one instruction')
      return
    }

    // Validate times are numbers
    const prepTime = parseInt(formData.prepTime || '0')
    const riseTime = parseInt(formData.riseTime || '0')
    const bakeTime = parseInt(formData.bakeTime || '0')

    if (isNaN(prepTime) || isNaN(riseTime) || isNaN(bakeTime)) {
      alert('Please enter valid numbers for prep, rise, and bake times')
      return
    }
    
    setIsSubmitting(true)

    // Calculate total time
    const totalTime = prepTime + riseTime + bakeTime

    // Filter out empty tips
    const filteredTips = formData.tips.filter(tip => tip.trim())

    // Sanitize inputs
    const recipeData = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      difficulty: formData.difficulty,
      time: {
        prep: prepTime,
        rise: riseTime,
        bake: bakeTime,
        total: totalTime,
      },
      yield: formData.yield.trim(),
      ingredients: filteredIngredients.map(ing => ({
        name: ing.name.trim(),
        amount: ing.amount.trim()
      })),
      instructions: filteredInstructions.map(inst => inst.trim()),
      tips: filteredTips.length > 0 ? filteredTips.map(tip => tip.trim()) : undefined,
    }

    // Submit recipe for admin review
    try {
      submitRecipeForReview(selectedBreadId, recipeData as Recipe, user.id)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubmitting(false)
      setShowSuccess(true)
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error')
      console.error('Failed to submit recipe:', err)
      alert('Failed to submit recipe. Please try again.')
      setIsSubmitting(false)
    }
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
      setFormData({
        title: '',
        author: '',
        difficulty: 'Beginner',
        prepTime: '',
        riseTime: '',
        bakeTime: '',
        yield: '',
        ingredients: [{ name: '', amount: '' }],
        instructions: [''],
        tips: [''],
      })
      if (!breadName) {
        setSelectedBreadId('')
      }
    }, 3000)
  }

  if (showSuccess) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Recipe Submitted!</h3>
        <p className="text-green-700">
          Thank you for sharing your {selectedBread?.name || 'recipe'}. It will be reviewed and added to the community collection soon.
        </p>
      </div>
    )
  }

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-bread-surfaceLight rounded-2xl shadow-lg p-8 border border-bread-cool/30 text-center">
          <p className="text-bread-neutralLight">Loading...</p>
        </div>
      </div>
    )
  }

  // Show login prompt if not authenticated (this should rarely show as redirect happens in useEffect)
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-bread-surfaceLight rounded-2xl shadow-lg p-8 border border-bread-cool/30 text-center">
          <h3 className="text-2xl font-bold text-bread-neutral mb-4">
            Sign In to Share Recipes
          </h3>
          <p className="text-bread-neutralLight mb-6">
            Please sign in to submit recipes and contribute to the community.
          </p>
          <Link href={`/login?redirect=${encodeURIComponent('/submit-recipe' + (initialBreadId ? `?bread=${initialBreadId}` : ''))}`} className="btn-primary inline-block">
            Sign In
          </Link>
          <p className="text-sm text-bread-neutralLight mt-4">
            Don't have an account?{' '}
            <Link href="/signup" className="text-bread-primary hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-bread-surfaceLight rounded-2xl shadow-lg p-6 md:p-8 border border-bread-cool/30">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-bread-neutral mb-2">
          {breadName ? `Share Your ${breadName} Recipe` : 'Share Your Recipe'}
        </h3>
        <p className="text-bread-neutralLight">
          Help build our community recipe collection! Share your favorite recipe, tips, and techniques.
        </p>
      </div>

      <div className="space-y-6">
        {/* Bread Selection */}
        {!breadName && (
          <div>
            <label className="block text-sm font-semibold text-bread-neutral mb-2">
              Select Bread Type *
            </label>
            <select
              value={selectedBreadId}
              onChange={(e) => setSelectedBreadId(e.target.value)}
              required
              className="w-full px-4 py-2 border border-bread-cool rounded-lg focus:ring-2 focus:ring-bread-primary focus:border-transparent"
            >
              <option value="">Choose a bread type...</option>
              {breads.map((bread) => (
                <option key={bread.id} value={bread.id}>
                  {bread.name}
                </option>
              ))}
            </select>
            {selectedBread && (
              <p className="text-sm text-bread-neutralLight mt-2">
                {selectedBread.description}
              </p>
            )}
          </div>
        )}

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-bread-neutral mb-2">
              Recipe Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-bread-cool rounded-lg focus:ring-2 focus:ring-bread-primary focus:border-transparent"
              placeholder="e.g., Classic French Brioche"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-bread-neutral mb-2">
              Your Name *
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-bread-cool rounded-lg focus:ring-2 focus:ring-bread-primary focus:border-transparent"
              placeholder="e.g., Jane Baker"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-bread-neutral mb-2">
              Difficulty *
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-bread-cool rounded-lg focus:ring-2 focus:ring-bread-primary focus:border-transparent"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-bread-neutral mb-2">
              Prep Time (min) *
            </label>
            <input
              type="number"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full px-4 py-2 border border-bread-cool rounded-lg focus:ring-2 focus:ring-bread-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-bread-neutral mb-2">
              Rise Time (min) *
            </label>
            <input
              type="number"
              name="riseTime"
              value={formData.riseTime}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full px-4 py-2 border border-bread-cool rounded-lg focus:ring-2 focus:ring-bread-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-bread-neutral mb-2">
              Bake Time (min) *
            </label>
            <input
              type="number"
              name="bakeTime"
              value={formData.bakeTime}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full px-4 py-2 border border-bread-cool rounded-lg focus:ring-2 focus:ring-bread-primary focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-bread-neutral mb-2">
            Yield *
          </label>
          <input
            type="text"
            name="yield"
            value={formData.yield}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-bread-cool rounded-lg focus:ring-2 focus:ring-bread-primary focus:border-transparent"
            placeholder="e.g., 1 large loaf or 12 rolls"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-semibold text-bread-neutral mb-2">
            Ingredients *
          </label>
          <div className="space-y-3">
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Amount (e.g., 500g or 4 cups)"
                  value={ingredient.amount}
                  onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                  required={index === 0}
                  className="flex-1 px-4 py-2 border border-bread-cool rounded-lg focus:ring-2 focus:ring-bread-primary focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Ingredient name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  required={index === 0}
                  className="flex-1 px-4 py-2 border border-bread-cool rounded-lg focus:ring-2 focus:ring-bread-primary focus:border-transparent"
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="text-sm text-bread-primary hover:text-bread-primaryDark font-medium"
            >
              + Add Ingredient
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-sm font-semibold text-bread-neutral mb-2">
            Instructions *
          </label>
          <div className="space-y-3">
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-bread-primary text-white font-bold flex items-center justify-center text-sm mt-1">
                  {index + 1}
                </span>
                <textarea
                  placeholder="Describe this step..."
                  value={instruction}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                  required={index === 0}
                  rows={2}
                  className="flex-1 px-4 py-2 border border-bread-cool rounded-lg focus:ring-2 focus:ring-bread-primary focus:border-transparent"
                />
                {formData.instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg self-start"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addInstruction}
              className="text-sm text-bread-primary hover:text-bread-primaryDark font-medium"
            >
              + Add Step
            </button>
          </div>
        </div>

        {/* Tips (Optional) */}
        <div>
          <label className="block text-sm font-semibold text-bread-neutral mb-2">
            Pro Tips (Optional)
          </label>
          <div className="space-y-3">
            {formData.tips.map((tip, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Share a helpful tip..."
                  value={tip}
                  onChange={(e) => handleTipChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-bread-cool rounded-lg focus:ring-2 focus:ring-bread-primary focus:border-transparent"
                />
                {formData.tips.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTip(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addTip}
              className="text-sm text-bread-primary hover:text-bread-primaryDark font-medium"
            >
              + Add Tip
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-bread-warm">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : '✨ Submit Recipe'}
          </button>
          <p className="text-xs text-bread-neutralLight mt-2 text-center">
            Your recipe will be reviewed before being added to the community collection.
          </p>
        </div>
      </div>
    </form>
    </div>
  )
}

