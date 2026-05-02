'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Check, ArrowRight } from 'lucide-react';

const services = ['gacc', 'label', 'ccc', 'cosmetics', 'ecommerce', 'brand'];

export default function PackageCards() {
  const t = useTranslations('Packages');
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? 'en';

  const steps = [
    { title: t('step1Title'), desc: t('step1Desc') },
    { title: t('step2Title'), desc: t('step2Desc') },
    { title: t('step3Title'), desc: t('step3Desc') },
    { title: t('step4Title'), desc: t('step4Desc') },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* How It Works */}
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-navy mb-4">{t('howItWorks')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-10 h-10 bg-accent-gold text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                {i + 1}
              </div>
              <h3 className="font-semibold text-primary-navy text-sm mb-1">{step.title}</h3>
              <p className="text-xs text-text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {services.map((svc) => (
          <div
            key={svc}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-bold text-primary-navy mb-2">{t(`${svc}Name`)}</h3>
            <p className="text-sm text-text-muted mb-4">{t(`${svc}Desc`)}</p>
            <ul className="space-y-2 mb-6 flex-grow">
              {t(`${svc}Items`).split(',').map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-text-charcoal">
                  <Check className="w-4 h-4 text-accent-green flex-shrink-0 mt-0.5" />
                  {item.trim()}
                </li>
              ))}
            </ul>
            <a
              href={`https://wa.me/message/HPPZ5X6XZSMLM1?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(t(`${svc}Name`))}%20service.%20Can%20I%20get%20a%20free%20assessment%3F`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary-navy hover:bg-primary-navy/90 text-white font-semibold px-5 py-2.5 rounded-md transition-all text-sm"
            >
              {t('allCardsCta')} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center bg-primary-navy rounded-lg p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('ctaTitle')}</h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-6">{t('ctaDesc')}</p>
        <a
          href="https://wa.me/message/HPPZ5X6XZSMLM1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent-gold hover:bg-accent-gold/90 text-white font-semibold px-8 py-3 rounded-md transition-all hover:shadow-lg"
        >
          {t('ctaButton')}
        </a>
      </div>
    </div>
  );
}
