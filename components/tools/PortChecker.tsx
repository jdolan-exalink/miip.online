import React, { useState } from 'react';
import { Radio, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

const PortChecker: React.FC = () => {
  const [host, setHost] = useState('');
  const [port, setPort] = useState('80');
  const [status, setStatus] = useState<'idle' | 'checking' | 'open' | 'closed'>('idle');

  // Since we are Client-Side only, we cannot actually scan external ports due to Browser Security.
  // This function simulates the UX or would call a backend API in production.
  const checkPort = () => {
    if (!host || !port) return;
    setStatus('checking');
    
    // Simulation logic
    setTimeout(() => {
        // Randomly succeed for demonstration purposes unless specific mock values used
        const isOpen = Math.random() > 0.5;
        setStatus(isOpen ? 'open' : 'closed');
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <Radio className="text-primary-500" /> Port Checker
      </h2>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 p-3 rounded-md text-xs mb-6 border border-yellow-200 dark:border-yellow-900">
         <strong>Note:</strong> This is a simulation for the frontend demo. In a production environment, this requires a backend proxy to bypass CORS and browser sandbox restrictions.
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-grow">
             <label className="block text-xs font-medium text-gray-500 mb-1">Host / IP</label>
             <input 
                type="text" 
                placeholder="192.168.1.1 or google.com"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-dark-800 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:text-white p-2.5 border"
             />
        </div>
        <div className="w-full sm:w-32">
             <label className="block text-xs font-medium text-gray-500 mb-1">Port</label>
             <input 
                type="number" 
                placeholder="80"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-dark-800 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:text-white p-2.5 border"
             />
        </div>
        <div className="flex items-end">
            <button 
              onClick={checkPort}
              disabled={status === 'checking' || !host}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-medium transition h-[42px]"
            >
              {status === 'checking' ? <Loader2 className="animate-spin mx-auto" /> : 'Check'}
            </button>
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800 pt-6 flex justify-center">
         {status === 'idle' && <span className="text-gray-400 text-sm">Waiting for input...</span>}
         
         {status === 'open' && (
             <div className="flex flex-col items-center text-green-600 dark:text-green-400">
                 <CheckCircle2 size={48} className="mb-2" />
                 <span className="text-lg font-bold">Port {port} is OPEN</span>
                 <span className="text-sm opacity-70">Response time: 42ms</span>
             </div>
         )}
         
         {status === 'closed' && (
             <div className="flex flex-col items-center text-red-600 dark:text-red-400">
                 <XCircle size={48} className="mb-2" />
                 <span className="text-lg font-bold">Port {port} is CLOSED</span>
                 <span className="text-sm opacity-70">Connection refused</span>
             </div>
         )}
      </div>
    </div>
  );
};

export default PortChecker;