/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Music2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { storeSettings } = useApp();
  
  return (
    <footer className="bg-paper pt-32 pb-20 px-8 md:px-16 lg:px-24 border-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
        <div className="lg:col-span-1">
          <div className="flex flex-col mb-10">
            <span className="font-serif text-3xl italic font-bold uppercase tracking-widest leading-none">SWIPED BY</span>
            <span className="text-[10px] tracking-[0.5em] font-bold opacity-40 uppercase leading-none mt-2 text-ink">DONT ASK WHERE</span>
          </div>
          <div className="flex gap-8 mt-12">
            {storeSettings.instagramUrl && (
              <a href={storeSettings.instagramUrl} target="_blank" rel="noopener noreferrer">
                <Instagram size={18} className="text-muted hover:text-accent cursor-pointer transition-colors" />
              </a>
            )}
            {storeSettings.tiktokUrl && (
              <a href={storeSettings.tiktokUrl} target="_blank" rel="noopener noreferrer">
                <Music2 size={18} className="text-muted hover:text-accent cursor-pointer transition-colors" />
              </a>
            )}
          </div>
        </div>
        
        <div className="lg:pl-10">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-10 text-ink">Catalog</h4>
          <ul className="flex flex-col gap-6 text-[10px] font-bold uppercase tracking-widest text-muted">
            <li>
              <Link to="/" className="hover:text-accent cursor-pointer transition-colors">Smartphones</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-accent cursor-pointer transition-colors">Accessories</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-accent cursor-pointer transition-colors">Tablets</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-10 text-ink">Support</h4>
          <ul className="flex flex-col gap-6 text-[10px] font-bold uppercase tracking-widest text-muted">
            <li>
              <Link to="/shipping" className="hover:text-accent cursor-pointer transition-colors">Shipping Info</Link>
            </li>
            <li>
              <Link to="/returns" className="hover:text-accent cursor-pointer transition-colors">Returns</Link>
            </li>
            <li>
              <a href="mailto:support@swipedby.com" className="hover:text-accent cursor-pointer transition-colors">Contact Support</a>
            </li>
            <li>
              <Link to="/faq" className="hover:text-accent cursor-pointer transition-colors">FAQ</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-10 text-ink">Newsletter</h4>
          <p className="text-[10px] text-muted mb-10 uppercase tracking-widest font-bold leading-relaxed">
            Join for exclusive early access to tech drops and product launches.
          </p>
          <div className="flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="YOUR EMAIL"
              className="bg-accent/5 px-6 py-5 w-full text-[10px] font-bold tracking-widest focus:outline-none transition-all uppercase rounded-2xl border-none focus:bg-white focus:shadow-xl"
            />
            <button className="luxury-button-filled w-full py-5 text-[10px] bg-accent hover:bg-accent/90">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 pt-16 text-[9px] uppercase tracking-[0.3em] font-bold text-muted opacity-50 border-t border-accent/5">
        <p className="opacity-50">© 2026 SWIPED BY. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-12">
           <Link to="/privacy" className="hover:text-ink cursor-pointer transition-colors">Privacy</Link>
           <Link to="/terms" className="hover:text-ink cursor-pointer transition-colors">Terms</Link>
           <Link to="/sustainability" className="hover:text-ink cursor-pointer transition-colors">Sustainability</Link>
        </div>
      </div>
    </footer>
  );
};

