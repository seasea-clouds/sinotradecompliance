import { getTranslations } from 'next-intl/server';
import { sharedOpenGraph, sharedTwitter } from '@/lib/metadata';
import PackageCards from '@/components/PackageCards';
import CTASection from '@/components/CTASection';
import LeadMagnet from '@/components/LeadMagnet';
import Script from 'next/script';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'Packages' });
  const title = t('title');
  const description = t('subtitle');
  const url = `https://sinotradecompliance.com/${locale}/packages/`;
  return {
    title,
    description,
    openGraph: sharedOpenGraph({ title, description, locale, url }),
    twitter: sharedTwitter({ title, description }),
    alternates: { canonical: url },
  };
}

export default async function PackagesPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'Packages' });

  return (
    <main>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-primary-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">{t('title')}</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Package Cards */}
      <section className="py-16 bg-bg-ice">
        <PackageCards />
      </section>

      {/* Custom CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-primary-navy mb-4">{t('customTitle')}</h2>
          <p className="text-text-muted mb-6">{t('customDesc')}</p>
          <a
            href="https://wa.me/message/HPPZ5X6XZSMLM1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary-navy hover:bg-primary-navy/90 text-white font-semibold px-8 py-3 rounded-md transition-all hover:shadow-lg"
          >
            {t('customCta')}
          </a>
        </div>
      </section>

      <CTASection />
          <Script id="jsonld-packages" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebPage", "name": "Compliance Packages", "description": "Bundled compliance packages for China market entry \u2014 Market Entry, Go-to-Market, and Brand Launch tiers.", "url": "https://sinotradecompliance.com/packages/", "publisher": {"@type": "Organization", "name": "SinoTrade Compliance"}}) }} />
    <LeadMagnet />
    </main>
  );
}
