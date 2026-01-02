'use client'

import Link from 'next/link'
import { breads } from '@/data/breads'
import { useAuth } from '@/contexts/AuthContext'
import AccountSwitcher from '@/components/AccountSwitcher'

export default function Navigation() {
  const { user, logout } = useAuth()
  const categories = Array.from(new Set(breads.map(b => b.category))).sort()

  return (
    <nav className="bg-bread-surfaceLight border-b border-bread-cool/30 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold text-bread-primary group-hover:text-bread-primaryDark transition-colors">
              The Crumb Log
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-bread-neutral hover:text-bread-primary transition-colors font-medium"
            >
              Home
            </Link>
            
            {/* Breads Dropdown */}
            <div className="relative group">
              <button className="text-bread-neutral hover:text-bread-primary transition-colors font-medium flex items-center gap-1">
                Breads
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-bread-surfaceLight rounded-lg shadow-xl border border-bread-cool/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {breads.map((bread) => (
                    <Link
                      key={bread.id}
                      href={`/bread/${bread.id}`}
                      className="block px-4 py-2 text-bread-neutral hover:bg-bread-warm hover:text-bread-primary transition-colors"
                    >
                      {bread.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="relative group">
              <button className="text-bread-neutral hover:text-bread-primary transition-colors font-medium flex items-center gap-1">
                Categories
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-40 bg-bread-surfaceLight rounded-lg shadow-xl border border-bread-cool/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {categories.map((category) => {
                    const categoryBreads = breads.filter(b => b.category === category)
                    return (
                      <Link
                        key={category}
                        href={`/?category=${category.toLowerCase().replace(' ', '-')}`}
                        className="block px-4 py-2 text-bread-neutral hover:bg-bread-warm hover:text-bread-primary transition-colors"
                      >
                        {category} <span className="text-xs text-bread-neutralLight">({categoryBreads.length})</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>

            <Link 
              href="/submit-recipe" 
              className="btn-primary"
            >
              Submit Recipe
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center gap-4">
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="text-bread-neutral hover:text-bread-primary transition-colors font-medium text-sm"
                  >
                    Admin
                  </Link>
                )}
                <AccountSwitcher />
                <Link
                  href="/account"
                  className="flex items-center gap-2 text-bread-neutral hover:text-bread-primary transition-colors font-medium"
                >
                  <div className="w-8 h-8 bg-bread-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:inline">{user.name || user.username}</span>
                </Link>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="text-bread-neutral hover:text-bread-primary transition-colors font-medium"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-bread-neutral p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

