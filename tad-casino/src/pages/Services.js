import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    name: '15 Minutes',
    price: '25',
    features: [
      'Quick alt service',
      'Instant delivery',
      'Perfect for short tasks',
      'Professional support'
    ]
  },
  {
    name: '30 Minutes',
    price: '40',
    features: [
      'Extended alt service',
      'Instant delivery',
      'Ideal for medium tasks',
      'Priority support'
    ]
  },
  {
    name: '1 Hour',
    price: '80',
    features: [
      'Full hour of service',
      'Instant delivery',
      'Great for longer tasks',
      'Premium support'
    ]
  },
  {
    name: '2 Hours',
    price: '150',
    features: [
      'Extended service period',
      'Instant delivery',
      'Perfect for complex tasks',
      'VIP support'
    ]
  },
  {
    name: 'Overnight Macro',
    price: '200',
    features: [
      'Overnight automation',
      'Extended duration',
      'Maximum efficiency',
      '24/7 monitoring'
    ]
  }
];

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-bold text-center mb-12 text-purple-400"
      >
        Our Services
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-gray-800 rounded-lg p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-4 text-purple-400">{service.name}</h2>
            <p className="text-3xl font-bold mb-6">${service.price}</p>
            <ul className="space-y-3">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-purple-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Purchase Now
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
