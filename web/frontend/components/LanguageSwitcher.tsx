'use client';

import { useState } from 'react';
import { useLang } from '@/lib/language-context';
import type { Language } from '@/lib/translations';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [isOpen, setIsOpen] = useState(false);

  const languages: Array<{ code: Language; name: string }> = [
    { code: 'zh', name: '中文' },
    { code: 'en', name: 'English' }
  ];

  const handleLanguageChange = (langCode: Language) => {
    setLang(langCode);
    setIsOpen(false);
  };

  const currentLangName = languages.find(l => l.code === lang)?.name || 'Language';

  return (
    <div className="language-switcher">
      <div className={`language-dropdown ${isOpen ? 'active' : ''}`}>
        {languages.map((l) => (
          <div
            key={l.code}
            className={`language-option ${lang === l.code ? 'active' : ''}`}
            onClick={() => handleLanguageChange(l.code)}
          >
            {l.name}
          </div>
        ))}
      </div>
      <button className="language-btn" onClick={() => setIsOpen(!isOpen)}>
        <span>🌐</span>
        <span>{currentLangName}</span>
      </button>
    </div>
  );
}
