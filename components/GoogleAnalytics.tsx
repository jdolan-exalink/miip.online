import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Replace with your actual Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; 

const GoogleAnalytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
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
