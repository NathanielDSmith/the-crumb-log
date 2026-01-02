'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { breads } from '@/data/breads'
import BreadImage from '@/components/BreadImage'

export default function AccountPage() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <p className="text-bread-neutralLight">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    router.push('/login')
    return null
  }

  const favoriteBreads = breads.filter(bread => user.favorites.includes(bread.id))

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-bread-surfaceLight rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-bread-cool/30">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-bread-neutral mb-2">
                  {user.name || user.username}
                </h1>
                <p className="text-bread-neutralLight">@{user.username}</p>
                <p className="text-sm text-bread-neutralLight mt-2">
                  Member since {new Date(user.joinedAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
              >
                Sign Out
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-bread-cool/30">
              <div>
                <div className="text-2xl font-bold text-bread-primary">{user.favorites.length}</div>
                <div className="text-sm text-bread-neutralLight">Favorites</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-bread-sageDark">{user.submittedRecipes.length}</div>
                <div className="text-sm text-bread-neutralLight">Recipes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-bread-accentDark">{user.submittedPhotos.length}</div>
                <div className="text-sm text-bread-neutralLight">Photos</div>
              </div>
            </div>
          </div>

          {/* Favorites Section */}
          <div className="bg-bread-surfaceLight rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-bread-cool/30">
            <h2 className="text-2xl font-bold text-bread-neutral mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-bread-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Favorite Breads
            </h2>
            {favoriteBreads.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteBreads.map((bread) => (
                  <Link
                    key={bread.id}
                    href={`/bread/${bread.id}`}
                    className="bread-card group"
                  >
                    <div className="bread-card-image aspect-[4/3] relative overflow-hidden">
                      <BreadImage
                        src={bread.imageUrl}
                        alt={bread.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        objectFit="cover"
                        objectPosition="center center"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-bread-neutral group-hover:text-bread-primary transition-colors">
                        {bread.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-bread-warm rounded-xl">
                <p className="text-bread-neutralLight">No favorites yet. Start exploring breads!</p>
                <Link href="/" className="btn-primary inline-block mt-4">
                  Browse Breads
                </Link>
              </div>
            )}
          </div>

          {/* My Ratings */}
          {Object.keys(user.ratings).length > 0 && (
            <div className="bg-bread-surfaceLight rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-bread-cool/30">
              <h2 className="text-2xl font-bold text-bread-neutral mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                My Ratings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(user.ratings).map(([breadId, rating]) => {
                  const bread = breads.find(b => b.id === breadId)
                  if (!bread) return null
                  return (
                    <Link
                      key={breadId}
                      href={`/bread/${breadId}`}
                      className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-bread-cool/30 hover:border-bread-primary/50 transition-colors"
                    >
                      <div>
                        <h3 className="font-semibold text-bread-neutral">{bread.name}</h3>
                        <p className="text-sm text-bread-neutralLight">{bread.category}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300 fill-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Account Info */}
          <div className="bg-bread-surfaceLight rounded-2xl shadow-xl p-8 border border-bread-cool/30">
            <h2 className="text-2xl font-bold text-bread-neutral mb-6">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-bread-neutralLight mb-1">Email</label>
                <p className="text-bread-neutral">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-bread-neutralLight mb-1">Username</label>
                <p className="text-bread-neutral">@{user.username}</p>
              </div>
              {user.name && (
                <div>
                  <label className="block text-sm font-semibold text-bread-neutralLight mb-1">Name</label>
                  <p className="text-bread-neutral">{user.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

