import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { User, Settings, LogOut } from 'lucide-react'

const ProfileSettings: React.FC = () => {
  const { user, signOut } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  const username = user?.user_metadata?.username || user?.email?.split('@')[0] || 'User'

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-8">
          <Settings className="h-8 w-8 text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        </div>

        <div className="space-y-6">
          {/* Profile Info */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Profile Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="text-gray-900 bg-gray-100 px-3 py-2 rounded-lg">
                  {username}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="text-gray-900 bg-gray-100 px-3 py-2 rounded-lg">
                  {user?.email}
                </div>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Account Actions
            </h2>
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {loading ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>

          {/* Learning Preferences - Placeholder */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Learning Preferences
            </h2>
            <p className="text-gray-600">
              Learning preferences settings will be available in a future update.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings