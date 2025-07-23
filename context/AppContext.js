'use client'
import { createContext, useContext, useReducer, useEffect, useMemo } from 'react'

const AppContext = createContext()

// Initial state
const initialState = {
  employees: [],
  bookmarkedEmployees: [],
  searchTerm: '',
  filterDepartment: '',
  filterRating: '',
  darkMode: false,
  loading: false,
  error: null,
  notifications: [
    {
      id: 1,
      title: "New Employee Onboarded",
      message: "Sarah Johnson has joined the Marketing team",
      time: "2 minutes ago",
      type: "success",
      read: false
    },
    {
      id: 2,
      title: "Performance Review Due",
      message: "3 employees need their quarterly reviews completed",
      time: "1 hour ago",
      type: "warning",
      read: false
    },
    {
      id: 3,
      title: "Team Meeting Reminder",
      message: "Weekly standup meeting starts in 30 minutes",
      time: "3 hours ago",
      type: "info",
      read: false
    }
  ]
}

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case 'SET_EMPLOYEES':
      return { ...state, employees: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload }
    case 'SET_FILTER_DEPARTMENT':
      return { ...state, filterDepartment: action.payload }
    case 'SET_FILTER_RATING':
      return { ...state, filterRating: action.payload }
    case 'TOGGLE_BOOKMARK':
      const employeeId = action.payload
      const isBookmarked = state.bookmarkedEmployees.includes(employeeId)
      return {
        ...state,
        bookmarkedEmployees: isBookmarked
          ? state.bookmarkedEmployees.filter(id => id !== employeeId)
          : [...state.bookmarkedEmployees, employeeId]
      }
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode }
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        )
      }
    case 'MARK_ALL_NOTIFICATIONS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          read: true
        }))
      }
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload)
      }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Dark mode effect
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [state.darkMode])

  // Memoize action creators to prevent unnecessary re-renders
  const actions = useMemo(() => ({
    setEmployees: (employees) => dispatch({ type: 'SET_EMPLOYEES', payload: employees }),
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    setSearchTerm: (term) => dispatch({ type: 'SET_SEARCH_TERM', payload: term }),
    setFilterDepartment: (dept) => dispatch({ type: 'SET_FILTER_DEPARTMENT', payload: dept }),
    setFilterRating: (rating) => dispatch({ type: 'SET_FILTER_RATING', payload: rating }),
    toggleBookmark: (id) => dispatch({ type: 'TOGGLE_BOOKMARK', payload: id }),
    toggleDarkMode: () => dispatch({ type: 'TOGGLE_DARK_MODE' }),
    markNotificationRead: (id) => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id }),
    markAllNotificationsRead: () => dispatch({ type: 'MARK_ALL_NOTIFICATIONS_READ' }),
    removeNotification: (id) => dispatch({ type: 'REMOVE_NOTIFICATION', payload: id }),
  }), [])

  const value = useMemo(() => ({
    ...state,
    dispatch,
    ...actions
  }), [state, actions])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
} 