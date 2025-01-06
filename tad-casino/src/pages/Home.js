import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Welcome to TAD Services
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Experience premium alt services and try your luck in our exciting casino games.
          Join our community today!
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/services"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              View Services
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/casino"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Play Casino
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
      >
        {[
          {
            title: 'Premium Services',
            description: 'High-quality alt accounts with instant delivery',
            icon: '🌟'
          },
          {
            title: 'Exciting Games',
            description: 'Try your luck with Plinko and Mines',
            icon: '🎮'
          },
          {
            title: '24/7 Support',
            description: 'Our team is always here to help you',
            icon: '💬'
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.2 }}
            className="bg-gray-800 rounded-lg p-6 text-center"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
