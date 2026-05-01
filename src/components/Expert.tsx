'use client';

import { useTranslations } from 'next-intl';
import { MessageCircle } from 'lucide-react';

export default function Expert() {
  const t = useTranslations('Expert');

  return (
    <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#333333] mb-10">
          {t('title')}
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-full bg-[#F4F6F9] flex items-center justify-center text-4xl font-bold text-[#1B365D] flex-shrink-0">
            DZ
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-[#333333]">{t('name')}</h3>
            <p className="text-[#2563EB] font-medium mb-3">{t('role')}</p>
            <p className="text-[#7F8C8D] leading-relaxed mb-4">{t('desc')}</p>
            <a
              href="https://wa.me/message/HPPZ5X6XZSMLM1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white font-semibold px-6 py-3 rounded-md transition-all hover:shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              {t('cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
