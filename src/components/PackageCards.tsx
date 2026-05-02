import { Check, Star } from 'lucide-react';

interface PackageCardsProps {
  t: (key: string) => string;
}

export default function PackageCards({ t }: PackageCardsProps) {
  const packages = [
    {
      name: t('basicName'),
      desc: t('basicDesc'),
      items: t('basicItems').split(','),
      cta: t('basicCta'),
      popular: false,
    },
    {
      name: t('advancedName'),
      desc: t('advancedDesc'),
      items: t('advancedItems').split(','),
      cta: t('advancedCta'),
      popular: true,
    },
    {
      name: t('premiumName'),
      desc: t('premiumDesc'),
      items: t('premiumItems').split(','),
      cta: t('premiumCta'),
      popular: false,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {packages.map((pkg, i) => (
        <div
          key={i}
          className={`relative bg-white rounded-lg shadow-md p-8 flex flex-col ${
            pkg.popular ? 'ring-2 ring-accent-gold shadow-xl scale-105' : ''
          }`}
        >
          {pkg.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-gold text-white text-sm font-semibold px-4 py-1 rounded-full flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" />
              {t('popular')}
            </div>
          )}
          <h3 className="text-xl font-bold text-primary-navy mb-2">{pkg.name}</h3>
          <p className="text-text-muted text-sm mb-6">{pkg.desc}</p>
          <ul className="space-y-3 mb-8 flex-grow">
            {pkg.items.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-sm text-text-charcoal">
                <Check className="w-4 h-4 text-accent-green flex-shrink-0 mt-0.5" />
                {item.trim()}
              </li>
            ))}
          </ul>
          <a
            href="https://wa.me/message/HPPZ5X6XZSMLM1"
            target="_blank"
            rel="noopener noreferrer"
            className={`block text-center font-semibold px-6 py-3 rounded-md transition-all ${
              pkg.popular
                ? 'bg-accent-gold hover:bg-accent-gold/90 text-white'
                : 'bg-bg-ice hover:bg-gray-200 text-primary-navy'
            }`}
          >
            {pkg.cta}
          </a>
        </div>
      ))}
    </div>
  );
}
