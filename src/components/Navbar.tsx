'use client';

import { useTranslations } from 'next-intl';
import { MessageCircle } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('Navbar');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1B365D]/95 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="text-white font-bold text-lg sm:text-xl">
              {t('logo')}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              {t('services')}
            </a>
            <a href="#process" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              {t('process')}
            </a>
            <a href="#faq" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              {t('faq')}
            </a>
            <LanguageSwitcher />
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/message/HPPZ5X6XZSMLM1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white font-semibold px-4 py-2 rounded-md transition-all hover:shadow-md text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center justify-center space-x-6 text-sm">
          <a href="#services" className="text-white/80 hover:text-white transition-colors">
            {t('services')}
          </a>
          <a href="#process" className="text-white/80 hover:text-white transition-colors">
            {t('process')}
          </a>
          <a href="#faq" className="text-white/80 hover:text-white transition-colors">
            {t('faq')}
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
