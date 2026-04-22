/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Lock, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { LoadingIcon } from './LoadingIcon';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

export const PasswordLock: React.FC = () => {
  const { storeSettings, isAdmin, setIsAuthModalOpen } = useApp();
  const theme = storeSettings.colors;
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (!storeSettings.passwordLockExpiresAt) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const expiry = new Date(storeSettings.passwordLockExpiresAt!).getTime();
      const diff = expiry - now;

      if (diff <= 0) {
        setTimeLeft('EXPIRED');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [storeSettings.passwordLockExpiresAt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate verification delay
    setTimeout(() => {
      const storedPassword = storeSettings.passwordLockPassword || '';
      if (password.toLowerCase() === storedPassword.toLowerCase() && storedPassword !== '') {
        // Correct password - store in session storage to unlock for this session
        sessionStorage.setItem('storefront_unlocked', 'true');
        window.location.reload(); // Reload to clear the lock state
      } else {
        setError('INVALID ACCESS KEY');
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-start md:justify-center bg-paper overflow-y-auto no-scrollbar py-12 md:py-0" style={{ backgroundColor: theme.paper }}>
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-20 animate-pulse" 
          style={{ backgroundColor: theme.gold }} 
        />
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[100px] opacity-10" 
          style={{ backgroundColor: theme.accent }} 
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-lg px-6 py-8 md:p-16 text-center space-y-12"
      >
        {/* Branding */}
        <div className="space-y-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <span className="font-brand text-3xl md:text-5xl font-black text-ink leading-tight uppercase tracking-tight" style={{ color: theme.gold }}>{storeSettings.name}</span>
            <span className="text-[10px] tracking-[0.6em] font-bold opacity-40 uppercase mt-4" style={{ color: theme.ink }}>Private Editorial Access</span>
          </motion.div>
        </div>

        {/* Lock Status */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gold/20" />
            <div className="flex items-center gap-3 px-6 py-2 bg-gold/5 rounded-full border border-gold/10">
               <Lock size={14} className="text-gold" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Collection Staged</span>
            </div>
            <div className="h-px w-12 bg-gold/20" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-serif italic" style={{ color: theme.ink }}>The collection is currently archived.</h2>
            <p className="text-[11px] uppercase font-bold tracking-[0.2em] opacity-40 leading-relaxed" style={{ color: theme.muted }}>
              Access is restricted to authorized personnel and premium members.
            </p>
          </div>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-6">
          <div className="relative group">
            <ShieldCheck size={16} className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" style={{ color: theme.gold }} />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ENTER ACCESS KEY"
              className="w-full bg-accent/5 p-6 pl-14 text-[11px] font-bold tracking-[0.4em] outline-none border-b border-transparent focus:border-gold transition-all placeholder:opacity-20 text-center"
              style={{ color: theme.ink }}
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[9px] text-red-500 uppercase tracking-widest font-bold"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit"
            disabled={loading || !password}
            className="w-full py-6 bg-ink text-paper relative group overflow-hidden transition-all disabled:opacity-30 disabled:grayscale"
            style={{ backgroundColor: theme.ink, color: theme.paper }}
          >
            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ backgroundColor: theme.gold }} />
            <span className="relative flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em]">
              {loading ? (
                <LoadingIcon size={16} color={theme.paper} />
              ) : (
                <>
                  Validate Credentials
                  <ArrowRight size={16} />
                </>
              )}
            </span>
          </button>
        </form>

        {/* Admin Shortcut */}
        <div className="pt-8 space-y-8">
           <button 
             onClick={() => setIsAuthModalOpen(true)}
             className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-30 hover:opacity-100 hover:text-gold transition-all"
             style={{ color: theme.muted }}
           >
              Admin Authentication
           </button>

           {timeLeft && (
             <div className="flex flex-col items-center gap-2 opacity-20">
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                   <Clock size={12} />
                   Collection Unlocks In
                </div>
                <div className="text-xs font-mono tracking-widest font-bold">{timeLeft}</div>
             </div>
           )}
        </div>
      </motion.div>

      {/* Footer Decoration */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center opacity-10">
         <span className="text-[8px] uppercase tracking-[1em] font-bold" style={{ color: theme.muted }}>Secured by SWIPED BY Systems</span>
      </div>
    </div>
  );
};
