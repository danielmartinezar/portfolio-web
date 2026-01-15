import { useState, type ReactNode } from 'react';
import { DEFAULT_LANGUAGE, type Language } from './types';
import { LanguageContext, type LanguageContextValue } from './languageContext';

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({
  children,
  defaultLanguage = DEFAULT_LANGUAGE,
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const value: LanguageContextValue = {
    language,
    setLanguage,
    isSpanish: language === 'es',
    isEnglish: language === 'en',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
