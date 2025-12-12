import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './src/index.css';

console.log('[DEBUG] index.tsx: Starting application...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('[ERROR] index.tsx: Root element not found');
  throw new Error("Could not find root element to mount to");
}

console.log('[DEBUG] index.tsx: Root element found, creating React root...');
const root = ReactDOM.createRoot(rootElement);
console.log('[DEBUG] index.tsx: React root created, rendering App component...');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('[DEBUG] index.tsx: App component render called');