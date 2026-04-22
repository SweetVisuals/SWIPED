import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  expiry: Date | string;
  variant?: 'hero' | 'inline' | 'compact' | 'button';
  inventory?: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ expiry, variant = 'hero', inventory = 12 }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = typeof expiry === 'string' ? new Date(expiry) : expiry;
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [expiry]);

  const Item = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative group">
        <div className="absolute inset-0 bg-accent/5 blur-xl group-hover:bg-accent/10 transition-all rounded-full" />
        <div className="relative bg-white/5 backdrop-blur-2xl px-4 py-3 rounded-2xl flex flex-col items-center min-w-[70px] lg:min-w-[90px] shadow-2xl shadow-black/10">
          <AnimatePresence mode="popLayout">
            <motion.span 
              key={value}
              initial={{ y: 10, opacity: 0, filter: 'blur(4px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -10, opacity: 0, filter: 'blur(4px)' }}
              className="text-ink text-2xl lg:text-4xl font-display font-black tracking-tighter tabular-nums"
            >
              {value.toString().padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <span className="text-paper/40 text-[8px] lg:text-[10px] uppercase tracking-[0.3em] font-bold mt-3">{label}</span>
    </div>
  );

  if (variant === 'inline') {
    return (
      <div className="flex bg-transparent items-center gap-3 md:gap-5">
        <div className="flex items-center gap-1.5 md:gap-2">
           <span className="text-ink text-base md:text-sm font-black tracking-tighter tabular-nums">{timeLeft.days.toString().padStart(2, '0')}</span>
           <span className="text-muted text-[7px] md:text-[8px] uppercase tracking-widest font-black opacity-40">D</span>
        </div>
        <div className="w-1 h-1 bg-gold/30 rounded-full shrink-0" />
        <div className="flex items-center gap-1.5 md:gap-2">
           <span className="text-ink text-base md:text-sm font-black tracking-tighter tabular-nums">{timeLeft.hours.toString().padStart(2, '0')}</span>
           <span className="text-muted text-[7px] md:text-[8px] uppercase tracking-widest font-black opacity-40">H</span>
        </div>
        <div className="w-1 h-1 bg-gold/30 rounded-full shrink-0" />
        <div className="flex items-center gap-1.5 md:gap-2">
           <span className="text-ink text-base md:text-sm font-black tracking-tighter tabular-nums">{timeLeft.minutes.toString().padStart(2, '0')}</span>
           <span className="text-muted text-[7px] md:text-[8px] uppercase tracking-widest font-black opacity-40">M</span>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
      return (
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold">
            <span className="animate-pulse">●</span>
            <span>Ends In:</span>
            <span className="text-ink tabular-nums">{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</span>
        </div>
      )
  }

  if (variant === 'button') {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative group h-16 w-full max-w-[320px]"
      >
        <div 
          className="relative h-full w-full flex items-center bg-paper/60 backdrop-blur-xl border-none shadow-[0_30px_60px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-500 hover:scale-[1.02] rounded-2xl cursor-default"
        >
          {/* Accent Line */}
          <div className="absolute top-0 left-0 w-[3px] h-full bg-gold" />
          
          <div className="flex w-full items-center">
            {/* Stock Label */}
            <div className="flex flex-col px-6">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-ink whitespace-nowrap">Limited Release</span>
              <span className="text-[7px] uppercase tracking-[0.1em] text-gold font-bold">Only {inventory.toString().padStart(2, '0')} items remaining</span>
            </div>

            {/* Divider */}
            <div className="w-[1px] h-8 bg-ink/5" />

            {/* Timer Section */}
            <div className="flex flex-1 items-center justify-around px-4">
              <div className="flex flex-col items-center">
                <span className="font-display font-black text-xl text-ink leading-tight tabular-nums">{timeLeft.days}</span>
                <span className="text-[6px] uppercase tracking-widest font-black text-ink/20">D</span>
              </div>
              <span className="text-ink/10 text-xs font-black">:</span>
              <div className="flex flex-col items-center">
                <span className="font-display font-black text-xl text-ink leading-tight tabular-nums">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-[6px] uppercase tracking-widest font-black text-ink/20">H</span>
              </div>
              <span className="text-ink/10 text-xs font-black">:</span>
              <div className="flex flex-col items-center">
                <span className="font-display font-black text-xl text-ink leading-tight tabular-nums">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-[6px] uppercase tracking-widest font-black text-ink/20">M</span>
              </div>
              <span className="text-ink/10 text-xs font-black">:</span>
              <div className="flex flex-col items-center">
                <span className="font-display font-black text-xl text-gold leading-tight tabular-nums animate-pulse">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-[6px] uppercase tracking-widest font-black text-gold/40">S</span>
              </div>
            </div>
          </div>
          
          {/* Subtle Shine */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-gold/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4 lg:gap-8 py-6">
      <Item value={timeLeft.days} label="Days" />
      <div className="h-6 w-[1px] bg-white/10 mt-[-20px]" />
      <Item value={timeLeft.hours} label="Hours" />
      <div className="h-6 w-[1px] bg-white/10 mt-[-20px]" />
      <Item value={timeLeft.minutes} label="Mins" />
      <div className="h-6 w-[1px] bg-white/10 mt-[-20px]" />
      <Item value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

