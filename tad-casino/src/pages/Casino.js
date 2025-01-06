import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Plinko from '../components/games/Plinko';
import Mines from '../components/games/Mines';
import LuckyClick from '../components/games/LuckyClick';

const Casino = () => {
  const [activeGame, setActiveGame] = useState('plinko');

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-bold text-center mb-8 text-purple-400"
      >
        Casino Games
      </motion.h1>

      <div className="flex justify-center space-x-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-2 rounded-lg ${
            activeGame === 'plinko'
              ? 'bg-purple-600'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          onClick={() => setActiveGame('plinko')}
        >
          Plinko
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-2 rounded-lg ${
            activeGame === 'mines'
              ? 'bg-purple-600'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          onClick={() => setActiveGame('mines')}
        >
          Mines
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-2 rounded-lg ${
            activeGame === 'luckyclick'
              ? 'bg-purple-600'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          onClick={() => setActiveGame('luckyclick')}
        >
          Lucky Click
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-lg p-6"
      >
        {activeGame === 'plinko' ? <Plinko /> : 
         activeGame === 'mines' ? <Mines /> : 
         <LuckyClick />}
      </motion.div>
    </div>
  );
};

export default Casino;
