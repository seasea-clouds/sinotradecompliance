import { getTranslations } from 'next-intl/server';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Script from 'next/script';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'Faq' });
  return { title: t('heroTitle'), description: t('heroSubtitle') };
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'Faq' });

  // Build FAQ items from the translation structure (Q/A key pairs)
  const categories = [
    {
      title: t('generalTitle'),
      items: [
        { question: t('generalQ1'), answer: t('generalA1') },
        { question: t('generalQ2'), answer: t('generalA2') },
        { question: t('generalQ3'), answer: t('generalA3') },
        { question: t('generalQ4'), answer: t('generalA4') },
      ],
    },
    {
      title: t('gaccTitle'),
      items: [
        { question: t('gaccQ1'), answer: t('gaccA1') },
        { question: t('gaccQ2'), answer: t('gaccA2') },
        { question: t('gaccQ3'), answer: t('gaccA3') },
        { question: t('gaccQ4'), answer: t('gaccA4') },
      ],
    },
    {
      title: t('labelTitle'),
      items: [
        { question: t('labelQ1'), answer: t('labelA1') },
        { question: t('labelQ2'), answer: t('labelA2') },
      ],
    },
    {
      title: t('cccTitle'),
      items: [
        { question: t('cccQ1'), answer: t('cccA1') },
        { question: t('cccQ2'), answer: t('cccA2') },
      ],
    },
    {
      title: t('cosmeticsTitle'),
      items: [
        { question: t('cosmeticsQ1'), answer: t('cosmeticsA1') },
      ],
    },
    {
      title: t('ecommerceTitle'),
      items: [
        { question: t('ecommerceQ1'), answer: t('ecommerceA1') },
        { question: t('ecommerceQ2'), answer: t('ecommerceA2') },
      ],
    },
    {
      title: t('brandTitle'),
      items: [
        { question: t('brandQ1'), answer: t('brandA1') },
        { question: t('brandQ2'), answer: t('brandA2') },
      ],
    },
  ];

  // Build JSON-LD FAQPage structured data
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: categories.flatMap((cat) =>
      cat.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      }))
    ),
  };

  return (
    <main>
      {/* JSON-LD */}
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-primary-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">{t('heroTitle')}</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">{t('heroSubtitle')}</p>
        </div>
      </section>

      {/* FAQ Sections — semantic dl/dt/dd */}
      <FAQSection categories={categories} />

      <CTASection />
    </main>
  );
}
