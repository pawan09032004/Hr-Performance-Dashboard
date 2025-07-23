import { useMemo, useCallback } from 'react'
import { useApp } from '../context/AppContext'

const departments = [
  'Engineering', 'Marketing', 'Sales', 'Human Resources', 'Finance', 
  'Operations', 'Design', 'Product Management', 'Legal', 'Customer Support',
  'Data Science', 'DevOps', 'Quality Assurance', 'Business Development'
]

const jobTitles = {
  'Engineering': ['Software Engineer', 'Senior Developer', 'Tech Lead', 'Frontend Developer', 'Backend Developer'],
  'Marketing': ['Marketing Manager', 'Content Strategist', 'SEO Specialist', 'Brand Manager', 'Digital Marketer'],
  'Sales': ['Sales Representative', 'Account Manager', 'Sales Director', 'Business Development Manager'],
  'Human Resources': ['HR Manager', 'Recruiter', 'HR Business Partner', 'Talent Acquisition Specialist'],
  'Finance': ['Financial Analyst', 'Accountant', 'Finance Manager', 'Controller', 'Treasury Analyst'],
  'Operations': ['Operations Manager', 'Process Analyst', 'Supply Chain Manager', 'Logistics Coordinator'],
  'Design': ['UI/UX Designer', 'Graphic Designer', 'Product Designer', 'Creative Director'],
  'Product Management': ['Product Manager', 'Product Owner', 'Senior Product Manager', 'Product Analyst'],
  'Legal': ['Legal Counsel', 'Compliance Officer', 'Contract Manager', 'Legal Assistant'],
  'Customer Support': ['Support Specialist', 'Customer Success Manager', 'Support Team Lead'],
  'Data Science': ['Data Scientist', 'Data Analyst', 'ML Engineer', 'Data Engineer'],
  'DevOps': ['DevOps Engineer', 'Site Reliability Engineer', 'Cloud Architect', 'Infrastructure Engineer'],
  'Quality Assurance': ['QA Engineer', 'Test Automation Engineer', 'QA Manager', 'Manual Tester'],
  'Business Development': ['BD Manager', 'Partnership Manager', 'Strategic Analyst', 'Growth Manager']
}

const generateMockData = (user) => {
  // Generate consistent department based on user ID
  const department = departments[user.id % departments.length]
  
  // Generate job title based on department
  const titles = jobTitles[department] || ['Specialist']
  const jobTitle = titles[user.id % titles.length]
  
  // Generate performance rating (2.0 - 5.0) with more realistic distribution
  const baseRating = 2.5 + (user.id * 13) % 25 / 10
  const rating = Math.round(baseRating * 10) / 10
  
  // Generate years of experience
  const yearsExperience = 1 + (user.id * 3) % 15
  
  // Generate salary range based on role and experience
  const baseSalary = 40000 + (yearsExperience * 5000) + (user.id % 20000)
  const salary = Math.round(baseSalary / 1000) * 1000
  
  // Generate employee status
  const statuses = ['Active', 'Active', 'Active', 'Active', 'On Leave', 'Remote']
  const status = statuses[user.id % statuses.length]
  
  // Generate hire date (within last 5 years)
  const hireDate = new Date()
  hireDate.setFullYear(hireDate.getFullYear() - (user.id % 5))
  hireDate.setMonth(user.id % 12)
  hireDate.setDate((user.id % 28) + 1)
  
  return {
    ...user,
    department,
    jobTitle,
    rating: Math.min(5.0, Math.max(2.0, rating)),
    yearsExperience,
    salary,
    status,
    hireDate: hireDate.toISOString().split('T')[0],
    // Generate some project history
    currentProjects: Math.floor(Math.random() * 3) + 1,
    completedProjects: Math.floor(Math.random() * 10) + user.id % 5,
    // Performance metrics
    lastReviewDate: new Date(Date.now() - (user.id % 90) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    nextReviewDate: new Date(Date.now() + (90 - (user.id % 90)) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
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

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('https://dummyjson.com/users?limit=24')
      if (!response.ok) {
        throw new Error('Failed to fetch employees')
      }
      
      const data = await response.json()
      const enhancedEmployees = data.users.map(generateMockData)
      
      setEmployees(enhancedEmployees)
    } catch (error) {
      // Log error in production monitoring system
      setError(error.message)
      
      // Fallback to mock data if API fails
      const fallbackEmployees = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        firstName: `Employee`,
        lastName: `${index + 1}`,
        email: `employee${index + 1}@company.com`,
        phone: `+1 (555) ${String(index + 100).padStart(3, '0')}-${String(index + 1000).padStart(4, '0')}`,
        age: 25 + (index % 15),
        address: {
          city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][index % 5],
          state: ['NY', 'CA', 'IL', 'TX', 'AZ'][index % 5]
        }
      })).map(generateMockData)
      
      setEmployees(fallbackEmployees)
    } finally {
      setLoading(false)
    }
  }, [setEmployees, setLoading, setError])

  const filteredEmployees = useMemo(() => {
    let filtered = [...employees]

    // Search filter - now includes job title
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(employee => 
        employee.firstName.toLowerCase().includes(term) ||
        employee.lastName.toLowerCase().includes(term) ||
        employee.email.toLowerCase().includes(term) ||
        employee.department.toLowerCase().includes(term) ||
        employee.jobTitle.toLowerCase().includes(term)
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

  // Get unique departments from actual employee data
  const availableDepartments = useMemo(() => {
    return [...new Set(employees.map(emp => emp.department))].sort()
  }, [employees])

  // Get performance statistics
  const performanceStats = useMemo(() => {
    if (employees.length === 0) return {}
    
    const ratings = employees.map(emp => emp.rating)
    const avgRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
    const topPerformers = employees.filter(emp => emp.rating >= 4.5).length
    const needsImprovement = employees.filter(emp => emp.rating < 3.0).length
    
    return {
      averageRating: Math.round(avgRating * 10) / 10,
      topPerformers,
      needsImprovement,
      totalEmployees: employees.length
    }
  }, [employees])

  return {
    fetchEmployees,
    filteredEmployees,
    departments: availableDepartments,
    performanceStats,
    // Helper functions
    getEmployeeById: (id) => employees.find(emp => emp.id === parseInt(id)),
    getDepartmentEmployees: (department) => employees.filter(emp => emp.department === department)
  }
} 