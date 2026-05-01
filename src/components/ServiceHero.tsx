import { ReactNode } from 'react';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref?: string;
}

export default function ServiceHero({ title, subtitle, ctaText, ctaHref }: ServiceHeroProps) {
  return (
    <section className="pt-28 pb-16 bg-primary-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">{title}</h1>
        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">{subtitle}</p>
        {ctaHref ? (
          <a
            href={ctaHref}
            className="inline-block bg-accent-gold hover:bg-accent-gold/90 text-white font-semibold px-8 py-3 rounded-md transition-all hover:shadow-lg"
          >
            {ctaText}
          </a>
        ) : (
          <a
            href="https://wa.me/message/HPPZ5X6XZSMLM1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent-gold hover:bg-accent-gold/90 text-white font-semibold px-8 py-3 rounded-md transition-all hover:shadow-lg"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
