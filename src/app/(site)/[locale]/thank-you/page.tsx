import Script from 'next/script';
import { getTranslations } from 'next-intl/server';
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
    },
  };
}



export default function ThankYou() {
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
            Thanks!
          </h1>

          {/* Message */}
          <p className="text-lg sm:text-xl text-text-muted mb-6 leading-relaxed">
            The checklist is on its way to your inbox.
          </p>

          {/* Secondary Message */}
          <p className="text-base text-text-charcoal mb-8 leading-relaxed">
            While you wait, why not chat with David on WhatsApp for a free assessment?
          </p>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/message/HPPZ5X6XZSMLM1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent-blue hover:bg-accent-blue/90 text-white font-bold py-4 px-8 rounded-md transition-all hover:shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Chat with David on WhatsApp
          </a>

          {/* Back to Home */}
          <div className="mt-8">
            <a
              href="/"
              className="text-primary-navy hover:text-primary-navy/80 font-medium transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </section>

      <Footer />
    
      <Script id="jsonld-thankyou" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "ThankYou — SinoTrade Compliance",
          "description": "WebPage page for SinoTrade Compliance",
          "url": "https://sinotradecompliance.com/thank-you/",
          "publisher": {"@type": "Organization", "name": "SinoTrade Compliance"},
        })
      }} />
    </main>
  );
}