'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { languages } from '@/i18n';
import { Languages } from 'lucide-react';
import { useState } from 'react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [showSelect, setShowSelect] = useState(false)

  return (
    <div className="flex justify-center items-center ml-auto">
      <Languages
        className="cursor-pointer"
        onClick={() => setShowSelect(!showSelect)} 
      />
      {showSelect && (
        <select
          className="absolute top-8 right-0 border rounded-lg px-2 py-1 bg-white shadow-md border-none"
          value={language}
          onChange={(e)=>{
            setLanguage(e.target.value as 'en' | 'es');
            setShowSelect(false); // Cierra el select
          }}
        >
          {languages.map((lang)=>(
            <option 
              className="font-semibold border-none bg-white hover:bg-transparent" 
              value={lang.code} 
              key={lang.code}
            >
              {lang.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}