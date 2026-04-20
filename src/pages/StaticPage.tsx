import React from 'react';
import { motion } from 'motion/react';

interface StaticPageProps {
  title: string;
  content: React.ReactNode;
}

export const StaticPage: React.FC<StaticPageProps> = ({ title, content }) => {
  return (
    <div className="bg-paper min-h-[70vh] flex flex-col justify-center items-center py-32 px-8">
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="max-w-3xl w-full"
       >
          <h1 className="text-4xl lg:text-5xl font-serif italic mb-16 text-center text-ink">{title}</h1>
          <div className="text-[11px] leading-loose text-muted uppercase tracking-widest font-bold font-sans space-y-12">
             {content}
          </div>
       </motion.div>
    </div>
  );
};
