/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Store } from './pages/Store';
import { ProductPage } from './pages/ProductPage';
import { Checkout } from './pages/Checkout';
import { AdminDashboard } from './pages/AdminDashboard';
import { OrderTracking } from './pages/OrderTracking';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { StaticPage } from './pages/StaticPage';

import Profile from './pages/Profile';

type PageType = 'store' | 'product' | 'checkout' | 'admin' | 'tracking' | 'profile' | 'terms' | 'privacy' | 'shipping' | 'returns' | 'faq';

function AppContent() {
  const { isAdmin, isInitialLoading, policies } = useApp();
  const [currentPage, setCurrentPage] = useState<PageType>('store');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [trackedOrderId, setTrackedOrderId] = useState<string | null>(null);


  const navigateToProduct = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('product');
    window.scrollTo(0, 0);
  };

  const navigateToTracking = (id: string) => {
    setTrackedOrderId(id);
    setCurrentPage('tracking');
    window.scrollTo(0, 0);
  };

  const navigateTo = (page: PageType) => {
    if (page !== 'tracking') setTrackedOrderId(null);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPolicyContent = (type: string, fallback: string) => {
    const policy = policies.find(p => p.type === type && p.published);
    if (!policy) return <p>{fallback}</p>;
    
    return (
      <div className="space-y-6 whitespace-pre-wrap">
        {policy.content.split('\n\n').map((block, i) => (
          <p key={i}>{block}</p>
        ))}
      </div>
    );
  };

  React.useEffect(() => {
    if (currentPage === 'admin' && !isAdmin) {
      setCurrentPage('store');
    }
  }, [currentPage, isAdmin]);

  React.useEffect(() => {
    if (!isInitialLoading) {
      const loader = document.getElementById('loader-wrapper');
      if (loader) {
        loader.classList.add('loaded');
        // Optional: Remove from DOM after transition
        setTimeout(() => {
          loader.style.display = 'none';
        }, 800);
      }
    }
  }, [isInitialLoading]);

  if (currentPage === 'admin') {
    if (!isAdmin) return null;
    return <AdminDashboard onNavigateBack={() => navigateTo('store')} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <Header 
        onNavigate={() => navigateTo('store')} 
        onAdminClick={() => navigateTo('admin')}
        onCartClick={() => navigateTo('checkout')}
        onTrackClick={() => navigateTo('tracking')}
        onProfileClick={() => navigateTo('profile')}
      />
      
      <main className="flex-grow">
        {currentPage === 'store' && (
          <Store onProductClick={navigateToProduct} />
        )}
        
        {currentPage === 'product' && selectedProductId && (
          <ProductPage 
            productId={selectedProductId} 
            onBack={() => navigateTo('store')}
            onCheckout={() => navigateTo('checkout')}
          />
        )}
        
        {currentPage === 'checkout' && (
          <Checkout 
            onBack={() => navigateTo('store')} 
            onSuccessRedirect={(orderId) => {
              if (orderId) navigateToTracking(orderId);
              else navigateTo('profile');
            }}
          />
        )}
        
        {currentPage === 'profile' && (
           <Profile onBack={() => navigateTo('store')} onOrderClick={navigateToTracking} />
        )}

        {currentPage === 'tracking' && (
          <OrderTracking 
            initialOrderId={trackedOrderId || undefined} 
            onMyOrdersClick={() => navigateTo('profile')}
          />
        )}

        {currentPage === 'terms' && (
            <StaticPage 
              title="Terms & Conditions" 
              content={renderPolicyContent('terms', "Welcome to Lash Glaze. By accessing this website, you agree to be bound by these Terms and Conditions. This website is intended for personal, non-commercial use. All content, including designs, logos, and images, is the property of Lash Glaze and is protected by copyright laws.")} 
            />
        )}
        {currentPage === 'privacy' && (
            <StaticPage 
              title="Privacy Policy" 
              content={renderPolicyContent('privacy', "Your privacy is paramount to us at Lash Glaze. We collect information provided during checkout, including name, email, and shipping address. We do not store credit card info; all payments are processed securely via Stripe and PayPal.")} 
            />
        )}
        {currentPage === 'shipping' && (
            <StaticPage 
              title="Shipping Logistics" 
              content={renderPolicyContent('shipping', "Lash Glaze is committed to delivering your premium lashes as quickly and safely as possible. All orders are processed within 1-2 business days. Shipping charges are calculated dynamically at checkout based on your delivery address. We ship worldwide.")} 
            />
        )}
        {currentPage === 'returns' && (
            <StaticPage 
              title="Returns & Claims" 
              content={renderPolicyContent('refund', "At Lash Glaze, we take hygiene seriously. Due to the personal nature of our products, strip lashes can only be returned if they are in their original, unopened, and unused condition within 14 days of delivery. For hygiene reasons, any lashes removed from the tray cannot be returned.")} 
            />
        )}
        {currentPage === 'faq' && (
           <StaticPage 
             title="Common Queries" 
             content={
               <div className="space-y-12">
                 <div>
                   <p className="font-sans text-[10px] uppercase font-black tracking-widest text-gold mb-2">Longevity & Care</p>
                   <p>How long can I wear Lash Glaze strip lashes? Our lashes are crafted from the finest artisanal silk and are designed for longevity. With proper removal and storage in their original tray, a single pair can be worn up to 20 times flawlessly.</p>
                 </div>
                 <div>
                   <p className="font-sans text-[10px] uppercase font-black tracking-widest text-gold mb-2">Global Access</p>
                   <p>Do you offer international shipping? Yes, we ship our premium collections worldwide. Shipping rates and delivery estimates are calculated dynamically at checkout based on your global location and preferred courier service.</p>
                 </div>
                 <div>
                   <p className="font-sans text-[10px] uppercase font-black tracking-widest text-gold mb-2">Ethical Standards</p>
                   <p>Are your lashes cruelty-free? Absolutely. At Lash Glaze, we are committed to ethical beauty. All our lashes are 100% vegan and cruelty-free, using high-grade synthetic silk that mimics the softness of natural fibers.</p>
                 </div>
                 <div>
                   <p className="font-sans text-[10px] uppercase font-black tracking-widest text-gold mb-2">Order Tracking</p>
                   <p>How do I track my order? Once your order is processed, you will receive a tracking code via email. You can also monitor your order's journey directly within your 'Atelier' profile or on our dedicated tracking page.</p>
                 </div>
               </div>
             } 
           />
        )}
      </main>

      {currentPage !== 'checkout' && (
        <Footer onNavigate={(page: PageType) => navigateTo(page)} />
      )}
      <CookieBanner />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
