import React from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const PromotionalBanner: React.FC = () => {
  const { storeSettings } = useApp();

  if (!storeSettings.promoBannerEnabled || !storeSettings.promoBannerText) return null;

  return (
    <motion.div 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      className="bg-accent text-white overflow-hidden relative z-[100]"
    >
      <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-center gap-4">
        <Sparkles size={14} className="text-white/60 animate-pulse" />
        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-center">
          {storeSettings.promoBannerText}
        </p>
        <Sparkles size={14} className="text-white/60 animate-pulse" />
      </div>
      
      {/* Subtle animated shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shine pointer-events-none" />
    </motion.div>
  );
};
