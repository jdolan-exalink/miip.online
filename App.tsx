
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

console.log('[DEBUG] App.tsx: Module loaded');

// Wrapper to handle Side Effects (Scroll Top + Analytics)
const RouteObserver = () => {
  const location = useLocation();
  console.log('[DEBUG] RouteObserver: Current route:', location.pathname);
  
  useEffect(() => {
    // 1. Scroll to top
    window.scrollTo(0, 0);
    console.log('[DEBUG] RouteObserver: Analytics logged for:', location.pathname);
    
  }, [location]);

  return null;
};

const App: React.FC = () => {
  console.log('[DEBUG] App.tsx: App component rendering...');
  
  return (
    <Router>
      <RouteObserver />
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1>🔧 Network Tools - Debugging</h1>
        <p>If you see this message, React is working!</p>
        <p>The page is being deployed and components are being loaded...</p>
      </div>
    </Router>
  );
};

export default App;