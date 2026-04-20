/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Order, Customer, PaymentMethod, ShippingMethod, StoreSettings } from './types';

export const INITIAL_SETTINGS: StoreSettings = {
  name: "Lash Glaze",
  currency: "€",
  logo: "",
  colors: {
    ink: "#1A1A1A",
    paper: "#FDFCFB",
    accent: "#E8D5C4",
    muted: "#9A9187",
    gold: "#D4AF37",
    topbarBg: "#1A1A1A",
    topbarText: "#FDFCFB",
    buttonBg: "#1A1A1A",
    buttonText: "#FDFCFB",
  }
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Eyelash Package',
    price: 41.95,
    description: 'Short Mega Volume. The Power Cat-Eye. Make a statement with our best-selling short mega-volume strip lash designed to deliver bold definition with a sculpted cat-eye finish. Contains all your essential curations.',
    image: 'https://i.fbcd.co/products/resized/resized-750-500/83a63143387ec9e70a7b9187a2569a7c4cc596d160690043e341d102e96600d3.jpg',
    category: 'Lashes',
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
