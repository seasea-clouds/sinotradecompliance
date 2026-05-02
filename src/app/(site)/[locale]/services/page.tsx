import { use } from 'react';
import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import { sharedOpenGraph, sharedTwitter } from '@/lib/metadata';
import ServicesGrid from '@/components/ServicesGrid';
import CTASection from '@/components/CTASection';
import LeadMagnet from '@/components/LeadMagnet';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'Services' });
  const title = t('heroTitle');
  const description = t('heroSubtitle');
  const url = `https://sinotradecompliance.com/${locale}/services/`;
  return {
    title,
    description,
    openGraph: sharedOpenGraph({ title, description, locale, url }),
    twitter: sharedTwitter({ title, description }),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [l, `https://sinotradecompliance.com/${l}/services/`])
      ),
    },
  };
}

export default function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  use(params);

  return (
    <main>
      <ServicesGrid />
      <CTASection namespace="ServiceCommon" />
          <script id="jsonld-services" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "CollectionPage", "name": "China Import Compliance Services", "description": "Full range of import compliance services for China market entry \u2014 GACC, labeling, CCC, NMPA, e-commerce, and brand protection.", "url": "https://sinotradecompliance.com/services/", "publisher": {"@type": "Organization", "name": "SinoTrade Compliance"}}) }} />
    <LeadMagnet />
    </main>
  );
}
