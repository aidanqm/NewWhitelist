import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1325728148301807638/YxyTHRymyAHq6xWgtnmRAFKB6Uzw26vhvGFYAEeu-8ACsDIfTG7g7p1iWWKLX_7zR5aX';

const LuckyClick = () => {
  const [canClick, setCanClick] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [lastWin, setLastWin] = useState(null);
  const [showWinAnimation, setShowWinAnimation] = useState(false);
  const [discordUsername, setDiscordUsername] = useState('');
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  const prizes = [
    { name: '15 Minutes Service', weight: 1 },
    { name: '30 Minutes Service', weight: 1 },
    { name: '1 Hour Service', weight: 1 },
    { name: 'Overnight Macro', weight: 1 }
  ];

  useEffect(() => {
    let timer;
    if (!canClick && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanClick(true);
    }
    return () => clearInterval(timer);
  }, [canClick, countdown]);

  const generateReferralCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const sendWebhookNotification = async (prize, username, code) => {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: null,
          embeds: [{
            title: '🎉 Lucky Click Winner!',
            color: 0x9b59b6,
            fields: [
              {
                name: 'Discord Username',
                value: username,
                inline: true
              },
              {
                name: 'Prize Won',
                value: prize,
                inline: true
              },
              {
                name: 'Referral Code',
                value: code,
                inline: true
              }
            ],
            timestamp: new Date().toISOString()
          }]
        })
      });

      if (!response.ok) {
        console.error('Failed to send webhook notification');
      }
    } catch (error) {
      console.error('Error sending webhook notification:', error);
    }
  };

  const handleSubmitUsername = async () => {
    if (!discordUsername.trim()) return;
    
    const code = generateReferralCode();
    setReferralCode(code);
    await sendWebhookNotification(lastWin, discordUsername, code);
    setShowUsernameInput(false);
    setDiscordUsername('');
  };

  const handleClick = () => {
    if (!canClick) return;

    setCanClick(false);
    setCountdown(3);

    // 0.3% chance to win (3 in 1000)
    const roll = Math.random() * 1000;
    if (roll <= 3) {
      // Select random prize
      const totalWeight = prizes.reduce((sum, prize) => sum + prize.weight, 0);
      let random = Math.random() * totalWeight;
      
      let selectedPrize = prizes[0];
      for (const prize of prizes) {
        if (random <= prize.weight) {
          selectedPrize = prize;
          break;
        }
        random -= prize.weight;
      }

      setLastWin(selectedPrize.name);
      setShowWinAnimation(true);
      setShowUsernameInput(true);
    } else {
      setLastWin(null);
      setShowWinAnimation(false);
      setShowUsernameInput(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-purple-400">Lucky Click</h2>
      
      <div className="text-center mb-6">
        <p className="text-gray-300 text-sm mb-2">Click for a 0.3% chance to win a service!</p>
        <p className="text-gray-400 text-xs">Possible prizes: 15min, 30min, 1hr services, or Overnight Macro</p>
      </div>

      <motion.button
        whileHover={canClick ? { scale: 1.05 } : {}}
        whileTap={canClick ? { scale: 0.95 } : {}}
        onClick={handleClick}
        className={`w-48 h-48 rounded-full flex items-center justify-center text-2xl font-bold relative ${
          canClick ? 'bg-purple-600 hover:bg-purple-700 cursor-pointer' : 'bg-gray-700 cursor-not-allowed'
        }`}
      >
        <div className="absolute inset-0 rounded-full">
          {!canClick && (
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-purple-900 stroke-current"
                strokeWidth="4"
                fill="transparent"
                r="48"
                cx="50"
                cy="50"
              />
              <circle
                className="text-purple-500 stroke-current"
                strokeWidth="4"
                fill="transparent"
                r="48"
                cx="50"
                cy="50"
                strokeDasharray="301.59"
                strokeDashoffset={301.59 * (countdown / 3)}
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
          )}
        </div>
        <span className="z-10">
          {canClick ? "Click Me!" : countdown}
        </span>
      </motion.button>

      <AnimatePresence>
        {showWinAnimation && lastWin && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="mt-8 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
              className="text-2xl font-bold text-green-400 mb-2"
            >
              🎉 Winner! 🎉
            </motion.div>
            <p className="text-xl text-purple-400 mb-4">
              You won: {lastWin}
            </p>
            {showUsernameInput && (
              <div className="flex flex-col items-center gap-4">
                <input
                  type="text"
                  value={discordUsername}
                  onChange={(e) => setDiscordUsername(e.target.value)}
                  placeholder="Enter your Discord username"
                  className="px-4 py-2 bg-gray-800 rounded-lg border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmitUsername}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold"
                >
                  Submit
                </motion.button>
              </div>
            )}
            {referralCode && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-gray-800 rounded-lg"
              >
                <p className="text-sm text-gray-400 mb-2">Your Referral Code:</p>
                <p className="text-xl font-mono font-bold text-purple-400">{referralCode}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LuckyClick;
