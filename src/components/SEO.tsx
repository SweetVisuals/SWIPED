/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const SEO: React.FC = () => {
  const { storeSettings } = useApp();

  useEffect(() => {
    // 1. Update Document Title (Tab Text)
    if (storeSettings.seoTitle) {
      document.title = storeSettings.seoTitle;
    } else {
      document.title = storeSettings.name || 'SWIPED BY';
    }

    // 2. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', storeSettings.seoDescription || '');

    // 3. Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', storeSettings.seoKeywords || '');

    // 4. Update Open Graph Tags
    const updateOGTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOGTag('og:title', storeSettings.seoTitle || storeSettings.name);
    updateOGTag('og:description', storeSettings.seoDescription || '');
    updateOGTag('og:image', storeSettings.seoOgImage || '');
    updateOGTag('og:type', 'website');
    updateOGTag('og:site_name', storeSettings.name);

    // 5. Update Twitter Tags
    const updateTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateTwitterTag('twitter:card', 'summary_large_image');
    updateTwitterTag('twitter:title', storeSettings.seoTitle || storeSettings.name);
    updateTwitterTag('twitter:description', storeSettings.seoDescription || '');
    updateTwitterTag('twitter:image', storeSettings.seoOgImage || '');

    // 6. Update Favicon
    if (storeSettings.faviconUrl) {
      let favicon = document.querySelector('link[rel="icon"]');
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.setAttribute('rel', 'icon');
        document.head.appendChild(favicon);
      }
      favicon.setAttribute('href', storeSettings.faviconUrl);
    }

    // 7. Google Analytics Injection
    if (storeSettings.googleAnalyticsId) {
      const gaScriptId = 'google-analytics-script';
      if (!document.getElementById(gaScriptId)) {
        const script = document.createElement('script');
        script.id = gaScriptId;
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${storeSettings.googleAnalyticsId}`;
        document.head.appendChild(script);

        const configScript = document.createElement('script');
        configScript.id = 'ga-config-script';
        configScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${storeSettings.googleAnalyticsId}');
        `;
        document.head.appendChild(configScript);
      }
    }

  }, [storeSettings]);

  return null; // This component doesn't render anything
};
