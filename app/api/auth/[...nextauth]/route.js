import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// Demo users for authentication
const demoUsers = [
  {
    id: '1',
    email: 'admin@hrcompany.com',
    password: 'admin123',
    name: 'HR Admin',
    role: 'admin'
  },
  {
    id: '2', 
    email: 'manager@hrcompany.com',
    password: 'manager123',
    name: 'HR Manager',
    role: 'manager'
  }
]

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = demoUsers.find(
          user => user.email === credentials.email && user.password === credentials.password
        )

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          }
        }

        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
      }
      return session
    }
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-demo'
})

export { handler as GET, handler as POST } 