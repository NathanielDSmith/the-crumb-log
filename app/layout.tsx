import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import { AuthProvider } from '@/contexts/AuthContext'
import ErrorBoundary from '@/components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'The Crumb Log - A Community for Bread Lovers',
  description: 'Share recipes, discuss bread types, and connect with fellow baking enthusiasts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <AuthProvider>
            <Navigation />
            {children}
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

