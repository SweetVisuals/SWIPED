/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  brand?: string;
  price: number;
  salePrice?: number;
  description: string;
  image: string;
  gallery?: string[];
  category: string;
  tags?: string[];
  inventory: number;
  status: 'active' | 'draft';
  variants?: {
    colors?: string[];
    sizes?: string[];
  };
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: { productId: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'processed' | 'shipped' | 'out-for-delivery' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  enabled: boolean;
  type: 'card' | 'paypal' | 'klarna' | 'test';
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  enabled: boolean;
}

export interface StoreSettings {
  name: string;
  currency: string;
  logo: string;
  colors: {
    ink: string;
    paper: string;
    accent: string;
    muted: string;
    gold: string;
    topbarBg: string;
    topbarText: string;
    buttonBg: string;
    buttonText: string;
  }
}
