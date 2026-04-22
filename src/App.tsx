/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Store } from './pages/Store';
import { ProductPage } from './pages/ProductPage';
import { Checkout } from './pages/Checkout';
import { AdminDashboard } from './pages/AdminDashboard';
import { OrderTracking } from './pages/OrderTracking';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { StaticPage } from './pages/StaticPage';
import { ScrollToTop } from './components/ScrollToTop';

import Profile from './pages/Profile';

import { PromotionalBanner } from './components/PromotionalBanner';
import { PasswordLock } from './components/PasswordLock';
import { SEO } from './components/SEO';

function AppContent() {
  const { isAdmin, isInitialLoading, policies, isAuthModalOpen, setIsAuthModalOpen, storeSettings } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

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
    if (!isInitialLoading) {
      const loader = document.getElementById('loader-wrapper');
      if (loader) {
        loader.classList.add('loaded');
        setTimeout(() => {
          loader.style.display = 'none';
        }, 800);
      }
    }
  }, [isInitialLoading]);

  // Handle Admin Access Redirect
  React.useEffect(() => {
    if (location.pathname === '/admin' && !isInitialLoading && !isAdmin) {
      navigate('/');
    }
  }, [location.pathname, isAdmin, isInitialLoading, navigate]);

  // Protected Admin Component Wrapper
  if (location.pathname === '/admin') {
    if (!isAdmin && !isInitialLoading) return <Navigate to="/" />;
    if (isAdmin) return <AdminDashboard onNavigateBack={() => navigate('/')} />;
  }

  const expiryDate = storeSettings.passwordLockExpiresAt ? new Date(storeSettings.passwordLockExpiresAt) : null;
  const isNotReached = !expiryDate || isNaN(expiryDate.getTime()) || new Date() < expiryDate;
  
  const isLocked = storeSettings.passwordLockEnabled && 
                   isNotReached &&
                   !isAdmin &&
                   sessionStorage.getItem('storefront_unlocked') !== 'true';

  if (isLocked) {
    return (
      <>
        <PasswordLock />
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <SEO />
      <ScrollToTop />
      <PromotionalBanner />
      <Header 
        onNavigate={() => navigate('/')} 
        onAdminClick={() => navigate('/admin')}
        onCartClick={() => navigate('/checkout')}
        onTrackClick={() => navigate('/tracking')}
        onProfileClick={() => navigate('/profile')}
      />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Store onProductClick={(id) => navigate(`/product/${id}`)} />} />
          
          <Route path="/product/:id" element={
            <ProductRouteWrapper navigate={navigate} />
          } />
          
          <Route path="/checkout" element={
            <Checkout 
              onBack={() => navigate('/')} 
              onSuccessRedirect={(orderId) => {
                if (orderId) navigate(`/tracking/${orderId}`);
                else navigate('/profile');
              }}
            />
          } />
          
          <Route path="/profile" element={
             <Profile onBack={() => navigate('/')} onOrderClick={(id) => navigate(`/tracking/${id}`)} />
          } />

          <Route path="/tracking" element={
            <OrderTracking 
              onMyOrdersClick={() => navigate('/profile')}
            />
          } />

          <Route path="/tracking/:orderId" element={
            <TrackingRouteWrapper navigate={navigate} />
          } />

          <Route path="/terms" element={
              <StaticPage 
                title="Terms & Conditions" 
                content={renderPolicyContent('terms', "Welcome to SWIPED BY. By accessing this website, you agree to be bound by these Terms and Conditions. This website is intended for personal, non-commercial use. All content, including designs, logos, and images, is the property of SWIPED BY and is protected by copyright laws.")} 
              />
          } />
          
          <Route path="/privacy" element={
              <StaticPage 
                title="Privacy Policy" 
                content={renderPolicyContent('privacy', "Your privacy is paramount to us at SWIPED BY. We collect information provided during checkout, including name, email, and shipping address. We do not store credit card info; all payments are processed securely via Stripe.")} 
              />
          } />

          <Route path="/shipping" element={
              <StaticPage 
                title="Shipping Logistics" 
                content={renderPolicyContent('shipping', "SWIPED BY is committed to delivering your premium devices as quickly and safely as possible. All orders are processed within 1-2 business days. Shipping charges are calculated dynamically at checkout based on your delivery address. We ship worldwide.")} 
              />
          } />

          <Route path="/returns" element={
              <StaticPage 
                title="Returns & Claims" 
                content={renderPolicyContent('refund', "At SWIPED BY, we stand by our hardware. Devices can be returned if they are in their original, unopened condition within 14 days of delivery. Once a device has been activated or the seal is broken, returns may be subject to a restocking fee.")} 
              />
          } />

          <Route path="/sustainability" element={
              <StaticPage 
                title="Sustainability Commitment" 
                content={renderPolicyContent('sustainability', "At SWIPED BY, we believe that high-performance technology shouldn't come at the cost of our planet. Our packaging is 100% recyclable and plastic-free.")} 
              />
          } />

          <Route path="/faq" element={
             <StaticPage 
               title="Common Queries" 
               content={
                 <div className="space-y-12">
                   <div>
                     <p className="font-display text-[11px] uppercase font-black tracking-widest text-accent mb-4">Device Authenticity</p>
                     <p className="text-muted leading-relaxed">Are your devices original? Yes, all hardware sold on SWIPED BY is 100% authentic and sourced directly from manufacturers or authorized distributors. Every device undergoes a 100-point quality check.</p>
                   </div>
                   <div>
                     <p className="font-display text-[11px] uppercase font-black tracking-widest text-accent mb-4">Warranty Coverage</p>
                     <p className="text-muted leading-relaxed">What warranty do you provide? We offer a comprehensive 2-year SWIPED BY warranty on all mobile devices and a 1-year warranty on accessories, covering any manufacturing defects or hardware failures.</p>
                   </div>
                   <div>
                     <p className="font-display text-[11px] uppercase font-black tracking-widest text-accent mb-4">Shipping Times</p>
                     <p className="text-muted leading-relaxed">How fast is delivery? Priority orders are processed same-day and usually arrive within 2-3 business days. International shipping times vary by region but typically range from 5-7 business days.</p>
                   </div>
                   <div>
                     <p className="font-display text-[11px] uppercase font-black tracking-widest text-accent mb-4">Trade-Ins</p>
                     <p className="text-muted leading-relaxed">Do you accept trade-ins? Currently, we only sell new hardware. However, we are looking to launch a trade-in program soon. Subscribe to our newsletter for updates.</p>
                   </div>
                 </div>
               } 
             />
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {location.pathname !== '/checkout' && (
        <Footer />
      )}
      <CookieBanner />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}

// Helper wrappers to extract params
function ProductRouteWrapper({ navigate }: { navigate: any }) {
  const { id } = useParams<{ id: string }>();
  if (!id) return <Navigate to="/" />;
  return <ProductPage productId={id} onBack={() => navigate('/')} onCheckout={() => navigate('/checkout')} />;
}

function TrackingRouteWrapper({ navigate }: { navigate: any }) {
  const { orderId } = useParams<{ orderId: string }>();
  return <OrderTracking initialOrderId={orderId} onMyOrdersClick={() => navigate('/profile')} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}

