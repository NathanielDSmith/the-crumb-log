'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/data/users'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (username: string, email: string, password: string, name?: string) => Promise<void>
  logout: () => void
  switchToAdmin: () => void
  switchToUser: () => void
  isLoading: boolean
  isAdmin: boolean
  addFavorite: (breadId: string) => void
  removeFavorite: (breadId: string) => void
  isFavorite: (breadId: string) => boolean
  submitRating: (breadId: string, rating: number) => void
  getUserRating: (breadId: string) => number | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoading(false)
      return
    }

    const storedAdminUser = localStorage.getItem('adminUser')
    const storedUser = localStorage.getItem('user')
    
    // Try to load admin user first if it exists, otherwise load regular user
    if (storedAdminUser) {
      try {
        const parsedUser = JSON.parse(storedAdminUser)
        parsedUser.joinedAt = new Date(parsedUser.joinedAt)
        setUser(parsedUser)
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error parsing admin user')
        console.error('Error parsing stored admin user:', err)
        localStorage.removeItem('adminUser')
      }
    } else if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        // Convert date strings back to Date objects
        parsedUser.joinedAt = new Date(parsedUser.joinedAt)
        setUser(parsedUser)
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error parsing user')
        console.error('Error parsing stored user:', err)
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage whenever it changes (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (user) {
      if (user.role === 'admin') {
        localStorage.setItem('adminUser', JSON.stringify(user))
      } else {
        localStorage.setItem('user', JSON.stringify(user))
      }
    } else {
      localStorage.removeItem('user')
      localStorage.removeItem('adminUser')
    }
  }, [user])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // TODO: Call API endpoint for authentication
      // For now, create a demo user (in production, this would verify credentials)
      // Check if this is an admin email
      const isAdminEmail = email.toLowerCase() === 'admin@crumblog.com' || 
                          email.toLowerCase() === 'admin@thecrumblog.com'
      
      const demoUser: User = {
        id: `user-${Date.now()}`,
        username: email.split('@')[0], // Use email prefix as username for demo
        email,
        role: isAdminEmail ? 'admin' : 'user',
        joinedAt: new Date(),
        favorites: [],
        submittedRecipes: [],
        submittedPhotos: [],
        ratings: {}
      }
      
      // Save to appropriate storage (client-side only)
      if (typeof window !== 'undefined') {
        if (isAdminEmail) {
          localStorage.setItem('adminUser', JSON.stringify(demoUser))
        } else {
          localStorage.setItem('user', JSON.stringify(demoUser))
        }
      }
      
      setUser(demoUser)
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown login error')
      console.error('Login error:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (username: string, email: string, password: string, name?: string) => {
    setIsLoading(true)
    try {
      // TODO: Call API endpoint to create user
      // For now, create user locally
      const newUser: User = {
        id: `user-${Date.now()}`,
        username,
        email,
        name,
        role: 'user',
        joinedAt: new Date(),
        favorites: [],
        submittedRecipes: [],
        submittedPhotos: [],
        ratings: {}
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(newUser))
      }
      setUser(newUser)
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown signup error')
      console.error('Signup error:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    // Don't remove accounts on logout, just clear active session
    // This allows switching back without re-logging in
  }

  const switchToAdmin = () => {
    if (typeof window === 'undefined') return

    const storedAdminUser = localStorage.getItem('adminUser')
    if (storedAdminUser) {
      try {
        const parsedUser = JSON.parse(storedAdminUser)
        parsedUser.joinedAt = new Date(parsedUser.joinedAt)
        setUser(parsedUser)
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error parsing admin user')
        console.error('Error parsing stored admin user:', err)
      }
    } else {
      // Create a demo admin user if one doesn't exist
      const adminUser: User = {
        id: 'admin-user',
        username: 'admin',
        email: 'admin@crumblog.com',
        role: 'admin',
        joinedAt: new Date(),
        favorites: [],
        submittedRecipes: [],
        submittedPhotos: [],
        ratings: {}
      }
      localStorage.setItem('adminUser', JSON.stringify(adminUser))
      setUser(adminUser)
    }
  }

  const switchToUser = () => {
    if (typeof window === 'undefined') return

    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        parsedUser.joinedAt = new Date(parsedUser.joinedAt)
        setUser(parsedUser)
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error parsing user')
        console.error('Error parsing stored user:', err)
      }
    } else {
      // If no regular user exists, logout
      setUser(null)
    }
  }

  const addFavorite = (breadId: string) => {
    if (!user) return
    if (!user.favorites.includes(breadId)) {
      setUser({
        ...user,
        favorites: [...user.favorites, breadId]
      })
    }
  }

  const removeFavorite = (breadId: string) => {
    if (!user) return
    setUser({
      ...user,
      favorites: user.favorites.filter(id => id !== breadId)
    })
  }

  const isFavorite = (breadId: string) => {
    return user?.favorites.includes(breadId) || false
  }

  const submitRating = (breadId: string, rating: number) => {
    if (!user) return
    setUser({
      ...user,
      ratings: {
        ...user.ratings,
        [breadId]: rating
      }
    })
  }

  const getUserRating = (breadId: string) => {
    return user?.ratings[breadId] || null
  }

  const isAdmin = user?.role === 'admin'

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        switchToAdmin,
        switchToUser,
        isLoading,
        isAdmin,
        addFavorite,
        removeFavorite,
        isFavorite,
        submitRating,
        getUserRating
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

