/**
 * Generate sitemap.xml with all 576 routes + hreflang annotations.
 * Run after `next build` as a post-build step.
 * Usage: node scripts/generate-sitemap.mjs
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'https://sinotradecompliance.com';

const locales = [
  'en', 'zh', 'es', 'fr', 'de', 'ja', 'pt', 'ru',
  'ar', 'ko', 'it', 'nl', 'tr', 'vi', 'id', 'th',
  'hi', 'pl', 'sv', 'el', 'cs', 'ro', 'hu', 'fi',
  'da', 'no', 'uk', 'bg', 'hr', 'sr', 'sk', 'sl',
  'ms', 'ka', 'he', 'sw', 'bn', 'ca',
  'fa', 'ur', 'ta', 'af', 'sq', 'az', 'hy', 'be', 'ne', 'si',
];

// All route patterns (without [locale])
const routes = [
  { path: '/', priority: 1.0 },
  { path: '/about/', priority: 0.7 },
  { path: '/services/', priority: 0.8 },
  { path: '/services/gacc/', priority: 0.8 },
  { path: '/services/label/', priority: 0.8 },
  { path: '/services/ccc/', priority: 0.8 },
  { path: '/services/cosmetics/', priority: 0.8 },
  { path: '/services/ecommerce/', priority: 0.8 },
  { path: '/services/brand/', priority: 0.8 },
  { path: '/packages/', priority: 0.8 },
  { path: '/faq/', priority: 0.7 },
  { path: '/thank-you/', priority: 0.3 },
];

function generateSitemap() {
  const now = new Date().toISOString();
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  for (const route of routes) {
    for (const locale of locales) {
      const loc = `${BASE_URL}/${locale}${route.path}`;
      xml += '  <url>\n';
      xml += `    <loc>${loc}</loc>\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;

      // hreflang alternate links
      for (const altLocale of locales) {
        if (altLocale === locale) continue;
        const altUrl = `${BASE_URL}/${altLocale}${route.path}`;
        const lang = altLocale === 'zh' ? 'zh-CN' : altLocale;
        xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${altUrl}"/>\n`;
      }

      xml += '  </url>\n';
    }
  }

  xml += '</urlset>\n';

  const outPath = join(process.cwd(), 'out', 'sitemap.xml');
  writeFileSync(outPath, xml, 'utf8');
  console.log(`✅ sitemap.xml generated: ${locales.length} locales × ${routes.length} routes = ${locales.length * routes.length} URLs`);
}

generateSitemap();
