'use client'
import { TrendingUp, Target, Award, Clock } from 'lucide-react'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'

export default function OverviewTab({ employee }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (rating) => {
    if (rating >= 4.5) return 'bg-green-500'
    if (rating >= 3.5) return 'bg-blue-500'
    if (rating >= 2.5) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const totalGoals = employee.performanceHistory?.reduce((sum, month) => sum + month.goals, 0) || 0
  const completedGoals = employee.performanceHistory?.reduce((sum, month) => sum + month.completed, 0) || 0
  const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Performance Overview Cards */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Rating</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{employee.rating}/5</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Goal Completion</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{completionRate}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Projects</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{employee.projects?.length || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Years at Company</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {Math.round((Date.now() - new Date(employee.startDate)) / (365 * 24 * 60 * 60 * 1000))}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance History */}
      <div className="lg:col-span-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance History (Last 12 Months)
          </h3>
          <div className="space-y-4">
            {employee.performanceHistory?.map((month, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="text-sm font-medium text-gray-900 dark:text-white w-8">
                    {month.month}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getStatusColor(month.rating)}`}
                          style={{ width: `${(month.rating / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {month.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {month.completed}/{month.goals} goals
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div>
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">Completed Q4 Performance Review</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(employee.feedback?.[0]?.date || new Date())}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">Started new project assignment</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(employee.projects?.[0]?.startDate || new Date())}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">Attended team training session</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2 weeks ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">Received peer recognition</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">3 weeks ago</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Goals & Achievements */}
        <Card className="p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Goals</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-900 dark:text-white">Q1 Sales Target</span>
              <Badge variant="secondary">In Progress</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-900 dark:text-white">Leadership Training</span>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                Completed
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-900 dark:text-white">Team Mentoring</span>
              <Badge variant="secondary">Ongoing</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 