'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Download, Mail } from 'lucide-react';

export default function LeadMagnet() {
  const t = useTranslations('LeadMagnet');
  const locale = useLocale();

  return (
    <section id="contact" className="bg-[#F4F6F9] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <Download className="w-12 h-12 text-[#1B365D] mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-3">
          {t('title')}
        </h2>
        <p className="text-[#7F8C8D] mb-8 leading-relaxed">
          {t('subtitle')}
        </p>
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="w-full max-w-md mx-auto bg-white rounded-lg p-6 sm:p-8 shadow-lg"
        >
          <input
            type="hidden"
            name="access_key"
            value="b1e6d34d-9fdc-4dc1-9bb2-6fc9090b361c"
          />
          <input
            type="hidden"
            name="subject"
            value="🔥 New Lead: GACC Checklist Download!"
          />
          <input
            type="hidden"
            name="from_name"
            value="SinoTrade Website"
          />
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            style={{ display: 'none' }}
          />
          <input
            type="hidden"
            name="redirect"
            value={`https://sinotradecompliance.com/${locale}/thank-you`}
          />

          {/* Email Input */}
          <div className="mb-4 relative">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-[#333333] mb-1 text-left"
            >
              {t('emailLabel')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7F8C8D]" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder={t('emailPlaceholder')}
                required
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1B365D] focus:border-transparent transition-all shadow-sm text-[#333333]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-[#1B365D] hover:bg-[#1B365D]/90 text-white font-bold py-3.5 px-4 rounded-md transition-colors duration-300 shadow-md flex justify-center items-center gap-2"
          >
            {t('button')} →
          </button>

          {/* Privacy Notice */}
          <p className="text-xs text-[#7F8C8D] text-center mt-3">{t('privacy')}</p>
        </form>
      </div>
    </section>
  );
}
