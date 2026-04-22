'use client';

import { CheckCircle } from 'lucide-react';

const features = [
  'CIFER System Account Creation & Full Management',
  'English-to-Mandarin Legal & Technical Translation',
  'HS & CIQ Code Alignment by Local Experts',
  'Flat-Fee Consulting: No hidden costs, completely transparent.',
];

export default function Solution() {
  return (
    <section id="process" className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-navy text-center mb-6">
          Your On-the-Ground Compliance Partner in China.
        </h2>

        {/* Description */}
        <p className="text-lg text-text-muted text-center mb-10 leading-relaxed">
          We bridge the language and regulatory gap. You provide the basic documents,
          and our local experts in Shanghai handle the rest.
        </p>

        {/* Feature List */}
        <div className="bg-bg-ice rounded-lg p-6 sm:p-8">
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" />
                <span className="text-text-charcoal font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}