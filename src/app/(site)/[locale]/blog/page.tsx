import { getTranslations } from 'next-intl/server';
import { getAllPostsMeta, getCategories, locales } from '@/lib/blog';
import BlogPostCard from '@/components/BlogPostCard';
import { sharedOpenGraph, sharedTwitter } from '@/lib/metadata';
import Link from 'next/link';
import BlogClient from './BlogClient';
import { locales as allLocales } from '@/i18n/routing';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const title = t('title');
  const description = t('subtitle');
  const url = `https://sinotradecompliance.com/${locale}/blog/`;
  return {
    title,
    description,
    openGraph: sharedOpenGraph({ title, description, locale, url }),
    twitter: sharedTwitter({ title, description }),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(allLocales.map((loc) => [loc, `https://sinotradecompliance.com/${loc}/blog/`])),
    },
  };
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const posts = getAllPostsMeta(locale);
  const categories = getCategories(locale);

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: t('title'),
    description: t('subtitle'),
    url: `https://sinotradecompliance.com/${locale}/blog/`,
    publisher: {
      '@type': 'Organization',
      name: 'SinoTrade Compliance',
      url: 'https://sinotradecompliance.com',
    },
  };

  return (
    <main>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-primary-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
          <Link
            href={`/${locale}/`}
            className="inline-block mt-6 text-[#D4AF37] hover:text-white transition-colors"
          >
            ← {t('backToHome')}
          </Link>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Client-side category filter + post grid */}
          <BlogClient posts={posts} categories={categories} />
        </div>
      </section>
    </main>
  );
}
