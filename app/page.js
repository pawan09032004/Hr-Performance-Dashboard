'use client'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useApp } from '../context/AppContext'
import EmployeeCard from '../components/EmployeeCard'
import SearchAndFilter from '../components/SearchAndFilter'
import { useEmployees } from '../hooks/useEmployees'
import { Users, Star, TrendingUp, Award, ChevronDown, Shield, User, Bookmark } from 'lucide-react'
import { Badge } from '../components/ui/badge'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const { 
    employees, 
    searchTerm, 
    filterDepartment, 
    filterRating,
    loading,
    error,
    bookmarkedEmployees
  } = useApp()
  
  const { fetchEmployees, filteredEmployees } = useEmployees()

  useEffect(() => {
    if (session) {
      fetchEmployees()
    }
  }, [session, fetchEmployees])

  // Calculate stats
  const averageRating = employees.length > 0 
    ? (employees.reduce((sum, emp) => sum + emp.rating, 0) / employees.length).toFixed(1)
    : 0
  const topPerformers = employees.filter(emp => emp.rating >= 4.5).length
  const totalBookmarks = bookmarkedEmployees.length

  // Show loading state while authenticating
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-4 border-lime-400/20 border-t-lime-400 animate-spin mb-4">
            <div className="w-8 h-8 border-4 border-transparent border-t-emerald-400 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <p className="text-gray-400">Authenticating...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, #06d6a0 0%, transparent 50%),
                              radial-gradient(circle at 50% 50%, #84cc16 0%, transparent 50%)`
            }}></div>
          </div>
          
          <div className="relative px-6 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto text-center">
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <div className="h-12 w-12 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-xl flex items-center justify-center">
                    {session?.user?.role === 'admin' ? (
                      <Shield className="h-6 w-6 text-white" />
                    ) : (
                      <User className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl font-bold text-white">Welcome back, {session?.user?.name}!</h2>
                    <p className="text-lime-400 capitalize">{session?.user?.role} Dashboard</p>
                  </div>
                </div>
                <h1 className="text-5xl sm:text-7xl font-bold mb-6">
                  <span className="text-white">Experience the most advanced</span>
                  <br />
                  <span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                    HR Dashboard
                  </span>
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Streamline workforce performance tracking with powerful insights and modern design
                </p>
              </div>
              
              {/* Loading Indicator */}
              <div className="animate-bounce mt-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-4 border-lime-400/20 border-t-lime-400 animate-spin">
                  <div className="w-8 h-8 border-4 border-transparent border-t-emerald-400 rounded-full animate-spin animation-delay-150"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        <div className="px-6 pb-12">
          <div className="max-w-7xl mx-auto">
            {/* Skeleton Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-lime-400/10 to-emerald-400/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-gray-800/50 rounded-xl">
                        <div className="w-6 h-6 bg-gray-700/50 rounded animate-pulse"></div>
                      </div>
                      <div className="text-2xl">⏳</div>
                    </div>
                    <div className="h-8 bg-gray-700/50 rounded animate-pulse mb-1"></div>
                    <div className="h-4 bg-gray-800/50 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Skeleton Search */}
            <div className="mb-12">
              <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <div className="h-16 bg-gray-800/50 rounded-2xl animate-pulse"></div>
              </div>
            </div>

            {/* Skeleton Employee Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-emerald-400/5 rounded-3xl blur-xl"></div>
                  <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6">
                    {/* Skeleton Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-14 w-14 bg-gray-800/50 rounded-2xl animate-pulse"></div>
                        <div>
                          <div className="h-5 w-24 bg-gray-700/50 rounded animate-pulse mb-2"></div>
                          <div className="h-4 w-20 bg-gray-800/50 rounded animate-pulse mb-1"></div>
                          <div className="h-3 w-16 bg-gray-800/50 rounded animate-pulse"></div>
                        </div>
                      </div>
                      <div className="h-8 w-8 bg-gray-800/50 rounded-xl animate-pulse"></div>
                    </div>

                    {/* Skeleton Content */}
                    <div className="space-y-3 mb-6">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center">
                          <div className="p-2 bg-gray-800/50 rounded-xl mr-3">
                            <div className="h-4 w-4 bg-gray-700/50 rounded animate-pulse"></div>
                          </div>
                          <div className="h-4 flex-1 bg-gray-800/50 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>

                    {/* Skeleton Rating */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="h-4 w-20 bg-gray-700/50 rounded animate-pulse"></div>
                        <div className="h-6 w-12 bg-gray-800/50 rounded animate-pulse"></div>
                      </div>
                      <div className="h-4 w-full bg-gray-800/50 rounded animate-pulse"></div>
                    </div>

                    {/* Skeleton Buttons */}
                    <div className="flex space-x-3">
                      <div className="flex-1 h-10 bg-gray-800/50 rounded-xl animate-pulse"></div>
                      <div className="h-10 w-20 bg-gray-800/50 rounded-xl animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
        <div className="max-w-md mx-auto mt-20">
          <div className="bg-red-900/20 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6">
            <h3 className="text-red-400 font-semibold text-lg mb-2">Error loading employees</h3>
            <p className="text-red-300/80 text-sm">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, #06d6a0 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, #84cc16 0%, transparent 50%)`
          }}></div>
        </div>
        
        <div className="relative px-6 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="h-14 w-14 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  {session?.user?.role === 'admin' ? (
                    <Shield className="h-7 w-7 text-white" />
                  ) : (
                    <User className="h-7 w-7 text-white" />
                  )}
                </div>
                <div className="text-left">
                  <h2 className="text-3xl font-bold text-white">Welcome back, {session?.user?.name}!</h2>
                  <p className="text-lime-400 capitalize text-lg">{session?.user?.role} Dashboard</p>
                </div>
              </div>
              <h1 className="text-5xl sm:text-7xl font-bold mb-6">
                <span className="text-white">Experience the most advanced</span>
                <br />
                <span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                  HR Dashboard
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Streamline workforce performance tracking with powerful insights and modern design
              </p>
            </div>
            
            {/* Scroll Indicator */}
            <div className="animate-bounce mt-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-lime-400/30">
                <ChevronDown className="w-6 h-6 text-lime-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Total Employees */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-emerald-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-lime-400/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-lime-400/10 rounded-xl">
                    <Users className="w-6 h-6 text-lime-400" />
                  </div>
                  <Badge className="bg-lime-400/10 text-lime-300 border-lime-400/30 font-semibold">
                    <Users className="w-3 h-3 mr-1" />
                    Team
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{employees.length}</h3>
                <p className="text-gray-400 text-sm">Total Employees</p>
              </div>
            </div>

            {/* Average Rating */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-emerald-400/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-400/10 rounded-xl">
                    <Star className="w-6 h-6 text-emerald-400" />
                  </div>
                  <Badge className="bg-emerald-400/10 text-emerald-300 border-emerald-400/30 font-semibold">
                    <Star className="w-3 h-3 mr-1" />
                    Rating
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{averageRating}</h3>
                <p className="text-gray-400 text-sm">Average Rating</p>
              </div>
            </div>

            {/* Top Performers */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-lime-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-green-400/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-400/10 rounded-xl">
                    <Award className="w-6 h-6 text-green-400" />
                  </div>
                  <Badge className="bg-green-400/10 text-green-300 border-green-400/30 font-semibold">
                    <Award className="w-3 h-3 mr-1" />
                    Elite
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{topPerformers}</h3>
                <p className="text-gray-400 text-sm">Top Performers</p>
              </div>
            </div>

            {/* Bookmarked */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-lime-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-yellow-400/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-yellow-400/10 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-yellow-400" />
                  </div>
                  <Badge className="bg-yellow-400/10 text-yellow-300 border-yellow-400/30 font-semibold">
                    <Bookmark className="w-3 h-3 mr-1" />
                    Saved
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{totalBookmarks}</h3>
                <p className="text-gray-400 text-sm">Bookmarked</p>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-12">
            <SearchAndFilter />
          </div>

          {/* Employee Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee, index) => (
                <div 
                  key={employee.id} 
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <EmployeeCard employee={employee} />
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <div className="text-center py-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-lime-400/10 to-emerald-400/10 rounded-3xl blur-2xl"></div>
                    <div className="relative bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-12">
                      <div className="text-6xl mb-6">🔍</div>
                      <h3 className="text-2xl font-bold text-white mb-4">No employees found</h3>
                      <p className="text-gray-400 text-lg max-w-md mx-auto">
                        Try adjusting your search or filter criteria to find the team members you&apos;re looking for
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 