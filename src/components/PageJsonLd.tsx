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
 * Uses plain <script> tag — next/script does NOT render JSON-LD
 * inline in App Router (serializes to RSC payload instead).
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
