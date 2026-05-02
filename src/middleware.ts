import { NextRequest, NextResponse } from 'next/server';

const supportedLocales = [
  'en', 'zh', 'es', 'fr', 'de', 'ja', 'pt', 'ru',
  'ar', 'ko', 'it', 'nl', 'tr', 'vi', 'id', 'th',
  'hi', 'pl', 'sv', 'el', 'cs', 'ro', 'hu', 'fi',
  'da', 'no', 'uk', 'bg', 'hr', 'sr', 'sk', 'sl',
  'ms', 'ka', 'he', 'sw', 'bn', 'ca',
  'fa', 'ur', 'ta', 'af', 'sq', 'az', 'hy', 'be', 'ne', 'si',
];

const localePrefixes = supportedLocales.map((l) => `/${l}/`);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only handle the root path
  if (pathname !== '/') {
    return NextResponse.next();
  }

  // Detect locale from Accept-Language header
  const acceptLang = request.headers.get('accept-language') || '';
  const langs = acceptLang.split(',').map((s) => s.split(';')[0].trim().toLowerCase());

  for (const lang of langs) {
    // Try exact match first (e.g. "zh-CN")
    const short = lang.split('-')[0];
    if (supportedLocales.includes(lang)) {
      return NextResponse.redirect(new URL(`/${lang}/`, request.url));
    }
    if (supportedLocales.includes(short)) {
      return NextResponse.redirect(new URL(`/${short}/`, request.url));
    }
  }

  // Fallback: redirect to default locale
  return NextResponse.redirect(new URL('/en/', request.url));
}

export const config = {
  // Only run middleware on the root path
  matcher: '/',
};
