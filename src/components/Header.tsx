/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, User, X, LogIn, Package, Shield, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { AuthModal } from './AuthModal';

interface HeaderProps {
  onNavigate: () => void;
  onAdminClick: () => void;
  onCartClick: () => void;
  onTrackClick: () => void;
  onProfileClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onAdminClick, onCartClick, onTrackClick, onProfileClick }) => {
  const { cart, isCustomerLoggedIn, loginCustomer, logoutCustomer, storeSettings, updateStoreSettings, user, isAdmin, profile, isAuthModalOpen, setIsAuthModalOpen } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currencies = [
    { symbol: '£', label: 'UK | GBP £' },
    { symbol: '€', label: 'Europe | EUR €' },
    { symbol: '$', label: 'USA | USD $' },
  ];

  const handleCurrencyChange = (symbol: string) => {
    updateStoreSettings({
      ...storeSettings,
      currency: symbol
    });
    setIsCurrencyMenuOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 z-[2000] text-topbarText border-none transition-all duration-700 ${scrolled ? 'nav-blur' : 'bg-transparent'}`}
      style={{ 
        backgroundColor: scrolled ? 'var(--topbarBg)' : 'transparent'
      }}
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-10 h-24 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button 
            className="lg:hidden text-topbarText hover:opacity-70 transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.3em] font-bold font-sans">
             <button onClick={onNavigate} className="hover:text-accent transition-colors relative group">
               SHOP
               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
             </button>
          </div>
        </div>

        <button 
          onClick={onNavigate}
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group"
        >
          <span className="font-serif text-lg lg:text-2xl tracking-tight italic font-bold uppercase tracking-widest text-topbarText leading-none">SWIPED BY</span>
          <span className="text-[6px] lg:text-[8px] tracking-[0.5em] font-bold mt-1 opacity-40 uppercase leading-none text-topbarText">DONT ASK WHERE</span>
        </button>

        <div className="flex items-center gap-6 lg:gap-8">
          <div className="relative hidden lg:block">
            <button 
              onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
              className="text-[10px] uppercase font-bold tracking-[0.2em] text-topbarText/60 flex items-center gap-2 hover:text-topbarText transition-colors"
            >
              {currencies.find(c => c.symbol === storeSettings.currency)?.label.split('|')[1].trim() || 'USD $'}
            </button>
            
            <AnimatePresence>
              {isCurrencyMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-4 w-48 bg-paper/90 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.2)] z-[120] flex flex-col font-sans rounded-3xl overflow-hidden border border-accent/10"
                >
                  {currencies.map((c) => (
                    <button 
                      key={c.symbol}
                      onClick={() => handleCurrencyChange(c.symbol)}
                      className={`px-6 py-4 text-[10px] uppercase tracking-widest text-left font-bold transition-all ${storeSettings.currency === c.symbol ? 'bg-accent/20 text-ink' : 'text-ink/60 hover:bg-accent/10 hover:text-ink'}`}
                    >
                      {c.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 relative group ${isUserMenuOpen ? 'bg-gold text-white' : 'bg-accent/5 text-topbarText hover:bg-accent/10'}`}
            >
              <User size={20} className={`${isUserMenuOpen ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-500`} />
              {!isUserMenuOpen && <div className="absolute inset-0 rounded-full bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
            </button>


            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  className="absolute right-0 top-full mt-6 w-80 bg-paper/95 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.4)] z-[2100] flex flex-col font-sans rounded-[2rem] overflow-hidden border-none"
                >
                    {isCustomerLoggedIn && (
                      <div className="p-8 bg-accent/5 border-none">
                        <p className="text-[10px] text-accent font-black uppercase tracking-[0.4em] mb-3 opacity-60">
                          Account Access
                        </p>
                        <p className="text-xl font-display font-black text-ink mb-1 truncate">
                          {profile?.full_name || user?.user_metadata?.full_name || user?.user_metadata?.name || 'Valued Client'}
                        </p>
                        <p className="text-[10px] font-mono opacity-40 text-ink truncate tracking-wider">
                          {profile?.email || user?.email}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col p-4 gap-1">
                      {isCustomerLoggedIn ? (
                        <>
                          <button onClick={() => { onProfileClick(); setIsUserMenuOpen(false); }} className="px-6 py-5 text-[11px] uppercase tracking-widest hover:bg-accent/5 rounded-2xl text-left flex items-center justify-between font-black text-ink transition-all group">
                            <span className="flex items-center gap-4"><User size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" /> Profile</span>
                            <ChevronRight size={12} className="opacity-0 group-hover:opacity-40 -translate-x-2 group-hover:translate-x-0 transition-all" />
                          </button>
                          <button onClick={() => { onTrackClick(); setIsUserMenuOpen(false); }} className="px-6 py-5 text-[11px] uppercase tracking-widest hover:bg-accent/5 rounded-2xl text-left flex items-center justify-between font-black text-ink transition-all group">
                            <span className="flex items-center gap-4"><Package size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" /> Order History</span>
                            <ChevronRight size={12} className="opacity-0 group-hover:opacity-40 -translate-x-2 group-hover:translate-x-0 transition-all" />
                          </button>
                        </>
                      ) : (
                        <button onClick={() => { setIsAuthModalOpen(true); setIsUserMenuOpen(false); }} className="px-6 py-5 text-[11px] uppercase tracking-widest hover:bg-accent/5 rounded-2xl text-left flex items-center justify-between font-black text-ink transition-all group">
                          <span className="flex items-center gap-4"><LogIn size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" /> Client Sign In</span>
                          <ChevronRight size={12} className="opacity-0 group-hover:opacity-40 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </button>
                      )}

                      {isAdmin && (
                        <button onClick={() => { onAdminClick(); setIsUserMenuOpen(false); }} className="px-6 py-5 text-[11px] uppercase tracking-widest bg-ink text-paper hover:bg-gold hover:text-paper rounded-2xl text-left flex items-center justify-between font-black transition-all group mt-3 shadow-xl shadow-ink/10">
                          <span className="flex items-center gap-4"><Shield size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" /> Management Dashboard</span>
                          <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>
                    
                    {isCustomerLoggedIn && (
                      <div className="p-4 pt-0">
                        <button onClick={logoutCustomer} className="w-full px-6 py-5 text-[11px] uppercase tracking-[0.4em] hover:bg-red-500/5 rounded-2xl text-center font-black text-red-500 transition-all">
                          Log Out
                        </button>
                      </div>
                    )}
                </motion.div>
              )}
            </AnimatePresence>
            {isUserMenuOpen && <div className="fixed inset-0 z-[2050] bg-transparent" onClick={() => setIsUserMenuOpen(false)} />}
            {isCurrencyMenuOpen && <div className="fixed inset-0 z-[110] bg-transparent" onClick={() => setIsCurrencyMenuOpen(false)} />}
          </div>

          <button 
            onClick={onCartClick}
            className="relative text-topbarText hover:opacity-70 transition-opacity p-2"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-gold text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-lg">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-[200] bg-paper p-8 lg:hidden flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
               <div className="flex flex-col">
                  <span className="font-serif text-lg text-topbarText italic font-bold uppercase tracking-widest leading-none">SWIPED BY</span>
                  <span className="text-[8px] tracking-[0.5em] font-bold opacity-40 uppercase leading-none mt-1 text-topbarText">DONT ASK WHERE</span>
               </div>
               <button className="text-topbarText p-3 bg-topbarText/5 rounded-full" onClick={() => setIsMenuOpen(false)}><X size={20} /></button>
            </div>
            
            <nav className="flex flex-col gap-6 text-2xl uppercase tracking-widest font-display font-bold">
                <button 
                  onClick={() => { onNavigate(); setIsMenuOpen(false); }}
                  className="text-left text-topbarText hover:text-accent transition-colors py-4"
                >
                  Shop Now
                </button>
                {isCustomerLoggedIn ? (
                   <button 
                     onClick={() => { onTrackClick(); setIsMenuOpen(false); }}
                     className="text-left text-topbarText hover:text-accent transition-colors py-4"
                   >
                     Orders
                   </button>
              ) : (
                 <button 
                   onClick={() => { setIsAuthModalOpen(true); setIsMenuOpen(false); }}
                   className="text-left text-topbarText hover:text-accent transition-colors py-4"
                 >
                   Sign In
                 </button>
              )}

            </nav>
            
            <div className="mt-auto pt-10 flex flex-col gap-6">
               {isAdmin && (
                 <button onClick={() => { onAdminClick(); setIsMenuOpen(false); }} className="text-center w-full py-6 bg-buttonBg text-buttonText text-[10px] tracking-[0.3em] font-bold rounded-2xl shadow-xl">
                    DASHBOARD
                 </button>
               )}
               {isCustomerLoggedIn && (
                  <button onClick={() => { logoutCustomer(); setIsMenuOpen(false); }} className="text-center w-full py-4 text-red-500 text-[10px] tracking-[0.3em] font-bold">
                     SIGN OUT
                  </button>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
};
