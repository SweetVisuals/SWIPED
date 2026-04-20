/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, User, X, LogIn, Package, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavigate: () => void;
  onAdminClick: () => void;
  onCartClick: () => void;
  onTrackClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onAdminClick, onCartClick, onTrackClick }) => {
  const { cart, isCustomerLoggedIn, loginCustomer, logoutCustomer } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-[100] bg-topbarBg text-topbarText shadow-sm">
      <div className="max-w-7xl mx-auto px-8 md:px-16 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8 lg:pl-10">
          <button 
            className="lg:hidden text-topbarText hover:opacity-70 transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-bold font-sans">
             <button onClick={onNavigate} className="hover:opacity-70 transition-colors relative group">
               SHOP
               <span className="absolute -bottom-1 left-0 w-0 h-px bg-topbarText transition-all group-hover:w-full" />
             </button>
          </div>
        </div>

        <button 
          onClick={onNavigate}
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group"
        >
          <span className="font-serif text-2xl lg:text-3xl tracking-tight italic font-bold uppercase tracking-widest text-topbarText">Lash</span>
          <span className="text-[9px] tracking-[0.4em] font-bold -mt-1 opacity-50 uppercase leading-none text-topbarText">Glaze Studio</span>
        </button>

        <div className="flex items-center gap-6 lg:gap-8">
          <div className="relative">
            {isCustomerLoggedIn ? (
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="text-topbarText hover:opacity-70 transition-opacity flex items-center justify-center p-2"
              >
                <User size={20} />
              </button>
            ) : (
              <button 
                onClick={() => { loginCustomer(); }}
                className="hidden lg:flex items-center gap-2 text-topbarText hover:opacity-70 transition-opacity text-[10px] uppercase font-bold tracking-widest px-4 py-2 border border-topbarText/20 rounded-sm hover:bg-topbarText/5"
              >
                <LogIn size={14} /> Log in
              </button>
            )}
            
            {!isCustomerLoggedIn && (
               <button 
                 onClick={() => { loginCustomer(); }}
                 className="lg:hidden text-topbarText hover:opacity-70 transition-opacity flex items-center justify-center p-2"
               >
                 <User size={20} />
               </button>
            )}

            <AnimatePresence>
              {isUserMenuOpen && isCustomerLoggedIn && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-[#FDFCFB] border border-accent shadow-2xl z-[120] flex flex-col font-sans rounded-sm overflow-hidden"
                >
                    <div className="p-4 border-b border-accent text-[10px] text-muted uppercase tracking-widest font-bold bg-[#FAF8F5]">
                      Welcome back
                    </div>
                    <button onClick={() => { onTrackClick(); setIsUserMenuOpen(false); }} className="px-4 py-3 text-[11px] uppercase tracking-widest hover:bg-black/5 text-left flex items-center gap-3 font-bold text-ink">
                      <Package size={14} /> My Orders
                    </button>
                    <button onClick={() => { onAdminClick(); setIsUserMenuOpen(false); }} className="px-4 py-3 text-[11px] uppercase tracking-widest hover:bg-black/5 text-left flex items-center gap-3 font-bold text-[#D4AF37]">
                      <Shield size={14} /> Backend Portal
                    </button>
                    <button onClick={() => { logoutCustomer(); setIsUserMenuOpen(false); }} className="px-4 py-3 border-t border-accent text-[11px] uppercase tracking-widest hover:bg-black/5 text-left font-bold text-ink transition-colors">
                      Sign Out
                    </button>
                </motion.div>
              )}
            </AnimatePresence>
            {isUserMenuOpen && <div className="fixed inset-0 z-[110]" onClick={() => setIsUserMenuOpen(false)} />}
          </div>

          <button 
            onClick={onCartClick}
            className="relative text-topbarText hover:opacity-70 transition-opacity"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-md">
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
            className="fixed inset-0 z-[200] bg-[#FDFCFB] p-8 lg:hidden flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
               <div className="flex flex-col">
                  <span className="font-serif text-2xl text-ink italic font-bold uppercase tracking-widest leading-none">Lash</span>
                  <span className="text-[10px] tracking-[0.4em] font-bold opacity-40 uppercase leading-none mt-1 text-ink">Glaze Studio</span>
               </div>
               <button className="text-ink p-2 -mr-2 bg-black/5 rounded-full" onClick={() => setIsMenuOpen(false)}><X size={20} /></button>
            </div>
            
            <nav className="flex flex-col gap-6 text-xl uppercase tracking-widest font-serif">
              <button 
                onClick={() => { onNavigate(); setIsMenuOpen(false); }}
                className="text-left text-ink hover:text-muted transition-colors py-2 border-b border-accent/30"
              >
                Shop Lashes
              </button>
              {isCustomerLoggedIn ? (
                 <button 
                   onClick={() => { onTrackClick(); setIsMenuOpen(false); }}
                   className="text-left text-ink hover:text-muted transition-colors py-2 border-b border-accent/30"
                 >
                   My Orders
                 </button>
              ) : (
                 <button 
                   onClick={() => { loginCustomer(); setIsMenuOpen(false); }}
                   className="text-left text-ink hover:text-muted transition-colors py-2 border-b border-accent/30"
                 >
                   Sign In
                 </button>
              )}
              <button className="text-left text-ink hover:text-muted transition-colors py-2 border-b border-accent/30">Essentials</button>
              <button className="text-left text-ink hover:text-muted transition-colors py-2 border-b border-accent/30">Client Looks</button>
              <button className="text-left text-ink hover:text-muted transition-colors py-2 border-b border-accent/30">About Us</button>
            </nav>
            
            <div className="mt-auto pt-10 border-t border-accent flex flex-col gap-6 text-xs uppercase tracking-widest font-bold text-muted">
               <div className="flex justify-between items-center bg-black/5 p-4 rounded-lg">
                  <span>Germany | EUR €</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
               </div>
               <button onClick={() => { onAdminClick(); setIsMenuOpen(false); }} className="text-center w-full py-4 border border-accent bg-white text-ink text-[10px] tracking-[0.2em] shadow-sm">
                  Backend Portal
               </button>
               {isCustomerLoggedIn && (
                  <button onClick={() => { logoutCustomer(); setIsMenuOpen(false); }} className="text-center w-full py-4 text-ink text-[10px] tracking-[0.2em]">
                     Sign Out
                  </button>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
