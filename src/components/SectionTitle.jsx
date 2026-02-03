import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ children, subtitle, className = '', center = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-8 ${center ? 'text-center' : ''} ${className}`}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        {children}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-2xl">{subtitle}</p>
      )}
    </motion.div>
  );
};

export default SectionTitle;