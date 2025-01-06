import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { stickersData, getStickersForCategory } from '../data/stickers';

const categories = ['Stickers', 'Bee Equips'];

const StickerCard = ({ sticker }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gray-800 p-4 rounded-lg shadow-lg"
  >
    <div className="relative">
      <img 
        src={`/images/stickers/${sticker.image}`} 
        alt={sticker.name}
        className="w-full h-48 object-contain rounded-lg mb-2"
      />
    </div>
    <h3 className="text-lg font-semibold text-purple-400">{sticker.name}</h3>
    <div className="mt-2">
      <p className="text-gray-300">Value: {sticker.value}</p>
      <p className="text-gray-300">Demand: {sticker.demand}</p>
      {sticker.valueChange !== 0 && (
        <p className={`${sticker.valueChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
          Change: {sticker.valueChange > 0 ? '+' : ''}{sticker.valueChange}
        </p>
      )}
    </div>
  </motion.div>
);

const Stickers = () => {
  const [selectedCategory, setSelectedCategory] = useState('Stickers');
  const stickers = getStickersForCategory(selectedCategory);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
      >
        Sticker Collection
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stickers.map((sticker, index) => (
          <StickerCard key={index} sticker={sticker} />
        ))}
      </div>
    </div>
  );
};

export default Stickers;
