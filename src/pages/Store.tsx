/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Truck, ShieldCheck, RefreshCcw, Clock, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { Product } from '../types';
import { CountdownTimer } from '../components/CountdownTimer';
import { ProductFilter } from '../components/ProductFilter';

interface StoreProps {
  onProductClick: (id: string) => void;
}

export const Store: React.FC<StoreProps> = ({ onProductClick }) => {
  const { products, formatPrice, storeSettings, isAdmin } = useApp();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="pb-32 bg-paper selection:bg-gold selection:text-paper">
      {/* Hero Section */}
      {storeSettings.heroEnabled && (
        <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.img 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 1 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              src={storeSettings.heroBannerUrl} 
              alt="SWIPED BY Hero"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/10 to-transparent" />
            <div className="absolute inset-0 bg-black/10" />
          </div>
          
          <div className="relative z-10 text-center px-8 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span 
                initial={{ opacity: 0, tracking: '0.2em' }}
                animate={{ opacity: 1, tracking: '0.6em' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="inline-block text-[10px] text-gold font-black uppercase mb-10 block"
              >
                Now Available: Series 15 Advanced
              </motion.span>
              <h1 className="font-display text-7xl md:text-9xl text-ink font-black mb-12 tracking-tighter leading-[0.85] uppercase">
                Defining <br/>Performance.
              </h1>
              <p className="text-[11px] md:text-xs text-muted mb-20 tracking-[0.4em] uppercase font-black max-w-2xl mx-auto leading-loose opacity-60">
                Experience the absolute pinnacle of mobile architecture. <br className="hidden md:block"/> Precision engineering meets editorial elegance.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
                    className="luxury-button-filled group flex items-center gap-4"
                  >
                    Explore Collection
                    <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </motion.button>
                  {(() => {
                    const productWithTimer = [...products]
                      .sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime())
                      .find(p => p.limitedTimeEnabled && p.limitedTimeEndsAt);
                    
                    const expiry = productWithTimer?.limitedTimeEndsAt 
                      ? new Date(productWithTimer.limitedTimeEndsAt) 
                      : new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);

                    return (
                      <CountdownTimer 
                        expiry={expiry} 
                        variant="button"
                      />
                    );
                  })()}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Trust Badges - Modern Layout */}
      {storeSettings.badgesEnabled && (
        <section className="max-w-7xl mx-auto px-8 md:px-16 py-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="premium-card text-center group"
            >
              <div className="w-16 h-16 bg-accent/5 rounded-3xl flex items-center justify-center mx-auto mb-10 transition-transform duration-700 group-hover:rotate-[360deg]">
                <RefreshCcw className="text-gold" size={24} />
              </div>
              <h3 className="text-[11px] uppercase tracking-[0.4em] font-black mb-6">Certified Quality</h3>
              <p className="text-[10px] text-muted font-black tracking-widest uppercase leading-loose opacity-40">100-point inspection by certified technicians on every hardware unit.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="premium-card text-center group"
            >
              <div className="w-16 h-16 bg-accent/5 rounded-3xl flex items-center justify-center mx-auto mb-10 transition-transform duration-700 group-hover:-translate-y-2">
                <Truck className="text-gold" size={24} />
              </div>
              <h3 className="text-[11px] uppercase tracking-[0.4em] font-black mb-6">Global Transit</h3>
              <p className="text-[10px] text-muted font-black tracking-widest uppercase leading-loose opacity-40">Priority logistics. Next-day delivery available in all major territories.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="premium-card text-center group"
            >
              <div className="w-16 h-16 bg-accent/5 rounded-3xl flex items-center justify-center mx-auto mb-10 transition-all duration-700 group-hover:scale-110">
                <ShieldCheck className="text-gold" size={24} />
              </div>
              <h3 className="text-[11px] uppercase tracking-[0.4em] font-black mb-6">Hub Protection</h3>
              <p className="text-[10px] text-muted font-black tracking-widest uppercase leading-loose opacity-40">Industry-leading 2-year comprehensive coverage on all system hardware.</p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Product Feed */}
      <section id="collection" className="max-w-7xl mx-auto px-8 md:px-16 py-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <ProductFilter 
              products={products} 
              onFilterChange={setFilteredProducts}
              formatPrice={(amount) => formatPrice(amount)}
              isAdmin={isAdmin}
            />
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden w-full mb-8">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsFilterOpen(true)}
              className="w-full py-6 bg-accent/5 rounded-[2rem] flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-ink hover:bg-accent/10 transition-all border-none"
            >
              <SlidersHorizontal size={16} className="text-gold" />
              Refine Collection
            </motion.button>
          </div>

          {/* Mobile Filter Sidebar Drawer */}
          <AnimatePresence>
            {isFilterOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsFilterOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[3000] lg:hidden"
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="fixed inset-y-0 left-0 w-full max-w-sm bg-paper z-[3001] shadow-2xl lg:hidden overflow-y-auto no-scrollbar p-8"
                >
                  <div className="flex items-center justify-between mb-12">
                    <h3 className="font-display text-2xl font-black uppercase tracking-tighter">Refinement</h3>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsFilterOpen(false)}
                      className="p-4 bg-accent/5 rounded-2xl border-none"
                    >
                      <X size={20} />
                    </motion.button>
                  </div>
                  <ProductFilter 
                    products={products} 
                    onFilterChange={setFilteredProducts}
                    formatPrice={(amount) => formatPrice(amount)}
                    isAdmin={isAdmin}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="flex-grow w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, idx) => (
                  <motion.div 
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.22, 1, 0.36, 1],
                      layout: { duration: 0.4 }
                    }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                    onClick={() => onProductClick(product.id)}
                  >
                    <div className="relative aspect-square overflow-hidden rounded-[3rem] bg-white mb-10 shadow-lg group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)] transition-all duration-700">
                        {(() => {
                          const now = new Date();
                          const preOrderEndsAt = product.preOrderEndsAt ? new Date(product.preOrderEndsAt) : null;
                          const limitedTimeEndsAt = product.limitedTimeEndsAt ? new Date(product.limitedTimeEndsAt) : null;

                          const isPreOrder = !!(product.preOrderEnabled && preOrderEndsAt && now < preOrderEndsAt);
                          const isLimited = !!(product.limitedTimeEnabled && limitedTimeEndsAt && now < limitedTimeEndsAt && (!preOrderEndsAt || now > preOrderEndsAt));
                          const isReserve = !!(product.limitedTimeEnabled && limitedTimeEndsAt && now >= limitedTimeEndsAt);

                          if (isLimited) return null; // Moved to title area

                          if (isAdmin && product.status === 'draft') return (
                            <div className="absolute top-8 left-8 z-20 pointer-events-none">
                              <div className="relative">
                                <div className="absolute inset-0 bg-blue-500/20 blur-xl animate-pulse" />
                                <div className="relative bg-blue-500/90 backdrop-blur-md text-white px-5 py-2 text-[8px] font-black uppercase tracking-[0.3em] rounded-full flex items-center gap-2 shadow-2xl">
                                  <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
                                  Preview / Draft
                                </div>
                              </div>
                            </div>
                          );

                          if (isPreOrder) return (
                            <div className="absolute top-8 left-8 z-20 pointer-events-none">
                              <div className="relative">
                                <div className="absolute inset-0 bg-accent/20 blur-xl animate-pulse" />
                                <div className="relative bg-paper/90 backdrop-blur-md text-accent px-5 py-2 text-[8px] font-black uppercase tracking-[0.3em] rounded-full flex items-center gap-2 shadow-2xl">
                                  <span className="w-1 h-1 bg-accent rounded-full animate-pulse" />
                                  Priority Order
                                </div>
                              </div>
                            </div>
                          );
                          if (isReserve) return (
                            <div className="absolute top-8 left-8 z-20 pointer-events-none">
                              <div className="relative">
                                <div className="absolute inset-0 bg-ink/10 blur-xl" />
                                <div className="relative bg-ink/90 backdrop-blur-md text-paper px-5 py-2 text-[8px] font-black uppercase tracking-[0.3em] rounded-full flex items-center gap-2 shadow-2xl">
                                  <span className="w-1 h-1 bg-white/40 rounded-full" />
                                  Reserve Archive
                                </div>
                              </div>
                            </div>
                          );
                          return null;
                        })()}
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-end p-10 backdrop-blur-[2px]">
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-6 bg-paper text-ink text-[11px] font-black uppercase tracking-[0.3em] rounded-[1.5rem] shadow-2xl translate-y-8 group-hover:translate-y-0 transition-all duration-700"
                          >
                            View Details
                          </motion.button>
                        </div>
                    </div>
                    <div className="space-y-4 px-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-serif text-[11px] font-semibold group-hover:text-gold transition-colors leading-relaxed uppercase tracking-tight truncate block flex-grow">{product.name}</h3>
                          {(() => {
                            const now = new Date();
                            const preOrderEndsAt = product.preOrderEndsAt ? new Date(product.preOrderEndsAt) : null;
                            const limitedTimeEndsAt = product.limitedTimeEndsAt ? new Date(product.limitedTimeEndsAt) : null;
                            const isPreOrder = !!(product.preOrderEnabled && preOrderEndsAt && now < preOrderEndsAt);
                            const isLimited = !!(product.limitedTimeEnabled && limitedTimeEndsAt && now < limitedTimeEndsAt && (!preOrderEndsAt || now > preOrderEndsAt));
                            
                            if (isLimited) return (
                              <div className="relative flex items-center justify-center shrink-0" title="Limited Archive">
                                <div className="absolute inset-0 bg-gold/20 blur-md animate-pulse rounded-full" />
                                <div className="relative w-2 h-2 bg-gold rounded-full shadow-[0_0_8px_#D4AF37] animate-pulse" />
                              </div>
                            );
                            return null;
                          })()}
                        </div>
                        <div className="flex items-center gap-4 h-6">
                          {(() => {
                            const now = new Date();
                            const preOrderEndsAt = product.preOrderEndsAt ? new Date(product.preOrderEndsAt) : null;
                            const isPreOrder = !!(product.preOrderEnabled && preOrderEndsAt && now < preOrderEndsAt);
                            const currentPrice = (isPreOrder && product.preOrderPrice) 
                              ? product.preOrderPrice 
                              : (product.salePrice && product.salePrice < product.price ? product.salePrice : product.price);

                            if (currentPrice < product.price) {
                              return (
                                <div className="flex items-baseline gap-3">
                                  <span className="text-[11px] text-ink font-serif font-semibold tracking-tight tabular-nums whitespace-nowrap">{formatPrice(currentPrice)}</span>
                                  <span className="text-[9px] text-muted line-through opacity-30 font-bold tabular-nums whitespace-nowrap">{formatPrice(product.price)}</span>
                                </div>
                              );
                            }
                            return <span className="text-[11px] text-ink font-serif font-semibold tracking-tight tabular-nums whitespace-nowrap">{formatPrice(product.price)}</span>;
                          })()}
                        </div>
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-muted font-black opacity-30">{product.category || 'Premium Edition'}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-40 text-center space-y-8 opacity-30">
                  <SlidersHorizontal size={48} className="mx-auto text-gold mb-6" strokeWidth={1} />
                  <p className="text-sm font-serif italic text-ink">No units match your selection criteria.</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="text-[10px] uppercase tracking-[0.4em] font-black text-gold hover:underline"
                  >
                    Reset Environment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
