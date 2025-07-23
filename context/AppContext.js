'use client'
import { createContext, useContext, useReducer, useEffect } from 'react'

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

  const value = {
    ...state,
    dispatch,
    // Action creators
    setEmployees: (employees) => dispatch({ type: 'SET_EMPLOYEES', payload: employees }),
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    setSearchTerm: (term) => dispatch({ type: 'SET_SEARCH_TERM', payload: term }),
    setFilterDepartment: (dept) => dispatch({ type: 'SET_FILTER_DEPARTMENT', payload: dept }),
    setFilterRating: (rating) => dispatch({ type: 'SET_FILTER_RATING', payload: rating }),
    toggleBookmark: (id) => dispatch({ type: 'TOGGLE_BOOKMARK', payload: id }),
    toggleDarkMode: () => dispatch({ type: 'TOGGLE_DARK_MODE' }),
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
} 