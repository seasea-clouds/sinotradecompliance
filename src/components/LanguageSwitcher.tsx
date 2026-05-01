'use client';

import { useLocale } from 'next-intl';
import { locales, localeNames, defaultLocale } from '@/i18n/routing';
import { useState, useEffect } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Static export: change path directly
  const handleChange = (newLocale: string) => {
    if (newLocale === locale) return;
    const path = window.location.pathname;
    // Replace locale in path
    const newPath = path.replace(`/${locale}/`, `/${newLocale}/`);
    window.location.href = newPath;
  };

  if (!mounted) return null;

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors text-sm">
        <span className="text-base">🌐</span>
        <span className="hidden sm:inline">{localeNames[locale as keyof typeof localeNames]?.split(' ').slice(1).join(' ')}</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute right-0 top-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 py-1 min-w-[140px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {locales.map((l) => (
          <button
            key={l}
            onClick={() => handleChange(l)}
            className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 transition-colors ${
              l === locale ? 'bg-primary-navy/10 font-semibold' : ''
            }`}
          >
            {localeNames[l]}
          </button>
        ))}
      </div>
    </div>
  );
}
