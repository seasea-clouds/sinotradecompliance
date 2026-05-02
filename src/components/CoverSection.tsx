import { CheckCircle } from 'lucide-react';

interface CoverSectionProps {
  t: (key: string) => string;
}

export default function CoverSection({ t }: CoverSectionProps) {
  const title = t('coverTitle');
  const items = t('coverItems').split(',');

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-navy mb-8">{title}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" />
              <span className="text-text-charcoal">{item.trim()}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
