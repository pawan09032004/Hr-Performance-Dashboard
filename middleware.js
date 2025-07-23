import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // This function will only be called if the user is authenticated
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Return true if user should be allowed to access the page
        const { pathname } = req.nextUrl
        
        // Allow access to login page and API routes
        if (pathname.startsWith('/login') || pathname.startsWith('/api/auth')) {
          return true
        }
        
        // Require authentication for all other pages
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api routes (authentication)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 