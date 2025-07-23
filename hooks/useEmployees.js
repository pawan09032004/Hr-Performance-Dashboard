import { useMemo } from 'react'
import { useApp } from '../context/AppContext'

const departments = [
  'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 
  'Operations', 'Design', 'Product', 'Legal', 'Support'
]

const generateMockData = (user) => {
  // Generate consistent department based on user ID
  const department = departments[user.id % departments.length]
  
  // Generate performance rating (2.0 - 5.0)
  const rating = Math.round((2 + (user.id * 7) % 30 / 10) * 10) / 10
  
  return {
    ...user,
    department,
    rating: Math.min(5.0, Math.max(2.0, rating))
  }
}

export function useEmployees() {
  const { 
    employees, 
    setEmployees, 
    setLoading, 
    setError,
    searchTerm,
    filterDepartment,
    filterRating
  } = useApp()

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('https://dummyjson.com/users?limit=20')
      if (!response.ok) {
        throw new Error('Failed to fetch employees')
      }
      
      const data = await response.json()
      const enhancedEmployees = data.users.map(generateMockData)
      
      setEmployees(enhancedEmployees)
    } catch (error) {
      console.error('Error fetching employees:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredEmployees = useMemo(() => {
    let filtered = [...employees]

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(employee => 
        employee.firstName.toLowerCase().includes(term) ||
        employee.lastName.toLowerCase().includes(term) ||
        employee.email.toLowerCase().includes(term) ||
        employee.department.toLowerCase().includes(term)
      )
    }

    // Department filter
    if (filterDepartment) {
      filtered = filtered.filter(employee => 
        employee.department === filterDepartment
      )
    }

    // Rating filter
    if (filterRating) {
      const rating = parseFloat(filterRating)
      filtered = filtered.filter(employee => 
        Math.floor(employee.rating) === rating
      )
    }

    return filtered
  }, [employees, searchTerm, filterDepartment, filterRating])

  return {
    fetchEmployees,
    filteredEmployees,
    departments: [...new Set(employees.map(emp => emp.department))].sort()
  }
} 