import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Globe, BookOpen, Mail, ShieldCheck, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import AdsenseBlock from './AdsenseBlock';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  console.log('[DEBUG] Layout.tsx: Component rendering...');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  console.log('[DEBUG] Layout.tsx: Language context retrieved, current language:', language);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const location = useLocation();
  console.log('[DEBUG] Layout.tsx: Current location:', location.pathname);

  useEffect(() => {
    console.log('[DEBUG] Layout.tsx: useEffect for theme management running');
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    console.log('[DEBUG] Layout.tsx: useEffect for menu closing on route change');
    setIsMenuOpen(false);
  }, [location]);

  const cycleLanguage = () => {
    console.log('[DEBUG] Layout.tsx: Cycling language, current:', language);
    if (language === 'en') setLanguage('es');
    else if (language === 'es') setLanguage('pt');
    else setLanguage('en');
  };

  console.log('[DEBUG] Layout.tsx: Rendering layout with children');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-950 transition-colors duration-300">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-primary-600 p-1.5 rounded-lg text-white group-hover:bg-primary-700 transition shadow-sm">
                  <Globe size={24} strokeWidth={2.5} />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  miip<span className="text-primary-600 dark:text-primary-500 font-light">.online</span>
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className={`text-sm font-medium hover:text-primary-600 dark:hover:text-primary-400 transition ${location.pathname === '/' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'}`}>
                {t.nav.tools}
              </Link>
              <Link to="/tutorials" className={`text-sm font-medium hover:text-primary-600 dark:hover:text-primary-400 transition ${location.pathname.startsWith('/tutorials') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'}`}>
                {t.nav.tutorials}
              </Link>
              <Link to="/contact" className={`text-sm font-medium hover:text-primary-600 dark:hover:text-primary-400 transition ${location.pathname === '/contact' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'}`}>
                {t.nav.contact}
              </Link>
              
              <div className="h-6 w-px bg-gray-200 dark:bg-dark-700 mx-2"></div>

              <button
                onClick={cycleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-dark-800 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700 transition uppercase"
              >
                <Languages size={14} /> {language}
              </button>
              
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden gap-3">
              <button
                  onClick={cycleLanguage}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-gray-100 dark:bg-dark-800 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase"
                >
                  {language}
              </button>
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="flex items-center gap-2"><Globe size={18} /> {t.nav.tools}</div>
              </Link>
              <Link to="/tutorials" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                 <div className="flex items-center gap-2"><BookOpen size={18} /> {t.nav.tutorials}</div>
              </Link>
              <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                 <div className="flex items-center gap-2"><Mail size={18} /> {t.nav.contact}</div>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Container with Sidebar Ads Support */}
      <div className="flex justify-center w-full px-0 sm:px-4 lg:px-8 py-8 gap-6">
        
        {/* Left Ad Skyscraper - Only on XL screens */}
        <aside className="hidden xl:block w-[160px] shrink-0">
          <div className="sticky top-24">
             <AdsenseBlock slotId="sidebar-left" format="vertical" className="h-[600px] w-full" />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow max-w-7xl w-full mx-auto min-w-0">
          {children}
        </main>

        {/* Right Ad Skyscraper - Only on XL screens */}
        <aside className="hidden xl:block w-[160px] shrink-0">
          <div className="sticky top-24">
             <AdsenseBlock slotId="sidebar-right" format="vertical" className="h-[600px] w-full" />
          </div>
        </aside>
        
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
               <span className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                 <ShieldCheck size={20} className="text-primary-600"/> miip.online
               </span>
               <p className="text-sm text-gray-500 mt-1">{t.nav.footer}</p>
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-gray-500">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-gray-500">Terms of Service</Link>
              <Link to="/cookies" className="text-gray-400 hover:text-gray-500">Cookies</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} miip.online. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;