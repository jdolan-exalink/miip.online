import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations, Language } from '../utils/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // 1. Check Local Storage
    const savedLang = localStorage.getItem('app-language') as Language;
    if (savedLang && ['en', 'es', 'pt'].includes(savedLang)) {
      setLanguageState(savedLang);
      return;
    }

    // 2. Check Browser Language
    const browserLang = navigator.language.toLowerCase();
    
    if (browserLang.startsWith('es')) {
      setLanguageState('es');
    } else if (browserLang.startsWith('pt')) {
      setLanguageState('pt');
    } else {
      setLanguageState('en'); // Default fallback
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
    document.documentElement.lang = lang; // Update HTML tag for SEO
  };

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};