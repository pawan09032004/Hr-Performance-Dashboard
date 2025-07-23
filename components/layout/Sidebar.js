'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Home, 
  Users, 
  Bookmark, 
  BarChart3, 
  UserPlus,
  Award,
  Briefcase,
  Settings
} from 'lucide-react'
import { Badge } from '../ui/badge'
import { useApp } from '../../context/AppContext'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Employees', href: '/employees', icon: Users },
  { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark, badge: 'bookmarkedEmployees' },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Performance', href: '/performance', icon: Award },
  { name: 'Projects', href: '/projects', icon: Briefcase },
  { name: 'Add Employee', href: '/add-employee', icon: UserPlus },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { bookmarkedEmployees } = useApp()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 px-6 mb-8">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">HR</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                HR Dashboard
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Performance Hub
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-5 flex-1 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const badgeCount = item.badge === 'bookmarkedEmployees' ? bookmarkedEmployees.length : 0
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                  ${isActive
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-l-4 border-primary-500'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }
                `}
              >
                <div className="flex items-center">
                  <item.icon
                    className={`mr-3 h-5 w-5 transition-colors ${
                      isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </div>
                {badgeCount > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {badgeCount}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/settings"
            className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Settings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
            Settings
          </Link>
        </div>
      </div>
    </div>
  )
} 