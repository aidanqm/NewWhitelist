import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Plinko = () => {
  const [betAmount, setBetAmount] = useState(0);
  const [isDropping, setIsDropping] = useState(false);
  const [result, setResult] = useState(null);
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 0 });
  const [multiplier, setMultiplier] = useState(null);
  const boardRef = useRef(null);

  const multipliers = [0, 0.2, 0.5, 1, 2, 5, 10];
  const pins = Array(8).fill(null).map((_, row) => 
    Array(row + 1).fill(null).map((_, col) => ({
      x: 50 + (col - row/2) * 10,
      y: (row + 1) * 10
    }))
  ).flat();

  const handleDrop = () => {
    if (betAmount <= 0 || isDropping) return;
    
    setIsDropping(true);
    setBallPosition({ x: 50, y: 0 });
    setMultiplier(null);
    
    // Animate ball dropping
    const finalMultiplier = multipliers[Math.floor(Math.random() * multipliers.length)];
    const finalX = 50 + (finalMultiplier - 5) * 8;
    
    setTimeout(() => {
      setBallPosition({ x: finalX, y: 90 });
      setMultiplier(finalMultiplier);
      setResult(betAmount * finalMultiplier);
      setTimeout(() => setIsDropping(false), 500);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-purple-400">Plinko</h2>
      
      <div className="w-full max-w-sm mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-300">Bet Amount</label>
        <input
          type="number"
          min="0"
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
          disabled={isDropping}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isDropping || betAmount <= 0}
        onClick={handleDrop}
        className={`w-full max-w-sm py-3 rounded-lg text-lg font-semibold mb-6 ${
          isDropping
            ? 'bg-gray-700 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700'
        }`}
      >
        {isDropping ? 'Dropping...' : 'Drop Ball'}
      </motion.button>

      <div className="relative w-full max-w-sm aspect-[3/4] bg-gray-800 rounded-xl overflow-hidden border-2 border-gray-700">
        {/* Pins */}
        {pins.map((pin, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.02 }}
          />
        ))}

        {/* Ball */}
        <AnimatePresence>
          {isDropping && (
            <motion.div
              className="absolute w-4 h-4 bg-white rounded-full shadow-lg"
              style={{ left: `${ballPosition.x}%`, top: `${ballPosition.y}%` }}
              initial={{ y: '-10%' }}
              animate={{ y: `${ballPosition.y}%`, x: `${ballPosition.x}%` }}
              transition={{ duration: 2, type: 'spring' }}
            />
          )}
        </AnimatePresence>

        {/* Multipliers */}
        <div className="absolute bottom-0 w-full flex justify-between px-4 py-2">
          {multipliers.map((m, i) => (
            <div
              key={i}
              className={`text-sm font-bold ${
                multiplier === m ? 'text-purple-400 scale-110' : 'text-gray-400'
              }`}
            >
              {m}x
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {result !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-center"
          >
            <p className="text-2xl font-bold">
              {result > 0 ? (
                <span className="text-green-400">Won {result.toFixed(2)} credits!</span>
              ) : (
                <span className="text-red-400">Better luck next time!</span>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Plinko;
