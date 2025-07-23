import './globals.css'
import { Inter } from 'next/font/google'
import { AppProvider } from '../context/AppContext'
import SessionWrapper from '../components/SessionWrapper'
import ClientLayout from '../components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HR Performance Dashboard',
  description: 'Advanced HR Dashboard for managing employee performance and analytics',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full dark" data-scroll-behavior="smooth">
      <body className={`${inter.className} h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black`}>
        <SessionWrapper>
          <AppProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
          </AppProvider>
        </SessionWrapper>
      </body>
    </html>
  )
}
