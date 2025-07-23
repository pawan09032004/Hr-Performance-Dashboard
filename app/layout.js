import './globals.css'
import { Inter } from 'next/font/google'
import { AppProvider } from '../context/AppContext'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HR Performance Dashboard',
  description: 'Advanced HR Dashboard for managing employee performance and analytics',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full dark" data-scroll-behavior="smooth">
      <body className={`${inter.className} h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black`}>
        <AppProvider>
          <div className="flex h-full">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Navbar />
              <main className="flex-1 overflow-auto">
                {children}
              </main>
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  )
} 