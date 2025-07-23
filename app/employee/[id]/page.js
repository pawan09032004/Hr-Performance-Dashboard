'use client'
import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { useApp } from '../../../context/AppContext'
import EmployeeProfileHeader from '../../../components/EmployeeProfileHeader'
import EmployeeTabs from '../../../components/EmployeeTabs'

export default function EmployeeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { employees, loading: globalLoading } = useApp()
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const employeeId = parseInt(params.id)

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoading(true)
        setError(null)

        // First check if we have the employee in our global state
        const existingEmployee = employees.find(emp => emp.id === employeeId)
        
        if (existingEmployee) {
          // Enhance with additional mock data for detail view
          const enhancedEmployee = await enhanceEmployeeData(existingEmployee)
          setEmployee(enhancedEmployee)
        } else if (!globalLoading) {
          // If global loading is done and we still don't have the employee, fetch individually
          const response = await fetch(`https://dummyjson.com/users/${employeeId}`)
          
          if (!response.ok) {
            throw new Error('Employee not found')
          }
          
          const userData = await response.json()
          const enhancedEmployee = await enhanceEmployeeData(userData)
          setEmployee(enhancedEmployee)
        }
      } catch (err) {
        // Log error in production monitoring system
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (employeeId) {
      fetchEmployeeData()
    }
  }, [employeeId, employees, globalLoading, enhanceEmployeeData])

  // Enhanced mock data for detailed view
  const enhanceEmployeeData = useCallback(async (baseEmployee) => {
    const departments = [
      'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 
      'Operations', 'Design', 'Product', 'Legal', 'Support'
    ]
    
    const department = departments[baseEmployee.id % departments.length]
    const rating = Math.round((2 + (baseEmployee.id * 7) % 30 / 10) * 10) / 10

    return {
      ...baseEmployee,
      department,
      rating: Math.min(5.0, Math.max(2.0, rating)),
      // Additional mock data for detail view
      employeeId: `EMP-${String(baseEmployee.id).padStart(4, '0')}`,
      startDate: new Date(Date.now() - (baseEmployee.id * 30 + 365) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      salary: 45000 + (baseEmployee.id * 1500),
      manager: 'Sarah Johnson',
      team: `${department} Team Alpha`,
      location: `${baseEmployee.address?.city || 'New York'} Office`,
      performanceHistory: generatePerformanceHistory(baseEmployee.id),
      projects: generateProjects(baseEmployee.id),
      feedback: generateFeedback(baseEmployee.id),
      skills: generateSkills(department),
      bio: `Experienced ${department.toLowerCase()} professional with a passion for innovation and team collaboration. Consistently delivers high-quality results and mentors junior team members.`
    }
  }, [])

  const generatePerformanceHistory = (id) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months.map((month, index) => ({
      month,
      rating: Math.min(5, Math.max(2, 3 + Math.sin((id + index) * 0.5) * 1.5)),
      goals: Math.floor(Math.random() * 5) + 3,
      completed: Math.floor(Math.random() * 5) + 2
    }))
  }

  const generateProjects = (id) => {
    const projectTypes = ['Web Development', 'Mobile App', 'Data Analysis', 'Marketing Campaign', 'System Integration']
    const statuses = ['Completed', 'In Progress', 'Planning', 'On Hold']
    
    return Array.from({ length: 4 }, (_, index) => ({
      id: `PRJ-${id}-${index + 1}`,
      name: `${projectTypes[index % projectTypes.length]} ${index + 1}`,
      description: `Strategic project focused on improving team efficiency and customer satisfaction.`,
      status: statuses[index % statuses.length],
      progress: Math.floor(Math.random() * 100),
      startDate: new Date(Date.now() - (index + 1) * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + (4 - index) * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      team: ['John Doe', 'Jane Smith', 'Mike Johnson'].slice(0, Math.floor(Math.random() * 3) + 1)
    }))
  }

  const generateFeedback = (id) => {
    const feedbackTypes = ['Performance Review', 'Peer Feedback', '360 Review', 'Manager Check-in']
    const reviewers = ['Sarah Johnson', 'Mike Chen', 'Lisa Wang', 'David Brown']
    
    return Array.from({ length: 3 }, (_, index) => ({
      id: `FB-${id}-${index + 1}`,
      type: feedbackTypes[index % feedbackTypes.length],
      reviewer: reviewers[index % reviewers.length],
      date: new Date(Date.now() - (index + 1) * 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      rating: Math.min(5, Math.max(3, 4 + Math.sin(id + index) * 0.8)),
      comments: `Excellent performance and strong collaboration skills. Shows great initiative and consistently delivers quality work. Areas for growth include leadership development and strategic thinking.`,
      strengths: ['Problem Solving', 'Communication', 'Technical Skills'],
      improvements: ['Leadership', 'Time Management']
    }))
  }

  const generateSkills = (department) => {
    const skillSets = {
      Engineering: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
      Marketing: ['Content Strategy', 'SEO', 'Analytics', 'Social Media', 'Campaign Management'],
      Sales: ['CRM', 'Lead Generation', 'Negotiation', 'Customer Relations', 'Market Analysis'],
      HR: ['Recruitment', 'Employee Relations', 'Performance Management', 'Training', 'Compliance'],
      Finance: ['Financial Analysis', 'Budgeting', 'Excel', 'SAP', 'Risk Management'],
      Design: ['Figma', 'Adobe Creative Suite', 'UI/UX', 'Prototyping', 'User Research'],
      Product: ['Product Strategy', 'Roadmap Planning', 'User Stories', 'Analytics', 'A/B Testing']
    }
    
    return skillSets[department] || ['Communication', 'Problem Solving', 'Team Work', 'Leadership']
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, #06d6a0 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, #84cc16 0%, transparent 50%)`
          }}></div>
        </div>

        {/* Content */}
        <div className="relative px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-6 w-6 animate-spin text-lime-400" />
                <span className="text-gray-300">Loading employee details...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !employee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, #06d6a0 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, #84cc16 0%, transparent 50%)`
          }}></div>
        </div>

        {/* Content */}
        <div className="relative px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-md mx-auto text-center">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-pink-400/10 rounded-3xl blur-xl"></div>
                <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                  <h3 className="text-red-300 font-medium mb-2 text-xl">Employee Not Found</h3>
                  <p className="text-red-200/80 text-sm mb-6">
                    {error || 'The requested employee could not be found.'}
                  </p>
                  <Button onClick={() => router.push('/')} className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%),
                          radial-gradient(circle at 75% 75%, #06d6a0 0%, transparent 50%),
                          radial-gradient(circle at 50% 50%, #84cc16 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Content */}
      <div className="relative px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Back Button */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
          </div>

          {/* Employee Profile Header */}
          <EmployeeProfileHeader employee={employee} />

          {/* Tabbed Content */}
          <EmployeeTabs employee={employee} />
        </div>
      </div>
    </div>
  )
} 