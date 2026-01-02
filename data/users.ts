/**
 * User Data Structure
 * 
 * In the future, this will be stored in a database.
 * For now, this defines the user interface and structure.
 */

export interface User {
  id: string
  username: string
  email: string
  name?: string // Optional
  avatar?: string // Optional profile picture
  role?: 'user' | 'admin' // User role, defaults to 'user'
  joinedAt: Date
  favorites: string[] // Array of bread IDs
  submittedRecipes: string[] // Array of recipe IDs
  submittedPhotos: string[] // Array of photo IDs
  ratings: Record<string, number> // breadId -> rating (1-5)
}

/**
 * Get user by ID (future API call)
 */
export async function getUser(userId: string): Promise<User | null> {
  // TODO: Fetch from database/API
  return null
}

/**
 * Get user by email (future API call)
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  // TODO: Fetch from database/API
  return null
}

/**
 * Create new user (future API call)
 */
export async function createUser(
  username: string,
  email: string,
  name?: string
): Promise<User> {
  // TODO: POST to API endpoint
  throw new Error('User creation not yet implemented')
}

/**
 * Update user (future API call)
 */
export async function updateUser(userId: string, updates: Partial<User>): Promise<User> {
  // TODO: PUT to API endpoint
  throw new Error('User update not yet implemented')
}

