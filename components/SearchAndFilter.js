'use client'
import { Search, Filter, X, Users, Star, TrendingUp } from 'lucide-react'
import { Button } from './ui/button'
import { useApp } from '../context/AppContext'
import { useEmployees } from '../hooks/useEmployees'

export default function SearchAndFilter() {
  const {
    searchTerm,
    filterDepartment,
    filterRating,
    setSearchTerm,
    setFilterDepartment,
    setFilterRating,
    employees
  } = useApp()
  
  const { departments, filteredEmployees, performanceStats } = useEmployees()

  const clearFilters = () => {
    setSearchTerm('')
    setFilterDepartment('')
    setFilterRating('')
  }

  const hasActiveFilters = searchTerm || filterDepartment || filterRating

  return (
    <div className="space-y-6">
      {/* Quick Stats Bar */}
      {employees.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
          <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/30 rounded-xl border border-gray-700/30">
            <Users className="h-4 w-4 text-lime-400" />
            <span className="text-sm text-gray-300">
              Showing <span className="text-white font-semibold">{filteredEmployees.length}</span> of <span className="text-white font-semibold">{employees.length}</span> employees
            </span>
          </div>
          {performanceStats.averageRating && (
            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/30 rounded-xl border border-gray-700/30">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-gray-300">
                Avg Rating: <span className="text-white font-semibold">{performanceStats.averageRating}</span>
              </span>
            </div>
          )}
          {performanceStats.topPerformers > 0 && (
            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/30 rounded-xl border border-gray-700/30">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-gray-300">
                Top Performers: <span className="text-white font-semibold">{performanceStats.topPerformers}</span>
              </span>
            </div>
          )}
        </div>
      )}

      {/* Main Search and Filter */}
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-lime-400/10 to-emerald-400/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        
        <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 hover:border-lime-400/30 transition-all duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0 lg:space-x-6">
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-lime-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search by name, email, job title, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-gray-800/50 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 focus:bg-gray-800/70 transition-all duration-200 text-lg"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Department Filter */}
              <div className="relative group">
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="appearance-none bg-gray-800/50 border border-gray-600/50 rounded-2xl px-6 py-4 pr-12 text-white focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 focus:bg-gray-800/70 transition-all duration-200 cursor-pointer hover:border-emerald-400/30"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none group-focus-within:text-emerald-400 transition-colors" />
              </div>

              {/* Rating Filter */}
              <div className="relative group">
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="appearance-none bg-gray-800/50 border border-gray-600/50 rounded-2xl px-6 py-4 pr-12 text-white focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 focus:bg-gray-800/70 transition-all duration-200 cursor-pointer hover:border-green-400/30"
                >
                  <option value="">All Ratings</option>
                  <option value="5">5 Stars (Excellent)</option>
                  <option value="4">4 Stars (Very Good)</option>
                  <option value="3">3 Stars (Good)</option>
                  <option value="2">2 Stars (Needs Improvement)</option>
                </select>
                <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none group-focus-within:text-green-400 transition-colors" />
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={clearFilters}
                    className="relative bg-gray-800/50 border-gray-600/50 text-white hover:bg-red-500/20 hover:border-red-400/50 hover:text-red-400 transition-all duration-300 px-6 py-4 rounded-2xl"
                  >
                    <X className="h-5 w-5 mr-2" />
                    <span>Clear All</span>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-6 pt-6 border-t border-gray-700/50">
              <div className="flex flex-wrap gap-3">
                {searchTerm && (
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-emerald-400/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                    <div className="relative inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-lime-400/10 text-lime-300 border border-lime-400/30">
                      Search: &quot;{searchTerm}&quot;
                      <button
                        onClick={() => setSearchTerm('')}
                        className="ml-3 hover:text-lime-400 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
                {filterDepartment && (
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                    <div className="relative inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-400/10 text-emerald-300 border border-emerald-400/30">
                      Department: {filterDepartment}
                      <button
                        onClick={() => setFilterDepartment('')}
                        className="ml-3 hover:text-emerald-400 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
                {filterRating && (
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-lime-400/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                    <div className="relative inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-400/10 text-yellow-300 border border-yellow-400/30">
                      Rating: {filterRating} Stars
                      <button
                        onClick={() => setFilterRating('')}
                        className="ml-3 hover:text-yellow-400 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 