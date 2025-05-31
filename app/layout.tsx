import type { Metadata } from 'next'
// app/layout.tsx
import './globals.css' // Your global styles
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar' // Import your Navbar component

const inter = Inter({ subsets: ['latin'] })
 
// These styles apply to every route in the application
import './globals.css'
 
export const metadata: Metadata = {
  title: 'Djong Pinisi Apps',
  description: 'Power your travel moment.',
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* Your Navbar component */}
        <div className="pt-16"> {/* Add padding-top equal to your navbar height */}
          {children}
        </div>
      </body>
    </html>
  )
}