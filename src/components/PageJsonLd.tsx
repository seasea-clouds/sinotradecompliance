import Script from 'next/script';

interface PageJsonLdProps {
  type: string;
  name: string;
  description: string;
  url: string;
  image?: string;
  additional?: Record<string, unknown>;
}

/**
 * Generic JSON-LD for any page.
 * Usage: <PageJsonLd type="AboutPage" name="About Us" description="..." url="..." />
 */
export default function PageJsonLd({ type, name, description, url, image, additional }: PageJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    ...(image && { image }),
    publisher: {
      '@type': 'Organization',
      name: 'SinoTrade Compliance',
      logo: { '@type': 'ImageObject', url: 'https://sinotradecompliance.com/logo.png' },
    },
    ...additional,
  };

  return (
    <Script
      id={`jsonld-${type.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
