import { getTranslations } from 'next-intl/server';
import Script from 'next/script';
import Hero from '@/components/Hero';
import ServicesGrid from '@/components/ServicesGrid';
import WhyUsCards from '@/components/WhyUsCards';
import ProcessSteps from '@/components/ProcessSteps';
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
    openGraph: {
      title: `${t('heroTitle')} — SinoTrade Compliance`,
      description: t('heroSubtitle'),
      locale,
      type: 'website',
      url: `https://sinotradecompliance.com/${locale}/`,
      siteName: 'SinoTrade Compliance',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('heroTitle')} — SinoTrade Compliance`,
      description: t('heroSubtitle'),
    },
    alternates: {
      canonical: `https://sinotradecompliance.com/${locale}/`,
      languages: Object.fromEntries(
        ['en','zh','es','fr','de','ja','ko','ru','pt','it','ar','nl','pl','tr','sv','no','da','fi','el','he','hi','th','vi','id','ms','tl','cs','sk','hu','ro','bg','hr','sr','uk','ka','hy','sq','sl','lt','lv','et','sw','bn','ta','ur','fa','ne','si','az','my'].map(
          (l) => [l, `https://sinotradecompliance.com/${l}/`]
        )
      ),
    },
  };
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServicesGrid />
      <WhyUsCards namespace="Home" count={4} />
      <ProcessSteps namespace="Home" />
      <AboutExpert />
      <CTASection namespace="Home" />
      <FAQPreview />
      <LeadMagnet />
      <Script id="jsonld-homepage" type="application/ld+json">
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
      </Script>
    </main>
  );
}
