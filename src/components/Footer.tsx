'use client';

import { useTranslations } from 'next-intl';
import { Mail, MessageCircle, MapPin } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-[#1B365D] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Contact Info — never change these */}
        <div className="text-center text-white mb-8">
          <h4 className="text-lg font-bold mb-6">{t('contact')}</h4>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-6">
            {/* Email */}
            <a
              href="mailto:david@sinotradecompliance.com"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">david@sinotradecompliance.com</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/message/HPPZ5X6XZSMLM1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">WhatsApp</span>
            </a>

            {/* Location */}
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Jing'an District, Shanghai, China</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-6">
          {/* Copyright */}
          <p className="text-center text-white/60 text-sm mb-4">
            {t('rights')}
          </p>

          {/* Disclaimer */}
          <p className="text-center text-white/40 text-xs max-w-2xl mx-auto">
            Disclaimer: We are an independent regulatory consulting firm and are not affiliated
            with the General Administration of Customs of China.
          </p>
        </div>
      </div>
    </footer>
  );
}
