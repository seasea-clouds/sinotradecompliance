import Script from 'next/script';

/**
 * JSON-LD structured data for Organization.
 * Added to every page for SEO.
 */
export default function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SinoTrade Compliance',
    description: 'One-stop import regulatory consulting services for China — GACC registration, Chinese labeling, CCC certification, NMPA cosmetics filing, cross-border e-commerce, and brand protection.',
    url: 'https://sinotradecompliance.com',
    logo: 'https://sinotradecompliance.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'david@sinotradecompliance.com',
      contactType: 'customer service',
      availableLanguage: ['English', 'Chinese'],
    },
    sameAs: [],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Shanghai',
      addressRegion: 'Jing\'an District',
      addressCountry: 'CN',
    },
  };

  return (
    <Script
      id="jsonld-organization"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
