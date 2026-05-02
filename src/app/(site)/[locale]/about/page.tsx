import { getTranslations } from 'next-intl/server';
import Script from 'next/script';
import { sharedOpenGraph, sharedTwitter } from '@/lib/metadata';
import LeadMagnet from '@/components/LeadMagnet';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'About' });
  const title = t('title');
  const description = t('subtitle');
  const url = `https://sinotradecompliance.com/${locale}/about/`;
  return {
    title,
    description,
    openGraph: sharedOpenGraph({ title, description, locale, url }),
    twitter: sharedTwitter({ title, description }),
    alternates: { canonical: url },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'About' });

  return (
    <main>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-primary-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">{t('title')}</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-navy mb-6 text-center">{t('missionTitle')}</h2>
          <p className="text-text-charcoal text-lg leading-relaxed text-center">{t('missionText')}</p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-bg-ice">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-navy mb-10 text-center">{t('valuesTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t('values').split(',').map((v, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-lg font-bold text-primary-navy mb-2">{v.split('—')[0]?.trim()}</h3>
                <p className="text-text-muted text-sm">{v.split('—')[1]?.trim()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{t('ctaTitle')}</h2>
          <p className="text-white/80 mb-8">{t('ctaSubtitle')}</p>
          <a
            href="https://wa.me/message/HPPZ5X6XZSMLM1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent-gold hover:bg-accent-gold/90 text-white font-semibold px-8 py-3 rounded-md transition-all hover:shadow-lg"
          >
            {t('ctaButton')}
          </a>
        </div>
      </section>
          <Script id="jsonld-about" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "AboutPage", "name": "About SinoTrade Compliance", "description": "Learn about David Zhang and the SinoTrade Compliance team \u2014 your trusted partner for China import regulatory compliance.", "url": "https://sinotradecompliance.com/about/", "publisher": {"@type": "Organization", "name": "SinoTrade Compliance"}, "mainEntity": {"@type": "Person", "name": "David Zhang", "jobTitle": "GACC Registration Expert", "knowsAbout": ["GACC Registration", "Import Compliance", "Food Safety", "Chinese Market Entry"]}}) }} />
    <LeadMagnet />
    </main>
  );
}
