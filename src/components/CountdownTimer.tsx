import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  expiry: Date | string;
  variant?: 'hero' | 'inline';
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ expiry, variant = 'hero' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0
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
          minutes: Math.floor((difference / 1000 / 60) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [expiry]);

  if (variant === 'inline') {
    return (
      <div className="flex bg-transparent items-center justify-center gap-3">
        <div className="flex items-baseline">
           <span className="text-ink text-base font-bold tracking-tighter tabular-nums">{timeLeft.days.toString().padStart(2, '0')}</span>
           <span className="text-muted text-[8px] uppercase tracking-widest pl-1 cursor-default">D</span>
        </div>
        <span className="text-muted/50 text-base">:</span>
        <div className="flex items-baseline">
           <span className="text-ink text-base font-bold tracking-tighter tabular-nums">{timeLeft.hours.toString().padStart(2, '0')}</span>
           <span className="text-muted text-[8px] uppercase tracking-widest pl-1 cursor-default">H</span>
        </div>
        <span className="text-muted/50 text-base">:</span>
        <div className="flex items-baseline">
           <span className="text-ink text-base font-bold tracking-tighter tabular-nums">{timeLeft.minutes.toString().padStart(2, '0')}</span>
           <span className="text-muted text-[8px] uppercase tracking-widest pl-1 cursor-default">M</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center gap-4 py-2">
      <div className="flex items-center gap-1.5">
         <span className="text-paper text-2xl font-light tracking-tight tabular-nums">{timeLeft.days.toString().padStart(2, '0')}</span>
         <span className="text-paper/40 text-[9px] uppercase tracking-[0.2em] pt-1">Days</span>
      </div>
      <span className="text-paper/20 text-lg font-light">-</span>
      <div className="flex items-center gap-1.5">
         <span className="text-paper text-2xl font-light tracking-tight tabular-nums">{timeLeft.hours.toString().padStart(2, '0')}</span>
         <span className="text-paper/40 text-[9px] uppercase tracking-[0.2em] pt-1">Hrs</span>
      </div>
      <span className="text-paper/20 text-lg font-light">-</span>
      <div className="flex items-center gap-1.5">
         <span className="text-paper text-2xl font-light tracking-tight tabular-nums">{timeLeft.minutes.toString().padStart(2, '0')}</span>
         <span className="text-paper/40 text-[9px] uppercase tracking-[0.2em] pt-1">Mins</span>
      </div>
    </div>
  );
};
