'use client'
import { useState } from 'react'
import { Star, Mail, Phone, MapPin, Calendar, DollarSign, Users, Building, Bookmark, TrendingUp, Edit, MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Card } from './ui/card'
import { useApp } from '../context/AppContext'

export default function EmployeeProfileHeader({ employee }) {
  const { bookmarkedEmployees, toggleBookmark } = useApp()
  const [isPromoting, setIsPromoting] = useState(false)
  
  const isBookmarked = bookmarkedEmployees.includes(employee.id)

  const handlePromote = async () => {
    setIsPromoting(true)
    setTimeout(() => {
      setIsPromoting(false)
    }, 1500)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-500'
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

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(salary)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          {/* Profile Info */}
          <div className="flex items-center space-x-4 text-white">
            <div className="h-20 w-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl font-bold">
                {employee.firstName[0]}{employee.lastName[0]}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                {employee.firstName} {employee.lastName}
              </h1>
              <p className="text-primary-100 text-lg">{employee.department}</p>
              <p className="text-primary-200 text-sm">Employee ID: {employee.employeeId}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => toggleBookmark(employee.id)}
              className={`${isBookmarked ? 'bg-yellow-500 text-white' : 'bg-white text-gray-900'}`}
            >
              <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePromote}
              disabled={isPromoting}
              className="bg-white text-gray-900"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              {isPromoting ? 'Promoting...' : 'Promote'}
            </Button>
            <Button variant="secondary" size="sm" className="bg-white text-gray-900">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="secondary" size="sm" className="bg-white text-gray-900">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Performance Rating */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white">
              Performance Rating
            </h3>
            <Badge className={getRatingColor(employee.rating)}>
              {employee.rating}/5.0
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            {renderStars(Math.floor(employee.rating))}
            <span className="text-gray-300 ml-2">
              ({employee.rating} out of 5.0)
            </span>
          </div>
        </div>

        {/* Bio */}
        {employee.bio && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">About</h3>
            <p className="text-gray-300 leading-relaxed">{employee.bio}</p>
          </div>
        )}

        {/* Contact & Work Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Contact Information */}
          <div>
            <h4 className="font-semibold text-white mb-3">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="h-4 w-4 mr-3 text-gray-400" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="h-4 w-4 mr-3 text-gray-400" />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <MapPin className="h-4 w-4 mr-3 text-gray-400" />
                <span>{employee.address?.address}, {employee.address?.city}, {employee.address?.state}</span>
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div>
            <h4 className="font-semibold text-white mb-3">Work Information</h4>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <Calendar className="h-4 w-4 mr-3 text-gray-400" />
                <div>
                  <span className="text-gray-400">Start Date:</span>
                  <span className="ml-1">{formatDate(employee.startDate)}</span>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Users className="h-4 w-4 mr-3 text-gray-400" />
                <div>
                  <span className="text-gray-400">Team:</span>
                  <span className="ml-1">{employee.team}</span>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Building className="h-4 w-4 mr-3 text-gray-400" />
                <div>
                  <span className="text-gray-400">Location:</span>
                  <span className="ml-1">{employee.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <h4 className="font-semibold text-white mb-3">Additional Details</h4>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <DollarSign className="h-4 w-4 mr-3 text-gray-400" />
                <div>
                  <span className="text-gray-400">Salary:</span>
                  <span className="ml-1 font-medium">{formatSalary(employee.salary)}</span>
                </div>
              </div>
              <div className="text-sm text-gray-300">
                <span className="text-gray-400">Age:</span>
                <span className="ml-1">{employee.age} years</span>
              </div>
              <div className="text-sm text-gray-300">
                <span className="text-gray-400">Manager:</span>
                <span className="ml-1">{employee.manager}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h4 className="font-semibold text-white mb-3">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {employee.skills?.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
} 