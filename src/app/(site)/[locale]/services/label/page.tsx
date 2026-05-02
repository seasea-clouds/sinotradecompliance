import { getTranslations } from 'next-intl/server';
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
  const t = await getTranslations({ locale, namespace: 'ServiceLabel' });
  return { title: t('heroTitle'), description: t('heroSubtitle') };
}

export default async function LabelPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'ServiceLabel' });

  return (
    <main>
      <ServiceHero title={t('heroTitle')} subtitle={t('heroSubtitle')} ctaText={t('cta')} />
      <CoverSection namespace="ServiceLabel" />
      <ProcessSteps namespace="Home" />
      <WhyUsCards />
      <ServiceFAQ namespace="ServiceLabel" />
      <LeadMagnet />
      <CTASection />
          <Script id="jsonld-label" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "Service", "name": "Chinese Label Compliance", "description": "Chinese Label Compliance service for China market entry by SinoTrade Compliance.", "url": "https://sinotradecompliance.com/services/label/", "provider": {"@type": "Organization", "name": "SinoTrade Compliance"}, "serviceType": "Chinese Label Compliance", "areaServed": "Worldwide"}) }} />
    </main>
  );
}
