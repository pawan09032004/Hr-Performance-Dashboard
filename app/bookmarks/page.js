'use client'
import { useEffect, useState } from 'react'
import { useApp } from '../../context/AppContext'
import { 
  Bookmark, 
  BookmarkX, 
  TrendingUp, 
  Briefcase, 
  Star, 
  Mail, 
  MapPin, 
  Calendar,
  Users,
  Award,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react'
import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import CongratsAlert from '../../components/ui/CongratsAlert'
import Link from 'next/link'

export default function BookmarksPage() {
  const { employees, bookmarkedEmployees, toggleBookmark, loading } = useApp()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name') // name, rating, department, dateAdded
  const [filterDepartment, setFilterDepartment] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [promotedEmployee, setPromotedEmployee] = useState(null)

  // Get bookmarked employee details
  const bookmarkedEmployeeDetails = employees.filter(emp => 
    bookmarkedEmployees.includes(emp.id)
  )

  // Filter and search bookmarked employees
  const filteredBookmarks = bookmarkedEmployeeDetails.filter(employee => {
    const matchesSearch = employee.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = !filterDepartment || employee.department === filterDepartment
    
    return matchesSearch && matchesDepartment
  })

  // Sort bookmarked employees
  const sortedBookmarks = [...filteredBookmarks].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
      case 'rating':
        return (b.rating || 0) - (a.rating || 0)
      case 'department':
        return (a.department || '').localeCompare(b.department || '')
      case 'dateAdded':
        // Since we don't have actual bookmark dates, use ID as proxy
        return b.id - a.id
      default:
        return 0
    }
  })

  // Get unique departments for filter
  const departments = [...new Set(bookmarkedEmployeeDetails.map(emp => emp.department).filter(Boolean))]

  const handlePromote = (employee) => {
    // Mock promote action - in real app would call API
    setPromotedEmployee(employee)
    setShowAlert(true)
  }

  const handleAssignToProject = (employee) => {
    // Mock assign to project action - in real app would open modal/form
    alert(`Assigning ${employee.firstName} ${employee.lastName} to a new project! 📁`)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ))
  }

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
    if (rating >= 3.5) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
    if (rating >= 2.5) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
    return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="flex items-center justify-center h-screen">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-lime-400/20 border-t-lime-400 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-emerald-400 rounded-full animate-spin animation-delay-150"></div>
          </div>
        </div>
      </div>
    )
  }

  // Empty state
  if (bookmarkedEmployees.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-lime-400/10 rounded-2xl">
                  <Bookmark className="w-8 h-8 text-lime-400" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-lime-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                    Bookmarked Employees
                  </h1>
                  <p className="text-gray-400 text-lg mt-2">
                    Manage your saved employee profiles
                  </p>
                </div>
              </div>
            </div>

            {/* Empty State */}
            <div className="text-center py-20">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
                <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-full w-32 h-32 mx-auto flex items-center justify-center">
                  <BookmarkX className="w-16 h-16 text-gray-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Bookmarked Employees</h3>
              <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                You haven&apos;t bookmarked any employees yet. Start by exploring the dashboard and bookmark employees you want to keep track of.
              </p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-500 hover:to-emerald-600 text-black font-semibold px-8 py-3 rounded-xl">
                  <Users className="w-5 h-5 mr-2" />
                  Browse Employees
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-lime-400/10 rounded-2xl">
                  <Bookmark className="w-8 h-8 text-lime-400" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-lime-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                    Bookmarked Employees
                  </h1>
                  <p className="text-gray-400 text-lg mt-2">
                    {bookmarkedEmployees.length} saved employees
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-lime-400/10 text-lime-400 border-lime-400/20 px-4 py-2 text-sm">
                  {bookmarkedEmployees.length} Bookmarked
                </Badge>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search bookmarked employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50"
                />
              </div>
              <div>
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50"
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50"
                >
                  <option value="name">Sort by Name</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="department">Sort by Department</option>
                  <option value="dateAdded">Recently Added</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bookmarked Employees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedBookmarks.map((employee) => (
              <div key={employee.id} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-lime-400/10 to-emerald-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <Card className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 hover:border-lime-400/30 transition-all duration-300 overflow-hidden">
                  {/* Card Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div 
                            className="w-16 h-16 rounded-2xl bg-cover bg-center border-2 border-gray-700/50"
                            style={{ 
                              backgroundImage: `url(${employee.image || `https://ui-avatars.com/api/?name=${employee.firstName}+${employee.lastName}&background=random`})` 
                            }}
                          />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-gray-900"></div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-lime-400 transition-colors">
                            {employee.firstName} {employee.lastName}
                          </h3>
                          <p className="text-gray-400 text-sm">{employee.department}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(employee.id)}
                        className="text-lime-400 hover:text-red-400 hover:bg-red-400/10"
                      >
                        <BookmarkX className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Employee Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{employee.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{employee.address?.city || 'Location not specified'}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Age {employee.age}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(employee.rating || 0)}
                        </div>
                        <span className="text-sm text-gray-300">({(employee.rating || 0).toFixed(1)})</span>
                      </div>
                      <Badge className={getRatingColor(employee.rating || 0)}>
                        {employee.rating >= 4.5 ? 'Excellent' : 
                         employee.rating >= 3.5 ? 'Good' : 
                         employee.rating >= 2.5 ? 'Average' : 'Needs Improvement'}
                      </Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 gap-3">
                      <Link href={`/employee/${employee.id}`}>
                        <Button className="w-full bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-500 hover:to-emerald-600 text-black font-semibold">
                          View Profile
                        </Button>
                      </Link>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePromote(employee)}
                          className="flex items-center space-x-1 border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10"
                        >
                          <TrendingUp className="w-4 h-4" />
                          <span>Promote</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAssignToProject(employee)}
                          className="flex items-center space-x-1 border-blue-400/30 text-blue-400 hover:bg-blue-400/10"
                        >
                          <Briefcase className="w-4 h-4" />
                          <span>Assign</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* No Results State */}
          {filteredBookmarks.length === 0 && bookmarkedEmployees.length > 0 && (
            <div className="text-center py-20">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
                <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-full w-32 h-32 mx-auto flex items-center justify-center">
                  <Search className="w-16 h-16 text-gray-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Results Found</h3>
              <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                No bookmarked employees match your current search criteria. Try adjusting your filters.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setFilterDepartment('')
                }}
                variant="outline"
                className="border-lime-400/30 text-lime-400 hover:bg-lime-400/10"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Congratulations Alert */}
      <CongratsAlert
        isVisible={showAlert}
        onClose={() => setShowAlert(false)}
        employeeName={promotedEmployee ? `${promotedEmployee.firstName} ${promotedEmployee.lastName}` : ''}
      />
    </div>
  )
} 