/**
 * JSON-LD structured data for Organization.
 * Added to every page for SEO.
 * Uses plain <script> tag — next/script does NOT render JSON-LD
 * inline in App Router (serializes to RSC payload instead).
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
