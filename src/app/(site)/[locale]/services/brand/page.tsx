import { getTranslations } from 'next-intl/server';
import { sharedOpenGraph, sharedTwitter } from '@/lib/metadata';
import ServiceHero from '@/components/ServiceHero';
import CoverSection from '@/components/CoverSection';
import ProcessSteps from '@/components/ProcessSteps';
import WhyUsCards from '@/components/WhyUsCards';
import CTASection from '@/components/CTASection';
import LeadMagnet from '@/components/LeadMagnet';
import ServiceFAQ from '@/components/ServiceFAQ';
import Script from 'next/script';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'ServiceBrand' });
  const title = t('heroTitle');
  const description = t('heroSubtitle');
  const url = `https://sinotradecompliance.com/${locale}/services/brand/`;
  return {
    title,
    description,
    openGraph: sharedOpenGraph({ title, description, locale, url }),
    twitter: sharedTwitter({ title, description }),
    alternates: { canonical: url },
  };
}

export default async function BrandPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'ServiceBrand' });

  return (
    <main>
      <ServiceHero title={t('heroTitle')} subtitle={t('heroSubtitle')} ctaText={t('cta')} />
      <CoverSection namespace="ServiceBrand" />
      <ProcessSteps namespace="Home" />
      <WhyUsCards />
      <ServiceFAQ namespace="ServiceBrand" />
      <LeadMagnet />
      <CTASection />
          <Script id="jsonld-brand" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "Service", "name": "Brand Protection", "description": "Brand Protection service for China market entry by SinoTrade Compliance.", "url": "https://sinotradecompliance.com/services/brand/", "provider": {"@type": "Organization", "name": "SinoTrade Compliance"}, "serviceType": "Brand Protection", "areaServed": "Worldwide"}) }} />
    </main>
  );
}
