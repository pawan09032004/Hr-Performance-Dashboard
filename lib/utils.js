import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Utility functions for HR Dashboard
export function generateDepartments() {
  return [
    'Engineering',
    'Marketing', 
    'Sales',
    'HR',
    'Finance',
    'Operations',
    'Design',
    'Product'
  ]
}

export function generatePerformanceRating() {
  return Math.floor(Math.random() * 5) + 1
}

export function formatEmployeeData(user) {
  const departments = generateDepartments()
  const department = departments[Math.floor(Math.random() * departments.length)]
  const rating = generatePerformanceRating()
  
  return {
    ...user,
    department,
    rating,
    bio: `Experienced ${department.toLowerCase()} professional with ${Math.floor(Math.random() * 10) + 1} years in the industry.`,
    projects: Math.floor(Math.random() * 15) + 1,
    completionRate: Math.floor(Math.random() * 30) + 70,
    lastActive: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString(),
  }
}

export function getRatingColor(rating) {
  if (rating >= 4.5) return 'text-green-500'
  if (rating >= 3.5) return 'text-yellow-500'  
  if (rating >= 2.5) return 'text-orange-500'
  return 'text-red-500'
}

export function getDepartmentColor(department) {
  const colors = {
    Engineering: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Marketing: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Sales: 'bg-green-500/10 text-green-400 border-green-500/20',
    HR: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    Finance: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    Operations: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    Design: 'bg-red-500/10 text-red-400 border-red-500/20',
    Product: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  }
  return colors[department] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'
} 