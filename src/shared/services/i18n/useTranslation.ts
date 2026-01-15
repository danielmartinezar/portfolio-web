import { useState, useEffect } from 'react';
import { useLanguage } from './useLanguage';
import type { Language } from './types';

type TranslationLoader<T> = () => Promise<{ default: T }>;

interface LazyTranslations<T> {
  en: TranslationLoader<T>;
  es: TranslationLoader<T>;
}

interface UseTranslationResult<T> {
  t: T | null;
  isLoading: boolean;
}

/**
 * Hook to lazily load translations based on current language
 * Only loads the translation file for the active language
 * @param loaders Object containing lazy loaders for each language
 * @returns The translation object and loading state
 */
export function useTranslation<T>(loaders: LazyTranslations<T>): UseTranslationResult<T> {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    loaders[language]().then((module) => {
      if (!cancelled) {
        setTranslations(module.default);
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [language, loaders]);

  return { t: translations, isLoading };
}

/**
 * Helper function to get translation (for server-side or non-hook contexts)
 */
export async function getTranslation<T>(
  loaders: LazyTranslations<T>,
  language: Language
): Promise<T> {
  const module = await loaders[language]();
  return module.default;
}
