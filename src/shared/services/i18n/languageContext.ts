import { createContext } from 'react';
import type { Language } from './types';

export interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  isSpanish: boolean;
  isEnglish: boolean;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
