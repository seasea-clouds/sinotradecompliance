import { getTranslations } from 'next-intl/server';
import { getAllPostSlugs, getPostBySlug, locales } from '@/lib/blog';
import { sharedOpenGraph, sharedTwitter } from '@/lib/metadata';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { locales as allLocales } from '@/i18n/routing';

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const slugs = getAllPostSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale, slug);
  if (!post) return { title: 'Post Not Found' };

  const t = await getTranslations({ locale, namespace: 'Blog' });
  const url = `https://sinotradecompliance.com/${locale}/blog/${slug}/`;
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: sharedOpenGraph({ title: post.title, description: post.excerpt, locale, url }),
    twitter: sharedTwitter({ title: post.title, description: post.excerpt }),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(allLocales.map((loc) => [loc, `https://sinotradecompliance.com/${loc}/blog/${slug}/`])),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale, slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: 'Blog' });

  // JSON-LD BlogPosting schema
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'David Zhang',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SinoTrade Compliance',
      url: 'https://sinotradecompliance.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sinotradecompliance.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://sinotradecompliance.com/${locale}/blog/${slug}/`,
    },
    ...(post.coverImage
      ? {
          image: {
            '@type': 'ImageObject',
            url: post.coverImage,
          },
        }
      : {}),
  };

  // Hreflang links for static export (Next.js doesn't render alternates.languages in export mode)
  const hreflangLinks = allLocales.map((loc) => (
    <link
      key={loc}
      rel="alternate"
      hrefLang={loc}
      href={`https://sinotradecompliance.com/${loc}/blog/${slug}/`}
    />
  ));

  return (
    <main>
      {/* Hreflang */}
      {hreflangLinks}

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-primary-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href={`/${locale}/blog/`}
            className="inline-block mb-6 text-[#D4AF37] hover:text-white transition-colors"
          >
            ← {t('backToBlog')}
          </Link>
          <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-[#D4AF37] rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-white/50">
            <time dateTime={post.date}>{post.date}</time>
            <span>•</span>
            <span>{t('author')}</span>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
          <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className="prose prose-lg max-w-none
            prose-headings:text-[#1B365D]
            prose-headings:font-bold
            prose-a:text-[#D4AF37]
            prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#333333]
            prose-li:text-[#333333]
            prose-p:text-[#333333]
            prose-p:leading-relaxed
            prose-ul:marker:text-[#D4AF37]
            prose-ol:marker:text-[#D4AF37]
            prose-blockquote:border-l-[#D4AF37]
            prose-blockquote:text-[#7F8C8D]
            prose-img:rounded-xl
            prose-img:shadow-md
            prose-code:bg-[#F4F6F9]
            prose-code:px-1.5 prose-code:py-0.5
            prose-code:rounded
            prose-code:text-sm
            prose-hr:border-[#F4F6F9]
            prose-table:border-collapse
            prose-th:bg-primary-navy
            prose-th:text-white
            prose-th:px-4 prose-th:py-2
            prose-td:border prose-td:border-[#F4F6F9]
            prose-td:px-4 prose-td:py-2"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>

      {/* CTA */}
      <section className="py-16 bg-[#F4F6F9]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B365D] mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-lg text-[#7F8C8D] mb-8">{t('ctaSubtitle')}</p>
          <a
            href="https://wa.me/message/HPPZ5X6XZSMLM1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-[#D4AF37] text-white font-semibold rounded-lg hover:bg-[#1B365D] transition-colors"
          >
            {t('ctaButton')}
          </a>
        </div>
      </section>
    </main>
  );
}
