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
            : 'text-gray-600'
        }`}
      />
    ))
  }

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30'
    if (rating >= 3.5) return 'bg-lime-400/10 text-lime-300 border-lime-400/30'
    if (rating >= 2.5) return 'bg-yellow-400/10 text-yellow-300 border-yellow-400/30'
    return 'bg-red-400/10 text-red-300 border-red-400/30'
  }

  return (
    <div className="group relative">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 to-emerald-400/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
      
      <Card className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl hover:border-lime-400/30 transition-all duration-300 overflow-hidden">
        <div className="p-6">
          {/* Header with Avatar and Bookmark */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="h-14 w-14 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {employee.firstName[0]}{employee.lastName[0]}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-gray-900"></div>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg group-hover:text-lime-400 transition-colors">
                  {employee.firstName} {employee.lastName}
                </h3>
                <p className="text-gray-400 text-sm font-medium">
                  {employee.department}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleBookmark(employee.id)}
              className={`${
                isBookmarked 
                  ? 'text-yellow-400 hover:text-yellow-300' 
                  : 'text-gray-500 hover:text-yellow-400'
              } transition-all duration-300 hover:bg-yellow-400/10 rounded-xl`}
            >
              <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
              <div className="p-2 bg-gray-800/50 rounded-xl mr-3">
                <Mail className="h-4 w-4 text-lime-400" />
              </div>
              <span className="truncate font-medium">{employee.email}</span>
            </div>
            <div className="flex items-center text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
              <div className="p-2 bg-gray-800/50 rounded-xl mr-3">
                <Phone className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="font-medium">{employee.phone}</span>
            </div>
            <div className="flex items-center text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
              <div className="p-2 bg-gray-800/50 rounded-xl mr-3">
                <MapPin className="h-4 w-4 text-green-400" />
              </div>
              <span className="truncate font-medium">{employee.address.city}, {employee.address.state}</span>
            </div>
          </div>

          {/* Performance Rating */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-300">
                Performance Rating
              </span>
              <Badge className={`${getRatingColor(employee.rating)} border font-semibold`}>
                {employee.rating}/5
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {renderStars(Math.floor(employee.rating))}
              </div>
              <span className="text-sm text-gray-400 font-medium">
                ({employee.rating})
              </span>
            </div>
          </div>

          {/* Additional Info */}
          <div className="flex items-center justify-between text-sm text-gray-400 mb-6 p-3 bg-gray-800/30 rounded-xl">
            <span className="font-medium">Age: <span className="text-white">{employee.age}</span></span>
            <span className="font-medium">ID: <span className="text-lime-400">#{employee.id}</span></span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Link href={`/employee/${employee.id}`} className="flex-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-lime-400/10 hover:border-lime-400/50 hover:text-lime-400 transition-all duration-300 font-semibold rounded-xl"
              >
                View Profile
              </Button>
            </Link>
            <div className="relative group/promote">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-xl blur-lg opacity-0 group-hover/promote:opacity-100 transition-all duration-300"></div>
              <Button
                size="sm"
                onClick={handlePromote}
                disabled={isPromoting}
                className="relative bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-semibold transition-all duration-300 rounded-xl px-4"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                <span>{isPromoting ? 'Promoting...' : 'Promote'}</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 