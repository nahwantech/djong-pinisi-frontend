'use client'

import { usePathname } from 'next/navigation'
import Navbar from './navbar/Navbar'

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const hideNavbar = pathname === '/login'

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className={hideNavbar ? '' : 'pt-16'}>
        {children}
      </div>
    </>
  )
}
