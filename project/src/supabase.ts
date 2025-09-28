import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Create a mock Supabase client for development when credentials are not available
const createMockSupabaseClient = () => {
  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: (credentials: { email: string; password: string; options?: { data?: { username?: string } } }) => {
        // Simulate successful signup in demo mode
        const mockUser = {
          id: 'demo-user-' + Date.now(),
          email: credentials.email,
          user_metadata: {
            username: credentials.options?.data?.username || credentials.email.split('@')[0]
          }
        }
        const mockSession = {
          user: mockUser,
          access_token: 'demo-token',
          refresh_token: 'demo-refresh-token'
        }
        return Promise.resolve({ 
          data: { user: mockUser, session: mockSession }, 
          error: null 
        })
      },
      signInWithPassword: (credentials: { email: string; password: string }) => {
        // Simulate successful signin in demo mode
        const mockUser = {
          id: 'demo-user-' + Date.now(),
          email: credentials.email,
          user_metadata: {
            username: credentials.email.split('@')[0]
          }
        }
        const mockSession = {
          user: mockUser,
          access_token: 'demo-token',
          refresh_token: 'demo-refresh-token'
        }
        return Promise.resolve({ 
          data: { user: mockUser, session: mockSession }, 
          error: null 
        })
      },
      signOut: () => Promise.resolve({ error: null })
    }
  }
}

// Check if we have real Supabase credentials
const hasValidCredentials = supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key'

export const supabase = hasValidCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockSupabaseClient() as unknown as ReturnType<typeof createClient>