'use client';

import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="bg-[#1B365D] text-white pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          {t('title')}
        </h1>
        <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
          {t('subtitle')}
        </p>
        <a
          href="https://wa.me/message/HPPZ5X6XZSMLM1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1B365D] font-bold px-8 py-4 rounded-md text-lg transition-all hover:shadow-lg"
        >
          {t('cta')}
        </a>
        <p className="mt-6 text-sm text-white/60">{t('trust')}</p>
      </div>
    </section>
  );
}
