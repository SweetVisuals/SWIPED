/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Minus, Plus, Share2, Info, ChevronLeft, Clock, ShieldCheck, Truck, Sparkles, Cpu, Zap, Globe, Package, ArrowRight } from 'lucide-react';
import { CountdownTimer } from '../components/CountdownTimer';

interface ProductPageProps {
  productId: string;
  onBack: () => void;
  onCheckout: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ productId, onBack, onCheckout }) => {
  const { products, addToCart, dropExpiry, isDropActive, formatPrice, storeSettings } = useApp();
  const product = products.find(p => p.id === productId);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.variants?.colors?.[0] || '');
  const [selectedStorage, setSelectedStorage] = useState(product?.variants?.storage?.[0] || '');
  const [selectedTier, setSelectedTier] = useState(product?.variants?.tiers?.[0] || '');
  const [activeImage, setActiveImage] = useState(0);
  const [showCopied, setShowCopied] = useState(false);
  const [isSubscription, setIsSubscription] = useState(false);
  const [subscriptionInterval, setSubscriptionInterval] = useState<'monthly' | 'fortnightly'>('monthly');

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  if (!product) return null;

  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const now = new Date();
  const preOrderEndsAt = product.preOrderEndsAt ? new Date(product.preOrderEndsAt) : null;
  const limitedTimeEndsAt = product.limitedTimeEndsAt ? new Date(product.limitedTimeEndsAt) : null;

  const isPreOrderActive = !!(product.preOrderEnabled && preOrderEndsAt && now < preOrderEndsAt);
  const isLimitedTimeActive = !!(product.limitedTimeEnabled && limitedTimeEndsAt && now < limitedTimeEndsAt && (!preOrderEndsAt || now > preOrderEndsAt));
  const isReserveOrder = !!(product.limitedTimeEnabled && limitedTimeEndsAt && now >= limitedTimeEndsAt);

  const currentPrice = (isPreOrderActive && product.preOrderPrice) 
    ? product.preOrderPrice 
    : (product.salePrice && product.salePrice < product.price ? product.salePrice : product.price);
  const isAvailable = isDropActive || isPreOrderActive || isLimitedTimeActive || isReserveOrder;

  const activeTimerTarget = isPreOrderActive ? preOrderEndsAt : (isLimitedTimeActive ? limitedTimeEndsAt : null);
  const timerLabel = isPreOrderActive ? 'Pre-order Allocation' : (isLimitedTimeActive ? 'Limited Release' : (isReserveOrder ? 'Reserve Mode' : 'Instant Acquisition'));

  const [added, setAdded] = useState(false);

  return (
    <div className="bg-paper min-h-screen text-ink pb-24 selection:bg-gold selection:text-paper">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Minimal Navigation */}
        <div className="py-12 flex justify-between items-center">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] font-black hover:text-gold transition-all group"
          >
            <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1.5" strokeWidth={3} /> 
            Back to Catalog
          </motion.button>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-8"
          >
             <div className="relative">
               <Share2 
                 size={18} 
                 className="hover:text-gold cursor-pointer transition-colors" 
                 onClick={handleShare}
               />
               <AnimatePresence>
                 {showCopied && (
                   <motion.span 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0 }}
                     className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-[0.2em] text-gold whitespace-nowrap bg-paper px-3 py-1 rounded-full shadow-lg border border-gold/10"
                   >
                     Link Copied
                   </motion.span>
                 )}
               </AnimatePresence>
             </div>
             <Info size={18} className="hover:text-gold cursor-pointer transition-colors opacity-30 hover:opacity-100" />
          </motion.div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          
          {/* VISUALS: Premium Immersive Gallery */}
          <div className="lg:col-span-7 space-y-10">
            <div className="relative group">
              <motion.div 
                layoutId={`product-image-${product.id}`}
                className="aspect-square bg-white overflow-hidden rounded-[4rem] shadow-[0_100px_200px_rgba(0,0,0,0.12)] relative border-none"
              >
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    src={gallery[activeImage]} 
                    alt={product.name}
                    className="w-full h-full object-contain p-8"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* DETAILS: Configuration */}
          <div className="lg:col-span-5 mt-16 lg:mt-0">
            <div className="lg:sticky lg:top-24 space-y-12">
               <div className="space-y-8">
                  <div className="space-y-4">
                     <motion.div 
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       className="flex items-center gap-3"
                     >
                        <span className="h-[1px] w-8 bg-gold/40" />
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gold">{product.brand}</span>
                     </motion.div>
                     <motion.h1 
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.1 }}
                       className="text-4xl md:text-5xl lg:text-7xl font-serif italic font-medium text-ink leading-[0.85] uppercase tracking-wide"
                     >
                       {product.name}
                     </motion.h1>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-10"
                  >
                     <div className="flex flex-col">
                        <span className="text-4xl md:text-5xl font-serif italic font-medium text-ink tabular-nums">
                          {formatPrice(currentPrice)}
                        </span>
                     </div>
                     {currentPrice < product.price && (
                       <div className="flex flex-col opacity-40">
                          <span className="text-[10px] uppercase font-black text-red-500 mb-1">Sale</span>
                          <p className="text-2xl text-muted line-through font-black tracking-tighter tabular-nums">{formatPrice(product.price)}</p>
                       </div>
                     )}
                  </motion.div>
               </div>

               {/* Status Module */}
               <motion.div 
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 md:p-8 bg-accent/5 rounded-[2.5rem]"
               >
                  <div className="flex flex-col gap-1">
                    <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${isPreOrderActive ? 'text-preOrder' : (isLimitedTimeActive ? 'text-limitedTime' : 'text-ink')}`}>
                      {timerLabel}
                    </span>
                    <span className="text-[10px] text-muted font-bold tracking-tight opacity-50">Free Express Shipping</span>
                  </div>
                  {activeTimerTarget && (
                    <div className="flex items-center gap-4 bg-paper/50 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm w-full sm:w-auto justify-center sm:justify-start">
                      <Clock size={14} className="opacity-30 text-gold" />
                      <CountdownTimer expiry={activeTimerTarget} variant="inline" />
                    </div>
                  )}
               </motion.div>

               <div className="space-y-12">
                  {/* Selection Section */}
                  <div className="space-y-10">
                    {product.variants?.colors && product.variants.colors.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] uppercase font-black tracking-[0.4em] opacity-30">Color</span>
                          <span className="text-[10px] font-bold text-gold uppercase tracking-widest">{selectedColor}</span>
                        </div>
                        <div className="flex gap-4">
                          {product.variants.colors.map(color => (
                            <button 
                              key={color}
                              onClick={() => setSelectedColor(color)}
                              className={`w-12 h-12 rounded-full transition-all relative p-1 border-2 ${
                                selectedColor === color ? 'border-gold scale-110' : 'border-transparent hover:border-accent/20'
                              }`}
                            >
                              <div className="w-full h-full rounded-full bg-accent/10 flex items-center justify-center overflow-hidden">
                                <div className="w-full h-full" style={{ backgroundColor: color.toLowerCase().includes('titanium') ? '#7d7d7d' : (color.toLowerCase().includes('black') ? '#000' : (color.toLowerCase().includes('blue') ? '#1e3a8a' : (color.toLowerCase().includes('white') ? '#fff' : '#888'))) }} />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {product.variants?.storage && product.variants.storage.length > 0 && (
                      <div className="space-y-4">
                        <span className="text-[10px] uppercase font-black tracking-[0.4em] opacity-30">Storage</span>
                        <div className="flex gap-3">
                          {product.variants.storage.map(cap => (
                            <button 
                              key={cap}
                              onClick={() => setSelectedStorage(cap)}
                              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                selectedStorage === cap 
                                  ? 'bg-ink text-paper shadow-xl' 
                                  : 'bg-accent/5 text-muted hover:bg-accent/10'
                              }`}
                            >
                              {cap}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-8">
                    <p className="text-[11px] md:text-sm text-muted/80 leading-relaxed font-medium border-l-2 border-gold/20 pl-6">
                      {product.description}
                    </p>
                  </div>

                  {/* Purchase Flow */}
                  <div className="space-y-6">
                    <div className="flex flex-col gap-4">
                      {storeSettings.subscriptionsEnabled && (storeSettings.subscriptionDiscountPercent || 0) > 0 && (
                        <div className="space-y-4">
                           <button 
                             onClick={() => setIsSubscription(!isSubscription)}
                             className={`w-full flex justify-between items-center px-8 py-5 transition-all rounded-3xl ${
                                isSubscription ? 'bg-gold/10 border-2 border-gold/50 shadow-lg' : 'bg-accent/5 hover:bg-accent/10 border-2 border-transparent'
                             }`}
                           >
                              <div className="flex items-center gap-4">
                                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSubscription ? 'border-gold bg-gold' : 'border-accent/20'}`}>
                                    {isSubscription && <div className="w-2 h-2 bg-paper rounded-full" />}
                                 </div>
                                 <div className="text-left">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] block">Subscribe & Save</span>
                                    <span className="text-[8px] uppercase tracking-widest opacity-50 block mt-1">Unlock {storeSettings.subscriptionDiscountPercent}% recurring discount</span>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <span className="text-[10px] font-black text-gold">{storeSettings.subscriptionDiscountPercent}% OFF</span>
                              </div>
                           </button>

                           <AnimatePresence>
                             {isSubscription && (
                               <motion.div 
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: 'auto', opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 className="overflow-hidden"
                               >
                                 <div className="px-4 py-2 flex gap-3">
                                    <button 
                                      onClick={() => setSubscriptionInterval('fortnightly')}
                                      className={`flex-grow py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${
                                        subscriptionInterval === 'fortnightly' ? 'bg-ink text-paper shadow-md' : 'bg-accent/5 text-muted hover:bg-accent/10'
                                      }`}
                                    >
                                      Every 2 Weeks
                                    </button>
                                    <button 
                                      onClick={() => setSubscriptionInterval('monthly')}
                                      className={`flex-grow py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${
                                        subscriptionInterval === 'monthly' ? 'bg-ink text-paper shadow-md' : 'bg-accent/5 text-muted hover:bg-accent/10'
                                      }`}
                                    >
                                      Every 4 Weeks
                                    </button>
                                 </div>
                               </motion.div>
                             )}
                           </AnimatePresence>
                        </div>
                      )}

                      <div className="flex items-center justify-between px-8 bg-accent/5 rounded-3xl border-none shadow-inner h-16 w-full">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-30">Quantity</span>
                        <div className="flex items-center gap-6">
                          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:text-gold transition-all p-2 text-xl font-light opacity-30 hover:opacity-100">－</button>
                          <span className="w-8 text-center text-lg font-bold tabular-nums">{quantity}</span>
                          <button onClick={() => setQuantity(quantity + 1)} className="hover:text-gold transition-all p-2 text-xl font-light opacity-30 hover:opacity-100">＋</button>
                        </div>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        disabled={!isAvailable || added}
                        onClick={() => {
                          if (isAvailable && !added) {
                            addToCart(product, quantity, {
                              color: selectedColor || undefined,
                              storage: selectedStorage || undefined,
                              tier: selectedTier || undefined
                            });
                            setAdded(true);
                            setTimeout(() => setAdded(false), 2000);
                          }
                        }}
                        className={`w-full h-20 text-[12px] font-black uppercase tracking-[0.4em] transition-all relative overflow-hidden group rounded-3xl shadow-xl flex items-center justify-center gap-4 ${
                          added
                            ? 'bg-gold text-white'
                            : isAvailable
                              ? 'bg-ink text-paper' 
                              : 'bg-black/5 text-muted cursor-not-allowed opacity-40'
                        }`}
                      >
                        <span className="relative z-10">
                          {added ? 'ADDED TO CART' : (isAvailable ? 'ADD TO CART' : 'OUT OF STOCK')}
                        </span>
                        {isAvailable && !added && <ArrowRight size={18} className="relative z-10 transition-transform group-hover:translate-x-2" />}
                        {added && <Sparkles size={18} className="relative z-10 animate-pulse" />}
                        <div className="absolute inset-0 bg-gold/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-[1000ms] ease-out" />
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 rounded-2xl bg-accent/5 flex items-center gap-4 group hover:bg-accent/10 transition-colors">
                          <Truck size={18} className="text-gold opacity-50 group-hover:opacity-100" />
                          <div className="flex flex-col">
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted">Shipping</span>
                            <span className="text-[10px] font-bold uppercase">Express Delivery</span>
                          </div>
                       </div>
                       <div className="p-4 rounded-2xl bg-accent/5 flex items-center gap-4 group hover:bg-accent/10 transition-colors">
                          <Package size={18} className="text-gold opacity-50 group-hover:opacity-100" />
                          <div className="flex flex-col">
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted">Returns</span>
                            <span className="text-[10px] font-bold uppercase">30-Day Window</span>
                          </div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
