import React from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'

interface HeaderProps {
  className?: string
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const { user, isAuthenticated, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-surface border-b border-gray-700 shadow-lg ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
            className="flex items-center"
          >
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">
                Nightapp V3
              </h1>
              <p className="text-xs text-text/60">Social Gaming Platform</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="text-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="text-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Events
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="text-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Friends
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="text-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Leaderboard
              </motion.a>
            </div>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-3"
              >
                {/* User Avatar */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || user.username}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-sm font-semibold">
                        {(user.displayName || user.username || user.email)?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="hidden md:block">
                    <p className="text-text text-sm font-medium">
                      {user.displayName || user.username}
                    </p>
                    <p className="text-text/60 text-xs">Level {user.level}</p>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${
                    user.status === 'online' ? 'bg-green-400' :
                    user.status === 'in-game' ? 'bg-yellow-400' :
                    user.status === 'away' ? 'bg-orange-400' : 'bg-gray-400'
                  }`} />
                  <span className="text-text/60 text-xs capitalize">{user.status}</span>
                </div>

                {/* Sign Out Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSignOut}
                  className="text-text/60 hover:text-text text-sm transition-colors"
                >
                  Sign Out
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-2"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header