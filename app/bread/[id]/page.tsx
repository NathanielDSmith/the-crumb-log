import Link from 'next/link'
import { breads } from '@/data/breads'
import { notFound } from 'next/navigation'
import RecipeCard from '@/components/RecipeCard'
import BreadImage from '@/components/BreadImage'
import Breadcrumbs from '@/components/Breadcrumbs'
import PhotoSubmission from '@/components/PhotoSubmission'
import BreadStats from '@/components/BreadStats'
import RelatedBreads from '@/components/RelatedBreads'
import ScrollAnimation from '@/components/ScrollAnimation'
import BreadRating from '@/components/BreadRating'
import FavoriteButton from '@/components/FavoriteButton'
import { getAverageRating, getRatingCount } from '@/data/ratings'
import { getApprovedRecipes } from '@/data/pendingRecipes'

export async function generateStaticParams() {
  return breads.map((bread) => ({
    id: bread.id,
  }))
}

export default function BreadPage({ params }: { params: { id: string } }) {
  const bread = breads.find((b) => b.id === params.id)

  if (!bread) {
    notFound()
  }

  // Get approved recipes for this bread
  const approvedRecipes = getApprovedRecipes(params.id)
  
  // Merge approved recipes with bread's existing recipes
  const allRecipes = [...(bread.recipes || []), ...approvedRecipes]

  // Get community ratings (will be from API in the future)
  const averageRating = getAverageRating(bread.id)
  const ratingCount = getRatingCount(bread.id)

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Condensed Header */}
      <header className="bg-gradient-to-br from-bread-primary via-bread-primaryDark to-bread-sage text-white py-6 md:py-8 shadow-2xl relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10 texture-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
        
        {/* Decorative elements - smaller */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-bread-sage/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Breads', href: '/' },
              { label: bread.name }
            ]}
          />
          
          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Left side - Category and Title */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-0.5 w-6 bg-white/30 rounded-full"></div>
                <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                  {bread.category}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {bread.name}
                </h1>
                <FavoriteButton breadId={bread.id} breadName={bread.name} />
              </div>
            </div>
            
            {/* Right side - Compact Stats Inline */}
            <div className="flex gap-2 md:gap-3">
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-1.5 border border-white/20">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-white/70">Difficulty</div>
                <div className="text-base font-bold leading-tight">{bread.difficulty}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-1.5 border border-white/20">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-white/70">Recipes</div>
                <div className="text-base font-bold leading-tight">{allRecipes.length}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom wave decoration - smaller */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-bread-surface to-transparent"></div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-16">
        {/* Hero Image Section */}
        <ScrollAnimation>
          <div className="mb-12">
            <div className="max-w-5xl mx-auto rounded-3xl shadow-2xl border-4 border-white relative overflow-hidden group">
              <div className="relative w-full aspect-[16/10] flex items-center justify-center bg-gradient-to-br from-bread-warm/30 to-bread-accent/20">
                <BreadImage
                  src={bread.imageUrl}
                  alt={bread.name}
                  fill
                  className="rounded-3xl group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                  objectFit="cover"
                  objectPosition="center center"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Floating Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                {bread.isNew && (
                  <span className="bg-gradient-accent text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl backdrop-blur-sm animate-pulse">
                    ✨ New
                  </span>
                )}
              </div>
              
              <div className="absolute top-6 right-6 z-10">
                <div className="bg-bread-sage/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg">
                  Community Photo Placeholder
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Bread Info */}
        <div className="max-w-5xl mx-auto">
          <ScrollAnimation delay={200}>
            <div className="bg-bread-surfaceLight rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-bread-cool/30">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3 text-bread-neutral">
                    About {bread.name}
                  </h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-bread-primary via-bread-sage to-bread-accent rounded-full"></div>
                </div>
              </div>
              
              <p className="text-xl text-bread-neutralLight leading-relaxed mb-8">
                {bread.description}
              </p>

              {/* Enhanced Stats Cards */}
              <BreadStats bread={bread} />

              {/* Community Rating Section */}
              <div className="mb-8 p-6 bg-gradient-to-br from-bread-warm/50 to-bread-surface rounded-xl border-2 border-bread-primary/20 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-bread-neutral mb-2 flex items-center gap-2">
                      <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Rate This Bread
                    </h3>
                    <p className="text-sm text-bread-neutralLight">
                      Share your experience! How would you rate {bread.name}?
                    </p>
                  </div>
                </div>
                <div className="bg-white/70 rounded-lg p-5 border border-bread-cool/30 shadow-sm">
                  <BreadRating 
                    breadId={bread.id}
                    breadName={bread.name}
                    currentRating={averageRating}
                    ratingCount={ratingCount}
                  />
                </div>
              </div>

              {/* Best For & Key Features */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-bread-neutral mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-bread-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Best For
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {bread.bestFor.map((use, index) => (
                      <span key={index} className="px-4 py-2 bg-gradient-to-r from-bread-warm to-bread-accent/30 text-bread-neutral rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-bread-neutral mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-bread-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Key Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {bread.keyFeatures.map((feature, index) => (
                      <span key={index} className="px-4 py-2 bg-bread-sage/20 text-bread-sageDark rounded-full text-sm font-medium border-2 border-bread-sage/30 hover:bg-bread-sage/30 transition-colors">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            
              {bread.history && (
                <div className="mt-8 pt-8 border-t-2 border-bread-warm">
                  <h3 className="text-2xl font-bold mb-4 text-bread-neutral flex items-center gap-3">
                    <svg className="w-7 h-7 text-bread-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    History
                  </h3>
                  <div className="bg-bread-surface/50 rounded-xl p-6 border-l-4 border-bread-primary">
                    <p className="text-lg text-bread-neutralLight leading-relaxed">{bread.history}</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollAnimation>

          {/* Photo Submission Section */}
          <ScrollAnimation delay={300}>
            <div className="bg-bread-surfaceLight rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-bread-cool/30">
              <h2 className="text-3xl font-bold mb-4 text-bread-neutral pb-3 border-b-2 border-bread-sage/40 flex items-center gap-3">
                <svg className="w-8 h-8 text-bread-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Community Photos
              </h2>
            <p className="text-lg text-bread-neutralLight mb-6 leading-relaxed">
              Share photos of your {bread.name}! The community votes on their favorites, and the highest-voted photo becomes the main image for this bread.
            </p>
            <PhotoSubmission breadId={bread.id} breadName={bread.name} />
            
            {/* Placeholder for photo gallery */}
            <div className="mt-6 pt-6 border-t border-bread-warm">
              <p className="text-sm text-bread-neutralLight/70 italic text-center">
                Photo gallery and voting coming soon. Submit your photo above to be the first!
              </p>
            </div>
          </div>
          </ScrollAnimation>

          {/* Community Section */}
          <ScrollAnimation delay={600}>
            <div className="bg-bread-surfaceLight rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-bread-cool/30">
              <h2 className="text-3xl font-bold mb-4 text-bread-neutral pb-3 border-b-2 border-bread-sage/40 flex items-center gap-3">
                <svg className="w-8 h-8 text-bread-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                Community Discussions
              </h2>
            <p className="text-lg text-bread-neutralLight mb-6 leading-relaxed">
              Share your recipes, discuss techniques, and connect with fellow {bread.name} enthusiasts.
            </p>
            <div className="space-y-4">
              {/* Placeholder for future discussion threads */}
              <div className="border-2 border-dashed border-bread-warm rounded-xl p-8 text-center bg-bread-surface/50">
                <p className="text-base text-bread-neutralLight/70 italic">
                  Community discussions coming soon...
                </p>
              </div>
            </div>
          </div>
          </ScrollAnimation>

          {/* Call to Action for Recipe Submission */}
          <ScrollAnimation delay={700}>
            <div className="mb-8 bg-gradient-to-r from-bread-primary/10 to-bread-sage/10 rounded-2xl p-8 border-2 border-bread-primary/20 hover:border-bread-primary/40 transition-all duration-300">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-bread-neutral mb-3">
                Share Your {bread.name} Recipe
              </h3>
              <p className="text-bread-neutralLight mb-6">
                Help build our community recipe collection! Share your favorite {bread.name} recipe with fellow bakers.
              </p>
              <Link href={`/submit-recipe?bread=${bread.id}`} className="btn-primary inline-block">
                ✨ Submit Recipe
              </Link>
            </div>
          </div>
          </ScrollAnimation>

          {/* Related Breads */}
          <ScrollAnimation delay={400}>
            <RelatedBreads currentBread={bread} />
          </ScrollAnimation>

          {/* Community Recipes Section */}
          <ScrollAnimation delay={500}>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-bread-neutral pb-3 border-b-2 border-bread-sage/40 flex items-center gap-3">
                  <svg className="w-8 h-8 text-bread-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Community Recipes
                </h2>
                {allRecipes.length > 0 && (
                  <span className="px-4 py-2 bg-bread-sage/10 text-bread-sageDark rounded-full text-sm font-semibold border border-bread-sage/30">
                    {allRecipes.length} recipe{allRecipes.length !== 1 ? 's' : ''} shared
                  </span>
                )}
              </div>
            <div className="space-y-6">
              {allRecipes.length > 0 ? (
                <>
                  <p className="text-bread-neutralLight mb-4">
                    Recipes shared by our community. Want to add yours? Use the form above!
                  </p>
                  {allRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </>
              ) : (
                <div className="border-2 border-dashed border-bread-warm rounded-xl p-12 text-center bg-bread-surface/50">
                  <h3 className="text-xl font-bold text-bread-neutral mb-2">No Recipes Yet</h3>
                  <p className="text-base text-bread-neutralLight/70 mb-4">
                    Be the first to share your {bread.name} recipe with the community!
                  </p>
                  <p className="text-sm text-bread-neutralLight/60">
                    Use the form above to submit your favorite recipe.
                  </p>
                </div>
              )}
            </div>
          </div>
          </ScrollAnimation>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-bread-neutral via-bread-primaryDark to-bread-neutral text-white/90 py-16 mt-20 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-bread-sage rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <Link href="/" className="inline-block mb-4">
                <h3 className="text-2xl font-bold mb-3 hover:text-white transition-colors">
                  The Crumb Log
                </h3>
              </Link>
              <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-md">
                A community-driven platform for bread lovers to share recipes, techniques, and celebrate the art of baking. Join thousands of bakers sharing their passion.
              </p>
              <div className="flex gap-3">
                <Link 
                  href="/submit-recipe" 
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium border border-white/20 transition-all hover:scale-105"
                >
                  Share Recipe
                </Link>
                <Link 
                  href="/" 
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium border border-white/20 transition-all hover:scale-105"
                >
                  Explore Breads
                </Link>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4 text-lg flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Quick Links
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white transition-colors"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/submit-recipe" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white transition-colors"></span>
                    Submit Recipe
                  </Link>
                </li>
                <li>
                  <Link href="/#popular" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white transition-colors"></span>
                    Popular Breads
                  </Link>
                </li>
                <li>
                  <Link href="/#finder" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white transition-colors"></span>
                    Bread Finder
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Categories */}
            <div>
              <h4 className="font-bold mb-4 text-lg flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Categories
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/?category=sourdough" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white transition-colors"></span>
                    Sourdough
                  </Link>
                </li>
                <li>
                  <Link href="/?category=artisan" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white transition-colors"></span>
                    Artisan
                  </Link>
                </li>
                <li>
                  <Link href="/?category=classic" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white transition-colors"></span>
                    Classic
                  </Link>
                </li>
                <li>
                  <Link href="/?category=whole-grain" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white transition-colors"></span>
                    Whole Grain
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-white/70 text-center md:text-left">
                © 2025 The Crumb Log. A place for bread enthusiasts to connect and share.
              </p>
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Made with passion for bread lovers
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

