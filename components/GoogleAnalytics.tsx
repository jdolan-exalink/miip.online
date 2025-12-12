import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Get GA Measurement ID from environment variable
const GA_MEASUREMENT_ID = process.env.VITE_GA_MEASUREMENT_ID || '';

const GoogleAnalytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Only initialize if GA_MEASUREMENT_ID is set
    if (!GA_MEASUREMENT_ID) {
      console.warn('[GA4] GA_MEASUREMENT_ID not configured');
      return;
    }

    // 1. Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    
    // 2. Track Page Views on route change
    // Using 'config' sends a page_view event by default
    gtag('config', GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.search,
    });

  }, [location]);

  return null; // This component does not render anything visual
};

// Add type definition for window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default GoogleAnalytics;
