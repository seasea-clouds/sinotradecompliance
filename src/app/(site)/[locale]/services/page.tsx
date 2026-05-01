import { use } from 'react';
import { getTranslations } from 'next-intl/server';
import ServicesGrid from '@/components/ServicesGrid';
import CTASection from '@/components/CTASection';

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
    </main>
  );
}
