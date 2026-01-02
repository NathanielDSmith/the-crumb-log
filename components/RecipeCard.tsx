'use client'

import { Recipe } from '@/data/breads'

interface RecipeCardProps {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Advanced':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  return (
    <div className="bg-bread-surfaceLight rounded-2xl shadow-lg p-6 md:p-8 border border-bread-cool/30">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl font-bold text-bread-neutral">{recipe.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
        </div>
        <p className="text-bread-neutralLight text-sm">By {recipe.author}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-bread-surface rounded-lg">
        <div>
          <p className="text-xs text-bread-neutralLight mb-1">Prep Time</p>
          <p className="font-bold text-bread-neutral">{formatTime(recipe.time.prep)}</p>
        </div>
        <div>
          <p className="text-xs text-bread-neutralLight mb-1">Rise Time</p>
          <p className="font-bold text-bread-neutral">{formatTime(recipe.time.rise)}</p>
        </div>
        <div>
          <p className="text-xs text-bread-neutralLight mb-1">Bake Time</p>
          <p className="font-bold text-bread-neutral">{formatTime(recipe.time.bake)}</p>
        </div>
        <div>
          <p className="text-xs text-bread-neutralLight mb-1">Total Time</p>
          <p className="font-bold text-bread-neutral">{formatTime(recipe.time.total)}</p>
        </div>
      </div>

      <div className="mb-4">
        <span className="text-sm text-bread-neutralLight">Yield: </span>
        <span className="font-semibold text-bread-neutral">{recipe.yield}</span>
      </div>

      {/* Ingredients */}
      <div className="mb-6">
        <h4 className="text-xl font-bold text-bread-neutral mb-4 flex items-center gap-2">
          <span>🥖</span>
          Ingredients
        </h4>
        <ul className="space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-start gap-3 text-bread-neutralLight">
              <span className="text-bread-primary mt-1">•</span>
              <span>
                <span className="font-semibold text-bread-neutral">{ingredient.amount}</span>
                {' '}
                <span>{ingredient.name}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="mb-6">
        <h4 className="text-xl font-bold text-bread-neutral mb-4 flex items-center gap-2">
          <span>📝</span>
          Instructions
        </h4>
        <ol className="space-y-3">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-bread-primary text-white font-bold flex items-center justify-center text-sm">
                {index + 1}
              </span>
              <span className="text-bread-neutralLight leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Tips */}
      {recipe.tips && recipe.tips.length > 0 && (
        <div className="mt-6 pt-6 border-t border-bread-warm">
          <h4 className="text-lg font-bold text-bread-neutral mb-3 flex items-center gap-2">
            <span>💡</span>
            Pro Tips
          </h4>
          <ul className="space-y-2">
            {recipe.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3 text-bread-neutralLight">
                <span className="text-bread-accent mt-1">→</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Print Button */}
      <div className="mt-6 pt-6 border-t border-bread-warm">
        <button
          onClick={() => window.print()}
          className="btn-secondary w-full"
        >
          🖨️ Print Recipe
        </button>
      </div>
    </div>
  )
}

