# The Crumb Log

A community platform for bread enthusiasts to share recipes, discuss bread types, and connect with fellow bakers.

## Features

- **Homepage**: Highlights new bread additions, popular breads, and interactive widgets
- **Bread Pages**: Individual community pages for each bread type featuring:
  - History and information
  - Community-driven ratings
  - Recipe submissions and reviews
  - Photo submissions
  - Related breads
- **User Authentication**: Sign up, login, and user profiles
- **Recipe Submission**: Community-driven recipe sharing with admin review
- **Admin Dashboard**: Review and approve/reject submitted recipes
- **Favorites**: Save your favorite breads
- **Interactive Widgets**: Bread finder, stats widget, bread of the day

## Design Philosophy

Clean, rustic, and professional - designed for baking enthusiasts who value simplicity and community over flashy features.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with custom rustic theme

## Project Structure

```
├── app/
│   ├── bread/[id]/    # Individual bread pages
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── data/
│   └── breads.ts       # Bread data
└── public/             # Static assets
```

## Current Breads

- Brioche
- Sliced White
- Sourdough
- Baguette
- Rye Bread
- Whole Wheat
- Focaccia
- Ciabatta
- Challah
- Pita
- Naan
- Pretzel
- Cornbread
- Irish Soda Bread
- Pumpernickel

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with custom rustic theme
- **React Context** - State management for authentication

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Admin Access

To access the admin dashboard, sign in with:
- `admin@crumblog.com` or `admin@thecrumblog.com`

## Project Structure

```
├── app/
│   ├── account/          # User profile page
│   ├── admin/            # Admin dashboard
│   ├── bread/[id]/       # Individual bread pages
│   ├── login/            # Login page
│   ├── signup/           # Registration page
│   ├── submit-recipe/    # Recipe submission page
│   └── ...
├── components/            # React components
├── contexts/              # React contexts (Auth)
├── data/                 # Data structures and utilities
└── public/               # Static assets
```

