/**
 * Pending Recipes Data Structure
 * 
 * Recipes submitted by users that are awaiting admin review.
 * In production, this would be stored in a database.
 */

import { Recipe } from './breads'

export interface PendingRecipe extends Recipe {
  id: string
  breadId: string
  submittedBy: string // User ID
  submittedAt: Date
  status: 'pending' | 'approved' | 'rejected'
  reviewedBy?: string // Admin user ID
  reviewedAt?: Date
  rejectionReason?: string
}

// In-memory storage for demo purposes
// In production, this would be a database
let pendingRecipes: PendingRecipe[] = []

/**
 * Get all pending recipes
 */
export function getPendingRecipes(): PendingRecipe[] {
  return pendingRecipes.filter(r => r.status === 'pending')
}

/**
 * Get all recipes (pending, approved, rejected)
 */
export function getAllPendingRecipes(): PendingRecipe[] {
  return pendingRecipes
}

/**
 * Get pending recipe by ID
 */
export function getPendingRecipe(id: string): PendingRecipe | undefined {
  return pendingRecipes.find(r => r.id === id)
}

/**
 * Submit a recipe for review
 */
export function submitRecipeForReview(
  breadId: string,
  recipe: Omit<Recipe, 'id'>,
  userId: string
): PendingRecipe {
  const pendingRecipe: PendingRecipe = {
    ...recipe,
    id: `pending-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    breadId,
    submittedBy: userId,
    submittedAt: new Date(),
    status: 'pending'
  }
  
  pendingRecipes.push(pendingRecipe)
  return pendingRecipe
}

/**
 * Get approved recipes for a specific bread
 */
export function getApprovedRecipes(breadId: string): Recipe[] {
  return pendingRecipes
    .filter(r => r.breadId === breadId && r.status === 'approved')
    .map(({ id, breadId: _, submittedBy, submittedAt, status, reviewedBy, reviewedAt, rejectionReason, ...recipe }) => recipe)
}

/**
 * Get all approved recipes
 */
export function getAllApprovedRecipes(): Recipe[] {
  return pendingRecipes
    .filter(r => r.status === 'approved')
    .map(({ id, breadId, submittedBy, submittedAt, status, reviewedBy, reviewedAt, rejectionReason, ...recipe }) => recipe)
}

/**
 * Approve a pending recipe
 */
export function approveRecipe(recipeId: string, adminId: string): PendingRecipe | null {
  const recipe = pendingRecipes.find(r => r.id === recipeId)
  if (!recipe) return null
  
  recipe.status = 'approved'
  recipe.reviewedBy = adminId
  recipe.reviewedAt = new Date()
  
  return recipe
}

/**
 * Reject a pending recipe
 */
export function rejectRecipe(
  recipeId: string,
  adminId: string,
  reason?: string
): PendingRecipe | null {
  const recipe = pendingRecipes.find(r => r.id === recipeId)
  if (!recipe) return null
  
  recipe.status = 'rejected'
  recipe.reviewedBy = adminId
  recipe.reviewedAt = new Date()
  recipe.rejectionReason = reason
  
  return recipe
}

/**
 * Get recipes submitted by a user
 */
export function getUserRecipes(userId: string): PendingRecipe[] {
  return pendingRecipes.filter(r => r.submittedBy === userId)
}

