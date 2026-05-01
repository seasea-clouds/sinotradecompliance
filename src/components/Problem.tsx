'use client';

import { useTranslations } from 'next-intl';
import { AlertCircle, FileX, Anchor } from 'lucide-react';

export default function Problem() {
  const t = useTranslations('Problem');

  const cards = [
    { icon: AlertCircle, title: t('card1Title'), desc: t('card1Desc') },
    { icon: FileX, title: t('card2Title'), desc: t('card2Desc') },
    { icon: Anchor, title: t('card3Title'), desc: t('card3Desc') },
  ];

  return (
    <section id="services" className="bg-[#F4F6F9] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#333333] mb-12">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <card.icon className="w-10 h-10 text-[#1B365D] mb-4" />
              <h3 className="text-lg font-bold text-[#333333] mb-3">{card.title}</h3>
              <p className="text-[#7F8C8D] leading-relaxed text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
