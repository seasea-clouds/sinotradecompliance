import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { locales, defaultLocale } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = locales.includes(rawLocale as any) ? rawLocale : defaultLocale;

  const t = await getTranslations({ locale, namespace: 'Hero' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `https://sinotradecompliance.com/${locale}/`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `https://sinotradecompliance.com/${l}/`])
      ),
    },
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      locale,
      alternateLocale: locales.filter((l) => l !== locale),
      siteName: 'SinoTrade Compliance',
      url: `https://sinotradecompliance.com/${locale}/`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = locales.includes(rawLocale as any) ? rawLocale : defaultLocale;

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        {locales.map((l) => (
          <link
            key={l}
            rel="alternate"
            hrefLang={l}
            href={`https://sinotradecompliance.com/${l}/`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://sinotradecompliance.com/en/"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'SinoTrade Compliance',
              description:
                'GACC Decree 248 registration experts for global Food & Beverage brands',
              url: `https://sinotradecompliance.com/${locale}/`,
              serviceType: 'Customs Compliance Consulting',
              areaServed: 'Worldwide',
              priceRange: '$1,200 USD',
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
