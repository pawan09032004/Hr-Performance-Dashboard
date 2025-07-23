'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  DollarSign,
  Building,
  User,
  Save,
  ArrowLeft,
  CheckCircle
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { useApp } from '../../context/AppContext'

const departments = [
  'Engineering', 'Marketing', 'Sales', 'Human Resources', 'Finance', 
  'Operations', 'Design', 'Product Management', 'Legal', 'Customer Support',
  'Data Science', 'DevOps', 'Quality Assurance', 'Business Development'
]

const jobTitlesByDepartment = {
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

export default function CreateEmployeePage() {
  const router = useRouter()
  const { employees, setEmployees } = useApp()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    department: '',
    jobTitle: '',
    salary: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    yearsExperience: '',
    manager: '',
    startDate: new Date().toISOString().split('T')[0]
  })

  const availableJobTitles = formData.department ? jobTitlesByDepartment[formData.department] || [] : []

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.age || formData.age < 18 || formData.age > 100) newErrors.age = 'Valid age is required (18-100)'
    if (!formData.department) newErrors.department = 'Department is required'
    if (!formData.jobTitle) newErrors.jobTitle = 'Job title is required'
    if (!formData.salary || formData.salary < 20000) newErrors.salary = 'Valid salary is required (min $20,000)'
    if (!formData.address.city.trim()) newErrors['address.city'] = 'City is required'
    if (!formData.address.state.trim()) newErrors['address.state'] = 'State is required'
    if (!formData.yearsExperience || formData.yearsExperience < 0) newErrors.yearsExperience = 'Years of experience is required'
    
    // Check if email already exists
    const emailExists = employees.some(emp => emp.email.toLowerCase() === formData.email.toLowerCase())
    if (emailExists) newErrors.email = 'Email already exists'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Create new employee object
      const newEmployee = {
        id: Math.max(...employees.map(emp => emp.id)) + 1,
        ...formData,
        age: parseInt(formData.age),
        salary: parseInt(formData.salary),
        yearsExperience: parseInt(formData.yearsExperience),
        rating: 3.0 + Math.random() * 2, // Random rating between 3-5
        status: 'Active',
        hireDate: formData.startDate,
        currentProjects: Math.floor(Math.random() * 3) + 1,
        completedProjects: 0,
        lastReviewDate: formData.startDate,
        nextReviewDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        image: `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=random`
      }
      
      // Add to employees list
      setEmployees([...employees, newEmployee])
      
      setSuccess(true)
      
      // Redirect after success
      setTimeout(() => {
        router.push('/')
      }, 2000)
      
    } catch (error) {
      console.error('Error creating employee:', error)
      setErrors({ submit: 'Failed to create employee. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-12">
              <div className="w-20 h-20 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Employee Created Successfully!</h2>
              <p className="text-gray-300 text-lg mb-6">
                {formData.firstName} {formData.lastName} has been added to the team.
              </p>
              <p className="text-gray-400">Redirecting to dashboard...</p>
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-lime-400/10 rounded-2xl">
                  <UserPlus className="w-8 h-8 text-lime-400" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-lime-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                    Add New Employee
                  </h1>
                  <p className="text-gray-400 text-lg">Create a new employee profile</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-lime-400/5 to-emerald-400/5 rounded-3xl blur-2xl"></div>
            <Card className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <User className="w-5 h-5 mr-2 text-lime-400" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-200"
                        placeholder="Enter first name"
                      />
                      {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-200"
                        placeholder="Enter last name"
                      />
                      {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-200"
                        placeholder="Enter email address"
                      />
                      {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-200"
                        placeholder="Enter phone number"
                      />
                      {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Age *
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        min="18"
                        max="100"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-200"
                        placeholder="Enter age"
                      />
                      {errors.age && <p className="text-red-400 text-sm mt-1">{errors.age}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Work Information */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-emerald-400" />
                    Work Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Building className="w-4 h-4 inline mr-1" />
                        Department *
                      </label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-200"
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                      {errors.department && <p className="text-red-400 text-sm mt-1">{errors.department}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Job Title *
                      </label>
                      <select
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        disabled={!formData.department}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-200 disabled:opacity-50"
                      >
                        <option value="">Select Job Title</option>
                        {availableJobTitles.map(title => (
                          <option key={title} value={title}>{title}</option>
                        ))}
                      </select>
                      {errors.jobTitle && <p className="text-red-400 text-sm mt-1">{errors.jobTitle}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <DollarSign className="w-4 h-4 inline mr-1" />
                        Annual Salary *
                      </label>
                      <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        min="20000"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-200"
                        placeholder="Enter annual salary"
                      />
                      {errors.salary && <p className="text-red-400 text-sm mt-1">{errors.salary}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Years of Experience *
                      </label>
                      <input
                        type="number"
                        name="yearsExperience"
                        value={formData.yearsExperience}
                        onChange={handleChange}
                        min="0"
                        max="50"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-200"
                        placeholder="Enter years of experience"
                      />
                      {errors.yearsExperience && <p className="text-red-400 text-sm mt-1">{errors.yearsExperience}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Manager
                      </label>
                      <input
                        type="text"
                        name="manager"
                        value={formData.manager}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-200"
                        placeholder="Enter manager name (optional)"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-green-400" />
                    Address Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-200"
                        placeholder="Enter street address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-200"
                        placeholder="Enter city"
                      />
                      {errors['address.city'] && <p className="text-red-400 text-sm mt-1">{errors['address.city']}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-200"
                        placeholder="Enter state"
                      />
                      {errors['address.state'] && <p className="text-red-400 text-sm mt-1">{errors['address.state']}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="address.zipCode"
                        value={formData.address.zipCode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-200"
                        placeholder="Enter ZIP code"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4">
                    <p className="text-red-400 text-sm">{errors.submit}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700/50">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="px-8"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-lime-400 to-emerald-400 text-black font-semibold px-8 hover:from-lime-500 hover:to-emerald-500 transition-all duration-200 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                        <span>Creating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Save className="w-4 h-4" />
                        <span>Create Employee</span>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 