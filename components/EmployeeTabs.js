'use client'
import { useState } from 'react'
import { Card } from './ui/card'
import OverviewTab from './tabs/OverviewTab'
import ProjectsTab from './tabs/ProjectsTab'
import FeedbackTab from './tabs/FeedbackTab'

const tabs = [
  { id: 'overview', name: 'Overview', icon: '📊' },
  { id: 'projects', name: 'Projects', icon: '📁' },
  { id: 'feedback', name: 'Feedback', icon: '💬' }
]

export default function EmployeeTabs({ employee }) {
  const [activeTab, setActiveTab] = useState('overview')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab employee={employee} />
      case 'projects':
        return <ProjectsTab employee={employee} />
      case 'feedback':
        return <FeedbackTab employee={employee} />
      default:
        return <OverviewTab employee={employee} />
    }
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }
              `}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
              {tab.id === 'projects' && employee.projects && (
                <span className="ml-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-0.5 px-2 rounded-full text-xs">
                  {employee.projects.length}
                </span>
              )}
              {tab.id === 'feedback' && employee.feedback && (
                <span className="ml-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-0.5 px-2 rounded-full text-xs">
                  {employee.feedback.length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {renderTabContent()}
      </div>
    </div>
  )
} 