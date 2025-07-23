'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Star, Bookmark, TrendingUp, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Card } from './ui/card'
import { useApp } from '../context/AppContext'

export default function EmployeeCard({ employee }) {
  const { bookmarkedEmployees, toggleBookmark } = useApp()
  const [isPromoting, setIsPromoting] = useState(false)
  
  const isBookmarked = bookmarkedEmployees.includes(employee.id)
  
  const handlePromote = async () => {
    setIsPromoting(true)
    // Simulate promotion process
    setTimeout(() => {
      setIsPromoting(false)
      // You could add a toast notification here
    }, 1500)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
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

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        {/* Header with Avatar and Bookmark */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {employee.firstName[0]}{employee.lastName[0]}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {employee.department}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleBookmark(employee.id)}
            className={`${isBookmarked ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500`}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Mail className="h-4 w-4 mr-2 text-gray-400" />
            <span className="truncate">{employee.email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Phone className="h-4 w-4 mr-2 text-gray-400" />
            <span>{employee.phone}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span className="truncate">{employee.address.city}, {employee.address.state}</span>
          </div>
        </div>

        {/* Performance Rating */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Performance
            </span>
            <Badge className={getRatingColor(employee.rating)}>
              {employee.rating}/5
            </Badge>
          </div>
          <div className="flex items-center space-x-1">
            {renderStars(Math.floor(employee.rating))}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              ({employee.rating})
            </span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>Age: {employee.age}</span>
          <span>ID: #{employee.id}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link href={`/employee/${employee.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Profile
            </Button>
          </Link>
          <Button
            size="sm"
            onClick={handlePromote}
            disabled={isPromoting}
            className="flex items-center space-x-1"
          >
            <TrendingUp className="h-4 w-4" />
            <span>{isPromoting ? 'Promoting...' : 'Promote'}</span>
          </Button>
        </div>
      </div>
    </Card>
  )
} 