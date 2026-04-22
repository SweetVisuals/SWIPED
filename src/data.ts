/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Order, Customer, PaymentMethod, ShippingMethod, StoreSettings } from './types';

export const INITIAL_SETTINGS: StoreSettings = {
  name: "SWIPED BY",
  currency: "£",
  logo: "",
  heroBannerUrl: "https://images.unsplash.com/photo-1556656793-062ff98782ee?q=80&w=1200",
  heroEnabled: true,
  badgesEnabled: true,
  promoBannerEnabled: false,
  promoBannerText: "Free shipping on all global orders above £500",
  instagramUrl: "https://instagram.com/swipedby",
  tiktokUrl: "https://tiktok.com/@swipedby",
  supportEmail: "concierge@swiped-by.com",
  subscriptionsEnabled: true,
  subscriptionDiscountPercent: 15,
  paypalEmail: "concierge@swiped-by.com",
  paypalMeLink: "https://paypal.me/swipedby",
  cryptoUsdcAddress: "",
  passwordLockEnabled: false,
  passwordLockPassword: "",
  passwordLockExpiresAt: "",
  colors: {
    ink: "#000000",
    paper: "#ffffff",
    accent: "#007AFF",
    muted: "#8E8E93",
    gold: "#D4AF37",
    preOrder: "#FF9500",
    limitedTime: "#FF3B30",
    topbarBg: "#f8f8f8",
    topbarText: "#000000",
    buttonBg: "#000000",
    buttonText: "#ffffff",
  }
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    price: 999.00,
    description: 'The latest iPhone with Titanium design and A17 Pro chip.',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800',
    gallery: ['https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800'],
    category: 'Smartphones',
    inventory: 50,
    status: 'active',
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Alice Smith', email: 'alice@example.com', orders: 2, totalSpent: 83.90 },
  { id: 'c2', name: 'Bob Johnson', email: 'bob@example.com', orders: 1, totalSpent: 38.00 },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-1001',
    customerId: 'c1',
    customerName: 'Alice Smith',
    items: [{ productId: '1', quantity: 2, price: 41.95 }],
    total: 83.90,
    status: 'delivered',
    createdAt: '2024-03-15T10:00:00Z',
  },
  {
    id: 'ORD-1002',
    customerId: 'c2',
    customerName: 'Bob Johnson',
    items: [{ productId: '2', quantity: 1, price: 38.00 }],
    total: 38.00,
    status: 'pending',
    createdAt: '2024-03-20T14:30:00Z',
  },
];

export const INITIAL_PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'p1', name: 'Credit/Debit Card', enabled: true, type: 'card' },
  { id: 'p2', name: 'PayPal', enabled: true, type: 'paypal' },
  { id: 'p3', name: 'Klarna', enabled: false, type: 'klarna' },
  { id: 'p4', name: 'Test Payment', enabled: true, type: 'test' },
];

export const INITIAL_SHIPPING_METHODS: ShippingMethod[] = [
  { id: 's1', name: 'Standard Shipping', price: 5.99, enabled: true },
  { id: 's2', name: 'Express Shipping', price: 12.99, enabled: true },
];
