'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function AccountSwitcher() {
  const { user, switchToAdmin, switchToUser } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [hasAdminAccount, setHasAdminAccount] = useState(false)
  const [hasUserAccount, setHasUserAccount] = useState(false)

  useEffect(() => {
    setHasAdminAccount(localStorage.getItem('adminUser') !== null)
    setHasUserAccount(localStorage.getItem('user') !== null)
  }, [user])

  // Only show switcher if user has both accounts available
  if (!hasAdminAccount || !hasUserAccount) {
    return null
  }

  const isAdmin = user?.role === 'admin'

  const handleSwitch = () => {
    if (isAdmin) {
      switchToUser()
    } else {
      switchToAdmin()
    }
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-bread-neutral hover:text-bread-primary transition-colors border border-bread-cool rounded"
        title="Switch Account"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        <span className="hidden md:inline">Switch</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-bread-surfaceLight rounded-lg shadow-xl border border-bread-cool/30 z-50">
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-bread-neutralLight uppercase border-b border-bread-cool/30">
                Switch Account
              </div>
              <button
                onClick={handleSwitch}
                className="w-full text-left px-4 py-2 text-sm text-bread-neutral hover:bg-bread-warm transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Switch to {isAdmin ? 'User' : 'Admin'}
              </button>
              <div className="px-4 py-2 text-xs text-bread-neutralLight border-t border-bread-cool/30 mt-1">
                Current: {isAdmin ? 'Admin' : 'User'}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

