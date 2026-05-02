'use client';

import { useTranslations } from 'next-intl';

interface ServiceFAQProps {
  namespace: string;
}

export default function ServiceFAQ({ namespace }: ServiceFAQProps) {
  const t = useTranslations(namespace);
  const questionsTitle = t('questionsTitle');
  const questionsSubtitle = t('questionsSubtitle');

  const questions = [
    { q: t('faq1q'), a: t('faq1a') },
    { q: t('faq2q'), a: t('faq2a') },
    { q: t('faq3q'), a: t('faq3a') },
    { q: t('faq4q'), a: t('faq4a') },
  ];

  return (
    <section className="py-16 bg-bg-ice">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-navy mb-3">{questionsTitle}</h2>
          <p className="text-text-muted max-w-2xl mx-auto">{questionsSubtitle}</p>
        </div>

        <div className="space-y-4">
          {questions.map((item, i) => (
            <details
              key={i}
              className="group bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-left font-semibold text-primary-navy hover:bg-bg-ice transition-colors list-none [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <svg
                  className="w-5 h-5 text-accent-gold transition-transform group-open:rotate-180 flex-shrink-0 ml-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-5 text-text-muted leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
