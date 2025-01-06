import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Mines = () => {
  const [betAmount, setBetAmount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [grid, setGrid] = useState(Array(25).fill(null));
  const [revealed, setRevealed] = useState(Array(25).fill(false));
  const [gameOver, setGameOver] = useState(false);
  const [winnings, setWinnings] = useState(0);
  const [mineCount, setMineCount] = useState(5);

  const startGame = () => {
    if (betAmount <= 0) return;
    
    // Create new grid with random mines
    const newGrid = Array(25).fill('gem');
    let mines = 0;
    
    while (mines < mineCount) {
      const pos = Math.floor(Math.random() * 25);
      if (newGrid[pos] !== 'mine') {
        newGrid[pos] = 'mine';
        mines++;
      }
    }
    
    setGrid(newGrid);
    setRevealed(Array(25).fill(false));
    setGameStarted(true);
    setGameOver(false);
    setWinnings(0);
  };

  const handleCellClick = (index) => {
    if (!gameStarted || revealed[index] || gameOver) return;

    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    if (grid[index] === 'mine') {
      setGameOver(true);
      setGameStarted(false);
      setWinnings(0);
      // Reveal all mines
      const allRevealed = grid.map((cell, i) => cell === 'mine' || revealed[i]);
      setRevealed(allRevealed);
    } else {
      // Calculate winnings (increase by 20% for each revealed gem)
      const revealedCount = newRevealed.filter(r => r).length;
      const newWinnings = betAmount * (1 + (revealedCount * 0.2));
      setWinnings(newWinnings);
      
      // Check if all non-mine cells are revealed
      const remainingGems = grid.filter((cell, i) => cell === 'gem' && !newRevealed[i]).length;
      if (remainingGems === 0) {
        setGameOver(true);
        setGameStarted(false);
      }
    }
  };

  const handleCashout = () => {
    if (!gameStarted || gameOver) return;
    setGameOver(true);
    setGameStarted(false);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-purple-400">Mines</h2>
      
      <div className="w-full max-w-sm space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Bet Amount</label>
          <input
            type="number"
            min="0"
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            disabled={gameStarted}
            className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Number of Mines</label>
          <input
            type="range"
            min="1"
            max="24"
            value={mineCount}
            onChange={(e) => setMineCount(Number(e.target.value))}
            disabled={gameStarted}
            className="w-full"
          />
          <div className="text-center text-sm text-gray-400">{mineCount} mines</div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startGame}
          disabled={gameStarted || betAmount <= 0}
          className={`px-6 py-3 rounded-lg text-lg font-semibold ${
            gameStarted
              ? 'bg-gray-700 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          Start Game
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCashout}
          disabled={!gameStarted || gameOver}
          className={`px-6 py-3 rounded-lg text-lg font-semibold ${
            !gameStarted || gameOver
              ? 'bg-gray-700 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          Cash Out
        </motion.button>
      </div>

      <div className="grid grid-cols-5 gap-3 w-full max-w-sm">
        {grid.map((cell, index) => (
          <motion.button
            key={index}
            whileHover={gameStarted && !revealed[index] && !gameOver ? { scale: 1.05 } : {}}
            whileTap={gameStarted && !revealed[index] && !gameOver ? { scale: 0.95 } : {}}
            onClick={() => handleCellClick(index)}
            className={`aspect-square rounded-xl flex items-center justify-center text-2xl
              ${revealed[index]
                ? cell === 'mine'
                  ? 'bg-red-600'
                  : 'bg-green-600'
                : 'bg-gray-700 hover:bg-gray-600'
              }
              ${(!gameStarted || gameOver) && !revealed[index] ? 'cursor-not-allowed' : ''}
              transition-colors duration-200
            `}
          >
            {revealed[index] && (
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="text-white"
              >
                {cell === 'mine' ? '💣' : '💎'}
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {(winnings > 0 || gameOver) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-center"
          >
            {gameOver ? (
              grid[revealed.findIndex(r => r && grid[revealed.indexOf(r)] === 'mine')] === 'mine' ? (
                <p className="text-2xl font-bold text-red-400">Game Over! You hit a mine!</p>
              ) : (
                <p className="text-2xl font-bold text-green-400">You won {winnings.toFixed(2)} credits!</p>
              )
            ) : (
              <p className="text-2xl font-bold text-purple-400">Current winnings: {winnings.toFixed(2)} credits</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Mines;
