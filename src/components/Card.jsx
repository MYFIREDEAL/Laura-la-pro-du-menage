import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={`bg-white rounded-xl shadow-md p-6 transition-shadow duration-200 ${
        hover ? 'hover:shadow-lg' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;