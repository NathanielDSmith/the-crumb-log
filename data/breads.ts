import { getBreadImage } from './images'

export interface Recipe {
  id: string
  title: string
  author: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  time: {
    prep: number // minutes
    rise: number // minutes
    bake: number // minutes
    total: number // minutes
  }
  yield: string
  ingredients: {
    name: string
    amount: string
  }[]
  instructions: string[]
  tips?: string[]
}

export interface Bread {
  id: string
  name: string
  description: string
  history?: string
  isNew?: boolean
  category: 'Sourdough' | 'Quick Bread' | 'Artisan' | 'Classic' | 'Whole Grain'
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  bestFor: string[]
  keyFeatures: string[]
  recipes: Recipe[] // Community-driven - recipes submitted by users
  imageUrl?: string // URL to bread image
  // Note: Popularity/ratings are now community-driven via the rating system
}

export const breads: Bread[] = [
  {
    id: 'brioche',
    name: 'Brioche',
    description: 'A rich, buttery French bread with a tender crumb and golden crust. Perfect for breakfast or as a base for French toast.',
    history: 'Brioche originated in France and has been enjoyed since the 15th century. Its name comes from the Norman word "brier" meaning to knead. This luxurious bread was historically associated with the upper classes due to its high butter and egg content.',
    isNew: true,
    category: 'Artisan',
    difficulty: 'Intermediate',
    bestFor: ['Breakfast', 'French Toast', 'Desserts', 'Special Occasions'],
    keyFeatures: ['Rich & Buttery', 'Tender Crumb', 'Golden Crust', 'Egg-Enriched'],
    recipes: [], // Community-driven - recipes will be submitted by users
    imageUrl: getBreadImage('brioche'),
  },
  {
    id: 'sliced-white',
    name: 'Sliced White',
    description: 'The classic sandwich bread - soft, fluffy, and versatile. A staple in households around the world.',
    history: 'Sliced white bread became popular in the early 20th century with the invention of the bread slicing machine. It revolutionized how people consumed bread and became a symbol of modern convenience.',
    isNew: true,
    category: 'Classic',
    difficulty: 'Beginner',
    bestFor: ['Sandwiches', 'Toast', 'Everyday Use', 'Kids\' Lunches'],
    keyFeatures: ['Soft Texture', 'Mild Flavor', 'Versatile', 'Long Shelf Life'],
    recipes: [], // Community-driven - recipes will be submitted by users
    imageUrl: getBreadImage('sliced-white'),
  },
  {
    id: 'sourdough',
    name: 'Sourdough',
    description: 'A tangy, chewy bread made with natural fermentation. Known for its distinctive flavor and long shelf life.',
    history: 'Sourdough is one of the oldest forms of leavened bread, dating back to ancient Egypt around 1500 BC. The natural fermentation process creates a unique tangy flavor and helps preserve the bread naturally.',
    isNew: true,
    category: 'Sourdough',
    difficulty: 'Advanced',
    bestFor: ['Artisan Sandwiches', 'Toast', 'Cheese Pairing', 'Long Storage'],
    keyFeatures: ['Tangy Flavor', 'Chewy Texture', 'Natural Leavening', 'Long Fermentation'],
    recipes: [], // Community-driven - recipes will be submitted by users
    imageUrl: getBreadImage('sourdough'),
  },
  {
    id: 'baguette',
    name: 'Baguette',
    description: 'The iconic French bread with a crispy crust and airy interior. A symbol of French baking tradition.',
    history: 'The baguette as we know it today was standardized in France in the 1920s. Its long, thin shape was perfect for workers to carry and break apart easily. It became a protected cultural heritage item in France in 2022.',
    category: 'Artisan',
    difficulty: 'Advanced',
    bestFor: ['French Meals', 'Sandwiches', 'Dipping', 'Cheese Boards'],
    keyFeatures: ['Crispy Crust', 'Airy Crumb', 'Traditional Shape', 'Short Shelf Life'],
    recipes: [], // Community-driven - recipes will be submitted by users
    imageUrl: getBreadImage('baguette'),
  },
  {
    id: 'rye',
    name: 'Rye Bread',
    description: 'A dense, hearty bread with a distinctive flavor. Rich in fiber and nutrients, perfect for sandwiches.',
    history: 'Rye bread has been a staple in Northern and Eastern Europe for centuries. Its ability to grow in harsh climates made it essential for many cultures, particularly in Scandinavia and Russia.',
    category: 'Whole Grain',
    difficulty: 'Intermediate',
    bestFor: ['Sandwiches', 'Open-Faced Sandwiches', 'Pairing with Smoked Fish', 'Dense Texture'],
    keyFeatures: ['Dense Texture', 'Distinctive Flavor', 'High Fiber', 'Long Lasting'],
    recipes: [], // Community-driven - recipes will be submitted by users
    imageUrl: getBreadImage('rye'),
  },
  {
    id: 'whole-wheat',
    name: 'Whole Wheat',
    description: 'A nutritious bread made from whole grain flour. Packed with fiber, vitamins, and minerals.',
    history: 'Whole wheat bread has been consumed for thousands of years, but gained modern popularity as people became more health-conscious. It uses the entire wheat kernel, preserving all the natural nutrients.',
    category: 'Whole Grain',
    difficulty: 'Beginner',
    bestFor: ['Healthy Sandwiches', 'Toast', 'Breakfast', 'Nutrition'],
    keyFeatures: ['High Fiber', 'Nutritious', 'Dense Texture', 'Nutty Flavor'],
    recipes: [], // Community-driven - recipes will be submitted by users
    imageUrl: getBreadImage('whole-wheat'),
  },
  {
    id: 'focaccia',
    name: 'Focaccia',
    description: 'A flat Italian bread with a soft, airy interior and crispy golden top. Often topped with olive oil, salt, and herbs.',
    history: 'Focaccia originated in ancient Rome and was originally cooked on the hearth. The name comes from the Latin "focus" meaning hearth. It\'s a staple of Ligurian cuisine and has been enjoyed for over 2,000 years.',
    category: 'Artisan',
    difficulty: 'Intermediate',
    bestFor: ['Appetizers', 'Sandwiches', 'Dipping', 'Italian Meals'],
    keyFeatures: ['Olive Oil Rich', 'Herb Topped', 'Soft Interior', 'Crispy Top'],
    recipes: [],
    imageUrl: getBreadImage('focaccia'),
  },
  {
    id: 'ciabatta',
    name: 'Ciabatta',
    description: 'An Italian white bread with a crisp crust and large, irregular holes. Perfect for sandwiches and paninis.',
    history: 'Ciabatta was invented in 1982 by Arnaldo Cavallari, a baker from Adria, Italy. He created it as an Italian response to the popularity of French baguettes. The name means "slipper" in Italian, referring to its flat, elongated shape.',
    category: 'Artisan',
    difficulty: 'Advanced',
    bestFor: ['Paninis', 'Sandwiches', 'Dipping', 'Italian Cuisine'],
    keyFeatures: ['Large Holes', 'Crisp Crust', 'High Hydration', 'Chewy Texture'],
    recipes: [],
    imageUrl: getBreadImage('ciabatta'),
  },
  {
    id: 'challah',
    name: 'Challah',
    description: 'A rich, braided Jewish bread traditionally eaten on Shabbat and holidays. Made with eggs and often sweetened with honey.',
    history: 'Challah has been a central part of Jewish tradition for centuries. The braided form represents unity and the separation of a portion (challah) is a biblical commandment. It\'s particularly associated with Shabbat and Jewish holidays.',
    category: 'Artisan',
    difficulty: 'Intermediate',
    bestFor: ['Shabbat', 'Holidays', 'French Toast', 'Special Occasions'],
    keyFeatures: ['Braided Shape', 'Egg-Enriched', 'Slightly Sweet', 'Golden Crust'],
    recipes: [],
    imageUrl: getBreadImage('challah'),
  },
  {
    id: 'pita',
    name: 'Pita',
    description: 'A round, flatbread with a pocket perfect for stuffing. A staple of Middle Eastern and Mediterranean cuisine.',
    history: 'Pita bread dates back to ancient times in the Middle East. The pocket forms during baking when steam puffs up the dough. It has been a dietary staple for thousands of years across the Mediterranean region.',
    category: 'Quick Bread',
    difficulty: 'Beginner',
    bestFor: ['Sandwiches', 'Dipping', 'Wraps', 'Mediterranean Meals'],
    keyFeatures: ['Pocket Bread', 'Soft Texture', 'Versatile', 'Quick to Make'],
    recipes: [],
    imageUrl: getBreadImage('pita'),
  },
  {
    id: 'naan',
    name: 'Naan',
    description: 'A soft, leavened flatbread from India, traditionally cooked in a tandoor oven. Perfect for scooping curries.',
    history: 'Naan originated in Persia and was brought to India by the Mughals. The word "naan" comes from Persian meaning "bread." Traditionally cooked in clay tandoors, it has become one of the most popular breads worldwide.',
    category: 'Quick Bread',
    difficulty: 'Intermediate',
    bestFor: ['Indian Curries', 'Dipping', 'Garlic Bread', 'Tandoor Cooking'],
    keyFeatures: ['Soft & Fluffy', 'Tandoor Baked', 'Buttery', 'Leavened'],
    recipes: [],
    imageUrl: getBreadImage('naan'),
  },
  {
    id: 'pretzel',
    name: 'Pretzel',
    description: 'A twisted German bread with a distinctive dark brown, glossy crust and soft interior. Often topped with coarse salt.',
    history: 'Pretzels have a long history dating back to the Middle Ages in Europe, possibly originating in monasteries. The twisted shape is said to represent arms crossed in prayer. They became a symbol of good luck and prosperity.',
    category: 'Artisan',
    difficulty: 'Intermediate',
    bestFor: ['Snacking', 'Beer Pairing', 'Breakfast', 'German Cuisine'],
    keyFeatures: ['Twisted Shape', 'Alkaline Bath', 'Dark Crust', 'Salty Topping'],
    recipes: [],
    imageUrl: getBreadImage('pretzel'),
  },
  {
    id: 'cornbread',
    name: 'Cornbread',
    description: 'A quick bread made with cornmeal, popular in American Southern cuisine. Can be sweet or savory, baked in a skillet.',
    history: 'Cornbread has been a staple in Native American cuisine for centuries and became essential in Southern American cooking. It was originally made by Native Americans using ground corn and was adopted by European settlers.',
    category: 'Quick Bread',
    difficulty: 'Beginner',
    bestFor: ['BBQ Meals', 'Breakfast', 'Soups', 'Southern Cuisine'],
    keyFeatures: ['Cornmeal Base', 'Quick Bread', 'Skillet Baked', 'Versatile'],
    recipes: [],
    imageUrl: getBreadImage('cornbread'),
  },
  {
    id: 'irish-soda',
    name: 'Irish Soda Bread',
    description: 'A quick bread from Ireland made with baking soda instead of yeast. Dense, slightly sweet, and perfect with butter.',
    history: 'Irish soda bread dates back to the 1840s when baking soda became available in Ireland. It was a practical solution for rural families who didn\'t have access to yeast or ovens. The cross cut on top is said to let the fairies out.',
    category: 'Quick Bread',
    difficulty: 'Beginner',
    bestFor: ['St. Patrick\'s Day', 'Breakfast', 'Tea Time', 'Traditional Meals'],
    keyFeatures: ['No Yeast', 'Quick to Make', 'Dense Texture', 'Cross Cut Top'],
    recipes: [],
    imageUrl: getBreadImage('irish-soda'),
  },
  {
    id: 'pumpernickel',
    name: 'Pumpernickel',
    description: 'A dense, dark German rye bread with a distinctive sweet, earthy flavor. Made with coarsely ground rye and long, slow baking.',
    history: 'Pumpernickel originated in Westphalia, Germany, in the 15th century. The name may come from "pumpern" (to break wind) and "Nickel" (a name), or from "brown Nick" referring to the dark color. It\'s traditionally baked for 16-24 hours at low temperature.',
    category: 'Whole Grain',
    difficulty: 'Advanced',
    bestFor: ['Sandwiches', 'Cheese Pairing', 'Smoked Fish', 'German Cuisine'],
    keyFeatures: ['Very Dense', 'Dark Color', 'Long Baking', 'Earthy Flavor'],
    recipes: [],
    imageUrl: getBreadImage('pumpernickel'),
  },
]
