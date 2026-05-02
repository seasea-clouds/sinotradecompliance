import { getTranslations } from 'next-intl/server';
import ServiceHero from '@/components/ServiceHero';
import CoverSection from '@/components/CoverSection';
import ProcessSteps from '@/components/ProcessSteps';
import WhyUsCards from '@/components/WhyUsCards';
import CTASection from '@/components/CTASection';
import ServiceFAQ from '@/components/ServiceFAQ';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'ServiceBrand' });
  return { title: t('heroTitle'), description: t('heroSubtitle') };
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
      <CTASection />
    </main>
  );
}
