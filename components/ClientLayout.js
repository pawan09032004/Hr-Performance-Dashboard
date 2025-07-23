'use client'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Navbar from './layout/Navbar'
import Sidebar from './layout/Sidebar'

export default function ClientLayout({ children }) {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  
  // Check if current page is login
  const isLoginPage = pathname === '/login'
  
  // If it's login page or user is not authenticated, render without layout
  if (isLoginPage || status === 'loading' || !session) {
    return <>{children}</>
  }

  // For authenticated users on other pages, render with full layout
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
