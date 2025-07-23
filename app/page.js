'use client'
import { useEffect } from 'react'
import { useApp } from '../context/AppContext'
import EmployeeCard from '../components/EmployeeCard'
import SearchAndFilter from '../components/SearchAndFilter'
import { useEmployees } from '../hooks/useEmployees'

export default function Dashboard() {
  const { 
    employees, 
    searchTerm, 
    filterDepartment, 
    filterRating,
    loading,
    error
  } = useApp()
  
  const { fetchEmployees, filteredEmployees } = useEmployees()

  useEffect(() => {
    fetchEmployees()
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <h3 className="text-red-800 dark:text-red-200 font-medium">Error loading employees</h3>
          <p className="text-red-600 dark:text-red-300 text-sm mt-1">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Employee Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and track employee performance across your organization
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total Employees: <span className="font-medium text-gray-900 dark:text-white">{employees.length}</span>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <SearchAndFilter />

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 dark:text-gray-500">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-lg font-medium mb-2">No employees found</h3>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 