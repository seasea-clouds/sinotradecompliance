import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import { sharedOpenGraph, sharedTwitter } from '@/lib/metadata';
import ServiceHero from '@/components/ServiceHero';
import CoverSection from '@/components/CoverSection';
import ProcessSteps from '@/components/ProcessSteps';
import WhyUsCards from '@/components/WhyUsCards';
import CTASection from '@/components/CTASection';
import LeadMagnet from '@/components/LeadMagnet';
import ServiceFAQ from '@/components/ServiceFAQ';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'ServiceCcc' });
  const title = t('heroTitle');
  const description = t('heroSubtitle');
  const url = `https://sinotradecompliance.com/${locale}/services/ccc/`;
  return {
    title,
    description,
    openGraph: sharedOpenGraph({ title, description, locale, url }),
    twitter: sharedTwitter({ title, description }),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [l, `https://sinotradecompliance.com/${l}/services/ccc/`])
      ),
    },
  };
}

export default async function CCCPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'ServiceCcc' });
  const commonT = await getTranslations({ locale, namespace: 'ServiceCommon' });
  const homeT = await getTranslations({ locale, namespace: 'Home' });

  return (
    <main>
      <ServiceHero title={t('heroTitle')} subtitle={t('heroSubtitle')} ctaText={t('cta')} />
      <CoverSection t={t} />
      <ProcessSteps t={homeT} />
      <WhyUsCards t={commonT} />
      <ServiceFAQ namespace="ServiceCcc" />
      <LeadMagnet />
      <CTASection t={commonT} />
          <script id="jsonld-ccc" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "Service", "name": "CCC Certification", "description": "CCC Certification service for China market entry by SinoTrade Compliance.", "url": "https://sinotradecompliance.com/services/ccc/", "provider": {"@type": "Organization", "name": "SinoTrade Compliance"}, "serviceType": "CCC Certification", "areaServed": "Worldwide"}) }} />
    </main>
  );
}
