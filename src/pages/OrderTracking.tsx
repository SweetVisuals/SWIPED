/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { Package, Truck, CheckCircle2, Clock, MapPin, Search, ChevronRight, Box } from 'lucide-react';

export const OrderTracking: React.FC = () => {
  const { orders } = useApp();
  const [orderId, setOrderId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<any>(null);
  const [error, setError] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const order = orders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
    if (order) {
      setTrackedOrder(order);
      setError('');
    } else {
      setTrackedOrder(null);
      setError('Order not found. Please check your ID and try again.');
    }
  };

  const stages = [
    { id: 'pending', label: 'Order Placed', icon: Clock, desc: 'We have received your order.' },
    { id: 'processed', label: 'Processing', icon: Box, desc: 'Your lashes are being hand-picked.' },
    { id: 'shipped', label: 'Shipped', icon: Truck, desc: 'Your order is on its way.' },
    { id: 'out-for-delivery', label: 'Out for Delivery', icon: MapPin, desc: 'Arriving at your doorstep soon.' },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle2, desc: 'Package received. Enjoy!' },
  ];

  const currentStageIndex = trackedOrder 
    ? stages.findIndex(s => s.id === trackedOrder.status)
    : -1;

  return (
    <div className="bg-paper min-h-screen py-24 px-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center space-y-4 mb-20">
          <h1 className="font-serif text-5xl italic tracking-tight">Track Your Journey</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-muted font-bold">Lash Glaze Series Delivery Tracking</p>
        </header>

        <form onSubmit={handleTrack} className="flex gap-4 mb-16">
          <div className="relative flex-grow">
            <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              type="text" 
              placeholder="ENTER ORDER ID (E.G. ORD-1001)"
              className="w-full bg-accent/10 border border-accent/20 px-16 py-6 text-xs uppercase tracking-widest font-bold focus:border-ink outline-none transition-all placeholder:text-muted/30"
            />
          </div>
          <button type="submit" className="bg-ink text-paper px-12 py-6 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gold hover:text-ink transition-all shadow-xl">
            TRACK
          </button>
        </form>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-8 border border-red-500/10 bg-red-500/5 text-red-500 text-[10px] uppercase font-bold tracking-widest">
            {error}
          </motion.div>
        )}

        {trackedOrder && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="flex justify-between items-end border-b border-accent/20 pb-8 font-bold uppercase tracking-widest">
              <div>
                <p className="text-[10px] text-muted mb-2">Tracking Status</p>
                <h3 className="text-2xl tracking-tighter text-ink">{trackedOrder.id}</h3>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-muted mb-2">Estimated Delivery</p>
                <p className="text-sm">Wednesday, April 22</p>
              </div>
            </div>

            {/* Stepper */}
            <div className="relative">
              {/* Line */}
              <div className="absolute left-[23px] top-4 bottom-4 w-px bg-accent/20" />
              <div 
                className="absolute left-[23px] top-4 w-px bg-gold transition-all duration-1000" 
                style={{ height: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
              />

              <div className="space-y-12">
                {stages.map((stage, idx) => {
                  const Icon = stage.icon;
                  const isCompleted = idx <= currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  return (
                    <div key={stage.id} className="flex gap-10 relative z-10">
                      <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-700 ${
                        isCompleted ? 'bg-gold border-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'bg-paper border-accent/20 text-muted'
                      }`}>
                        <Icon size={20} className={isCurrent ? 'animate-pulse' : ''} />
                      </div>
                      <div className="pt-1 space-y-1">
                        <h4 className={`text-[11px] uppercase font-bold tracking-widest transition-colors ${isCompleted ? 'text-ink' : 'text-muted/40'}`}>
                          {stage.label}
                        </h4>
                        <p className={`text-[10px] tracking-widest leading-relaxed transition-colors ${isCompleted ? 'text-muted' : 'text-muted/20'}`}>
                          {stage.desc}
                        </p>
                      </div>
                      {isCurrent && (
                        <div className="ml-auto flex items-center">
                          <span className="text-[8px] bg-ink text-paper px-3 py-1 rounded-full font-bold uppercase tracking-widest">LATEST STATUS</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-accent/5 p-10 border border-accent/20 grid grid-cols-2 gap-10">
               <div className="space-y-4">
                  <h5 className="text-[10px] uppercase font-bold tracking-[0.3em] text-muted">Shipped Via</h5>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-white border border-accent/20 flex items-center justify-center font-bold italic text-ink">DHL</div>
                     <p className="text-[10px] font-bold tracking-widest">Global Express Priority</p>
                  </div>
               </div>
               <div className="space-y-4">
                  <h5 className="text-[10px] uppercase font-bold tracking-[0.3em] text-muted">Destination</h5>
                  <p className="text-[10px] font-bold tracking-widest leading-loose uppercase">
                    123 Fashion Street, Suite 456<br />
                    New York, NY 10001
                  </p>
               </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
