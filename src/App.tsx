import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components';
import { useAuth } from '@/hooks/useAuth';

const App: React.FC = () => {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="spinner w-12 h-12 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-text mb-2">Loading Nightapp V3</h2>
          <p className="text-text-secondary">Preparing your gaming experience...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Nightapp V3</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              La nouvelle plateforme sociale gaming qui connecte les joueurs du monde entier
            </p>
          </motion.div>

          {user ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="card p-8 max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-text mb-4">
                  Bienvenue, {user.displayName || user.username}!
                </h2>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Niveau:</span>
                    <span className="text-primary font-semibold">Lvl {user.level}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Expérience:</span>
                    <span className="text-text font-semibold">{user.experience} XP</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Succès:</span>
                    <span className="text-text font-semibold">{user.achievements.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Statut:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'online' ? 'bg-success/20 text-success' :
                      user.status === 'away' ? 'bg-warning/20 text-warning' :
                      user.status === 'busy' ? 'bg-error/20 text-error' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="btn-primary text-lg px-8 py-3">
                  Rejoindre la communauté
                </button>
                <button className="btn-secondary text-lg px-8 py-3">
                  En savoir plus
                </button>
              </div>
            </motion.div>
          )}
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="py-16"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Événements Gaming',
                description: 'Créez et participez à des tournois, parties casual et événements communautaires',
                icon: '🎮'
              },
              {
                title: 'Communauté Active',
                description: 'Connectez-vous avec des joueurs partageant vos passions et votre niveau',
                icon: '👥'
              },
              {
                title: 'Progression & Récompenses',
                description: 'Gagnez de l\'expérience, débloquez des succès et montez dans les classements',
                icon: '🏆'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                className="card-hover p-6 text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-text mb-3">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </Layout>
  );
};

export default App;