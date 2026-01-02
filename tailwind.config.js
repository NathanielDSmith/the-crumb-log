/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bread: {
          // Modern Rustic Primary - inspired by successful baking sites
          primary: '#B8735A',        // Refined terracotta (warmer, more sophisticated)
          primaryDark: '#8B5A3C',     // Deep terracotta (earthy, grounded)
          primaryLight: '#D49A7F',    // Soft terracotta
          
          // Deep Greens - modern rustic accent (from research)
          sage: '#6B8E6B',            // Sage green
          sageDark: '#556B55',        // Deep sage
          olive: '#8B9467',           // Olive green
          
          // Rich Neutrals - warm and inviting
          neutral: '#2D2926',        // Rich charcoal (warmer than pure black)
          neutralLight: '#4A4642',   // Warm medium gray (improved contrast)
          surface: '#F8F6F3',        // Warm cream (parchment-like)
          surfaceLight: '#FFFFFF',   // Pure white
          
          // Accent colors - warm and inviting
          accent: '#D4A574',         // Warm golden beige
          accentLight: '#E8C9A0',    // Light golden
          accentDark: '#B8935F',     // Deep golden
          
          // Supporting colors - earthy and natural
          warm: '#F4EDE4',           // Warm parchment
          cool: '#E8E3DC',         // Cool beige
          earth: '#A68B6B',          // Earthy brown
          highlight: '#E6A85C',      // Warm amber
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #B8735A 0%, #8B5A3C 50%, #B8735A 100%)',
        'gradient-sage': 'linear-gradient(135deg, #6B8E6B 0%, #556B55 100%)',
        'gradient-accent': 'linear-gradient(135deg, #D4A574 0%, #E8C9A0 100%)',
        'gradient-warm': 'linear-gradient(135deg, #F4EDE4 0%, #E8E3DC 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #F8F6F3 0%, #FFFFFF 100%)',
        'gradient-earth': 'linear-gradient(135deg, #B8735A 0%, #6B8E6B 100%)',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

