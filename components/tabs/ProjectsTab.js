'use client'
import { Calendar, Users, TrendingUp, Clock, CheckCircle, AlertCircle, Pause, Play } from 'lucide-react'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export default function ProjectsTab({ employee }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'In Progress':
        return <Play className="h-4 w-4 text-blue-500" />
      case 'On Hold':
        return <Pause className="h-4 w-4 text-yellow-500" />
      case 'Planning':
        return <Clock className="h-4 w-4 text-gray-400" />
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
      case 'Planning':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
      default:
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
    }
  }

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-blue-500'
    if (progress >= 25) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  if (!employee.projects || employee.projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-500">
          <Calendar className="mx-auto h-12 w-12 mb-4" />
          <h3 className="text-lg font-medium mb-2">No Projects Assigned</h3>
          <p className="text-sm">This employee is not currently assigned to any projects.</p>
        </div>
      </div>
    )
  }

  // Group projects by status
  const projectsByStatus = employee.projects.reduce((acc, project) => {
    if (!acc[project.status]) {
      acc[project.status] = []
    }
    acc[project.status].push(project)
    return acc
  }, {})

  const statusOrder = ['In Progress', 'Planning', 'On Hold', 'Completed']

  return (
    <div className="space-y-6">
      {/* Project Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Play className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-400">Active Projects</p>
              <p className="text-2xl font-semibold text-white">
                {employee.projects.filter(p => p.status === 'In Progress').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-400">Completed</p>
              <p className="text-2xl font-semibold text-white">
                {employee.projects.filter(p => p.status === 'Completed').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <Pause className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-400">On Hold</p>
              <p className="text-2xl font-semibold text-white">
                {employee.projects.filter(p => p.status === 'On Hold').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-400">Avg. Progress</p>
              <p className="text-2xl font-semibold text-white">
                {Math.round(employee.projects.reduce((sum, p) => sum + p.progress, 0) / employee.projects.length)}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Projects by Status */}
      {statusOrder.map(status => {
        const projects = projectsByStatus[status]
        if (!projects || projects.length === 0) return null

        return (
          <div key={status}>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              {getStatusIcon(status)}
              <span className="ml-2">{status} Projects ({projects.length})</span>
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {project.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        Project ID: {project.id}
                      </p>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>

                                      <p className="text-gray-300 text-sm mb-4">
                    {project.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">
                        Progress
                      </span>
                      <span className="text-sm text-gray-300">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-300">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span>
                        {formatDate(project.startDate)} - {formatDate(project.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      <span>Team: {project.team.join(', ')}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    {project.status === 'In Progress' && (
                      <Button size="sm" className="flex-1">
                        Update Progress
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )
      })}

      {/* Quick Actions */}
      <Card className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm">
            Assign New Project
          </Button>
          <Button variant="outline" size="sm">
            Generate Report
          </Button>
          <Button variant="outline" size="sm">
            Schedule Review
          </Button>
          <Button variant="outline" size="sm">
            Export Data
          </Button>
        </div>
      </Card>
    </div>
  )
} 