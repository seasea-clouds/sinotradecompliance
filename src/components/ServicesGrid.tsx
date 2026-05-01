'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const serviceIcons: Record<string, string> = {
  gacc: '📋',
  label: '🏷️',
  ccc: '🔌',
  cosmetics: '💄',
  ecommerce: '🛒',
  brand: '🛡️',
};

export default function ServicesGrid() {
  const t = useTranslations('Services');
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? 'en';

  const services = [
    { key: 'gacc', title: t('gaccTitle'), subtitle: t('gaccSubtitle'), points: t('gaccPoints').split(','), link: t('gaccLink') },
    { key: 'label', title: t('labelTitle'), subtitle: t('labelSubtitle'), points: t('labelPoints').split(','), link: t('labelLink') },
    { key: 'ccc', title: t('cccTitle'), subtitle: t('cccSubtitle'), points: t('cccPoints').split(','), link: t('cccLink') },
    { key: 'cosmetics', title: t('cosmeticsTitle'), subtitle: t('cosmeticsSubtitle'), points: t('cosmeticsPoints').split(','), link: t('cosmeticsLink') },
    { key: 'ecommerce', title: t('ecommerceTitle'), subtitle: t('ecommerceSubtitle'), points: t('ecommercePoints').split(','), link: t('ecommerceLink') },
    { key: 'brand', title: t('brandTitle'), subtitle: t('brandSubtitle'), points: t('brandPoints').split(','), link: t('brandLink') },
  ];

  return (
    <section className="py-20 bg-bg-ice">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">{t('heroTitle')}</h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">{t('heroSubtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.key}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col"
            >
              <div className="text-4xl mb-4">{serviceIcons[s.key]}</div>
              <h3 className="text-xl font-bold text-primary-navy mb-2">{s.title}</h3>
              <p className="text-text-muted mb-4 text-sm">{s.subtitle}</p>
              <ul className="space-y-2 mb-6 flex-grow">
                {s.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-charcoal">
                    <ChevronRight className="w-4 h-4 text-accent-gold flex-shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/services/${s.key}`}
                className="inline-flex items-center gap-1 text-accent-blue font-semibold hover:text-primary-navy transition-colors"
              >
                {s.link}
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
