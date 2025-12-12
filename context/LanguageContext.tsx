import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations, Language } from '../utils/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  console.log('[DEBUG] LanguageProvider: Initializing...');
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    console.log('[DEBUG] LanguageProvider: useEffect hook running');
    // 1. Check Local Storage
    const savedLang = localStorage.getItem('app-language') as Language;
    console.log('[DEBUG] LanguageProvider: Saved language from localStorage:', savedLang);
    if (savedLang && ['en', 'es', 'pt'].includes(savedLang)) {
      console.log('[DEBUG] LanguageProvider: Using saved language:', savedLang);
      setLanguageState(savedLang);
      return;
    }

    // 2. Check Browser Language
    const browserLang = navigator.language.toLowerCase();
    console.log('[DEBUG] LanguageProvider: Browser language:', browserLang);
    
    if (browserLang.startsWith('es')) {
      console.log('[DEBUG] LanguageProvider: Setting language to es');
      setLanguageState('es');
    } else if (browserLang.startsWith('pt')) {
      console.log('[DEBUG] LanguageProvider: Setting language to pt');
      setLanguageState('pt');
    } else {
      console.log('[DEBUG] LanguageProvider: Setting language to en (default)');
      setLanguageState('en'); // Default fallback
    }
  }, []);

  const setLanguage = (lang: Language) => {
    console.log('[DEBUG] LanguageProvider: Language changed to:', lang);
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
    document.documentElement.lang = lang; // Update HTML tag for SEO
  };

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  console.log('[DEBUG] LanguageProvider: Current language state:', language);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  console.log('[DEBUG] useLanguage: Hook called');
  const context = useContext(LanguageContext);
  if (context === undefined) {
    console.error('[ERROR] useLanguage: Context is undefined - must be used within LanguageProvider');
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  console.log('[DEBUG] useLanguage: Context retrieved successfully, language:', context.language);
  return context;
  return context;
};