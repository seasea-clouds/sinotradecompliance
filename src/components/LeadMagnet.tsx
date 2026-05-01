'use client';

import { useTranslations } from 'next-intl';
import { Download, Mail } from 'lucide-react';
import { useState } from 'react';

export default function LeadMagnet() {
  const t = useTranslations('LeadMagnet');
  const [email, setEmail] = useState('');

  return (
    <section className="bg-[#F4F6F9] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <Download className="w-12 h-12 text-[#1B365D] mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-3">
          {t('title')}
        </h2>
        <p className="text-[#7F8C8D] mb-8 leading-relaxed">
          {t('subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="flex-1 relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7F8C8D]" />
            <input
              type="email"
              placeholder={t('placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1B365D] focus:border-transparent text-[#333333]"
            />
          </div>
          <button className="bg-[#1B365D] hover:bg-[#1B365D]/90 text-white font-semibold px-6 py-3 rounded-md transition-all hover:shadow-md whitespace-nowrap">
            {t('button')}
          </button>
        </div>
        <p className="text-xs text-[#7F8C8D] mt-3">{t('privacy')}</p>
      </div>
    </section>
  );
}
