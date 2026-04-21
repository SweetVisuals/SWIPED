import React from 'react';
import { motion } from 'motion/react';

interface StaticPageProps {
  title: string;
  content: React.ReactNode;
}

export const StaticPage: React.FC<StaticPageProps> = ({ title, content }) => {
  return (
    <div className="bg-paper min-h-[70vh] flex flex-col items-center py-40 px-8">
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="max-w-3xl w-full"
       >
          <div className="flex flex-col items-center mb-24">
             <div className="w-2 h-2 bg-gold mb-12 opacity-50 shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
             <h1 className="text-4xl lg:text-6xl font-serif italic text-ink tracking-tighter text-center">{title}</h1>
          </div>
          <div className="text-[13px] lg:text-base leading-relaxed text-muted/80 font-serif italic text-center mx-auto px-4 lg:px-8">
             {content}
          </div>
       </motion.div>
    </div>
  );
};
