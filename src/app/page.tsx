'use client';

import { useEffect } from 'react';

const localeMap: Record<string, string> = {
  // Original 8
  zh: 'zh', 'zh-CN': 'zh', 'zh-TW': 'zh',
  es: 'es', fr: 'fr', de: 'de', ja: 'ja', pt: 'pt', ru: 'ru',
  // New 26
  ar: 'ar',
  ko: 'ko',
  it: 'it',
  nl: 'nl',
  tr: 'tr',
  vi: 'vi',
  id: 'id',
  th: 'th',
  hi: 'hi',
  pl: 'pl',
  sv: 'sv',
  el: 'el',
  cs: 'cs',
  ro: 'ro',
  hu: 'hu',
  fi: 'fi',
  da: 'da',
  no: 'no',
  uk: 'uk',
  bg: 'bg',
  hr: 'hr',
  sr: 'sr',
  sk: 'sk',
  sl: 'sl',
  ms: 'ms',
  ka: 'ka',
};

export default function RootPage() {
  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language;
    const shortLang = browserLang.split('-')[0];

    // Map to supported locale, default to 'en'
    const locale = localeMap[browserLang] || localeMap[shortLang] || 'en';

    // Redirect to locale page
    window.location.replace(`/${locale}/`);
  }, []);

  // Show nothing during redirect
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#1B365D] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#7F8C8D] text-sm">Loading...</p>
      </div>
    </div>
  );
}
