/**
 * Centralized Image Configuration
 * 
 * CURRENT IMAGES ARE ADVANCED PLACEHOLDERS
 * These will be replaced by community-submitted photos through voting.
 * The highest-voted user photo will automatically become the main bread image.
 * 
 * To update placeholder images:
 * 1. Add your new image files to /public/images/
 * 2. Update the filename in the breadPlaceholders object below
 * 3. The images will automatically update across the site
 */

// Placeholder images (will be replaced by top-voted community photos)
export const breadPlaceholders: Record<string, string> = {
  'brioche': 'brioche.jpg',
  'sliced-white': 'sliced_bread.jpg',
  'sourdough': 'sourdough.jpg',
  'baguette': 'baguette.jpg',
  'rye': 'rye.jpg',
  'whole-wheat': 'whole-wheat.jpg',
  'focaccia': 'focaccia.jpg',
  'ciabatta': 'ciabatta.jpg',
  'challah': 'challah.jpg',
  'pita': 'pita.jpg',
  'naan': 'naan.jpg',
  'pretzel': 'pretzel.jpg',
  'cornbread': 'cornbread.jpg',
  'irish-soda': 'irish-soda.jpg',
  'pumpernickel': 'pumpernickel.jpg',
}

/**
 * Get the image path for a bread by its ID
 * In the future, this will check for top-voted user photos first,
 * then fall back to placeholders
 */
export function getBreadImage(breadId: string): string {
  // TODO: Check for top-voted user photo first
  // const mainPhoto = getMainBreadImage(breadId)
  // if (mainPhoto) return mainPhoto
  
  // Fallback to placeholder
  const filename = breadPlaceholders[breadId]
  return filename ? `/images/${filename}` : '/images/placeholder.jpg'
}

/**
 * Get all bread image paths
 */
export function getAllBreadImages(): Record<string, string> {
  const images: Record<string, string> = {}
  Object.keys(breadPlaceholders).forEach(breadId => {
    images[breadId] = getBreadImage(breadId)
  })
  return images
}

