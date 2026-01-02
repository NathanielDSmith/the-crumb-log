import Link from 'next/link'
import { breads } from '@/data/breads'
import Carousel from '@/components/Carousel'
import BreadImage from '@/components/BreadImage'
import StatsWidget from '@/components/StatsWidget'
import BreadFinder from '@/components/BreadFinder'
import BreadOfTheDay from '@/components/BreadOfTheDay'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function Home() {
  const newAdditions = breads.filter(bread => bread.isNew).slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Header */}
      <header className="bg-gradient-primary text-white py-12 md:py-16 shadow-xl relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-10 texture-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-3 tracking-tight">The Crumb Log</h1>
            <p className="text-xl md:text-2xl text-white/90 font-light">A Community for Bread Lovers</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-16">
        {/* Hero Section */}
        <ScrollAnimation>
          <section className="text-center mb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-bread-neutral leading-tight">
                Welcome to The Crumb Log
              </h2>
              <p className="text-xl md:text-2xl text-bread-neutralLight leading-relaxed mb-8">
                A community-driven platform where bread lovers share their favorite recipes, techniques, and stories. 
                Each bread has its own space where enthusiasts contribute recipes, discuss methods, and celebrate 
                the art of baking together.
              </p>
              <Link href="/submit-recipe" className="btn-primary inline-block text-lg px-8 py-4">
                ✨ Share Your Recipe
              </Link>
            </div>
          </section>
        </ScrollAnimation>

        {/* Statistics Widget */}
        <ScrollAnimation delay={200}>
          <section className="mb-20">
            <h2 className="section-header pb-3 text-center">Our Community</h2>
            <StatsWidget />
          </section>
        </ScrollAnimation>

        {/* Bread of the Day */}
        <ScrollAnimation delay={300}>
          <section className="mb-20">
            <BreadOfTheDay />
          </section>
        </ScrollAnimation>

        {/* New Additions Section with Carousel */}
        <ScrollAnimation delay={400}>
          <section className="mb-20">
            <h2 className="section-header pb-3">New Additions</h2>
            <Carousel items={newAdditions} />
          </section>
        </ScrollAnimation>

        {/* Bread Finder Widget */}
        <ScrollAnimation delay={500}>
          <section className="mb-20">
            <BreadFinder />
          </section>
        </ScrollAnimation>

        {/* Featured Breads Section */}
        <ScrollAnimation delay={600}>
          <section className="mb-20">
            <h2 className="section-header pb-3">Featured Breads</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {breads
                .filter(bread => bread.isNew || bread.recipes.length > 0)
                .slice(0, 3)
                .map((bread) => (
                  <Link key={bread.id} href={`/bread/${bread.id}`}>
                    <div className="bread-card group">
                      <div className="bread-card-image aspect-[4/3] relative overflow-hidden">
                        <BreadImage
                          src={bread.imageUrl}
                          alt={bread.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          objectFit="cover"
                          objectPosition="center center"
                        />
                        {bread.isNew && (
                          <div className="absolute top-2 right-2 bg-gradient-accent text-white text-xs font-bold px-2 py-1 rounded-full shadow-md z-10">
                            New
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-bread-neutral group-hover:text-bread-primary transition-colors">
                            {bread.name}
                          </h3>
                          <span className="text-xs text-bread-neutralLight">{bread.category}</span>
                        </div>
                        <p className="text-sm text-bread-neutralLight line-clamp-2 leading-relaxed mb-3">
                          {bread.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="px-2 py-1 bg-bread-warm text-bread-neutral rounded">
                            {bread.difficulty}
                          </span>
                          <span className="text-bread-neutralLight">
                            {bread.recipes.length} recipe{bread.recipes.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        </ScrollAnimation>

        {/* All Breads Section */}
        <ScrollAnimation delay={700}>
          <section>
            <h2 className="section-header pb-3">Explore All Breads</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {breads.map((bread) => (
                <Link key={bread.id} href={`/bread/${bread.id}`}>
                  <div className="bread-card group">
                    <div className="bread-card-image aspect-[4/3] relative overflow-hidden">
                      <BreadImage
                        src={bread.imageUrl}
                        alt={bread.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        objectFit="cover"
                        objectPosition="center center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-bread-neutral group-hover:text-bread-primary transition-colors">
                          {bread.name}
                        </h3>
                        {bread.isNew && (
                          <span className="bg-gradient-accent text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-bread-neutralLight line-clamp-3 leading-relaxed mb-3">
                        {bread.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-bread-neutralLight">
                        <span>{bread.category}</span>
                        <span>•</span>
                        <span>{bread.difficulty}</span>
                        <span>•</span>
                        <span>{bread.recipes.length} recipe{bread.recipes.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </ScrollAnimation>
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
                  href="/#finder" 
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium border border-white/20 transition-all hover:scale-105"
                >
                  Find Bread
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

