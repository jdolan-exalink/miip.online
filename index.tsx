import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './src/index.css';

window._debugLogs = window._debugLogs || [];

console.log('[STEP 1] index.tsx loaded - starting imports...');
window._debugLogs.push({time: new Date().toISOString(), msg: 'Step 1: index.tsx loaded'});

console.log('[STEP 2] About to find root element...');
window._debugLogs.push({time: new Date().toISOString(), msg: 'Step 2: Looking for root element'});

const rootElement = document.getElementById('root');
console.log('[STEP 3] Root element found?', rootElement ? 'YES' : 'NO - CRITICAL ERROR');
window._debugLogs.push({time: new Date().toISOString(), msg: 'Step 3: Root element ' + (rootElement ? 'FOUND' : 'NOT FOUND!')});

if (!rootElement) {
  console.error('[ERROR] Root element #root not found in DOM');
  window._debugLogs.push({time: new Date().toISOString(), msg: 'CRITICAL: Root element missing'});
  throw new Error("Could not find root element #root to mount React");
}

console.log('[STEP 4] About to create React root...');
window._debugLogs.push({time: new Date().toISOString(), msg: 'Step 4: Creating React root'});

const root = ReactDOM.createRoot(rootElement);
console.log('[STEP 5] React root created successfully');
window._debugLogs.push({time: new Date().toISOString(), msg: 'Step 5: React root created'});

console.log('[STEP 6] About to render App component...');
window._debugLogs.push({time: new Date().toISOString(), msg: 'Step 6: Rendering App'});

try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('[STEP 7] ✅ App rendered successfully!');
  window._appInitialized = true;
  window._debugLogs.push({time: new Date().toISOString(), msg: 'Step 7: App rendered successfully'});
} catch (error) {
  console.error('[ERROR] Failed to render App:', error);
  window._debugLogs.push({time: new Date().toISOString(), msg: 'ERROR rendering App: ' + (error as Error).message});
  throw error;
}