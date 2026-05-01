import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { locales, defaultLocale } from '@/i18n/routing';
import { messagesMap } from '@/i18n/messages';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
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
  const locale = (await params).locale;

  const messages = messagesMap[locale] ?? messagesMap[defaultLocale];

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Navbar />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
