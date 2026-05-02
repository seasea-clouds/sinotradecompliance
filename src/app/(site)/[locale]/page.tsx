import { getTranslations } from 'next-intl/server';
import { sharedOpenGraph, sharedTwitter } from '@/lib/metadata';
import { locales } from '@/i18n/routing';
import Hero from '@/components/Hero';
import ServicesGrid from '@/components/ServicesGrid';
import WhyUsCards from '@/components/WhyUsCards';
import ProcessSteps from '@/components/ProcessSteps';
import SocialProof from '@/components/SocialProof';
import AboutExpert from '@/components/AboutExpert';
import CTASection from '@/components/CTASection';
import FAQPreview from '@/components/FAQPreview';
import LeadMagnet from '@/components/LeadMagnet';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'Home' });

  return {
    title: `${t('heroTitle')} — SinoTrade Compliance`,
    description: t('heroSubtitle'),
    openGraph: sharedOpenGraph({
      title: `${t('heroTitle')} — SinoTrade Compliance`,
      description: t('heroSubtitle'),
      locale,
      url: `https://sinotradecompliance.com/${locale}/`,
    }),
    twitter: sharedTwitter({
      title: `${t('heroTitle')} — SinoTrade Compliance`,
      description: t('heroSubtitle'),
    }),
    alternates: {
      canonical: `https://sinotradecompliance.com/${locale}/`,
      languages: Object.fromEntries(
        [...locales].map((l) => [l, `https://sinotradecompliance.com/${l}/`])
      ),
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const homeT = await getTranslations({ locale, namespace: 'Home' });

  return (
    <main>
      <Hero />
      <ServicesGrid />
      <WhyUsCards count={4} t={homeT} />
      <SocialProof />
      <ProcessSteps t={homeT} />
      <AboutExpert />
      <CTASection t={homeT} />
      <FAQPreview locale={locale} t={homeT} />
      <LeadMagnet />
      <script id="jsonld-homepage" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'SinoTrade Compliance',
          description: 'One-stop import regulatory consulting services for China — GACC registration, Chinese labeling, CCC certification, NMPA cosmetics filing, cross-border e-commerce, and brand protection.',
          url: 'https://sinotradecompliance.com',
          logo: 'https://sinotradecompliance.com/logo.png',
          image: 'https://sinotradecompliance.com/og-image.png',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Shanghai',
            addressRegion: 'Jing\'an District',
            addressCountry: 'CN',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'david@sinotradecompliance.com',
            contactType: 'customer service',
            availableLanguage: ['English', 'Chinese'],
          },
          areaServed: 'Worldwide',
          serviceType: ['Import Compliance', 'GACC Registration', 'Label Compliance', 'CCC Certification', 'Cosmetics Filing', 'Cross-border E-commerce', 'Brand Protection'],
        })}
      </script>
    </main>
  );
}
