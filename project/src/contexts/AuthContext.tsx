import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  signUp: (email: string, password: string, username: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }).catch((error: unknown) => {
      console.warn('Supabase not configured:', error)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event: string, session: Session | null) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription?.unsubscribe?.()
  }, [])

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          },
        },
      })
      if (error) throw error
      
      // For demo mode, manually set the user and session
      if (data.user && data.session) {
        setUser(data.user)
        setSession(data.session)
      }
    } catch (error) {
      console.warn('Sign up failed:', error)
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      
      // For demo mode, manually set the user and session
      if (data.user && data.session) {
        setUser(data.user)
        setSession(data.session)
      }
    } catch (error) {
      console.warn('Sign in failed:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Clear user state
      setUser(null)
      setSession(null)
    } catch (error) {
      console.warn('Sign out failed:', error)
      throw error
    }
  }

  const value = {
    user,
    session,
    signUp,
    signIn,
    signOut,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}