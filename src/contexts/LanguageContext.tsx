'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, getTranslation } from '@/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Inicializamos con un valor por defecto para que SSR y la primera renderización
  // del cliente coincidan. Solo después del montaje (cliente) leemos localStorage
  // y actualizamos el idioma si el usuario tiene una preferencia guardada.
  const [language, setLanguageState] = useState<Language>('es');

  // Sincroniza con localStorage después del montaje para evitar
  // desajustes de hidratación entre servidor y cliente.
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('language') as Language | null;
      if (saved && saved !== language) {
        setLanguageState(saved);
      }
    } catch {
      // Si el acceso a localStorage falla (por alguna extensión o modo incógnito),
      // fallamos de forma silenciosa y mantenemos el idioma por defecto.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const translation = getTranslation(language);
    const keys = key.split('.');
    let value: unknown = translation;

    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}