'use client'
import { useState, useEffect } from 'react'
import { X, Trophy, CheckCircle } from 'lucide-react'
import { Button } from './button'

export default function CongratsAlert({ isVisible, onClose, employeeName }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShow(true)
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        handleClose()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  const handleClose = () => {
    setShow(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div className={`
      fixed top-4 right-4 z-50 max-w-md w-full mx-4 transition-all duration-300 transform
      ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
    `}>
      <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white p-4 rounded-lg shadow-lg border border-emerald-400/30">
        <div className="flex items-start space-x-3">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Trophy className="h-5 w-5 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <CheckCircle className="h-4 w-4 text-white" />
              <p className="text-sm font-semibold text-white">
                Promotion Successful!
              </p>
            </div>
            <p className="text-sm text-emerald-100">
              <span className="font-medium">{employeeName}</span> has been promoted! 🎉
            </p>
          </div>

          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="flex-shrink-0 h-6 w-6 text-white/80 hover:text-white hover:bg-white/20 rounded-md"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 