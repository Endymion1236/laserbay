import React from 'react'
import { motion } from 'framer-motion'
import Header from './Header'

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* CSS Variables for Design System */}
      <style>{`
        :root {
          --primary: #6366f1;
          --surface: #1e293b;
          --text: #f1f5f9;
        }
      `}</style>
      
      <Header />
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`${className}`}
      >
        {children}
      </motion.main>
      
      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="bg-surface border-t border-gray-700 mt-auto"
      >
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-primary">Nightapp V3</h3>
              <span className="text-text/60 text-sm">Social Gaming Platform</span>
            </div>
            
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-text/60 hover:text-text text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-text/60 hover:text-text text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-text/60 hover:text-text text-sm transition-colors">
                Support
              </a>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-center text-text/40 text-xs">
              © 2025 Nightapp V3. All rights reserved. Built with React, TypeScript, and Firebase.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default Layout