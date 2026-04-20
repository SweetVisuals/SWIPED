/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Instagram, Music2 } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-paper border-t border-accent pt-32 pb-20 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
        <div className="lg:col-span-1">
          <div className="flex flex-col mb-10">
            <span className="font-serif text-3xl italic font-bold uppercase tracking-widest">Lash</span>
            <span className="text-[10px] tracking-[0.4em] font-bold opacity-40 uppercase leading-none mt-1">Glaze Studio</span>
          </div>
          <div className="flex gap-8 mt-12">
            <Instagram size={18} className="text-muted hover:text-ink cursor-pointer transition-colors" />
            <Music2 size={18} className="text-muted hover:text-ink cursor-pointer transition-colors" />
          </div>
        </div>
        
        <div className="lg:pl-10">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-10">Archive</h4>
          <ul className="flex flex-col gap-6 text-[10px] font-bold uppercase tracking-widest text-muted">
            <li onClick={() => onNavigate && onNavigate('store')} className="hover:text-ink cursor-pointer transition-colors">Shop All</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-10">Assistance</h4>
          <ul className="flex flex-col gap-6 text-[10px] font-bold uppercase tracking-widest text-muted">
            <li onClick={() => onNavigate && onNavigate('shipping')} className="hover:text-ink cursor-pointer transition-colors">Shipping Logistics</li>
            <li onClick={() => onNavigate && onNavigate('returns')} className="hover:text-ink cursor-pointer transition-colors">Returns & Claims</li>
            <li className="hover:text-ink cursor-pointer transition-colors">Contact Expert</li>
            <li onClick={() => onNavigate && onNavigate('faq')} className="hover:text-ink cursor-pointer transition-colors">Common Queries</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-10">The Journal</h4>
          <p className="text-[10px] text-muted mb-10 uppercase tracking-widest font-bold leading-relaxed">
            Join our mailing list for weekly drop alerts and editorial lookbooks.
          </p>
          <div className="flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="YOUR EMAIL"
              className="bg-transparent border border-accent/60 px-6 py-4 w-full text-[10px] font-bold tracking-widest focus:outline-none focus:border-ink transition-colors uppercase"
            />
            <button className="luxury-button-filled w-full py-4 text-[10px]">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 border-t border-accent/20 pt-16 text-[9px] uppercase tracking-[0.3em] font-bold text-muted">
        <p className="opacity-50">© 2026 LASH GLAZE STUDIO. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-12">
           <span onClick={() => onNavigate && onNavigate('privacy')} className="hover:text-ink cursor-pointer transition-colors">Privacy</span>
           <span onClick={() => onNavigate && onNavigate('terms')} className="hover:text-ink cursor-pointer transition-colors">Terms</span>
           <span onClick={() => onNavigate && onNavigate('terms')} className="hover:text-ink cursor-pointer transition-colors">Sustainability</span>
        </div>
      </div>
    </footer>
  );
};
