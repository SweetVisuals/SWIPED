/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, ChevronLeft, CreditCard, Ship, Lock, CheckCircle2, AlertCircle, ShieldCheck, Beaker } from 'lucide-react';

interface CheckoutProps {
  onBack: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onBack }) => {
  const { cart, removeFromCart, updateCartQuantity, paymentMethods, shippingMethods, clearCart } = useApp();
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const selectedShipping = shippingMethods.find(s => s.enabled) || shippingMethods[0];
  const total = subtotal + (selectedShipping ? selectedShipping.price : 0);

  const [step, setStep] = useState(1);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeData, setAgreeData] = useState(false);
  const [showError, setShowError] = useState(false);
  const [show3DSecure, setShow3DSecure] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFinalize = () => {
    if (!agreeTerms || !agreeData) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setIsProcessing(true);
    // Simulate init
    setTimeout(() => {
      setIsProcessing(false);
      setShow3DSecure(true);
    }, 1500);
  };

  const handleApproveAuth = () => {
    setShow3DSecure(false);
    setIsProcessing(true);
    // Simulate payment confirm
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="bg-paper min-h-[80vh] flex flex-col items-center justify-center px-4 py-24 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl bg-white border border-accent/40 p-12 lg:p-20 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-ink" />
          <CheckCircle2 size={48} className="mx-auto text-ink mb-8" strokeWidth={1} />
          <h2 className="font-serif text-4xl lg:text-5xl italic text-ink mb-4">Curation Confirmed</h2>
          <p className="text-[10px] uppercase tracking-widest font-bold text-muted mb-12">Order #LGS-{Math.floor(Math.random() * 90000) + 10000}</p>
          
          <div className="border border-accent/40 bg-accent/5 p-8 text-left space-y-4 mb-12">
            <h3 className="text-[9px] uppercase tracking-widest font-bold text-ink border-b border-accent/20 pb-4">Order Overview</h3>
            <div className="flex justify-between text-xs py-2">
               <span className="text-muted">Total Paid</span>
               <span className="font-bold text-ink border-b border-ink">€{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs py-2">
               <span className="text-muted">Fulfillment</span>
               <span className="text-ink">Standard Processing (1-2 days)</span>
            </div>
          </div>
          
          <p className="text-sm text-muted leading-relaxed mb-12">
            A secure confirmation has been dispatched to your email. You will receive cryptographic tracking details once your curation leaves our atelier.
          </p>

          <button onClick={onBack} className="luxury-button-filled w-full">Return to Studio</button>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-8 px-4 text-center bg-paper">
        <h2 className="font-serif text-5xl italic text-ink">Your bag is empty</h2>
        <p className="text-muted tracking-[0.4em] uppercase text-[10px] font-bold">Ready to find your perfect pair?</p>
        <button onClick={onBack} className="luxury-button">Begin Curation</button>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen py-12 lg:py-24 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Form / Steps */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-12">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-muted hover:text-ink transition-colors text-[10px] uppercase tracking-[0.2em] font-bold"
          >
            <ChevronLeft size={16} /> Continue Shopping
          </button>

          <div className="space-y-20">
            <section>
              <div className="flex items-center gap-6 mb-10">
                 <div className="w-10 h-10 border border-ink flex items-center justify-center text-xs font-bold bg-white italic serif">01</div>
                 <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold">Contact Profile</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="First Name" className="bg-white border border-accent px-6 py-5 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-ink transition-colors" />
                <input type="text" placeholder="Last Name" className="bg-white border border-accent px-6 py-5 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-ink transition-colors" />
                <input type="email" placeholder="Email Address" className="bg-white border border-accent px-6 py-5 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-ink transition-colors md:col-span-2" />
              </div>
            </section>

            <section>
              <div className="flex items-center gap-6 mb-10">
                 <div className="w-10 h-10 border border-ink flex items-center justify-center text-xs font-bold bg-white italic serif">02</div>
                 <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold">Shipping Logistics</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Street Address" className="bg-white border border-accent px-6 py-5 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-ink transition-colors md:col-span-2" />
                <input type="text" placeholder="Apt, Suite, Room (Optional)" className="bg-white border border-accent px-6 py-5 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-ink transition-colors md:col-span-2" />
                <input type="text" placeholder="City" className="bg-white border border-accent px-6 py-5 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-ink transition-colors" />
                <input type="text" placeholder="Postal Code" className="bg-white border border-accent px-6 py-5 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-ink transition-colors" />
              </div>
            </section>

            <section>
              <div className="flex items-center gap-6 mb-10">
                 <div className="w-10 h-10 border border-ink flex items-center justify-center text-xs font-bold bg-white italic serif">03</div>
                 <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold">Delivery Priority</h2>
              </div>
              <div className="space-y-4">
                {shippingMethods.filter(s => s.enabled).map(method => (
                  <label key={method.id} className="flex items-center justify-between p-6 bg-white border border-accent/40 cursor-pointer hover:border-ink transition-colors group">
                    <div className="flex items-center gap-4">
                       <input type="radio" name="shipping" defaultChecked={method.id === selectedShipping?.id} className="accent-ink w-4 h-4" />
                       <span className="text-[10px] uppercase font-bold tracking-widest">{method.name}</span>
                    </div>
                    <span className="text-sm font-bold text-ink">€{method.price.toFixed(2)}</span>
                  </label>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-6 mb-10">
                 <div className="w-10 h-10 border border-ink flex items-center justify-center text-xs font-bold bg-white italic serif">04</div>
                 <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold">Financial</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {paymentMethods.filter(p => p.enabled).map(p => (
                   <button key={p.id} className="p-8 bg-white border border-accent/40 hover:border-ink transition-colors flex flex-col items-center gap-4 group">
                      <div className="text-muted group-hover:text-ink transition-colors">
                        {p.type === 'card' && <CreditCard size={20} />}
                        {p.type === 'paypal' && <Ship size={20} />}
                        {p.type === 'klarna' && <Lock size={20} />}
                        {p.type === 'test' && <Beaker size={20} />}
                      </div>
                      <span className="text-[9px] uppercase font-bold tracking-[0.2em]">{p.name}</span>
                   </button>
                 ))}
              </div>
            </section>

            <div className="space-y-6 max-w-xl pb-4">
              <label className="flex items-start gap-4 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-ink"
                />
                <span className="text-[10px] uppercase tracking-widest leading-relaxed text-muted group-hover:text-ink transition-colors">
                  I agree to the Terms of Service and Return Policy. I acknowledge that lashes removed from their original tray cannot be returned due to hygiene regulations.
                </span>
              </label>
              
              <label className="flex items-start gap-4 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={agreeData}
                  onChange={(e) => setAgreeData(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-ink"
                />
                <span className="text-[10px] uppercase tracking-widest leading-relaxed text-muted group-hover:text-ink transition-colors">
                  I consent to the secure processing of my personal and financial data for order fulfillment as outlined in the Privacy Policy.
                </span>
              </label>

              {showError && (
                 <div className="flex items-center gap-2 text-red-700 text-xs font-bold uppercase tracking-widest bg-red-50 p-4 border border-red-200">
                    <AlertCircle size={16} /> 
                    Please accept all required agreements to finalize.
                 </div>
              )}
            </div>

            <button 
              onClick={handleFinalize}
              disabled={isProcessing}
              className="w-full luxury-button-filled py-7 text-xs shadow-xl shadow-ink/5 disabled:opacity-50"
            >
              {isProcessing ? 'Processing Securely...' : 'Finalize Curation'}
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-12 xl:col-span-5">
           <div className="sticky top-32 bg-accent/20 p-8 lg:p-12 space-y-12 border border-accent/40 shadow-sm shadow-accent/20">
              <h2 className="font-serif text-3xl italic text-ink">Bag Summary</h2>
              
              <div className="space-y-10 max-h-[40vh] overflow-y-auto no-scrollbar pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-8">
                    <div className="w-24 aspect-[4/5] bg-white border border-accent/20 p-1 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[10%]" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-xl italic text-ink">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.id)} className="text-muted hover:text-ink transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted mt-2">Glaze Series Profile</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest border border-accent px-4 py-2 bg-white">
                          <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="text-muted hover:text-ink">-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="text-muted hover:text-ink">+</button>
                        </div>
                        <p className="text-sm font-bold text-ink">€{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6 pt-12 border-t border-accent">
                <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] font-bold text-muted">
                   <span>Subtotal</span>
                   <span className="text-ink">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] font-bold text-muted">
                   <span>Priority Shipping</span>
                   <span className="text-ink">€{selectedShipping?.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-ink pt-6 border-t border-ink/5">
                   <span className="text-xs uppercase tracking-[0.4em] font-bold">Total</span>
                   <span className="text-2xl font-bold">€{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.4em] text-muted justify-center font-bold">
                 <Lock size={12} /> Secure Encryption Active
              </div>
           </div>
        </div>
      </div>

      {/* 3D Secure Verification Modal */}
      <AnimatePresence>
        {show3DSecure && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white max-w-md w-full p-8 shadow-2xl relative overflow-hidden flex flex-col"
            >
              <div className="text-center mb-8">
                <ShieldCheck size={40} className="mx-auto text-ink mb-4" strokeWidth={1} />
                <h3 className="font-serif text-2xl italic text-ink mb-2">3D Secure Verification</h3>
                <p className="text-xs text-muted">Confirming with your bank</p>
              </div>
              
              <div className="bg-accent/10 border border-accent/20 p-4 mb-8 text-center">
                <p className="text-[10px] uppercase font-bold tracking-widest text-ink mb-1">Total Charge</p>
                <p className="text-2xl font-bold font-mono">€{total.toFixed(2)}</p>
              </div>

              <div className="flex flex-col gap-3">
                 <button 
                   onClick={handleApproveAuth}
                   className="luxury-button-filled w-full font-bold"
                 >
                   Approve Authentication
                 </button>
                 <button 
                   onClick={() => { setShow3DSecure(false); setIsProcessing(false); }}
                   className="text-[10px] uppercase tracking-widest font-bold text-muted hover:text-red-700 transition-colors py-2"
                 >
                   Cancel Request
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
