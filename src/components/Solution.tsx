'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function Solution() {
  const t = useTranslations('Solution');

  const steps = [
    { title: t('step1Title'), desc: t('step1Desc') },
    { title: t('step2Title'), desc: t('step2Desc') },
    { title: t('step3Title'), desc: t('step3Desc') },
    { title: t('step4Title'), desc: t('step4Desc') },
  ];

  return (
    <section id="process" className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#333333] mb-4">
          {t('title')}
        </h2>
        <div className="space-y-6 mt-12">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1B365D] text-white flex items-center justify-center font-bold">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-[#2563EB]" />
                  <h3 className="text-lg font-bold text-[#333333]">{step.title}</h3>
                </div>
                <p className="text-[#7F8C8D] leading-relaxed ml-7">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="https://wa.me/message/HPPZ5X6XZSMLM1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white font-semibold px-8 py-4 rounded-md text-lg transition-all hover:shadow-lg"
          >
            {t('cta')}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
