/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, ChevronDown, Check, X, SortAsc, SortDesc, Filter, RotateCcw } from 'lucide-react';
import { Product } from '../types';

interface ProductFilterProps {
  products: Product[];
  onFilterChange: (filtered: Product[]) => void;
  formatPrice: (amount: number) => string;
  isAdmin?: boolean;
}

type SortOption = 'newest' | 'price-low' | 'price-high' | 'name-asc';

export const ProductFilter: React.FC<ProductFilterProps> = ({ 
  products, 
  onFilterChange,
  formatPrice,
  isAdmin
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const categories = Array.from(new Set(products.map(p => p.category))).filter(Boolean);

  useEffect(() => {
    const highestPrice = Math.max(...products.map(p => p.price), 0);
    setMaxPrice(highestPrice);
    setPriceRange(highestPrice);
  }, [products]);

  useEffect(() => {
    let filtered = [...products].filter(p => isAdmin ? p.status !== 'archived' : p.status === 'active');

    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    filtered = filtered.filter(p => p.price <= priceRange);

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'newest':
        default:
          return b.id.localeCompare(a.id);
      }
    });

    onFilterChange(filtered);
  }, [search, selectedCategories, priceRange, sortBy, products]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCategories([]);
    setPriceRange(maxPrice);
    setSortBy('newest');
  };

  return (
    <div className="w-full lg:w-72 flex-shrink-0">
      <div className="sticky top-32 space-y-6">
        {/* Search Widget */}
        <div className="bg-accent/5 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-500">
           <h4 className="text-[9px] uppercase tracking-[0.4em] font-black text-muted mb-4 opacity-40">Command Center</h4>
           <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted opacity-30 group-focus-within:opacity-100 transition-opacity" size={14} />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Archive..."
              className="w-full bg-paper/50 p-4 pl-12 text-[10px] font-black uppercase tracking-[0.2em] outline-none placeholder:opacity-20 shadow-inner text-ink rounded-2xl border-none"
            />
          </div>
        </div>

        {/* Sort & Filter Cluster */}
        <div className="bg-accent/5 p-6 rounded-[2rem] shadow-sm space-y-10">
          {/* Sort Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-[9px] uppercase tracking-[0.4em] font-black text-muted opacity-40 italic">Sort Sequence</h4>
              <SortAsc size={12} className="text-gold opacity-40" />
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {(['newest', 'price-low', 'price-high'] as SortOption[]).map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`text-left px-5 py-3.5 text-[9px] font-black uppercase tracking-[0.2em] transition-all rounded-xl border-none ${
                    sortBy === option 
                      ? 'bg-ink text-paper shadow-xl scale-[1.02]' 
                      : 'hover:bg-paper/40 text-ink opacity-40 hover:opacity-100'
                  }`}
                >
                  {option.replace('-', ' ')}
                </button>
              ))}
            </div>
          </section>

          {/* Categories Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-[9px] uppercase tracking-[0.4em] font-black text-muted opacity-40 italic">Department</h4>
              <Filter size={12} className="text-gold opacity-40" />
            </div>
            <div className="space-y-1">
              {categories.map((category) => (
                <button 
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl transition-all group border-none ${
                    selectedCategories.includes(category) 
                      ? 'bg-paper shadow-lg' 
                      : 'hover:bg-paper/30'
                  }`}
                >
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                    selectedCategories.includes(category) ? 'text-ink' : 'text-muted opacity-40 group-hover:opacity-100'
                  }`}>
                    {category}
                  </span>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                    selectedCategories.includes(category) ? 'bg-gold' : 'bg-muted/10'
                  }`}>
                    <AnimatePresence mode="wait">
                      {selectedCategories.includes(category) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Check size={8} className="text-paper" strokeWidth={5} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Price Range Section */}
          <section className="space-y-8 pt-4">
            <div className="flex items-center justify-between">
              <h4 className="text-[9px] uppercase tracking-[0.4em] font-black text-muted opacity-40 italic">Valuation</h4>
              <span className="text-[11px] font-black text-ink tracking-tighter tabular-nums">{formatPrice(priceRange)}</span>
            </div>
            <div className="px-1 relative h-6 flex items-center">
              <div className="absolute inset-x-0 h-0.5 bg-muted/10 rounded-full" />
              <div 
                className="absolute h-0.5 bg-gold rounded-full transition-all duration-300" 
                style={{ width: `${(priceRange / maxPrice) * 100}%` }}
              />
              <input 
                type="range"
                min={0}
                max={maxPrice}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <motion.div 
                className="absolute w-4 h-4 bg-paper shadow-xl rounded-full border-2 border-gold pointer-events-none z-20"
                animate={{ left: `calc(${(priceRange / maxPrice) * 100}% - 8px)` }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              />
            </div>
            <div className="flex justify-between text-[8px] uppercase font-black text-muted tracking-widest opacity-30">
               <span>Base</span>
               <span>Elite</span>
            </div>
          </section>
        </div>

        {/* Global Reset */}
        <button 
          onClick={clearFilters}
          className="w-full py-5 bg-ink text-paper text-[9px] font-black uppercase tracking-[0.4em] rounded-[1.5rem] shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group border-none"
        >
          <RotateCcw size={12} className="group-hover:rotate-[-180deg] transition-transform duration-700" />
          Purge Active Filters
        </button>
      </div>
    </div>
  );
};
