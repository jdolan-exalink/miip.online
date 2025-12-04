import React, { useState, useEffect } from 'react';
import { Shield, Copy, RefreshCw, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { trackGaEvent } from '../../utils/analyticsBackend';

const PasswordGenerator: React.FC = () => {
  const { t } = useLanguage();
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (charset === '') {
      setPassword('');
      return;
    }

    let retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(retVal);
  };

  const handleGenerateClick = () => {
    generatePassword();
    // Track event in Google Analytics
    trackGaEvent('generate_password', 'Tools', `Length: ${length}`);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    // Track copy event
    trackGaEvent('copy_password', 'Tools');
  };

  const calculateStrength = () => {
    let score = 0;
    if (length > 8) score += 1;
    if (length > 12) score += 1;
    if (includeUpper && includeLower) score += 1;
    if (includeNumbers) score += 1;
    if (includeSymbols) score += 1;
    
    if (score <= 2) return { color: 'bg-red-500', label: 'Weak', width: '33%' };
    if (score <= 4) return { color: 'bg-yellow-500', label: 'Medium', width: '66%' };
    return { color: 'bg-green-500', label: 'Strong', width: '100%' };
  };

  const strength = calculateStrength();

  return (
    <div className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <Shield className="text-emerald-500" /> {t.tools.password.title}
      </h2>

      {/* Password Display */}
      <div className="relative mb-8">
        <div className="w-full bg-gray-100 dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <span className="font-mono text-xl md:text-2xl text-gray-800 dark:text-gray-100 break-all pr-4">
            {password || 'Select options'}
          </span>
          <div className="flex gap-2 shrink-0">
             <button 
                onClick={handleGenerateClick}
                className="p-2 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition"
                title={t.tools.password.generate}
             >
                <RefreshCw size={20} />
             </button>
             <button 
                onClick={copyToClipboard}
                className={`p-2 rounded transition ${copied ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-dark-600'}`}
             >
                {copied ? <Check size={20} /> : <Copy size={20} />}
             </button>
          </div>
        </div>
        {/* Strength Bar */}
        <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-dark-800 rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-500 ${strength.color}`} style={{ width: strength.width }}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sliders */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{t.tools.password.length}: {length}</h3>
          <input 
            type="range" 
            min="6" 
            max="64" 
            value={length} 
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-dark-700 accent-emerald-500"
          />
        </div>

        {/* Checkboxes */}
        <div>
           <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{t.tools.password.settings}</h3>
           <div className="space-y-3">
             <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                <span className="text-gray-700 dark:text-gray-300">{t.tools.password.uppercase}</span>
             </label>
             <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={includeLower} onChange={(e) => setIncludeLower(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                <span className="text-gray-700 dark:text-gray-300">{t.tools.password.lowercase}</span>
             </label>
             <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                <span className="text-gray-700 dark:text-gray-300">{t.tools.password.numbers}</span>
             </label>
             <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                <span className="text-gray-700 dark:text-gray-300">{t.tools.password.symbols}</span>
             </label>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;