import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MessageCircle, CheckCircle } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'ThankYou' });

  return {
    title: `${t('title')} — SinoTrade Compliance`,
    description: t('subtitle'),
    openGraph: {
      title: `${t('title')} — SinoTrade Compliance`,
      description: t('subtitle'),
      locale,
      type: 'website',
      url: `https://sinotradecompliance.com/${locale}/thank-you/`,
      siteName: 'SinoTrade Compliance',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} — SinoTrade Compliance`,
      description: t('subtitle'),
    },
    alternates: {
      canonical: `https://sinotradecompliance.com/${locale}/thank-you/`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `https://sinotradecompliance.com/${l}/thank-you/`])
      ),
    },
  };
}



export default async function ThankYouPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'ThankYou' });
  const title = t('title');
  const subtitle = t('subtitle');

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${title} — SinoTrade Compliance`,
    "description": subtitle,
    "url": `https://sinotradecompliance.com/${locale}/thank-you/`,
    "publisher": {"@type": "Organization", "name": "SinoTrade Compliance"},
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />

      <section className="flex-1 bg-bg-ice flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-navy mb-4">
            {title}
          </h1>

          {/* Message */}
          <p className="text-lg sm:text-xl text-text-muted mb-6 leading-relaxed">
            {subtitle}
          </p>

          {/* Secondary Message */}
          <p className="text-base text-text-charcoal mb-8 leading-relaxed">
            {t('waitMsg')}
          </p>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/message/HPPZ5X6XZSMLM1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent-blue hover:bg-accent-blue/90 text-white font-bold py-4 px-8 rounded-md transition-all hover:shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            {t('whatsappCta')}
          </a>

          {/* Back to Home */}
          <div className="mt-8">
            <a
              href={`/${locale}/`}
              className="text-primary-navy hover:text-primary-navy/80 font-medium transition-colors"
            >
              ← {t('back')}
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <script
        id="jsonld-thankyou"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}