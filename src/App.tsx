import React from 'react'
import { motion } from 'framer-motion'
import { Layout } from '@/components/Layout'
import { useAuth } from '@/hooks/useAuth'

const App: React.FC = () => {
  const { user, loading, isAuthenticated } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-primary mb-2">Nightapp V3</h2>
          <p className="text-text/60">Loading your gaming experience...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-text mb-4"
          >
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Nightapp V3
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-text/80 mb-8 max-w-3xl mx-auto"
          >
            The ultimate social gaming platform where night meets competition. 
            Connect with gamers, join events, and climb the leaderboards.
          </motion.p>

          {!isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-3 glow-primary"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-3"
              >
                Learn More
              </motion.button>
            </motion.div>
          )}
        </motion.section>

        {/* User Dashboard or Features Section */}
        {isAuthenticated && user ? (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {/* User Stats Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="card p-6"
            >
              <h3 className="text-xl font-semibold text-text mb-4">Your Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text/60">Level</span>
                  <span className="text-primary font-semibold">{user.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text/60">Experience</span>
                  <span className="text-text">{user.experience.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text/60">Games Played</span>
                  <span className="text-text">{user.gamesPlayed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text/60">Win Rate</span>
                  <span className="text-green-400">
                    {user.gamesPlayed > 0 ? ((user.wins / user.gamesPlayed) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="card p-6"
            >
              <h3 className="text-xl font-semibold text-text mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary">Find Game</button>
                <button className="w-full btn-secondary">Create Event</button>
                <button className="w-full btn-secondary">View Friends</button>
              </div>
            </motion.div>

            {/* Recent Activity Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="card p-6 md:col-span-2 lg:col-span-1"
            >
              <h3 className="text-xl font-semibold text-text mb-4">Activity</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-text/80">Joined the platform</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-text/80">Status: {user.status}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-text/80">Ready to game!</span>
                </div>
              </div>
            </motion.div>
          </motion.section>
        ) : (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {/* Feature Cards */}
            {[
              {
                title: 'Social Gaming',
                description: 'Connect with gamers worldwide and build lasting friendships through gaming.',
                icon: '🎮'
              },
              {
                title: 'Events & Tournaments',
                description: 'Join exciting events and compete in tournaments for amazing prizes.',
                icon: '🏆'
              },
              {
                title: 'Leaderboards',
                description: 'Climb the ranks and showcase your skills on global leaderboards.',
                icon: '📊'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="card p-6 text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-text mb-3">{feature.title}</h3>
                <p className="text-text/70">{feature.description}</p>
              </motion.div>
            ))}
          </motion.section>
        )}
      </div>
    </Layout>
  )
}

export default App