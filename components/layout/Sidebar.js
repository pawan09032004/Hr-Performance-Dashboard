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
  Briefcase
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
    <div className="hidden md:flex md:w-72 md:flex-col">
      <div className="flex flex-col flex-grow pt-6 bg-gray-900/60 backdrop-blur-xl border-r border-gray-700/50 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 px-6 mb-10">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="h-12 w-12 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">HR</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-lime-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                HR Dashboard
              </h1>
              <p className="text-sm text-gray-400 font-medium">
                Performance Hub
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex-1 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const badgeCount = item.badge === 'bookmarkedEmployees' ? bookmarkedEmployees.length : 0
            
            return (
              <div key={item.name} className="relative group">
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-emerald-400/20 rounded-2xl blur-lg"></div>
                )}
                <Link
                  href={item.href}
                  className={`
                    relative group flex items-center justify-between px-4 py-3.5 text-sm font-semibold rounded-2xl transition-all duration-300
                    ${isActive
                      ? 'bg-lime-400/10 text-lime-300 border border-lime-400/30 shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-600/30 border border-transparent'
                    }
                  `}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-xl mr-3 ${
                      isActive ? 'bg-lime-400/20' : 'bg-gray-800/50 group-hover:bg-gray-700/50'
                    } transition-all duration-300`}>
                      <item.icon
                        className={`h-5 w-5 transition-colors ${
                          isActive ? 'text-lime-400' : 'text-gray-400 group-hover:text-gray-300'
                        }`}
                      />
                    </div>
                    {item.name}
                  </div>
                  {badgeCount > 0 && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-lime-400/20 rounded-full blur-md"></div>
                      <Badge className="relative bg-yellow-400/10 text-yellow-300 border-yellow-400/30 font-semibold">
                        {badgeCount}
                      </Badge>
                    </div>
                  )}
                </Link>
              </div>
            )
          })}
        </nav>


      </div>
    </div>
  )
} 