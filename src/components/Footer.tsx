'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, MessageCircle, MapPin } from 'lucide-react';

const serviceLinks = [
  { key: 'gaccRegistration', href: '/services/gacc' },
  { key: 'labelCompliance', href: '/services/label' },
  { key: 'cccCertification', href: '/services/ccc' },
  { key: 'cosmeticsFiling', href: '/services/cosmetics' },
  { key: 'crossBorderEcommerce', href: '/services/ecommerce' },
  { key: 'brandProtection', href: '/services/brand' },
];

export default function Footer() {
  const t = useTranslations('Footer');
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? 'en';

  return (
    <footer className="bg-primary-navy py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4">{t('services')}</h4>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s.key}>
                  <Link
                    href={`/${locale}${s.href}`}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {t(s.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/about`} className="text-white/70 hover:text-white transition-colors text-sm">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/packages`} className="text-white/70 hover:text-white transition-colors text-sm">
                  {t('packages')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/faq`} className="text-white/70 hover:text-white transition-colors text-sm">
                  {t('faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-4">{t('contact')}</h4>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <a
                href="mailto:david@sinotradecompliance.com"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>david@sinotradecompliance.com</span>
              </a>
              <a
                href="https://wa.me/message/HPPZ5X6XZSMLM1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Jing&apos;an District, Shanghai, China</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-6">
          <p className="text-center text-white/60 text-sm mb-4">{t('rights')}</p>
          <p className="text-center text-white/40 text-xs max-w-2xl mx-auto">
            Disclaimer: We are an independent regulatory consulting firm and are not affiliated
            with the General Administration of Customs of China.
          </p>
        </div>
      </div>
    </footer>
  );
}
