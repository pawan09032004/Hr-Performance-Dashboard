'use client'
import { useEffect, useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import { TrendingUp, Users, Star, Bookmark, BarChart3, PieChart, Activity, Award } from 'lucide-react'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function AnalyticsPage() {
  const { employees, bookmarkedEmployees } = useApp()
  const [timeRange, setTimeRange] = useState('6months')
  const [selectedMetric, setSelectedMetric] = useState('performance')

  // Calculate department statistics
  const departmentStats = useMemo(() => {
    const stats = {}
    employees.forEach(emp => {
      if (!stats[emp.department]) {
        stats[emp.department] = {
          count: 0,
          totalRating: 0,
          bookmarked: 0,
          topPerformers: 0
        }
      }
      stats[emp.department].count += 1
      stats[emp.department].totalRating += emp.rating
      if (bookmarkedEmployees.includes(emp.id)) {
        stats[emp.department].bookmarked += 1
      }
      if (emp.rating >= 4.5) {
        stats[emp.department].topPerformers += 1
      }
    })

    return Object.entries(stats).map(([dept, data]) => ({
      department: dept,
      avgRating: (data.totalRating / data.count).toFixed(2),
      employeeCount: data.count,
      bookmarked: data.bookmarked,
      topPerformers: data.topPerformers,
      bookmarkRate: ((data.bookmarked / data.count) * 100).toFixed(1)
    }))
  }, [employees, bookmarkedEmployees])

  // Performance distribution data
  const performanceDistribution = useMemo(() => {
    const distribution = { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 }
    employees.forEach(emp => {
      const rating = Math.floor(emp.rating)
      distribution[rating] = (distribution[rating] || 0) + 1
    })
    return distribution
  }, [employees])

  // Generate mock historical data for trends
  const generateTrendData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    return months.map((month, index) => ({
      month,
      avgPerformance: 3.5 + Math.sin(index * 0.5) * 0.5 + Math.random() * 0.3,
      bookmarks: Math.floor(Math.random() * 5) + index * 2 + 3,
      newHires: Math.floor(Math.random() * 3) + 1
    }))
  }

  const trendData = useMemo(() => generateTrendData(), [])

  // Chart configurations
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e5e7eb',
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#f3f4f6',
        bodyColor: '#e5e7eb',
        borderColor: '#374151',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(75, 85, 99, 0.3)' }
      },
      y: {
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(75, 85, 99, 0.3)' }
      }
    }
  }

  // Department Performance Chart
  const departmentChartData = {
    labels: departmentStats.map(stat => stat.department),
    datasets: [
      {
        label: 'Average Rating',
        data: departmentStats.map(stat => parseFloat(stat.avgRating)),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'Employee Count',
        data: departmentStats.map(stat => stat.employeeCount),
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        yAxisID: 'y1',
      }
    ]
  }

  const departmentChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: { color: '#9ca3af' },
        grid: { drawOnChartArea: false, color: 'rgba(75, 85, 99, 0.3)' }
      }
    }
  }

  // Performance Distribution Chart
  const distributionChartData = {
    labels: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'],
    datasets: [{
      data: Object.values(performanceDistribution).reverse(),
      backgroundColor: [
        'rgba(239, 68, 68, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(168, 85, 247, 0.8)'
      ],
      borderColor: [
        'rgba(239, 68, 68, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(34, 197, 94, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(168, 85, 247, 1)'
      ],
      borderWidth: 2
    }]
  }

  // Trend Chart
  const trendChartData = {
    labels: trendData.map(data => data.month),
    datasets: [
      {
        label: 'Avg Performance',
        data: trendData.map(data => data.avgPerformance),
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
        pointBorderColor: '#1f2937',
        pointBorderWidth: 2,
        pointRadius: 6
      },
      {
        label: 'Bookmarks',
        data: trendData.map(data => data.bookmarks),
        borderColor: 'rgba(251, 191, 36, 1)',
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(251, 191, 36, 1)',
        pointBorderColor: '#1f2937',
        pointBorderWidth: 2,
        pointRadius: 6,
        yAxisID: 'y1'
      }
    ]
  }

  const trendChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: { color: '#9ca3af' },
        grid: { drawOnChartArea: false, color: 'rgba(75, 85, 99, 0.3)' }
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, #06d6a0 0%, transparent 50%)`
          }}></div>
        </div>
        
        <div className="relative px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">
                <span className="text-white">Analytics</span>
                <br />
                <span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Comprehensive insights into team performance, trends, and organizational metrics
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-emerald-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-lime-400/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-lime-400/10 rounded-xl">
                      <Users className="w-6 h-6 text-lime-400" />
                    </div>
                    <span className="text-2xl">👥</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{employees.length}</h3>
                  <p className="text-gray-400 text-sm">Total Employees</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-emerald-400/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-emerald-400/10 rounded-xl">
                      <Star className="w-6 h-6 text-emerald-400" />
                    </div>
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {employees.length > 0 ? (employees.reduce((sum, emp) => sum + emp.rating, 0) / employees.length).toFixed(1) : 0}
                  </h3>
                  <p className="text-gray-400 text-sm">Average Rating</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-lime-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-yellow-400/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-yellow-400/10 rounded-xl">
                      <Bookmark className="w-6 h-6 text-yellow-400" />
                    </div>
                    <span className="text-2xl">📌</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{bookmarkedEmployees.length}</h3>
                  <p className="text-gray-400 text-sm">Bookmarked</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-400/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-400/10 rounded-xl">
                      <Award className="w-6 h-6 text-purple-400" />
                    </div>
                    <span className="text-2xl">🏆</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {employees.filter(emp => emp.rating >= 4.5).length}
                  </h3>
                  <p className="text-gray-400 text-sm">Top Performers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="px-6 pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Department Performance Chart */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-lime-400/5 to-emerald-400/5 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-lime-400/10 rounded-xl">
                    <BarChart3 className="w-6 h-6 text-lime-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Department Performance</h3>
                    <p className="text-gray-400">Average ratings and employee count by department</p>
                  </div>
                </div>
              </div>
              <div className="h-96">
                <Bar data={departmentChartData} options={departmentChartOptions} />
              </div>
            </div>
          </div>

          {/* Row with 3 charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Performance Distribution */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-purple-400/10 rounded-xl">
                    <PieChart className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Performance Distribution</h3>
                    <p className="text-gray-400 text-sm">Rating breakdown</p>
                  </div>
                </div>
                <div className="h-64">
                  <Doughnut data={distributionChartData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Trends Chart */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-green-400/5 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-emerald-400/10 rounded-xl">
                    <Activity className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Performance Trends</h3>
                    <p className="text-gray-400 text-sm">6-month overview</p>
                  </div>
                </div>
                <div className="h-64">
                  <Line data={trendChartData} options={trendChartOptions} />
                </div>
              </div>
            </div>

            {/* Bookmark Rate Bar Chart */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-orange-400/5 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-yellow-400/10 rounded-xl">
                    <TrendingUp className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Bookmark Rates</h3>
                    <p className="text-gray-400 text-sm">By department</p>
                  </div>
                </div>
                <div className="h-64">
                  <Bar 
                    data={{
                      labels: departmentStats.map(stat => stat.department),
                      datasets: [{
                        label: 'Bookmark Rate (%)',
                        data: departmentStats.map(stat => parseFloat(stat.bookmarkRate)),
                        backgroundColor: 'rgba(251, 191, 36, 0.8)',
                        borderColor: 'rgba(251, 191, 36, 1)',
                        borderWidth: 2,
                        borderRadius: 8,
                        borderSkipped: false,
                      }]
                    }} 
                    options={{
                      ...chartOptions,
                      indexAxis: 'y',
                      scales: {
                        x: {
                          ticks: { color: '#9ca3af' },
                          grid: { color: 'rgba(75, 85, 99, 0.3)' }
                        },
                        y: {
                          ticks: { color: '#9ca3af' },
                          grid: { color: 'rgba(75, 85, 99, 0.3)' }
                        }
                      }
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Department Stats Table */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-indigo-400/5 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Department Statistics</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-4 px-4 text-gray-300 font-semibold">Department</th>
                      <th className="text-center py-4 px-4 text-gray-300 font-semibold">Employees</th>
                      <th className="text-center py-4 px-4 text-gray-300 font-semibold">Avg Rating</th>
                      <th className="text-center py-4 px-4 text-gray-300 font-semibold">Bookmarked</th>
                      <th className="text-center py-4 px-4 text-gray-300 font-semibold">Top Performers</th>
                      <th className="text-center py-4 px-4 text-gray-300 font-semibold">Bookmark Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentStats.map((stat, index) => (
                      <tr key={stat.department} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-4 px-4">
                          <span className="text-white font-medium">{stat.department}</span>
                        </td>
                        <td className="text-center py-4 px-4 text-gray-300">{stat.employeeCount}</td>
                        <td className="text-center py-4 px-4">
                          <span className="text-emerald-400 font-semibold">{stat.avgRating}</span>
                        </td>
                        <td className="text-center py-4 px-4 text-yellow-400">{stat.bookmarked}</td>
                        <td className="text-center py-4 px-4 text-purple-400">{stat.topPerformers}</td>
                        <td className="text-center py-4 px-4">
                          <span className="text-lime-400 font-semibold">{stat.bookmarkRate}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 