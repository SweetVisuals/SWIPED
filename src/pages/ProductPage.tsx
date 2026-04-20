/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Minus, Plus, Share2, Info, ChevronLeft, Clock, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { CountdownTimer } from '../components/CountdownTimer';

interface ProductPageProps {
  productId: string;
  onBack: () => void;
  onCheckout: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ productId, onBack, onCheckout }) => {
  const { products, addToCart, dropExpiry, isDropActive } = useApp();
  const product = products.find(p => p.id === productId);
  const [quantity, setQuantity] = useState(1);
  const [selectedLength, setSelectedLength] = useState('9-16mm');
  const [activeImage, setActiveImage] = useState(0);
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscription'>('one-time');
  const [subscriptionInterval, setSubscriptionInterval] = useState<'fortnightly' | 'monthly'>('fortnightly');

  if (!product) return null;

  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const currentPrice = purchaseType === 'one-time' 
    ? product.price 
    : (subscriptionInterval === 'fortnightly' ? 32.99 : 17.99);

  const handleAddToCart = () => {
    if (isDropActive) {
      // Create a modified product object with the subscription info if needed
      const productToAdd = { 
        ...product, 
        price: currentPrice,
        name: purchaseType === 'subscription' 
          ? `${product.name} (Sub: ${subscriptionInterval === 'fortnightly' ? 'Every 2 Weeks' : 'Monthly'})`
          : product.name
      };
      addToCart(productToAdd, quantity);
      onCheckout(); 
    }
  };

  return (
    <div className="bg-paper min-h-screen text-ink">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
        {/* Simple Minimal Back Navigation */}
        <div className="py-12">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-bold hover:opacity-50 transition-all group"
          >
            <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" strokeWidth={3} /> 
            Back
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-32 pb-32">
          
          {/* VISUALS: Simple Stack or Gallery */}
          <div className="space-y-8">
            <motion.div 
              layoutId={`product-image-${product.id}`}
              className="aspect-[4/5] bg-accent/5 overflow-hidden border border-accent/20"
            >
              <img 
                src={gallery[activeImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {gallery.length > 1 && (
              <div className="grid grid-cols-5 gap-4">
                {gallery.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-square border transition-all ${activeImage === idx ? 'border-ink' : 'border-transparent opacity-40 hover:opacity-100'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DETAILS: Rethought & Simplified */}
          <div className="mt-16 lg:mt-0 space-y-12">
            <div className="space-y-6">
               <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                    <span>Aura Editorial</span>
                    <span className="w-1 h-1 bg-accent rounded-full" />
                    <span>Drop 001</span>
                  </div>
                  <h1 className="font-sans text-3xl lg:text-5xl font-bold tracking-tight text-ink">{product.name}</h1>
               </div>

               <div className="flex items-baseline gap-4 mt-2">
                  <span className="text-2xl font-bold tracking-tighter text-ink">€{currentPrice.toFixed(2)}</span>
                  {product.salePrice && purchaseType === 'one-time' && (
                    <span className="text-base text-muted/50 line-through font-bold">€{product.salePrice.toFixed(2)}</span>
                  )}
               </div>

               {/* Integrated Timer Box */}
               <div className="bg-accent/5 border border-accent/20 p-6 space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-[0.3em]">
                     <span className={isDropActive ? 'text-ink' : 'text-red-500'}>
                       {isDropActive ? 'Window active' : 'Window Closed'}
                     </span>
                     <CountdownTimer expiry={dropExpiry} variant="inline" />
                  </div>
               </div>
            </div>

            <div className="space-y-10">
               {/* Subscription Options */}
               <div className="space-y-4">
                  <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-muted">Purchase Plan</label>
                  <div className="space-y-2">
                    {/* One-time */}
                    <button 
                      onClick={() => setPurchaseType('one-time')}
                      className={`w-full flex justify-between items-center px-6 py-4 border transition-all ${
                        purchaseType === 'one-time' ? 'border-ink bg-ink/5' : 'border-black/5 group hover:border-ink/20'
                      }`}
                    >
                       <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full border border-ink flex items-center justify-center`}>
                            {purchaseType === 'one-time' && <div className="w-1.5 h-1.5 bg-ink rounded-full" />}
                          </div>
                          <span className="text-[10px] uppercase tracking-widest font-bold">One-time purchase</span>
                       </div>
                       <span className="text-[10px] font-mono font-bold">€{product.price.toFixed(2)}</span>
                    </button>

                    {/* Subscribe */}
                    <div className={`border transition-all ${purchaseType === 'subscription' ? 'border-ink bg-ink/5' : 'border-black/5'}`}>
                      <button 
                        onClick={() => setPurchaseType('subscription')}
                        className="w-full flex justify-between items-center px-6 py-4"
                      >
                         <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full border border-ink flex items-center justify-center`}>
                              {purchaseType === 'subscription' && <div className="w-1.5 h-1.5 bg-ink rounded-full" />}
                            </div>
                            <span className="text-[10px] uppercase tracking-widest font-bold">Subscribe & Save</span>
                         </div>
                         <span className="text-[10px] font-mono text-gold font-bold italic">From €17.99</span>
                      </button>

                      {purchaseType === 'subscription' && (
                        <div className="px-6 pb-6 pt-2 space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                              <button 
                                onClick={(e) => { e.stopPropagation(); setSubscriptionInterval('fortnightly'); }}
                                className={`flex flex-col p-4 border text-left transition-all ${subscriptionInterval === 'fortnightly' ? 'border-ink bg-white' : 'border-black/5 bg-paper hover:border-ink/20'}`}
                              >
                                 <span className="text-[9px] uppercase tracking-tighter font-bold mb-1">Fortnightly</span>
                                 <span className="text-xs font-mono font-bold">€32.99</span>
                                 <span className="text-[7px] uppercase tracking-widest opacity-40 mt-1">Every 2 weeks</span>
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setSubscriptionInterval('monthly'); }}
                                className={`flex flex-col p-4 border text-left transition-all ${subscriptionInterval === 'monthly' ? 'border-ink bg-white' : 'border-black/5 bg-paper hover:border-ink/20'}`}
                              >
                                 <span className="text-[9px] uppercase tracking-tighter font-bold mb-1">Monthly</span>
                                 <span className="text-xs font-mono font-bold">€17.99</span>
                                 <span className="text-[7px] uppercase tracking-widest opacity-40 mt-1">Every 4 weeks</span>
                              </button>
                           </div>
                        </div>
                      )}
                    </div>
                  </div>
               </div>

               {/* Action */}
               <div className="space-y-6 pt-6">
                  <div className="flex gap-4">
                    <div className="flex items-center border border-black/10 px-4 font-bold text-sm">
                       <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:opacity-40 transition-opacity">－</button>
                       <span className="w-8 text-center text-xs">{quantity}</span>
                       <button onClick={() => setQuantity(quantity + 1)} className="hover:opacity-40 transition-opacity">＋</button>
                    </div>
                    <button 
                      disabled={!isDropActive}
                      onClick={handleAddToCart}
                      className={`flex-grow py-5 text-[10px] font-extrabold uppercase tracking-[0.4em] transition-all relative overflow-hidden group ${
                        isDropActive 
                          ? 'bg-ink text-paper hover:bg-gold hover:text-black shadow-xl shadow-gold/5' 
                          : 'bg-black/5 text-muted cursor-not-allowed'
                      }`}
                    >
                      <span className="relative z-10">{isDropActive ? 'Add to cart' : 'Sold Out'}</span>
                    </button>
                  </div>
               </div>
            </div>

            {/* Product Desc - More refined */}
            <div className="pt-12 border-t border-accent/20 space-y-6">
               <div className="space-y-3">
                  <h4 className="text-[8px] uppercase font-bold tracking-[0.4em] text-muted">The Aesthetic</h4>
                  <p className="text-xs leading-relaxed font-serif italic text-muted max-w-lg">
                    "{product.description}"
                  </p>
               </div>
               
               <div className="flex gap-12 pt-4">
                  <div className="space-y-1">
                     <h5 className="text-[8px] uppercase font-bold tracking-widest text-muted">Wear Cycles</h5>
                     <p className="text-[9px] font-bold tracking-widest">15-20 Applications</p>
                  </div>
                  <div className="space-y-1">
                     <h5 className="text-[8px] uppercase font-bold tracking-widest text-muted">Grade</h5>
                     <p className="text-[9px] font-bold tracking-widest">Artisanal 5D Silk</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
