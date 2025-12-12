
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

window._debugLogs = window._debugLogs || [];

console.log('[APP] App.tsx module loading...');
window._debugLogs.push({time: new Date().toISOString(), msg: 'App.tsx: Module loading'});

// Wrapper to handle Side Effects (Scroll Top + Analytics)
const RouteObserver = () => {
  console.log('[ROUTER] RouteObserver component mounted');
  window._debugLogs.push({time: new Date().toISOString(), msg: 'RouteObserver: Mounted'});
  
  const location = useLocation();
  console.log('[ROUTER] Route changed to:', location.pathname);
  window._debugLogs.push({time: new Date().toISOString(), msg: 'Route: ' + location.pathname});
  
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('[ROUTER] Scrolled to top for route:', location.pathname);
  }, [location]);

  return null;
};

const App: React.FC = () => {
  console.log('[APP] App component is rendering...');
  window._debugLogs.push({time: new Date().toISOString(), msg: 'App.tsx: Rendering'});
  
  return (
    <Router>
      <RouteObserver />
      <div style={{ 
        padding: '20px', 
        fontFamily: 'sans-serif',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh'
      }}>
        <h1 style={{color: '#333'}}>✅ React is Working!</h1>
        <p style={{color: '#666'}}>App component rendered successfully.</p>
        <p style={{color: '#666', fontSize: '12px'}}>
          If you see this message, the basic app is working.
        </p>
        <details style={{marginTop: '20px', padding: '10px', backgroundColor: '#fff', border: '1px solid #ddd'}}>
          <summary style={{cursor: 'pointer', fontWeight: 'bold'}}>📋 Debug Logs</summary>
          <pre style={{fontSize: '11px', maxHeight: '300px', overflow: 'auto', marginTop: '10px'}}>
            {JSON.stringify(window._debugLogs || [], null, 2)}
          </pre>
        </details>
      </div>
    </Router>
  );
};

export default App;