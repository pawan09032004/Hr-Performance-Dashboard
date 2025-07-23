'use client'
import { useState } from 'react'
import { Star, MessageCircle, ThumbsUp, ThumbsDown, Calendar, User, Send, Plus } from 'lucide-react'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export default function FeedbackTab({ employee }) {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [newFeedback, setNewFeedback] = useState({
    type: 'Performance Review',
    rating: 5,
    comments: '',
    strengths: '',
    improvements: ''
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-500'
        }`}
      />
    ))
  }

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
    if (rating >= 3.5) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
    if (rating >= 2.5) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
    return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'Performance Review':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
      case 'Peer Feedback':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
      case '360 Review':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
      case 'Manager Check-in':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
    }
  }

  const handleSubmitFeedback = (e) => {
    e.preventDefault()
    // Here you would typically submit to an API
    console.log('Submitting feedback:', newFeedback)
    setShowFeedbackForm(false)
    setNewFeedback({
      type: 'Performance Review',
      rating: 5,
      comments: '',
      strengths: '',
      improvements: ''
    })
  }

  if (!employee.feedback || employee.feedback.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500">
            <MessageCircle className="mx-auto h-12 w-12 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Feedback Available</h3>
            <p className="text-sm mb-4">Be the first to provide feedback for this employee.</p>
            <Button onClick={() => setShowFeedbackForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Feedback
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const averageRating = employee.feedback.reduce((sum, feedback) => sum + feedback.rating, 0) / employee.feedback.length

  return (
    <div className="space-y-6">
      {/* Feedback Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-400">Average Rating</p>
              <p className="text-2xl font-semibold text-white">
                {averageRating.toFixed(1)}/5
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-400">Total Reviews</p>
              <p className="text-2xl font-semibold text-white">
                {employee.feedback.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <ThumbsUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-400">Positive Reviews</p>
              <p className="text-2xl font-semibold text-white">
                {employee.feedback.filter(f => f.rating >= 4).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Add Feedback Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">
          Recent Feedback & Reviews
        </h3>
        <Button onClick={() => setShowFeedbackForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Feedback
        </Button>
      </div>

      {/* Feedback Form */}
      {showFeedbackForm && (
        <Card className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Provide Feedback
          </h4>
          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Feedback Type
                </label>
                <select
                  value={newFeedback.type}
                  onChange={(e) => setNewFeedback({...newFeedback, type: e.target.value})}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option>Performance Review</option>
                  <option>Peer Feedback</option>
                  <option>360 Review</option>
                  <option>Manager Check-in</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Overall Rating
                </label>
                <select
                  value={newFeedback.rating}
                  onChange={(e) => setNewFeedback({...newFeedback, rating: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Good</option>
                  <option value={3}>3 - Average</option>
                  <option value={2}>2 - Below Average</option>
                  <option value={1}>1 - Poor</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Comments
              </label>
              <textarea
                value={newFeedback.comments}
                onChange={(e) => setNewFeedback({...newFeedback, comments: e.target.value})}
                rows={4}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Provide detailed feedback about performance, achievements, and observations..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Strengths
                </label>
                <textarea
                  value={newFeedback.strengths}
                  onChange={(e) => setNewFeedback({...newFeedback, strengths: e.target.value})}
                  rows={3}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="What are their key strengths?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Areas for Improvement
                </label>
                <textarea
                  value={newFeedback.improvements}
                  onChange={(e) => setNewFeedback({...newFeedback, improvements: e.target.value})}
                  rows={3}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="What areas could be improved?"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <Button type="submit">
                <Send className="h-4 w-4 mr-2" />
                Submit Feedback
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowFeedbackForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Feedback List */}
      <div className="space-y-4">
        {employee.feedback.map((feedback) => (
          <Card key={feedback.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    {feedback.reviewer}
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(feedback.date)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getTypeColor(feedback.type)}>
                  {feedback.type}
                </Badge>
                <Badge className={getRatingColor(feedback.rating)}>
                  {feedback.rating}/5
                </Badge>
              </div>
            </div>

            {/* Rating Display */}
            <div className="flex items-center space-x-2 mb-4">
              {renderStars(Math.floor(feedback.rating))}
              <span className="text-sm text-gray-300">
                ({feedback.rating} out of 5)
              </span>
            </div>

            {/* Comments */}
            <div className="mb-4">
              <p className="text-gray-300 leading-relaxed">
                {feedback.comments}
              </p>
            </div>

            {/* Strengths and Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-white mb-2 flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-2 text-green-500" />
                  Strengths
                </h5>
                <div className="space-y-1">
                  {feedback.strengths.map((strength, index) => (
                    <Badge key={index} variant="secondary" className="mr-1 mb-1">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-medium text-white mb-2 flex items-center">
                  <ThumbsDown className="h-4 w-4 mr-2 text-orange-500" />
                  Areas for Improvement
                </h5>
                <div className="space-y-1">
                  {feedback.improvements.map((improvement, index) => (
                    <Badge key={index} variant="outline" className="mr-1 mb-1">
                      {improvement}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 