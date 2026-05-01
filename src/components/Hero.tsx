'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Hero() {
  const t = useTranslations('Home');
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? 'en';

  return (
    <section className="bg-primary-navy text-white pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          {t('heroTitle')}
        </h1>
        <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
          {t('heroSubtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/message/HPPZ5X6XZSMLM1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent-gold hover:bg-accent-gold/90 text-primary-navy font-bold px-8 py-4 rounded-md text-lg transition-all hover:shadow-lg"
          >
            {t('heroCta')}
          </a>
          <Link
            href={`/${locale}/services`}
            className="inline-block border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-4 rounded-md text-lg transition-all"
          >
            {t('heroExplore')}
          </Link>
        </div>
      </div>
    </section>
  );
}
