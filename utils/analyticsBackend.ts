
/**
 * Custom Analytics Backend Interface
 * This utility handles sending metrics to your custom backend server and Google Analytics.
 */

interface VisitorMetric {
  path: string;
  timestamp: string;
  userAgent: string;
  language: string;
  screenResolution: string;
  referrer: string;
}

// Ensure TypeScript knows about gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

/**
 * Log page visit to custom backend
 */
export const logVisit = async (path: string) => {
  const metric: VisitorMetric = {
    path,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    language: navigator.language,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    referrer: document.referrer || 'direct',
  };

  try {
    // Simulation of a backend call
    // await fetch('https://api.nettools.pro/v1/metrics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(metric)
    // });
    console.log('[Custom Backend] Visit metric captured:', metric);
  } catch (error) {
    console.error('[Custom Backend] Failed to send metric:', error);
  }
};

/**
 * Track specific user events in Google Analytics (and optionally custom backend)
 * @param action The action name (e.g., 'generate_password', 'calculate_subnet')
 * @param category The category (e.g., 'Tools')
 * @param label Optional label for details
 */
export const trackGaEvent = (action: string, category: string, label?: string) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
    console.log(`[GA4] Event tracked: ${action} [${category}]`);
  } else {
    console.warn('[GA4] gtag not initialized, event skipped:', action);
  }
};