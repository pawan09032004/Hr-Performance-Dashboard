'use client'
import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, LogIn, AlertCircle, CheckCircle } from 'lucide-react'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showDemo, setShowDemo] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      })

      if (result?.error) {
        setError('Invalid credentials. Please try again.')
      } else {
        // Wait for session to be established
        const session = await getSession()
        if (session) {
          router.push('/')
          router.refresh()
        }
      }
    } catch (error) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = (userType) => {
    if (userType === 'admin') {
      setFormData({
        email: 'admin@hrcompany.com',
        password: 'admin123'
      })
    } else {
      setFormData({
        email: 'manager@hrcompany.com', 
        password: 'manager123'
      })
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%),
                          radial-gradient(circle at 75% 75%, #06d6a0 0%, transparent 50%),
                          radial-gradient(circle at 50% 50%, #84cc16 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-2xl mb-4">
              <Lock className="w-8 h-8 text-black" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to access your HR Dashboard</p>
        </div>

        {/* Login Form */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-lime-400/10 to-emerald-400/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-300 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500 hover:text-gray-300 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 border border-red-500/20 rounded-xl p-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-lime-400 to-emerald-400 text-black font-semibold py-3 px-4 rounded-xl hover:from-lime-500 hover:to-emerald-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <button
                type="button"
                onClick={() => setShowDemo(!showDemo)}
                className="w-full text-sm text-gray-400 hover:text-gray-300 transition-colors flex items-center justify-center space-x-2"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Show Demo Credentials</span>
              </button>
              
              {showDemo && (
                <div className="mt-4 space-y-3">
                  <div className="bg-gray-800/30 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-white">Admin Account</h4>
                      <button
                        onClick={() => handleDemoLogin('admin')}
                        className="text-xs bg-lime-400/20 text-lime-400 px-2 py-1 rounded-lg hover:bg-lime-400/30 transition-colors"
                      >
                        Use
                      </button>
                    </div>
                    <p className="text-xs text-gray-400">admin@hrcompany.com / admin123</p>
                  </div>
                  
                  <div className="bg-gray-800/30 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-white">Manager Account</h4>
                      <button
                        onClick={() => handleDemoLogin('manager')}
                        className="text-xs bg-emerald-400/20 text-emerald-400 px-2 py-1 rounded-lg hover:bg-emerald-400/30 transition-colors"
                      >
                        Use
                      </button>
                    </div>
                    <p className="text-xs text-gray-400">manager@hrcompany.com / manager123</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Secure HR Dashboard • Built with Next.js & NextAuth.js
          </p>
        </div>
      </div>
    </div>
  )
} 