import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Calculator, Cable, Radio, Search, Shield, ArrowRight, MapPin, Server, AlertCircle, Copy, Check } from 'lucide-react';
import AdsenseBlock from '../components/AdsenseBlock';
import { useLanguage } from '../context/LanguageContext';
import { IpInfo } from '../types';
import { getPublicIpInfo } from '../utils/networkLogic';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [quickIp, setQuickIp] = useState<IpInfo | null>(null);
  const [loadingIp, setLoadingIp] = useState(true);
  const [copied, setCopied] = useState(false);

  // Tools definition with dynamic text access (done in render to update on lang change)
  const getTools = () => [
    { id: 'my-ip', name: t.tools.myIp.name, desc: t.tools.myIp.desc, icon: Globe, path: '/tools/my-ip', color: 'text-blue-500' },
    { id: 'subnet', name: t.tools.subnet.name, desc: t.tools.subnet.desc, icon: Calculator, path: '/tools/subnet', color: 'text-indigo-500' },
    { id: 'rj45', name: t.tools.rj45.name, desc: t.tools.rj45.desc, icon: Cable, path: '/tools/rj45', color: 'text-orange-500' },
    { id: 'dns', name: t.tools.dns.name, desc: t.tools.dns.desc, icon: Search, path: '/tools/dns', color: 'text-purple-500' },
    { id: 'port', name: t.tools.port.name, desc: t.tools.port.desc, icon: Radio, path: '/tools/port', color: 'text-red-500' },
    { id: 'pass', name: t.tools.password.name, desc: t.tools.password.desc, icon: Shield, path: '/tools/password', color: 'text-emerald-500' },
  ];

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const data = await getPublicIpInfo();
        setQuickIp(data);
      } catch (e) {
        console.error("IP Fetch failed", e);
      } finally {
        setLoadingIp(false);
      }
    };
    fetchIp();
  }, []);

  const copyIp = () => {
    if (quickIp?.ip) {
      navigator.clipboard.writeText(quickIp.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero */}
      <div className="text-center space-y-4 py-4 md:py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          miip<span className="text-primary-600 dark:text-primary-500">.online</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
          {t.home.desc}
        </p>
      </div>

      {/* Quick IP Widget - Showing Immediately on Enter */}
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900 shadow-lg text-white p-6 md:p-8">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Globe size={120} />
           </div>
           
           <div className="relative z-10">
              <h2 className="text-blue-100 font-medium text-sm uppercase tracking-wide mb-2">{t.home.quickIp.title}</h2>
              {loadingIp ? (
                <div className="flex gap-4 items-center">
                    <div className="animate-pulse h-12 w-48 bg-white/20 rounded"></div>
                    <div className="animate-pulse h-6 w-32 bg-white/20 rounded"></div>
                </div>
              ) : quickIp ? (
                 <div className="flex flex-col md:flex-row md:items-end gap-6">
                    <div>
                       <div className="flex items-center gap-3 mb-2">
                           <div className="text-4xl md:text-5xl font-mono font-bold tracking-tight">{quickIp.ip}</div>
                           <button 
                             onClick={copyIp} 
                             className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 transition backdrop-blur-sm flex items-center gap-2"
                             title={t.tools.password.copy}
                           >
                              {copied ? <Check size={20} className="text-green-300" /> : <Copy size={20} />}
                              {copied && <span className="text-sm font-medium text-green-300">{t.tools.password.copied}</span>}
                           </button>
                       </div>
                       <div className="flex flex-wrap gap-4 text-sm md:text-base text-blue-100">
                          <span className="flex items-center gap-1.5"><Server size={16}/> {quickIp.org}</span>
                          <span className="flex items-center gap-1.5"><MapPin size={16}/> {quickIp.city}, {quickIp.country_name}</span>
                       </div>
                    </div>
                 </div>
              ) : (
                 <div className="flex items-center gap-2 text-red-200 bg-red-900/30 p-3 rounded-lg border border-red-500/30 inline-flex">
                    <AlertCircle size={20} />
                    {t.home.quickIp.error}
                 </div>
              )}
           </div>
        </div>
      </div>

      <AdsenseBlock slotId="home-hero-1" className="max-w-3xl mx-auto" />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getTools().map((tool) => (
          <Link 
            key={tool.id} 
            to={tool.path}
            className="group relative bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
          >
            <div className={`inline-flex p-3 rounded-lg bg-gray-50 dark:bg-dark-800 ${tool.color} mb-4`}>
              <tool.icon size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {tool.name}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 h-10 line-clamp-2">
              {tool.desc}
            </p>
            <div className="flex items-center text-primary-600 text-sm font-medium">
              {t.home.openTool} <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <AdsenseBlock slotId="home-footer-1" />
    </div>
  );
};

export default Home;