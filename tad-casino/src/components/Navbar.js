import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-xl font-bold text-white"
        >
          <Link to="/">TAD Services</Link>
        </motion.div>
        <div className="flex space-x-6">
          {[
            ['Home', '/'],
            ['Services', '/services'],
            ['Casino', '/casino'],
          ].map(([title, url]) => (
            <motion.div
              key={title}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={url}
                className="text-white hover:text-purple-400 transition-colors"
              >
                {title}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
