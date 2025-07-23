'use client'
import { useState, useEffect, useRef } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useApp } from '../../context/AppContext'
import { Bell, User, Moon, Sun, Menu, LogOut, Shield, X, Check, CheckCheck } from 'lucide-react'
import { Button } from '../ui/button'

export default function Navbar() {
  const { data: session, status } = useSession()
  const { darkMode, toggleDarkMode, notifications, markNotificationRead, markAllNotificationsRead, removeNotification } = useApp()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const profileRef = useRef(null)
  const notificationRef = useRef(null)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Show loading state while session is being fetched
  if (status === 'loading') {
    return (
      <nav className="bg-gray-900/60 backdrop-blur-xl border-b border-gray-700/50 px-6 py-4 relative z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
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
    <nav className="bg-gray-900/60 backdrop-blur-xl border-b border-gray-700/50 px-6 py-4 relative z-50">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4 flex-1">
          <Button variant="ghost" size="sm" className="md:hidden text-gray-300 hover:text-white hover:bg-gray-800/50">
            <Menu className="h-5 w-5" />
          </Button>
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
          <div className="relative" ref={notificationRef}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-3 text-gray-300 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-300"
              >
                <Bell className="h-5 w-5" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs flex items-center justify-center shadow-lg">
                    <span className="text-white text-[10px] font-bold">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  </span>
                )}
              </Button>
            </div>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-3 w-96 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 py-3 z-[9999] max-h-96 overflow-y-auto">
                <div className="px-4 py-3 border-b border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Notifications</h3>
                    <div className="flex items-center space-x-2">
                      {notifications.filter(n => !n.read).length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={markAllNotificationsRead}
                          className="text-xs text-lime-400 hover:text-lime-300 hover:bg-lime-400/10 px-2 py-1"
                        >
                          <CheckCheck className="h-3 w-3 mr-1" />
                          Mark all read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsNotificationOpen(false)}
                        className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-1"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center">
                      <Bell className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm">No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-800/50 transition-colors border-l-2 ${
                          notification.read 
                            ? 'border-transparent' 
                            : notification.type === 'success' 
                              ? 'border-green-400' 
                              : notification.type === 'warning'
                                ? 'border-yellow-400'
                                : 'border-blue-400'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className={`text-sm font-semibold ${notification.read ? 'text-gray-400' : 'text-white'}`}>
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="h-2 w-2 bg-red-400 rounded-full"></div>
                              )}
                            </div>
                            <p className={`text-xs mt-1 ${notification.read ? 'text-gray-500' : 'text-gray-300'}`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                          </div>
                          <div className="flex items-center space-x-1 ml-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markNotificationRead(notification.id)}
                                className="text-gray-400 hover:text-lime-400 hover:bg-lime-400/10 p-1"
                                title="Mark as read"
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeNotification(notification.id)}
                              className="text-gray-400 hover:text-red-400 hover:bg-red-400/10 p-1"
                              title="Remove notification"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
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
              <div className="absolute right-0 mt-3 w-64 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 py-3 z-[9999]">
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