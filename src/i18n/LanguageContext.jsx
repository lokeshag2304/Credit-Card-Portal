import React, { createContext, useContext, useMemo } from 'react';
import translations, { LANG_CODES } from './translations';
import { useTheme } from '../ThemeProvider';

const LanguageContext = createContext({ t: (k) => k });

export const LanguageProvider = ({ children }) => {
  const { language } = useTheme();

  // Map stored language name → locale code → translation dict
  const locale = LANG_CODES[language] || 'en';
  const dict   = translations[locale] || translations.en;

  // t('key') → translated string, falls back to English, then the key itself
  const t = useMemo(() => (key) => {
    return dict[key] ?? translations.en[key] ?? key;
  }, [dict]);

  return (
    <LanguageContext.Provider value={{ t, locale }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
