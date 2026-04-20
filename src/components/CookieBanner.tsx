import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if not previously accepted
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-96 bg-paper border border-ink/10 p-5 shadow-2xl z-[100] text-ink"
        >
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-bold tracking-widest">Cookie Policy</h4>
            <p className="text-xs text-muted leading-relaxed">
              We use essential cookies to make our site work. With your consent, we may also use non-essential cookies to improve user experience and analyze website traffic.
            </p>
            <div className="flex gap-2 pt-2">
              <button 
                onClick={handleAccept}
                className="flex-1 bg-ink text-paper text-[9px] uppercase tracking-widest font-bold py-3 hover:bg-ink/80 transition-colors"
              >
                Accept All
              </button>
              <button 
                onClick={handleDecline}
                className="flex-1 border border-ink text-ink text-[9px] uppercase tracking-widest font-bold py-3 hover:bg-accent/20 transition-colors"
              >
                Decline Optional
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
