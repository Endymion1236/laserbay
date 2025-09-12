import React from 'react';
import { motion } from 'framer-motion';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen bg-slate-900" style={{ backgroundColor: 'var(--surface, #1e293b)' }}>
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`flex-1 ${className}`}
      >
        {children}
      </motion.main>
    </div>
  );
};