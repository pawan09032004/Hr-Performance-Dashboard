'use client'
import Navbar from './layout/Navbar'
import Sidebar from './layout/Sidebar'

export default function ClientLayout({ children }) {
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
