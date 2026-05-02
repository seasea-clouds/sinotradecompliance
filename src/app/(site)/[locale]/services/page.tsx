import { use } from 'react';
import { getTranslations } from 'next-intl/server';
import ServicesGrid from '@/components/ServicesGrid';
import CTASection from '@/components/CTASection';
import LeadMagnet from '@/components/LeadMagnet';
import Script from 'next/script';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'Services' });

  return {
    title: t('heroTitle'),
    description: t('heroSubtitle'),
  };
}

export default function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  use(params);

  return (
    <main>
      <ServicesGrid />
      <CTASection namespace="ServiceCommon" />
          <Script id="jsonld-services" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "CollectionPage", "name": "China Import Compliance Services", "description": "Full range of import compliance services for China market entry \u2014 GACC, labeling, CCC, NMPA, e-commerce, and brand protection.", "url": "https://sinotradecompliance.com/services/", "publisher": {"@type": "Organization", "name": "SinoTrade Compliance"}}) }} />
    <LeadMagnet />
    </main>
  );
}
