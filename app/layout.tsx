// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import AppWrapper from '../components/AppWrapper' // your new wrapper

const inter = Inter({ subsets: ['latin'] })

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
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
