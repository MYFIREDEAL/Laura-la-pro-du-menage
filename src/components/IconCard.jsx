import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/Card';

const IconCard = ({ icon: Icon, title, description, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#8B9D6F]/10 rounded-full flex items-center justify-center mb-4">
            <Icon size={32} className="text-[#8B9D6F]" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default IconCard;