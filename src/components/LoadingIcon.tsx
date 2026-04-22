import React from 'react';
import { motion } from 'motion/react';

export const LoadingIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = 'currentColor' }) => {
  return (
    <div className="relative flex items-center justify-center overflow-hidden" style={{ width: size, height: size * 1.5, border: `1.5px solid ${color}`, borderRadius: size * 0.25 }}>
      {/* Notch */}
      <div 
        className="absolute top-[2px] left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-current" 
        style={{ width: size * 0.4, color }}
      />
      {/* Scan Line */}
      <motion.div
        className="absolute w-full h-[20%] opacity-40 bg-current"
        style={{ color, background: `linear-gradient(to bottom, transparent, ${color}, transparent)` }}
        animate={{ top: ['-20%', '120%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      {/* Pulse Dot */}
      <motion.div
        className="w-1 h-1 rounded-full bg-current"
        style={{ color }}
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};
