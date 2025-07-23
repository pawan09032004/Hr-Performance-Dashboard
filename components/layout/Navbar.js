'use client'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useApp } from '../../context/AppContext'
import { Bell, Search, Settings, User, Moon, Sun, Menu, LogOut, Shield, UserCircle } from 'lucide-react'
import { Button } from '../ui/button'

export default function Navbar() {
  const { data: session, status } = useSession()
  const { darkMode, toggleDarkMode } = useApp()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  // Show loading state while session is being fetched
  if (status === 'loading') {
    return (
      <nav className="bg-gray-900/60 backdrop-blur-xl border-b border-gray-700/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="h-10 w-64 bg-gray-800/50 rounded-2xl animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gray-800/50 rounded-xl animate-pulse"></div>
            <div className="h-10 w-10 bg-gray-800/50 rounded-xl animate-pulse"></div>
            <div className="h-10 w-24 bg-gray-800/50 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-gray-900/60 backdrop-blur-xl border-b border-gray-700/50 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Search */}
        <div className="flex items-center space-x-4 flex-1">
          <Button variant="ghost" size="sm" className="md:hidden text-gray-300 hover:text-white hover:bg-gray-800/50">
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Quick search employees, departments..."
              className="w-full pl-12 pr-4 py-3 border border-gray-600/50 rounded-2xl bg-gray-800/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 focus:bg-gray-800/70 transition-all duration-200"
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-3">
          {/* Dark mode toggle */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-lime-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="relative p-3 text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-xl transition-all duration-300"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Notifications */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <Button variant="ghost" size="sm" className="relative p-3 text-gray-300 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-300">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs flex items-center justify-center shadow-lg">
                <span className="text-white text-[10px] font-bold">3</span>
              </span>
            </Button>
          </div>

          {/* Settings */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <Button variant="ghost" size="sm" className="relative p-3 text-gray-300 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-xl transition-all duration-300">
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          {/* Profile */}
          <div className="relative">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-emerald-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="relative flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-2xl transition-all duration-300 border border-transparent hover:border-gray-600/30"
              >
                <div className="h-10 w-10 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  {session?.user?.role === 'admin' ? (
                    <Shield className="h-5 w-5 text-white" />
                  ) : (
                    <User className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-semibold">{session?.user?.name || 'User'}</div>
                  <div className="text-xs text-gray-400 capitalize">
                    {session?.user?.role || 'Member'} • Online
                  </div>
                </div>
              </Button>
            </div>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 py-3 z-50">
                <div className="px-4 py-3 border-b border-gray-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-xl flex items-center justify-center">
                      {session?.user?.role === 'admin' ? (
                        <Shield className="h-6 w-6 text-white" />
                      ) : (
                        <User className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{session?.user?.name}</p>
                      <p className="text-xs text-gray-400">{session?.user?.email}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="h-2 w-2 bg-lime-400 rounded-full"></div>
                        <span className="text-xs text-lime-400 capitalize">{session?.user?.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors">
                    <UserCircle className="h-4 w-4" />
                    <span>Profile Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors">
                    <Settings className="h-4 w-4" />
                    <span>Account Preferences</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </button>
                </div>
                
                <hr className="my-2 border-gray-700/50" />
                
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 