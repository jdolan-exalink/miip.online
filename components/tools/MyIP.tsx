import React, { useEffect, useState } from 'react';
import { Globe, MapPin, Server, RefreshCw, AlertTriangle, Network, Shield, Copy, Check } from 'lucide-react';
import { IpInfo } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { getPublicIpInfo, getIpV4, getIpV6, isIpV6 } from '../../utils/networkLogic';

const MyIP: React.FC = () => {
  const { t } = useLanguage();
  const [data, setData] = useState<IpInfo | null>(null);
  const [ipv4, setIpv4] = useState<string>('...');
  const [ipv6, setIpv6] = useState<string>('...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Copy Feedback States
  const [copiedV4, setCopiedV4] = useState(false);
  const [copiedV6, setCopiedV6] = useState(false);

  const fetchDetails = async () => {
    setLoading(true);
    setError('');
    setIpv4('...');
    setIpv6('...');
    
    try {
      // 1. Fetch Main Metadata (Country, ISP, City)
      const info = await getPublicIpInfo();
      setData(info);

      // 2. Determine what Protocol we used for the main metadata
      const mainIsV6 = isIpV6(info.ip);
      
      if (mainIsV6) {
        setIpv6(info.ip);
        // Try to fetch v4 explicitly
        getIpV4().then(v4 => setIpv4(v4 || ''));
      } else {
        setIpv4(info.ip);
        // Try to fetch v6 explicitly
        getIpV6().then(v6 => setIpv6(v6 || ''));
      }

    } catch (err) {
      setError('Could not fetch IP details. Check your connection or disable Ad-blocker.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const copyToClipboard = (text: string, isV6: boolean) => {
    if (!text || text === '...') return;
    navigator.clipboard.writeText(text);
    if (isV6) {
      setCopiedV6(true);
      setTimeout(() => setCopiedV6(false), 2000);
    } else {
      setCopiedV4(true);
      setTimeout(() => setCopiedV4(false), 2000);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Globe className="text-primary-500" /> {t.tools.myIp.title}
        </h2>
        <button 
          onClick={fetchDetails}
          disabled={loading}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-500 dark:text-gray-400 transition"
          title="Refresh"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading && !data ? (
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="h-32 bg-gray-200 dark:bg-dark-800 rounded-lg"></div>
             <div className="h-32 bg-gray-200 dark:bg-dark-800 rounded-lg"></div>
          </div>
          <div className="h-24 bg-gray-200 dark:bg-dark-800 rounded-lg w-full"></div>
        </div>
      ) : error ? (
        <div className="flex items-center gap-3 text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
          <AlertTriangle />
          {error}
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Main IPs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* IPv4 Box */}
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                 <Network size={100} />
               </div>
               <div className="flex items-center justify-between mb-2 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">IPv4</span>
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{t.tools.myIp.ipv4}</span>
                  </div>
                  {ipv4 && ipv4 !== '...' && (
                    <button 
                      onClick={() => copyToClipboard(ipv4, false)}
                      className="p-1.5 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 transition flex items-center gap-1"
                      title={t.tools.password.copy}
                    >
                      {copiedV4 ? <Check size={16} /> : <Copy size={16} />}
                      {copiedV4 && <span className="text-xs font-semibold">{t.tools.password.copied}</span>}
                    </button>
                  )}
               </div>
               <div className="text-2xl md:text-3xl font-mono font-bold text-gray-900 dark:text-white break-all relative z-10">
                  {ipv4 === '' ? <span className="text-gray-400 text-lg italic">{t.tools.myIp.notDetected}</span> : ipv4 === '...' ? <span className="animate-pulse">...</span> : ipv4}
               </div>
            </div>

            {/* IPv6 Box */}
            <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 rounded-xl p-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                 <Network size={100} />
               </div>
               <div className="flex items-center justify-between mb-2 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded">IPv6</span>
                    <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">{t.tools.myIp.ipv6}</span>
                  </div>
                  {ipv6 && ipv6 !== '...' && (
                    <button 
                      onClick={() => copyToClipboard(ipv6, true)}
                      className="p-1.5 rounded-md hover:bg-purple-200 dark:hover:bg-purple-800 text-purple-700 dark:text-purple-300 transition flex items-center gap-1"
                      title={t.tools.password.copy}
                    >
                      {copiedV6 ? <Check size={16} /> : <Copy size={16} />}
                      {copiedV6 && <span className="text-xs font-semibold">{t.tools.password.copied}</span>}
                    </button>
                  )}
               </div>
               <div className="text-lg md:text-xl font-mono font-bold text-gray-900 dark:text-white break-all relative z-10">
                  {ipv6 === '' ? <span className="text-gray-400 text-base italic">{t.tools.myIp.notDetected}</span> : ipv6 === '...' ? <span className="animate-pulse">...</span> : ipv6}
               </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* ISP / ASN */}
            <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 dark:bg-dark-800 border border-gray-100 dark:border-gray-800">
               <div className="bg-white dark:bg-dark-900 p-3 rounded-lg shadow-sm text-primary-600 shrink-0">
                 <Server size={24} />
               </div>
               <div className="overflow-hidden">
                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium uppercase tracking-wide">{t.tools.myIp.isp}</p>
                 <p className="font-semibold text-lg text-gray-900 dark:text-gray-100 truncate">{data?.org || 'Unknown'}</p>
                 {data?.network && <p className="text-xs text-gray-400 font-mono mt-1">{data.network}</p>}
               </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 dark:bg-dark-800 border border-gray-100 dark:border-gray-800">
               <div className="bg-white dark:bg-dark-900 p-3 rounded-lg shadow-sm text-primary-600 shrink-0">
                 <MapPin size={24} />
               </div>
               <div>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium uppercase tracking-wide">{t.tools.myIp.location}</p>
                 <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">{data?.city}, {data?.region}</p>
                 <p className="text-sm text-gray-500 font-medium">{data?.country_name}</p>
               </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default MyIP;