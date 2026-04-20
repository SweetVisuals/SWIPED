/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, Customer, PaymentMethod, ShippingMethod, StoreSettings } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_CUSTOMERS, INITIAL_PAYMENT_METHODS, INITIAL_SHIPPING_METHODS, INITIAL_SETTINGS } from '../data';

interface CartItem extends Product {
  quantity: number;
}

interface AppContextType {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  paymentMethods: PaymentMethod[];
  shippingMethods: ShippingMethod[];
  cart: CartItem[];
  isAdmin: boolean;
  isCustomerLoggedIn: boolean;
  dropExpiry: Date;
  isDropActive: boolean;
  storeSettings: StoreSettings;
  
  setProducts: (products: Product[]) => void;
  setOrders: (orders: Order[]) => void;
  setPaymentMethods: (methods: PaymentMethod[]) => void;
  setShippingMethods: (methods: ShippingMethod[]) => void;
  setStoreSettings: (settings: StoreSettings) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  loginAsAdmin: () => void;
  logout: () => void;
  loginCustomer: () => void;
  logoutCustomer: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [customers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(INITIAL_PAYMENT_METHODS);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>(INITIAL_SHIPPING_METHODS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(INITIAL_SETTINGS);
  
  // Set drop expiry to 72 hours from now for the demo
  const [dropExpiry] = useState(() => {
    // Current time is 2026-04-20T11:14:11Z
    const date = new Date('2026-04-23T11:14:11Z'); 
    return date;
  });

  const [isDropActive, setIsDropActive] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if (new Date() >= dropExpiry) {
        setIsDropActive(false);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [dropExpiry]);

  useEffect(() => {
    // Apply styling from store settings when they change
    const root = document.documentElement;
    root.style.setProperty('--ink', storeSettings.colors.ink);
    root.style.setProperty('--paper', storeSettings.colors.paper);
    root.style.setProperty('--accent', storeSettings.colors.accent);
    root.style.setProperty('--muted', storeSettings.colors.muted);
    root.style.setProperty('--gold', storeSettings.colors.gold);
  }, [storeSettings.colors]);

  const addToCart = (product: Product, quantity: number = 1) => {
    if (!isDropActive) return; // Prevent adding if drop is over
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const loginAsAdmin = () => setIsAdmin(true);
  const logout = () => {
    setIsAdmin(false);
    // In a real app we'd redirect
  };

  const loginCustomer = () => setIsCustomerLoggedIn(true);
  const logoutCustomer = () => setIsCustomerLoggedIn(false);

  return (
    <AppContext.Provider value={{
      products, orders, customers, paymentMethods, shippingMethods, cart, isAdmin, isCustomerLoggedIn,
      dropExpiry, isDropActive, storeSettings,
      setProducts, setOrders, setPaymentMethods, setShippingMethods, setStoreSettings,
      addToCart, removeFromCart, updateCartQuantity, clearCart,
      loginAsAdmin, logout, loginCustomer, logoutCustomer
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
