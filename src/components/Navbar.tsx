'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { MessageCircle, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

const serviceLinks = [
  { key: 'gacc', href: '/services/gacc' },
  { key: 'label', href: '/services/label' },
  { key: 'ccc', href: '/services/ccc' },
  { key: 'cosmetics', href: '/services/cosmetics' },
  { key: 'ecommerce', href: '/services/ecommerce' },
  { key: 'brand', href: '/services/brand' },
];

export default function Navbar() {
  const t = useTranslations('Navbar');
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? 'en';
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary-navy/95 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${locale}`} className="text-white font-bold text-lg sm:text-xl">
              {t('logo')}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                {t('services')}
                <ChevronDown className="w-3 h-3" />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg py-2 z-50">
                  {serviceLinks.map((s) => (
                    <Link
                      key={s.key}
                      href={`/${locale}${s.href}`}
                      className="block px-4 py-2 text-sm text-text-charcoal hover:bg-bg-ice hover:text-primary-navy transition-colors"
                    >
                      {t(`servicesDropdown.${s.key}`)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href={`/${locale}/about`} className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              {t('about')}
            </Link>
            <Link href={`/${locale}/packages`} className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              {t('packages')}
            </Link>
            <Link href={`/${locale}/faq`} className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              {t('faq')}
            </Link>
            <LanguageSwitcher />
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/message/HPPZ5X6XZSMLM1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold px-4 py-2 rounded-md transition-all hover:shadow-md text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <Link href={`/${locale}/services`} className="text-white/80 hover:text-white transition-colors">
            {t('services')}
          </Link>
          <Link href={`/${locale}/about`} className="text-white/80 hover:text-white transition-colors">
            {t('about')}
          </Link>
          <Link href={`/${locale}/packages`} className="text-white/80 hover:text-white transition-colors">
            {t('packages')}
          </Link>
          <Link href={`/${locale}/faq`} className="text-white/80 hover:text-white transition-colors">
            {t('faq')}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
